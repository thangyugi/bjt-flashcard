import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXAMS } from "@/data/oci-ai/practice/exams";
import { PracticeRunner } from "@/components/oci-ai/PracticeRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMS.map((e) => ({ examId: e.id }));
}

export async function generateMetadata({ params }: PageProps<"/oracle-oci-ai/exam/[examId]">): Promise<Metadata> {
  const { examId } = await params;
  const e = EXAMS.find((x) => x.id === examId);
  return e ? { title: e.title } : {};
}

export default async function ExamPage({ params }: PageProps<"/oracle-oci-ai/exam/[examId]">) {
  const { examId } = await params;
  const exam = EXAMS.find((x) => x.id === examId);
  if (!exam) notFound();
  return (
    <PracticeRunner
      mode="exam"
      storeKey={`exam:${exam.id}`}
      title={exam.title}
      subtitle={exam.desc}
      questions={exam.qs}
      minutes={exam.minutes}
      passPct={exam.passPct}
      backHref="/oracle-oci-ai/practice"
      backLabel="← Luyện tập & thi thử"
    />
  );
}
