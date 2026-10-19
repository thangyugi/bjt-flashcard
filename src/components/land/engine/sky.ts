/**
 * Bầu trời: sao, hành tinh khí có vành, mặt trời, hai mặt trăng — và chu kỳ ngày/đêm theo giờ thật.
 */
import * as THREE from "three";
import { GA, PB, TAU, add, clamp, hx, mix, mul, mulberry32, noise, randSphere, sstep, type Vec3 } from "./math";
import { addPoints, type Ctx, type DotMaterial, type Dots } from "./render";
import { SKYD } from "./world";

export interface SkyBuild {
  group: THREE.Group;
  stars: DotMaterial;
  giant: DotMaterial;
  ring: DotMaterial;
  moon1: DotMaterial;
  moon2: DotMaterial;
  sun: Dots;
  basis: { right: THREE.Vector3; fwd: THREE.Vector3 };
}

/** Dựng bầu trời theo hướng camera ban đầu (hành tinh & trăng nằm trong khung hình mở đầu) */
export function buildSky(ctx: Ctx, camera: THREE.PerspectiveCamera): SkyBuild {
  const { D, small } = ctx;
  const group = new THREE.Group();
  ctx.scene.add(group);
  const rs = mulberry32(77);
  const stars = new PB(rs);
  for (let i = 0; i < 2600 * D; i++) {
    const n = randSphere(rs);
    if (n[1] < -0.15) n[1] = -n[1];
    const c = rs() < 0.3 ? hx("#ffe6c4") : rs() < 0.5 ? hx("#bff7ee") : hx("#f2f4ff");
    stars.add(n[0] * 900, n[1] * 900, n[2] * 900, mul(c, 0.6 + rs() * 0.4), 2.6 + rs() * 3, 0, 0, 0.8);
  }
  const starsMat = addPoints(ctx, stars, { add: true, lit: 0, fog: 0 }, -3, group).material;
  const fwd = new THREE.Vector3();
  camera.getWorldDirection(fwd);
  const right = new THREE.Vector3().crossVectors(fwd, camera.up).normalize(),
    upS = new THREE.Vector3().crossVectors(right, fwd).normalize();
  const fh = new THREE.Vector3(fwd.x, 0, fwd.z).normalize(),
    rh = new THREE.Vector3(right.x, 0, right.z).normalize();
  const dirAt = (azL: number, el: number) => {
    const a = THREE.MathUtils.degToRad(azL),
      e = THREE.MathUtils.degToRad(el);
    return fh
      .clone()
      .multiplyScalar(Math.cos(a))
      .addScaledVector(rh, -Math.sin(a))
      .multiplyScalar(Math.cos(e))
      .add(new THREE.Vector3(0, Math.sin(e), 0))
      .normalize();
  };
  const toCam = (v: THREE.Vector3) => camera.position.clone().sub(v).normalize();
  const gc = camera.position.clone().add(dirAt(small ? 3 : 10, 3.2).multiplyScalar(SKYD)),
    GR = ((small ? 6.5 : 8.5) * SKYD) / 130;
  const vc = toCam(gc),
    Lg = right.clone().multiplyScalar(-0.8).add(fwd.clone().multiplyScalar(-0.45)).add(upS.clone().multiplyScalar(0.3)).normalize();
  const axis = new THREE.Vector3(0.25, 1, 0.1).normalize();
  const gp = new PB(rs),
    N = Math.floor(22000 * D),
    ps = (0.62 * GR) / 17;
  const bandC = [hx("#f1d9b0"), hx("#d99a5b"), hx("#c9787a"), hx("#e8c08f"), hx("#7fa39a"), hx("#b8685a")];
  for (let i = 0; i < N; i++) {
    const y = 1 - ((i + 0.5) / N) * 2,
      rr = Math.sqrt(1 - y * y),
      th = i * GA;
    const n = new THREE.Vector3(Math.cos(th) * rr, y, Math.sin(th) * rr);
    const vis = n.dot(vc);
    if (vis < -0.05) continue;
    const lat = Math.asin(clamp(n.dot(axis), -1, 1)),
      lon = Math.atan2(n.z, n.x);
    const bv = lat * 9 + 0.35 * Math.sin(lon * 3 + lat * 7) + 0.15 * noise(lon * 4, lat * 12);
    const bi = Math.floor(((bv % 6) + 6) % 6);
    let c = mix(bandC[bi], bandC[(bi + 1) % 6], ((((bv % 1) + 1) % 1) ** 3));
    const sx = lon - 0.9,
      sy = lat + 0.32;
    if ((sx * sx) / 0.05 + (sy * sy) / 0.006 < 1) c = mix(c, hx("#d0544a"), 0.75);
    const l = sstep(-0.12, 0.65, n.dot(Lg));
    const rim = Math.pow(1 - Math.max(0, vis), 3);
    c = add(mul(c, 0.05 + 0.95 * l), mul(hx("#5fd0c0"), rim * 0.35 * (0.3 + l)));
    if (l < 0.03 && rs() < 0.7) continue;
    gp.add(gc.x + n.x * GR, gc.y + n.y * GR, gc.z + n.z * GR, c, ps, 0, 0, 0);
  }
  const giant = addPoints(ctx, gp, { lit: 0, fog: 0 }, -2, group).material;
  const rg = new PB(rs),
    ru = new THREE.Vector3().crossVectors(axis, new THREE.Vector3(1, 0, 0)).normalize(),
    rv = new THREE.Vector3().crossVectors(axis, ru);
  for (let i = 0; i < 6000 * D; i++) {
    const rr = GR * (1.45 + rs() * 0.9),
      a = rs() * TAU;
    if (Math.abs(rr / GR - 1.95) < 0.05) continue;
    const p = ru
      .clone()
      .multiplyScalar(Math.cos(a) * rr)
      .add(rv.clone().multiplyScalar(Math.sin(a) * rr));
    const along = p.dot(vc),
      perp = p.clone().sub(vc.clone().multiplyScalar(along)).length();
    if (along < 0 && perp < GR) continue;
    rg.add(gc.x + p.x, gc.y + p.y, gc.z + p.z, mul(mix(hx("#e8d2a4"), hx("#c99a7a"), rs()), 0.42), ps * 0.8, 0, 0, 0.1);
  }
  const ring = addPoints(ctx, rg, { add: true, lit: 0, fog: 0 }, -2, group).material;
  const moon = (nx: number, ny: number, MR: number, Lm: THREE.Vector3, tint: Vec3[], n0: number) => {
    const mc = camera.position.clone().add(dirAt(nx, ny).multiplyScalar(SKYD)),
      vm = toCam(mc),
      mp = new PB(rs);
    for (let i = 0; i < n0 * D; i++) {
      const n = new THREE.Vector3(...randSphere(rs));
      if (n.dot(vm) < 0) continue;
      const l = sstep(0.0, 0.35, n.dot(Lm));
      if (l < 0.02 && rs() < 0.9) continue;
      mp.add(mc.x + n.x * MR, mc.y + n.y * MR, mc.z + n.z * MR, mix(hx("#1e3a3a"), mix(tint[0], tint[1], rs() * 0.4), l), (0.36 * SKYD) / 120, 0, 0, l * 0.5);
    }
    return addPoints(ctx, mp, { add: true, lit: 0, fog: 0 }, -2, group).material;
  };
  const moon1 = moon(small ? -7 : -8, 4.6, (3.6 * SKYD) / 120, right.clone().multiplyScalar(-0.6).add(fwd.clone().multiplyScalar(1.1)).normalize(), [hx("#fff1dc"), hx("#ffd0c0")], 4200);
  const moon2 = moon(small ? -2 : -15, small ? 3.4 : 2.6, (2.0 * SKYD) / 120, right.clone().multiplyScalar(-0.7).add(fwd.clone().multiplyScalar(-0.4)).normalize(), [hx("#cff7ff"), hx("#a8e6ff")], 2200);
  const sb = new PB(rs);
  for (let i = 0; i < 900; i++) {
    const a = rs() * TAU,
      rr = Math.pow(rs(), 1.6);
    sb.add(Math.cos(a) * rr * 14, Math.sin(a) * rr * 14, 0, mix(hx("#fff6d8"), hx("#ffb36a"), rr), 3 + (1 - rr) * 5, 0, 0, 0.3);
  }
  const sun = addPoints(ctx, sb, { add: true, lit: 0, fog: 0 }, -2, group);
  return { group, stars: starsMat, giant, ring, moon1, moon2, sun, basis: { right, fwd } };
}

