"use client";

import { useMemo, useRef, useState } from "react";
import { dueCards, previewIntervals, Rating, useSrsStore, type Grade, type StoredCard } from "@/store/srs-store";
import { formatInterval, reviewCard } from "@/lib/learning/review";
import { cn } from "@/lib/utils";

/**
 * Hàng ôn tập của một phiên: chốt danh sách thẻ đến hạn lúc bắt đầu; thẻ chấm "Quên" quay lại cuối hàng.
 * Dùng chung cho trang Ôn tập (mọi khóa) và trang ôn âm IPA.
 * `filter` phải ổn định giữa các lần render (hàm khai báo ngoài component hoặc useMemo).
 */
export function useReviewQueue(filter?: (c: StoredCard) => boolean) {
  const cards = useSrsStore((s) => s.cards);
  const [queue, setQueue] = useState<string[] | null>(null);
  const [done, setDone] = useState(0);
  /** Thời điểm thẻ hiện tại được lật lên lần trước (đo thời gian nhớ lại) */
  const shownAt = useRef(0);

  const initial = useMemo(() => dueCards(cards, new Date(), filter).map(([id]) => id), [cards, filter]);
  const q = queue ?? initial;
  const currentId = q[0];
  const current = currentId ? cards[currentId] : undefined;

  const answer = (g: Grade) => {
    if (!currentId) return;
    const r = reviewCard(currentId, g, shownAt.current ? Date.now() - shownAt.current : undefined);
    shownAt.current = Date.now();
    setDone((n) => n + 1);
    const rest = q.slice(1);
    // Quên → ôn lại trong phiên này
    setQueue(g === Rating.Again || (r && r.after.due <= new Date(Date.now() + 15 * 60_000).toISOString()) ? [...rest, currentId] : rest);
  };

  const all = Object.values(cards).filter((c) => !c.suspended && (!filter || filter(c)));
  const nextDue = all.map((c) => c.due).sort()[0];
  return {
    current,
    currentId,
    remaining: q.length,
    done,
    total: all.length,
    nextDue,
    answer,
    restart: () => {
      setQueue(null);
      setDone(0);
    },
  };
}

const BUTTONS: { g: Grade; label: string; cls: string }[] = [
  { g: Rating.Again, label: "Quên", cls: "border-brand bg-brand-soft text-brand-soft-ink" },
  { g: Rating.Hard, label: "Khó", cls: "border-line-strong bg-surface text-ink" },
  { g: Rating.Good, label: "Nhớ", cls: "border-ok bg-ok-soft text-ok-ink" },
  { g: Rating.Easy, label: "Dễ", cls: "border-[#1d4ed8] bg-[#e8efff] text-[#1e3a8a]" },
];

/** Bốn nút chấm FSRS, hiện khoảng cách đến lần ôn sau */
export function GradeButtons({ card, onGrade }: { card: StoredCard; onGrade: (g: Grade) => void }) {
  const preview = previewIntervals(card);
  return (
    <div className="grid grid-cols-4 gap-2">
      {BUTTONS.map((b) => (
        <button
          key={b.g}
          type="button"
          onClick={() => onGrade(b.g)}
          className={cn("flex flex-col items-center rounded-2xl border py-3 font-bold transition-transform active:scale-[0.97]", b.cls)}
        >
          {b.label}
          <span className="text-[12px] font-medium opacity-80">{formatInterval(preview[b.g])}</span>
        </button>
      ))}
    </div>
  );
}

export const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "";
