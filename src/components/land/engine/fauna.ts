/**
 * Sinh vật trên cao nguyên: Mochi (cáo mây), Bọt (rùa biển sao), thỏ, bướm, chuồn chuồn và đàn chim.
 * Mỗi con có một máy trạng thái nhỏ; khung hình gọi update(dt).
 */
import * as THREE from "three";
import { BF_PAL, botParts, butterflyParts, genDragonfly, genRabbit, mochiParts, type Part } from "./creatures";
import { PB, TAU, clamp, hx, mulberry32, type Rand } from "./math";
import { addPoints, type Ctx, type Dots } from "./render";
import { H, PR, PX, PZ, ROCK, SPTS, groundY, pondY, walkable, type Obstacle } from "./world";

export const adiff = (a: number, b: number) => {
  let d = (b - a) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};
export const yawTo = (dx: number, dz: number) => Math.atan2(-dz, dx);
export const fwdOf = (y: number) => [Math.cos(y), -Math.sin(y)];

export interface Rig {
  g: THREE.Group;
  o: Record<string, Dots>;
}
/** Dựng nhân vật có khớp: mỗi bộ phận là một THREE.Points con */
export function buildRig(ctx: Ctx, parts: Part[], scale: number, order = 2): Rig {
  const g = new THREE.Group(),
    o: Record<string, Dots> = {};
  for (const p of parts) {
    const pts = addPoints(ctx, p.b, { solid: true }, order, g);
    pts.position.set(p.p[0], p.p[1], p.p[2]);
    o[p.n] = pts;
  }
  g.scale.setScalar(scale);
  ctx.scene.add(g);
  return { g, o };
}

export interface Body {
  x: number;
  z: number;
}
export type Collide = (x: number, z: number, rad: number) => [number, number];

/** Bước một thân tròn tới (nx, nz): tránh vật cản, trượt dọc mép nếu bị chặn */
export function stepBody(o: Body, nx: number, nz: number, rad: number, collide: Collide) {
  let [x, z] = collide(nx, nz, rad);
  if (!walkable(x, z)) {
    if (walkable(x, o.z)) z = o.z;
    else if (walkable(o.x, z)) x = o.x;
    else return false;
    [x, z] = collide(x, z, rad);
    if (!walkable(x, z)) return false;
  }
  o.x = x;
  o.z = z;
  return true;
}

/** Thông tin Lữ khách mà thú cần biết (để đi theo / giật mình) */
export interface AvatarView {
  x: number;
  z: number;
  run: boolean;
}

const MO_TXT: Record<string, string> = {
  wander: "Chạy lon ton trên cỏ",
  sniff: "Cúi xuống hít hít mặt cỏ",
  look: "Đứng ngó quanh",
  sit: "Ngồi nghỉ",
  follow: "Lẽo đẽo theo Lữ khách",
};

