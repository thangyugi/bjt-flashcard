import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookMarked, Lightbulb, Mic, Scale, Trophy } from "lucide-react";
import { ALL_PHONEMES, IPA_LESSONS, getIpaLesson } from "@/data/english/ipa";
import { lessonPractice } from "@/data/english/ipa/practice";
import { PhonemeCard } from "@/components/english/PhonemeCard";
import { EnQuiz } from "@/components/english/EnQuiz";
import { EnSpeakButton, EnVoiceSettings } from "@/components/english/EnSpeak";
import { EnText, Ipa } from "@/components/english/EnText";
import { EnLessonActions, EnStory } from "@/components/english/EnLessonBits";
import { LessonNavigator } from "@/components/jlpt-n1/LessonNavigator";
import { Breadcrumbs } from "@/components/ui/page";
import { LessonPager } from "@/components/ui/lesson-pager";
import { LessonToc, LessonTocCompact, type TocItem } from "@/components/ui/lesson-toc";

export const dynamicParams = false;

export function generateStaticParams() {
  return IPA_LESSONS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: PageProps<"/english/ipa/[lessonId]">): Promise<Metadata> {
  const { lessonId } = await params;
  const found = getIpaLesson(lessonId);
  if (!found) return {};
  return { title: `IPA Bài ${found.lesson.num}: ${found.lesson.title} — Tiếng Anh` };
}

function Heading({ id, icon: Icon, kicker, title }: { id: string; icon: typeof BookMarked; kicker: string; title: string }) {
  return (
    <div id={id} className="flex scroll-mt-24 flex-col gap-1">
      <span className="flex items-center gap-2 text-[12.5px] font-bold tracking-[0.08em] text-[#1d4ed8] uppercase">
        <Icon className="h-4 w-4" aria-hidden />
        {kicker}
      </span>
      <h2 className="text-[24px] font-extrabold tracking-[-0.015em] text-ink sm:text-[26px]">{title}</h2>
    </div>
  );
}

