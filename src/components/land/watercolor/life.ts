/**
 * Sự sống của bản đồ: hơi nước / bọt thác bốc lên, cánh hoa – lá – tuyết rơi, bướm, tàu chạy theo lịch.
 */
import * as THREE from "three";
import { setLayer } from "./builder";
import type { P2, Rand } from "./core";

/* ---------- hơi nước, bọt thác: sprite mềm bốc lên rồi tan ---------- */
interface Puff {
  s: THREE.Sprite;
  cx: number;
  y: number;
  z: number;
  ph: number;
  sp: number;
  sc: number;
  rise: number;
  op: number;
}
export class Puffs {
  private list: Puff[] = [];
  constructor(
    private scene: THREE.Scene,
    private tex: THREE.Texture,
    private rand: Rand
  ) {}
  /** n sprite quanh (x, y, z) rải ±w theo x, ±d theo z; rise: độ cao bốc lên */
  add(x: number, y: number, z: number, w: number, d: number, n: number, scale: number, rise = 1.1, op = 0.8, color = 0xffffff) {
    const { R, rng } = this.rand;
    for (let i = 0; i < n; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.tex, color, transparent: true, depthWrite: false, opacity: op }));
      setLayer(s, 1);
      this.scene.add(s);
      this.list.push({ s, cx: x + R(-w, w), y, z: z + R(-d, d), ph: rng(), sp: R(0.35, 0.8), sc: scale * R(0.7, 1.3), rise, op });
    }
  }
  update(t: number) {
    for (const u of this.list) {
      const l = (t * u.sp + u.ph) % 1;
      u.s.position.set(u.cx + Math.sin(u.ph * 9 + t) * 0.15, u.y + l * u.rise, u.z + l * 0.3);
      u.s.scale.setScalar(u.sc * (0.6 + 0.9 * l));
      (u.s.material as THREE.SpriteMaterial).opacity = Math.min(1, 1.25 * (1 - l)) * u.op;
    }
  }
}

