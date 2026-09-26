"use client";

import { useState, type KeyboardEvent } from "react";
import { Maximize2, RotateCcw } from "lucide-react";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyItem } from "@/types/vocabulary";
import { Furigana } from "@/components/ui/furigana";
import { posLabel, readingOf } from "@/lib/vocab-labels";
import { cn, hasTextSelection } from "@/lib/utils";
import { FlashCardModal } from "./FlashCardModal";

interface FlashCardProps {
  item: VocabularyItem;
  index?: number;
  total?: number;
  groupName?: string;
}

function kanjiSize(text: string) {
  const n = text.length;
  if (n <= 2) return "text-[44px] lg:text-[52px]";
  if (n <= 3) return "text-[38px] lg:text-[46px]";
  if (n <= 4) return "text-[34px] lg:text-[40px]";
  if (n <= 6) return "text-[26px] lg:text-[31px]";
  return "text-[21px] lg:text-[25px]";
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

  // Kéo chuột để bôi đen chữ thì không lật thẻ
  const flip = () => {
    if (hasTextSelection()) return;
    toggleFlip(item.id);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(item.id);
    }
  };

  // Nút "Mở rộng" gọn: icon nhỏ ở góc phải trên, không chiếm một dải riêng
  const expandBtn = (
    <button
      type="button"
      onClick={() => setIsExpanded(true)}
      aria-label={`Mở rộng thẻ ${item.kanji}`}
      title="Mở rộng"
      className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-ink-3 transition-colors hover:bg-brand-soft hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
    >
      <Maximize2 className="h-[15px] w-[15px]" strokeWidth={2.2} aria-hidden />
    </button>
  );

  const faceClass =
    "flashcard-face border border-line bg-surface shadow-[0_1px_2px_rgba(28,25,23,0.04),0_2px_8px_rgba(28,25,23,0.04)]";
  const areaClass =
    "flex min-h-0 flex-1 cursor-pointer flex-col select-text outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset";

  return (
    <>
      <div className="flashcard-wrapper h-[316px] w-56 shrink-0 transition-transform duration-200 hover:-translate-y-[3px] lg:h-[360px] lg:w-[264px]">
        <div className={cn("flashcard-inner", isFlipped && "flashcard-flipped")}>
          {/* ═══ Mặt trước ═══ */}
          <div className={faceClass} aria-hidden={isFlipped}>
            <div
              role="button"
              tabIndex={isFlipped ? -1 : 0}
              onClick={flip}
              onKeyDown={onKey}
              aria-label={`${item.kanji} — chạm để xem nghĩa`}
              className={cn(areaClass, "px-4 pt-4 pb-3.5 lg:px-5 lg:pt-[18px]")}
            >
              <div className="flex items-center gap-2 pr-9">
                {pos && (
                  <span className="rounded-full bg-surface-2 px-[9px] py-[3px] text-[11px] font-semibold text-ink-2 lg:text-xs">{pos}</span>
                )}
                <span className="ml-auto flex">{dot}</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-2">
                {reading && <span className="font-jp text-[13px] tracking-[0.06em] text-ink-2 lg:text-[15px]">{reading}</span>}
                <span className={cn("text-center font-mincho leading-[1.15] font-semibold text-ink", kanjiSize(item.kanji))}>
                  {item.kanji}
                </span>
              </div>
              <div className="flex items-center justify-center gap-[5px] text-[11.5px] text-ink-3 lg:text-xs">
                <RotateCcw className="h-3 w-3" aria-hidden />
                Chạm thẻ để lật
              </div>
            </div>
            {expandBtn}
          </div>

          {/* ═══ Mặt sau: hiện đủ nội dung, chữ to rõ trên desktop ═══ */}
          <div className={cn(faceClass, "flashcard-back")} aria-hidden={!isFlipped}>
            <div
              role="button"
              tabIndex={isFlipped ? 0 : -1}
              onClick={flip}
              onKeyDown={onKey}
              aria-label={`${item.kanji} — mặt sau, chạm để lật lại`}
              className={cn(areaClass, "scrollbar-none gap-2 overflow-y-auto px-4 pt-3.5 pb-4 lg:gap-2.5 lg:px-5 lg:pt-4")}
            >
              <div className="flex items-start gap-2 pr-9">
                <div className="flex min-w-0 flex-col gap-px">
                  <span className="font-mincho text-lg leading-[1.3] font-semibold text-ink lg:text-[21px]">{item.kanji}</span>
                  {reading && (
                    <span className="font-jp text-xs leading-[1.4] tracking-[0.04em] text-ink-2 lg:text-[13px]">{reading}</span>
                  )}
                </div>
                <span className="mt-2 ml-auto flex">{dot}</span>
              </div>
              <span className="text-[15px] leading-[1.35] font-bold text-brand lg:text-[17px]">{item.meaningVn}</span>
              {item.exampleSentence && (
                <div className="mt-0.5 flex flex-col gap-1 border-t border-line pt-2.5 lg:pt-3">
                  <p className="font-jp text-[14px] leading-[1.9] text-ink lg:text-[15.5px]">
                    <Furigana markup={item.exampleSentenceFurigana} fallback={item.exampleSentence} />
                  </p>
                  {item.exampleTranslation && (
                    <p className="text-[13px] leading-[1.5] text-ink-2 lg:text-sm">{item.exampleTranslation}</p>
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
