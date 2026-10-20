"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { useTtsStore } from "@/store/tts-store";
import { useHydrated } from "@/hooks/useHydrated";
import { getPlaying, loadAudioManifest, speak, stopSpeaking, subscribePlaying, ttsSupported } from "@/lib/tts";
import { cn } from "@/lib/utils";

const SAMPLE_ID = "header-voice-sample";
const SAMPLE = "はじめまして。一緒に日本語を勉強しましょう。";

/**
 * Nút "Giọng đọc" trên thanh tiêu đề: biểu tượng loa (+ chữ trên màn rộng), mở bảng chọn giọng đọc tiếng Nhật
 * (Nam / Nữ) dùng cho mọi nút loa trong app, kèm nút "Nghe thử".
 */
export function HeaderSettings() {
  const hydrated = useHydrated();
  const { gender, rate, setGender } = useTtsStore();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const playing = useSyncExternalStore(subscribePlaying, getPlaying, () => null) === SAMPLE_ID;

  useEffect(() => {
    if (!open) return;
    loadAudioManifest();
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = [
    { v: "male" as const, label: "Nam" },
    { v: "female" as const, label: "Nữ" },
  ];
  const canSpeak = hydrated && ttsSupported();

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label="Giọng đọc tiếng Nhật"
        title="Giọng đọc tiếng Nhật"
        className={cn(
          "flex h-9 min-w-9 items-center justify-center gap-2 rounded-lg border border-line-strong px-2 text-[13.5px] font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink lg:px-3",
          open && "border-ink-3 bg-surface text-ink"
        )}
      >
        <Volume2 className="h-[18px] w-[18px] shrink-0" aria-hidden />
        <span className="hidden whitespace-nowrap lg:inline" aria-hidden>
          Giọng đọc
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Giọng đọc tiếng Nhật"
          className="panel absolute top-[calc(100%+10px)] right-0 z-50 flex w-[264px] max-w-[calc(100vw-32px)] flex-col gap-3 p-4 shadow-[0_12px_32px_rgba(28,25,23,0.08)]"
        >
          <p className="text-[14px] font-bold text-ink">Giọng đọc tiếng Nhật</p>
          <div role="radiogroup" aria-label="Giọng đọc" className="grid grid-cols-2 gap-1 rounded-[10px] border border-line-strong bg-paper p-[3px]">
            {options.map((o) => {
              const on = hydrated && gender === o.v;
              return (
                <button
                  key={o.v}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setGender(o.v)}
                  className={cn("h-9 rounded-[7px] text-[13.5px] font-semibold transition-colors", on ? "bg-ink text-white" : "text-ink-2 hover:text-ink")}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          {canSpeak && (
            <button
              type="button"
              onClick={() => (playing ? stopSpeaking() : speak(SAMPLE_ID, [SAMPLE], { gender, rate }))}
              className="flex h-9 items-center justify-center gap-2 rounded-lg border border-line-strong text-[13.5px] font-semibold text-ink transition-colors hover:border-ink-3 hover:bg-surface"
            >
              {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
              {playing ? "Dừng" : "Nghe thử"}
            </button>
          )}
          <p className="text-[12.5px] leading-snug text-ink-3">Áp dụng cho mọi nút loa trong các bài tiếng Nhật.</p>
        </div>
      )}
    </div>
  );
}
