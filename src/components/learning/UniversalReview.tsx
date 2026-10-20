"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck, RotateCcw } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useSrsStore, type StoredCard } from "@/store/srs-store";
import { COURSE_LABEL, ITEM_TYPE_LABEL, loadItemIndex, type ItemIndex, type ItemInfo } from "@/lib/learning/items";
import { SpeakButton } from "@/components/jlpt-n1/Speak";
import { EnSpeakButton } from "@/components/english/EnSpeak";
import { fmtDate, GradeButtons, useReviewQueue } from "./ReviewKit";
import { cn } from "@/lib/utils";

const COURSES = ["all", "jlpt-n1", "bjt", "english", "oci-ai"] as const;
type CourseFilter = (typeof COURSES)[number];

const inCourse = (f: CourseFilter, idx: ItemIndex | null) => (c: StoredCard) =>
  f === "all" || c.course === f || !!idx?.items[c.item]?.c.includes(f);

/** Ôn tập hôm nay — mọi khóa trong một hàng, lọc theo khóa. */
export function UniversalReview() {
  const hydrated = useHydrated();
  const [idx, setIdx] = useState<ItemIndex | null>(null);
  const [err, setErr] = useState(false);
  const [course, setCourse] = useState<CourseFilter>("all");
  useEffect(() => {
    loadItemIndex().then(setIdx, () => setErr(true));
  }, []);
  if (!hydrated) return null;
  if (err) return <p className="text-[14px] text-brand">Không tải được danh mục mục học. Kiểm tra mạng rồi tải lại trang.</p>;
  if (!idx) return <p className="text-[14px] text-ink-3">Đang tải…</p>;
  return (
    <div className="flex flex-col gap-4">
      <CourseChips idx={idx} value={course} onChange={setCourse} />
      {/* key: đổi bộ lọc = phiên ôn mới */}
      <Session key={course} idx={idx} course={course} />
    </div>
  );
}

