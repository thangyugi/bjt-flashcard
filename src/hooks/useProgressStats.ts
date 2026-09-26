import { useFlashcardStore } from "@/store/flashcard-store";
import { useVocabularyStats } from "@/hooks/useVocabulary";

/** Tổng hợp tiến độ học toàn bộ từ vựng (dùng cho Header, trang chủ). */
export function useProgressStats() {
  const { progress } = useFlashcardStore();
  const { data: stats } = useVocabularyStats();

  const values = Object.values(progress);
  const mastered = values.filter((p) => p.status === "mastered").length;
  const learning = values.filter((p) => p.status === "learning").length;
  const total = stats?.totalItems ?? 0;
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;

  return { mastered, learning, total, pct, stats };
}
