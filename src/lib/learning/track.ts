/**
 * Ghi một hoạt động học: thêm sự kiện vào hàng chờ đồng bộ + cộng số liệu ngày trên máy.
 * Quy tắc XP / chuỗi ngày giống analytics.bump_daily trên máy chủ, nên hai bên khớp nhau.
 */
import { localDate, useActivityStore } from "@/store/activity-store";
import { uuidv7, useOutbox, type LearningEvent, type Verb } from "./events";

/** Tắt ghi khi đang gộp dữ liệu từ máy chủ vào máy (tránh gửi ngược lại) */
let muted = 0;
export async function withoutTracking<T>(fn: () => T | Promise<T>): Promise<T> {
  muted++;
  try {
    return await fn();
  } finally {
    muted--;
  }
}
export const trackingMuted = () => muted > 0;

export function track(verb: Verb, object: string | undefined, data: Record<string, unknown> = {}, at = new Date()) {
  if (muted) return;
  const e: LearningEvent = { id: uuidv7(at.getTime()), verb, object, at: at.toISOString(), data };
  useOutbox.getState().add(e);
  applyLocal(e, at);
}

/** Cộng số liệu ngày cho một sự kiện */
export function applyLocal(e: LearningEvent, at = new Date(e.at)) {
  const day = localDate(at);
  const course = e.data.course as string | undefined;
  const bump = useActivityStore.getState().bump;
  const d = e.data;
  switch (e.verb) {
    case "lesson.completed":
      return bump(day, { lessons: 1, xp: 20, course, active: true });
    case "lesson.opened":
      return bump(day, { course });
    case "quiz.submitted": {
      const score = Number(d.score ?? 0);
      const total = Number(d.total ?? 0);
      if (!total) return;
      return bump(day, { questions: total, questionsOk: score, xp: Math.round((10 * score) / total), course, active: true });
    }
    case "card.enrolled":
      return bump(day, { newItems: 1, course, active: true });
    case "card.reviewed": {
      const r = Number(d.rating);
      return bump(day, { reviews: 1, reviewsOk: r > 1 ? 1 : 0, xp: r >= 3 ? 2 : 1, course, active: true });
    }
    case "item.marked":
      return bump(day, { reviews: 1, reviewsOk: d.status === "known" ? 1 : 0, xp: d.status === "known" ? 1 : 0, course, active: true });
    case "time.spent":
      return bump(day, { sec: Number(d.seconds ?? 0) });
  }
}
