/**
 * Dựng dữ liệu khóa Claude Certified Architect – Professional (CCAR-P).
 *
 *   npm run ccarp:build                     → đọc nguồn trong docs/claude/ rồi ghi src/data/ccar-p/{guide,bank}.json
 *   npm run ccarp:build -- --answers <dir>  → trước đó gộp <dir>/answers*.json vào docs/claude/ccar-p/answers.json
 *   npm run ccarp:build -- --questions <f>  → thay docs/claude/ccar-p/questions.json bằng bản trích sạch <f>
 *   npm run ccarp:build -- --supplement <f> → chép <f> vào docs/claude/ccar-p/supplement.json (lớp bổ sung + thẻ kiến thức nền)
 *   npm run ccarp:build -- --authored <dir> → chép <dir>/authored*.json vào docs/claude/ccar-p/ (câu do Claude biên soạn)
 *
 * Nguồn:
 *   - docs/claude/claude_cert_ccar-p_info.txt  — tài liệu ôn của chủ khóa (38 task statement, 3 lớp, bảng, bẫy)
 *   - docs/claude/ccar-p/questions.json         — 200 câu hỏi duy nhất (EN + VI), trích từ claude_cert_ccar-p.txt
 *   - docs/claude/ccar-p/answers.json           — đáp án + giải thích tiếng Việt (do Claude soạn, chưa đối chiếu đáp án chính thức)
 *   - docs/claude/ccar-p/supplement.json        — lớp bổ sung cho từng task + thẻ "Kiến thức nền" (Claude biên soạn, Markdown)
 *   - docs/claude/ccar-p/authored*.json         — câu hỏi mới do Claude biên soạn (id "c-<domain>-<nn>")
 * Câu chưa có đáp án bị bỏ qua.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "docs", "claude");
const OUT = join(ROOT, "src", "data", "ccar-p");
const QUESTIONS = join(SRC, "ccar-p", "questions.json");
const ANSWERS = join(SRC, "ccar-p", "answers.json");
const SUPPLEMENT = join(SRC, "ccar-p", "supplement.json");

const arg = (name: string) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
};

// ═════════════════════════ 1) Tài liệu ôn → guide.json ═════════════════════════

type Tone = "quick" | "choose" | "learn" | "warn" | "star" | "info" | "note" | "ok" | "ban";
type Block =
  | { t: "p"; text: string; tone?: Tone }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "ul" | "ol"; items: string[] };
interface Section {
  id: string;
  title: string;
  level: 2 | 3;
  blocks: Block[];
}

const MARKERS: [string, Tone][] = [
  ["💡", "quick"],
  ["🎯", "choose"],
  ["📚", "learn"],
  ["⚠️", "warn"],
  ["⭐", "star"],
  ["ℹ️", "info"],
  ["📋", "note"],
  ["✅", "ok"],
  ["🚫", "ban"],
];
const toneOf = (line: string) => MARKERS.find(([m]) => line.startsWith(m))?.[1];
const TERMINAL = /[.!?:…»”"*)]$/;
const LOWER = /^[a-zà-ỹđ(`"“'—→＋·]/u;

/** Tiêu đề của phần đầu/cuối tài liệu (ngoài các domain): dòng → cấp + cách đọc dòng */
const HEADINGS: Record<string, { level: 2 | 3; mode?: "lines" | "olines" | "bullets" }> = {
  "Đăng ký thi — làm theo từng bước": { level: 2 },
  "Chặng A · Tạo tài khoản ＋ thanh toán": { level: 3, mode: "olines" },
  "Chặng B · Đặt lịch bên Pearson VUE": { level: 3, mode: "olines" },
  "Trước ngày thi ＋ hôm thi": { level: 2 },
  "Chặng C · Trước ngày thi": { level: 3, mode: "olines" },
  "Chặng D · Hôm thi": { level: 3, mode: "olines" },
  "Số liệu kỳ thi": { level: 2 },
  "CCAR-P · Claude Certified Architect – Professional": { level: 2 },
  "Mục lục ＋ tỉ trọng CHÍNH CHỦ": { level: 2 },
  "Tỉ trọng hãng so với tỉ trọng ngân hàng đề trong app": { level: 3 },
  "Đề hỏi kiểu gì": { level: 2 },
  "Ai nên thi ＋ không thi": { level: 2 },
  "Lộ trình ôn ＋ tự kiểm": { level: 2 },
  "Hãng khuyên ôn thế nào — dịch thành việc làm được": { level: 3 },
  "Sáu bài tập tay": { level: 3 },
  "Bốn bước ôn": { level: 3, mode: "olines" },
  "Tự kiểm trước ngày thi — trả lời được hết thì đi thi được": { level: 3 },
  "Bẫy hay gặp": { level: 2 },
  "Nguồn chính gốc": { level: 2, mode: "lines" },
  "Cách chấm điểm": { level: 2 },
  "Giấy tờ ＋ hỗ trợ đặc biệt": { level: 2 },
  "Thi lại · vắng mặt": { level: 2 },
  "Trong phòng thi ＋ NDA": { level: 2, mode: "bullets" },
  "Duy trì ＋ gia hạn": { level: 2 },
};

