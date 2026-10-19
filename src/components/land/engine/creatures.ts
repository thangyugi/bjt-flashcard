/**
 * Hình đám chấm của sinh vật: chia thành các "bộ phận" (đầu, chân, cánh…) để engine gắn khớp và cử động.
 * Thuần toán, không import three.
 */
import { PB, SUN, TAU, blade, clamp, dot, hx, jit, mix, norm, randSphere, tube, type Rand, type Vec3 } from "./math";

export interface Part {
  n: string;
  b: PB;
  p: Vec3;
}
const PART = (n: string, b: PB, p: Vec3): Part => ({ n, b, p });

/** Gộp các bộ phận về một đám chấm (để vẽ ảnh thu nhỏ) */
export function mergeParts(b: PB, parts: Part[]) {
  for (const pt of parts) {
    const s = pt.b;
    for (let i = 0; i < s.n; i++)
      b.add(s.P[i * 3] + pt.p[0], s.P[i * 3 + 1] + pt.p[1], s.P[i * 3 + 2] + pt.p[2], [s.C[i * 3], s.C[i * 3 + 1], s.C[i * 3 + 2]], s.S[i], 0, 0, s.G[i]);
  }
}

function puffInto(b: PB, r: Rand, cx: number, cy: number, cz: number, R0: number, n: number, cols: Vec3[], glow = 0, tint: Vec3 | null = null) {
  for (let i = 0; i < n; i++) {
    const d = randSphere(r),
      rr = R0 * (0.78 + 0.22 * Math.cbrt(r()));
    let c = mix(cols[0], cols[1], clamp(d[1] * 0.6 + 0.62, 0, 1));
    c = mix(c, cols[2], Math.max(0, dot(d, SUN)) * 0.45);
    if (tint) c = mix(c, tint, 0.35 * r());
    b.add(cx + d[0] * rr, cy + d[1] * rr, cz + d[2] * rr, jit(c, r, 0.05), 0.024, 0, 0, glow);
  }
}

/** Mochi — cáo mây */
export function mochiParts(r: Rand, q: number): Part[] {
  const C3 = [hx("#beb7e0"), hx("#fff4ea"), hx("#ffc2ad")],
    cream = C3[1];
  const body = new PB(r),
    head = new PB(r),
    tail = new PB(r);
  puffInto(body, r, -0.08, 0.19, 0, 0.13, 520 * q, C3);
  puffInto(body, r, 0.06, 0.2, 0, 0.12, 480 * q, C3);
  puffInto(body, r, 0.15, 0.25, 0, 0.1, 340 * q, C3);
  puffInto(head, r, 0.05, 0.05, 0, 0.095, 380 * q, C3);
  puffInto(head, r, 0.07, 0.02, 0.05, 0.06, 130 * q, C3);
  puffInto(head, r, 0.07, 0.02, -0.05, 0.06, 130 * q, C3);
  puffInto(head, r, 0.15, 0.03, 0, 0.045, 110 * q, C3);
  for (const z of [-0.055, 0.055])
    for (let i = 0; i < 110 * q; i++) {
      const h = r(),
        a = r() * TAU,
        R0 = 0.04 * (1 - h);
      head.add(0.04 + Math.cos(a) * R0 * 0.6, 0.11 + h * 0.13, z + Math.sin(a) * R0 + z * 0.2 * h, Math.cos(a) > 0.3 ? hx("#f7a7b8") : cream, 0.02, 0, 0, 0);
    }
  for (const z of [-0.036, 0.036]) for (let i = 0; i < 10; i++) head.add(0.13 + r() * 0.012, 0.07 + r() * 0.012, z + (r() - 0.5) * 0.012, hx("#2a2232"), 0.018, 0, 0, 0);
  for (let i = 0; i < 8; i++) head.add(0.19, 0.035 + r() * 0.01, (r() - 0.5) * 0.015, hx("#3a2a36"), 0.018, 0, 0, 0);
  const legs = [0, 1, 2, 3].map(() => {
    const l = new PB(r);
    tube(l, r, (s) => [0, -0.13 * s, 0], 50 * q, 0.026, mix(cream, C3[0], 0.35), 0.022, () => 0);
    puffInto(l, r, 0.01, -0.135, 0, 0.03, 30, C3);
    return l;
  });
  for (let k = 0; k < 7; k++) {
    const s = k / 6;
    puffInto(tail, r, -0.26 * s, 0.32 * Math.pow(s, 1.3), 0.05 * Math.sin(s * 3), 0.07 + 0.05 * Math.sin(Math.PI * s), 150 * q, C3, s > 0.8 ? 0.6 : 0, s > 0.6 ? hx("#a6f2ff") : null);
  }
  return [
    PART("body", body, [0, 0, 0]),
    PART("head", head, [0.2, 0.28, 0]),
    PART("leg0", legs[0], [0.1, 0.14, 0.06]),
    PART("leg1", legs[1], [0.1, 0.14, -0.06]),
    PART("leg2", legs[2], [-0.12, 0.14, 0.06]),
    PART("leg3", legs[3], [-0.12, 0.14, -0.06]),
    PART("tail", tail, [-0.2, 0.22, 0]),
  ];
}

