/** Phần dựng chung của mọi bản đồ: cảnh, ánh sáng, kết cấu cơ bản, bộ chất liệu, biển hiệu */
import * as THREE from "three";
import { texFrom } from "./builder";
import { makeRand, type AnyCanvas, type Rand } from "./core";
import { MaterialKit, type PaintOpts, type Tint } from "./materials";
import { grayStrokes, paintBlob, paintLeaf, paintSign, paintSoft, paintWing, paintWood, type SignOpts } from "./textures";
import type { BuildCtx } from "./types";

export interface BaseOpts {
  seed: number;
  bg: string;
  tint: Tint;
  sun: { pos: [number, number, number]; target?: [number, number, number]; box: [number, number, number, number]; far: number; bias?: number };
  ambient?: number;
  leaf?: [string, string];
  woodKnots?: boolean;
}

export function sceneBase(ctx: BuildCtx, o: BaseOpts) {
  const rand: Rand = makeRand(o.seed + 2);
  const scene = new THREE.Scene();
  scene.matrixWorldAutoUpdate = true;
  const bg = new THREE.Color(o.bg);
  scene.background = bg;
  scene.add(new THREE.AmbientLight(new THREE.Color("#fff3df"), Math.PI * (o.ambient ?? 0.48)));
  const sun = new THREE.DirectionalLight(new THREE.Color("#fff1d8"), Math.PI * 0.8);
  sun.position.set(...o.sun.pos);
  sun.target.position.set(...(o.sun.target ?? [0, 0, 0]));
  sun.castShadow = true;
  sun.shadow.mapSize.set(ctx.q.shadow, ctx.q.shadow);
  const [l, r, t, b] = o.sun.box;
  Object.assign(sun.shadow.camera, { left: l, right: r, top: t, bottom: b, near: 1, far: o.sun.far });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = o.sun.bias ?? -0.0006;
  sun.shadow.normalBias = 0.05;
  sun.shadow.radius = 3;
  scene.add(sun, sun.target);

  const T = {
    grain: texFrom(grayStrokes(rand, 256, 500) as HTMLCanvasElement, true, true),
    fur: texFrom(grayStrokes(rand, 256, 700, { bg: "#fbf9f4", w0: 3, w1: 8, l0: 6, l1: 16 }) as HTMLCanvasElement, true, true),
    stone: texFrom(grayStrokes(rand, 256, 400, { bg: "#efede8", w0: 1, w1: 3, l0: 4, l1: 12 }) as HTMLCanvasElement, true, true),
    leaf: texFrom(paintLeaf(rand, ...(o.leaf ?? ["40,70,30", "30,55,25"])) as HTMLCanvasElement, true, true),
    wood: texFrom(paintWood(rand, o.woodKnots ?? true) as HTMLCanvasElement, true, true),
    soft: texFrom(paintSoft() as HTMLCanvasElement),
    blob: texFrom(paintBlob() as HTMLCanvasElement),
    wing: texFrom(paintWing() as HTMLCanvasElement),
    paper: texFrom(ctx.shared.paper as HTMLCanvasElement, false, true),
    water: texFrom(ctx.shared.water as HTMLCanvasElement, false, true),
    cliff: ctx.shared.cliff ? texFrom(ctx.shared.cliff as HTMLCanvasElement, true, true) : null,
    ground: texFrom(ctx.ground as HTMLCanvasElement),
  };
  T.ground.anisotropy = 8;
  T.ground.wrapS = T.ground.wrapT = THREE.ClampToEdgeWrapping;

  const makeKit = (defs: Record<string, PaintOpts | (() => THREE.Material)>) => new MaterialKit(ctx.U, o.tint, defs, T.grain, T.fur);
  const sign = (text: string, so: Omit<SignOpts, "font">) => texFrom(paintSign(rand, text, { ...so, font: ctx.font }) as AnyCanvas as HTMLCanvasElement);
  return { scene, bg, sun, rand, T, makeKit, sign };
}
