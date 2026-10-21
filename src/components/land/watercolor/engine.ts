/**
 * Engine màu nước: vẽ kết cấu theo từng mẩu (có tiến độ), dựng bản đồ, vòng lặp (tạm dừng khi ẩn / ra khỏi màn hình),
 * camera khám phá, bấm vùng → thẻ thông tin, bấm đất → Lữ khách + Mochi đi tới, tháo gỡ hoàn toàn khi rời trang.
 */
import * as THREE from "three";
import { Butterflies } from "./life";
import { Companions } from "./characters";
import { ExploreCamera } from "./camera";
import { inPoly, makeRand, makeWork, subWork, type Work } from "./core";
import { createUniforms } from "./materials";
import { NavGrid } from "./nav";
import { InkPost } from "./post";
import { paintPaper, paintWater } from "./textures";
import type { MapWorld, Quality, SharedImages, TexImage, WorldId, Zone } from "./types";

export class WebGLUnavailableError extends Error {
  constructor() {
    super("WebGL không khả dụng");
    this.name = "WebGLUnavailableError";
  }
}

export interface ZoneInfo {
  id: string;
  name: string;
  desc: string;
  kind: Zone["kind"];
}
export interface WcEvents {
  onProgress?: (f: number) => void;
  onZone?: (z: ZoneInfo | null) => void;
}
export interface WcEngine {
  resetView: () => void;
  zoom: (f: number) => void;
  dispose: () => void;
  /** số liệu đo (ms) */
  readonly stats: { paintMs: number; buildMs: number; firstFrameMs: number; totalMs: number };
}

/* ---------- kết cấu dùng chung, giữ trong phiên (chuyển bản đồ quay lại không phải vẽ lại) ---------- */
const sharedCache: Partial<Record<"paper" | "water", Promise<TexImage>>> = {};
const groundCache = new Map<string, Promise<TexImage>>();

function shared(key: "paper" | "water", w: Work) {
  return (sharedCache[key] ??= key === "paper" ? paintPaper(w) : paintWater(w));
}

function qualityFor(): Quality {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = coarse || Math.min(window.innerWidth, window.innerHeight) < 700;
  return small
    ? { small, groundBase: 640, ground: 2048, shadow: 2048, mesh: 0.6, scatter: 0.6 }
    : { small, groundBase: 1024, ground: 4096, shadow: 4096, mesh: 1, scatter: 1 };
}

type MapModule = {
  layout: () => unknown;
  paint: (L: never, q: Quality, w: Work) => Promise<TexImage>;
  build: (ctx: import("./types").BuildCtx) => Promise<MapWorld>;
};
async function loadMap(id: WorldId): Promise<MapModule> {
  switch (id) {
    case "bon-mua": {
      const m = await import("./maps/bon-mua-scene");
      return { layout: m.createBonMuaLayout, paint: m.paintBonMuaGround as MapModule["paint"], build: m.buildBonMua };
    }
    default:
      throw new Error("Bản đồ chưa có: " + id);
  }
}

function fontFamily() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-be-vietnam").trim();
  return v || '"Be Vietnam Pro", system-ui, sans-serif';
}

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)));

function zoneHit(z: Zone, x: number, zz: number) {
  const s = z.shape;
  switch (s.t) {
    case "circle":
      return Math.hypot(x - s.x, zz - s.z) < s.r;
    case "ellipse":
      return ((x - s.x) / s.a) ** 2 + ((zz - s.z) / s.b) ** 2 < 1;
    case "rect": {
      const c = Math.cos(s.yaw ?? 0),
        sn = Math.sin(s.yaw ?? 0),
        dx = x - s.x,
        dz = zz - s.z;
      return Math.abs(dx * c - dz * sn) < s.w / 2 && Math.abs(dx * sn + dz * c) < s.d / 2;
    }
    case "poly":
      return inPoly(x, zz, s.pts);
  }
}
function zoneCenter(z: Zone): [number, number] {
  const s = z.shape;
  if (s.t === "poly") {
    let x = 0,
      zz = 0;
    for (const p of s.pts) {
      x += p[0];
      zz += p[1];
    }
    return [x / s.pts.length, zz / s.pts.length];
  }
  return [s.x, s.z];
}

