import type { Metadata } from "next";
import "./oci.css";
import { getCourseMeta } from "@/data/oci-ai/course";
import { OciShell, THEME_INIT_SCRIPT } from "@/components/oci-ai/OciShell";

export const metadata: Metadata = {
  title: {
    default: "OCI AI Foundations — Học Oracle Cloud Infrastructure AI bằng tiếng Việt",
    template: "%s · OCI AI Foundations",
  },
  description:
    "Khóa học Oracle Cloud Infrastructure AI Foundations bằng tiếng Việt: AI, ML, Deep Learning, Generative AI, OCI Enterprise AI, AI Services và Agentic AI cho Oracle Database — có sơ đồ, ví dụ và trắc nghiệm giải thích.",
};

export default function OciAiLayout({ children }: LayoutProps<"/oracle-oci-ai">) {
  const { modules, lessons } = getCourseMeta();
  return (
    <div id="oci-root" className="oci-root" suppressHydrationWarning>
      <InlineScript html={THEME_INIT_SCRIPT} />
      <OciShell modules={modules} lessons={lessons}>
        {children}
      </OciShell>
    </div>
  );
}

/** Script nội tuyến chạy khi trình duyệt phân tích HTML (trước lần vẽ đầu tiên). */
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
