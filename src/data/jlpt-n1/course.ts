import type { N1Lesson, N1LessonMeta } from "./types";
import { bai01 } from "./lessons/bai-01";
import { bai02 } from "./lessons/bai-02";
import { bai03 } from "./lessons/bai-03";
import { bai04 } from "./lessons/bai-04";
import { bai05 } from "./lessons/bai-05";
import { bai06 } from "./lessons/bai-06";
import { bai07 } from "./lessons/bai-07";
import { bai08 } from "./lessons/bai-08";
import { bai09 } from "./lessons/bai-09";
import { bai10 } from "./lessons/bai-10";
import { bai11 } from "./lessons/bai-11";
import { bai12 } from "./lessons/bai-12";
import { bai13 } from "./lessons/bai-13";
import { bai14 } from "./lessons/bai-14";
import { bai15 } from "./lessons/bai-15";
import { bai16 } from "./lessons/bai-16";
import { bai17 } from "./lessons/bai-17";
import { bai18 } from "./lessons/bai-18";
import { bai19 } from "./lessons/bai-19";
import { bai20 } from "./lessons/bai-20";

/** 20 chương ngữ pháp N1 (theo Shinkanzen Master N1 文法), kể thành một câu chuyện liền mạch. */
export const N1_LESSONS: N1Lesson[] = [
  bai01, bai02, bai03, bai04, bai05, bai06, bai07, bai08, bai09, bai10, bai11, bai12, bai13, bai14, bai15, bai16, bai17, bai18, bai19, bai20,
];

export function getN1Lesson(id: string) {
  const i = N1_LESSONS.findIndex((l) => l.id === id);
  if (i < 0) return undefined;
  return { lesson: N1_LESSONS[i], prev: N1_LESSONS[i - 1], next: N1_LESSONS[i + 1] };
}

export function toMeta(l: N1Lesson): N1LessonMeta {
  return {
    id: l.id,
    num: l.num,
    topicJa: l.topicJa,
    topicVi: l.topicVi,
    chapterJa: l.chapterJa,
    chapterVi: l.chapterVi,
    patterns: l.patterns.map((p) => ({ id: p.id, pattern: p.pattern, meaning: p.meaning })),
    quizCount: l.quiz.length + l.patterns.reduce((s, p) => s + p.quiz.length, 0),
  };
}

export function getN1Stats() {
  return {
    lessons: N1_LESSONS.length,
    patterns: N1_LESSONS.reduce((s, l) => s + l.patterns.length, 0),
    questions: N1_LESSONS.reduce((s, l) => s + toMeta(l).quizCount, 0),
  };
}
