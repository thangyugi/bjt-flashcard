import type { N1Lesson, N1LessonMeta } from "./types";
import { bai01 } from "./lessons/bai-01";

/** 20 chương ngữ pháp N1 (theo Shinkanzen Master N1 文法), kể thành một câu chuyện liền mạch. */
export const N1_LESSONS: N1Lesson[] = [bai01];

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
