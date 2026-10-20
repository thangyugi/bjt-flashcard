import type { Metadata } from "next";
import "./oci.css";
import { getCourseMeta } from "@/data/oci-ai/course";
import { OciShell } from "@/components/oci-ai/OciShell";

export const metadata: Metadata = {
  title: {
    default: "OCI AI Foundations — Học Oracle Cloud Infrastructure AI bằng tiếng Việt",
    template: "%s · OCI AI Foundations",
  },
  description:
    "Khóa học Oracle Cloud Infrastructure AI Foundations bằng tiếng Việt: AI, ML, Deep Learning, Generative AI, OCI Enterprise AI, AI Services và Agentic AI cho Oracle Database — có sơ đồ, ví dụ và trắc nghiệm giải thích.",
};

// Nền sáng/tối của bài đọc được áp trong OciShell (useLayoutEffect, trước lần vẽ đầu): khung này chỉ render phía trình duyệt
// sau cổng đăng nhập nên không cần script nội tuyến.
export default function OciAiLayout({ children }: LayoutProps<"/oracle-oci-ai">) {
  const { modules, lessons } = getCourseMeta();
  return (
    <div id="oci-root" className="oci-root" suppressHydrationWarning>
      <OciShell modules={modules} lessons={lessons}>
        {children}
      </OciShell>
    </div>
  );
}