function CourseChips({ idx, value, onChange }: { idx: ItemIndex; value: CourseFilter; onChange: (c: CourseFilter) => void }) {
  const cards = useSrsStore((s) => s.cards);
  const now = new Date().toISOString();
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo khóa">
      {COURSES.map((c) => {
        const f = inCourse(c, idx);
        const list = Object.values(cards).filter((x) => !x.suspended && f(x));
        if (c !== "all" && !list.length) return null;
        const due = list.filter((x) => x.due <= now).length;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={value === c}
            onClick={() => onChange(c)}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
              value === c ? "border-ink bg-ink text-paper" : "border-line-strong bg-surface text-ink-2 hover:text-ink"
            )}
          >
            {c === "all" ? "Tất cả" : COURSE_LABEL[c]}
            {due > 0 && <span className={cn("rounded-full px-1.5 text-[11.5px]", value === c ? "bg-paper/20" : "bg-brand text-white")}>{due}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Session({ idx, course }: { idx: ItemIndex; course: CourseFilter }) {
  const [flipped, setFlipped] = useState(false);
  const filter = useMemo(() => inCourse(course, idx), [course, idx]);
  const r = useReviewQueue(filter);

  if (!r.total)
    return (
      <div className="flex flex-col gap-3 panel px-6 py-6">
        <p className="text-[15px] leading-relaxed text-ink-2">
          Bộ ôn tập đang trống. Thêm mục học từ các bài: nút <b>“Thêm … vào ôn tập”</b> ở đầu mỗi bài từ vựng / ngữ pháp N1, học xong bài
          IPA, hoặc đánh dấu từ BJT là “đang học”.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/jlpt-n1/vocab" className="rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
            Từ vựng N1
          </Link>
          <Link href="/english/ipa" className="rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
            Phát âm IPA
          </Link>
          <Link href="/study" className="rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
            Flashcard BJT
          </Link>
        </div>
      </div>
    );

  const info = r.current ? idx.items[r.current.item] : undefined;
  if (!r.current)
    return (
      <div className="flex flex-col items-center gap-3 panel px-6 py-10 text-center">
        <CalendarCheck className="h-10 w-10 text-ok" aria-hidden />
        <p className="text-[18px] font-extrabold text-ink">{r.done ? `Xong ${r.done} lượt ôn! 🎉` : "Hiện không còn thẻ nào đến hạn."}</p>
        <p className="text-[14px] text-ink-2">
          {r.total} thẻ trong bộ ôn tập{r.nextDue ? ` · lượt tiếp theo: ${fmtDate(r.nextDue)}` : ""}.
        </p>
        <Link href="/progress" className="mt-2 rounded-xl border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:bg-surface-2">
          Xem tiến độ học tập
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-[13px] text-ink-3">
        <span>
          Còn <b className="text-ink">{r.remaining}</b> thẻ{info ? ` · ${ITEM_TYPE_LABEL[info.t] ?? info.t}` : ""}
        </span>
        <span>Phiên này: {r.done}</span>
      </div>
      <div className="flex min-h-[320px] flex-col overflow-hidden panel">
        <Front info={info} fallback={r.current.item} />
        {flipped ? (
          <Back info={info} />
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

const PROMPT: Record<string, string> = {
  word: "Đọc to từ này, nhớ cách đọc và nghĩa — rồi lật thẻ.",
  grammar_pattern: "Mẫu này nghĩa là gì, dùng khi nào? Thử đặt một câu — rồi lật thẻ.",
  phoneme: "Đọc to âm này và nói từ khóa của nó — rồi lật thẻ.",
  term: "Giải thích thuật ngữ này bằng lời của bạn — rồi lật thẻ.",
};

function Front({ info, fallback }: { info?: ItemInfo; fallback: string }) {
  const ja = info && (info.t === "word" || info.t === "grammar_pattern");
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-ink px-6 py-10 text-center text-paper">
      <span
        className={cn(
          "leading-tight font-semibold break-words",
          ja ? "font-jp text-[44px] sm:text-[56px]" : info?.t === "phoneme" ? "font-ipa text-[64px]" : "text-[34px]"
        )}
      >
        {info ? (info.t === "phoneme" ? `/${info.h}/` : info.h) : fallback}
      </span>
      <span className="max-w-[420px] text-[14px] text-[#d8cfc6]">{PROMPT[info?.t ?? ""] ?? "Nhớ lại nội dung — rồi lật thẻ."}</span>
    </div>
  );
}

function Back({ info }: { info?: ItemInfo }) {
  if (!info) return <p className="px-6 py-5 text-[14px] text-ink-3">Mục này không còn trong danh mục.</p>;
  const ja = info.t === "word" || info.t === "grammar_pattern";
  return (
    <div className="flex flex-col gap-3 px-5 py-5 sm:px-7">
      <div className="flex flex-wrap items-center gap-3">
        {info.r && <span className="font-jp text-[22px] font-bold text-ink">{info.r}</span>}
        {info.t === "phoneme" && info.k && (
          <span className="text-[20px] font-bold text-ink">
            {info.k} <span className="font-ipa text-[16px] text-[#1d4ed8]">/{info.ki}/</span>
          </span>
        )}
        {ja && info.s && <SpeakButton text={info.s} label="Nghe" size="md" />}
        {info.t === "phoneme" && info.k && <EnSpeakButton text={info.k} label="Nghe" size="md" />}
      </div>
      <p className="text-[17px] leading-relaxed text-ink">{info.m}</p>
      <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-ink-3">
        {info.c.map((c) => (
          <span key={c} className="rounded-full bg-surface-2 px-2 py-0.5 font-semibold">
            {COURSE_LABEL[c] ?? c}
          </span>
        ))}
        <Link href={info.u} className="ml-auto font-semibold text-brand hover:underline">
          Mở bài →
        </Link>
      </div>
    </div>
  );
}
