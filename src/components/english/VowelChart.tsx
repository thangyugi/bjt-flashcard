import type { VowelPos } from "@/data/english/ipa/types";

/** 12 nguyên âm đơn tiếng Anh trên hình thang nguyên âm (vị trí lưỡi trong miệng). */
export const VOWEL_POS: Record<string, VowelPos> = {
  "iː": { x: 0.04, y: 0.02, round: false },
  "ɪ": { x: 0.18, y: 0.16, round: false },
  e: { x: 0.12, y: 0.45, round: false },
  "æ": { x: 0.12, y: 0.85, round: false },
  "ʌ": { x: 0.62, y: 0.72, round: false },
  "ɑː": { x: 0.78, y: 0.97, round: false },
  "ɒ": { x: 0.99, y: 0.84, round: true },
  "ɔː": { x: 0.96, y: 0.52, round: true },
  "ʊ": { x: 0.8, y: 0.16, round: true },
  "uː": { x: 0.96, y: 0.02, round: true },
  "ə": { x: 0.48, y: 0.6, round: false },
  "ɜː": { x: 0.52, y: 0.36, round: false },
};

const W = 320;
const H = 230;
const PAD = 34;

/** Chuyển (x, y) 0..1 sang toạ độ trong hình thang: cạnh dưới ngắn hơn cạnh trên. */
function point(x: number, y: number) {
  const top = { l: PAD, r: W - PAD };
  const bottom = { l: PAD + 90, r: W - PAD };
  const l = top.l + (bottom.l - top.l) * y;
  const r = top.r + (bottom.r - top.r) * y;
  return { cx: l + (r - l) * x, cy: PAD + (H - PAD * 2) * y };
}

export function VowelChart({ highlight = [], className }: { highlight?: string[]; className?: string }) {
  const tl = point(0, 0);
  const tr = point(1, 0);
  const br = point(1, 1);
  const bl = point(0, 1);
  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Biểu đồ vị trí lưỡi của 12 nguyên âm đơn">
        <polygon
          points={`${tl.cx},${tl.cy} ${tr.cx},${tr.cy} ${br.cx},${br.cy} ${bl.cx},${bl.cy}`}
          className="fill-surface-2 stroke-line-strong"
          strokeWidth={1.5}
        />
        <text x={tl.cx} y={14} className="fill-ink-3 text-[10px]">Trước</text>
        <text x={tr.cx - 22} y={14} className="fill-ink-3 text-[10px]">Sau</text>
        <text x={4} y={tl.cy + 4} className="fill-ink-3 text-[10px]">Cao</text>
        <text x={4} y={bl.cy} className="fill-ink-3 text-[10px]">Thấp</text>
        {Object.entries(VOWEL_POS).map(([sym, p]) => {
          const { cx, cy } = point(p.x, p.y);
          const on = highlight.includes(sym);
          return (
            <g key={sym}>
              <circle cx={cx} cy={cy} r={on ? 17 : 13} className={on ? "fill-[#1d4ed8]" : p.round ? "fill-[#fde7c9]" : "fill-surface"} stroke={on ? "none" : "#c9c2b8"} />
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                className={`font-ipa ${on ? "fill-white text-[15px] font-bold" : "fill-ink text-[13px]"}`}
              >
                {sym}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 text-center text-[12px] text-ink-3">
        Vị trí lưỡi khi đọc — trái = lưỡi đưa ra trước, trên = lưỡi nâng cao (miệng khép).{" "}
        <span className="rounded bg-[#fde7c9] px-1">nền cam</span> = tròn môi.
      </figcaption>
    </figure>
  );
}
