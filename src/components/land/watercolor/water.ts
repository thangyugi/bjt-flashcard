/** Nước màu nước: sông/suối chảy theo uv.y, thác (uFall), hồ; ruy-băng dọc theo đường */
import * as THREE from "three";
import type { WcUniforms } from "./materials";

export interface WaterOpts {
  speed: number;
  fall?: number;
  vScale?: number;
  deep?: string;
  shallow?: string;
}
export function waterMat(U: WcUniforms, tex: THREE.Texture, o: WaterOpts) {
  const m = new THREE.ShaderMaterial({
    uniforms: {
      uTime: U.time,
      uTex: { value: tex },
      uSpeed: { value: o.speed },
      uFall: { value: o.fall ?? 0 },
      uVS: { value: o.vScale ?? 1 },
      uDeep: { value: new THREE.Color(o.deep ?? "#2f8fd6") },
      uShallow: { value: new THREE.Color(o.shallow ?? "#8fd3f4") },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform float uTime, uSpeed, uFall, uVS; uniform sampler2D uTex; uniform vec3 uDeep, uShallow; varying vec2 vUv;
      void main(){
        float fl = uTime*uSpeed;
        float edge = abs(vUv.x-0.5)*2.0;
        vec3 col;
        if (uFall < 0.5) {
          vec4 t1 = texture2D(uTex, vec2(vUv.x, vUv.y*0.5 - fl));
          vec4 t2 = texture2D(uTex, vec2(vUv.x*1.4+0.37, vUv.y*0.62 - fl*1.37));
          vec4 t3 = texture2D(uTex, vec2(vUv.x*0.6+0.11, vUv.y*0.2 - fl*0.5));
          col = mix(uDeep, uShallow, clamp(smoothstep(0.25,1.0,edge)*0.65 + (t3.b-0.5)*0.6 + 0.15, 0.0, 1.0));
          float streak = t1.r*0.62 + t2.g*0.5;
          col = mix(col, vec3(0.97,0.99,1.0), smoothstep(0.70, 0.84, streak)*0.75);
          col = mix(col, uDeep*0.7, smoothstep(0.35, 0.2, streak)*0.25);
          col = mix(col, vec3(1.0), smoothstep(0.8, 0.96, edge + (t2.r-0.5)*0.18)*0.85);
        } else {
          float v = vUv.y * uVS;
          vec4 t1 = texture2D(uTex, vec2(vUv.x*2.6, v*0.10 - fl));
          vec4 t2 = texture2D(uTex, vec2(vUv.x*4.1+0.3, v*0.16 - fl*1.3));
          float streak = t1.r*0.6 + t2.g*0.5;
          col = mix(uDeep*0.9, uShallow, 0.35 + 0.4*t1.b);
          col = mix(col, vec3(0.98,0.99,1.0), smoothstep(0.5, 0.68, streak)*0.9);
          col = mix(col, uDeep*0.65, smoothstep(0.3, 0.15, streak)*0.4);
          float lip = 1.0 - smoothstep(0.0, 0.12 + 0.06*t2.r, vUv.y);
          float base = smoothstep(0.78 - 0.08*t1.r, 1.0, vUv.y);
          col = mix(col, vec3(1.0), max(lip, base)*0.92);
          col = mix(col, vec3(1.0), smoothstep(0.82, 0.97, edge + (t1.g-0.5)*0.25)*0.7);
        }
        col *= 1.0 - 0.28*smoothstep(0.9, 1.0, edge);
        gl_FragColor = vec4(col, 1.0);
      }`,
    side: THREE.DoubleSide,
  });
  return m;
}

/** Ruy-băng nước dọc đường {x, z, w, y}: bề rộng vuông góc với hướng chảy, uv.y = độ dài cung / vs */
export function ribbon(pts: { x: number; z: number; w: number; y: number }[], mat: THREE.Material, vs = 3.2, C = 6, xOffset = false) {
  const pos: number[] = [],
    uv: number[] = [],
    idx: number[] = [];
  let arc = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i],
      a = pts[Math.max(0, i - 1)],
      b = pts[Math.min(pts.length - 1, i + 1)];
    let tx = b.x - a.x,
      tz = b.z - a.z;
    const L = Math.hypot(tx, tz) || 1;
    tx /= L;
    tz /= L;
    if (i) arc += Math.hypot(p.x - pts[i - 1].x, p.z - pts[i - 1].z);
    for (let c = 0; c <= C; c++) {
      const u = c / C,
        o = (u - 0.5) * 2 * p.w;
      if (xOffset) pos.push(p.x + o, p.y, p.z);
      else pos.push(p.x - tz * o, p.y, p.z + tx * o);
      uv.push(u, arc / vs);
    }
  }
  for (let i = 0; i < pts.length - 1; i++)
    for (let c = 0; c < C; c++) {
      const a = i * (C + 1) + c,
        b = (i + 1) * (C + 1) + c;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return new THREE.Mesh(g, mat);
}

/** Lưới thác: hàm vị trí theo (u ngang 0..1, t dọc 0..1) */
export function fallSheet(at: (u: number, t: number) => [number, number, number], mat: THREE.Material, C = 10, Rr = 22) {
  const pos: number[] = [],
    uv: number[] = [],
    idx: number[] = [];
  for (let r = 0; r <= Rr; r++)
    for (let c = 0; c <= C; c++) {
      const u = c / C,
        t = r / Rr;
      pos.push(...at(u, t));
      uv.push(u, t);
    }
  for (let r = 0; r < Rr; r++)
    for (let c = 0; c < C; c++) {
      const a = r * (C + 1) + c,
        b = (r + 1) * (C + 1) + c;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return new THREE.Mesh(g, mat);
}
