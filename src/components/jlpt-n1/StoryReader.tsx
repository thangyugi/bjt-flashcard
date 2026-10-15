"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { N1StoryPara } from "@/data/jlpt-n1/types";
import { Jp } from "./Jp";
import { Reveal } from "./Reveal";
import { SpeakButton } from "./Speak";

/** Đoạn truyện của chương: tiếng Nhật có furigana, mẫu ngữ pháp tô đậm, bản dịch chạm để xem. */
export function StoryReader({ story }: { story: N1StoryPara[] }) {
  const [all, setAll] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <SpeakButton text={story.map((p) => p.jp)} label="Nghe cả truyện" showLabel size="md" className="mr-auto" />
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          className="flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-[13px] font-semibold text-ink-2 hover:bg-surface-2"
        >
          {all ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
          {all ? "Ẩn bản dịch" : "Hiện tất cả bản dịch"}
        </button>
      </div>
      {story.map((p, i) => (
        <div key={i} className="grid gap-2 border-l-2 border-brand-muted pl-4 sm:pl-5">
          <div className="flex items-start gap-2">
            <p className="min-w-0 flex-1 text-[18px] leading-[2.3] text-ink">
              <Jp t={p.jp} />
            </p>
            <SpeakButton text={p.jp} label="Nghe đoạn này" className="mt-2" />
          </div>
          <Reveal open={all} className="text-[14px] leading-relaxed text-ink-2">
            {p.vi}
          </Reveal>
        </div>
      ))}
    </div>
  );
}
