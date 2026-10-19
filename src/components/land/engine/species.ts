/**
 * Bộ sinh hình (đám chấm) cho từng loài cây — toạ độ cục bộ, trục y hướng lên.
 * Thuần toán, không import three.
 */
import {
  FW,
  GA,
  PB,
  RT,
  SUN,
  TAU,
  add,
  blade,
  clamp,
  cross,
  hsl,
  hx,
  jit,
  mix,
  mul,
  norm,
  randSphere,
  sc,
  seedDots,
  sstep,
  tube,
  type Rand,
  type Vec3,
} from "./math";

export type Gen = (b: PB, r: Rand, q: number) => void;

function genLanHai(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const dk = hx("#1d3a25"),
    lt = hx("#6f9b55"),
    rib = hx("#a9c97c");
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU + r() * 0.4,
      L = 0.34 + r() * 0.1,
      W = 0.08 + r() * 0.015;
    const d = [Math.cos(a), 0, Math.sin(a)],
      sd = [-Math.sin(a), 0, Math.cos(a)];
    const N = Math.floor(320 * q);
    for (let k = 0; k < N; k++) {
      const u = r(),
        v = r() * 2 - 1;
      const w = W * Math.pow(Math.sin(Math.PI * Math.max(u, 0.04)), 0.65);
      const al = u * L,
        x = d[0] * al + sd[0] * v * w,
        z = d[2] * al + sd[2] * v * w,
        y = 0.02 + 0.2 * u - 0.21 * u * u + 0.012 * (1 - v * v);
      const m = Math.sin(al * 70 + v * 6 + i) * Math.sin(al * 42 - v * 11) > 0.05;
      let c = m ? lt : dk;
      let s = 0.022;
      if (Math.abs(v) < 0.1) {
        c = rib;
        s = 0.024;
      }
      b.add(x, Math.max(0.01, y), z, jit(c, r, 0.15), s, 0.2 + 0.4 * u, 1, 0);
    }
  }
  tube(b, r, (s) => [0.05 * s * s, 0.03 + 0.57 * s, 0.05 * s * s + 0.012 * Math.sin(s * 5)], 160 * q, 0.009, (s) => mix(hx("#3f5a2e"), hx("#6a3a4f"), s), 0.017, (s) => 0.18 + 0.4 * s);
  const F = [0.05, 0.6, 0.05],
    S = 1.3;
  const P = (X: number, Y: number, Z: number): Vec3 => [F[0] + (RT[0] * X + FW[0] * Z) * S, F[1] + Y * S, F[2] + (RT[2] * X + FW[2] * Z) * S];
  // túi môi
  const Np = 900 * q;
  for (let k = 0; k < Np; k++) {
    const n = randSphere(r);
    if (n[1] > 0.5) continue;
    const p = P(n[0] * 0.062, -0.085 + n[1] * 0.07, 0.05 + n[2] * 0.066);
    let c = mix(hx("#7a1646"), hx("#d24c8a"), clamp(((n[1] + 1) / 2) * 1.1, 0, 1));
    if (n[2] > 0.4 && n[1] > -0.3) c = mix(c, hx("#f9b3d0"), 0.6 * (n[2] - 0.4));
    if (n[1] > 0.38) c = hx("#ef7bb0");
    b.add(p[0], p[1], p[2], jit(c, r, 0.08), 0.019, 0.8 + 0.12 * r(), 1, 0);
  }
  // cánh bên
  for (const side of [-1, 1]) {
    const N = 520 * q,
      L = 0.17,
      W = 0.07,
      dx = side * 0.94,
      dy = -0.34;
    for (let k = 0; k < N; k++) {
      const u = r(),
        v = r() * 2 - 1,
        w = W * Math.pow(Math.sin(Math.PI * Math.max(u, 0.05)), 0.55);
      const X = side * 0.02 + dx * u * L + -dy * v * w,
        Y = dy * u * L + dx * v * w * side,
        Z = 0.025 + 0.045 * u - 0.02 * v * v;
      let c = mix(hx("#e889b2"), hx("#f8d2e2"), sstep(0.55, 1, Math.abs(v)));
      if (Math.abs((((v + 1) * 3.5) % 1) - 0.5) < 0.1) c = hx("#b4407a");
      if (u < 0.3 && r() < 0.25) c = hx("#8a2457");
      const p = P(X, Y, Z);
      b.add(p[0], p[1], p[2], jit(c, r, 0.06), 0.017, 0.8 + 0.12 * u, 1, 0);
    }
  }
  // đài lưng
  for (let k = 0; k < 420 * q; k++) {
    const u = r(),
      v = r() * 2 - 1,
      w = 0.085 * Math.pow(Math.sin(Math.PI * Math.max(u, 0.05)), 0.6);
    const p = P(v * w, 0.01 + u * 0.13, -0.01 - 0.03 * u * u);
    let c = u < 0.2 ? mix(hx("#b9c98f"), hx("#f2d8e4"), u * 5) : hx("#f6dfe9");
    if (Math.abs((((v + 1) * 4) % 1) - 0.5) < 0.09) c = hx("#b35a86");
    b.add(p[0], p[1], p[2], jit(c, r, 0.06), 0.017, 0.82 + 0.1 * u, 1, 0);
  }
  for (let k = 0; k < 70 * q; k++) {
    const a = r() * TAU,
      rr = Math.sqrt(r()) * 0.022;
    const p = P(Math.cos(a) * rr, Math.sin(a) * rr, 0.045);
    b.add(p[0], p[1], p[2], jit(hx("#ead06a"), r, 0.1), 0.015, 0.9, 1, 0.2);
  }
}

