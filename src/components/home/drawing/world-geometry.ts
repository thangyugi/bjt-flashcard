import { DRAW, HID, INK, INK2, INK3, PAPER, circ, dp, ell, flower, label, petal, r1, rng, sm, taper, type AnnEl, type Pt, type Shape } from "./kit";

/*
 * Bản vẽ Thảo nguyên Pha Lê: cao nguyên trên mây, anh đào, thông, thác nước, cây quý, Tinh thể,
 * Mochi, Bọt và Lữ khách. Mỗi hình có thể gắn "step" (2–4) để hiện ra khi cuộn tới bước đó.
 */

export const WORLD_W = 800;
export const WORLD_H = 640;

export interface WorldGeometry {
  shapes: Shape[];
  /** Ghi chú theo bước (0 = luôn hiện) */
  ann: { step: number; els: AnnEl[] }[];
  /** Nhãn "Lữ khách" (đi theo nhân vật) */
  walker: AnnEl[];
}

function bank(x0: number, x1: number, yT: number, yB: number, mw: number, xw: number, mh: number, xh: number, seed: number) {
  const r = rng(seed);
  let d = `M${x0} ${yB}L${x0} ${yT}`;
  let x = x0;
  while (x < x1) {
    const w = mw + r() * (xw - mw);
    const h = mh + r() * (xh - mh);
    const nx = Math.min(x1, x + w);
    d += `A${r1((nx - x) / 2)} ${r1(h)} 0 0 1 ${r1(nx)} ${r1(yT + (r() - 0.5) * 8)}`;
    x = nx;
  }
  d += `L${x1} ${yB}`;
  x = x1;
  while (x > x0) {
    const w = 40 + r() * 50;
    const nx = Math.max(x0, x - w);
    d += `A${r1((x - nx) / 2)} ${r1(4 + r() * 5)} 0 0 1 ${r1(nx)} ${yB}`;
    x = nx;
  }
  return d + "Z";
}

/** Tán cây dạng "đệm" (cây thông tỉa niwaki, bụi trà) */
function pad(cx: number, cy: number, rx: number, ry: number, seed: number) {
  const r = rng(seed);
  let d = `M${cx - rx} ${cy}`;
  let x = cx - rx;
  const n = 5;
  for (let i = 0; i < n; i++) {
    const nx = cx - rx + (2 * rx * (i + 1)) / n;
    const h = ry * (0.6 + r() * 0.6) * (1 - Math.abs((i + 0.5) / n - 0.5));
    d += `A${r1((nx - x) / 2)} ${r1(h + 3)} 0 0 1 ${r1(nx)} ${r1(cy)}`;
    x = nx;
  }
  d += `C${cx + rx} ${cy + ry * 0.6} ${cx - rx} ${cy + ry * 0.6} ${cx - rx} ${cy}Z`;
  return d;
}