/** Đọc một vùng dòng thành các khối (đoạn, bảng, danh sách) */
function parseBlocks(lines: string[], mode?: "lines" | "olines" | "bullets"): Block[] {
  const out: Block[] = [];
  let para: { text: string; tone?: Tone; last: string } | null = null;
  let table: { head: string[]; rows: string[][] } | null = null;
  let list: { t: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (para) out.push(para.tone ? { t: "p", text: para.text, tone: para.tone } : { t: "p", text: para.text });
    if (table) out.push({ t: "table", head: table.head, rows: table.rows });
    if (list && list.items.length) out.push({ t: list.t, items: list.items });
    para = table = list = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) {
      if (list && !list.items.length) continue; // dòng trống ngay sau nhãn lớp
      flush();
      continue;
    }
    if (line.includes("\t")) {
      const cells = line.split("\t").map((c) => c.trim());
      while (cells.length > 1 && cells[cells.length - 1] === "") cells.pop();
      if (!table) {
        flush();
        table = { head: cells, rows: [] };
      } else table.rows.push(cells);
      continue;
    }
    const tone = toneOf(line);
    if (table) flush();

    // Danh sách: theo chế độ của mục, hoặc ngay sau một nhãn lớp đứng riêng ("📚 Cần thuộc.")
    if (!tone && list) {
      list.items.push(line.trim());
      continue;
    }
    if (!tone && (mode === "lines" || mode === "olines" || (mode === "bullets" && !TERMINAL.test(line)))) {
      flush();
      const t = mode === "olines" ? "ol" : "ul";
      // gộp các dòng liền nhau thành một danh sách
      const prev = out[out.length - 1];
      if (prev && prev.t === t) prev.items.push(line.trim());
      else out.push({ t, items: [line.trim()] });
      continue;
    }

    if (tone) {
      flush();
      para = { text: line.trim(), tone, last: line };
      if (/^\S+\s+[^.]{2,40}\.$/u.test(line.trim()) && (tone === "learn" || tone === "choose")) {
        // nhãn lớp đứng riêng → các dòng sau là danh sách
        out.push({ t: "p", text: line.trim(), tone });
        para = null;
        list = { t: "ul", items: [] };
      }
      continue;
    }
    // Đoạn có biểu tượng (⚠️, ⭐…) kéo dài tới dòng trống; đoạn thường thì theo dấu câu
    if (para && ((para.tone && !mode) || !TERMINAL.test(para.last) || LOWER.test(line.trim()))) {
      para.text += " " + line.trim();
      para.last = line;
      continue;
    }
    flush();
    para = { text: line.trim(), last: line };
  }
  flush();
  return out;
}

