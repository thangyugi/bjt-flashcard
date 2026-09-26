"use client";

import { use } from "react";
import { useVocabularyGroup } from "@/hooks/useVocabulary";
import { FlashCardDeck } from "@/components/flashcard/FlashCardDeck";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

interface PageProps {
  params: Promise<{ groupId: string }>;
}

export default function StudyGroupPage({ params }: PageProps) {
  const { groupId } = use(params);
  const { data: group, isLoading, error } = useVocabularyGroup(groupId);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-brand-soft border-t-brand" />
          <p className="text-sm text-ink-3">Đang tải flashcard...</p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <SearchX className="h-10 w-10 text-ink-3" aria-hidden />
        <p className="font-medium text-ink-2">Không tìm thấy nhóm từ vựng này</p>
        <Link
          href="/study"
          className="flex items-center gap-1.5 rounded-xl border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại chọn nhóm
        </Link>
      </div>
    );
  }

  return <FlashCardDeck group={group} />;
}
