"use client";

import type { KeyboardEvent } from "react";
import { Briefcase, Check, MessageSquare, PencilLine, RotateCcw, X } from "lucide-react";
import type { CardStatus, VocabularyItem } from "@/types/vocabulary";
import { Furigana } from "@/components/ui/furigana";
import { levelLabel, posLabel, readingOf } from "@/lib/vocab-labels";
import { cn } from "@/lib/utils";

interface FlashCardDetailProps {
  item: VocabularyItem;
  /** "modal": thẻ mở rộng; "deck": thẻ lớn trong trang học bài */
  variant: "modal" | "deck";
  isFlipped: boolean;
  onFlip: () => void;
  onShowSide: (back: boolean) => void;
  status?: CardStatus;
  onStatusChange: (status: "learning" | "mastered") => void;
  onClose?: () => void;
  groupName?: string;
  index?: number;
  total?: number;
  className?: string;
}

function kanjiSize(text: string, face: "front" | "back") {
  const n = text.length;
  if (face === "front") {
    if (n <= 3) return "text-[84px] sm:text-[104px]";
    if (n <= 5) return "text-[60px] sm:text-[80px]";
    if (n <= 7) return "text-[44px] sm:text-[60px]";
    return "text-[34px] sm:text-[46px]";
  }
  if (n <= 3) return "text-[40px] sm:text-[48px]";
  if (n <= 5) return "text-[32px] sm:text-[38px]";
  if (n <= 7) return "text-[26px] sm:text-[30px]";
  return "text-[22px] sm:text-[24px]";
}

const LABEL = "text-[11px] font-bold uppercase tracking-[0.1em]";

/**
 * Thẻ lớn: dùng cho modal "Mở rộng" và trang học bài.
 * - Desktop: mặt sau chia 2 cột (từ + nghĩa | ví dụ + ngữ cảnh + lưu ý)
 * - Tablet / mobile: xếp dọc, cả thẻ cuộn
 */
