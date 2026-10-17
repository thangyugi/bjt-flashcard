"use client";

import { useState } from "react";
import { Ear, Eye, Keyboard, Search, Shuffle, Sparkles } from "lucide-react";
import type { IpaLevel, IpaQuestion } from "@/data/english/ipa/types";
import type { PhonemeRef } from "@/data/english/ipa";
import { findSound, ipaToWord, listenPairs, shuffle, symbolToKeyword, wordToIpa } from "@/data/english/ipa/practice";
import { EnQuiz } from "./EnQuiz";
import { cn } from "@/lib/utils";

const MODES = [
  { key: "nghe", icon: Ear, title: "Nghe phân biệt", desc: "Nghe một từ trong cặp tối thiểu, chọn đúng từ." },
  { key: "phien-am", icon: Keyboard, title: "Từ → phiên âm", desc: "Chọn phiên âm IPA đúng cho từ." },
  { key: "doc", icon: Eye, title: "Phiên âm → từ", desc: "Đọc ký hiệu IPA, đoán từ." },
  { key: "tim-am", icon: Search, title: "Tìm âm", desc: "Chọn từ chứa âm cho trước." },
  { key: "tu-khoa", icon: Sparkles, title: "Ký hiệu ↔ từ khóa", desc: "Nhớ từ khóa neo của từng âm." },
  { key: "tron", icon: Shuffle, title: "Trộn tất cả", desc: "Đề tổng hợp mọi dạng + câu lý thuyết." },
] as const;

const LEVELS: { key: IpaLevel; desc: string; n: number }[] = [
  { key: "Cơ bản", desc: "12 nguyên âm đơn", n: 10 },
  { key: "Trung cấp", desc: "+ nguyên âm đôi & phụ âm", n: 12 },
  { key: "Nâng cao", desc: "Tất cả + trọng âm, nối âm", n: 15 },
];

const ORDER: IpaLevel[] = ["Cơ bản", "Trung cấp", "Nâng cao"];

/** Phòng luyện tập: chọn dạng bài + cấp độ → tạo đề ngẫu nhiên từ các bài đã có. */
export function PracticeRoom({ phonemes, theory }: { phonemes: PhonemeRef[]; theory: { level: IpaLevel; qs: IpaQuestion[] }[] }) {
  const [mode, setMode] = useState<(typeof MODES)[number]["key"]>("nghe");
  const [level, setLevel] = useState<IpaLevel>("Cơ bản");
  const [session, setSession] = useState<{ id: number; qs: IpaQuestion[] } | null>(null);

  const start = () => {
    const seed = Date.now() % 100000;
    const lv = LEVELS.find((l) => l.key === level)!;
    const pool = phonemes.filter((p) => ORDER.indexOf(p.level) <= ORDER.indexOf(level));
    const n = lv.n;
    const gen: Record<string, () => IpaQuestion[]> = {
      nghe: () => listenPairs(pool, seed, n),
      "phien-am": () => wordToIpa(pool, seed, n),
      doc: () => ipaToWord(pool, seed, n),
      "tim-am": () => findSound(pool, phonemes, seed, n),
      "tu-khoa": () => symbolToKeyword(pool, seed, n),
      tron: () => {
        const extra = theory.filter((t) => ORDER.indexOf(t.level) <= ORDER.indexOf(level)).flatMap((t) => t.qs);
        const all = [
          ...listenPairs(pool, seed, 4),
          ...wordToIpa(pool, seed + 1, 3),
          ...ipaToWord(pool, seed + 2, 3),
          ...findSound(pool, phonemes, seed + 3, 3),
          ...shuffle(extra, () => Math.random()).slice(0, 3),
        ];
        return shuffle(all, () => Math.random()).slice(0, n);
      },
    };
    setSession({ id: seed, qs: gen[mode]() });
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-[15px] font-bold text-ink">1. Chọn dạng bài</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              aria-pressed={mode === m.key}
              className={cn(
                "flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                mode === m.key ? "border-[#1d4ed8] bg-[#eef3ff]" : "border-line bg-surface hover:border-line-strong"
              )}
            >
              <m.icon className={cn("mt-0.5 h-5 w-5 shrink-0", mode === m.key ? "text-[#1d4ed8]" : "text-ink-3")} aria-hidden />
              <span className="flex flex-col">
                <span className="font-bold text-ink">{m.title}</span>
                <span className="text-[13px] text-ink-2">{m.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[15px] font-bold text-ink">2. Chọn cấp độ</h2>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setLevel(l.key)}
              aria-pressed={level === l.key}
              className={cn(
                "flex flex-col rounded-2xl border px-4 py-2.5 text-left",
                level === l.key ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink hover:border-line-strong"
              )}
            >
              <span className="font-bold">{l.key}</span>
              <span className={cn("text-[12.5px]", level === l.key ? "text-paper/75" : "text-ink-3")}>
                {l.desc} · {l.n} câu
              </span>
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={start}
        className="h-12 w-full rounded-2xl bg-[#1d4ed8] text-[16px] font-bold text-white hover:bg-[#1e40af] sm:w-fit sm:px-8"
      >
        {session ? "Tạo đề mới" : "Bắt đầu luyện"}
      </button>

      {session && (
        <section className="flex flex-col gap-3">
          {session.qs.length === 0 ? (
            <p className="rounded-2xl bg-surface-2 px-4 py-3 text-[14px] text-ink-2">Chưa đủ dữ liệu cho dạng bài này ở cấp độ đã chọn.</p>
          ) : (
            <EnQuiz key={session.id} storeKey={`practice/${mode}/${level}`} questions={session.qs} />
          )}
        </section>
      )}
    </div>
  );
}
