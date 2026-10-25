"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useCcarStore } from "@/store/ccar-p-store";
import { useFlashcardStore } from "@/store/flashcard-store";
import { cn } from "@/lib/utils";
import { useDue } from "@/hooks/useDue";
import { btn } from "@/components/ui/page";
import type { ChooserData, CourseId } from "@/lib/choosers";
import { useLastLessons } from "./StudyChooser";

/** Đường dẫn trang trắc nghiệm của từng khóa: /quiz/[slug] */
export const QUIZ_SLUG: Record<CourseId, string> = { "jlpt-n1": "jlpt-n1", english: "english", "oci-ai": "oci", bjt: "bjt", "ccar-p": "ccar-p" };

export interface QuizItem {
  id: string;
  course: CourseId;
  /** Nhóm trong khóa (Ngữ pháp, Từ vựng, Theo bài…) */
  group: string;
  title: string;
  desc: string;
  meta: string;
  /** Kết quả gần nhất (nếu có) */
  result?: string;
  primary: { label: string; href: string };
  more?: { label: string; href: string }[];
}

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

/** Mọi dạng trắc nghiệm của các khóa (dẫn vào luồng làm bài sẵn có), kèm điểm gần nhất và bài nên làm tiếp */
export function useQuizItems(data: ChooserData): { items: QuizItem[]; recommended: Record<CourseId, string> } {
  const hydrated = useHydrated();
  const last = useLastLessons(data);
  const n1Quiz = useN1Store((s) => s.quiz);
  const enQuiz = useEnStore((s) => s.quiz);
  const ociPractice = useOciAiStore((s) => s.practice);
  const ccarPractice = useCcarStore((s) => s.practice);
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
      group: "Từ vựng",
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
      group: "Ngữ pháp",
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
      group: "Từ vựng",
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
      group: "Tổng hợp 44 âm",
      title: "Phòng luyện tập IPA",
      desc: "Nghe chọn âm, ký hiệu ↔ từ, tìm âm trong từ — 3 cấp độ trên toàn bộ 44 âm.",
      meta: "3 cấp độ · có âm thanh",
      result: score(latest(enQuiz, (k) => k.startsWith("practice"))?.[1]),
      primary: { label: "Vào phòng luyện tập", href: "/english/ipa/practice" },
    },
    {
      id: "ipa-lesson",
      course: "english",
      group: "Theo bài",
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
      group: "Luyện tập",
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
      group: "Thi thử",
      title: "Thi thử OCI AI Foundations",
      desc: "Đề mô phỏng 1Z0-1122: tính giờ, chấm điểm theo ngưỡng đạt, xem lại đáp án.",
      meta: data.exams.length ? `${data.exams.length} đề · ${data.exams[0].count} câu · ${data.exams[0].minutes} phút · đạt ${data.exams[0].passPct}%` : "",
      result: score(latest(ociPractice, (k) => k.startsWith("exam:"))?.[1]),
      primary: { label: data.exams[0]?.title.split("—")[0].trim() ?? "Đề 1", href: `/oracle-oci-ai/exam/${data.exams[0]?.id}` },
      more: data.exams.slice(1).map((e) => ({ label: e.title.split("—")[0].trim(), href: `/oracle-oci-ai/exam/${e.id}` })),
    },
    {
      id: "ccar-practice",
      course: "ccar-p",
      group: "Luyện tập",
      title: "Luyện tập CCAR-P",
      desc: "Theo domain hoặc task statement, bộ đề v2 hay trộn ngẫu nhiên. Đề tiếng Việt kèm bản gốc tiếng Anh, giải thích từng ô.",
      meta: `${counts.ccarQuestions} câu · 7 domain · bộ v2 ${counts.ccarV2} câu`,
      result: score(latest(ccarPractice, (k) => !k.startsWith("exam:"))?.[1]),
      primary: last.ccar
        ? { label: `Tiếp: ${labels.ccar[last.ccar]}`, href: `/claude-ccar-p/practice/task-${last.ccar}` }
        : { label: "Chọn bộ để luyện", href: "/claude-ccar-p/practice" },
      more: [
        { label: "Bộ đề v2", href: "/claude-ccar-p/practice/v2" },
        { label: "Trộn ngẫu nhiên 20 câu", href: "/claude-ccar-p/practice/mix?n=20" },
      ],
    },
    {
      id: "ccar-exam",
      course: "ccar-p",
      group: "Thi thử",
      title: "Thi thử CCAR-P",
      desc: "63 câu lấy theo tỉ trọng chính thức của 7 domain, 120 phút, chấm theo ngưỡng 72% (theo tệp nguồn) và kết quả theo domain.",
      meta: data.ccarExams.length ? `${data.ccarExams.length} đề · ${data.ccarExams[0].count} câu · ${data.ccarExams[0].minutes} phút · đạt ${data.ccarExams[0].passPct}%` : "",
      result: score(latest(ccarPractice, (k) => k.startsWith("exam:"))?.[1]),
      primary: { label: data.ccarExams[0]?.title ?? "Đề 1", href: `/claude-ccar-p/exam/${data.ccarExams[0]?.id}` },
      more: data.ccarExams.slice(1).map((e) => ({ label: e.title, href: `/claude-ccar-p/exam/${e.id}` })),
    },
  ];

  const recommended: Record<CourseId, string> = {
    "jlpt-n1": last.n1Vocab && !last.n1 ? "n1-vocab" : "n1-grammar",
    english: "ipa-lesson",
    "oci-ai": "oci-practice",
    bjt: "bjt-vocab",
    "ccar-p": "ccar-practice",
  };
  return { items, recommended };
}