function parseGuide(text: string) {
  const lines = text.replace(/\r/g, "").split("\n");
  const domainAt = (i: number) => /^DOMAIN (\d) · (.+) — (\d+)%$/.exec(lines[i]);
  const taskAt = (i: number) => /^(\d)\.(\d) · (.+)$/.exec(lines[i]);
  const firstDomain = lines.findIndex((_, i) => domainAt(i));
  const backStart = lines.findIndex((l) => l === "Lộ trình ôn ＋ tự kiểm");
  if (firstDomain < 0 || backStart < 0) throw new Error("Không nhận ra cấu trúc tài liệu ôn");

  const sections = (from: number, to: number): Section[] => {
    const out: Section[] = [];
    let cur: { title: string; level: 2 | 3; mode?: "lines" | "olines" | "bullets"; body: string[] } | null = null;
    const push = () => cur && out.push({ id: `s${out.length + 1}`, title: cur.title, level: cur.level, blocks: parseBlocks(cur.body, cur.mode) });
    for (let i = from; i < to; i++) {
      const h = HEADINGS[lines[i].trim()];
      if (h) {
        push();
        cur = { title: lines[i].trim(), level: h.level, mode: h.mode, body: [] };
      } else if (cur) cur.body.push(lines[i]);
      else if (lines[i].trim()) throw new Error(`Dòng ${i + 1} nằm ngoài mục nào: ${lines[i]}`);
    }
    push();
    return out;
  };

  const domains: {
    num: number;
    title: string;
    weight: number;
    intro: Block[];
    tasks: { id: string; code: string; title: string; subtitle?: string; blocks: Block[] }[];
  }[] = [];
  for (let i = firstDomain; i < backStart; ) {
    const d = domainAt(i);
    if (!d) throw new Error(`Dòng ${i + 1}: cần tiêu đề DOMAIN`);
    let j = i + 1;
    while (j < backStart && !taskAt(j)) j++;
    const dom = { num: Number(d[1]), title: d[2].trim(), weight: Number(d[3]), intro: parseBlocks(lines.slice(i + 1, j)), tasks: [] as (typeof domains)[number]["tasks"] };
    while (j < backStart && !domainAt(j)) {
      const t = taskAt(j)!;
      let k = j + 1;
      let subtitle: string | undefined;
      if (/^\(.+\)$/.test(lines[k].trim())) subtitle = lines[k++].trim().slice(1, -1);
      const start = k;
      while (k < backStart && !taskAt(k) && !domainAt(k)) k++;
      dom.tasks.push({ id: `${t[1]}-${t[2]}`, code: `${t[1]}.${t[2]}`, title: t[3].trim(), ...(subtitle ? { subtitle } : {}), blocks: parseBlocks(lines.slice(start, k)) });
      j = k;
    }
    domains.push(dom);
    i = j;
  }

  return { front: sections(0, firstDomain), domains, back: sections(backStart, lines.length) };
}

const guide = parseGuide(readFileSync(join(SRC, "claude_cert_ccar-p_info.txt"), "utf8"));
const taskCount = guide.domains.reduce((s, d) => s + d.tasks.length, 0);
if (guide.domains.length !== 7 || taskCount !== 38) throw new Error(`Cần 7 domain / 38 task statement, đọc được ${guide.domains.length} / ${taskCount}`);

// ═════════════════════════ 2) Câu hỏi + đáp án → bank.json ═════════════════════════

interface RawQ {
  id: number;
  question_no: number;
  q_type: "mcq" | "matrix" | "dropdown";
  is_multi: boolean;
  topic: string;
  question_en: string;
  options: Record<string, string>;
  rows: { no: number; text: string }[] | null;
  question_vi: string;
  options_vi: Record<string, string>;
  rows_vi: { no: number; text: string }[] | null;
  in_v2: boolean;
}
interface RawA {
  id: number;
  answer: string[] | null;
  rows_answer: Record<string, string> | null;
  confidence: "high" | "medium" | "low";
  remember: string;
  why: string;
  wrong: Record<string, string> | null;
  rows: Record<string, string> | null;
}

mkdirSync(join(SRC, "ccar-p"), { recursive: true });
const qSrc = arg("--questions");
if (qSrc) writeFileSync(QUESTIONS, JSON.stringify(JSON.parse(readFileSync(qSrc, "utf8")), null, 1) + "\n");

const aDir = arg("--answers");
if (aDir) {
  const files = readdirSync(aDir).filter((f) => /^answers\d*\.json$/.test(f)).sort();
  const merged = new Map<number, RawA>();
  if (existsSync(ANSWERS)) for (const a of JSON.parse(readFileSync(ANSWERS, "utf8")) as RawA[]) merged.set(a.id, a);
  for (const f of files) for (const a of JSON.parse(readFileSync(join(aDir, f), "utf8")) as RawA[]) merged.set(a.id, a);
  writeFileSync(ANSWERS, JSON.stringify([...merged.values()].sort((a, b) => a.id - b.id), null, 1) + "\n");
  console.log(`Gộp ${files.length} tệp đáp án (${files.join(", ")}) → ${merged.size} đáp án`);
}

