"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarCheck, RotateCcw } from "lucide-react";
import type { PhonemeRef } from "@/data/english/ipa";
import { useHydrated } from "@/hooks/useHydrated";
import { itemKey } from "@/lib/learning/keys";
import { fmtDate, GradeButtons, useReviewQueue } from "@/components/learning/ReviewKit";
import { EnSpeakButton } from "./EnSpeak";
import { Ipa } from "./EnText";
import { enrollPhonemes } from "./EnLessonBits";

type Lite = Pick<PhonemeRef, "id" | "symbol" | "name" | "keyword" | "how" | "words" | "lessonId" | "lessonNum" | "memo">;

const isPhoneme = (c: { item: string }) => c.item.startsWith("en.phoneme.");

/** Ôn tập ngắt quãng các âm IPA (FSRS): thẻ đến hạn → tự nhớ lại → lật → tự chấm. */
export function ReviewDeck({ phonemes }: { phonemes: Lite[] }) {
  const hydrated = useHydrated();
  const [flipped, setFlipped] = useState(false);
  const r = useReviewQueue(isPhoneme);
  if (!hydrated) return null;

  if (!r.total)
    return (
      <div className="flex flex-col items-start gap-3 rounded-3xl border border-line bg-surface px-6 py-6">
        <p className="text-[15px] leading-relaxed text-ink-2">
          Bộ ôn tập đang trống. Học xong một bài (hoặc làm hết phần luyện tập cuối bài) thì các âm của bài đó tự được thêm vào.
          Bạn cũng có thể thêm ngay tất cả {phonemes.length} âm đã có bài.
        </p>
        <button
          type="button"
          onClick={() => enrollPhonemes(phonemes.map((p) => p.id))}
          className="rounded-xl bg-[#1d4ed8] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1e40af]"
        >
          Thêm tất cả âm vào bộ ôn tập
        </button>
      </div>
    );

  const cur = r.current ? phonemes.find((p) => itemKey.phoneme(p.id) === r.current!.item) : undefined;

  if (!r.current || !cur)
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface px-6 py-10 text-center">
        <CalendarCheck className="h-10 w-10 text-ok" aria-hidden />
        <p className="text-[18px] font-extrabold text-ink">{r.done ? `Xong ${r.done} lượt ôn hôm nay! 🎉` : "Hiện không còn thẻ nào đến hạn."}</p>
        <p className="text-[14px] text-ink-2">
          {r.total} âm trong bộ ôn tập{r.nextDue ? ` · lượt tiếp theo: ${fmtDate(r.nextDue)}` : ""}.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Link href="/english/ipa/practice" className="rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
            Sang phòng luyện tập
          </Link>
          <Link href="/review" className="rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
            Ôn tập mọi khóa
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-[13px] text-ink-3">
        <span>
          Còn <b className="text-ink">{r.remaining}</b> thẻ · đã ôn {r.current.reps} lần · quên {r.current.lapses} lần
        </span>
        <span>Phiên này: {r.done}</span>
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
            <button type="button" onClick={() => setFlipped(true)} className="h-12 rounded-2xl bg-ink px-8 text-[15px] font-bold text-paper hover:bg-ink/90">
              Lật thẻ
            </button>
          </div>
        )}
      </div>

      {flipped && (
        <GradeButtons
          card={r.current}
          onGrade={(g) => {
            r.answer(g);
            setFlipped(false);
          }}
        />
      )}
      <button
        type="button"
        onClick={() => {
          r.restart();
          setFlipped(false);
        }}
        className="inline-flex w-fit items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Làm mới danh sách
      </button>
    </div>
  );
}
