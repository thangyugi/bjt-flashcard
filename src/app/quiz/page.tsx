import type { Metadata } from "next";
import Link from "next/link";
import { chooserData } from "@/lib/choosers";
import { QuizChooser } from "@/components/choosers/QuizChooser";
import { Page, PageHeader, Section, btn } from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Trắc nghiệm",
  description: "Chọn bài trắc nghiệm: từ vựng BJT, ngữ pháp và từ vựng JLPT N1, luyện nghe IPA, luyện tập và thi thử OCI AI Foundations.",
};

/** "Trắc nghiệm": mọi dạng trắc nghiệm của các khóa, lọc theo khóa (?course=…). */
export default async function QuizPage({ searchParams }: PageProps<"/quiz">) {
  const { course } = await searchParams;
  const data = chooserData();
  return (
    <Page>
      <PageHeader
        eyebrow="Trắc nghiệm"
        title={["Chọn bài", "trắc nghiệm"]}
        lead="Mọi dạng trắc nghiệm của các khóa ở một chỗ. Lọc theo khóa, chọn bài rồi làm ngay; câu sai được đưa vào ôn tập."
        actions={
          <>
            <Link href="/study" className={btn.ghost}>
              Học bài trước
            </Link>
            <Link href="/review" className={btn.ghost}>
              Ôn tập tổng hợp
            </Link>
          </>
        }
      />
      <Section title="Các dạng trắc nghiệm" id="quiz-kinds">
        <QuizChooser data={data} initial={typeof course === "string" ? course : undefined} />
      </Section>
    </Page>
  );
}
