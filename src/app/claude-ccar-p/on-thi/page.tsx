import type { Metadata } from "next";
import { renderSections } from "@/data/ccar-p/course";
import { CCAR_BASE } from "@/data/ccar-p/meta";
import { LessonToc, LessonTocCompact, type TocItem } from "@/components/ui/lesson-toc";
import { Breadcrumbs } from "@/components/ui/page";
import { ReadProgress } from "@/components/oci-ai/LessonToc";

export const metadata: Metadata = {
  title: "Lộ trình ôn & quy chế thi",
  description: "Đề hỏi kiểu gì, ai nên thi, lộ trình ôn, bài tập tay, tự kiểm, bẫy hay gặp, nguồn chính gốc và quy chế thi CCAR-P.",
};

const SECTIONS = [
  "Đề hỏi kiểu gì",
  "Ai nên thi ＋ không thi",
  "Lộ trình ôn ＋ tự kiểm",
  "Hãng khuyên ôn thế nào — dịch thành việc làm được",
  "Sáu bài tập tay",
  "Bốn bước ôn",
  "Tự kiểm trước ngày thi — trả lời được hết thì đi thi được",
  "Bẫy hay gặp",
  "Nguồn chính gốc",
  "Cách chấm điểm",
  "Giấy tờ ＋ hỗ trợ đặc biệt",
  "Thi lại · vắng mặt",
  "Trong phòng thi ＋ NDA",
  "Duy trì ＋ gia hạn",
];

export default function CcarStudyPage() {
  const toc: TocItem[] = [];
  const html = renderSections(SECTIONS).replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = `muc-${toc.length + 1}`;
    toc.push({ id, text: inner.replace(/&amp;/g, "&") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return (
    <div className="oci-lesson-grid">
      <ReadProgress />
      <article className="oci-article">
        <Breadcrumbs className="oci-toolbar" items={[{ label: "Khóa học", href: "/courses" }, { label: "CCAR-P", href: CCAR_BASE }, { label: "Lộ trình ôn & quy chế" }]} />
        <header className="oci-lesson-head">
          <div className="oci-lesson-code" style={{ marginTop: 18 }}>
            Ôn thi CCAR-P
          </div>
          <h1>Lộ trình ôn, tự kiểm và quy chế thi</h1>
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
