import type { ReactNode } from "react";

// Định dạng dữ liệu: {漢字|かんじ} — xem scripts/generate_furigana.py
const RUBY_PATTERN = /\{([^|}]+)\|([^}]+)\}/g;

interface FuriganaProps {
  /** Câu đã đánh dấu furigana, VD: {青春|せいしゅん}{時代|じだい}を… */
  markup?: string;
  /** Câu gốc, dùng khi chưa có furigana */
  fallback: string;
  className?: string;
}

export function Furigana({ markup, fallback, className }: FuriganaProps) {
  if (!markup) return <span className={className}>{fallback}</span>;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of markup.matchAll(RUBY_PATTERN)) {
    if (match.index > lastIndex) {
      nodes.push(markup.slice(lastIndex, match.index));
    }
    nodes.push(
      <ruby key={match.index}>
        {match[1]}
        <rp>(</rp>
        <rt>{match[2]}</rt>
        <rp>)</rp>
      </ruby>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < markup.length) nodes.push(markup.slice(lastIndex));

  return <span className={className}>{nodes}</span>;
}
