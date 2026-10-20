import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookA, BookOpen, Headphones, Languages, ScrollText } from "lucide-react";
import { N1_LESSONS, getN1Stats, toMeta } from "@/data/jlpt-n1/course";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { vocabStats } from "@/data/jlpt-n1/vocab";
import { ChapterMap } from "@/components/jlpt-n1/ChapterMap";
import { cn } from "@/lib/utils";
import { Page, PageHeader, Section, SoonTag, btn } from "@/components/ui/page";

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
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "JLPT N1" }]}
        accent="#b8202f"
        eyebrow={
          <>
            Tiếng Nhật <span className="font-mincho tracking-[0.12em] normal-case">日本語能力試験 · JLPT N1</span>
          </>
        }
        title={["Ngữ pháp N1", "như đọc một", "cuốn tiểu thuyết"]}
        lead="Theo chân Mai — cô gái Việt mới vào làm ở Tokyo — qua 20 chương truyện. Mỗi mẫu ngữ pháp xuất hiện đúng lúc trong câu chuyện, có furigana trên mọi kanji, giải thích sắc thái, so sánh với mẫu gần nghĩa và trắc nghiệm nhiều dạng."
        actions={
          <>
            <Link href="/jlpt-n1/grammar/bai-01" className={btn.primary}>
              Bắt đầu Chương 1
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
            </Link>
            <Link href="/jlpt-n1/grammar" className={btn.ghost}>
              Xem mục lục & nhân vật
            </Link>
          </>
        }
        aside={
          <div className="relative hidden h-[220px] w-[220px] items-center justify-center rounded-full bg-brand lg:flex" aria-hidden>
            <span className="font-mincho text-[96px] leading-none font-bold text-white">N1</span>
          </div>
        }
      />

      <Section title="Kỹ năng" id="n1-skills">
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
                  <SoonTag className="mt-auto" />
                )}
              </>
            );
            return s.ready ? (
              <Link key={s.title} href={s.href} className="panel flex flex-col gap-2 p-5 transition-colors hover:border-brand">
                {body}
              </Link>
            ) : (
              <div key={s.title} className="flex flex-col gap-2 rounded-[14px] bg-surface-2/60 p-5" aria-disabled>
                {body}
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Ngữ pháp · 20 chương" id="n1-chapters">
        <ChapterMap lessons={lessons} total={lessons.length} />
      </Section>
    </Page>
  );
}