/** Bọt — rùa biển sao */
export function botParts(r: Rand, q: number): Part[] {
  const body = new PB(r),
    rip = new PB(r);
  for (let i = 0; i < 1500 * q; i++) {
    const n = randSphere(r);
    if (n[1] < 0) n[1] = -n[1];
    const x = n[0] * 0.24,
      z = n[2] * 0.19,
      y = 0.02 + n[1] * 0.1,
      rho = Math.hypot(x / 0.24, z / 0.19),
      phi = Math.atan2(z / 0.19, x / 0.24);
    const rs = 0.32 + 0.42 * Math.pow(Math.abs(Math.cos(2.5 * phi)), 4);
    let c = mix(hx("#14505c"), hx("#2a8c96"), n[1]),
      g = 0;
    if ((Math.abs(Math.sin(x * 40)) < 0.12 || Math.abs(Math.sin(z * 44 + x * 20)) < 0.1) && rho > rs) c = hx("#0d3a44");
    if (rho < rs) {
      c = mix(hx("#ffd36b"), hx("#fff1bf"), 1 - rho / rs);
      g = 0.7;
    } else if (r() < 0.05) {
      c = hx("#d6ecff");
      g = 1;
    }
    body.add(x, y, z, jit(c, r, 0.06), 0.022, 0, 0, g);
  }
  for (let i = 0; i < 160 * q; i++) {
    const n = randSphere(r);
    body.add(0.29 + n[0] * 0.06, 0.04 + n[1] * 0.05, n[2] * 0.05, jit(hx("#6bb8a3"), r, 0.1), 0.02, 0, 0, 0);
  }
  for (const z of [-0.025, 0.025]) body.add(0.335, 0.06, z, hx("#13202a"), 0.022, 0, 0, 0);
  const fl = [
    [0.1, 0.13, 0.18, 0.05, 0.5],
    [0.1, -0.13, 0.18, 0.05, 0.5],
    [-0.16, 0.11, 0.09, 0.035, 0.9],
    [-0.16, -0.11, 0.09, 0.035, 0.9],
  ].map(([x, z, L, W, back], i) => {
    const f = new PB(r),
      s = Math.sign(z),
      d = norm([-back, -0.05, s]),
      side = [d[2], 0, -d[0]];
    blade(f, r, 140 * q, [0, 0, 0], d, side, [0, 1, 0], L, W, () => jit(hx("#4f9c8c"), r, 0.12), 0.019, 0, 0);
    return PART("fl" + i, f, [x, 0.02, z]);
  });
  for (let i = 0; i < 160 * q; i++) {
    const a = r() * TAU;
    rip.add(Math.cos(a) * 0.36, -0.005, Math.sin(a) * 0.3, hx("#2a8f8c"), 0.016, 0, 0, 0.8, a * 3);
  }
  return [PART("body", body, [0, 0, 0]), ...fl, PART("rip", rip, [0, 0, 0])];
}

