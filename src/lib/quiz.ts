import type { VocabularyGroup, VocabularyItem } from "@/types/vocabulary";

// ─────────────────────────────────────────────
// Dạng câu hỏi
// ─────────────────────────────────────────────

export type QuestionType = "meaning" | "reverse" | "reading" | "cloze" | "passage";

export const QUESTION_TYPES: {
  type: QuestionType;
  label: string;
  desc: string;
  level: "Dễ" | "Vừa" | "Khó";
}[] = [
  { type: "meaning", label: "Chọn nghĩa", desc: "Nhìn từ tiếng Nhật, chọn nghĩa tiếng Việt", level: "Dễ" },
  { type: "reverse", label: "Chọn từ theo nghĩa", desc: "Nhìn nghĩa tiếng Việt, chọn từ tiếng Nhật", level: "Vừa" },
  { type: "reading", label: "Cách đọc", desc: "Chọn cách đọc hiragana đúng của từ", level: "Vừa" },
  { type: "cloze", label: "Điền từ vào câu", desc: "Câu ví dụ có một chỗ trống, chọn từ phù hợp", level: "Khó" },
  { type: "passage", label: "Điền vào đoạn văn", desc: "Đoạn văn có 1–3 chỗ trống, điền đúng từng từ", level: "Khó" },
];

export const TYPE_LABEL = Object.fromEntries(QUESTION_TYPES.map((t) => [t.type, t.label])) as Record<
  QuestionType,
  string
>;

// ─────────────────────────────────────────────
// Câu có furigana + chỗ trống
// ─────────────────────────────────────────────

/** Một đoạn chữ trong câu: chữ thường, chữ có furigana, hoặc chỗ trống thứ `blank` */
export interface Seg {
  text: string;
  ruby?: string;
  blank?: number;
}

const RUBY = /\{([^|}]+)\|([^}]+)\}/g;

function parseSentence(item: VocabularyItem): Seg[] {
  const markup = item.exampleSentenceFurigana;
  if (!markup) return item.exampleSentence ? [{ text: item.exampleSentence }] : [];
  const segs: Seg[] = [];
  let last = 0;
  for (const m of markup.matchAll(RUBY)) {
    if (m.index > last) segs.push({ text: markup.slice(last, m.index) });
    segs.push({ text: m[1], ruby: m[2] });
    last = m.index + m[0].length;
  }
  if (last < markup.length) segs.push({ text: markup.slice(last) });
  return segs;
}

/** Từ có xuất hiện nguyên dạng trong câu ví dụ → dùng được cho dạng điền chỗ trống */
export function canBlank(item: VocabularyItem) {
  return !!item.exampleSentence && item.exampleSentence.includes(item.kanji);
}

/** Thay từ trong câu ví dụ bằng chỗ trống số `blank`, giữ furigana của phần còn lại */
function blankSentence(item: VocabularyItem, blank: number): Seg[] {
  const segs = parseSentence(item);
  const plain = segs.map((s) => s.text).join("");
  const start = plain.indexOf(item.kanji);
  const end = start + item.kanji.length;
  const out: Seg[] = [];
  let pos = 0;
  let placed = false;
  for (const s of segs) {
    const a = pos;
    const b = pos + s.text.length;
    pos = b;
    if (b <= start || a >= end) {
      out.push(s);
      continue;
    }
    // Phần trước chỗ trống (furigana bị cắt thì bỏ)
    if (a < start) out.push({ text: s.text.slice(0, start - a) });
    if (!placed) {
      out.push({ text: "", blank });
      placed = true;
    }
    if (b > end) out.push({ text: s.text.slice(end - a) });
  }
  return out;
}

// ─────────────────────────────────────────────
// Câu hỏi
// ─────────────────────────────────────────────

export interface ChoiceQuestion {
  id: string;
  type: "meaning" | "reverse" | "reading" | "cloze";
  item: VocabularyItem;
  options: string[];
  answer: string;
  /** Dạng điền từ vào câu: câu có chỗ trống */
  sentence?: Seg[];
}

export interface PassageBlank {
  item: VocabularyItem;
  options: string[];
  answer: string;
}

export interface PassageQuestion {
  id: string;
  type: "passage";
  segments: Seg[];
  blanks: PassageBlank[];
  /** Bản dịch từng câu, hiện khi xem lại */
  translations: string[];
}

export type Question = ChoiceQuestion | PassageQuestion;
/** Câu trả lời: 1 đáp án, hoặc mảng đáp án cho từng chỗ trống của đoạn văn */
export type Answer = string | (string | undefined)[];

