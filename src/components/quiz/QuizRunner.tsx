"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
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
  Shuffle,
  X,
} from "lucide-react";
import type { VocabularyItem } from "@/types/vocabulary";
import { cn } from "@/lib/utils";
import { Furigana } from "@/components/ui/furigana";
import { readingOf } from "@/lib/vocab-labels";
import {
  QUESTION_TYPES,
  TYPE_LABEL,
  gradeQuestion,
  isAnswered,
  questionItems,
  type Answer,
  type Question,
  type QuestionType,
  type Seg,
  type Verdict,
} from "@/lib/quiz";

export interface QuizOutcome {
  wrongItems: VocabularyItem[];
  rightItems: VocabularyItem[];
}

interface QuizRunnerProps {
  questions: Question[];
  title: string;
  /** Gọi một lần khi nộp bài (cập nhật danh sách cần ôn) */
  onFinish: (outcome: QuizOutcome) => void;
  /** Làm đề mới cùng thiết lập (chọn từ khác) */
  onNewSession: () => void;
  /** Làm lại riêng các từ sai */
  onRetryWrong: (items: VocabularyItem[]) => void;
}

type ReviewFilter = "all" | Verdict;

const LABEL = "text-[11px] font-bold uppercase tracking-[0.08em]";
const RING_C = 452.4; // 2π × 72
const PROMPT: Record<QuestionType, string> = {
  meaning: "Nghĩa của từ này là gì?",
  reverse: "Từ nào có nghĩa này?",
  reading: "Cách đọc đúng của từ này?",
  cloze: "Chọn từ phù hợp điền vào chỗ trống",
  passage: "Điền từ phù hợp vào từng chỗ trống",
};

function kanjiSize(text: string) {
  const n = text.length;
  if (n <= 3) return "text-[56px] sm:text-[72px]";
  if (n <= 5) return "text-[44px] sm:text-[60px]";
  if (n <= 7) return "text-[36px] sm:text-[48px]";
  return "text-[30px] sm:text-[38px]";
}

/** Câu / đoạn văn có furigana và chỗ trống */
function SentenceView({ segs, renderBlank, className }: { segs: Seg[]; renderBlank: (n: number) => React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-jp text-ink", className)}>
      {segs.map((s, i) =>
        s.blank !== undefined ? (
          <Fragment key={i}>{renderBlank(s.blank)}</Fragment>
        ) : s.ruby ? (
          <ruby key={i}>
            {s.text}
            <rp>(</rp>
            <rt>{s.ruby}</rt>
            <rp>)</rp>
          </ruby>
        ) : (
          <Fragment key={i}>{s.text}</Fragment>
        )
      )}
    </p>
  );
}

