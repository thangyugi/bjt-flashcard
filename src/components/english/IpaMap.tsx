"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock, Repeat2, Target } from "lucide-react";
import { CHART, IPA_OUTLINE } from "@/data/english/ipa/chart";
import { useEnStore } from "@/store/en-store";
import { useHydrated } from "@/hooks/useHydrated";
import { EnSpeakButton } from "./EnSpeak";
import { useDueCount } from "./EnLessonBits";
import { cn } from "@/lib/utils";

/** Bảng 44 âm: bấm loa nghe từ khóa, bấm ký hiệu để tới bài học. */
export function IpaChart({ available }: { available: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      {CHART.map((g) => (
        <section key={g.title} className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-[17px] font-extrabold text-ink">{g.title}</h3>
            <span className="text-[13px] text-ink-3">{g.note}</span>
          </div>
          <div className="flex flex-col gap-2">
            {g.rows.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {row.map((c) => {
                  const ok = available.includes(c.lesson);
                  return (
                    <div key={c.symbol} className="flex items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5">
                      <Link
                        href={ok ? `/english/ipa/${c.lesson}` : "/english/ipa"}
                        className={cn("flex min-w-0 flex-1 flex-col", !ok && "pointer-events-none opacity-60")}
                      >
                        <span className="font-ipa text-[26px] leading-none font-semibold text-ink">/{c.symbol}/</span>
                        <span className="text-[13px] text-ink-3">{c.key}</span>
                      </Link>
                      <EnSpeakButton text={c.key} label={`Nghe "${c.key}"`} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Mục lục các bài + trạng thái đã học */
export function IpaLessonList({ available }: { available: string[] }) {
  const hydrated = useHydrated();
  const done = useEnStore((s) => s.done);
  const groups = [...new Set(IPA_OUTLINE.map((l) => l.group))];
  return (
    <div className="flex flex-col gap-5">
      {groups.map((g) => (
        <section key={g} className="flex flex-col gap-2">
          <h3 className="text-[13px] font-bold tracking-[0.08em] text-ink-3 uppercase">{g}</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {IPA_OUTLINE.filter((l) => l.group === g).map((l) => {
              const ok = available.includes(l.id);
              const isDone = hydrated && !!done[l.id];
              const num = Number(l.id.slice(4));
              const body = (
                <>
                  <span className="w-8 shrink-0 text-[13px] font-bold text-ink-3">{num}</span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-ipa text-[17px] font-semibold text-ink">{l.mark}</span>
                    <span className="truncate font-ipa text-[13px] text-ink-2">{l.title}</span>
                  </span>
                  {!ok ? (
                    <Lock className="h-4 w-4 text-ink-3" aria-label="Sắp có" />
                  ) : isDone ? (
                    <CheckCircle2 className="h-5 w-5 text-ok" aria-label="Đã học" />
                  ) : (
                    <Circle className="h-5 w-5 text-line-strong" aria-hidden />
                  )}
                </>
              );
              return ok ? (
                <Link key={l.id} href={`/english/ipa/${l.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 hover:border-[#1d4ed8]">
                  {body}
                </Link>
              ) : (
                <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-dashed border-line px-4 py-3 opacity-60">
                  {body}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Hai thẻ: Luyện tập & Ôn tập hôm nay */
export function IpaPracticeCards() {
  const { due, total } = useDueCount();
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Link href="/english/ipa/practice" className="flex items-center gap-4 rounded-3xl bg-[#1d4ed8] px-5 py-5 text-white hover:bg-[#1e40af]">
        <Target className="h-10 w-10 shrink-0" aria-hidden />
        <span className="flex flex-col">
          <span className="text-[18px] font-extrabold">Phòng luyện tập</span>
          <span className="text-[13.5px] text-white/85">Nghe phân biệt, đọc & viết phiên âm, tìm âm — 3 cấp độ</span>
        </span>
      </Link>
      <Link href="/english/ipa/review" className="flex items-center gap-4 rounded-3xl border border-line bg-surface px-5 py-5 hover:border-[#1d4ed8]">
        <Repeat2 className="h-10 w-10 shrink-0 text-[#1d4ed8]" aria-hidden />
        <span className="flex flex-col">
          <span className="text-[18px] font-extrabold text-ink">
            Ôn tập hôm nay {due > 0 && <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-[13px] text-white">{due}</span>}
          </span>
          <span className="text-[13.5px] text-ink-2">
            {total ? `${total} âm trong bộ ôn tập — quay lại đúng lúc sắp quên để nhớ lâu` : "Học xong bài nào, âm của bài đó tự vào bộ ôn tập"}
          </span>
        </span>
      </Link>
    </div>
  );
}
