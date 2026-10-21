/**
 * Bố cục "Thung lũng Bốn Mùa": thung lũng tròn bốn góc bốn mùa (đông trên trái, thu trên phải, hạ dưới phải, xuân dưới trái),
 * suối xoắn ốc đổ vào ao có đảo đền, đường ray vòng quanh có hầm núi tuyết và ga ở phía nam.
 * Chỉ hàm thuần + canvas (không dựng 3D).
 */
import { CatmullRomCurve3, Vector3 } from "three";
import { canvas, clamp, ctx2d, fbm, hex, inPoly, lerp, makeRand, maskAt, maskFrom, mixc, polyline, smooth, vnoise, worldCtx, type P2, type Rand, type RGB, type Work } from "../core";
import type { Quality } from "../types";

export const BONMUA_SEED = 4444;
const D2R = Math.PI / 180;

export interface RiverPt {
  x: number;
  z: number;
  w: number;
}
export type PlotType = "empty" | "tulip" | "rape" | "sunflower" | "paddy" | "harvest";

export function createBonMuaLayout() {
  const rand = makeRand(BONMUA_SEED);
  const { R, rng } = rand;
  const W = 60;
  const RAIL = 33;
  const POND_R = 7.2,
    ISLE_R = 2.8;
  const pondR = (a: number) => POND_R + 0.45 * Math.sin(a * 3 + 1) + 0.3 * Math.sin(a * 5 + 2);
  const TUN_A = -140 * D2R,
    TUN: P2 = [RAIL * Math.cos(TUN_A), RAIL * Math.sin(TUN_A)];
  const SRC: P2 = [27.5 * Math.cos(-150 * D2R), 27.5 * Math.sin(-150 * D2R)];
  function seasonW(x: number, z: number) {
    const wx = x + (fbm(x * 0.07 + 5, z * 0.07, 2, 81) - 0.5) * 5,
      wz = z + (fbm(x * 0.07, z * 0.07 + 9, 2, 82) - 0.5) * 5;
    const sx = smooth(-2.6, 2.6, wx),
      sz = smooth(-2.6, 2.6, wz);
    return [(1 - sx) * (1 - sz), sx * (1 - sz), sx * sz, (1 - sx) * sz]; // đông, thu, hạ, xuân
  }
  const seasonPick = (rd: Rand, x: number, z: number) => {
    const w = seasonW(x, z);
    let r = rd.rng();
    for (let i = 0; i < 4; i++) {
      r -= w[i];
      if (r <= 0) return i;
    }
    return 3;
  };
  const seasonMain = (x: number, z: number) => {
    const w = seasonW(x, z);
    let b = 0;
    for (let i = 1; i < 4; i++) if (w[i] > w[b]) b = i;
    return b;
  };
  const RIVER: RiverPt[] = [];
  for (let d = 210; d >= -50; d -= 1.25) {
    const th = d * D2R,
      t = (210 - d) / 255;
    const r = 24 - 17 * t + 0.55 * Math.sin(th * 6);
    RIVER.push({ x: r * Math.cos(th), z: r * Math.sin(th), w: 0.95 + 0.85 * clamp(t, 0, 1) });
  }
  function densify(ctrl: P2[], n: number, w0: number, w1: number): RiverPt[] {
    const c = new CatmullRomCurve3(ctrl.map(([x, z]) => new Vector3(x, 0, z)));
    return c.getPoints(n).map((p, i) => ({ x: p.x, z: p.z, w: lerp(w0, w1, i / n) }));
  }
  const BROOK = densify(
    [
      [27.4, 4.2],
      [23.5, 5.4],
      [19.5, 4.5],
      [15.5, 5.2],
      [12.6, 4.4],
      [10.9, 3.8],
    ],
    60,
    0.42,
    0.6
  );
  function crossing(test: (p: RiverPt) => number | null) {
    for (let i = 0; i < RIVER.length - 1; i++) {
      const a = RIVER[i],
        b = RIVER[i + 1],
        fa = test(a),
        fb = test(b);
      if (fa === null || fb === null) continue;
      if (fa <= 0 !== fb <= 0) {
        const t = fa / (fa - fb);
        return { x: lerp(a.x, b.x, t), z: lerp(a.z, b.z, t), w: lerp(a.w, b.w, t) };
      }
    }
    return { x: 0, z: 0, w: 1 };
  }
  const XW = crossing((p) => (p.x < -10 ? p.z : null));
  const XS = crossing((p) => (p.z > 8 ? p.x : null));
  const XE = crossing((p) => (p.x > 6 ? p.z : null));
  const smoothPts = (pts: P2[]): P2[] => (pts.length < 3 ? pts : densify(pts, pts.length * 10, 0, 0).map((p) => [p.x, p.z] as P2));
  const PATHS: { w: number; pts: P2[]; sp: P2[] }[] = (
    [
      { w: 2.1, pts: [[0, 25.0], [0.5, 20.5], [0, XS.z], [-0.4, 11.5], [0, 7.6]] },
      { w: 2.0, pts: [[0, -7.7], [-0.4, -13], [0.4, -21], [0, -27], [0, -31.6]] },
      { w: 2.0, pts: [[7.7, 0], [XE.x, 0], [16, 0.4], [23, -0.3], [31.6, 0]] },
      { w: 2.0, pts: [[-7.7, 0], [-14, -0.4], [XW.x, 0], [-27, 0.3], [-31.6, 0]] },
      { w: 1.4, pts: [[-11, -0.5], [-11.2, -4], [-11, -7.4]] },
      { w: 1.4, pts: [[0, -21.2], [-5, -21.4], [-11.6, -21.0]] },
      { w: 1.3, pts: [[0, -25.2], [-2.6, -25.2]] },
      { w: 1.4, pts: [[24, 0], [24, -4.4]] },
      { w: 1.4, pts: [[18.6, 0], [18.8, -6], [18.6, -11.6]] },
      { w: 1.4, pts: [[4.2, 24.6], [9, 26.4], [13.6, 25.0], [16.5, 23.8]] },
      { w: 1.4, pts: [[-27, 0], [-27, 6.0]] },
      { w: 1.3, pts: [[-2.2, 7.5], [-6, 8.0], [-9.5, 5.6], [-13.2, 5.6]] },
    ] as { w: number; pts: P2[] }[]
  ).map((p) => ({ ...p, sp: smoothPts(p.pts) }));
  const PLAZA = { x: 0, z: 24.3, rx: 5.2, rz: 1.9 };
  const PLOTS: { t: PlotType; x: number; z: number; w: number; d: number }[] = [
    { t: "empty", x: -11, z: 3.4, w: 3.4, d: 2.4 },
    { t: "empty", x: -11, z: 7.8, w: 3.4, d: 2.4 },
    { t: "empty", x: -15.4, z: 3.4, w: 3.4, d: 2.4 },
    { t: "tulip", x: -5.2, z: 11.1, w: 4.8, d: 2.6 },
    { t: "rape", x: -9.6, z: 25.0, w: 6.0, d: 3.0 },
    { t: "sunflower", x: 9.5, z: 22.2, w: 7.2, d: 4.0 },
    { t: "paddy", x: 21, z: 12, w: 10.6, d: 7.4 },
    { t: "harvest", x: 5.4, z: -14, w: 6.8, d: 4.4 },
  ];
  const ORCH = {
    x: 18.5,
    z: -16.5,
    w: 11,
    d: 9,
    poly: [
      [13, -12],
      [24, -12],
      [24, -16.3],
      [19.6, -21],
      [13, -21],
    ] as P2[],
  };
  const B: Record<string, P2> = {
    station: [0, 27.4],
    springHouse: [-27, 8.6],
    summerHouse: [16.6, 21.6],
    autumnHouse: [24, -7],
    winterHouse: [-14, -21.2],
    kura: [-5, -25.2],
    onsen: [-11, -11],
    shrine: [0, -0.4],
  };

  // mặt nạ đường đi + nước
  const GT = 1024;
  const pathC = canvas(GT, GT),
    pctx = worldCtx(pathC, W, true);
  pctx.fillStyle = "#000";
  pctx.fillRect(-W, -W, 2 * W, 2 * W);
  pctx.strokeStyle = "#fff";
  pctx.fillStyle = "#fff";
  pctx.lineCap = "round";
  pctx.lineJoin = "round";
  for (const p of PATHS) {
    pctx.lineWidth = p.w;
    polyline(pctx, p.sp);
    pctx.stroke();
  }
  pctx.beginPath();
  pctx.ellipse(PLAZA.x, PLAZA.z, PLAZA.rx, PLAZA.rz, 0, 0, Math.PI * 2);
  pctx.fill();
  const pathM = maskFrom(pathC, W, 3);
  const waterC = canvas(GT, GT),
    wctx = worldCtx(waterC, W, true);
  wctx.fillStyle = "#000";
  wctx.fillRect(-W, -W, 2 * W, 2 * W);
  {
    const extra = 0.85;
    wctx.strokeStyle = "#fff";
    wctx.fillStyle = "#fff";
    wctx.lineCap = "round";
    for (const Ls of [RIVER, BROOK])
      for (let i = 0; i < Ls.length - 1; i++) {
        wctx.lineWidth = 2 * (Ls[i].w + extra);
        wctx.beginPath();
        wctx.moveTo(Ls[i].x, Ls[i].z);
        wctx.lineTo(Ls[i + 1].x, Ls[i + 1].z);
        wctx.stroke();
      }
    wctx.beginPath();
    for (let a = 0; a <= 96; a++) {
      const t = (a / 96) * Math.PI * 2,
        r = pondR(t) + extra;
      if (a) wctx.lineTo(Math.cos(t) * r, Math.sin(t) * r);
      else wctx.moveTo(Math.cos(t) * r, Math.sin(t) * r);
    }
    wctx.fill();
    wctx.fillStyle = "#000";
    wctx.beginPath();
    wctx.arc(0, 0, ISLE_R + 0.15, 0, Math.PI * 2);
    wctx.fill();
  }
  const waterM = maskFrom(waterC, W, 4);
  const onPath = (x: number, z: number) => maskAt(pathM, x, z);
  const onWater = (x: number, z: number) => maskAt(waterM, x, z);

  function hBase(x: number, z: number) {
    const r = Math.hypot(x, z),
      dr = Math.abs(r - RAIL);
    let h = 0.24 * (fbm(x * 0.12, z * 0.12, 2, 7) - 0.5) * smooth(1.2, 3, dr);
    h += 9 * smooth(35.2, 56, r) * (0.5 + 0.9 * fbm(x * 0.05 + 3, z * 0.05, 3, 11));
    const dT = Math.hypot(x - TUN[0], z - TUN[1]);
    let th = 5.2 * (1 - smooth(2.0, 9.0, dT)) * (0.9 + 0.2 * fbm(x * 0.3, z * 0.3, 2, 13));
    if (dT > 4.3) th *= smooth(1.3, 2.9, dr);
    h += th;
    const dS = Math.hypot(x - SRC[0], z - SRC[1]);
    h += 2.6 * (1 - smooth(0.8, 5.5, dS));
    h += 0.35 * (1 - smooth(ISLE_R - 1.2, ISLE_R + 0.2, r));
    return h;
  }
  const H = (x: number, z: number) => hBase(x, z) - 0.75 * smooth(0.12, 0.8, onWater(x, z));
  const WATER_Y = -0.2;

  const OBST: { x: number; z: number; r: number }[] = [];
  const obst = (x: number, z: number, r: number) => OBST.push({ x, z, r });
  const RECTS = PLOTS.map((p) => ({ x: p.x, z: p.z, w: p.w + 0.6, d: p.d + 0.6 }));
  RECTS.push({ x: ORCH.x, z: ORCH.z, w: ORCH.w + 0.4, d: ORCH.d + 0.4 });
  obst(B.station[0], B.station[1], 4.4);
  obst(B.station[0] - 2, B.station[1] + 1, 3);
  obst(B.station[0] + 2, B.station[1] + 1, 3);
  for (const k of ["springHouse", "summerHouse", "autumnHouse", "winterHouse"]) obst(B[k][0], B[k][1], 3.2);
  obst(B.kura[0], B.kura[1], 3.0);
  obst(B.onsen[0], B.onsen[1], 4.4);
  obst(0, 0, ISLE_R + 0.4);
  obst(SRC[0], SRC[1], 2.4);
  function freeSpot(x: number, z: number, r: number) {
    if (onPath(x, z) > 0.1 || onWater(x, z) > 0.08) return false;
    const rr = Math.hypot(x, z);
    if (Math.abs(rr - RAIL) < 2.3 + r * 0.4) return false;
    if (Math.hypot(x - TUN[0], z - TUN[1]) < 6 && Math.abs(rr - RAIL) < 3.4) return false;
    for (const o of OBST) if ((x - o.x) ** 2 + (z - o.z) ** 2 < (r + o.r) ** 2) return false;
    for (const p of RECTS) if (Math.abs(x - p.x) < p.w / 2 + r && Math.abs(z - p.z) < p.d / 2 + r) return false;
    return true;
  }

  const TREES: { t: string; x: number; z: number; s: number; yaw: number }[] = [];
  const addTree = (t: string, x: number, z: number, s: number) => {
    TREES.push({ t, x, z, s, yaw: R(0, 6.28) });
    obst(x, z, 0.85 * s);
  };
  for (let i = 0, n = 0; i < 400 && n < 16; i++) {
    const x = -18 + R(-7, 7),
      z = 21.5 + R(-5, 5);
    if (((x + 18) / 7) ** 2 + ((z - 21.5) / 5) ** 2 > 1) continue;
    if (Math.hypot(x, z) > 29.2) continue;
    const s = R(0.95, 1.25);
    if (!freeSpot(x, z, 1.25 * s)) continue;
    addTree("sakura", x, z, s);
    n++;
  }
  for (const [x, z, s] of [
    [-4.2, 19.2, 1.0],
    [-7.6, 6.9, 0.8],
    [-3.6, 15.0, 0.85],
    [-14.2, 11.4, 0.95],
    [-22.5, 11.5, 1.05],
    [-6.5, 21.5, 0.9],
  ])
    if (freeSpot(x, z, 0.9)) addTree("sakura", x, z, s);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      const x = 14.6 + c * 2.95,
        z = -13.6 - r * 2.4;
      if (!inPoly(x, z, ORCH.poly) || !inPoly(x + 0.9, z - 0.9, ORCH.poly)) continue;
      TREES.push({ t: (r + c) % 2 ? "apple" : "kaki", x, z, s: R(0.82, 0.92), yaw: R(0, 6.28) });
    }
  for (const [t, x, z, s] of [
    ["momiji", 9.2, -7.8, 1.05], ["ginkgo", 12.6, -4.6, 1.0], ["momiji", 7.8, -20.6, 1.1], ["ginkgo", 11.2, -23.6, 1.0], ["momiji", 3.4, -22.6, 0.95],
    ["momiji", 27.4, -12.5, 1.1], ["ginkgo", 28.0, -5.5, 1.05], ["momiji", 13.4, -9.4, 0.85], ["ginkgo", 3.6, -9.6, 0.85], ["momiji", 9.5, -1.8, 0.8],
    ["snowpine", -16.4, -16.4, 1.0], ["snowpine", -20.5, -18.0, 1.15], ["snowpine", -4.6, -14.5, 0.95], ["snowpine", -17.5, -9.0, 0.9], ["snowpine", -8.6, -29.0, 1.0], ["snowpine", -2.6, -18.4, 0.8], ["snowpine", -22.0, -24.8, 1.1],
    ["green", 23.2, 21.0, 1.1], ["green", 4.6, 10.0, 0.85], ["green", 12.6, 15.2, 0.95], ["green", 27.4, 7.6, 1.0], ["pine", 20.2, 26.6, 1.0], ["green", 5.8, 28.2, 0.85],
  ] as [string, number, number, number][])
    if (freeSpot(x, z, 0.9 * s)) addTree(t, x, z, s);
  const treeTypeFor = (x: number, z: number) => {
    const s = seasonPick(rand, x, z);
    if (s === 0) return rng() < 0.85 ? "snowpine" : "snowround";
    if (s === 1) {
      const k = rng();
      return k < 0.45 ? "momiji" : k < 0.78 ? "ginkgo" : "pine";
    }
    if (s === 2) return rng() < 0.72 ? "green" : "pine";
    return rng() < 0.55 ? "sakura" : "spring";
  };
  for (let i = 0, n = 0; i < 3000 && n < 34; i++) {
    const x = R(-30, 30),
      z = R(-30, 30),
      r = Math.hypot(x, z);
    if (r > 29.5 || r < 9) continue;
    const s = R(0.8, 1.1);
    if (!freeSpot(x, z, 1.5 * s)) continue;
    addTree(treeTypeFor(x, z), x, z, s);
    n++;
  }
  for (let i = 0, n = 0; i < 12000 && n < 330; i++) {
    const x = R(-66, 66),
      z = R(-56, 60),
      r = Math.hypot(x, z);
    if (r < 36.2) continue;
    const s = R(0.95, 1.45);
    if (!freeSpot(x, z, 1.15 * s)) continue;
    addTree(treeTypeFor(x, z), x, z, s);
    n++;
  }
  for (let i = 0, n = 0; i < 400 && n < 9; i++) {
    const a = R(0, 6.28),
      d = R(2.5, 6.5),
      x = TUN[0] + Math.cos(a) * d,
      z = TUN[1] + Math.sin(a) * d;
    if (Math.abs(Math.hypot(x, z) - RAIL) < 2.6) continue;
    if (!freeSpot(x, z, 1.0)) continue;
    addTree("snowpine", x, z, R(0.8, 1.05));
    n++;
  }

  return {
    W, RAIL, POND_R, ISLE_R, pondR, TUN_A, TUN, SRC, seasonW, seasonPick, seasonMain, RIVER, BROOK, XW, XS, XE, PATHS, PLAZA, PLOTS, ORCH, B,
    onPath, onWater, hBase, H, WATER_Y, OBST, obst, RECTS, freeSpot, TREES, rand,
  };
}
export type BonMuaLayout = ReturnType<typeof createBonMuaLayout>;

