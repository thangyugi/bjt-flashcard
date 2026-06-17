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
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: group.themeColor + "15",
              border: `1.5px solid ${group.themeColor}30`,
            }}
          >
            {group.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-gray-900 text-base leading-tight truncate">
                {group.name}
              </h2>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  background: group.themeColor + "12",
                  color: group.themeColor,
                }}
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
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: group.themeColor }}
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
              className="text-xs font-bold px-3 py-2 rounded-lg transition-all hover:bg-gray-50 hover:shadow-sm whitespace-nowrap border border-gray-200 text-gray-700"
            >
              📝 Trắc nghiệm
            </Link>
            <Link
              href={`/study/${group.id}`}
              className="text-xs font-bold px-4 py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-sm whitespace-nowrap"
              style={{ background: group.themeColor, color: "#fff" }}
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
          className="flex gap-4 overflow-x-auto pb-3 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {group.items.map((item, idx) => {
            const p = progress[item.id];
            return (
              <div key={item.id} className="relative flex-shrink-0">
                {/* Status dot */}
                {p?.status === "mastered" && (
                  <div className="absolute top-2 right-2 z-20 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow border-2 border-white">
                    <span className="text-white text-[10px] font-bold leading-none">✓</span>
                  </div>
                )}
                {p?.status === "learning" && (
                  <div className="absolute top-2 right-2 z-20 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow border-2 border-white">
                    <span className="text-white text-[9px] font-bold leading-none">…</span>
                  </div>
                )}
                <FlashCard item={item} index={idx} compact />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
