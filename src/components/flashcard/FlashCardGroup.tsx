"use client";

import Link from "next/link";
import { FlashCard } from "./FlashCard";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyGroup } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface FlashCardGroupProps {
  group: VocabularyGroup;
  className?: string;
}

export function FlashCardGroup({ group, className }: FlashCardGroupProps) {
  const { progress } = useFlashcardStore();

  const masteredCount = group.items.filter(
    (item) => progress[item.id]?.status === "mastered"
  ).length;
  const progressPct = Math.round((masteredCount / group.items.length) * 100);

  return (
    <section className={cn("", className)}>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-white border border-zinc-200 shadow-sm text-zinc-700"
          >
            {group.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
                {group.name}
              </h2>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0 bg-zinc-100 text-zinc-600 border border-zinc-200/50"
              >
                {group.sourceType === "BJT" ? "BJT" : "JLPT N1"}
              </span>
            </div>
            {group.nameJa && (
              <p className="text-gray-500 text-xs mt-0.5">{group.nameJa}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-16 h-1.5 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
              <div
                className="h-full bg-zinc-900 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              {masteredCount}/{group.items.length}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/quiz?groupId=${group.id}`}
              className="text-xs font-semibold px-3 py-2 rounded-lg transition-all hover:bg-blue-100 hover:shadow-sm whitespace-nowrap border border-blue-200 text-blue-700 bg-blue-50"
            >
              📝 Trắc nghiệm
            </Link>
            <Link
              href={`/study/${group.id}`}
              className="text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-sm whitespace-nowrap bg-zinc-900 text-white"
            >
              Học ngay →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Horizontal scroll ── */}
      <div className="relative">
        {/* Right fade mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f7f8fc] to-transparent z-10" />

        <div
          className="flex gap-4 overflow-x-auto pb-4 pt-3 px-1 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {group.items.map((item, idx) => {
            const p = progress[item.id];
            return (
              <div key={item.id} className="relative flex-shrink-0">
                <FlashCard item={item} index={idx} compact />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
