import type { Metadata } from "next";
import Link from "next/link";
import { VOCAB_SOURCES, wordAnchor } from "@/data/jlpt-n1/vocab";
import { POS_LABEL } from "@/data/jlpt-n1/vocab/types";
import { display, rubyOf } from "@/data/jlpt-n1/vocab/quiz";
import { VocabLibrary, type LibraryEntry } from "@/components/jlpt-n1/VocabLibrary";

export const metadata: Metadata = {
  title: "Thư viện từ vựng N1",
  description: "Tra cứu toàn bộ từ vựng N1 theo kanji, cách đọc, nghĩa hoặc âm Hán Việt.",
};

export default function VocabLibraryPage() {
  const entries: LibraryEntry[] = VOCAB_SOURCES.flatMap((s) =>
    s.lessons.flatMap((l) =>
      l.words.map((w) => ({
        source: s.id,
        sourceName: s.name,
        lessonId: l.id,
        lessonNum: l.num,
        anchor: wordAnchor(s.prefix, w.no),
        no: w.no,
        head: (w.p ? `〜${w.p}` : "") + rubyOf(display(w), w.pos === "na-adj" ? `${w.r}な` : w.r),
        plain: display(w),
        r: w.r,
        m: w.m,
        hv: w.hv,
        pos: POS_LABEL[w.pos],
      }))
    )
  );
  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/jlpt-n1" className="hover:text-ink">
          JLPT N1
        </Link>
        <span>/</span>
        <Link href="/jlpt-n1/vocab" className="hover:text-ink">
          Từ vựng
        </Link>
        <span>/</span>
        <span className="text-ink-2">Thư viện</span>
      </nav>
      <header className="flex flex-col gap-2">
        <h1 className="text-[30px] font-extrabold tracking-[-0.02em] text-ink">Thư viện từ vựng</h1>
        <p className="text-[15px] text-ink-2">
          Gõ kanji, hiragana, nghĩa tiếng Việt hoặc âm Hán Việt (không cần dấu). Chạm một từ để mở thẻ chi tiết trong bài học.
        </p>
      </header>
      <VocabLibrary entries={entries} sources={VOCAB_SOURCES.map((s) => ({ id: s.id, name: s.name }))} />
    </div>
  );
}
