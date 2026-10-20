"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Flag,
  Languages,
  Lightbulb,
  RotateCcw,
  Send,
  Trophy,
  X,
} from "lucide-react";
import type { PracticeQuestion } from "@/data/oci-ai/types";
import { useOciAiStore } from "@/store/oci-ai-store";

const KEYS = ["A", "B", "C", "D", "E", "F"];

/* ── Xáo trộn có seed: cùng seed → cùng thứ tự (an toàn khi render server) ── */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function shuffled<T>(arr: T[], seed: string): T[] {
  let a = hash(seed) || 1;
  const rnd = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface Props {
  /** Khóa lưu điểm, vd. "lesson:m1-l1", "exam:exam-1" */
  storeKey: string;
  title: string;
  subtitle?: string;
  questions: PracticeQuestion[];
  mode: "practice" | "exam";
  minutes?: number;
  passPct?: number;
  backHref: string;
  backLabel: string;
  tips?: string[];
  /** Xáo thứ tự câu hỏi (mặc định có) */
  shuffleQuestions?: boolean;
}

export function PracticeRunner(props: Props) {
  const [attempt, setAttempt] = useState(0);
  const [subset, setSubset] = useState<string[] | null>(null);
  const qs = useMemo(() => {
    const base = subset ? props.questions.filter((x) => subset.includes(x.id)) : props.questions;
    return props.shuffleQuestions === false && attempt === 0 ? base : shuffled(base, `${props.storeKey}#${attempt}`);
  }, [props.questions, props.shuffleQuestions, props.storeKey, attempt, subset]);

  const restart = (ids: string[] | null) => {
    setSubset(ids);
    setAttempt((a) => a + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return props.mode === "exam" ? (
    <ExamMode key={attempt} {...props} qs={qs} attempt={attempt} onRestart={() => restart(null)} />
  ) : (
    <PracticeMode key={attempt} {...props} qs={qs} attempt={attempt} onRestart={restart} />
  );
}

/* ═════════════════════════ Hiển thị một câu hỏi ═════════════════════════ */

function QuestionCard({
  q,
  index,
  total,
  attempt,
  picked,
  reveal,
  onPick,
  showVi,
  flagged,
  onFlag,
}: {
  q: PracticeQuestion;
  index: number;
  total: number;
  attempt: number;
  picked: number | undefined;
  reveal: boolean;
  onPick?: (i: number) => void;
  showVi: boolean;
  flagged?: boolean;
  onFlag?: () => void;
}) {
  const opts = useMemo(() => shuffled(q.opts, `${q.id}@${attempt}`), [q, attempt]);
  return (
    <div className="oci-q oci-pq">
      <div className="oci-pq-top">
        <span className="oci-q-num">
          Câu {index + 1}/{total}
          {q.domain ? ` · ${q.domain}` : ""}
        </span>
        {onFlag && (
          <button className={`oci-flag${flagged ? " on" : ""}`} onClick={onFlag} aria-pressed={flagged}>
            <Flag aria-hidden /> {flagged ? "Đã đánh dấu" : "Đánh dấu xem lại"}
          </button>
        )}
      </div>
      <p className="oci-q-text" style={{ marginBottom: showVi ? 4 : 14 }}>
        {q.q}
      </p>
      {showVi && <p className="oci-pq-vi">{q.vi}</p>}
      <div className="oci-opts">
        {opts.map((o, i) => {
          const isPicked = picked === i;
          let cls = "oci-opt";
          if (reveal) {
            if (o.ok) cls += " is-correct";
            else if (isPicked) cls += " is-wrong";
            else cls += " is-muted";
          } else if (isPicked) cls += " picked";
          return (
            <button key={i} type="button" className={cls} disabled={reveal || !onPick} aria-pressed={isPicked} onClick={() => onPick?.(i)}>
              <span className="oci-opt-row">
                <span className="oci-opt-key" aria-hidden>
                  {reveal && o.ok ? <Check strokeWidth={3} /> : reveal && isPicked ? <X strokeWidth={3} /> : KEYS[i]}
                </span>
                <span className="oci-opt-text">{o.t}</span>
              </span>
              {reveal && (
                <span className="oci-opt-explain" style={{ display: "block" }}>
                  <b>{o.ok ? "Nên chọn: " : "Không chọn: "}</b>
                  {o.n}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {reveal && q.tip && (
        <div className="oci-pq-tip">
          <Lightbulb aria-hidden />
          <span>
            <b>Mẹo nhớ & so sánh: </b>
            {q.tip}
          </span>
        </div>
      )}
    </div>
  );
}

function ViToggle({ showVi, setShowVi }: { showVi: boolean; setShowVi: (v: boolean) => void }) {
  return (
    <button className="oci-btn ghost sm" onClick={() => setShowVi(!showVi)} aria-pressed={showVi}>
      <Languages aria-hidden /> {showVi ? "Ẩn tiếng Việt" : "Hiện tiếng Việt"}
    </button>
  );
}

/* ═════════════════════════ Chế độ luyện tập ═════════════════════════ */

function PracticeMode({
  storeKey,
  title,
  subtitle,
  qs,
  attempt,
  backHref,
  backLabel,
  tips,
  passPct = 80,
  onRestart,
}: Props & { qs: PracticeQuestion[]; attempt: number; onRestart: (ids: string[] | null) => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { pick: number; ok: boolean }>>({});
  const [showVi, setShowVi] = useState(true);
  const [done, setDone] = useState(false);
  const savePractice = useOciAiStore((s) => s.savePractice);
  const topRef = useRef<HTMLDivElement>(null);

  const q = qs[idx];
  const answered = Object.keys(answers).length;
  const correct = Object.values(answers).filter((a) => a.ok).length;
  const optsOf = (x: PracticeQuestion) => shuffled(x.opts, `${x.id}@${attempt}`);

  const pick = (i: number) => {
    if (!q || answers[q.id]) return;
    setAnswers((a) => ({ ...a, [q.id]: { pick: i, ok: !!optsOf(q)[i]?.ok } }));
  };
  const go = (d: number) => {
    const n = idx + d;
    if (n >= qs.length) return finish();
    if (n >= 0) setIdx(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const finish = () => {
    setDone(true);
    savePractice(storeKey, correct, qs.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Phím tắt: A–D / 1–4 chọn đáp án, Enter / → câu tiếp, ← câu trước
  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      const k = e.key.toUpperCase();
      const n = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : KEYS.slice(0, 4).indexOf(k);
      if (n >= 0 && q && n < q.opts.length) {
        e.preventDefault();
        pick(n);
      } else if ((e.key === "Enter" || e.key === "ArrowRight") && q && answers[q.id]) {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (done) {
    const pct = Math.round((correct / qs.length) * 100);
    const wrong = qs.filter((x) => !answers[x.id]?.ok);
    return (
      <div className="oci-practice">
        <PracticeHeader title={title} subtitle={subtitle} backHref={backHref} backLabel={backLabel} />
        <div className={`oci-result ${pct >= passPct ? "pass" : "fail"}`}>
          <span className="big">
            {correct}/{qs.length}
          </span>
          <span className="msg">
            <b>{pct}%</b> — {pct >= passPct ? "Rất tốt! Bạn đã nắm chắc bài này." : `Cần ôn thêm (mục tiêu ≥ ${passPct}%).`}{" "}
            {answered < qs.length && `Bỏ qua ${qs.length - answered} câu.`}
          </span>
        </div>
        <div className="oci-quiz-actions" style={{ margin: "16px 0 24px" }}>
          {wrong.length > 0 && (
            <button className="oci-btn primary" onClick={() => onRestart(wrong.map((x) => x.id))}>
              <RotateCcw aria-hidden /> Làm lại {wrong.length} câu sai
            </button>
          )}
          <button className="oci-btn ghost" onClick={() => onRestart(null)}>
            <RotateCcw aria-hidden /> Làm lại tất cả (xáo trộn)
          </button>
          <Link href={backHref} className="oci-btn ghost">
            <ArrowLeft aria-hidden /> {backLabel.replace(/^←\s*/, "")}
          </Link>
        </div>
        {wrong.length > 0 && (
          <>
            <h2 className="oci-pr-h2">Xem lại các câu sai</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {wrong.map((x) => (
                <QuestionCard
                  key={x.id}
                  q={x}
                  index={qs.indexOf(x)}
                  total={qs.length}
                  attempt={attempt}
                  picked={answers[x.id]?.pick}
                  reveal
                  showVi={showVi}
                />
              ))}
            </div>
          </>
        )}
        {tips && tips.length > 0 && <TipsBox tips={tips} />}
      </div>
    );
  }

  return (
    <div className="oci-practice run" ref={topRef}>
      <PracticeHeader title={title} subtitle={subtitle} backHref={backHref} backLabel={backLabel} />
      <div className="oci-pr-bar">
        <div className="oci-bar" style={{ flex: 1 }}>
          <i style={{ width: `${(answered / qs.length) * 100}%` }} />
        </div>
        <span className="oci-pr-score">
          <b>{correct}</b> đúng · {answered}/{qs.length}
        </span>
        <ViToggle showVi={showVi} setShowVi={setShowVi} />
      </div>
      <div className="oci-dots" aria-label="Danh sách câu hỏi">
        {qs.map((x, i) => {
          const a = answers[x.id];
          return (
            <button
              key={x.id}
              className={`oci-dot${i === idx ? " cur" : ""}${a ? (a.ok ? " ok" : " bad") : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Câu ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {q && (
        <QuestionCard
          q={q}
          index={idx}
          total={qs.length}
          attempt={attempt}
          picked={answers[q.id]?.pick}
          reveal={!!answers[q.id]}
          onPick={pick}
          showVi={showVi}
        />
      )}

      <div className="oci-quiz-actions" style={{ marginTop: 16, justifyContent: "space-between" }}>
        <button className="oci-btn ghost" onClick={() => go(-1)} disabled={idx === 0}>
          <ArrowLeft aria-hidden /> Câu trước
        </button>
        <span style={{ fontSize: 12.5, color: "var(--o-text-3)" }} className="oci-kbd-hint">
          Phím <span className="oci-kbd">A</span>–<span className="oci-kbd">D</span> chọn · <span className="oci-kbd">Enter</span> câu tiếp
        </span>
        {idx < qs.length - 1 ? (
          <button className="oci-btn primary" onClick={() => go(1)}>
            {q && answers[q.id] ? "Câu tiếp" : "Bỏ qua"} <ArrowRight aria-hidden />
          </button>
        ) : (
          <button className="oci-btn primary" onClick={finish}>
            <Trophy aria-hidden /> Xem kết quả
          </button>
        )}
      </div>
      {tips && tips.length > 0 && idx === 0 && !answered && <TipsBox tips={tips} />}
    </div>
  );
}

/* ═════════════════════════ Chế độ thi thử ═════════════════════════ */

function ExamMode({
  storeKey,
  title,
  subtitle,
  qs,
  attempt,
  minutes = 60,
  passPct = 65,
  backHref,
  backLabel,
  onRestart,
}: Props & { qs: PracticeQuestion[]; attempt: number; onRestart: () => void }) {
  const [started, setStarted] = useState(false);
  const [endAt, setEndAt] = useState(0);
  const [now, setNow] = useState(0);
  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showVi, setShowVi] = useState(false);
  const savePractice = useOciAiStore((s) => s.savePractice);

  const optsOf = (x: PracticeQuestion) => shuffled(x.opts, `${x.id}@${attempt}`);
  const score = qs.filter((x) => picks[x.id] !== undefined && optsOf(x)[picks[x.id]]?.ok).length;
  const left = Math.max(0, endAt - now);

  const submit = () => {
    setSubmitted(true);
    savePractice(storeKey, score, qs.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Giữ bản mới nhất của submit để đồng hồ tự nộp bài khi hết giờ
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  });
  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n >= endAt) submitRef.current();
    }, 1000);
    return () => clearInterval(t);
  }, [started, submitted, endAt]);

  if (!started) {
    return (
      <div className="oci-practice">
        <PracticeHeader title={title} subtitle={subtitle} backHref={backHref} backLabel={backLabel} />
        <div className="oci-exam-intro">
          <div className="oci-stats" style={{ marginTop: 0 }}>
            <div className="oci-stat">
              <div className="n">{qs.length}</div>
              <div className="l">câu hỏi</div>
            </div>
            <div className="oci-stat">
              <div className="n">{minutes}′</div>
              <div className="l">thời gian</div>
            </div>
            <div className="oci-stat">
              <div className="n">{passPct}%</div>
              <div className="l">điểm đạt</div>
            </div>
            <div className="oci-stat">
              <div className="n">1</div>
              <div className="l">đáp án / câu</div>
            </div>
          </div>
          <ul className="oci-exam-rules">
            <li>Đề bằng tiếng Anh như bài thi thật; có thể bật bản dịch tiếng Việt khi cần.</li>
            <li>Không hiện đáp án trong lúc làm. Có thể đánh dấu câu để xem lại và nhảy câu bất kỳ.</li>
            <li>Hết giờ hệ thống tự nộp bài. Sau khi nộp: điểm theo từng chủ đề + giải thích từng đáp án.</li>
          </ul>
          <button
            className="oci-btn primary"
            onClick={() => {
              const t = Date.now();
              setNow(t);
              setEndAt(t + minutes * 60_000);
              setStarted(true);
            }}
          >
            <Clock aria-hidden /> Bắt đầu làm bài
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const pct = Math.round((score / qs.length) * 100);
    const domains = Array.from(new Set(qs.map((x) => x.domain ?? "Khác")));
    return (
      <div className="oci-practice">
        <PracticeHeader title={title} subtitle={subtitle} backHref={backHref} backLabel={backLabel} />
        <div className={`oci-result ${pct >= passPct ? "pass" : "fail"}`}>
          <span className="big">{pct}%</span>
          <span className="msg">
            <b>
              {score}/{qs.length} câu đúng — {pct >= passPct ? "ĐẠT" : "CHƯA ĐẠT"}
            </b>{" "}
            (ngưỡng {passPct}%).{" "}
            {pct >= passPct ? "Hãy thử các đề còn lại để chắc chắn." : "Xem lại chủ đề yếu bên dưới rồi làm lại."}
          </span>
        </div>
        <h2 className="oci-pr-h2">Kết quả theo chủ đề</h2>
        <div className="oci-domain-list">
          {domains.map((d) => {
            const inD = qs.filter((x) => (x.domain ?? "Khác") === d);
            const ok = inD.filter((x) => picks[x.id] !== undefined && optsOf(x)[picks[x.id]]?.ok).length;
            const p = Math.round((ok / inD.length) * 100);
            return (
              <div key={d} className="oci-domain-row">
                <span className="d">{d}</span>
                <div className={`oci-bar${p >= passPct ? " good" : ""}`} style={{ flex: 1 }}>
                  <i style={{ width: `${p}%` }} />
                </div>
                <span className="s">
                  {ok}/{inD.length}
                </span>
              </div>
            );
          })}
        </div>
        <div className="oci-quiz-actions" style={{ margin: "18px 0 24px" }}>
          <button className="oci-btn primary" onClick={onRestart}>
            <RotateCcw aria-hidden /> Làm lại đề (xáo trộn)
          </button>
          <Link href={backHref} className="oci-btn ghost">
            <ArrowLeft aria-hidden /> {backLabel.replace(/^←\s*/, "")}
          </Link>
          <ViToggle showVi={showVi} setShowVi={setShowVi} />
        </div>
        <h2 className="oci-pr-h2">Xem lại toàn bộ đề</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {qs.map((x, i) => (
            <QuestionCard key={x.id} q={x} index={i} total={qs.length} attempt={attempt} picked={picks[x.id]} reveal showVi={showVi} />
          ))}
        </div>
      </div>
    );
  }

  const q = qs[idx];
  const answered = Object.keys(picks).length;
  const mm = Math.floor(left / 60000);
  const ss = Math.floor((left % 60000) / 1000);
  return (
    <div className="oci-practice run">
      <PracticeHeader title={title} subtitle={subtitle} backHref={backHref} backLabel={backLabel} />
      <div className="oci-pr-bar oci-exam-bar">
        <span className={`oci-timer${left < 5 * 60_000 ? " low" : ""}`}>
          <Clock aria-hidden /> {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
        </span>
        <span className="oci-pr-score">
          Đã làm <b>{answered}</b>/{qs.length}
        </span>
        <ViToggle showVi={showVi} setShowVi={setShowVi} />
        <button
          className="oci-btn primary sm"
          onClick={() => {
            const missing = qs.length - answered;
            if (!missing || confirm(`Còn ${missing} câu chưa làm. Vẫn nộp bài?`)) submit();
          }}
        >
          <Send aria-hidden /> Nộp bài
        </button>
      </div>
      <div className="oci-dots" aria-label="Danh sách câu hỏi">
        {qs.map((x, i) => (
          <button
            key={x.id}
            className={`oci-dot${i === idx ? " cur" : ""}${picks[x.id] !== undefined ? " done" : ""}${flags[x.id] ? " flag" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Câu ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <QuestionCard
        q={q}
        index={idx}
        total={qs.length}
        attempt={attempt}
        picked={picks[q.id]}
        reveal={false}
        onPick={(i) => setPicks((p) => ({ ...p, [q.id]: i }))}
        showVi={showVi}
        flagged={!!flags[q.id]}
        onFlag={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))}
      />
      <div className="oci-quiz-actions" style={{ marginTop: 16, justifyContent: "space-between" }}>
        <button className="oci-btn ghost" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}>
          <ArrowLeft aria-hidden /> Câu trước
        </button>
        <button className="oci-btn primary" onClick={() => setIdx((i) => Math.min(qs.length - 1, i + 1))} disabled={idx === qs.length - 1}>
          Câu tiếp <ArrowRight aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ═════════════════════════ Phụ trợ ═════════════════════════ */

function PracticeHeader({ title, subtitle, backHref, backLabel }: { title: string; subtitle?: string; backHref: string; backLabel: string }) {
  return (
    <header className="oci-lesson-head" style={{ marginTop: 0 }}>
      <div className="oci-crumb">
        <Link href={backHref}>{backLabel}</Link>
      </div>
      <h1 style={{ marginTop: 12 }}>{title}</h1>
      {subtitle && <p style={{ margin: "10px 0 0", color: "var(--o-text-2)", fontSize: 15, lineHeight: 1.6 }}>{subtitle}</p>}
    </header>
  );
}

function TipsBox({ tips }: { tips: string[] }) {
  return (
    <div className="oci-prose" style={{ marginTop: 24 }}>
      <div className="callout memo">
        <div className="callout-head">
          <Lightbulb aria-hidden /> Mẹo ghi nhớ của bài
        </div>
        <ul>
          {tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
