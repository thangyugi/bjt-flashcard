import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookMarked, Link2, Sparkles, Table2, Trophy } from "lucide-react";
import { N1_LESSONS, getN1Lesson } from "@/data/jlpt-n1/course";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { Jp } from "@/components/jlpt-n1/Jp";
import { PatternCard } from "@/components/jlpt-n1/PatternCard";
import { QuizBlock } from "@/components/jlpt-n1/QuizBlock";
import { VoiceSettings } from "@/components/jlpt-n1/Speak";
import { LessonNavigator } from "@/components/jlpt-n1/LessonNavigator";
import { StoryReader } from "@/components/jlpt-n1/StoryReader";
import { LessonActions } from "@/components/jlpt-n1/LessonActions";
import { AddToReview } from "@/components/learning/AddToReview";
import { itemKey } from "@/lib/learning/keys";
import { Breadcrumbs } from "@/components/ui/page";
import { LessonPager } from "@/components/ui/lesson-pager";

export const dynamicParams = false;

export function generateStaticParams() {
  return N1_LESSONS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/jlpt-n1/grammar/[lessonId]">): Promise<Metadata> {
  const { lessonId } = await params;
  const found = getN1Lesson(lessonId);
  if (!found) return {};
  const { lesson } = found;
  return {
    title: `Chương ${lesson.num}: ${lesson.topicJa} — Ngữ pháp JLPT N1`,
    description: `${lesson.topicVi}: ${lesson.patterns.map((p) => p.pattern).join("、")}`,
  };
}

function Heading({ id, icon: Icon, kicker, title }: { id: string; icon: typeof Sparkles; kicker: string; title: string }) {
  return (
    <div id={id} className="flex scroll-mt-24 flex-col gap-1">
      <span className="flex items-center gap-2 text-[12.5px] font-bold tracking-[0.08em] text-brand uppercase">
        <Icon className="h-4 w-4" aria-hidden />
        {kicker}
      </span>
      <h2 className="text-[24px] font-extrabold tracking-[-0.015em] text-ink sm:text-[26px]">{title}</h2>
    </div>
  );
}

