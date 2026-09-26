"use client";

import { useState, type KeyboardEvent } from "react";
import { Maximize2, RotateCcw } from "lucide-react";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyItem } from "@/types/vocabulary";
import { Furigana } from "@/components/ui/furigana";
import { posLabel, readingOf } from "@/lib/vocab-labels";
import { cn } from "@/lib/utils";
import { FlashCardModal } from "./FlashCardModal";

interface FlashCardProps {
  item: VocabularyItem;
  index?: number;
  total?: number;
  groupName?: string;
}

function kanjiSize(text: string) {
  const n = text.length;
  if (n <= 2) return "text-[44px]";
  if (n <= 3) return "text-[38px]";
  if (n <= 4) return "text-[34px]";
  if (n <= 6) return "text-[26px]";
  return "text-[21px]";
}

/**
 * Thẻ nhỏ trên trang chủ.
 * - Chạm vào thân thẻ → lật mặt trước / mặt sau
 * - Nút "Mở rộng" ở đáy → mở thẻ lớn (modal)
 */
export function FlashCard({ item, index, total, groupName }: FlashCardProps) {
  const { flippedCards, toggleFlip, progress } = useFlashcardStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const isFlipped = flippedCards.has(item.id);
  const status = progress[item.id]?.status;
  const reading = readingOf(item);
  const pos = posLabel(item.partOfSpeech);

  const statusLabel = status === "mastered" ? "Đã thuộc" : status === "learning" ? "Đang học" : "Chưa học";
  const dot = (
    <span
      title={statusLabel}
      aria-label={statusLabel}
      className={cn(
        "h-2 w-2 shrink-0 rounded-full border",
        status === "mastered"
          ? "border-transparent bg-brand"
          : status === "learning"
            ? "border-transparent bg-brand-muted"
            : "border-line-strong"
      )}
    />
  );

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(item.id);
    }
  };

  const expandBtn = (
    <button
      type="button"
      onClick={() => setIsExpanded(true)}
      aria-label={`Mở rộng thẻ ${item.kanji}`}
      className="flex h-10 w-full shrink-0 items-center justify-center gap-[7px] border-t border-line text-[12.5px] font-semibold text-ink-2 transition-colors hover:bg-brand/[0.07] hover:text-brand"
    >
      <Maximize2 className="h-[13px] w-[13px]" strokeWidth={2.2} aria-hidden />
      Mở rộng
    </button>
  );

  const faceClass =
    "flashcard-face border border-line bg-surface shadow-[0_1px_2px_rgba(28,25,23,0.04),0_2px_8px_rgba(28,25,23,0.04)]";

  return (
    <>
      <div className="flashcard-wrapper h-[316px] w-56 shrink-0 select-none transition-transform duration-200 hover:-translate-y-[3px]">
        <div className={cn("flashcard-inner", isFlipped && "flashcard-flipped")}>
          {/* ═══ Mặt trước ═══ */}
          <div className={faceClass} aria-hidden={isFlipped}>
            <div
              role="button"
              tabIndex={isFlipped ? -1 : 0}
              onClick={() => toggleFlip(item.id)}
              onKeyDown={onKey}
              aria-label={`${item.kanji} — chạm để xem nghĩa`}
              className="flex min-h-0 flex-1 cursor-pointer flex-col px-4 pt-4 pb-3 outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset"
            >
              <div className="flex items-center justify-between">
                {pos ? (
                  <span className="rounded-full bg-surface-2 px-[9px] py-[3px] text-[11px] font-semibold text-ink-2">{pos}</span>
                ) : (
                  <span />
                )}
                {dot}
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-2">
                {reading && <span className="font-jp text-[13px] tracking-[0.06em] text-ink-3">{reading}</span>}
                <span className={cn("text-center font-mincho leading-[1.15] font-semibold text-ink", kanjiSize(item.kanji))}>
                  {item.kanji}
                </span>
              </div>
              <div className="flex items-center justify-center gap-[5px] text-[11.5px] text-ink-3">
                <RotateCcw className="h-3 w-3" aria-hidden />
                Chạm thẻ để lật
              </div>
            </div>
            {expandBtn}
          </div>

          {/* ═══ Mặt sau: hiện đủ nội dung, không cắt ═══ */}
          <div className={cn(faceClass, "flashcard-back")} aria-hidden={!isFlipped}>
            <div
              role="button"
              tabIndex={isFlipped ? 0 : -1}
              onClick={() => toggleFlip(item.id)}
              onKeyDown={onKey}
              aria-label={`${item.kanji} — mặt sau, chạm để lật lại`}
              className="scrollbar-none flex min-h-0 flex-1 cursor-pointer flex-col gap-2 overflow-y-auto px-4 pt-4 pb-3 outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-col gap-px">
                  <span className="font-mincho text-[17px] leading-[1.3] font-semibold text-ink">{item.kanji}</span>
                  {reading && <span className="font-jp text-[11.5px] leading-[1.4] tracking-[0.04em] text-ink-3">{reading}</span>}
                </div>
                <span className="mt-[7px] flex">{dot}</span>
              </div>
              <span className="text-[14.5px] leading-[1.35] font-bold text-brand">{item.meaningVn}</span>
              {item.exampleSentence && (
                <div className="flex flex-col gap-[3px] rounded-[10px] bg-surface-2 px-2.5 pt-[5px] pb-2">
                  <p className="font-jp text-[12.5px] leading-[1.95] text-ink">
                    <Furigana markup={item.exampleSentenceFurigana} fallback={item.exampleSentence} />
                  </p>
                  {item.exampleTranslation && (
                    <p className="text-[11.5px] leading-[1.45] text-ink-2">{item.exampleTranslation}</p>
                  )}
                </div>
              )}
            </div>
            {expandBtn}
          </div>
        </div>
      </div>

      {isExpanded && (
        <FlashCardModal
          item={item}
          index={index}
          total={total}
          groupName={groupName}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
