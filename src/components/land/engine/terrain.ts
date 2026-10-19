/**
 * Dựng mặt đất: cao nguyên (cỏ, hoa dại, đá, suối, ao, cầu, đèn lồng, pha lê, thác), vách đá,
 * vùng đồng bằng xa (ruộng, sông, hồ, ba thành phố, xe chạy), mây thấp và vòng sáng của 8 ô đất.
 */
import * as THREE from "three";
import { PB, TAU, add, clamp, cross, h2, hx, jit, mix, mul, mulberry32, noise, norm, randSphere, sc, sstep, SUN, type Vec3 } from "./math";
import { addPoints, meshMat, type Ctx, type DotMaterial, type Dots } from "./render";
import { SPECIES_GEN } from "./species";
import {
  BA,
  BB,
  CITIES,
  CRYSTALS,
  CRYSTAL_POS,
  H,
  LAKES,
  LAMPS,
  LG,
  LH,
  LOW_Y,
  OLEN,
  OPTS,
  PCURVES,
  PG,
  PLOT_POS,
  PR,
  PX,
  PZ,
  RIM,
  ROCK,
  SG,
  SLEN,
  SPTS,
  bridgeAt,
  decoOK,
  gs,
  normalAt,
  pondY,
  ridgeAmt,
  ridgePt,
  shade,
  type Deco,
  type Obstacle,
} from "./world";

/** Đóng dấu một cây công viên vào đám chấm tĩnh của mặt đất */
function stampTree(st: PB, d: Deco, q: number) {
  const r = mulberry32(((d.x * 131 + d.z * 977) | 0) + 9001),
    b = new PB(r);
  SPECIES_GEN[d.id](b, r, q);
  b.bake(r() * TAU);
  const gy = H(d.x, d.z) - 0.02,
    s = d.s;
  for (let i = 0; i < b.n; i++) {
    if (b.T[i] < -0.1) continue;
    const y = b.P[i * 3 + 1];
    st.add(d.x + b.P[i * 3] * s, gy + y * s, d.z + b.P[i * 3 + 2] * s, [b.C[i * 3], b.C[i * 3 + 1], b.C[i * 3 + 2]], b.S[i] * s, 0, b.W[i] * Math.max(0, y) * s * 0.5, b.G[i], b.H[i]);
  }
  d.h = b.maxY * s;
  d.gy = gy;
}

export interface LandBuild {
  /** Lưới ẩn để bắn tia chọn điểm trên mặt đất */
  ground: THREE.Mesh;
  /** Khóm hoa dại (bướm bay tới đậu) */
  flowerSpots: number[][];
  petal: DotMaterial;
  lamp: DotMaterial;
}

