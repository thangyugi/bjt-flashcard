import type { IpaLesson, IpaQuestion, IpaWord, Phoneme } from "./types";

/** Tạo câu hỏi luyện tập tự động từ dữ liệu âm (dùng ở trang bài học và trang luyện tập). */

export const slash = (ipa: string) => `/${ipa}/`;

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
export function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export const hashSeed = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Đề nghe: máy đọc một từ trong cặp tối thiểu, chọn đúng từ. */
export function listenPairs(phonemes: Phoneme[], seed = 1, limit = 8): IpaQuestion[] {
  const rand = rng(seed);
  const pairs = phonemes.flatMap((p) => p.pairs ?? []);
  const uniq = new Map<string, { a: IpaWord; b: IpaWord }>();
  for (const pr of pairs) {
    const k = [pr.a.w, pr.b.w].sort().join("|");
    if (!uniq.has(k) && !/tục/.test(pr.a.vi + pr.b.vi)) uniq.set(k, pr);
  }
  return shuffle([...uniq.values()], rand)
    .slice(0, limit)
    .map((pr) => {
      const target = rand() < 0.5 ? pr.a : pr.b;
      const other = target === pr.a ? pr.b : pr.a;
      return {
        type: "choice",
        label: "Nghe và chọn",
        q: "Bấm loa, nghe kỹ rồi chọn từ bạn nghe thấy.",
        say: target.w,
        opts: [`${target.w} ${slash(target.ipa)}`, `${other.w} ${slash(other.ipa)}`],
        answer: 0,
        explain: `${target.w} ${slash(target.ipa)} — ${target.vi}. Còn ${other.w} ${slash(other.ipa)} — ${other.vi}.`,
      };
    });
}

/** Từ → chọn phiên âm đúng (phương án nhiễu: phiên âm của cặp tối thiểu hoặc từ cùng bài) */
export function wordToIpa(phonemes: Phoneme[], seed = 2, limit = 6): IpaQuestion[] {
  const rand = rng(seed);
  const all = phonemes.flatMap((p) => p.words);
  const partner = new Map<string, string>();
  for (const p of phonemes) for (const pr of p.pairs ?? []) {
    partner.set(pr.a.w, pr.b.ipa);
    partner.set(pr.b.w, pr.a.ipa);
  }
  return shuffle(all, rand)
    .slice(0, limit)
    .map((w) => {
      const pool = shuffle(all.filter((o) => o.ipa !== w.ipa).map((o) => o.ipa), rand);
      const distract = [...new Set([partner.get(w.w), ...pool].filter((x): x is string => !!x && x !== w.ipa))].slice(0, 3);
      return {
        type: "choice",
        label: "Chọn phiên âm",
        q: `Phiên âm đúng của "${w.w}" (${w.vi}) là?`,
        say: w.w,
        opts: [slash(w.ipa), ...distract.map(slash)],
        answer: 0,
        explain: `${w.w} = ${slash(w.ipa)}.`,
      };
    });
}

/** Phiên âm → chọn từ */
export function ipaToWord(phonemes: Phoneme[], seed = 3, limit = 6): IpaQuestion[] {
  const rand = rng(seed);
  const all = phonemes.flatMap((p) => p.words);
  return shuffle(all, rand)
    .slice(0, limit)
    .map((w) => {
      const distract = shuffle(all.filter((o) => o.w !== w.w), rand).slice(0, 3).map((o) => o.w);
      return {
        type: "choice",
        label: "Đọc phiên âm",
        q: `Phiên âm ${slash(w.ipa)} là từ nào?`,
        opts: [w.w, ...distract],
        answer: 0,
        explain: `${slash(w.ipa)} = ${w.w} — ${w.vi}.`,
      };
    });
}

/** Tìm từ chứa âm /X/ (các phương án nhiễu không chứa ký hiệu đó) */
export function findSound(phonemes: Phoneme[], pool: Phoneme[], seed = 4, limit = 6): IpaQuestion[] {
  const rand = rng(seed);
  const out: IpaQuestion[] = [];
  for (const p of shuffle(phonemes, rand)) {
    const right = shuffle(p.words, rand)[0];
    if (!right) continue;
    const wrong = shuffle(
      pool.filter((o) => o.id !== p.id).flatMap((o) => o.words).filter((w) => !w.ipa.includes(p.symbol)),
      rand
    ).slice(0, 3);
    if (wrong.length < 3) continue;
    out.push({
      type: "choice",
      label: "Tìm âm",
      q: `Từ nào có âm ${slash(p.symbol)} (${p.name})?`,
      opts: [`${right.w}`, ...wrong.map((w) => w.w)],
      answer: 0,
      explain: `${right.w} ${slash(right.ipa)} có âm ${slash(p.symbol)}. ${wrong.map((w) => `${w.w} ${slash(w.ipa)}`).join(", ")}.`,
    });
    if (out.length >= limit) break;
  }
  return out;
}

/** Ký hiệu → từ khóa neo trí nhớ */
export function symbolToKeyword(phonemes: Phoneme[], seed = 5, limit = 8): IpaQuestion[] {
  const rand = rng(seed);
  return shuffle(phonemes, rand)
    .slice(0, limit)
    .map((p) => {
      const distract = shuffle(phonemes.filter((o) => o.id !== p.id), rand).slice(0, 3).map((o) => o.keyword.w);
      return {
        type: "choice",
        label: "Từ khóa",
        q: `Từ khóa neo trí nhớ của âm ${slash(p.symbol)} là?`,
        opts: [p.keyword.w, ...distract],
        answer: 0,
        explain: `${slash(p.symbol)} — ${p.name}: "${p.keyword.w}" ${slash(p.keyword.ipa)}.`,
      };
    });
}

export interface PracticeSection {
  key: string;
  title: string;
  desc: string;
  qs: IpaQuestion[];
}

/** Các phần luyện tập tự động cho một bài */
export function lessonPractice(lesson: IpaLesson, pool: Phoneme[]): PracticeSection[] {
  const ph = lesson.phonemes;
  const seed = lesson.num * 97;
  if (!ph.length) return [];
  const sections: PracticeSection[] = [
    { key: "nghe", title: "Nghe phân biệt", desc: "Máy đọc một từ trong cặp tối thiểu — chọn đúng từ bạn nghe.", qs: listenPairs(ph, seed, 8) },
    { key: "phien-am", title: "Chọn phiên âm", desc: "Nhìn từ, chọn phiên âm IPA đúng (bấm loa để nghe gợi ý).", qs: wordToIpa(ph, seed + 1, 6) },
    { key: "doc", title: "Đọc phiên âm", desc: "Nhìn ký hiệu IPA, đoán từ — kỹ năng tra từ điển.", qs: ipaToWord(ph, seed + 2, 6) },
    { key: "tim-am", title: "Tìm âm", desc: "Chọn từ có chứa âm đang học.", qs: findSound(ph, pool, seed + 3, Math.min(6, ph.length * 2)) },
  ];
  return sections.filter((s) => s.qs.length > 0);
}