function genRafflesia(b: PB, r: Rand, q: number) {
  seedDots(b, r, hx("#5a3a2a"));
  tube(b, r, (s) => [-0.95 + 1.0 * s, 0.025 + 0.012 * Math.sin(s * 9), -0.5 + 0.38 * s + 0.12 * Math.sin(s * 6)], 200 * q, 0.02, hx("#5a4030"), 0.024, (s) => 0.05 + 0.25 * s);
  tube(b, r, (s) => [0.5 + 0.5 * s, 0.022, 0.4 + 0.3 * s - 0.1 * Math.sin(s * 5)], 90 * q, 0.016, hx("#5a4030"), 0.022, (s) => 0.1 + 0.2 * s);
  const spots: Vec3[] = [];
  const lobeR = (a: number) => 0.3 + 0.34 * Math.pow(0.5 + 0.5 * Math.cos(5 * a), 0.4);
  for (let i = 0; i < 90; i++) {
    const a = r() * TAU,
      R = lobeR(a),
      rr = 0.24 + (R - 0.24) * (0.1 + 0.85 * r());
    spots.push([Math.cos(a) * rr, Math.sin(a) * rr, 0.02 + r() * 0.022]);
  }
  const N = 5200 * q;
  for (let i = 0; i < N; i++) {
    const a = r() * TAU,
      R = lobeR(a),
      s = Math.sqrt(r()),
      rr = 0.19 + (R - 0.19) * s;
    const x = Math.cos(a) * rr,
      z = Math.sin(a) * rr;
    let y = 0.035 + 0.06 * Math.sin(Math.PI * s * 0.85);
    let c = mix(hx("#5e1712"), hx("#a8331f"), Math.min(1, s * 1.5));
    if (s > 0.88) c = mix(c, hx("#c9512f"), 0.6);
    let sz = 0.03;
    for (const sp of spots) {
      const dx = x - sp[0],
        dz = z - sp[1];
      if (dx * dx + dz * dz < sp[2] * sp[2]) {
        c = mix(hx("#f3e6d0"), hx("#e9c2ad"), r() * 0.5);
        y += 0.012;
        sz = 0.033;
        break;
      }
    }
    b.add(x, y, z, jit(c, r, 0.1), sz, 0.5 + 0.35 * s, 0.25, 0);
  }
  for (let i = 0; i < 1100 * q; i++) {
    const a = r() * TAU,
      h = r();
    const rad = 0.205 - 0.035 * h;
    let c = mix(hx("#62180f"), hx("#9a2c1d"), h);
    if (h > 0.75 && Math.sin(a * 16) > 0.4) c = hx("#ead8c4");
    b.add(Math.cos(a) * rad, 0.06 + 0.12 * h, Math.sin(a) * rad, jit(c, r, 0.1), 0.026, 0.72 + 0.1 * h, 0.2, 0);
  }
  for (let i = 0; i < 700 * q; i++) {
    const a = r() * TAU,
      rr = 0.11 + 0.06 * r();
    let c = hx("#8e2a1b");
    if (Math.sin(a * 13) * Math.sin(rr * 120) > 0.45) c = hx("#f1e1cf");
    b.add(Math.cos(a) * rr, 0.185 - (0.17 - rr) * 0.3, Math.sin(a) * rr, jit(c, r, 0.08), 0.024, 0.85, 0.2, 0);
  }
  for (let i = 0; i < 380 * q; i++) {
    const a = r() * TAU,
      rr = Math.sqrt(r()) * 0.11;
    b.add(Math.cos(a) * rr, 0.12, Math.sin(a) * rr, jit(hx("#3a0e0b"), r, 0.15), 0.024, 0.88, 0.2, 0);
  }
  for (let i = 0; i < 26; i++) {
    const a = r() * TAU,
      rr = Math.sqrt(r()) * 0.095;
    for (let k = 0; k < 4; k++) b.add(Math.cos(a) * rr, 0.125 + k * 0.016, Math.sin(a) * rr, k === 3 ? hx("#d9b0a0") : hx("#5a1a14"), 0.018, 0.9, 0.2, 0);
  }
}

function genWelwitschia(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  for (let i = 0; i < 700 * q; i++) {
    const a = r() * TAU,
      rr = 0.05 + 0.16 * Math.sqrt(r());
    const y = 0.04 + (0.06 * rr) / 0.21 + 0.03 * Math.cos(2 * a) + (r() - 0.5) * 0.02;
    let c = mix(hx("#4e3b2c"), hx("#86684c"), r());
    if (Math.sin(a * 23 + rr * 40) > 0.7) c = hx("#2e2219");
    b.add(Math.cos(a) * rr, y, Math.sin(a) * rr, c, 0.026, 0.05 + (0.25 * rr) / 0.21, 0.1, 0);
  }
  for (const s of [-1, 1]) {
    const base = s > 0 ? 0.25 : Math.PI + 0.25;
    const d = [Math.cos(base), 0, Math.sin(base)],
      pd = [-d[2], 0, d[0]];
    const nr = 6,
      L = 0.85,
      W = 0.3,
      N = 2600 * q;
    for (let i = 0; i < N; i++) {
      const u = Math.pow(r(), 0.85),
        j = Math.floor(r() * nr),
        v = r();
      const spread = 1 + 1.7 * Math.pow(Math.max(0, u - 0.28), 1.3);
      const cj = ((j + 0.5) / nr - 0.5) * W * spread,
        hw = (W / nr) * 0.5 * (1 - 0.4 * u);
      const lat = cj + (v * 2 - 1) * hw + 0.07 * Math.sin(u * 5 + j * 1.7) * u + 0.12 * Math.sin(u * 2.4) * s;
      const al = 0.17 + u * L;
      const y = Math.max(0.012, 0.075 - 0.07 * u + 0.018 * Math.sin(u * 12 + j) + 0.05 * Math.max(0, u - 0.85) * (j % 2));
      let c = u < 0.5 ? mix(hx("#4b6a3a"), hx("#738447"), u * 2) : mix(hx("#738447"), hx("#9a7046"), (u - 0.5) * 2);
      if (u > 0.9) c = mix(c, hx("#b98f60"), 0.6);
      if ((((lat * 45) % 1) + 1) % 1 < 0.22) c = mul(c, 1.18);
      b.add(d[0] * al + pd[0] * lat, y, d[2] * al + pd[2] * lat, jit(c, r, 0.1), 0.024, 0.28 + 0.4 * u, 0.4, 0);
    }
  }
  for (let k = 0; k < 11; k++) {
    const a = r() * TAU,
      rr = 0.09 + r() * 0.12,
      cx = Math.cos(a) * rr,
      cz = Math.sin(a) * rr,
      cy = 0.15 + r() * 0.07;
    tube(b, r, (s) => [cx * (0.6 + 0.4 * s), 0.08 + (cy - 0.08) * s, cz * (0.6 + 0.4 * s)], 10, 0.006, hx("#6a4a32"), 0.014, () => 0.72);
    for (let i = 0; i < 60 * q; i++) {
      const n = randSphere(r);
      const c = Math.sin(n[1] * 18 + Math.atan2(n[2], n[0]) * 5) > 0 ? hx("#b0432f") : hx("#7e2a20");
      b.add(cx + n[0] * 0.026, cy + 0.03 + n[1] * 0.045, cz + n[2] * 0.026, jit(c, r, 0.1), 0.017, 0.82 + 0.1 * r(), 0.3, 0);
    }
  }
}