export async function createWatercolorEngine(opts: { container: HTMLElement; world: WorldId; reducedMotion: boolean; events?: WcEvents; signal: AbortSignal }): Promise<WcEngine> {
  const { container, world: id, signal } = opts;
  const ev = opts.events ?? {};
  const REDUCED = opts.reducedMotion;
  const T0 = performance.now();
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const q = qualityFor();
  const aborted = () => signal.aborted;
  const work = makeWork((f) => ev.onProgress?.(f));

  // WebGL trước: không có thì báo ngay để hiện ảnh tĩnh
  const canvas = document.createElement("canvas");
  canvas.className = "absolute inset-0 block h-full w-full touch-none";
  canvas.setAttribute("role", "img");
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  } catch {
    throw new WebGLUnavailableError();
  }
  const PR = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
  renderer.setPixelRatio(PR);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const fail = () => {
    renderer.dispose();
    renderer.forceContextLoss();
  };

  /* ---------- 1. vẽ kết cấu (0–70%) ---------- */
  const mod = await loadMap(id);
  if (document.fonts) await Promise.race([document.fonts.load(`800 60px ${fontFamily()}`).catch(() => {}), new Promise((r) => setTimeout(r, 1200))]);
  await nextFrame();
  const tPaint = performance.now();
  const paper = await shared("paper", subWork(work, 0, 0.06));
  const water = await shared("water", subWork(work, 0.06, 0.1));
  const gk = `${id}:${q.ground}`;
  let groundP = groundCache.get(gk);
  if (!groundP) {
    const gw = subWork(work, 0.1, 0.7);
    groundP = (async () => mod.paint(mod.layout() as never, q, gw))();
    groundCache.set(gk, groundP);
    groundP.catch(() => groundCache.delete(gk));
  }
  const ground = await groundP;
  const paintMs = performance.now() - tPaint;
  if (aborted()) {
    fail();
    throw new DOMException("aborted", "AbortError");
  }

  /* ---------- 2. dựng cảnh (70–100%) ---------- */
  const tBuild = performance.now();
  const U = createUniforms();
  const sharedImgs: SharedImages = { paper, water };
  const bw = subWork(work, 0.7, 1);
  const world = await mod.build({
    q,
    U,
    ground,
    shared: sharedImgs,
    font: fontFamily(),
    step: async (f) => {
      bw.progress(f);
      await nextFrame();
      if (aborted()) throw new DOMException("aborted", "AbortError");
    },
  }).catch((e) => {
    fail();
    throw e;
  });
  const scene = world.scene;
  const walk = world.walk;
  const nav = new NavGrid(walk, 0.5);
  const rand = makeRand(7);
  const companions = new Companions(scene, world.kit, world.textures.blob, walk, nav, world.start, world.charScale, world.stroll, REDUCED);
  const flies = new Butterflies(scene, world.textures.wing, world.butterflies, (x, z) => walk.height(x, z), rand, world.charScale);
  const buildMs = performance.now() - tBuild;
  if (aborted()) {
    disposeScene();
    fail();
    throw new DOMException("aborted", "AbortError");
  }

  /* ---------- 3. renderer, camera, hậu kỳ ---------- */
  const camCtl = new ExploreCamera(world.camera, REDUCED);
  const camera = camCtl.cam;
  const post = new InkPost(renderer, scene, camera, world.textures.paper, U, world.ink, world.paper);
  container.prepend(canvas);
  canvas.setAttribute("aria-label", "Bản đồ vẽ màu nước. Kéo để dời, cuộn hoặc chụm hai ngón để phóng to, bấm vào đất để Lữ khách đi tới, bấm vào công trình để xem tên.");
  let W = 1,
    Hh = 1;
  function resize() {
    const r = container.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    Hh = Math.max(1, Math.round(r.height));
    renderer.setSize(W, Hh, false);
    post.setSize(W, Hh, PR);
    camCtl.setAspect(W / Hh);
    wake();
  }

  /* ---------- 4. thao tác ---------- */
  const pointers = new Map<number, { x: number; y: number }>();
  let down: { x: number; y: number; t: number } | null = null,
    pinch0 = 0,
    lastPan: { x: number; y: number } | null = null;
  const ray = new THREE.Raycaster(),
    ndc = new THREE.Vector2(),
    tmp = new THREE.Vector3();
  function groundAt(cx: number, cy: number) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const o = ray.ray.origin,
      d = ray.ray.direction;
    // đi dọc tia tới khi chạm đất (bước thô rồi chia đôi)
    let prev = 0;
    for (let t = camera.near; t < camera.far; t += 0.6) {
      tmp.copy(o).addScaledVector(d, t);
      if (tmp.y < walk.height(tmp.x, tmp.z)) {
        let lo = prev,
          hi = t;
        for (let k = 0; k < 12; k++) {
          const m = (lo + hi) / 2;
          tmp.copy(o).addScaledVector(d, m);
          if (tmp.y < walk.height(tmp.x, tmp.z)) hi = m;
          else lo = m;
        }
        tmp.copy(o).addScaledVector(d, hi);
        return { x: tmp.x, z: tmp.z, t: hi };
      }
      prev = t;
    }
    return null;
  }
  /** Vùng có khối cao (nhà) bị tia cắt trước khi chạm đất */
  function zoneAt(cx: number, cy: number, g: { x: number; z: number; t: number } | null) {
    const o = ray.ray.origin,
      d = ray.ray.direction;
    let best: Zone | null = null,
      bt = g ? g.t + 0.01 : 1e9;
    for (const z of world.zones) {
      // lấy mẫu dọc tia trong dải cao [đất, đất + h]
      const [zx, zz] = zoneCenter(z);
      const base = walk.height(zx, zz),
        top = base + z.h;
      if (d.y >= 0) continue;
      const t0 = (top - o.y) / d.y,
        t1 = (base - o.y) / d.y;
      for (let k = 0; k <= 16; k++) {
        const t = t0 + ((t1 - t0) * k) / 16;
        if (t >= bt) break;
        const x = o.x + d.x * t,
          zz2 = o.z + d.z * t;
        if (zoneHit(z, x, zz2)) {
          bt = t;
          best = z;
          break;
        }
      }
    }
    void cx;
    void cy;
    return best;
  }
  function click(cx: number, cy: number) {
    const g = groundAt(cx, cy);
    const z = zoneAt(cx, cy, g);
    if (z) {
      ev.onZone?.({ id: z.id, name: z.name, desc: z.desc, kind: z.kind });
      const [zx, zz] = zoneCenter(z);
      companions.goTo(zx, zz);
    } else {
      ev.onZone?.(null);
      if (g) companions.goTo(g.x, g.z);
    }
    wake();
  }
  const onDown = (e: PointerEvent) => {
    canvas.setPointerCapture?.(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      down = { x: e.clientX, y: e.clientY, t: performance.now() };
      lastPan = { x: e.clientX, y: e.clientY };
    }
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch0 = Math.hypot(a.x - b.x, a.y - b.y);
      down = null;
      lastPan = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }
  };
  const onMove = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1 && lastPan) {
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8) return;
      camCtl.pan(e.clientX - lastPan.x, e.clientY - lastPan.y, Hh);
      lastPan = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
      wake();
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const dd = Math.max(20, Math.hypot(a.x - b.x, a.y - b.y));
      if (pinch0) camCtl.zoomBy(pinch0 / dd);
      pinch0 = dd;
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (lastPan) camCtl.pan(mid.x - lastPan.x, mid.y - lastPan.y, Hh);
      lastPan = mid;
      wake();
    }
  };
  const onUp = (e: PointerEvent) => {
    if (pointers.size === 1 && down && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8 && performance.now() - down.t < 700) click(e.clientX, e.clientY);
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch0 = 0;
    if (pointers.size === 1) {
      const [a] = [...pointers.values()];
      lastPan = { x: a.x, y: a.y };
    }
    if (!pointers.size) {
      down = null;
      lastPan = null;
      canvas.style.cursor = "";
    }
  };
  const onCancel = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    down = null;
    lastPan = null;
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const g = groundAt(e.clientX, e.clientY);
    camCtl.zoomBy(Math.exp(e.deltaY * 0.0012), g ?? undefined);
    wake();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onCancel);
  canvas.addEventListener("wheel", onWheel, { passive: false });

  /* ---------- 5. vòng lặp ---------- */
  let raf = 0,
    running = false,
    disposed = false,
    pageVisible = !document.hidden,
    onScreen = true,
    contextOk = true,
    last = performance.now(),
    simT = 0,
    shadowDone = false,
    lastFrame = 0;
  const minFrame = coarse ? 1000 / 31 : 0;
  function frame(now: number) {
    raf = 0;
    if (!running || disposed) return;
    raf = requestAnimationFrame(frame);
    if (minFrame && now - lastFrame < minFrame) return;
    lastFrame = now;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    simT += dt;
    U.time.value = 3 + (REDUCED ? simT * 0.4 : simT);
    U.sway.value = REDUCED ? 0 : 1;
    world.update(simT, dt, REDUCED);
    companions.update(dt, simT);
    flies.update(simT, !REDUCED);
    if (camCtl.update(dt)) {
      const ds = Math.max(1, world.inkDS * (camCtl.dist / camCtl.homeDist));
      post.setDepth(camera.near, camera.far, ds);
    }
    if (!shadowDone) {
      renderer.shadowMap.needsUpdate = true;
      shadowDone = true;
    }
    post.render(world.bg);
  }
  function updateRunning() {
    const should = pageVisible && onScreen && contextOk && !disposed;
    if (should && !running) {
      running = true;
      last = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
  }
  function wake() {
    if (running && !raf && !disposed) raf = requestAnimationFrame(frame);
  }
  const onVis = () => {
    pageVisible = !document.hidden;
    updateRunning();
  };
  const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((en) => ((onScreen = en.some((e) => e.isIntersecting)), updateRunning())) : null;
  io?.observe(container);
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => resize()) : null;
  ro?.observe(container);
  const onLost = (e: Event) => {
    e.preventDefault();
    contextOk = false;
    updateRunning();
  };
  const onRestored = () => {
    contextOk = true;
    shadowDone = false;
    updateRunning();
  };
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  document.addEventListener("visibilitychange", onVis);

  resize();
  camCtl.update(0);
  post.setDepth(camera.near, camera.far, world.inkDS);
  renderer.shadowMap.needsUpdate = true;
  world.update(0, 0, REDUCED);
  post.render(world.bg);
  shadowDone = true;
  const firstFrameMs = performance.now() - T0;
  updateRunning();
  const stats = { paintMs: Math.round(paintMs), buildMs: Math.round(buildMs), firstFrameMs: Math.round(firstFrameMs), totalMs: Math.round(performance.now() - T0) };
  // móc đo cho kiểm thử tự động (chỉ đọc)
  (window as unknown as { __landWc?: unknown }).__landWc = {
    stats,
    screenOf: (x: number, z: number) => {
      const p = new THREE.Vector3(x, walk.height(x, z), z).project(camera);
      const r = canvas.getBoundingClientRect();
      return [r.left + ((p.x + 1) / 2) * r.width, r.top + ((1 - p.y) / 2) * r.height];
    },
    trainOnScreen: () => {
      const h = world.train.cars[0];
      if (!h.visible) return false;
      const p = h.position.clone().project(camera);
      return Math.abs(p.x) < 0.85 && Math.abs(p.y) < 0.85 && p.z < 1;
    },
  };

  function disposeScene() {
    companions.dispose();
    const mats = new Set<THREE.Material>(),
      texs = new Set<THREE.Texture>();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mm = m.material as THREE.Material | THREE.Material[] | undefined;
      if (mm) (Array.isArray(mm) ? mm : [mm]).forEach((x) => mats.add(x));
    });
    for (const m of mats) {
      for (const v of Object.values(m)) if (v && (v as THREE.Texture).isTexture) texs.add(v as THREE.Texture);
      const u = (m as THREE.ShaderMaterial).uniforms;
      if (u) for (const x of Object.values(u)) if (x?.value?.isTexture) texs.add(x.value);
      m.dispose();
    }
    for (const t of texs) t.dispose();
    scene.clear();
  }

  return {
    stats,
    resetView() {
      camCtl.reset();
      ev.onZone?.(null);
      wake();
    },
    zoom(f) {
      camCtl.zoomBy(f);
      wake();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      disposeScene();
      post.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      delete (window as unknown as { __landWc?: unknown }).__landWc;
    },
  };
}
