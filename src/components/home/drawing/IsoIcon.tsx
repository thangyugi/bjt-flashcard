import { DRAW, HID, INK, INK3, PAPER, dp, r1, type Pt, type Pt3 } from "./kit";

/*
 * Hình isometric nét mảnh cho các cột (Kế hoạch, Phần thưởng, Chuỗi, từng khóa học).
 * Tính sẵn lúc render phía server; mặt nào có class "acc" sẽ được tô màu của cột (khóa học / dải Hôm nay) khi rê chuột (xem home.css).
 */

type El =
  | { k: "path"; d: string; fill: string; stroke: string; w: number; dash?: string; cls?: string; cap?: boolean }
  | { k: "text"; x: number; y: number; size: number; transform: string; text: string; cls: string };

interface Api {
  ip: (x: number, y: number, z: number) => Pt;
  face: (arr: Pt3[], cls: string, acc: boolean) => El & { k: "path" };
  line: (a: Pt3, b: Pt3, o?: { hid?: boolean; col?: string; w?: number; cls?: string }) => void;
  poly: (arr: Pt3[], o?: { close?: boolean; fill?: string; col?: string; w?: number; hid?: boolean; cls?: string }) => void;
  box: (x: number, y: number, z: number, w: number, h: number, d: number, o?: { acc?: string; wire?: boolean; noHid?: boolean }) => void;
  text: (t: Omit<El & { k: "text" }, "k">) => void;
  s: number;
}

function iso(draw: (I: Api) => void) {
  const s = 10;
  const C = 0.866;
  const Sn = 0.5;
  const pts: Pt[] = [];
  const els: El[] = [];
  const ip = (x: number, y: number, z: number): Pt => {
    const p: Pt = [(x - z) * C * s, (x + z) * Sn * s - y * s];
    pts.push(p);
    return p;
  };
  const face: Api["face"] = (arr, cls, acc) => {
    const el = { k: "path" as const, d: dp(arr.map((a) => ip(...a)), true), fill: PAPER, stroke: DRAW, w: 1, cls: (acc ? "acc " : "") + cls };
    els.push(el);
    return el;
  };
  const line: Api["line"] = (a, b, o = {}) => {
    els.push({ k: "path", d: dp([ip(...a), ip(...b)]), fill: "none", stroke: o.hid ? HID : (o.col ?? DRAW), w: o.w ?? 1, dash: o.hid ? "3 3" : undefined, cls: o.cls, cap: true });
  };
  const poly: Api["poly"] = (arr, o = {}) => {
    els.push({ k: "path", d: dp(arr.map((a) => ip(...a)), o.close), fill: o.fill ?? "none", stroke: o.col ?? DRAW, w: o.w ?? 1, dash: o.hid ? "3 3" : undefined, cls: o.cls, cap: true });
  };
  const box: Api["box"] = (x, y, z, w, h, d, o = {}) => {
    const x1 = x + w;
    const y1 = y + h;
    const z1 = z + d;
    const acc = o.acc ?? "";
    if (o.wire) {
      const V: Pt3[] = [
        [x, y, z],
        [x1, y, z],
        [x1, y, z1],
        [x, y, z1],
        [x, y1, z],
        [x1, y1, z],
        [x1, y1, z1],
        [x, y1, z1],
      ];
      const E = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];
      for (const e of E) line(V[e[0]], V[e[1]], { hid: true });
      return;
    }
    face(
      [
        [x, y1, z],
        [x1, y1, z],
        [x1, y1, z1],
        [x, y1, z1],
      ],
      "ft",
      acc.includes("t")
    );
    face(
      [
        [x, y, z1],
        [x1, y, z1],
        [x1, y1, z1],
        [x, y1, z1],
      ],
      "fl",
      acc.includes("l")
    );
    face(
      [
        [x1, y, z],
        [x1, y1, z],
        [x1, y1, z1],
        [x1, y, z1],
      ],
      "fr",
      acc.includes("r")
    );
    if (!o.noHid) {
      line([x, y, z], [x1, y, z], { hid: true });
      line([x, y, z], [x, y1, z], { hid: true });
      line([x, y, z], [x, y, z1], { hid: true });
    }
  };
  const text: Api["text"] = (t) => els.push({ k: "text", ...t });
  draw({ ip, face, line, poly, box, text, s });
  let x0 = 1e9;
  let y0 = 1e9;
  let x1 = -1e9;
  let y1 = -1e9;
  for (const p of pts) {
    x0 = Math.min(x0, p[0]);
    y0 = Math.min(y0, p[1]);
    x1 = Math.max(x1, p[0]);
    y1 = Math.max(y1, p[1]);
  }
  const pad = 6;
  return { viewBox: `${r1(x0 - pad)} ${r1(y0 - pad)} ${r1(x1 - x0 + 2 * pad)} ${r1(y1 - y0 + 2 * pad)}`, els };
}

