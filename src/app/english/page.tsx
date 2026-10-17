import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookA, Languages, Lock, MessagesSquare, PenLine } from "lucide-react";
import { ipaStats } from "@/data/english/ipa";

export const metadata: Metadata = {
  title: "Tiếng Anh — Khóa học",
  description: "Khóa tiếng Anh cho người Việt: phát âm IPA, từ vựng, ngữ pháp và luyện tập.",
};

const SOON = [
  { icon: BookA, title: "Từ vựng", desc: "Từ vựng theo chủ đề, có phiên âm, ví dụ và ôn tập ngắt quãng." },
  { icon: PenLine, title: "Ngữ pháp", desc: "Ngữ pháp từ nền tảng đến nâng cao, giải thích bằng tiếng Việt." },
  { icon: MessagesSquare, title: "Luyện nói & nghe", desc: "Shadowing, hội thoại, luyện nghe theo tình huống." },
];

export default function EnglishHome() {
  const s = ipaStats();
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/courses" className="hover:text-ink">Khóa học</Link>
        <span>/</span>
        <span className="text-ink-2">Tiếng Anh</span>
      </nav>
      <header className="flex flex-col gap-2">
        <span className="text-[14px] font-bold tracking-[0.2em] text-[#1d4ed8]">ENGLISH</span>
        <h1 className="text-[32px] leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-[40px]">Khóa tiếng Anh</h1>
        <p className="max-w-[640px] text-[16px] leading-relaxed text-ink-2">
          Bắt đầu từ nền móng: phát âm chuẩn với IPA. Nghe đúng — nói đúng — rồi mới học từ vựng và ngữ pháp thật nhanh.
        </p>
      </header>

      <Link href="/english/ipa" className="group relative flex flex-col gap-3 overflow-hidden rounded-3xl bg-[#0f1f47] px-6 py-7 text-white sm:px-9">
        <div className="pointer-events-none absolute -top-16 -right-12 h-56 w-56 rounded-full bg-[#1d4ed8]/80" aria-hidden />
        <span className="relative flex items-center gap-2 text-[13px] font-semibold tracking-[0.1em] text-[#b9c8f0] uppercase">
          <Languages className="h-4 w-4" aria-hidden /> Bước 1 · Phát âm
        </span>
        <span className="relative font-ipa text-[40px] leading-none font-semibold">/aɪ piː eɪ/</span>
        <span className="relative text-[22px] font-extrabold">IPA — 44 âm tiếng Anh</span>
        <span className="relative max-w-[620px] text-[14.5px] leading-relaxed text-[#dbe4fb]">
          Cách đặt miệng, nghe mẫu, quy luật nhìn chữ đoán âm, cặp từ dễ nhầm, câu chuyện, phòng luyện tập 3 cấp độ và ôn tập ngắt quãng.
        </span>
        <span className="relative flex flex-wrap items-center gap-2 text-[13px]">
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">{s.lessons} bài</span>
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">{s.phonemes} âm</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-bold text-[#0f1f47]">
            Vào học <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </span>
      </Link>

      <div className="grid gap-3 sm:grid-cols-3">
        {SOON.map((c) => (
          <div key={c.title} className="flex flex-col gap-2 rounded-2xl border border-dashed border-line-strong bg-surface px-5 py-5 opacity-80">
            <div className="flex items-center justify-between">
              <c.icon className="h-6 w-6 text-ink-3" aria-hidden />
              <span className="flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-ink-3">
                <Lock className="h-3 w-3" aria-hidden /> Sắp có
              </span>
            </div>
            <span className="text-[17px] font-extrabold text-ink">{c.title}</span>
            <span className="text-[13.5px] leading-relaxed text-ink-2">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
