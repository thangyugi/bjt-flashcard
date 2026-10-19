import type { CSSProperties, ReactNode } from "react";
import { INK, INK2, PAPER, type AnnEl, type Shape } from "./kit";

/** Các mẫu gạch bóng dùng chung (id = `${prefix}-${tên}`) */
export function Hatches({ prefix }: { prefix: string }) {
  const list: [string, number, number, number, number, string?][] = [
    ["h45", 45, 4.2, 0.55, 0.55],
    ["h60", -30, 4.6, 0.5, 0.45],
    ["hv", 0, 3.4, 0.45, 0.35],
    ["hh", 90, 3.6, 0.45, 0.4],
    ["hd", 45, 2.6, 0.6, 0.7],
    ["hw", 90, 5, 0.5, 0.35, INK2],
  ];
  return (
    <>
      {list.map(([id, rot, gap, w, op, col]) => (
        <pattern key={id} id={`${prefix}-${id}`} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${rot})`}>
          <line x1={0} y1={0} x2={0} y2={gap} stroke={col ?? INK} strokeWidth={w} strokeOpacity={op} />
        </pattern>
      ))}
    </>
  );
}

/**
 * Mặt nạ để lộ lớp tô màu từ trên xuống: rect "a" (phần đã lộ) + rect "b" (mép mờ 60px).
 * Bộ điều khiển phía client đổi height/y qua data-mask="a" | "b".
 */
export function RevealMask({ id, w, h }: { id: string; w: number; h: number }) {
  return (
    <>
      <linearGradient id={`${id}-g`} x1={0} y1={0} x2={0} y2={1}>
        <stop offset={0} stopColor="#fff" />
        <stop offset={1} stopColor="#000" />
      </linearGradient>
      <mask id={id} maskUnits="userSpaceOnUse" x={-60} y={-60} width={w + 120} height={h + 120}>
        <rect data-mask="a" x={-60} y={-60} width={w + 120} height={0} fill="#fff" />
        <rect data-mask="b" x={-60} y={-60} width={w + 120} height={60} fill={`url(#${id}-g)`} />
      </mask>
    </>
  );
}

/** Đặt mép dưới của phần đã lộ ở toạ độ h */
export function setMask(svg: SVGSVGElement, h: number) {
  svg.querySelector('[data-mask="a"]')?.setAttribute("height", String(Math.max(0, h + 60)));
  svg.querySelector('[data-mask="b"]')?.setAttribute("y", String(h));
}

const swStyle = (sw: number, extra?: CSSProperties) => ({ "--sw": sw, ...extra }) as CSSProperties;

function clsOf(s: Shape) {
  const c = [s.step ? `s${s.step}` : "", s.cls ?? ""].filter(Boolean).join(" ");
  return c || undefined;
}

function layerA(s: Shape, key: number) {
  if (s.bOnly) return null;
  const st = s.stroke ?? INK;
  const sw = s.sw ?? 1.1;
  const drawable = !s.dash && !s.noStroke;
  return (
    <path
      key={key}
      d={s.d}
      fill={s.open ? "none" : (s.fillA ?? PAPER)}
      stroke={s.noStroke ? "none" : st}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={s.dash}
      pathLength={drawable ? 1 : undefined}
      className={clsOf(s)}
      data-ph={s.ph ?? "x"}
      data-draw={drawable ? "" : undefined}
      style={swStyle(sw, drawable ? { strokeDasharray: "1 1" } : undefined)}
    />
  );
}

function layerB(s: Shape, key: number, prefix: string) {
  if (s.aOnly) return null;
  const cls = clsOf(s);
  const out: ReactNode[] = [];
  if (!s.open && s.tone) out.push(<path key={`${key}t`} d={s.d} fill={s.tone} fillOpacity={s.op ?? 1} stroke="none" className={cls} />);
  if (!s.open && s.hatch) out.push(<path key={`${key}h`} d={s.d} fill={`url(#${prefix}-${s.hatch})`} stroke="none" className={cls} />);
  if (!s.noStroke && !s.bOnly)
    out.push(
      <path
        key={`${key}s`}
        d={s.d}
        fill="none"
        stroke={s.strokeB ?? s.stroke ?? INK}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={s.dash}
        className={cls}
        style={swStyle(s.sw ?? 1.1)}
      />
    );
  return out;
}

/** Gom các hình liên tiếp cùng nhóm "g" vào một <g data-g> */
function grouped(shapes: Shape[], render: (s: Shape, i: number) => ReactNode, layer: string) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < shapes.length) {
    const g = shapes[i].g;
    if (!g) {
      out.push(render(shapes[i], i));
      i++;
      continue;
    }
    const start = i;
    const kids: ReactNode[] = [];
    while (i < shapes.length && shapes[i].g === g) {
      kids.push(render(shapes[i], i));
      i++;
    }
    out.push(
      <g key={`${layer}g${start}`} data-g={g}>
        {kids}
      </g>
    );
  }
  return out;
}

/**
 * Bản vẽ hai lớp: A = nét mực (luôn thấy), B = bản tô màu lộ dần qua mặt nạ.
 * `beforeA` chèn một phần tử vào lớp A ngay trước hình thứ `beforeA.index` (ví dụ mặt trời sau núi Phú Sĩ).
 */
export function Layers({ shapes, prefix, maskId, beforeA }: { shapes: Shape[]; prefix: string; maskId: string; beforeA?: { index: number; node: ReactNode } }) {
  const a = grouped(shapes, layerA, "a");
  if (beforeA) a.splice(beforeA.index, 0, beforeA.node);
  return (
    <>
      <g className="lyA">{a}</g>
      <g className="lyB" mask={`url(#${maskId})`}>
        {grouped(shapes, (s, i) => layerB(s, i, prefix), "b")}
      </g>
    </>
  );
}

/** Ghi chú (chấm, đường dẫn, chữ) */
export function Ann({ els }: { els: AnnEl[] }) {
  return (
    <>
      {els.map((e, i) =>
        e.k === "c" ? (
          <circle key={i} cx={e.cx} cy={e.cy} r={e.r} />
        ) : e.k === "p" ? (
          <path key={i} d={e.d} />
        ) : (
          <text key={i} x={e.x} y={e.y} className={e.j ? "j" : undefined} textAnchor={e.anchor ?? "start"} lang={e.j ? "ja" : undefined}>
            {e.text}
          </text>
        )
      )}
    </>
  );
}
