/**
 * Hậu kỳ màu nước: nét mực từ pháp tuyến + độ sâu (lượt riêng, nửa độ phân giải trên màn dày), giấy, viền tối góc.
 */
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { WcUniforms } from "./materials";

export interface InkStyle {
  lap: [number, number];
  jump: [number, number];
  wMax: number;
  halo: number;
  mix: number;
}
export interface PaperStyle {
  vign: [number, number];
  vAxis: [number, number];
  tint: [number, number, number];
  grain: number;
  blot: [number, number];
  wash: number;
}
export const INK_A: InkStyle = { lap: [0.008, 0.022], jump: [0.02, 0.045], wMax: 2.3, halo: 0.13, mix: 0.9 };
export const INK_B: InkStyle = { lap: [0.008, 0.022], jump: [0.02, 0.045], wMax: 2.2, halo: 0.12, mix: 0.88 };
export const INK_C: InkStyle = { lap: [0.006, 0.018], jump: [0.014, 0.034], wMax: 2.2, halo: 0.12, mix: 0.88 };
export const PAPER_A: PaperStyle = { vign: [1.05, 0.38], vAxis: [0.8, 1], tint: [0.74, 0.62, 0.5], grain: 0.55, blot: [0.94, 0.12], wash: 0.05 };
export const PAPER_B: PaperStyle = { vign: [1.15, 0.45], vAxis: [0.75, 1], tint: [0.78, 0.68, 0.56], grain: 0.5, blot: [0.95, 0.1], wash: 0.04 };
export const PAPER_C: PaperStyle = { vign: [1.15, 0.45], vAxis: [0.75, 0.95], tint: [0.8, 0.7, 0.58], grain: 0.5, blot: [0.95, 0.1], wash: 0.04 };

const VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;

