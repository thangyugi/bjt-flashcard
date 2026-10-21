/**
 * Lõi dùng chung của engine màu nước: nhiễu, số ngẫu nhiên có hạt giống, màu, canvas (cả trong Web Worker), mặt nạ.
 * Không import three — file này chạy được trong worker vẽ kết cấu.
 */

export type P2 = [number, number];
export type RGB = [number, number, number];

export function hash2(ix: number, iy: number, s: number) {
  let h = (Math.imul(ix | 0, 0x27d4eb2d) ^ Math.imul(iy | 0, 0x165667b1) ^ Math.imul(s | 0, 0x9e3779b1)) | 0;
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function vnoise(x: number, y: number, s = 0, px = 0) {
  let ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix,
    fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx),
    uy = fy * fy * (3 - 2 * fy);
  let ix1 = ix + 1;
  if (px) {
    ix = ((ix % px) + px) % px;
    ix1 = ((ix1 % px) + px) % px;
  }
  const a = hash2(ix, iy, s),
    b = hash2(ix1, iy, s),
    c = hash2(ix, iy + 1, s),
    d = hash2(ix1, iy + 1, s);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

export function fbm(x: number, y: number, oct = 3, s = 0, px = 0) {
  let a = 0.5,
    f = 1,
    sum = 0,
    norm = 0;
  for (let o = 0; o < oct; o++) {
    sum += a * vnoise(x * f, y * f, s + o * 17, px ? px * f : 0);
    norm += a;
    a *= 0.5;
    f *= 2;
  }
  return sum / norm;
}

export function mulberry(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Rand {
  rng: () => number;
  R: (a: number, b: number) => number;
  pick: <T>(arr: readonly T[]) => T;
}

export function makeRand(seed: number): Rand {
  const rng = mulberry(seed);
  return {
    rng,
    R: (a, b) => a + (b - a) * rng(),
    pick: (arr) => arr[Math.floor(rng() * arr.length)],
  };
}

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function hex(h: string): RGB {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function mixc(a: readonly number[], b: readonly number[], t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/* ---------- canvas (DOM hoặc OffscreenCanvas trong worker) ---------- */
export type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export type Ctx2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export function canvas(w: number, h: number): AnyCanvas {
  if (typeof document !== "undefined") {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
  }
  return new OffscreenCanvas(w, h);
}
export function ctx2d(c: AnyCanvas, readback = false): Ctx2D {
  const ctx = (c as HTMLCanvasElement).getContext("2d", readback ? { willReadFrequently: true } : undefined);
  if (!ctx) throw new Error("canvas 2d unavailable");
  return ctx as Ctx2D;
}
/** Ngữ cảnh vẽ theo toạ độ thế giới: (x, z) ∈ [-W, W]² phủ cả canvas */
export function worldCtx(c: AnyCanvas, W: number, readback = false) {
  const ctx = ctx2d(c, readback);
  const s = c.width / (2 * W);
  ctx.setTransform(s, 0, 0, s, W * s, W * s);
  return ctx;
}
export function polyline(ctx: Ctx2D, pts: readonly (readonly number[])[]) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
}

/* ---------- mặt nạ (đường đi, nước…): kênh đỏ, làm mềm bằng ba lượt box blur ≈ Gauss ---------- */
export interface Mask {
  data: Uint8ClampedArray;
  n: number;
  W: number;
}
function boxBlur(src: Float32Array, dst: Float32Array, n: number, r: number, horizontal: boolean) {
  const inv = 1 / (2 * r + 1);
  for (let a = 0; a < n; a++) {
    let acc = 0;
    const idx = (b: number) => (horizontal ? a * n + Math.min(n - 1, Math.max(0, b)) : Math.min(n - 1, Math.max(0, b)) * n + a);
    for (let b = -r; b <= r; b++) acc += src[idx(b)];
    for (let b = 0; b < n; b++) {
      dst[horizontal ? a * n + b : b * n + a] = acc * inv;
      acc += src[idx(b + r + 1)] - src[idx(b - r)];
    }
  }
}
export function maskFrom(c: AnyCanvas, W: number, blurPx: number): Mask {
  const n = c.width;
  const img = ctx2d(c, true).getImageData(0, 0, n, n).data;
  const a = new Float32Array(n * n),
    b = new Float32Array(n * n);
  for (let i = 0; i < n * n; i++) a[i] = img[i * 4];
  const r = Math.max(1, Math.round(blurPx * 0.85));
  for (let pass = 0; pass < 3; pass++) {
    boxBlur(a, b, n, r, true);
    boxBlur(b, a, n, r, false);
  }
  const data = new Uint8ClampedArray(n * n);
  for (let i = 0; i < n * n; i++) data[i] = a[i];
  return { data, n, W };
}
export function maskAt(m: Mask, x: number, z: number) {
  const { n, W } = m;
  const i = clamp(Math.floor(((x + W) / (2 * W)) * n), 0, n - 1),
    j = clamp(Math.floor(((z + W) / (2 * W)) * n), 0, n - 1);
  return m.data[j * n + i] / 255;
}

/** Khoảng cách tới đường gấp khúc + tham số chuẩn hoá dọc đường (0..1) */
export function segDist(px: number, pz: number, pts: readonly P2[]): P2 {
  let best = 1e9,
    bt = 0,
    acc = 0,
    tot = 0;
  for (let i = 0; i < pts.length - 1; i++) tot += Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i],
      [bx, bz] = pts[i + 1],
      dx = bx - ax,
      dz = bz - az,
      L2 = dx * dx + dz * dz,
      L = Math.sqrt(L2);
    const t = clamp(((px - ax) * dx + (pz - az) * dz) / L2, 0, 1),
      d = Math.hypot(px - ax - dx * t, pz - az - dz * t);
    if (d < best) {
      best = d;
      bt = (acc + t * L) / tot;
    }
    acc += L;
  }
  return [best, bt];
}

export const inPoly = (x: number, z: number, poly: readonly P2[]) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i],
      [xj, zj] = poly[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) c = !c;
  }
  return c;
};

/* ---------- công việc chia nhỏ: nhường luồng chính, báo tiến độ ---------- */
export interface Work {
  /** Gọi thường xuyên trong vòng lặp nặng; tự nhường luồng khi đã chạy quá ngân sách */
  tick: () => Promise<void> | void;
  /** Tiến độ của bước hiện tại 0..1 */
  progress: (f: number) => void;
}
export function makeWork(onProgress: (f: number) => void, budgetMs = 24, yieldable = true): Work {
  let last = performance.now();
  return {
    tick() {
      if (!yieldable) return;
      const now = performance.now();
      if (now - last < budgetMs) return;
      return new Promise<void>((r) =>
        setTimeout(() => {
          last = performance.now();
          r();
        }, 0)
      );
    },
    progress: onProgress,
  };
}
/** Phần việc con: ánh xạ tiến độ con 0..1 vào [a, b] của tiến độ cha */
export function subWork(w: Work, a: number, b: number): Work {
  return { tick: w.tick, progress: (f) => w.progress(a + (b - a) * clamp(f, 0, 1)) };
}