const ICONS = {
  plan(I: Api) {
    I.box(0, 0, 0, 12, 0.8, 15);
    I.box(4, 0.8, -1.2, 4, 1.3, 2.2, { acc: "tlr" });
    [3, 7, 11].forEach((z, i) => {
      I.box(1.4, 0.8, z, 2, 0.5, 2, { acc: "tlr" });
      I.box(5, 0.8, z + 0.45, 5.6, 0.3, 1.1, { noHid: true });
      I.box(5, 0.8, z + 1.9, 3.4, 0.2, 0.6, { noHid: true });
      if (i < 2)
        I.poly(
          [
            [1.9, 1.3, z + 1.0],
            [2.4, 1.3, z + 1.55],
            [3.1, 1.3, z + 0.4],
          ],
          { col: INK, w: 1.6 }
        );
    });
  },
  gift(I: Api) {
    I.box(0, 0, 0, 9, 4.4, 6, { acc: "lr" });
    I.box(-0.2, 4.4, -0.2, 9.4, 1.6, 6.4, { acc: "tlr" });
    I.line([4, 0, 6], [4, 4.4, 6]);
    I.line([5, 0, 6], [5, 4.4, 6]);
    I.line([3.95, 4.4, 6.2], [3.95, 6, 6.2]);
    I.line([5.05, 4.4, 6.2], [5.05, 6, 6.2]);
    I.line([3.95, 6, -0.2], [3.95, 6, 6.2]);
    I.line([5.05, 6, -0.2], [5.05, 6, 6.2]);
    const oct = (cx: number, cy: number, cz: number, R: number, Hh: number, c?: string) => {
      const T: Pt3 = [cx, cy + Hh, cz];
      const B: Pt3 = [cx, cy - Hh, cz];
      const px: Pt3 = [cx + R, cy, cz];
      const nx: Pt3 = [cx - R, cy, cz];
      const pz: Pt3 = [cx, cy, cz + R];
      const nz: Pt3 = [cx, cy, cz - R];
      I.line(B, nx, { hid: true });
      I.line(B, nz, { hid: true });
      for (const f of [
        [T, px, nz],
        [T, nx, pz],
        [T, px, pz],
        [B, px, pz],
      ])
        I.face(f, "fo", false).fill = c ?? PAPER;
    };
    oct(4.5, 10.8, 3, 2, 2.9, "#fbedee");
    oct(1.2, 8.6, 3, 0.8, 1.1);
    oct(8.2, 9.4, 3, 0.9, 1.25);
    I.line([4.5, 7.6, 3], [4.5, 6.6, 3], { hid: true });
  },
  streak(I: Api) {
    for (let i = 0; i < 7; i++) {
      if (i === 6) I.box(i * 1.75, 0, 0, 1.4, 1.2 + i * 0.95, 4, { wire: true });
      else I.box(i * 1.75, 0, 0, 1.4, 1.2 + i * 0.95, 4, { acc: "tlr", noHid: i > 0 });
    }
    I.line([0, 0, 4.8], [12, 0, 4.8], { hid: true });
  },
  n1(I: Api) {
    I.box(0, 0, 0, 10, 1, 10);
    I.box(2, 1, 2, 6, 6, 6, { acc: "tlr" });
    const o = I.ip(2, 7, 8);
    I.text({ x: 3, y: 4.35, size: 4.2, transform: `matrix(${0.866 * I.s},${0.5 * I.s},0,${I.s},${r1(o[0])},${r1(o[1])})`, text: "語", cls: "glyph" });
    I.box(3.1, 7, 4.6, 0.5, 3.4, 0.5, { noHid: true });
    I.box(6.4, 7, 4.6, 0.5, 3.4, 0.5, { noHid: true });
    I.box(2.6, 9.1, 4.65, 4.8, 0.35, 0.4, { noHid: true });
    I.box(2.1, 10.4, 4.45, 5.8, 0.5, 0.75, { acc: "tlr", noHid: true });
  },
  ipa(I: Api) {
    I.box(0, 0, 0, 13, 1.2, 7);
    I.poly(
      [
        [2, 0, 7],
        [4.6, 0, 7],
        [1.2, -2.4, 7],
      ],
      { close: true, fill: PAPER }
    );
    I.line([1.2, -2.4, 7], [1.2, -2.4, 5.8], { hid: true });
    [1.2, 2.6, 4.2, 5.8, 7, 5.8, 4.2, 2.6, 1.2].forEach((h, i) => I.box(1.3 + i * 1.25, 1.2, 2.6, 0.72, h * 0.85, 1.8, { acc: "tlr", noHid: true }));
  },
  oci(I: Api) {
    for (const [k, yy] of [
      [0, 0],
      [1, 3.2],
      [2, 6.4],
    ]) {
      I.box(0, yy, 0, 10, 0.8, 10, { acc: k === 2 ? "tlr" : "", noHid: k > 0 });
      if (k < 2)
        for (const c of [
          [0, 10],
          [10, 10],
          [10, 0],
        ])
          I.line([c[0], yy + 0.8, c[1]], [c[0], yy + 3.2, c[1]], { hid: true });
    }
    I.box(3, 7.2, 3, 4, 1, 4, { acc: "tlr", noHid: true });
    for (let k = 0; k < 4; k++) {
      const x = 3.5 + k;
      I.line([x, 7.2, 7], [x, 7.2, 8.1]);
      I.line([7, 7.2, 3.5 + k], [8.1, 7.2, 3.5 + k]);
    }
    const cl: Pt3[] = [];
    const cz = 5;
    const cy = 11.6;
    for (let i = 0; i <= 40; i++) {
      const a = Math.PI - (i / 40) * Math.PI;
      const bump = 1 + 0.18 * Math.abs(Math.sin(a * 3));
      cl.push([5 + Math.cos(a) * 4.2 * bump, cy + Math.sin(a) * 2.2 * bump, cz]);
    }
    cl.push([9.2, cy - 0.6, cz], [0.8, cy - 0.6, cz]);
    I.poly(cl, { close: true, fill: PAPER });
    I.line([5, cy - 0.6, cz], [5, 8.2, cz], { hid: true });
  },
  bjt(I: Api) {
    I.box(0, 0, 0, 5, 15, 5, { acc: "tlr" });
    I.box(1, 15, 1, 3, 1.4, 3, { noHid: true });
    for (let yy = 1.5; yy < 15; yy += 1.5) {
      I.line([0, yy, 5], [5, yy, 5], { w: 0.8 });
      I.line([5, yy, 5], [5, yy, 0], { w: 0.8 });
    }
    for (const u of [1.25, 2.5, 3.75]) {
      I.line([u, 0, 5], [u, 15, 5], { w: 0.8 });
      I.line([5, 0, u], [5, 15, u], { w: 0.8 });
    }
    I.box(7, 0, 2.2, 5, 3.4, 1.6, { acc: "tlr", noHid: true });
    I.poly([
      [8.8, 3.4, 3],
      [8.8, 4.3, 3],
      [10.2, 4.3, 3],
      [10.2, 3.4, 3],
    ]);
    I.line([7, 2.2, 3.8], [12, 2.2, 3.8]);
  },
  /** CCAR-P: mặt tiền kiến trúc — bệ, ba cột, xà và mái */
  ccar(I: Api) {
    I.box(0, 0, 0, 11, 0.8, 8);
    for (const x of [1.2, 4.7, 8.2]) I.box(x, 0.8, 3, 1.6, 6, 1.6, { noHid: true });
    I.box(0.4, 6.8, 2.4, 10.2, 1, 2.8, { acc: "tlr", noHid: true });
    I.poly(
      [
        [0.4, 7.8, 5.2],
        [10.6, 7.8, 5.2],
        [5.5, 10.4, 5.2],
      ],
      { close: true, fill: PAPER }
    );
    I.line([5.5, 10.4, 5.2], [5.5, 10.4, 2.4]);
    I.line([5.5, 10.4, 2.4], [10.6, 7.8, 2.4], { hid: true });
  },
  /** Portfolio · Introduce: tấm thẻ tên đứng trên đế, chữ 私 */
  intro(I: Api) {
    I.box(0, 0, 0, 10, 0.8, 8);
    I.box(3.4, 0.8, 3.6, 3.2, 0.5, 2.2, { noHid: true });
    I.box(2, 1.3, 4.2, 6, 7.4, 1, { acc: "tlr", noHid: true });
    const o = I.ip(2, 8.7, 5.2);
    I.text({ x: 3, y: 5.1, size: 4, transform: `matrix(${0.866 * I.s},${0.5 * I.s},0,${I.s},${r1(o[0])},${r1(o[1])})`, text: "私", cls: "glyph" });
  },
  /** Portfolio · Interview Q&A: hai khối hỏi / đáp */
  qa(I: Api) {
    I.box(0, 0, 0, 13, 0.8, 8);
    I.box(7, 0.8, 1.6, 5, 7.2, 1.4, { acc: "tlr", noHid: true });
    const o2 = I.ip(7, 8, 3);
    I.text({ x: 2.5, y: 4.9, size: 3.6, transform: `matrix(${0.866 * I.s},${0.5 * I.s},0,${I.s},${r1(o2[0])},${r1(o2[1])})`, text: "答", cls: "glyph" });
    I.box(1, 0.8, 4.6, 5, 5, 1.4, { acc: "tlr", noHid: true });
    const o1 = I.ip(1, 5.8, 6);
    I.text({ x: 2.5, y: 3.8, size: 3.6, transform: `matrix(${0.866 * I.s},${0.5 * I.s},0,${I.s},${r1(o1[0])},${r1(o1[1])})`, text: "問", cls: "glyph" });
  },
  /** Portfolio · 職務経歴書: xấp giấy có dòng kẻ và cây bút */
  resume(I: Api) {
    I.box(0, 0, 0, 9, 0.35, 12);
    I.box(0.5, 0.35, 0.5, 9, 0.35, 12, { noHid: true });
    I.box(1, 0.7, 1, 9, 0.35, 12, { acc: "tlr", noHid: true });
    I.poly(
      [
        [2.2, 1.05, 2],
        [4.6, 1.05, 2],
        [4.6, 1.05, 5],
        [2.2, 1.05, 5],
      ],
      { close: true, fill: PAPER }
    );
    for (const z of [2.4, 3.6, 4.8]) I.line([5.4, 1.05, z], [8.8, 1.05, z], { w: 0.8 });
    for (const z of [6.6, 7.8, 9, 10.2]) I.line([2.2, 1.05, z], [8.8, 1.05, z], { w: 0.8 });
    I.box(11, 0, 1.5, 0.9, 0.9, 9.5, { acc: "tlr", noHid: true });
  },
  soon(I: Api) {
    I.box(0, 0, 0, 9, 0.6, 9);
    I.box(0.5, 0.6, 0.5, 8, 8, 8, { wire: true });
    I.box(1.5, 0.6, 5.5, 2.4, 1.2, 2.4, { noHid: true });
    I.box(1.5, 1.8, 5.5, 2.4, 1.2, 2.4, { noHid: true });
  },
};

export type IsoName = keyof typeof ICONS;

/** Hình isometric trang trí (aria-hidden) */
export function IsoIcon({ name }: { name: IsoName }) {
  const { viewBox, els } = iso(ICONS[name]);
  return (
    <svg className="ico" viewBox={viewBox} aria-hidden focusable="false">
      {els.map((e, i) =>
        e.k === "path" ? (
          <path
            key={i}
            d={e.d}
            fill={e.fill}
            stroke={e.stroke}
            strokeWidth={e.w}
            strokeDasharray={e.dash}
            strokeLinejoin="round"
            strokeLinecap={e.cap ? "round" : undefined}
            className={e.cls}
          />
        ) : (
          <text
            key={i}
            x={e.x}
            y={e.y}
            fontSize={e.size}
            textAnchor="middle"
            className={e.cls}
            fill={INK3}
            transform={e.transform}
            fontWeight={700}
            style={{ fontFamily: "var(--font-shippori), 'Hiragino Mincho ProN', 'Yu Mincho', serif" }}
          >
            {e.text}
          </text>
        )
      )}
    </svg>
  );
}