function genMiddlemist(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const C = [0, 0.55, 0],
    RX = 0.5,
    RY = 0.4;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU + r() * 0.4,
      e = [Math.cos(a) * RX * 0.55, 0.55 + (r() - 0.3) * 0.3, Math.sin(a) * RX * 0.55];
    tube(b, r, (s) => [e[0] * s + 0.03 * Math.sin(s * 6 + i), 0.02 + (e[1] - 0.02) * s, e[2] * s], 110 * q, (s) => 0.022 * (1 - 0.5 * s), hx("#4a3426"), 0.02, (s) => 0.12 + 0.28 * s);
  }
  const NL = 120 * q;
  for (let i = 0; i < NL; i++) {
    const n = randSphere(r);
    if (n[1] < -0.6) continue;
    const k = 0.82 + 0.2 * r();
    const c: Vec3 = [C[0] + n[0] * RX * k, C[1] + n[1] * RY * k, C[2] + n[2] * RX * k];
    const t1 = norm(cross(n, r() < 0.5 ? [0, 1, 0] : [1, 0, 0])),
      rot = r() * TAU;
    const dir = norm(add(sc(t1, Math.cos(rot)), sc(cross(n, t1), Math.sin(rot)))),
      side = cross(n, dir);
    blade(
      b,
      r,
      30 * Math.max(q, 0.6),
      sc(add(c, sc(dir, -0.055)), 1),
      dir,
      side,
      n,
      0.115,
      0.045,
      (u, v) => {
        if (Math.abs(v) < 0.12) return hx("#3d7843");
        if (v > 0.35 && u > 0.2 && u < 0.7) return hx("#7fb06d");
        return jit(mix(hx("#163f25"), hx("#2b6a39"), (n[1] + 1) / 2), r, 0.12);
      },
      0.022,
      0.3 + (0.25 * (n[1] + 1)) / 2,
      0.42 + (0.2 * (n[1] + 1)) / 2,
      { curl: -0.18 }
    );
  }
  const NB = 11;
  for (let bI = 0; bI < NB; bI++) {
    let n = randSphere(r);
    if (n[1] < -0.15) n[1] = -n[1] * 0.5 + 0.1;
    n = norm([n[0] + FW[0] * 0.35, n[1], n[2] + FW[2] * 0.35]);
    const ctr = [C[0] + n[0] * RX * 1.02, C[1] + n[1] * RY * 1.02, C[2] + n[2] * RX * 1.02];
    const t1 = norm(cross(n, Math.abs(n[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0])),
      t2 = cross(n, t1);
    const NP = 360 * q,
      rot = r() * TAU;
    for (let i = 0; i < NP; i++) {
      const k = Math.floor(Math.pow(r(), 0.75) * 6),
        np = 5 + k * 2,
        j = Math.floor(r() * np);
      const span = TAU / np,
        ph = j * span + k * 0.6 + rot,
        f = r() - 0.5,
        phi = ph + f * span * 1.1;
      const rk = 0.018 + 0.017 * k,
        rho = rk * (0.55 + 0.45 * Math.sqrt(r()));
      const edge = rho / rk,
        hN = 0.06 * (1 - k / 6.5) + 0.016 * edge * edge + 0.006 * (1 - Math.abs(f) * 2);
      let c = mix(hx("#7d0f33"), hx("#cf2f63"), k / 5);
      if (edge > 0.88) c = mix(c, hx("#f37a9e"), 0.55);
      if (k < 2) c = mix(c, hx("#5e0a26"), 0.4);
      const ca = Math.cos(phi) * rho,
        sa = Math.sin(phi) * rho;
      b.add(
        ctr[0] + t1[0] * ca + t2[0] * sa + n[0] * hN,
        ctr[1] + t1[1] * ca + t2[1] * sa + n[1] * hN,
        ctr[2] + t1[2] * ca + t2[2] * sa + n[2] * hN,
        jit(c, r, 0.08),
        0.02,
        0.78 + 0.18 * (k / 5) * r() + (0.02 * bI) / NB,
        1,
        0.05
      );
    }
  }
}

