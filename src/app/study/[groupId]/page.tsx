"use client";

import { use } from "react";
import { useVocabularyGroup } from "@/hooks/useVocabulary";
import { FlashCardDeck } from "@/components/flashcard/FlashCardDeck";
import Link from "next/link";

interface PageProps {
  params: Promise<{ groupId: string }>;
}

export default function StudyGroupPage({ params }: PageProps) {
  const { groupId } = use(params);
  const { data: group, isLoading, error } = useVocabularyGroup(groupId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">Đang tải flashcard...</p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-4xl">😕</div>
        <p className="text-gray-500 font-medium">Không tìm thấy nhóm từ vựng này</p>
        <Link
          href="/study"
          className="px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-all text-sm font-medium"
        >
          ← Quay lại chọn nhóm
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col items-center justify-center px-4 py-6 bg-gray-50 overflow-hidden">
      <FlashCardDeck group={group} />
    </div>
  );
}
