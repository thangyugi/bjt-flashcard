/** Ngân hàng câu hỏi luyện tập theo từng bài — chỉ import từ Server Component / route handler. */
import type { LessonPractice } from "../types";
import { p1 } from "./p1";
import { p2 } from "./p2";
import { p3 } from "./p3";
import { p4 } from "./p4";

export const PRACTICE: LessonPractice[] = [...p1, ...p2, ...p3, ...p4];

export const practiceByLesson = new Map(PRACTICE.map((p) => [p.lessonId, p]));
