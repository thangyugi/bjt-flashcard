"use client";

import Link from "next/link";
import { CheckCircle2, PlayCircle } from "lucide-react";
import type { VocabLessonMeta } from "@/data/jlpt-n1/vocab/types";
import { useN1Store } from "@/store/n1-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";
import { Jp } from "./Jp";

/** Mục lục các bài từ vựng kèm tiến độ. */
export function VocabMap({ lessons, totalWords }: { lessons: VocabLessonMeta[]; totalWords: number }) {
  const done = useN1Store((s) => s.done);
  const lastId = useN1Store((s) => s.lastVocabId);
  const hydrated = useHydrated();

  const doneLessons = hydrated ? lessons.filter((l) => done[l.id]) : [];
  const doneWords = doneLessons.reduce((s, l) => s + l.words.length, 0);
  const pct = totalWords ? Math.round((doneWords / totalWords) * 100) : 0;
  const last = hydrated ? lessons.find((l) => l.id === lastId) : undefined;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 panel p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-semibold text-ink-2">Đã học xong</span>
            <span className="text-sm text-ink-3">
              <b className="text-xl text-brand">{doneWords}</b> / {totalWords} từ · {doneLessons.length}/{lessons.length} bài
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-track">
            <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {last && (
          <Link
            href={`/jlpt-n1/vocab/${last.id}`}
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-bold text-paper hover:bg-ink/90"
          >
            <PlayCircle className="h-[18px] w-[18px]" aria-hidden />
            Học tiếp Bài {last.num}
          </Link>
        )}
      </div>

      <ol className="grid gap-3 md:grid-cols-2">
        {lessons.map((l) => {
          const isDone = hydrated && !!done[l.id];
          return (
            <li key={l.id}>
              <Link
                href={`/jlpt-n1/vocab/${l.id}`}
                className={cn(
                  "group flex h-full flex-col gap-2 rounded-2xl border bg-surface p-4 transition-colors hover:border-brand sm:p-5",
                  isDone ? "border-ok/40" : "border-line"
                )}
              >
                <div className="flex items-center gap-2 text-[12px] font-semibold text-ink-3">
                  <span className={cn("rounded-md px-1.5 py-0.5 font-bold text-white", isDone ? "bg-ok" : "bg-brand")}>Bài {l.num}</span>
                  <span>
                    Từ {l.range[0]}–{l.range[1]} · {l.words.length} từ
                  </span>
                  {isDone && <CheckCircle2 className="ml-auto h-4 w-4 text-ok" aria-label="Đã học xong" />}
                </div>
                <span className="text-[18px] font-bold text-ink group-hover:text-brand">{l.title}</span>
                <span className="-mt-1 text-[14px] leading-[1.9] text-ink-2">
                  <Jp t={l.titleJa} />
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {l.words.slice(0, 8).map((w) => (
                    <span key={w.w + w.r} className="rounded-md bg-surface-2 px-2 py-0.5 font-jp text-[13px] text-ink-2">
                      {w.w}
                    </span>
                  ))}
                  {l.words.length > 8 && <span className="px-1 text-[13px] text-ink-3">+{l.words.length - 8}</span>}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
