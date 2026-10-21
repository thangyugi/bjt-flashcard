/** Dựng cảnh 3D "Thung lũng Bốn Mùa" từ bố cục (bon-mua.ts) — chuyển từ bản mẫu map-b */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { sceneBase } from "../base";
import { Builder, G, clearPrimitives, gridRect, setLayer, texFrom } from "../builder";
import { clamp, lerp, type P2 } from "../core";
import { Drifters, Puffs, Train, passSchedule } from "../life";
import { TINT_B } from "../materials";
import { WalkMap, type Bridge, type Circle, type ORect } from "../nav";
import { INK_B, PAPER_B } from "../post";
import { paintTiles } from "../textures";
import type { BuildCtx, MapWorld, Zone } from "../types";
import { ribbon, waterMat } from "../water";
import { BONMUA_SEED, createBonMuaLayout, paintBonMuaGround, type RiverPt } from "./bon-mua";

export { createBonMuaLayout, paintBonMuaGround };

const D2R = Math.PI / 180;
const INK = "#3b2a1e",
  WALL = "#f4ecdb",
  TRIM = "#5a3a26",
  SNOW = "#f6f9fc";

export async function buildBonMua(ctx: BuildCtx): Promise<MapWorld> {
  const L = createBonMuaLayout();
  const { W, RAIL, ISLE_R, pondR, TUN_A, SRC, seasonPick, seasonMain, RIVER, BROOK, XW, XS, XE, PLOTS, ORCH, B, onPath, onWater, hBase, H, WATER_Y, OBST, obst, RECTS, freeSpot, TREES } = L;
  const B0 = sceneBase(ctx, {
    seed: BONMUA_SEED,
    bg: "#e8dcc4",
    tint: TINT_B,
    ambient: 0.46,
    sun: { pos: [-34, 62, 30], box: [-62, 62, 62, -62], far: 200 },
    leaf: ["40,50,30", "40,40,30"],
    woodKnots: false,
  });
  const { scene, rand, T, sign } = B0;
  const { R, rng, pick } = rand;
  const U = ctx.U;
  const tileTex = texFrom(paintTiles(rand, "row") as HTMLCanvasElement, true, true);
  const kit = B0.makeKit({
    prop: { map: T.grain, vertexColors: true },
    wood: { map: T.wood, vertexColors: true },
    leaf: { map: T.leaf, vertexColors: true },
    fur: { map: T.fur, vertexColors: true },
    stone: { map: T.stone, vertexColors: true },
    tile: { map: tileTex, vertexColors: true },
    flat: { vertexColors: true },
    glow: () => new THREE.MeshBasicMaterial({ vertexColors: true }),
  });
  const SB = new Builder(kit, rand);
  const TB = new Builder(kit, rand, true);
  const mat4 = (x: number, y: number, z: number, yaw = 0, s = 1) =>
    new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0)), new THREE.Vector3(s, s, s));
  const footY = (x: number, z: number, r: number) => {
    let m = -1e9;
    for (let a = 0; a < 8; a++) m = Math.max(m, H(x + Math.cos(a * 0.785) * r, z + Math.sin(a * 0.785) * r));
    return Math.max(m, H(x, z));
  };
  const circles: Circle[] = [],
    rects: ORect[] = [],
    bridges: Bridge[] = [];
  const zones: Zone[] = [];

  /* ---------- địa hình ---------- */
  const groundMat = kit.paint({ map: T.ground });
  const terrain = new THREE.Mesh(gridRect(-W, W, -W, W, Math.round(300 * ctx.q.mesh), Math.round(300 * ctx.q.mesh), W, H), groundMat);
  terrain.receiveShadow = true;
  terrain.castShadow = true;
  scene.add(terrain);
  {
    const m = new THREE.Mesh(
      gridRect(-150, 150, -150, 150, 60, 60, W, (x, z) => (Math.max(Math.abs(x), Math.abs(z)) < W - 1 ? -3 : hBase(clamp(x, -W, W), clamp(z, -W, W)) - 0.2)),
      groundMat
    );
    m.receiveShadow = true;
    scene.add(m);
  }
  await ctx.step(0.12);

  /* ---------- nước: suối xoắn, lạch, ao ---------- */
  const withY = (pts: RiverPt[], y: number, extra = 0.28) => pts.map((p) => ({ x: p.x, z: p.z, w: p.w + extra, y }));
  scene.add(ribbon(withY(RIVER, WATER_Y), waterMat(U, T.water, { speed: 0.3 })));
  scene.add(ribbon(withY(BROOK, WATER_Y + 0.02), waterMat(U, T.water, { speed: 0.4, deep: "#3a9ad8", shallow: "#a6dcf4" })));
  {
    const pos: number[] = [],
      uv: number[] = [],
      idx: number[] = [],
      A = 128,
      C = 8;
    for (let a = 0; a <= A; a++) {
      const t = (a / A) * Math.PI * 2,
        r1 = pondR(t) + 0.32,
        r0 = ISLE_R - 0.4;
      for (let c = 0; c <= C; c++) {
        const r = lerp(r0, r1, c / C);
        pos.push(Math.cos(t) * r, WATER_Y - 0.01, Math.sin(t) * r);
        uv.push(c / C, ((t * 5) / 3.2) * 0.6);
      }
    }
    for (let a = 0; a < A; a++)
      for (let c = 0; c < C; c++) {
        const i0 = a * (C + 1) + c,
          i1 = (a + 1) * (C + 1) + c;
        idx.push(i0, i1, i0 + 1, i1, i1 + 1, i0 + 1);
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, waterMat(U, T.water, { speed: 0.06, deep: "#2c86cc", shallow: "#93d6f2" })));
  }
  for (let i = 0; i < 16; i++) {
    const a = R(0.2, 2.9),
      r = R(ISLE_R + 0.9, pondR(a) - 0.7),
      x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    if (Math.abs(x) < 1.6 && z > 0) continue;
    const pad = new THREE.CylinderGeometry(R(0.35, 0.55), R(0.35, 0.55), 0.04, 14, 1, false, 0.3, Math.PI * 2 - 0.5);
    SB.add(pad, pick(["#5fa040", "#6fae4a", "#4f9038"]), { p: [x, WATER_Y + 0.03, z], r: [0, R(0, 6), 0] });
    pad.dispose();
    if (rng() < 0.45) SB.add(G.sph(0.18, 8, 6), pick(["#f6b3c4", "#fbd0dc", "#fffaf0"]), { p: [x + 0.1, WATER_Y + 0.15, z], s: [1, 0.7, 1] });
  }
  await ctx.step(0.2);

  /* ---------- kiến trúc ---------- */
  function gableRoof(b: Builder, M: THREE.Matrix4, o: { w: number; d: number; top: number; a?: number; color: string; snow?: boolean; ears?: boolean; earIn?: string; over?: number; earS?: number }) {
    const { w, d, top, a = 0.72, color, snow = false, ears = true, earIn = "#f2a7b5", over = 0.65, earS = 1.45 } = o;
    const hd = d / 2 + over,
      Lr = hd / Math.cos(a),
      ridgeY = top - 0.12 + hd * Math.tan(a);
    for (const sz of [-1, 1]) {
      b.add(G.box(w + 1.0, 0.2, Lr), color, { p: [0, top - 0.12 + (hd * Math.tan(a)) / 2, (sz * hd) / 2], r: [sz * a, 0, 0], mat: "tile", parent: M, wob: 0.02 });
      if (snow) b.add(G.box(w + 0.9, 0.26, Lr * 0.92), SNOW, { p: [0, top - 0.12 + (hd * Math.tan(a)) / 2 + 0.2 / Math.cos(a), (sz * hd) / 2 - sz * 0.02], r: [sz * a, 0, 0], parent: M, wob: 0.07, wf: 2.2 });
    }
    b.add(G.cyl(0.17, 0.17, w + 1.05, 8), snow ? SNOW : "#" + new THREE.Color(color).multiplyScalar(0.7).getHexString(), { p: [0, ridgeY + 0.08, 0], r: [0, 0, Math.PI / 2], parent: M, wob: snow ? 0.04 : 0 });
    const tri = new THREE.Shape();
    tri.moveTo(-d / 2, 0);
    tri.lineTo(d / 2, 0);
    tri.lineTo(0, (d / 2) * Math.tan(a));
    tri.closePath();
    const tg = new THREE.ExtrudeGeometry(tri, { depth: 0.1, bevelEnabled: false });
    for (const sx of [-1, 1]) b.add(tg, WALL, { p: [sx * (w / 2) - (sx > 0 ? 0.1 : 0), top - 0.05, 0], r: [0, Math.PI / 2, 0], parent: M });
    tg.dispose();
    if (ears)
      for (const sx of [-1, 1]) {
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -sx * 0.32));
        b.add(G.cone(0.62 * earS, 1.25 * earS, 4), color, { p: [sx * (w / 2 + 0.25), ridgeY + 0.5 * earS, 0], q, s: [1, 1, 0.55], parent: M, mat: "tile" });
        b.add(G.cone(0.34 * earS, 0.8 * earS, 4), earIn, { p: [sx * (w / 2 + 0.2), ridgeY + 0.42 * earS, 0.22 * earS], q, s: [1, 1, 0.3], parent: M });
        if (snow) b.add(G.sph(0.22 * earS, 8, 6), SNOW, { p: [sx * (w / 2 + 0.25), ridgeY + 0.15, 0], s: [1.6, 0.6, 1], parent: M });
      }
    return ridgeY;
  }
  function eyeWindow(b: Builder, M: THREE.Matrix4, x: number, y: number, z: number, r = 0.42, look = 0) {
    b.add(G.disc(r, 22), "#fff4d8", { p: [x, y, z], parent: M });
    b.add(G.tor(r + 0.02, 0.075, 6, 22), TRIM, { p: [x, y, z + 0.01], mat: "wood", parent: M });
    b.add(G.disc(r * 0.42, 16), "#2a1d16", { p: [x + look * r * 0.3, y - r * 0.12, z + 0.02], parent: M });
    b.add(G.disc(r * 0.13, 10), "#ffffff", { p: [x + look * r * 0.3 + r * 0.12, y + r * 0.02, z + 0.03], parent: M, mat: "glow" });
    b.add(G.box(r * 2.1, 0.06, 0.04), TRIM, { p: [x, y, z + 0.015], parent: M, mat: "wood" });
  }
  function paperLantern(b: Builder, M: THREE.Matrix4 | null, x: number, y: number, z: number, col = "#d8432f") {
    b.add(G.sph(0.24, 12, 10), col, { p: [x, y, z], s: [1, 1.25, 1], parent: M });
    b.add(G.cyl(0.13, 0.13, 0.07, 10), INK, { p: [x, y + 0.3, z], parent: M });
    b.add(G.cyl(0.13, 0.13, 0.07, 10), INK, { p: [x, y - 0.3, z], parent: M });
  }
  type HouseOpts = { x: number; z: number; yaw?: number; w?: number; d?: number; wh?: number; roof?: string; wall?: string; snow?: boolean; earIn?: string; noren?: string; lantern?: string | false; vane?: boolean; lookL?: number; chim?: boolean };
  function jhouse(o: HouseOpts) {
    const { x, z, yaw = 0, w = 4.4, d = 3.2, wh = 1.9, roof = "#4f6f8f", wall = WALL, snow = false, earIn = "#f2a7b5", noren = "#2f4f7f", lantern = "#d8432f", vane = false, lookL = 0.5, chim = false } = o;
    const y0 = footY(x, z, Math.max(w, d) / 2),
      M = mat4(x, y0, z, yaw),
      b = SB;
    b.add(G.box(w + 0.5, 0.5, d + 0.5), "#aaa59b", { p: [0, 0.02, 0], mat: "stone", parent: M, wob: 0.02 });
    const top = 0.28 + wh;
    b.add(G.box(w, wh, d), wall, { p: [0, 0.28 + wh / 2, 0], parent: M, wob: 0.012 });
    for (const sx of [-1, -0.36, 0.36, 1]) for (const sz of [-1, 1]) b.add(G.box(0.16, wh, 0.16), TRIM, { p: [(sx * w) / 2, 0.28 + wh / 2, (sz * d) / 2], mat: "wood", parent: M });
    b.add(G.box(w + 0.12, 0.16, d + 0.12), TRIM, { p: [0, top - 0.06, 0], mat: "wood", parent: M });
    b.add(G.box(w + 0.12, 0.12, d + 0.12), TRIM, { p: [0, 0.34, 0], mat: "wood", parent: M });
    b.add(G.box(w + 0.4, 0.12, 0.95), "#b98a55", { p: [0, 0.52, d / 2 + 0.48], mat: "wood", parent: M });
    for (const sx of [-1, 1]) b.add(G.box(0.12, 0.5, 0.12), TRIM, { p: [sx * (w / 2 + 0.1), 0.26, d / 2 + 0.85], mat: "wood", parent: M });
    b.add(G.box(1.15, 1.4, 0.06), "#4a3326", { p: [0, 0.28 + 0.7, d / 2 + 0.02], parent: M });
    for (let i = 0; i < 3; i++) b.add(G.box(0.36, 0.6, 0.04), noren, { p: [-0.38 + i * 0.38, 0.28 + 1.15, d / 2 + 0.08], parent: M });
    b.add(G.disc(0.16, 12), "#fff4e0", { p: [0, 0.28 + 1.18, d / 2 + 0.11], parent: M });
    for (const sx of [-1, 1]) eyeWindow(b, M, sx * w * 0.3, 0.28 + wh * 0.6, d / 2 + 0.03, Math.min(0.46, w * 0.1), lookL);
    if (lantern) for (const sx of [-1, 1]) paperLantern(b, M, sx * (w / 2 - 0.05), top - 0.55, d / 2 + 0.75, lantern);
    const ridgeY = gableRoof(b, M, { w, d, top, color: roof, snow, earIn, earS: 1.6 });
    if (vane) {
      b.add(G.cyl(0.04, 0.04, 1.3, 6), INK, { p: [0.6, ridgeY + 0.7, 0], parent: M });
      const tail = [
        [0.6, 1.4, 0, 0.17],
        [0.85, 1.55, 0, 0.2],
        [1.12, 1.75, 0, 0.21],
        [1.25, 2.02, 0, 0.19],
        [1.15, 2.26, 0, 0.16],
        [0.95, 2.38, 0, 0.12],
      ];
      tail.forEach(([tx, ty, tz, r], i) => b.add(G.sph(r, 10, 8), i >= 4 ? "#f6d55c" : "#ef8a3c", { p: [tx, ridgeY + ty - 0.4, tz], s: [1, 1, 0.55], parent: M }));
    }
    if (chim) {
      b.add(G.box(0.45, 1.0, 0.45), "#8d877e", { p: [-w * 0.3, ridgeY + 0.1, -0.5], mat: "stone", parent: M });
      if (snow) b.add(G.sph(0.32, 8, 6), SNOW, { p: [-w * 0.3, ridgeY + 0.62, -0.5], s: [1, 0.45, 1], parent: M });
    }
    obst(x, z, Math.max(w, d) / 2 + 0.8);
    rects.push({ x, z, w: w + 0.6, d: d + 0.6, yaw: -yaw }, { x: x - Math.sin(yaw) * (d / 2 + 0.5), z: z + Math.cos(yaw) * (d / 2 + 0.5), w: w + 0.5, d: 0.9, yaw: -yaw });
    return { M, ridgeY, y0 };
  }
  function signBoard(text: string, x: number, z: number, yaw = 0, bw = 1.5, bh = 0.42, postH = 1.1, bg = "#d6a96c", tilt = -0.4) {
    const y0 = H(x, z);
    const sh = new THREE.Shape();
    sh.moveTo(-bw / 2, -bh / 2);
    sh.lineTo(bw / 2, -bh / 2);
    sh.lineTo(bw / 2, bh / 2);
    sh.lineTo(-bw / 2, bh / 2);
    sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false });
    const p = g.attributes.position,
      uv = g.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + bw / 2) / bw, (p.getY(i) + bh / 2) / bh);
    const m = new THREE.Mesh(g, kit.paint({ map: sign(text, { tip: 0, bg }) }));
    m.position.set(x, y0 + postH, z);
    m.rotation.set(tilt, yaw, 0, "YXZ");
    m.castShadow = true;
    m.receiveShadow = true;
    scene.add(m);
    for (const sx of [-1, 1]) SB.add(G.box(0.1, postH, 0.1), TRIM, { p: [x + Math.cos(yaw) * sx * bw * 0.36, y0 + postH / 2, z - Math.sin(yaw) * sx * bw * 0.36], mat: "wood" });
    rects.push({ x, z, w: bw, d: 0.4, yaw: -yaw });
  }
  function signpost(x: number, z: number, boards: [string, number, number, number][]) {
    const y0 = H(x, z);
    SB.add(G.cyl(0.11, 0.13, 2.7, 8), "#7a4e2e", { p: [x, y0 + 1.35, z], mat: "wood" });
    SB.add(G.cone(0.16, 0.25, 8), "#5a3a26", { p: [x, y0 + 2.8, z] });
    for (const [text, tip, y, yaw] of boards) {
      const sh = new THREE.Shape(),
        Lb = 0.95,
        Hh = 0.26,
        Tt = 0.32;
      if (tip > 0) {
        sh.moveTo(-Lb, -Hh);
        sh.lineTo(Lb - Tt, -Hh);
        sh.lineTo(Lb, 0);
        sh.lineTo(Lb - Tt, Hh);
        sh.lineTo(-Lb, Hh);
      } else {
        sh.moveTo(Lb, -Hh);
        sh.lineTo(-Lb + Tt, -Hh);
        sh.lineTo(-Lb, 0);
        sh.lineTo(-Lb + Tt, Hh);
        sh.lineTo(Lb, Hh);
      }
      sh.closePath();
      const g = new THREE.ExtrudeGeometry(sh, { depth: 0.08, bevelEnabled: false });
      const p = g.attributes.position,
        uv = g.attributes.uv;
      for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + Lb) / (2 * Lb), (p.getY(i) + Hh) / (2 * Hh));
      const m = new THREE.Mesh(g, kit.paint({ map: sign(text, { tip }) }));
      m.position.set(x + tip * 0.5, y0 + y, z + 0.12);
      m.rotation.set(-0.3, yaw, tip * 0.03, "YXZ");
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
    }
    circles.push({ x, z, r: 0.35 });
  }
  function stoneLantern(x: number, z: number, snow: boolean, s = 1) {
    const y0 = H(x, z),
      M = mat4(x, y0, z, R(-0.2, 0.2), s),
      b = SB,
      st = "#b9b4a8";
    b.add(G.cyl(0.38, 0.45, 0.25, 8), st, { p: [0, 0.12, 0], mat: "stone", parent: M });
    b.add(G.cyl(0.13, 0.16, 0.9, 8), st, { p: [0, 0.7, 0], mat: "stone", parent: M });
    b.add(G.cyl(0.36, 0.3, 0.15, 6), st, { p: [0, 1.2, 0], mat: "stone", parent: M });
    b.add(G.box(0.48, 0.46, 0.48), st, { p: [0, 1.5, 0], mat: "stone", parent: M });
    b.add(G.box(0.26, 0.24, 0.5), "#ffd27a", { p: [0, 1.5, 0], mat: "glow", parent: M });
    b.add(G.cone(0.62, 0.5, 6), st, { p: [0, 1.98, 0], mat: "stone", parent: M });
    b.add(G.sph(0.11, 8, 6), st, { p: [0, 2.28, 0], mat: "stone", parent: M });
    if (snow) b.add(G.sph(0.5, 12, 8), SNOW, { p: [0, 2.06, 0], s: [1.1, 0.42, 1.1], wob: 0.04, parent: M });
    obst(x, z, 0.5 * s);
    circles.push({ x, z, r: 0.45 * s });
  }

  // ga + tháp đồng hồ mặt cú
  {
    const [sx, sz] = B.station;
    const h = jhouse({ x: sx, z: sz, w: 7.0, d: 3.0, wh: 2.1, roof: "#2f8f8c", noren: "#2f8f8c", lantern: "#f2c14e", earIn: "#f6d0a0", lookL: 0 });
    const b = SB,
      M = h.M,
      ty = h.ridgeY - 0.3;
    b.add(G.box(1.5, 1.4, 1.3), WALL, { p: [0, ty + 0.7, 0], parent: M });
    for (const ex of [-1, 1]) for (const ez of [-1, 1]) b.add(G.box(0.12, 1.4, 0.12), TRIM, { p: [ex * 0.75, ty + 0.7, ez * 0.65], mat: "wood", parent: M });
    gableRoof(b, M, { w: 1.5, d: 1.3, top: ty + 1.4, color: "#2f8f8c", ears: false, over: 0.35 });
    const OM = new THREE.Matrix4().multiplyMatrices(M, new THREE.Matrix4().compose(new THREE.Vector3(0, ty + 0.85, 0.72), new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.32, 0, 0)), new THREE.Vector3(1, 1, 1)));
    b.add(G.cyl(1.0, 1.0, 0.18, 28), "#8a5a3a", { r: [Math.PI / 2, 0, 0], s: [1.05, 1, 0.92], parent: OM, wob: 0.02 });
    for (const ex of [-1, 1]) {
      b.add(G.cone(0.32, 0.75, 6), "#7a4a2e", { p: [ex * 0.68, 0.95, 0], r: [0, 0, -ex * 0.4], s: [1, 1, 0.5], parent: OM });
      b.add(G.disc(0.5, 24), "#efdcb4", { p: [ex * 0.42, 0.06, 0.1], parent: OM });
      b.add(G.disc(0.36, 24), "#fffaf0", { p: [ex * 0.42, 0.06, 0.12], parent: OM });
      b.add(G.tor(0.36, 0.05, 6, 24), INK, { p: [ex * 0.42, 0.06, 0.13], parent: OM });
      for (let k = 0; k < 12; k++) {
        const a = (k / 12) * Math.PI * 2;
        b.add(G.box(0.03, 0.07, 0.02), INK, { p: [ex * 0.42 + Math.cos(a) * 0.28, 0.06 + Math.sin(a) * 0.28, 0.13], r: [0, 0, a + Math.PI / 2], parent: OM });
      }
      b.add(G.box(0.045, 0.22, 0.02), INK, { p: [ex * 0.42, 0.06 + 0.1, 0.15], parent: OM });
      b.add(G.box(0.045, 0.16, 0.02), "#b8202f", { p: [ex * 0.42 + ex * 0.06, 0.06 - 0.04, 0.15], r: [0, 0, ex * 1.0], parent: OM });
    }
    b.add(G.cone(0.13, 0.32, 4), "#f2a33a", { p: [0, -0.32, 0.18], r: [Math.PI, 0, 0], parent: OM });
    b.add(G.sph(0.1, 8, 6), "#f2c14e", { p: [0, -0.65, 0.12], parent: OM });
    for (let dg = 76; dg <= 104; dg += 2) {
      const t = dg * D2R,
        r = 31.05,
        x = Math.cos(t) * r,
        z = Math.sin(t) * r;
      b.add(G.box(1.12, 0.55, 1.65), "#cdc4b2", { p: [x, H(x, z) + 0.2, z], r: [0, -t + Math.PI / 2, 0], mat: "stone", cap: "#ddd5c4" });
      const ex = Math.cos(t) * 31.82,
        ez = Math.sin(t) * 31.82;
      b.add(G.box(1.12, 0.08, 0.18), "#f6efdc", { p: [ex, H(ex, ez) + 0.5, ez], r: [0, -t + Math.PI / 2, 0] });
    }
    for (const dg of [78, 84, 96, 102]) {
      const t = dg * D2R,
        x = Math.cos(t) * 30.6,
        z = Math.sin(t) * 30.6;
      b.add(G.box(0.14, 1.5, 0.14), TRIM, { p: [x, 1.2, z], mat: "wood" });
      paperLantern(b, null, x, 1.8, z + 0.15, "#f2c14e");
    }
    for (const dg of [81, 99]) {
      const t = dg * D2R,
        x = Math.cos(t) * 30.9,
        z = Math.sin(t) * 30.9;
      b.add(G.box(1.3, 0.12, 0.45), "#a77445", { p: [x, 0.95, z], r: [0, -t + Math.PI / 2, 0], mat: "wood" });
    }
    signBoard("Ga Bốn Mùa", 0, 30.75, 0, 2.6, 0.62, 1.6, "#f6efdc");
    zones.push({ id: "station", name: "Ga Bốn Mùa", desc: "Nhà ga mái ngọc có tháp đồng hồ mặt cú; đoàn tàu xanh dừng đón khách rồi chạy vòng quanh thung lũng.", kind: "station", shape: { t: "rect", x: sx, z: sz + 0.8, w: 9, d: 6 }, h: 6 });
  }
  const houses: [string, HouseOpts, string, string][] = [
    ["springHouse", { x: B.springHouse[0], z: B.springHouse[1], roof: "#c0607a", noren: "#c0607a", earIn: "#fbd0dc", lantern: "#f49ab5", lookL: 0.6 }, "Nhà Xuân", "Mái hồng tai mèo giữa rừng anh đào, đèn lồng hồng trước hiên."],
    ["summerHouse", { x: B.summerHouse[0], z: B.summerHouse[1], roof: "#3f6fb0", noren: "#3f6fb0", earIn: "#9cc4f0", vane: true, lookL: -0.6, yaw: -0.15 }, "Nhà Hạ", "Mái xanh biển, chong chóng hình đuôi cáo, cạnh ruộng hướng dương."],
    ["autumnHouse", { x: B.autumnHouse[0], z: B.autumnHouse[1], roof: "#9c4a2e", noren: "#7a3a28", earIn: "#f2c14e", lantern: "#f08a24", lookL: -0.5, w: 4.8, yaw: 0.1 }, "Nhà Thu", "Mái nâu đỏ dưới hàng phong và bạch quả, gần vườn hồng."],
    ["winterHouse", { x: B.winterHouse[0], z: B.winterHouse[1], roof: "#4b5563", noren: "#2f4f7f", earIn: "#c9d6e6", snow: true, chim: true, lookL: 0.4 }, "Nhà Đông", "Mái phủ tuyết, ống khói nhỏ, giữa rừng thông tuyết."],
  ];
  for (const [id, o, name, desc] of houses) {
    jhouse(o);
    zones.push({ id, name, desc, kind: "house", shape: { t: "rect", x: o.x, z: o.z + 0.4, w: 5.4, d: 4.6 }, h: 6 });
  }
  await ctx.step(0.3);
  // kho tuyết
  {
    const [x, z] = B.kura,
      y0 = footY(x, z, 2),
      M = mat4(x, y0, z, 0.1),
      b = SB;
    b.add(G.box(3.6, 0.6, 4.1), "#9c978d", { p: [0, 0.05, 0], mat: "stone", parent: M, wob: 0.03 });
    b.add(G.box(3.0, 3.1, 3.5), "#f8f6f1", { p: [0, 1.85, 0], parent: M, wob: 0.01 });
    b.add(G.box(3.06, 1.0, 3.56), "#5b6470", { p: [0, 0.8, 0], parent: M });
    for (let i = -3; i <= 3; i++) b.add(G.box(0.05, 1.0, 0.02), "#e9ecef", { p: [i * 0.42, 0.8, 1.79], r: [0, 0, 0.785], parent: M });
    b.add(G.box(1.2, 1.7, 0.16), "#3d4652", { p: [0, 1.15, 1.78], parent: M });
    b.add(G.box(1.4, 0.18, 0.3), "#2b3038", { p: [0, 2.05, 1.8], parent: M });
    for (const ex of [-1, 1]) {
      b.add(G.disc(0.32, 18), "#2b3038", { p: [ex * 0.75, 2.75, 1.77], parent: M });
      b.add(G.tor(0.34, 0.07, 6, 18), "#f8f6f1", { p: [ex * 0.75, 2.75, 1.78], parent: M });
      b.add(G.disc(0.1, 10), "#fff3c8", { p: [ex * 0.75 + 0.08, 2.8, 1.79], parent: M, mat: "glow" });
    }
    gableRoof(b, M, { w: 3.0, d: 3.5, top: 3.4, a: 0.5, color: "#3d4652", snow: true, earIn: "#c9d6e6", earS: 0.85 });
    obst(x, z, 2.8);
    rects.push({ x, z, w: 3.8, d: 4.3, yaw: -0.1 });
    zones.push({ id: "kura", name: "Kho Tuyết", desc: "Nhà kho tường trắng, hai ô thông gió tròn như đôi mắt, mái tuyết có tai nhỏ.", kind: "house", shape: { t: "rect", x, z, w: 4, d: 4.4 }, h: 5 });
  }
  // suối nóng thú tuyết
  const puffs = new Puffs(scene, T.soft, rand);
  {
    const [x, z] = B.onsen,
      y0 = H(x, z),
      M = mat4(x, y0, z, 0.12),
      b = SB;
    const fur = "#f3f6fb",
      fur2 = "#e4ebf5";
    b.add(G.tor(2.55, 0.85, 12, 40), fur, { p: [0, 0.35, 0], r: [Math.PI / 2, 0, 0], s: [1.25, 1, 1], mat: "fur", wob: 0.06, parent: M });
    b.add(G.cyl(2.5, 2.5, 0.2, 32), "#6fc3c9", { p: [0, 0.5, 0], s: [1.25, 1, 1], parent: M });
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      b.add(G.sph(0.35, 8, 6), pick(["#bdb7aa", "#a49f94"]), { p: [Math.cos(a) * 2.25 * 1.25, 0.55, Math.sin(a) * 2.25], s: [1, 0.5, 1], mat: "stone", parent: M });
    }
    const hx = -2.6,
      hz = 1.85;
    b.add(G.sph(1.35, 20, 14), fur, { p: [hx, 1.0, hz], s: [1.1, 0.92, 1], mat: "fur", wob: 0.04, parent: M });
    for (const ex of [-1, 1]) {
      b.add(G.sph(0.42, 12, 10), fur2, { p: [hx + ex * 0.85, 2.05, hz - 0.25], s: [1, 0.8, 0.7], mat: "fur", parent: M });
      b.add(G.sph(0.22, 10, 8), "#f6c3cf", { p: [hx + ex * 0.85, 2.08, hz - 0.05], s: [1, 0.7, 0.4], parent: M });
      b.add(G.tor(0.3, 0.07, 6, 14, Math.PI), INK, { p: [hx + ex * 0.5, 1.45, hz + 1.12], r: [-0.6, 0, Math.PI], parent: M });
      b.add(G.sph(0.18, 10, 8), "#f4a6b8", { p: [hx + ex * 0.75, 0.95, hz + 1.12], s: [1, 0.55, 0.3], parent: M });
    }
    b.add(G.sph(0.12, 8, 6), INK, { p: [hx, 0.98, hz + 1.38], s: [1.2, 0.8, 0.8], parent: M });
    b.add(G.cone(0.6, 1.0, 12), "#5c8fd6", { p: [hx + 0.2, 2.25, hz - 0.2], r: [0.2, 0, -0.5], parent: M });
    b.add(G.sph(0.2, 8, 6), SNOW, { p: [hx + 0.65, 2.6, hz - 0.1], parent: M, mat: "fur" });
    for (const [tx, ty, tz, r] of [
      [2.9, 0.6, -1.6, 0.8],
      [3.4, 1.1, -0.8, 0.75],
      [3.5, 1.6, 0.1, 0.6],
    ])
      b.add(G.sph(r, 12, 10), fur2, { p: [tx, ty, tz], mat: "fur", wob: 0.04, parent: M });
    b.add(G.cyl(0.28, 0.22, 0.4, 10), "#b98a55", { p: [1.8, 0.2, 2.6], mat: "wood", cap: "#6fc3c9", parent: M });
    const hut = mat4(x + 2.5, y0, z - 3.6, 0.12);
    b.add(G.box(2.2, 1.7, 1.6), "#b98a55", { p: [0, 0.85, 0], mat: "wood", parent: hut });
    for (let i = 0; i < 2; i++) b.add(G.box(0.45, 0.7, 0.04), i ? "#b8202f" : "#2f4f7f", { p: [-0.25 + i * 0.5, 1.2, 0.82], parent: hut });
    gableRoof(b, hut, { w: 2.2, d: 1.6, top: 1.7, color: "#4b5563", snow: true, ears: true, earS: 0.55, earIn: "#c9d6e6", over: 0.35 });
    const c = new THREE.Vector3(0, 0.9, 0).applyMatrix4(M);
    puffs.add(c.x, c.y, c.z, 2.2, 1.5, 14, 1.8, 2.6, 0.55);
    signBoard("Suối nóng", x + 3.8, z + 2.9, -0.2, 1.7, 0.45, 1.0);
    circles.push({ x, z, r: 3.6 }, { x: x - 2.4, z: z + 2.1, r: 1.5 }, { x: x + 2.5, z: z - 3.6, r: 1.4 });
    zones.push({ id: "onsen", name: "Suối nóng Thú Tuyết", desc: "Bể nước nóng hình một chú thú tuyết cuộn tròn ngủ say, hơi nước bốc lên giữa trời đông.", kind: "onsen", shape: { t: "circle", x, z, r: 4.2 }, h: 3 });
  }
  // đền trên đảo
  {
    const [x, z] = B.shrine,
      y0 = H(x, z),
      M = mat4(x, y0, z, 0),
      b = SB;
    b.add(G.box(1.8, 0.4, 1.5), "#b1aca1", { p: [0, 0.2, -0.2], mat: "stone", parent: M });
    b.add(G.box(1.25, 1.0, 1.0), "#c8402e", { p: [0, 0.9, -0.2], parent: M });
    b.add(G.box(0.8, 0.7, 0.05), "#f3e2c0", { p: [0, 0.85, 0.32], parent: M });
    eyeWindow(b, M, 0, 0.95, 0.36, 0.22, 0);
    gableRoof(b, M, { w: 1.25, d: 1.0, top: 1.4, color: "#3d5a6e", ears: true, earS: 0.5, over: 0.35, earIn: "#f6c3cf" });
    const Tm = mat4(x, y0, z + 1.75, 0);
    for (const ex of [-1, 1]) b.add(G.cyl(0.11, 0.13, 2.2, 10), "#d8432f", { p: [ex * 0.95, 1.1, 0], parent: Tm });
    b.add(G.box(2.9, 0.18, 0.28), "#2a1d16", { p: [0, 2.3, 0], parent: Tm, wob: 0.01 });
    b.add(G.box(2.5, 0.16, 0.22), "#d8432f", { p: [0, 2.12, 0], parent: Tm });
    b.add(G.box(2.3, 0.14, 0.2), "#d8432f", { p: [0, 1.75, 0], parent: Tm });
    for (const ex of [-1, 1]) stoneLantern(x + ex * 1.35, z + 0.6, false, 0.75);
    obst(x, z, ISLE_R);
    rects.push({ x, z: z - 0.2, w: 2.0, d: 1.7 });
    circles.push({ x: x - 0.95, z: z + 1.75, r: 0.2 }, { x: x + 0.95, z: z + 1.75, r: 0.2 });
    zones.push({ id: "shrine", name: "Đảo Đền", desc: "Miếu nhỏ sơn đỏ trên hòn đảo giữa ao, qua cầu đỏ và cổng torii.", kind: "shrine", shape: { t: "circle", x, z, r: ISLE_R + 0.2 }, h: 3 });
  }
  // cầu
  function woodBridge(cx: number, cz: number, alongX: boolean, half: number, red = false) {
    const b = SB,
      M = mat4(cx, 0, cz, alongX ? 0 : -Math.PI / 2);
    const arch = (u: number) => 0.12 + (red ? 0.95 : 0.42) * (1 - u * u);
    const rail = red ? "#d8432f" : "#8a5a35";
    for (let x = -half; x <= half + 1e-6; x += 0.5) {
      const u = x / half,
        y = arch(u),
        y2 = arch((x + 0.25) / half),
        ang = Math.atan2(y2 - y, 0.25);
      b.add(G.box(0.48, 0.14, 2.0), red ? "#c8402e" : pick(["#a77445", "#b9854f", "#9c6b3f"]), { p: [x, y, 0], r: [0, 0, ang], mat: "wood", parent: M });
    }
    for (const sz of [-1, 1]) {
      for (let x = -half; x <= half + 1e-6; x += half / 2) b.add(G.cyl(0.08, 0.1, 1.0, 6), rail, { p: [x, arch(x / half) + 0.45, sz * 0.95], mat: red ? "prop" : "wood", parent: M });
      if (red) for (const x of [-half, half]) b.add(G.sph(0.13, 8, 6), "#f2c14e", { p: [x, arch(x / half) + 1.0, sz * 0.95], parent: M });
      const seg = 10;
      for (let k = 0; k < seg; k++) {
        const x1 = -half + (2 * half * k) / seg,
          x2 = x1 + (2 * half) / seg,
          y1 = arch(x1 / half) + 0.85,
          y2 = arch(x2 / half) + 0.85,
          Ln = Math.hypot(x2 - x1, y2 - y1);
        b.add(G.cyl(0.05, 0.05, Ln, 6), rail, { p: [(x1 + x2) / 2, (y1 + y2) / 2, sz * 0.95], r: [0, 0, Math.PI / 2 + Math.atan2(y2 - y1, x2 - x1)], mat: red ? "prop" : "wood", parent: M });
      }
    }
    const ax = alongX ? 1 : 0,
      az = alongX ? 0 : 1;
    bridges.push({ a: [cx - ax * (half + 0.3), cz - az * (half + 0.3)], b: [cx + ax * (half + 0.3), cz + az * (half + 0.3)], width: 1.7, deck: (u) => arch(clamp(u * 2 - 1, -1, 1)) + 0.08 });
  }
  woodBridge(XW.x, XW.z, true, XW.w + 1.6);
  woodBridge(XS.x, XS.z, false, XS.w + 1.6);
  woodBridge(XE.x, XE.z, true, XE.w + 1.6);
  {
    const z0 = ISLE_R - 0.2,
      z1 = pondR(Math.PI / 2) + 0.7;
    woodBridge(0, (z0 + z1) / 2, false, (z1 - z0) / 2, true);
  }
  // ô đất & ruộng
  function plotBorder(p: { x: number; z: number; w: number; d: number }, h = 0.32) {
    const y = footY(p.x, p.z, Math.max(p.w, p.d) / 2) - 0.08;
    for (const sz of [-1, 1]) SB.add(G.box(p.w + 0.3, h, 0.16), "#8a5a35", { p: [p.x, y + h / 2, p.z + sz * (p.d / 2 + 0.07)], mat: "wood", wob: 0.01 });
    for (const sx of [-1, 1]) SB.add(G.box(0.16, h, p.d + 0.3), "#8a5a35", { p: [p.x + sx * (p.w / 2 + 0.07), y + h / 2, p.z], mat: "wood", wob: 0.01 });
    return y;
  }
  function fence(pts: P2[], h = 0.85) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i],
        [bx, bz] = pts[i + 1],
        Ln = Math.hypot(bx - ax, bz - az),
        n = Math.max(1, Math.round(Ln / 1.3));
      for (let k = 0; k <= n; k++) {
        const x = lerp(ax, bx, k / n),
          z = lerp(az, bz, k / n);
        SB.add(G.box(0.15, h, 0.15), "#7a4e2e", { p: [x, H(x, z) + h / 2 - 0.05, z], r: [0, R(-0.2, 0.2), R(-0.05, 0.05)], mat: "wood" });
      }
      const yaw = -Math.atan2(bz - az, bx - ax);
      for (const yy of [0.32, 0.66]) SB.add(G.box(Ln + 0.1, 0.08, 0.07), "#9a6a3f", { p: [(ax + bx) / 2, (H(ax, az) + H(bx, bz)) / 2 + yy * h, (az + bz) / 2], r: [0, yaw, 0], mat: "wood" });
      for (let t = 0; t < Ln; t += 0.6) obst(lerp(ax, bx, t / Ln), lerp(az, bz, t / Ln), 0.25);
      rects.push({ x: (ax + bx) / 2, z: (az + bz) / 2, w: Ln + 0.2, d: 0.35, yaw: Math.atan2(bz - az, bx - ax) });
    }
  }
  const PLOT_INFO: Record<string, [string, string]> = {
    tulip: ["Luống tulip", "Tulip đỏ, vàng, hồng, trắng, cam xếp từng hàng trong luống gỗ."],
    rape: ["Luống hoa cải", "Hoa cải vàng mùa xuân nở rộ cạnh rừng anh đào."],
    sunflower: ["Ruộng hướng dương", "Những bông hướng dương cao quá đầu, quay mặt về phía ga."],
    paddy: ["Ruộng lúa mùa hạ", "Bốn thửa ruộng nước xanh mạ non, bờ cỏ và chú bù nhìn mặt tròn."],
    harvest: ["Giàn phơi lúa thu", "Lúa vàng đã gặt, phơi trên giàn hasa-gake và xếp thành đụn."],
  };
  let emptyN = 0;
  for (const p of PLOTS) {
    if (p.t === "empty") {
      const y = plotBorder(p);
      SB.add(G.box(p.w, 0.22, p.d), "#6e4a30", { p: [p.x, y + 0.11, p.z], wob: 0.02 });
      for (let zz = p.z - p.d / 2 + 0.3; zz < p.z + p.d / 2 - 0.1; zz += 0.42) SB.add(G.cyl(0.11, 0.11, p.w - 0.3, 6), "#82593a", { p: [p.x, y + 0.24, zz], r: [0, 0, Math.PI / 2], s: [1, 0.6, 1], wob: 0.02 });
      signBoard("Ô trống", p.x + p.w / 2 - 0.55, p.z + p.d / 2 + 0.55, 0, 1.15, 0.36, 0.75, "#f1dcb2");
      SB.add(G.box(0.08, 0.6, 0.08), "#7a4e2e", { p: [p.x - p.w / 2 + 0.3, y + 0.5, p.z + p.d / 2 - 0.25], mat: "wood" });
      emptyN++;
      zones.push({ id: `plot-${emptyN}`, name: `Ô trống ${emptyN}`, desc: "Ô trống — sắp mở gieo cây ở bản đồ này", kind: "plot", shape: { t: "rect", x: p.x, z: p.z + 0.3, w: p.w + 0.4, d: p.d + 1.2 }, h: 1 });
    } else {
      const [name, desc] = PLOT_INFO[p.t];
      zones.push({ id: p.t, name, desc, kind: p.t === "paddy" || p.t === "harvest" ? "paddy" : "flowers", shape: { t: "rect", x: p.x, z: p.z, w: p.w + 0.6, d: p.d + 0.6 }, h: p.t === "sunflower" ? 2 : 1 });
    }
    rects.push({ x: p.x, z: p.z, w: p.w + 0.4, d: p.d + 0.4 });
    if (p.t === "tulip" || p.t === "rape") {
      const y = plotBorder(p, 0.26);
      SB.add(G.box(p.w, 0.2, p.d), "#6e4a30", { p: [p.x, y + 0.1, p.z] });
      const rows = ["#f0402c", "#ffd83a", "#ff8fb8", "#ffffff", "#ff7a1c"];
      const nr = Math.floor(p.d / 0.48);
      for (let r = 0; r < nr; r++) {
        const zz = p.z - p.d / 2 + 0.3 + (r * (p.d - 0.5)) / (nr - 1);
        for (let xx = p.x - p.w / 2 + 0.22; xx < p.x + p.w / 2 - 0.1; xx += p.t === "tulip" ? 0.3 : 0.26) {
          if (p.t === "tulip") {
            SB.add(G.cyl(0.02, 0.02, 0.4, 4), "#4f8a3a", { p: [xx, y + 0.4, zz] });
            SB.add(G.sph(0.08, 6, 4), "#5f9a3c", { p: [xx + 0.06, y + 0.3, zz], s: [0.6, 1.4, 0.5], r: [0, 0, -0.4], mat: "leaf" });
            SB.add(G.sph(0.16, 10, 8), rows[r % rows.length], { p: [xx, y + 0.66, zz], s: [1, 1.25, 1], mat: "flat" });
          } else {
            SB.add(G.cyl(0.03, 0.03, 0.5, 4), "#5f9a3c", { p: [xx, y + 0.45, zz] });
            SB.add(G.sph(0.2, 8, 6), pick(["#f6d33c", "#f2c42c", "#fbe36a"]), { p: [xx + R(-0.05, 0.05), y + 0.72, zz + R(-0.05, 0.05)], s: [1, 0.75, 1], wob: 0.03 });
          }
        }
      }
    } else if (p.t === "sunflower") {
      const y = footY(p.x, p.z, 2) - 0.05;
      const disc1 = new THREE.CylinderGeometry(0.36, 0.3, 0.06, 14),
        disc2 = new THREE.CylinderGeometry(0.17, 0.17, 0.1, 10);
      for (let zz = p.z - p.d / 2 + 0.35; zz < p.z + p.d / 2; zz += 0.75)
        for (let xx = p.x - p.w / 2 + 0.3; xx < p.x + p.w / 2; xx += 0.6) {
          const hh = R(1.35, 1.9),
            px = xx + R(-0.1, 0.1),
            pz = zz + R(-0.1, 0.1);
          SB.add(G.cyl(0.04, 0.05, hh, 5), "#4f8a3a", { p: [px, y + hh / 2, pz] });
          for (const s of [-1, 1]) SB.add(G.sph(0.17, 6, 4), "#5f9a3c", { p: [px + s * 0.16, y + hh * 0.55, pz], s: [1, 0.3, 0.6], r: [0, 0, s * 0.4], mat: "leaf" });
          const fx = -0.85 + R(-0.15, 0.15),
            fy = R(-0.3, 0.3);
          SB.add(disc1, "#f6c629", { p: [px, y + hh, pz + 0.05], r: [Math.PI / 2 + fx, fy, 0], wob: 0.02 });
          SB.add(disc2, "#6b3f1e", { p: [px, y + hh + Math.cos(fx) * 0.03, pz + 0.05 + 0.04], r: [Math.PI / 2 + fx, fy, 0] });
        }
      disc1.dispose();
      disc2.dispose();
    } else if (p.t === "paddy") {
      const y = footY(p.x, p.z, 4) - 0.05,
        cw = (p.w - 0.6) / 2,
        cd = (p.d - 0.6) / 2;
      SB.add(G.box(p.w + 0.4, 0.12, p.d + 0.4), "#7a6a46", { p: [p.x, y - 0.02, p.z] });
      for (const cx of [-1, 1])
        for (const cz of [-1, 1]) {
          const x0 = p.x + cx * (cw / 2 + 0.15),
            z0 = p.z + cz * (cd / 2 + 0.15);
          SB.add(G.box(cw, 0.06, cd), "#86c2bd", { p: [x0, y + 0.1, z0], mat: "flat" });
          for (let zz = z0 - cd / 2 + 0.3; zz < z0 + cd / 2 - 0.15; zz += 0.5)
            for (let xx = x0 - cw / 2 + 0.25; xx < x0 + cw / 2 - 0.1; xx += 0.42)
              for (let k = 0; k < 4; k++) SB.add(G.cone(0.07, 0.7, 3), pick(["#6cbf4a", "#5aae3e", "#7fcf55", "#8fdc5e"]), { p: [xx + R(-0.06, 0.06), y + 0.42, zz + R(-0.06, 0.06)], r: [R(-0.35, 0.35), 0, R(-0.4, 0.4)] });
        }
      for (const sz of [-1, 0, 1]) SB.add(G.box(p.w + 0.4, 0.3, 0.38), "#7fae52", { p: [p.x, y + 0.13, p.z + sz * (p.d / 2 + 0.05)], wob: 0.02, cap: "#8fbf5e" });
      for (const sx of [-1, 0, 1]) SB.add(G.box(0.38, 0.3, p.d + 0.4), "#7fae52", { p: [p.x + sx * (p.w / 2 + 0.05), y + 0.13, p.z], wob: 0.02, cap: "#8fbf5e" });
      signBoard("Ruộng lúa", p.x - p.w / 2 + 1.1, p.z + p.d / 2 + 0.85, 0, 1.6, 0.42, 0.9);
      const sx = p.x + 2.4,
        sz2 = p.z - 1.6;
      SB.add(G.cyl(0.05, 0.05, 1.8, 5), "#7a4e2e", { p: [sx, y + 0.9, sz2], mat: "wood" });
      SB.add(G.cyl(0.04, 0.04, 1.3, 5), "#7a4e2e", { p: [sx, y + 1.3, sz2], r: [0, 0, Math.PI / 2], mat: "wood" });
      SB.add(G.sph(0.3, 12, 8), "#f3e2c0", { p: [sx, y + 1.85, sz2] });
      SB.add(G.cone(0.55, 0.35, 14), "#e2b95a", { p: [sx, y + 2.15, sz2] });
      SB.add(G.box(0.7, 0.55, 0.3), "#3f8086", { p: [sx, y + 1.25, sz2] });
    } else if (p.t === "harvest") {
      const y = footY(p.x, p.z, 3) - 0.05;
      for (const rz of [-1.1, 0.9]) {
        const zz = p.z + rz;
        for (const sx of [-1, 0, 1]) SB.add(G.cyl(0.05, 0.06, 1.6, 5), "#7a4e2e", { p: [p.x + sx * 2.4 - 0.3, y + 0.8, zz], mat: "wood" });
        SB.add(G.cyl(0.05, 0.05, 5.2, 5), "#7a4e2e", { p: [p.x - 0.3, y + 1.45, zz], r: [0, 0, Math.PI / 2], mat: "wood" });
        for (let xx = p.x - 2.7; xx < p.x + 2.2; xx += 0.26) for (const s of [-1, 1]) SB.add(G.box(0.22, 0.75, 0.1), pick(["#e2bd5a", "#d4aa48", "#ecc96a"]), { p: [xx, y + 1.12, zz + s * 0.1], r: [s * 0.25, 0, 0] });
      }
      for (const [ox, oz] of [
        [-2.6, 0],
        [-1.4, -0.1],
        [-0.2, 0.05],
        [1.0, -0.05],
        [2.2, 0.05],
      ])
        SB.add(G.cone(0.32, 0.8, 8), "#d9b65a", { p: [p.x + ox, y + 0.4, p.z + oz + 1.9], wob: 0.03 });
    }
  }
  {
    const poly = ORCH.poly.concat([ORCH.poly[0]]);
    for (let i = 0; i < poly.length - 1; i++) {
      const [ax, az] = poly[i],
        [bx, bz] = poly[i + 1];
      if (i === 0) {
        fence([
          [ax, az],
          [17.6, az],
        ]);
        fence([
          [19.7, az],
          [bx, bz],
        ]);
        continue;
      }
      fence([
        [ax, az],
        [bx, bz],
      ]);
    }
    signBoard("Vườn quả", 21.2, -11.0, 0, 1.6, 0.42, 1.0);
    for (const [bx, bz, col] of [
      [16.2, -15.0, "#f08a24"],
      [21.3, -14.9, "#d8322c"],
    ] as const) {
      const y = H(bx, bz);
      SB.add(G.cyl(0.32, 0.25, 0.35, 10), "#b98a55", { p: [bx, y + 0.18, bz], mat: "wood" });
      for (let k = 0; k < 6; k++) SB.add(G.sph(0.11, 8, 6), col, { p: [bx + R(-0.15, 0.15), y + 0.38, bz + R(-0.15, 0.15)] });
      circles.push({ x: bx, z: bz, r: 0.4 });
    }
    {
      const lx = 18.0,
        lz = -18.5,
        y = H(lx, lz);
      for (const s of [-1, 1]) SB.add(G.box(0.07, 2.2, 0.07), "#a77445", { p: [lx + s * 0.25, y + 1.0, lz], r: [0.3, 0, 0], mat: "wood" });
      for (let k = 0; k < 6; k++) SB.add(G.box(0.5, 0.05, 0.05), "#a77445", { p: [lx, y + 0.2 + k * 0.32, lz - 0.06 - k * 0.1], mat: "wood" });
    }
    zones.push({ id: "orchard", name: "Vườn hồng & táo", desc: "Vườn quả mùa thu: hồng cam và táo đỏ trĩu cành, giỏ quả và thang hái.", kind: "orchard", shape: { t: "poly", pts: ORCH.poly }, h: 3.5 });
  }
  await ctx.step(0.42);

  /* ---------- đường ray vòng + hầm + tàu ---------- */
  {
    const step = 0.62 / RAIL;
    for (let t = 0; t < Math.PI * 2; t += step) {
      const x = Math.cos(t) * RAIL,
        z = Math.sin(t) * RAIL;
      if (H(x, z) > 0.5) continue;
      SB.add(G.box(0.38, 0.14, 1.9), pick(["#5e3c26", "#6b4630", "#563723"]), { p: [x, 0.08, z], r: [0, -t, 0], mat: "wood" });
    }
    for (const rr of [RAIL - 0.48, RAIL + 0.48]) {
      const g = new THREE.TorusGeometry(rr, 0.09, 4, 720);
      g.rotateX(Math.PI / 2);
      g.translate(0, 0.22, 0);
      SB.add(g, "#59606a", {});
      g.dispose();
    }
    for (const sgn of [-1, 1]) {
      const dA = (sgn * 4.3) / RAIL,
        t = TUN_A + dA,
        x = Math.cos(t) * RAIL,
        z = Math.sin(t) * RAIL;
      const tx = -Math.sin(t) * sgn,
        tz = Math.cos(t) * sgn,
        yaw = Math.atan2(tx, tz);
      const M = mat4(x, 0, z, yaw);
      SB.add(G.box(4.6, 3.6, 0.9), "#a49f94", { p: [0, 1.8, 0], mat: "stone", parent: M, wob: 0.05 });
      const arch = new THREE.Shape();
      arch.moveTo(-1.05, 0);
      arch.lineTo(1.05, 0);
      arch.lineTo(1.05, 1.6);
      arch.absarc(0, 1.6, 1.05, 0, Math.PI, false);
      arch.closePath();
      const ag = new THREE.ShapeGeometry(arch, 16);
      SB.add(ag, "#1f1814", { p: [0, 0.05, 0.47], parent: M, mat: "glow" });
      ag.dispose();
      const ring = new THREE.Shape();
      ring.moveTo(-1.45, 0);
      ring.lineTo(-1.05, 0);
      ring.lineTo(-1.05, 1.6);
      ring.absarc(0, 1.6, 1.05, Math.PI, 0, true);
      ring.lineTo(1.05, 0);
      ring.lineTo(1.45, 0);
      ring.lineTo(1.45, 1.6);
      ring.absarc(0, 1.6, 1.45, 0, Math.PI, false);
      ring.closePath();
      const rg = new THREE.ExtrudeGeometry(ring, { depth: 0.2, bevelEnabled: false, curveSegments: 16 });
      SB.add(rg, "#8f8a80", { p: [0, 0, 0.45], parent: M, mat: "stone" });
      rg.dispose();
      SB.add(G.box(4.8, 0.5, 1.1), SNOW, { p: [0, 3.7, 0], parent: M, wob: 0.08 });
    }
    zones.push({ id: "tunnel", name: "Hầm núi tuyết", desc: "Đường ray chui qua quả đồi phủ tuyết — tàu biến mất rồi hiện ra ở cửa hầm bên kia.", kind: "other", shape: { t: "circle", x: Math.cos(TUN_A) * RAIL, z: Math.sin(TUN_A) * RAIL, r: 5 }, h: 5 });
  }
  const carL = 3.2,
    gap = 0.32;
  const cars: THREE.Group[] = [];
  {
    const teal = "#2f9e9a",
      tealD = "#237a78",
      cream = "#f6efdc";
    for (let i = 0; i < 4; i++) {
      const b = new Builder(kit, rand),
        M = new THREE.Matrix4(),
        Lc = carL;
      b.add(G.box(Lc, 0.75, 1.5), teal, { p: [0, 0.6, 0], parent: M, wob: 0.01 });
      b.add(G.box(Lc, 0.62, 1.48), cream, { p: [0, 1.28, 0], parent: M });
      b.add(G.box(Lc - 0.1, 0.2, 1.62), teal, { p: [0, 1.68, 0], parent: M, wob: 0.01 });
      b.add(G.box(Lc - 0.5, 0.12, 0.9), tealD, { p: [0, 1.82, 0], parent: M });
      for (let k = 0; k < 2; k++) b.add(G.box(0.5, 0.1, 0.5), cream, { p: [-0.7 + k * 1.4, 1.92, 0], parent: M });
      for (const sz of [-1, 1])
        for (let k = 0; k < 4; k++) {
          const wx = -Lc / 2 + 0.45 + (k * (Lc - 0.9)) / 3;
          b.add(G.box(0.55, 0.38, 0.04), "#3d5a62", { p: [wx, 1.3, sz * 0.75], parent: M });
          b.add(G.box(0.12, 0.1, 0.03), "#ffffff", { p: [wx - 0.14, 1.4, sz * 0.77], parent: M, mat: "glow" });
        }
      b.add(G.box(Lc + 0.02, 0.1, 1.52), "#f2c14e", { p: [0, 0.98, 0], parent: M });
      for (const wx of [-Lc / 2 + 0.5, Lc / 2 - 0.5]) for (const sz of [-1, 1]) b.add(G.cyl(0.24, 0.24, 0.12, 12), "#2f2a28", { p: [wx, 0.2, sz * 0.6], r: [Math.PI / 2, 0, 0], parent: M });
      if (i < 3) b.add(G.box(gap + 0.1, 0.18, 0.3), "#3a3330", { p: [-Lc / 2 - gap / 2, 0.45, 0], parent: M });
      if (i === 0) {
        b.add(G.sph(0.78, 18, 12), teal, { p: [Lc / 2, 0.95, 0], s: [0.65, 0.75, 0.98], parent: M });
        b.add(G.sph(0.62, 18, 12), cream, { p: [Lc / 2 + 0.05, 1.2, 0], s: [0.6, 0.6, 0.98], parent: M });
        for (const sz of [-1, 1]) {
          b.add(G.sph(0.17, 12, 10), "#fffaf0", { p: [Lc / 2 + 0.42, 1.12, sz * 0.36], parent: M, mat: "glow" });
          b.add(G.sph(0.09, 10, 8), INK, { p: [Lc / 2 + 0.56, 1.12, sz * 0.36], parent: M });
          b.add(G.sph(0.1, 8, 6), "#f4a6b8", { p: [Lc / 2 + 0.4, 0.92, sz * 0.55], s: [0.5, 0.6, 1], parent: M });
          b.add(G.cone(0.28, 0.5, 4), tealD, { p: [Lc / 2 - 0.5, 2.0, sz * 0.42], r: [sz * 0.3, 0, 0], parent: M });
        }
        b.add(G.tor(0.2, 0.04, 6, 12, Math.PI), INK, { p: [Lc / 2 + 0.47, 0.88, 0], r: [0, Math.PI / 2, Math.PI], parent: M });
        b.add(G.cyl(0.05, 0.05, 0.6, 6), INK, { p: [-0.6, 2.05, 0], parent: M });
        b.add(G.box(0.9, 0.05, 0.05), INK, { p: [-0.6, 2.35, 0], parent: M });
      }
      const g = b.build(true, false);
      const bl = new THREE.Mesh(new THREE.PlaneGeometry(carL + 0.7, 2.0), new THREE.MeshBasicMaterial({ map: T.blob, transparent: true, depthWrite: false, opacity: 0.8 }));
      bl.rotation.x = -Math.PI / 2;
      bl.position.y = -0.2;
      setLayer(bl, 1);
      g.add(bl);
      scene.add(g);
      cars.push(g);
    }
  }
  const C = Math.PI * 2 * RAIL;
  const tunHalf = 4.3 / RAIL;
  const train = new Train(
    cars,
    carL + gap,
    (s) => {
      const t = s / RAIL;
      return { x: Math.cos(t) * RAIL, y: 0.3, z: Math.sin(t) * RAIL, yaw: Math.atan2(-Math.cos(t), -Math.sin(t)) };
    },
    (s) => {
      let d = s / RAIL - TUN_A;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      return Math.abs(d) < tunHalf - 0.02;
    }
  );
  const STOP = 102 * D2R * RAIL;
  const DWELL = 5,
    V = 7,
    EASE = 3;
  const LOOP = C / V + EASE + DWELL;

  /* ---------- đá, đèn, bảng chỉ đường, bụi hoa ---------- */
  const ico1 = new THREE.IcosahedronGeometry(1, 1);
  function rock(x: number, z: number, s: number, snow: boolean) {
    const y = H(x, z);
    SB.add(ico1, pick(["#b1aca1", "#9c978d", "#c2bdb1", "#8f8b84"]), { p: [x, y + s * 0.2, z], s: [s, s * R(0.55, 0.8), s * R(0.8, 1.1)], r: [0, R(0, 3), 0], wob: s * 0.12, wf: 2.5 / s, mat: "stone" });
    if (snow) SB.add(G.sph(s * 0.8, 10, 6), SNOW, { p: [x, y + s * 0.55, z], s: [1.05, 0.35, 0.95], wob: 0.04 });
  }
  function bush(x: number, z: number, s: number, pal: string[], flowers: string[] | null) {
    const y = H(x, z);
    for (const [ox, oz, r] of [
      [0, 0, 0.6],
      [0.55, 0.1, 0.45],
      [-0.5, 0.15, 0.48],
      [0.1, -0.35, 0.42],
    ])
      SB.add(G.sph(r * s, 12, 8), pick(pal), { p: [x + ox * s, y + r * s * 0.7, z + oz * s], s: [1, 0.85, 1], wob: 0.05, wf: 2.5, mat: "leaf" });
    if (flowers)
      for (let k = 0; k < 9; k++) {
        const a = R(0, 6.28),
          rr = R(0.2, 0.7) * s;
        SB.add(G.sph(0.2 * s, 8, 6), pick(flowers), { p: [x + Math.cos(a) * rr, y + R(0.55, 0.85) * s, z + Math.sin(a) * rr * 0.8 + 0.1], wob: 0.03 });
      }
    obst(x, z, 0.6 * s);
    circles.push({ x, z, r: 0.6 * s });
  }
  {
    const [x, z] = [SRC[0] + 2.4, SRC[1] + 1.6];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 6.28;
      rock(x + Math.cos(a) * 1.5, z + Math.sin(a) * 1.2, R(0.35, 0.6), true);
    }
  }
  for (const [x, z, sn] of [
    [-1.8, -10.5, true],
    [1.8, -10.5, false],
    [-1.8, -28.5, true],
    [-8.3, -8.0, true],
    [-13.9, -8.3, true],
    [-1.8, 8.8, false],
    [1.8, 8.8, false],
    [-9.0, -19.4, true],
    [1.7, -24.0, false],
    [-24.5, 1.8, false],
    [-24.5, -1.8, true],
    [22.0, 1.8, false],
    [22.0, -1.8, false],
    [-3.0, 26.6, false],
    [3.0, 26.4, false],
  ] as [number, number, boolean][])
    stoneLantern(x, z, sn);
  signpost(2.3, 22.6, [
    ["Đảo Đền", 1, 2.35, -0.15],
    ["Vườn Xuân", -1, 1.85, 0.12],
    ["Ruộng Hạ", 1, 1.35, 0.1],
  ]);
  signpost(-2.2, -6.6, [
    ["Suối Đông", -1, 2.5, 0.1],
    ["Rừng Thu", 1, 1.6, -0.1],
  ]);
  const PAL: Record<string, string[]> = {
    green: ["#5f9a3c", "#6fae4a", "#7fbf55", "#8fcb5e", "#68a645"],
    spring: ["#8fcf62", "#a6da74", "#b8e48a", "#9ad06a"],
    sakura: ["#f7b9cb", "#f4a3bb", "#fbd0dc", "#f8c3d2", "#ee98b2"],
    momiji: ["#d8452c", "#e5603a", "#c73a2a", "#ef7d3a", "#b8302a"],
    ginkgo: ["#f3c53a", "#f7d65a", "#e8b22c", "#f9e07a"],
    kaki: ["#8a9a3c", "#a3a043", "#c08a35", "#7f9a45"],
    apple: ["#5f9a3c", "#6fae4a", "#7fbf55"],
  };
  const HYD = ["#6f8fe0", "#9a7fd8", "#e98fbf", "#9cc4f0", "#7aa0ea"];
  for (let z = 18.8; z < 23; z += 1.3) bush(2.1, z, 0.85, PAL.green, HYD);
  for (let z = 9.8; z < 13; z += 1.3) bush(2.0, z, 0.8, PAL.green, HYD);
  for (let x = 13.2; x < 30.5; x += 1.45) if (freeSpot(x, 2.1, 0.3)) bush(x, 2.1, 0.8, PAL.green, HYD);
  for (const [x, z] of [
    [14.5, 19.6],
    [19.6, 19.4],
    [6.2, 5.5],
    [4.4, 7.4],
  ])
    if (freeSpot(x, z, 0.5)) bush(x, z, 0.85, PAL.green, HYD);
  for (let i = 0, n = 0; i < 1500 && n < 46; i++) {
    const x = R(-31, 31),
      z = R(-31, 31),
      r = Math.hypot(x, z);
    if (r > 30.5 || r < 8.5) continue;
    if (!freeSpot(x, z, 1.0)) continue;
    const s = seasonMain(x, z);
    if (s === 0) {
      if (rng() < 0.5) continue;
      rock(x, z, R(0.25, 0.45), true);
      obst(x, z, 0.6);
      circles.push({ x, z, r: 0.5 });
    } else if (s === 1) bush(x, z, R(0.7, 1.0), ["#c8792e", "#d9932f", "#b8642a", "#a8782e"], null);
    else if (s === 2) bush(x, z, R(0.7, 1.0), PAL.green, rng() < 0.4 ? ["#fffaf0", "#f7d85e"] : null);
    else bush(x, z, R(0.7, 1.0), PAL.spring, ["#fbd0dc", "#fffdf6", "#f6b3c4"]);
    n++;
  }
  for (let i = 0; i < 40; i++) {
    const k = Math.floor(R(4, RIVER.length - 8)),
      p = RIVER[k],
      q = RIVER[k + 1],
      tx = q.x - p.x,
      tz = q.z - p.z,
      Ln = Math.hypot(tx, tz),
      sd = rng() < 0.5 ? -1 : 1,
      off = p.w + R(0.6, 1.1);
    const x = p.x - (tz / Ln) * off * sd,
      z = p.z + (tx / Ln) * off * sd;
    if (onPath(x, z) > 0.1) continue;
    rock(x, z, R(0.22, 0.5), seasonMain(x, z) === 0);
  }
  for (let i = 0; i < 26; i++) {
    const a = R(0, 6.28),
      r = pondR(a) + R(0.5, 1.0),
      x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    if (onPath(x, z) > 0.1 || (Math.abs(x) < 1.6 && z > 0)) continue;
    rock(x, z, R(0.25, 0.55), seasonMain(x, z) === 0);
  }
  await ctx.step(0.55);

  /* ---------- cây (gộp, đung đưa) ---------- */
  function roundTree(M: THREE.Matrix4, pal: string[], opt: { trunk?: string; n?: number; sy?: number; wide?: number; blob?: number; hi?: string } = {}) {
    const b = TB,
      trunk = opt.trunk || "#5a3a24";
    b.add(G.cyl(0.2, 0.32, 1.9, 8), trunk, { p: [0, 0.95, 0], wob: 0.03, mat: "wood", parent: M });
    b.add(G.cyl(0.08, 0.12, 0.9, 6), trunk, { p: [0.3, 1.6, 0.05], r: [0, 0, -0.7], mat: "wood", parent: M });
    b.add(G.cyl(0.07, 0.11, 0.8, 6), trunk, { p: [-0.3, 1.7, -0.05], r: [0, 0, 0.7], mat: "wood", parent: M });
    const n = opt.n || 6,
      sy = opt.sy || 0.88,
      wide = opt.wide || 1;
    b.add(G.sph(1.25, 14, 10), pick(pal), { p: [0, 2.75, 0], s: [1.05 * wide, sy, 1.05 * wide], wob: 0.1, wf: 1.8, mat: "leaf", parent: M });
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + R(-0.3, 0.3),
        rr = R(0.75, 1.05) * wide,
        r = R(0.6, 0.9) * (opt.blob || 1);
      b.add(G.sph(r, 12, 9), pick(pal), { p: [Math.cos(a) * rr, 2.45 + R(-0.25, 0.55), Math.sin(a) * rr], s: [1, 0.85, 1], wob: 0.08, wf: 2.2, mat: "leaf", parent: M });
    }
    b.add(G.sph(0.8, 12, 9), opt.hi || pal[pal.length - 1], { p: [-0.3, 3.45, 0.3], s: [1, 0.8, 1], wob: 0.06, mat: "leaf", parent: M });
  }
  function conifer(M: THREE.Matrix4, snow: boolean) {
    const b = TB;
    b.add(G.cyl(0.16, 0.24, 1.2, 7), "#5a3a24", { p: [0, 0.6, 0], mat: "wood", parent: M });
    const cols = snow ? ["#3c6e52", "#477a5a", "#538662", "#5f906a"] : ["#3f7a45", "#4c8a4d", "#5a9a55", "#68a85c"];
    for (let i = 0; i < 4; i++) {
      const r = 1.55 - i * 0.3,
        h = 1.7 - i * 0.12,
        y = 1.25 + i * 0.95 + h / 2,
        ry = R(0, 3);
      b.add(G.cone(r, h, 11), cols[i], { p: [0, y, 0], wob: 0.09, wf: 2.5, mat: "leaf", r: [0, ry, 0], parent: M });
      if (snow) {
        b.add(G.cone(r * 0.78, h * 0.5, 11), SNOW, { p: [0, y + h * 0.24, 0], wob: 0.08, wf: 2.5, r: [0, ry, 0], parent: M });
        for (let k = 0; k < 4; k++) {
          const a = (k / 4) * 6.28 + ry;
          b.add(G.sph(0.22, 6, 5), SNOW, { p: [Math.cos(a) * r * 0.75, y - h * 0.3, Math.sin(a) * r * 0.75], s: [1.2, 0.5, 1.2], parent: M });
        }
      }
    }
  }
  function fruitTree(M: THREE.Matrix4, kind: string) {
    const b = TB,
      fruit = kind === "kaki" ? "#f07a1c" : "#d8322c";
    b.add(G.cyl(0.18, 0.28, 1.5, 8), "#5a3a24", { p: [0, 0.75, 0], wob: 0.03, mat: "wood", parent: M });
    for (const s of [-1, 1]) b.add(G.cyl(0.07, 0.11, 1.0, 6), "#5a3a24", { p: [s * 0.35, 1.5, 0], r: [0, 0, -s * 0.8], mat: "wood", parent: M });
    const pal = PAL[kind];
    b.add(G.sph(1.3, 14, 10), pick(pal), { p: [0, 2.3, 0], s: [1.15, 0.78, 1.15], wob: 0.09, wf: 1.8, mat: "leaf", parent: M });
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * 6.28 + R(-0.3, 0.3);
      b.add(G.sph(R(0.55, 0.75), 12, 9), pick(pal), { p: [Math.cos(a) * 0.95, 2.2 + R(-0.2, 0.3), Math.sin(a) * 0.95], s: [1, 0.8, 1], wob: 0.07, mat: "leaf", parent: M });
    }
    for (let k = 0; k < 22; k++) {
      const a = R(0, 6.28),
        el = R(0.1, 1.2),
        rr = 1.38;
      const x = Math.cos(a) * Math.cos(el) * rr * 1.1,
        y = 2.3 + Math.sin(el) * rr * 0.75,
        z = Math.sin(a) * Math.cos(el) * rr * 1.1;
      b.add(G.sph(0.17, 10, 8), fruit, { p: [x, y, z], s: kind === "kaki" ? [1, 0.8, 1] : 1, parent: M });
      if (rng() < 0.5) b.add(G.sph(0.06, 6, 4), "#3f6b2a", { p: [x, y + 0.15, z], parent: M });
    }
  }
  function ginkgo(M: THREE.Matrix4) {
    const b = TB;
    b.add(G.cyl(0.18, 0.3, 2.2, 8), "#6b4630", { p: [0, 1.1, 0], mat: "wood", wob: 0.02, parent: M });
    for (const [y, r] of [
      [2.2, 1.35],
      [3.2, 1.05],
      [4.1, 0.72],
    ]) {
      b.add(G.sph(r, 14, 10), pick(PAL.ginkgo), { p: [0, y, 0], s: [1, 0.85, 1], wob: 0.09, mat: "leaf", parent: M });
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * 6.28 + R(0, 1);
        b.add(G.sph(r * 0.55, 10, 8), pick(PAL.ginkgo), { p: [Math.cos(a) * r * 0.75, y - 0.15, Math.sin(a) * r * 0.75], wob: 0.06, mat: "leaf", parent: M });
      }
    }
  }
  // cây xa (ngoài vòng ray) ít đỉnh hơn trên điện thoại vẫn giữ hình dáng
  for (const t of TREES) {
    const y = H(t.x, t.z) - 0.05,
      M = mat4(t.x, y, t.z, t.yaw, t.s);
    TB.pivot = [t.x, y + 1.2 * t.s, t.z, t.t === "snowpine" || t.t === "pine" ? 0.012 : 0.02];
    switch (t.t) {
      case "green":
        roundTree(M, PAL.green, { hi: "#9fd36a" });
        break;
      case "spring":
        roundTree(M, PAL.spring, { hi: "#c8ec98" });
        break;
      case "sakura":
        roundTree(M, PAL.sakura, { trunk: "#4e3328", n: 8, sy: 0.75, wide: 1.2, hi: "#f9c3d3" });
        break;
      case "momiji":
        roundTree(M, PAL.momiji, { trunk: "#4e3328", n: 9, blob: 0.75, wide: 1.1, hi: "#f29a52" });
        break;
      case "ginkgo":
        ginkgo(M);
        break;
      case "pine":
        conifer(M, false);
        break;
      case "snowpine":
        conifer(M, true);
        break;
      case "snowround":
        roundTree(M, ["#e8eef5", "#f4f7fb", "#dde6f0"], { trunk: "#4e3328", hi: "#ffffff" });
        break;
      case "kaki":
      case "apple":
        fruitTree(M, t.t);
        break;
    }
    circles.push({ x: t.x, z: t.z, r: 0.35 * t.s });
  }
  await ctx.step(0.7);
  scene.add(SB.build());
  scene.add(TB.build());
  ico1.dispose();
  await ctx.step(0.85);

  // cỏ rải theo mùa (instancing, đung đưa)
  {
    const tb = new Builder(kit, rand);
    for (let k = 0; k < 4; k++) tb.add(G.cone(0.045, R(0.32, 0.5), 3), "#ffffff", { p: [R(-0.08, 0.08), 0.18, R(-0.05, 0.05)], r: [R(-0.3, 0.3), R(0, 3), R(-0.45, 0.45)] });
    const geo = mergeGeometries(tb.lists.prop)!;
    for (const g of tb.lists.prop) g.dispose();
    const N = Math.round(2600 * ctx.q.scatter),
      im = new THREE.InstancedMesh(geo, kit.paint({ vertexColors: true, sway: "inst", swayAmp: 0.18 }), N);
    let c = 0;
    const m4 = new THREE.Matrix4();
    const TC = [
      ["#9aa6a0", "#b4bdb6"],
      ["#a88a3a", "#8f7a32"],
      ["#3f7a34", "#4f8a3a"],
      ["#5a9a40", "#6aaa48"],
    ].map((p) => p.map((h) => new THREE.Color(h)));
    for (let i = 0; i < 20000 && c < N; i++) {
      const x = R(-42, 42),
        z = R(-40, 42);
      if (onPath(x, z) > 0.2 || onWater(x, z) > 0.2) continue;
      const s0 = seasonPick(rand, x, z);
      if (s0 === 0 && rng() < 0.85) continue;
      let bad = false;
      for (const o of OBST)
        if ((x - o.x) ** 2 + (z - o.z) ** 2 < (o.r + 0.1) ** 2) {
          bad = true;
          break;
        }
      if (bad) continue;
      let inR = false;
      for (const p of RECTS) if (Math.abs(x - p.x) < p.w / 2 && Math.abs(z - p.z) < p.d / 2) inR = true;
      if (inR) continue;
      if (Math.abs(Math.hypot(x, z) - RAIL) < 1.4) continue;
      const s = R(0.8, 1.4);
      m4.compose(new THREE.Vector3(x, H(x, z) - 0.03, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, R(0, 6), 0)), new THREE.Vector3(s, s, s));
      im.setMatrixAt(c, m4);
      im.setColorAt(c, pick(TC[s0]));
      c++;
    }
    im.count = c;
    im.receiveShadow = true;
    setLayer(im, 1);
    scene.add(im);
  }
  clearPrimitives();

  // vật rơi theo mùa: cánh anh đào (xuân), lá phong/bạch quả (thu), tuyết (đông)
  const sc = ctx.q.scatter;
  const drift = new Drifters(
    scene,
    [
      { x: -18, z: 21.5, r: 7, y: H(-18, 21.5), colors: ["#f7b9cb", "#fbd0dc", "#ffffff", "#f4a3bb"], n: Math.round(46 * sc) },
      { x: -8, z: 14, r: 6, y: H(-8, 14), colors: ["#f7b9cb", "#fbd0dc"], n: Math.round(16 * sc) },
      { x: 12, z: -12, r: 9, y: H(12, -12), colors: ["#d8452c", "#e5603a", "#f3c53a", "#f7d65a", "#ef7d3a"], n: Math.round(46 * sc) },
      { x: 24, z: -4, r: 7, y: H(24, -4), colors: ["#d8452c", "#f3c53a", "#e8b22c"], n: Math.round(18 * sc) },
      { x: -14, z: -14, r: 13, y: H(-14, -14), colors: ["#ffffff", "#f6f9fc", "#eef3fa"], n: Math.round(70 * sc), kind: "snow" },
    ],
    rand
  );

  /* ---------- vùng bấm thêm + đi bộ ---------- */
  zones.push(
    { id: "pond", name: "Ao giữa thung", desc: "Ao tròn nơi dòng suối xoắn ốc đổ về, lá súng và hoa sen hồng nổi trên mặt nước.", kind: "water", shape: { t: "circle", x: 0, z: 0, r: 7.6 }, h: 0.3 },
    { id: "sakura-grove", name: "Rừng anh đào", desc: "Góc xuân của thung lũng: một khoảnh anh đào hồng nở kín.", kind: "other", shape: { t: "ellipse", x: -18, z: 21.5, a: 7, b: 5 }, h: 4 },
    { id: "spring-src", name: "Mạch suối núi tuyết", desc: "Nơi dòng suối bắt nguồn giữa những tảng đá phủ tuyết.", kind: "water", shape: { t: "circle", x: SRC[0] + 2.4, z: SRC[1] + 1.6, r: 2.4 }, h: 1.5 }
  );
  const segDistPts = (x: number, z: number, pts: RiverPt[]) => {
    let best = 1e9;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i],
        b = pts[i + 1],
        dx = b.x - a.x,
        dz = b.z - a.z,
        L2 = dx * dx + dz * dz;
      const t = clamp(((x - a.x) * dx + (z - a.z) * dz) / L2, 0, 1),
        d = Math.hypot(x - a.x - dx * t, z - a.z - dz * t) - lerp(a.w, b.w, t);
      if (d < best) best = d;
    }
    return best;
  };
  const walk = new WalkMap({
    bounds: [-31, 31, -31, 31],
    ground: H,
    circles,
    rects,
    bridges,
    base: (x, z) => {
      const r = Math.hypot(x, z);
      if (r > RAIL - 1.7) return false;
      if (r > ISLE_R - 0.2 && r < pondR(Math.atan2(z, x)) + 0.45) return false;
      if (onWater(x, z) > 0.2 && (segDistPts(x, z, RIVER) < 0.45 || segDistPts(x, z, BROOK) < 0.45)) return false;
      if (inPolyOrch(x, z)) return false;
      return true;
    },
  });
  function inPolyOrch(x: number, z: number) {
    return x > 13 && x < 24 && z > -21 && z < -12;
  }

  return {
    id: "bon-mua",
    scene,
    bg: B0.bg,
    camera: {
      fov: 30,
      wide: { box: [-40, 40, -34, 35.5], pitch: 57, tgtY: 0 },
      tall: { box: [-31, 31, -26, 32], pitch: 60, tgtY: 0 },
      panBox: [-36, 36, -34, 34],
    },
    ink: INK_B,
    paper: PAPER_B,
    inkDS: 1.6,
    kit,
    U,
    textures: { blob: T.blob, wing: T.wing, paper: T.paper },
    zones,
    walk,
    start: { hero: [0.55, 19.6], mochi: [-0.75, 20.3] },
    stroll: [
      [0.4, 15],
      [0, 8.6],
      [-9.5, 5.6],
      [-14, -0.4],
      [-24, 0.2],
      [-27, 4.5],
      [-27, 0],
      [-11.2, -4],
      [-0.4, -13],
      [0, -21],
      [-6, -21.3],
      [0, -25],
      [0.2, -9],
      [12, 0.2],
      [18.7, -6],
      [23, -0.3],
      [12, 0.3],
      [0.3, 11.5],
      [9, 26],
      [0.5, 22],
    ],
    charScale: 1.25,
    butterflies: [
      [-5.2, 11.1],
      [9.5, 22.2],
      [-9.6, 25],
      [-18, 20],
      [2.5, 20.5],
      [20, 2.5],
    ],
    train,
    update(t, _dt, reduced) {
      puffs.update(t);
      drift.mesh.visible = !reduced;
      if (!reduced) drift.update(t);
      const s = reduced ? STOP : passSchedule(t, { period: LOOP, sA: STOP - C / 2, sB: STOP + C / 2, v: V, sStop: STOP, dwell: DWELL, ease: EASE, offset: LOOP / 2 - 6 });
      train.place(s ?? STOP, 1);
    },
  };
}
