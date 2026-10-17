"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck, RotateCcw } from "lucide-react";
import type { PhonemeRef } from "@/data/english/ipa";
import { SRS_DAYS, todayKey, useEnStore } from "@/store/en-store";
import { useHydrated } from "@/hooks/useHydrated";
import { EnSpeakButton } from "./EnSpeak";
import { Ipa } from "./EnText";
import { cn } from "@/lib/utils";

type Lite = Pick<PhonemeRef, "id" | "symbol" | "name" | "keyword" | "how" | "words" | "lessonId" | "lessonNum" | "memo">;

/** Ôn tập ngắt quãng: thẻ đến hạn hôm nay → tự nhớ lại → lật → tự chấm. */
export function ReviewDeck({ phonemes }: { phonemes: Lite[] }) {
  const hydrated = useHydrated();
  const { srs, grade, enroll } = useEnStore();
  const [queue, setQueue] = useState<string[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const byId = useMemo(() => new Map(phonemes.map((p) => [p.id, p])), [phonemes]);

  if (!hydrated) return null;
  const today = todayKey();
  const enrolled = Object.entries(srs).filter(([id]) => byId.has(id));
  const due = enrolled.filter(([, c]) => c.due <= today).sort((a, b) => a[1].box - b[1].box).map(([id]) => id);

  if (!enrolled.length)
    return (
      <div className="flex flex-col items-start gap-3 rounded-3xl border border-line bg-surface px-6 py-6">
        <p className="text-[15px] leading-relaxed text-ink-2">
          Bộ ôn tập đang trống. Học xong một bài (hoặc làm hết phần luyện tập cuối bài) thì các âm của bài đó tự được thêm vào.
          Bạn cũng có thể thêm ngay tất cả {phonemes.length} âm đã có bài.
        </p>
        <button
          type="button"
          onClick={() => enroll(phonemes.map((p) => p.id))}
          className="rounded-xl bg-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1e40af]"
        >
          Thêm tất cả âm vào bộ ôn tập
        </button>
      </div>
    );

  const q = queue ?? due;
  const cur = q[0] ? byId.get(q[0]) : undefined;

  if (!cur) {
    const next = enrolled.map(([, c]) => c.due).filter((d) => d > today).sort()[0];
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface px-6 py-10 text-center">
        <CalendarCheck className="h-10 w-10 text-ok" aria-hidden />
        <p className="text-[18px] font-extrabold text-ink">{doneCount ? `Xong ${doneCount} thẻ hôm nay! 🎉` : "Hôm nay không còn thẻ nào đến hạn."}</p>
        <p className="text-[14px] text-ink-2">
          {enrolled.length} âm trong bộ ôn tập{next ? ` · lượt tiếp theo: ${next.split("-").reverse().join("/")}` : ""}.
        </p>
        <Link href="/english/ipa/practice" className="mt-2 rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
          Sang phòng luyện tập
        </Link>
      </div>
    );
  }

  const card = srs[cur.id];
  const answer = (g: 0 | 1 | 2) => {
    grade(cur.id, g);
    setFlipped(false);
    setDoneCount((n) => n + 1);
    const rest = q.slice(1);
    setQueue(g === 0 ? [...rest, cur.id] : rest);
  };
  const nextBox = Math.min(SRS_DAYS.length - 1, (card?.box ?? 1) + 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-[13px] text-ink-3">
        <span>
          Còn <b className="text-ink">{q.length}</b> thẻ · hộp {card?.box ?? 1}/{SRS_DAYS.length - 1}
        </span>
        <span>Đã ôn: {doneCount}</span>
      </div>

      <div className="flex min-h-[340px] flex-col overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="flex flex-col items-center justify-center gap-3 bg-[#0f1f47] px-6 py-10 text-white">
          <span className="font-ipa text-[64px] leading-none font-semibold">/{cur.symbol}/</span>
          {!flipped && <span className="text-[14px] text-[#b9c8f0]">Đọc to âm này và nói từ khóa của nó — rồi lật thẻ.</span>}
        </div>
        {flipped ? (
          <div className="flex flex-col gap-4 px-5 py-5 sm:px-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[20px] font-extrabold text-ink">“{cur.name}”</span>
              <span className="text-ink-3">—</span>
              <b className="text-[18px] text-ink">{cur.keyword.w}</b>
              <Ipa ipa={cur.keyword.ipa} className="text-[16px] text-[#1d4ed8]" />
              <EnSpeakButton text={cur.keyword.w} label="Nghe từ khóa" size="md" />
            </div>
            <ul className="flex flex-col gap-1.5">
              {cur.how.slice(0, 3).map((h) => (
                <li key={h} className="text-[14.5px] leading-relaxed text-ink">
                  • {h}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {cur.words.slice(0, 4).map((w) => (
                <span key={w.w} className="flex items-center gap-1.5 rounded-xl border border-line px-2.5 py-1.5">
                  <EnSpeakButton text={w.w} label={`Nghe "${w.w}"`} />
                  <b className="text-ink">{w.w}</b>
                  <Ipa ipa={w.ipa} className="text-[13px] text-[#1d4ed8]" />
                </span>
              ))}
            </div>
            <p className="rounded-xl bg-[#fdf6e3] px-3.5 py-2.5 font-ipa text-[14px] text-ink">💡 {cur.memo}</p>
            <Link href={`/english/ipa/${cur.lessonId}#${cur.id}`} className="text-[13px] font-semibold text-[#1d4ed8] hover:underline">
              Mở lại bài {cur.lessonNum} →
            </Link>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6">
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="h-12 rounded-2xl bg-ink px-8 text-[15px] font-bold text-paper hover:bg-ink/90"
            >
              Lật thẻ
            </button>
          </div>
        )}
      </div>

      {flipped && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { g: 0 as const, label: "Quên", sub: "ôn lại ngay", cls: "border-brand text-brand-soft-ink bg-brand-soft" },
            { g: 1 as const, label: "Mơ hồ", sub: `${Math.max(1, Math.floor(SRS_DAYS[card?.box ?? 1] / 2))} ngày`, cls: "border-line-strong bg-surface text-ink" },
            { g: 2 as const, label: "Nhớ rõ", sub: `${SRS_DAYS[nextBox]} ngày`, cls: "border-ok bg-ok-soft text-ok-ink" },
          ].map((b) => (
            <button key={b.g} type="button" onClick={() => answer(b.g)} className={cn("flex flex-col items-center rounded-2xl border py-3 font-bold", b.cls)}>
              {b.label}
              <span className="text-[12px] font-medium opacity-80">{b.sub}</span>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          setQueue(null);
          setFlipped(false);
        }}
        className="inline-flex w-fit items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Làm mới danh sách
      </button>
    </div>
  );
}
