import type { Metadata } from "next";
import { Page, PageHeader, btn } from "@/components/ui/page";
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
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "JLPT N1", href: "/jlpt-n1" }, { label: "Từ vựng" }]}
        accent="#b8202f"
        eyebrow={
          <>
            Từ vựng N1 <span className="font-mincho tracking-[0.3em] normal-case">語彙 · 物語</span>
          </>
        }
        title="Từ vựng N1"
        lead={
          <>
            {stats.words} từ chia thành {stats.lessons} bài theo thứ tự {VOCAB_SOURCES.map((s) => s.name).join(", ")}. Mỗi bài: một đoạn truyện
            nối các từ lại với nhau → thẻ chi tiết từng từ (furigana, cách dùng, kết hợp, ví dụ, so sánh, chữ Hán, mẹo nhớ) → trắc nghiệm đọc
            kanji, nghĩa, điền từ và dùng từ đúng.
          </>
        }
        actions={
          <Link href="/jlpt-n1/vocab/library" className={btn.ghost}>
            <Search className="h-4 w-4" aria-hidden /> Thư viện & tra từ
          </Link>
        }
      />

      <VocabMap lessons={lessons} totalWords={stats.words} />
    </Page>
  );
}