export default async function IpaLessonPage({ params }: PageProps<"/english/ipa/[lessonId]">) {
  const { lessonId } = await params;
  const found = getIpaLesson(lessonId);
  if (!found) notFound();
  const { lesson, prev, next } = found;
  const sections = lessonPractice(lesson, ALL_PHONEMES);
  const phonemeIds = lesson.phonemes.map((p) => p.id);

  const toc = [
    { id: "am", label: lesson.phonemes.length ? "Các âm" : "Lý thuyết" },
    ...(lesson.rules?.length && lesson.phonemes.length ? [{ id: "quy-luat", label: "Quy luật" }] : []),
    { id: "truyen", label: "Câu chuyện" },
    { id: "luyen-tap", label: "Luyện tập" },
  ];
  const navItems = lesson.phonemes.length
    ? lesson.phonemes.map((p) => ({ id: p.id, no: `/${p.symbol}/`, jp: p.keyword.w, vi: p.name, search: p.symbol + " " + p.words.map((w) => w.w).join(" ") }))
    : (lesson.rules ?? []).map((r, i) => ({ id: `rule-${i + 1}`, no: String(i + 1), jp: r.title, vi: "", search: r.body }));

  // Mục lục "Trong bài này": các phần lớn, các âm / quy luật và từng dạng luyện tập là mục con
  const tocItems: TocItem[] = [
    { id: "am", text: lesson.phonemes.length ? "Học kỹ từng âm" : "Kiến thức nền" },
    ...(lesson.phonemes.length
      ? lesson.phonemes.map((p) => ({ id: p.id, text: `/${p.symbol}/ ${p.keyword.w}`, sub: true }))
      : (lesson.rules ?? []).map((r, i) => ({ id: `rule-${i + 1}`, text: `${i + 1}. ${r.title}`, sub: true }))),
    ...(lesson.rules?.length && lesson.phonemes.length ? [{ id: "quy-luat", text: "Quy luật & mẹo" }] : []),
    { id: "truyen", text: "Câu chuyện" },
    { id: "luyen-tap", text: "Luyện tập" },
  ];

  const allQuestions = [...sections, { key: "tong-hop", title: "Câu hỏi tổng hợp", desc: "Kiến thức, quy luật và nghe hiểu của cả bài.", qs: lesson.quiz }];

  return (
    <div className="page-x flex gap-10 pt-6 pb-12 sm:pt-10 sm:pb-16">
      <LessonNavigator title={`IPA Bài ${lesson.num} · ${lesson.mark}`} label={lesson.phonemes.length ? "Các âm" : "Mục lục"} sections={toc} items={navItems} />

      <div className="flex min-w-0 flex-1 flex-col gap-10">
        <Breadcrumbs
          items={[
            { label: "Khóa học", href: "/courses" },
            { label: "Tiếng Anh", href: "/english" },
            { label: "IPA", href: "/english/ipa" },
            { label: `Bài ${lesson.num}` },
          ]}
        />

        <header className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#0f1f47] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#1d4ed8]/80 sm:h-72 sm:w-72" aria-hidden />
          <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold tracking-[0.08em] text-[#b9c8f0] uppercase">
            <span>IPA · Bài {lesson.num}</span>
            <span>·</span>
            <span>{lesson.group}</span>
            <span>·</span>
            <span>{lesson.level}</span>
          </div>
          <span className="relative font-ipa text-[44px] leading-tight font-semibold sm:text-[56px]">{lesson.mark}</span>
          <h1 className="relative text-[24px] leading-snug font-extrabold sm:text-[30px]">{lesson.title}</h1>
          <p className="relative max-w-[720px] font-ipa text-[15px] leading-relaxed text-[#dbe4fb]">{lesson.intro}</p>
          <div className="relative flex flex-wrap gap-2 pt-1">
            {lesson.phonemes.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-ipa text-[15px] hover:bg-white/20">
                /{p.symbol}/ {p.keyword.w}
              </a>
            ))}
          </div>
          <div className="relative pt-1">
            <EnLessonActions lessonId={lesson.id} phonemeIds={phonemeIds} />
          </div>
        </header>

        <LessonTocCompact items={tocItems} className="xl:hidden" />

        <EnVoiceSettings />

        {/* Các âm hoặc lý thuyết */}
        <section className="flex flex-col gap-5">
          <Heading
            id="am"
            icon={Mic}
            kicker={lesson.phonemes.length ? "Âm · Sound" : "Lý thuyết · Theory"}
            title={lesson.phonemes.length ? "Học kỹ từng âm" : "Kiến thức nền"}
          />
          {lesson.phonemes.map((p) => (
            <PhonemeCard key={p.id} p={p} />
          ))}
          {!lesson.phonemes.length && <Rules lesson={lesson} />}
        </section>

        {lesson.phonemes.length > 0 && lesson.rules && lesson.rules.length > 0 && (
          <section className="flex flex-col gap-5">
            <Heading id="quy-luat" icon={Scale} kicker="Quy luật · Rules" title="Quy luật & mẹo nhìn chữ đoán âm" />
            <Rules lesson={lesson} />
          </section>
        )}

        <section className="flex flex-col gap-5">
          <Heading id="truyen" icon={BookMarked} kicker="Câu chuyện · Story" title={lesson.story.title} />
          <div className="rounded-3xl border border-line bg-surface px-5 py-6 sm:px-8">
            <EnStory paras={lesson.story.paras} />
          </div>
          {lesson.twister && (
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e7c46a]/60 bg-[#fdf6e3] px-5 py-4">
              <Lightbulb className="h-5 w-5 shrink-0 text-[#b7791f]" aria-hidden />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[12px] font-bold tracking-[0.06em] text-[#9a6b14] uppercase">Câu nói nhanh — luyện 3 tốc độ: chậm, vừa, nhanh</span>
                <span className="text-[18px] font-semibold text-ink">{lesson.twister.en}</span>
                <span className="text-[13.5px] text-ink-2">{lesson.twister.vi}</span>
              </div>
              <EnSpeakButton text={lesson.twister.en} label="Nghe chậm" slow showLabel />
              <EnSpeakButton text={lesson.twister.en} label="Nghe" showLabel />
            </div>
          )}
        </section>

        <section className="flex flex-col gap-8">
          <Heading id="luyen-tap" icon={Trophy} kicker="Luyện tập · Practice" title="Luyện tập nhiều dạng" />
          {allQuestions.map((s, i) => (
            <div key={s.key} id={`quiz-${s.key}`} className="flex scroll-mt-24 flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-lg font-extrabold text-ink">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-[13.5px] text-ink-3">{s.desc}</p>
              </div>
              <EnQuiz
                storeKey={`${lesson.id}/${s.key}`}
                questions={s.qs}
                finishLesson={i === allQuestions.length - 1 ? { id: lesson.id, phonemeIds } : undefined}
              />
            </div>
          ))}
        </section>

        <LessonPager
          label="Chuyển bài"
          prev={prev ? { href: `/english/ipa/${prev.id}`, kicker: `Bài ${prev.num}`, title: prev.title } : undefined}
          next={next ? { href: `/english/ipa/${next.id}`, kicker: `Bài ${next.num}`, title: next.title } : undefined}
          back={{ href: "/english/ipa", title: "Bảng IPA & mục lục" }}
          links={[
            { href: "/english", label: "Về khóa Tiếng Anh" },
            { href: "/english/ipa/practice", label: "Phòng luyện tập IPA" },
            { href: "/quiz/english", label: "Trắc nghiệm tiếng Anh khác" },
            { href: "/review", label: "Ôn tập thẻ đến hạn" },
          ]}
        />
      </div>

      <aside
        className="sticky top-24 hidden h-fit max-h-[calc(100dvh-7rem)] w-60 shrink-0 overflow-y-auto border-l border-line-strong pl-5 xl:block"
        aria-label="Mục lục bài"
      >
        <LessonToc items={tocItems} />
      </aside>
    </div>
  );
}