function genLanMa(b: PB, r: Rand, q: number) {
  const TH = 1.3;
  for (let i = 0; i < 1900 * q; i++) {
    const a = r() * TAU,
      h = r();
    const rad = 0.13 - 0.035 * h + 0.008 * Math.sin(a * 7);
    let c = mix(hx("#5d5248"), hx("#80725f"), r());
    if (Math.sin(a * 11 + h * 3) > 0.75) c = hx("#3a322c");
    b.add(Math.cos(a) * rad, h * TH, Math.sin(a) * rad, c, 0.026, -0.2 + 0.4 * h, 0.15, 0);
  }
  for (let i = 0; i < 160 * q; i++) {
    const a = r() * TAU,
      rr = Math.sqrt(r()) * 0.1;
    b.add(Math.cos(a) * rr, TH + (r() - 0.5) * 0.04, Math.sin(a) * rr, hx("#9a8a75"), 0.024, 0.2, 0.15, 0);
  }
  tube(b, r, (s) => [0.1 + 0.25 * s, 0.95 + 0.2 * s, -0.08 - 0.1 * s], 140 * q, (s) => 0.04 * (1 - 0.6 * s), hx("#6a5d50"), 0.022, (s) => 0.15 + 0.1 * s);
  const th0 = Math.PI / 4,
    hub = 0.82;
  for (let k = 0; k < 15; k++) {
    const dirS = r() < 0.5 ? -1 : 1,
      len = 0.6 + r() * 1.2,
      dh = (r() - 0.55) * 0.7,
      ph = r() * 6;
    tube(
      b,
      r,
      (s) => {
        const th = th0 + dirS * s * len * 2.2 + 0.25 * Math.sin(s * 7 + ph);
        const R = 0.137 - 0.02 * (hub + dh * s);
        return [Math.cos(th) * R, hub + dh * s + 0.03 * Math.sin(s * 9 + ph), Math.sin(th) * R];
      },
      110 * q,
      0.01,
      (s, a) => (Math.cos(a * 2) > 0.6 ? hx("#d4ddd0") : hx("#8fa48c")),
      0.017,
      (s) => 0.3 + 0.3 * s
    );
  }
  for (let k = 0; k < 4; k++) {
    const off = (k - 1.5) * 0.25,
      len = 0.25 + r() * 0.25;
    tube(
      b,
      r,
      (s) => {
        const th = th0 + off;
        return [Math.cos(th) * (0.14 + 0.05 * s), hub - len * s, Math.sin(th) * (0.14 + 0.05 * s)];
      },
      50 * q,
      0.008,
      hx("#9fb19b"),
      0.016,
      (s) => 0.4 + 0.25 * s
    );
  }
  const flower = (th: number, h: number, S: number) => {
    const out = [Math.cos(th), 0, Math.sin(th)],
      side = [-Math.sin(th), 0, Math.cos(th)];
    const O = [out[0] * 0.3, h, out[2] * 0.3];
    tube(b, r, (s) => [out[0] * (0.14 + 0.16 * s), h - 0.06 + 0.06 * s - 0.03 * Math.sin(s * 3), out[2] * (0.14 + 0.16 * s)], 40, 0.006, hx("#b8c9a8"), 0.015, (s) => 0.7 + 0.1 * s);
    const P = (X: number, Y: number, Z: number): Vec3 => [O[0] + (side[0] * X + out[0] * Z) * S, O[1] + Y * S, O[2] + (side[2] * X + out[2] * Z) * S];
    const W = hx("#f7fbf4"),
      Wg = hx("#dfeedd");
    for (const [ang, L] of [
      [0, 0.07],
      [0.95, 0.065],
      [-0.95, 0.065],
    ]) {
      for (let i = 0; i < 70 * q; i++) {
        const u = r(),
          v = (r() * 2 - 1) * 0.012 * Math.sin(Math.PI * Math.max(u, 0.1));
        const X = Math.sin(ang) * u * L + Math.cos(ang) * v,
          Y = Math.cos(ang) * u * L - Math.sin(ang) * v;
        const p = P(X, 0.01 + Y, 0.01);
        b.add(p[0], p[1], p[2], u < 0.3 ? Wg : W, 0.014, 0.82 + 0.1 * u, 1, 0.5);
      }
    }
    for (let i = 0; i < 260 * q; i++) {
      const a = r() * Math.PI,
        rr = Math.sqrt(r());
      const lobe = 1 + 0.35 * Math.abs(Math.sin(a * 2));
      const X = Math.cos(a) * 0.05 * rr * lobe,
        Y = -Math.sin(a) * 0.045 * rr;
      const p = P(X, Y - 0.005, 0.02 + 0.01 * rr);
      b.add(p[0], p[1], p[2], W, 0.016, 0.86 + 0.06 * rr, 1, 0.6);
    }
    for (const sd of [-1, 1]) {
      tube(
        b,
        r,
        (s) => {
          const X = sd * (0.045 + 0.035 * s + 0.025 * Math.sin(s * 10)),
            Y = -0.04 - 0.3 * s,
            Z = 0.02 + 0.03 * Math.cos(s * 10) * s;
          return P(X, Y, Z);
        },
        200 * q,
        (s) => 0.006 * (1 - 0.6 * s),
        W,
        0.013,
        (s) => 0.88 + 0.1 * s,
        0.6
      );
    }
  };
  flower(th0 + 0.1, 0.88, 1.6);
  flower(th0 - 0.6, 0.66, 1.35);
}

function genMongCop(b: PB, r: Rand, q: number) {
  const wood = hx("#a8784e"),
    H = 1.35;
  for (const x of [-0.55, 0.55]) for (const z of [-0.22, 0.22]) tube(b, r, (s) => [x, s * H, z], 240 * q, 0.034, wood, 0.03, () => -0.2);
  for (const z of [-0.22, 0.22])
    tube(
      b,
      r,
      (s) => {
        const x = -0.7 + 1.4 * s;
        return [x, H + 0.08 * Math.cos((Math.PI * x) / 1.4), z];
      },
      340 * q,
      0.036,
      () => mix(wood, hx("#f0b27a"), 0.45 * r()),
      0.03,
      () => -0.2
    );
  for (let i = 0; i < 6; i++) {
    const x = -0.55 + i * 0.22;
    tube(b, r, (s) => [x, H + 0.08 * Math.cos((Math.PI * x) / 1.4) + 0.03, -0.3 + 0.6 * s], 40 * q, 0.018, wood, 0.02, () => -0.2);
  }
  const vines: ((s: number) => Vec3)[] = [];
  for (const [x, z, ph] of [
    [-0.55, 0.22, 0],
    [0.55, -0.22, 2],
    [0.55, 0.22, 4],
  ]) {
    const f = (s: number): Vec3 => {
      if (s < 0.55) return [x + 0.05 * Math.cos(s * 30 + ph), (s / 0.55) * H, z + 0.05 * Math.sin(s * 30 + ph)];
      const u = (s - 0.55) / 0.45;
      const xx = x - Math.sign(x) * u * 1.1;
      return [xx, H + 0.08 * Math.cos((Math.PI * xx) / 1.4) + 0.05 + 0.04 * Math.sin(u * 20 + ph), z + 0.05 * Math.cos(u * 20 + ph)];
    };
    vines.push(f);
    tube(b, r, f, 280 * q, 0.01, hx("#3f6b2e"), 0.016, (s) => 0.15 + 0.4 * s);
  }
  for (let i = 0; i < 72; i++) {
    const f = vines[i % 3],
      s = 0.15 + r() * 0.85,
      p = f(s),
      t = 0.4 + 0.3 * s;
    const base: Vec3 = [p[0], p[1], p[2]];
    for (let l = 0; l < 3; l++) {
      const a = r() * TAU + l * 2.1,
        d = norm([Math.cos(a), -0.3 + r() * 0.6, Math.sin(a)]);
      const sd = norm(cross(d, [0, 1, 0]));
      const nn = cross(d, sd);
      blade(b, r, 22 * Math.max(q, 0.6), base, d, sd, nn, 0.08, 0.034, (u, v) => (Math.abs(v) < 0.15 ? hx("#7aa75a") : jit(hx("#3d7a3a"), r, 0.15)), 0.017, t, t + 0.1, { curl: 0.1 });
    }
  }
  const NR = 8;
  for (let k = 0; k < NR; k++) {
    const x = -0.5 + (k / (NR - 1)) * 1.0 + (r() - 0.5) * 0.08,
      z = [-0.2, 0.02, 0.2][k % 3] + (r() - 0.5) * 0.06,
      top = H + 0.08 * Math.cos((Math.PI * x) / 1.4) - 0.02,
      len = 0.45 + r() * 0.35,
      sway = (r() - 0.5) * 0.08;
    const ax = (s: number): Vec3 => [x + sway * s * s, top - len * s, z + sway * 0.6 * s * s];
    tube(b, r, ax, 60 * q, 0.006, hx("#5a3a4a"), 0.014, (s) => 0.7 + 0.1 * s);
    const NF = 30;
    for (let i = 0; i < NF; i++) {
      const s = i / NF,
        c0 = ax(s),
        phi = i * GA * 1.0 + k,
        sc0 = 1 - 0.55 * s;
      const dir = [Math.cos(phi), 0, Math.sin(phi)];
      const n = Math.floor(28 * q * sc0 + 8);
      for (let j = 0; j < n; j++) {
        const w = r();
        const rad = (0.012 + 0.065 * Math.sin(w * Math.PI * 0.62)) * sc0,
          upv = (0.07 * w * w - 0.01) * sc0;
        const th = (r() - 0.5) * 0.012;
        const p = [c0[0] + dir[0] * rad - dir[2] * th, c0[1] + upv + (r() - 0.5) * 0.01, c0[2] + dir[2] * rad + dir[0] * th];
        let c = w < 0.35 ? mix(hx("#1f9f8c"), hx("#3fe0c4"), w / 0.35) : mix(hx("#3fe0c4"), hx("#c4fff1"), (w - 0.35) / 0.65);
        if (s > 0.75) c = mix(c, hx("#2b8f86"), 0.6);
        b.add(p[0], p[1], p[2], jit(c, r, 0.06), 0.021 * (0.7 + 0.3 * sc0), 0.72 + 0.26 * s, 1, 0.3);
      }
    }
  }
}

