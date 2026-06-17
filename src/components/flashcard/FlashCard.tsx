"use client";

import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyItem } from "@/types/vocabulary";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface FlashCardProps {
  item: VocabularyItem;
  index?: number;
  compact?: boolean; // compact = dashboard cards; false = study deck
  isModal?: boolean;
  onClose?: () => void;
  onStatusChange?: (status: "learning" | "mastered") => void;
}

export function FlashCard({ item, index, compact = false, isModal, onClose, onStatusChange }: FlashCardProps) {
  const { flippedCards, toggleFlip, updateProgress, progress } = useFlashcardStore();
  const currentStatus = progress[item.id]?.status;
  const isFlipped = flippedCards.has(item.id);
  const isBjt = item.bjtRelevance;
  const [isExpanded, setIsExpanded] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isExpanded]);

  // Dynamic border color based on status
  const getBorderColor = () => {
    if (currentStatus === "mastered") return "#10b981"; // emerald-500
    if (currentStatus === "learning") return "#f59e0b"; // amber-500
    return "rgba(0,0,0,0.08)";
  };
  const cardBorder = `1.5px solid ${getBorderColor()}`;

  // Dynamic font size for Kanji based on length to prevent wrapping
  const getKanjiFontSize = (text: string, isCompact: boolean) => {
    const len = text.length;
    if (isCompact) {
      if (len <= 3) return "text-4xl";
      if (len <= 5) return "text-3xl";
      if (len <= 7) return "text-2xl";
      return "text-xl";
    }
    // Full size
    if (len <= 4) return "text-7xl";
    if (len <= 6) return "text-5xl";
    if (len <= 8) return "text-4xl";
    return "text-3xl";
  };

  const getPosStyle = (pos: string) => {
    switch (pos) {
      case "noun": return "bg-blue-50 text-blue-600 border-blue-100";
      case "verb": return "bg-rose-50 text-rose-600 border-rose-100";
      case "adjective": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "adverb": return "bg-amber-50 text-amber-600 border-amber-100";
      case "expression": return "bg-purple-50 text-purple-600 border-purple-100";
      default: return "bg-zinc-50 text-zinc-500 border-zinc-100";
    }
  };

  const renderCloseBtn = () => isModal && onClose ? (
    <button 
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-md hover:bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-800 transition-all z-20 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-zinc-200/60 cursor-pointer"
      aria-label="Đóng"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  ) : null;

  const renderActionButtons = () => onStatusChange ? (
    <div 
      className="flex items-center justify-center gap-3 py-3 px-5 border-t border-zinc-100/80 bg-zinc-50/50 mt-auto backdrop-blur-sm w-full z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onStatusChange("learning"); }}
        className={cn(
          "flex-1 max-w-[150px] py-2.5 text-[13px] font-semibold rounded-full border transition-all shadow-sm active:scale-95 cursor-pointer",
          currentStatus === "learning" 
            ? "border-amber-400 bg-amber-50 text-amber-700"
            : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
        )}
      >
        {currentStatus === "learning" ? "● Đang học" : "Chưa nhớ"}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onStatusChange("mastered"); }}
        className={cn(
          "flex-1 max-w-[150px] py-2.5 text-[13px] font-semibold rounded-full border transition-all shadow-sm active:scale-95 cursor-pointer",
          currentStatus === "mastered"
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
        )}
      >
        {currentStatus === "mastered" ? "✓ Đã thuộc" : "Đã thuộc"}
      </button>
    </div>
  ) : null;

  return (
    <>
      <div
        className={cn(
        "flashcard-wrapper cursor-pointer select-none shrink-0 transition-transform duration-300",
        compact ? "w-52 h-72 hover:-translate-y-1" : "w-[90vw] sm:w-[28rem] lg:w-[32rem] h-[32rem]"
      )}
      onClick={() => toggleFlip(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && toggleFlip(item.id)}
      aria-label={`${item.kanji} — ${isFlipped ? "mặt sau" : "nhấn để xem nghĩa"}`}
    >
      <div className={cn("flashcard-inner", isFlipped && "flashcard-flipped")}>

        {/* ════════════════════════════════════════
            MẶT TRƯỚC
        ════════════════════════════════════════ */}
        <div
          className={cn("flashcard-face transition-all duration-300", compact && "hover:shadow-xl")}
          style={{
            background: "#ffffff",
            border: cardBorder,
            boxShadow: compact ? "0 4px 20px rgba(0,0,0,0.04)" : "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          {renderCloseBtn()}

          {/* Meta row */}
          <div className={cn("flex items-center justify-between px-5 pt-5 pb-0", isModal ? "pr-14" : "")}>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 tracking-wide border border-zinc-200/50">
              {isBjt ? "BJT" : item.jlptLevel ?? "N1"}
            </span>
            <div className="flex items-center gap-2">
              {item.partOfSpeech && (
                <span className={cn("text-[11px] font-medium px-2.5 py-0.5 rounded-full border", getPosStyle(item.partOfSpeech))}>
                  {partOfSpeechLabel(item.partOfSpeech)}
                </span>
              )}
              {index !== undefined && (
                <span className="text-[11px] text-zinc-400 font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>
          </div>

          {/* Main — Kanji + readings */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-5">
            {/* Kanji */}
            <div
              className={cn(
                "font-bold text-center text-zinc-900 leading-tight tracking-tight",
                getKanjiFontSize(item.kanji, compact)
              )}
              style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
            >
              {item.kanji}
            </div>

            {/* Hiragana / Katakana */}
            {(item.hiragana || item.katakana) && (
              <div
                className={cn(
                  "font-medium tracking-widest text-center text-zinc-500",
                  compact ? "text-sm" : "text-xl"
                )}
              >
                {item.hiragana || item.katakana}
              </div>
            )}

            {/* Romaji — only in full mode */}
            {!compact && item.romaji && (
              <div className="text-sm text-gray-500 tracking-wide">
                {item.romaji}
              </div>
            )}
          </div>

          {/* Flip hint ONLY on front face */}
          {compact ? (
            <div className="mt-auto flex flex-col w-full z-10 relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="py-3.5 bg-transparent hover:bg-zinc-50 transition-colors flex items-center justify-center gap-1.5 text-zinc-400 hover:text-zinc-800 font-medium text-[12px] border-t border-zinc-100/80 w-full cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                Mở rộng
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1 py-4 text-zinc-400 mt-auto">
              <span className="text-xs font-medium tracking-wide">Nhấn để lật thẻ</span>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════
            MẶT SAU  ← MUST have className="flashcard-back"
        ════════════════════════════════════════ */}
        <div
          className={cn("flashcard-face flashcard-back transition-all duration-300", compact && "hover:shadow-xl")}
          style={{
            background: "#ffffff",
            border: cardBorder,
            boxShadow: compact ? "0 4px 12px rgba(0,0,0,0.05)" : "0 8px 30px rgba(0,0,0,0.08)",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {renderCloseBtn()}

          {/* Back header */}
          <div className={cn("flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-100", isModal ? "pr-14" : "")}>
            <div
              className={cn("font-bold text-zinc-900 tracking-tight", compact ? "text-sm" : "text-base")}
              style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
            >
              {item.kanji}
              {item.hiragana && (
                <span className="text-sm font-medium text-zinc-400 ml-2">
                  ({item.hiragana})
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-50 px-2.5 py-0.5 rounded border border-zinc-200/50">
              Nghĩa
            </span>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">

            {/* ① Vietnamese meaning — most important, largest */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">
                Nghĩa
              </p>
              <p
                className={cn(
                  "font-bold text-zinc-900 leading-snug",
                  compact ? "text-base" : "text-2xl"
                )}
              >
                {item.meaningVn}
              </p>
              {item.meaningEn && (
                <p className={cn("text-zinc-500 mt-1 font-medium", compact ? "text-xs" : "text-sm")}>
                  {item.meaningEn}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100" />

            {/* ② Example sentence */}
            {item.exampleSentence && (
              <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-600 mb-1.5 flex items-center gap-1.5">
                  Ví dụ
                </p>
                <p
                  className={cn(
                    "text-sky-900 leading-relaxed font-medium",
                    compact ? "text-xs" : "text-[15px]"
                  )}
                  style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
                >
                  {item.exampleSentence}
                </p>
                {item.exampleTranslation && (
                  <p className={cn("text-sky-700/80 mt-2", compact ? "text-[10px]" : "text-sm")}>
                    {item.exampleTranslation}
                  </p>
                )}
              </div>
            )}

            {/* ③ Business context */}
            {!compact && item.businessContext && (
              <div className="rounded-xl bg-violet-50/50 border border-violet-100 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1.5 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  Business
                </p>
                <p className={cn("text-violet-900 leading-relaxed", compact ? "text-[10px]" : "text-[13px]")}>
                  {item.businessContext}
                </p>
              </div>
            )}

            {/* ④ Usage notes */}
            {!compact && item.usageNotes && (
              <div className="rounded-xl bg-amber-50/50 border border-amber-100 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-1.5 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  Lưu ý
                </p>
                <p className={cn("text-amber-900 leading-relaxed", compact ? "text-[10px]" : "text-[13px]")}>
                  {item.usageNotes}
                </p>
              </div>
            )}

            {/* ⑤ Synonyms / Antonyms */}
            {!compact && (item.synonyms?.length || item.antonyms?.length) && (
              <div className="flex gap-2 flex-wrap pt-1">
                {item.synonyms?.map((syn) => (
                  <span key={syn} className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-600 bg-zinc-100/80 px-2.5 py-1 rounded-md border border-zinc-200/50">
                    <span className="text-zinc-400">≈</span> {syn}
                  </span>
                ))}
                {item.antonyms?.map((ant) => (
                  <span key={ant} className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-600 bg-zinc-100/80 px-2.5 py-1 rounded-md border border-zinc-200/50">
                    <span className="text-zinc-400">≠</span> {ant}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Flip hint ONLY on back face */}
          {compact ? (
            <div className="mt-auto flex flex-col w-full z-10 relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                className="py-3.5 bg-transparent hover:bg-zinc-50 transition-colors flex items-center justify-center gap-1.5 text-zinc-400 hover:text-zinc-800 font-medium text-[12px] border-t border-zinc-100/80 w-full cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                Mở rộng chi tiết
              </button>
            </div>
          ) : onStatusChange ? (
            renderActionButtons()
          ) : (
            <div className="flex items-center justify-center gap-1 py-4 border-t border-zinc-100 text-zinc-400 mt-auto">
              <span className="text-xs font-medium tracking-wide">Nhấn để lật thẻ</span>
            </div>
          )}
        </div>

      </div>
    </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-white/20 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
        >
          {/* Wrapper for the card to position the close button and apply animation */}
          <div 
            className="relative animate-in zoom-in-90 slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
            onClick={(e) => e.stopPropagation()}
          >
            <FlashCard 
              item={item} 
              index={index} 
              compact={false} 
              isModal={true}
              onClose={() => setIsExpanded(false)}
              onStatusChange={(status) => {
                updateProgress(item.id, status);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function partOfSpeechLabel(pos: string): string {
  const map: Record<string, string> = {
    noun: "名詞", verb: "動詞", adjective: "形容詞",
    adverb: "副詞", expression: "表現", compound: "複合語", katakana: "外来語",
  };
  return map[pos] ?? pos;
}
