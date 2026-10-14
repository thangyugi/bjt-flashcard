import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { VOCAB_LESSONS, VOCAB_SOURCES, vocabMeta, vocabStats } from "@/data/jlpt-n1/vocab";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { VocabMap } from "@/components/jlpt-n1/VocabMap";

export const metadata: Metadata = {
  title: "Từ vựng JLPT N1 — Mimikara Oboeru N1",
  description: "Từ vựng N1 theo Mimikara Oboeru: furigana, cách dùng, ví dụ, so sánh, chữ Hán, mẹo nhớ, câu chuyện và trắc nghiệm.",
};

export default function VocabIndexPage() {
  const stats = vocabStats();
  const lessons = withFurigana(VOCAB_LESSONS.map(vocabMeta));
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
        <span className="text-ink-2">Từ vựng</span>
      </nav>

      <header className="flex flex-col gap-3">
        <span className="font-mincho text-[15px] tracking-[0.3em] text-brand">語彙 · 物語</span>
        <h1 className="text-[32px] leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-[40px]">Từ vựng N1</h1>
        <p className="max-w-[720px] text-[16px] leading-relaxed text-ink-2">
          {stats.words} từ chia thành {stats.lessons} bài theo thứ tự {VOCAB_SOURCES.map((s) => s.name).join(", ")}. Mỗi bài: một đoạn
          truyện nối các từ lại với nhau → thẻ chi tiết từng từ (furigana, cách dùng, kết hợp, ví dụ, so sánh, chữ Hán, mẹo nhớ) →
          trắc nghiệm đọc kanji, nghĩa, điền từ và dùng từ đúng.
        </p>
        <Link
          href="/jlpt-n1/vocab/library"
          className="mt-1 flex h-11 w-fit items-center gap-2 rounded-xl border border-line-strong bg-surface px-4 text-sm font-semibold text-ink hover:bg-surface-2"
        >
          <Search className="h-4 w-4" aria-hidden /> Thư viện & tra từ
        </Link>
      </header>

      <VocabMap lessons={lessons} totalWords={stats.words} />
    </div>
  );
}
