import type { IpaLesson, Phoneme } from "./types";
import { ipa02 } from "./lessons/ipa-02";

/** Các bài IPA theo thứ tự học. Thêm bài mới: import và thêm vào mảng. */
export const IPA_LESSONS: IpaLesson[] = [ipa02].sort((a, b) => a.num - b.num);

export function getIpaLesson(id: string) {
  const i = IPA_LESSONS.findIndex((l) => l.id === id);
  if (i < 0) return undefined;
  return { lesson: IPA_LESSONS[i], prev: IPA_LESSONS[i - 1], next: IPA_LESSONS[i + 1] };
}

export interface PhonemeRef extends Phoneme {
  lessonId: string;
  lessonNum: number;
  level: IpaLesson["level"];
}

/** Mọi âm đã có bài, kèm bài chứa nó */
export const ALL_PHONEMES: PhonemeRef[] = IPA_LESSONS.flatMap((l) =>
  l.phonemes.map((p) => ({ ...p, lessonId: l.id, lessonNum: l.num, level: l.level }))
);

export function phonemeBySymbol(symbol: string) {
  return ALL_PHONEMES.find((p) => p.symbol === symbol);
}

export const ipaStats = () => ({
  lessons: IPA_LESSONS.length,
  phonemes: ALL_PHONEMES.length,
  words: ALL_PHONEMES.reduce((n, p) => n + p.words.length, 0),
});
