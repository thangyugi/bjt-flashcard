"use client";

import { useMemo, useRef, useState } from "react";
import { Check, CheckCheck, RotateCcw, Trophy, Undo2, X } from "lucide-react";
import type { N1Question } from "@/data/jlpt-n1/types";
import { useN1Store } from "@/store/n1-store";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/utils";
import { Jp } from "./Jp";

const KEYS = ["A", "B", "C", "D", "E", "F"];
const TYPE_LABEL: Record<N1Question["type"], string> = {
  choice: "Chọn đáp án",
  judge: "Đúng hay sai?",
  order: "Sắp xếp câu ★",
  match: "Nối mẫu – nghĩa",
};

interface Props {
  /** Khóa lưu điểm: "bai-01" hoặc "bai-01/ga-hayaika" */
  storeKey: string;
  questions: N1Question[];
  /** Đánh dấu xong chương khi đạt ngưỡng (chỉ dùng cho bài tổng ôn) */
  lessonId?: string;
  passPct?: number;
  compact?: boolean;
}

/** Trắc nghiệm nhiều dạng, chấm ngay từng câu kèm giải thích. */
export function QuizBlock({ storeKey, questions, lessonId, passPct = 70, compact }: Props) {
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const resultsRef = useRef(results);
  const saveQuiz = useN1Store((s) => s.saveQuiz);
  const markDone = useN1Store((s) => s.markDone);
  const last = useN1Store((s) => s.quiz[storeKey]);
  const hydrated = useHydrated();

  const answered = results.filter((r) => r !== null).length;
  const score = results.filter(Boolean).length;
  const finished = answered === questions.length;
  const pct = Math.round((score / questions.length) * 100);

  const report = (i: number, ok: boolean) => {
    const next = [...resultsRef.current];
    if (next[i] !== null) return;
    next[i] = ok;
    resultsRef.current = next;
    setResults(next);
    if (next.every((r) => r !== null)) {
      const sc = next.filter(Boolean).length;
      saveQuiz(storeKey, sc, questions.length);
      if (lessonId && (sc / questions.length) * 100 >= passPct) markDone(lessonId);
    }
  };

  const retry = () => {
    resultsRef.current = questions.map(() => null);
    setResults(resultsRef.current);
    setRound((r) => r + 1);
  };

  return (
    <div className={cn("flex flex-col gap-3", compact ? "" : "gap-4")}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-ink-3">
        <span>
          <b className="text-ink">{questions.length} câu</b> · đã làm {answered}/{questions.length}
          {!finished && answered > 0 && (
            <>
              {" "}
              · đúng <b className="text-ok-ink">{score}</b>
            </>
          )}
        </span>
        {hydrated && last && (
          <span>
            Cao nhất: <b className="text-ink">{last.best}/{last.total}</b>
          </span>
        )}
      </div>

      {questions.map((q, i) => (
        <QuestionCard key={`${round}-${i}`} index={i} q={q} seed={`${storeKey}-${i}-${round}`} onResult={(ok) => report(i, ok)} />
      ))}

      {finished && (
        <div
          className={cn(
            "flex flex-wrap items-center gap-4 rounded-2xl border p-5",
            pct >= passPct ? "border-ok/30 bg-ok-soft" : "border-brand/20 bg-brand-soft"
          )}
        >
          <Trophy className={cn("h-8 w-8 shrink-0", pct >= passPct ? "text-ok" : "text-brand")} aria-hidden />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-lg font-extrabold text-ink">
              {score}/{questions.length} câu đúng ({pct}%)
            </span>
            <span className="text-sm text-ink-2">
              {pct === 100
                ? "Hoàn hảo! Mẫu này đã nằm chắc trong đầu bạn."
                : pct >= passPct
                  ? "Tốt lắm! Xem lại giải thích các câu sai rồi đi tiếp nhé."
                  : "Chưa đạt — đọc lại phần \"Không nên dùng\" và \"So sánh\", rồi làm lại."}
              {lessonId && pct >= passPct && " Chương đã được đánh dấu hoàn thành."}
            </span>
          </div>
          <button
            type="button"
            onClick={retry}
            className="flex h-10 items-center gap-2 rounded-xl border border-line-strong bg-surface px-4 text-sm font-semibold text-ink hover:bg-surface-2"
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Làm lại
          </button>
        </div>
      )}
    </div>
  );
}

