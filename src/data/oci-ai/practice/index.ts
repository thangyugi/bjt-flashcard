/** Ngân hàng câu hỏi luyện tập theo từng bài — chỉ import từ Server Component / route handler. */
import type { LessonPractice } from "../types";
import { p1 } from "./p1";
import { p2 } from "./p2";
import { p3 } from "./p3";
import { p4 } from "./p4";
import { p5a } from "./p5a";
import { p5b } from "./p5b";
import { p6 } from "./p6";
import { p7 } from "./p7";
import { p8 } from "./p8";
import { EXTRA } from "./extra";

const BASE: LessonPractice[] = [...p1, ...p2, ...p3, ...p4, ...p5a, ...p5b, ...p6, ...p7, ...p8];

/** Gộp câu bổ sung, tiếp tục đánh số id sau câu cuối của mỗi bài. */
export const PRACTICE: LessonPractice[] = BASE.map((b) => {
  const extra = EXTRA[b.lessonId] ?? [];
  return {
    ...b,
    qs: [
      ...b.qs,
      ...extra.map((x, i) => ({ ...x, id: `${b.lessonId}-${String(b.qs.length + i + 1).padStart(2, "0")}`, lessonId: b.lessonId })),
    ],
  };
});

export const practiceByLesson = new Map(PRACTICE.map((p) => [p.lessonId, p]));