function genHuyetRong(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const bark = () => mix(hx("#7e776b"), hx("#a59d8d"), r());
  tube(b, r, (s) => [0.01 * Math.sin(s * 4), s * 0.9, 0], 1400 * q, (s) => 0.16 - 0.04 * s + (s < 0.08 ? (0.05 * (0.08 - s)) / 0.08 : 0), bark, 0.028, (s) => -0.1 + 0.35 * s);
  const tips: Vec3[] = [];
  const br = (p: Vec3, d: Vec3, len: number, rad: number, depth: number) => {
    const e = add(p, sc(d, len));
    tube(b, r, (s) => [p[0] + (e[0] - p[0]) * s, p[1] + (e[1] - p[1]) * s, p[2] + (e[2] - p[2]) * s], len * rad * 16000 * q + 20, (s) => rad * (1 - 0.25 * s), bark, 0.024, (s) => 0.3 + 0.07 * (4 - depth) + 0.05 * s);
    if (r() < 0.25 && depth > 1) b.add(e[0], e[1], e[2], hx("#c0182a"), 0.04, 0.6, 1, 0.5);
    if (depth === 0) {
      tips.push(e);
      return;
    }
    const k = depth === 4 ? 3 : 2,
      phi0 = r() * TAU;
    const u = norm(Math.abs(d[1]) > 0.95 ? [1, 0, 0] : cross(d, [0, 1, 0])),
      v = cross(d, u);
    for (let i = 0; i < k; i++) {
      const phi = phi0 + (i * TAU) / k + (r() - 0.5) * 0.4,
        ang = depth === 4 ? 0.85 : 0.48;
      const pd = add(sc(u, Math.cos(phi)), sc(v, Math.sin(phi)));
      let nd = norm(add(sc(d, Math.cos(ang)), sc(pd, Math.sin(ang))));
      nd[1] = Math.max(nd[1], 0.3);
      nd = norm(nd);
      br(e, nd, len * 0.8, rad * 0.7, depth - 1);
    }
  };
  br([0, 0.86, 0], [0, 1, 0], 0.36, 0.11, 4);
  let Rc = 0,
    top = 0;
  for (const t of tips) {
    Rc = Math.max(Rc, Math.hypot(t[0], t[2]));
    top = Math.max(top, t[1]);
  }
  Rc += 0.3;
  top += 0.2;
  for (const t of tips) {
    for (let l = 0; l < 18; l++) {
      const phi = r() * TAU,
        th = 0.25 + r() * 1.0;
      const d = [Math.cos(phi) * Math.sin(th), Math.cos(th), Math.sin(phi) * Math.sin(th)];
      for (let k = 0; k < 6; k++) {
        const s = ((k + 1) / 6) * 0.26;
        b.add(t[0] + d[0] * s, t[1] + d[1] * s, t[2] + d[2] * s, jit(k > 3 ? hx("#9ccc5c") : hx("#3f7d3b"), r, 0.15), 0.022, 0.62 + 0.25 * r(), 1, 0);
      }
    }
  }
  for (let i = 0; i < 3600 * q; i++) {
    const rho = Rc * Math.sqrt(r()),
      a = r() * TAU,
      f = rho / Rc;
    const y = top - 0.42 * f * f - (f > 0.92 ? (f - 0.92) * 1.2 : 0) + (r() - 0.5) * 0.06;
    const under = r() < 0.28;
    const c = under ? hx("#163a22") : mix(hx("#2c6533"), hx("#78b054"), clamp(1 - f + r() * 0.3, 0, 1));
    b.add(Math.cos(a) * rho, under ? y - 0.13 : y, Math.sin(a) * rho, jit(c, r, 0.14), 0.03, 0.62 + 0.3 * r(), 1, 0);
  }
}

function genXacThoi(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const rimY = (a: number) => 0.62 + 0.07 * Math.sin(8 * a + 0.5 * Math.sin(3 * a));
  const spR = (h: number, a: number) => 0.15 + 0.3 * Math.pow(h, 1.4) + (h > 0.8 ? 0.1 * Math.pow((h - 0.8) / 0.2, 2) : 0) + 0.03 * Math.sin(8 * a) * h * h * h;
  for (let i = 0; i < 2600 * q; i++) {
    const a = r() * TAU,
      h = r();
    const R = spR(h, a),
      y = 0.04 + h * (rimY(a) - 0.04);
    let c = mix(hx("#6c8a3a"), hx("#6a1528"), sstep(0.35, 0.85, h));
    if (h < 0.5 && Math.sin(a * 20) * Math.sin(h * 40) > 0.6) c = hx("#c9d09c");
    if (h > 0.96) c = hx("#a8344a");
    b.add(Math.cos(a) * R, y, Math.sin(a) * R, jit(c, r, 0.1), 0.026, 0.5 + 0.3 * h, 0.6, 0);
  }
  for (let i = 0; i < 2600 * q; i++) {
    const a = r() * TAU,
      h = Math.sqrt(r());
    const R = spR(h, a) * 0.93 - 0.01,
      y = 0.06 + h * (rimY(a) - 0.06);
    const c = mix(hx("#3e0814"), hx("#8c1d34"), h);
    b.add(Math.cos(a) * R, y, Math.sin(a) * R, jit(c, r, 0.12), 0.026, 0.52 + 0.3 * h, 0.6, 0);
  }
  const H = 1.65;
  for (let i = 0; i < 2400 * q; i++) {
    const s = r(),
      a = r() * TAU;
    const y = 0.08 + s * (H - 0.08);
    let R = 0.075 + 0.035 * Math.sin(Math.PI * s * 0.85);
    if (s > 0.9) R *= Math.sqrt(Math.max(0, 1 - Math.pow((s - 0.9) / 0.1, 2)));
    let c = mix(hx("#d8c477"), hx("#f6ebb5"), s);
    if (Math.sin(a * 14) > 0.75) c = mul(c, 0.85);
    b.add(Math.cos(a) * R, y, Math.sin(a) * R, jit(c, r, 0.06), 0.025, 0.25 + 0.6 * s, 1, s > 0.82 ? 0.25 : 0);
  }
}