/* ---------- vật rơi theo gió (cánh hoa, lá thu, tuyết): một InstancedMesh ---------- */
export interface DriftZone {
  /** tâm + bán kính vùng rơi */
  x: number;
  z: number;
  r: number;
  /** độ cao đất ở vùng đó */
  y: number;
  colors: string[];
  n: number;
  /** "petal" lắc lư, "snow" rơi thẳng chậm */
  kind?: "petal" | "snow";
}
export class Drifters {
  readonly mesh: THREE.InstancedMesh;
  private items: { z: DriftZone; x: number; zz: number; y0: number; ph: number; sp: number; spin: number; kind: string }[] = [];
  private m4 = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private e = new THREE.Euler();
  private v = new THREE.Vector3();
  private one = new THREE.Vector3(1, 1, 1);
  constructor(scene: THREE.Scene, zones: DriftZone[], rand: Rand) {
    const { R, rng, pick } = rand;
    const total = zones.reduce((a, z) => a + z.n, 0);
    const g = new THREE.CircleGeometry(0.09, 5);
    g.scale(1, 0.65, 1);
    this.mesh = new THREE.InstancedMesh(g, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), Math.max(1, total));
    let i = 0;
    for (const z of zones)
      for (let k = 0; k < z.n; k++) {
        const a = R(0, Math.PI * 2),
          r = z.r * Math.sqrt(rng());
        this.items.push({ z, x: z.x + Math.cos(a) * r, zz: z.z + Math.sin(a) * r, y0: z.y, ph: rng() * 20, sp: R(0.6, 1.1), spin: R(1, 3), kind: z.kind ?? "petal" });
        this.mesh.setColorAt(i++, new THREE.Color(pick(z.colors)));
      }
    this.mesh.count = this.items.length;
    this.mesh.frustumCulled = false;
    setLayer(this.mesh, 1);
    scene.add(this.mesh);
  }
  update(t: number) {
    const H = 5.5;
    this.items.forEach((it, i) => {
      const fall = it.kind === "snow" ? 0.45 : 0.7;
      const l = ((t * fall * it.sp) / H + it.ph) % 1;
      const y = it.y0 + H * (1 - l) + 0.05;
      const sway = it.kind === "snow" ? 0.25 : 0.9;
      const x = it.x + Math.sin(t * 0.9 * it.sp + it.ph) * sway + l * 1.6,
        z = it.zz + Math.cos(t * 0.7 * it.sp + it.ph * 1.3) * sway * 0.6 + l * 0.8;
      this.e.set(t * it.spin + it.ph, t * it.spin * 0.7, it.ph);
      this.q.setFromEuler(this.e);
      this.v.set(x, y, z);
      const s = l > 0.92 ? (1 - l) / 0.08 : 1;
      this.one.setScalar(s);
      this.m4.compose(this.v, this.q, this.one);
      this.mesh.setMatrixAt(i, this.m4);
    });
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/* ---------- bướm ---------- */
export class Butterflies {
  private list: { g: THREE.Group; pl: THREE.Group; pr: THREE.Group; cx: number; cz: number; ph: number; sp: number }[] = [];
  constructor(
    scene: THREE.Scene,
    wingTex: THREE.Texture,
    centers: P2[],
    private heightAt: (x: number, z: number) => number,
    rand: Rand,
    scale = 1
  ) {
    const { R, rng } = rand;
    const tints = ["#ffffff", "#ffd0e0", "#d0f0ff", "#fff0b0"];
    const geo = new THREE.PlaneGeometry(0.46, 0.46).translate(-0.23, 0, 0);
    centers.forEach(([cx, cz], i) => {
      const m = new THREE.MeshBasicMaterial({ map: wingTex, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, color: new THREE.Color(tints[i % 4]) });
      const g = new THREE.Group(),
        wl = new THREE.Mesh(geo, m),
        wr = new THREE.Mesh(geo, m);
      wr.scale.x = -1;
      const pl = new THREE.Group(),
        pr = new THREE.Group();
      pl.add(wl);
      pr.add(wr);
      g.add(pl, pr);
      g.scale.setScalar(scale);
      setLayer(g, 1);
      scene.add(g);
      this.list.push({ g, pl, pr, cx: cx + R(-0.6, 0.6), cz: cz + R(-0.6, 0.6), ph: rng() * 10, sp: R(0.25, 0.45) });
    });
  }
  update(t: number, flutter = true) {
    for (const b of this.list) {
      const tt = t * b.sp + b.ph,
        x = b.cx + Math.sin(tt * 1.3) * 2.2 + Math.sin(tt * 3.1) * 0.4,
        z = b.cz + Math.cos(tt * 0.9) * 1.8,
        y = this.heightAt(x, z) + 0.9 + Math.sin(tt * 4) * 0.25;
      const vx = Math.cos(tt * 1.3) * 2.86,
        vz = -Math.sin(tt * 0.9) * 1.62;
      b.g.position.set(x, y, z);
      b.g.rotation.y = Math.atan2(vx, vz) + Math.PI / 2;
      const f = flutter ? Math.sin(t * 22 + b.ph) * 0.9 : 0.4;
      b.pl.rotation.set(-Math.PI / 2, 0, -0.2 - f, "ZYX");
      b.pr.rotation.set(-Math.PI / 2, 0, 0.2 + f, "ZYX");
    }
  }
}

/* ---------- tàu ---------- */
export interface TrackPose {
  x: number;
  y: number;
  z: number;
  /** góc quay quanh trục y */
  yaw: number;
  /** góc ngóc (lên/xuống dốc) quanh trục z cục bộ */
  pitch?: number;
}
/**
 * Đoàn tàu: mỗi toa là một nhóm đặt theo toạ độ đường ray s (toa đầu ở s, toa sau ở s − i·khoảng cách toa).
 * hidden(s): toa ở trong hầm / ngoài bản đồ thì ẩn.
 */
export class Train {
  constructor(
    readonly cars: THREE.Object3D[],
    private spacing: number,
    private pose: (s: number) => TrackPose,
    private hidden: (s: number) => boolean = () => false
  ) {}
  /** dir = +1: toa sau ở s − i·spacing; −1: ở s + i·spacing */
  place(s: number, dir = 1) {
    this.cars.forEach((c, i) => {
      const si = s - dir * i * this.spacing,
        p = this.pose(si);
      c.position.set(p.x, p.y, p.z);
      c.rotation.set(0, p.yaw, p.pitch ?? 0, "YXZ");
      c.visible = !this.hidden(si);
    });
  }
  /** toạ độ thế giới của toa đầu (để thử nghiệm: tàu có trong khung không) */
  get head() {
    return this.cars[0].position;
  }
}

/**
 * Lịch "đi ngang qua": mỗi chu kỳ period giây, tàu chạy từ sA tới sB với vận tốc v; nếu có sStop thì giảm tốc êm,
 * dừng ở ga dwell giây rồi tăng tốc đi tiếp. Trả về s, hoặc null khi tàu đang ở ngoài bản đồ.
 */
export function passSchedule(t: number, o: { period: number; sA: number; sB: number; v: number; sStop?: number; dwell?: number; offset?: number; ease?: number }) {
  const dir = Math.sign(o.sB - o.sA),
    v = o.v,
    E = o.ease ?? 3;
  const tt = (((t + (o.offset ?? 0)) % o.period) + o.period) % o.period;
  if (o.sStop === undefined) {
    const run = Math.abs(o.sB - o.sA) / v;
    return tt > run ? null : o.sA + dir * v * tt;
  }
  const d1 = Math.abs(o.sStop - o.sA),
    d3 = Math.abs(o.sB - o.sStop),
    dw = o.dwell ?? 0;
  const tc = d1 / v - E / 2,
    t1 = tc + E,
    t3 = E + (d3 - (v * E) / 2) / v;
  if (tt < tc) return o.sA + dir * v * tt;
  if (tt < t1) {
    const u = tt - tc;
    return o.sA + dir * (v * tc + v * u - (v * u * u) / (2 * E));
  }
  if (tt < t1 + dw) return o.sStop;
  const u = tt - t1 - dw;
  if (u > t3) return null;
  const dist = u < E ? (v * u * u) / (2 * E) : (v * E) / 2 + v * (u - E);
  return o.sStop + dir * dist;
}