export function buildLand(ctx: Ctx, deco: Deco[], obst: Obstacle[]): LandBuild {
  const { D, R, scene, U } = ctx;
  const flowerSpots: number[][] = [];
  const st = new PB(R);
  const meadowA = hx("#1d7a4e"),
    meadowB = hx("#3aa45a"),
    chart = hx("#b4d84b"),
    tealP = hx("#23a08e"),
    soil = hx("#5a3d2b"),
    sand = hx("#dcc196"),
    bank = hx("#1d5648"),
    rockA = hx("#5b5570"),
    rockB = hx("#9a8fb3");
  const NG = Math.floor(66000 * D);
  for (let i = 0; i < NG; i++) {
    const rr = RIM * Math.sqrt(R()),
      a = R() * TAU,
      x = rr * Math.cos(a),
      z = rr * Math.sin(a);
    const sd = gs(SG, x, z),
      pd = Math.hypot(x - PX, z - PZ);
    if (pd < PR - 0.1 || sd < 0.17) continue;
    const y = H(x, z),
      n = normalAt(x, z),
      ra = ridgeAmt(x, z),
      pth = gs(PG, x, z);
    const m = noise(x * 0.45, z * 0.45) * 0.5 + 0.5,
      m2 = noise(x * 1.7 + 5, z * 1.7) * 0.5 + 0.5,
      m3 = noise(x * 0.3 - 7, z * 0.3 + 2);
    let c = mix(meadowA, meadowB, m);
    c = mix(c, chart, sstep(0.55, 0.9, m2) * 0.65);
    if (m3 > 0.35) c = mix(c, tealP, sstep(0.35, 0.7, m3) * 0.7);
    let s = 0.075;
    let plotD = 9;
    for (const p of PLOT_POS) plotD = Math.min(plotD, Math.hypot(x - p[0], z - p[1]));
    if (ra > 0.32) {
      const rk = mix(rockA, rockB, clamp(noise(x * 3, z * 3) * 0.5 + 0.5, 0, 1));
      c = mix(c, rk, sstep(0.32, 0.6, ra));
      s = 0.085;
    }
    if (sd < 0.45 || pd < PR + 0.3) c = mix(bank, hx("#a69a8e"), R() < 0.1 ? 1 : 0);
    if (pth < 0.24 && ra < 0.3) {
      c = jit(sand, R, 0.15);
      s = 0.08;
    }
    if (plotD < 0.62) c = R() < 0.12 ? hx("#a0703f") : jit(soil, R, 0.2);
    st.add(x, y, z, shade(jit(c, R, 0.12), n), s, 0, 0, 0);
    if (ra < 0.3 && sd > 0.5 && pd > PR + 0.35 && pth > 0.3 && plotD > 0.7 && rr < 9.4 && R() < 0.24) {
      const hb = 0.06 + R() * 0.12 * (0.6 + m2),
        lx = (R() - 0.5) * 0.05,
        lz = (R() - 0.5) * 0.05;
      const tip = mix(c, R() < 0.3 ? hx("#e8d36a") : chart, 0.55);
      for (let k = 1; k <= 3; k++) {
        const f = k / 3;
        st.add(x + lx * f * f, y + hb * f, z + lz * f * f, shade(mix(c, tip, f), n, 0.62), 0.05, 0, f * 1.2, 0);
      }
    }
  }
  // hoa dại nhỏ (bướm bay tới)
  const FL = [hx("#e8d7ff"), hx("#ffd0b5"), hx("#fff3d6"), hx("#9fe8ff"), hx("#ffb3c9")];
  for (let c = 0; c < 170 * D; c++) {
    const rr = 8.8 * Math.sqrt(R()),
      a = R() * TAU,
      cx = rr * Math.cos(a),
      cz = rr * Math.sin(a);
    if (ridgeAmt(cx, cz) > 0.3 || gs(SG, cx, cz) < 0.6 || gs(PG, cx, cz) < 0.4 || Math.hypot(cx - PX, cz - PZ) < PR + 0.5) continue;
    const col = FL[Math.floor(R() * FL.length)];
    flowerSpots.push([cx, cz]);
    for (let k = 0; k < 14; k++) {
      const x = cx + (R() - 0.5) * 0.7,
        z = cz + (R() - 0.5) * 0.7;
      let ok = true;
      for (const p of PLOT_POS) if (Math.hypot(x - p[0], z - p[1]) < 0.9) ok = false;
      if (!ok) continue;
      st.add(x, H(x, z) + 0.06 + R() * 0.08, z, jit(col, R, 0.1), 0.05, 0, 1, 0.15);
    }
  }
  // đá tảng trên sườn pha lê
  for (let k = 0; k < 40; k++) {
    const p = ridgePt(R(), (R() - 0.5) * 2.4),
      cx = p[0],
      cz = p[1],
      rad = 0.18 + R() * 0.35,
      cy = H(cx, cz) + rad * 0.2;
    for (let i = 0; i < 170 * rad * D * 3; i++) {
      const n = randSphere(R);
      if (n[1] < -0.3) continue;
      const d = 1 + 0.25 * noise(n[0] * 3 + k, n[2] * 3);
      st.add(cx + n[0] * rad * d, cy + n[1] * rad * d * 0.7, cz + n[2] * rad * d, shade(mix(hx("#4c465f"), hx("#9d90b6"), clamp(n[1] * 0.6 + 0.4 + (R() - 0.5) * 0.3, 0, 1)), n, 0.5), 0.06, 0, 0, 0);
    }
  }
  // tảng đá giữa ao (Bọt nằm sưởi)
  {
    const ry = pondY(ROCK[0], ROCK[1]);
    for (let i = 0; i < 420 * D; i++) {
      const n = randSphere(R);
      if (n[1] < -0.2) continue;
      st.add(ROCK[0] + n[0] * 0.3, ry - 0.06 + n[1] * 0.17, ROCK[1] + n[2] * 0.26, shade(mix(hx("#5d566e"), hx("#b3a9c4"), clamp(n[1] * 0.7 + 0.3, 0, 1)), n, 0.55), 0.05, 0, 0, 0);
    }
  }
  // cây công viên (loài thường)
  for (const d of deco) stampTree(st, d, 0.62 * Math.max(D, 0.7));
  // vài cây chấm tròn kiểu ngoài hành tinh
  const PAL = [
    [hx("#167068"), hx("#5fd0b0")],
    [hx("#6b5aa8"), hx("#e3a6d8")],
  ];
  for (const [tx, tz, kind, scl] of [
    [-8.6, -0.2, 1, 0.9],
    [-1.0, -9.0, 0, 0.8],
    [8.9, -0.8, 1, 0.75],
  ]) {
    if (!decoOK(tx, tz, 0.9)) continue;
    const gy = H(tx, tz),
      th = 0.75 * scl,
      tr = mulberry32(Math.floor(tx * 100 + tz * 7));
    obst.push({ x: tx, z: tz, r: 0.12 });
    for (let i = 0; i < 200 * scl; i++) {
      const h = tr(),
        a = tr() * TAU,
        rad = 0.07 * scl * (1 - 0.3 * h);
      st.add(tx + Math.cos(a) * rad, gy + h * th, tz + Math.sin(a) * rad, shade(jit(hx("#5a4636"), tr, 0.2), [Math.cos(a), 0.2, Math.sin(a)], 0.5), 0.05, 0, h * th * 0.4, 0);
    }
    for (let p = 0; p < 5; p++) {
      const ang = (p / 5) * TAU + tr(),
        off = p === 0 ? 0 : 0.32 * scl,
        pc = [tx + Math.cos(ang) * off, gy + th + 0.38 * scl + (p === 0 ? 0.2 * scl : (tr() - 0.3) * 0.2 * scl), tz + Math.sin(ang) * off],
        pr = (p === 0 ? 0.5 : 0.36 + tr() * 0.1) * scl;
      for (let i = 0; i < 330 * scl * scl * D; i++) {
        const n = randSphere(tr),
          rr = pr * (0.72 + 0.28 * Math.cbrt(tr()));
        const y = pc[1] + n[1] * rr * 0.92;
        st.add(pc[0] + n[0] * rr, y, pc[2] + n[2] * rr, jit(shade(mix(PAL[kind][0], PAL[kind][1], clamp(n[1] * 0.45 + 0.45, 0, 1)), n, 0.5), tr, 0.08), 0.06, 0, (y - gy) * 0.35, 0);
      }
    }
  }
  // đá lát lối đi
  for (const k of [0, 1, 4]) {
    const c = PCURVES[k],
      n = Math.floor(c.getLength() / (k === 4 ? 0.3 : 0.34));
    for (let j = 0; j <= n; j++) {
      const p = c.getPointAt(j / n),
        ox = p.x + (R() - 0.5) * 0.08,
        oz = p.z + (R() - 0.5) * 0.08,
        rx = 0.1 + R() * 0.04,
        rz = 0.08 + R() * 0.04,
        gy = k === 4 ? Math.max(H(ox, oz) + 0.13, H(ox, oz) + 0.04) : H(ox, oz);
      for (let i = 0; i < 70 * D; i++) {
        const a = R() * TAU,
          qq = Math.sqrt(R());
        st.add(ox + Math.cos(a) * qq * rx, gy + 0.035 * (1 - qq * qq) + 0.01, oz + Math.sin(a) * qq * rz, shade(jit(hx("#d8cfdc"), R, 0.12), norm([Math.cos(a) * qq, 1.2, Math.sin(a) * qq]), 0.55), 0.045, 0, 0, 0);
      }
    }
  }
  // cầu vòm
  {
    const bl = Math.hypot(BB[0] - BA[0], BB[1] - BA[1]),
      bp = [-(BB[1] - BA[1]) / bl, (BB[0] - BA[0]) / bl];
    const deck = (s: number) => {
      const x = BA[0] + (BB[0] - BA[0]) * s,
        z = BA[1] + (BB[1] - BA[1]) * s;
      return [x, bridgeAt(x, z).y, z];
    };
    for (let i = 0; i < 1100 * D; i++) {
      const s = R(),
        w = (R() - 0.5) * 0.36,
        p = deck(s);
      const plank = Math.abs(((s * 18) % 1) - 0.5) < 0.08;
      st.add(p[0] + bp[0] * w, p[1], p[2] + bp[1] * w, plank ? hx("#4a2f22") : mix(hx("#8a5a3a"), hx("#d89a6a"), 0.3 + 0.4 * R()), 0.045, 0, 0, 0);
    }
    for (const sd of [-0.19, 0.19]) {
      for (let i = 0; i < 360 * D; i++) {
        const p = deck(R());
        st.add(p[0] + bp[0] * sd, p[1] + 0.22, p[2] + bp[1] * sd, mix(hx("#9a6542"), hx("#e0a070"), 0.4 * R()), 0.035, 0, 0, 0);
      }
      for (let k = 0; k <= 6; k++) {
        const p = deck(k / 6);
        for (let i = 0; i < 14; i++) st.add(p[0] + bp[0] * sd, p[1] + (i / 13) * 0.22, p[2] + bp[1] * sd, hx("#7a4e34"), 0.035, 0, 0, 0);
      }
    }
    for (let i = 0; i < 260 * D; i++) {
      const p = deck(R());
      st.add(p[0] + bp[0] * (R() - 0.5) * 0.3, p[1] - 0.06 - 0.05 * R(), p[2] + bp[1] * (R() - 0.5) * 0.3, hx("#3f281c"), 0.04, 0, 0, 0);
    }
  }
  // cột đèn lồng
  for (const [x, z] of LAMPS) {
    const gy = H(x, z);
    for (let i = 0; i < 40; i++) st.add(x + (R() - 0.5) * 0.03, gy + (i / 39) * 0.62, z + (R() - 0.5) * 0.03, hx("#2e2a2c"), 0.035, 0, 0, 0);
    for (let i = 0; i < 40; i++) {
      const n = randSphere(R);
      st.add(x + n[0] * 0.055, gy + 0.68 + n[1] * 0.07, z + n[2] * 0.055, mix(hx("#ffc66a"), hx("#fff0c4"), R()), 0.035, 0, 0, 1);
    }
    for (let i = 0; i < 16; i++) {
      const a = R() * TAU;
      st.add(x + Math.cos(a) * 0.06, gy + 0.76, z + Math.sin(a) * 0.06, hx("#2e2a2c"), 0.03, 0, 0, 0);
    }
  }
  // vách đá: cao nguyên đổ xuống đồng bằng
  for (let i = 0; i < 24000 * D; i++) {
    const a = R() * TAU,
      t = Math.pow(R(), 0.9),
      cx = Math.cos(a),
      cz = Math.sin(a);
    const top = H(cx * RIM, cz * RIM),
      rb = RIM + 2.4 + 1.6 * (noise(a * 4, 1.3) * 0.5 + 0.5),
      bot = LH(cx * rb, cz * rb) - 0.3;
    const ledge = 0.45 * noise(a * 9, t * 6) + 0.25 * noise(a * 31, t * 17);
    const rr = RIM + (rb - RIM) * t * t + ledge - 0.05,
      y = top + (bot - top) * t;
    const band = Math.sin(y * 1.5 + 2.2 * noise(a * 3, y * 0.25));
    let c = band > 0.5 ? hx("#d9a46e") : band > -0.2 ? hx("#c98a7a") : band > -0.7 ? hx("#8a7a9e") : hx("#6a5a74");
    if (noise(a * 40, y * 2) > 0.55) c = mul(c, 0.6);
    if (t < 0.035) c = mix(hx("#2f8a50"), hx("#9cc65a"), R());
    if (t > 0.8 && R() < 0.3) c = mix(c, hx("#2f5a3a"), 0.6);
    st.add(cx * rr, y, cz * rr, shade(jit(c, R, 0.1), norm([cx, 0.25 + ledge * 0.5, cz]), 0.5), 0.1 + 0.08 * t, 0, 0, 0);
  }
  addPoints(ctx, st, { solid: true }, 0);
  {
    const rings = 26,
      segs = 220,
      pos: number[] = [],
      col: number[] = [],
      idx: number[] = [];
    for (let j = 0; j <= rings; j++) {
      const t = j / rings;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * TAU,
          cx = Math.cos(a),
          cz = Math.sin(a);
        const top = H(cx * RIM, cz * RIM),
          rb = RIM + 2.4 + 1.6 * (noise(a * 4, 1.3) * 0.5 + 0.5),
          bot = LH(cx * rb, cz * rb) - 0.3,
          y = top + (bot - top) * t;
        const rr = RIM + (rb - RIM) * t * t + 0.45 * noise(a * 9, t * 6) - 0.18;
        const band = Math.sin(y * 1.5 + 2.2 * noise(a * 3, y * 0.25));
        const c = band > 0.5 ? hx("#d9a46e") : band > -0.2 ? hx("#c98a7a") : band > -0.7 ? hx("#8a7a9e") : hx("#6a5a74");
        pos.push(cx * rr, y, cz * rr);
        col.push(...shade(mul(c, 0.62), norm([cx, 0.25, cz]), 0.5));
      }
    }
    for (let j = 0; j < rings; j++)
      for (let i = 0; i < segs; i++) {
        const a = j * (segs + 1) + i,
          b = a + segs + 1;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    const m = new THREE.Mesh(g, meshMat(U));
    m.renderOrder = -1;
    scene.add(m);
  }

  // bụi rơi từ mép vách (rất nhẹ)
  const fd = new PB(R);
  for (let i = 0; i < 700 * D; i++) {
    const a = R() * TAU,
      rr = RIM + 0.1;
    fd.add(Math.cos(a) * rr, H(Math.cos(a) * RIM, Math.sin(a) * RIM) - 0.1, Math.sin(a) * rr, mix(hx("#f0b483"), hx("#f29f9a"), R()), 0.04 + R() * 0.03, 0, R(), 0.1, R());
  }
  addPoints(ctx, fd, { defines: { FALL: "" }, add: true }, 3);

  // cánh hoa anh đào rơi
  const pt = new PB(R);
  for (const d of deco) {
    if (d.id !== "anhdao") continue;
    for (let i = 0; i < 120 * D; i++) {
      const a = R() * TAU,
        rr = Math.sqrt(R()) * 0.9 * d.s;
      const y = d.gy + (1.1 + R() * 0.6) * d.s;
      pt.add(d.x + Math.cos(a) * rr, y, d.z + Math.sin(a) * rr, mix(hx("#ffd0e0"), hx("#f6a0c0"), R()), 0.035, 0, y - d.gy, 0, R());
    }
  }
  const petal = addPoints(ctx, pt, { defines: { PETAL: "" } }, 4).material;

  // pha lê (hòa trộn cộng, đã dịu bớt)
  const cr = new PB(R);
  const crystal = (base: Vec3, dir: Vec3, len: number, rad: number, hue: boolean) => {
    const u = norm(cross(dir, Math.abs(dir[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0])),
      v = cross(dir, u);
    const vert = (k: number, h: number) => {
      const a = (k / 6) * TAU;
      return add(add(base, sc(dir, h)), add(sc(u, Math.cos(a) * rad), sc(v, Math.sin(a) * rad)));
    };
    const apex = add(base, sc(dir, len)),
      body = len * 0.75;
    const col = (f: number) => mix(hue ? hx("#5a32d0") : hx("#138fa0"), hue ? hx("#2fbfd0") : hx("#8a5cf0"), f);
    const ne = Math.floor(66 * len * D + 10);
    for (let k = 0; k < 6; k++) {
      for (let i = 0; i < ne; i++) {
        const f = R();
        const p = add(sc(vert(k, 0), 1 - f), sc(vert(k, body), f));
        cr.add(p[0], p[1], p[2], mul(col(f * 0.75), 0.3), 0.04, 0, 0, 0.6);
      }
      for (let i = 0; i < ne * 0.4; i++) {
        const f = R();
        const p = add(sc(vert(k, body), 1 - f), sc(apex, f));
        cr.add(p[0], p[1], p[2], mul(col(0.75 + f * 0.25), 0.36), 0.04, 0, 0, 0.7);
      }
      for (let i = 0; i < ne * 0.6; i++) {
        const f = R(),
          g = R();
        const p0 = add(sc(vert(k, 0), 1 - f), sc(vert(k, body), f)),
          p1 = add(sc(vert(k + 1, 0), 1 - f), sc(vert(k + 1, body), f));
        const p = add(sc(p0, 1 - g), sc(p1, g));
        cr.add(p[0], p[1], p[2], mul(col(f * 0.75), 0.13), 0.045, 0, 0, 0.3);
      }
    }
    for (let i = 0; i < 14; i++) {
      const n = randSphere(R);
      cr.add(apex[0] + n[0] * 0.04, apex[1] + n[1] * 0.04, apex[2] + n[2] * 0.04, [0.45, 0.4, 0.62], 0.05, 0, 0, 1);
    }
  };
  CRYSTAL_POS.forEach(([cx, cz], ci) => {
    const big = ci < CRYSTALS.length,
      hgt = big ? CRYSTALS[ci][2] : 0.45,
      cy = H(cx, cz) - 0.05,
      nC = big ? 4 + Math.floor(R() * 4) : 3;
    for (let k = 0; k < nC; k++) {
      const ph = R() * TAU,
        tilt = k === 0 ? 0.08 : 0.25 + R() * 0.45;
      const dir = norm([Math.cos(ph) * Math.sin(tilt), Math.cos(tilt), Math.sin(ph) * Math.sin(tilt)]);
      crystal([cx + (R() - 0.5) * 0.25, cy, cz + (R() - 0.5) * 0.25], dir, hgt * (k === 0 ? 1 : 0.4 + R() * 0.45), (k === 0 ? 0.13 : 0.07 + R() * 0.05) * (0.7 + hgt * 0.3), R() < 0.5);
    }
  });
  addPoints(ctx, cr, { add: true }, 3);

  // nước: suối, dòng chảy ra, ao (dải sáng trôi)
  const wt = new PB(R);
  const lay = (pts: THREE.Vector3[], len: number, w0: number, w1: number, s0: number) => {
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i],
        u = i / (pts.length - 1),
        q2 = pts[Math.min(pts.length - 1, i + 1)],
        p0 = pts[Math.max(0, i - 1)];
      const tx = q2.x - p0.x,
        tz = q2.z - p0.z,
        tl = Math.hypot(tx, tz) || 1,
        nx = -tz / tl,
        nz = tx / tl,
        w = w0 + (w1 - w0) * u,
        yc = H(p.x, p.z) + 0.12;
      for (let k = 0; k < 24 * D; k++) {
        const v = R() * 2 - 1;
        let c = mix(hx("#0d6a72"), hx("#33d4c6"), (1 - Math.abs(v)) * 0.8 * R() + 0.1);
        if (R() < 0.04) c = hx("#ffcf9a");
        wt.add(p.x + nx * v * w + (R() - 0.5) * 0.04, yc, p.z + nz * v * w + (R() - 0.5) * 0.04, mul(c, 0.75), 0.05, 0, 0, 0.9, (s0 + u * len) * 3.2 - Math.abs(v) * 0.8);
      }
    }
  };
  lay(SPTS, SLEN, 0.2, 0.3, 0);
  lay(OPTS, OLEN, 0.2, 0.26, 0);
  const toSun = Math.atan2(SUN[2], SUN[0]);
  for (let i = 0; i < 6000 * D; i++) {
    const rr = (PR + 0.08) * Math.sqrt(R()),
      a = R() * TAU,
      x = PX + Math.cos(a) * rr,
      z = PZ + Math.sin(a) * rr,
      f = rr / PR;
    let c = mix(hx("#0b4f63"), hx("#2fc9c0"), 0.2 + 0.6 * R() * (1 - f * 0.5));
    const da = Math.abs(((((a - toSun + Math.PI) % TAU) + TAU) % TAU) - Math.PI);
    if (da < 0.18 * (1.2 - f) && R() < 0.8) c = mix(hx("#ffb877"), hx("#ffe0b0"), R());
    wt.add(x, pondY(x, z), z, mul(c, 0.8), 0.05, 0, 0, 0.7, -rr * 9);
  }
  const sp0 = SPTS[0];
  for (let i = 0; i < 380 * D; i++) {
    const a = R() * TAU,
      rr = Math.sqrt(R()) * 0.32;
    wt.add(sp0.x + Math.cos(a) * rr, H(sp0.x, sp0.z) + 0.15, sp0.z + Math.sin(a) * rr, hx("#3fd8c8"), 0.05, 0, 0, 1, R() * 6);
  }
  addPoints(ctx, wt, { add: true, defines: { FLOW: "" } }, 2);
  // bờ ao: bản mẫu thêm các chấm này sau khi mặt đất đã dựng xong nên chúng không hiện ra;
  // vẫn giữ vòng lặp để chuỗi số ngẫu nhiên R() — và do đó toàn bộ thế giới — y hệt bản mẫu
  for (let i = 0; i < 800 * D; i++) {
    const a = R() * TAU,
      rr = PR + 0.1 + R() * 0.12,
      x = PX + Math.cos(a) * rr,
      z = PZ + Math.sin(a) * rr;
    st.add(x, H(x, z) + 0.03, z, shade(jit(hx("#b8aec0"), R, 0.2), [0, 1, 0], 0.55), 0.05, 0, 0, 0);
  }

  // thác đổ khỏi vách + hơi nước
  const wf = new PB(R),
    endA = Math.atan2(OPTS[OPTS.length - 1].z, OPTS[OPTS.length - 1].x);
  for (let i = 0; i < 3200 * D; i++) {
    const a = endA + (R() - 0.5) * 0.05,
      rr = RIM + 0.05;
    wf.add(Math.cos(a) * rr, H(Math.cos(a) * RIM, Math.sin(a) * RIM) + 0.05 - R() * 0.05, Math.sin(a) * rr, mix(hx("#4fc6d0"), hx("#e0fbff"), R()), 0.07 + R() * 0.05, 0, R(), 0.4, R());
  }
  addPoints(ctx, wf, { add: true, defines: { CASCADE: "" } }, 3);
  const ms = new PB(R),
    mb = [Math.cos(endA) * 12.6, Math.sin(endA) * 12.6];
  for (let i = 0; i < 500 * D; i++) {
    const a = R() * TAU,
      rr = Math.sqrt(R()) * 1.4;
    ms.add(mb[0] + Math.cos(a) * rr, LH(mb[0], mb[1]) + 0.6 + R() * 1.2, mb[1] + Math.sin(a) * rr, mul(hx("#c9eef0"), 0.35), 0.2 + R() * 0.15, 0, 0.3 + R() * 0.3, 0.1, R() * 30);
  }
  addPoints(ctx, ms, { add: true, defines: { DRIFT: "" }, opacity: 0.45 }, 4);

  // quầng đèn lồng (chỉ hiện ban đêm)
  const lh = new PB(R);
  for (const [x, z] of LAMPS) {
    const gy = H(x, z);
    for (let i = 0; i < 18; i++) {
      const n = randSphere(R);
      lh.add(x + n[0] * 0.08, gy + 0.68 + n[1] * 0.08, z + n[2] * 0.08, mul(hx("#ff9a3a"), 0.45), 0.13, 0, 0, 0.3);
    }
    for (let i = 0; i < 70; i++) {
      const a = R() * TAU,
        rr = Math.sqrt(R()) * 0.75;
      lh.add(x + Math.cos(a) * rr, H(x + Math.cos(a) * rr, z + Math.sin(a) * rr) + 0.03, z + Math.sin(a) * rr, mul(hx("#ffb04a"), 0.35 * (1 - rr / 0.8)), 0.12, 0, 0, 0);
    }
  }
  const lamp = addPoints(ctx, lh, { add: true, lit: 0, opacity: 0 }, 4).material;

  // lưới ẩn che khuất / bắn tia (chỉ ghi độ sâu)
  const segs = 128,
    rings = 64,
    pos: number[] = [],
    idx: number[] = [];
  for (let j = 0; j <= rings; j++)
    for (let i = 0; i <= segs; i++) {
      const rr = ((RIM - 0.08) * j) / rings,
        a = (i / segs) * TAU,
        x = rr * Math.cos(a),
        z = rr * Math.sin(a);
      pos.push(x, H(x, z) - 0.07, z);
    }
  for (let j = 0; j < rings; j++)
    for (let i = 0; i < segs; i++) {
      const a = j * (segs + 1) + i,
        b = a + segs + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const gg = new THREE.BufferGeometry();
  gg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  gg.setIndex(idx);
  const ground = new THREE.Mesh(gg, new THREE.MeshBasicMaterial({ colorWrite: false, side: THREE.DoubleSide }));
  ground.renderOrder = -1;
  scene.add(ground);
  return { ground, flowerSpots, petal, lamp };
}

