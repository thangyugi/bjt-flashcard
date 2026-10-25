"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleCheck, CircleX, Clock, Flag, RotateCcw, Send, Trophy, X } from "lucide-react";
import type { BankQuestion } from "@/data/ccar-p/types";
import { CCAR_BASE, DOMAIN_SHORT } from "@/data/ccar-p/meta";
import { optionOrder, seededShuffle } from "@/data/ccar-p/shuffle";
import { useCcarStore } from "@/store/ccar-p-store";
import { Breadcrumbs } from "@/components/ui/page";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

/* ═════════════════════════ Ngân hàng đề (tải một lần) ═════════════════════════ */

let bankCache: Promise<BankQuestion[]> | null = null;
export function loadBank(): Promise<BankQuestion[]> {
  bankCache ??= fetch(`${CCAR_BASE}/practice/bank.json`)
    .then((r) => {
      if (!r.ok) throw new Error(`bank.json: HTTP ${r.status}`);
      return r.json() as Promise<BankQuestion[]>;
    })
    .catch((e) => {
      bankCache = null;
      throw e;
    });
  return bankCache;
}

export function useBank() {
  const [bank, setBank] = useState<BankQuestion[] | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let live = true;
    loadBank()
      .then((b) => live && setBank(b))
      .catch(() => live && setError(true));
    return () => {
      live = false;
    };
  }, []);
  return { bank, error };
}

/* ═════════════════════════ Trả lời + chấm ═════════════════════════ */

/** mcq: khóa gốc đã chọn · bảng: số dòng → khóa gốc */
type Resp = { picks: string[] } | { rows: Record<string, string> };
type Lang = "vi" | "en";

const need = (q: BankQuestion) => (q.type === "mcq" ? q.answer.length : 0);

function complete(q: BankQuestion, r: Resp | undefined): boolean {
  if (!r) return false;
  if (q.type === "mcq") return "picks" in r && r.picks.length === q.answer.length;
  return "rows" in r && q.rows.every((x) => r.rows[String(x.no)]);
}

function correct(q: BankQuestion, r: Resp | undefined): boolean {
  if (!r) return false;
  if (q.type === "mcq") return "picks" in r && r.picks.length === q.answer.length && q.answer.every((k) => r.picks.includes(k));
  return "rows" in r && q.rows.every((x) => r.rows[String(x.no)] === q.rowsAnswer[String(x.no)]);
}

