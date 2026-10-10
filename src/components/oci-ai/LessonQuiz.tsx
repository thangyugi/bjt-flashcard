"use client";

import { useRef, useState } from "react";
import { Check, RotateCcw, Send, Trophy, X } from "lucide-react";
import type { QuizQuestion } from "@/data/oci-ai/types";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useHydrated } from "@/hooks/useHydrated";

const KEYS = ["A", "B", "C", "D", "E", "F"];

interface Props {
  lessonId: string;
  questions: QuizQuestion[];
  /** Ngưỡng đạt (%) — mặc định 80% như Skill Check của khóa gốc */
  passPct?: number;
}

/** Trắc nghiệm: chọn đáp án cho mọi câu → Nộp bài → hiện giải thích cho từng lựa chọn. */
export function LessonQuiz({ lessonId, questions, passPct = 80 }: Props) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [graded, setGraded] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const saveQuiz = useOciAiStore((s) => s.saveQuiz);
  const markDone = useOciAiStore((s) => s.markDone);
  const last = useOciAiStore((s) => s.quiz[lessonId]);
  const hydrated = useHydrated();

  const answered = picked.filter((p) => p !== null).length;
  const score = picked.reduce<number>((s, p, i) => s + (p !== null && questions[i].options[p].correct ? 1 : 0), 0);
  const pct = Math.round((score / questions.length) * 100);
  const pass = pct >= passPct;

  const submit = () => {
    setGraded(true);
    saveQuiz(lessonId, score, questions.length);
    if (pass) markDone(lessonId);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };
  const retry = () => {
    setPicked(questions.map(() => null));
    setGraded(false);
    requestAnimationFrame(() => firstRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="oci-quiz">
      <div className="oci-quiz-head" ref={firstRef}>
        <span>
          <b>{questions.length} câu hỏi</b> · đạt khi đúng từ {passPct}% trở lên
        </span>
        {hydrated && last && !graded && (
          <span>
            Lần trước: <b>{last.score}/{last.total}</b>
          </span>
        )}
        {!graded && (
          <span>
            Đã chọn <b>{answered}</b>/{questions.length}
          </span>
        )}
      </div>

      {questions.map((q, qi) => (
        <div className="oci-q" key={qi} role="group" aria-labelledby={`${lessonId}-q${qi}`}>
          <div className="oci-q-num">Câu {qi + 1}</div>
          <p className="oci-q-text" id={`${lessonId}-q${qi}`} dangerouslySetInnerHTML={{ __html: stripNumber(q.q) }} />
          <div className="oci-opts">
            {q.options.map((o, oi) => {
              const isPicked = picked[qi] === oi;
              let cls = "oci-opt";
              if (graded) {
                if (o.correct) cls += " is-correct";
                else if (isPicked) cls += " is-wrong";
                else cls += " is-muted";
              } else if (isPicked) cls += " picked";
              return (
                <button
                  key={oi}
                  type="button"
                  className={cls}
                  disabled={graded}
                  aria-pressed={isPicked}
                  onClick={() => setPicked((p) => p.map((v, i) => (i === qi ? oi : v)))}
                >
                  <span className="oci-opt-row">
                    <span className="oci-opt-key" aria-hidden>
                      {graded && o.correct ? <Check strokeWidth={3} /> : graded && isPicked ? <X strokeWidth={3} /> : KEYS[oi]}
                    </span>
                    <span className="oci-opt-text" dangerouslySetInnerHTML={{ __html: o.text }} />
                  </span>
                  {graded && (
                    <span className="oci-opt-explain" style={{ display: "block" }} dangerouslySetInnerHTML={{ __html: o.explain }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {graded && (
        <div ref={resultRef} className={`oci-result ${pass ? "pass" : "fail"}`} role="status">
          <span className="big">
            {score}/{questions.length}
          </span>
          <span className="msg">
            {pass ? (
              <>
                <b>Đạt — {pct}%.</b> Bài này đã được đánh dấu là đã học. Xem lại giải thích bên trên để nhớ lâu hơn.
              </>
            ) : (
              <>
                <b>Chưa đạt — {pct}%</b> (cần ≥ {passPct}%). Đọc giải thích của từng lựa chọn rồi làm lại nhé.
              </>
            )}
          </span>
        </div>
      )}

      <div className="oci-quiz-actions">
        {!graded ? (
          <button className="oci-btn primary" onClick={submit} disabled={answered < questions.length}>
            <Send aria-hidden /> Nộp bài
          </button>
        ) : (
          <button className="oci-btn ghost" onClick={retry}>
            <RotateCcw aria-hidden /> Làm lại
          </button>
        )}
        {!graded && answered < questions.length && (
          <span style={{ fontSize: 13, color: "var(--o-text-3)" }}>
            Còn {questions.length - answered} câu chưa chọn
          </span>
        )}
        {graded && pass && (
          <span className="oci-chip good">
            <Trophy aria-hidden /> Hoàn thành
          </span>
        )}
      </div>
    </div>
  );
}

/** Bỏ tiền tố "Câu 1." trong dữ liệu gốc vì giao diện đã hiển thị số câu riêng. */
function stripNumber(html: string) {
  return html.replace(/^Câu\s*\d+\.\s*/, "");
}
