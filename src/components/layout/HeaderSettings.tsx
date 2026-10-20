"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Settings2 } from "lucide-react";
import { useTtsStore } from "@/store/tts-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

/** Nút cài đặt nhỏ trên thanh tiêu đề: mở bảng chọn giọng đọc tiếng Nhật (Nam / Nữ), dùng cho toàn app. */
export function HeaderSettings() {
  const hydrated = useHydrated();
  const { gender, setGender } = useTtsStore();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Cài đặt giọng đọc"
        title="Cài đặt giọng đọc"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-ink-2 transition-colors hover:border-ink-3 hover:text-ink",
          open && "border-ink-3 bg-surface text-ink"
        )}
      >
        <Settings2 className="h-[18px] w-[18px]" aria-hidden />
      </button>
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Cài đặt giọng đọc"
          className="panel absolute top-[calc(100%+10px)] right-0 z-50 flex w-[248px] flex-col gap-3 p-4 shadow-[0_12px_32px_rgba(28,25,23,0.08)]"
        >
          <p className="eyebrow-label">Giọng đọc tiếng Nhật</p>
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
                  className={cn(
                    "h-9 rounded-[7px] text-[13.5px] font-semibold transition-colors",
                    on ? "bg-ink text-white" : "text-ink-2 hover:text-ink"
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          <p className="text-[12.5px] leading-snug text-ink-3">Áp dụng cho mọi nút loa trong các bài tiếng Nhật.</p>
        </div>
      )}
    </div>
  );
}
