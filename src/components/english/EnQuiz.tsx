"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { IpaQuestion } from "@/data/english/ipa/types";
import { hashSeed, shuffle } from "@/data/english/ipa/practice";
import { useEnStore } from "@/store/en-store";
import { enrollPhonemes } from "./EnLessonBits";
import { EnSpeakButton } from "./EnSpeak";
import { cn } from "@/lib/utils";

function rand(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Xáo phương án cố định theo nội dung câu hỏi (giống nhau trên server & trình duyệt). */
function prepare(q: IpaQuestion, round: number) {
  if (q.type === "judge") return { opts: ["Đúng", "Sai"], correct: q.ok ? 0 : 1 };
  const idx = shuffle(
    q.opts.map((_, i) => i),
    rand(hashSeed(q.q + (q.say ?? "") + q.opts.join()) + round)
  );
  return { opts: idx.map((i) => q.opts[i]), correct: idx.indexOf(q.answer) };
}

/**
 * Bộ câu hỏi IPA: chọn đáp án → hiện đúng/sai + giải thích ngay.
 * Hết bộ → lưu điểm; nếu có `onFinishLessonId` thì đánh dấu bài xong và thêm các âm vào bộ ôn tập.
 */
export function EnQuiz({
  storeKey,
  questions,
  finishLesson,
}: {
  storeKey: string;
  questions: IpaQuestion[];
  /** Hoàn thành bộ này = học xong bài (thêm âm vào ôn tập) */
  finishLesson?: { id: string; phonemeIds: string[] };
}) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const { saveQuiz, markDone, quiz } = useEnStore();
  const prepared = useMemo(() => questions.map((q) => prepare(q, round)), [questions, round]);
  const answered = Object.keys(picked).length;
  const score = prepared.reduce((n, p, i) => n + (picked[i] === p.correct ? 1 : 0), 0);
  const best = quiz[storeKey]?.best;

  const choose = (i: number, o: number) => {
    if (picked[i] !== undefined) return;
    const next = { ...picked, [i]: o };
    setPicked(next);
    if (Object.keys(next).length === questions.length) {
      const s = prepared.reduce((n, p, k) => n + (next[k] === p.correct ? 1 : 0), 0);
      saveQuiz(storeKey, s, questions.length);
      if (finishLesson) {
        markDone(finishLesson.id);
        enrollPhonemes(finishLesson.phonemeIds);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, i) => {
        const p = prepared[i];
        const mine = picked[i];
        const done = mine !== undefined;
        return (
          <div key={i} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface px-4 py-4 sm:px-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[12px] font-bold text-ink-2">
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {q.type === "choice" && q.label && (
                  <span className="text-[11.5px] font-bold tracking-[0.06em] text-[#1d4ed8] uppercase">{q.label}</span>
                )}
                <p className="font-ipa text-[16px] leading-relaxed text-ink">{q.q}</p>
              </div>
              {q.say && <EnSpeakButton text={q.say} label="Nghe đề" size="md" />}
            </div>
            <div className={cn("grid gap-2", p.opts.length > 2 ? "sm:grid-cols-2" : "grid-cols-2")}>
              {p.opts.map((o, k) => {
                const isRight = k === p.correct;
                return (
                  <button
                    key={k}
                    type="button"
                    disabled={done}
                    onClick={() => choose(i, k)}
                    className={cn(
                      "flex min-h-11 items-center justify-between gap-2 rounded-xl border px-3.5 py-2 text-left font-ipa text-[15px] transition-colors",
                      !done && "border-line-strong bg-paper hover:border-[#1d4ed8] hover:bg-[#f0f5ff]",
                      done && isRight && "border-ok bg-ok-soft text-ok-ink",
                      done && mine === k && !isRight && "border-brand bg-brand-soft text-brand-soft-ink",
                      done && mine !== k && !isRight && "border-line bg-paper text-ink-3"
                    )}
                  >
                    <span>{o}</span>
                    {done && isRight && <Check className="h-4 w-4 shrink-0" aria-hidden />}
                    {done && mine === k && !isRight && <X className="h-4 w-4 shrink-0" aria-hidden />}
                  </button>
                );
              })}
            </div>
            {done && (
              <p className={cn("rounded-xl px-3.5 py-2.5 font-ipa text-[14px] leading-relaxed", mine === p.correct ? "bg-ok-soft text-ok-ink" : "bg-brand-soft text-brand-soft-ink")}>
                <b>{mine === p.correct ? "Chính xác! " : "Chưa đúng. "}</b>
                {q.explain}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-2 px-4 py-3">
        <span className="text-[14px] text-ink-2">
          {answered < questions.length ? (
            <>
              Đã làm <b className="text-ink">{answered}</b>/{questions.length}
            </>
          ) : (
            <>
              Kết quả: <b className="text-ink">{score}</b>/{questions.length}
              {score === questions.length ? " — tuyệt vời! 🎉" : score >= questions.length * 0.7 ? " — tốt lắm!" : " — xem lại phần giải thích nhé."}
            </>
          )}
          {best !== undefined && <span className="ml-2 text-ink-3">(cao nhất: {best})</span>}
        </span>
        <button
          type="button"
          onClick={() => {
            setPicked({});
            setRound((r) => r + 1);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink-2 hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Làm lại (đảo đáp án)
        </button>
      </div>
    </div>
  );
}
