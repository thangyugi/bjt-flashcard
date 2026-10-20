"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useFlashcardStore } from "@/store/flashcard-store";
import { cn } from "@/lib/utils";
import type { ChooserData, CourseId } from "@/lib/choosers";
import { useLastLessons } from "./StudyChooser";

type Filter = "all" | CourseId | "mixed";

interface QuizItem {
  id: string;
  course: CourseId | "mixed";
  title: string;
  desc: string;
  meta: string;
  /** Kết quả gần nhất (nếu có) */
  result?: string;
  primary: { label: string; href: string };
  more?: { label: string; href: string }[];
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "jlpt-n1", label: "JLPT N1" },
  { key: "english", label: "Tiếng Anh" },
  { key: "oci-ai", label: "OCI AI" },
  { key: "bjt", label: "Từ vựng BJT" },
  { key: "mixed", label: "Tổng hợp" },
];

const BJT_ALL_TYPES = "meaning,reverse,reading,cloze,passage";

/** Gần nhất trong một bảng điểm { key: { at, ... } } */
function latest<T extends { at: string }>(rec: Record<string, T> | undefined, pick?: (k: string) => boolean): [string, T] | null {
  let best: [string, T] | null = null;
  for (const [k, v] of Object.entries(rec ?? {})) {
    if (pick && !pick(k)) continue;
    if (!best || v.at > best[1].at) best = [k, v];
  }
  return best;
}

/**
 * Trang "Trắc nghiệm": mọi dạng trắc nghiệm của các khóa trong một lưới, lọc theo khóa.
 * Mỗi ô dẫn vào luồng trắc nghiệm sẵn có của khóa đó (BJT giữ nguyên /quiz/bjt → /quiz/play).
 */