const questions: RawQ[] = existsSync(QUESTIONS) ? JSON.parse(readFileSync(QUESTIONS, "utf8")) : [];
const answers = new Map<number, RawA>((existsSync(ANSWERS) ? (JSON.parse(readFileSync(ANSWERS, "utf8")) as RawA[]) : []).map((a) => [a.id, a]));

/** Chữ cái phương án nhắc trong lời giải ("Ô B", "đáp án A và C") → ⟦B⟧ để đổi theo thứ tự hiển thị */
/** Từ tiếng Anh trong đề đứng trước một chữ cái mà KHÔNG phải phương án ("Proposal A", "Control B", "session A"…) */
const NOT_OPTION = new Set(["proposal", "control", "session", "stored", "execution", "report", "an", "draft", "api", "plan", "variant", "version", "team", "region", "tier", "grade", "type", "class", "step", "phase", "group", "arm", "cohort", "model", "vendor", "observation", "a", "the", "vitamin"]);
function markLetters(s: string, keys: string[]) {
  if (!keys.length) return s;
  let out = "";
  let ticks = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "`") ticks++;
    const before = s[i - 1] ?? " ";
    const after = s[i + 1] ?? " ";
    const isLetterToken =
      keys.includes(ch) &&
      ticks % 2 === 0 &&
      !/[\p{L}\d_'’/⟦-]/u.test(before) &&
      !/[\p{L}\d_'’/⟧-]/u.test(after);
    if (isLetterToken) {
      const prevWord = /(\p{L}+)\s*$/u.exec(s.slice(Math.max(0, i - 30), i))?.[1]?.toLowerCase();
      if (!prevWord || !NOT_OPTION.has(prevWord)) {
        out += `⟦${ch}⟧`;
        continue;
      }
    }
    out += ch;
  }
  return out;
}

