"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react";
import { FlashCardDetail } from "./FlashCardDetail";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { FlashcardProgress, VocabularyGroup } from "@/types/vocabulary";
import { GroupIcon } from "@/components/ui/group-icon";
import { cn } from "@/lib/utils";

interface FlashCardDeckProps {
  group: VocabularyGroup;
}

type Progress = Record<string, FlashcardProgress>;

function countStatus(group: VocabularyGroup, progress: Progress) {
  let mastered = 0;
  let learning = 0;
  for (const it of group.items) {
    const s = progress[it.id]?.status;
    if (s === "mastered") mastered++;
    else if (s === "learning") learning++;
  }
  return { mastered, learning, rest: group.items.length - mastered - learning };
}

/** Thanh tỉ lệ + 3 ô thống kê Đã thuộc / Đang học / Chưa học */
function StatTiles({ mastered, learning, rest, total }: { mastered: number; learning: number; rest: number; total: number }) {
  const tiles = [
    { label: "Đã thuộc", n: mastered, dot: "bg-brand" },
    { label: "Đang học", n: learning, dot: "bg-brand-muted" },
    { label: "Chưa học", n: rest, dot: "border-[1.5px] border-line-strong" },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      <div
        role="img"
        aria-label={`Đã thuộc ${mastered}, đang học ${learning}, chưa học ${rest}`}
        className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-track"
      >
        <div className="h-full bg-brand" style={{ width: `${(mastered / total) * 100}%` }} />
        <div className="h-full bg-brand-muted" style={{ width: `${(learning / total) * 100}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t.label} className="flex flex-col gap-0.5 rounded-xl bg-surface-2 px-3 py-2.5">
            <span className="flex items-center gap-1.5 text-xs whitespace-nowrap text-ink-2">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", t.dot)} />
              {t.label}
            </span>
            <span className="text-xl leading-[1.3] font-extrabold text-ink">{t.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Lưới số thứ tự từ vựng */
function WordGrid({
  group,
  progress,
  current,
  onPick,
  className,
  cellClass,
}: {
  group: VocabularyGroup;
  progress: Progress;
  current: number;
  onPick: (i: number) => void;
  className?: string;
  cellClass?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      {group.items.map((item, idx) => {
        const s = progress[item.id]?.status;
        const isCurrent = idx === current;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(idx)}
            title={item.kanji}
            aria-label={`Từ ${idx + 1}: ${item.kanji}${s === "mastered" ? " (đã thuộc)" : s === "learning" ? " (đang học)" : ""}`}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "h-10 rounded-[9px] border text-[13px] font-bold transition-transform hover:scale-[1.06]",
              s === "mastered"
                ? "border-brand bg-brand text-white"
                : s === "learning"
                  ? "border-brand-muted bg-brand-soft text-brand-soft-ink"
                  : "border-line bg-surface text-ink-2",
              isCurrent && "ring-2 ring-ink ring-offset-2 ring-offset-paper",
              cellClass
            )}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
}

export function FlashCardDeck({ group }: FlashCardDeckProps) {
  const {
    currentCardIndex,
    setCurrentGroup,
    setCurrentCardIndex,
    flippedCards,
    toggleFlip,
    updateProgress,
    progress,
  } = useFlashcardStore();
  const [listOpen, setListOpen] = useState(false);

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
      if (listOpen) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") {
        e.preventDefault();
        if (current) toggleFlip(current.id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNext, handlePrev, current, toggleFlip, listOpen]);

  if (!current) return null;

  const isFlipped = flippedCards.has(current.id);
  const positionPct = ((currentCardIndex + 1) / total) * 100;
  const counts = countStatus(group, progress);
  const pick = (i: number) => {
    setCurrentCardIndex(i);
    setListOpen(false);
  };

  const navBtn =
    "flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-surface text-[15px] font-semibold text-ink transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 lg:h-11 lg:px-5 lg:text-sm";

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col md:gap-4 md:px-8 md:py-5 lg:h-[calc(100dvh-4rem)] lg:flex-row lg:gap-8 lg:py-7">
      {/* ── Mobile: thanh trên cùng ── */}
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-line bg-paper/95 px-2 backdrop-blur md:hidden">
        <Link href="/study" aria-label="Quay lại" className="flex h-11 w-11 items-center justify-center rounded-xl text-ink">
          <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.2} />
        </Link>
        <div className="flex min-w-0 flex-col items-center">
          <h1 className="truncate text-[15px] font-bold text-ink">{group.name}</h1>
          <span className="text-xs text-ink-3">
            Từ {currentCardIndex + 1} / {total}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setListOpen(true)}
          aria-label="Danh sách từ vựng"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-ink"
        >
          <LayoutGrid className="h-[21px] w-[21px]" />
        </button>
      </header>

      {/* ── Desktop: cột danh sách bên trái ── */}
      <aside
        aria-label="Danh sách từ vựng"
        className="hidden min-h-0 w-[336px] shrink-0 flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-5 lg:flex"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-ink">Danh sách từ vựng</h2>
          <span className="text-[13px] font-medium text-ink-3">
            {currentCardIndex + 1}/{total}
          </span>
        </div>
        <StatTiles {...counts} total={total} />
        <div className="h-px shrink-0 bg-line" />
        <div className="-mx-1.5 min-h-0 flex-1 overflow-y-auto px-1.5 pt-1 pb-2">
          <WordGrid group={group} progress={progress} current={currentCardIndex} onPick={pick} className="grid-cols-6" />
        </div>
      </aside>

      {/* ── Khu vực thẻ ── */}
      <section className="flex min-w-0 flex-1 flex-col items-center gap-3 px-4 pt-3 pb-4 md:gap-4 md:p-0">
        <div className="hidden w-full max-w-[880px] items-center justify-between md:flex">
          <Link
            href="/study"
            className="flex h-10 items-center gap-1.5 rounded-[10px] pr-3.5 pl-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
            Quay lại
          </Link>
          <div className="flex min-w-0 items-center gap-3">
            <GroupIcon groupId={group.id} size="sm" />
            <h1 className="truncate text-lg font-bold text-ink">{group.name}</h1>
            {group.nameJa && <span className="hidden font-jp text-sm text-ink-3 lg:inline">{group.nameJa}</span>}
          </div>
          <span className="min-w-[80px] text-right text-[15px] font-bold text-ink">
            {currentCardIndex + 1} <span className="font-medium text-ink-3">/ {total}</span>
          </span>
        </div>

        <div
          role="progressbar"
          aria-label="Vị trí trong nhóm"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={currentCardIndex + 1}
          className="h-[5px] w-full max-w-[880px] shrink-0 overflow-hidden rounded-full bg-track md:h-1.5"
        >
          <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${positionPct}%` }} />
        </div>

        <FlashCardDetail
          key={current.id}
          item={current}
          variant="deck"
          isFlipped={isFlipped}
          onFlip={() => toggleFlip(current.id)}
          onShowSide={(back) => {
            if (back !== isFlipped) toggleFlip(current.id);
          }}
          status={progress[current.id]?.status}
          onStatusChange={(status) => {
            updateProgress(current.id, status);
            handleNext();
          }}
          className="h-[520px] max-w-[880px] rounded-[20px] md:h-[580px] md:rounded-3xl lg:h-[560px] lg:shrink-0"
        />

        <div className="grid w-full max-w-[880px] grid-cols-2 gap-2.5 md:gap-3 lg:flex lg:items-center lg:justify-between">
          <div className="contents lg:flex lg:gap-2.5">
            <button type="button" onClick={handlePrev} disabled={currentCardIndex === 0} className={navBtn}>
              <ChevronLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              <span className="lg:hidden">Từ trước</span>
              <span className="hidden lg:inline">Trước</span>
            </button>
            <button type="button" onClick={handleNext} disabled={currentCardIndex === total - 1} className={navBtn}>
              <span className="lg:hidden">Từ tiếp</span>
              <span className="hidden lg:inline">Tiếp</span>
              <ChevronRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </button>
          </div>
          <div className="hidden items-center gap-3.5 text-[12.5px] text-ink-3 lg:flex">
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">←</kbd>
              <kbd className="kbd">→</kbd> chuyển thẻ
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="kbd">Space</kbd> lật thẻ
            </span>
          </div>
        </div>

        {/* ── Tablet: danh sách bên dưới thẻ ── */}
        <section
          aria-label="Danh sách từ vựng"
          className="hidden w-full flex-col gap-3 rounded-[20px] border border-line bg-surface px-[18px] py-4 md:flex lg:hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[15px] font-bold text-ink">Danh sách từ vựng</h2>
            <div className="flex gap-1.5">
              {[
                { label: "Đã thuộc", n: counts.mastered, dot: "bg-brand" },
                { label: "Đang học", n: counts.learning, dot: "bg-brand-muted" },
                { label: "Chưa học", n: counts.rest, dot: "border-[1.5px] border-line-strong" },
              ].map((c) => (
                <span key={c.label} className="flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-[5px] text-[12.5px] text-ink-2">
                  <span className={cn("h-2 w-2 rounded-full", c.dot)} />
                  {c.label} <b className="text-ink">{c.n}</b>
                </span>
              ))}
            </div>
          </div>
          <div className="-mx-1.5 max-h-[260px] overflow-y-auto px-1.5 pt-1 pb-1.5">
            <WordGrid group={group} progress={progress} current={currentCardIndex} onPick={pick} className="grid-cols-12" cellClass="h-11" />
          </div>
        </section>
      </section>

      {/* ── Mobile: bottom sheet danh sách ── */}
      {listOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end md:hidden" role="dialog" aria-modal="true" aria-label="Danh sách từ vựng">
          <button
            type="button"
            aria-label="Đóng danh sách"
            onClick={() => setListOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/40 animate-in fade-in duration-200"
          />
          <div className="relative flex h-[75dvh] flex-col gap-3.5 rounded-t-3xl bg-surface px-4 pb-[max(env(safe-area-inset-bottom),24px)] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex h-5 shrink-0 items-center justify-center" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-line-strong" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-extrabold text-ink">Danh sách từ vựng</h2>
              <button
                type="button"
                onClick={() => setListOpen(false)}
                aria-label="Đóng"
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-ink-2"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>
            </div>
            <StatTiles {...counts} total={total} />
            <div className="-mx-1.5 min-h-0 flex-1 overflow-y-auto px-1.5 pt-1 pb-1.5">
              <WordGrid group={group} progress={progress} current={currentCardIndex} onPick={pick} className="grid-cols-6" cellClass="h-[46px] text-sm rounded-[10px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
