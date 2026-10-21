/**
 * Bộ dựng hình gộp: mỗi chi tiết được nhân bản, "run tay" (wobble), tô màu theo đỉnh rồi gộp theo chất liệu
 * thành vài lưới lớn — ít lệnh vẽ, nhanh trên điện thoại.
 */
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Rand } from "./core";
import type { MaterialKit } from "./materials";

export function wobble(g: THREE.BufferGeometry, amp: number, f = 1.6, seed = 0) {
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i);
    p.setXYZ(
      i,
      x + amp * (Math.sin(y * f * 1.7 + z * f * 1.1 + seed) * 0.6 + Math.sin(x * f * 2.3 + seed * 1.3) * 0.4),
      y + amp * 0.6 * (Math.sin(x * f * 1.3 + z * f * 1.9 + seed * 2.1) * 0.6 + Math.sin(y * f * 2.7 + seed) * 0.4),
      z + amp * (Math.sin(x * f * 1.5 + y * f * 0.9 + seed * 0.7) * 0.6 + Math.sin(z * f * 2.1 + seed * 1.7) * 0.4)
    );
  }
  p.needsUpdate = true;
}

export type V3 = [number, number, number];
export interface AddOpts {
  p?: V3 | number[];
  r?: V3 | number[];
  s?: number | V3 | number[];
  q?: THREE.Quaternion;
  parent?: THREE.Matrix4 | null;
  mat?: string;
  wob?: number;
  wf?: number;
  seed?: number;
  /** màu riêng cho mặt nằm ngang (nắp) */
  cap?: string;
  vary?: number;
  uv?: [number, number];
  /** đảo trục uv trước khi co giãn */
  uvT?: boolean;
}

const _m = new THREE.Matrix4(),
  _q = new THREE.Quaternion(),
  _e = new THREE.Euler(),
  _s = new THREE.Vector3(),
  _p = new THREE.Vector3(),
  _c = new THREE.Color(),
  _cap = new THREE.Color();
const KEEP = new Set(["position", "normal", "uv", "color"]);

export class Builder {
  lists: Record<string, THREE.BufferGeometry[]> = {};
  /** Gốc + biên độ đung đưa áp cho các chi tiết thêm sau (chỉ khi builder tạo với sway) */
  pivot: [number, number, number, number] = [0, 0, 0, 0];
  constructor(
    private kit: MaterialKit,
    private rand: Rand,
    readonly sway = false
  ) {}
  add(geo: THREE.BufferGeometry, color: string | THREE.Color, o: AddOpts = {}) {
    let g = geo.clone();
    if (o.wob) {
      wobble(g, o.wob, o.wf || 1.6, o.seed ?? this.rand.rng() * 10);
      g.computeVertexNormals();
    }
    if (g.index) {
      const ni = g.toNonIndexed();
      g.dispose();
      g = ni;
    }
    const n = g.attributes.position.count,
      col = new Float32Array(n * 3),
      nrm = g.attributes.normal;
    _c.set(color);
    if (o.cap) _cap.set(o.cap);
    for (let i = 0; i < n; i++) {
      const cc = o.cap && nrm && Math.abs(nrm.getY(i)) > 0.9 ? _cap : _c;
      const j = o.vary ? 1 + (this.rand.rng() - 0.5) * o.vary : 1;
      col[i * 3] = cc.r * j;
      col[i * 3 + 1] = cc.g * j;
      col[i * 3 + 2] = cc.b * j;
    }
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    if (!g.attributes.uv) g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(n * 2), 2));
    if (o.uv) {
      const uv = g.attributes.uv;
      for (let i = 0; i < uv.count; i++) {
        const u = uv.getX(i),
          v = uv.getY(i);
        if (o.uvT) uv.setXY(i, v * o.uv[0], u * o.uv[1]);
        else uv.setXY(i, u * o.uv[0], v * o.uv[1]);
      }
    }
    for (const k of Object.keys(g.attributes)) if (!KEEP.has(k)) g.deleteAttribute(k);
    g.clearGroups();
    const p = o.p || [0, 0, 0],
      r = o.r || [0, 0, 0];
    _p.set(p[0], p[1], p[2]);
    _e.set(r[0], r[1], r[2], "YXZ");
    _q.setFromEuler(_e);
    if (o.s === undefined) _s.set(1, 1, 1);
    else if (typeof o.s === "number") _s.set(o.s, o.s, o.s);
    else _s.set(o.s[0], o.s[1], o.s[2]);
    if (o.q) _q.copy(o.q);
    _m.compose(_p, _q, _s);
    if (o.parent) _m.premultiply(o.parent);
    g.applyMatrix4(_m);
    if (this.sway) {
      const a = new Float32Array(n * 4);
      for (let i = 0; i < n; i++) a.set(this.pivot, i * 4);
      g.setAttribute("aSway", new THREE.BufferAttribute(a, 4));
    }
    (this.lists[o.mat || "prop"] ||= []).push(g);
    return this;
  }
  get count() {
    let n = 0;
    for (const l of Object.values(this.lists)) n += l.length;
    return n;
  }
  build(shadow = true, cast = shadow) {
    const grp = new THREE.Group();
    for (const [k, list] of Object.entries(this.lists)) {
      for (let i = 0; i < list.length; i += 3000) {
        const part = list.slice(i, i + 3000);
        const merged = mergeGeometries(part);
        for (const g of part) g.dispose();
        if (!merged) continue;
        const mesh = new THREE.Mesh(merged, this.kit.get(k, this.sway));
        mesh.castShadow = cast && k !== "glow";
        mesh.receiveShadow = shadow;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        grp.add(mesh);
      }
    }
    this.lists = {};
    return grp;
  }
}

