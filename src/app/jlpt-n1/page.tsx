import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookA, BookOpen, Headphones, Languages, ScrollText } from "lucide-react";
import { N1_LESSONS, getN1Stats, toMeta } from "@/data/jlpt-n1/course";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { vocabStats } from "@/data/jlpt-n1/vocab";
import { ChapterMap } from "@/components/jlpt-n1/ChapterMap";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "JLPT N1 — Khóa học tiếng Nhật N1",
  description: "Lộ trình JLPT N1: ngữ pháp Shinkanzen kể thành truyện, furigana đầy đủ, so sánh mẫu gần nghĩa và trắc nghiệm.",
};

export default function JlptN1Home() {
  const stats = getN1Stats();
  const vocab = vocabStats();
  const lessons = withFurigana(N1_LESSONS.map(toMeta));
  const skills = [
    {
      href: "/jlpt-n1/grammar",
      icon: ScrollText,
      ja: "文法",
      title: "Ngữ pháp",
      desc: `${stats.patterns} mẫu · ${stats.lessons} chương truyện · ${stats.questions} câu trắc nghiệm`,
      ready: true,
    },
    {
      href: "/jlpt-n1/vocab",
      icon: BookA,
      ja: "語彙",
      title: "Từ vựng",
      desc: `Mimikara N1 · ${vocab.words} từ · ${vocab.lessons} bài`,
      ready: true,
    },
    { href: "", icon: Languages, ja: "漢字", title: "Kanji", desc: "Đang biên soạn", ready: false },
    { href: "", icon: BookOpen, ja: "読解", title: "Đọc hiểu", desc: "Đang biên soạn", ready: false },
    { href: "", icon: Headphones, ja: "聴解", title: "Nghe hiểu", desc: "Đang biên soạn", ready: false },
  ];

  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/courses" className="hover:text-ink">
          Khóa học
        </Link>
        <span>/</span>
        <span className="text-ink-2">JLPT N1</span>
      </nav>

      <section className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute top-1/2 -right-24 hidden h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-[#c8283a] lg:block" aria-hidden />
        <div className="pointer-events-none absolute top-1/2 right-[58px] hidden -translate-y-1/2 font-mincho text-[120px] leading-none font-bold text-white lg:block" aria-hidden>
          N1
        </div>
        <div className="relative flex max-w-[620px] flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="text-[13px] font-semibold tracking-[0.08em] text-brand uppercase">日本語能力試験 · JLPT N1</span>
          </div>
          <h1 className="text-[32px] leading-[1.15] font-extrabold tracking-[-0.025em] text-ink sm:text-[44px]">
            Ngữ pháp N1 như đọc một <span className="text-brand">cuốn tiểu thuyết</span>
          </h1>
          <p className="text-base leading-[1.7] text-ink-2 sm:text-[17px]">
            Theo chân Mai — cô gái Việt mới vào làm ở Tokyo — qua 20 chương truyện. Mỗi mẫu ngữ pháp xuất hiện đúng lúc
            trong câu chuyện, có furigana trên mọi kanji, giải thích sắc thái, so sánh với mẫu gần nghĩa và trắc nghiệm
            nhiều dạng.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/jlpt-n1/grammar/bai-01"
              className="flex h-[50px] items-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover"
            >
              Bắt đầu Chương 1
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
            </Link>
            <Link
              href="/jlpt-n1/grammar"
              className="flex h-[50px] items-center gap-2.5 rounded-xl border border-line-strong bg-surface px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              Xem mục lục & nhân vật
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.015em] text-ink">Kỹ năng</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((s) => {
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <s.icon className={cn("h-6 w-6", s.ready ? "text-brand" : "text-ink-3")} aria-hidden />
                  <span className="font-mincho text-xl text-ink-3">{s.ja}</span>
                </div>
                <span className="text-[17px] font-bold text-ink">{s.title}</span>
                <span className="text-[13px] leading-snug text-ink-3">{s.desc}</span>
                {!s.ready && (
                  <span className="mt-auto w-fit rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-ink-3">Sắp ra mắt</span>
                )}
              </>
            );
            return s.ready ? (
              <Link key={s.title} href={s.href} className="flex flex-col gap-2 rounded-2xl border-2 border-brand bg-surface p-5 transition-colors hover:bg-brand-soft/40">
                {body}
              </Link>
            ) : (
              <div key={s.title} className="flex flex-col gap-2 rounded-2xl border border-dashed border-line-strong bg-surface/60 p-5" aria-disabled>
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.015em] text-ink">Ngữ pháp · 20 chương</h2>
        <ChapterMap lessons={lessons} total={lessons.length} />
      </section>
    </div>
  );
}