/* ================================ đồng bằng, thành phố, mây ================================ */
export interface Traffic {
  pts: number[][];
  s: number;
  v: number;
  off: number;
}
const FIELD = [hx("#c9b45a"), hx("#7fae4a"), hx("#4f9a5a"), hx("#b88a4a"), hx("#a294cf"), hx("#5fae9a"), hx("#d9a07a"), hx("#93b84a")];
function lowColor(x: number, z: number, y: number, rn: number): { c: Vec3; bump: number } {
  const r = Math.hypot(x, z),
    m = sstep(92, 150, r);
  if (m > 0.12) {
    let c = mix(hx("#5f5a7c"), hx("#a49cbc"), rn);
    if (y > LOW_Y + 11 + 3 * noise(x * 0.1, z * 0.1)) c = mix(hx("#f2ece8"), hx("#ffd8d0"), rn * 0.3);
    return { c, bump: 0 };
  }
  for (const ct of CITIES) if (Math.hypot(x - ct.x, z - ct.z) < ct.R + 1.5) return { c: mix(hx("#7a7670"), hx("#a19c92"), rn), bump: 0 };
  if (noise(x * 0.06 + 3, z * 0.06) > 0.2) return { c: mix(hx("#1c4630"), hx("#2f6a3c"), rn), bump: 1 };
  const ca = Math.cos(0.35),
    sa = Math.sin(0.35),
    u = (x * ca - z * sa) / 7,
    v = (x * sa + z * ca) / 7,
    ci = Math.floor(u),
    cj = Math.floor(v);
  let c = FIELD[Math.floor((h2(ci, cj) * 0.5 + 0.5) * FIELD.length) % FIELD.length];
  if ((((u * 3) % 1) + 1) % 1 < 0.5) c = mul(c, 0.9);
  if (Math.abs(u - ci - 0.5) > 0.46 || Math.abs(v - cj - 0.5) > 0.46) c = hx("#3f6a3a");
  return { c, bump: 0 };
}
function isWater(x: number, z: number, r: number) {
  if (gs(LG, x, z) < 0.9 + r * 0.012) return true;
  for (const [lx, lz, lr] of LAKES) if (Math.hypot(x - lx, z - lz) < lr * (0.85 + 0.15 * noise(x * 0.3, z * 0.3))) return true;
  return false;
}
function buildLowBase(ctx: Ctx) {
  const rings = 72,
    segs = 200,
    pos: number[] = [],
    col: number[] = [],
    idx: number[] = [];
  for (let j = 0; j <= rings; j++) {
    const r = j === 0 ? 0 : 11.4 * Math.pow(195 / 11.4, (j - 1) / (rings - 1));
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * TAU,
        x = r * Math.cos(a),
        z = r * Math.sin(a),
        y = LH(x, z);
      let c = isWater(x, z, r) ? hx("#24505e") : lowColor(x, z, y, 0.5).c;
      c = mix(mul(c, 0.72), [0.6, 0.72, 0.8], sstep(25, 175, r) * 0.35);
      pos.push(x, y - 0.12, z);
      col.push(...c);
    }
  }
  for (let j = 0; j < rings; j++)
    for (let i = 0; i < segs; i++) {
      const a = j * (segs + 1) + i,
        b = a + segs + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aColor", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  const mesh = new THREE.Mesh(g, meshMat(ctx.U));
  mesh.renderOrder = -1;
  ctx.scene.add(mesh);
}

