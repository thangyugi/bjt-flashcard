import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSE_META, chooserData, type CourseId } from "@/lib/choosers";
import { CourseQuiz } from "@/components/choosers/QuizChooser";
import { AsideNote, Page, PageHeader, WithAside, btn } from "@/components/ui/page";

/** /quiz/[khóa] — bước 2 của "Trắc nghiệm". BJT có trang thiết lập riêng ở /quiz/bjt (thư mục tĩnh, ưu tiên hơn). */
const SLUGS: Record<string, CourseId> = { "jlpt-n1": "jlpt-n1", english: "english", oci: "oci-ai" };

const LEAD: Record<string, string> = {
  "jlpt-n1": "Trắc nghiệm nằm cuối mỗi chương ngữ pháp và mỗi bài từ vựng. Làm tiếp bài gần nhất, hoặc chọn chương / bài khác.",
  english: "Luyện theo bài để chắc các âm vừa học, rồi vào phòng luyện tập để trộn cả 44 âm ở 3 cấp độ.",
  "oci-ai": "Luyện ngân hàng câu hỏi theo từng bài trước, khi đã vững thì làm đề thi thử có tính giờ như đề thật.",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SLUGS).map((course) => ({ course }));
}

export async function generateMetadata({ params }: PageProps<"/quiz/[course]">): Promise<Metadata> {
  const { course } = await params;
  const id = SLUGS[course];
  return id ? { title: `Trắc nghiệm ${COURSE_META[id].title}` } : {};
}

export default async function CourseQuizPage({ params }: PageProps<"/quiz/[course]">) {
  const { course } = await params;
  const id = SLUGS[course];
  if (!id) notFound();
  const meta = COURSE_META[id];
  const data = chooserData();
  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Trắc nghiệm", href: "/quiz" }, { label: meta.title }]}
        accent={meta.color}
        eyebrow={`Trắc nghiệm · Bước 2/2 · ${meta.title}`}
        title={`Trắc nghiệm ${meta.title}`}
        lead={LEAD[id]}
        actions={
          <>
            <Link href="/quiz" className={btn.ghost}>
              Đổi khóa
            </Link>
            <Link href={meta.href} className={btn.ghost}>
              Mở khóa học
            </Link>
          </>
        }
      />
      <WithAside
        aside={
          <>
            <AsideNote title="Sau khi làm bài">
              <p>Câu sai được đưa vào ôn tập ngắt quãng, kết quả lần gần nhất hiện ngay trên ô của từng dạng.</p>
              <Link href="/review" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
                Ôn tập tổng hợp
              </Link>
            </AsideNote>
            <AsideNote title="Khóa khác">
              <p className="flex flex-col gap-1">
                {(Object.keys(SLUGS) as string[])
                  .filter((s) => SLUGS[s] !== id)
                  .map((s) => (
                    <Link key={s} href={`/quiz/${s}`} className="font-semibold text-ink hover:underline">
                      {COURSE_META[SLUGS[s]].title}
                    </Link>
                  ))}
                <Link href="/quiz/bjt" className="font-semibold text-ink hover:underline">
                  {COURSE_META.bjt.title}
                </Link>
              </p>
            </AsideNote>
          </>
        }
      >
        <CourseQuiz data={data} course={id} />
      </WithAside>
    </Page>
  );
}