function Rules({ lesson }: { lesson: NonNullable<ReturnType<typeof getIpaLesson>>["lesson"] }) {
  return (
    <div className="flex flex-col gap-4">
      {(lesson.rules ?? []).map((r, i) => (
        <article key={i} id={`rule-${i + 1}`} className="flex scroll-mt-24 flex-col gap-3 rounded-3xl border border-line bg-surface px-5 py-5 sm:px-7">
          <h3 className="flex items-start gap-3 text-[18px] leading-snug font-extrabold text-ink">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d4ed8] text-[13px] text-white">{i + 1}</span>
            <span className="font-ipa">{r.title}</span>
          </h3>
          <p className="font-ipa text-[15px] leading-relaxed whitespace-pre-line text-ink">{r.body}</p>
          {r.examples && r.examples.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {r.examples.map((w) => (
                <div key={w.w + w.ipa} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
                  <EnSpeakButton text={w.w} label={`Nghe "${w.w}"`} />
                  <span className="flex min-w-0 flex-col leading-tight">
                    <b className="text-[15px] text-ink">{w.w}</b>
                    <Ipa ipa={w.ipa} className="text-[13.5px] text-[#1d4ed8]" />
                    <span className="truncate text-[12px] text-ink-3">{w.vi}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
          {r.sentences && r.sentences.length > 0 && (
            <ul className="flex flex-col gap-2">
              {r.sentences.map((s, k) => (
                <li key={k} className="flex items-start gap-3 rounded-2xl bg-surface-2/70 px-4 py-2.5">
                  <EnSpeakButton text={s.en} label="Nghe câu" className="mt-0.5" />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-[15.5px] text-ink">
                      <EnText t={s.en} />
                    </span>
                    {s.ipa && <Ipa ipa={s.ipa} className="text-[13px] text-ink-3" />}
                    <span className="text-[13.5px] text-ink-2">{s.vi}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