const issues: string[] = [];
const authoredMeta = new Map<number, { ref: string; source: string }>();
// Câu hỏi do Claude biên soạn (docs/claude/ccar-p/authored*.json): id "c-<domain>-<nn>" → id số 900000 + domain·1000 + nn
interface RawAuthored extends Omit<RawQ, "id" | "question_no" | "in_v2">, Omit<RawA, "id" | "rows"> {
  id: string;
  rows: { no: number; text: string }[] | null;
  rows_expl: Record<string, string> | null;
  source?: string;
}
const authDir = arg("--authored");
if (authDir) {
  const files = readdirSync(authDir).filter((f) => /^authored\d*\.json$/.test(f)).sort();
  for (const f of files) writeFileSync(join(SRC, "ccar-p", f), JSON.stringify(JSON.parse(readFileSync(join(authDir, f), "utf8")), null, 1) + "\n");
  console.log(`Chép ${files.length} tệp câu Claude biên soạn (${files.join(", ")})`);
}
const authoredFiles = readdirSync(join(SRC, "ccar-p")).filter((f) => /^authored\d*\.json$/.test(f)).sort();
const seenAuthored = new Set<string>();
for (const f of authoredFiles) {
  for (const raw of JSON.parse(readFileSync(join(SRC, "ccar-p", f), "utf8")) as RawAuthored[]) {
    const idm = /^c-(\d)-(\d+)$/.exec(raw.id);
    if (!idm || seenAuthored.has(raw.id)) {
      issues.push(`${f}: id lạ/trùng "${raw.id}"`);
      continue;
    }
    seenAuthored.add(raw.id);
    const num = 900000 + Number(idm[1]) * 1000 + Number(idm[2]);
    questions.push({ ...raw, id: num, question_no: Number(idm[2]), in_v2: false });
    answers.set(num, { ...raw, id: num, rows: raw.rows_expl ?? null });
    authoredMeta.set(num, { ref: raw.id, source: raw.source ?? "" });
    if (idm[1] !== /^Subdomain (\d)/.exec(raw.topic)?.[1]) issues.push(`${raw.id}: domain trong id khác topic "${raw.topic}"`);
  }
}
const bank = [];
for (const q of questions) {
  const a = answers.get(q.id);
  if (!a) continue;
  const m = /^Subdomain (\d)\.(\d)/.exec(q.topic);
  if (!m) {
    issues.push(`${q.id}: topic lạ "${q.topic}"`);
    continue;
  }
  const keys = Object.keys(q.options);
  const grid = q.q_type !== "mcq";
  if (grid) {
    const ra = a.rows_answer ?? {};
    const bad = (q.rows ?? []).filter((r) => !keys.includes(ra[String(r.no)]));
    if (bad.length) {
      issues.push(`${q.id}: thiếu/sai đáp án hàng ${bad.map((r) => r.no).join(",")}`);
      continue;
    }
  } else {
    const ans = (a.answer ?? []).filter((k) => keys.includes(k));
    if (!ans.length || ans.length !== (a.answer ?? []).length) {
      issues.push(`${q.id}: đáp án không hợp lệ ${JSON.stringify(a.answer)}`);
      continue;
    }
    const need = /\((?:Select|Choose) (two|three|four)\.?\)/i.exec(q.question_en)?.[1]?.toLowerCase();
    const n = need ? { two: 2, three: 3, four: 4 }[need]! : q.is_multi ? 0 : 1;
    if (n && ans.length !== n) issues.push(`${q.id}: đề cần chọn ${n}, đáp án có ${ans.length}`);
  }
  const ml = (s: string) => (grid ? s : markLetters(s, keys));
  bank.push({
    id: q.id,
    no: q.question_no,
    type: q.q_type,
    domain: Number(m[1]),
    task: `${m[1]}-${m[2]}`,
    v2: q.in_v2,
    en: q.question_en,
    vi: q.question_vi,
    options: q.options,
    optionsVi: q.options_vi,
    ...(grid
      ? {
          rows: (q.rows ?? []).map((r) => ({ no: r.no, en: r.text, vi: q.rows_vi?.find((x) => x.no === r.no)?.text ?? r.text })),
          rowsAnswer: a.rows_answer,
          rowsWhy: a.rows ?? {},
        }
      : { answer: [...(a.answer ?? [])].sort(), wrong: Object.fromEntries(Object.entries(a.wrong ?? {}).map(([k, v]) => [k, ml(v)])) }),
    confidence: a.confidence,
    remember: ml(a.remember ?? ""),
    why: ml(a.why ?? ""),
    ...(authoredMeta.has(q.id) ? { authored: authoredMeta.get(q.id)!.ref, source: authoredMeta.get(q.id)!.source } : {}),
  });
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "guide.json"), JSON.stringify(guide, null, 1) + "\n");
writeFileSync(join(OUT, "bank.json"), JSON.stringify(bank) + "\n");

const conf = bank.reduce<Record<string, number>>((s, q) => ((s[q.confidence] = (s[q.confidence] ?? 0) + 1), s), {});
console.log(`CCAR-P: ${guide.domains.length} domain · ${taskCount} task statement · ${guide.front.length + guide.back.length} mục phụ`);
console.log(`Ngân hàng: ${bank.length}/${questions.length} câu có đáp án (${bank.filter((q) => q.v2).length} thuộc bộ v2 · ${bank.filter((q) => "authored" in q).length} do Claude biên soạn) · độ tin cậy ${JSON.stringify(conf)}`);

// ═════════════════════════ 3) Bổ sung do Claude biên soạn → supplement.json ═════════════════════════

const escHtml = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Markdown nội dòng: `mã`, **đậm**, *nghiêng*, [chữ](url), <url> */
function mdInline(src: string): string {
  const keep: string[] = [];
  const stash = (html: string) => `\u0000${keep.push(html) - 1}\u0000`;
  let t = src.replace(/`([^`]+)`/g, (_, c: string) => stash(`<code>${escHtml(c)}</code>`));
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label: string, url: string) => stash(`<a href="${escHtml(url)}" target="_blank" rel="noopener noreferrer">${escHtml(label)}</a>`));
  t = t.replace(/<(https?:\/\/[^>\s]+)>/g, (_, url: string) => stash(`<a href="${escHtml(url)}" target="_blank" rel="noopener noreferrer">${escHtml(url.replace(/^https?:\/\//, ""))}</a>`));
  t = escHtml(t)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^\w*])\*([^*\n]+?)\*(?!\w)/g, "$1<em>$2</em>");
  return t.replace(/\u0000(\d+)\u0000/g, (_, i: string) => keep[Number(i)]);
}

