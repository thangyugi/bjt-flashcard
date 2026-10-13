import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// {漢字|かんじ} = furigana, [[…]] = mẫu ngữ pháp được tô đậm, ＿＿＿ = chỗ trống
const TOKEN = /\{([^|}]+)\|([^}]+)\}|\[\[|\]\]|(＿{2,}|★)/g;

interface JpProps {
  /** Chuỗi đã gắn furigana (xem withFurigana) */
  t: string;
  className?: string;
  /** Không tô đậm phần [[…]] (ví dụ khi đang ẩn đáp án) */
  plain?: boolean;
  /** Chuỗi tiếng Việt có xen tiếng Nhật: không đổi phông (mặc định tự nhận biết) */
  vi?: boolean;
}

/** Hiển thị tiếng Nhật: cách đọc nhỏ trên mọi kanji, tô đậm mẫu ngữ pháp. */
export function Jp({ t, className, plain, vi }: JpProps) {
  const out: ReactNode[] = [];
  let buf: ReactNode[] = [];
  let inMark = false;
  let last = 0;
  let k = 0;

  const flushText = (s: string) => s && buf.push(s);
  const closeMark = () => {
    if (!buf.length) return;
    out.push(
      plain ? (
        <span key={k++}>{buf}</span>
      ) : (
        <mark key={k++} className="n1-mark">
          {buf}
        </mark>
      )
    );
    buf = [];
  };

  for (const m of t.matchAll(TOKEN)) {
    flushText(t.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1]) {
      buf.push(
        <ruby key={k++}>
          {m[1]}
          <rp>(</rp>
          <rt>{m[2]}</rt>
          <rp>)</rp>
        </ruby>
      );
    } else if (m[3]) {
      buf.push(
        <span key={k++} className={m[3] === "★" ? "n1-star" : "n1-blank"} aria-label={m[3] === "★" ? "ô ★" : "chỗ trống"}>
          {m[3] === "★" ? "★" : ""}
        </span>
      );
    } else if (m[0] === "[[") {
      out.push(...buf);
      buf = [];
      inMark = true;
    } else if (inMark) {
      closeMark();
      inMark = false;
    }
  }
  flushText(t.slice(last));
  if (inMark) closeMark();
  else out.push(...buf);

  const viText = vi ?? /[A-Za-zÀ-ỹ]{3,}/.test(t);
  return <span className={cn(!viText && "font-jp", className)}>{out}</span>;
}