/* ═════════════════════════ Định dạng chữ ═════════════════════════ */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Markdown nhẹ: `mã`, **đậm**, *nghiêng*; ⟦B⟧ → chữ cái hiển thị của phương án gốc B */
function md(src: string, letter?: (k: string) => string): string {
  const codes: string[] = [];
  let s = src.replace(/⟦([A-H])⟧/g, (_, k: string) => (letter ? letter(k) : k));
  s = s.replace(/`([^`]+)`/g, (_, c: string) => {
    codes.push(c);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/(^|[^\w*])\*([^*\n]+)\*(?!\w)/g, "$1<em>$2</em>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => `<code>${esc(codes[Number(i)])}</code>`);
}

function Md({ text, letter, as: Tag = "span", className }: { text: string; letter?: (k: string) => string; as?: "span" | "p"; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: md(text, letter) }} />;
}

const CONF_VI = { high: "cao", medium: "trung bình", low: "thấp" } as const;

/* ═════════════════════════ Một câu hỏi ═════════════════════════ */

function QuestionCard({
  q,
  index,
  total,
  lang,
  resp,
  reveal,
  onChange,
  onCheck,
  flagged,
  onFlag,
}: {
  q: BankQuestion;
  index: number;
  total: number;
  lang: Lang;
  resp: Resp | undefined;
  reveal: boolean;
  onChange?: (r: Resp, autoCheck?: boolean) => void;
  onCheck?: () => void;
  flagged?: boolean;
  onFlag?: () => void;
}) {
  const vi = lang === "vi";
  const opts = vi ? q.optionsVi : q.options;
  const order = useMemo(() => (q.type === "mcq" ? optionOrder(q.id, Object.keys(q.options)) : Object.keys(q.options)), [q]);
  const letter = (k: string) => LETTERS[order.indexOf(k)] ?? k;
  const n = need(q);
  const picks = resp && "picks" in resp ? resp.picks : [];
  const rows = resp && "rows" in resp ? resp.rows : {};
  const ok = correct(q, resp);
  const canEdit = !reveal && !!onChange;

  const pick = (k: string) => {
    if (!canEdit || q.type !== "mcq") return;
    if (n === 1) return onChange!({ picks: [k] }, true);
    if (picks.includes(k)) onChange!({ picks: picks.filter((x) => x !== k) });
    else if (picks.length < n) onChange!({ picks: [...picks, k] });
  };
  const setRow = (no: number, k: string) => canEdit && onChange!({ rows: { ...rows, [String(no)]: k } });

  return (
    <div className="oci-q oci-pq">
      <div className="oci-pq-top">
        <span className="oci-q-num">
          Câu {index + 1}/{total} · {q.task.replace("-", ".")} · {DOMAIN_SHORT[q.domain]}
        </span>
        {onFlag && (
          <button className={`oci-flag${flagged ? " on" : ""}`} onClick={onFlag} aria-pressed={flagged}>
            <Flag aria-hidden /> {flagged ? "Đã đánh dấu" : "Đánh dấu xem lại"}
          </button>
        )}
      </div>
      <Md as="p" className="oci-q-text ccar-stem" text={vi ? q.vi : q.en} />
      {q.type === "mcq" && n > 1 && (
        <span className="ccar-need">
          Chọn {n}
          {!reveal && ` · đã chọn ${picks.length}/${n}`}
        </span>
      )}

      {q.type === "mcq" ? (
        <div className="oci-opts">
          {order.map((k, i) => {
            const isPicked = picks.includes(k);
            const isAns = q.answer.includes(k);
            let cls = `oci-opt${n > 1 ? " ccar-check" : ""}`;
            if (reveal) cls += isAns ? " is-correct" : isPicked ? " is-wrong" : " is-muted";
            else if (isPicked) cls += " picked";
            return (
              <button key={k} type="button" className={cls} disabled={!canEdit} aria-pressed={isPicked} onClick={() => pick(k)}>
                <span className="oci-opt-row">
                  <span className="oci-opt-key" aria-hidden>
                    {reveal && isAns ? <Check strokeWidth={3} /> : reveal && isPicked ? <X strokeWidth={3} /> : LETTERS[i]}
                  </span>
                  <Md className="oci-opt-text" text={opts[k] ?? q.options[k]} />
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="ccar-grid">
          {q.rows.map((r) => {
            const chosen = rows[String(r.no)];
            const ans = q.rowsAnswer[String(r.no)];
            const cls = reveal ? (chosen === ans ? " ok" : " bad") : "";
            const why = q.rowsWhy[String(r.no)];
            return (
              <div key={r.no} className={`ccar-row${cls}`}>
                <span className="txt">
                  <b>{r.no}.</b>
                  <Md text={vi ? r.vi : r.en} />
                </span>
                {q.type === "matrix" ? (
                  <span className="pick" role="radiogroup" aria-label={`Dòng ${r.no}`}>
                    {Object.keys(q.options).map((k) => (
                      <button key={k} type="button" aria-pressed={chosen === k} disabled={!canEdit} onClick={() => setRow(r.no, k)}>
                        {opts[k] ?? q.options[k]}
                      </button>
                    ))}
                  </span>
                ) : (
                  <select value={chosen ?? ""} disabled={!canEdit} onChange={(e) => setRow(r.no, e.target.value)} aria-label={`Dòng ${r.no}`}>
                    <option value="" disabled>
                      — Chọn —
                    </option>
                    {Object.keys(q.options).map((k) => (
                      <option key={k} value={k}>
                        {opts[k] ?? q.options[k]}
                      </option>
                    ))}
                  </select>
                )}
                {reveal && (
                  <span className="why">
                    <b>
                      {chosen === ans ? "✓" : "✗"} Đáp án: {opts[ans] ?? q.options[ans]}.
                    </b>{" "}
                    {why && <Md text={why} />}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!reveal && onCheck && (n !== 1 || q.type !== "mcq") && (
        <div className="oci-quiz-actions" style={{ marginTop: 14 }}>
          <button className="oci-btn primary sm" disabled={!complete(q, resp)} onClick={onCheck}>
            <Check aria-hidden /> Kiểm tra
          </button>
        </div>
      )}

      {reveal && (
        <>
          <div className={`ccar-verdict ${ok ? "ok" : "bad"}`}>
            {ok ? <CircleCheck aria-hidden /> : <CircleX aria-hidden />}
            {ok ? "Chính xác" : resp ? "Chưa đúng" : "Chưa trả lời"}
            {q.type === "mcq" && (
              <span>
                · Đáp án: {q.answer.map(letter).sort().join(", ")}
              </span>
            )}
          </div>
          <Explain q={q} letter={letter} order={order} />
        </>
      )}
    </div>
  );
}

function Explain({ q, letter, order }: { q: BankQuestion; letter: (k: string) => string; order: string[] }) {
  const wrong = q.type === "mcq" ? order.filter((k) => !q.answer.includes(k) && q.wrong[k]) : [];
  return (
    <div className="ccar-explain">
      {q.remember && (
        <div className="remember">
          <h4>✅ Kiến thức cần nhớ</h4>
          <Md as="p" text={q.remember} letter={letter} />
        </div>
      )}
      {q.why && (
        <div>
          <h4>💡 Vì sao chọn {q.type === "mcq" ? (q.answer.length > 1 ? "các ô này" : "ô này") : "như vậy"}</h4>
          <Md as="p" text={q.why} letter={letter} />
        </div>
      )}
      {wrong.length > 0 && (
        <div>
          <h4>❌ Các ô kia sai ở đâu</h4>
          <ul>
            {wrong.map((k) => (
              <li key={k}>
                <span className="k">{letter(k)}</span>
                <Md text={(q.type === "mcq" && q.wrong[k]) || ""} letter={letter} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="ccar-notice">
        <span>Đáp án và giải thích do Claude soạn, chưa đối chiếu đáp án chính thức.</span>
        {q.confidence !== "high" && <span className={`ccar-conf${q.confidence === "low" ? " low" : ""}`}>Độ tin cậy: {CONF_VI[q.confidence]}</span>}
      </p>
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <span className="ccar-lang" role="group" aria-label="Ngôn ngữ đề">
      <button aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>
        Tiếng Việt
      </button>
      <button aria-pressed={lang === "en"} onClick={() => setLang("en")} title="Đề gốc tiếng Anh">
        English
      </button>
    </span>
  );
}

/* ═════════════════════════ Khung chung ═════════════════════════ */

export interface RunnerProps {
  /** Khóa lưu điểm: "domain:3", "task:3-1", "v2", "mix", "exam:exam-1" */
  storeKey: string;
  title: string;
  subtitle?: string;
  mode: "practice" | "exam";
  ids: number[];
  minutes?: number;
  passPct?: number;
  backHref: string;
  backLabel: string;
}

export function CcarRunner(props: RunnerProps) {
  const { bank, error } = useBank();
  const [attempt, setAttempt] = useState(0);
  const [subset, setSubset] = useState<number[] | null>(null);
  const qs = useMemo(() => {
    if (!bank) return [];
    const byId = new Map(bank.map((q) => [q.id, q]));
    const base = (subset ?? props.ids).map((id) => byId.get(id)).filter((q): q is BankQuestion => !!q);
    // Thi thử: giữ thứ tự cố định của đề; luyện tập: xáo theo lượt làm
    return props.mode === "exam" ? base : seededShuffle(base, `${props.storeKey}#${attempt}`);
  }, [bank, subset, props.ids, props.mode, props.storeKey, attempt]);

  const restart = (ids: number[] | null) => {
    setSubset(ids);
    setAttempt((a) => a + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!bank)
    return (
      <div className="oci-practice">
        <Header {...props} />
        {error ? <p>Không tải được ngân hàng câu hỏi. Kiểm tra kết nối rồi tải lại trang.</p> : <div className="oci-skel" style={{ height: 260 }} />}
      </div>
    );
  if (!qs.length)
    return (
      <div className="oci-practice">
        <Header {...props} />
        <p>Bộ này chưa có câu hỏi.</p>
      </div>
    );

  return props.mode === "exam" ? (
    <ExamMode key={attempt} {...props} qs={qs} onRestart={() => restart(null)} />
  ) : (
    <PracticeMode key={attempt} {...props} qs={qs} onRestart={restart} />
  );
}

