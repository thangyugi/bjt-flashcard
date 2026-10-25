/**
 * Khóa CCAR-P — chỉ import từ Server Component / script (chứa toàn bộ tài liệu ôn và ngân hàng đề).
 * Dữ liệu sinh bởi `npm run ccarp:build` từ docs/claude/.
 */
import guideJson from "./guide.json";
import bankJson from "./bank.json";
import type { BankQuestion, DomainMeta, Guide, GuideBlock, GuideDomain, GuideTask, LessonMeta } from "./types";
import { EXAM_FACTS, MOCK_PASS_PCT, setId } from "./meta";
import { seededShuffle } from "./shuffle";

export const GUIDE = guideJson as unknown as Guide;
export const BANK = bankJson as unknown as BankQuestion[];
export const DOMAINS: GuideDomain[] = GUIDE.domains;
export const TASKS: (GuideTask & { domain: number })[] = DOMAINS.flatMap((d) => d.tasks.map((t) => ({ ...t, domain: d.num })));

/** Cột "Học cái gì" trong bảng mục lục của tài liệu */
function domainTopics(num: number): string {
  for (const s of GUIDE.front)
    for (const b of s.blocks)
      if (b.t === "table" && b.head[0] === "Domain" && b.head.includes("Học cái gì")) {
        const row = b.rows.find((r) => r[0].startsWith(`${num} ·`));
        if (row) return row[b.head.indexOf("Học cái gì")] ?? "";
      }
  return "";
}

export function getCourseMeta(): { domains: DomainMeta[]; lessons: LessonMeta[] } {
  return {
    domains: DOMAINS.map((d) => ({ num: d.num, title: d.title, weight: d.weight, topics: domainTopics(d.num), lessonIds: d.tasks.map((t) => t.id) })),
    lessons: TASKS.map((t) => ({ id: t.id, code: t.code, title: t.title, domain: t.domain })),
  };
}

export function getLesson(id: string) {
  const index = TASKS.findIndex((t) => t.id === id);
  if (index < 0) return undefined;
  return { task: TASKS[index], domain: DOMAINS.find((d) => d.num === TASKS[index].domain)!, prev: TASKS[index - 1], next: TASKS[index + 1], index };
}

export function guideSection(title: string) {
  return [...GUIDE.front, ...GUIDE.back].find((s) => s.title === title);
}

/* ═════════════════════════ Tài liệu → HTML ═════════════════════════ */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Định dạng nội dòng: liên kết <https://…>, *nghiêng*, mã kiểu snake_case / tham số API */
export function inline(src: string): string {
  const links: string[] = [];
  let s = src.replace(/<(https?:\/\/[^>\s]+)>/g, (_, url: string) => {
    links.push(url);
    return `\u0000${links.length - 1}\u0000`;
  });
  s = esc(s);
  s = s.replace(/(^|[\s(“"])\*([^*\n]+?)\*(?=$|[\s).,:;!?”"])/g, "$1<em>$2</em>");
  s = s.replace(
    /(?<![\w./-])((?:[a-z]+_[a-z_]+|defer_loading|additionalProperties|output_config|always_ask)(?:: (?:true|false))?|strict: true|is_error: true|stop_reason(?: == &quot;refusal&quot;)?|max_tokens)(?![\w-])/g,
    "<code>$1</code>"
  );
  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => {
    const url = links[Number(i)];
    return `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url.replace(/^https?:\/\//, ""))}</a>`;
  });
}

const LAYER: Record<string, { label: RegExp; title: string }> = {
  quick: { label: /^💡\s*Hiểu nhanh/u, title: "💡 Hiểu nhanh" },
  choose: { label: /^🎯\s*Cách chọn khi làm đề/u, title: "🎯 Cách chọn khi làm đề" },
  learn: { label: /^📚\s*Cần thuộc/u, title: "📚 Cần thuộc" },
};
const CALLOUT: Record<string, { cls: string; head: string }> = {
  warn: { cls: "warn", head: "⚠️ Bẫy" },
  star: { cls: "memo", head: "⭐ Trọng tâm" },
  info: { cls: "note", head: "ℹ️ Lưu ý" },
  note: { cls: "note", head: "📋 Ghi chú" },
  ok: { cls: "example", head: "✅ Nguồn" },
  ban: { cls: "warn", head: "🚫 Cấm" },
  choose: { cls: "memo", head: "🎯 Rút ra" },
  quick: { cls: "note", head: "💡" },
  learn: { cls: "memo", head: "📚" },
};
const stripMarker = (s: string) => s.replace(/^(?:⚠️|⭐+|ℹ️|📋|✅|🚫|🎯|💡|📚)\s*/u, "");

/**
 * Khối tài liệu → HTML trong khung .oci-prose.
 * `layers`: nhãn lớp (💡/🎯/📚) thành tiêu đề h2 (mục lục "Trong bài này").
 */
