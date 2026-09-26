"use client";

import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { useFlashcardStore } from "@/store/flashcard-store";
import { GroupIcon } from "@/components/ui/group-icon";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function StudyIndexPage() {
  const { data: groups, isLoading } = useAllVocabularyGroups();
  const { progress } = useFlashcardStore();

  return (
    <div className="mx-auto max-w-[960px] space-y-8 px-4 py-6 sm:px-8 sm:py-10">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink">Chọn nhóm để học</h1>
        <p className="mt-1 text-sm text-ink-3">Học tập trung theo từng nhóm chủ đề</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-[92px] rounded-[18px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {groups?.map((group) => {
            const done = group.items.filter((i) => progress[i.id]?.status === "mastered").length;
            const pct = group.items.length ? Math.round((done / group.items.length) * 100) : 0;
            return (
              <Link
                key={group.id}
                href={`/study/${group.id}`}
                className="group flex items-center gap-4 rounded-[18px] border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_2px_4px_rgba(28,25,23,0.04),0_12px_28px_rgba(28,25,23,0.07)]"
              >
                <GroupIcon groupId={group.id} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[15px] font-bold text-ink">{group.name}</p>
                    <span className="rounded-md border border-line px-2 py-0.5 text-[10px] font-bold text-ink-2">
                      {group.sourceType === "JLPT" ? "JLPT N1" : group.sourceType}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-ink-3">
                    {group.nameJa && <span className="font-jp">{group.nameJa} · </span>}
                    {group.items.length} từ vựng
                  </p>
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-track">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-ink-2">
                      {done}/{group.items.length}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