interface CardProps {
  index: number;
  q: N1Question;
  seed: string;
  onResult: (ok: boolean) => void;
}

function QuestionCard({ index, q, seed, onResult }: CardProps) {
  const label = q.type === "choice" && q.label ? q.label : TYPE_LABEL[q.type];
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-ink px-2 py-0.5 text-[11px] font-bold text-paper">Câu {index + 1}</span>
        <span className="text-[12px] font-semibold tracking-wide text-ink-3 uppercase">{label}</span>
      </div>
      {q.type === "choice" && <Choice q={q} onResult={onResult} />}
      {q.type === "judge" && <Judge q={q} onResult={onResult} />}
      {q.type === "order" && <Order q={q} seed={seed} onResult={onResult} />}
      {q.type === "match" && <Match q={q} seed={seed} onResult={onResult} />}
    </div>
  );
}

function Explain({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "mt-3 flex gap-2.5 rounded-xl px-3.5 py-3 text-sm leading-relaxed",
        ok ? "bg-ok-soft text-ok-ink" : "bg-brand-soft text-brand-soft-ink"
      )}
      role="status"
    >
      {ok ? <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> : <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
      <div className="flex min-w-0 flex-col gap-1 text-ink">
        <b className={ok ? "text-ok-ink" : "text-brand-soft-ink"}>{ok ? "Chính xác!" : "Chưa đúng."}</b>
        {children}
      </div>
    </div>
  );
}

/* ── Chọn đáp án ─────────────────────────────────────────── */
function Choice({ q, onResult }: { q: Extract<N1Question, { type: "choice" }>; onResult: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  return (
    <>
      <p className="text-[17px] leading-[2.1] text-ink">
        <Jp t={q.q} />
      </p>
      {q.qVi && <p className="mt-1 text-sm text-ink-3">{q.qVi}</p>}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {q.opts.map((o, i) => {
          const correct = i === q.answer;
          return (
            <button
              key={i}
              type="button"
              disabled={done}
              onClick={() => {
                setPicked(i);
                onResult(correct);
              }}
              className={cn(
                "flex min-h-12 items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left text-[15px] leading-[1.9] transition-colors",
                !done && "border-line-strong hover:border-brand hover:bg-brand-soft/40",
                done && correct && "border-ok bg-ok-soft",
                done && !correct && picked === i && "border-brand bg-brand-soft",
                done && !correct && picked !== i && "border-line opacity-60"
              )}
            >
              <span
                className={cn(
                  "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                  done && correct ? "bg-ok text-white" : done && picked === i ? "bg-brand text-white" : "bg-surface-2 text-ink-2"
                )}
              >
                {KEYS[i]}
              </span>
              <Jp t={o} className="text-ink" />
            </button>
          );
        })}
      </div>
      {done && (
        <Explain ok={picked === q.answer}>
          <Jp t={q.explain} vi />
        </Explain>
      )}
    </>
  );
}

/* ── Đúng / sai ──────────────────────────────────────────── */
function Judge({ q, onResult }: { q: Extract<N1Question, { type: "judge" }>; onResult: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<boolean | null>(null);
  const done = picked !== null;
  return (
    <>
      <p className="text-sm text-ink-3">Câu sau dùng ngữ pháp có tự nhiên không?</p>
      <p className="mt-1 rounded-xl bg-surface-2 px-4 py-3 text-[17px] leading-[2.1] text-ink">
        <Jp t={q.q} />
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[true, false].map((v) => {
          const correct = v === q.ok;
          return (
            <button
              key={String(v)}
              type="button"
              disabled={done}
              onClick={() => {
                setPicked(v);
                onResult(correct);
              }}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-xl border text-[15px] font-semibold transition-colors",
                !done && "border-line-strong hover:border-brand hover:bg-brand-soft/40",
                done && correct && "border-ok bg-ok-soft text-ok-ink",
                done && !correct && picked === v && "border-brand bg-brand-soft text-brand-soft-ink",
                done && !correct && picked !== v && "border-line opacity-60"
              )}
            >
              {v ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
              {v ? "Tự nhiên (○)" : "Sai (×)"}
            </button>
          );
        })}
      </div>
      {done && (
        <Explain ok={picked === q.ok}>
          <span>
            Câu này <b>{q.ok ? "đúng" : "sai"}</b>. <Jp t={q.explain} vi />
          </span>
          {q.fix && (
            <span className="text-[15px] leading-[2]">
              <span className="font-semibold text-ok-ink">Sửa: </span>
              <Jp t={q.fix} />
            </span>
          )}
        </Explain>
      )}
    </>
  );
}