export function renderBlocks(blocks: GuideBlock[], layers = true): string {
  const out: string[] = [];
  for (const b of blocks) {
    if (b.t === "table") {
      out.push(
        `<div class="tbl-wrap"><table><thead><tr>${b.head.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${b.rows
          .map((r) => `<tr>${b.head.map((_, i) => `<td>${inline(r[i] ?? "")}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`
      );
      continue;
    }
    if (b.t !== "p") {
      out.push(`<${b.t}>${b.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${b.t}>`);
      continue;
    }
    const layer = b.tone && LAYER[b.tone];
    if (layers && layer && layer.label.test(b.text)) {
      out.push(`<h2>${layer.title}</h2>`);
      let rest = b.text.replace(layer.label, "").replace(/^\s*[.—:]\s*/u, "").trim();
      if (rest) {
        rest = rest[0].toUpperCase() + rest.slice(1);
        out.push(`<p>${inline(rest)}</p>`);
      }
      continue;
    }
    if (b.tone) {
      const c = CALLOUT[b.tone];
      out.push(`<div class="callout ${c.cls}"><div class="callout-head">${c.head}</div><p>${inline(stripMarker(b.text))}</p></div>`);
      continue;
    }
    out.push(`<p>${inline(b.text)}</p>`);
  }
  return out.join("\n");
}

/** Một mục của phần đầu/cuối tài liệu → HTML có tiêu đề */
export function renderSections(titles: string[], headingLevel: 2 | 3 = 2): string {
  return titles
    .map((t) => guideSection(t))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .map((s) => {
      const h = s.level === 2 ? headingLevel : 3;
      return `<h${h}>${esc(s.title)}</h${h}>\n${renderBlocks(s.blocks, false)}`;
    })
    .join("\n");
}

/* ═════════════════════════ Ngân hàng đề ═════════════════════════ */

export interface PracticeSet {
  id: string;
  kind: "domain" | "task" | "v2";
  title: string;
  desc: string;
  ids: number[];
  /** Bài học gắn với bộ (task statement) */
  lessonId?: string;
}

export function practiceSets(): PracticeSet[] {
  const sets: PracticeSet[] = [];
  for (const d of DOMAINS) {
    const ids = BANK.filter((q) => q.domain === d.num).map((q) => q.id);
    sets.push({ id: setId.domain(d.num), kind: "domain", title: `Domain ${d.num} · ${d.title}`, desc: `${ids.length} câu · tỉ trọng đề thật ${d.weight}%`, ids });
  }
  for (const t of TASKS) {
    const ids = BANK.filter((q) => q.task === t.id).map((q) => q.id);
    if (ids.length) sets.push({ id: setId.task(t.id), kind: "task", title: `${t.code} · ${t.title}`, desc: `${ids.length} câu của task statement ${t.code}`, ids, lessonId: t.id });
  }
  const v2 = BANK.filter((q) => q.v2).map((q) => q.id);
  sets.push({ id: setId.v2, kind: "v2", title: "Bộ đề v2", desc: `${v2.length} câu của bộ “ccar-p-v2” trong ngân hàng gốc`, ids: v2 });
  return sets;
}

export interface MockExam {
  id: string;
  title: string;
  desc: string;
  minutes: number;
  passPct: number;
  ids: number[];
}

/** Số câu mỗi domain trong đề 63 câu, theo tỉ trọng chính thức (làm tròn, tổng = 63) */
export function domainQuota(total = EXAM_FACTS.items): Record<number, number> {
  const raw = DOMAINS.map((d) => ({ num: d.num, x: (total * d.weight) / 100 }));
  const q = Object.fromEntries(raw.map((r) => [r.num, Math.floor(r.x)]));
  let left = total - Object.values(q).reduce((s, n) => s + n, 0);
  for (const r of [...raw].sort((a, b) => b.x - Math.floor(b.x) - (a.x - Math.floor(a.x)))) {
    if (left-- <= 0) break;
    q[r.num]++;
  }
  return q;
}

/**
 * 3 đề thi thử 63 câu, lấy mẫu theo tỉ trọng domain; cố định (cùng đề → cùng câu).
 * Mỗi domain xáo một lần rồi các đề lấy các đoạn nối tiếp → ít trùng câu giữa các đề.
 */
export function mockExams(): MockExam[] {
  const quota = domainQuota();
  const pools = Object.fromEntries(DOMAINS.map((d) => [d.num, seededShuffle(BANK.filter((q) => q.domain === d.num).map((q) => q.id), `ccarp-pool-${d.num}`)]));
  return [1, 2, 3].map((n) => {
    const ids: number[] = [];
    for (const d of DOMAINS) {
      const pool = pools[d.num];
      const k = Math.min(quota[d.num], pool.length);
      for (let i = 0; i < k; i++) ids.push(pool[((n - 1) * k + i) % pool.length]);
    }
    return {
      id: `exam-${n}`,
      title: `Đề thi thử ${n}`,
      desc: `${ids.length} câu lấy theo tỉ trọng chính thức của 7 domain · ${EXAM_FACTS.minutes} phút · đạt ≥ ${MOCK_PASS_PCT}%.`,
      minutes: EXAM_FACTS.minutes,
      passPct: MOCK_PASS_PCT,
      ids: seededShuffle(ids, `ccarp-exam-${n}`),
    };
  });
}
