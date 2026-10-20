"use client";

import Link from "next/link";
import { CheckCircle2, PlayCircle } from "lucide-react";
import type { N1LessonMeta } from "@/data/jlpt-n1/types";
import { useN1Store } from "@/store/n1-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";
import { Jp } from "./Jp";

/** Bản đồ 20 chương — như mục lục một cuốn tiểu thuyết, kèm tiến độ. */
export function ChapterMap({ lessons, total }: { lessons: N1LessonMeta[]; total: number }) {
  const done = useN1Store((s) => s.done);
  const quiz = useN1Store((s) => s.quiz);
  const lastId = useN1Store((s) => s.lastLessonId);
  const hydrated = useHydrated();

  const doneCount = hydrated ? lessons.filter((l) => done[l.id]).length : 0;
  const pct = Math.round((doneCount / total) * 100);
  const last = hydrated ? lessons.find((l) => l.id === lastId) : undefined;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 panel p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-semibold text-ink-2">Tiến độ câu chuyện</span>
            <span className="text-sm text-ink-3">
              <b className="text-xl text-brand">{doneCount}</b> / {total} chương
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-track">
            <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {last && (
          <Link
            href={`/jlpt-n1/grammar/${last.id}`}
            className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-bold text-paper hover:bg-ink/90"
          >
            <PlayCircle className="h-[18px] w-[18px]" aria-hidden />
            Đọc tiếp Chương {last.num}
          </Link>
        )}
      </div>

      <ol className="grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2">
        {lessons.map((l) => {
          const isDone = hydrated && !!done[l.id];
          const q = hydrated ? quiz[l.id] : undefined;
          return (
            <li key={l.id}>
              <Link
                href={`/jlpt-n1/grammar/${l.id}`}
                className={cn(
                  "group flex h-full gap-4 rounded-2xl border bg-surface p-4 transition-colors hover:border-brand sm:p-5",
                  isDone ? "border-ok/40" : "border-line"
                )}
              >
                <div className="flex w-12 shrink-0 flex-col items-center gap-1 pt-0.5">
                  <span className="font-mincho text-[13px] text-ink-3">第</span>
                  <span className={cn("text-[26px] leading-none font-extrabold", isDone ? "text-ok" : "text-brand")}>{l.num}</span>
                  <span className="font-mincho text-[13px] text-ink-3">章</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-ink-3">
                    <Jp t={l.topicJa} />
                    <span>·</span>
                    <span className="truncate">{l.topicVi}</span>
                    {isDone && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-ok" aria-label="Đã học xong" />}
                  </div>
                  <span className="text-[19px] leading-[1.9] font-bold text-ink group-hover:text-brand">
                    <Jp t={l.chapterJa} className="font-mincho" />
                  </span>
                  <span className="-mt-1 text-[14px] text-ink-2">{l.chapterVi}</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {l.patterns.map((p) => (
                      <span key={p.id} className="rounded-md bg-surface-2 px-2 py-0.5 text-[13px] leading-[1.9] text-ink-2">
                        <Jp t={p.pattern} />
                      </span>
                    ))}
                  </div>
                  {q && (
                    <span className="pt-1 text-[12px] text-ink-3">
                      Tổng ôn: <b className="text-ink">{q.best}/{q.total}</b>
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
