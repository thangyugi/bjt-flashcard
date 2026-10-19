/**
 * Bố cục thế giới: cao nguyên hình vòm, suối, ao, lối đi, cầu, 8 ô đất, cây công viên, vật cản,
 * và vùng đồng bằng xa bên dưới. Tính một lần khi tải engine (giá trị cố định, không phụ thuộc người dùng).
 */
import * as THREE from "three";
import { SUN, WARM, clamp, dot, noise, norm, sstep, type Vec3 } from "./math";

export const RP = 24,
  PX = 1.5,
  PZ = 1.0,
  PR = 1.45,
  RIM = 9.6,
  LOW_Y = -18,
  SKYD = 620;

export const dome = (rr: number) => Math.sqrt(RP * RP - Math.min(rr, 13) ** 2) - RP;
const V3 = (p: number[]) => new THREE.Vector3(p[0], 0, p[1]);

const STREAM = new THREE.CatmullRomCurve3(
  [[-4.8, -4.4], [-3.4, -3.4], [-1.5, -2.7], [1.5, -2.5], [3.9, -1.3], [4.5, 1.2], [3.5, 3.6], [1.1, 4.45], [-1.2, 3.6], [-1.9, 1.6], [-0.9, 0.95], [0.1, 0.95]].map(V3)
);
const OUT = new THREE.CatmullRomCurve3([[3.9, -1.3], [5.3, -1.15], [7.0, -1.6], [8.4, -1.85], [9.85, -2.05]].map(V3));
export const SPTS = STREAM.getSpacedPoints(420),
  SLEN = STREAM.getLength(),
  OPTS = OUT.getSpacedPoints(130),
  OLEN = OUT.getLength();

export const PATHS = [
  [[0.6, 9.3], [0.9, 8.3], [0.75, 7.0], [0.95, 5.5]],
  [[1.12, 3.65], [1.3, 3.0], [1.4, 2.5]],
  [[0.95, 6.2], [-1.0, 6.4], [-2.6, 6.1], [-4.4, 4.7], [-5.0, 2.7], [-4.9, 2.0]],
  [[0.95, 6.2], [2.6, 6.0], [4.3, 5.6], [5.0, 4.9]],
  [[5.15, -0.25], [5.3, -1.2], [5.45, -2.15]],
];
export const PCURVES = PATHS.map((pl) => new THREE.CatmullRomCurve3(pl.map(V3)));
const PATH_PTS: number[][] = [];
for (let k = 0; k < 4; k++) {
  const c = PCURVES[k];
  const n = Math.ceil(c.getLength() / 0.05);
  for (const p of c.getSpacedPoints(n)) PATH_PTS.push([p.x, p.z]);
}
PATH_PTS.push(...Array.from({ length: 30 }, (_, i) => [0.95 + (0.17 * i) / 29, 5.5 - (1.85 * i) / 29]));

export const RIDGE = [
  [-8.6, -2.6],
  [-2.8, -8.2],
];

export interface DistGrid {
  g: Float32Array;
  MIN: number;
  N: number;
  S: number;
}
/** Lưới khoảng cách tới tập điểm (tra nhanh "cách suối / lối đi bao xa") */
function distGrid(pts: number[][], MIN: number, N: number, S: number): DistGrid {
  const g = new Float32Array((N + 1) * (N + 1));
  for (let j = 0; j <= N; j++)
    for (let i = 0; i <= N; i++) {
      const x = MIN + i * S,
        z = MIN + j * S;
      let m = 1e9;
      for (let k = 0; k < pts.length; k++) {
        const dx = x - pts[k][0],
          dz = z - pts[k][1],
          d = dx * dx + dz * dz;
        if (d < m) m = d;
      }
      g[j * (N + 1) + i] = Math.sqrt(m);
    }
  return { g, MIN, N, S };
}
/** Tra lưới khoảng cách (nội suy song tuyến) */
export function gs(G: DistGrid, x: number, z: number) {
  const { g, MIN, N, S } = G;
  const fx = clamp((x - MIN) / S, 0, N - 1.001),
    fz = clamp((z - MIN) / S, 0, N - 1.001);
  const i = Math.floor(fx),
    j = Math.floor(fz),
    u = fx - i,
    v = fz - j,
    W = N + 1;
  return g[j * W + i] * (1 - u) * (1 - v) + g[j * W + i + 1] * u * (1 - v) + g[(j + 1) * W + i] * (1 - u) * v + g[(j + 1) * W + i + 1] * u * v;
}

export const SG = distGrid([...SPTS, ...OPTS].map((p) => [p.x, p.z]), -11, 200, 0.11),
  PG = distGrid(PATH_PTS, -11, 200, 0.11);