export interface LowlandsBuild {
  /** Đèn xe chạy trên đường (di chuyển bằng CPU) */
  traffic: Dots;
  trafficList: Traffic[];
}

export function buildLowlands(ctx: Ctx): LowlandsBuild {
  const { D, R } = ctx;
  buildLowBase(ctx);
  const trafficList: Traffic[] = [];
  const lw = new PB(R),
    lk = new PB(R),
    win = new PB(R);
  const NL = Math.floor(46000 * D);
  for (let i = 0; i < NL; i++) {
    const r = 11.8 * Math.pow(178 / 11.8, Math.pow(R(), 0.8)),
      a = R() * TAU,
      x = r * Math.cos(a),
      z = r * Math.sin(a),
      s = 0.07 + r * 0.0075;
    if (isWater(x, z, r)) {
      lk.add(x, LH(x, z) + 0.95, z, [0.8 + 0.3 * R(), 0.6 + 0.6 * R(), 0.8], s, 0, 0, 0, R() * 6);
      continue;
    }
    let y = LH(x, z);
    const lc = lowColor(x, z, y, R());
    let c = lc.c;
    if (lc.bump) y += 0.4 + R() * 0.9;
    const e = 1.5,
      nn = norm([-(LH(x + e, z) - LH(x - e, z)) / (2 * e), 1, -(LH(x, z + e) - LH(x, z - e)) / (2 * e)]);
    c = mix(shade(jit(c, R, 0.1), nn, 0.55), [0.6, 0.72, 0.8], sstep(25, 175, r) * 0.35);
    lw.add(x, y, z, c, s, 0, 0, 0);
  }
  // đường nối các thành phố (và cầu qua sông)
  const roads: [{ x: number; z: number }, { x: number; z: number }][] = [
    [CITIES[0], CITIES[2]],
    [CITIES[0], CITIES[1]],
    [CITIES[2], { x: -30, z: 30 }],
    [CITIES[1], { x: 80, z: 10 }],
    [CITIES[0], { x: -20, z: -110 }],
  ];
  roads.forEach(([A, B], ri) => {
    const pts: number[][] = [];
    const n = Math.floor(Math.hypot(B.x - A.x, B.z - A.z) / 0.6);
    for (let i = 0; i <= n; i++) {
      const t = i / n,
        x = A.x + (B.x - A.x) * t + Math.sin(t * Math.PI * 2 + ri) * 4 * Math.sin(Math.PI * t),
        z = A.z + (B.z - A.z) * t + Math.cos(t * Math.PI * 2 + ri) * 3 * Math.sin(Math.PI * t);
      const wet = gs(LG, x, z) < 2.5;
      const y = wet ? LOW_Y + 1.6 : LH(x, z) + 0.15;
      pts.push([x, y, z]);
      for (let k = 0; k < 2; k++) lw.add(x + (R() - 0.5) * 0.5, y, z + (R() - 0.5) * 0.5, wet ? hx("#8a7a6a") : hx("#9a948a"), 0.4, 0, 0, 0);
      if (wet && i % 2 === 0) for (let k = 0; k < 4; k++) lw.add(x, y - 0.3 - k * 0.35, z, hx("#6a5f58"), 0.35, 0, 0, 0);
    }
    for (let k = 0; k < 26 * Math.max(D, 0.6); k++) trafficList.push({ pts, s: R(), v: ((0.012 + R() * 0.02) * (R() < 0.5 ? 1 : -1) * 30) / pts.length, off: (R() - 0.5) * 0.3 });
  });
  // thành phố: nhà chọc trời bằng chấm, có lưới cửa sổ
  for (const ct of CITIES) {
    const cr = mulberry32(((ct.x * 7 + ct.z * 13) | 0) + 77);
    for (let b = 0; b < ct.n; b++) {
      const ang = cr() * TAU,
        rr = ct.R * Math.pow(cr(), 0.7),
        bx = ct.x + Math.cos(ang) * rr,
        bz = ct.z + Math.sin(ang) * rr;
      if (gs(LG, bx, bz) < 2.6) continue;
      const w = 0.9 + cr() * 1.5,
        d = 0.9 + cr() * 1.5,
        hh = (1.0 + cr() * cr() * 6) * (1.4 - rr / ct.R),
        by = LH(bx, bz) - 0.2;
      const tint = [hx("#a8b0bc"), hx("#c9c2b4"), hx("#8fa6b8"), hx("#b9a8c0")][(cr() * 4) | 0];
      for (let f = 0; f < 4; f++) {
        const L = f % 2 ? d : w,
          nx = [1, 0, -1, 0][f],
          nz = [0, 1, 0, -1][f],
          tx = -nz,
          tz = nx,
          off = (f % 2 ? w : d) / 2;
        const cols = Math.max(2, Math.round(L / 0.42)),
          rows = Math.max(2, Math.round(hh / 0.5));
        for (let i = 0; i < cols; i++)
          for (let j = 0; j < rows; j++) {
            const u = (i + 0.5) / cols - 0.5,
              px = bx + nx * off + tx * u * L,
              pz = bz + nz * off + tz * u * L,
              py = by + ((j + 0.5) / rows) * hh;
            const lit = cr() < 0.38;
            win.add(px, py, pz, lit ? (cr() < 0.75 ? hx("#ffd28a") : hx("#cfe8ff")) : mul(tint, 0.55), 0.22, 0, 0, lit ? 1 : 0, cr() * 6.28);
          }
        for (let j = 0; j <= rows; j++) {
          const py = by + (j / rows) * hh;
          win.add(bx + nx * off + (tx * L) / 2, py, bz + nz * off + (tz * L) / 2, tint, 0.24, 0, 0, 0);
        }
      }
      for (let i = 0; i < 12; i++) win.add(bx + (cr() - 0.5) * w, by + hh + 0.05, bz + (cr() - 0.5) * d, mul(tint, 0.8), 0.32, 0, 0, 0);
      if (cr() < 0.25) win.add(bx, by + hh + 0.4, bz, hx("#ff5a4a"), 0.35, 0, 0, 1, cr() * 6);
    }
    if (ct.spire) {
      const by = LH(ct.x, ct.z),
        HS = 26;
      for (let i = 0; i < 1800 * Math.max(D, 0.6); i++) {
        const s = R(),
          a = R() * TAU,
          rr = 1.1 * Math.pow(1 - s, 1.8) + 0.07;
        const ring = (s * 22) % 1 < 0.07;
        win.add(ct.x + Math.cos(a) * rr, by + s * HS, ct.z + Math.sin(a) * rr, ring ? hx("#8ff5ff") : mix(hx("#dfe6ee"), hx("#a9b6c8"), R()), 0.2, 0, 0, ring ? 1 : 0, s * 40);
      }
      for (let i = 0; i < 30; i++) {
        const n = randSphere(R);
        win.add(ct.x + n[0] * 0.25, by + HS + 0.4 + n[1] * 0.25, ct.z + n[2] * 0.25, hx("#c8fbff"), 0.35, 0, 0, 1, 1);
      }
    }
  }
  addPoints(ctx, lw, { solid: true }, 0);
  addPoints(ctx, lk, { solid: true, defines: { REFLECT: "" } }, 0);
  addPoints(ctx, win, { solid: true, defines: { WINDOWS: "" } }, 0);
  // lớp mây thấp
  const cl = new PB(R);
  for (let c = 0; c < 42 * D; c++) {
    const r = 15 + Math.pow(R(), 1.4) * 80,
      a = R() * TAU,
      cx = r * Math.cos(a),
      cz = r * Math.sin(a),
      cy = -10 + R() * 2.6,
      crd = 1.5 + R() * 3.6;
    for (let i = 0; i < crd * crd * 13; i++) {
      const d = randSphere(R),
        rr = crd * Math.cbrt(R());
      cl.add(cx + d[0] * rr * 1.6, cy + d[1] * rr * 0.42, cz + d[2] * rr * 1.6, mix(hx("#b6b1cc"), hx("#fbf7f2"), clamp(d[1] * 0.6 + 0.5, 0, 1)), 0.45 + R() * 0.6, 0, 0, 0);
    }
  }
  addPoints(ctx, cl, { opacity: 0.38 }, 5);
  // xe chạy (di chuyển bằng CPU)
  const tb = new PB(R);
  for (const t of trafficList) tb.add(0, 0, 0, t.v > 0 ? hx("#fff2d0") : hx("#ff6a5a"), 0.3, 0, 0, 1);
  const traffic = addPoints(ctx, tb, { add: true, lit: 0 }, 4);
  traffic.frustumCulled = false;
  return { traffic, trafficList };
}

