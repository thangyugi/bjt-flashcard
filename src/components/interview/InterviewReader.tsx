"use client";

import { useEffect, useState } from "react";
import { Clock, Minus, Plus } from "lucide-react";
import type { InterviewSection } from "@/data/interview/phongvan";
import { Jp } from "@/components/jlpt-n1/Jp";
import { SpeakButton } from "@/components/jlpt-n1/Speak";
import { cn } from "@/lib/utils";

const SIZES = [16, 18, 20, 22, 24];

const plain = (markup: string) => markup.replace(/\{([^|}]+)\|[^}]+\}/g, "$1");

/** Ước lượng thời gian nói (~300 ký tự/phút, tốc độ phỏng vấn bình tĩnh). */
function speakTime(paragraphs: string[]) {
  const chars = paragraphs.join("").replace(/\{([^|}]+)\|[^}]+\}/g, "$1").replace(/\s/g, "").length;
  const sec = Math.max(10, Math.round((chars / 300) * 60 / 5) * 5);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m ? `${m}分${s ? `${s}秒` : ""}` : `${s}秒`;
}

function readPref<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}

/** Kịch bản phỏng vấn: bật/tắt furigana, đổi cỡ chữ, mục lục dính, nghe từng đoạn. */
export function InterviewReader({ sections }: { sections: InterviewSection[] }) {
  const [furigana, setFurigana] = useState(true);
  const [size, setSize] = useState(1);
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    // Khôi phục lựa chọn đã lưu sau lần render đầu (tránh lệch HTML lúc hydrate)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFurigana(readPref("phongvan-furigana", true));
    setSize(readPref("phongvan-size", 1));
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("phongvan-furigana", JSON.stringify(furigana));
      localStorage.setItem("phongvan-size", JSON.stringify(size));
    } catch {}
  }, [furigana, size]);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  const fs = SIZES[size];

  return (
    <div className="flex flex-col gap-6">
      {/* Thanh công cụ dính: mục lục + furigana + cỡ chữ */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-[var(--gutter)] border-b border-line bg-paper/95 px-[var(--gutter)] py-2.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <nav aria-label="Mục lục" className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none]">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors pointer-coarse:py-2.5",
                  active === s.id ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink-2 hover:text-ink"
                )}
              >
                {plain(s.num ? `${s.num}. ${s.title}` : s.title)}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFurigana((v) => !v)}
              aria-pressed={furigana}
              className={cn(
                "h-9 rounded-lg border px-2.5 font-jp text-[13px] font-bold transition-colors pointer-coarse:h-10",
                furigana ? "border-brand bg-brand-soft text-brand-soft-ink" : "border-line bg-surface text-ink-3"
              )}
              title="Bật / tắt furigana"
            >
              ふりがな
            </button>
            <div className="hidden items-center rounded-lg border border-line bg-surface sm:flex">
              <button type="button" onClick={() => setSize((v) => Math.max(0, v - 1))} aria-label="Chữ nhỏ hơn" className="flex h-9 w-8 items-center justify-center text-ink-2 disabled:opacity-30" disabled={size === 0}>
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="w-5 text-center text-[12px] font-bold text-ink-3">A</span>
              <button type="button" onClick={() => setSize((v) => Math.min(SIZES.length - 1, v + 1))} aria-label="Chữ lớn hơn" className="flex h-9 w-8 items-center justify-center text-ink-2 disabled:opacity-30" disabled={size === SIZES.length - 1}>
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-1.5 sm:hidden">
          <span className="text-[12px] text-ink-3">Cỡ chữ</span>
          {SIZES.map((px, i) => (
            <button
              key={px}
              type="button"
              onClick={() => setSize(i)}
              aria-label={`Cỡ chữ ${px}`}
              className={cn("h-7 w-7 rounded-md text-[12px] font-bold pointer-coarse:h-10 pointer-coarse:w-10", i === size ? "bg-ink text-paper" : "bg-surface-2 text-ink-3")}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="scroll-mt-44 overflow-hidden rounded-3xl border border-line bg-surface md:scroll-mt-36"
          aria-labelledby={`${s.id}-title`}
        >
          <header className="flex flex-col gap-3 border-b border-line bg-surface-2/60 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3.5">
                <span
                  className={cn(
                    "flex h-11 min-w-11 shrink-0 items-center justify-center rounded-2xl px-2 font-mincho text-xl font-bold",
                    s.num ? "bg-ink text-paper" : "bg-brand text-white"
                  )}
                >
                  {s.num ?? "紹"}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h2 id={`${s.id}-title`} className="text-[22px] leading-tight font-extrabold tracking-[-0.01em] text-ink sm:text-[26px]">
                    <Jp t={s.title} className={cn(!furigana && "[&_rt]:invisible")} />
                  </h2>
                  <p className="text-[15px] leading-[2] font-semibold text-ink-2">
                    <Jp t={s.subtitle} className={cn(!furigana && "[&_rt]:invisible")} />
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[12px] font-semibold text-ink-3" title="Thời gian nói ước tính">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                <span className="font-jp">{speakTime(s.paragraphs)}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12.5px] leading-[1.9] text-ink-2">
                  <Jp t={t} className={cn(!furigana && "[&_rt]:invisible")} />
                </span>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-1 px-3 py-4 sm:px-5 sm:py-5">
            {s.paragraphs.map((p, i) => (
              <div key={i} className="group flex items-start gap-2 rounded-2xl px-2 py-2 transition-colors hover:bg-surface-2/60 sm:px-3">
                <p
                  className={cn("min-w-0 flex-1 text-ink", furigana ? "leading-[2.35]" : "leading-[1.95]")}
                  style={{ fontSize: fs }}
                >
                  <Jp t={p} className={cn(!furigana && "[&_rt]:hidden")} />
                </p>
                <SpeakButton text={p} label="Nghe đoạn này" className="mt-1.5 opacity-70 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
