import type { N1Question } from "../types";
import type { VocabLesson, VocabWord } from "./types";

const KANJI = /[㐀-䶿一-鿿豈-﫿々〆ヶ]/;
const KANJI_RUN = /[㐀-䶿一-鿿豈-﫿々〆ヶ]+|[^㐀-䶿一-鿿豈-﫿々〆ヶ]+/g;

export const hasKanji = (s: string) => KANJI.test(s);

/** Mặt chữ đầy đủ để hiển thị: tính từ な thêm な. */
export function display(w: VocabWord) {
  return w.pos === "na-adj" ? `${w.w}な` : w.w;
}

const toHira = (s: string) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** Gắn furigana cho từ chính theo cách đọc đã biết: 夜更かし/よふかし → {夜更|よふ}かし */
export function rubyOf(word: string, reading: string): string {
  if (!KANJI.test(word)) return word;
  const parts = word.match(KANJI_RUN) ?? [word];
  const re = new RegExp(
    "^" + parts.map((p) => (KANJI.test(p) ? "(.+?)" : `(${toHira(p).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`)).join("") + "$"
  );
  const m = toHira(reading).match(re);
  if (!m) return `{${word}|${reading}}`;
  return parts.map((p, i) => (KANJI.test(p) ? `{${p}|${m[i + 1]}}` : p)).join("");
}

