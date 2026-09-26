"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Minus,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import type { VocabularyItem } from "@/types/vocabulary";
import { cn } from "@/lib/utils";
import { Furigana } from "@/components/ui/furigana";
import { readingOf } from "@/lib/vocab-labels";

interface QuizRunnerProps {
  items: VocabularyItem[];
  allVocab: VocabularyItem[]; // For generating wrong options
  title?: string;
}

interface Question {
  item: VocabularyItem;
  options: string[];
  correctAnswer: string;
}

type ReviewKind = "right" | "wrong" | "skip";
type ReviewFilter = "all" | ReviewKind;

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function kanjiSize(text: string) {
  const n = text.length;
  if (n <= 3) return "text-[56px] sm:text-[72px]";
  if (n <= 5) return "text-[44px] sm:text-[60px]";
  if (n <= 7) return "text-[36px] sm:text-[48px]";
  return "text-[30px] sm:text-[38px]";
}

const LABEL = "text-[11px] font-bold uppercase tracking-[0.08em]";
const RING_C = 452.4; // 2π × 72

export function QuizRunner({ items, allVocab, title = "Trắc nghiệm" }: QuizRunnerProps) {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Câu trả lời: index câu hỏi -> đáp án đã chọn
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});

  // Initialize questions
  useEffect(() => {
    if (items.length === 0 || allVocab.length === 0) return;

    // Pick max 30 items for the quiz
    const selectedItems = shuffleArray(items).slice(0, 30);

    const generatedQs: Question[] = selectedItems.map((item) => {
      const correct = item.meaningVn || item.meaningEn || "Không có nghĩa";

      // Get 3 random wrong answers
      const wrongItems = allVocab.filter((v) => v.id !== item.id);
      const wrongAnswers = shuffleArray(wrongItems)
        .slice(0, 3)
        .map((v) => v.meaningVn || v.meaningEn || "Không có nghĩa");

      const options = shuffleArray([correct, ...wrongAnswers]);

      return { item, options, correctAnswer: correct };
    });

    setQuestions(generatedQs);
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  }, [items, allVocab]);

  const results = useMemo(
    () =>
      questions.map((q, idx): ReviewKind => {
        const a = answers[idx];
        if (!a) return "skip";
        return a === q.correctAnswer ? "right" : "wrong";
      }),
    [questions, answers]
  );

  if (items.length === 0) {
    return <div className="py-10 text-center text-ink-3">Không có dữ liệu từ vựng.</div>;
  }

  if (questions.length === 0) {
    return <div className="py-10 text-center text-ink-3">Đang tạo câu hỏi...</div>;
  }

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const leftCount = total - answeredCount;
  const progressPct = Math.round((answeredCount / total) * 100);
  const currentQ = questions[currentIndex];
  const selectedOption = answers[currentIndex];
  const isLast = currentIndex === total - 1;

  const goTo = (i: number) => {
    setCurrentIndex(i);
    setListOpen(false);
  };
  const handleSelectOption = (option: string) => setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  const handleNext = () => currentIndex < total - 1 && setCurrentIndex((i) => i + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);
  const askSubmit = () => {
    setListOpen(false);
    setConfirmOpen(true);
  };
  const doSubmit = () => {
    setConfirmOpen(false);
    setIsFinished(true);
    setFilter("all");
    setOpenMap({});
    window.scrollTo(0, 0);
  };
  const retry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsFinished(false);
    setOpenMap({});
    setQuestions(shuffleArray(questions));
    window.scrollTo(0, 0);
  };

  // ═════════════════════ KẾT QUẢ ═════════════════════
  if (isFinished) {
    const nRight = results.filter((r) => r === "right").length;
    const nWrong = results.filter((r) => r === "wrong").length;
    const nSkip = results.filter((r) => r === "skip").length;
    const scorePct = Math.round((nRight / total) * 100);
    const counts: Record<ReviewFilter, number> = { all: total, wrong: nWrong, skip: nSkip, right: nRight };
    const filters: { value: ReviewFilter; label: string }[] = [
      { value: "all", label: "Tất cả" },
      { value: "wrong", label: "Sai" },
      { value: "skip", label: "Bỏ trống" },
      { value: "right", label: "Đúng" },
    ];

    const ring = (
      <div className="relative h-28 w-28 shrink-0 md:h-[140px] md:w-[140px] lg:h-[168px] lg:w-[168px]">
        <svg viewBox="0 0 168 168" className="h-full w-full" aria-hidden>
          <circle cx="84" cy="84" r="72" fill="none" stroke="var(--track)" strokeWidth="13" />
          <circle
            cx="84"
            cy="84"
            r="72"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={RING_C * (1 - nRight / total)}
            transform="rotate(-90 84 84)"
            className="transition-[stroke-dashoffset] duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[26px] leading-[1.1] font-extrabold text-ink md:text-[32px] lg:text-[38px]">
            {nRight}
            <span className="text-[0.55em] font-semibold text-ink-3">/{total}</span>
          </span>
          <span className="text-[13px] font-bold text-brand">Đạt {scorePct}%</span>
        </div>
      </div>
    );

    const statTiles = (
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Đúng", n: nRight, icon: <Check className="h-3 w-3 text-ok" strokeWidth={3} /> },
          { label: "Sai", n: nWrong, icon: <X className="h-3 w-3 text-brand" strokeWidth={3} /> },
          { label: "Bỏ trống", n: nSkip, icon: <Minus className="h-3 w-3 text-ink-3" strokeWidth={3} /> },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5 rounded-xl bg-surface-2 px-3 py-2.5">
            <span className="flex items-center gap-[5px] text-xs whitespace-nowrap text-ink-2">
              {s.icon}
              {s.label}
            </span>
            <span className="text-xl leading-[1.3] font-extrabold text-ink">{s.n}</span>
          </div>
        ))}
      </div>
    );

    const actions = (
      <>
        <button
          type="button"
          onClick={retry}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white transition-colors hover:bg-brand-hover lg:h-[50px] lg:text-[15px]"
        >
          <RotateCcw className="h-[17px] w-[17px]" strokeWidth={2.2} aria-hidden />
          Làm lại bài thi
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-[46px] items-center justify-center rounded-xl border border-line-strong bg-surface text-sm font-semibold text-ink transition-colors hover:bg-surface-2 lg:h-12"
        >
          Thoát
        </button>
      </>
    );

    const visible = questions
      .map((q, idx) => ({ q, idx, kind: results[idx] }))
      .filter((r) => filter === "all" || r.kind === filter);

    return (
      <div className="mx-auto flex w-full max-w-[1280px] flex-col lg:h-[calc(100dvh-4rem)] lg:flex-row lg:gap-8 lg:px-8 lg:py-6">
        {/* Mobile: thanh trên */}
        <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-line bg-paper/95 px-2 backdrop-blur md:hidden">
          <button type="button" onClick={() => router.back()} aria-label="Thoát" className="flex h-11 w-11 items-center justify-center rounded-xl text-ink">
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <h1 className="text-base font-bold text-ink">Kết quả</h1>
          <span className="w-11" />
        </header>

        {/* Tổng kết */}
        <aside className="flex shrink-0 flex-col px-4 pt-4 md:px-8 md:pt-5 lg:w-[336px] lg:px-0 lg:pt-0">
          {/* Mobile */}
          <div className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-4 md:hidden">
            <div className="flex items-center gap-4">
              {ring}
              <div className="flex flex-col gap-0.5">
                <span className="text-xl font-extrabold text-ink">Hoàn thành!</span>
                <span className="text-[13px] leading-snug text-ink-3">{title}</span>
              </div>
            </div>
            {statTiles}
          </div>
          {/* Tablet */}
          <div className="hidden items-center gap-6 rounded-[20px] border border-line bg-surface px-6 py-5 md:flex lg:hidden">
            {ring}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <h1 className="text-xl font-extrabold text-ink">Hoàn thành!</h1>
                <span className="text-[13px] text-ink-3">{title}</span>
              </div>
              {statTiles}
            </div>
            <div className="flex w-[170px] shrink-0 flex-col gap-2.5">{actions}</div>
          </div>
          {/* Desktop */}
          <div className="hidden h-full flex-col gap-[18px] rounded-[20px] border border-line bg-surface px-5 pt-6 pb-5 lg:flex">
            <div className="flex flex-col items-center gap-0.5 text-center">
              <h1 className="text-xl font-extrabold text-ink">Hoàn thành!</h1>
              <span className="text-[13px] text-ink-3">{title}</span>
            </div>
            <div className="self-center">{ring}</div>
            {statTiles}
            <div className="mt-auto flex flex-col gap-2.5">{actions}</div>
          </div>
        </aside>

        {/* Chi tiết bài làm */}
        <section className="flex min-w-0 flex-1 flex-col gap-3.5 px-4 pt-4 pb-28 md:px-8 md:pt-4 md:pb-10 lg:min-h-0 lg:px-0 lg:pt-0 lg:pb-0">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[17px] font-extrabold text-ink md:text-lg lg:text-xl">Chi tiết bài làm</h2>
            <div role="group" aria-label="Lọc câu hỏi" className="grid grid-cols-4 gap-1 rounded-xl bg-surface-2 p-1 md:flex">
              {filters.map((f) => {
                const on = filter === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(f.value)}
                    className={cn(
                      "flex h-9 items-center justify-center gap-[5px] rounded-[9px] px-3 text-[13px] whitespace-nowrap transition-colors",
                      on ? "bg-surface font-bold text-ink shadow-[0_1px_2px_rgba(28,25,23,0.06)]" : "font-medium text-ink-2"
                    )}
                  >
                    {f.label}
                    <span className="text-xs font-semibold text-ink-3">{counts[f.value]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1.5">
            {visible.map(({ q, idx, kind }) => {
              const expanded = openMap[idx] ?? kind !== "right";
              const userAnswer = answers[idx];
              return (
                <article key={idx} className="shrink-0 overflow-hidden rounded-2xl border border-line bg-surface">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpenMap((m) => ({ ...m, [idx]: !expanded }))}
                    className="flex w-full items-center gap-3 px-3.5 py-3 text-left md:px-4 lg:gap-3.5 lg:px-[18px]"
                  >
                    <span
                      className={cn(
                        "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] text-xs font-extrabold",
                        kind === "right" ? "bg-ok-soft text-ok-ink" : kind === "wrong" ? "bg-brand-soft text-brand-soft-ink" : "bg-surface-2 text-ink-2"
                      )}
                    >
                      {idx + 1}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col md:flex-row md:items-baseline md:gap-2.5">
                      <span className="font-mincho text-[19px] leading-[1.2] font-semibold text-ink md:text-[22px]">{q.item.kanji}</span>
                      <span className="font-jp text-[12.5px] text-ink-3">{readingOf(q.item)}</span>
                    </span>
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-[5px] rounded-full px-2.5 py-[5px] text-[12.5px] font-bold",
                        kind === "right" ? "bg-ok-soft text-ok-ink" : kind === "wrong" ? "bg-brand-soft text-brand-soft-ink" : "bg-surface-2 text-ink-2"
                      )}
                    >
                      {kind === "right" ? <Check className="h-3 w-3" strokeWidth={3} /> : kind === "wrong" ? <X className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" strokeWidth={3} />}
                      {kind === "right" ? "Đúng" : kind === "wrong" ? "Sai" : "Bỏ trống"}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 text-ink-3 transition-transform", expanded && "rotate-180")} strokeWidth={2.2} aria-hidden />
                  </button>

                  {expanded && (
                    <div className="flex flex-col gap-3.5 px-3.5 pb-4 md:pr-[18px] md:pb-[18px] md:pl-[58px] lg:pl-[62px]">
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2.5">
                        <div className="flex flex-col gap-[3px] rounded-xl bg-surface-2 px-3.5 py-2.5">
                          <span className={cn(LABEL, "text-ink-3")}>Bạn chọn</span>
                          {userAnswer ? (
                            <span className={cn("text-[15px] font-semibold", kind === "right" ? "text-ok-ink" : "text-brand-soft-ink line-through decoration-2")}>
                              {userAnswer}
                            </span>
                          ) : (
                            <span className="text-[15px] text-ink-3 italic">Không có đáp án</span>
                          )}
                        </div>
                        <div className="flex flex-col gap-[3px] rounded-xl bg-ok-soft px-3.5 py-2.5">
                          <span className={cn(LABEL, "text-ok-ink")}>Đáp án đúng</span>
                          <span className="text-[15px] font-bold text-ok-ink">{q.correctAnswer}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3.5 md:px-3.5 lg:grid-cols-2 lg:gap-2.5 lg:px-0">
                        {q.item.exampleSentence && (
                          <div className="flex flex-col gap-[3px] lg:px-3.5">
                            <span className={cn(LABEL, "text-brand")}>Ví dụ</span>
                            <p className="font-jp text-[15px] leading-[2.05] text-ink">
                              <Furigana markup={q.item.exampleSentenceFurigana} fallback={q.item.exampleSentence} />
                            </p>
                            {q.item.exampleTranslation && <p className="text-[13px] leading-normal text-ink-2">{q.item.exampleTranslation}</p>}
                          </div>
                        )}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-[38px] lg:grid-cols-1 lg:gap-2.5 lg:px-3.5">
                          {q.item.businessContext && (
                            <div className="flex flex-col gap-[3px]">
                              <span className={cn(LABEL, "text-ink-3")}>Ngữ cảnh business</span>
                              <p className="text-[13px] leading-[1.55] text-ink">{q.item.businessContext}</p>
                            </div>
                          )}
                          {q.item.usageNotes && (
                            <div className="flex flex-col gap-[3px]">
                              <span className={cn(LABEL, "text-ink-3")}>Lưu ý cách dùng</span>
                              <p className="text-[13px] leading-[1.55] text-ink">{q.item.usageNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
            {visible.length === 0 && <p className="py-10 text-center text-sm text-ink-3">Không có câu nào trong mục này.</p>}
          </div>
        </section>

        {/* Mobile: thanh hành động cố định */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-surface px-4 pt-3 pb-[max(env(safe-area-inset-bottom),20px)] md:hidden">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-[52px] w-24 shrink-0 items-center justify-center rounded-[14px] border border-line-strong bg-surface text-[15px] font-semibold text-ink"
          >
            Thoát
          </button>
          <button
            type="button"
            onClick={retry}
            className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-brand text-[15px] font-bold text-white"
          >
            <RotateCcw className="h-[17px] w-[17px]" strokeWidth={2.2} aria-hidden />
            Làm lại bài thi
          </button>
        </div>
      </div>
    );
  }

  // ═════════════════════ LÀM BÀI ═════════════════════
  const qGrid = (className: string, cellClass?: string) => (
    <div className={cn("grid gap-2", className)}>
      {questions.map((_, idx) => {
        const done = !!answers[idx];
        const isCurrent = idx === currentIndex;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Câu ${idx + 1}${done ? " (đã trả lời)" : " (chưa trả lời)"}`}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              "h-10 rounded-[9px] border text-[13px] font-bold transition-transform hover:scale-[1.06]",
              done ? "border-brand-muted bg-brand-soft text-brand-soft-ink" : "border-line bg-surface text-ink-2",
              isCurrent && "ring-2 ring-ink ring-offset-2 ring-offset-surface",
              cellClass
            )}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );

  const answeredTiles = (
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Đã trả lời", n: answeredCount, dot: "bg-brand" },
        { label: "Chưa trả lời", n: leftCount, dot: "border-[1.5px] border-line-strong" },
      ].map((s) => (
        <div key={s.label} className="flex flex-col gap-0.5 rounded-xl bg-surface-2 px-3 py-2.5">
          <span className="flex items-center gap-1.5 text-xs whitespace-nowrap text-ink-2">
            <span className={cn("h-2 w-2 rounded-full", s.dot)} />
            {s.label}
          </span>
          <span className="text-xl leading-[1.3] font-extrabold text-ink">{s.n}</span>
        </div>
      ))}
    </div>
  );

  const submitBtn = (className?: string) => (
    <button
      type="button"
      onClick={askSubmit}
      className={cn(
        "flex h-[50px] items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white transition-colors hover:bg-brand-hover",
        className
      )}
    >
      <Send className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
      Nộp bài
    </button>
  );

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col md:gap-4 md:px-8 md:py-5 lg:h-[calc(100dvh-4rem)] lg:gap-5 lg:py-6">
      {/* Mobile: thanh trên */}
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur md:hidden">
        <div className="flex h-[60px] items-center justify-between px-2">
          <button type="button" onClick={() => router.back()} aria-label="Thoát bài thi" className="flex h-11 w-11 items-center justify-center rounded-xl text-ink">
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
          <div className="flex min-w-0 flex-col items-center">
            <h1 className="text-[15px] font-bold text-ink">
              Câu {currentIndex + 1} / {total}
            </h1>
            <span className="max-w-[240px] truncate text-xs text-ink-3">
              Đã trả lời {answeredCount} · {title}
            </span>
          </div>
          <button type="button" onClick={() => setListOpen(true)} aria-label="Danh sách câu hỏi" className="flex h-11 w-11 items-center justify-center rounded-xl text-ink">
            <LayoutGrid className="h-[21px] w-[21px]" />
          </button>
        </div>
        <div role="progressbar" aria-label="Tiến độ" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answeredCount} className="h-1 bg-track">
          <div className="h-full bg-brand transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      {/* Tablet / desktop: hàng tiêu đề */}
      <div className="hidden items-center justify-between md:flex">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 items-center gap-1.5 rounded-[10px] pr-3.5 pl-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
          Quay lại
        </button>
        <h1 className="truncate text-[17px] font-bold text-ink lg:text-lg">{title}</h1>
        <span className="min-w-[90px] text-right text-[13px] text-ink-3">{total} câu · 4 đáp án</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:gap-8">
        {/* Desktop: danh sách câu hỏi */}
        <aside aria-label="Danh sách câu hỏi" className="hidden w-[336px] shrink-0 flex-col gap-4 rounded-[20px] border border-line bg-surface p-5 lg:flex">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-ink">Danh sách câu hỏi</h2>
            <span className="text-[13px] font-medium text-ink-3">
              {answeredCount}/{total}
            </span>
          </div>
          {answeredTiles}
          <div className="h-px bg-line" />
          <div className="min-h-0 flex-1 overflow-y-auto p-1">{qGrid("grid-cols-6 content-start")}</div>
          {submitBtn()}
        </aside>

        {/* Câu hỏi */}
        <section className="flex min-w-0 flex-1 flex-col gap-3.5 px-4 pt-4 pb-32 md:gap-4 md:p-0 lg:gap-[18px]">
          <div className="hidden flex-col gap-2 md:flex">
            <div className="flex justify-between text-xs font-bold tracking-[0.08em] text-ink-3 uppercase">
              <span>Tiến độ</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-track">
              <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-[20px] border border-line bg-surface px-[18px] pt-4 pb-6 md:gap-2.5 md:rounded-3xl md:px-7 md:pt-6 md:pb-9">
            <div className="flex w-full items-center justify-between">
              <span className="hidden rounded-full bg-brand-soft px-3 py-[5px] text-xs font-bold text-brand-soft-ink md:inline">
                Câu {currentIndex + 1} / {total}
              </span>
              <span className="text-[13px] font-semibold text-ink-2 md:text-sm">Nghĩa của từ này là gì?</span>
            </div>
            <h2 className={cn("pt-3 text-center font-mincho leading-[1.15] font-semibold text-ink md:pt-[18px]", kanjiSize(currentQ.item.kanji))}>
              {currentQ.item.kanji}
            </h2>
            {readingOf(currentQ.item) && (
              <p className="font-jp text-base tracking-[0.1em] text-ink-2 md:text-lg">{readingOf(currentQ.item)}</p>
            )}
          </div>

          <div role="radiogroup" aria-label="Đáp án" className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectOption(option)}
                  className={cn(
                    "flex min-h-[60px] items-center gap-3.5 rounded-2xl border-[1.5px] px-4 py-3 text-left text-[15px] leading-[1.4] font-medium text-ink transition-colors md:min-h-[72px] md:text-base lg:min-h-[76px] lg:px-[18px]",
                    isSelected ? "border-brand bg-brand-soft" : "border-line bg-surface hover:border-brand/60"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border text-[13px] font-extrabold",
                      isSelected ? "border-brand bg-brand text-white" : "border-transparent bg-surface-2 text-ink-2"
                    )}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Tablet / desktop: điều hướng */}
          <div className="hidden grid-cols-2 gap-3 md:grid lg:mt-auto lg:flex lg:items-center lg:justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong bg-surface px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 lg:text-sm"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              Câu trước
            </button>
            {isLast ? (
              <button
                type="button"
                onClick={askSubmit}
                className="flex h-12 items-center justify-center rounded-xl bg-brand px-6 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover lg:text-sm"
              >
                Nộp bài
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-bold text-paper transition-opacity hover:opacity-90 lg:text-sm"
              >
                Câu sau
                <ChevronRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
              </button>
            )}
          </div>

          {/* Tablet: danh sách câu hỏi bên dưới */}
          <section aria-label="Danh sách câu hỏi" className="hidden flex-col gap-3.5 rounded-[20px] border border-line bg-surface px-[18px] pt-4 pb-[18px] md:flex lg:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-ink">Danh sách câu hỏi</h2>
              <div className="flex gap-1.5">
                <span className="flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-[5px] text-[12.5px] text-ink-2">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  Đã trả lời <b className="text-ink">{answeredCount}</b>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-[5px] text-[12.5px] text-ink-2">
                  <span className="h-2 w-2 rounded-full border-[1.5px] border-line-strong" />
                  Chưa trả lời <b className="text-ink">{leftCount}</b>
                </span>
              </div>
            </div>
            {qGrid("grid-cols-10", "h-11")}
            {submitBtn()}
          </section>
        </section>
      </div>

      {/* Mobile: thanh hành động cố định */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-surface px-4 pt-3 pb-[max(env(safe-area-inset-bottom),20px)] md:hidden">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Câu trước"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-line-strong bg-surface text-ink disabled:opacity-40"
        >
          <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </button>
        {isLast ? (
          <button type="button" onClick={askSubmit} className="flex h-[52px] flex-1 items-center justify-center rounded-[14px] bg-brand text-[15px] font-bold text-white">
            Nộp bài
          </button>
        ) : (
          <button type="button" onClick={handleNext} className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[14px] bg-ink text-[15px] font-bold text-paper">
            Câu sau
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </button>
        )}
      </div>

      {/* Mobile: bottom sheet danh sách câu hỏi */}
      {listOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end md:hidden" role="dialog" aria-modal="true" aria-label="Danh sách câu hỏi">
          <button type="button" aria-label="Đóng danh sách" onClick={() => setListOpen(false)} className="absolute inset-0 cursor-default bg-ink/40 animate-in fade-in duration-200" />
          <div className="relative flex flex-col gap-3.5 rounded-t-3xl bg-surface px-4 pb-[max(env(safe-area-inset-bottom),28px)] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex h-5 items-center justify-center" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-line-strong" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-extrabold text-ink">Danh sách câu hỏi</h2>
              <button type="button" onClick={() => setListOpen(false)} aria-label="Đóng" className="-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-ink-2">
                <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>
            </div>
            {answeredTiles}
            <div className="max-h-[40dvh] overflow-y-auto p-1">{qGrid("grid-cols-6", "h-[46px] rounded-[10px] text-sm")}</div>
            {submitBtn("h-[52px] rounded-[14px]")}
          </div>
        </div>
      )}

      {/* Xác nhận nộp bài: hộp giữa màn hình (tablet/desktop), bottom sheet (mobile) */}
      {confirmOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-6">
          <button type="button" aria-label="Đóng" onClick={() => setConfirmOpen(false)} className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[3px] animate-in fade-in duration-200" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-title"
            className="relative flex w-full flex-col gap-4 rounded-t-3xl bg-surface px-5 pt-2 pb-[max(env(safe-area-inset-bottom),28px)] shadow-2xl animate-in slide-in-from-bottom-6 duration-300 sm:w-[420px] sm:rounded-[22px] sm:border sm:border-line sm:p-[26px] sm:zoom-in-95"
          >
            <div className="flex h-5 items-center justify-center sm:hidden" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-line-strong" />
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-soft-ink">
              <Send className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 id="submit-title" className="text-[19px] font-extrabold text-ink">
                Nộp bài?
              </h2>
              <p className="text-sm leading-[1.55] text-ink-2">
                Bạn đã trả lời{" "}
                <b className="text-ink">
                  {answeredCount}/{total}
                </b>{" "}
                câu.
              </p>
              {leftCount > 0 && (
                <p className="text-sm leading-[1.55] font-semibold text-brand">Còn {leftCount} câu chưa làm sẽ được tính là bỏ trống.</p>
              )}
            </div>
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="h-12 flex-1 rounded-xl border border-line-strong bg-surface text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
              >
                Làm tiếp
              </button>
              <button
                type="button"
                onClick={doSubmit}
                className="h-12 flex-1 rounded-xl bg-brand text-sm font-bold text-white transition-colors hover:bg-brand-hover"
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