export function FlashCardDetail({
  item,
  variant,
  isFlipped,
  onFlip,
  onShowSide,
  status,
  onStatusChange,
  onClose,
  groupName,
  index,
  total,
  className,
}: FlashCardDetailProps) {
  const reading = readingOf(item);
  const pos = posLabel(item.partOfSpeech);
  const isLearning = status === "learning";
  const isMastered = status === "mastered";

  // Deck: 2 cột từ tablet trở lên; modal: 2 cột từ desktop, tablet xếp dọc
  const twoCol =
    variant === "deck"
      ? "md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden lg:grid-cols-[300px_minmax(0,1fr)]"
      : "lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden";
  const leftTwoCol =
    variant === "deck"
      ? "md:border-b-0 md:border-r md:flex-col md:gap-4"
      : "lg:border-b-0 lg:border-r lg:flex-col lg:gap-[18px]";
  const leftRow = variant === "modal" ? "md:max-lg:flex-row md:max-lg:gap-7" : "";
  const rightScroll = variant === "deck" ? "md:overflow-y-auto" : "lg:overflow-y-auto";

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onFlip();
    }
  };

  const segBtn = (active: boolean) =>
    cn(
      "h-[34px] rounded-lg px-2.5 text-[13px] whitespace-nowrap transition-colors sm:px-3.5",
      active
        ? "bg-surface font-bold text-ink shadow-[0_1px_2px_rgba(28,25,23,0.06)]"
        : "font-medium text-ink-2 hover:text-ink"
    );

  return (
    <article
      className={cn(
        "flex w-full flex-col overflow-hidden border border-line bg-surface text-ink",
        "shadow-[0_2px_6px_rgba(28,25,23,0.06),0_24px_60px_rgba(28,25,23,0.16)]",
        className
      )}
    >
      {/* ── Header ── */}
      <header className="flex h-[52px] shrink-0 items-center justify-between gap-2.5 border-b border-line pr-1.5 pl-3.5 sm:h-[60px] sm:pr-3 sm:pl-6">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand-soft-ink">
            {levelLabel(item)}
          </span>
          {pos && (
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-ink-2">
              {pos}
            </span>
          )}
          {groupName && index !== undefined && total !== undefined && (
            <span className="hidden truncate pl-1.5 text-[13px] text-ink-3 sm:inline">
              {groupName} · {index + 1}/{total}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div role="group" aria-label="Mặt thẻ" className="flex gap-0.5 rounded-[10px] bg-surface-2 p-[3px]">
            <button type="button" aria-pressed={!isFlipped} onClick={() => onShowSide(false)} className={segBtn(!isFlipped)}>
              Mặt trước
            </button>
            <button type="button" aria-pressed={isFlipped} onClick={() => onShowSide(true)} className={segBtn(isFlipped)}>
              Mặt sau
            </button>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="flex h-11 w-11 items-center justify-center rounded-[10px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </button>
          )}
        </div>
      </header>

      {/* ── Body: chạm bất kỳ đâu để lật ── */}
      <div
        role="button"
        tabIndex={0}
        onClick={onFlip}
        onKeyDown={handleKey}
        aria-label={isFlipped ? "Mặt sau — chạm để lật về mặt trước" : "Mặt trước — chạm để xem nghĩa"}
        className="flex min-h-0 flex-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-inset"
      >
        {!isFlipped ? (
          <div className="relative flex w-full flex-col items-center justify-center gap-3 px-8 pb-12">
            {reading && (
              <span className="font-jp text-lg tracking-[0.12em] text-ink-2 sm:text-[22px]">{reading}</span>
            )}
            <span
              className={cn(
                "text-center font-mincho leading-[1.1] font-semibold",
                kanjiSize(item.kanji, "front")
              )}
            >
              {item.kanji}
            </span>
            {item.romaji && <span className="text-[15px] tracking-wide text-ink-3">{item.romaji}</span>}
            <span className="absolute bottom-5 flex items-center gap-1.5 text-[12.5px] text-ink-3">
              <RotateCcw className="h-[13px] w-[13px]" aria-hidden />
              Chạm thẻ để xem nghĩa
            </span>
          </div>
        ) : (
          <div className={cn("grid w-full grid-cols-1 content-start overflow-y-auto", twoCol)}>
            {/* Từ + nghĩa */}
            <div
              className={cn(
                "flex flex-col gap-3 border-b border-line bg-surface-2 px-[18px] py-4 sm:px-7 sm:py-6",
                leftTwoCol,
                leftRow
              )}
            >
              <div className={cn("flex min-w-0 flex-col gap-1", variant === "modal" && "md:max-lg:w-60 md:max-lg:shrink-0")}>
                <span className={cn("font-mincho leading-[1.15] font-semibold", kanjiSize(item.kanji, "back"))}>
                  {item.kanji}
                </span>
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  {reading && <span className="font-jp text-[15px] tracking-[0.06em] text-ink-2">{reading}</span>}
                  {item.romaji && <span className="text-[13px] text-ink-3">{item.romaji}</span>}
                </div>
              </div>
              <div
                className={cn(
                  "hidden h-px bg-line",
                  variant === "deck" ? "md:block" : "lg:block"
                )}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={cn(LABEL, "text-ink-3")}>Nghĩa</span>
                <span className="text-xl leading-[1.3] font-extrabold text-brand sm:text-2xl">{item.meaningVn}</span>
                {item.meaningEn && <span className="text-sm leading-normal text-ink-2">{item.meaningEn}</span>}
              </div>
            </div>

            {/* Ví dụ + ngữ cảnh + lưu ý */}
            <div className={cn("flex flex-col gap-4 px-[18px] pt-4 pb-6 sm:px-7 sm:pt-[22px]", rightScroll)}>
              {item.exampleSentence && (
                <section className="flex flex-col gap-1">
                  <div className="flex items-center gap-[7px] text-brand">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden />
                    <span className={LABEL}>Ví dụ</span>
                  </div>
                  <p className="font-jp text-base leading-[2.05] sm:text-lg">
                    <Furigana markup={item.exampleSentenceFurigana} fallback={item.exampleSentence} />
                  </p>
                  {item.exampleTranslation && (
                    <p className="text-sm leading-[1.55] text-ink-2">{item.exampleTranslation}</p>
                  )}
                </section>
              )}
              {item.businessContext && (
                <>
                  <div className="h-px shrink-0 bg-line" />
                  <section className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-[7px] text-ink-2">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden />
                      <span className={LABEL}>Ngữ cảnh business</span>
                    </div>
                    <p className="text-sm leading-relaxed">{item.businessContext}</p>
                  </section>
                </>
              )}
              {item.usageNotes && (
                <>
                  <div className="h-px shrink-0 bg-line" />
                  <section className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-[7px] text-ink-2">
                      <PencilLine className="h-3.5 w-3.5" aria-hidden />
                      <span className={LABEL}>Lưu ý cách dùng</span>
                    </div>
                    <p className="text-sm leading-relaxed">{item.usageNotes}</p>
                  </section>
                </>
              )}
              {(item.synonyms?.length || item.antonyms?.length) && (
                <div className="flex flex-wrap gap-2">
                  {item.synonyms?.map((syn) => (
                    <span key={syn} className="rounded-md bg-surface-2 px-2.5 py-1 font-jp text-xs text-ink-2">
                      <span className="text-ink-3">≈</span> {syn}
                    </span>
                  ))}
                  {item.antonyms?.map((ant) => (
                    <span key={ant} className="rounded-md bg-surface-2 px-2.5 py-1 font-jp text-xs text-ink-2">
                      <span className="text-ink-3">≠</span> {ant}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer: trạng thái ── */}
      <footer
        className={cn(
          "flex shrink-0 items-center justify-between gap-3 border-t border-line px-3 py-2.5 sm:px-6 sm:py-3",
          variant === "modal" && "pb-[max(env(safe-area-inset-bottom),12px)] sm:pb-3"
        )}
      >
        <span className="hidden text-[13px] text-ink-3 md:inline">Bạn đã nhớ từ này chưa?</span>
        <div className="flex flex-1 gap-2.5 md:flex-none">
          <button
            type="button"
            aria-pressed={isLearning}
            onClick={() => onStatusChange("learning")}
            className={cn(
              "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors md:min-w-[140px]",
              isLearning
                ? "border-brand bg-brand-soft text-brand-soft-ink"
                : "border-line-strong bg-surface text-ink hover:bg-surface-2"
            )}
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            {isLearning ? "Đang học" : "Chưa nhớ"}
          </button>
          <button
            type="button"
            aria-pressed={isMastered}
            onClick={() => onStatusChange("mastered")}
            className={cn(
              "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-brand px-4 text-sm font-bold transition-colors md:min-w-[140px]",
              isMastered ? "bg-brand text-white hover:bg-brand-hover" : "bg-surface text-brand hover:bg-brand-soft"
            )}
          >
            <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            Đã thuộc
          </button>
        </div>
      </footer>
    </article>
  );
}
