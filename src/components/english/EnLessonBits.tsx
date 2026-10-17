"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Eye, EyeOff } from "lucide-react";
import { useEnStore } from "@/store/en-store";
import { useHydrated } from "@/hooks/useHydrated";
import { Reveal } from "@/components/jlpt-n1/Reveal";
import { EnSpeakButton } from "./EnSpeak";
import { EnText } from "./EnText";
import { cn } from "@/lib/utils";
import { enrollItems } from "@/lib/learning/review";
import { itemKey } from "@/lib/learning/keys";
import { useDue } from "@/hooks/useDue";

export const enrollPhonemes = (ids: string[]) => enrollItems(ids.map((id) => ({ item: itemKey.phoneme(id), course: "english" })));

/** Ghi nhớ bài đang học + nút "Đã học xong" (học xong → các âm của bài vào bộ ôn tập). */
export function EnLessonActions({ lessonId, phonemeIds }: { lessonId: string; phonemeIds: string[] }) {
  const visit = useEnStore((s) => s.visitIpa);
  const done = useEnStore((s) => !!s.done[lessonId]);
  const toggle = useEnStore((s) => s.toggleDone);
  const hydrated = useHydrated();
  useEffect(() => visit(lessonId), [lessonId, visit]);
  const on = hydrated && done;
  return (
    <button
      type="button"
      onClick={() => {
        if (!done) enrollPhonemes(phonemeIds);
        toggle(lessonId);
      }}
      aria-pressed={on}
      className={cn(
        "flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors",
        on ? "border-ok bg-ok-soft text-ok-ink" : "border-white/30 bg-white text-ink hover:bg-surface-2"
      )}
    >
      {on ? <CheckCircle2 className="h-[18px] w-[18px]" aria-hidden /> : <Circle className="h-[18px] w-[18px]" aria-hidden />}
      {on ? "Đã học xong bài này" : "Đánh dấu đã học xong"}
    </button>
  );
}

/** Câu chuyện tiếng Anh: tô đậm từ chứa âm đang học, nghe từng đoạn hoặc cả truyện, bản dịch chạm để xem. */
export function EnStory({ paras }: { paras: { en: string; vi: string }[] }) {
  const [all, setAll] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <EnSpeakButton text={paras.map((p) => p.en)} label="Nghe cả truyện" showLabel size="md" className="mr-auto" />
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          className="flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-[13px] font-semibold text-ink-2 hover:bg-surface-2"
        >
          {all ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
          {all ? "Ẩn bản dịch" : "Hiện tất cả bản dịch"}
        </button>
      </div>
      {paras.map((p, i) => (
        <div key={i} className="grid gap-2 border-l-2 border-[#93b4ff] pl-4 sm:pl-5">
          <div className="flex items-start gap-2">
            <p className="min-w-0 flex-1 text-[17px] leading-[1.9] text-ink">
              <EnText t={p.en} />
            </p>
            <EnSpeakButton text={p.en} label="Nghe đoạn này" className="mt-1" />
          </div>
          <Reveal open={all} className="text-[14px] leading-relaxed text-ink-2">
            {p.vi}
          </Reveal>
        </div>
      ))}
    </div>
  );
}

/** Đếm số thẻ âm IPA đến hạn ôn */
export function useDueCount() {
  return useDue((c) => c.item.startsWith("en.phoneme."));
}
