"use client";

import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyItem } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface FlashCardProps {
  item: VocabularyItem;
  index?: number;
  compact?: boolean; // compact = dashboard cards; false = study deck
}

export function FlashCard({ item, index, compact = false }: FlashCardProps) {
  const { flippedCards, toggleFlip } = useFlashcardStore();
  const isFlipped = flippedCards.has(item.id);
  const isBjt = item.bjtRelevance;

  // Accent color per source
  const accent = isBjt ? "#d97706" : "#4f46e5"; // amber-600 : indigo-600
  const accentBg = isBjt ? "#fffbeb" : "#eef2ff"; // amber-50 : indigo-50
  const accentBorder = isBjt ? "#fde68a" : "#c7d2fe"; // amber-200 : indigo-200

  return (
    <div
      className={cn(
        "flashcard-wrapper cursor-pointer select-none shrink-0",
        compact ? "w-52 h-72" : "w-[90vw] sm:w-[28rem] lg:w-[32rem] h-[32rem]"
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
          className="flashcard-face"
          style={{
            background: "#ffffff",
            border: `1.5px solid ${accentBorder}`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Accent strip top */}
          <div style={{ height: 4, background: accent, flexShrink: 0 }} />

          {/* Meta row */}
          <div className="flex items-center justify-between px-4 pt-3 pb-0">
            <span
              className="text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{ background: accentBg, color: accent }}
            >
              {isBjt ? "BJT" : item.jlptLevel ?? "N1"}
            </span>
            <div className="flex items-center gap-2">
              {item.partOfSpeech && (
                <span className="text-[11px] text-gray-500 font-medium">
                  {partOfSpeechLabel(item.partOfSpeech)}
                </span>
              )}
              {index !== undefined && (
                <span className="text-[11px] text-gray-400 font-mono">
                  {index + 1}
                </span>
              )}
            </div>
          </div>

          {/* Main — Kanji + readings */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-5">
            {/* Kanji */}
            <div
              className={cn(
                "font-bold text-center text-gray-900 leading-tight tracking-tight",
                compact
                  ? item.kanji.length > 6 ? "text-2xl" : "text-4xl"
                  : item.kanji.length > 8 ? "text-4xl" : "text-7xl"
              )}
              style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
            >
              {item.kanji}
            </div>

            {/* Hiragana / Katakana */}
            {(item.hiragana || item.katakana) && (
              <div
                className={cn(
                  "font-medium tracking-widest text-center",
                  compact ? "text-sm" : "text-xl"
                )}
                style={{ color: accent }}
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

          {/* Flip hint */}
          <div className="flex items-center justify-center gap-1 py-3 text-gray-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            <span className="text-xs">Nhấn để xem nghĩa</span>
          </div>
        </div>

        {/* ════════════════════════════════════════
            MẶT SAU  ← MUST have className="flashcard-back"
        ════════════════════════════════════════ */}
        <div
          className="flashcard-back"
          style={{
            background: "#ffffff",
            border: "1.5px solid #e5e7eb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "1.25rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Green strip top */}
          <div style={{ height: 4, background: "#059669", flexShrink: 0 }} />

          {/* Back header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
            <div
              className={cn("font-bold text-gray-800", compact ? "text-sm" : "text-base")}
              style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
            >
              {item.kanji}
              {item.hiragana && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({item.hiragana})
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              nghĩa
            </span>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-none">

            {/* ① Vietnamese meaning — most important, largest */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1">
                Nghĩa
              </p>
              <p
                className={cn(
                  "font-bold text-gray-900 leading-snug",
                  compact ? "text-base" : "text-2xl"
                )}
              >
                {item.meaningVn}
              </p>
              {item.meaningEn && (
                <p className={cn("text-gray-600 mt-0.5", compact ? "text-xs" : "text-sm")}>
                  {item.meaningEn}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* ② Example sentence */}
            {item.exampleSentence && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5">
                  Ví dụ
                </p>
                <p
                  className={cn(
                    "text-gray-700 leading-relaxed",
                    compact ? "text-xs" : "text-base"
                  )}
                  style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
                >
                  {item.exampleSentence}
                </p>
                {item.exampleTranslation && (
                  <p className={cn("text-gray-500 mt-1 italic", compact ? "text-[10px]" : "text-xs")}>
                    {item.exampleTranslation}
                  </p>
                )}
              </div>
            )}

            {/* ③ Business context */}
            {item.businessContext && (
              <div className="rounded-lg bg-amber-50 border-l-2 border-amber-400 pl-3 pr-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 mb-1">
                  💼 Business
                </p>
                <p className={cn("text-gray-700 leading-relaxed", compact ? "text-[10px]" : "text-xs")}>
                  {item.businessContext}
                </p>
              </div>
            )}

            {/* ④ Usage notes */}
            {item.usageNotes && (
              <div className="rounded-lg bg-gray-50 border-l-2 border-gray-300 pl-3 pr-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-1">
                  📝 Lưu ý
                </p>
                <p className={cn("text-gray-600 leading-relaxed", compact ? "text-[10px]" : "text-xs")}>
                  {item.usageNotes}
                </p>
              </div>
            )}

            {/* ⑤ Synonyms / Antonyms */}
            {!compact && (item.synonyms?.length || item.antonyms?.length) && (
              <div className="flex gap-2 flex-wrap pt-1">
                {item.synonyms?.map((s) => (
                  <span key={s} className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    ≈ {s}
                  </span>
                ))}
                {item.antonyms?.map((a) => (
                  <span key={a} className="text-xs text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    ⟺ {a}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Flip back hint */}
          <div className="flex items-center justify-center gap-1 py-2.5 border-t border-gray-100 text-gray-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            <span className="text-xs">Nhấn để xem mặt trước</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function partOfSpeechLabel(pos: string): string {
  const map: Record<string, string> = {
    noun: "名詞", verb: "動詞", adjective: "形容詞",
    adverb: "副詞", expression: "表現", compound: "複合語", katakana: "外来語",
  };
  return map[pos] ?? pos;
}
