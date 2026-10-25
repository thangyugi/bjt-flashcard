import type { Metadata } from "next";
import "@/app/oracle-oci-ai/oci.css";
import "./ccar.css";
import { getCourseMeta } from "@/data/ccar-p/course";
import { CcarShell } from "@/components/ccar-p/CcarShell";

export const metadata: Metadata = {
  title: {
    default: "Claude Certified Architect – Professional (CCAR-P) — Ôn thi bằng tiếng Việt",
    template: "%s · CCAR-P",
  },
  description:
    "Ôn thi Claude Certified Architect – Professional (CCAR-P) bằng tiếng Việt: 7 domain, 38 task statement với ba lớp Hiểu nhanh · Cách chọn khi làm đề · Cần thuộc, ngân hàng câu hỏi có giải thích và đề thi thử 63 câu.",
};

// Dùng chung giao diện .oci-* của khóa OCI (khung bài đọc, ngăn bài học, trắc nghiệm); .ccar-root đổi màu nhấn sang tím.
export default function CcarLayout({ children }: LayoutProps<"/claude-ccar-p">) {
  const { domains, lessons } = getCourseMeta();
  return (
    <div className="oci-root ccar-root">
      <CcarShell domains={domains} lessons={lessons}>
        {children}
      </CcarShell>
    </div>
  );
}
