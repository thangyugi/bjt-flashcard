import type { IpaLesson, Phoneme } from "./types";
import { ipa01 } from "./lessons/ipa-01";
import { ipa02 } from "./lessons/ipa-02";
import { ipa03 } from "./lessons/ipa-03";
import { ipa04 } from "./lessons/ipa-04";
import { ipa05 } from "./lessons/ipa-05";
import { ipa06 } from "./lessons/ipa-06";
import { ipa07 } from "./lessons/ipa-07";
import { ipa08 } from "./lessons/ipa-08";
import { ipa09 } from "./lessons/ipa-09";
import { ipa10 } from "./lessons/ipa-10";
import { ipa11 } from "./lessons/ipa-11";
import { ipa12 } from "./lessons/ipa-12";
import { ipa13 } from "./lessons/ipa-13";
import { ipa14 } from "./lessons/ipa-14";
import { ipa15 } from "./lessons/ipa-15";
import { ipa16 } from "./lessons/ipa-16";
import { ipa17 } from "./lessons/ipa-17";
import { ipa18 } from "./lessons/ipa-18";
import { ipa19 } from "./lessons/ipa-19";
import { ipa20 } from "./lessons/ipa-20";

/** Các bài IPA theo thứ tự học. Thêm bài mới: import và thêm vào mảng. */
export const IPA_LESSONS: IpaLesson[] = [ipa01, ipa02, ipa03, ipa04, ipa05, ipa06, ipa07, ipa08, ipa09, ipa10, ipa11, ipa12, ipa13, ipa14, ipa15, ipa16, ipa17, ipa18, ipa19, ipa20].sort((a, b) => a.num - b.num);

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
