import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/ui/page";
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
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "JLPT N1", href: "/jlpt-n1" }, { label: "Từ vựng", href: "/jlpt-n1/vocab" }, { label: "Thư viện" }]}
        accent="#b8202f"
        eyebrow="Từ vựng N1"
        title="Thư viện từ vựng"
        size="md"
        lead="Gõ kanji, hiragana, nghĩa tiếng Việt hoặc âm Hán Việt (không cần dấu). Chạm một từ để mở thẻ chi tiết trong bài học."
      />
      <VocabLibrary entries={entries} sources={VOCAB_SOURCES.map((s) => ({ id: s.id, name: s.name }))} />
    </Page>
  );
}
