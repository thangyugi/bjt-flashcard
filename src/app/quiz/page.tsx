import type { Metadata } from "next";
import Link from "next/link";
import { chooserData } from "@/lib/choosers";
import { QuizCourseChooser } from "@/components/choosers/QuizChooser";
import { Page, PageHeader, Section, btn } from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Trắc nghiệm",
  description: "Chọn khóa để làm trắc nghiệm: JLPT N1, phát âm IPA, OCI AI Foundations, từ vựng BJT — hoặc ôn tập tổng hợp thẻ đến hạn.",
};

/**
 * "Trắc nghiệm", bước 1: chọn khóa (→ /quiz/[khóa], bước 2: chọn dạng trắc nghiệm của khóa đó)
 * hoặc ôn tập tổng hợp. Liên kết cũ /quiz?course=… được chuyển sang /quiz/[khóa] (next.config.ts).
 */
export default function QuizPage() {
  const data = chooserData();
  return (
    <Page>
      <PageHeader
        eyebrow="Trắc nghiệm · Bước 1/2"
        title={["Bạn muốn", "kiểm tra khóa nào?"]}
        lead="Chọn một khóa, trang sau chỉ còn vài dạng trắc nghiệm của khóa đó và một gợi ý nên làm trước. Câu sai được đưa vào ôn tập."
        actions={
          <Link href="/study" className={btn.ghost}>
            Học bài trước
          </Link>
        }
      />
      <Section title="Chọn khóa" id="quiz-courses">
        <QuizCourseChooser data={data} />
      </Section>
    </Page>
  );
}
