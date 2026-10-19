/**
 * Shader đám chấm dùng chung (mọc dần, đung đưa, sương mù, sáng ban đêm…) và tiện ích tạo THREE.Points.
 */
import * as THREE from "three";
import type { PB, Rand } from "./math";

export interface Uniforms {
  uTime: THREE.IUniform<number>;
  uPx: THREE.IUniform<number>;
  uSwayAmp: THREE.IUniform<number>;
  uTint: THREE.IUniform<THREE.Vector3>;
  uGlowBoost: THREE.IUniform<number>;
  uNight: THREE.IUniform<number>;
  uFogColor: THREE.IUniform<THREE.Vector3>;
  uCut: THREE.IUniform<THREE.Vector3>;
  uCutOn: THREE.IUniform<number>;
  uFogNear: THREE.IUniform<number>;
  uFogFar: THREE.IUniform<number>;
  uSkyRef: THREE.IUniform<THREE.Vector3>;
}

export const createUniforms = (reduced: boolean): Uniforms => ({
  uTime: { value: 0 },
  uPx: { value: 800 },
  uSwayAmp: { value: reduced ? 0 : 1 },
  uTint: { value: new THREE.Vector3(1, 1, 1) },
  uGlowBoost: { value: 0.2 },
  uNight: { value: 0 },
  uFogColor: { value: new THREE.Vector3(0.7, 0.75, 0.8) },
  uCut: { value: new THREE.Vector3() },
  uCutOn: { value: 0 },
  uFogNear: { value: 38 },
  uFogFar: { value: 240 },
  uSkyRef: { value: new THREE.Vector3(0.5, 0.7, 0.8) },
});

/** Ngữ cảnh dựng cảnh, truyền qua các module (thay cho biến toàn cục của bản mẫu) */
export interface Ctx {
  scene: THREE.Scene;
  U: Uniforms;
  /** Mật độ chấm của đất (giảm trên màn nhỏ) */
  D: number;
  /** Mật độ chấm của cây & sinh vật */
  DP: number;
  small: boolean;
  reduced: boolean;
  /** Bộ ngẫu nhiên chung của thế giới (hạt giống cố định) */
  R: Rand;
  total: number;
}

const VERT = /* glsl */ `
uniform float uTime; uniform float uGrowth; uniform float uPx; uniform float uSwayAmp; uniform float uUseY; uniform float uSize;
uniform vec3 uTint; uniform float uGlowBoost; uniform float uNight; uniform float uLit; uniform vec3 uCut; uniform float uCutOn; uniform float uFogAmt; uniform vec3 uFogColor; uniform float uFogNear; uniform float uFogFar; uniform vec3 uSkyRef;
attribute vec3 aColor; attribute float aSize; attribute float aT; attribute float aSway; attribute float aGlow; attribute float aPhase;
varying vec3 vColor; varying float vAlpha; varying float vGlow;
void main(){
  float k = clamp((uGrowth * 1.16 - aT) / 0.16, 0.0, 1.0);
  k = k * k * (3.0 - 2.0 * k);
  vec3 p = mix(vec3(position.x * 0.06, position.y * 0.03, position.z * 0.06), position, k);
  float al = 1.0;
#ifdef DRIFT
  p += vec3(sin(uTime * 0.31 + aPhase * 1.7), sin(uTime * 0.53 + aPhase) * 0.6, cos(uTime * 0.27 + aPhase * 2.3)) * aSway;
#endif
#ifdef FALL
  float f = fract(uTime * (0.03 + 0.04 * aSway) + aPhase);
  vec2 o = normalize(position.xz + 0.0001);
  p.xz += o * f * 1.8; p.y -= f * f * 14.0;
  al = (1.0 - f) * smoothstep(0.0, 0.08, f);
#endif
#ifdef CASCADE
  float f = fract(uTime * (0.2 + 0.1 * aSway) + aPhase);
  vec2 o = normalize(position.xz + 0.0001);
  p.xz += o * (f * 0.9 + f * f * 0.9); p.y -= f * f * 14.6 + f * 0.9;
  al = 1.0 - smoothstep(0.86, 1.0, f);
#endif
#ifdef PETAL
  float f = fract(uTime * 0.045 + aPhase);
  p.y -= f * aSway;
  p.x += sin(uTime * 1.3 + aPhase * 20.0) * 0.18 * f + f * 0.5;
  p.z += cos(uTime * 1.1 + aPhase * 13.0) * 0.15 * f + f * 0.2;
  al = smoothstep(0.0, 0.04, f) * (1.0 - smoothstep(0.86, 1.0, f));
#endif
  vec4 wp = modelMatrix * vec4(p, 1.0);
#if !defined(DRIFT) && !defined(FALL) && !defined(CASCADE) && !defined(PETAL)
  float h = aSway * mix(1.0, max(p.y, 0.0), uUseY) * uSwayAmp;
  float w = sin(uTime * 1.4 + wp.x * 0.7 + wp.z * 0.5) + 0.45 * sin(uTime * 2.3 + wp.z * 1.3 - wp.x * 0.4);
  wp.x += w * 0.03 * h; wp.z += w * 0.02 * h;
#endif
  if (uCutOn > 0.5){
    vec3 ca = uCut - cameraPosition; float L = length(ca); vec3 dir = ca / L; vec3 cp = wp.xyz - cameraPosition; float t = dot(cp, dir);
    if (t > 0.0 && t < L - 0.55 && length(cp - dir * t) < 0.75 * (0.35 + 0.65 * t / L) + 0.12) al = 0.0;
  }
  vec4 mv = viewMatrix * wp;
  gl_Position = projectionMatrix * mv;
#ifdef FLOW
  float tw = 1.0 + aGlow * 0.6 * sin(aPhase - uTime * 2.4);
#else
  float tw = 1.0 + aGlow * 0.4 * sin(uTime * 2.2 + aPhase);
#endif
  vec3 col = aColor * mix(vec3(1.0), uTint, uLit) + aColor * aGlow * uGlowBoost;
#ifdef WINDOWS
  if (aGlow > 0.5){
    float blink = step(0.04, fract(sin(floor(uTime * 0.35 + aPhase * 7.0) * 12.9898 + aPhase * 78.233) * 43758.5453));
    col = mix(vec3(0.42, 0.5, 0.6) * uTint, aColor * (0.55 + 0.65 * blink), uNight);
  }
  tw = 1.0;
#endif
#ifdef REFLECT
  col = uSkyRef * (0.7 + 0.45 * aColor.g) + aColor * 0.06 * (1.0 + uNight);
#endif
  col *= tw;
  float dist = -mv.z;
  vColor = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, dist) * uFogAmt);
  gl_PointSize = clamp(aSize * uSize * uPx / max(dist, 0.1) * (0.3 + 0.7 * k), 1.0, 72.0);
  vAlpha = k * al; vGlow = aGlow * (0.3 + uGlowBoost);
}`;

