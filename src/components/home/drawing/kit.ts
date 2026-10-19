/*
 * Bộ công cụ vẽ cho trang chủ: hàm hình học thuần (không DOM, không React) dùng chung cho
 * bản vẽ hero, bản vẽ vùng đất và các hình isometric. Mọi số đều làm tròn 0,1 để chuỗi path gọn.
 */

export const PAPER = "#faf8f5";
export const INK = "#1c1917";
export const INK2 = "#57524d";
export const INK3 = "#736b64";
export const DRAW = "#9b948c";
export const HID = "#c8c1b8";

export type Pt = [number, number];
export type Pt3 = [number, number, number];

export const r1 = (n: number) => Math.round(n * 10) / 10;

/** Đường gấp khúc */
export function dp(pts: Pt[], close?: boolean) {
  return "M" + pts.map((p) => r1(p[0]) + " " + r1(p[1])).join("L") + (close ? "Z" : "");
}

/** Đường cong mượt qua các điểm (bezier bậc hai qua trung điểm) */
export function sm(pts: Pt[], close?: boolean) {
  if (pts.length < 3) return dp(pts, close);
  let d = "M" + r1(pts[0][0]) + " " + r1(pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    const m = [(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2];
    d += "Q" + r1(pts[i][0]) + " " + r1(pts[i][1]) + " " + r1(m[0]) + " " + r1(m[1]);
  }
  const l = pts[pts.length - 1];
  return d + "L" + r1(l[0]) + " " + r1(l[1]) + (close ? "Z" : "");
}

export const circ = (cx: number, cy: number, r: number) =>
  `M${r1(cx - r)} ${r1(cy)}a${r} ${r} 0 1 0 ${r1(2 * r)} 0a${r} ${r} 0 1 0 ${r1(-2 * r)} 0Z`;

export const ell = (cx: number, cy: number, rx: number, ry: number) =>
  `M${r1(cx - rx)} ${r1(cy)}a${rx} ${ry} 0 1 0 ${r1(2 * rx)} 0a${rx} ${ry} 0 1 0 ${r1(-2 * rx)} 0Z`;

/** Số ngẫu nhiên có hạt giống (mulberry32) — cùng hạt giống thì cùng hình */
export function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nét thuôn (cành cây): mỗi điểm [x, y, bề rộng] */
export function taper(sp: [number, number, number][]) {
  const L: Pt[] = [];
  const R: Pt[] = [];
  for (let i = 0; i < sp.length; i++) {
    const a = sp[Math.max(0, i - 1)];
    const b = sp[Math.min(sp.length - 1, i + 1)];
    let tx = b[0] - a[0];
    let ty = b[1] - a[1];
    const l = Math.hypot(tx, ty) || 1;
    tx /= l;
    ty /= l;
    const nx = -ty;
    const ny = tx;
    const w = sp[i][2] / 2;
    L.push([sp[i][0] + nx * w, sp[i][1] + ny * w]);
    R.push([sp[i][0] - nx * w, sp[i][1] - ny * w]);
  }
  return sm(L.concat(R.reverse()), true);
}

/** Hoa năm cánh */
export function flower(cx: number, cy: number, R: number, rot: number) {
  let d = "";
  for (let k = 0; k < 5; k++) {
    const a = rot + (k * Math.PI * 2) / 5;
    const p1 = [cx + Math.cos(a - 0.5) * R * 1.15, cy + Math.sin(a - 0.5) * R * 1.15];
    const p2 = [cx + Math.cos(a + 0.5) * R * 1.15, cy + Math.sin(a + 0.5) * R * 1.15];
    d += `M${r1(cx)} ${r1(cy)}C${r1(p1[0])} ${r1(p1[1])} ${r1(p2[0])} ${r1(p2[1])} ${r1(cx)} ${r1(cy)}Z`;
  }
  return d;
}

/** Một cánh hoa rơi */
export function petal(cx: number, cy: number, R: number, a: number) {
  const p1 = [cx + Math.cos(a - 0.6) * R, cy + Math.sin(a - 0.6) * R];
  const p2 = [cx + Math.cos(a + 0.6) * R, cy + Math.sin(a + 0.6) * R];
  return `M${r1(cx)} ${r1(cy)}C${r1(p1[0])} ${r1(p1[1])} ${r1(p2[0])} ${r1(p2[1])} ${r1(cx)} ${r1(cy)}Z`;
}

/**
 * Một hình trong bản vẽ hai lớp:
 *  - lớp A: nét mực trên giấy (luôn thấy, được "vẽ" bằng stroke-dashoffset)
 *  - lớp B: bản tô màu/gạch bóng, lộ ra dần qua mặt nạ
 */
export interface Shape {
  d: string;
  /** Nhóm (để dịch chuyển cả cụm, ví dụ Lữ khách) */
  g?: string;
  /** Bước của phần vùng đất (2–4) — ẩn cho tới khi cuộn tới */
  step?: number;
  cls?: string;
  stroke?: string;
  strokeB?: string;
  sw?: number;
  /** Đường hở: không tô */
  open?: boolean;
  fillA?: string;
  tone?: string;
  op?: number;
  hatch?: string;
  noStroke?: boolean;
  dash?: string;
  /** Pha vẽ của hero (fuji, pag, torii, bloom) */
  ph?: string;
  aOnly?: boolean;
  bOnly?: boolean;
}

/** Ghi chú trên bản vẽ: chấm, đường dẫn, chữ */
export type AnnEl =
  | { k: "c"; cx: number; cy: number; r: number }
  | { k: "p"; d: string }
  | { k: "t"; x: number; y: number; text: string; j?: boolean; anchor?: "start" | "end" };

export function label(px: number, py: number, lx: number, ly: number, t1: string, t2: string | null, anchor: "start" | "end" = "start", r = 1.6, jp = false): AnnEl[] {
  const dir = anchor === "end" ? -1 : 1;
  const tx = lx + 12 * dir;
  const out: AnnEl[] = [
    { k: "c", cx: px, cy: py, r },
    { k: "p", d: `M${px} ${py}L${lx} ${ly}H${lx + 8 * dir}` },
  ];
  if (jp) {
    out.push({ k: "t", x: tx, y: ly - 3, text: t1, j: true, anchor });
    if (t2) out.push({ k: "t", x: tx, y: ly + 12, text: t2, anchor });
  } else {
    out.push({ k: "t", x: tx, y: ly + 4, text: t1, anchor });
    if (t2) out.push({ k: "t", x: tx, y: ly + 18, text: t2, anchor });
  }
  return out;
}
