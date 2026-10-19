/**
 * Tiện ích toán & bộ dựng "đám chấm" cho Thảo nguyên Pha Lê.
 * File này KHÔNG import three — để ảnh thu nhỏ (swatch) trong Sổ tay vẽ được mà không tải three.js.
 */

export type Vec3 = number[];
export type Rand = () => number;

export const TAU = Math.PI * 2;
/** Góc vàng — rải điểm đều trên mặt cầu */
export const GA = Math.PI * (3 - Math.sqrt(5));

/** Bộ sinh số ngẫu nhiên có hạt giống (cùng hạt → cùng thế giới) */
export function mulberry32(a: number): Rand {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const hx = (h: string): Vec3 => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
export const mix = (a: Vec3, b: Vec3, t: number): Vec3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
export const mul = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const sstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
/** Rung nhẹ màu để đám chấm trông tự nhiên */
export const jit = (c: Vec3, r: Rand, amt: number): Vec3 => {
  const k = 1 + (r() - 0.5) * amt;
  return [
    clamp(c[0] * k * (1 + (r() - 0.5) * amt * 0.3), 0, 1.4),
    clamp(c[1] * k * (1 + (r() - 0.5) * amt * 0.3), 0, 1.4),
    clamp(c[2] * k * (1 + (r() - 0.5) * amt * 0.3), 0, 1.4),
  ];
};
export const norm = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sc = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
export function randSphere(r: Rand): Vec3 {
  const z = r() * 2 - 1,
    a = r() * TAU,
    s = Math.sqrt(1 - z * z);
  return [s * Math.cos(a), z, s * Math.sin(a)];
}
export function hsl(h: number, s: number, l: number): Vec3 {
  h = ((h % 1) + 1) % 1;
  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)];
}

/** Hướng về phía mặt trời thấp lúc hoàng hôn (dùng để "nướng" ánh sáng vào màu chấm) */
export const SUN = norm([-0.72, 0.52, -0.08]);
export const WARM: Vec3 = [1.0, 0.56, 0.36];

