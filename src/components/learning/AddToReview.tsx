"use client";

import Link from "next/link";
import { Repeat2 } from "lucide-react";
import { useSrsStore, cardId } from "@/store/srs-store";
import { useHydrated } from "@/hooks/useHydrated";
import { enrollItems } from "@/lib/learning/review";
import { cn } from "@/lib/utils";

/** Nút đưa các mục học của bài vào bộ ôn tập ngắt quãng chung (FSRS). */
export function AddToReview({ items, course, className }: { items: string[]; course: string; className?: string }) {
  const hydrated = useHydrated();
  const have = useSrsStore((s) => items.filter((k) => s.cards[cardId(k)]).length);
  if (!hydrated || !items.length) return null;
  const all = have === items.length;
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button
        type="button"
        disabled={all}
        onClick={() => enrollItems(items.map((item) => ({ item, course })))}
        className={cn(
          "flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors",
          all ? "border-ok bg-ok-soft text-ok-ink" : "border-line-strong bg-surface text-ink hover:bg-surface-2"
        )}
      >
        <Repeat2 className="h-[18px] w-[18px]" aria-hidden />
        {all ? `Đã có ${items.length} mục trong ôn tập` : have ? `Thêm ${items.length - have} mục còn lại vào ôn tập` : `Thêm ${items.length} mục vào ôn tập`}
      </button>
      {have > 0 && (
        <Link href="/review" className="text-[13px] font-semibold underline opacity-80 hover:opacity-100">
          Ôn tập ngay
        </Link>
      )}
    </div>
  );
}