export class InkPost {
  readonly composer: EffectComposer;
  private nrt: THREE.WebGLRenderTarget;
  private ink: ShaderPass;
  private paper: ShaderPass;
  private normalMat: THREE.ShaderMaterial;
  private renderPass: RenderPass;
  constructor(
    private renderer: THREE.WebGLRenderer,
    private scene: THREE.Scene,
    private camera: THREE.PerspectiveCamera,
    paperTex: THREE.Texture,
    U: WcUniforms,
    ink: InkStyle,
    paper: PaperStyle
  ) {
    // Pháp tuyến cho lượt nét mực — cùng công thức đung đưa với cây để nét không lệch tán
    this.normalMat = new THREE.ShaderMaterial({
      uniforms: { uTime: U.time, uSway: U.sway },
      vertexShader: `#include <common>
        attribute vec4 aSway; uniform float uTime, uSway;
        varying vec3 vN;
        void main(){
          #include <beginnormal_vertex>
          #include <defaultnormal_vertex>
          #include <begin_vertex>
          {
            vec3 sp = aSway.xyz; float sa = aSway.w * uSway;
            float h = max(transformed.y - sp.y, 0.0);
            transformed.x += sin(uTime*1.7 + sp.x*0.7 + sp.z*0.45) * sa * h;
            transformed.z += cos(uTime*1.3 + sp.x*0.4 + sp.z*0.8) * sa * 0.6 * h;
          }
          #include <project_vertex>
          vN = normalize(transformedNormal);
        }`,
      fragmentShader: `varying vec3 vN; void main(){ vec3 n = normalize(vN); if(!gl_FrontFacing) n = -n; gl_FragColor = vec4(n*0.5+0.5, 1.0); }`,
      side: THREE.DoubleSide,
    });
    // thuộc tính thiếu (vật không đung đưa) → biên độ 0
    (this.normalMat as unknown as { defaultAttributeValues: Record<string, number[]> }).defaultAttributeValues.aSway = [0, 0, 0, 0];
    this.nrt = new THREE.WebGLRenderTarget(2, 2, { depthTexture: new THREE.DepthTexture(2, 2), minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
    this.composer = new EffectComposer(renderer);
    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);
    this.ink = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        tNormal: { value: null },
        tDepth: { value: null },
        uRes: { value: new THREE.Vector2(1, 1) },
        uScreen: { value: new THREE.Vector2(1, 1) },
        uNear: { value: 1 },
        uFar: { value: 100 },
        uInk: { value: new THREE.Color("#3b2a1e") },
        uLine: { value: 1 },
        uDS: { value: 1 },
        uLap: { value: new THREE.Vector2(...ink.lap) },
        uJump: { value: new THREE.Vector2(...ink.jump) },
        uWMax: { value: ink.wMax },
        uHalo: { value: ink.halo },
        uMix: { value: ink.mix },
      },
      vertexShader: VS,
      fragmentShader: `uniform sampler2D tDiffuse, tNormal, tDepth; uniform vec2 uRes, uScreen, uLap, uJump; uniform float uNear, uFar, uLine, uDS, uWMax, uHalo, uMix; uniform vec3 uInk; varying vec2 vUv;
        float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
        float lin(float d){ float z = d*2.0-1.0; return 2.0*uNear*uFar/(uFar+uNear - z*(uFar-uNear)); }
        float D(vec2 uv){ return lin(texture2D(tDepth, uv).x); }
        vec3 N(vec2 uv){ return texture2D(tNormal, uv).xyz*2.0-1.0; }
        float edgeAt(vec2 uv, float w){
          vec2 px = w / uRes;
          float d0 = D(uv);
          float dl = D(uv-vec2(px.x,0.0)), dr = D(uv+vec2(px.x,0.0)), du = D(uv+vec2(0.0,px.y)), dd = D(uv-vec2(0.0,px.y));
          float lap = abs(dl+dr+du+dd-4.0*d0)/d0 * uDS;
          float jump = max(max(abs(dl-d0), abs(dr-d0)), max(abs(du-d0), abs(dd-d0)))/d0 * uDS;
          float ed = max(smoothstep(uLap.x, uLap.y, lap), smoothstep(uJump.x, uJump.y, jump));
          vec3 n0 = N(uv);
          float nd = (1.0-dot(n0,N(uv-vec2(px.x,0.0)))) + (1.0-dot(n0,N(uv+vec2(px.x,0.0)))) + (1.0-dot(n0,N(uv+vec2(0.0,px.y)))) + (1.0-dot(n0,N(uv-vec2(0.0,px.y))));
          float en = smoothstep(0.26, 0.6, nd);
          return max(ed, en);
        }
        void main(){
          vec2 q = vUv * vec2(uScreen.x/uScreen.y, 1.0);
          float nA = vn(q*7.0), nB = vn(q*23.0+3.1);
          vec2 wob = (vec2(vn(q*34.0), vn(q*34.0+5.2))-0.5) * 3.0 / uScreen;
          vec3 col = texture2D(tDiffuse, vUv + wob).rgb;
          float w = mix(1.1, uWMax, nA) * uLine;
          vec2 uvE = vUv + (vec2(vn(q*15.0+1.7), vn(q*15.0+8.3))-0.5) * 2.0 / uRes;
          float e = edgeAt(uvE, w);
          float halo = edgeAt(vUv, 3.2*w);
          e *= mix(0.5, 1.0, smoothstep(0.2, 0.7, nB));
          col *= 1.0 - uHalo*halo;
          col = mix(col, uInk, clamp(e, 0.0, 1.0)*uMix);
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    // gán sau khi ShaderPass nhân bản uniforms (texture của render target không nhân bản được)
    this.ink.uniforms.tNormal.value = this.nrt.texture;
    this.ink.uniforms.tDepth.value = this.nrt.depthTexture;
    this.composer.addPass(this.ink);
    this.paper = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        tPaper: { value: paperTex },
        uScreen: { value: new THREE.Vector2(1, 1) },
        uPS: { value: 1 },
        uVign: { value: new THREE.Vector2(...paper.vign) },
        uVAxis: { value: new THREE.Vector2(...paper.vAxis) },
        uTint: { value: new THREE.Vector3(...paper.tint) },
        uGrain: { value: paper.grain },
        uBlot: { value: new THREE.Vector2(...paper.blot) },
        uWash: { value: paper.wash },
      },
      vertexShader: VS,
      fragmentShader: `uniform sampler2D tDiffuse, tPaper; uniform vec2 uScreen, uVign, uVAxis, uBlot; uniform vec3 uTint; uniform float uPS, uGrain, uWash; varying vec2 vUv;
        void main(){
          vec3 col = texture2D(tDiffuse, vUv).rgb;
          vec2 puv = vUv * uScreen / (512.0*uPS);
          vec4 p = texture2D(tPaper, puv);
          vec4 p2 = texture2D(tPaper, puv*0.31 + 0.5);
          float lum = dot(col, vec3(0.299,0.587,0.114));
          col *= mix(1.0, p.r, 0.7);
          col *= 1.0 - (1.0 - p.g)*uGrain*(1.0 - smoothstep(0.0, 0.7, lum));
          col *= uBlot.x + uBlot.y*p2.b;
          vec2 c = (vUv-0.5) * vec2(uScreen.x/uScreen.y, 1.0);
          float v = smoothstep(uVign.x, uVign.y, length(c*uVAxis));
          col = mix(col*uTint, col, v);
          col = mix(col, vec3(0.93,0.88,0.78), uWash);
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    this.composer.addPass(this.paper);
    this.composer.addPass(new OutputPass());
  }

  /** w, h: CSS px; pr: tỉ lệ điểm ảnh; nét mực vẽ nửa độ phân giải khi màn dày */
  setSize(w: number, h: number, pr: number) {
    const NS = pr >= 1.75 ? 0.5 : 1;
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    const bw = Math.floor(w * pr),
      bh = Math.floor(h * pr);
    this.nrt.setSize(Math.max(2, Math.floor(bw * NS)), Math.max(2, Math.floor(bh * NS)));
    const u = this.ink.uniforms;
    u.uRes.value.set(this.nrt.width, this.nrt.height);
    u.uScreen.value.set(bw, bh);
    // nét mực theo bề rộng khung (bản mẫu: 1.0 ở 1800 px, 1.25 ở 2400 px), mảnh lại khi vẽ nửa độ phân giải
    u.uLine.value = Math.max(0.85, Math.min(1.3, bw / 1800)) * (NS < 1 ? 0.75 : 1);
    this.paper.uniforms.uScreen.value.set(bw, bh);
    this.paper.uniforms.uPS.value = Math.max(1, bw / 1700);
  }
  setDepth(near: number, far: number, ds: number) {
    const u = this.ink.uniforms;
    u.uNear.value = near;
    u.uFar.value = far;
    u.uDS.value = ds;
  }
  render(bg: THREE.Color) {
    const { renderer, scene, camera } = this;
    camera.layers.set(0);
    scene.overrideMaterial = this.normalMat;
    scene.background = null;
    renderer.setRenderTarget(this.nrt);
    renderer.setClearColor(0x8080ff, 1);
    renderer.clear();
    renderer.render(scene, camera);
    scene.overrideMaterial = null;
    scene.background = bg;
    renderer.setRenderTarget(null);
    camera.layers.enableAll();
    this.composer.render();
  }
  dispose() {
    this.nrt.depthTexture?.dispose();
    this.nrt.dispose();
    this.normalMat.dispose();
    for (const p of this.composer.passes) (p as { dispose?: () => void }).dispose?.();
    this.composer.dispose();
  }
}
