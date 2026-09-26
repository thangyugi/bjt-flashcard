"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useFlashcardStore } from "@/store/flashcard-store";
import type { VocabularyItem } from "@/types/vocabulary";
import { FlashCardDetail } from "./FlashCardDetail";

interface FlashCardModalProps {
  item: VocabularyItem;
  index?: number;
  total?: number;
  groupName?: string;
  onClose: () => void;
}

/**
 * Thẻ mở rộng.
 * Desktop / tablet: hộp giữa màn hình. Mobile: bottom sheet trượt từ dưới lên.
 */
export function FlashCardModal({ item, index, total, groupName, onClose }: FlashCardModalProps) {
  const { flippedCards, toggleFlip, updateProgress, progress } = useFlashcardStore();
  const isFlipped = flippedCards.has(item.id);

  // Khoá cuộn trang + Esc để đóng
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Thẻ ${item.kanji}`}>
      <button
        type="button"
        aria-label="Đóng thẻ mở rộng"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/35 backdrop-blur-[3px] animate-in fade-in duration-200"
      />
      <div className="relative w-full animate-in slide-in-from-bottom-6 fade-in duration-300 sm:w-auto sm:zoom-in-95">
        {/* Thanh kéo — chỉ mobile */}
        <div className="absolute inset-x-0 top-0 z-10 flex h-5 items-center justify-center sm:hidden" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-line-strong" />
        </div>
        <FlashCardDetail
          item={item}
          variant="modal"
          isFlipped={isFlipped}
          onFlip={() => toggleFlip(item.id)}
          onShowSide={(back) => {
            if (back !== isFlipped) toggleFlip(item.id);
          }}
          status={progress[item.id]?.status}
          onStatusChange={(status) => updateProgress(item.id, status)}
          onClose={onClose}
          groupName={groupName}
          index={index}
          total={total}
          className="h-[88dvh] rounded-t-3xl pt-5 sm:h-[min(780px,88dvh)] sm:w-[720px] sm:rounded-3xl sm:pt-0 lg:h-[560px] lg:w-[880px]"
        />
      </div>
    </div>,
    document.body
  );
}