export function QuizChooser({ data, initial }: { data: ChooserData; initial?: string }) {
  const [filter, setFilterState] = useState<Filter>(FILTERS.some((f) => f.key === initial) ? (initial as Filter) : "all");
  const setFilter = (f: Filter) => {
    setFilterState(f);
    // Giữ bộ lọc trên URL để chia sẻ / quay lại (không tải lại trang)
    window.history.replaceState(null, "", f === "all" ? "/quiz" : `/quiz?course=${f}`);
  };

  const hydrated = useHydrated();
  const last = useLastLessons(data);
  const n1Quiz = useN1Store((s) => s.quiz);
  const enQuiz = useEnStore((s) => s.quiz);
  const ociPractice = useOciAiStore((s) => s.practice);
  const reviewIds = useFlashcardStore((s) => s.reviewIds);
  const { labels, first, counts } = data;

  const score = (r: { last?: number; score?: number; total: number } | undefined) =>
    hydrated && r ? `Lần gần nhất: ${r.last ?? r.score}/${r.total}` : undefined;

  const n1Chapter = last.n1 ?? first.n1;
  const n1Vocab = last.n1Vocab ?? first.n1Vocab;
  const ipa = last.ipa ?? first.ipa;
  const ociLesson = last.oci && data.ociPracticeIds.includes(last.oci) ? last.oci : null;
  const lastOci = latest(ociPractice, (k) => k.startsWith("lesson:"));

  const items: QuizItem[] = [
    {
      id: "bjt-vocab",
      course: "bjt",
      title: "Trắc nghiệm từ vựng BJT",
      desc: "Chọn phạm vi (toàn bộ, cần ôn lại, chưa học, đang học, đã thuộc hoặc một nhóm chủ đề), số câu và 5 dạng câu hỏi.",
      meta: `${counts.bjtCards.toLocaleString("vi-VN")} thẻ · ${counts.bjtTopics} nhóm`,
      primary: { label: "Thiết lập & bắt đầu", href: "/quiz/bjt" },
      more: [
        { label: "Nhanh: 20 từ ngẫu nhiên", href: `/quiz/play?scope=all&count=20&types=${BJT_ALL_TYPES}` },
        ...(hydrated && reviewIds.length ? [{ label: `Từ cần ôn lại (${reviewIds.length})`, href: "/quiz/bjt?scope=review" }] : []),
      ],
    },
    {
      id: "n1-grammar",
      course: "jlpt-n1",
      title: "Tổng ôn ngữ pháp N1",
      desc: "Mỗi chương có trắc nghiệm theo từng mẫu và bài tổng ôn cuối chương, nhiều dạng câu hỏi.",
      meta: `${counts.n1Questions} câu · ${counts.n1Chapters} chương`,
      result: score(n1Quiz[n1Chapter]),
      primary: { label: `${last.n1 ? "Tiếp" : "Bắt đầu"}: ${labels.n1[n1Chapter]}`, href: `/jlpt-n1/grammar/${n1Chapter}#tong-on` },
      more: [{ label: "Chọn chương khác", href: "/jlpt-n1/grammar" }],
    },
    {
      id: "n1-vocab",
      course: "jlpt-n1",
      title: "Luyện tập từ vựng N1",
      desc: "4 dạng trắc nghiệm cuối mỗi bài từ vựng Mimikara: nghĩa, cách đọc, điền từ, dùng từ.",
      meta: `${counts.n1VocabLessons} bài · ${counts.n1Words.toLocaleString("vi-VN")} từ`,
      result: score(latest(n1Quiz, (k) => k.startsWith(`${n1Vocab}/`))?.[1]),
      primary: { label: `${last.n1Vocab ? "Tiếp" : "Bắt đầu"}: ${labels.n1Vocab[n1Vocab]}`, href: `/jlpt-n1/vocab/${n1Vocab}#trac-nghiem` },
      more: [{ label: "Chọn bài khác", href: "/jlpt-n1/vocab" }],
    },
    {
      id: "ipa-room",
      course: "english",
      title: "Phòng luyện tập IPA",
      desc: "Nghe chọn âm, ký hiệu ↔ từ, tìm âm trong từ — 3 cấp độ trên toàn bộ 44 âm.",
      meta: "3 cấp độ · có âm thanh",
      result: score(latest(enQuiz, (k) => k.startsWith("practice"))?.[1]),
      primary: { label: "Vào phòng luyện tập", href: "/english/ipa/practice" },
    },
    {
      id: "ipa-lesson",
      course: "english",
      title: "Luyện tập theo bài IPA",
      desc: "Phần luyện tập nhiều dạng ở cuối mỗi bài phát âm, bám đúng các âm vừa học.",
      meta: `${counts.ipaLessons} bài`,
      result: score(latest(enQuiz, (k) => k.startsWith(`${ipa}/`))?.[1]),
      primary: { label: `${last.ipa ? "Tiếp" : "Bắt đầu"}: ${labels.ipa[ipa]}`, href: `/english/ipa/${ipa}#luyen-tap` },
      more: [{ label: "Chọn bài khác", href: "/english/ipa" }],
    },
    {
      id: "oci-practice",
      course: "oci-ai",
      title: "Luyện tập OCI theo bài",
      desc: "Ngân hàng câu hỏi theo từng bài học, có giải thích từng đáp án.",
      meta: `${counts.ociPracticeQuestions} câu · ${counts.ociPracticeLessons} bài`,
      result: lastOci ? score(lastOci[1]) : undefined,
      primary: ociLesson
        ? { label: `Tiếp: ${labels.oci[ociLesson]}`, href: `/oracle-oci-ai/practice/${ociLesson}` }
        : { label: "Chọn bài để luyện", href: "/oracle-oci-ai/practice" },
      more: [{ label: "Trộn ngẫu nhiên 20 câu", href: "/oracle-oci-ai/practice/mix?n=20" }],
    },
    {
      id: "oci-exam",
      course: "oci-ai",
      title: "Thi thử OCI AI Foundations",
      desc: "Đề mô phỏng 1Z0-1122: tính giờ, chấm điểm theo ngưỡng đạt, xem lại đáp án.",
      meta: data.exams.length ? `${data.exams.length} đề · ${data.exams[0].count} câu · ${data.exams[0].minutes} phút · đạt ${data.exams[0].passPct}%` : "",
      result: score(latest(ociPractice, (k) => k.startsWith("exam:"))?.[1]),
      primary: { label: data.exams[0]?.title.split("—")[0].trim() ?? "Đề 1", href: `/oracle-oci-ai/exam/${data.exams[0]?.id}` },
      more: data.exams.slice(1).map((e) => ({ label: e.title.split("—")[0].trim(), href: `/oracle-oci-ai/exam/${e.id}` })),
    },
    {
      id: "review",
      course: "mixed",
      title: "Ôn tập tổng hợp",
      desc: "Thẻ đến hạn của mọi khóa (từ vựng, ngữ pháp, âm IPA) trộn chung, lịch ôn FSRS.",
      meta: "Mọi khóa",
      primary: { label: "Ôn thẻ đến hạn", href: "/review" },
    },
  ];

  const shown = items.filter((i) => filter === "all" || i.course === filter);
  const courseOf = (c: QuizItem["course"]) => (c === "mixed" ? { title: "Tổng hợp", color: "var(--ink)" } : data.courses.find((x) => x.id === c)!);

  return (
    <div className="flex flex-col gap-5">
      <div role="group" aria-label="Lọc theo khóa" className="flex flex-wrap gap-0 border border-line-strong w-fit max-w-full">
        {FILTERS.map((f, i) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "h-10 px-4 text-[13.5px] whitespace-nowrap transition-colors",
              i > 0 && "border-l border-line-strong",
              filter === f.key ? "bg-ink font-semibold text-paper" : "font-medium text-ink-2 hover:bg-surface"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="cells grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {shown.map((q) => {
          const c = courseOf(q.course);
          return (
            <article key={q.id} className="flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <p className="eyebrow-label flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                  {c.title}
                </p>
                <h2 className="hx-title text-[clamp(22px,1.9vw,28px)]">{q.title}</h2>
                <p className="text-[14px] leading-relaxed text-ink-3">{q.desc}</p>
                <p className="mt-auto text-[13px] font-semibold text-ink-2">{q.meta}</p>
                {q.result && <p className="text-[12.5px] text-ink-3">{q.result}</p>}
              </div>
              <ul className="flex flex-col border-t border-dashed border-line-strong">
                <li>
                  <Link href={q.primary.href} className="group flex items-center gap-3 px-5 py-3.5 text-[14px] font-semibold text-ink transition-colors hover:bg-surface sm:px-6">
                    <span className="min-w-0 flex-1">{q.primary.label}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
                {q.more?.map((m) => (
                  <li key={m.href} className="border-t border-line">
                    <Link href={m.href} className="group flex items-center gap-3 px-5 py-3 text-[13.5px] text-ink-2 transition-colors hover:bg-surface hover:text-ink sm:px-6">
                      <span className="min-w-0 flex-1">{m.label}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-3" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
