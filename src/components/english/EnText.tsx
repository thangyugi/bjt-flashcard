import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Câu tiếng Anh: [[…]] = từ chứa âm đang học → tô đậm. */
export function EnText({ t, className, plain }: { t: string; className?: string; plain?: boolean }) {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of t.matchAll(/\[\[(.+?)\]\]/g)) {
    if (m.index > last) out.push(t.slice(last, m.index));
    out.push(
      plain ? (
        <span key={k++}>{m[1]}</span>
      ) : (
        <mark key={k++} className="rounded bg-[#dbe7ff] px-0.5 font-semibold text-[#1e3a8a]">
          {m[1]}
        </mark>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < t.length) out.push(t.slice(last));
  return <span className={className}>{out}</span>;
}

/** Phiên âm IPA: /…/ dùng phông có đủ ký hiệu IPA. */
export function Ipa({ ipa, className, bare }: { ipa: string; className?: string; bare?: boolean }) {
  return <span className={cn("font-ipa tracking-[0.02em]", className)}>{bare ? ipa : `/${ipa}/`}</span>;
}
