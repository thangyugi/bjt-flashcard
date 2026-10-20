"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Flame } from "lucide-react";
import { computeStreak, emptyDay, localDate, useActivityStore } from "@/store/activity-store";
import { WELCOME_GIFT, XP_PER_CRYSTAL } from "@/lib/land/economy";
import { dailyPlan } from "@/lib/land/plan";
import { cn } from "@/lib/utils";
import { GEM_STYLE } from "./ui";

/** Dải trên cùng của vùng đất: Kế hoạch hôm nay (số liệu học thật), chuỗi ngày, ví Tinh thể */
export function PlanStrip({ balance, earned, spent, xpToNext }: { balance: number; earned: number; spent: number; xpToNext: number }) {
  const days = useActivityStore((s) => s.days);
  const active = useActivityStore((s) => s.active);
  const today = days[localDate()] ?? emptyDay();
  const streak = computeStreak(active);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Đóng khi bấm ra ngoài hoặc nhấn Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const { tasks, done } = dailyPlan(today);

  return (
    <div className="relative z-20 flex flex-wrap items-center gap-2 border-b border-line-strong bg-paper px-[var(--gutter)] py-2.5 md:flex-nowrap md:gap-3">
      <div ref={box} className="relative order-3 w-full min-w-0 md:order-none md:w-auto md:flex-1">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="land-plan"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full min-w-0 items-center gap-2.5 rounded-lg border border-line-strong bg-paper px-3 py-1.5 text-left text-[14px] hover:border-line-strong md:w-auto md:max-w-full"
        >
          <span className="font-semibold whitespace-nowrap text-ink">Kế hoạch hôm nay</span>
          <span
            className="h-1.5 w-[74px] flex-none overflow-hidden rounded-full bg-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={tasks.length}
            aria-valuenow={done}
            aria-label={`Đã xong ${done} trên ${tasks.length} nhiệm vụ`}
          >
            <span className="block h-full rounded-full bg-ok transition-[width]" style={{ width: `${(100 * done) / tasks.length}%` }} />
          </span>
          <span className="font-semibold text-ok tabular-nums">
            {done}/{tasks.length}
          </span>
          <span className="min-w-0 flex-1 truncate text-ink-2 max-[420px]:hidden lg:flex-none">
            Hôm nay <b className="font-semibold text-ink">+{today.xp} XP</b> · còn {xpToNext} XP nữa được <b className="font-semibold text-ink">1 Tinh thể</b>
          </span>
          <ChevronDown className={cn("ml-auto h-4 w-4 flex-none text-ink-3 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
        {open && (
          <div id="land-plan" className="absolute top-[calc(100%+8px)] left-0 z-30 w-full panel p-4 shadow-[0_1px_2px_rgba(28,25,23,0.06),0_8px_24px_rgba(28,25,23,0.08)] md:w-[340px]">
            <h3 className="mb-2.5 text-[13.5px] font-bold text-ink">
              Kế hoạch hôm nay · {done}/{tasks.length}
            </h3>
            <ol className="flex flex-col gap-2.5">
              {tasks.map((t) => {
                const ok = t.done;
                return (
                  <li key={t.label} className={cn("flex items-center gap-2.5 text-[13.5px]", ok ? "text-ink" : "text-ink-2")}>
                    <span
                      className={cn("grid h-[18px] w-[18px] flex-none place-items-center rounded-md border-[1.5px]", ok ? "border-ok bg-ok text-white" : "border-line-strong")}
                      aria-hidden
                    >
                      {ok && <span className="mb-0.5 h-1 w-2 -rotate-45 border-b-2 border-l-2 border-white" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      {t.label}
                      <span className="block text-[12px] text-ink-3 tabular-nums">
                        {Math.min(t.value, t.goal)}/{t.goal} {t.unit}
                        {ok ? " · xong" : ""}
                      </span>
                    </span>
                    {!ok && (
                      <Link href={t.href} className="rounded-lg border border-line-strong px-2.5 py-1 text-[12.5px] font-semibold whitespace-nowrap text-ink hover:bg-surface-2">
                        {t.cta}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="mt-3 border-t border-line pt-2.5 text-[12px] leading-relaxed text-ink-3">
              Mỗi {XP_PER_CRYSTAL} XP học được = 1 Tinh thể (cộng {WELCOME_GIFT} Tinh thể quà chào mừng). Đã nhận {earned}, đã gieo hết {spent}.
            </p>
          </div>
        )}
      </div>
      <span
        className={cn("flex items-center gap-1.5 rounded-xl border border-line bg-paper px-3 py-1.5 text-[14px] whitespace-nowrap", streak ? "text-ink" : "text-ink-3")}
        title="Chuỗi ngày học liên tiếp"
      >
        <Flame className={cn("h-4 w-4", streak ? "text-brand" : "text-ink-3")} aria-hidden />
        <b className="font-bold tabular-nums">{streak}</b> ngày
      </span>
      <span className="ml-auto flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-1.5 whitespace-nowrap md:ml-0" aria-live="polite">
        <span className="h-3.5 w-3 flex-none" style={GEM_STYLE} aria-hidden />
        <b className="text-[15px] text-ink tabular-nums">{balance.toLocaleString("vi-VN")}</b>
        <span className="text-[14px] text-ink-2">Tinh thể</span>
      </span>
    </div>
  );
}