export function segDist(x: number, z: number, a: number[], b: number[]) {
  const vx = b[0] - a[0],
    vz = b[1] - a[1];
  const t = clamp(((x - a[0]) * vx + (z - a[1]) * vz) / (vx * vx + vz * vz), 0, 1);
  return Math.hypot(x - a[0] - vx * t, z - a[1] - vz * t);
}
export const ridgeAmt = (x: number, z: number) => {
  const d = segDist(x, z, RIDGE[0], RIDGE[1]);
  return Math.exp(-(d * d) / (1.3 * 1.3));
};

/** Độ cao mặt đất cao nguyên tại (x, z) */
export function H(x: number, z: number) {
  const rr = Math.hypot(x, z);
  let h = dome(rr);
  const ra = ridgeAmt(x, z);
  h += ra * (1.7 * (0.75 + 0.4 * noise(x * 0.6, z * 0.6)) + 0.35 * Math.max(0, noise(x * 2.3, z * 2.3)));
  const pd = Math.hypot(x - PX, z - PZ);
  h -= 0.34 * (1 - sstep(PR - 0.3, PR + 0.7, pd));
  const sd = gs(SG, x, z);
  h -= 0.2 * Math.exp(-(sd * sd) / (0.34 * 0.34));
  h += 0.17 * noise(x * 0.35 + 3, z * 0.35 - 1) + 0.05 * noise(x * 1.3, z * 1.3);
  return h;
}
export function normalAt(x: number, z: number) {
  const e = 0.08;
  return norm([-(H(x + e, z) - H(x - e, z)) / (2 * e), 1, -(H(x, z + e) - H(x, z - e)) / (2 * e)]);
}
/** "Nướng" ánh nắng vào màu chấm mặt đất */
export function shade(c: Vec3, n: Vec3, amb = 0.52): Vec3 {
  const l = Math.max(0, dot(n, SUN));
  const k = amb + 0.6 * l,
    wk = 0.08 * l * l,
    sh = (1 - l) * 0.2;
  return [c[0] * k * (1 - sh * 0.4) + WARM[0] * wk, c[1] * k * (1 - sh * 0.1) + WARM[1] * wk, c[2] * k * (1 + sh * 0.25) + WARM[2] * wk];
}
const POND_OFF = H(PX, PZ) - dome(Math.hypot(PX, PZ));
export const pondY = (x: number, z: number) => dome(Math.hypot(x, z)) + POND_OFF + 0.24;

export const BA = [0.95, 5.25],
  BB = [1.12, 3.68];
export function bridgeAt(x: number, z: number) {
  const vx = BB[0] - BA[0],
    vz = BB[1] - BA[1];
  const s = clamp(((x - BA[0]) * vx + (z - BA[1]) * vz) / (vx * vx + vz * vz), 0, 1);
  const d = Math.hypot(x - BA[0] - vx * s, z - BA[1] - vz * s);
  return { s, d, y: H(BA[0], BA[1]) + (H(BB[0], BB[1]) - H(BA[0], BA[1])) * s + 0.4 * Math.sin(Math.PI * s) + 0.02 };
}
export function groundY(x: number, z: number) {
  const b = bridgeAt(x, z);
  const h = H(x, z);
  return b.d < 0.24 ? Math.max(h, b.y) : h;
}
export const ROCK = [PX + Math.cos(-1.0) * 1.0, PZ + Math.sin(-1.0) * 1.0];

/** Tám ô đất trồng cây quý (giữ nguyên vị trí của bản mẫu) */
export const PLOT_POS = [
  [-4.0, 1.2],
  [-6.2, 3.8],
  [-2.6, 4.6],
  [-1.8, 8.0],
  [3.4, 7.3],
  [6.0, 4.2],
  [6.7, 0.4],
  [6.2, -3.0],
];
/** Cây mọc hoang sẵn trên sườn đá pha lê (phong cảnh mặc định) */
export const WILD: [string, number, number][] = [
  ["sanho", -6.6, -3.2],
  ["thuytinh", -3.4, -5.6],
  ["thuytinh", -2.4, -4.6],
  ["thuytinh", -5.5, -1.7],
];
export const CRYSTALS = [
  [0.12, 0.2, 1.3],
  [0.25, -0.3, 1.0],
  [0.36, 0.25, 1.5],
  [0.5, -0.1, 1.2],
  [0.62, 0.4, 0.9],
  [0.72, -0.2, 1.4],
  [0.85, 0.2, 1.0],
  [0.95, -0.35, 0.8],
];
export const ridgePt = (t: number, off: number) => {
  const a = RIDGE[0],
    b = RIDGE[1],
    L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return [a[0] + (b[0] - a[0]) * t - ((b[1] - a[1]) / L) * off, a[1] + (b[1] - a[1]) * t + ((b[0] - a[0]) / L) * off];
};
export const CRYSTAL_POS = [...CRYSTALS.map(([t, off]) => ridgePt(t, off)), [-4.9, -4.6], [-5.3, -4.1], [-2.9, -2.4], [2.9, -1.0]];

