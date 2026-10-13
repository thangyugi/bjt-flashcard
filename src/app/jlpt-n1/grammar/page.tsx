import type { Metadata } from "next";
import Link from "next/link";
import { N1_LESSONS, getN1Stats, toMeta } from "@/data/jlpt-n1/course";
import { CHARACTERS } from "@/data/jlpt-n1/characters";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { ChapterMap } from "@/components/jlpt-n1/ChapterMap";
import { Cast } from "@/components/jlpt-n1/Cast";

export const metadata: Metadata = {
  title: "Ngữ pháp JLPT N1 — Một năm ở Tokyo của Mai",
  description: "Toàn bộ ngữ pháp Shinkanzen Master N1 kể thành một câu chuyện: ý nghĩa, cách chia, ví dụ có furigana, so sánh và trắc nghiệm.",
};

export default function N1GrammarIndex() {
  const stats = getN1Stats();
  const lessons = withFurigana(N1_LESSONS.map(toMeta));
  return (
    <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/courses" className="hover:text-ink">
          Khóa học
        </Link>
        <span>/</span>
        <Link href="/jlpt-n1" className="hover:text-ink">
          JLPT N1
        </Link>
        <span>/</span>
        <span className="text-ink-2">Ngữ pháp</span>
      </nav>

      <header className="flex flex-col gap-3">
        <span className="font-mincho text-[15px] tracking-[0.3em] text-brand">文法 · 物語</span>
        <h1 className="text-[32px] leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-[40px]">
          Một năm ở Tokyo của Mai
        </h1>
        <p className="max-w-[720px] text-[16px] leading-relaxed text-ink-2">
          {stats.patterns} mẫu ngữ pháp N1 (Shinkanzen Master) được kể thành {stats.lessons} chương truyện. Mỗi chương: đọc
          truyện → học kỹ từng mẫu (ý nghĩa, cách chia, vị trí, ví dụ, nên/không nên, so sánh, mẹo nhớ) → trắc nghiệm{" "}
          {stats.questions} câu với 4 dạng bài.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-ink">Nhân vật</h2>
        <Cast characters={withFurigana(CHARACTERS)} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-extrabold text-ink">Mục lục</h2>
        <ChapterMap lessons={lessons} total={lessons.length} />
      </section>
    </div>
  );
}