export function buildWorld(): WorldGeometry {
  const S: Shape[] = [];
  const add = (d: string, o?: Omit<Shape, "d">) => S.push({ d, ...o });
  const rnd = rng(21);

  // vệt mây trên trời
  for (const c of [
    [60, 120, 170],
    [250, 90, 120],
    [470, 150, 140],
    [640, 70, 110],
    [120, 210, 90],
    [700, 200, 70],
  ])
    add(`M${c[0]} ${c[1]}h${c[2]}M${c[0] + 20} ${c[1] + 7}h${c[2] * 0.6}`, { open: true, stroke: HID, sw: 0.8 });
  // vùng đất thấp phía dưới xa
  add("M0 560C90 548 160 556 240 546S400 552 470 544S640 556 800 542", { open: true, stroke: DRAW, sw: 0.8 });
  for (let k = 0; k < 10; k++) {
    const x = rnd() * 760;
    const yy = 580 + rnd() * 55;
    add(
      dp([
        [x, yy],
        [x + 30 + rnd() * 50, yy - 4 - rnd() * 6],
      ]),
      { open: true, stroke: HID, sw: 0.7 }
    );
  }
  const river: [number, number, number][] = [
    [-10, 640, 22],
    [70, 626, 18],
    [140, 612, 15],
    [200, 616, 12],
    [270, 600, 10],
    [340, 588, 8],
    [410, 582, 6],
    [440, 580, 4],
  ];
  add(taper(river), { tone: "#f3efea", hatch: "hw", stroke: INK3, sw: 0.8 });
  add(ell(488, 580, 56, 8), { tone: "#f3efea", hatch: "hw", stroke: INK3, sw: 0.8 });
  let cx = 588;
  const city: [number, number, number][] = [];
  while (cx < 790) {
    const w = 6 + rnd() * 10;
    const h = 6 + rnd() * 22;
    city.push([cx, w, h]);
    cx += w + 1 + rnd() * 3;
  }
  for (const b of city)
    add(
      dp(
        [
          [b[0], 598],
          [b[0], 598 - b[2]],
          [b[0] + b[1], 598 - b[2]],
          [b[0] + b[1], 598],
        ],
        true
      ),
      { tone: INK3, op: 0.55, stroke: INK3, sw: 0.6 }
    );
  add(
    dp(
      [
        [700, 598],
        [700, 560],
        [703, 552],
        [706, 560],
        [706, 598],
      ],
      true
    ),
    { tone: INK3, op: 0.7, stroke: INK3, sw: 0.6 }
  );
  add("M560 598H800", { open: true, stroke: INK3, sw: 0.6 });
  add(bank(20, 250, 600, 616, 26, 48, 8, 14, 3), { tone: "#ffffff", stroke: INK3, sw: 0.8 });
  add(bank(320, 480, 622, 640, 22, 40, 6, 12, 4), { tone: "#ffffff", stroke: INK3, sw: 0.8 });

  // khối cao nguyên
  const rimY = (x: number) => (x < 470 ? 318 + ((x - 100) / 370) * 23 : 341 - ((x - 470) / 250) * 27);
  add("M100 318C180 332 260 338 340 336C400 338 440 340 470 341L466 400L472 470L480 522L36 522C58 470 70 420 82 380C88 350 95 330 100 318Z", {
    tone: "#f3efea",
    hatch: "hh",
    sw: 1.15,
  });
  add("M470 341C520 338 600 334 650 328C690 322 710 318 720 314C728 360 742 420 764 522L480 522L472 470L466 400Z", { tone: DRAW, op: 0.55, hatch: "h45", sw: 1.15 });
  const xL = (yy: number) => 100 - (yy - 318) * 0.3;
  const xR = (yy: number) => 720 + (yy - 314) * 0.21;
  for (const y0 of [364, 396, 430, 468, 500]) {
    let x = xL(y0) + 6;
    while (x < 460) {
      const len = 30 + rnd() * 80;
      const x2 = Math.min(462, x + len);
      const pts: Pt[] = [];
      for (let k = 0; k <= 4; k++) {
        const xx = x + ((x2 - x) * k) / 4;
        pts.push([xx, y0 + (rnd() - 0.5) * 3 + (xx - 100) * 0.02]);
      }
      add(sm(pts), { open: true, stroke: INK2, sw: 0.6 });
      x = x2 + 6 + rnd() * 18;
    }
  }
  for (const y0 of [372, 404, 440, 476, 505]) {
    let x = 476;
    while (x < xR(y0) - 6) {
      const len = 26 + rnd() * 60;
      const x2 = Math.min(xR(y0) - 6, x + len);
      if (!(x2 > 548 && x < 590)) {
        const pts: Pt[] = [];
        for (let k = 0; k <= 3; k++) {
          const xx = x + ((x2 - x) * k) / 3;
          pts.push([xx, y0 - (xx - 470) * 0.05 + (rnd() - 0.5) * 3]);
        }
        add(sm(pts), { open: true, stroke: INK2, sw: 0.6 });
      }
      x = x2 + 6 + rnd() * 16;
    }
  }
  for (const fx of [150, 226, 318, 404, 512, 636, 690]) {
    const pts: Pt[] = [];
    const y0 = rimY(fx) + 4;
    for (let k = 0; k <= 6; k++) pts.push([fx + (rnd() - 0.5) * 8 + k * (fx < 470 ? -1.2 : 1.4), y0 + (k * (500 - y0)) / 6]);
    add(sm(pts), { open: true, stroke: INK2, sw: 0.55 });
  }
  // mặt trên
  add("M100 318C130 302 160 298 200 294C300 284 400 292 470 286C560 280 650 290 720 314C650 330 600 334 520 338C460 342 400 338 340 336C260 338 180 332 100 318Z", {
    tone: "#2f7d5b",
    op: 0.32,
    hatch: "hh",
    sw: 1.15,
  });
  for (let k = 0; k < 22; k++) {
    const x = 110 + k * 28 + rnd() * 10;
    const yy = rimY(x) - 1;
    add(`M${r1(x)} ${r1(yy)}l2 -6M${r1(x + 3)} ${r1(yy)}l-1 -7M${r1(x + 5)} ${r1(yy)}l3 -5`, { open: true, stroke: "#2f7d5b", sw: 0.7 });
  }
  for (let k = 0; k < 14; k++) {
    const x = 150 + rnd() * 520;
    const yy = 298 + rnd() * 26;
    add(`M${r1(x)} ${r1(yy)}l2 -4M${r1(x + 3)} ${r1(yy)}l1 -5`, { open: true, stroke: DRAW, sw: 0.6 });
  }
  // suối + thác
  add("M520 296C536 304 552 312 560 322C566 330 566 334 568 338L578 337C576 330 572 322 566 314C556 304 540 298 530 294Z", { tone: "#ffffff", hatch: "hw", stroke: INK2, sw: 0.8 });
  add("M556 336C560 380 554 440 558 520L590 520C586 440 592 380 580 335Z", { tone: "#ffffff", hatch: "hv", stroke: INK2, sw: 0.9 });
  for (const u of [0.25, 0.5, 0.75]) {
    const x = 556 + 24 * u;
    add(
      sm([
        [x, 342],
        [x - 2 + u * 3, 400],
        [x + 2, 460],
        [x + 1, 515],
      ]),
      { open: true, stroke: DRAW, sw: 0.5 }
    );
  }
  // dải mây phía trước
  add(bank(-30, 830, 500, 548, 40, 90, 14, 34, 9), { tone: "#ffffff", stroke: INK2, sw: 1 });
  for (const c of [
    [90, 520, 26],
    [300, 516, 30],
    [520, 522, 22],
    [690, 514, 28],
  ])
    add(`M${c[0]} ${c[1]}a${c[2]} ${c[2] * 0.55} 0 0 1 ${c[2] * 1.6} -2`, { open: true, stroke: DRAW, sw: 0.7 });
  // thông niwaki, phía sau bên phải
  add(
    taper([
      [652, 304, 7],
      [656, 276, 5.5],
      [646, 244, 4.2],
      [654, 214, 3],
      [652, 190, 1.6],
    ]),
    { tone: "#a35a00", op: 0.8, stroke: INK, sw: 1 }
  );
  add(
    taper([
      [654, 272, 3],
      [630, 262, 1.4],
    ]),
    { tone: "#a35a00", op: 0.8, sw: 0.9 }
  );
  add(
    taper([
      [648, 240, 2.6],
      [680, 236, 1.2],
    ]),
    { tone: "#a35a00", op: 0.8, sw: 0.9 }
  );
  for (const p of [
    [624, 262, 30, 11, 1],
    [686, 236, 28, 10, 2],
    [640, 214, 26, 10, 3],
    [654, 190, 18, 9, 4],
  ] as [number, number, number, number, number][])
    add(pad(...p), { tone: "#2f7d5b", op: 0.72, hatch: "h45", stroke: INK, sw: 1 });
  // cây anh đào bên trái
  add(
    taper([
      [232, 334, 8],
      [228, 310, 6.5],
      [236, 284, 5],
      [228, 262, 3.8],
      [232, 244, 2.4],
    ]),
    { tone: INK2, sw: 1 }
  );
  for (const t of [
    [
      [236, 286, 3],
      [262, 262, 1.8],
      [278, 248, 0.8],
    ],
    [
      [228, 262, 2.6],
      [208, 240, 1.4],
      [196, 226, 0.6],
    ],
    [
      [230, 250, 2],
      [248, 226, 0.8],
    ],
    [
      [228, 304, 2.4],
      [204, 288, 1.2],
      [192, 282, 0.5],
    ],
  ] as [number, number, number][][])
    add(taper(t), { tone: INK2, sw: 0.9 });
  {
    const r = rng(5);
    let d = "";
    const cxx = 232;
    const cyy = 226;
    const RX = 64;
    const RY = 36;
    const n = 13;
    for (let i = 0; i <= n; i++) {
      const a = Math.PI * 0.95 + (i / n) * Math.PI * 1.1;
      const px = cxx + Math.cos(a) * RX;
      const py = cyy + Math.sin(a) * RY;
      if (i === 0) d += `M${r1(px)} ${r1(py)}`;
      else d += `A${r1(12 + r() * 8)} ${r1(10 + r() * 7)} 0 0 1 ${r1(px)} ${r1(py)}`;
    }
    d += `C${cxx + RX * 0.9} ${cyy + RY * 0.9} ${cxx + 20} ${cyy + RY * 0.5} ${cxx} ${cyy + RY * 0.55}C${cxx - 30} ${cyy + RY * 0.7} ${cxx - RX * 1.05} ${cyy + RY * 0.8} ${r1(
      cxx + Math.cos(Math.PI * 0.95) * RX
    )} ${r1(cyy + Math.sin(Math.PI * 0.95) * RY)}Z`;
    add(d, { tone: "#f2b8c6", op: 1, stroke: INK, sw: 1 });
    for (let k = 0; k < 26; k++) {
      const a = r() * Math.PI * 2;
      const rr = Math.sqrt(r());
      add(flower(cxx + Math.cos(a) * RX * 0.8 * rr, cyy + Math.sin(a) * RY * 0.7 * rr - 4, 3.2 + r() * 2, r() * 6), { tone: r() > 0.5 ? "#e58ba3" : "#ffffff", stroke: INK2, sw: 0.4 });
    }
    for (const p of [
      [300, 270, 1],
      [316, 300, 2.4],
      [176, 300, 0.4],
      [270, 318, 1.8],
    ])
      add(petal(p[0], p[1], 6, p[2]), { tone: "#f2b8c6", stroke: INK2, sw: 0.5 });
  }

  // ---- bước 3: cây quý ----
  {
    // bụi Trà Middlemist Red
    add(pad(128, 318, 22, 16, 8), { tone: "#2f7d5b", op: 0.7, stroke: INK, sw: 1, step: 3 });
    for (const p of [
      [118, 310],
      [132, 304],
      [142, 314],
      [124, 318],
    ])
      add(flower(p[0], p[1], 3.6, p[0]), { tone: "#9f1b28", stroke: INK, sw: 0.5, step: 3 });
    // Rafflesia
    const rc = [176, 330];
    for (let k = 0; k < 5; k++) {
      const a = (k * Math.PI * 2) / 5 - 0.3;
      const px = rc[0] + Math.cos(a) * 13;
      const py = rc[1] + Math.sin(a) * 4.6;
      add(ell(px, py, 10, 4.4), { tone: "#9f1b28", stroke: INK, sw: 0.9, step: 3 });
    }
    add(ell(rc[0], rc[1] - 1, 7, 2.8), { tone: "#57524d", stroke: INK, sw: 0.9, step: 3 });
    for (const p of [
      [166, 331],
      [186, 332],
      [176, 335],
      [160, 327],
      [192, 327],
    ])
      add(circ(p[0], p[1], 1), { tone: "#fbedee", fillA: PAPER, stroke: INK, sw: 0.4, step: 3 });
    // Lan hài
    const lh = [452, 324];
    add(`M${lh[0]} ${lh[1]}C${lh[0] - 1} ${lh[1] - 12} ${lh[0] + 2} ${lh[1] - 22} ${lh[0]} ${lh[1] - 30}`, { open: true, stroke: "#2f7d5b", sw: 1.2, step: 3 });
    add(
      `M${lh[0]} ${lh[1]}C${lh[0] - 10} ${lh[1] - 2} ${lh[0] - 18} ${lh[1] - 2} ${lh[0] - 24} ${lh[1] + 1}C${lh[0] - 16} ${lh[1] + 2} ${lh[0] - 8} ${lh[1] + 2} ${lh[0]} ${lh[1]}ZM${lh[0]} ${lh[1]}C${lh[0] + 10} ${lh[1] - 3} ${lh[0] + 18} ${lh[1] - 2} ${lh[0] + 22} ${lh[1]}C${lh[0] + 14} ${lh[1] + 2} ${lh[0] + 6} ${lh[1] + 2} ${lh[0]} ${lh[1]}Z`,
      { tone: "#2f7d5b", op: 0.75, stroke: INK, sw: 0.8, step: 3 }
    );
    add(ell(lh[0], lh[1] - 40, 4, 6), { tone: "#ffffff", stroke: INK, sw: 0.8, step: 3 });
    add(
      `M${lh[0] - 3} ${lh[1] - 33}C${lh[0] - 10} ${lh[1] - 33} ${lh[0] - 14} ${lh[1] - 28} ${lh[0] - 16} ${lh[1] - 22}M${lh[0] + 3} ${lh[1] - 33}C${lh[0] + 10} ${lh[1] - 33} ${lh[0] + 14} ${lh[1] - 28} ${lh[0] + 16} ${lh[1] - 22}`,
      { open: true, stroke: "#e58ba3", sw: 2, step: 3 }
    );
    add(ell(lh[0], lh[1] - 28, 4.6, 5.4), { tone: "#a35a00", op: 0.85, stroke: INK, sw: 0.8, step: 3 });
    // Welwitschia
    const ww = [598, 320];
    add(
      `M${ww[0]} ${ww[1]}C${ww[0] - 16} ${ww[1] - 6} ${ww[0] - 30} ${ww[1] + 2} ${ww[0] - 44} ${ww[1] - 1}L${ww[0] - 40} ${ww[1] + 3}L${ww[0] - 46} ${ww[1] + 5}C${ww[0] - 30} ${ww[1] + 8} ${ww[0] - 14} ${ww[1] + 6} ${ww[0]} ${ww[1] + 3}Z`,
      { tone: "#2f7d5b", op: 0.6, hatch: "hh", stroke: INK, sw: 0.9, step: 3 }
    );
    add(
      `M${ww[0]} ${ww[1]}C${ww[0] + 18} ${ww[1] - 5} ${ww[0] + 30} ${ww[1] + 3} ${ww[0] + 46} ${ww[1]}L${ww[0] + 42} ${ww[1] + 4}L${ww[0] + 48} ${ww[1] + 7}C${ww[0] + 30} ${ww[1] + 9} ${ww[0] + 14} ${ww[1] + 7} ${ww[0]} ${ww[1] + 3}Z`,
      { tone: "#2f7d5b", op: 0.6, hatch: "hh", stroke: INK, sw: 0.9, step: 3 }
    );
    add(ell(ww[0], ww[1], 6, 3), { tone: "#a35a00", op: 0.85, stroke: INK, sw: 0.9, step: 3 });
  }

  // ---- bước 2: Tinh thể ----
  const crystal = (cx: number, by: number, w: number, h: number, tilt: number) => {
    const a: Pt = [cx - w / 2, by];
    const b: Pt = [cx - w / 2 + tilt, by - h];
    const ap: Pt = [cx + tilt * 1.3, by - h - w * 0.9];
    const c: Pt = [cx + w / 2 + tilt, by - h];
    const d: Pt = [cx + w / 2, by];
    return {
      o: dp([a, b, ap, c, d], true),
      f: dp([[cx + tilt * 0.4, by], [cx + tilt, by - h], ap]) + dp([b, [cx + tilt, by - h], c]),
    };
  };
  for (const c of [
    [352, 334, 9, 26, -2],
    [366, 334, 11, 38, 1],
    [380, 334, 8, 20, 3],
    [340, 336, 6, 12, -3],
  ] as [number, number, number, number, number][]) {
    const k = crystal(...c);
    add(k.o, { tone: "#fbedee", stroke: INK, sw: 1, step: 2 });
    add(k.f, { open: true, stroke: INK2, sw: 0.6, step: 2 });
  }
  for (const p of [
    [404, 262],
    [424, 244],
    [446, 258],
  ])
    add(`M${p[0]} ${p[1] - 7}L${p[0] + 5} ${p[1]}L${p[0]} ${p[1] + 7}L${p[0] - 5} ${p[1]}Z`, { tone: "#fbedee", stroke: INK, sw: 0.9, step: 2 });

  // ---- bước 4: lối đi + Bọt, rùa biển sao ----
  add("M412 336C450 340 500 340 540 334C570 330 600 330 620 330", { open: true, stroke: INK3, sw: 0.9, dash: "2 5", step: 4, cls: "fade" });
  {
    const t = [648, 520];
    for (const f of [
      [
        [6, 4],
        [15, 10],
        [10, 4],
      ],
      [
        [-8, 5],
        [-14, 9],
        [-11, 4],
      ],
      [
        [6, -5],
        [14, -11],
        [10, -5],
      ],
      [
        [-8, -5],
        [-14, -9],
        [-11, -4],
      ],
    ])
      add(
        dp(
          f.map((p) => [t[0] + p[0], t[1] + p[1]] as Pt),
          true
        ),
        { tone: "#2f7d5b", op: 0.5, stroke: INK, sw: 0.8, step: 4 }
      );
    add(circ(t[0] + 16, t[1] - 1, 4), { tone: "#ffffff", stroke: INK, sw: 0.8, step: 4 });
    add(ell(t[0], t[1], 13, 8), { tone: "#2f7d5b", op: 0.45, stroke: INK, sw: 1, step: 4 });
    let st = "";
    for (let k = 0; k < 10; k++) {
      const a = -Math.PI / 2 + (k * Math.PI) / 5;
      const rr = k % 2 ? 2 : 4.6;
      st += (k ? "L" : "M") + r1(t[0] + Math.cos(a) * rr) + " " + r1(t[1] + Math.sin(a) * rr * 0.75);
    }
    add(st + "Z", { tone: "#e58ba3", stroke: INK, sw: 0.6, step: 4 });
  }
  // ---- Mochi, cáo mây (bước 4) ----
  {
    const m = [668, 326];
    const g = "mochi";
    const o = (x: number, y: number): Pt => [m[0] + x, m[1] + y];
    const C = (p: Pt, r: number) => circ(p[0], p[1], r);
    const E = (p: Pt, rx: number, ry: number) => ell(p[0], p[1], rx, ry);
    for (const s of [C(o(13, -11), 6.5), C(o(18, -18), 5), C(o(14, -24), 4)]) add(s, { tone: "#ffffff", stroke: INK, sw: 0.9, step: 4, g });
    add(E(o(1, -8), 10, 7), { tone: "#ffffff", stroke: INK, sw: 1, step: 4, g });
    add(dp([o(-13, -19), o(-12, -27), o(-8, -20)], true), { tone: "#ffffff", stroke: INK, sw: 0.9, step: 4, g });
    add(dp([o(-8, -20), o(-5, -27), o(-4, -18)], true), { tone: "#ffffff", stroke: INK, sw: 0.9, step: 4, g });
    add(C(o(-9, -15), 6), { tone: "#ffffff", stroke: INK, sw: 1, step: 4, g });
    add(dp([o(-14, -14), o(-19, -12), o(-14, -11)], true), { tone: "#ffffff", stroke: INK, sw: 0.9, step: 4, g });
    add(C(o(-10, -16.5), 0.9), { tone: INK, fillA: INK, stroke: INK, sw: 0.5, step: 4, g });
    add(C(o(-10.5, -12.5), 1.8), { tone: "#f2b8c6", bOnly: true, step: 4, g });
    add(`M${o(-5, -2)[0]} ${o(-5, -2)[1]}l-1 3M${o(6, -2)[0]} ${o(6, -2)[1]}l1 3`, { open: true, stroke: INK, sw: 1, step: 4, g });
  }
  // ---- Lữ khách (đi theo thanh cuộn) ----
  {
    const g = "lk";
    add("M13 -34L15 0", { open: true, stroke: "#57524d", sw: 1.2, g });
    add(
      dp(
        [
          [-4, -14],
          [-1, -14],
          [-4, 0],
          [-7, 0],
        ],
        true
      ),
      { tone: INK2, stroke: INK, sw: 0.9, g }
    );
    add(
      dp(
        [
          [0, -14],
          [3, -14],
          [7, 0],
          [4, 0],
        ],
        true
      ),
      { tone: INK2, stroke: INK, sw: 0.9, g }
    );
    add(
      dp(
        [
          [-10, -28],
          [-3, -29],
          [-3, -15],
          [-10, -14],
        ],
        true
      ),
      { tone: INK2, op: 0.9, stroke: INK, sw: 0.9, g }
    );
    add(
      dp(
        [
          [-5, -28],
          [3, -28],
          [6, -12],
          [-6, -12],
        ],
        true
      ),
      { tone: "#a35a00", op: 0.9, stroke: INK, sw: 1, g }
    );
    add(
      dp(
        [
          [-4, -29.5],
          [3.5, -29.5],
          [3.5, -26.5],
          [-4, -26.5],
        ],
        true
      ),
      { tone: "#b8202f", stroke: INK, sw: 0.8, g }
    );
    add(
      dp(
        [
          [-4, -28],
          [-10, -22],
          [-7.5, -21.5],
          [-2, -27],
        ],
        true
      ),
      { tone: "#b8202f", stroke: INK, sw: 0.7, g }
    );
    add("M1 -25L12 -21", { open: true, stroke: INK, sw: 1.1, g });
    add(circ(0, -33.5, 4.2), { tone: "#f3efea", stroke: INK, sw: 1, g });
    add(
      dp(
        [
          [-3.5, -36],
          [-2.5, -41],
          [2.5, -41],
          [3.5, -36],
        ],
        true
      ),
      { tone: "#9b948c", stroke: INK, sw: 0.9, g }
    );
    add(ell(0, -36, 8, 1.7), { tone: "#9b948c", stroke: INK, sw: 0.9, g });
  }

  const ann = [
    {
      step: 0,
      els: [
        ...label(232, 206, 150, 150, "Anh đào", null, "end"),
        ...label(686, 226, 750, 170, "Thông", null, "start"),
        ...label(574, 430, 640, 404, "Thác", null, "start"),
        ...label(700, 580, 740, 620, "Thành phố bên dưới", null, "end"),
        ...label(488, 580, 440, 620, "Hồ", null, "end"),
      ],
    },
    { step: 2, els: label(366, 318, 380, 404, "Tinh thể", null, "start") },
    {
      step: 3,
      els: [
        ...label(122, 318, 60, 400, "Trà Middlemist Red", null, "start"),
        ...label(176, 328, 150, 380, "Rafflesia", null, "end"),
        ...label(452, 288, 500, 240, "Lan hài Việt Nam", null, "start"),
        ...label(640, 320, 690, 370, "Welwitschia", null, "start"),
      ],
    },
    {
      step: 4,
      els: [...label(660, 306, 720, 282, "Mochi", "cáo mây", "start"), ...label(640, 516, 540, 470, "Bọt", "rùa biển sao", "end")],
    },
  ];
  const walker = label(0, -46, -30, -70, "Lữ khách", null, "end");

  return { shapes: S, ann, walker };
}