/** Vòng sáng đánh dấu một ô đất */
export interface PlotRing {
  i: number;
  x: number;
  z: number;
  y: number;
  ring: Dots;
}

export function buildPlots(ctx: Ctx): PlotRing[] {
  const { R } = ctx;
  return PLOT_POS.map(([px, pz], i) => {
    const b = new PB(R),
      y = H(px, pz);
    for (let k = 0; k < 220; k++) {
      const a = (k / 220) * TAU + R() * 0.02,
        rr = 0.82 + (R() - 0.5) * 0.06,
        x = px + Math.cos(a) * rr,
        z = pz + Math.sin(a) * rr;
      b.add(x - px, H(x, z) + 0.05 - y, z - pz, mix(hx("#f3e2b8"), hx("#bff6ec"), (Math.sin(a * 3) + 1) / 2), 0.055, 0, 0, 0.6, a * 4);
    }
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * TAU;
      for (let j = 0; j < 8; j++) {
        const rr = 0.9 + j * 0.012,
          x = px + Math.cos(a) * rr,
          z = pz + Math.sin(a) * rr;
        b.add(x - px, H(x, z) + 0.06 - y, z - pz, hx("#fff2cf"), 0.06, 0, 0, 1);
      }
    }
    const ring = addPoints(ctx, b, { add: true, opacity: 0.5, lit: 0 }, 3);
    ring.position.set(px, y, pz);
    return { i, x: px, z: pz, y, ring };
  });
}
