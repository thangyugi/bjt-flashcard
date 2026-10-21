import type { Metadata } from "next";
import { GLOSSARY } from "@/data/oci-ai/glossary";
import { GlossaryBrowser } from "@/components/oci-ai/GlossaryBrowser";
import { Breadcrumbs } from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Từ điển thuật ngữ Anh–Việt",
  description: "Toàn bộ thuật ngữ chuyên ngành AI / OCI xuất hiện trong khóa học, kèm giải nghĩa tiếng Việt và chế độ thẻ ghi nhớ.",
};

export default function GlossaryPage() {
  return (
    <div className="oci-gloss">
      <Breadcrumbs
        items={[
          { label: "Khóa học", href: "/courses" },
          { label: "OCI AI Foundations", href: "/oracle-oci-ai" },
          { label: "Từ điển thuật ngữ" },
        ]}
      />
      <header className="oci-lesson-head" style={{ marginBottom: 6, borderBottom: 0, paddingBottom: 0 }}>
        <h1 style={{ marginTop: 14 }}>Từ điển thuật ngữ Anh–Việt</h1>
        <p style={{ margin: "10px 0 0", maxWidth: "72ch", color: "var(--o-text-2)", fontSize: 15.5, lineHeight: 1.65 }}>
          Toàn bộ {GLOSSARY.length} thuật ngữ chuyên ngành xuất hiện trong khóa học. Gõ để tìm, lọc theo phần, hoặc chuyển
          sang <b>thẻ ghi nhớ</b> để tự kiểm tra.
        </p>
      </header>
      <GlossaryBrowser items={GLOSSARY} />
    </div>
  );
}
