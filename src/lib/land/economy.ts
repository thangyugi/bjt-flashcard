import type { DayStats } from "@/store/activity-store";

/*
 * Kinh tế Tinh thể của vùng đất — QUY TẮC TẠM, tính hoàn toàn trên máy từ hoạt động học thật (activity-store).
 * Sau này kinh tế phía máy chủ (schema engagement: sổ cái XP / phần thưởng) sẽ thay thế toàn bộ file này;
 * mọi nơi khác chỉ gọi các hàm dưới đây, nên chỉ cần sửa ở một chỗ.
 *
 *   Tinh thể đã nhận = 100 (quà chào mừng, một lần) + ⌊tổng XP / 10⌋
 *   Số dư            = đã nhận − đã tiêu (land-store)
 */

/** Quà chào mừng: đủ gieo một cây ngay lần đầu mở vùng đất */
export const WELCOME_GIFT = 100;
/** Cứ 10 XP học được = 1 Tinh thể */
export const XP_PER_CRYSTAL = 10;

/** Mục tiêu mặc định của "Kế hoạch hôm nay" */
export const DAILY_GOAL = { xp: 30, reviews: 20, lessons: 1 };

export const totalXp = (days: Record<string, DayStats>) => Object.values(days).reduce((n, d) => n + (d.xp || 0), 0);

export function crystalsEarned(days: Record<string, DayStats>) {
  return WELCOME_GIFT + Math.floor(totalXp(days) / XP_PER_CRYSTAL);
}

export function crystalBalance(days: Record<string, DayStats>, spent: number) {
  return Math.max(0, crystalsEarned(days) - spent);
}
