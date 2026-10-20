import type { Metadata } from "next";
import { N1_LESSONS, getN1Stats, toMeta } from "@/data/jlpt-n1/course";
import { CHARACTERS } from "@/data/jlpt-n1/characters";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { ChapterMap } from "@/components/jlpt-n1/ChapterMap";
import { Cast } from "@/components/jlpt-n1/Cast";
import { Page, PageHeader, Section } from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Ngữ pháp JLPT N1 — Một năm ở Tokyo của Mai",
  description: "Toàn bộ ngữ pháp Shinkanzen Master N1 kể thành một câu chuyện: ý nghĩa, cách chia, ví dụ có furigana, so sánh và trắc nghiệm.",
};

export default function N1GrammarIndex() {
  const stats = getN1Stats();
  const lessons = withFurigana(N1_LESSONS.map(toMeta));
  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "JLPT N1", href: "/jlpt-n1" }, { label: "Ngữ pháp" }]}
        accent="#b8202f"
        eyebrow={
          <>
            Ngữ pháp N1 <span className="font-mincho tracking-[0.3em] normal-case">文法 · 物語</span>
          </>
        }
        title="Một năm ở Tokyo của Mai"
        lead={
          <>
            {stats.patterns} mẫu ngữ pháp N1 (Shinkanzen Master) được kể thành {stats.lessons} chương truyện. Mỗi chương: đọc truyện → học kỹ
            từng mẫu (ý nghĩa, cách chia, vị trí, ví dụ, nên/không nên, so sánh, mẹo nhớ) → trắc nghiệm {stats.questions} câu với 4 dạng bài.
          </>
        }
      />

      <Section title="Nhân vật" id="n1-cast">
        <Cast characters={withFurigana(CHARACTERS)} />
      </Section>

      <Section title="Mục lục" id="n1-toc">
        <ChapterMap lessons={lessons} total={lessons.length} />
      </Section>
    </Page>
  );
}