export function questionItems(q: Question): VocabularyItem[] {
  return q.type === "passage" ? q.blanks.map((b) => b.item) : [q.item];
}

// ─────────────────────────────────────────────
// Sinh đề
// ─────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const readingOf = (i: VocabularyItem) => i.hiragana || i.katakana || "";
const HAS_KANJI = /[一-龯㐀-䶿々]/;

const ELIGIBLE: Record<QuestionType, (i: VocabularyItem) => boolean> = {
  meaning: (i) => !!i.meaningVn,
  reverse: (i) => !!i.meaningVn,
  reading: (i) => !!readingOf(i) && HAS_KANJI.test(i.kanji) && readingOf(i) !== i.kanji,
  cloze: canBlank,
  passage: canBlank,
};

/** Lấy `n` đáp án nhiễu khác nhau, ưu tiên cùng nhóm để khó đoán hơn */
function distractors(
  correct: string,
  value: (i: VocabularyItem) => string,
  near: VocabularyItem[],
  all: VocabularyItem[],
  n = 3,
  exclude: string[] = [],
  skip: (v: string) => boolean = () => false
): string[] {
  const out: string[] = [];
  const taken = new Set([correct, ...exclude]);
  for (const src of [shuffle(near), shuffle(all)]) {
    for (const it of src) {
      const v = value(it);
      if (!v || taken.has(v) || skip(v)) continue;
      taken.add(v);
      out.push(v);
      if (out.length >= n) return out;
    }
  }
  return out;
}

export interface BuildOptions {
  /** Các từ trong phạm vi làm bài */
  pool: VocabularyItem[];
  /** Toàn bộ từ vựng (lấy đáp án nhiễu) */
  allVocab: VocabularyItem[];
  /** id từ → nhóm (để lấy đáp án nhiễu cùng nhóm) */
  groupOf: Map<string, VocabularyGroup>;
  count: number;
  types: QuestionType[];
  /** id các từ đã hỏi gần đây trong phạm vi này → để sau cùng */
  seenIds?: string[];
}

/**
 * Tạo đề: mỗi từ chỉ xuất hiện một lần, ưu tiên từ chưa hỏi gần đây,
 * chia đều số câu cho các dạng đã chọn và xếp thành từng phần (dễ → khó).
 */
export function buildQuiz({ pool, allVocab, groupOf, count, types, seenIds = [] }: BuildOptions): Question[] {
  const seen = new Set(seenIds);
  const ordered = [...shuffle(pool.filter((i) => !seen.has(i.id))), ...shuffle(pool.filter((i) => seen.has(i.id)))];
  const used = new Set<string>();
  const order = QUESTION_TYPES.map((t) => t.type).filter((t) => types.includes(t));
  if (!order.length) order.push("meaning");

  // Chia số câu cho từng dạng
  const total = Math.min(count, pool.length);
  const quota = new Map<QuestionType, number>();
  order.forEach((t, i) => quota.set(t, Math.floor(total / order.length) + (i < total % order.length ? 1 : 0)));

  const take = (pred: (i: VocabularyItem) => boolean) => {
    const it = ordered.find((i) => !used.has(i.id) && pred(i));
    if (it) used.add(it.id);
    return it;
  };
  const nearOf = (i: VocabularyItem) => groupOf.get(i.id)?.items ?? [];

  const byType = new Map<QuestionType, Question[]>();
  let leftover = 0;
  let seq = 0;

  // Dạng khó trước (cần câu ví dụ), dạng dễ nhận phần thiếu
  for (const type of [...order].reverse()) {
    const list: Question[] = [];
    let need = quota.get(type) ?? 0;
    while (need > 0) {
      if (type === "passage") {
        // Mỗi đoạn văn có ngẫu nhiên 1–3 chỗ trống
        const k = 1 + Math.floor(Math.random() * 3);
        const words: VocabularyItem[] = [];
        for (let j = 0; j < k; j++) {
          const w = take(ELIGIBLE.passage);
          if (w) words.push(w);
        }
        if (!words.length) break;
        list.push(makePassage(`q${seq++}`, words, allVocab, nearOf));
        need -= 1;
        continue;
      }
      const it = take(ELIGIBLE[type]);
      if (!it) break;
      list.push(makeChoice(`q${seq++}`, type, it, allVocab, nearOf));
      need -= 1;
    }
    leftover += need;
    byType.set(type, list);
  }

  // Phần thiếu (không đủ từ hợp lệ) bù bằng dạng chọn nghĩa / chọn từ
  const fallback: QuestionType = order.includes("meaning") ? "meaning" : order.includes("reverse") ? "reverse" : "meaning";
  while (leftover > 0) {
    const it = take(ELIGIBLE[fallback]);
    if (!it) break;
    const list = byType.get(fallback) ?? [];
    list.push(makeChoice(`q${seq++}`, fallback, it, allVocab, nearOf));
    byType.set(fallback, list);
    leftover--;
  }

  const result: Question[] = [];
  for (const t of QUESTION_TYPES.map((x) => x.type)) result.push(...(byType.get(t) ?? []));
  return result;
}

