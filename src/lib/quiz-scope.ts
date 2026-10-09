import type { FlashcardProgress, VocabularyGroup, VocabularyItem } from "@/types/vocabulary";

/**
 * Phạm vi làm trắc nghiệm:
 * - "all": toàn bộ từ vựng
 * - "review": danh sách từ cần ôn (từ làm sai)
 * - "status:new" | "status:learning" | "status:mastered": theo trạng thái học
 * - "group:<id>": một nhóm chủ đề
 */
export type ScopeKey =
  | "all"
  | "review"
  | "status:new"
  | "status:learning"
  | "status:mastered"
  | `group:${string}`;

export function resolveScope(
  scope: ScopeKey,
  groups: VocabularyGroup[],
  progress: Record<string, FlashcardProgress>,
  reviewIds: string[]
): { label: string; items: VocabularyItem[] } {
  const all = groups.flatMap((g) => g.items);
  const status = (i: VocabularyItem) => progress[i.id]?.status;
  switch (scope) {
    case "all":
      return { label: "Tổng hợp toàn bộ", items: all };
    case "review": {
      const ids = new Set(reviewIds);
      return { label: "Từ cần ôn lại", items: all.filter((i) => ids.has(i.id)) };
    }
    case "status:new":
      return { label: "Từ chưa học", items: all.filter((i) => !status(i) || status(i) === "new") };
    case "status:learning":
      return { label: "Từ đang học", items: all.filter((i) => status(i) === "learning" || status(i) === "review") };
    case "status:mastered":
      return { label: "Từ đã thuộc", items: all.filter((i) => status(i) === "mastered") };
    default: {
      const g = groups.find((x) => `group:${x.id}` === scope);
      return g ? { label: g.name, items: g.items } : { label: "Tổng hợp toàn bộ", items: all };
    }
  }
}
