/**
 * Lữ khách — nhân vật của người học: đi bằng WASD / phím mũi tên, cần điều khiển cảm ứng, hoặc chạm mặt đất để đi tới.
 */
import * as THREE from "three";
import { avatarParts } from "./creatures";
import { adiff, buildRig, fwdOf, stepBody, yawTo, type Collide } from "./fauna";
import { PB, TAU, clamp, hx, mix, mulberry32 } from "./math";
import { addPoints, type Ctx } from "./render";
import { groundY, type Obstacle } from "./world";

export interface MoveInput {
  keys: Set<string>;
  joy: { x: number; y: number };
  /** Đang ở chế độ đi dạo */
  walk: boolean;
}

export function createAvatar(ctx: Ctx, collide: Collide, obstacles: () => Obstacle[]) {
  const { DP, R } = ctx;
  const rnd = mulberry32(4343);
  const AV = {
    rig: buildRig(ctx, avatarParts(mulberry32(808), DP), 1.55, 2),
    x: 0.95,
    z: 6.7,
    yaw: Math.PI / 2,
    speed: 0,
    phase: 0,
    target: null as null | [number, number],
    run: false,
    stuck: 0,
  };
  // bụi dưới chân khi chạy
  const NDUST = 60,
    dust: { life: number; x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];
  const db = new PB(R);
  for (let i = 0; i < NDUST; i++) {
    db.add(0, -999, 0, mix(hx("#d9c39a"), hx("#b89a74"), R()), 0, 0, 0, 0);
    dust.push({ life: 0, x: 0, y: -999, z: 0, vx: 0, vy: 0, vz: 0 });
  }
  const dustObj = addPoints(ctx, db, {}, 4);
  dustObj.frustumCulled = false;
  let dustI = 0;
  // vòng đánh dấu điểm đến khi chạm để đi
  const mk = new PB(R);
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * TAU;
    mk.add(Math.cos(a) * 0.28, 0.04, Math.sin(a) * 0.28, hx("#fff2cf"), 0.05, 0, 0, 0.8);
  }
  const marker = addPoints(ctx, mk, { add: true, lit: 0, opacity: 0 }, 4);
  const markerOpacity = marker.material.uniforms.uOpacity;

  const cf = new THREE.Vector3();

  function update(dt: number, T: number, input: MoveInput, camera: THREE.Camera) {
    const { keys, joy } = input;
    let mx = 0,
      mz = 0;
    if (input.walk || keys.size || joy.x || joy.y) {
      camera.getWorldDirection(cf);
      cf.y = 0;
      cf.normalize();
      const cr = [-cf.z, cf.x];
      const f = (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) - (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0) - joy.y;
      const s = (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) - (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0) + joy.x;
      mx = cf.x * f + cr[0] * s;
      mz = cf.z * f + cr[1] * s;
    }
    let run = keys.has("Shift") || Math.hypot(joy.x, joy.y) > 0.9;
    if (Math.hypot(mx, mz) < 0.05 && AV.target) {
      const dx = AV.target[0] - AV.x,
        dz = AV.target[1] - AV.z,
        d = Math.hypot(dx, dz);
      if (d < 0.12) {
        AV.target = null;
        markerOpacity.value = 0;
      } else {
        mx = dx / d;
        mz = dz / d;
        run = d > 4;
        const bx = mx,
          bz = mz;
        for (const o of obstacles()) {
          const ox = o.x - AV.x,
            oz = o.z - AV.z,
            od = Math.hypot(ox, oz);
          if (od < o.r + 0.9 && ox * bx + oz * bz > 0) {
            const side = Math.sign(ox * bz - oz * bx) || 1;
            const k = (o.r + 0.9 - od) / 0.9;
            mx += bz * side * k * 1.4;
            mz += -bx * side * k * 1.4;
          }
        }
        const l = Math.hypot(mx, mz);
        mx /= l;
        mz /= l;
      }
    }
    const l = Math.hypot(mx, mz),
      want = l > 0.05 ? (run ? 3.3 : 1.6) * Math.min(1, l) : 0;
    AV.speed += (want - AV.speed) * Math.min(1, dt * 8);
    AV.run = AV.speed > 2.4;
    if (l > 0.05) AV.yaw += adiff(AV.yaw, yawTo(mx, mz)) * Math.min(1, dt * 10);
    if (AV.speed > 0.02) {
      const f = fwdOf(AV.yaw),
        ok = stepBody(AV, AV.x + f[0] * AV.speed * dt, AV.z + f[1] * AV.speed * dt, 0.16, collide);
      if (!ok) {
        AV.speed *= 0.3;
        if (AV.target && (AV.stuck += dt) > 1.2) {
          AV.target = null;
          markerOpacity.value = 0;
        }
      }
    }
    AV.phase += AV.speed * dt * 5.2;
    const amp = clamp(AV.speed / 1.6, 0, 1.25) * 0.55,
      sw = Math.sin(AV.phase),
      o = AV.rig.o,
      g = AV.rig.g;
    o.legL.rotation.z = sw * amp;
    o.legR.rotation.z = -sw * amp;
    o.armL.rotation.z = -sw * amp * 0.85;
    o.armR.rotation.z = sw * amp * 0.85;
    o.armL.rotation.x = -0.12;
    o.armR.rotation.x = 0.12;
    o.body.rotation.z = -AV.speed * 0.045;
    o.body.position.y = Math.abs(Math.cos(AV.phase)) * 0.022 * amp + (AV.speed < 0.05 ? Math.sin(T * 2) * 0.003 : 0);
    o.scarf.rotation.y = Math.sin(T * 3 + AV.phase) * 0.25 * (0.3 + amp);
    o.scarf.rotation.z = 0.15 + AV.speed * 0.12;
    g.position.set(AV.x, groundY(AV.x, AV.z) - 0.01, AV.z);
    g.rotation.y = AV.yaw;
    if (AV.run && rnd() < dt * 40) {
      const p = dust[(dustI = (dustI + 1) % NDUST)];
      const f = fwdOf(AV.yaw);
      p.life = 1;
      p.x = AV.x - f[0] * 0.12 + (rnd() - 0.5) * 0.1;
      p.z = AV.z - f[1] * 0.12 + (rnd() - 0.5) * 0.1;
      p.y = groundY(AV.x, AV.z) + 0.03;
      p.vx = -f[0] * 0.3 + (rnd() - 0.5) * 0.3;
      p.vz = -f[1] * 0.3 + (rnd() - 0.5) * 0.3;
      p.vy = 0.3 + rnd() * 0.3;
    }
    const pa = dustObj.geometry.attributes.position as THREE.BufferAttribute,
      sa = dustObj.geometry.attributes.aSize as THREE.BufferAttribute;
    for (let i = 0; i < NDUST; i++) {
      const p = dust[i];
      if (p.life > 0) {
        p.life -= dt * 1.6;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.vy -= dt * 0.6;
      }
      pa.setXYZ(i, p.x, p.life > 0 ? p.y : -999, p.z);
      sa.setX(i, Math.max(0, p.life) * 0.07);
    }
    pa.needsUpdate = true;
    sa.needsUpdate = true;
    markerOpacity.value *= AV.target ? 1 : 0.9;
  }

  /** Đặt điểm đến (chạm mặt đất ở chế độ đi dạo) */
  function walkTo(x: number, z: number) {
    AV.target = [x, z];
    AV.stuck = 0;
    marker.position.set(x, groundY(x, z), z);
    markerOpacity.value = 1;
  }

  return { AV, update, walkTo };
}

export type Avatar = ReturnType<typeof createAvatar>;
