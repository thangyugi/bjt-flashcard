/**
 * Ảnh thu nhỏ của loài / sinh vật cho Sổ tay thực vật: chiếu đám chấm lên canvas 2D.
 * Không cần WebGL hay three.js — vẫn vẽ được khi trình duyệt không hỗ trợ WebGL.
 */
import { SP } from "../data";
import { CREATURE_GEN } from "./creatures";
import { FW, PB, RT, TAU, clamp, mulberry32 } from "./math";
import { SPECIES_GEN } from "./species";

const SIZE = 152;
const cache = new Map<string, HTMLCanvasElement>();

function swatchFor(id: string, isCreature: boolean) {
  const key = (isCreature ? "c:" : "s:") + id;
  const hit = cache.get(key);
  if (hit) return hit;
  const r = mulberry32(42 + id.length * 13),
    b = new PB(r);
  const gen = isCreature ? CREATURE_GEN[id] : SPECIES_GEN[id];
  if (gen) gen(b, r, 0.55);
  b.bake(0, true, 0.75);
  const cv = document.createElement("canvas");
  cv.width = cv.height = SIZE;
  const g = cv.getContext("2d");
  if (!g) return cv;
  const grd = g.createRadialGradient(76, 110, 10, 76, 90, 110);
  grd.addColorStop(0, "#1c4a44");
  grd.addColorStop(1, "#071d1d");
  g.fillStyle = grd;
  g.fillRect(0, 0, SIZE, SIZE);
  const e = isCreature ? 0.35 : (SP[id]?.el ?? 0.3),
    ce = Math.cos(e),
    se = Math.sin(e);
  const pts: [number, number, number, number][] = [];
  let minx = 1e9,
    maxx = -1e9,
    miny = 1e9,
    maxy = -1e9;
  for (let i = 0; i < b.n; i++) {
    if (b.T[i] < -0.1) continue;
    const x = b.P[i * 3],
      y = b.P[i * 3 + 1],
      z = b.P[i * 3 + 2];
    const sx = isCreature ? x : x * RT[0] + z * RT[2],
      dpt = isCreature ? z : x * FW[0] + z * FW[2];
    const X = sx,
      Y = y * ce - dpt * se,
      Dp = dpt * ce + y * se;
    pts.push([X, Y, Dp, i]);
    minx = Math.min(minx, X);
    maxx = Math.max(maxx, X);
    miny = Math.min(miny, Y);
    maxy = Math.max(maxy, Y);
  }
  const span = Math.max(maxx - minx, maxy - miny) || 1,
    k = 124 / span,
    ox = 76 - ((minx + maxx) / 2) * k,
    oy = 76 + ((miny + maxy) / 2) * k;
  pts.sort((a, c) => a[2] - c[2]);
  g.globalCompositeOperation = id === "thuytinh" ? "lighter" : "source-over";
  for (const [X, Y, , i] of pts) {
    const c = [b.C[i * 3], b.C[i * 3 + 1], b.C[i * 3 + 2]].map((v) => Math.round(clamp(v, 0, 1) * 255));
    const rad = Math.max(0.9, b.S[i] * k * 0.55);
    g.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
    g.beginPath();
    g.arc(ox + X * k, oy - Y * k, rad, 0, TAU);
    g.fill();
  }
  cache.set(key, cv);
  return cv;
}

/** Vẽ ảnh thu nhỏ vào canvas cho sẵn */
export function paintSwatch(cv: HTMLCanvasElement, id: string, isCreature: boolean) {
  const src = swatchFor(id, isCreature);
  cv.width = cv.height = SIZE;
  cv.getContext("2d")?.drawImage(src, 0, 0);
}
