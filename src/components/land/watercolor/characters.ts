/**
 * Lữ khách + Mochi (cáo mây): dựng hình, đi theo đường A*, Mochi theo vệt chân, ngồi khi đứng lâu, dạo vòng khi rảnh.
 */
import * as THREE from "three";
import { G, setLayer, wobble } from "./builder";
import type { P2 } from "./core";
import type { MaterialKit } from "./materials";
import type { NavGrid, WalkMap } from "./nav";

function blob(r: number, tex: THREE.Texture) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.04;
  setLayer(m, 1);
  return m;
}

type PartOpts = { wob?: number; fur?: boolean; r?: number[]; s?: number[] };
function partMaker(kit: MaterialKit) {
  return (geo: THREE.BufferGeometry, color: string, pos: number[], o: PartOpts = {}) => {
    const g = geo.clone();
    if (o.wob) {
      wobble(g, o.wob, 3, 1);
      g.computeVertexNormals();
    }
    const m = new THREE.Mesh(g, o.fur ? kit.fur(color) : kit.solid(color));
    m.position.set(pos[0], pos[1], pos[2]);
    if (o.r) m.rotation.set(o.r[0], o.r[1], o.r[2]);
    if (o.s) m.scale.set(o.s[0], o.s[1], o.s[2]);
    m.castShadow = false;
    m.receiveShadow = true;
    return m;
  };
}

export function buildTraveler(kit: MaterialKit, blobTex: THREE.Texture) {
  const part = partMaker(kit);
  const root = new THREE.Group(),
    body = new THREE.Group();
  root.add(body);
  const legL = new THREE.Group(),
    legR = new THREE.Group();
  legL.position.set(-0.13, 0.42, 0);
  legR.position.set(0.13, 0.42, 0);
  for (const L of [legL, legR]) {
    L.add(part(G.cyl(0.09, 0.1, 0.34, 8), "#5b4636", [0, -0.17, 0]));
    L.add(part(G.sph(0.13, 10, 8), "#6b3f26", [0, -0.36, 0.05], { s: [1, 0.7, 1.35] }));
    body.add(L);
  }
  body.add(part(G.cyl(0.27, 0.4, 0.62, 12), "#3f8086", [0, 0.72, 0], { wob: 0.01 }));
  body.add(part(G.cyl(0.36, 0.36, 0.08, 12), "#6b3f26", [0, 0.56, 0]));
  const armL = new THREE.Group(),
    armR = new THREE.Group();
  armL.position.set(-0.32, 0.95, 0);
  armR.position.set(0.32, 0.95, 0);
  for (const [A, sx] of [
    [armL, -1],
    [armR, 1],
  ] as const) {
    A.add(part(G.cyl(0.07, 0.08, 0.36, 7), "#3f8086", [0, -0.16, 0], { r: [0, 0, sx * 0.25] }));
    A.add(part(G.sph(0.085, 8, 6), "#f3d2b3", [sx * 0.05, -0.35, 0]));
    body.add(A);
  }
  const head = new THREE.Group();
  head.position.set(0, 1.32, 0);
  body.add(head);
  head.add(part(G.sph(0.36, 18, 14), "#f3d2b3", [0, 0, 0]));
  head.add(part(G.sph(0.37, 16, 10), "#5a3a26", [0, 0.06, -0.06], { s: [1, 0.85, 1] }));
  for (const sx of [-1, 1]) {
    head.add(part(G.sph(0.055, 8, 6), "#1c1917", [sx * 0.13, 0.02, 0.33], { s: [1, 1.3, 0.6] }));
    head.add(part(G.sph(0.06, 8, 6), "#f2a0a0", [sx * 0.22, -0.1, 0.29], { s: [1, 0.6, 0.4] }));
  }
  const hat = new THREE.Group();
  hat.position.set(0, 0.06, -0.1);
  hat.rotation.x = -0.42;
  head.add(hat);
  hat.add(part(G.cyl(0.56, 0.58, 0.06, 20), "#e8c46a", [0, 0.24, 0], { wob: 0.02 }));
  hat.add(part(G.cyl(0.27, 0.34, 0.26, 16), "#e2b95a", [0, 0.39, 0]));
  hat.add(part(G.cyl(0.345, 0.345, 0.07, 16), "#c8423a", [0, 0.29, 0]));
  body.add(part(G.tor(0.24, 0.08, 8, 16), "#e5552e", [0, 1.04, 0], { r: [Math.PI / 2, 0, 0] }));
  const scarfTail = part(G.box(0.14, 0.42, 0.05), "#e5552e", [0.1, 0.9, -0.24], { r: [0.5, 0, 0.2] });
  body.add(scarfTail);
  body.add(part(G.box(0.3, 0.26, 0.12), "#8a5a35", [0.36, 0.66, 0.06], { r: [0, 0, 0.1] }));
  body.add(part(G.tor(0.42, 0.025, 4, 20), "#6b3f26", [0.05, 0.86, 0], { r: [0, Math.PI / 2, 0.75], s: [1, 1.2, 1] }));
  root.add(blob(0.55, blobTex));
  return { root, body, legL, legR, armL, armR, head, scarfTail };
}

