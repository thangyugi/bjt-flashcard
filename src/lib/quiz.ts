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

const HIRA_END = /[\u3041-\u309f]$/;

/** Các cách viết của từ: "A・B" → [A, B]; bỏ phần trong ngoặc và dấu ～ */
function surfaceCandidates(word: string): string[] {
  const out = new Set<string>();
  const add = (w: string) => {
    const t = w.replace(/[～〜~]/g, "").trim();
    if (t) out.add(t);
  };
  for (const part of word.split("・")) {
    add(part.replace(/[（(][^）)]*[）)]/g, ""));
    for (const m of part.matchAll(/[（(]([^）)]*)[）)]/g)) add(m[1]);
  }
  return [...out];
}

/**
 * Tìm vị trí từ trong câu ví dụ của chính nó.
 * Thử nguyên dạng trước, sau đó bỏ dần đuôi hiragana để khớp dạng đã chia (結ぶ → 結びました).
 */
export function findInSentence(item: VocabularyItem): { start: number; end: number } | null {
  const sentence = item.exampleSentence;
  if (!sentence) return null;
  const cands = surfaceCandidates(item.kanji);
  for (const c of cands) {
    const i = sentence.indexOf(c);
    if (i >= 0) return { start: i, end: i + c.length };
  }
  for (const c of cands) {
    let t = c;
    while (t.length > 1 && HIRA_END.test(t)) {
      t = t.slice(0, -1);
      if (t.length < 2 && HIRA_END.test(t)) break;
      const i = sentence.indexOf(t);
      if (i >= 0) return { start: i, end: i + t.length };
    }
  }
  return null;
}

/** Từ tìm được trong câu ví dụ → dùng được cho dạng điền chỗ trống */
export function canBlank(item: VocabularyItem) {
  return findInSentence(item) !== null;
}

/**
 * Thay từ trong câu ví dụ bằng chỗ trống số `blank`, giữ furigana của phần còn lại.
 * Trả về cả chữ gốc ở chỗ trống (dạng xuất hiện trong câu) để hiện khi xem lại.
 */
function blankSentence(item: VocabularyItem, blank: number): { segs: Seg[]; surface: string } {
  const segs = parseSentence(item);
  const range = findInSentence(item);
  if (!range) return { segs, surface: item.kanji };
  const { start, end } = range;
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
  return { segs: out, surface: item.exampleSentence!.slice(start, end) };
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
  /** Chữ thật ở chỗ trống (có thể là dạng đã chia của từ) */
  surface?: string;
}

