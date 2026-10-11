import type { Metadata } from "next";
import { getCourseMeta } from "@/data/oci-ai/course";
import { PRACTICE } from "@/data/oci-ai/practice";
import { EXAMS } from "@/data/oci-ai/practice/exams";
import { PracticeHub } from "@/components/oci-ai/PracticeHub";

export const metadata: Metadata = {
  title: "Luyện tập & thi thử",
  description: "Ngân hàng câu hỏi theo từng bài, trộn ngẫu nhiên và 3 đề thi mô phỏng OCI AI Foundations Associate (1Z0-1122-26).",
};

export default function PracticeHubPage() {
  const { modules, lessons } = getCourseMeta();
  const counts = new Map(PRACTICE.map((p) => [p.lessonId, p.qs.length]));
  return (
    <PracticeHub
      modules={modules}
      lessons={lessons
        .filter((l) => counts.has(l.id))
        .map((l) => ({ id: l.id, code: l.code, navTitle: l.navTitle, moduleNum: l.moduleNum, count: counts.get(l.id)! }))}
      exams={EXAMS.map((e) => ({ id: e.id, title: e.title, desc: e.desc, count: e.qs.length, minutes: e.minutes, passPct: e.passPct }))}
      total={PRACTICE.reduce((s, p) => s + p.qs.length, 0)}
    />
  );
}
