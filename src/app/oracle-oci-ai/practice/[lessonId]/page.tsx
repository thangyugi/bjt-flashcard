import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLesson } from "@/data/oci-ai/course";
import { PRACTICE, practiceByLesson } from "@/data/oci-ai/practice";
import { PracticeRunner } from "@/components/oci-ai/PracticeRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRACTICE.map((p) => ({ lessonId: p.lessonId }));
}

export async function generateMetadata({ params }: PageProps<"/oracle-oci-ai/practice/[lessonId]">): Promise<Metadata> {
  const { lessonId } = await params;
  const found = getLesson(lessonId);
  return found ? { title: `Luyện tập ${found.lesson.code}: ${found.lesson.navTitle}` } : {};
}

export default async function LessonPracticePage({ params }: PageProps<"/oracle-oci-ai/practice/[lessonId]">) {
  const { lessonId } = await params;
  const p = practiceByLesson.get(lessonId);
  const found = getLesson(lessonId);
  if (!p || !found) notFound();
  const { lesson, module } = found;
  return (
    <PracticeRunner
      mode="practice"
      storeKey={`lesson:${lessonId}`}
      title={`Luyện tập ${lesson.code} — ${lesson.navTitle}`}
      subtitle={`Phần ${module.num} · ${p.qs.length} câu hỏi tiếng Anh (kèm bản dịch). Chọn đáp án để xem ngay giải thích: nên chọn / không nên chọn vì sao, cùng mẹo nhớ và so sánh khái niệm dễ nhầm.`}
      questions={p.qs}
      tips={p.tips}
      backHref={`/oracle-oci-ai/${lessonId}`}
      backLabel={`← Về bài ${lesson.code}`}
    />
  );
}
