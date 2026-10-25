import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockExams } from "@/data/ccar-p/course";
import { CCAR_BASE } from "@/data/ccar-p/meta";
import { CcarRunner } from "@/components/ccar-p/CcarRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return mockExams().map((e) => ({ examId: e.id }));
}

export async function generateMetadata({ params }: PageProps<"/claude-ccar-p/exam/[examId]">): Promise<Metadata> {
  const { examId } = await params;
  const e = mockExams().find((x) => x.id === examId);
  return e ? { title: e.title } : {};
}

export default async function CcarExamPage({ params }: PageProps<"/claude-ccar-p/exam/[examId]">) {
  const { examId } = await params;
  const exam = mockExams().find((x) => x.id === examId);
  if (!exam) notFound();
  return (
    <CcarRunner
      mode="exam"
      storeKey={`exam:${exam.id}`}
      title={exam.title}
      subtitle={exam.desc}
      ids={exam.ids}
      minutes={exam.minutes}
      passPct={exam.passPct}
      backHref={`${CCAR_BASE}/practice`}
      backLabel="Luyện tập & thi thử"
    />
  );
}
