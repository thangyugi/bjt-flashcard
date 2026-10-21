/**
 * Chất liệu màu nước: MeshToon + tô lại 3 dải (bóng xanh lạnh / sáng ấm), nhiễu sắc tố, viền loang, đung đưa theo gió.
 */
import * as THREE from "three";

/** Đồng hồ + cường độ gió dùng chung cho mọi chất liệu của một thế giới */
export interface WcUniforms {
  time: { value: number };
  /** 0 khi giảm chuyển động */
  sway: { value: number };
}
export const createUniforms = (): WcUniforms => ({ time: { value: 3 }, sway: { value: 1 } });

/** Sắc độ tô của từng bản đồ (khác nhau rất nhẹ giữa các bản mẫu) */
export interface Tint {
  shadow: [number, number, number];
  mid: [number, number, number];
  lit: [number, number, number];
  /** biên độ nhiễu sắc tố lớn */
  n1: number;
  /** viền tối theo góc nhìn */
  fres: number;
}
export const TINT_A: Tint = { shadow: [0.55, 0.6, 0.82], mid: [0.92, 0.92, 0.95], lit: [1.1, 1.05, 0.92], n1: 0.24, fres: 0.32 };
export const TINT_B: Tint = { shadow: [0.58, 0.63, 0.84], mid: [0.93, 0.93, 0.96], lit: [1.1, 1.05, 0.93], n1: 0.2, fres: 0.3 };

const v3 = (a: number[]) => `vec3(${a.map((x) => x.toFixed(3)).join(",")})`;

const RAMP = (() => {
  const d = new Uint8Array(256 * 4);
  for (let i = 0; i < 256; i++) {
    d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = i;
    d[i * 4 + 3] = 255;
  }
  const t = new THREE.DataTexture(d, 256, 1);
  t.minFilter = t.magFilter = THREE.LinearFilter;
  t.needsUpdate = true;
  return t;
})();

export const GLSL_NOISE = `
float wc_h3(vec3 p){ p = fract(p*0.3183099+0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float wc_vn(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(wc_h3(i),wc_h3(i+vec3(1,0,0)),f.x), mix(wc_h3(i+vec3(0,1,0)),wc_h3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(wc_h3(i+vec3(0,0,1)),wc_h3(i+vec3(1,0,1)),f.x), mix(wc_h3(i+vec3(0,1,1)),wc_h3(i+vec3(1,1,1)),f.x),f.y), f.z); }
`;

/**
 * Đung đưa: "attr" — hình đã gộp (cây) mang thuộc tính aSway = (gốc x, gốc y, gốc z, biên độ);
 * "inst" — InstancedMesh (cỏ, hoa), lấy gốc từ instanceMatrix.
 */
export type SwayMode = "attr" | "inst" | null;
export const SWAY_VERTEX = `{
  vec3 sp = aSway.xyz; float sa = aSway.w * uSway;
  float h = max(transformed.y - sp.y, 0.0);
  transformed.x += sin(uTime*1.7 + sp.x*0.7 + sp.z*0.45) * sa * h;
  transformed.z += cos(uTime*1.3 + sp.x*0.4 + sp.z*0.8) * sa * 0.6 * h;
}`;

export interface PaintOpts {
  color?: string;
  map?: THREE.Texture | null;
  vertexColors?: boolean;
  side?: THREE.Side;
  emissive?: string | null;
  sway?: SwayMode;
  /** biên độ cho sway "inst" */
  swayAmp?: number;
}