/** Bước 1 ở /quiz: chọn khóa (4 ô lớn) hoặc ôn tập tổng hợp — một lưới kẻ mảnh duy nhất */
export function QuizCourseChooser({ data }: { data: ChooserData }) {
  const { items } = useQuizItems(data);
  const { due } = useDue();
  const hydrated = useHydrated();
  return (
    <ol className="cells grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {data.courses.map((c, i) => {
        const mine = items.filter((q) => q.course === c.id);
        const result = mine.find((q) => q.result)?.result;
        return (
          <li key={c.id} className="flex">
            <Link href={`/quiz/${QUIZ_SLUG[c.id]}`} className="group flex w-full flex-col gap-4 p-5 transition-colors hover:bg-surface focus-visible:bg-surface sm:p-6">
              <span className="flex items-center justify-between gap-3">
                <span className="eyebrow-label flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                  {c.kicker.split(" · ")[0]}
                </span>
                <span className="text-[12px] font-semibold text-ink-3 tabular-nums" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="hx-title text-[clamp(26px,2.2vw,34px)]">{c.title}</span>
              <ul className="flex flex-col gap-1.5 text-[14px] text-ink-2">
                {mine.map((q) => (
                  <li key={q.id} className="flex gap-2">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-3" aria-hidden />
                    {q.title}
                  </li>
                ))}
              </ul>
              <span className="mt-auto flex flex-col gap-3 border-t border-dashed border-line-strong pt-4">
                {result && <span className="text-[12.5px] text-ink-3">{result}</span>}
                <span className="flex items-center justify-between gap-3 text-[14.5px] font-semibold text-ink">
                  {mine.length} dạng trắc nghiệm
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: c.color }} aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
      <li className="flex">
        <Link href="/review" className="group flex w-full flex-col gap-4 bg-surface-2/60 p-5 transition-colors hover:bg-surface sm:p-6">
          <span className="eyebrow-label">Mọi khóa</span>
          <span className="hx-title text-[clamp(26px,2.2vw,34px)]">Ôn tập tổng hợp</span>
          <span className="text-[14px] leading-relaxed text-ink-2">Thẻ đến hạn của mọi khóa (từ vựng, ngữ pháp, âm IPA) trộn chung theo lịch ôn. Không cần chọn khóa.</span>
          <span className="mt-auto flex flex-col gap-3 border-t border-dashed border-line-strong pt-4">
            <span className="flex items-center justify-between gap-3 text-[14.5px] font-semibold text-ink">
              {hydrated && due > 0 ? `Ôn ${due.toLocaleString("vi-VN")} thẻ đến hạn` : "Mở ôn tập"}
              <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </span>
        </Link>
      </li>
    </ol>
  );
}

/** Bước 2 ở /quiz/[khóa]: vài dạng trắc nghiệm của một khóa, một dạng được gợi ý làm trước */
export function CourseQuiz({ data, course }: { data: ChooserData; course: CourseId }) {
  const { items, recommended } = useQuizItems(data);
  const c = data.courses.find((x) => x.id === course)!;
  const mine = items.filter((q) => q.course === course).sort((a, b) => Number(b.id === recommended[course]) - Number(a.id === recommended[course]));
  return (
    <ol className="cells grid-cols-1 lg:grid-cols-2">
      {mine.map((q, i) => {
        const rec = i === 0;
        return (
          <li key={q.id} className="flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-7">
              <p className="flex flex-wrap items-center gap-2.5">
                <span className="eyebrow-label flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                  {q.group}
                </span>
                {rec && <span className="rounded-md bg-ink px-2 py-0.5 text-[11.5px] font-bold text-paper">Nên làm trước</span>}
              </p>
              <h2 className="hx-title text-[clamp(24px,2.2vw,32px)]">{q.title}</h2>
              <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{q.desc}</p>
              <p className="text-[13px] font-semibold text-ink-3">
                {q.meta}
                {q.result && <span className="font-normal"> · {q.result}</span>}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-3">
                <Link href={q.primary.href} className={cn(rec ? btn.primary : btn.ghost, "max-w-full")}>
                  <span className="truncate">{q.primary.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
                {q.more?.map((m) => (
                  <Link key={m.href} href={m.href} className="text-[14px] font-semibold text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink-3">
                    {m.label}
                  </Link>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
