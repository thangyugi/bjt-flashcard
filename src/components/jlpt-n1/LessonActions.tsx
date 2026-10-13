"use client";

import { useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useN1Store } from "@/store/n1-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";

/** Ghi nhớ chương đang học + nút đánh dấu hoàn thành. */
export function LessonActions({ lessonId }: { lessonId: string }) {
  const visit = useN1Store((s) => s.visit);
  const done = useN1Store((s) => !!s.done[lessonId]);
  const toggle = useN1Store((s) => s.toggleDone);
  const hydrated = useHydrated();

  useEffect(() => visit(lessonId), [lessonId, visit]);

  const on = hydrated && done;
  return (
    <button
      type="button"
      onClick={() => toggle(lessonId)}
      aria-pressed={on}
      className={cn(
        "flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors",
        on ? "border-ok bg-ok-soft text-ok-ink" : "border-line-strong bg-surface text-ink hover:bg-surface-2"
      )}
    >
      {on ? <CheckCircle2 className="h-[18px] w-[18px]" aria-hidden /> : <Circle className="h-[18px] w-[18px]" aria-hidden />}
      {on ? "Đã học xong chương này" : "Đánh dấu đã học xong"}
    </button>
  );
}