export interface Obstacle {
  x: number;
  z: number;
  r: number;
}
/** Cây công viên mọc sẵn (không phải cây người học trồng) */
export interface Deco {
  id: string;
  x: number;
  z: number;
  s: number;
  /** Chiều cao & cao độ gốc — điền khi dựng hình */
  h: number;
  gy: number;
}

const DECO: Deco[] = [];
export function decoOK(x: number, z: number, minD = 1.15, deco: Deco[] = DECO) {
  if (Math.hypot(x, z) > 9.1 || gs(SG, x, z) < 0.75 || Math.hypot(x - PX, z - PZ) < PR + 0.4 || gs(PG, x, z) < 0.45) return false;
  for (const p of PLOT_POS) if (Math.hypot(x - p[0], z - p[1]) < 1.45) return false;
  for (const c of CRYSTAL_POS) if (Math.hypot(x - c[0], z - c[1]) < 0.9) return false;
  for (const w of WILD) if (Math.hypot(x - w[1], z - w[2]) < 0.9) return false;
  for (const d of deco) if (Math.hypot(x - d.x, z - d.z) < minD) return false;
  return true;
}
function addDeco(id: string, x: number, z: number, s = 1, force = false) {
  if (force || decoOK(x, z)) DECO.push({ id, x, z, s, h: 0, gy: 0 });
}
(
  [
    ["lieu", 0.35, -0.62, 1.0],
    ["lieu", 2.7, -0.6, 0.95],
  ] as const
).forEach((d) => addDeco(d[0], d[1], d[2], d[3], true));
for (const k of [2, 3]) {
  const c = PCURVES[k],
    L = c.getLength(),
    n = Math.floor(L / 1.25);
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1),
      p = c.getPointAt(t),
      tg = c.getTangentAt(t),
      sd = i % 2 ? 1 : -1;
    addDeco("anhdao", p.x - tg.z * 0.85 * sd, p.z + tg.x * 0.85 * sd, 0.85 + 0.1 * (i % 3), false);
  }
}
for (let i = 0; i < 9; i++) {
  const t = 0.04 + i * 0.115,
    off = (i % 2 ? 1.25 : -1.3) + Math.sin(i * 2.3) * 0.25,
    p = ridgePt(t, off);
  addDeco("thong", p[0], p[1], 0.9 + 0.12 * Math.sin(i * 1.7));
}
(
  [
    ["tre", -8.0, 0.9, 1], ["tre", -7.5, -1.0, 0.9], ["tre", -7.0, 6.0, 0.95], ["bachduong", 0.8, -6.6, 1], ["bachduong", 1.8, -8.3, 0.95], ["bachduong", 2.9, -7.2, 1.05], ["bachduong", -0.3, -7.7, 0.9],
    ["phong", 4.6, -6.0, 1.05], ["phong", 6.3, -5.3, 0.95], ["phong", 5.3, -7.6, 0.9], ["phong", 7.7, -3.9, 0.85], ["phuong", 8.2, 2.5, 1.0], ["phuong", -5.0, 7.6, 0.95], ["anhdao", 3.3, 8.7, 0.9], ["thong", -8.7, 2.6, 0.85], ["bachduong", 8.0, 5.1, 0.9],
  ] as const
).forEach((d) => addDeco(d[0], d[1], d[2], d[3], false));

export const OBST_R: Record<string, number> = { anhdao: 0.24, thong: 0.2, phong: 0.22, lieu: 0.26, tre: 0.42, bachduong: 0.16, phuong: 0.24 };
const OBST: Obstacle[] = [];
for (const d of DECO) OBST.push({ x: d.x, z: d.z, r: OBST_R[d.id] * d.s + 0.05 });
for (const c of CRYSTAL_POS) OBST.push({ x: c[0], z: c[1], r: 0.42 });
OBST.push({ x: ROCK[0], z: ROCK[1], r: 0.3 });
export const LAMPS: number[][] = [];
for (const k of [0, 2, 3]) {
  const c = PCURVES[k],
    L = c.getLength(),
    n = Math.max(1, Math.floor(L / 2.3));
  for (let i = 0; i <= n; i++) {
    const t = (i + 0.5) / (n + 1),
      p = c.getPointAt(t),
      tg = c.getTangentAt(t),
      sd = i % 2 ? 1 : -1;
    const x = p.x - tg.z * 0.42 * sd,
      z = p.z + tg.x * 0.42 * sd;
    let ok = Math.hypot(x, z) < 9.2 && gs(SG, x, z) > 0.5;
    for (const d of DECO) if (Math.hypot(x - d.x, z - d.z) < 0.7) ok = false;
    for (const pl of PLOT_POS) if (Math.hypot(x - pl[0], z - pl[1]) < 1.0) ok = false;
    if (ok) {
      LAMPS.push([x, z]);
      OBST.push({ x, z, r: 0.1 });
    }
  }
}