/** Thỏ tai sương */
export function genRabbit(b: PB, r: Rand, q: number) {
  const fur = hx("#c9b8a6"),
    furL = hx("#efe6dc");
  for (let i = 0; i < 520 * q; i++) {
    const n = randSphere(r);
    b.add(-0.02 + n[0] * 0.1, 0.08 + n[1] * 0.072, n[2] * 0.07, jit(mix(fur, furL, clamp(n[1] * 0.5 + 0.5 - n[0] * 0.2, 0, 1)), r, 0.06), 0.02, 0, 0, 0);
  }
  for (let i = 0; i < 240 * q; i++) {
    const n = randSphere(r);
    b.add(0.09 + n[0] * 0.05, 0.135 + n[1] * 0.045, n[2] * 0.045, jit(mix(fur, furL, clamp(n[1] * 0.5 + 0.4, 0, 1)), r, 0.06), 0.018, 0, 0, 0);
  }
  for (const z of [-0.022, 0.022])
    for (let i = 0; i < 70 * q; i++) {
      const u = r(),
        a = r() * TAU;
      const w = 0.018 * Math.sin(Math.PI * Math.max(u, 0.1));
      b.add(0.075 - u * 0.03 + Math.cos(a) * w * 0.4, 0.17 + u * 0.1, z * (1 + u * 0.6) + Math.sin(a) * w, Math.cos(a) > 0.4 ? hx("#f2b3bd") : fur, 0.016, 0, 0, 0);
    }
  for (let i = 0; i < 60 * q; i++) {
    const n = randSphere(r);
    b.add(-0.125 + n[0] * 0.03, 0.1 + n[1] * 0.03, n[2] * 0.03, hx("#fffaf2"), 0.018, 0, 0, 0.5);
  }
  for (const z of [-0.025, 0.025]) b.add(0.125, 0.15, z, hx("#1e1a22"), 0.016, 0, 0, 0);
}

/** Bướm lụa */
export function butterflyParts(r: Rand, pal: string[]): Part[] {
  const body = new PB(r),
    wl = new PB(r),
    wr = new PB(r);
  tube(body, r, (s) => [-0.045 + 0.08 * s, 0, 0], 40, 0.006, hx("#2a2230"), 0.012, () => 0);
  for (const [w, sg] of [
    [wl, 1],
    [wr, -1],
  ] as [PB, number][]) {
    for (let i = 0; i < 150; i++) {
      const fore = r() < 0.6,
        cx = fore ? 0.015 : -0.02,
        cz = fore ? 0.055 : 0.04,
        rx = fore ? 0.035 : 0.028,
        rz = fore ? 0.055 : 0.04;
      const a = r() * TAU,
        rr = Math.sqrt(r());
      const edge = rr > 0.82;
      const c = edge ? hx(pal[1]) : rr < 0.35 && r() < 0.3 ? mix(hx(pal[0]), [1, 1, 1], 0.4) : hx(pal[0]);
      w.add(cx + Math.cos(a) * rx * rr, 0, sg * (cz + Math.sin(a) * rz * rr), jit(c, r, 0.08), 0.012, 0, 0, edge ? 0 : 0.25);
    }
  }
  return [PART("body", body, [0, 0, 0]), PART("wl", wl, [0, 0.004, 0]), PART("wr", wr, [0, 0.004, 0])];
}

