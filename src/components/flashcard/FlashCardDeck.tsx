"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FlashCard } from "./FlashCard";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyGroup } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface FlashCardDeckProps {
  group: VocabularyGroup;
}

export function FlashCardDeck({ group }: FlashCardDeckProps) {
  const router = useRouter();
  const {
    currentCardIndex,
    setCurrentGroup,
    setCurrentCardIndex,
    flippedCards,
    toggleFlip,
    updateProgress,
    progress,
  } = useFlashcardStore();

  const items = group.items;
  const total = items.length;
  const current = items[currentCardIndex];

  useEffect(() => {
    setCurrentGroup(group.id);
  }, [group.id, setCurrentGroup]);

  const handleNext = useCallback(() => {
    if (currentCardIndex < total - 1) setCurrentCardIndex(currentCardIndex + 1);
  }, [currentCardIndex, total, setCurrentCardIndex]);

  const handlePrev = useCallback(() => {
    if (currentCardIndex > 0) setCurrentCardIndex(currentCardIndex - 1);
  }, [currentCardIndex, setCurrentCardIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") { e.preventDefault(); if (current) toggleFlip(current.id); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNext, handlePrev, current, toggleFlip]);

  const isFlipped = current ? flippedCards.has(current.id) : false;
  const progressPct = Math.round(((currentCardIndex + 1) / total) * 100);

  if (!current) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start w-full max-w-6xl mx-auto lg:h-full lg:overflow-hidden pb-10 lg:pb-0">
      {/* Left Column: Grid nav */}
      <div className="w-full lg:w-80 shrink-0 order-2 lg:order-1 lg:h-full max-h-[400px] lg:max-h-full flex flex-col min-h-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex-1 flex flex-col overflow-hidden min-h-0">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex justify-between items-center shrink-0">
            <span>Danh sách từ vựng</span>
            <span className="text-xs font-normal text-gray-400">
              {currentCardIndex + 1}/{total}
            </span>
          </h3>
          <div className="grid grid-cols-6 gap-2 overflow-y-auto scrollbar-none content-start flex-1 min-h-0 pb-2 pr-1">
            {items.map((item, idx) => {
              const isCurrent = idx === currentCardIndex;
              const itemProgress = progress[item.id];
              const status = itemProgress?.status;
              
              let bgClass = "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50";
              
              if (status === "mastered") {
                bgClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
              } else if (status === "learning") {
                bgClass = "bg-amber-100 text-amber-700 border border-amber-200";
              }
              
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentCardIndex(idx)}
                  className={cn(
                    "aspect-square w-full rounded-lg text-sm font-bold flex items-center justify-center transition-all",
                    isCurrent ? "ring-2 ring-indigo-500 ring-offset-1" : "",
                    bgClass
                  )}
                  title={item.kanji}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Main Card Area */}
      <div className="flex-1 w-full max-w-xl mx-auto order-1 lg:order-2 flex flex-col items-center gap-5 lg:h-full lg:overflow-y-auto scrollbar-none lg:pb-6 px-1 shrink-0">
        {/* Back nav + counter */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            ← Quay lại
          </button>
          <span className="text-sm font-semibold text-gray-500">
            {currentCardIndex + 1}
            <span className="text-gray-300 mx-1">/</span>
            {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-400"
            style={{ width: `${progressPct}%`, background: group.themeColor }}
          />
        </div>

        {/* Group label */}
        <div className="flex items-center gap-2">
          <span className="text-xl">{group.icon}</span>
          <span className="font-bold text-gray-800 text-base">{group.name}</span>
          {group.nameJa && (
            <span className="text-gray-400 text-sm">{group.nameJa}</span>
          )}
        </div>

        {/* Card */}
        <FlashCard 
          key={current.id}
          item={current} 
          index={currentCardIndex} 
          compact={false} 
          onStatusChange={(status) => {
            updateProgress(current.id, status);
            handleNext();
          }}
        />

        {/* Action row */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className="px-5 py-2.5 text-sm font-semibold rounded-full border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            ← Trước
          </button>

          <button
            onClick={handleNext}
            disabled={currentCardIndex === total - 1}
            className="px-5 py-2.5 text-sm font-semibold rounded-full border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Tiếp →
          </button>
        </div>

        <p className="text-xs text-gray-300 mt-2">← → chuyển card &nbsp;•&nbsp; Space lật card</p>
      </div>
    </div>
  );
}
