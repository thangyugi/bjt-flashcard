import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { practiceSets } from "@/data/ccar-p/course";
import { CCAR_BASE } from "@/data/ccar-p/meta";
import { CcarRunner } from "@/components/ccar-p/CcarRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceSets().map((s) => ({ set: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/claude-ccar-p/practice/[set]">): Promise<Metadata> {
  const { set } = await params;
  const s = practiceSets().find((x) => x.id === set);
  return s ? { title: `Luyện tập ${s.title}` } : {};
}

export default async function CcarPracticeSetPage({ params }: PageProps<"/claude-ccar-p/practice/[set]">) {
  const { set } = await params;
  const s = practiceSets().find((x) => x.id === set);
  if (!s) notFound();
  const storeKey =
    s.kind === "domain" ? `domain:${s.id.slice(7)}` : s.kind === "task" ? `task:${s.lessonId}` : s.kind === "authored" ? s.id.replace("-", ":") : "v2";
  return (
    <CcarRunner
      mode="practice"
      storeKey={storeKey}
      title={s.kind === "v2" || s.kind === "authored" ? s.title : `Luyện tập ${s.title}`}
      subtitle={`${s.desc}. Chọn đáp án để xem ngay đúng/sai, “Kiến thức cần nhớ”, vì sao chọn và các ô kia sai ở đâu.`}
      ids={s.ids}
      backHref={s.lessonId ? `${CCAR_BASE}/${s.lessonId}` : `${CCAR_BASE}/practice`}
      backLabel={s.lessonId ? `Bài ${s.lessonId.replace("-", ".")}` : "Luyện tập & thi thử"}
    />
  );
}