export function paintMat(U: WcUniforms, tint: Tint, o: PaintOpts = {}) {
  const { color = "#ffffff", map = null, vertexColors = false, side = THREE.FrontSide, emissive = null, sway = null, swayAmp = 0.12 } = o;
  const m = new THREE.MeshToonMaterial({ color: new THREE.Color(color), map, vertexColors, gradientMap: RAMP, side });
  if (emissive) m.emissive = new THREE.Color(emissive);
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.time;
    sh.uniforms.uSway = U.sway;
    let swayCode = "";
    if (sway === "attr") swayCode = SWAY_VERTEX;
    else if (sway === "inst")
      swayCode = `{ vec3 ip = vec3(0.0);
          #ifdef USE_INSTANCING
            ip = instanceMatrix[3].xyz;
          #endif
          float h = max(position.y, 0.0);
          transformed.x += sin(uTime*1.8 + ip.x*0.7 + ip.z*0.45) * ${swayAmp.toFixed(3)} * uSway * h;
          transformed.z += cos(uTime*1.3 + ip.x*0.4 + ip.z*0.8) * ${(swayAmp * 0.5).toFixed(3)} * uSway * h; }`;
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", `#include <common>\nvarying vec3 vWcPos;\nuniform float uTime, uSway;\n${sway === "attr" ? "attribute vec4 aSway;" : ""}`)
      .replace("#include <begin_vertex>", `#include <begin_vertex>\n${swayCode}`)
      .replace(
        "#include <project_vertex>",
        `#include <project_vertex>
        { vec4 wcp = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            wcp = instanceMatrix * wcp;
          #endif
          vWcPos = (modelMatrix * wcp).xyz; }`
      );
    sh.fragmentShader = sh.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vWcPos;\n" + GLSL_NOISE).replace(
      "#include <opaque_fragment>",
      `
      {
        vec3 base = diffuseColor.rgb;
        float lb = max(dot(base, vec3(0.299,0.587,0.114)), 1e-3);
        float s = dot(outgoingLight, vec3(0.299,0.587,0.114)) / lb;
        float b1 = smoothstep(0.60, 0.70, s);
        float b2 = smoothstep(0.98, 1.08, s);
        vec3 shadowC = base * ${v3(tint.shadow)};
        vec3 midC = base * ${v3(tint.mid)};
        vec3 litC = base * ${v3(tint.lit)};
        vec3 c = mix(shadowC, midC, b1);
        c = mix(c, litC, b2);
        float pool = (1.0 - abs(b1*2.0-1.0)) + (1.0 - abs(b2*2.0-1.0));
        c *= 1.0 - 0.12*pool;
        float n1 = wc_vn(vWcPos*0.45);
        float n2 = wc_vn(vWcPos*2.3 + 7.3);
        c *= ${(1 - tint.n1 / 2).toFixed(3)} + ${tint.n1.toFixed(3)}*n1;
        c *= 0.95 + 0.10*n2;
        c += (vec3(n2, n1, 1.0-n2) - 0.5) * 0.04 * lb;
        vec3 vd = normalize(vViewPosition);
        float fr = 1.0 - abs(dot(normalize(normal), vd));
        c *= 1.0 - ${tint.fres.toFixed(3)}*smoothstep(0.45, 1.0, fr);
        ${emissive ? "c += totalEmissiveRadiance;" : ""}
        outgoingLight = c;
      }
      #include <opaque_fragment>`
    );
  };
  const key = `wc${tint.n1}${emissive ? "e" : ""}${sway ?? ""}${sway === "inst" ? swayAmp : ""}`;
  m.customProgramCacheKey = () => key;
  return m;
}

/** Bộ chất liệu của một thế giới: các khoá tên (prop, wood, leaf…) ánh xạ tới kết cấu, có biến thể đung đưa */
export class MaterialKit {
  private cache = new Map<string, THREE.Material>();
  constructor(
    readonly U: WcUniforms,
    readonly tint: Tint,
    private defs: Record<string, PaintOpts | (() => THREE.Material)>,
    private grain: THREE.Texture,
    private furTex: THREE.Texture
  ) {}
  /** Chất liệu theo khoá (sway = biến thể dùng aSway) */
  get(key: string, sway = false): THREE.Material {
    const k = key + (sway ? "~s" : "");
    let m = this.cache.get(k);
    if (!m) {
      const d = this.defs[key];
      if (!d) throw new Error("unknown material " + key);
      m = typeof d === "function" ? d() : paintMat(this.U, this.tint, { ...d, sway: sway ? "attr" : null });
      this.cache.set(k, m);
    }
    return m;
  }
  paint(o: PaintOpts) {
    return paintMat(this.U, this.tint, o);
  }
  solid(c: string) {
    const k = "solid" + c;
    let m = this.cache.get(k);
    if (!m) this.cache.set(k, (m = paintMat(this.U, this.tint, { color: c, map: this.grain })));
    return m;
  }
  fur(c: string) {
    const k = "fur" + c;
    let m = this.cache.get(k);
    if (!m) this.cache.set(k, (m = paintMat(this.U, this.tint, { color: c, map: this.furTex })));
    return m;
  }
}
