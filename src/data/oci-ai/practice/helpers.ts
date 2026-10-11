import type { LessonPractice, PracticeQuestion } from "../types";

type Opt = [text: string, note: string];

/**
 * Tạo một câu hỏi. Đáp án ĐÚNG luôn là `ok` (đứng đầu khi soạn) —
 * giao diện sẽ xáo trộn thứ tự khi hiển thị.
 */
export const q = (en: string, vi: string, ok: Opt, wrong: Opt[], tip?: string): Omit<PracticeQuestion, "id"> => ({
  q: en,
  vi,
  opts: [{ t: ok[0], n: ok[1], ok: true }, ...wrong.map(([t, n]) => ({ t, n }))],
  tip,
});

/** Gom các câu hỏi của một bài, tự đánh số id: m1-l1-01, m1-l1-02… */
export const bank = (lessonId: string, tips: string[], qs: Omit<PracticeQuestion, "id">[]): LessonPractice => ({
  lessonId,
  tips,
  qs: qs.map((x, i) => ({ ...x, id: `${lessonId}-${String(i + 1).padStart(2, "0")}`, lessonId })),
});

/** Câu hỏi đề thi: thêm chủ đề */
export const eq = (domain: string, en: string, vi: string, ok: Opt, wrong: Opt[], tip?: string): Omit<PracticeQuestion, "id"> => ({
  ...q(en, vi, ok, wrong, tip),
  domain,
});