function Header({ title, subtitle, backHref, backLabel }: Pick<RunnerProps, "title" | "subtitle" | "backHref" | "backLabel">) {
  return (
    <header className="oci-lesson-head" style={{ marginTop: 0 }}>
      <Breadcrumbs
        items={[
          { label: "CCAR-P", href: CCAR_BASE },
          ...(backHref !== CCAR_BASE ? [{ label: backLabel, href: backHref }] : []),
          { label: title },
        ]}
      />
      <h1 style={{ marginTop: 12 }}>{title}</h1>
      {subtitle && <p style={{ margin: "10px 0 0", color: "var(--o-text-2)", fontSize: 15, lineHeight: 1.6 }}>{subtitle}</p>}
    </header>
  );
}

/* ═════════════════════════ Luyện tập ═════════════════════════ */

function PracticeMode(props: RunnerProps & { qs: BankQuestion[]; onRestart: (ids: number[] | null) => void }) {
  const { storeKey, qs, backHref, backLabel, passPct = 72, onRestart } = props;
  const [idx, setIdx] = useState(0);
  const [resp, setResp] = useState<Record<number, Resp>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [lang, setLang] = useState<Lang>("vi");
  const [done, setDone] = useState(false);
  const savePractice = useCcarStore((s) => s.savePractice);
  const topRef = useRef<HTMLDivElement>(null);

  const q = qs[idx];
  const answered = qs.filter((x) => checked[x.id]).length;
  const right = qs.filter((x) => checked[x.id] && correct(x, resp[x.id])).length;

  const go = (d: number) => {
    const n = idx + d;
    if (n >= qs.length) return finish();
    if (n >= 0) setIdx(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const finish = () => {
    setDone(true);
    savePractice(storeKey, right, qs.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    const pct = Math.round((right / qs.length) * 100);
    const wrong = qs.filter((x) => !(checked[x.id] && correct(x, resp[x.id])));
    return (
      <div className="oci-practice">
        <Header {...props} />
        <div className={`oci-result ${pct >= passPct ? "pass" : "fail"}`}>
          <span className="big">
            {right}/{qs.length}
          </span>
          <span className="msg">
            <b>{pct}%</b> — {pct >= passPct ? "Tốt! Phần này bạn đã nắm khá chắc." : `Cần ôn thêm (mục tiêu ≥ ${passPct}%).`}{" "}
            {answered < qs.length && `Bỏ qua ${qs.length - answered} câu.`}
          </span>
        </div>
        <div className="oci-quiz-actions" style={{ margin: "16px 0 24px" }}>
          {wrong.length > 0 && (
            <button className="oci-btn primary" onClick={() => onRestart(wrong.map((x) => x.id))}>
              <RotateCcw aria-hidden /> Làm lại {wrong.length} câu sai / bỏ qua
            </button>
          )}
          <button className="oci-btn ghost" onClick={() => onRestart(null)}>
            <RotateCcw aria-hidden /> Làm lại tất cả (xáo trộn)
          </button>
          <Link href={backHref} className="oci-btn ghost">
            <ArrowLeft aria-hidden /> {backLabel}
          </Link>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        {wrong.length > 0 && (
          <>
            <h2 className="oci-pr-h2">Xem lại các câu sai</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {wrong.map((x) => (
                <QuestionCard key={x.id} q={x} index={qs.indexOf(x)} total={qs.length} lang={lang} resp={resp[x.id]} reveal />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="oci-practice run" ref={topRef}>
      <Header {...props} />
      <div className="oci-pr-bar">
        <div className="oci-bar" style={{ flex: 1, minWidth: 120 }}>
          <i style={{ width: `${(answered / qs.length) * 100}%` }} />
        </div>
        <span className="oci-pr-score">
          <b>{right}</b> đúng · {answered}/{qs.length}
        </span>
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <div className="oci-dots" aria-label="Danh sách câu hỏi">
        {qs.map((x, i) => (
          <button
            key={x.id}
            className={`oci-dot${i === idx ? " cur" : ""}${checked[x.id] ? (correct(x, resp[x.id]) ? " ok" : " bad") : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Câu ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <QuestionCard
        key={q.id}
        q={q}
        index={idx}
        total={qs.length}
        lang={lang}
        resp={resp[q.id]}
        reveal={!!checked[q.id]}
        onChange={(r, auto) => {
          setResp((s) => ({ ...s, [q.id]: r }));
          if (auto) setChecked((c) => ({ ...c, [q.id]: true }));
        }}
        onCheck={() => setChecked((c) => ({ ...c, [q.id]: true }))}
      />

      <div className="oci-quiz-actions" style={{ marginTop: 16, justifyContent: "space-between" }}>
        <button className="oci-btn ghost" onClick={() => go(-1)} disabled={idx === 0}>
          <ArrowLeft aria-hidden /> Câu trước
        </button>
        {idx < qs.length - 1 ? (
          <button className="oci-btn primary" onClick={() => go(1)}>
            {checked[q.id] ? "Câu tiếp" : "Bỏ qua"} <ArrowRight aria-hidden />
          </button>
        ) : (
          <button className="oci-btn primary" onClick={finish}>
            <Trophy aria-hidden /> Xem kết quả
          </button>
        )}
      </div>
    </div>
  );
}

/* ═════════════════════════ Thi thử ═════════════════════════ */

function ExamMode(props: RunnerProps & { qs: BankQuestion[]; onRestart: () => void }) {
  const { storeKey, qs, minutes = 120, passPct = 72, backHref, backLabel, onRestart } = props;
  const [started, setStarted] = useState(false);
  const [endAt, setEndAt] = useState(0);
  const [now, setNow] = useState(0);
  const [idx, setIdx] = useState(0);
  const [resp, setResp] = useState<Record<number, Resp>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lang, setLang] = useState<Lang>("vi");
  const savePractice = useCcarStore((s) => s.savePractice);

  const score = qs.filter((x) => correct(x, resp[x.id])).length;
  const left = Math.max(0, endAt - now);

  const submit = () => {
    setSubmitted(true);
    savePractice(storeKey, score, qs.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
    const multi = qs.filter((x) => x.type === "mcq" && x.answer.length > 1).length;
    const grid = qs.filter((x) => x.type !== "mcq").length;
    return (
      <div className="oci-practice">
        <Header {...props} />
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
              <div className="l">điểm đạt*</div>
            </div>
            <div className="oci-stat">
              <div className="n">{multi + grid}</div>
              <div className="l">câu nhiều ý / dạng bảng</div>
            </div>
          </div>
          <ul className="oci-exam-rules">
            <li>Câu hỏi lấy theo tỉ trọng chính thức của 7 domain (17 · 13 · 19 · 16 · 14 · 14 · 7%). Đề cố định: làm lại vẫn là bộ câu này.</li>
            <li>Đề hiện tiếng Việt, bấm “English” để xem đề gốc. Câu nhiều đáp án ghi rõ “Chọn N” — phải chọn đủ và đúng cả N ý mới được điểm.</li>
            <li>Không hiện đáp án trong lúc làm; đánh dấu câu để xem lại. Hết giờ hệ thống tự nộp bài.</li>
            <li>
              *Ngưỡng {passPct}% lấy theo tệp ngân hàng đề của chủ khóa. Đề thật báo điểm quy đổi 100–1000, mốc đạt 720 — không phải phần trăm câu
              đúng.
            </li>
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
    const domains = Array.from(new Set(qs.map((x) => x.domain))).sort((a, b) => a - b);
    return (
      <div className="oci-practice">
        <Header {...props} />
        <div className={`oci-result ${pct >= passPct ? "pass" : "fail"}`}>
          <span className="big">{pct}%</span>
          <span className="msg">
            <b>
              {score}/{qs.length} câu đúng — {pct >= passPct ? "ĐẠT" : "CHƯA ĐẠT"}
            </b>{" "}
            (ngưỡng {passPct}% theo tệp nguồn). {pct >= passPct ? "Thử các đề còn lại để chắc chắn." : "Xem domain yếu bên dưới, đọc lại bài rồi làm lại."}
          </span>
        </div>
        <h2 className="oci-pr-h2">Kết quả theo domain</h2>
        <div className="oci-domain-list">
          {domains.map((d) => {
            const inD = qs.filter((x) => x.domain === d);
            const ok = inD.filter((x) => correct(x, resp[x.id])).length;
            const p = Math.round((ok / inD.length) * 100);
            return (
              <div key={d} className="oci-domain-row">
                <span className="d">
                  {d} · {DOMAIN_SHORT[d]}
                </span>
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
            <RotateCcw aria-hidden /> Làm lại đề
          </button>
          <Link href={backHref} className="oci-btn ghost">
            <ArrowLeft aria-hidden /> {backLabel}
          </Link>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <h2 className="oci-pr-h2">Xem lại toàn bộ đề</h2>
        <div style={{ display: "grid", gap: 14 }}>
          {qs.map((x, i) => (
            <QuestionCard key={x.id} q={x} index={i} total={qs.length} lang={lang} resp={resp[x.id]} reveal />
          ))}
        </div>
      </div>
    );
  }

  const q = qs[idx];
  const answered = qs.filter((x) => complete(x, resp[x.id])).length;
  const mm = Math.floor(left / 60000);
  const ss = Math.floor((left % 60000) / 1000);
  return (
    <div className="oci-practice run">
      <Header {...props} />
      <div className="oci-pr-bar oci-exam-bar">
        <span className={`oci-timer${left < 10 * 60_000 ? " low" : ""}`}>
          <Clock aria-hidden /> {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
        </span>
        <span className="oci-pr-score">
          Đã làm <b>{answered}</b>/{qs.length}
        </span>
        <LangToggle lang={lang} setLang={setLang} />
        <button
          className="oci-btn primary sm"
          onClick={() => {
            const missing = qs.length - answered;
            if (!missing || confirm(`Còn ${missing} câu chưa làm xong. Vẫn nộp bài?`)) submit();
          }}
        >
          <Send aria-hidden /> Nộp bài
        </button>
      </div>
      <div className="oci-dots" aria-label="Danh sách câu hỏi">
        {qs.map((x, i) => (
          <button
            key={x.id}
            className={`oci-dot${i === idx ? " cur" : ""}${complete(x, resp[x.id]) ? " done" : ""}${flags[x.id] ? " flag" : ""}`}
            onClick={() => setIdx(i)}
            aria-label={`Câu ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <QuestionCard
        key={q.id}
        q={q}
        index={idx}
        total={qs.length}
        lang={lang}
        resp={resp[q.id]}
        reveal={false}
        onChange={(r) => setResp((s) => ({ ...s, [q.id]: r }))}
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
