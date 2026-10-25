import type { Metadata } from "next";
import { BANK, getCourseMeta, mockExams, practiceSets } from "@/data/ccar-p/course";
import { CcarPracticeHub } from "@/components/ccar-p/CcarPracticeHub";

export const metadata: Metadata = {
  title: "Luyện tập & thi thử",
  description: "Ngân hàng câu hỏi CCAR-P theo domain, theo task statement, bộ đề v2, trộn ngẫu nhiên và 3 đề thi thử 63 câu theo tỉ trọng chính thức.",
};

export default function CcarPracticePage() {
  const { domains, lessons } = getCourseMeta();
  const sets = practiceSets();
  const count = (id: string) => sets.find((s) => s.id === id)?.ids.length ?? 0;
  return (
    <CcarPracticeHub
      domains={domains.map((d) => ({ num: d.num, title: d.title, weight: d.weight, count: count(`domain-${d.num}`) }))}
      tasks={lessons.map((l) => ({ id: l.id, code: l.code, title: l.title, domain: l.domain, count: count(`task-${l.id}`) }))}
      v2={count("v2")}
      total={BANK.length}
      exams={mockExams().map((e) => ({ id: e.id, title: e.title, desc: e.desc, count: e.ids.length, minutes: e.minutes, passPct: e.passPct }))}
    />
  );
}