export function buildMochi(kit: MaterialKit, blobTex: THREE.Texture) {
  const part = partMaker(kit);
  const root = new THREE.Group(),
    body = new THREE.Group();
  root.add(body);
  const cream = "#fbf6ec",
    cream2 = "#f1eef4";
  const torso = new THREE.Group();
  torso.position.set(0, 0.42, 0);
  body.add(torso);
  torso.add(part(G.sph(0.34, 14, 10), cream, [0, 0, 0], { s: [1, 0.9, 1.25], fur: true, wob: 0.02 }));
  for (const [x, y, z, r] of [
    [0.2, 0.08, -0.15, 0.2],
    [-0.2, 0.06, -0.12, 0.2],
    [0.18, -0.05, 0.2, 0.18],
    [-0.18, -0.05, 0.2, 0.18],
    [0, 0.18, 0.05, 0.2],
  ])
    torso.add(part(G.sph(r, 10, 8), cream2, [x, y, z], { fur: true }));
  const legs: THREE.Mesh[] = [];
  for (const [x, z] of [
    [-0.17, 0.25],
    [0.17, 0.25],
    [-0.17, -0.25],
    [0.17, -0.25],
  ]) {
    const L = part(G.cyl(0.07, 0.08, 0.26, 7), cream2, [x, 0.13, z], { fur: true });
    body.add(L);
    legs.push(L);
  }
  const head = new THREE.Group();
  head.position.set(0, 0.78, 0.33);
  body.add(head);
  head.add(part(G.sph(0.33, 16, 12), cream, [0, 0, 0], { fur: true, wob: 0.015 }));
  for (const sx of [-1, 1]) head.add(part(G.sph(0.17, 10, 8), cream2, [sx * 0.24, -0.1, 0.06], { fur: true }));
  head.add(part(G.sph(0.15, 12, 8), "#fffaf2", [0, -0.08, 0.27], { s: [1, 0.75, 1] }));
  head.add(part(G.sph(0.055, 8, 6), "#3b2a1e", [0, -0.03, 0.41]));
  for (const sx of [-1, 1]) {
    head.add(part(G.sph(0.05, 8, 6), "#1c1917", [sx * 0.13, 0.05, 0.28], { s: [1, 1.35, 0.6] }));
    head.add(part(G.sph(0.055, 8, 6), "#f4a6b8", [sx * 0.21, -0.07, 0.24], { s: [1, 0.6, 0.4] }));
    const ear = new THREE.Group();
    ear.position.set(sx * 0.18, 0.27, -0.02);
    ear.rotation.set(-0.1, 0, -sx * 0.32);
    head.add(ear);
    ear.add(part(G.cone(0.13, 0.34, 10), cream, [0, 0.12, 0], { s: [1, 1, 0.6], fur: true }));
    ear.add(part(G.cone(0.07, 0.22, 8), "#f4a05a", [0, 0.1, 0.04], { s: [1, 1, 0.4] }));
  }
  body.add(part(G.tor(0.2, 0.06, 8, 16), "#f08a3c", [0, 0.62, 0.27], { r: [Math.PI / 2 - 0.4, 0, 0] }));
  body.add(part(G.box(0.1, 0.22, 0.04), "#f08a3c", [0.12, 0.52, 0.42], { r: [0.2, 0, 0.3] }));
  const tail = new THREE.Group();
  tail.position.set(0, 0.5, -0.4);
  body.add(tail);
  [
    [0, 0.05, -0.08, 0.16],
    [0, 0.22, -0.22, 0.2],
    [0, 0.45, -0.25, 0.22],
    [0, 0.66, -0.15, 0.19],
    [0, 0.8, -0.02, 0.15],
  ].forEach(([x, y, z, r], i) => tail.add(part(G.sph(r, 10, 8), i === 4 ? "#d6e8f5" : i % 2 ? cream2 : cream, [x, y, z], { fur: true })));
  root.add(blob(0.5, blobTex));
  return { root, body, torso, head, tail, legs };
}

interface Mover {
  x: number;
  z: number;
  y: number;
  face: number;
  phase: number;
  speed: number;
  idle: number;
}
const turnTo = (o: Mover, target: number, dt: number) => {
  let d = target - o.face;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  o.face += d * Math.min(1, dt * 10);
};