/* ---------- hình cơ bản (có bộ nhớ đệm: Builder.add luôn nhân bản) ---------- */
const prim = new Map<string, THREE.BufferGeometry>();
function cached(key: string, make: () => THREE.BufferGeometry) {
  let g = prim.get(key);
  if (!g) prim.set(key, (g = make()));
  return g;
}
export const G = {
  sph: (r = 1, w = 14, h = 10) => cached(`s${r},${w},${h}`, () => new THREE.SphereGeometry(r, w, h)),
  cyl: (rt: number, rb: number, h: number, s = 10, open = false) => cached(`c${rt},${rb},${h},${s},${open}`, () => new THREE.CylinderGeometry(rt, rb, h, s, 1, open)),
  cone: (r: number, h: number, s = 12, open = false) => cached(`k${r},${h},${s},${open}`, () => new THREE.ConeGeometry(r, h, s, 1, open)),
  box: (x: number, y: number, z: number) => cached(`b${x},${y},${z}`, () => new THREE.BoxGeometry(x, y, z)),
  tor: (r: number, t: number, rs = 8, ts = 24, arc = Math.PI * 2) => cached(`t${r},${t},${rs},${ts},${arc}`, () => new THREE.TorusGeometry(r, t, rs, ts, arc)),
  disc: (r: number, s = 20) => cached(`d${r},${s}`, () => new THREE.CircleGeometry(r, s)),
  rbox: (x: number, y: number, z: number, r = 0.2) => cached(`r${x},${y},${z},${r}`, () => new RoundedBoxGeometry(x, y, z, 3, r)),
};
/** Giải phóng bộ đệm hình cơ bản sau khi dựng xong một thế giới */
export function clearPrimitives() {
  for (const g of prim.values()) g.dispose();
  prim.clear();
}

export function setLayer(obj: THREE.Object3D, l: number) {
  obj.traverse((o) => o.layers.set(l));
}
export const MT = (x: number, y: number, z: number, yaw = 0, s = 1) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0)), new THREE.Vector3(s, s, s));
export function facing(pos: THREE.Vector3, normal: THREE.Vector3) {
  const o = new THREE.Object3D();
  o.position.copy(pos);
  o.lookAt(pos.clone().add(normal));
  return o.quaternion.clone();
}
/** Lưới địa hình từ hàm toạ độ: at(u, v) → [x, y, z]; uv theo kết cấu nền phủ [-W, W]² */
export function gridSurface(nx: number, nz: number, W: number, at: (u: number, v: number) => [number, number, number]) {
  const pos = new Float32Array((nx + 1) * (nz + 1) * 3),
    uv = new Float32Array((nx + 1) * (nz + 1) * 2),
    idx: number[] = [];
  let k = 0;
  for (let i = 0; i <= nx; i++)
    for (let j = 0; j <= nz; j++) {
      const [x, y, z] = at(i / nx, j / nz);
      pos[k * 3] = x;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = z;
      uv[k * 2] = (x + W) / (2 * W);
      uv[k * 2 + 1] = 1 - (z + W) / (2 * W);
      k++;
    }
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < nz; j++) {
      const a = i * (nz + 1) + j,
        b = (i + 1) * (nz + 1) + j;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}
/** Lưới chữ nhật đều [x0,x1]×[z0,z1] với chiều cao hf(x, z) */
export const gridRect = (x0: number, x1: number, z0: number, z1: number, nx: number, nz: number, W: number, hf: (x: number, z: number) => number) =>
  gridSurface(nx, nz, W, (u, v) => {
    const x = x0 + (x1 - x0) * u,
      z = z0 + (z1 - z0) * v;
    return [x, hf(x, z), z];
  });

/** Ảnh nền kết cấu (canvas hoặc ImageBitmap từ worker) → Texture; ImageBitmap không lật được nên lật bằng uv */
export function texFrom(img: CanvasImageSource | OffscreenCanvas, srgb = true, repeat = false) {
  const t = new THREE.Texture(img as HTMLCanvasElement);
  if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) {
    t.flipY = false;
    t.repeat.set(1, -1);
    t.offset.set(0, 1);
  }
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}