/* ── Xáo trộn cố định theo seed ─────────────────────────────── */
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffle<T>(arr: T[], rand: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
/** Đặt đáp án đúng vào vị trí ngẫu nhiên (cố định theo seed) */
function withAnswer(correct: string, distractors: string[], rand: () => number) {
  const opts = shuffle([correct, ...distractors.slice(0, 3)], rand);
  return { opts, answer: opts.indexOf(correct) };
}

/* ── Cách đọc gây nhiễu kiểu đề JLPT (漢字読み) ───────────────── */
const DAKU: Record<string, string> = {
  か: "が", き: "ぎ", く: "ぐ", け: "げ", こ: "ご", さ: "ざ", し: "じ", す: "ず", せ: "ぜ", そ: "ぞ",
  た: "だ", ち: "ぢ", つ: "づ", て: "で", と: "ど", は: "ば", ひ: "び", ふ: "ぶ", へ: "べ", ほ: "ぼ",
};
const UNDAKU = Object.fromEntries(Object.entries(DAKU).map(([a, b]) => [b, a]));

function readingTraps(r: string): string[] {
  const out = new Set<string>();
  const chars = [...r];
  // bỏ / thêm trường âm
  if (r.includes("う")) out.add(r.replace(/(?<=[おこそとのほもよろごぞどぼぽょゅ])う/, ""));
  out.add(r.replace(/([こそとほよろょゅ])(?!う)/, "$1う"));
  // bỏ / thêm âm ngắt っ
  if (r.includes("っ")) out.add(r.replace("っ", "つ"));
  else if (chars.length > 2) out.add(chars[0] + "っ" + chars.slice(2).join(""));
  // đổi âm đục ở âm đầu hoặc âm thứ hai
  for (const i of [0, 1, 2]) {
    const c = chars[i];
    const swap = c && (DAKU[c] ?? UNDAKU[c]);
    if (swap) out.add([...chars.slice(0, i), swap, ...chars.slice(i + 1)].join(""));
  }
  // ん ↔ う ở cuối
  if (r.endsWith("ん")) out.add(r.slice(0, -1) + "う");
  else if (r.endsWith("う")) out.add(r.slice(0, -1) + "ん");
  // ゅ ↔ ょ
  if (r.includes("ゅ")) out.add(r.replace("ゅ", "ょ"));
  else if (r.includes("ょ")) out.add(r.replace("ょ", "ゅ"));
  out.delete(r);
  return [...out].filter((x) => x.length > 0);
}

/* ── Tách câu ví dụ thành chỗ trống ─────────────────────────── */
const MARK = /\[\[(.*?)\]\]/;

export interface QuizSection {
  key: string;
  title: string;
  desc: string;
  qs: N1Question[];
}

/**
 * Sinh trắc nghiệm cho một bài từ dữ liệu từ vựng.
 * fg: hàm gắn furigana cho chuỗi (chạy trên server).
 */
export function buildVocabQuiz(lesson: VocabLesson, fg: (s: string) => string): QuizSection[] {
  const rand = rng(lesson.id);
  const words = lesson.words;
  const kanjiWords = words.filter((w) => hasKanji(w.w));

  /* 1. Cách đọc (漢字読み) & chọn kanji (表記) */
  const yomi: N1Question[] = [];
  for (const w of shuffle(kanjiWords, rand).slice(0, 8)) {
    const traps = shuffle(readingTraps(w.r), rand);
    const others = shuffle(
      kanjiWords.filter((o) => o !== w && Math.abs(o.r.length - w.r.length) <= 1).map((o) => o.r),
      rand
    );
    const dist = [...new Set([...traps, ...others])].filter((x) => x !== w.r);
    if (dist.length < 3) continue;
    const { opts, answer } = withAnswer(w.r, dist, rand);
    yomi.push({
      type: "choice",
      label: "Cách đọc (漢字読み)",
      q: `[[${display(w)}]]`,
      qVi: "Chọn cách đọc đúng của từ được tô đậm.",
      opts,
      answer,
      explain: `${display(w)} đọc là ${w.r}${w.hv ? ` (${w.hv})` : ""} — ${w.m}.`,
    });
  }
  for (const w of shuffle(kanjiWords, rand).slice(0, 5)) {
    const pool = shuffle(
      kanjiWords.filter((o) => o !== w && o.pos === w.pos).concat(kanjiWords.filter((o) => o !== w && o.pos !== w.pos)),
      rand
    ).map(display);
    const dist = [...new Set(pool)].filter((x) => x !== display(w));
    if (dist.length < 3) continue;
    const { opts, answer } = withAnswer(display(w), dist, rand);
    yomi.push({
      type: "choice",
      label: "Chọn chữ Hán (表記)",
      q: `${w.p ? `〜${w.p} ` : ""}${w.pos === "na-adj" ? `${w.r}な` : w.r}`,
      qVi: "Chọn cách viết bằng chữ Hán đúng.",
      opts,
      answer,
      explain: `${w.r} viết là ${display(w)}${w.hv ? ` (${w.hv})` : ""} — ${w.m}.`,
    });
  }

  /* 2. Nghĩa: nối 6 cặp + chọn nghĩa */
  const nghia: N1Question[] = [];
  const shuffled = shuffle(words, rand);
  for (let i = 0; i + 4 <= shuffled.length && nghia.length < 3; i += 6) {
    const group = shuffled.slice(i, i + 6);
    nghia.push({
      type: "match",
      q: "Nối từ với nghĩa",
      pairs: group.map((w) => [fg(rubyOf(display(w), w.pos === "na-adj" ? `${w.r}な` : w.r)), w.m] as [string, string]),
    });
  }
  for (const w of shuffle(words, rand).slice(0, 5)) {
    const dist = shuffle(
      words.filter((o) => o !== w).map((o) => o.m),
      rand
    );
    const { opts, answer } = withAnswer(w.m, dist, rand);
    nghia.push({
      type: "choice",
      label: "Chọn nghĩa đúng",
      q: rubyOf(display(w), w.pos === "na-adj" ? `${w.r}な` : w.r),
      opts,
      answer,
      explain: `${display(w)} (${w.r}) = ${w.m}.`,
    });
  }

  /* 3. Điền từ vào câu (文脈規定) — dùng câu ví dụ đầu tiên */
  const dien: N1Question[] = [];
  const blanks = words
    .map((w) => {
      const ex = w.ex[0];
      const markup = fg(ex[0]);
      const m = markup.match(MARK);
      return m ? { w, ex, markup, form: m[1] } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  for (const b of shuffle(blanks, rand).slice(0, 10)) {
    const same = blanks.filter((o) => o.w !== b.w && o.w.pos === b.w.pos).map((o) => o.form);
    const rest = blanks.filter((o) => o.w !== b.w && o.w.pos !== b.w.pos).map((o) => o.form);
    const dist = [...new Set([...shuffle(same, rand), ...shuffle(rest, rand)])].filter((x) => x !== b.form);
    if (dist.length < 3) continue;
    const { opts, answer } = withAnswer(b.form, dist, rand);
    dien.push({
      type: "choice",
      label: "Điền từ (文脈規定)",
      q: b.markup.replace(MARK, "＿＿＿"),
      opts,
      answer,
      explain: `${b.ex[1]} → dùng ${display(b.w)} (${b.w.m}).`,
    });
  }

  const sections: QuizSection[] = [
    { key: "doc", title: "Đọc & viết kanji", desc: "漢字読み・表記 — chọn cách đọc, chọn chữ Hán đúng", qs: yomi },
    { key: "nghia", title: "Nghĩa của từ", desc: "Nối từ – nghĩa, chọn nghĩa đúng", qs: nghia },
    { key: "dien", title: "Điền từ vào câu", desc: "文脈規定 — chọn từ hợp ngữ cảnh", qs: dien },
  ];
  if (lesson.quiz.length) {
    sections.push({ key: "dung", title: "Dùng từ đúng", desc: "用法・言い換え — câu hỏi kiểu đề JLPT", qs: lesson.quiz });
  }
  return sections.filter((s) => s.qs.length);
}
