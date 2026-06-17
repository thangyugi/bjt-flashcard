"use client";

import { useSearchParams } from "next/navigation";
import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Không tìm thấy dữ liệu từ vựng.</div>
      </div>
    );
  }

  return <QuizRunner items={items} allVocab={allVocab} title={title} />;
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <QuizPageInner />
    </Suspense>
  );
}
