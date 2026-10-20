import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookMarked, LibraryBig, ListOrdered, Trophy } from "lucide-react";
import { KANJI, VOCAB_LESSONS, getVocabLesson, wordAnchor } from "@/data/jlpt-n1/vocab";
import { buildVocabQuiz, display, rubyOf } from "@/data/jlpt-n1/vocab/quiz";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { Jp } from "@/components/jlpt-n1/Jp";
import { WordCard } from "@/components/jlpt-n1/WordCard";
import { QuizBlock } from "@/components/jlpt-n1/QuizBlock";
import { VoiceSettings } from "@/components/jlpt-n1/Speak";
import { PitchGuide } from "@/components/jlpt-n1/PitchAccent";
import { StoryReader } from "@/components/jlpt-n1/StoryReader";
import { LessonActions } from "@/components/jlpt-n1/LessonActions";
import { AddToReview } from "@/components/learning/AddToReview";
import { itemKey } from "@/lib/learning/keys";
import { LessonNavigator } from "@/components/jlpt-n1/LessonNavigator";
import { Breadcrumbs } from "@/components/ui/page";
import { LessonPager } from "@/components/ui/lesson-pager";

export const dynamicParams = false;

export function generateStaticParams() {
  return VOCAB_LESSONS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/jlpt-n1/vocab/[lessonId]">): Promise<Metadata> {
  const { lessonId } = await params;
  const found = getVocabLesson(lessonId);
  if (!found) return {};
  const { lesson, source } = found;
  return {
    title: `Từ vựng N1 · Bài ${lesson.num}: ${lesson.title}`,
    description: `${source.name} — ${lesson.words.map((w) => w.w).join("、")}`,
  };
}