/* value noise */
export function h2(ix: number, iy: number) {
  let h = (Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + 1013) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return ((h >>> 0) / 4294967295) * 2 - 1;
}
export function noise(x: number, y: number) {
  const ix = Math.floor(x),
    iy = Math.floor(y),
    fx = x - ix,
    fy = y - iy;
  const u = fx * fx * (3 - 2 * fx),
    v = fy * fy * (3 - 2 * fy);
  const a = h2(ix, iy),
    b = h2(ix + 1, iy),
    c = h2(ix, iy + 1),
    d = h2(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/**
 * Bộ dựng đám chấm: mỗi chấm có vị trí, màu, cỡ, ngưỡng mọc (T), độ đung đưa (W), độ phát sáng (G), pha (H).
 * Biến thành BufferGeometry ở engine (pointsGeometry) — ở đây chỉ là mảng số.
 */
export class PB {
  r: Rand;
  P: number[] = [];
  C: number[] = [];
  S: number[] = [];
  T: number[] = [];
  W: number[] = [];
  G: number[] = [];
  H: number[] = [];
  maxY = 0;
  constructor(r: Rand) {
    this.r = r;
  }
  add(x: number, y: number, z: number, c: Vec3, s: number, t = 0, w = 1, g = 0, ph?: number) {
    this.P.push(x, y, z);
    this.C.push(c[0], c[1], c[2]);
    this.S.push(s);
    this.T.push(t);
    this.W.push(w);
    this.G.push(g);
    this.H.push(ph === undefined ? this.r() * TAU : ph);
  }
  get n() {
    return this.T.length;
  }
  /** Xoay quanh trục đứng và "nướng" ánh sáng mặt trời vào màu */
  bake(rot = 0, light = true, amb = 0.66) {
    const c = Math.cos(rot),
      s = Math.sin(rot);
    let maxY = 0;
    for (let i = 0; i < this.n; i++) maxY = Math.max(maxY, this.P[i * 3 + 1]);
    const cy = maxY * 0.5;
    for (let i = 0; i < this.n; i++) {
      const x = this.P[i * 3],
        y = this.P[i * 3 + 1],
        z = this.P[i * 3 + 2];
      const X = x * c + z * s,
        Z = -x * s + z * c;
      this.P[i * 3] = X;
      this.P[i * 3 + 2] = Z;
      if (light && this.G[i] < 0.5) {
        const n = norm([X, (y - cy) * 0.5 + 0.35 * maxY, Z]);
        const l = Math.max(0, dot(n, SUN));
        const k = amb + 0.6 * l,
          wk = 0.08 * l * l;
        this.C[i * 3] = this.C[i * 3] * k + WARM[0] * wk;
        this.C[i * 3 + 1] = this.C[i * 3 + 1] * k + WARM[1] * wk;
        this.C[i * 3 + 2] = this.C[i * 3 + 2] * (k * 0.96 + (1 - l) * 0.06) + WARM[2] * wk;
      }
    }
    this.maxY = maxY;
    return this;
  }
}

type Num = number | ((s: number) => number);
type Col = Vec3 | ((s: number, a: number) => Vec3);

/** Rải chấm quanh một đường cong tham số (thân, cành, rễ) */
export function tube(
  b: PB,
  r: Rand,
  fn: (s: number) => Vec3,
  n: number,
  rad: Num,
  col: Col,
  size: number,
  tf: (s: number) => number,
  glow = 0,
  surface = true
) {
  n = Math.max(4, Math.floor(n));
  for (let i = 0; i < n; i++) {
    const s = r(),
      p = fn(s),
      q = fn(Math.min(1, s + 0.01)),
      p0 = fn(Math.max(0, s - 0.01));
    const t = norm([q[0] - p0[0], q[1] - p0[1], q[2] - p0[2]]);
    const ax: Vec3 = Math.abs(t[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const u = norm(cross(t, ax)),
      v = cross(t, u);
    const a = r() * TAU,
      rr = (typeof rad === "function" ? rad(s) : rad) * (surface ? 1 : Math.sqrt(r()));
    const ca = Math.cos(a) * rr,
      sa = Math.sin(a) * rr;
    b.add(
      p[0] + u[0] * ca + v[0] * sa,
      p[1] + u[1] * ca + v[1] * sa,
      p[2] + u[2] * ca + v[2] * sa,
      typeof col === "function" ? col(s, a) : jit(col, r, 0.12),
      size,
      tf(s),
      1,
      glow
    );
  }
}

export interface BladeOpt {
  pw?: number;
  curl?: number;
  cup?: number;
  glow?: number;
  edge?: number;
  span?: number;
  off?: number;
  sizeFn?: (u: number, v: number) => number;
}

/** Lá / cánh hoa phẳng: gốc, hướng dọc, hướng ngang, pháp tuyến để cong */
export function blade(
  b: PB,
  r: Rand,
  n: number,
  base: Vec3,
  dir: Vec3,
  side: Vec3,
  nrm: Vec3,
  L: number,
  W: number,
  colFn: (u: number, v: number) => Vec3,
  size: number,
  t0: number,
  t1: number,
  opt: BladeOpt = {}
) {
  const pw = opt.pw ?? 0.7,
    curl = opt.curl ?? 0,
    cup = opt.cup ?? 0,
    glow = opt.glow ?? 0;
  n = Math.floor(n);
  for (let i = 0; i < n; i++) {
    const u = opt.edge && r() < opt.edge ? r() : r();
    let v = r() * 2 - 1;
    if (opt.edge && r() < opt.edge) v = r() < 0.5 ? -1 : 1;
    const w = W * Math.pow(Math.sin(Math.PI * Math.max(u, 0.03) * (opt.span ?? 1) + (opt.off ?? 0)), pw);
    const al = u * L,
      ac = v * w,
      cu = curl * u * u * L + cup * v * v * w;
    const x = base[0] + dir[0] * al + side[0] * ac + nrm[0] * cu,
      y = base[1] + dir[1] * al + side[1] * ac + nrm[1] * cu,
      z = base[2] + dir[2] * al + side[2] * ac + nrm[2] * cu;
    b.add(x, y, z, colFn(u, v), size * (opt.sizeFn ? opt.sizeFn(u, v) : 1), t0 + (t1 - t0) * u, 1, glow);
  }
}

/** Nhúm hạt giống dưới gốc (hiện khi cây còn là hạt) */
export function seedDots(b: PB, r: Rand, col: Vec3 = hx("#6b4a2e")) {
  for (let i = 0; i < 26; i++) {
    const a = r() * TAU,
      rr = r() * 0.05;
    b.add(Math.cos(a) * rr, 0.015 + r() * 0.02, Math.sin(a) * rr, jit(col, r, 0.25), 0.028, -0.2, 0, 0);
  }
}

/** Mặt trước mặc định hướng về camera ban đầu */
export const FW: Vec3 = [0.7071, 0, 0.7071];
export const RT: Vec3 = [0.7071, 0, -0.7071];
