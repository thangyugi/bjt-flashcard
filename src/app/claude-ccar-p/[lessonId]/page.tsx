import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileCheck2, Layers, ListChecks } from "lucide-react";
import { BANK, SUPPLEMENT, TASKS, getLesson, renderBlocks } from "@/data/ccar-p/course";
import { CCAR_BASE, REFERENCE_PATH, setId } from "@/data/ccar-p/meta";
import { CcarLessonControls } from "@/components/ccar-p/CcarLessonControls";
import { ReadProgress } from "@/components/oci-ai/LessonToc";
import { LessonToc, LessonTocCompact, type TocItem } from "@/components/ui/lesson-toc";
import { Breadcrumbs } from "@/components/ui/page";

export const dynamicParams = false;

export function generateStaticParams() {
  return TASKS.map((t) => ({ lessonId: t.id }));
}

export async function generateMetadata({ params }: PageProps<"/claude-ccar-p/[lessonId]">): Promise<Metadata> {
  const { lessonId } = await params;
  const found = getLesson(lessonId);
  if (!found) return {};
  return { title: `${found.task.code} ${found.task.title}`, description: `Domain ${found.domain.num} · ${found.domain.title} (${found.domain.weight}%)` };
}

export default async function CcarLessonPage({ params }: PageProps<"/claude-ccar-p/[lessonId]">) {
  const { lessonId } = await params;
  const found = getLesson(lessonId);
  if (!found) notFound();
  const { task, domain, prev, next } = found;
  const { html, toc } = withHeadingIds(renderBlocks(task.blocks) + renderSupplement(task.id));
  const count = BANK.filter((q) => q.task === task.id).length;
  const practiceHref = `${CCAR_BASE}/practice/${setId.task(task.id)}`;
  const label = (t: NonNullable<typeof prev>) => `${t.code} ${t.title}`;

  return (
    <div className="oci-lesson-grid">
      <ReadProgress />
      <article className="oci-article">
        <Breadcrumbs
          className="oci-toolbar"
          items={[
            { label: "Khóa học", href: "/courses" },
            { label: "CCAR-P", href: CCAR_BASE },
            { label: `Domain ${domain.num} · ${domain.title}` },
          ]}
        />

        <header className="oci-lesson-head">
          <div className="oci-lesson-code" style={{ marginTop: 18 }}>
            Task statement {task.code}
          </div>
          <h1>{task.title}</h1>
          {task.subtitle && <p style={{ margin: "8px 0 0", color: "var(--o-text-2)", fontSize: 15.5 }}>({task.subtitle})</p>}
          <div className="oci-chips">
            <span className="oci-chip">
              <Layers aria-hidden /> Domain {domain.num} · {domain.weight}% đề thi
            </span>
            {count > 0 && (
              <span className="oci-chip accent">
                <ListChecks aria-hidden /> {count} câu luyện tập
              </span>
            )}
          </div>
        </header>

        <LessonTocCompact items={toc} className="mb-6 xl:hidden" />

        <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html }} />

        {count > 0 && (
          <div className="oci-practice-cta">
            <FileCheck2 aria-hidden style={{ width: 26, height: 26, color: "var(--o-accent)", flex: "none" }} />
            <span className="tx">
              <b>Luyện {count} câu của task statement {task.code}</b>
              Đề tiếng Việt (bật được bản tiếng Anh gốc), đáp án kèm “Kiến thức cần nhớ” và vì sao các ô kia sai.
            </span>
            <Link href={practiceHref} className="oci-btn primary sm">
              Bắt đầu
            </Link>
          </div>
        )}

        <CcarLessonControls
          lessonId={task.id}
          prev={prev ? { id: prev.id, label: label(prev) } : { id: "", label: "Trang chủ khóa học" }}
          next={next ? { id: next.id, label: label(next) } : undefined}
        />
      </article>
      <aside className="oci-aside" aria-label="Bên lề bài học">
        <div className="oci-aside-col">
          <LessonToc items={toc} />
          <div className="oci-aside-card">
            <b>{count ? `Luyện ${count} câu của bài này` : "Luyện tập & thi thử"}</b>
            <span>Luyện theo domain, theo task statement, bộ đề v2 và 3 đề thi thử 63 câu có đồng hồ.</span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href={count ? practiceHref : `${CCAR_BASE}/practice`} className="oci-btn primary sm">
                {count ? "Bắt đầu luyện" : "Mở luyện tập"}
              </Link>
              <Link href={`${CCAR_BASE}/practice/${setId.domain(domain.num)}`} className="oci-btn ghost sm">
                Cả Domain {domain.num}
              </Link>
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

const SUPP_LAYER: Record<string, string> = { "can-thuoc": "📚 Cần thuộc", "cach-chon": "🎯 Cách chọn khi làm đề", bay: "⚠️ Bẫy" };
const escAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Lớp bổ sung do Claude biên soạn: đặt sau các lớp của tài liệu ôn, có nhãn riêng */
function renderSupplement(taskId: string): string {
  const items = SUPPLEMENT.tasks[taskId];
  if (!items?.length) return "";
  return [
    `<section class="ccar-supp" aria-label="${escAttr(SUPPLEMENT.label)}">`,
    `<h2>${escAttr(SUPPLEMENT.label)}</h2>`,
    `<p class="ccar-supp-note">${escAttr(SUPPLEMENT.note)} Xem thêm <a href="${REFERENCE_PATH}">${escAttr(SUPPLEMENT.referenceTitle)}</a>.</p>`,
    ...items.map(
      (it) =>
        `<div class="ccar-supp-item"><span class="ccar-supp-layer">${SUPP_LAYER[it.layer] ?? it.layer}</span><h3>${escAttr(it.title)}</h3>${it.html}</div>`
    ),
    `</section>`,
  ].join("\n");
}

/** Gắn id cho các tiêu đề h2 để làm mục lục và liên kết neo. */
function withHeadingIds(src: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const html = src.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = `muc-${toc.length + 1}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim() });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}
