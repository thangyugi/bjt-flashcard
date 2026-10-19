/**
 * Engine "Thảo nguyên Pha Lê": dựng cảnh three.js, vòng lặp khung hình, camera, chọn cây / sinh vật,
 * gieo cây vào ô đất, chế độ đi dạo, ngày/đêm. Giao tiếp với React qua một API nhỏ + các sự kiện.
 *
 * Module này chỉ được nạp động (dynamic import) từ trang /land, nên three.js không lọt vào bundle của trang khác.
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CR, SP, stageOf, type SpeciesInfo } from "../data";
import { createAvatar } from "./avatar";
import { createFauna } from "./fauna";
import { PB, TAU, clamp, hx, mix, mul, mulberry32, sstep } from "./math";
import { addPoints, createUniforms, disposeTree, type Ctx, type Dots } from "./render";
import { buildSky, liveHour, phaseName, placeSun, skyBackground, todAt } from "./sky";
import { SPECIES_GEN } from "./species";
import { buildLand, buildLowlands, buildPlots } from "./terrain";
import {
  H,
  LH,
  OBST_R,
  PLANT_R,
  PLOT_POS,
  RIM,
  SPTS,
  WILD,
  collide as collideWith,
  freshDeco,
  freshObstacles,
  groundY,
  walkable,
  type Deco,
  type Obstacle,
} from "./world";

export { paintSwatch } from "./swatch";

export type LandView = "walk" | "overview";
/** Đang gieo: đã chọn loài (chờ chạm ô đất) hoặc đã chọn ô (chờ chọn loài) */
export type PlantingMode = { kind: "species"; id: string } | { kind: "plot"; plot: number } | null;
/** Một cây người học đã gieo (lấy từ land-store) */
export interface PlantingRecord {
  plot: number;
  species: string;
  /** thời điểm gieo (ms) */
  plantedAt: number;
}
export type LandSelection =
  | {
      kind: "species";
      id: string;
      /** Cây đang được theo dõi trên đất (null: chưa gieo loài này) */
      focus: { plot: number | null; growth: number } | null;
      /** Số cây loài này đang có trên đất (cả cây công viên, cây mọc hoang) */
      onLand: number;
      /** Số cây công viên mọc sẵn của loài này */
      deco: number;
    }
  | { kind: "creature"; id: string };
export type LandPrompt = { kind: "plot"; plot: number } | { kind: "look"; name: string };
export interface LandTime {
  hour: number;
  /** "HH:MM" */
  label: string;
  phase: string;
  live: boolean;
}
export interface LandEvents {
  /** Lựa chọn đổi do chạm trong cảnh / gieo cây / bấm "Xem trên đất" */
  onSelect: (s: LandSelection) => void;
  /** Cây đang theo dõi lớn lên (hoạt ảnh sau khi gieo) */
  onGrowth: (g: number) => void;
  /** Ở chế độ gieo: người học chạm vào một ô đất trống */
  onPlotPick: (plot: number) => void;
  /** Gợi ý tương tác khi Lữ khách đứng gần (null: không có gì) */
  onPrompt: (p: LandPrompt | null) => void;
  onToast: (msg: string) => void;
  onView: (v: LandView) => void;
  onTime: (t: LandTime) => void;
  onCreatureStatus: (s: string) => void;
}
export interface LandEngineOptions {
  /** Khung chứa canvas (đo kích thước, tô nền bầu trời) */
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  /** Nhãn nổi trên đầu cây/sinh vật đang chọn (engine tự đặt vị trí) */
  tag?: HTMLElement | null;
  /** false: bản xem trước (chưa đăng nhập) — chỉ tự xoay, không nhận thao tác */
  interactive: boolean;
  plantings: PlantingRecord[];
  reducedMotion: boolean;
  events?: Partial<LandEvents>;
}
export interface LandEngine {
  selectSpecies: (id: string, fly?: boolean) => void;
  selectCreature: (id: string, fly?: boolean) => void;
  /** Nút "Xem trên đất": bay tới (lần lượt) cây của loài đang chọn / sinh vật đang chọn */
  showOnLand: () => void;
  /** Kéo thanh sinh trưởng: xem trước cây ở độ lớn g (0–1) */
  setGrowthPreview: (g: number) => void;
  setPlanting: (mode: PlantingMode) => void;
  /** Đồng bộ cây đã gieo từ store (cây mới gieo sẽ mọc lên có hoạt ảnh) */
  syncPlantings: (list: PlantingRecord[]) => void;
  setView: (v: LandView) => void;
  /** Về góc nhìn toàn cảnh mặc định */
  focusHome: () => void;
  /** Xem thử giờ h (có chuyển cảnh); null = theo giờ thật */
  previewHour: (h: number | null) => void;
  /** Kéo thanh giờ: đặt ngay giờ h */
  scrubHour: (h: number) => void;
  /** Nút "Gieo"/"Xem" của gợi ý tương tác (hoặc phím E) */
  interact: () => void;
  setJoystick: (x: number, y: number) => void;
  /** Tổng số chấm trong cảnh (để đo hiệu năng) */
  readonly points: number;
  dispose: () => void;
}

export class WebGLUnavailableError extends Error {
  constructor() {
    super("WebGL không khả dụng");
    this.name = "WebGLUnavailableError";
  }
}

interface Plant {
  key: string;
  sp: SpeciesInfo;
  obj: Dots;
  x: number;
  z: number;
  /** chỉ số ô đất (null: cây mọc hoang) */
  plot: number | null;
  growth: number;
  anim: null | { t0: number; dur: number };
  height: number;
  petals?: Dots;
}

