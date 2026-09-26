"use client";

import { useState } from "react";
import { useVocabularyStats } from "@/hooks/useVocabulary";
import { cn } from "@/lib/utils";

/**
 * Màn hình khởi động: hiện ngay từ HTML tĩnh, tự ẩn khi dữ liệu từ vựng đã tải xong.
 * CSS `.splash-safety` tự ẩn sau vài giây phòng khi JS lỗi.
 */
export function AppSplash() {
  const { isFetched } = useVocabularyStats();
  const [removed, setRemoved] = useState(false);
  if (removed) return null;

  return (
    <div
      aria-hidden={isFetched}
      onTransitionEnd={() => isFetched && setRemoved(true)}
      className={cn(
        "splash-safety fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-paper transition-opacity duration-300",
        isFetched && "pointer-events-none opacity-0"
      )}
    >
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-5">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-[#c8283a]/10" />
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand font-mincho text-[34px] font-bold text-white shadow-[0_12px_32px_rgba(184,32,47,0.25)]">
            語
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-extrabold tracking-tight text-ink">BJT Flashcard</span>
          <span className="font-jp text-xs text-ink-3">ビジネス日本語</span>
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-track">
          <div className="loading-bar h-full w-1/3 rounded-full bg-brand" />
        </div>
        <span className="sr-only">Đang tải dữ liệu từ vựng</span>
      </div>
    </div>
  );
}
