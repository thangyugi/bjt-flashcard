"use client";

import { useMemo, useState } from "react";
import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyGroup, VocabularyItem } from "@/types/vocabulary";

/** "Từ của hôm nay": cố định theo ngày, chọn trong các từ có câu ví dụ */
export function useWordOfDay(): { item: VocabularyItem; group: VocabularyGroup } | undefined {
  const { data: groups } = useAllVocabularyGroups();
  // Số thứ tự ngày, chốt một lần khi mở trang
  const [day] = useState(() => Math.floor(Date.now() / 86_400_000));
  return useMemo(() => {
    const pool = groups?.flatMap((g) => g.items.filter((i) => i.exampleSentence).map((item) => ({ item, group: g }))) ?? [];
    if (!pool.length) return undefined;
    return pool[day % pool.length];
  }, [groups, day]);
}

/** Nhóm từ vựng học gần nhất → "Học tiếp" của khóa BJT */
export function useContinueGroup(): VocabularyGroup | undefined {
  const { data: groups } = useAllVocabularyGroups();
  const progress = useFlashcardStore((s) => s.progress);
  return useMemo(() => {
    let best: { group: VocabularyGroup; at: string } | undefined;
    for (const g of groups ?? []) {
      for (const it of g.items) {
        const at = progress[it.id]?.lastReviewedAt;
        if (at && (!best || at > best.at)) best = { group: g, at };
      }
    }
    return best?.group;
  }, [groups, progress]);
}