export function createFauna(ctx: Ctx, flowerSpots: number[][], obstacles: () => Obstacle[], collide: Collide) {
  const { DP, R } = ctx;
  const rnd: Rand = mulberry32(4242);
  const MO = { rig: buildRig(ctx, mochiParts(mulberry32(511), DP), 1.6, 2), x: 2.6, z: 6.9, yaw: 2.4, speed: 0, phase: 0, state: "wander", t: 4, turn: 0, cool: 6, sitK: 0, hy: 0, hp: 0 };
  const BO = { rig: buildRig(ctx, botParts(mulberry32(512), DP), 1.5, 2), x: PX + 0.5, z: PZ + 0.2, yaw: 0, phase: 0, state: "swim", t: 16, tx: PX, tz: PZ, y: 0 };
  const RAB = [
    [-5.6, 6.2],
    [3.0, 8.3],
    [-1.2, -5.6],
  ].map(([x, z], i) => {
    const b = new PB(mulberry32(600 + i));
    genRabbit(b, mulberry32(600 + i), DP);
    const o = addPoints(ctx, b, { solid: true }, 2);
    o.scale.setScalar(1.6);
    return { o, x, z, yaw: rnd() * TAU, state: "graze", t: 2 + rnd() * 4, hop: null as null | { x0: number; z0: number; x1: number; z1: number; t: number; dur: number }, hops: 0, flee: false };
  });
  const BFS = BF_PAL.map((pal, i) => {
    const f = flowerSpots[(i * 7) % Math.max(1, flowerSpots.length)] || [0, 6];
    const rig = buildRig(ctx, butterflyParts(mulberry32(700 + i), pal), 2.2, 3);
    return { rig, x: f[0], z: f[1], y: H(f[0], f[1]) + 1, state: "fly", t: 0, tgt: f, yaw: 0, ph: rnd() * 6 };
  });
  const DFS = [0, 1, 2].map((i) => {
    const b = new PB(mulberry32(900 + i));
    genDragonfly(b, mulberry32(900 + i));
    const o = addPoints(ctx, b, { solid: true }, 3);
    o.scale.setScalar(2.2);
    return { o, x: PX + Math.cos(i * 2) * 1.5, z: PZ + Math.sin(i * 2) * 1.5, y: 0.8, tx: 0, tz: 0, ty: 0, state: "hover", t: rnd() * 2, yaw: 0 };
  });
  // chim (boids)
  const NB = 16,
    BIRD_P = 7,
    birds: { p: THREE.Vector3; v: THREE.Vector3 }[] = [];
  const bb = new PB(R);
  for (let i = 0; i < NB; i++) {
    for (let k = 0; k < BIRD_P; k++) bb.add(0, 0, 0, k < 3 ? hx("#2a2734") : hx("#3a3646"), 0.07, 0, 0, 0);
    birds.push({ p: new THREE.Vector3(-30 + rnd() * 6, 9 + rnd() * 3, -10 + rnd() * 6), v: new THREE.Vector3(2.5, 0, 1.2 + rnd()) });
  }
  const birdObj = addPoints(ctx, bb, { solid: true }, 2);
  birdObj.frustumCulled = false;

  let T = 0;

  function updateMochi(dt: number, AV: AvatarView) {
    const m = MO,
      dAv = Math.hypot(AV.x - m.x, AV.z - m.z);
    m.t -= dt;
    m.cool -= dt;
    if (m.state !== "follow" && dAv < 2.6 && m.cool <= 0) {
      m.state = "follow";
      m.t = 14;
    }
    let target = 0,
      desired = m.yaw;
    if (m.state === "wander") {
      target = 0.6;
      m.turn = clamp(m.turn + (rnd() - 0.5) * dt * 2.4, -0.7, 0.7);
      desired = m.yaw + m.turn;
      if (m.t <= 0) {
        const r = rnd();
        m.state = r < 0.4 ? "sniff" : r < 0.7 ? "look" : "sit";
        m.t = m.state === "sit" ? 5 + rnd() * 4 : 1.8 + rnd() * 2;
      }
    } else if (m.state === "follow") {
      const dx = AV.x - m.x,
        dz = AV.z - m.z;
      desired = yawTo(dx, dz);
      target = dAv > 1.3 ? clamp((dAv - 1.1) * 1.3, 0.5, 2.4) : 0;
      if (m.t <= 0 || dAv > 8) {
        m.state = "wander";
        m.t = 5;
        m.cool = 14;
      }
    } else if (m.t <= 0) {
      m.state = "wander";
      m.t = 4 + rnd() * 6;
      m.turn = (rnd() - 0.5) * 1.2;
    }
    if (target > 0) {
      const f = fwdOf(m.yaw);
      if (!walkable(m.x + f[0] * 0.8, m.z + f[1] * 0.8)) {
        desired = m.yaw + 1.6 * Math.sign(m.turn || 1);
        m.turn = Math.sign(m.turn || 1) * 0.7;
      }
      for (const o of obstacles()) {
        const ox = o.x - m.x,
          oz = o.z - m.z,
          od = Math.hypot(ox, oz);
        if (od < o.r + 0.6 && ox * f[0] + oz * f[1] > 0) desired -= Math.sign(ox * f[1] - oz * f[0] || 1) * 0.8;
      }
    }
    m.yaw += clamp(adiff(m.yaw, desired), -2.6 * dt, 2.6 * dt);
    m.speed += (target - m.speed) * Math.min(1, dt * 3);
    if (m.speed > 0.02) {
      const f = fwdOf(m.yaw);
      if (!stepBody(m, m.x + f[0] * m.speed * dt, m.z + f[1] * m.speed * dt, 0.18, collide)) {
        m.speed *= 0.4;
        m.yaw += 2 * dt;
      }
    }
    m.phase += m.speed * dt * 11;
    const near = m.state === "follow" && target === 0,
      sit = m.state === "sit" || near;
    m.sitK += ((sit ? 1 : 0) - m.sitK) * Math.min(1, dt * 4);
    const amp = clamp(m.speed / 0.6, 0, 1.3) * 0.55,
      o = m.rig.o,
      s = Math.sin(m.phase);
    o.leg0.rotation.z = s * amp;
    o.leg3.rotation.z = s * amp;
    o.leg1.rotation.z = -s * amp;
    o.leg2.rotation.z = -s * amp - m.sitK * 1.1;
    o.leg3.rotation.z -= m.sitK * 1.1;
    o.body.rotation.z = 0.3 * m.sitK;
    o.tail.rotation.z = 0.1 * s - 0.3 * m.sitK;
    o.tail.rotation.y = Math.sin(T * (m.state === "follow" ? 9 : 3)) * (m.state === "follow" ? 0.5 : 0.22);
    let hy = 0,
      hp = 0;
    if (m.state === "sniff") hp = -0.5 + 0.08 * Math.sin(T * 9);
    else if (m.state === "look") hy = Math.sin(T * 1.3) * 0.8;
    if (dAv < 3.5 && m.speed < 0.3) {
      hy = clamp(adiff(m.yaw, yawTo(AV.x - m.x, AV.z - m.z)), -1.1, 1.1);
      hp = 0.15;
    }
    m.hy += (hy - m.hy) * Math.min(1, dt * 5);
    m.hp += (hp - m.hp) * Math.min(1, dt * 5);
    o.head.rotation.y = m.hy;
    o.head.rotation.z = m.hp + 0.25 * m.sitK;
    o.head.position.y = 0.28 + Math.sin(m.phase * 2) * 0.01 * amp + 0.04 * m.sitK;
    m.rig.g.position.set(m.x, groundY(m.x, m.z) - 0.01 + Math.abs(Math.cos(m.phase)) * 0.025 * amp - 0.05 * m.sitK, m.z);
    m.rig.g.rotation.y = m.yaw;
  }

  function updateBot(dt: number) {
    const b = BO,
      wy = pondY(b.x, b.z);
    b.t -= dt;
    let speed = 0;
    if (b.state === "swim") {
      if (Math.hypot(b.tx - b.x, b.tz - b.z) < 0.2) {
        const a = rnd() * TAU,
          rr = Math.sqrt(rnd()) * 0.8;
        b.tx = PX + Math.cos(a) * rr;
        b.tz = PZ + Math.sin(a) * rr;
      }
      if (b.t <= 0) b.state = "toRock";
      speed = 0.22 * (0.5 + 0.5 * Math.max(0, Math.sin(b.phase)));
    } else if (b.state === "toRock") {
      b.tx = ROCK[0] - (ROCK[0] - PX) * 0.05;
      b.tz = ROCK[1] - (ROCK[1] - PZ) * 0.05;
      speed = 0.2 * (0.5 + 0.5 * Math.max(0, Math.sin(b.phase)));
      if (Math.hypot(b.tx - b.x, b.tz - b.z) < 0.12) {
        b.state = "bask";
        b.t = 9;
      }
    } else if (b.state === "bask") {
      if (b.t <= 0) {
        b.state = "swim";
        b.t = 20 + rnd() * 14;
        b.tx = PX;
        b.tz = PZ;
      }
    }
    if (b.state !== "bask") {
      b.yaw += clamp(adiff(b.yaw, yawTo(b.tx - b.x, b.tz - b.z)), -1.4 * dt, 1.4 * dt);
      const f = fwdOf(b.yaw);
      b.x += f[0] * speed * dt;
      b.z += f[1] * speed * dt;
      const d = Math.hypot(b.x - PX, b.z - PZ);
      if (d > PR - 0.3) {
        b.x = PX + ((b.x - PX) / d) * (PR - 0.3);
        b.z = PZ + ((b.z - PZ) / d) * (PR - 0.3);
      }
      b.phase += dt * 3.2;
    }
    const onRock = b.state === "bask" ? 1 : 0;
    b.y += ((onRock ? 0.13 : -0.02 + 0.02 * Math.sin(T * 1.3)) - b.y) * Math.min(1, dt * 2);
    const o = b.rig.o,
      st = b.state === "bask" ? 0.08 * Math.sin(T * 0.8) : 1;
    o.fl0.rotation.x = Math.sin(b.phase) * 0.55 * st;
    o.fl1.rotation.x = -Math.sin(b.phase) * 0.55 * st;
    o.fl0.rotation.y = Math.cos(b.phase) * 0.35 * st;
    o.fl1.rotation.y = -Math.cos(b.phase) * 0.35 * st;
    o.fl2.rotation.x = Math.sin(b.phase + 1) * 0.25 * st;
    o.fl3.rotation.x = -Math.sin(b.phase + 1) * 0.25 * st;
    o.rip.visible = !onRock;
    o.rip.scale.setScalar(1 + 0.08 * Math.sin(T * 2));
    b.rig.g.position.set(b.x, wy + b.y, b.z);
    b.rig.g.rotation.set(0, b.yaw, Math.sin(b.phase) * 0.04 * st);
  }

  function updateRabbits(dt: number, AV: AvatarView) {
    for (const r of RAB) {
      const dAv = Math.hypot(AV.x - r.x, AV.z - r.z);
      if (!r.flee && AV.run && dAv < 3.2) {
        r.flee = true;
        r.hops = 6;
        r.yaw = yawTo(r.x - AV.x, r.z - AV.z) + (rnd() - 0.5) * 0.6;
        r.state = "hops";
        r.hop = null;
      }
      r.t -= dt;
      if (r.state === "graze") {
        if (r.t <= 0) {
          r.state = "look";
          r.t = 1 + rnd() * 1.5;
        }
      } else if (r.state === "look") {
        if (r.t <= 0) {
          r.state = "hops";
          r.hops = 2 + Math.floor(rnd() * 4);
          r.yaw += (rnd() - 0.5) * 2.2;
        }
      }
      if (r.state === "hops" && !r.hop) {
        if (r.hops-- <= 0) {
          r.state = "graze";
          r.t = 3 + rnd() * 5;
          r.flee = false;
        } else {
          const L = r.flee ? 0.55 : 0.32;
          let f = fwdOf(r.yaw),
            tries = 0;
          while (!walkable(r.x + f[0] * L, r.z + f[1] * L) && tries++ < 6) {
            r.yaw += 1.1;
            f = fwdOf(r.yaw);
          }
          if (tries < 6) r.hop = { x0: r.x, z0: r.z, x1: r.x + f[0] * L, z1: r.z + f[1] * L, t: 0, dur: r.flee ? 0.26 : 0.34 };
          else r.hops = 0;
        }
      }
      let lift = 0,
        stretch = 1;
      if (r.hop) {
        const h = r.hop;
        h.t += dt / h.dur;
        const u = Math.min(1, h.t);
        const [nx, nz] = collide(h.x0 + (h.x1 - h.x0) * u, h.z0 + (h.z1 - h.z0) * u, 0.1);
        r.x = nx;
        r.z = nz;
        lift = Math.sin(Math.PI * u) * (r.flee ? 0.18 : 0.12);
        stretch = 1 + 0.25 * Math.sin(Math.PI * u);
        if (u >= 1) r.hop = null;
      }
      const pitch = r.state === "graze" ? -0.28 + 0.04 * Math.sin(T * 8 + r.x) : r.state === "look" ? 0.12 : r.hop ? 0.25 * Math.cos(Math.PI * r.hop.t) : 0;
      r.o.position.set(r.x, groundY(r.x, r.z) + lift, r.z);
      r.o.rotation.set(0, r.yaw, pitch);
      r.o.scale.set(1.6 * stretch, 1.6 / Math.sqrt(stretch), 1.6);
    }
  }

  function updateButterflies(dt: number) {
    BFS.forEach((b, i) => {
      const g = b.rig.g,
        o = b.rig.o;
      if (b.state === "fly") {
        const ty = H(b.tgt[0], b.tgt[1]) + 0.12,
          dx = b.tgt[0] - b.x,
          dz = b.tgt[1] - b.z,
          d = Math.hypot(dx, dz);
        const cruise = ty + 0.5 + 0.3 * Math.sin(T * 0.7 + i),
          wantY = d < 0.5 ? ty : cruise;
        b.yaw += clamp(adiff(b.yaw, yawTo(dx, dz)), -3 * dt, 3 * dt);
        const f = fwdOf(b.yaw),
          sp = d < 0.5 ? 0.45 : 1.1;
        b.x += f[0] * sp * dt + Math.sin(T * 5 + i) * 0.2 * dt;
        b.z += f[1] * sp * dt + Math.cos(T * 4.3 + i) * 0.2 * dt;
        b.y += (wantY - b.y) * Math.min(1, dt * 2) + Math.sin(T * 7 + i) * 0.25 * dt;
        if (d < 0.08 && Math.abs(b.y - ty) < 0.05) {
          b.state = "land";
          b.t = 3 + rnd() * 4;
        }
        const flap = 0.25 + 1.0 * Math.abs(Math.sin(T * 15 + i));
        o.wl.rotation.x = -flap;
        o.wr.rotation.x = flap;
      } else {
        b.t -= dt;
        const flap = 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(T * 1.6 + i));
        o.wl.rotation.x = -flap;
        o.wr.rotation.x = flap;
        if (b.t <= 0 && flowerSpots.length) {
          b.state = "fly";
          const c = flowerSpots.filter((f) => Math.hypot(f[0] - b.x, f[1] - b.z) < 6 && Math.hypot(f[0] - b.x, f[1] - b.z) > 1);
          b.tgt = c.length ? c[Math.floor(rnd() * c.length)] : flowerSpots[Math.floor(rnd() * flowerSpots.length)];
        }
      }
      g.position.set(b.x, b.y, b.z);
      g.rotation.y = b.yaw;
    });
  }

  function updateDragonflies(dt: number) {
    for (const d of DFS) {
      d.t -= dt;
      if (d.state === "hover") {
        d.o.position.set(d.x + Math.sin(T * 3 + d.t) * 0.03, d.y + Math.sin(T * 9) * 0.02, d.z + Math.cos(T * 2.6) * 0.03);
        if (d.t <= 0) {
          const useStream = rnd() < 0.4,
            p = useStream ? SPTS[Math.floor(rnd() * SPTS.length)] : null;
          const a = rnd() * TAU,
            rr = Math.sqrt(rnd()) * 1.6;
          d.tx = p ? p.x : PX + Math.cos(a) * rr;
          d.tz = p ? p.z : PZ + Math.sin(a) * rr;
          d.ty = (p ? H(p.x, p.z) : pondY(d.tx, d.tz)) + 0.35 + rnd() * 0.55;
          d.state = "dart";
          d.yaw = yawTo(d.tx - d.x, d.tz - d.z);
        }
      } else {
        const dx = d.tx - d.x,
          dy = d.ty - d.y,
          dz = d.tz - d.z,
          dist = Math.hypot(dx, dy, dz),
          sp = Math.min(dist, 5 * dt);
        d.x += (dx / (dist || 1)) * sp;
        d.y += (dy / (dist || 1)) * sp;
        d.z += (dz / (dist || 1)) * sp;
        d.o.position.set(d.x, d.y, d.z);
        if (dist < 0.05) {
          d.state = "hover";
          d.t = 0.5 + rnd() * 2;
        }
      }
      d.o.rotation.y = d.yaw;
    }
  }

  const goal = new THREE.Vector3(),
    tv = new THREE.Vector3(),
    sep = new THREE.Vector3(),
    ali = new THREE.Vector3(),
    coh = new THREE.Vector3();
  function updateBirds(dt: number) {
    const ga = T * 0.05;
    goal.set(Math.cos(ga) * 34, 10 + Math.sin(T * 0.13) * 2, Math.sin(ga * 1.3) * 26);
    for (const b of birds) {
      sep.set(0, 0, 0);
      ali.set(0, 0, 0);
      coh.set(0, 0, 0);
      let n = 0;
      for (const o of birds) {
        if (o === b) continue;
        const d = b.p.distanceTo(o.p);
        if (d < 4) {
          n++;
          ali.add(o.v);
          coh.add(o.p);
          if (d < 1.2) sep.add(tv.copy(b.p).sub(o.p).multiplyScalar(1 / (d * d + 0.05)));
        }
      }
      if (n) {
        ali.multiplyScalar(1 / n).sub(b.v).multiplyScalar(0.6);
        coh.multiplyScalar(1 / n).sub(b.p).multiplyScalar(0.35);
      }
      tv.copy(goal).sub(b.p).normalize().multiplyScalar(0.9);
      b.v.addScaledVector(sep, 2.2 * dt).addScaledVector(ali, dt).addScaledVector(coh, dt).addScaledVector(tv, dt);
      if (b.p.y < 7) b.v.y += dt * 2;
      const sp = b.v.length();
      b.v.multiplyScalar(clamp(sp, 2.4, 4.2) / (sp || 1));
      b.p.addScaledVector(b.v, dt);
    }
    const pa = birdObj.geometry.attributes.position as THREE.BufferAttribute;
    birds.forEach((b, i) => {
      const f = tv.copy(b.v).normalize(),
        sx = -f.z,
        sz = f.x,
        flap = Math.sin(T * 9 + i * 1.7) * 0.22;
      const base = i * BIRD_P;
      pa.setXYZ(base, b.p.x + f.x * 0.14, b.p.y + f.y * 0.14, b.p.z + f.z * 0.14);
      pa.setXYZ(base + 1, b.p.x, b.p.y, b.p.z);
      pa.setXYZ(base + 2, b.p.x - f.x * 0.14, b.p.y - f.y * 0.14, b.p.z - f.z * 0.14);
      for (const [k, s, w] of [
        [3, 1, 0.22],
        [4, 1, 0.42],
        [5, -1, 0.22],
        [6, -1, 0.42],
      ])
        pa.setXYZ(base + k, b.p.x + sx * s * w - f.x * 0.05, b.p.y + flap * (w / 0.42), b.p.z + sz * s * w - f.z * 0.05);
    });
    pa.needsUpdate = true;
  }

  return {
    /** Một bước mô phỏng; T là đồng hồ hoạt ảnh chung */
    update(dt: number, time: number, AV: AvatarView) {
      T = time;
      updateMochi(dt, AV);
      updateBot(dt);
      updateRabbits(dt, AV);
      updateButterflies(dt);
      updateDragonflies(dt);
      updateBirds(dt);
    },
    /** Vị trí hiện tại của một loài sinh vật (con đầu tiên nếu có nhiều con) */
    pos(id: string): THREE.Vector3 {
      if (id === "mochi") return MO.rig.g.position.clone();
      if (id === "bot") return BO.rig.g.position.clone();
      if (id === "tho") return RAB[0].o.position.clone();
      if (id === "buom") return BFS[0].rig.g.position.clone();
      if (id === "chuon") return DFS[0].o.position.clone();
      return birds[0].p.clone();
    },
    status(id: string) {
      if (id === "mochi") return MO_TXT[MO.state];
      if (id === "bot") return BO.state === "bask" ? "Nằm sưởi trên tảng đá giữa ao" : BO.state === "toRock" ? "Bơi về phía tảng đá" : "Quẫy chân chèo quanh ao";
      if (id === "tho") return RAB.some((r) => r.flee) ? "Nhảy vụt đi vì giật mình" : "Gặm cỏ, thỉnh thoảng nhảy vài bước";
      if (id === "buom") return "Bay từ khóm hoa này sang khóm hoa khác";
      if (id === "chuon") return "Lơ lửng rồi lao vút trên mặt ao";
      return "Bay thành đàn ngang trời";
    },
    /** Sinh vật có thể chạm chọn: [id, vị trí, độ cao điểm neo] */
    pickables(): [string, THREE.Vector3, number][] {
      return [
        ["mochi", MO.rig.g.position, 0.4],
        ["bot", BO.rig.g.position, 0.2],
        ...RAB.map((r): [string, THREE.Vector3, number] => ["tho", r.o.position, 0.2]),
        ...BFS.map((b): [string, THREE.Vector3, number] => ["buom", b.rig.g.position, 0]),
        ...DFS.map((d): [string, THREE.Vector3, number] => ["chuon", d.o.position, 0]),
      ];
    },
    /** Sinh vật ở gần Lữ khách để hiện gợi ý tương tác */
    nearbyables(): [string, THREE.Vector3][] {
      return [["mochi", MO.rig.g.position], ["bot", BO.rig.g.position], ...RAB.map((r): [string, THREE.Vector3] => ["tho", r.o.position]), ...BFS.map((b): [string, THREE.Vector3] => ["buom", b.rig.g.position])];
    },
  };
}

export type Fauna = ReturnType<typeof createFauna>;