export function QuizRunner({ questions, title, onFinish, onNewSession, onRetryWrong }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [activeBlank, setActiveBlank] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});

  const total = questions.length;
  const graded = useMemo(() => questions.map((q, i) => gradeQuestion(q, answers[i])), [questions, answers]);

  // Các phần theo dạng câu hỏi
  const parts = useMemo(() => {
    const list: { type: QuestionType; start: number; end: number }[] = [];
    questions.forEach((q, i) => {
      const last = list[list.length - 1];
      if (last && last.type === q.type) last.end = i;
      else list.push({ type: q.type, start: i, end: i });
    });
    return list;
  }, [questions]);

  if (total === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-medium text-ink-2">Không có từ nào trong phạm vi này để làm trắc nghiệm.</p>
        <Link href="/quiz" className="rounded-xl border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink">
          Chọn phạm vi khác
        </Link>
      </div>
    );
  }

  const answeredCount = questions.filter((q, i) => isAnswered(q, answers[i])).length;
  const leftCount = total - answeredCount;
  const progressPct = Math.round((answeredCount / total) * 100);
  const currentQ = questions[currentIndex];
  const partIndex = parts.findIndex((p) => currentIndex >= p.start && currentIndex <= p.end);
  const level = QUESTION_TYPES.find((t) => t.type === currentQ.type)?.level;
  const isLast = currentIndex === total - 1;

  const goTo = (i: number) => {
    setCurrentIndex(i);
    setActiveBlank(0);
    setListOpen(false);
  };
  const handleNext = () => currentIndex < total - 1 && goTo(currentIndex + 1);
  const handlePrev = () => currentIndex > 0 && goTo(currentIndex - 1);

  const choose = (option: string) => {
    if (currentQ.type === "passage") {
      const arr = Array.isArray(answers[currentIndex]) ? [...(answers[currentIndex] as (string | undefined)[])] : [];
      arr[activeBlank] = option;
      setAnswers((prev) => ({ ...prev, [currentIndex]: arr }));
      // Tự chuyển sang chỗ trống chưa điền tiếp theo
      const nextEmpty = currentQ.blanks.findIndex((_, i) => i !== activeBlank && !arr[i]);
      if (nextEmpty >= 0) setActiveBlank(nextEmpty);
    } else {
      setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
    }
  };

  const askSubmit = () => {
    setListOpen(false);
    setConfirmOpen(true);
  };
  const doSubmit = () => {
    setConfirmOpen(false);
    setIsFinished(true);
    setFilter("all");
    setOpenMap({});
    const wrong: VocabularyItem[] = [];
    const right: VocabularyItem[] = [];
    graded.forEach((g) => g.perItem.forEach((p) => (p.ok ? right : wrong).push(p.item)));
    onFinish({ wrongItems: wrong, rightItems: right });
    window.scrollTo(0, 0);
  };

  // ═════════════════════ KẾT QUẢ ═════════════════════
  if (isFinished) {
    return (
      <QuizResult
        questions={questions}
        answers={answers}
        graded={graded}
        title={title}
        filter={filter}
        setFilter={setFilter}
        openMap={openMap}
        setOpenMap={setOpenMap}
        onNewSession={onNewSession}
        onRetryWrong={onRetryWrong}
      />
    );
  }

  // ═════════════════════ LÀM BÀI ═════════════════════
  const qGrid = (cols: string, cellClass?: string) => (
    <div className="flex flex-col gap-3">
      {parts.map((p, pi) => (
        <div key={pi} className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold tracking-[0.06em] text-ink-3 uppercase">
            Phần {pi + 1} · {TYPE_LABEL[p.type]}
          </span>
          <div className={cn("grid gap-2", cols)}>
            {questions.slice(p.start, p.end + 1).map((q, k) => {
              const idx = p.start + k;
              const done = isAnswered(q, answers[idx]);
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
        </div>
      ))}
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
        "flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white transition-colors hover:bg-brand-hover",
        className
      )}
    >
      <Send className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
      Nộp bài
    </button>
  );

  // ── Nội dung câu hỏi theo dạng ──
  const current = answers[currentIndex];
  let prompt: React.ReactNode;
  let options: string[];
  let selected: string | undefined;
  let optionClass = "text-[15px] md:text-base";

  if (currentQ.type === "passage") {
    const arr = Array.isArray(current) ? current : [];
    options = currentQ.blanks[activeBlank]?.options ?? [];
    selected = arr[activeBlank];
    optionClass = "font-mincho text-lg font-semibold md:text-xl";
    prompt = (
      <div className="flex w-full flex-col gap-3">
        <SentenceView
          segs={currentQ.segments}
          className="text-[16px] leading-[2.3] md:text-[18px]"
          renderBlank={(n) => {
            const val = arr[n];
            const on = n === activeBlank;
            return (
              <button
                type="button"
                onClick={() => setActiveBlank(n)}
                aria-label={`Chỗ trống ${n + 1}${val ? `: ${val}` : ""}`}
                className={cn(
                  "mx-0.5 inline-flex min-w-[72px] items-center justify-center gap-1 rounded-lg border-b-2 px-2 align-baseline leading-[1.6] transition-colors",
                  on ? "border-brand bg-brand-soft text-brand-soft-ink" : val ? "border-ink-3 bg-surface-2 text-ink" : "border-line-strong bg-surface-2 text-ink-3"
                )}
              >
                <span className="text-[11px] font-bold font-sans">{n + 1}</span>
                {val && <span className="font-mincho font-semibold">{val}</span>}
              </button>
            );
          }}
        />
        <div className="flex flex-wrap items-center gap-1.5">
          {currentQ.blanks.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setActiveBlank(n)}
              className={cn(
                "h-8 rounded-full px-3 text-xs font-bold transition-colors",
                n === activeBlank ? "bg-ink text-paper" : arr[n] ? "bg-brand-soft text-brand-soft-ink" : "bg-surface-2 text-ink-2"
              )}
            >
              Chỗ trống {n + 1}
              {arr[n] ? " ✓" : ""}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    options = currentQ.options;
    selected = typeof current === "string" ? current : undefined;
    const item = currentQ.item;
    if (currentQ.type === "meaning") {
      prompt = (
        <>
          <h2 className={cn("pt-2 text-center font-mincho leading-[1.15] font-semibold text-ink", kanjiSize(item.kanji))}>{item.kanji}</h2>
          {readingOf(item) && <p className="font-jp text-base tracking-[0.1em] text-ink-2 md:text-lg">{readingOf(item)}</p>}
        </>
      );
    } else if (currentQ.type === "reading") {
      optionClass = "font-jp text-lg tracking-[0.06em] md:text-xl";
      prompt = (
        <>
          <h2 className={cn("pt-2 text-center font-mincho leading-[1.15] font-semibold text-ink", kanjiSize(item.kanji))}>{item.kanji}</h2>
          <p className="text-sm text-ink-3">{item.meaningVn}</p>
        </>
      );
    } else if (currentQ.type === "reverse") {
      optionClass = "font-mincho text-xl font-semibold md:text-2xl";
      prompt = (
        <div className="flex flex-col items-center gap-1.5 py-3 text-center">
          <h2 className="text-2xl leading-snug font-extrabold text-brand md:text-[28px]">{item.meaningVn}</h2>
          {item.meaningEn && <p className="text-sm text-ink-3">{item.meaningEn}</p>}
        </div>
      );
    } else {
      optionClass = "font-mincho text-xl font-semibold md:text-2xl";
      prompt = (
        <SentenceView
          segs={currentQ.sentence ?? []}
          className="w-full py-2 text-[17px] leading-[2.3] md:text-xl"
          renderBlank={() => (
            <span
              className={cn(
                "mx-1 inline-block min-w-[88px] rounded-lg border-b-2 px-2 text-center align-baseline font-mincho leading-[1.6] font-semibold",
                selected ? "border-brand bg-brand-soft text-brand-soft-ink" : "border-line-strong bg-surface-2 text-transparent"
              )}
            >
              {selected ?? "＿"}
            </span>
          )}
        />
      );
    }
  }

  const partLabel = `Phần ${partIndex + 1}/${parts.length} · ${TYPE_LABEL[currentQ.type]}`;

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col md:gap-4 md:px-8 md:py-5 lg:h-[calc(100dvh-4rem)] lg:gap-5 lg:py-6">
      {/* Mobile: thanh trên */}
      <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur md:hidden">
        <div className="flex h-[60px] items-center justify-between px-2">
          <Link href="/quiz" aria-label="Thoát bài thi" className="flex h-11 w-11 items-center justify-center rounded-xl text-ink">
            <X className="h-5 w-5" strokeWidth={2.2} />
          </Link>
          <div className="flex min-w-0 flex-col items-center">
            <h1 className="text-[15px] font-bold text-ink">
              Câu {currentIndex + 1} / {total}
            </h1>
            <span className="max-w-[240px] truncate text-xs text-ink-3">{partLabel}</span>
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
        <Link
          href="/quiz"
          className="flex h-10 items-center gap-1.5 rounded-[10px] pr-3.5 pl-2 text-sm font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
          Trắc nghiệm
        </Link>
        <h1 className="truncate text-[17px] font-bold text-ink lg:text-lg">{title}</h1>
        <span className="min-w-[90px] text-right text-[13px] text-ink-3">
          {total} câu · {parts.length} phần
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row lg:gap-8">
        {/* Desktop: danh sách câu hỏi theo phần */}
        <aside aria-label="Danh sách câu hỏi" className="hidden w-[336px] shrink-0 flex-col gap-4 rounded-[20px] border border-line bg-surface p-5 lg:flex">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-ink">Danh sách câu hỏi</h2>
            <span className="text-[13px] font-medium text-ink-3">
              {answeredCount}/{total}
            </span>
          </div>
          {answeredTiles}
          <div className="h-px shrink-0 bg-line" />
          <div className="min-h-0 flex-1 overflow-y-auto p-1">{qGrid("grid-cols-6")}</div>
          {submitBtn()}
        </aside>

        {/* Câu hỏi */}
        <section className="flex min-w-0 flex-1 flex-col gap-3.5 px-4 pt-4 pb-32 md:gap-4 md:p-0 lg:min-h-0 lg:overflow-y-auto lg:gap-[18px]">
          <div className="hidden flex-col gap-2 md:flex">
            <div className="flex justify-between text-xs font-bold tracking-[0.08em] text-ink-3 uppercase">
              <span>Tiến độ</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-track">
              <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-[20px] border border-line bg-surface px-[18px] pt-4 pb-6 md:gap-2.5 md:rounded-3xl md:px-7 md:pt-6 md:pb-8">
            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="hidden rounded-full bg-brand-soft px-3 py-[5px] text-xs font-bold text-brand-soft-ink md:inline">
                  Câu {currentIndex + 1} / {total}
                </span>
                <span className="rounded-full bg-surface-2 px-3 py-[5px] text-xs font-semibold text-ink-2">
                  {partLabel}
                  {level && <span className="text-ink-3"> · {level}</span>}
                </span>
              </div>
              <span className="text-[13px] font-semibold text-ink-2 md:text-sm">{PROMPT[currentQ.type]}</span>
            </div>
            {prompt}
          </div>

          <div role="radiogroup" aria-label="Đáp án" className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
            {options.map((option, idx) => {
              const isSelected = selected === option;
              return (
                <button
                  key={`${currentIndex}-${activeBlank}-${idx}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => choose(option)}
                  className={cn(
                    "flex min-h-[60px] items-center gap-3.5 rounded-2xl border-[1.5px] px-4 py-3 text-left leading-[1.4] font-medium text-ink transition-colors md:min-h-[72px] lg:px-[18px]",
                    optionClass,
                    isSelected ? "border-brand bg-brand-soft" : "border-line bg-surface hover:border-brand/60"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border font-sans text-[13px] font-extrabold",
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
              <span className="text-[13px] text-ink-3">
                Đã trả lời <b className="text-ink">{answeredCount}</b> / {total}
              </span>
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
          <div className="relative flex max-h-[85dvh] flex-col gap-3.5 rounded-t-3xl bg-surface px-4 pb-[max(env(safe-area-inset-bottom),28px)] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex h-5 shrink-0 items-center justify-center" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-line-strong" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-extrabold text-ink">Danh sách câu hỏi</h2>
              <button type="button" onClick={() => setListOpen(false)} aria-label="Đóng" className="-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-ink-2">
                <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>
            </div>
            {answeredTiles}
            <div className="min-h-0 overflow-y-auto p-1">{qGrid("grid-cols-6", "h-[46px] rounded-[10px] text-sm")}</div>
            {submitBtn("h-[52px] rounded-[14px]")}
          </div>
        </div>
      )}

      {/* Xác nhận nộp bài */}
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
                Bạn đã trả lời đủ{" "}
                <b className="text-ink">
                  {answeredCount}/{total}
                </b>{" "}
                câu.
              </p>
              {leftCount > 0 && <p className="text-sm leading-[1.55] font-semibold text-brand">Còn {leftCount} câu chưa làm xong sẽ được chấm theo phần đã điền.</p>}
            </div>
            <div className="flex gap-2.5 pt-1">
              <button type="button" onClick={() => setConfirmOpen(false)} className="h-12 flex-1 rounded-xl border border-line-strong bg-surface text-sm font-semibold text-ink transition-colors hover:bg-surface-2">
                Làm tiếp
              </button>
              <button type="button" onClick={doSubmit} className="h-12 flex-1 rounded-xl bg-brand text-sm font-bold text-white transition-colors hover:bg-brand-hover">
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═════════════════════ MÀN KẾT QUẢ ═════════════════════

interface QuizResultProps {
  questions: Question[];
  answers: Record<number, Answer>;
  graded: ReturnType<typeof gradeQuestion>[];
  title: string;
  filter: ReviewFilter;
  setFilter: (f: ReviewFilter) => void;
  openMap: Record<number, boolean>;
  setOpenMap: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  onNewSession: () => void;
  onRetryWrong: (items: VocabularyItem[]) => void;
}

function QuizResult({ questions, answers, graded, title, filter, setFilter, openMap, setOpenMap, onNewSession, onRetryWrong }: QuizResultProps) {
  const total = questions.length;
  const verdicts = graded.map((g) => g.verdict);
  const nRight = verdicts.filter((v) => v === "right").length;
  const nWrong = verdicts.filter((v) => v === "wrong").length;
  const nSkip = verdicts.filter((v) => v === "skip").length;
  const scorePct = Math.round((nRight / total) * 100);

  // Từ chưa thuộc = từ trả lời sai hoặc bỏ trống (không trùng)
  const wrongItems = useMemo(() => {
    const map = new Map<string, VocabularyItem>();
    graded.forEach((g) => g.perItem.forEach((p) => !p.ok && map.set(p.item.id, p.item)));
    return [...map.values()];
  }, [graded]);

  // Phân tích theo dạng câu hỏi (tính theo từng từ / chỗ trống)
  const byType = useMemo(() => {
    const m = new Map<QuestionType, { ok: number; all: number }>();
    questions.forEach((q, i) => {
      const s = m.get(q.type) ?? { ok: 0, all: 0 };
      graded[i].perItem.forEach((p) => {
        s.all++;
        if (p.ok) s.ok++;
      });
      m.set(q.type, s);
    });
    return QUESTION_TYPES.filter((t) => m.has(t.type)).map((t) => ({ ...t, ...m.get(t.type)! }));
  }, [questions, graded]);

  const weakest = byType.length > 1 ? [...byType].sort((a, b) => a.ok / a.all - b.ok / b.all)[0] : undefined;

  const counts: Record<ReviewFilter, number> = { all: total, wrong: nWrong, skip: nSkip, right: nRight };
  const filters: { value: ReviewFilter; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "wrong", label: "Sai" },
    { value: "skip", label: "Bỏ trống" },
    { value: "right", label: "Đúng" },
  ];
  const visible = questions.map((q, idx) => ({ q, idx, kind: verdicts[idx] })).filter((r) => filter === "all" || r.kind === filter);

  const ring = (
    <div className="relative h-28 w-28 shrink-0 md:h-[132px] md:w-[132px] lg:h-[150px] lg:w-[150px]">
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
        <span className="text-[26px] leading-[1.1] font-extrabold text-ink md:text-[30px] lg:text-[34px]">
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
      {wrongItems.length > 0 && (
        <button
          type="button"
          onClick={() => onRetryWrong(wrongItems)}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
        >
          <RotateCcw className="h-[17px] w-[17px]" strokeWidth={2.2} aria-hidden />
          Ôn lại {wrongItems.length} từ chưa thuộc
        </button>
      )}
      <button
        type="button"
        onClick={onNewSession}
        className={cn(
          "flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors",
          wrongItems.length > 0 ? "border border-line-strong bg-surface text-ink hover:bg-surface-2" : "bg-brand text-white hover:bg-brand-hover"
        )}
      >
        <Shuffle className="h-[17px] w-[17px]" strokeWidth={2.2} aria-hidden />
        Làm đề mới (từ khác)
      </button>
      <Link href="/quiz" className="flex h-11 items-center justify-center rounded-xl text-sm font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
        Về trang trắc nghiệm
      </Link>
    </>
  );

  const analysis = (
    <section className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-4 md:p-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-[15px] font-extrabold text-ink">Phân tích theo dạng câu hỏi</h2>
        <div className="flex flex-col gap-2.5">
          {byType.map((t) => {
            const pct = t.all ? Math.round((t.ok / t.all) * 100) : 0;
            return (
              <div key={t.type} className="flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3 text-[13px]">
                  <span className="font-semibold text-ink">{t.label}</span>
                  <span className="text-ink-3">
                    <b className="text-ink">{t.ok}</b>/{t.all} · {pct}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-track">
                  <div className={cn("h-full rounded-full", pct >= 80 ? "bg-ok" : pct >= 50 ? "bg-brand-muted" : "bg-brand")} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        {weakest && weakest.ok < weakest.all && (
          <p className="rounded-xl bg-surface-2 px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-2">
            Dạng cần luyện thêm: <b className="text-ink">{weakest.label}</b> ({Math.round((weakest.ok / weakest.all) * 100)}%).
          </p>
        )}
      </div>

      <div className="h-px bg-line" />

      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-extrabold text-ink">Từ chưa thuộc ({wrongItems.length})</h2>
          {wrongItems.length > 0 && <span className="text-xs text-ink-3">Đã thêm vào “Cần ôn lại”</span>}
        </div>
        {wrongItems.length ? (
          <div className="flex flex-wrap gap-1.5">
            {wrongItems.map((it) => (
              <span key={it.id} className="inline-flex items-baseline gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5">
                <span className="font-mincho text-[15px] font-semibold text-ink">{it.kanji}</span>
                <span className="text-xs text-ink-3">{it.meaningVn}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-ok-ink">Tuyệt vời! Bạn đã trả lời đúng tất cả các từ.</p>
        )}
      </div>
    </section>
  );

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col lg:h-[calc(100dvh-4rem)] lg:flex-row lg:gap-8 lg:px-8 lg:py-6">
      {/* Mobile: thanh trên */}
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-line bg-paper/95 px-2 backdrop-blur md:hidden">
        <Link href="/quiz" aria-label="Thoát" className="flex h-11 w-11 items-center justify-center rounded-xl text-ink">
          <X className="h-5 w-5" strokeWidth={2.2} />
        </Link>
        <h1 className="text-base font-bold text-ink">Kết quả</h1>
        <span className="w-11" />
      </header>

      {/* Tổng kết + hành động */}
      <aside className="flex shrink-0 flex-col gap-4 px-4 pt-4 md:px-8 md:pt-5 lg:w-[336px] lg:overflow-y-auto lg:px-0 lg:pt-0">
        <div className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-4 md:flex-row md:items-center md:gap-6 md:px-6 md:py-5 lg:flex-col lg:items-stretch lg:gap-[18px] lg:px-5 lg:pt-6">
          <div className="flex items-center gap-4 lg:flex-col lg:gap-3">
            {ring}
            <div className="flex flex-col gap-0.5 lg:items-center lg:text-center">
              <span className="text-xl font-extrabold text-ink">Hoàn thành!</span>
              <span className="text-[13px] leading-snug text-ink-3">{title}</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-none">{statTiles}</div>
          <div className="hidden w-[210px] shrink-0 flex-col gap-2 md:flex lg:w-auto">{actions}</div>
        </div>
      </aside>

      {/* Phân tích + chi tiết */}
      <section className="flex min-w-0 flex-1 flex-col gap-4 px-4 pt-4 pb-28 md:px-8 md:pb-10 lg:min-h-0 lg:overflow-y-auto lg:px-0 lg:pt-0 lg:pb-0 lg:pr-1.5">
        {analysis}

        <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[17px] font-extrabold text-ink md:text-lg">Chi tiết bài làm</h2>
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

        <div className="flex flex-col gap-2.5">
          {visible.map(({ q, idx, kind }) => (
            <ReviewItem
              key={idx}
              q={q}
              idx={idx}
              kind={kind}
              answer={answers[idx]}
              expanded={openMap[idx] ?? kind !== "right"}
              onToggle={(v) => setOpenMap((m) => ({ ...m, [idx]: v }))}
            />
          ))}
          {visible.length === 0 && <p className="py-10 text-center text-sm text-ink-3">Không có câu nào trong mục này.</p>}
        </div>
      </section>

      {/* Mobile: 2 hành động chính cố định (thoát bằng nút ✕ ở thanh trên) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-surface px-4 pt-3 pb-[max(env(safe-area-inset-bottom),16px)] md:hidden">
        {wrongItems.length > 0 && (
          <button
            type="button"
            onClick={() => onRetryWrong(wrongItems)}
            className="flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-[14px] bg-brand px-2 text-sm font-bold text-white"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            Ôn {wrongItems.length} từ sai
          </button>
        )}
        <button
          type="button"
          onClick={onNewSession}
          className={cn(
            "flex h-[52px] flex-1 items-center justify-center gap-1.5 rounded-[14px] px-2 text-sm font-bold",
            wrongItems.length > 0 ? "border border-line-strong bg-surface text-ink" : "bg-brand text-white"
          )}
        >
          <Shuffle className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          Đề mới
        </button>
      </div>
    </div>
  );
}

function ReviewItem({
  q,
  idx,
  kind,
  answer,
  expanded,
  onToggle,
}: {
  q: Question;
  idx: number;
  kind: Verdict;
  answer: Answer | undefined;
  expanded: boolean;
  onToggle: (v: boolean) => void;
}) {
  const items = questionItems(q);
  const head = q.type === "passage" ? items.map((i) => i.kanji).join(" · ") : q.item.kanji;
  const tone = kind === "right" ? "bg-ok-soft text-ok-ink" : kind === "wrong" ? "bg-brand-soft text-brand-soft-ink" : "bg-surface-2 text-ink-2";

  return (
    <article className="shrink-0 overflow-hidden rounded-2xl border border-line bg-surface">
      <button type="button" aria-expanded={expanded} onClick={() => onToggle(!expanded)} className="flex w-full items-center gap-3 px-3.5 py-3 text-left md:px-4 lg:px-[18px]">
        <span className={cn("flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] text-xs font-extrabold", tone)}>{idx + 1}</span>
        <span className="flex min-w-0 flex-1 flex-col md:flex-row md:items-baseline md:gap-2.5">
          <span className="truncate font-mincho text-[19px] leading-[1.2] font-semibold text-ink md:text-[21px]">{head}</span>
          <span className="text-xs text-ink-3">{TYPE_LABEL[q.type]}</span>
        </span>
        <span className={cn("flex shrink-0 items-center gap-[5px] rounded-full px-2.5 py-[5px] text-[12.5px] font-bold", tone)}>
          {kind === "right" ? <Check className="h-3 w-3" strokeWidth={3} /> : kind === "wrong" ? <X className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" strokeWidth={3} />}
          {kind === "right" ? "Đúng" : kind === "wrong" ? "Sai" : "Bỏ trống"}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-ink-3 transition-transform", expanded && "rotate-180")} strokeWidth={2.2} aria-hidden />
      </button>

      {expanded && (
        <div className="flex flex-col gap-3.5 px-3.5 pb-4 md:pr-[18px] md:pb-[18px] md:pl-[58px] lg:pl-[62px]">
          {q.type === "passage" ? (
            <>
              <SentenceView
                segs={q.segments}
                className="text-[15px] leading-[2.2]"
                renderBlank={(n) => {
                  const a = Array.isArray(answer) ? answer[n] : undefined;
                  const ok = a === q.blanks[n].answer;
                  return (
                    <span className={cn("mx-0.5 rounded-md px-1.5 font-mincho font-semibold", ok ? "bg-ok-soft text-ok-ink" : "bg-brand-soft text-brand-soft-ink")}>
                      <sup className="mr-0.5 font-sans text-[10px]">{n + 1}</sup>
                      {q.blanks[n].answer}
                    </span>
                  );
                }}
              />
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {q.blanks.map((b, n) => {
                  const a = Array.isArray(answer) ? answer[n] : undefined;
                  const ok = a === b.answer;
                  return (
                    <div key={n} className={cn("flex flex-col gap-[3px] rounded-xl px-3.5 py-2.5", ok ? "bg-ok-soft" : "bg-surface-2")}>
                      <span className={cn(LABEL, ok ? "text-ok-ink" : "text-ink-3")}>Chỗ trống {n + 1}</span>
                      <span className="text-sm text-ink">
                        Bạn chọn:{" "}
                        <b className={cn("font-mincho", ok ? "text-ok-ink" : a ? "text-brand-soft-ink line-through" : "text-ink-3")}>{a ?? "—"}</b>
                        {!ok && (
                          <>
                            {" "}
                            · Đúng: <b className="font-mincho text-ok-ink">{b.answer}</b>
                          </>
                        )}
                      </span>
                      <span className="text-xs text-ink-3">
                        {readingOf(b.item)} — {b.item.meaningVn}
                      </span>
                    </div>
                  );
                })}
              </div>
              {q.translations.length > 0 && (
                <div className="flex flex-col gap-[3px]">
                  <span className={cn(LABEL, "text-ink-3")}>Dịch đoạn văn</span>
                  <p className="text-[13px] leading-[1.6] text-ink-2">{q.translations.join(" ")}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2.5">
                <div className="flex flex-col gap-[3px] rounded-xl bg-surface-2 px-3.5 py-2.5">
                  <span className={cn(LABEL, "text-ink-3")}>Bạn chọn</span>
                  {answer ? (
                    <span className={cn("text-[15px] font-semibold", kind === "right" ? "text-ok-ink" : "text-brand-soft-ink line-through decoration-2")}>{answer as string}</span>
                  ) : (
                    <span className="text-[15px] text-ink-3 italic">Không có đáp án</span>
                  )}
                </div>
                <div className="flex flex-col gap-[3px] rounded-xl bg-ok-soft px-3.5 py-2.5">
                  <span className={cn(LABEL, "text-ok-ink")}>Đáp án đúng</span>
                  <span className="text-[15px] font-bold text-ok-ink">{q.answer}</span>
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
                <div className="flex flex-col gap-2.5 lg:px-3.5">
                  <div className="flex flex-col gap-[3px]">
                    <span className={cn(LABEL, "text-ink-3")}>Từ vựng</span>
                    <p className="text-[13px] leading-[1.55] text-ink">
                      <b className="font-mincho text-[15px]">{q.item.kanji}</b> ({readingOf(q.item)}) — {q.item.meaningVn}
                    </p>
                  </div>
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
            </>
          )}
        </div>
      )}
    </article>
  );
}
