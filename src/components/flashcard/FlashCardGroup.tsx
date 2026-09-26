"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlashCard } from "./FlashCard";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyGroup } from "@/types/vocabulary";
import { GroupIcon } from "@/components/ui/group-icon";
import { cn } from "@/lib/utils";

interface FlashCardGroupProps {
  group: VocabularyGroup;
  className?: string;
}

export function FlashCardGroup({ group, className }: FlashCardGroupProps) {
  const { progress } = useFlashcardStore();

  const masteredCount = group.items.filter((item) => progress[item.id]?.status === "mastered").length;
  const progressPct = group.items.length ? Math.round((masteredCount / group.items.length) * 100) : 0;

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3.5">
          <GroupIcon groupId={group.id} />
          <div className="flex min-w-0 flex-col gap-[3px]">
            <div className="flex items-center gap-2.5">
              <h3 className="truncate text-lg font-bold text-ink">{group.name}</h3>
              <span className="shrink-0 rounded-md border border-line px-2 py-[3px] text-[11px] font-bold text-ink-2">
                {group.sourceType === "BJT" ? "BJT" : "JLPT N1"}
              </span>
            </div>
            <span className="text-[13px] text-ink-3">
              {group.nameJa && <span className="font-jp">{group.nameJa} · </span>}
              {group.items.length} từ
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-2.5 sm:flex">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-track">
              <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-[13px] font-semibold whitespace-nowrap text-ink-2">
              {masteredCount}/{group.items.length}
            </span>
          </div>
          <Link
            href={`/quiz?groupId=${group.id}`}
            className="flex h-10 items-center rounded-[10px] border border-line-strong bg-surface px-4 text-[13px] font-semibold whitespace-nowrap text-ink transition-colors hover:bg-surface-2"
          >
            Trắc nghiệm
          </Link>
          <Link
            href={`/study/${group.id}`}
            className="flex h-10 items-center gap-1.5 rounded-[10px] bg-brand px-4 text-[13px] font-bold whitespace-nowrap text-white transition-colors hover:bg-brand-hover"
          >
            Học ngay
            <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.4} aria-hidden />
          </Link>
        </div>
      </div>

      {/* ── Hàng thẻ cuộn ngang ── */}
      <div className="relative">
        <div className="fade-right pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 sm:w-[72px]" />
        <div className="scrollbar-none -mx-1 flex gap-4 overflow-x-auto px-1 pt-1 pb-3">
          {group.items.map((item, idx) => (
            <FlashCard key={item.id} item={item} index={idx} total={group.items.length} groupName={group.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
