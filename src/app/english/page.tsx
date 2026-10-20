import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookA, Languages, MessagesSquare, PenLine } from "lucide-react";
import { ipaStats } from "@/data/english/ipa";
import { Page, PageHeader, Section, SoonTag } from "@/components/ui/page";

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
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "Tiếng Anh" }]}
        accent="#1d4ed8"
        eyebrow="English"
        title="Khóa tiếng Anh"
        lead="Bắt đầu từ nền móng: phát âm chuẩn với IPA. Nghe đúng — nói đúng — rồi mới học từ vựng và ngữ pháp thật nhanh."
      />

      <Section title="Bước 1 · Phát âm" id="en-step1">
        <Link href="/english/ipa" className="group panel flex flex-col gap-3 px-6 py-7 transition-colors hover:border-[#1d4ed8] sm:flex-row sm:items-center sm:gap-10 sm:px-9">
          <span className="font-ipa text-[44px] leading-none font-semibold text-[#1d4ed8] sm:text-[56px]">/aɪ piː eɪ/</span>
          <span className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="flex items-center gap-2 eyebrow-label">
              <Languages className="h-4 w-4" aria-hidden /> IPA — 44 âm tiếng Anh
            </span>
            <span className="max-w-[620px] text-[14.5px] leading-relaxed text-ink-2">
              Cách đặt miệng, nghe mẫu, quy luật nhìn chữ đoán âm, cặp từ dễ nhầm, câu chuyện, phòng luyện tập 3 cấp độ và ôn tập ngắt quãng.
            </span>
            <span className="flex flex-wrap items-center gap-2 text-[13px] text-ink-2">
              <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">{s.lessons} bài</span>
              <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">{s.phonemes} âm</span>
            </span>
          </span>
          <span className="inline-flex h-11 w-fit items-center gap-2 rounded-[10px] bg-[#1d4ed8] px-[18px] text-[14.5px] font-semibold text-white">
            Vào học <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </Section>

      <Section title="Sắp có" id="en-soon">
        <div className="grid gap-3 sm:grid-cols-3">
          {SOON.map((c) => (
            <div key={c.title} className="flex flex-col gap-2 rounded-[14px] bg-surface-2/60 px-5 py-5">
              <div className="flex items-center justify-between">
                <c.icon className="h-6 w-6 text-ink-3" aria-hidden />
                <SoonTag />
              </div>
              <span className="text-[17px] font-extrabold text-ink">{c.title}</span>
              <span className="text-[13.5px] leading-relaxed text-ink-2">{c.desc}</span>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