function genSanHo(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const cols = [hx("#ffb3a6"), hx("#ff8f93"), hx("#f0707f"), hx("#d0566b"), hx("#a8435c")];
  const tips: Vec3[] = [];
  const br = (p: Vec3, d: Vec3, len: number, rad: number, depth: number) => {
    const e = add(p, sc(d, len)),
      wob = r() * 6;
    tube(
      b,
      r,
      (s) => [p[0] + (e[0] - p[0]) * s + 0.03 * Math.sin(s * 5 + wob) * len, p[1] + (e[1] - p[1]) * s, p[2] + (e[2] - p[2]) * s + 0.03 * Math.cos(s * 5 + wob) * len],
      len * rad * 22000 * q + 24,
      (s) => rad * (1 - 0.2 * s),
      (s) => jit(mix(cols[depth], cols[Math.max(0, depth - 1)], s), r, 0.08),
      0.022,
      (s) => 0.15 + 0.14 * (4 - depth) + 0.1 * s
    );
    if (depth === 0) {
      tips.push(e);
      return;
    }
    const k = r() < 0.4 ? 3 : 2,
      phi0 = r() * TAU;
    const u = norm(Math.abs(d[1]) > 0.95 ? [1, 0, 0] : cross(d, [0, 1, 0])),
      v = cross(d, u);
    for (let i = 0; i < k; i++) {
      const phi = phi0 + (i * TAU) / k,
        ang = 0.55 + r() * 0.2;
      const nd = norm(add(sc(d, Math.cos(ang)), add(sc(u, Math.cos(phi) * Math.sin(ang)), sc(v, Math.sin(phi) * Math.sin(ang)))));
      nd[1] = Math.max(nd[1], 0.35);
      br(e, norm(nd), len * 0.78, rad * 0.72, depth - 1);
    }
  };
  br([0, 0, 0], [0, 1, 0], 0.42, 0.07, 4);
  for (const t of tips) {
    for (let i = 0; i < 40 * q; i++) {
      const n = randSphere(r);
      b.add(t[0] + n[0] * 0.04, t[1] + n[1] * 0.04, t[2] + n[2] * 0.04, mix(hx("#7ff4ff"), hx("#d6fbff"), r()), 0.02, 0.8 + 0.15 * r(), 1, 0.9);
    }
  }
  for (let i = 0; i < 40; i++) {
    const t = tips[i % tips.length];
    b.add(t[0] + (r() - 0.5) * 0.5, t[1] + 0.1 + r() * 0.5, t[2] + (r() - 0.5) * 0.5, hx("#a9f6ff"), 0.026, 0.9, 1.4, 1);
  }
}

function genThuyTinh(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  tube(b, r, (s) => [0.02 * Math.sin(s * 3), s * 0.44, 0.015 * s], 90 * q, 0.006, hx("#5fa894"), 0.014, (s) => 0.15 + 0.35 * s, 0.1);
  for (const sd of [-1, 1]) {
    const d = norm([sd * 0.8, 0.6, 0.1]),
      side = norm(cross(d, [0, 0, 1])),
      nn = cross(d, side);
    blade(b, r, 120 * q, [0, 0.08 + (sd > 0 ? 0.06 : 0), 0], d, side, nn, 0.18, 0.04, (u, v) => mul(mix(hx("#2c6a63"), hx("#7fe0cf"), Math.abs(v)), 0.6), 0.016, 0.3, 0.55, { edge: 0.5, glow: 0.2 });
  }
  const F: Vec3 = [0.02 * Math.sin(3), 0.45, 0.015];
  for (let p = 0; p < 6; p++) {
    const a = (p / 6) * TAU,
      d = norm([Math.cos(a) * 0.82, 0.58, Math.sin(a) * 0.82]),
      side = norm(cross(d, [0, 1, 0])),
      nn = cross(d, side);
    const hue = p / 6;
    blade(
      b,
      r,
      150 * q,
      F,
      d,
      side,
      nn,
      0.16,
      0.055,
      (u, v) => {
        const c = hsl(hue + u * 0.12, 0.75, 0.62 + 0.18 * Math.abs(v));
        return Math.abs(v) > 0.92 ? mul(mix(c, [1, 1, 1], 0.2), 0.6) : mul(c, 0.32);
      },
      0.016,
      0.78,
      0.96,
      { edge: 0.55, pw: 1, glow: 0.7, sizeFn: (u, v) => (Math.abs(v) > 0.9 ? 1.1 : 0.85) }
    );
  }
  for (let i = 0; i < 40; i++) {
    const n = randSphere(r);
    b.add(F[0] + n[0] * 0.025, F[1] + 0.02 + n[1] * 0.025, F[2] + n[2] * 0.025, hx("#c9b07a"), 0.016, 0.9, 1, 1);
  }
  const away = Math.atan2(-SUN[2], -SUN[0]);
  for (let i = 0; i < 420 * q; i++) {
    const f = r(),
      a = away + (r() - 0.5) * 0.9,
      rr = 0.28 + f * 0.22;
    const c = mul(hsl(0.78 - f * 0.78, 0.9, 0.6), 0.55);
    b.add(Math.cos(a) * rr, 0.02, Math.sin(a) * rr, c, 0.02, 0.92, 0, 0.5);
  }
}