/** Hai nhân vật + vòng đánh dấu điểm đến */
export class Companions {
  readonly hero: ReturnType<typeof buildTraveler>;
  readonly mochi: ReturnType<typeof buildMochi>;
  private player: Mover;
  private pal: Mover & { sit: number };
  private trail: P2[] = [];
  private waypoints: P2[] = [];
  private stuckT = 0;
  private marker: THREE.Mesh;
  private markerT = 9;
  private strollI = 0;
  /** giây kể từ lần cuối người dùng ra lệnh đi */
  private sinceUser = 0;
  constructor(
    private scene: THREE.Scene,
    kit: MaterialKit,
    blobTex: THREE.Texture,
    private walk: WalkMap,
    private nav: NavGrid,
    start: { hero: P2; mochi: P2 },
    private scale: number,
    private stroll: P2[],
    private reduced: boolean
  ) {
    this.hero = buildTraveler(kit, blobTex);
    this.mochi = buildMochi(kit, blobTex);
    this.hero.root.scale.setScalar(scale);
    this.mochi.root.scale.setScalar(scale);
    scene.add(this.hero.root, this.mochi.root);
    const h = walk.height(start.hero[0], start.hero[1]),
      m = walk.height(start.mochi[0], start.mochi[1]);
    this.player = { x: start.hero[0], z: start.hero[1], y: h, face: 0.6, phase: 0, speed: 0, idle: 0 };
    this.pal = { x: start.mochi[0], z: start.mochi[1], y: m, face: -0.4, phase: 0, speed: 0, idle: 0, sit: 0 };
    for (let i = 0; i < 30; i++) this.trail.push([this.player.x + ((this.pal.x - this.player.x) * i) / 29, this.player.z + ((this.pal.z - this.player.z) * i) / 29]);
    this.marker = new THREE.Mesh(
      new THREE.RingGeometry(0.32, 0.46, 24),
      new THREE.MeshBasicMaterial({ color: new THREE.Color("#fffaf0"), transparent: true, opacity: 0, depthWrite: false })
    );
    this.marker.rotation.x = -Math.PI / 2;
    setLayer(this.marker, 1);
    scene.add(this.marker);
    // dạo bắt đầu từ điểm gần nhất
    let bd = 1e9;
    stroll.forEach((p, i) => {
      const d = Math.hypot(p[0] - this.player.x, p[1] - this.player.z);
      if (d < bd) {
        bd = d;
        this.strollI = i;
      }
    });
    this.sinceUser = 4;
  }
  get position() {
    return new THREE.Vector3(this.player.x, this.player.y, this.player.z);
  }
  /** Đi tới (x, z); trả về false nếu không có đường */
  goTo(x: number, z: number, fromUser = true) {
    const path = this.nav.path([this.player.x, this.player.z], [x, z]);
    if (!path || !path.length) return false;
    this.waypoints = path;
    this.stuckT = 0;
    if (fromUser) {
      this.sinceUser = 0;
      const [tx, tz] = path[path.length - 1];
      this.marker.position.set(tx, this.walk.height(tx, tz) + 0.06, tz);
      this.markerT = 0;
    }
    return true;
  }
  private tryMove(o: Mover, dx: number, dz: number) {
    if (Math.hypot(dx, dz) < 1e-5) return false;
    for (const a of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05]) {
      const c = Math.cos(a),
        s = Math.sin(a),
        k = Math.max(0.35, Math.cos(a));
      const nx = o.x + (dx * c - dz * s) * k,
        nz = o.z + (dx * s + dz * c) * k;
      if (this.walk.walkable(nx, nz, 0.2)) {
        o.x = nx;
        o.z = nz;
        return true;
      }
    }
    return false;
  }
  update(dt: number, t: number) {
    const P = this.player,
      pal = this.pal,
      hero = this.hero,
      mochi = this.mochi;
    this.sinceUser += dt;
    // rảnh lâu → tự dạo theo vòng định sẵn
    if (!this.waypoints.length && this.sinceUser > 7 && P.idle > 2.5 && this.stroll.length) {
      this.strollI = (this.strollI + 1) % this.stroll.length;
      const [sx, sz] = this.stroll[this.strollI];
      this.goTo(sx, sz, false);
    }
    let dx = 0,
      dz = 0,
      spd = 0;
    if (this.waypoints.length) {
      const w = this.waypoints[0],
        ddx = w[0] - P.x,
        ddz = w[1] - P.z,
        d = Math.hypot(ddx, ddz);
      if (d < (this.waypoints.length > 1 ? 0.45 : 0.15)) this.waypoints.shift();
      else {
        dx = ddx / d;
        dz = ddz / d;
        const base = this.sinceUser < 7 ? 4.4 : 2.4;
        spd = base * this.scale * Math.min(1, d * 1.5 + 0.35);
      }
    }
    let moving = false;
    if (spd > 0) {
      const bx = P.x,
        bz = P.z;
      if (this.tryMove(P, dx * spd * dt, dz * spd * dt)) {
        moving = true;
        this.stuckT = 0;
        const mx = P.x - bx,
          mz = P.z - bz;
        turnTo(P, Math.atan2(mx, mz), dt);
        P.speed = Math.hypot(mx, mz) / dt;
        const lt = this.trail[0];
        if (Math.hypot(P.x - lt[0], P.z - lt[1]) > 0.12) {
          this.trail.unshift([P.x, P.z]);
          if (this.trail.length > 80) this.trail.pop();
        }
      } else if ((this.stuckT += dt) > 0.6) {
        // bị kẹt: nhảy qua điểm đó
        this.waypoints.shift();
        this.stuckT = 0;
      }
    }
    if (!moving) P.speed = 0;
    P.idle = moving ? 0 : P.idle + dt;
    const gy = this.walk.height(P.x, P.z);
    P.y += (gy - P.y) * Math.min(1, dt * 12);
    hero.root.position.set(P.x, P.y, P.z);
    hero.root.rotation.y = P.face;
    // dáng đi
    P.phase += moving ? dt * Math.max(2.5, P.speed / this.scale) * 4.2 : 0;
    const sw = moving ? Math.sin(P.phase) : 0;
    hero.body.position.y = moving ? Math.abs(Math.sin(P.phase)) * 0.08 : Math.sin(t / 0.6) * 0.012;
    hero.legL.rotation.x = sw * 0.7;
    hero.legR.rotation.x = -sw * 0.7;
    hero.armL.rotation.x = -sw * 0.6;
    hero.armR.rotation.x = sw * 0.6;
    hero.body.rotation.x = moving ? 0.08 : 0;
    hero.scarfTail.rotation.x = 0.5 + (moving ? 0.5 + Math.sin(P.phase * 2) * 0.2 : Math.sin(t / 0.5) * 0.08);
    if (this.markerT < 2) {
      this.markerT += dt;
      const mm = this.marker.material as THREE.MeshBasicMaterial;
      mm.opacity = Math.max(0, 0.95 - this.markerT * 0.9);
      this.marker.scale.setScalar(1 + this.markerT * 0.6);
    }
    // Mochi theo vệt chân, cách ~1.7
    let acc = 0,
      tgt = this.trail[this.trail.length - 1];
    for (let i = 1; i < this.trail.length; i++) {
      acc += Math.hypot(this.trail[i][0] - this.trail[i - 1][0], this.trail[i][1] - this.trail[i - 1][1]);
      if (acc > 1.7 * this.scale) {
        tgt = this.trail[i];
        break;
      }
    }
    const mdx = tgt[0] - pal.x,
      mdz = tgt[1] - pal.z,
      md = Math.hypot(mdx, mdz);
    let pm = false;
    if (md > 0.12) {
      const sp = Math.min(6.5 * this.scale, 1.2 + md * 3.2) * dt,
        k = Math.min(1, sp / md);
      pal.x += mdx * k;
      pal.z += mdz * k;
      pm = true;
      turnTo(pal, Math.atan2(mdx, mdz), dt);
      pal.speed = sp / dt;
    }
    pal.idle = pm ? 0 : pal.idle + dt;
    if (!pm) turnTo(pal, Math.atan2(P.x - pal.x, P.z - pal.z), dt * 0.4);
    const wantSit = pal.idle > 2.2 && P.idle > 2.2 ? 1 : 0;
    pal.sit += (wantSit - pal.sit) * Math.min(1, dt * 4);
    pal.phase += pm ? dt * (pal.speed / this.scale) * 5 : 0;
    const my = this.walk.height(pal.x, pal.z);
    pal.y += (my - pal.y) * Math.min(1, dt * 12);
    mochi.root.position.set(pal.x, pal.y, pal.z);
    mochi.root.rotation.y = pal.face;
    mochi.body.position.y = (pm ? Math.abs(Math.sin(pal.phase)) * 0.07 : 0) - pal.sit * 0.12;
    mochi.torso.rotation.x = -pal.sit * 0.45;
    mochi.legs.forEach((L, i) => {
      L.rotation.x = pm ? Math.sin(pal.phase + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * 0.6 : 0;
      L.visible = !(i > 1 && pal.sit > 0.6);
    });
    mochi.head.rotation.x = -pal.sit * 0.15;
    mochi.head.rotation.z = Math.sin(t * 1.3) * 0.06;
    mochi.tail.rotation.y = this.reduced ? 0 : Math.sin(t * (pm ? 7 : 2.2)) * (pm ? 0.35 : 0.25);
    mochi.tail.rotation.x = -0.2 + pal.sit * 0.5;
  }
  dispose() {
    this.scene.remove(this.hero.root, this.mochi.root, this.marker);
    for (const r of [this.hero.root, this.mochi.root, this.marker])
      r.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
      });
    (this.marker.material as THREE.Material).dispose();
  }
}