/** Bản sao danh sách cây công viên & vật cản cho một lần dựng engine (engine có thể thêm vật cản riêng) */
export const freshDeco = (): Deco[] => DECO.map((d) => ({ ...d }));
export const freshObstacles = (): Obstacle[] => OBST.map((o) => ({ ...o }));

/* đi lại được (Lữ khách + thú) */
function onCrossing(x: number, z: number) {
  return bridgeAt(x, z).d < 0.22 || segDist(x, z, PATHS[4][0], PATHS[4][2]) < 0.22;
}
export function walkable(x: number, z: number) {
  if (Math.hypot(x, z) > 9.2) return false;
  if (onCrossing(x, z)) return true;
  if (Math.hypot(x - PX, z - PZ) < PR + 0.12) return false;
  if (gs(SG, x, z) < 0.36) return false;
  return true;
}
export const PLANT_R: Record<string, number> = { rafflesia: 0.62, welwitschia: 0.5, mongcop: 0.75, huyetrong: 0.3, lanma: 0.25, xacthoi: 0.45, middlemist: 0.45, sanho: 0.25 };
/** Đẩy một vật tròn bán kính rad ra khỏi các vật cản */
export function collide(x: number, z: number, rad: number, obstacles: Obstacle[]): [number, number] {
  for (let pass = 0; pass < 2; pass++) {
    for (const o of obstacles) {
      const dx = x - o.x,
        dz = z - o.z,
        d = Math.hypot(dx, dz),
        m = o.r + rad;
      if (d < m && d > 1e-4) {
        x = o.x + (dx / d) * m;
        z = o.z + (dz / d) * m;
      }
    }
  }
  return [x, z];
}

/* đồng bằng xa */
const RIVER = new THREE.CatmullRomCurve3(
  [[12.6, -2.7], [17, -8], [15, -18], [5, -27], [-12, -34], [-30, -46], [-40, -57], [-62, -60], [-88, -74], [-120, -96], [-165, -120]].map(V3)
);
const RPTS = RIVER.getSpacedPoints(520);
export const LG = distGrid(RPTS.map((p) => [p.x, p.z]), -180, 180, 2);
export const LAKES = [
  [-46, -22, 8],
  [34, -48, 6],
  [-84, 30, 11],
  [60, 18, 7],
  [-20, 48, 6],
];
export interface City {
  x: number;
  z: number;
  n: number;
  R: number;
  spire?: boolean;
}
export const CITIES: City[] = [
  { x: -40, z: -63, n: 52, R: 10, spire: true },
  { x: 42, z: -30, n: 36, R: 7 },
  { x: -66, z: 4, n: 40, R: 8 },
];
/** Độ cao vùng đồng bằng bên dưới */
export function LH(x: number, z: number) {
  const r = Math.hypot(x, z),
    ang = Math.atan2(z, x);
  let y = LOW_Y + 2.4 * noise(x * 0.03 + 11, z * 0.03 - 4) + 0.8 * noise(x * 0.12, z * 0.12);
  y += sstep(100, 160, r) * (4 + 8 * (noise(ang * 4, 2.2) * 0.5 + 0.5) + 5 * Math.max(0, noise(ang * 13, r * 0.06)));
  const rd = gs(LG, x, z);
  y -= 1.5 * Math.exp((-rd * rd) / 9);
  for (const [lx, lz, lr] of LAKES) {
    const d = Math.hypot(x - lx, z - lz);
    if (d < lr + 4) y -= 1.2 * (1 - sstep(lr - 1, lr + 4, d));
  }
  for (const c of CITIES) {
    const d = Math.hypot(x - c.x, z - c.z);
    if (d < c.R + 4) {
      const k = 1 - sstep(c.R, c.R + 4, d);
      y = y * (1 - k) + (LOW_Y + 0.2) * k;
    }
  }
  return y;
}

