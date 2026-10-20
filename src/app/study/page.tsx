import type { Metadata } from "next";
import Link from "next/link";
import { chooserData } from "@/lib/choosers";
import { ContinueStrip, StudyChooser } from "@/components/choosers/StudyChooser";
import { Page, PageHeader, Section, btn } from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Học bài",
  description: "Chọn khóa để học: ngữ pháp và từ vựng JLPT N1, phát âm IPA, OCI AI Foundations, từ vựng BJT.",
};

/** "Học bài": người học tự chọn khóa và bài; "Học tiếp" trỏ tới bài gần nhất của từng khóa. */
export default function StudyPage() {
  const data = chooserData();
  return (
    <Page>
      <PageHeader
        eyebrow="Học bài"
        title={["Hôm nay", "học gì?"]}
        lead="Chọn khóa và bài muốn học. Mỗi khóa ghi nhớ bài bạn mở gần nhất để học tiếp đúng chỗ; bài đã học được đưa vào lịch ôn FSRS."
        actions={
          <>
            <Link href="/quiz" className={btn.ghost}>
              Làm trắc nghiệm
            </Link>
            <Link href="/review" className={btn.ghost}>
              Ôn tập thẻ đến hạn
            </Link>
          </>
        }
        aside={
          <div className="flex flex-col gap-3">
            <span className="eyebrow-label">Học tiếp</span>
            <ContinueStrip data={data} />
          </div>
        }
      />
      <Section title="Chọn khóa" id="study-courses" action={<Link href="/courses" className="font-semibold text-ink hover:underline">Giới thiệu các khóa</Link>}>
        <StudyChooser data={data} />
      </Section>
    </Page>
  );
}