function makeChoice(
  id: string,
  type: ChoiceQuestion["type"],
  item: VocabularyItem,
  all: VocabularyItem[],
  nearOf: (i: VocabularyItem) => VocabularyItem[]
): ChoiceQuestion {
  const value: (i: VocabularyItem) => string =
    type === "meaning" ? (i) => i.meaningVn : type === "reading" ? readingOf : (i) => i.kanji;
  const answer = value(item);
  const options = shuffle([answer, ...distractors(answer, value, nearOf(item), all)]);
  return {
    id,
    type,
    item,
    answer,
    options,
    sentence: type === "cloze" ? blankSentence(item, 0) : undefined,
  };
}

function makePassage(
  id: string,
  words: VocabularyItem[],
  all: VocabularyItem[],
  nearOf: (i: VocabularyItem) => VocabularyItem[]
): PassageQuestion {
  const answers = words.map((w) => w.kanji);

  // Thêm 1–2 câu ngữ cảnh (không có chỗ trống) để đoạn văn dài hơn
  const fillers = shuffle(
    all.filter((i) => i.exampleSentence && !words.some((w) => w.id === i.id) && nearOf(words[0]).includes(i))
  ).slice(0, words.length === 1 ? 2 : 1);
  // Đáp án nhiễu không được là từ đang hiện sẵn trong đoạn văn
  const visibleText = [...fillers, ...words].map((i) => i.exampleSentence ?? "").join("");
  const inPassage = (v: string) => visibleText.includes(v);

  const blanks: PassageBlank[] = words.map((w) => ({
    item: w,
    answer: w.kanji,
    // Đáp án nhiễu gồm cả các từ của chỗ trống khác trong cùng đoạn
    options: shuffle([
      w.kanji,
      ...answers.filter((a) => a !== w.kanji).slice(0, 2),
      ...distractors(w.kanji, (i) => i.kanji, nearOf(w), all, 3, answers, inPassage),
    ].slice(0, 4)),
  }));

  const sentences: { segs: Seg[]; vn: string }[] = shuffle([
    ...words.map((w, idx) => ({ segs: blankSentence(w, idx), vn: w.exampleTranslation ?? "", idx })),
    ...fillers.map((f) => ({ segs: parseSentence(f), vn: f.exampleTranslation ?? "", idx: -1 })),
  ]);

  // Đánh số chỗ trống theo thứ tự xuất hiện trong đoạn
  const appearance: number[] = [];
  for (const s of sentences) for (const seg of s.segs) if (seg.blank !== undefined) appearance.push(seg.blank);
  const renumber = new Map(appearance.map((orig, i) => [orig, i]));
  const segments: Seg[] = [];
  for (const s of sentences) {
    for (const seg of s.segs) segments.push(seg.blank !== undefined ? { ...seg, blank: renumber.get(seg.blank) } : seg);
  }
  const orderedBlanks = appearance.map((orig) => blanks[orig]);

  return {
    id,
    type: "passage",
    segments,
    blanks: orderedBlanks,
    translations: sentences.map((s) => s.vn).filter(Boolean),
  };
}

// ─────────────────────────────────────────────
// Chấm điểm
// ─────────────────────────────────────────────

export type Verdict = "right" | "wrong" | "skip";

export function gradeQuestion(q: Question, a: Answer | undefined): { verdict: Verdict; perItem: { item: VocabularyItem; ok: boolean }[] } {
  if (q.type === "passage") {
    const arr = Array.isArray(a) ? a : [];
    const perItem = q.blanks.map((b, i) => ({ item: b.item, ok: arr[i] === b.answer }));
    const answered = arr.some(Boolean);
    const verdict: Verdict = !answered ? "skip" : perItem.every((p) => p.ok) ? "right" : "wrong";
    return { verdict, perItem };
  }
  const verdict: Verdict = !a ? "skip" : a === q.answer ? "right" : "wrong";
  return { verdict, perItem: [{ item: q.item, ok: verdict === "right" }] };
}

export function isAnswered(q: Question, a: Answer | undefined) {
  if (q.type === "passage") return Array.isArray(a) && q.blanks.every((_, i) => !!a[i]);
  return !!a;
}