const SG: Record<string, string[]> = {
  w: ["#d3deea", "#f2f6f9", "#ffffff"],
  a: ["#ae9a46", "#d9bc62", "#ecd486"],
  s: ["#4e9a3e", "#79bd4e", "#a6d86e"],
  p: ["#82c25e", "#a9da7c", "#d2efa4"],
};

/** Nền vẽ tay bốn mùa (nặng: chia nhỏ, nhường luồng) */
export async function paintBonMuaGround(L: BonMuaLayout, q: Quality, w: Work) {
  const { W, seasonW, seasonPick, hBase, RAIL, onWater, onPath, TREES, PATHS, PLAZA, PLOTS } = L;
  const rd = makeRand(BONMUA_SEED + 1);
  const { R, rng, pick } = rd;
  const SGc: Record<string, RGB[]> = Object.fromEntries(Object.entries(SG).map(([k, v]) => [k, v.map(hex)]));
  const GT = q.groundBase,
    GT2 = q.ground;
  const base = canvas(GT, GT),
    bctx = ctx2d(base),
    img = bctx.createImageData(GT, GT),
    d = img.data;
  const dirt = hex("#e6cf9f"),
    dirt2 = hex("#d6b986"),
    worn = hex("#ad8554"),
    snowPath = hex("#e4e0da");
  const bank = hex("#d8c79a"),
    bankWet = hex("#a89a74"),
    bankSnow = hex("#d4dbe2");
  const ballast = hex("#a99d8a"),
    ballast2 = hex("#8f8474");
  const keys = ["w", "a", "s", "p"];
  for (let j = 0; j < GT; j++) {
    if ((j & 7) === 0) {
      w.progress((0.6 * j) / GT);
      await w.tick();
    }
    const z = -W + ((j + 0.5) / GT) * 2 * W;
    for (let i = 0; i < GT; i++) {
      const x = -W + ((i + 0.5) / GT) * 2 * W;
      const n1 = fbm(x * 0.09, z * 0.09, 3, 1),
        n2 = fbm(x * 0.45 + 11, z * 0.45, 2, 2),
        n3 = vnoise(x * 1.9, z * 1.9, 3);
      const sw = seasonW(x, z);
      let c: RGB = [0, 0, 0];
      for (let k = 0; k < 4; k++) {
        if (sw[k] < 1e-3) continue;
        const P = SGc[keys[k]];
        let cc = mixc(P[0], P[1], smooth(0.3, 0.7, n1));
        cc = mixc(cc, P[2], smooth(0.6, 0.76, n2) * 0.5);
        c = [c[0] + cc[0] * sw[k], c[1] + cc[1] * sw[k], c[2] + cc[2] * sw[k]];
      }
      if (n2 < 0.36) c = mixc(c, [c[0] * 0.82, c[1] * 0.88, c[2] * 0.92], (0.36 - n2) * 1.8);
      const ring = 1 - smooth(0, 0.03, Math.abs(n1 - 0.52));
      c = mixc(c, [c[0] * 0.88, c[1] * 0.9, c[2] * 0.9], ring);
      const r = Math.hypot(x, z),
        hh = hBase(x, z);
      if (hh > 1) c = mixc(c, [c[0] * 0.86, c[1] * 0.9, c[2] * 0.96], smooth(1, 8, hh) * 0.5);
      const dr = Math.abs(r - RAIL) + (n3 - 0.5) * 0.25;
      if (dr < 1.35) {
        let bc = mixc(ballast, ballast2, n3);
        bc = mixc(bc, [235, 238, 242], sw[0] * 0.55);
        c = mixc(c, bc, 1 - smooth(1.05, 1.35, dr));
      }
      const k4 = (j * GT + i) * 4;
      const bm = onWater(x, z) + (n3 - 0.5) * 0.3;
      if (bm > 0.5) {
        let b = mixc(bank, bankWet, n3);
        b = mixc(b, bankSnow, sw[0]);
        c = mixc(b, worn, (1 - smooth(0.5, 0.6, bm)) * 0.45);
      }
      const m = onPath(x, z) + (n3 - 0.5) * 0.26 + (n2 - 0.5) * 0.2;
      if (m > 0.5 && bm < 0.8) {
        let dc = mixc(dirt, dirt2, n2);
        dc = mixc(dc, snowPath, sw[0] * 0.85);
        dc = mixc(dc, worn, (1 - smooth(0.5, 0.6, m)) * 0.75);
        c = dc;
      } else if (m > 0.4 && bm < 0.6) c = mixc(c, [c[0] * 0.75, c[1] * 0.82, c[2] * 0.75], ((m - 0.4) / 0.1) * 0.4);
      d[k4] = c[0];
      d[k4 + 1] = c[1];
      d[k4 + 2] = c[2];
      d[k4 + 3] = 255;
    }
  }
  bctx.putImageData(img, 0, 0);
  const out = canvas(GT2, GT2),
    ctx = ctx2d(out);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(base, 0, 0, GT2, GT2);
  const s = GT2 / (2 * W);
  ctx.setTransform(s, 0, 0, s, W * s, W * s);
  const isGrass = (x: number, z: number) => onPath(x, z) < 0.25 && onWater(x, z) < 0.3 && Math.abs(Math.hypot(x, z) - RAIL) > 1.5;
  const DAB: [string, number, number][][] = [
    [["rgba(255,255,255,", 0.35, 0.7], ["rgba(150,175,215,", 0.12, 0.26]],
    [["rgba(240,205,110,", 0.18, 0.36], ["rgba(150,95,40,", 0.1, 0.22]],
    [["rgba(170,220,110,", 0.14, 0.3], ["rgba(40,100,40,", 0.12, 0.25]],
    [["rgba(214,240,160,", 0.16, 0.32], ["rgba(70,130,55,", 0.1, 0.2]],
  ];
  for (let i = 0; i < 70000; i++) {
    if ((i & 4095) === 0) {
      w.progress(0.6 + (0.15 * i) / 70000);
      await w.tick();
    }
    const x = R(-W, W),
      z = R(-W, W);
    if (!isGrass(x, z)) continue;
    const sI = seasonPick(rd, x, z),
      dd = DAB[sI][rng() < 0.55 ? 0 : 1];
    ctx.fillStyle = dd[0] + R(dd[1], dd[2]) + ")";
    ctx.beginPath();
    ctx.ellipse(x, z, R(0.08, 0.22), R(0.03, 0.08), R(0, Math.PI), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.lineCap = "round";
  for (let i = 0; i < 24000; i++) {
    if ((i & 2047) === 0) {
      w.progress(0.75 + (0.1 * i) / 24000);
      await w.tick();
    }
    const x = R(-W, W),
      z = R(-W, W);
    if (!isGrass(x, z)) continue;
    const sI = seasonPick(rd, x, z);
    if (sI === 0 && rng() < 0.92) continue;
    const sz = R(0.14, 0.3);
    ctx.strokeStyle = sI === 0 ? `rgba(110,120,110,${R(0.4, 0.6)})` : sI === 1 ? `rgba(110,80,30,${R(0.45, 0.7)})` : `rgba(40,82,32,${R(0.5, 0.8)})`;
    ctx.lineWidth = R(0.035, 0.06);
    ctx.beginPath();
    for (let b = -1; b <= 1; b++) {
      ctx.moveTo(x + b * sz * 0.18, z);
      ctx.quadraticCurveTo(x + b * sz * 0.35, z - sz * 0.5, x + b * sz * 0.55, z - sz * (b === 0 ? 1.1 : 0.8));
    }
    ctx.stroke();
  }
  for (let i = 0; i < 2600; i++) {
    const x = R(-W, 4),
      z = R(-W, 4);
    if (seasonW(x, z)[0] < 0.6 || !isGrass(x, z)) continue;
    ctx.strokeStyle = `rgba(140,165,205,${R(0.18, 0.35)})`;
    ctx.lineWidth = R(0.05, 0.1);
    ctx.beginPath();
    ctx.arc(x, z, R(0.4, 1.1), Math.PI * 0.1, Math.PI * 0.9);
    ctx.stroke();
  }
  const FL: string[][] = [[], ["#f08a3c", "#f2c94c", "#d9532f", "#fff5e0"], ["#f7d85e", "#fffaf0", "#f3c94a", "#ffffff", "#9fc4f0"], ["#fffdf6", "#f6b3c4", "#f19db1", "#f7d85e", "#c9b6f0", "#fbd0dc"]];
  for (let i = 0; i < 900; i++) {
    const cx = R(-W, W),
      cz = R(-W, W);
    if (!isGrass(cx, cz)) continue;
    const sI = seasonPick(rd, cx, cz);
    if (!FL[sI].length) continue;
    const col = pick(FL[sI]),
      n = 3 + Math.floor(rng() * 6);
    for (let f = 0; f < n; f++) {
      const x = cx + R(-0.6, 0.6),
        z = cz + R(-0.4, 0.4),
        rr = R(0.07, 0.12);
      ctx.fillStyle = col;
      ctx.strokeStyle = "rgba(90,60,40,0.5)";
      ctx.lineWidth = 0.025;
      ctx.beginPath();
      ctx.arc(x, z, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
  await w.tick();
  const FALL: Record<string, [string[], number, number]> = {
    sakura: [["#f9c6d4", "#f4a9bf", "#fde3ea", "#ee9cb5"], 70, 2.8],
    momiji: [["#d8452c", "#e8663a", "#c23a2a", "#f08a3c"], 55, 2.4],
    ginkgo: [["#f3c53a", "#f7d65a", "#e8b22c"], 60, 2.4],
    kaki: [["#f08a24"], 4, 1.4],
    apple: [["#d8322c"], 4, 1.4],
  };
  for (const t of TREES) {
    const conf = FALL[t.t];
    if (!conf) continue;
    for (let k = 0; k < conf[1]; k++) {
      const a = R(0, 6.28),
        dd = Math.sqrt(rng()) * conf[2] * t.s,
        x = t.x + Math.cos(a) * dd,
        z = t.z + Math.sin(a) * dd * 0.8 + 0.4;
      if (onWater(x, z) > 0.4) continue;
      ctx.fillStyle = pick(conf[0]);
      ctx.strokeStyle = "rgba(90,50,40,0.35)";
      ctx.lineWidth = 0.02;
      ctx.beginPath();
      if (t.t === "kaki" || t.t === "apple") ctx.arc(x, z, 0.14, 0, Math.PI * 2);
      else ctx.ellipse(x, z, R(0.07, 0.13), R(0.04, 0.08), R(0, 3), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
  w.progress(0.92);
  await w.tick();
  for (const p of PATHS)
    for (let k = 0; k < p.sp.length - 1; k++) {
      const [ax, az] = p.sp[k],
        [bx, bz] = p.sp[k + 1],
        Ln = Math.hypot(bx - ax, bz - az);
      for (let t = 0; t < Ln; t += 0.5) {
        const u = t / Ln,
          x = lerp(ax, bx, u) + R(-p.w * 0.38, p.w * 0.38),
          z = lerp(az, bz, u) + R(-p.w * 0.38, p.w * 0.38);
        if (onWater(x, z) > 0.5) continue;
        ctx.fillStyle = pick(["rgba(190,160,115,0.8)", "rgba(170,140,100,0.7)", "rgba(215,195,160,0.9)"]);
        ctx.strokeStyle = "rgba(80,58,38,0.55)";
        ctx.lineWidth = 0.025;
        ctx.beginPath();
        ctx.ellipse(x, z, R(0.05, 0.12), R(0.04, 0.08), R(0, 3), 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
  for (let i = 0; i < 160; i++) {
    const a = R(0, 6.28),
      rr = Math.sqrt(rng()),
      x = PLAZA.x + Math.cos(a) * rr * (PLAZA.rx - 0.5),
      z = PLAZA.z + Math.sin(a) * rr * (PLAZA.rz - 0.3);
    ctx.fillStyle = pick(["#ddd1b8", "#d0c3a6", "#e5dcc6", "#c6b797"]);
    ctx.strokeStyle = "rgba(96,72,50,0.8)";
    ctx.lineWidth = 0.04;
    ctx.beginPath();
    ctx.ellipse(x, z, R(0.25, 0.4), R(0.18, 0.28), R(0, 3), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  for (const p of PLOTS) {
    if (p.t === "harvest") {
      ctx.fillStyle = "#c9a85a";
      ctx.fillRect(p.x - p.w / 2, p.z - p.d / 2, p.w, p.d);
      for (let zz = p.z - p.d / 2 + 0.25; zz < p.z + p.d / 2; zz += 0.42)
        for (let xx = p.x - p.w / 2 + 0.2; xx < p.x + p.w / 2; xx += 0.28) {
          ctx.strokeStyle = `rgba(${rng() < 0.5 ? "120,90,40" : "240,215,140"},0.7)`;
          ctx.lineWidth = 0.04;
          ctx.beginPath();
          ctx.moveTo(xx, zz);
          ctx.lineTo(xx + R(-0.05, 0.05), zz - 0.16);
          ctx.stroke();
        }
    } else if (p.t === "paddy") {
      ctx.fillStyle = "#8a7a52";
      ctx.fillRect(p.x - p.w / 2 - 0.3, p.z - p.d / 2 - 0.3, p.w + 0.6, p.d + 0.6);
    } else {
      ctx.fillStyle = "#7a5638";
      ctx.fillRect(p.x - p.w / 2 - 0.2, p.z - p.d / 2 - 0.2, p.w + 0.4, p.d + 0.4);
    }
  }
  w.progress(1);
  return out;
}