/* ── Sắp xếp câu (文の組み立て) ───────────────────────────── */
function Order({
  q,
  seed,
  onResult,
}: {
  q: Extract<N1Question, { type: "order" }>;
  seed: string;
  onResult: (ok: boolean) => void;
}) {
  const shuffled = useMemo(() => seededShuffle(q.pieces.map((_, i) => i), seed), [q.pieces, seed]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const full = chosen.length === q.pieces.length;

  const check = () => {
    const ok = chosen.every((p, i) => p === i);
    setChecked(ok);
    onResult(ok);
  };

  return (
    <>
      <p className="text-sm text-ink-3">Chạm các mảnh theo đúng thứ tự. Mảnh nào nằm ở ô ★?</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 rounded-xl bg-surface-2 px-4 py-3 text-[17px] leading-[2.1] text-ink">
        <Jp t={q.before} />
        {q.pieces.map((_, slot) => {
          const pi = chosen[slot];
          const isStar = slot === q.star;
          return (
            <button
              key={slot}
              type="button"
              disabled={checked !== null || pi === undefined}
              onClick={() => setChosen((c) => c.filter((_, j) => j !== slot))}
              className={cn(
                "relative flex min-h-10 min-w-16 items-center justify-center rounded-lg border-b-2 px-2 pt-1",
                pi === undefined ? "border-ink-3/50" : "border-brand bg-surface",
                checked !== null && (chosen[slot] === slot ? "border-ok" : "border-brand")
              )}
              aria-label={pi === undefined ? `Ô ${slot + 1}${isStar ? " (★)" : ""}` : `Bỏ mảnh ở ô ${slot + 1}`}
            >
              {isStar && <span className="absolute -top-2.5 right-0.5 text-xs text-brand">★</span>}
              {pi !== undefined && <Jp t={q.pieces[pi]} />}
            </button>
          );
        })}
        <Jp t={q.after} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {shuffled.map((pi) => {
          const used = chosen.includes(pi);
          return (
            <button
              key={pi}
              type="button"
              disabled={used || checked !== null}
              onClick={() => setChosen((c) => [...c, pi])}
              className={cn(
                "rounded-xl border border-line-strong bg-surface px-3.5 py-1.5 text-[16px] leading-[2] transition-all hover:border-brand",
                used && "invisible"
              )}
            >
              <Jp t={q.pieces[pi]} />
            </button>
          );
        })}
      </div>

      {checked === null && (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            disabled={!full}
            onClick={check}
            className="flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-40"
          >
            <CheckCheck className="h-4 w-4" aria-hidden /> Kiểm tra
          </button>
          {chosen.length > 0 && (
            <button
              type="button"
              onClick={() => setChosen([])}
              className="flex h-10 items-center gap-2 rounded-xl border border-line-strong px-4 text-sm font-semibold text-ink-2 hover:bg-surface-2"
            >
              <Undo2 className="h-4 w-4" aria-hidden /> Xếp lại
            </button>
          )}
        </div>
      )}

      {checked !== null && (
        <Explain ok={checked}>
          <span className="text-[15px] leading-[2.1]">
            <Jp t={q.before} />
            {q.pieces.map((p, i) => (
              <span key={i} className={i === q.star ? "rounded bg-brand-soft px-0.5 font-bold text-brand-soft-ink" : ""}>
                <Jp t={p} />
              </span>
            ))}
            <Jp t={q.after} />
          </span>
          <span>
            ★ = <Jp t={q.pieces[q.star]} className="font-bold" /> · {q.vi}
          </span>
          <Jp t={q.explain} vi />
        </Explain>
      )}
    </>
  );
}

/* ── Nối mẫu – nghĩa ─────────────────────────────────────── */
function Match({
  q,
  seed,
  onResult,
}: {
  q: Extract<N1Question, { type: "match" }>;
  seed: string;
  onResult: (ok: boolean) => void;
}) {
  const right = useMemo(() => seededShuffle(q.pairs.map((_, i) => i), seed), [q.pairs, seed]);
  const [sel, setSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const done = matched.length === q.pairs.length;

  const pickRight = (ri: number) => {
    if (sel === null || matched.includes(ri)) return;
    if (ri === sel) {
      const next = [...matched, ri];
      setMatched(next);
      setSel(null);
      if (next.length === q.pairs.length) onResult(mistakes === 0);
    } else {
      setMistakes((m) => m + 1);
      setWrong(ri);
      setTimeout(() => setWrong(null), 600);
    }
  };

  return (
    <>
      {q.q && <p className="text-sm text-ink-3">{q.q} — chọn một mẫu bên trái, rồi chọn nghĩa bên phải.</p>}
      <div className="mt-3 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2 sm:gap-3">
        <div className="flex flex-col gap-2">
          {q.pairs.map(([l], i) => (
            <button
              key={i}
              type="button"
              disabled={matched.includes(i)}
              onClick={() => setSel(i)}
              className={cn(
                "min-h-12 rounded-xl border px-3 py-2 text-left text-[15px] leading-[1.9] transition-colors",
                matched.includes(i)
                  ? "border-ok bg-ok-soft text-ok-ink"
                  : sel === i
                    ? "border-brand bg-brand-soft"
                    : "border-line-strong hover:border-brand"
              )}
            >
              <Jp t={l} />
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {right.map((ri) => (
            <button
              key={ri}
              type="button"
              disabled={matched.includes(ri) || sel === null}
              onClick={() => pickRight(ri)}
              className={cn(
                "min-h-12 rounded-xl border px-3 py-2 text-left text-[13.5px] leading-snug transition-colors",
                matched.includes(ri)
                  ? "border-ok bg-ok-soft text-ok-ink"
                  : wrong === ri
                    ? "border-brand bg-brand-soft"
                    : sel !== null
                      ? "border-line-strong hover:border-brand"
                      : "border-line text-ink-2"
              )}
            >
              <Jp t={q.pairs[ri][1]} vi />
            </button>
          ))}
        </div>
      </div>
      {done && (
        <Explain ok={mistakes === 0}>
          <span>{mistakes === 0 ? "Nối đúng tất cả ngay lần đầu." : `Hoàn thành với ${mistakes} lần nối nhầm.`}</span>
          {q.explain && <Jp t={q.explain} vi />}
        </Explain>
      )}
    </>
  );
}

/** Xáo trộn cố định theo seed — giống nhau giữa server và client, không lệch khi hydrate. */
function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const rand = () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Tránh trường hợp xáo xong vẫn y nguyên thứ tự đúng
  if (out.length > 1 && out.every((v, i) => v === arr[i])) out.push(out.shift()!);
  return out;
}