const _hd = new THREE.Vector3(),
  _up = new THREE.Vector3();
/** Đặt mặt trời theo giờ (mọc ~6h, lặn ~18h) */
export function placeSun(sky: SkyBuild, h: number) {
  const { right, fwd } = sky.basis;
  const e = Math.sin((Math.PI * (h - 5.9)) / 12.8) * 1.0;
  const hd = _hd.copy(right).multiplyScalar(-0.88).add(_up.set(fwd.x, 0, fwd.z).normalize().multiplyScalar(0.35));
  hd.y = 0;
  hd.normalize();
  const dir = hd.multiplyScalar(Math.cos(e)).add(_up.set(0, Math.sin(e), 0)).normalize();
  sky.sun.position.copy(dir.multiplyScalar(SKYD * 0.95));
  sky.sun.lookAt(0, 0, 0);
  sky.sun.material.uniforms.uOpacity.value = sstep(-0.06, 0.06, e);
}

/* ================================ ngày / đêm ================================ */
interface TodKey {
  top: Vec3;
  mid: Vec3;
  hor: Vec3;
  glow: number[];
  tint: Vec3;
  fog: Vec3;
  night: number;
}
const key = (top: string, mid: string, hor: string, glow: number[], tint: Vec3, fog: string, night: number): TodKey => ({
  top: hx(top),
  mid: hx(mid),
  hor: hx(hor),
  glow,
  tint,
  fog: hx(fog),
  night,
});
const NIGHT = key("#020a12", "#071a2a", "#14304a", [90, 130, 200, 0.16], [0.4, 0.45, 0.66], "#132a40", 1);
const TOD_KEYS: [number, TodKey][] = [
  [0, NIGHT],
  [4.9, NIGHT],
  [6.0, key("#1a2748", "#5d5a80", "#f2a98f", [255, 170, 140, 0.55], [0.88, 0.74, 0.8], "#b9939e", 0.3)],
  [7.6, key("#1d6f8a", "#79c0c8", "#e3f1e6", [255, 240, 200, 0.3], [1, 0.98, 0.95], "#bcd6d6", 0)],
  [12, key("#16708f", "#66bcc8", "#d9efe8", [255, 255, 235, 0.22], [1.06, 1.05, 1.0], "#c2dcdc", 0)],
  [16.2, key("#1a6578", "#7fb8b6", "#efe2c2", [255, 220, 170, 0.35], [1.06, 0.99, 0.88], "#d4cdb4", 0)],
  [17.7, key("#062a2a", "#174a44", "#f0a070", [255, 170, 110, 0.62], [1.1, 0.84, 0.66], "#c08a74", 0.05)],
  [18.6, key("#071f26", "#2c3446", "#d97a6e", [245, 130, 120, 0.45], [0.78, 0.6, 0.66], "#7a5560", 0.32)],
  [19.5, key("#04121c", "#1a1d36", "#5a3550", [200, 110, 150, 0.25], [0.52, 0.48, 0.66], "#2e2a40", 0.78)],
  [20.6, NIGHT],
  [24, NIGHT],
];
export function todAt(h: number): TodKey {
  h = ((h % 24) + 24) % 24;
  let i = 0;
  while (i < TOD_KEYS.length - 2 && TOD_KEYS[i + 1][0] <= h) i++;
  const [h0, a] = TOD_KEYS[i],
    [h1, b] = TOD_KEYS[i + 1],
    t = sstep(0, 1, (h - h0) / (h1 - h0));
  const lerp = (x: number[], y: number[]) => x.map((v, j) => v + (y[j] - v) * t);
  return {
    top: lerp(a.top, b.top),
    mid: lerp(a.mid, b.mid),
    hor: lerp(a.hor, b.hor),
    fog: lerp(a.fog, b.fog),
    tint: lerp(a.tint, b.tint),
    glow: lerp(a.glow, b.glow),
    night: a.night + (b.night - a.night) * t,
  };
}

export const phaseName = (h: number) =>
  h >= 5 && h < 7
    ? "Bình minh"
    : h >= 7 && h < 11
      ? "Buổi sáng"
      : h >= 11 && h < 14
        ? "Buổi trưa"
        : h >= 14 && h < 17
          ? "Buổi chiều"
          : h >= 17 && h < 18.5
            ? "Hoàng hôn"
            : h >= 18.5 && h < 20
              ? "Chạng vạng"
              : "Đêm";

const css = (c: Vec3) => `rgb(${c.map((v) => Math.round(clamp(v, 0, 1) * 255)).join(",")})`;

/** Nền CSS của khung cảnh (bầu trời gradient phía sau canvas trong suốt) */
export function skyBackground(k: TodKey) {
  const g = k.glow;
  return `radial-gradient(120% 70% at 12% 100%, rgba(${g[0] | 0},${g[1] | 0},${g[2] | 0},${g[3].toFixed(2)}), transparent 62%), linear-gradient(180deg, ${css(k.top)} 0%, ${css(k.mid)} 42%, ${css(k.hor)} 72%, ${css(mul(k.fog, 0.8))} 100%)`;
}

export const liveHour = () => {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
};