function Heading({ id, icon: Icon, kicker, title }: { id: string; icon: typeof BookMarked; kicker: string; title: string }) {
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

export default async function VocabLessonPage({ params }: PageProps<"/jlpt-n1/vocab/[lessonId]">) {
  const { lessonId } = await params;
  const found = getVocabLesson(lessonId);
  if (!found) notFound();
  const { lesson: raw, source, prev, next } = found;
  const lesson = withFurigana(raw);
  const sections = buildVocabQuiz(raw, withFurigana);
  const range = `${raw.words[0].no}–${raw.words[raw.words.length - 1].no}`;
  const head = (i: number) => {
    const w = raw.words[i];
    return rubyOf(display(w), w.pos === "na-adj" ? `${w.r}な` : w.r);
  };

  const toc = [
    { id: "danh-sach", label: "Danh sách từ" },
    { id: "truyen", label: "Câu chuyện" },
    { id: "tu-vung", label: `Học từng từ (${raw.words.length})` },
    ...sections.map((s) => ({ id: `quiz-${s.key}`, label: s.title })),
  ];

  const navItems = raw.words.map((w, i) => ({
    id: wordAnchor(source.prefix, w.no),
    no: String(w.no),
    jp: head(i),
    vi: w.m,
    search: `${w.w} ${w.r} ${w.hv ?? ""}`,
  }));

  return (
    <div className="page-x flex gap-10 pt-6 pb-12 sm:pt-10 sm:pb-16">
      <LessonNavigator title={`Bài ${raw.num} · ${raw.words.length} từ (${range})`} sections={toc} items={navItems} />
      <div className="flex min-w-0 flex-1 flex-col gap-10 xl:max-w-[1120px]">
        <Breadcrumbs
          items={[
            { label: "Khóa học", href: "/courses" },
            { label: "JLPT N1", href: "/jlpt-n1" },
            { label: "Từ vựng", href: "/jlpt-n1/vocab" },
            { label: `Bài ${raw.num}` },
          ]}
        />

        <header className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-ink px-6 py-8 text-paper sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand/90 sm:h-72 sm:w-72" aria-hidden />
          <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold tracking-[0.08em] text-[#d8cfc6] uppercase">
            <span className="font-mincho text-base tracking-normal whitespace-nowrap text-white normal-case">語彙 第{raw.num}課</span>
            <span>·</span>
            <span>{source.name}</span>
            <span>·</span>
            <span>Từ {range}</span>
          </div>
          <h1 className="relative text-[30px] leading-tight font-extrabold sm:text-[38px]">{raw.title}</h1>
          <p className="relative -mt-1 text-xl text-[#e9e2da]">
            <Jp t={lesson.titleJa} className="font-mincho [&_rt]:text-[#b5ada5]" />
          </p>
          <p className="relative max-w-[640px] text-[15px] leading-relaxed text-[#d8cfc6]">{raw.words.length} từ · câu chuyện liên kết · thẻ chi tiết từng từ · 4 dạng trắc nghiệm</p>
          <div className="relative flex flex-wrap gap-2 pt-1">
            <LessonActions lessonId={raw.id} kind="vocab" />
            <AddToReview items={[...new Set(raw.words.map((w) => itemKey.jaWord(w.w, w.r)))]} course="jlpt-n1" className="[&_a]:text-paper" />
          </div>
        </header>

        {/* Danh sách từ */}
        <section className="flex flex-col gap-4">
          <Heading id="danh-sach" icon={ListOrdered} kicker="単語リスト · Danh sách" title="Các từ trong bài" />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {raw.words.map((w, i) => (
              <a
                key={w.no}
                href={`#${wordAnchor(source.prefix, w.no)}`}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-3.5 py-2 transition-colors hover:border-brand"
              >
                <span className="w-8 shrink-0 text-[12px] font-bold text-ink-3">{w.no}</span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[18px] leading-[1.9] font-bold text-ink">
                    {w.p && <span className="mr-0.5 text-[13px] font-medium text-ink-3">〜{w.p}</span>}
                    <Jp t={head(i)} />
                  </span>
                  <span className="truncate text-[13px] text-ink-2">{w.m}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Câu chuyện */}
        <section className="flex flex-col gap-5">
          <Heading id="truyen" icon={BookMarked} kicker="物語 · Câu chuyện" title="Đọc truyện — gặp từ trong ngữ cảnh" />
          <p className="rounded-2xl bg-surface-2 px-5 py-4 text-[15px] leading-relaxed text-ink-2">{raw.scene}</p>
          <VoiceSettings />
          <div className="rounded-3xl border border-line bg-surface px-5 py-6 sm:px-8">
            <StoryReader story={lesson.story} />
          </div>
          <p className="text-[13px] text-ink-3">
            Các từ <mark className="n1-mark">tô đỏ</mark> là từ của bài. Đọc một lượt, đoán nghĩa, rồi học kỹ từng từ bên dưới.
          </p>
        </section>

        {/* Thẻ từ */}
        <section className="flex flex-col gap-5">
          <Heading id="tu-vung" icon={LibraryBig} kicker="単語 · Từ vựng" title="Học kỹ từng từ" />
          {raw.words.some((w) => w.acc !== undefined) && <PitchGuide />}
          {raw.words.map((w, i) => (
            <WordCard key={w.no} raw={w} fw={lesson.words[i]} anchor={wordAnchor(source.prefix, w.no)} kanji={KANJI} />
          ))}
        </section>

        {/* Trắc nghiệm */}
        <section className="flex flex-col gap-8">
          <Heading id="trac-nghiem" icon={Trophy} kicker="練習 · Trắc nghiệm" title="Luyện tập nhiều dạng" />
          {sections.map((s, i) => (
            <div key={s.key} id={`quiz-${s.key}`} className="flex scroll-mt-24 flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-lg font-extrabold text-ink">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-[13.5px] text-ink-3">{s.desc}</p>
              </div>
              <QuizBlock
                storeKey={`${raw.id}/${s.key}`}
                questions={s.qs}
                lessonId={i === sections.length - 1 ? raw.id : undefined}
              />
            </div>
          ))}
        </section>

        <LessonPager

          label="Chuyển bài"

          prev={prev ? { href: `/jlpt-n1/vocab/${prev.id}`, kicker: `Bài ${prev.num}`, title: prev.title } : undefined}

          next={next ? { href: `/jlpt-n1/vocab/${next.id}`, kicker: `Bài ${next.num}`, title: next.title } : undefined}

          back={{ href: "/jlpt-n1/vocab", title: "Mục lục từ vựng" }}

          links={[

            { href: "/jlpt-n1", label: "Về khóa JLPT N1" },

            { href: "/jlpt-n1/vocab/library", label: "Thư viện từ vựng" },

            { href: "/quiz?course=jlpt-n1", label: "Trắc nghiệm N1 khác" },

            { href: "/review", label: "Ôn tập thẻ đến hạn" },

          ]}

        />
      </div>

      <aside className="sticky top-24 hidden h-fit w-56 shrink-0 flex-col gap-1 xl:flex" aria-label="Mục lục bài">
        <span className="mb-1 text-[12px] font-bold tracking-[0.08em] text-ink-3 uppercase">Trong bài này</span>
        {toc.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug text-ink-2 hover:bg-surface-2 hover:text-ink">
            {t.label}
          </a>
        ))}
        <span className="mt-4 mb-1 text-[12px] font-bold tracking-[0.08em] text-ink-3 uppercase">Từ trong bài</span>
        <div className="flex max-h-[50vh] flex-col overflow-y-auto">
          {raw.words.map((w) => (
            <a
              key={w.no}
              href={`#${wordAnchor(source.prefix, w.no)}`}
              className="flex items-baseline gap-2 rounded-lg px-2.5 py-1 text-[14px] text-ink-2 hover:bg-surface-2 hover:text-ink"
            >
              <span className="w-8 shrink-0 text-[11px] text-ink-3">{w.no}</span>
              <span className="font-jp">{display(w)}</span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