const LENS = 1.45; // dịch ống kính: cao nguyên nằm thấp trong khung, chừa một dải trời phía trên
const HOME_T = new THREE.Vector3(0.2, -0.9, 0.6),
  HOME_DIR = new THREE.Vector3(0.69, 0.33, 0.72).normalize();
const MOVE_KEYS = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
const plantKey = (r: PlantingRecord) => `${r.plot}:${r.species}:${r.plantedAt}`;
/** Cây gieo trong vòng 10 giây gần đây thì mọc lên có hoạt ảnh */
const FRESH_MS = 10_000;

export function createLandEngine(opts: LandEngineOptions): LandEngine {
  const { container, canvas, interactive } = opts;
  const ev = opts.events ?? {};
  const REDUCED = opts.reducedMotion;
  const SMALL = Math.min(window.innerWidth, window.innerHeight) < 600;
  const dpr = window.devicePixelRatio || 1;

  /* ---------- trạng thái vòng lặp ---------- */
  let T = 0,
    raf = 0,
    running = false,
    disposed = false,
    lastTOD = 0,
    lastStatus = "",
    lastGrowthEmit = -1;
  // Tạm dừng khi tab ẩn, khi khung cảnh cuộn khỏi màn hình, hoặc khi mất ngữ cảnh WebGL
  let pageVisible = !document.hidden,
    onScreen = true,
    contextOk = true;

  /* ---------- renderer ---------- */
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  } catch {
    throw new WebGLUnavailableError();
  }
  // Giới hạn mật độ điểm ảnh: màn nhỏ mật độ cao không cần vẽ quá 1.75x
  renderer.setPixelRatio(Math.min(dpr, SMALL ? 1.75 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera((2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(19)) * LENS) * 180) / Math.PI, 1, 0.1, 1400);
  const U = createUniforms(REDUCED);
  const ctx: Ctx = {
    scene,
    U,
    D: SMALL ? (dpr > 2.5 ? 0.44 : 0.5) : 1,
    DP: SMALL ? 0.7 : 1,
    small: SMALL,
    reduced: REDUCED,
    R: mulberry32(20241018),
    total: 0,
  };
  const { R, D, DP } = ctx;

  /* ---------- dựng thế giới ---------- */
  const deco: Deco[] = freshDeco();
  const staticObst: Obstacle[] = freshObstacles();
  const land = buildLand(ctx, deco, staticObst);
  const low = buildLowlands(ctx);
  const plots = buildPlots(ctx);
  const plotPlant: (Plant | null)[] = plots.map(() => null);
  const plants: Plant[] = [];

  function makePlant(spId: string, x: number, z: number, seed: number, plot: number | null, growth: number, key: string): Plant {
    const sp = SP[spId],
      r = mulberry32(1000 + seed * 7919);
    const b = new PB(r);
    SPECIES_GEN[spId](b, r, DP * (sp.tree ? 0.85 : 1));
    b.bake((r() - 0.5) * 0.8);
    const obj = addPoints(ctx, b, { add: !!sp.add, solid: !sp.add, useY: 1, size: sp.scale, growth }, 1);
    obj.scale.setScalar(sp.scale);
    obj.position.set(x, H(x, z) - 0.02, z);
    const p: Plant = { key, sp, obj, x, z, plot, growth, anim: null, height: b.maxY * sp.scale };
    if (sp.petals) {
      const pb = new PB(r);
      for (let i = 0; i < 90; i++) {
        const a = r() * TAU,
          rr = Math.sqrt(r()) * 0.85,
          y = 1.1 + r() * 0.6;
        pb.add(Math.cos(a) * rr, y, Math.sin(a) * rr, mix(hx("#ffd0e0"), hx("#f6a0c0"), r()), 0.035, 0, y, 0, r());
      }
      p.petals = addPoints(ctx, pb, { defines: { PETAL: "" }, opacity: 0 }, 4, obj);
    }
    setGrowth(p, growth);
    plants.push(p);
    if (plot !== null) plotPlant[plot] = p;
    return p;
  }
  function setGrowth(p: Plant, g: number) {
    p.growth = g;
    p.obj.material.uniforms.uGrowth.value = g;
    if (p.petals) p.petals.material.uniforms.uOpacity.value = sstep(0.85, 1, g);
  }
  function removePlant(p: Plant) {
    const i = plants.indexOf(p);
    if (i >= 0) plants.splice(i, 1);
    if (p.plot !== null && plotPlant[p.plot] === p) plotPlant[p.plot] = null;
    scene.remove(p.obj);
    disposeTree(p.obj);
    if (state.focus === p) state.focus = null;
  }
  /** Hạt giống của cây trong ô: cố định theo ô + loài để cây trông giống nhau mỗi lần mở */
  const plotSeed = (plot: number, species: string) => 100 + plot * 31 + [...species].reduce((n, c) => (n * 7 + c.charCodeAt(0)) % 997, 0);

  // cây mọc hoang (phong cảnh mặc định) — hạt giống 7..10 như bản mẫu
  WILD.forEach(([id, x, z], i) => makePlant(id, x, z, 7 + i, null, 1, `wild:${i}`));
  // cây người học đã gieo
  for (const r of opts.plantings) {
    if (r.plot < 0 || r.plot >= PLOT_POS.length || !SPECIES_GEN[r.species] || plotPlant[r.plot]) continue;
    makePlant(r.species, PLOT_POS[r.plot][0], PLOT_POS[r.plot][1], plotSeed(r.plot, r.species), r.plot, 1, plantKey(r));
  }

  // đom đóm (đêm) / bào tử trôi (ngày)
  const ff = new PB(R);
  for (let i = 0; i < 320 * D; i++) {
    const rr = 8.6 * Math.sqrt(R()),
      a = R() * TAU,
      x = rr * Math.cos(a),
      z = rr * Math.sin(a);
    const c = [hx("#ffd27a"), hx("#c8ff8a"), hx("#ffe9a8")][Math.floor(R() * 3)];
    ff.add(x, H(x, z) + 0.25 + R() * 1.5, z, mul(c, 0.9), 0.065, 0, 0.2 + R() * 0.4, 1, R() * 30);
  }
  const fireMat = addPoints(ctx, ff, { add: true, lit: 0, defines: { DRIFT: "" } }, 4).material;
  // lấp lánh trôi theo dòng suối (di chuyển bằng CPU)
  const NSPARK = Math.floor(260 * D),
    sparkS = new Float32Array(NSPARK),
    sparkV = new Float32Array(NSPARK),
    sparkO = new Float32Array(NSPARK);
  const spb = new PB(R);
  for (let i = 0; i < NSPARK; i++) {
    sparkS[i] = R();
    sparkV[i] = 0.012 + R() * 0.01;
    sparkO[i] = (R() - 0.5) * 0.3;
    spb.add(0, 0, 0, mix(hx("#d8fffa"), hx("#ffe2b8"), R() * 0.4), 0.05, 0, 0, 0.8);
  }
  const sparks = addPoints(ctx, spb, { add: true }, 3);
  sparks.frustumCulled = false;
  const SPARK_Y = SPTS.map((p) => H(p.x, p.z) + 0.14);

  /* ---------- vật cản (tĩnh + cây đã lớn) ---------- */
  let frameObst: Obstacle[] = staticObst;
  const rebuildObstacles = () => {
    frameObst = staticObst.concat(
      plants.filter((p) => p.growth > 0.3).map((p) => ({ x: p.x, z: p.z, r: (PLANT_R[p.sp.id] ?? (p.sp.tree ? OBST_R[p.sp.id] : 0.18)) * Math.min(1, p.growth + 0.2) }))
    );
  };
  rebuildObstacles();
  const obstacles = () => frameObst;
  const collide = (x: number, z: number, rad: number) => collideWith(x, z, rad, frameObst);

  /* ---------- camera & điều khiển ---------- */
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.minPolarAngle = 0.32;
  controls.maxPolarAngle = 1.3;
  controls.minDistance = 3;
  controls.maxDistance = 72;
  controls.autoRotate = !REDUCED;
  controls.autoRotateSpeed = 0.35;
  controls.rotateSpeed = 0.6;
  controls.enabled = interactive;
  const homeDist = () => {
    const a = camera.aspect,
      f = THREE.MathUtils.degToRad(camera.fov);
    return Math.max(24, (a < 0.8 ? 21 : 23) / (2 * Math.tan(f / 2) * Math.min(a, 1.0)));
  };
  function resize() {
    const w = container.clientWidth,
      h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / (h * LENS);
    camera.setViewOffset(w, h * LENS, 0, 0, w, h);
    camera.updateProjectionMatrix();
    U.uPx.value = (h * LENS * renderer.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    if (!running) renderOnce();
  }
  resize();
  camera.position.copy(HOME_T).addScaledVector(HOME_DIR, homeDist());
  controls.target.copy(HOME_T);
  camera.lookAt(HOME_T);
  camera.updateMatrixWorld();
  controls.update();
  const sky = buildSky(ctx, camera);
  const AZ0 = controls.getAzimuthalAngle();

  // nhân vật & sinh vật
  const fauna = createFauna(ctx, land.flowerSpots, obstacles, collide);
  const avatar = createAvatar(ctx, collide, obstacles);
  const AV = avatar.AV;

  let tween: null | { t0: number; dur: number; fromT: THREE.Vector3; toT: THREE.Vector3; fromD: number; toD: number; fromDir: THREE.Vector3; toDir: THREE.Vector3 } = null;
  const onControlStart = () => {
    controls.autoRotate = false;
    tween = null;
  };
  controls.addEventListener("start", onControlStart);
  function focusTo(target: THREE.Vector3, dist: number, dur = 1.1, toDir: THREE.Vector3 | null = null) {
    const off = camera.position.clone().sub(controls.target);
    const dir = toDir ? toDir.clone().normalize() : off.clone().normalize();
    if (dir.y < 0.3) {
      dir.y = 0.4;
      dir.normalize();
    }
    tween = { t0: performance.now(), dur: REDUCED ? 1 : dur * 1000, fromT: controls.target.clone(), toT: target.clone(), fromD: off.length(), toD: dist, fromDir: off.normalize(), toDir: dir };
    wake();
  }
  const focusPlant = (p: Plant) => {
    const h = Math.max(p.height, 0.8);
    focusTo(new THREE.Vector3(p.x, H(p.x, p.z) + h * 0.45, p.z), clamp(h * 3.2 + 2.2, 4.2, 11));
  };
  const focusHome = () => focusTo(HOME_T.clone(), homeDist(), 1.3, HOME_DIR);

  /* ---------- trạng thái lựa chọn ---------- */
  const state = {
    sel: null as null | { kind: "species" | "creature"; id: string },
    focus: null as Plant | null,
    decoSel: null as Deco | null,
    mode: null as PlantingMode,
    view: "overview" as LandView,
    scrubbed: false,
  };
  const owned = (id: string) => plants.filter((p) => p.sp.id === id);
  function emitSelect() {
    state.scrubbed = false;
    const s = state.sel;
    if (!s) return;
    if (s.kind === "creature") {
      ev.onSelect?.({ kind: "creature", id: s.id });
      lastStatus = "";
      return;
    }
    const f = state.focus && state.focus.sp.id === s.id ? state.focus : null;
    const nDeco = deco.filter((d) => d.id === s.id).length;
    ev.onSelect?.({ kind: "species", id: s.id, focus: f ? { plot: f.plot, growth: f.growth } : null, onLand: owned(s.id).length + nDeco, deco: nDeco });
  }
  function selectSpecies(id: string, fly = false) {
    if (!SP[id]) return;
    state.sel = { kind: "species", id };
    const l = owned(id);
    if (!state.focus || state.focus.sp.id !== id) state.focus = l[l.length - 1] || null;
    if (state.decoSel && state.decoSel.id !== id) state.decoSel = null;
    if (fly && state.focus) {
      toOverview();
      focusPlant(state.focus);
    }
    emitSelect();
    wake();
  }
  function selectCreature(id: string, fly = false) {
    state.sel = { kind: "creature", id };
    state.focus = null;
    if (fly) {
      toOverview();
      focusTo(fauna.pos(id).add(new THREE.Vector3(0, 0.3, 0)), id === "chim" ? 16 : 5);
    }
    emitSelect();
    wake();
  }
  function showOnLand() {
    const s = state.sel;
    if (!s) return;
    toOverview();
    if (s.kind === "creature") {
      focusTo(fauna.pos(s.id).add(new THREE.Vector3(0, 0.3, 0)), s.id === "chim" ? 16 : 5);
      return;
    }
    const l = owned(s.id);
    if (l.length) {
      const i = (l.indexOf(state.focus as Plant) + 1) % l.length;
      state.focus = l[i];
      focusPlant(l[i]);
      emitSelect();
    } else {
      const d = deco.find((x) => x.id === s.id);
      if (!d) return;
      state.decoSel = d;
      focusTo(new THREE.Vector3(d.x, d.gy + d.h * 0.45, d.z), clamp(d.h * 3 + 2, 4.5, 11));
    }
  }
  function setGrowthPreview(g: number) {
    const fp = state.focus;
    if (!fp) return;
    fp.anim = null;
    setGrowth(fp, clamp(g, 0, 1));
    if (!state.scrubbed) {
      state.scrubbed = true;
      toOverview();
      focusPlant(fp);
    }
    wake();
  }

  /* ---------- gieo cây ---------- */
  function setPlanting(mode: PlantingMode) {
    state.mode = mode;
    canvas.style.cursor = mode ? "crosshair" : "";
    if (mode?.kind === "species" && state.view !== "walk") {
      focusHome();
      controls.autoRotate = false;
    }
    wake();
  }
  function syncPlantings(list: PlantingRecord[]) {
    const want = new Map(list.filter((r) => r.plot >= 0 && r.plot < PLOT_POS.length && SPECIES_GEN[r.species]).map((r) => [plantKey(r), r]));
    for (const p of plants.slice()) if (p.plot !== null && !want.has(p.key)) removePlant(p);
    let fresh: Plant | null = null;
    for (const [key, r] of want) {
      if (plants.some((p) => p.key === key) || plotPlant[r.plot]) continue;
      const isFresh = Date.now() - r.plantedAt < FRESH_MS;
      const p = makePlant(r.species, PLOT_POS[r.plot][0], PLOT_POS[r.plot][1], plotSeed(r.plot, r.species), r.plot, isFresh && !REDUCED ? 0 : 1, key);
      if (isFresh) {
        if (!REDUCED) p.anim = { t0: performance.now(), dur: 3200 };
        fresh = p;
      }
    }
    rebuildObstacles();
    if (fresh) {
      state.focus = fresh;
      state.sel = { kind: "species", id: fresh.sp.id };
      if (state.view !== "walk") focusPlant(fresh);
      emitSelect();
    } else if (state.sel?.kind === "species") emitSelect();
    wake();
  }

  /* ---------- chọn bằng cách chạm ---------- */
  const ray = new THREE.Raycaster(),
    v2 = new THREE.Vector2(),
    tmp = new THREE.Vector3();
  const toScreen = (v: THREE.Vector3) => {
    tmp.copy(v).project(camera);
    return [((tmp.x + 1) / 2) * container.clientWidth, ((1 - tmp.y) / 2) * container.clientHeight, tmp.z];
  };
  const segPx = (px: number, py: number, a: number[], b: number[]) => {
    const vx = b[0] - a[0],
      vy = b[1] - a[1];
    const t = clamp(((px - a[0]) * vx + (py - a[1]) * vy) / (vx * vx + vy * vy || 1), 0, 1);
    return Math.hypot(px - a[0] - vx * t, py - a[1] - vy * t);
  };
  type Hit = { kind: "plant"; p: Plant } | { kind: "deco"; d: Deco } | { kind: "creature"; id: string } | { kind: "avatar" };
  function pick(px: number, py: number): Hit | null {
    let best: Hit | null = null,
      bd = 1e9;
    const pxs = U.uPx.value / renderer.getPixelRatio();
    const tryStick = (x: number, z: number, gy: number, h: number, sc: number, res: Hit) => {
      const base = new THREE.Vector3(x, gy, z),
        top = base.clone().add(new THREE.Vector3(0, h, 0));
      const a = toScreen(base),
        b = toScreen(top);
      if (a[2] > 1) return;
      const camD = camera.position.distanceTo(base);
      const rad = clamp((0.5 * sc * pxs) / camD, 12, 90);
      const d = segPx(px, py, a, b) / rad + camD * 0.004;
      if (d < 1 + camD * 0.004 && d < bd) {
        bd = d;
        best = res;
      }
    };
    for (const p of plants) tryStick(p.x, p.z, H(p.x, p.z), Math.max(0.3, p.height * Math.max(p.growth, 0.2)), p.sp.scale, { kind: "plant", p });
    for (const d of deco) tryStick(d.x, d.z, d.gy, d.h, 1.1, { kind: "deco", d });
    for (const [id, pos, h] of fauna.pickables()) {
      const s = toScreen(pos.clone().add(new THREE.Vector3(0, h, 0)));
      if (s[2] > 1) continue;
      const camD = camera.position.distanceTo(pos);
      const rad = clamp((0.45 * pxs) / camD, 16, 70);
      const d = (Math.hypot(px - s[0], py - s[1]) / rad) * 0.8;
      if (d < 0.8 && d < bd) {
        bd = d;
        best = { kind: "creature", id };
      }
    }
    {
      const s = toScreen(AV.rig.g.position.clone().add(new THREE.Vector3(0, 0.5, 0)));
      const camD = camera.position.distanceTo(AV.rig.g.position);
      const d = (Math.hypot(px - s[0], py - s[1]) / clamp((0.4 * pxs) / camD, 16, 70)) * 0.8;
      if (s[2] < 1 && d < 0.8 && d < bd) {
        bd = d;
        best = { kind: "avatar" };
      }
    }
    return best;
  }
  function groundHit(px: number, py: number) {
    const rect = canvas.getBoundingClientRect();
    v2.set((px / rect.width) * 2 - 1, -(py / rect.height) * 2 + 1);
    ray.setFromCamera(v2, camera);
    return ray.intersectObject(land.ground)[0];
  }
  let down: [number, number] | null = null;
  const onPointerDown = (e: PointerEvent) => {
    down = [e.clientX, e.clientY];
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]);
    down = null;
    if (moved > 7) return;
    const rect = canvas.getBoundingClientRect(),
      px = e.clientX - rect.left,
      py = e.clientY - rect.top;
    wake();
    if (state.mode) {
      if (state.mode.kind === "plot") return;
      const hit = groundHit(px, py);
      let target = -1,
        bd = 1e9;
      for (const p of plots) {
        const s = toScreen(new THREE.Vector3(p.x, p.y, p.z));
        let d = Math.hypot(px - s[0], py - s[1]);
        if (hit) d = Math.min(d, Math.hypot(hit.point.x - p.x, hit.point.z - p.z) * 40);
        if (d < bd) {
          bd = d;
          target = p.i;
        }
      }
      if (target >= 0 && bd < 60) {
        if (plotPlant[target]) ev.onToast?.(`Ô ${target + 1} đã có cây — hãy chọn một vòng sáng còn trống`);
        else ev.onPlotPick?.(target);
      } else ev.onToast?.("Hãy chạm vào một ô đất trống (vòng sáng trên mặt đất)");
      return;
    }
    const hit = pick(px, py);
    if (hit?.kind === "plant") {
      state.focus = hit.p;
      selectSpecies(hit.p.sp.id);
      if (state.view !== "walk") {
        focusPlant(hit.p);
        controls.autoRotate = false;
      }
      return;
    }
    if (hit?.kind === "deco") {
      state.focus = null;
      state.decoSel = hit.d;
      selectSpecies(hit.d.id);
      return;
    }
    if (hit?.kind === "creature") {
      selectCreature(hit.id);
      return;
    }
    if (hit?.kind === "avatar") {
      if (state.view !== "walk") setView("walk");
      return;
    }
    if (state.view === "walk") {
      const g = groundHit(px, py);
      if (g && walkable(g.point.x, g.point.z)) avatar.walkTo(g.point.x, g.point.z);
      else if (g) ev.onToast?.("Không đi tới đó được — hãy chọn chỗ trên cỏ");
    }
  };

  /* ---------- chế độ xem: đi dạo / toàn cảnh ---------- */
  function setView(v: LandView) {
    if (!interactive && v === "walk") return;
    state.view = v;
    controls.autoRotate = false;
    if (v === "walk") {
      controls.minDistance = 2.2;
      controls.maxDistance = 12;
      controls.maxPolarAngle = 1.42;
      const f = [Math.cos(AV.yaw), -Math.sin(AV.yaw)];
      focusTo(new THREE.Vector3(AV.x, groundY(AV.x, AV.z) + 0.7, AV.z), 5.2, 1.0, new THREE.Vector3(-f[0], 0.5, -f[1]));
    } else {
      controls.minDistance = 3;
      controls.maxDistance = 72;
      controls.maxPolarAngle = 1.3;
    }
    ev.onView?.(v);
    wake();
  }
  const toOverview = () => {
    if (state.view === "walk") setView("overview");
  };

  /* ---------- bàn phím, cần điều khiển ---------- */
  const keys = new Set<string>();
  const joy = { x: 0, y: 0 };
  const typing = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null;
    return !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (typing(e) || e.metaKey || e.ctrlKey || e.altKey) return;
    if (MOVE_KEYS.has(e.code)) {
      const active = document.activeElement as HTMLElement | null;
      // Mũi tên trên nút ngoài khung cảnh (vd. danh sách loài) không điều khiển Lữ khách
      if (active && active !== document.body && e.code.startsWith("Arrow") && !container.contains(active)) return;
      // Mũi tên khi chưa đi dạo và tiêu điểm nằm ngoài khung cảnh: để trình duyệt cuộn trang như thường
      if (e.code.startsWith("Arrow") && !container.contains(active) && state.view !== "walk") return;
      keys.add(e.code);
      AV.target = null;
      if (state.view !== "walk") setView("walk");
      e.preventDefault();
      wake();
    }
    if (e.key === "Shift") keys.add("Shift");
    if (e.code === "KeyE" && state.view === "walk") {
      interact();
      e.preventDefault();
    }
  };
  const onKeyUp = (e: KeyboardEvent) => {
    keys.delete(e.code);
    if (e.key === "Shift") keys.delete("Shift");
  };
  const onBlur = () => keys.clear();
  function setJoystick(x: number, y: number) {
    joy.x = x;
    joy.y = y;
    if (x || y) AV.target = null;
    wake();
  }

  /* ---------- gợi ý tương tác khi đứng gần ---------- */
  type Near = { kind: "plot"; plot: number } | { kind: "plant"; p: Plant } | { kind: "deco"; d: Deco } | { kind: "creature"; id: string };
  let nearby: Near | null = null;
  function findNearby(): Near | null {
    let best: Near | null = null,
      bd = 1e9;
    const x = AV.x,
      z = AV.z;
    for (const p of plots) {
      if (plotPlant[p.i]) continue;
      const d = Math.hypot(x - p.x, z - p.z);
      if (d < 1.15 && d < bd) {
        bd = d;
        best = { kind: "plot", plot: p.i };
      }
    }
    for (const p of plants) {
      const d = Math.hypot(x - p.x, z - p.z) - (PLANT_R[p.sp.id] ?? 0.2);
      if (d < 0.75 && d < bd) {
        bd = d;
        best = { kind: "plant", p };
      }
    }
    for (const d0 of deco) {
      const d = Math.hypot(x - d0.x, z - d0.z) - 0.25;
      if (d < 0.6 && d < bd) {
        bd = d;
        best = { kind: "deco", d: d0 };
      }
    }
    for (const [id, pos] of fauna.nearbyables()) {
      const d = Math.hypot(x - pos.x, z - pos.z) - 0.2;
      if (d < 0.9 && d < bd) {
        bd = d;
        best = { kind: "creature", id };
      }
    }
    return best;
  }
  function interact() {
    const n = nearby;
    if (!n) return;
    if (n.kind === "plot") ev.onPlotPick?.(n.plot);
    else if (n.kind === "plant") {
      state.focus = n.p;
      selectSpecies(n.p.sp.id);
    } else if (n.kind === "deco") {
      state.focus = null;
      state.decoSel = n.d;
      selectSpecies(n.d.id);
    } else selectCreature(n.id);
  }
  let lastPrompt = "";
  function updatePrompt() {
    const n = state.view === "walk" && !state.mode ? findNearby() : null;
    nearby = n;
    let p: LandPrompt | null = null;
    if (n?.kind === "plot") p = { kind: "plot", plot: n.plot };
    else if (n) p = { kind: "look", name: n.kind === "plant" ? n.p.sp.vn : n.kind === "deco" ? SP[n.d.id].vn : (CR[n.id]?.vn ?? "") };
    const k = p ? JSON.stringify(p) : "";
    if (k !== lastPrompt) {
      lastPrompt = k;
      ev.onPrompt?.(p);
    }
  }

  /* ---------- nhãn nổi ---------- */
  const tagEl = opts.tag ?? null;
  const tagName = document.createElement("b"),
    tagSub = document.createElement("span");
  if (tagEl) {
    tagEl.replaceChildren(tagName, document.createTextNode(" "), tagSub);
    tagEl.hidden = true;
  }
  let lastTag = "";
  function updateTag() {
    if (!tagEl) return;
    let anchor: THREE.Vector3 | null = null,
      name = "",
      sub = "";
    const s = state.sel;
    if (s?.kind === "species" && state.focus) {
      const p = state.focus;
      anchor = new THREE.Vector3(p.x, H(p.x, p.z) + Math.max(0.35, p.height * Math.min(1, p.growth * 1.1)) + 0.15, p.z);
      name = p.sp.vn;
      sub = stageOf(p.growth);
    } else if (s?.kind === "species" && state.decoSel && state.decoSel.id === s.id) {
      const d = state.decoSel;
      anchor = new THREE.Vector3(d.x, d.gy + d.h + 0.15, d.z);
      name = SP[d.id].vn;
      sub = "Cây thường";
    } else if (s?.kind === "creature") {
      anchor = fauna.pos(s.id).add(new THREE.Vector3(0, 0.75, 0));
      name = CR[s.id]?.vn ?? "";
      sub = fauna.status(s.id);
    }
    if (!anchor || state.mode || !interactive) {
      tagEl.hidden = true;
      return;
    }
    const sc = toScreen(anchor);
    const W = container.clientWidth,
      Hh = container.clientHeight;
    if (sc[2] > 1 || sc[0] < 0 || sc[0] > W || sc[1] < 30 || sc[1] > Hh) {
      tagEl.hidden = true;
      return;
    }
    tagEl.hidden = false;
    const label = name + "|" + sub;
    if (label !== lastTag) {
      lastTag = label;
      tagName.textContent = name;
      tagSub.textContent = "· " + sub;
    }
    tagEl.style.left = clamp(sc[0], 110, W - 110) + "px";
    tagEl.style.top = sc[1] - 6 + "px";
  }

  /* ---------- ngày / đêm ---------- */
  const TOD = { live: true, from: 12, to: 12, t0: 0, cur: NaN };
  let lastTimeKey = "";
  function applyTOD(h: number) {
    const k = todAt(h);
    TOD.cur = h;
    U.uTint.value.set(k.tint[0], k.tint[1], k.tint[2]);
    U.uNight.value = k.night;
    U.uGlowBoost.value = 0.1 + 0.95 * k.night;
    U.uFogColor.value.set(k.fog[0], k.fog[1], k.fog[2]);
    const ref = mix(k.mid, k.hor, 0.55);
    U.uSkyRef.value.set(ref[0], ref[1], ref[2]);
    container.style.background = skyBackground(k);
    sky.stars.uniforms.uOpacity.value = sstep(0.25, 0.9, k.night);
    sky.giant.uniforms.uOpacity.value = 0.32 + 0.68 * k.night;
    sky.ring.uniforms.uOpacity.value = 0.3 + 0.7 * k.night;
    sky.moon1.uniforms.uOpacity.value = 0.3 + 0.7 * k.night;
    sky.moon2.uniforms.uOpacity.value = sstep(0.4, 0.9, k.night);
    land.lamp.uniforms.uOpacity.value = sstep(0.2, 0.8, k.night);
    fireMat.uniforms.uOpacity.value = 0.12 + 0.88 * sstep(0.3, 0.9, k.night);
    low.traffic.material.uniforms.uOpacity.value = 0.35 + 0.65 * k.night;
    placeSun(sky, h);
    const hh = Math.floor(h) % 24,
      mm = Math.floor((h % 1) * 60);
    const label = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    const phase = phaseName(h);
    const key = `${label}|${phase}|${TOD.live}`;
    if (key !== lastTimeKey) {
      lastTimeKey = key;
      ev.onTime?.({ hour: h, label, phase, live: TOD.live });
    }
  }
  function previewHour(h: number | null) {
    const live = h === null;
    const target = live ? liveHour() : h;
    const cur = Number.isNaN(TOD.cur) ? target : TOD.cur;
    let d = target - cur;
    if (d > 12) d -= 24;
    if (d < -12) d += 24;
    TOD.live = live;
    TOD.from = cur;
    TOD.to = cur + d;
    TOD.t0 = REDUCED ? 0 : performance.now();
    if (REDUCED) applyTOD(((TOD.to % 24) + 24) % 24);
    lastTimeKey = "";
    wake();
  }
  function scrubHour(h: number) {
    TOD.live = false;
    TOD.from = TOD.to = h;
    TOD.t0 = 0;
    applyTOD(h);
    wake();
  }
  function tickTOD(now: number) {
    let h: number;
    if (TOD.live && !TOD.t0) h = liveHour();
    else {
      const k = REDUCED || !TOD.t0 ? 1 : clamp((now - TOD.t0) / 1400, 0, 1),
        e = k * k * (3 - 2 * k);
      h = TOD.from + (TOD.to - TOD.from) * e;
      if (k >= 1) {
        TOD.t0 = 0;
        if (TOD.live) h = liveHour();
      }
    }
    h = ((h % 24) + 24) % 24;
    if (Number.isNaN(TOD.cur) || Math.abs(h - TOD.cur) > 0.004 || !lastTimeKey) applyTOD(h);
  }

  /* ---------- hoạt ảnh nền ---------- */
  const sparkPos = sparks.geometry.attributes.position as THREE.BufferAttribute,
    trafPos = low.traffic.geometry.attributes.position as THREE.BufferAttribute;
  function updateSparks(dt: number) {
    const n = SPTS.length - 1;
    for (let i = 0; i < NSPARK; i++) {
      sparkS[i] = (sparkS[i] + sparkV[i] * dt * (REDUCED ? 0 : 1)) % 1;
      const f = sparkS[i] * n,
        k = Math.floor(f),
        u = f - k;
      const a = SPTS[k],
        b = SPTS[Math.min(n, k + 1)];
      const x = a.x + (b.x - a.x) * u,
        z = a.z + (b.z - a.z) * u,
        tx = b.x - a.x,
        tz = b.z - a.z,
        tl = Math.hypot(tx, tz) || 1,
        w = (0.2 + 0.1 * sparkS[i]) * sparkO[i] * 2;
      sparkPos.setXYZ(i, x - (tz / tl) * w, SPARK_Y[k] + 0.01, z + (tx / tl) * w);
    }
    sparkPos.needsUpdate = true;
    low.trafficList.forEach((t, i) => {
      t.s = (((t.s + t.v * dt * (REDUCED ? 0 : 1)) % 1) + 1) % 1;
      const f = t.s * (t.pts.length - 1),
        k = Math.floor(f),
        u = f - k,
        a = t.pts[k],
        b = t.pts[Math.min(t.pts.length - 1, k + 1)];
      trafPos.setXYZ(i, a[0] + (b[0] - a[0]) * u + t.off, a[1] + (b[1] - a[1]) * u + 0.25, a[2] + (b[2] - a[2]) * u + t.off);
    });
    trafPos.needsUpdate = true;
  }

  /* ---------- vòng lặp ---------- */
  const clock = new THREE.Clock();
  const prevT = new THREE.Vector3();

  function frame() {
    raf = 0;
    if (!running || disposed) return;
    const now = performance.now(),
      dt = Math.min(clock.getDelta(), 0.05);
    if (!REDUCED) T += dt;
    U.uTime.value = T;
    if (now - lastTOD > 250) {
      lastTOD = now;
      tickTOD(now);
    } else if (TOD.t0) tickTOD(now);
    rebuildObstacles();
    if (interactive) avatar.update(dt, T, { keys, joy, walk: state.view === "walk" }, camera);
    if (!REDUCED) fauna.update(dt, T, AV);
    if (tween) {
      const k = clamp((now - tween.t0) / tween.dur, 0, 1),
        e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      if (state.view === "walk") tween.toT.set(AV.x, groundY(AV.x, AV.z) + 0.7, AV.z);
      controls.target.lerpVectors(tween.fromT, tween.toT, e);
      const dir = tween.fromDir.clone().lerp(tween.toDir, e).normalize();
      camera.position.copy(controls.target).addScaledVector(dir, tween.fromD + (tween.toD - tween.fromD) * e);
      if (k >= 1) tween = null;
    } else if (state.view === "walk") {
      prevT.set(AV.x, groundY(AV.x, AV.z) + 0.7, AV.z).sub(controls.target);
      controls.target.add(prevT);
      camera.position.add(prevT);
    }
    controls.update();
    U.uCutOn.value = state.view === "walk" ? 1 : 0;
    U.uCut.value.set(AV.x, groundY(AV.x, AV.z) + 0.75, AV.z);
    {
      const cx = camera.position.x,
        cz = camera.position.z,
        rr = Math.hypot(cx, cz);
      const gy = rr < RIM ? groundY(cx, cz) : rr < RIM + 4 ? Math.max(LH(cx, cz), H((cx * RIM) / rr, (cz * RIM) / rr) - (rr - RIM) * 4) : LH(cx, cz);
      if (camera.position.y < gy + 0.45) camera.position.y = gy + 0.45;
    }
    sky.group.rotation.y = (controls.getAzimuthalAngle() - AZ0) * 0.88;
    for (const p of plants) {
      if (!p.anim) continue;
      const k = clamp((now - p.anim.t0) / p.anim.dur, 0, 1);
      setGrowth(p, 1 - Math.pow(1 - k, 2));
      if (k >= 1) p.anim = null;
      if (p === state.focus && (Math.abs(p.growth - lastGrowthEmit) >= 0.01 || k >= 1)) {
        lastGrowthEmit = p.growth;
        ev.onGrowth?.(p.growth);
      }
    }
    const pulse = 0.5 + 0.5 * Math.sin(T * 3.2);
    for (const p of plots) {
      const planted = !!plotPlant[p.i];
      const near = nearby?.kind === "plot" && nearby.plot === p.i;
      p.ring.material.uniforms.uOpacity.value = planted ? (state.mode ? 0.08 : 0.16) : state.mode || near ? 0.65 + 0.35 * pulse : 0.5;
    }
    updateSparks(dt);
    updateTag();
    if (interactive) updatePrompt();
    if (state.sel?.kind === "creature") {
      const st = fauna.status(state.sel.id);
      if (st !== lastStatus) {
        lastStatus = st;
        ev.onCreatureStatus?.(st);
      }
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  function renderOnce() {
    if (disposed || !contextOk) return;
    controls.update();
    renderer.render(scene, camera);
  }
  function updateRunning() {
    const should = pageVisible && onScreen && contextOk && !disposed;
    if (should && !running) {
      running = true;
      clock.getDelta();
      if (!raf) raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
  }
  /** Bảo đảm vòng lặp đang chạy (sau khi có thao tác) */
  function wake() {
    if (running && !raf && !disposed) raf = requestAnimationFrame(frame);
  }

  const onVisibility = () => {
    pageVisible = !document.hidden;
    updateRunning();
  };
  const io =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((entries) => {
          onScreen = entries.some((e) => e.isIntersecting);
          updateRunning();
        })
      : null;
  io?.observe(container);
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => resize()) : null;
  ro?.observe(container);
  const onWinResize = () => resize();
  if (!ro) window.addEventListener("resize", onWinResize);
  const onContextLost = (e: Event) => {
    e.preventDefault();
    contextOk = false;
    updateRunning();
  };
  const onContextRestored = () => {
    contextOk = true;
    updateRunning();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  canvas.addEventListener("webglcontextrestored", onContextRestored);
  document.addEventListener("visibilitychange", onVisibility);
  if (interactive) {
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
  }

  tickTOD(performance.now());
  updateRunning();
  if (!running) renderOnce();

  return {
    selectSpecies,
    selectCreature,
    showOnLand,
    setGrowthPreview,
    setPlanting,
    syncPlantings,
    setView,
    focusHome: () => {
      toOverview();
      focusHome();
    },
    previewHour,
    scrubHour,
    interact,
    setJoystick,
    get points() {
      return ctx.total;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener("resize", onWinResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      controls.removeEventListener("start", onControlStart);
      controls.dispose();
      disposeTree(scene);
      scene.clear();
      plants.length = 0;
      renderer.dispose();
      renderer.forceContextLoss();
      container.style.background = "";
      canvas.style.cursor = "";
      if (tagEl) tagEl.hidden = true;
    },
  };
}