/** Chuồn chuồn pha lê */
export function genDragonfly(b: PB, r: Rand) {
  tube(b, r, (s) => [-0.13 + 0.19 * s, 0, 0], 60, (s) => 0.006 + 0.006 * s, (s) => mix(hx("#7a5bd6"), hx("#3fb6d8"), s), 0.012, () => 0);
  for (const z of [-0.012, 0.012]) for (let i = 0; i < 8; i++) b.add(0.065 + r() * 0.01, 0.005, z, hx("#6ff0b0"), 0.014, 0, 0, 0.4);
  for (const [x, zs, L, back] of [
    [0.02, 1, 0.12, 0.08],
    [0.02, -1, 0.12, 0.08],
    [-0.005, 1, 0.11, 0.3],
    [-0.005, -1, 0.11, 0.3],
  ]) {
    const d = norm([-back, 0.04, zs]),
      side = [d[2], 0, -d[0]];
    blade(b, r, 70, [x, 0.008, 0], d, side, [0, 1, 0], L, 0.026, (u) => mix(hx("#9fe6ff"), hx("#e3c4ff"), u), 0.011, 0, 0, { edge: 0.6, glow: 0.6 });
  }
}

/** Lữ khách — nhân vật của người học */
export function avatarParts(r: Rand, q: number): Part[] {
  const coat = hx("#2f7f78"),
    coatD = hx("#1f5c57"),
    skin = hx("#f2c6a0"),
    pants = hx("#3a4766"),
    boot = hx("#5a3a26"),
    scarf = hx("#e2553a"),
    hat = hx("#d9b77a"),
    band = hx("#7a3f2a"),
    bag = hx("#8a5a32"),
    hair = hx("#3a2a22");
  const body = new PB(r);
  for (let i = 0; i < 760 * q; i++) {
    const n = randSphere(r);
    let x = n[0] * 0.085,
      z = n[2] * 0.095;
    const y = 0.34 + n[1] * 0.11;
    if (n[1] < 0) {
      x *= 1 - n[1] * 0.3;
      z *= 1 - n[1] * 0.3;
    }
    let c = mix(coatD, coat, clamp(n[1] * 0.4 + 0.55 + n[0] * 0.3, 0, 1));
    if (n[0] > 0.9 && Math.abs(n[2]) < 0.25 && ((n[1] + 1) * 3) % 1 < 0.25) c = hx("#e8c46a");
    body.add(x, y, z, jit(c, r, 0.05), 0.022, 0, 0, 0);
  }
  for (let i = 0; i < 560 * q; i++) {
    const n = randSphere(r);
    let c = skin;
    if (n[0] < -0.05 || n[1] > 0.45) c = hair;
    if (n[0] > 0.55 && Math.abs(n[2]) > 0.45 && n[1] < 0.05 && n[1] > -0.5) c = hx("#f29a88");
    body.add(n[0] * 0.085, 0.535 + n[1] * 0.082, n[2] * 0.082, jit(c, r, 0.04), 0.02, 0, 0, 0);
  }
  for (const z of [-0.03, 0.03]) for (let i = 0; i < 7; i++) body.add(0.083 + r() * 0.004, 0.545 + r() * 0.012, z + (r() - 0.5) * 0.01, hx("#1e1a22"), 0.016, 0, 0, 0);
  for (let i = 0; i < 380 * q; i++) {
    const a = r() * TAU,
      rr = 0.07 + Math.sqrt(r()) * 0.08;
    body.add(Math.cos(a) * rr, 0.6 - (rr - 0.07) * 0.25, Math.sin(a) * rr, jit(hat, r, 0.08), 0.02, 0, 0, 0);
  }
  for (let i = 0; i < 280 * q; i++) {
    const n = randSphere(r);
    if (n[1] < 0) n[1] = -n[1];
    body.add(n[0] * 0.068, 0.6 + n[1] * 0.065, n[2] * 0.068, n[1] < 0.28 ? band : jit(hat, r, 0.08), 0.02, 0, 0, 0);
  }
  for (let i = 0; i < 220 * q; i++) {
    const a = r() * TAU,
      h = r();
    body.add(Math.cos(a) * 0.07, 0.445 + (h - 0.5) * 0.04, Math.sin(a) * 0.075, jit(((h * 4) | 0) % 2 ? scarf : hx("#f08a4a"), r, 0.06), 0.022, 0, 0, 0);
  }
  for (let i = 0; i < 180 * q; i++) {
    const x = (r() - 0.5) * 0.09,
      y = 0.25 + (r() - 0.5) * 0.08,
      z = 0.105 + r() * 0.035;
    body.add(x, y, z, jit(y > 0.27 ? mix(bag, hx("#b07a48"), 0.5) : bag, r, 0.08), 0.02, 0, 0, 0);
  }
  tube(body, r, (s) => [0.085 + 0.012 * Math.sin(Math.PI * s), 0.44 - 0.16 * s, -0.075 + 0.18 * s], 60 * q, 0.006, hx("#5a3a22"), 0.014, () => 0);
  for (let i = 0; i < 26; i++) {
    const n = randSphere(r);
    body.add(0.0 + n[0] * 0.022, 0.2 + n[1] * 0.028, 0.16 + n[2] * 0.022, mix(hx("#ffcf7a"), hx("#fff1c8"), r()), 0.018, 0, 0, 1);
  }
  for (let i = 0; i < 10; i++) body.add((r() - 0.5) * 0.03, 0.235, 0.16 + (r() - 0.5) * 0.03, hx("#3a3030"), 0.014, 0, 0, 0);
  const leg = () => {
    const l = new PB(r);
    tube(l, r, (s) => [0, -0.21 * s, 0], 80 * q, 0.03, pants, 0.02, () => 0);
    for (let i = 0; i < 60 * q; i++) {
      const n = randSphere(r);
      l.add(0.02 + n[0] * 0.045, -0.225 + n[1] * 0.024, n[2] * 0.032, jit(boot, r, 0.1), 0.02, 0, 0, 0);
    }
    return l;
  };
  const arm = () => {
    const a = new PB(r);
    tube(a, r, (s) => [0.01 * s, -0.15 * s, 0], 60 * q, 0.026, coat, 0.02, () => 0);
    for (let i = 0; i < 20; i++) {
      const n = randSphere(r);
      a.add(0.012 + n[0] * 0.022, -0.168 + n[1] * 0.022, n[2] * 0.022, skin, 0.018, 0, 0, 0);
    }
    return a;
  };
  const tail = new PB(r);
  for (let i = 0; i < 160 * q; i++) {
    const u = r(),
      w = (r() - 0.5) * 0.035;
    tail.add(-0.02 - 0.13 * u, -0.03 * u - 0.07 * u * u + w * 0.3, 0.03 * Math.sin(u * 3) + w, jit(((u * 5) | 0) % 2 ? scarf : hx("#f08a4a"), r, 0.06), 0.02, 0, 0, 0);
  }
  return [
    PART("body", body, [0, 0, 0]),
    PART("legL", leg(), [0, 0.245, 0.045]),
    PART("legR", leg(), [0, 0.245, -0.045]),
    PART("armL", arm(), [0, 0.43, 0.105]),
    PART("armR", arm(), [0, 0.43, -0.105]),
    PART("scarf", tail, [-0.06, 0.45, 0.02]),
  ];
}

export const BF_PAL = [
  ["#ff9a2a", "#2a1a10"],
  ["#3a8cff", "#10162a"],
  ["#ffe066", "#3a3010"],
  ["#ff8ac2", "#3a1028"],
  ["#9df2e0", "#123a34"],
  ["#c9a6ff", "#2a1a3a"],
];

/** id sinh vật → hình gộp (dùng cho ảnh thu nhỏ trong Sổ tay) */
export const CREATURE_GEN: Record<string, (b: PB, r: Rand, q: number) => void> = {
  mochi: (b, r, q) => mergeParts(b, mochiParts(r, q)),
  bot: (b, r, q) => mergeParts(b, botParts(r, q)),
  tho: (b, r, q) => genRabbit(b, r, q),
  buom: (b, r) => mergeParts(b, butterflyParts(r, BF_PAL[1])),
  chuon: (b, r) => genDragonfly(b, r),
  chim: (b) => {
    for (let i = 0; i < 40; i++) {
      const u = (i / 39) * 2 - 1;
      b.add(u * 0.2, -Math.abs(u) * 0.06 + 0.06, 0, hx("#2a2a3a"), 0.03, 0, 0, 0);
    }
  },
};
