import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Clock, FileCheck2, ListChecks } from "lucide-react";
import { practiceByLesson } from "@/data/oci-ai/practice";
import { LESSONS, getCourseMeta, getLesson } from "@/data/oci-ai/course";
import { LessonQuiz } from "@/components/oci-ai/LessonQuiz";
import { LessonControls } from "@/components/oci-ai/LessonControls";
import { LessonToc, ReadProgress, type TocItem } from "@/components/oci-ai/LessonToc";

export const dynamicParams = false;

export function generateStaticParams() {
  return LESSONS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/oracle-oci-ai/[lessonId]">): Promise<Metadata> {
  const { lessonId } = await params;
  const found = getLesson(lessonId);
  if (!found) return {};
  const { lesson, module } = found;
  const prefix = lesson.kind === "summary" ? `Phần ${module.num} · Tổng kết` : `Bài ${lesson.code}`;
  return { title: `${prefix}: ${lesson.navTitle}`, description: module.desc };
}

export default async function LessonPage({ params }: PageProps<"/oracle-oci-ai/[lessonId]">) {
  const { lessonId } = await params;
  const found = getLesson(lessonId);
  if (!found) notFound();
  const { lesson, module, prev, next } = found;
  const { html, toc } = withHeadingIds(lesson.html);

  const siblings = getCourseMeta().lessons.filter((l) => l.moduleId === module.id);
  const practice = practiceByLesson.get(lesson.id);

  const label = (l: NonNullable<typeof prev>) =>
    l.kind === "summary" ? `Tổng kết & trắc nghiệm Phần ${getLesson(l.id)!.module.num}` : `${l.code} ${l.navTitle}`;

  return (
    <div className="oci-lesson-grid">
      <ReadProgress />
      <article className="oci-article">
        <div className="oci-crumb">
          <Link href="/courses">Khóa học</Link>
          <span className="sep">/</span>
          <Link href="/oracle-oci-ai">OCI AI</Link>
          <span className="sep">/</span>
          <span>
            Phần {module.num} · {module.title}
          </span>
        </div>

        <header className="oci-lesson-head">
          <div className="oci-lesson-code" style={{ marginTop: 18 }}>
            {lesson.kind === "summary" ? "Tổng kết & Trắc nghiệm" : `Bài ${lesson.code}`}
          </div>
          <h1>{lesson.title.replace(/^★\s*/, "")}</h1>
          <div className="oci-chips">
            {lesson.minutes && (
              <span className="oci-chip">
                <Clock aria-hidden /> ~{lesson.minutes} phút đọc
              </span>
            )}
            {lesson.source && (
              <span className="oci-chip">
                <BookOpen aria-hidden /> Gốc: “{lesson.source}”
              </span>
            )}
            {lesson.note && (
              <span className="oci-chip accent">
                <ListChecks aria-hidden /> {lesson.note}
              </span>
            )}
          </div>
        </header>

        <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html }} />

        {lesson.quiz && <LessonQuiz lessonId={lesson.id} questions={lesson.quiz} passPct={lesson.passPct} />}

        {lesson.afterHtml && <div className="oci-prose" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: lesson.afterHtml }} />}

        {practice && (
          <div className="oci-practice-cta">
            <FileCheck2 aria-hidden style={{ width: 26, height: 26, color: "var(--o-accent)", flex: "none" }} />
            <span className="tx">
              <b>Luyện {practice.qs.length} câu hỏi của bài này</b>
              Câu hỏi tiếng Anh kèm dịch, giải thích từng đáp án và mẹo nhớ.
            </span>
            <Link href={`/oracle-oci-ai/practice/${lesson.id}`} className="oci-btn primary sm">
              Bắt đầu
            </Link>
          </div>
        )}

        <LessonControls
          lessonId={lesson.id}
          prev={prev ? { id: prev.id, label: label(prev) } : { id: "", label: "Trang chủ khóa học" }}
          next={next ? { id: next.id, label: label(next) } : undefined}
        />
      </article>
      <aside className="oci-aside" aria-label="Bên lề bài học">
        <div className="oci-aside-col">
          <LessonToc items={toc} />
          <div className="oci-aside-card">
            <b>{practice ? `Luyện ${practice.qs.length} câu của bài này` : "Luyện tập & thi thử"}</b>
            <span>
              {practice
                ? "Câu hỏi tiếng Anh kèm dịch, giải thích từng đáp án và mẹo nhớ."
                : "Ngân hàng câu hỏi theo bài, trộn ngẫu nhiên và 3 đề thi mô phỏng có đồng hồ."}
            </span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href={practice ? `/oracle-oci-ai/practice/${lesson.id}` : "/oracle-oci-ai/practice"} className="oci-btn primary sm">
                {practice ? "Bắt đầu luyện" : "Mở luyện tập"}
              </Link>
              <Link href="/oracle-oci-ai/glossary" className="oci-btn ghost sm">
                Thuật ngữ
              </Link>
            </span>
          </div>
        </div>
        <nav aria-label={`Các bài trong Phần ${module.num}`}>
          <div className="oci-aside-title">
            Phần {module.num} · {siblings.length} mục
          </div>
          <ol className="oci-aside-list">
            {siblings.map((l) => (
              <li key={l.id}>
                <Link href={`/oracle-oci-ai/${l.id}`} aria-current={l.id === lesson.id ? "page" : undefined}>
                  <span className="c">{l.kind === "summary" ? "★" : l.code}</span>
                  <span>{l.kind === "summary" ? "Tổng kết & trắc nghiệm" : l.navTitle}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </div>
  );
}

/** Gắn id cho các tiêu đề h2 để làm mục lục và liên kết neo. */
function withHeadingIds(src: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const html = src.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const id = `muc-${toc.length + 1}`;
    toc.push({ id, text: decode(inner.replace(/<[^>]+>/g, "")).trim() });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
