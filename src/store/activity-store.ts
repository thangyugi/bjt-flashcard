import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Số liệu một ngày học (khớp analytics.daily_stats trên máy chủ). */
export interface DayStats {
  sec: number;
  lessons: number;
  newItems: number;
  reviews: number;
  reviewsOk: number;
  questions: number;
  questionsOk: number;
  xp: number;
  /** Hoạt động theo khóa: course → số lần */
  courses: Record<string, number>;
}

export const emptyDay = (): DayStats => ({
  sec: 0,
  lessons: 0,
  newItems: 0,
  reviews: 0,
  reviewsOk: 0,
  questions: 0,
  questionsOk: 0,
  xp: 0,
  courses: {},
});

/** Ngày theo giờ máy (yyyy-mm-dd) */
export function localDate(d: Date = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

interface ActivityStore {
  /** yyyy-mm-dd → số liệu (giữ 400 ngày gần nhất) */
  days: Record<string, DayStats>;
  /** Ngày có học thật (không tính chỉ mở trang) — để tính chuỗi ngày */
  active: Record<string, true>;
  bump: (date: string, delta: Partial<Omit<DayStats, "courses">> & { course?: string; active?: boolean }) => void;
  /** Gộp số liệu từ máy chủ: lấy giá trị lớn hơn của từng ô (hai nguồn đếm cùng một hoạt động) */
  mergeServer: (rows: ({ local_date: string } & Record<string, unknown>)[]) => void;
}

const KEEP_DAYS = 400;

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      days: {},
      active: {},
      bump: (date, { course, active, ...delta }) =>
        set((s) => {
          const d = { ...(s.days[date] ?? emptyDay()) };
          for (const [k, v] of Object.entries(delta) as [keyof DayStats, number][]) (d[k] as number) += v ?? 0;
          if (course) d.courses = { ...d.courses, [course]: (d.courses[course] ?? 0) + 1 };
          let days = { ...s.days, [date]: d };
          const keys = Object.keys(days).sort();
          if (keys.length > KEEP_DAYS) days = Object.fromEntries(keys.slice(-KEEP_DAYS).map((k) => [k, days[k]]));
          return { days, active: active ? { ...s.active, [date]: true } : s.active };
        }),
      mergeServer: (rows) =>
        set((s) => {
          const days = { ...s.days };
          const act = { ...s.active };
          for (const r of rows) {
            const cur = days[r.local_date] ?? emptyDay();
            const n = (k: string) => Number(r[k] ?? 0);
            days[r.local_date] = {
              sec: Math.max(cur.sec, n("active_seconds")),
              lessons: Math.max(cur.lessons, n("lessons_completed")),
              newItems: Math.max(cur.newItems, n("items_new")),
              reviews: Math.max(cur.reviews, n("reviews")),
              reviewsOk: Math.max(cur.reviewsOk, n("reviews_correct")),
              questions: Math.max(cur.questions, n("questions")),
              questionsOk: Math.max(cur.questionsOk, n("questions_correct")),
              xp: Math.max(cur.xp, n("xp")),
              courses: { ...(r.courses as Record<string, number>), ...cur.courses },
            };
            if (n("lessons_completed") + n("reviews") + n("questions") + n("items_new") > 0) act[r.local_date] = true;
          }
          return { days, active: act };
        }),
    }),
    { name: "learning-activity", version: 1 }
  )
);

/** Chuỗi ngày học liên tiếp tính đến hôm nay (hoặc hôm qua nếu hôm nay chưa học) */
export function computeStreak(active: Record<string, true>, today = new Date()) {
  const day = (offset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    return localDate(d);
  };
  const start = active[day(0)] ? 0 : active[day(1)] ? 1 : -1;
  if (start < 0) return 0;
  let n = 0;
  while (active[day(start + n)]) n++;
  return n;
}

export function longestStreak(active: Record<string, true>) {
  const ds = Object.keys(active).sort();
  let best = 0;
  let run = 0;
  let prev: number | null = null;
  for (const d of ds) {
    const t = Date.parse(`${d}T00:00:00Z`) / 864e5;
    run = prev !== null && t - prev === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = t;
  }
  return best;
}