/* ======================= cây thường (công viên) ======================= */
function genAnhDao(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const bark = () => jit(hx("#4a2f2c"), r, 0.2);
  tube(b, r, (s) => [0.03 * Math.sin(s * 3), s * 0.75, 0], 420 * q, (s) => 0.09 - 0.03 * s, bark, 0.026, (s) => -0.1 + 0.4 * s);
  const tops: Vec3[] = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU + r() * 0.5,
      L = 0.55 + r() * 0.2;
    const e: Vec3 = [Math.cos(a) * L * 0.85, 0.75 + L * 0.55, Math.sin(a) * L * 0.85];
    tops.push(e);
    tube(b, r, (s) => [e[0] * s, 0.72 + (e[1] - 0.72) * s + 0.08 * Math.sin(s * Math.PI), e[2] * s], 140 * q, (s) => 0.05 * (1 - 0.5 * s), bark, 0.022, (s) => 0.3 + 0.25 * s);
  }
  const pk = [hx("#f9c4d6"), hx("#f4a6c2"), hx("#ffe3ec"), hx("#e585ad")];
  const puffs = [[0, 1.42, 0, 0.6], ...tops.map((t) => [t[0] * 1.1, t[1] + 0.12, t[2] * 1.1, 0.46])];
  for (const [cx, cy, cz, R] of puffs) {
    const n = 560 * q * (R / 0.5);
    for (let i = 0; i < n; i++) {
      const d = randSphere(r);
      if (d[1] < -0.55) continue;
      const rr = R * (0.72 + 0.28 * Math.cbrt(r()));
      let c = mix(pk[1], pk[2], clamp(d[1] * 0.5 + 0.5 + (r() - 0.5) * 0.4, 0, 1));
      if (r() < 0.12) c = pk[3];
      if (r() < 0.04) c = hx("#6a4048");
      b.add(cx + d[0] * rr, cy + d[1] * rr * 0.8, cz + d[2] * rr, jit(c, r, 0.06), 0.03, 0.62 + 0.33 * r(), 1, 0.04);
    }
  }
  for (let i = 0; i < 260 * q; i++) {
    const a = r() * TAU,
      rr = Math.sqrt(r()) * 1.15;
    b.add(Math.cos(a) * rr, 0.015, Math.sin(a) * rr, jit(pk[r() < 0.5 ? 0 : 2], r, 0.1), 0.022, 0.9, 0, 0);
  }
}
function genThong(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const Hh = 2.5;
  tube(b, r, (s) => [0, s * Hh, 0], 560 * q, (s) => 0.085 - 0.055 * s, () => jit(mix(hx("#6b3a26"), hx("#9a5a3a"), r()), r, 0.1), 0.026, (s) => -0.1 + 0.45 * s);
  const tiers = 6;
  for (let k = 0; k < tiers; k++) {
    const y = 0.7 + (k * (Hh - 0.8)) / tiers,
      R0 = 0.85 * (1 - k / tiers) + 0.16,
      nb = 7 + (k % 3);
    for (let j = 0; j < nb; j++) {
      const a = (j / nb) * TAU + k * 0.7 + r() * 0.3,
        d = [Math.cos(a), 0, Math.sin(a)];
      const N = Math.floor(110 * q * (0.5 + R0));
      for (let i = 0; i < N; i++) {
        const u = Math.sqrt(r()),
          L = R0 * u,
          droop = -0.2 * u * u * R0 - 0.02,
          spread = (r() - 0.5) * 0.24 * (0.3 + u),
          up = (r() - 0.3) * 0.1;
        let c = mix(hx("#143a30"), hx("#3f7a4c"), clamp(u * 0.7 + (up + 0.03) * 3, 0, 1));
        if (u > 0.85 && r() < 0.4) c = hx("#7fb06a");
        b.add(d[0] * L - d[2] * spread, y + droop + up, d[2] * L + d[0] * spread, jit(c, r, 0.1), 0.027, 0.4 + 0.3 * (k / tiers) + 0.25 * u, 1, 0);
      }
    }
  }
  for (let i = 0; i < 110 * q; i++) {
    const u = r(),
      n = randSphere(r);
    b.add(n[0] * 0.12 * (1 - u), Hh + u * 0.25, n[2] * 0.12 * (1 - u), jit(hx("#2f6a46"), r, 0.1), 0.024, 0.85, 1, 0);
  }
}
function genPhong(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const bark = () => jit(hx("#4b3a36"), r, 0.15);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * TAU + r();
    const e = [Math.cos(a) * 0.35, 1.0, Math.sin(a) * 0.35];
    tube(b, r, (s) => [e[0] * s + 0.05 * Math.sin(s * 4), s * e[1], e[2] * s], 200 * q, (s) => 0.045 * (1 - 0.5 * s), bark, 0.022, (s) => -0.05 + 0.4 * s);
  }
  const reds = [hx("#a8221b"), hx("#d8432a"), hx("#f07a2a"), hx("#f6a53a")];
  [
    [0.95, 0.9],
    [1.25, 0.78],
    [1.52, 0.56],
    [1.74, 0.32],
  ].forEach(([y, R0], li) => {
    const nc = Math.floor((66 * q * R0) / 0.5);
    for (let c = 0; c < nc; c++) {
      const a = r() * TAU,
        rr = R0 * Math.sqrt(r()),
        cx = Math.cos(a) * rr,
        cz = Math.sin(a) * rr,
        cy = y - 0.12 * (rr / R0) ** 2 + (r() - 0.5) * 0.05;
      const col = reds[Math.min(3, Math.floor(li * 0.5 + r() * 1.6 + (rr / R0) * 0.8))];
      for (let k = 0; k < 7; k++) {
        const la = (k / 5) * TAU + a,
          lr = k < 5 ? 0.036 : 0.004 * k;
        b.add(cx + Math.cos(la) * lr, cy + (r() - 0.5) * 0.012, cz + Math.sin(la) * lr, jit(col, r, 0.1), 0.023, 0.6 + (0.3 * li) / 3 + 0.05 * r(), 1, 0);
      }
    }
  });
}
function genLieu(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const bark = () => jit(hx("#5a4a3a"), r, 0.2);
  tube(b, r, (s) => [0.08 * Math.sin(s * 3), s * 1.1, 0.05 * s], 520 * q, (s) => 0.12 - 0.05 * s, bark, 0.028, (s) => -0.1 + 0.4 * s);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU + r() * 0.4;
    const e = [Math.cos(a) * 0.6, 1.55 + r() * 0.2, Math.sin(a) * 0.6];
    tube(b, r, (s) => [e[0] * s, 1.05 + (e[1] - 1.05) * s, e[2] * s], 110 * q, (s) => 0.05 * (1 - 0.5 * s), bark, 0.022, (s) => 0.3 + 0.2 * s);
  }
  for (let i = 0; i < 620 * q; i++) {
    const n = randSphere(r);
    if (n[1] < 0) continue;
    const rr = 0.85 * (0.85 + 0.15 * r());
    b.add(n[0] * rr, 1.55 + n[1] * 0.45, n[2] * rr, jit(mix(hx("#5f8f3a"), hx("#b8d46a"), n[1]), r, 0.1), 0.026, 0.55 + 0.3 * r(), 1, 0);
  }
  const NS = Math.floor(120 * q);
  for (let s = 0; s < NS; s++) {
    const a = r() * TAU,
      rr = 0.35 + 0.6 * Math.sqrt(r());
    const top = 1.55 + 0.45 * Math.sqrt(Math.max(0, 1 - (rr / 0.95) ** 2));
    const len = 0.7 + r() * 0.7 + rr * 0.4;
    const x0 = Math.cos(a) * rr * 1.05,
      z0 = Math.sin(a) * rr * 1.05,
      N = Math.floor(len * 24);
    for (let k = 0; k < N; k++) {
      const u = k / N;
      b.add(x0 * (1 + u * 0.06) + (r() - 0.5) * 0.03, top - u * len, z0 * (1 + u * 0.06) + (r() - 0.5) * 0.03, jit(mix(hx("#8fbc4e"), hx("#d6e48a"), u), r, 0.1), 0.022, 0.6 + 0.35 * u, 1 + u * 1.2, 0);
    }
  }
}
function genTre(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const NC = 11;
  for (let c = 0; c < NC; c++) {
    const a = r() * TAU,
      rr = Math.sqrt(r()) * 0.25,
      bx = Math.cos(a) * rr,
      bz = Math.sin(a) * rr,
      k = 0.4 + r(),
      Hc = 2.2 + r() * 0.8;
    const f = (s: number): Vec3 => [bx + Math.cos(a) * 0.35 * k * s * s, s * Hc, bz + Math.sin(a) * 0.35 * k * s * s];
    tube(b, r, f, (220 * q * Hc) / 2.5, 0.034, (s) => (((s * Hc) / 0.32) % 1 < 0.09 ? hx("#55702a") : jit(mix(hx("#7fae3a"), hx("#c3d65a"), r() * 0.5), r, 0.08)), 0.022, (s) => -0.05 + 0.6 * s);
    for (let l = 0; l < 12 * q + 3; l++) {
      const s = 0.45 + r() * 0.55,
        p = f(s),
        ang = r() * TAU;
      const d = norm([Math.cos(ang), -0.35 - r() * 0.4, Math.sin(ang)]);
      const side = norm(cross(d, [0, 1, 0]));
      blade(b, r, 16, p, d, side, cross(d, side), 0.2, 0.025, (u, v) => jit(Math.abs(v) < 0.2 ? hx("#8fbf4a") : hx("#4f8a32"), r, 0.12), 0.019, 0.5 + 0.3 * s, 0.6 + 0.3 * s, { pw: 0.5 });
    }
  }
  for (let i = 0; i < b.n; i++) b.W[i] *= 1.8;
}
function genBachDuong(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const Hh = 2.4;
  tube(
    b,
    r,
    (s) => [0.03 * Math.sin(s * 5), s * Hh, 0],
    760 * q,
    (s) => 0.065 - 0.03 * s,
    (s, a) => (Math.sin(s * Hh * 22 + Math.sin(a * 3) * 2) > 0.8 && Math.cos(a * 2 + s * 9) > -0.2 ? hx("#2a2622") : jit(hx("#efebe2"), r, 0.05)),
    0.024,
    (s) => -0.1 + 0.45 * s
  );
  for (let i = 0; i < 7; i++) {
    const s0 = 0.45 + i * 0.07,
      a = r() * TAU,
      L = 0.4 + r() * 0.3,
      y0 = s0 * Hh;
    const e = [Math.cos(a) * L, y0 + L * 0.7, Math.sin(a) * L];
    tube(b, r, (s) => [e[0] * s, y0 + (e[1] - y0) * s, e[2] * s], 50 * q, 0.014, hx("#3a3530"), 0.016, (s) => 0.3 + 0.2 * s);
  }
  for (let i = 0; i < 1300 * q; i++) {
    const n = randSphere(r),
      rr = Math.cbrt(r());
    b.add(n[0] * 0.62 * rr, 1.8 + n[1] * 0.78 * rr, n[2] * 0.62 * rr, jit(mix(hx("#7fa83a"), hx("#e3e27a"), clamp(n[1] * 0.5 + 0.5, 0, 1)), r, 0.12), 0.024, 0.55 + 0.35 * r(), 1, 0);
  }
}
function genPhuong(b: PB, r: Rand, q: number) {
  seedDots(b, r);
  const bark = () => jit(hx("#6a5a4a"), r, 0.15);
  tube(b, r, (s) => [0, s * 0.8, 0], 360 * q, (s) => 0.1 - 0.03 * s, bark, 0.026, (s) => -0.1 + 0.35 * s);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU + r() * 0.3;
    const e = [Math.cos(a) * 0.9, 1.35, Math.sin(a) * 0.9];
    tube(b, r, (s) => [e[0] * s, 0.78 + (e[1] - 0.78) * Math.sqrt(s), e[2] * s], 140 * q, (s) => 0.05 * (1 - 0.5 * s), bark, 0.022, (s) => 0.3 + 0.2 * s);
  }
  for (let i = 0; i < 2200 * q; i++) {
    const rr = 1.25 * Math.sqrt(r()),
      a = r() * TAU,
      f = rr / 1.25,
      base = 1.5 - 0.3 * f * f,
      y = base + (r() - 0.5) * 0.18;
    const flower = y > base - 0.02 && r() < 0.6;
    const c = flower ? (r() < 0.8 ? mix(hx("#e23a24"), hx("#ff8a3a"), r()) : hx("#ffd06a")) : jit(mix(hx("#3f7a2e"), hx("#7fb04a"), r()), r, 0.1);
    b.add(Math.cos(a) * rr, y, Math.sin(a) * rr, c, 0.028, flower ? 0.8 + 0.15 * r() : 0.5 + 0.25 * r(), 1, 0);
  }
}

/** id loài → bộ sinh hình */
export const SPECIES_GEN: Record<string, Gen> = {
  lanhai: genLanHai,
  rafflesia: genRafflesia,
  welwitschia: genWelwitschia,
  middlemist: genMiddlemist,
  lanma: genLanMa,
  mongcop: genMongCop,
  huyetrong: genHuyetRong,
  xacthoi: genXacThoi,
  sanho: genSanHo,
  thuytinh: genThuyTinh,
  anhdao: genAnhDao,
  thong: genThong,
  phong: genPhong,
  lieu: genLieu,
  tre: genTre,
  bachduong: genBachDuong,
  phuong: genPhuong,
};
