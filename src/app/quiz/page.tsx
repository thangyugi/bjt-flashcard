"use client";

import { useSearchParams } from "next/navigation";
import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { QuizSkeleton } from "@/components/layout/Skeletons";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { useMemo, Suspense } from "react";
import type { VocabularyItem } from "@/types/vocabulary";

function QuizPageInner() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  
  const { data: groups, isLoading } = useAllVocabularyGroups();

  const { items, allVocab, title } = useMemo(() => {
    if (!groups) return { items: [], allVocab: [], title: "" };

    const allVocab: VocabularyItem[] = groups.flatMap(g => g.items);

    if (groupId && groupId !== "all") {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        return {
          items: group.items,
          allVocab,
          title: `Trắc nghiệm: ${group.name}`
        };
      }
    }

    return {
      items: allVocab,
      allVocab,
      title: "Trắc nghiệm tổng hợp"
    };
  }, [groups, groupId]);

  if (isLoading) {
    return (
      <QuizSkeleton />
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-ink-3">Không tìm thấy dữ liệu từ vựng.</div>
      </div>
    );
  }

  return <QuizRunner items={items} allVocab={allVocab} title={title} />;
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <QuizSkeleton />
    }>
      <QuizPageInner />
    </Suspense>
  );
}
