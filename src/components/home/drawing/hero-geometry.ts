import { DRAW, HID, INK, INK2, INK3, circ, dp, flower, label, petal, r1, rng, sm, taper, type AnnEl, type Pt, type Pt3, type Shape } from "./kit";

/*
 * Bản vẽ hero: tháp năm tầng, núi Phú Sĩ, cổng torii, cành anh đào — phối cảnh hai điểm tụ.
 * Hàm thuần, chỉ chạy phía trình duyệt khi cần (được import động) để HTML trang chủ không phải chở ~300 KB SVG.
 */

export const HERO_W = 760;
export const HERO_H = 760;
/** Mép dưới của phần đã tô màu khi bản vẽ nằm yên (trên tô, dưới để nét) */
export const HERO_REST = 436;

export interface ConsLine {
  d: string;
  sw: number;
  dash?: string;
}

export interface HeroGeometry {
  shapes: Shape[];
  sun: { x: number; y: number; r: number };
  cons: ConsLine[];
  ann: AnnEl[];
  scale: AnnEl[];
}

export function buildHero(): HeroGeometry {
  const cam = { cx: 430, hy: 640, F: 1350, D: 62, eye: 1.6, th: 0.6 };
  const ct = Math.cos(cam.th);
  const st = Math.sin(cam.th);
  const PR = (X: number, Y: number, Z: number): Pt => [cam.cx + (cam.F * X) / Z, cam.hy - (cam.F * (Y - cam.eye)) / Z];
  const P = (x: number, y: number, z: number) => PR(x * ct - z * st, y, x * st + z * ct + cam.D);
  const Pp = (p: Pt3) => P(p[0], p[1], p[2]);
  const L3 = (a: Pt3, b: Pt3, t: number): Pt3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const S: Shape[] = [];
  const add = (d: string, o?: Omit<Shape, "d">) => S.push({ d, ...o });
  const hid: string[] = [];
  const rnd = rng(7);

  /* --- Phú Sĩ (bóng xa) --- */
  const fy0 = 246;
  const fy1 = 640;
  const xL = (t: number) => 196 - 300 * Math.pow(t, 1.4);
  const xR = (t: number) => 270 + 460 * Math.pow(t, 1.4);
  const fl: Pt[] = [];
  const fr: Pt[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    fl.push([xL(t), fy0 + (fy1 - fy0) * t]);
    fr.push([xR(t), fy0 + (fy1 - fy0) * t]);
  }
  const summit: Pt[] = (
    [
      [196, 0],
      [204, -5],
      [212, 1],
      [221, -6],
      [233, -1],
      [244, -7],
      [256, 0],
      [263, -5],
      [270, 0],
    ] as Pt[]
  ).map((p) => [p[0], p[1] + fy0]);
  const fuji = fl.slice().reverse().concat(summit.slice(1, -1)).concat(fr);
  add(dp(fuji, true), { tone: DRAW, op: 0.42, hatch: "h60", ph: "fuji", stroke: INK2, sw: 1 });
  // chóp tuyết với khe răng cưa
  const snow: Pt[] = [];
  const N = 26;
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    const tt = 0.2 + 0.07 * Math.sin(i * 1.7) + (i % 2 ? 0.09 + 0.05 * rnd() : 0) + 0.05 * Math.sin(u * Math.PI);
    const X0 = xL(tt);
    const X1 = xR(tt);
    snow.push([X0 + (X1 - X0) * u, fy0 + (fy1 - fy0) * tt]);
  }
  const snowPoly = [...summit, ...snow.slice().reverse()];
  add(sm(snowPoly, true), { tone: "#ffffff", op: 1, ph: "fuji", stroke: INK2, sw: 0.8 });
  for (let k = 0; k < 7; k++) {
    const u = 0.12 + k * 0.12;
    const x0 = xL(0.02) + (xR(0.02) - xL(0.02)) * u;
    const pts: Pt[] = [
      [x0, fy0 + 8],
      [x0 + (u - 0.5) * 30, fy0 + 40 + rnd() * 20],
      [x0 + (u - 0.5) * 60, fy0 + 70 + rnd() * 18],
    ];
    add(sm(pts), { open: true, ph: "fuji", stroke: INK3, sw: 0.6 });
  }
  for (let k = 0; k < 9; k++) {
    const t = 0.45 + k * 0.05;
    const y = fy0 + (fy1 - fy0) * t;
    add(
      dp([
        [xL(t) + 8 + rnd() * 12, y],
        [xL(t) + 40 + rnd() * 50, y + 4],
      ]),
      { open: true, ph: "fuji", stroke: DRAW, sw: 0.5 }
    );
  }

  /* --- tháp --- */
  const tiers: { w: number; E: number; yb0: number; yb1: number; ye: number; yet: number; next: number }[] = [];
  let y = 1.2;
  const ws = [3.1, 2.85, 2.6, 2.35, 2.1];
  const bh = [2.8, 2.25, 2.15, 2.05, 1.95];
  for (let i = 0; i < 5; i++) {
    const yb0 = y;
    const yb1 = y + bh[i];
    const ye = yb1 - 0.3;
    const yet = ye + 0.45;
    const next = yet + 0.95;
    tiers.push({ w: ws[i], E: ws[i] + 2.55, yb0, yb1, ye, yet, next });
    y = next;
  }
  const apex = tiers[4].yet + 1.7;
  const cA = (w: number, yy: number): Pt3 => [-w, yy, w];
  const cB = (w: number, yy: number): Pt3 => [-w, yy, -w];
  const cC = (w: number, yy: number): Pt3 => [w, yy, -w];
  function eave(a: Pt3, b: Pt3, yy: number, lift: number, n = 18) {
    const out: Pt3[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = L3(a, b, t);
      const k = Math.pow(Math.abs(2 * t - 1), 2.6);
      out.push([p[0] * (1 + 0.075 * k), yy + lift * k, p[2] * (1 + 0.075 * k)]);
    }
    return out;
  }
  const LIFT = 0.62;
  // chóp (vẽ trước: nhìn từ dưới lên nên tô từ trên xuống)
  const sp0 = apex;
  const rings: { y: number; r: number }[] = [];
  for (let k = 0; k < 9; k++) rings.push({ y: sp0 + 0.95 + k * 0.58, r: 0.62 - k * 0.012 });
  add(dp([P(-0.09, sp0, 0.09), P(-0.09, sp0 + 7.4, 0.09), P(0.09, sp0 + 7.4, -0.09), P(0.09, sp0, -0.09)], true), { tone: INK, op: 0.9, ph: "pag", sw: 0.8 });
  const jew = P(0, sp0 + 8.1, 0);
  // ngọn lửa suien
  const fl0 = P(0, sp0 + 6.6, 0);
  const fl1 = P(0, sp0 + 7.6, 0);
  add(
    `M${r1(fl0[0])} ${r1(fl0[1])}C${r1(fl0[0] - 14)} ${r1(fl0[1] - 6)} ${r1(fl1[0] - 10)} ${r1(fl1[1] + 2)} ${r1(fl1[0])} ${r1(fl1[1])}C${r1(fl1[0] + 10)} ${r1(fl1[1] + 2)} ${r1(fl0[0] + 14)} ${r1(fl0[1] - 6)} ${r1(fl0[0])} ${r1(fl0[1])}Z`,
    { tone: DRAW, op: 0.6, hatch: "hd", ph: "pag", sw: 0.9 }
  );
  add(circ(jew[0], jew[1], 5.2), { tone: INK2, op: 1, ph: "pag", sw: 0.9 });
  for (let k = rings.length - 1; k >= 0; k--) {
    const g = rings[k];
    const pts: Pt[] = [];
    for (let j = 0; j <= 28; j++) {
      const a = (j / 28) * Math.PI * 2;
      pts.push(P(Math.cos(a) * g.r, g.y, Math.sin(a) * g.r));
    }
    add(dp(pts, true), { tone: INK2, op: 0.85, ph: "pag", sw: 0.8 });
  }
  // bát fukubachi + đế roban
  add(dp([P(-0.6, sp0, 0.6), P(-0.6, sp0, -0.6), P(-0.6, sp0 + 0.45, -0.6), P(-0.6, sp0 + 0.45, 0.6)], true), { tone: "#f3efea", ph: "pag", sw: 0.8 });
  add(dp([P(-0.6, sp0, -0.6), P(0.6, sp0, -0.6), P(0.6, sp0 + 0.45, -0.6), P(-0.6, sp0 + 0.45, -0.6)], true), { tone: DRAW, op: 0.6, ph: "pag", sw: 0.8 });
  {
    const bw: Pt[] = [];
    for (let j = 0; j <= 16; j++) {
      const a = (j / 16) * Math.PI;
      bw.push(P(-Math.cos(a) * 0.5 * ct, sp0 + 0.45 + Math.sin(a) * 0.5, Math.cos(a) * 0.5 * st));
    }
    add(dp(bw, true), { tone: INK2, op: 0.7, ph: "pag", sw: 0.8 });
  }
  for (let i = 4; i >= 0; i--) {
    const T = tiers[i];
    const w = T.w;
    const Ew = T.E;
    // mặt trên mái (dốc lên thân tầng trên / đỉnh)
    const tA = eave(cA(Ew, T.yet), cB(Ew, T.yet), T.yet, LIFT);
    const tB = eave(cB(Ew, T.yet), cC(Ew, T.yet), T.yet, LIFT);
    if (i === 4) {
      const ap: Pt3 = [0, apex, 0];
      add(dp([...tA.map(Pp), Pp(ap)], true), { tone: INK3, op: 0.75, hatch: "h45", ph: "pag", sw: 1 });
      add(dp([...tB.map(Pp), Pp(ap)], true), { tone: INK2, op: 0.85, hatch: "h45", ph: "pag", sw: 1 });
      for (const s of [0.35, 0.68]) {
        add(dp(tA.map((p) => Pp(L3(p, ap, s)))), { open: true, ph: "pag", stroke: INK2, sw: 0.55 });
        add(dp(tB.map((p) => Pp(L3(p, ap, s)))), { open: true, ph: "pag", stroke: INK2, sw: 0.55 });
      }
    } else {
      const w2 = tiers[i + 1].w;
      const yn = T.next;
      const nA = cA(w2, yn);
      const nB = cB(w2, yn);
      const nC = cC(w2, yn);
      add(dp([...tA.map(Pp), Pp(nB), Pp(nA)], true), { tone: INK3, op: 0.75, hatch: "h45", ph: "pag", sw: 1 });
      add(dp([...tB.map(Pp), Pp(nC), Pp(nB)], true), { tone: INK2, op: 0.85, hatch: "h45", ph: "pag", sw: 1 });
      for (const s of [0.38, 0.7]) {
        const gA = eave(L3(cA(Ew, T.yet), nA, s), L3(cB(Ew, T.yet), nB, s), T.yet + (yn - T.yet) * s, LIFT * (1 - s));
        const gB = eave(L3(cB(Ew, T.yet), nB, s), L3(cC(Ew, T.yet), nC, s), T.yet + (yn - T.yet) * s, LIFT * (1 - s));
        add(dp(gA.map(Pp)), { open: true, ph: "pag", stroke: INK2, sw: 0.55 });
        add(dp(gB.map(Pp)), { open: true, ph: "pag", stroke: INK2, sw: 0.55 });
      }
    }
    // thân
    const A0 = cA(w, T.yb0);
    const B0 = cB(w, T.yb0);
    const C0 = cC(w, T.yb0);
    const A1 = cA(w, T.yb1);
    const B1 = cB(w, T.yb1);
    const C1 = cC(w, T.yb1);
    add(dp([A0, B0, B1, A1].map(Pp), true), { tone: "#f3efea", op: 1, hatch: "hv", ph: "pag", sw: 1 });
    add(dp([B0, C0, C1, B1].map(Pp), true), { tone: DRAW, op: 0.6, hatch: "h45", ph: "pag", sw: 1 });
    for (const u of [1 / 3, 2 / 3]) {
      add(dp([Pp(L3(A0, B0, u)), Pp(L3(A1, B1, u))]), { open: true, ph: "pag", stroke: INK2, sw: 0.7 });
      add(dp([Pp(L3(B0, C0, u)), Pp(L3(B1, C1, u))]), { open: true, ph: "pag", stroke: INK2, sw: 0.7 });
    }
    const bm = T.yb1 - 0.42;
    add(dp([Pp(cA(w, bm)), Pp(cB(w, bm)), Pp(cC(w, bm))]), { open: true, ph: "pag", stroke: INK2, sw: 0.7 });
    if (i === 0) {
      // cửa + song cửa ở mặt sáng
      const d0 = L3(A0, B0, 0.38);
      const d1 = L3(A0, B0, 0.62);
      const dh = 2.0;
      add(dp([Pp(d0), Pp([d0[0], T.yb0 + dh, d0[2]]), Pp([d1[0], T.yb0 + dh, d1[2]]), Pp(d1)], true), { tone: INK2, op: 0.8, ph: "pag", sw: 0.8 });
      for (const u of [0.45, 0.5, 0.55]) {
        const q = L3(A0, B0, u);
        add(dp([Pp(q), Pp([q[0], T.yb0 + dh, q[2]])]), { open: true, ph: "pag", stroke: INK3, sw: 0.5 });
      }
    } else {
      // lan can ban công
      const ry = T.yb0 + 0.55;
      const RA = cA(w + 0.35, ry);
      const RB = cB(w + 0.35, ry);
      const RC = cC(w + 0.35, ry);
      add(dp([Pp(RA), Pp(RB), Pp(RC)]), { open: true, ph: "pag", stroke: INK, sw: 0.9 });
      for (let k = 1; k < 8; k++) {
        const q = L3(RA, RB, k / 8);
        const q2 = L3(RB, RC, k / 8);
        add(dp([Pp(q), Pp([q[0], T.yb0, q[2]])]), { open: true, ph: "pag", stroke: INK2, sw: 0.5 });
        add(dp([Pp(q2), Pp([q2[0], T.yb0, q2[2]])]), { open: true, ph: "pag", stroke: INK2, sw: 0.5 });
      }
    }
    hid.push(dp([P(w, T.yb0, w), P(w, T.yb1, w)]));
    // mặt dưới mái với rui
    const eA = eave(cA(Ew, T.ye), cB(Ew, T.ye), T.ye, LIFT);
    const eB = eave(cB(Ew, T.ye), cC(Ew, T.ye), T.ye, LIFT);
    add(dp([Pp(A1), Pp(B1), ...eA.slice().reverse().map(Pp)], true), { tone: INK, op: 0.86, ph: "pag", sw: 0.9 });
    add(dp([Pp(B1), Pp(C1), ...eB.slice().reverse().map(Pp)], true), { tone: INK, op: 0.92, ph: "pag", sw: 0.9 });
    const nr = 16;
    for (let k = 1; k < nr; k++) {
      const t = k / nr;
      const ia = Math.round(t * 18);
      add(dp([Pp(L3(A1, B1, t)), Pp(eA[ia])]), { open: true, ph: "pag", stroke: INK2, sw: 0.45 });
      add(dp([Pp(L3(B1, C1, t)), Pp(eB[ia])]), { open: true, ph: "pag", stroke: INK2, sw: 0.45 });
    }
    add(dp([Pp(B1), Pp(eA[18])]), { open: true, ph: "pag", stroke: INK2, sw: 0.6 });
    // ván diềm
    add(dp([...eA.map(Pp), ...tA.slice().reverse().map(Pp)], true), { tone: INK2, op: 1, ph: "pag", sw: 1 });
    add(dp([...eB.map(Pp), ...tB.slice().reverse().map(Pp)], true), { tone: INK, op: 0.75, ph: "pag", sw: 1 });
    const mA = eave(cA(Ew, T.ye + 0.22), cB(Ew, T.ye + 0.22), T.ye + 0.22, LIFT);
    const mB = eave(cB(Ew, T.ye + 0.22), cC(Ew, T.ye + 0.22), T.ye + 0.22, LIFT);
    add(dp(mA.map(Pp)), { open: true, ph: "pag", stroke: INK3, sw: 0.5 });
    add(dp(mB.map(Pp)), { open: true, ph: "pag", stroke: INK3, sw: 0.5 });
  }
  // bệ + bậc thềm
  const pw = 4.5;
  const ph = 1.2;
  add(dp([P(-pw, 0, pw), P(-pw, 0, -pw), P(-pw, ph, -pw), P(-pw, ph, pw)], true), { tone: "#f3efea", op: 1, hatch: "hh", ph: "pag", sw: 1 });
  add(dp([P(-pw, 0, -pw), P(pw, 0, -pw), P(pw, ph, -pw), P(-pw, ph, -pw)], true), { tone: HID, op: 0.8, hatch: "h45", ph: "pag", sw: 1 });
  for (let k = 0; k < 4; k++) {
    const z0 = -1.3;
    const z1 = 1.3;
    const yy = ph * (k / 4);
    const xx = -pw - 1.2 + k * 0.3;
    add(dp([P(xx, yy, z0), P(xx, yy, z1)]), { open: true, ph: "pag", stroke: INK2, sw: 0.7 });
    add(dp([P(xx, yy, z0), P(xx, yy + ph / 4, z0)]), { open: true, ph: "pag", stroke: INK2, sw: 0.7 });
  }
  hid.push(dp([P(pw, 0, pw), P(pw, ph, pw)]));
  hid.push(dp([P(-pw, 0, pw), P(pw, 0, pw), P(pw, 0, -pw)]));
  // nét mặt đất
  for (let k = 0; k < 14; k++) {
    const x0 = 250 + rnd() * 420;
    const y0 = 676 + rnd() * 60;
    add(
      dp([
        [x0, y0],
        [x0 + 10 + rnd() * 26, y0 + rnd() * 2],
      ]),
      { open: true, ph: "pag", stroke: DRAW, sw: 0.6 }
    );
  }

  /* --- torii (tiền cảnh) --- */
  const TA = 0.2;
  const X0 = -8.2;
  const Z0 = 40;
  const T3 = (u: number, v: number, w: number) => PR(X0 + u * Math.cos(TA) - w * Math.sin(TA), v, Z0 + u * Math.sin(TA) + w * Math.cos(TA));
  const kas = (u: number) => 0.5 * Math.pow(Math.abs(u) / 4.85, 2.4);
  for (const u0 of [-2.75, 2.75]) {
    const lean = Math.sign(u0) * 0.16;
    const r = 0.38;
    add(dp([T3(u0 - r, 0, 0), T3(u0 + r, 0, 0), T3(u0 + r - lean, 6.2, 0), T3(u0 - r - lean, 6.2, 0)], true), { tone: HID, op: 0.7, hatch: "hv", ph: "torii", sw: 1.1 });
    add(dp([T3(u0 - r, 0, 0), T3(u0 + r, 0, 0), T3(u0 + r - 0.01, 0.75, 0), T3(u0 - r - 0.01, 0.75, 0)], true), { tone: INK, op: 0.85, ph: "torii", sw: 1 });
    add(dp([T3(u0 - r * 0.4, 0.8, 0), T3(u0 - r * 0.4 - lean * 0.9, 6, 0)]), { open: true, ph: "torii", stroke: DRAW, sw: 0.5 });
  }
  const box = (u0: number, u1: number, v0: number, v1: number, w0: number, w1: number, tone: string, op: number, hatch?: string) => {
    add(dp([T3(u0, v0, w0), T3(u1, v0, w0), T3(u1, v0, w1), T3(u0, v0, w1)], true), { tone: INK2, op: 0.9, ph: "torii", sw: 0.9 });
    add(dp([T3(u0, v0, w0), T3(u1, v0, w0), T3(u1, v1, w0), T3(u0, v1, w0)], true), { tone, op, hatch, ph: "torii", sw: 1.1 });
  };
  box(-3.75, 3.75, 4.55, 5.02, -0.22, 0.22, DRAW, 0.55, "h45");
  box(-0.34, 0.34, 5.02, 5.75, -0.18, 0.18, INK2, 0.9);
  box(-3.95, 3.95, 5.75, 6.17, -0.26, 0.26, INK, 0.85);
  {
    const n = 22;
    const bot: Pt[] = [];
    const top: Pt[] = [];
    const botB: Pt[] = [];
    for (let i = 0; i <= n; i++) {
      const u = -4.62 + (9.24 * i) / n;
      bot.push(T3(u, 6.17 + kas(u), -0.32));
      botB.push(T3(u, 6.17 + kas(u), 0.32));
    }
    for (let i = n; i >= 0; i--) {
      const u = -4.95 + (9.9 * i) / n;
      top.push(T3(u, 6.8 + kas(u) * 1.1, -0.32));
    }
    add(dp([...bot, ...botB.slice().reverse()], true), { tone: INK2, op: 0.9, ph: "torii", sw: 0.9 });
    add(dp([...bot, ...top], true), { tone: INK, op: 0.94, ph: "torii", sw: 1.1 });
    const mid: Pt[] = [];
    for (let i = 0; i <= n; i++) {
      const u = -4.8 + (9.6 * i) / n;
      mid.push(T3(u, 6.5 + kas(u) * 1.05, -0.32));
    }
    add(dp(mid), { open: true, ph: "torii", stroke: INK3, sw: 0.5 });
  }
  for (let k = 0; k < 9; k++) {
    const x0 = 40 + rnd() * 300;
    const y0 = 700 + rnd() * 45;
    add(
      dp([
        [x0, y0],
        [x0 + 14 + rnd() * 30, y0 + rnd() * 2],
      ]),
      { open: true, ph: "torii", stroke: DRAW, sw: 0.6 }
    );
  }

  /* --- cành anh đào, góc trên trái --- */
  const br: [number, number, number][] = [
    [-30, 44, 10],
    [30, 58, 8],
    [92, 70, 6.5],
    [150, 90, 5],
    [206, 108, 3.4],
    [256, 134, 1.6],
  ];
  add(taper(br), { tone: INK2, op: 0.95, ph: "bloom", sw: 0.9 });
  const twigs: [number, number, number][][] = [
    [
      [92, 70, 3.4],
      [108, 48, 2.4],
      [132, 30, 1],
    ],
    [
      [150, 90, 2.8],
      [166, 118, 1.8],
      [186, 150, 0.8],
    ],
    [
      [30, 58, 3.8],
      [52, 86, 2.4],
      [70, 112, 1],
    ],
    [
      [206, 108, 2.2],
      [226, 94, 1.4],
      [244, 78, 0.7],
    ],
    [
      [-6, 50, 3.4],
      [8, 24, 2],
      [26, 6, 0.8],
    ],
  ];
  for (const t of twigs) add(taper(t), { tone: INK2, op: 0.95, ph: "bloom", sw: 0.8 });
  const clusters: Pt[] = [
    [132, 30],
    [70, 112],
    [186, 150],
    [244, 78],
    [256, 134],
    [26, 8],
    [112, 58],
    [160, 86],
    [214, 112],
    [48, 64],
    [96, 84],
  ];
  for (const c of clusters) {
    const n = 3 + Math.floor(rnd() * 4);
    for (let j = 0; j < n; j++) {
      const R = 5 + rnd() * 4.2;
      const x = c[0] + (rnd() - 0.5) * 26;
      const yy = c[1] + (rnd() - 0.5) * 20;
      add(flower(x, yy, R, rnd() * 6), { tone: rnd() > 0.35 ? "#f2b8c6" : "#e58ba3", op: 1, ph: "bloom", stroke: INK2, sw: 0.55 });
      add(circ(x, yy, 1.1), { tone: "#b8202f", op: 0.8, ph: "bloom", stroke: INK2, sw: 0.4 });
    }
  }
  for (const p of [
    [300, 230, 0.8],
    [352, 318, 2.2],
    [150, 410, 1.4],
    [96, 486, 3],
    [268, 548, 0.4],
    [520, 470, 2.6],
    [650, 520, 1.2],
    [40, 330, 2],
  ])
    add(petal(p[0], p[1], 8, p[2]), { tone: "#f2b8c6", op: 1, ph: "bloom", stroke: INK2, sw: 0.55 });

  /* --- mặt trời (tô riêng, giữa Phú Sĩ và tháp) --- */
  const sun = { x: 604, y: 226, r: 120 };

  /* --- đường dựng hình + nét khuất (chỉ ở lớp nét) --- */
  const cons: ConsLine[] = [];
  cons.push({ d: `M-40 ${cam.hy}H800`, sw: 0.7 });
  const vpR: Pt = [cam.cx + (cam.F * ct) / st, cam.hy];
  const vpL: Pt = [cam.cx - (cam.F * st) / ct, cam.hy];
  const toward = (p: Pt, vp: Pt, len: number): Pt => {
    const dx = vp[0] - p[0];
    const dy = vp[1] - p[1];
    const l = Math.hypot(dx, dy);
    return [p[0] + (dx / l) * len, p[1] + (dy / l) * len];
  };
  const pB0 = P(-pw, 0, -pw);
  const pB1 = P(-pw, ph, -pw);
  const top0 = P(-tiers[0].E, tiers[0].ye, -tiers[0].E);
  for (const [a, b] of [
    [toward(pB0, vpL, -160), toward(pB0, vpL, 560)],
    [toward(pB0, vpR, -140), toward(pB0, vpR, 420)],
    [toward(pB1, vpR, -120), toward(pB1, vpR, 380)],
    [toward(top0, vpL, -60), toward(top0, vpL, 300)],
  ])
    cons.push({ d: dp([a, b]), sw: 0.6 });
  const ax0 = P(0, 0, 0);
  const ax1 = P(0, 30, 0);
  cons.push({
    d: dp([
      [ax0[0], ax0[1] + 40],
      [ax1[0], ax1[1] - 30],
    ]),
    sw: 0.6,
    dash: "10 3 2 3",
  });
  cons.push({ d: `M${sun.x - 150} ${sun.y}H${sun.x + 150}M${sun.x} ${sun.y - 150}V${sun.y + 150}`, sw: 0.5 });
  for (const d of hid) cons.push({ d, sw: 0.8, dash: "4 3" });

  /* --- ghi chú --- */
  const spT = P(0, sp0 + 5.2, 0);
  const tp = T3(2.75, 2.2, 0);
  const ann: AnnEl[] = [
    ...label(r1(spT[0] + 4), r1(spT[1]), 560, 62, "五重塔", "Tháp năm tầng", "start", 1.8, true),
    ...label(232, fy0 + 6, 110, 212, "富士山", "Núi Phú Sĩ", "end", 1.8, true),
    ...label(r1(tp[0] + 6), r1(tp[1]), 300, 722, "鳥居", "Cổng torii", "start", 1.8, true),
  ];
  const scale: AnnEl[] = [
    { k: "p", d: "M540 742H700M540 737V747M580 739V745M620 737V747M700 737V747" },
    { k: "t", x: 540, y: 732, text: "0" },
    { k: "t", x: 612, y: 732, text: "10" },
    { k: "t", x: 690, y: 732, text: "20 m" },
  ];

  return { shapes: S, sun, cons, ann, scale };
}