/** Markdown khối (GFM rút gọn): đoạn, bảng, danh sách, trích dẫn — bảng nằm trong khung cuộn ngang */
function mdToHtml(src: string): string {
  const lines = src.replace(/\r/g, "").split("\n");
  const out: string[] = [];
  let i = 0;
  const cells = (l: string) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (/^\s*\|/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      const sep = rows.length > 1 && rows[1].every((c) => /^:?-+:?$/.test(c));
      const head = sep ? rows[0] : null;
      const body = sep ? rows.slice(2) : rows;
      out.push(
        `<div class="tbl-wrap"><table>${head ? `<thead><tr>${head.map((c) => `<th>${mdInline(c)}</th>`).join("")}</tr></thead>` : ""}<tbody>${body
          .map((r) => `<tr>${r.map((c) => `<td>${mdInline(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`
      );
      continue;
    }
    if (/^\s*>/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ""));
      out.push(`<blockquote>${mdToHtml(buf.join("\n"))}</blockquote>`);
      continue;
    }
    const li = /^\s*(?:([-*+])|(\d+)[.)])\s+/;
    if (li.test(line)) {
      const ordered = !li.exec(line)![1];
      const items: string[] = [];
      while (i < lines.length && lines[i].trim()) {
        const m = li.exec(lines[i]);
        if (m && !m[1] === ordered) items.push(lines[i].replace(li, ""));
        else if (!m && items.length && !/^\s*[|>]/.test(lines[i])) items[items.length - 1] += " " + lines[i].trim();
        else break;
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((x) => `<li>${mdInline(x)}</li>`).join("")}</${tag}>`);
      continue;
    }
    const h = /^(#{1,4})\s+(.+)$/.exec(line);
    if (h) {
      const lv = Math.min(6, h[1].length + 2);
      out.push(`<h${lv}>${mdInline(h[2])}</h${lv}>`);
      i++;
      continue;
    }
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^\s*[|>]/.test(lines[i]) && !li.test(lines[i]) && !/^#{1,4}\s/.test(lines[i])) buf.push(lines[i++].trim());
    out.push(`<p>${mdInline(buf.join(" "))}</p>`);
  }
  return out.join("\n");
}

const supSrc = arg("--supplement");
if (supSrc) writeFileSync(SUPPLEMENT, JSON.stringify(JSON.parse(readFileSync(supSrc, "utf8")), null, 1) + "\n");

interface RawSupplement {
  label: string;
  note: string;
  updated: string;
  reference_title: string;
  tasks: Record<string, { add: { layer: string; title: string; body_md: string }[] }>;
  reference: { id: string; title: string; body_md: string }[];
}
const LAYERS = new Set(["can-thuoc", "cach-chon", "bay"]);
let supplement: object = { label: "", note: "", updated: "", referenceTitle: "", tasks: {}, reference: [] };
if (existsSync(SUPPLEMENT)) {
  const raw = JSON.parse(readFileSync(SUPPLEMENT, "utf8")) as RawSupplement;
  const known = new Set(guide.domains.flatMap((d) => d.tasks.map((t) => t.code)));
  const tasks: Record<string, { layer: string; title: string; html: string }[]> = {};
  for (const [code, v] of Object.entries(raw.tasks)) {
    if (!known.has(code)) {
      issues.push(`supplement: task lạ ${code}`);
      continue;
    }
    tasks[code.replace(".", "-")] = v.add.map((a) => {
      if (!LAYERS.has(a.layer)) issues.push(`supplement ${code}: lớp lạ ${a.layer}`);
      return { layer: a.layer, title: a.title, html: mdToHtml(a.body_md) };
    });
  }
  supplement = {
    label: raw.label,
    note: raw.note,
    updated: raw.updated,
    referenceTitle: raw.reference_title,
    tasks,
    reference: raw.reference.map((r) => ({ id: r.id, title: r.title, html: mdToHtml(r.body_md) })),
  };
  const n = Object.values(tasks).reduce((s, x) => s + x.length, 0);
  console.log(`Bổ sung: ${n} mục cho ${Object.keys(tasks).length} task · ${raw.reference.length} thẻ kiến thức nền`);
}
writeFileSync(join(OUT, "supplement.json"), JSON.stringify(supplement) + "\n");

if (issues.length) console.warn(`Cảnh báo (${issues.length}):\n  ${issues.join("\n  ")}`);
