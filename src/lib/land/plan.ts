import type { DayStats } from "@/store/activity-store";
import { DAILY_GOAL } from "./economy";

/** Một mục của "Kế hoạch hôm nay" — tự tính từ hoạt động học thật, không tích tay */
export interface PlanTask {
  id: "xp" | "reviews" | "lessons";
  label: string;
  value: number;
  goal: number;
  unit: string;
  /** Nơi làm mục này */
  href: string;
  cta: string;
  done: boolean;
}

/** Kế hoạch hôm nay (dùng chung cho dải trên vùng đất và trang chủ) */
export function dailyPlan(today: DayStats) {
  const tasks: PlanTask[] = [
    { id: "xp", label: `Đạt ${DAILY_GOAL.xp} XP hôm nay`, value: today.xp, goal: DAILY_GOAL.xp, unit: "XP", href: "/study", cta: "Học tiếp", done: false },
    { id: "reviews", label: `Ôn ${DAILY_GOAL.reviews} thẻ`, value: today.reviews, goal: DAILY_GOAL.reviews, unit: "thẻ", href: "/review", cta: "Ôn ngay", done: false },
    { id: "lessons", label: `Học ${DAILY_GOAL.lessons} bài mới`, value: today.lessons, goal: DAILY_GOAL.lessons, unit: "bài", href: "/study", cta: "Chọn bài", done: false },
  ];
  for (const t of tasks) t.done = t.value >= t.goal;
  return { tasks, done: tasks.filter((t) => t.done).length };
}