export default async function N1LessonPage({ params }: PageProps<"/jlpt-n1/grammar/[lessonId]">) {
  const { lessonId } = await params;
  const found = getN1Lesson(lessonId);
  if (!found) notFound();
  const { prev, next } = found;
  const lesson = withFurigana(found.lesson);

  const toc = [
    { id: "truyen", label: "Câu chuyện" },
    ...lesson.patterns.map((p, i) => ({ id: p.id, label: `${i + 1}. ${found.lesson.patterns[i].pattern}` })),
    { id: "so-sanh", label: "Bảng so sánh" },
    { id: "lien-ket", label: "Liên kết kiến thức" },
    { id: "tong-on", label: "Trắc nghiệm tổng ôn" },
  ];

  const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩";
  const navItems = lesson.patterns.map((p, i) => ({
    id: p.id,
    no: CIRCLED[i] ?? String(i + 1),
    jp: p.pattern,
    vi: p.meaning,
    search: found.lesson.patterns[i].pattern,
  }));

  return (
    <div className="page-x flex gap-10 pt-6 pb-12 sm:pt-10 sm:pb-16">
      <LessonNavigator
        title={`Chương ${lesson.num} · ${lesson.patterns.length} mẫu ngữ pháp`}
        label="Mục lục"
        sections={toc.filter((t) => !lesson.patterns.some((p) => p.id === t.id))}
        items={navItems}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-10 xl:max-w-[1120px]">
        <Breadcrumbs
          items={[
            { label: "Khóa học", href: "/courses" },
            { label: "JLPT N1", href: "/jlpt-n1" },
            { label: "Ngữ pháp", href: "/jlpt-n1/grammar" },
            { label: `Chương ${lesson.num}` },
          ]}
        />

        {/* Đầu chương */}
        <header className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-ink px-6 py-8 text-paper sm:px-10 sm:py-10">
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand/90 sm:h-72 sm:w-72"
            aria-hidden
          />
          <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold tracking-[0.08em] text-[#d8cfc6] uppercase">
            <span className="font-mincho text-base tracking-normal whitespace-nowrap text-white normal-case">第{lesson.num}章</span>
            <span>·</span>
            <Jp t={lesson.topicJa} className="tracking-normal normal-case [&_rt]:text-[#b5ada5]" />
            <span>·</span>
            <span>{lesson.topicVi}</span>
          </div>
          <h1 className="relative text-[32px] leading-[1.6] font-bold sm:text-[42px]">
            <Jp t={lesson.chapterJa} className="font-mincho [&_rt]:text-[0.36em] [&_rt]:text-[#b5ada5]" />
          </h1>
          <p className="relative -mt-2 text-lg font-semibold text-[#e9e2da]">{lesson.chapterVi}</p>
          <div className="relative flex flex-wrap gap-2 pt-1">
            {lesson.patterns.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[14px] leading-[1.9] transition-colors hover:bg-white/20"
              >
                <Jp t={p.pattern} className="[&_rt]:text-[#cfc6bd]" />
              </a>
            ))}
          </div>
          <div className="relative flex flex-wrap gap-2 pt-2">
            <LessonActions lessonId={lesson.id} />
            <AddToReview items={lesson.patterns.map((p) => itemKey.jaGrammar(p.id))} course="jlpt-n1" className="[&_a]:text-paper" />
          </div>
        </header>

        {/* Câu chuyện */}
        <section className="flex flex-col gap-5">
          <Heading id="truyen" icon={BookMarked} kicker="物語 · Câu chuyện" title="Đọc truyện trước — đoán nghĩa từ ngữ cảnh" />
          <p className="rounded-2xl bg-surface-2 px-5 py-4 text-[15px] leading-relaxed text-ink-2">
            <Jp t={lesson.scene} vi />
          </p>
          <VoiceSettings />
          <div className="rounded-3xl border border-line bg-surface px-5 py-6 sm:px-8">
            <StoryReader story={lesson.story} />
          </div>
          <p className="text-[13px] text-ink-3">
            Phần <mark className="n1-mark">tô đỏ</mark> là mẫu ngữ pháp của chương. Hãy thử đoán nghĩa trước, rồi kéo xuống
            học kỹ từng mẫu.
          </p>
        </section>

        {/* Các mẫu ngữ pháp */}
        {lesson.patterns.map((p, i) => (
          <PatternCard key={p.id} p={p} index={i} lessonId={lesson.id} />
        ))}

        {/* Bảng so sánh */}
        <section className="flex flex-col gap-4">
          <Heading id="so-sanh" icon={Table2} kicker="比較 · So sánh" title="Bảng so sánh nhanh cả chương" />
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-surface-2">
                  {lesson.table.head.map((h) => (
                    <th key={h} className="px-4 py-3 font-bold text-ink">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lesson.table.rows.map((r, i) => (
                  <tr key={i} className="border-t border-line align-top">
                    {r.map((c, j) => (
                      <td key={j} className={j === 0 ? "px-4 py-3 text-[15px] leading-[2] font-bold text-brand-soft-ink" : "px-4 py-3 leading-relaxed text-ink-2"}>
                        <Jp t={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Liên kết kiến thức */}
        <section className="flex flex-col gap-4">
          <Heading id="lien-ket" icon={Link2} kicker="つながり · Liên kết" title="Liên kết kiến thức & mẹo nhớ cả nhóm" />
          <ul className="flex flex-col gap-2.5">
            {lesson.links.map((l, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink">
                <Link2 className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <Jp t={l} vi />
              </li>
            ))}
          </ul>
          <div className="flex gap-3 rounded-2xl bg-brand px-5 py-4 text-white">
            <Sparkles className="mt-1 h-5 w-5 shrink-0" aria-hidden />
            <p className="text-[15px] leading-relaxed font-medium">
              <Jp t={lesson.hook} vi className="[&_rt]:text-white/75" />
            </p>
          </div>
        </section>

        {/* Tổng ôn */}
        <section className="flex flex-col gap-4">
          <Heading id="tong-on" icon={Trophy} kicker="まとめテスト · Tổng ôn" title="Trắc nghiệm tổng ôn chương" />
          <p className="text-[14px] text-ink-2">Đạt từ 70% trở lên, chương sẽ tự động được đánh dấu hoàn thành.</p>
          <QuizBlock storeKey={lesson.id} questions={lesson.quiz} lessonId={lesson.id} />
        </section>

        {/* Chương trước / sau */}
        <LessonPager
          label="Chuyển chương"
          prev={prev ? { href: `/jlpt-n1/grammar/${prev.id}`, kicker: `Chương ${prev.num}`, title: prev.chapterVi } : undefined}
          next={next ? { href: `/jlpt-n1/grammar/${next.id}`, kicker: `Chương ${next.num}`, title: next.chapterVi } : undefined}
          back={{ href: "/jlpt-n1/grammar", title: "Mục lục ngữ pháp" }}
          links={[
            { href: "/jlpt-n1", label: "Về khóa JLPT N1" },
            { href: "/quiz?course=jlpt-n1", label: "Trắc nghiệm N1 khác" },
            { href: "/review", label: "Ôn tập thẻ đến hạn" },
          ]}
        />
      </div>

      {/* Mục lục bên phải */}
      <aside className="sticky top-24 hidden h-fit w-56 shrink-0 flex-col gap-1 xl:flex" aria-label="Mục lục chương">
        <span className="mb-1 text-[12px] font-bold tracking-[0.08em] text-ink-3 uppercase">Trong chương này</span>
        {toc.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug text-ink-2 hover:bg-surface-2 hover:text-ink">
            {t.label}
          </a>
        ))}
      </aside>
    </div>
  );
}
