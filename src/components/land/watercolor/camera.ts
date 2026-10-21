/**
 * Camera khám phá ở góc 3/4 như ảnh bản đồ: kéo để dời (giới hạn trong bản đồ), cuộn/chụm để phóng, "Toàn cảnh" để về.
 */
import * as THREE from "three";
import { clamp } from "./core";

export interface ViewSpec {
  /** khung đất cần thấy trọn: x0, x1, z0, z1 */
  box: [number, number, number, number];
  pitch: number;
  tgtY: number;
}
export interface CameraSpec {
  fov: number;
  /** khung ngang (màn rộng) và khung dọc (điện thoại) */
  wide: ViewSpec;
  tall: ViewSpec;
  /** vùng tâm camera được phép dời tới */
  panBox: [number, number, number, number];
}

interface CamState {
  x: number;
  z: number;
  dist: number;
}

export class ExploreCamera {
  readonly cam: THREE.PerspectiveCamera;
  private home: CamState & { pitch: number; y: number } = { x: 0, z: 0, dist: 60, pitch: 55, y: 0 };
  private goal: CamState = { x: 0, z: 0, dist: 60 };
  private cur: CamState = { x: 0, z: 0, dist: 60 };
  private aspect = 1.6;
  private dirty = true;
  private inited = false;
  constructor(
    private spec: CameraSpec,
    private reduced: boolean
  ) {
    this.cam = new THREE.PerspectiveCamera(spec.fov, 1.6, 1, 500);
  }
  get homeDist() {
    return this.home.dist;
  }
  get dist() {
    return this.cur.dist;
  }
  /** Tính khung toàn cảnh cho tỉ lệ khung hình (chọn khung ngang/dọc), giữ mức phóng tương đối hiện tại */
  setAspect(aspect: number) {
    const rel = this.goal.dist / this.home.dist,
      offX = this.goal.x - this.home.x,
      offZ = this.goal.z - this.home.z,
      first = !this.inited;
    this.inited = true;
    this.aspect = aspect;
    const v = aspect < 1.05 ? this.spec.tall : this.spec.wide;
    this.home = { ...this.fit(v, aspect), pitch: v.pitch, y: v.tgtY };
    if (first) {
      this.goal = { x: this.home.x, z: this.home.z, dist: this.home.dist };
      this.cur = { ...this.goal };
    } else {
      this.goal = { x: this.home.x + offX, z: this.home.z + offZ, dist: this.home.dist * rel };
      this.clampGoal();
      this.cur = { ...this.goal };
    }
    this.dirty = true;
  }
  private fit(v: ViewSpec, aspect: number): CamState {
    const cam = new THREE.PerspectiveCamera(this.spec.fov, aspect, 1, 2000);
    const pitch = THREE.MathUtils.degToRad(v.pitch),
      dir = new THREE.Vector3(0, Math.sin(pitch), Math.cos(pitch));
    const [x0, x1, z0, z1] = v.box;
    const pts = [
      [x0, z0],
      [x0, z1],
      [x1, z0],
      [x1, z1],
    ].map(([x, z]) => new THREE.Vector3(x, v.tgtY, z));
    const tgt = new THREE.Vector3((x0 + x1) / 2, v.tgtY, (z0 + z1) / 2);
    const q = new THREE.Vector3();
    const proj = (d: number) => {
      cam.position.copy(tgt).addScaledVector(dir, d);
      cam.lookAt(tgt);
      cam.updateMatrixWorld();
      const a = [9, -9, 9, -9];
      for (const p of pts) {
        q.copy(p).project(cam);
        a[0] = Math.min(a[0], q.x);
        a[1] = Math.max(a[1], q.x);
        a[2] = Math.min(a[2], q.y);
        a[3] = Math.max(a[3], q.y);
      }
      return a;
    };
    let d = 60;
    for (let it = 0; it < 6; it++) {
      let lo = 5,
        hi = 600;
      for (let k = 0; k < 36; k++) {
        const m = (lo + hi) / 2,
          a = proj(m);
        if (Math.max(-a[0], a[1], -a[2], a[3]) > 1) lo = m;
        else hi = m;
      }
      d = hi;
      const a = proj(d);
      const cx = (a[0] + a[1]) / 2,
        cy = (a[2] + a[3]) / 2,
        half = d * Math.tan(THREE.MathUtils.degToRad(this.spec.fov / 2));
      tgt.x += cx * half * aspect;
      tgt.z -= (cy * half) / Math.sin(pitch);
    }
    return { x: tgt.x, z: tgt.z, dist: d };
  }
  private clampGoal() {
    const [x0, x1, z0, z1] = this.spec.panBox;
    const g = this.goal;
    g.dist = clamp(g.dist, this.home.dist * 0.26, this.home.dist * 1.06);
    // càng phóng xa càng ít dời: ở toàn cảnh chỉ nhích quanh tâm
    const k = clamp((this.home.dist * 1.06 - g.dist) / (this.home.dist * 0.6), 0.12, 1);
    g.x = clamp(g.x, this.home.x + (x0 - this.home.x) * k, this.home.x + (x1 - this.home.x) * k);
    g.z = clamp(g.z, this.home.z + (z0 - this.home.z) * k, this.home.z + (z1 - this.home.z) * k);
  }
  /** Dời theo điểm ảnh kéo (viewportH: chiều cao khung CSS px) */
  pan(dx: number, dy: number, viewportH: number) {
    const wpp = (2 * this.cur.dist * Math.tan(THREE.MathUtils.degToRad(this.spec.fov / 2))) / viewportH;
    const pitch = THREE.MathUtils.degToRad(this.home.pitch);
    this.goal.x -= dx * wpp;
    this.goal.z -= (dy * wpp) / Math.sin(pitch);
    this.clampGoal();
    if (this.reduced) this.cur = { ...this.goal };
    this.dirty = true;
  }
  /** Phóng: f < 1 lại gần; neo (x, z) giữ yên điểm dưới con trỏ */
  zoomBy(f: number, anchor?: { x: number; z: number }) {
    const before = this.goal.dist;
    this.goal.dist = clamp(before * f, this.home.dist * 0.26, this.home.dist * 1.06);
    const k = 1 - this.goal.dist / before;
    if (anchor) {
      this.goal.x += (anchor.x - this.goal.x) * k;
      this.goal.z += (anchor.z - this.goal.z) * k;
    }
    this.clampGoal();
    if (this.reduced) this.cur = { ...this.goal };
    this.dirty = true;
  }
  /** Bay tới điểm (dùng khi chọn vùng) */
  focus(x: number, z: number, rel = 0.55) {
    this.goal = { x, z, dist: this.home.dist * rel };
    this.clampGoal();
    if (this.reduced) this.cur = { ...this.goal };
    this.dirty = true;
  }
  reset() {
    this.goal = { x: this.home.x, z: this.home.z, dist: this.home.dist };
    if (this.reduced) this.cur = { ...this.goal };
    this.dirty = true;
  }
  get atHome() {
    return Math.abs(this.goal.dist - this.home.dist) < 0.5 && Math.hypot(this.goal.x - this.home.x, this.goal.z - this.home.z) < 0.5;
  }
  /** Cập nhật camera; trả về true khi camera đổi (để cập nhật dải độ sâu nét mực) */
  update(dt: number) {
    const c = this.cur,
      g = this.goal;
    const k = this.reduced ? 1 : 1 - Math.exp(-dt * 7);
    const moving = Math.abs(c.x - g.x) + Math.abs(c.z - g.z) + Math.abs(c.dist - g.dist) > 1e-3;
    if (!moving && !this.dirty) return false;
    c.x += (g.x - c.x) * k;
    c.z += (g.z - c.z) * k;
    c.dist += (g.dist - c.dist) * k;
    const pitch = THREE.MathUtils.degToRad(this.home.pitch);
    const cam = this.cam;
    cam.aspect = this.aspect;
    cam.position.set(c.x, this.home.y + Math.sin(pitch) * c.dist, c.z + Math.cos(pitch) * c.dist);
    cam.lookAt(c.x, this.home.y, c.z);
    cam.near = Math.max(1, c.dist * 0.3);
    cam.far = c.dist * 3.2;
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();
    this.dirty = false;
    return true;
  }
}