export interface PassageBlank {
  item: VocabularyItem;
  options: string[];
  answer: string;
  /** Chữ thật ở chỗ trống (có thể là dạng đã chia của từ) */
  surface: string;
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

export const ELIGIBLE: Record<QuestionType, (i: VocabularyItem) => boolean> = {
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
  /** Số TỪ cần kiểm tra (Infinity = tất cả từ dùng được) */
  count: number;
  types: QuestionType[];
  /** id các từ đã hỏi gần đây trong phạm vi này → để sau cùng */
  seenIds?: string[];
}

/** Các dạng đã chọn, theo thứ tự phần (dễ → khó) */
function orderedTypes(types: QuestionType[]): QuestionType[] {
  const order = QUESTION_TYPES.map((t) => t.type).filter((t) => types.includes(t));
  return order.length ? order : ["meaning"];
}

/** Từ trong phạm vi kiểm tra được bằng ít nhất một dạng đã chọn */
export function eligibleWords(pool: VocabularyItem[], types: QuestionType[]): VocabularyItem[] {
  const order = orderedTypes(types);
  return pool.filter((i) => order.some((t) => ELIGIBLE[t](i)));
}

/**
 * Tạo đề:
 * - Chỉ dùng đúng các dạng đã chọn (không tự bù bằng dạng khác).
 * - `count` là số từ được kiểm tra; mỗi từ xuất hiện đúng một lần.
 * - Từ chia đều cho các dạng, có xét từ nào dùng được cho dạng nào.
 * - Ưu tiên từ chưa hỏi gần đây; câu xếp thành từng phần (dễ → khó).
 */
export function buildQuiz({ pool, allVocab, groupOf, count, types, seenIds = [] }: BuildOptions): Question[] {
  const order = orderedTypes(types);
  const seen = new Set(seenIds);
  const candidates = eligibleWords(pool, order);
  const ordered = [...shuffle(candidates.filter((i) => !seen.has(i.id))), ...shuffle(candidates.filter((i) => seen.has(i.id)))];
  const target = Math.min(count, ordered.length);
  const chosen = ordered.slice(0, target);

  // Gán từng từ cho dạng còn "thiếu" nhiều nhất trong các dạng mà từ đó dùng được.
  // Từ ít lựa chọn (chỉ hợp vài dạng) được xếp trước để chia đều hơn.
  const assigned = new Map<QuestionType, VocabularyItem[]>(order.map((t) => [t, []]));
  const share = target / order.length;
  const options = (i: VocabularyItem) => order.filter((t) => ELIGIBLE[t](i));
  const byFlex = [...chosen].sort((a, b) => options(a).length - options(b).length);
  for (const w of byFlex) {
    const opts = options(w);
    const pick = opts.reduce((best, t) => {
      const fill = assigned.get(t)!.length / share;
      const bestFill = assigned.get(best)!.length / share;
      return fill < bestFill ? t : best;
    }, opts[0]);
    assigned.get(pick)!.push(w);
  }

  const nearOf = (i: VocabularyItem) => groupOf.get(i.id)?.items ?? [];
  let seq = 0;
  const result: Question[] = [];
  for (const type of order) {
    const words = shuffle(assigned.get(type)!);
    if (type === "passage") {
      // Mỗi đoạn văn gồm ngẫu nhiên 1–3 từ (chỗ trống)
      for (let i = 0; i < words.length; ) {
        const k = Math.min(1 + Math.floor(Math.random() * 3), words.length - i);
        result.push(makePassage(`q${seq++}`, words.slice(i, i + k), allVocab, nearOf));
        i += k;
      }
    } else {
      for (const w of words) result.push(makeChoice(`q${seq++}`, type, w, allVocab, nearOf));
    }
  }
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
    ...(type === "cloze" ? (({ segs, surface }) => ({ sentence: segs, surface }))(blankSentence(item, 0)) : {}),
  };
}

function makePassage(
  id: string,
  words: VocabularyItem[],
  all: VocabularyItem[],
  nearOf: (i: VocabularyItem) => VocabularyItem[]
): PassageQuestion {
  const answers = words.map((w) => w.kanji);
  const blanked = words.map((w, idx) => ({ w, idx, ...blankSentence(w, idx) }));

  // Thêm 1–2 câu ngữ cảnh (không có chỗ trống) để đoạn văn dài hơn
  const fillers = shuffle(
    nearOf(words[0]).filter((i) => i.exampleSentence && !words.some((w) => w.id === i.id))
  ).slice(0, words.length === 1 ? 2 : 1);

  const sentences: { segs: Seg[]; vn: string }[] = shuffle([
    ...blanked.map((b) => ({ segs: b.segs, vn: b.w.exampleTranslation ?? "" })),
    ...fillers.map((f) => ({ segs: parseSentence(f), vn: f.exampleTranslation ?? "" })),
  ]);

  // Đáp án nhiễu không được là từ đang hiện sẵn trong đoạn văn
  const visibleText = sentences.flatMap((x) => x.segs.map((g) => g.text)).join("");
  const inPassage = (v: string) => visibleText.includes(v);

  const blanks: PassageBlank[] = blanked.map(({ w, surface }) => ({
    item: w,
    answer: w.kanji,
    surface,
    // Đáp án nhiễu gồm cả các từ của chỗ trống khác trong cùng đoạn
    options: shuffle(
      [
        w.kanji,
        ...answers.filter((a) => a !== w.kanji).slice(0, 2),
        ...distractors(w.kanji, (i) => i.kanji, nearOf(w), all, 3, answers, inPassage),
      ].slice(0, 4)
    ),
  }));

  // Đánh số chỗ trống theo thứ tự xuất hiện trong đoạn
  const appearance: number[] = [];
  for (const x of sentences) for (const seg of x.segs) if (seg.blank !== undefined) appearance.push(seg.blank);
  const renumber = new Map(appearance.map((orig, i) => [orig, i]));
  const segments: Seg[] = [];
  for (const x of sentences) {
    for (const seg of x.segs) segments.push(seg.blank !== undefined ? { ...seg, blank: renumber.get(seg.blank) } : seg);
  }

  return {
    id,
    type: "passage",
    segments,
    blanks: appearance.map((orig) => blanks[orig]),
    translations: sentences.map((x) => x.vn).filter(Boolean),
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
