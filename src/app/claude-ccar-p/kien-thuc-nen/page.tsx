import type { Metadata } from "next";
import { SUPPLEMENT } from "@/data/ccar-p/course";
import { CCAR_BASE } from "@/data/ccar-p/meta";
import { LessonToc, LessonTocCompact, type TocItem } from "@/components/ui/lesson-toc";
import { Breadcrumbs } from "@/components/ui/page";
import { ReadProgress } from "@/components/oci-ai/LessonToc";

export const metadata: Metadata = {
  title: "Kiến thức nền về Claude",
  description: "Thẻ kiến thức nền do Claude biên soạn cho kỳ thi CCAR-P: họ model, Messages API, tool use, prompt caching, MCP, agent, Claude Code, evals, an toàn & quản trị, bảng thuật ngữ.",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Thẻ "Kiến thức nền" (supplement.json → reference): nội dung bổ sung ngoài tài liệu ôn gốc. */
export default function CcarReferencePage() {
  const title = SUPPLEMENT.referenceTitle || "Kiến thức nền về Claude";
  const toc: TocItem[] = SUPPLEMENT.reference.map((r) => ({ id: r.id, text: r.title }));
  const html = SUPPLEMENT.reference.map((r) => `<section class="ccar-ref" aria-labelledby="${r.id}"><h2 id="${r.id}">${esc(r.title)}</h2>\n${r.html}</section>`).join("\n");
  return (
    <div className="oci-lesson-grid">
      <ReadProgress />
      <article className="oci-article">
        <Breadcrumbs className="oci-toolbar" items={[{ label: "Khóa học", href: "/courses" }, { label: "CCAR-P", href: CCAR_BASE }, { label: title }]} />
        <header className="oci-lesson-head">
          <div className="oci-lesson-code" style={{ marginTop: 18 }}>
            {SUPPLEMENT.label}
          </div>
          <h1>{title}</h1>
          <p className="ccar-supp-note" style={{ marginTop: 12 }}>
            {SUPPLEMENT.note}
            {SUPPLEMENT.updated && <> Cập nhật {SUPPLEMENT.updated.split("-").reverse().join("/")}.</>}
          </p>
        </header>
        <LessonTocCompact items={toc} className="mb-6 xl:hidden" />
        <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <aside className="oci-aside" aria-label="Bên lề">
        <div className="oci-aside-col">
          <LessonToc items={toc} />
        </div>
      </aside>
    </div>
  );
}