const FRAG = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor; varying float vAlpha; varying float vGlow;
void main(){
  vec2 c = gl_PointCoord - 0.5; float d = length(c) * 2.0;
#ifdef SOLID
  if (d > 0.86 || vAlpha < 0.5) discard;
  gl_FragColor = vec4(vColor * (1.0 + vGlow * 0.35 * (1.0 - d)), 1.0);
#else
  if (d > 1.0) discard;
  float a = smoothstep(1.0, 0.4, d) * vAlpha * uOpacity;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor * (1.0 + vGlow * 0.45 * (1.0 - d)), a);
#endif
}`;

export interface MatOpts {
  add?: boolean;
  solid?: boolean;
  useY?: number;
  size?: number;
  growth?: number;
  defines?: Record<string, string>;
  opacity?: number;
  lit?: number;
  fog?: number;
}

export type DotMaterial = THREE.ShaderMaterial;
export type Dots = THREE.Points<THREE.BufferGeometry, DotMaterial>;

function mkMat(U: Uniforms, { add = false, solid = false, useY = 0, size = 1, growth = 1, defines = {}, opacity = 1, lit = 1, fog = 1 }: MatOpts = {}): DotMaterial {
  const defs: Record<string, string> = { ...defines };
  if (solid) defs.SOLID = "";
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: U.uTime,
      uPx: U.uPx,
      uSwayAmp: U.uSwayAmp,
      uTint: U.uTint,
      uGlowBoost: U.uGlowBoost,
      uNight: U.uNight,
      uFogColor: U.uFogColor,
      uFogNear: U.uFogNear,
      uFogFar: U.uFogFar,
      uSkyRef: U.uSkyRef,
      uCut: U.uCut,
      uCutOn: U.uCutOn,
      uGrowth: { value: growth },
      uUseY: { value: useY },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uLit: { value: lit },
      uFogAmt: { value: fog },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: !solid,
    depthWrite: solid,
    blending: add ? THREE.AdditiveBlending : THREE.NormalBlending,
    defines: defs,
  });
}

/** Vật liệu cho lưới tam giác (vách đá, nền đồng bằng) — chỉ tô màu đỉnh + sương mù */
export function meshMat(U: Uniforms) {
  return new THREE.ShaderMaterial({
    uniforms: { uTint: U.uTint, uFogColor: U.uFogColor, uFogNear: U.uFogNear, uFogFar: U.uFogFar },
    vertexShader: /* glsl */ `uniform vec3 uTint; uniform vec3 uFogColor; uniform float uFogNear; uniform float uFogFar; attribute vec3 aColor; varying vec3 vC;
    void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; vC = mix(aColor * uTint, uFogColor, smoothstep(uFogNear, uFogFar, -mv.z) * 0.92); }`,
    fragmentShader: /* glsl */ `varying vec3 vC; void main(){ gl_FragColor = vec4(vC, 1.0); }`,
    side: THREE.DoubleSide,
  });
}

export function pointsGeometry(b: PB) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(b.P, 3));
  g.setAttribute("aColor", new THREE.Float32BufferAttribute(b.C, 3));
  g.setAttribute("aSize", new THREE.Float32BufferAttribute(b.S, 1));
  g.setAttribute("aT", new THREE.Float32BufferAttribute(b.T, 1));
  g.setAttribute("aSway", new THREE.Float32BufferAttribute(b.W, 1));
  g.setAttribute("aGlow", new THREE.Float32BufferAttribute(b.G, 1));
  g.setAttribute("aPhase", new THREE.Float32BufferAttribute(b.H, 1));
  g.computeBoundingSphere();
  return g;
}

/** Tạo THREE.Points từ đám chấm và gắn vào cảnh (hoặc vào nhóm cha) */
export function addPoints(ctx: Ctx, b: PB, opts: MatOpts, order = 0, parent: THREE.Object3D = ctx.scene): Dots {
  const o = new THREE.Points(pointsGeometry(b), mkMat(ctx.U, opts));
  o.renderOrder = order;
  parent.add(o);
  ctx.total += b.n;
  return o;
}

/** Giải phóng geometry + material của một nhánh cảnh (gọi khi bỏ cây / tháo engine) */
export function disposeTree(root: THREE.Object3D) {
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
    else mat?.dispose();
  });
}
