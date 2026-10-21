/**
 * Kết cấu vẽ tay dùng chung (giấy, nét cọ, lá, gỗ, mái ngói, vách đá, nước, biển hiệu…).
 * Không import three: các hàm nặng (giấy, vách đá, nước) chạy được trong worker.
 */
import { canvas, clamp, ctx2d, fbm, hex, mixc, smooth, vnoise, type AnyCanvas, type Rand, type Work } from "./core";

const tick16 = (w: Work | undefined, y: number, H: number) => {
  if (!w || (y & 15) !== 0) return;
  w.progress(y / H);
  return w.tick();
};

/** Giấy vẽ màu nước: R = sợi mịn, G = hạt sắc tố, B = loang lớn (dùng ở hậu kỳ) */
export async function paintPaper(w?: Work, S = 512) {
  const c = canvas(S, S),
    ctx = ctx2d(c),
    img = ctx.createImageData(S, S),
    d = img.data;
  for (let y = 0; y < S; y++) {
    await tick16(w, y, S);
    for (let x = 0; x < S; x++) {
      const u = x / S,
        v = y / S;
      const fine = 0.5 * vnoise(u * 180, v * 180, 31, 180) + 0.5 * vnoise(u * 64, v * 64, 32, 64);
      const fib = Math.pow(vnoise(u * 300, v * 24, 33, 300), 6);
      const coarse = fbm(u * 8, v * 8, 4, 34, 8);
      const gran = Math.pow(vnoise(u * 120, v * 120, 35, 120), 2.2);
      const k = (y * S + x) * 4;
      d[k] = 255 * clamp(0.9 + 0.1 * fine - 0.06 * fib, 0, 1);
      d[k + 1] = 255 * clamp(0.55 + 0.45 * (1 - gran) * (0.7 + 0.3 * coarse), 0, 1);
      d[k + 2] = 255 * coarse;
      d[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

/** Kênh nhiễu cho nước: R vệt dọc, G vệt chéo, B loang — lặp liền */
export async function paintWater(w?: Work) {
  const Wd = 256,
    H = 512,
    c = canvas(Wd, H),
    ctx = ctx2d(c),
    img = ctx.createImageData(Wd, H),
    d = img.data;
  for (let y = 0; y < H; y++) {
    await tick16(w, y, H);
    for (let x = 0; x < Wd; x++) {
      const u = x / Wd,
        v = y / H,
        k = (y * Wd + x) * 4;
      const s1 = vnoise(u * 18, v * 4, 41, 18) * 0.7 + vnoise(u * 36, v * 8, 42, 36) * 0.3;
      const s2 = vnoise(u * 11, v * 6, 43, 11) * 0.6 + vnoise(u * 44, v * 3, 44, 44) * 0.4;
      d[k] = 255 * s1;
      d[k + 1] = 255 * s2;
      d[k + 2] = 255 * fbm(u * 4, v * 8, 3, 45, 4);
      d[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

/** Vách đá nhiều tầng đất, nứt, gạch mực, cỏ rủ ở mép trên */
export async function paintCliff(rand: Rand, w?: Work, Wd = 1024, H = 512) {
  const { R, rng } = rand;
  const c = canvas(Wd, H),
    ctx = ctx2d(c);
  const img = ctx.createImageData(Wd, H),
    d = img.data;
  const bands = [0.07, 0.17, 0.29, 0.37, 0.5, 0.6, 0.71, 0.8, 0.9, 1.01];
  const cols = ["#6fae4a", "#d4a46a", "#b9824b", "#e2bd84", "#a8723f", "#cf9d62", "#94633a", "#c38e55", "#a06b3f", "#7d5232"].map(hex);
  const ink = hex("#5e3d24"),
    green = hex("#5d9a3e"),
    green2 = hex("#7fbf55");
  for (let y = 0; y < H; y++) {
    await tick16(w, y, H);
    const v = y / H;
    for (let x = 0; x < Wd; x++) {
      const u = x / Wd;
      const warp = (fbm(u * 6, v * 3, 2, 21, 6) - 0.5) * 0.07 + 0.012 * Math.sin(u * Math.PI * 2 * 3);
      const vv = v + warp;
      let b = 0;
      while (b < bands.length - 1 && vv > bands[b]) b++;
      let col: number[] = cols[b].slice();
      const g = fbm(u * 24, v * 10, 3, 22, 24);
      const t = 0.84 + 0.3 * g;
      col = [col[0] * t, col[1] * t, col[2] * t];
      const prev = b > 0 ? bands[b - 1] : 0,
        dEdge = Math.min(Math.abs(vv - prev), Math.abs(vv - bands[b]));
      col = mixc(col, ink, (1 - smooth(0.0, 0.016, dEdge)) * (0.45 + 0.4 * vnoise(u * 60, v * 4, 23, 60)) * (b > 0 ? 1 : 0));
      const sp = vnoise(u * 300, v * 150, 24, 300);
      if (sp > 0.8) col = mixc(col, ink, (sp - 0.8) * 1.6);
      const drip = 0.07 + 0.06 * Math.max(0, fbm(u * 40, 0.5, 2, 25, 40) - 0.45) * 3;
      if (v < drip) col = mixc(green2, green, v / drip);
      else if (v < drip + 0.015) col = mixc(col, ink, 0.6);
      col = mixc(col, [col[0] * 0.7, col[1] * 0.68, col[2] * 0.78], smooth(0.4, 1.0, v) * 0.6);
      const k = (y * Wd + x) * 4;
      d[k] = col[0];
      d[k + 1] = col[1];
      d[k + 2] = col[2];
      d[k + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const wrap = (fn: () => void) => {
    for (const o of [-Wd, 0, Wd]) {
      ctx.save();
      ctx.translate(o, 0);
      fn();
      ctx.restore();
    }
  };
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let i = 0; i < 46; i++) {
    const x0 = R(0, Wd),
      y0 = R(0.1, 0.75) * H,
      len = R(0.12, 0.38) * H;
    const pts: [number, number][] = [];
    let x = x0;
    for (let y = y0; y < y0 + len; y += 12) {
      x += R(-5, 5);
      pts.push([x, y]);
    }
    const lw = R(1.8, 3.6);
    wrap(() => {
      ctx.strokeStyle = "rgba(255,236,200,0.38)";
      ctx.lineWidth = lw * 0.8;
      ctx.beginPath();
      pts.forEach((p, j) => (j ? ctx.lineTo(p[0] + 3, p[1]) : ctx.moveTo(p[0] + 3, p[1])));
      ctx.stroke();
      ctx.strokeStyle = "rgba(62,38,22,0.85)";
      ctx.lineWidth = lw;
      ctx.beginPath();
      pts.forEach((p, j) => (j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.stroke();
    });
  }
  for (let i = 0; i < 110; i++) {
    const x0 = R(0, Wd),
      y0 = R(0.12, 0.95) * H,
      n = 3 + Math.floor(rng() * 5),
      L = R(8, 18);
    wrap(() => {
      ctx.strokeStyle = `rgba(62,38,22,${R(0.35, 0.6)})`;
      ctx.lineWidth = R(1, 1.8);
      ctx.beginPath();
      for (let k = 0; k < n; k++) {
        ctx.moveTo(x0 + k * 4, y0);
        ctx.lineTo(x0 + k * 4 - L * 0.5, y0 + L);
      }
      ctx.stroke();
    });
  }
  for (let i = 0; i < 160; i++) {
    const x0 = R(0, Wd),
      y0 = R(0.15, 0.9) * H;
    wrap(() => {
      ctx.strokeStyle = `rgba(250,226,180,${R(0.18, 0.4)})`;
      ctx.lineWidth = R(2, 4);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + R(20, 60), y0 + R(-2, 2));
      ctx.stroke();
    });
  }
  return c;
}

/* ---------- kết cấu nhỏ (vẽ trên luồng chính, vài mili giây mỗi cái) ---------- */
export interface StrokeOpts {
  bg?: string;
  w0?: number;
  w1?: number;
  l0?: number;
  l1?: number;
  angle?: number;
}
/** Vân cọ gần trắng cho vật thể tô màu theo đỉnh */
export function grayStrokes(rand: Rand, size: number, n: number, opts: StrokeOpts = {}) {
  const { R, rng } = rand;
  const c = canvas(size, size),
    ctx = ctx2d(c);
  ctx.fillStyle = opts.bg || "#f4f1ec";
  ctx.fillRect(0, 0, size, size);
  ctx.lineCap = "round";
  for (let i = 0; i < n; i++) {
    const x = R(0, size),
      y = R(0, size);
    ctx.strokeStyle = rng() < 0.5 ? `rgba(255,255,255,${R(0.3, 0.7)})` : `rgba(90,70,55,${R(0.06, 0.16)})`;
    ctx.lineWidth = R(opts.w0 || 2, opts.w1 || 6);
    const a = opts.angle !== undefined ? opts.angle + R(-0.25, 0.25) : R(0, Math.PI),
      L = R(opts.l0 || 8, opts.l1 || 28);
    for (const ox of [-size, 0, size])
      for (const oy of [-size, 0, size]) {
        ctx.beginPath();
        ctx.moveTo(x + ox, y + oy);
        ctx.lineTo(x + ox + Math.cos(a) * L, y + oy + Math.sin(a) * L);
        ctx.stroke();
      }
  }
  return c;
}

export function paintLeaf(rand: Rand, dark = "40,70,30", line = "30,55,25", bg = "#eef3e6") {
  const { R, rng } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 520; i++) {
    const x = R(0, S),
      y = R(0, S),
      r = R(7, 15),
      a = R(-0.6, 0.6);
    for (const ox of [-S, 0, S])
      for (const oy of [-S, 0, S]) {
        ctx.fillStyle = rng() < 0.5 ? `rgba(255,255,240,${R(0.25, 0.5)})` : `rgba(${dark},${R(0.08, 0.2)})`;
        ctx.beginPath();
        ctx.ellipse(x + ox, y + oy, r, r * 0.55, a, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${line},${R(0.25, 0.5)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x + ox, y + oy + r * 0.2, r * 0.8, Math.PI * 0.15, Math.PI * 0.85);
        ctx.stroke();
      }
  }
  return c;
}

export function paintWood(rand: Rand, knots = true) {
  const { R } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = "#f2e6d6";
  ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 70; i++) {
    const x = R(0, S);
    ctx.strokeStyle = `rgba(80,50,30,${R(0.12, 0.35)})`;
    ctx.lineWidth = R(1, 3);
    for (const ox of [-S, 0, S]) {
      ctx.beginPath();
      let xx = x;
      ctx.moveTo(xx + ox, 0);
      for (let y = 0; y <= S; y += 16) {
        xx += R(-2, 2);
        ctx.lineTo(xx + ox, y);
      }
      ctx.stroke();
    }
  }
  if (knots)
    for (let i = 0; i < 10; i++) {
      const x = R(0, S),
        y = R(0, S);
      ctx.strokeStyle = "rgba(70,42,25,0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y, R(3, 6), R(8, 14), 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  return c;
}

/** Tán hoa anh đào: kiểu cụm bầu dục (bản đồ làng sông) hoặc cánh 5 thùy (ga ven biển) */
export function paintBloom(rand: Rand, style: "oval" | "petal") {
  const { R, rng } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = "#fbf3f5";
  ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 900; i++) {
    const x = R(0, S),
      y = R(0, S),
      r = style === "oval" ? R(4, 9) : R(3, 7);
    for (const ox of [-S, 0, S])
      for (const oy of [-S, 0, S]) {
        if (style === "oval") {
          ctx.fillStyle = rng() < 0.55 ? `rgba(255,255,255,${R(0.35, 0.7)})` : `rgba(170,60,95,${R(0.06, 0.16)})`;
          ctx.beginPath();
          ctx.ellipse(x + ox, y + oy, r, r * 0.7, R(0, 3), 0, Math.PI * 2);
          ctx.fill();
          if (rng() < 0.25) {
            ctx.strokeStyle = `rgba(120,40,70,${R(0.2, 0.4)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(x + ox, y + oy + r * 0.2, r * 0.7, Math.PI * 0.2, Math.PI * 0.8);
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = rng() < 0.55 ? `rgba(255,255,255,${R(0.4, 0.8)})` : `rgba(200,90,130,${R(0.12, 0.28)})`;
          ctx.beginPath();
          for (let p = 0; p < 5; p++) {
            const a = (p / 5) * Math.PI * 2;
            ctx.moveTo(x + ox, y + oy);
            ctx.ellipse(x + ox + Math.cos(a) * r * 0.6, y + oy + Math.sin(a) * r * 0.6, r * 0.55, r * 0.35, a, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      }
  }
  if (style === "petal")
    for (let i = 0; i < 200; i++) {
      const x = R(0, S),
        y = R(0, S);
      ctx.strokeStyle = `rgba(150,60,90,${R(0.2, 0.4)})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x, y, R(5, 10), Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
    }
  return c;
}

/** Mái ngói kawara: gân dọc + hàng ngang (tô màu theo đỉnh) */
export function paintTiles(rand: Rand, style: "rib" | "row" | "lip") {
  const { R, rng } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  if (style === "row") {
    ctx.fillStyle = "#f3f1ed";
    ctx.fillRect(0, 0, S, S);
    const rows = 9,
      rh = S / rows;
    for (let r = 0; r < rows; r++) {
      const y = r * rh;
      ctx.fillStyle = "rgba(30,30,50,0.32)";
      ctx.fillRect(0, y + rh - 5, S, 5);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(0, y + 2, S, 4);
      ctx.strokeStyle = "rgba(30,30,50,0.28)";
      ctx.lineWidth = 2;
      for (let x = (r % 2) * 11; x < S; x += 22) {
        ctx.beginPath();
        ctx.moveTo(x, y + 4);
        ctx.lineTo(x, y + rh - 4);
        ctx.stroke();
      }
    }
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(${rng() < 0.5 ? "255,255,255" : "40,40,60"},${R(0.04, 0.1)})`;
      ctx.fillRect(R(0, S), R(0, S), R(4, 14), R(2, 5));
    }
    return c;
  }
  ctx.fillStyle = style === "rib" ? "#e6e8ee" : "#e4e6ea";
  ctx.fillRect(0, 0, S, S);
  const cw = 32;
  for (let x = 0; x < S; x += cw) {
    const g = ctx.createLinearGradient(x, 0, x + cw, 0);
    g.addColorStop(0, style === "rib" ? "rgba(40,50,70,0.35)" : "rgba(40,40,60,0.35)");
    g.addColorStop(0.35, style === "rib" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.5)");
    g.addColorStop(0.7, "rgba(255,255,255,0.1)");
    g.addColorStop(1, style === "rib" ? "rgba(40,50,70,0.45)" : "rgba(40,40,60,0.45)");
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, cw, S);
    if (style === "lip") {
      ctx.strokeStyle = "rgba(40,36,48,0.75)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, S);
      ctx.stroke();
    }
  }
  if (style === "rib") {
    for (let y = 0; y < S; y += 32) {
      ctx.fillStyle = "rgba(30,35,50,0.45)";
      ctx.fillRect(0, y, S, 3);
      for (let x = 0; x < S; x += 32) {
        ctx.strokeStyle = "rgba(30,35,50,0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + 16, y + 3, 14, 0, Math.PI);
        ctx.stroke();
      }
    }
  } else {
    for (let y = 0; y < S; y += 32)
      for (let x = 0; x < S; x += cw) {
        ctx.strokeStyle = "rgba(40,36,48,0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + cw / 2, y + 32 - 2, cw / 2 - 1, Math.PI * 0.05, Math.PI * 0.95);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(x + 6, y + 4, 4, 32 - 12);
      }
  }
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = `rgba(${rng() < 0.5 ? "255,255,255" : "40,40,60"},${R(0.04, 0.12)})`;
    ctx.fillRect(R(0, S), R(0, S), R(2, 8), R(6, 20));
  }
  return c;
}

/** Mái vảy cá (nhà tắm Cá) */
export function paintScales(rand: Rand) {
  const { R } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = "#eef2f2";
  ctx.fillRect(0, 0, S, S);
  const r = 16;
  for (let row = 0, y = 0; y < S + r; row++, y += r)
    for (let x = (row % 2) * r; x < S + r; x += 2 * r) {
      ctx.fillStyle = `rgba(255,255,255,${R(0.3, 0.6)})`;
      ctx.strokeStyle = "rgba(30,50,60,0.75)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  return c;
}

export function paintSoil(rand: Rand) {
  const { R, rng } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = "#f0e2d0";
  ctx.fillRect(0, 0, S, S);
  for (let y = 0; y < S; y += 32) {
    ctx.fillStyle = "rgba(70,40,20,0.35)";
    ctx.fillRect(0, y + 20, S, 10);
    ctx.fillStyle = "rgba(255,245,230,0.5)";
    ctx.fillRect(0, y + 4, S, 6);
  }
  for (let i = 0; i < 600; i++) {
    ctx.fillStyle = `rgba(${rng() < 0.5 ? "60,35,20" : "255,250,240"},${R(0.15, 0.35)})`;
    ctx.beginPath();
    ctx.arc(R(0, S), R(0, S), R(1, 3), 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

/** Đá xây (cầu cạn) */
export function paintStoneBlocks(rand: Rand) {
  const { R, rng, pick } = rand;
  const S = 256,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = "#cfc6b6";
  ctx.fillRect(0, 0, S, S);
  const rows = 6,
    rh = S / rows;
  for (let r = 0; r < rows; r++) {
    let x = r % 2 ? -R(10, 30) : 0;
    while (x < S) {
      const w = R(36, 64),
        col = pick(["#ece5d6", "#e2d9c6", "#d8cdb8", "#efe9dc", "#cfc4ae"]);
      ctx.fillStyle = col;
      ctx.fillRect(x + 2, r * rh + 2, w - 4, rh - 4);
      ctx.strokeStyle = "rgba(80,60,45,0.75)";
      ctx.lineWidth = 2.2;
      ctx.strokeRect(x + 2, r * rh + 2, w - 4, rh - 4);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(x + 4, r * rh + 4, w - 10, 3);
      x += w;
    }
  }
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = `rgba(${rng() < 0.5 ? "255,255,255" : "90,70,50"},${R(0.05, 0.15)})`;
    ctx.fillRect(R(0, S), R(0, S), R(2, 7), R(2, 7));
  }
  return c;
}

/** Tường đá khô ishigaki */
export function paintIshigaki(rand: Rand) {
  const { R, rng, pick } = rand;
  const Wd = 1024,
    H = 256,
    c = canvas(Wd, H),
    ctx = ctx2d(c);
  ctx.fillStyle = "#6d6458";
  ctx.fillRect(0, 0, Wd, H);
  const top = 38;
  ctx.fillStyle = "#7fbf55";
  ctx.fillRect(0, 0, Wd, top);
  let y = top;
  while (y < H) {
    const rh = R(30, 46);
    let x = R(-40, 0);
    while (x < Wd + 40) {
      const w = R(48, 96);
      const col = pick(["#c9c1b1", "#b8b0a0", "#d6cfbf", "#aea594", "#c2b8a4"]);
      for (const o of [-Wd, 0, Wd]) {
        ctx.fillStyle = col;
        ctx.strokeStyle = "rgba(55,42,30,0.9)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(x + o + 2, y + 2, w - 4, rh - 4, 9);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(255,250,235,0.35)";
        ctx.beginPath();
        ctx.roundRect(x + o + 6, y + 5, w - 16, 6, 3);
        ctx.fill();
        if (rng() < 0.25) {
          ctx.fillStyle = "rgba(110,150,70,0.7)";
          ctx.beginPath();
          ctx.ellipse(x + o + R(8, w - 8), y + R(4, rh - 4), R(5, 12), R(3, 6), 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      x += w;
    }
    y += rh;
  }
  for (let x = 0; x < Wd; x += 6) {
    ctx.fillStyle = "#5d9a3e";
    ctx.fillRect(x, top - 2, 6, R(3, 16));
  }
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0.5, "rgba(40,40,70,0)");
  g.addColorStop(1, "rgba(40,40,70,0.35)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, Wd, H);
  return c;
}

export function paintSoft() {
  const S = 128,
    c = canvas(S, S),
    ctx = ctx2d(c);
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,0.75)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return c;
}
export function paintBlob() {
  const S = 128,
    c = canvas(S, S),
    ctx = ctx2d(c);
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
  g.addColorStop(0, "rgba(59,42,30,0.55)");
  g.addColorStop(0.7, "rgba(59,42,30,0.25)");
  g.addColorStop(1, "rgba(59,42,30,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return c;
}
/** Cánh bướm */
export function paintWing() {
  const S = 128,
    c = canvas(S, S),
    ctx = ctx2d(c);
  ctx.fillStyle = "#f2a33a";
  ctx.strokeStyle = "#3b2a1e";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(64, 46, 54, 38, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f6d55c";
  ctx.beginPath();
  ctx.ellipse(52, 96, 34, 24, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fffaf0";
  for (const [x, y] of [
    [84, 34],
    [60, 30],
    [44, 92],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

export interface SignOpts {
  /** Mũi tên: 1 phải, -1 trái, 0 không */
  tip?: number;
  bg?: string;
  fg?: string;
  /** Khung viền (ga ven biển) */
  frame?: boolean;
  font: string;
  h?: number;
  fs?: number;
}
/** Biển gỗ có chữ Việt */
export function paintSign(rand: Rand, text: string, o: SignOpts): AnyCanvas {
  const { R } = rand;
  const tip = o.tip ?? 0;
  const Wd = 512,
    H = o.h ?? 144,
    c = canvas(Wd, H),
    ctx = ctx2d(c);
  ctx.fillStyle = o.bg ?? "#d6a96c";
  ctx.fillRect(0, 0, Wd, H);
  for (let i = 0; i < 26; i++) {
    ctx.strokeStyle = `rgba(110,70,40,${R(0.1, 0.28)})`;
    ctx.lineWidth = R(1, 3);
    ctx.beginPath();
    let y = R(0, H);
    ctx.moveTo(0, y);
    for (let x = 0; x <= Wd; x += 32) {
      y += R(-2, 2);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  const x0 = tip < 0 ? Wd * 0.17 : Wd * 0.03,
    x1 = tip > 0 ? Wd * 0.83 : Wd * 0.97;
  ctx.fillStyle = o.fg ?? "#3b2a1e";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let fs = o.fs ?? 78;
  const font = () => `800 ${fs}px ${o.font}`;
  ctx.font = font();
  while (ctx.measureText(text).width > (x1 - x0) * 0.86 && fs > 26) {
    fs -= 4;
    ctx.font = font();
  }
  ctx.fillText(text, (x0 + x1) / 2, H / 2 + 4);
  if (o.frame && !tip) {
    ctx.strokeStyle = "#5a3a26";
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, Wd - 10, H - 10);
  }
  return c;
}
