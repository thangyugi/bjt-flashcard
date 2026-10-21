import type * as THREE from "three";
import type { CameraSpec } from "./camera";
import type { P2 } from "./core";
import type { Train } from "./life";
import type { MaterialKit, WcUniforms } from "./materials";
import type { WalkMap } from "./nav";
import type { InkStyle, PaperStyle } from "./post";

export type WorldId = "sakura" | "bon-mua" | "ven-bien";

/** Mức chi tiết: điện thoại / màn nhỏ dùng kết cấu và lưới nhẹ hơn */
export interface Quality {
  small: boolean;
  /** cạnh ảnh nền tô từng điểm (nhiễu) */
  groundBase: number;
  /** cạnh ảnh nền cuối cùng (có nét cọ) */
  ground: number;
  shadow: number;
  /** hệ số mật độ lưới địa hình */
  mesh: number;
  /** hệ số số lượng cỏ/hoa rải */
  scatter: number;
}

export type TexImage = HTMLCanvasElement | OffscreenCanvas | ImageBitmap;

export interface SharedImages {
  paper: TexImage;
  water: TexImage;
  cliff?: TexImage;
}

export type ZoneKind = "plot" | "paddy" | "orchard" | "flowers" | "station" | "shrine" | "onsen" | "house" | "water" | "other";
export type ZoneShape =
  | { t: "circle"; x: number; z: number; r: number }
  | { t: "rect"; x: number; z: number; w: number; d: number; yaw?: number }
  | { t: "ellipse"; x: number; z: number; a: number; b: number }
  | { t: "poly"; pts: P2[] };
/** Một vùng bấm được: tên Việt + một dòng mô tả */
export interface Zone {
  id: string;
  name: string;
  desc: string;
  kind: ZoneKind;
  shape: ZoneShape;
  /** chiều cao khối bấm (nhà cao hơn ruộng) */
  h: number;
}

export interface BuildCtx {
  q: Quality;
  U: WcUniforms;
  ground: TexImage;
  shared: SharedImages;
  /** họ phông chữ cho biển hiệu (Be Vietnam Pro của trang) */
  font: string;
  /** nhường luồng + báo tiến độ (0..1 của phần dựng cảnh) */
  step: (frac: number) => Promise<void>;
}

export interface MapWorld {
  id: WorldId;
  scene: THREE.Scene;
  bg: THREE.Color;
  camera: CameraSpec;
  ink: InkStyle;
  paper: PaperStyle;
  /** độ nhạy nét theo độ sâu ở mức toàn cảnh */
  inkDS: number;
  kit: MaterialKit;
  U: WcUniforms;
  textures: { blob: THREE.Texture; wing: THREE.Texture; paper: THREE.Texture };
  zones: Zone[];
  walk: WalkMap;
  start: { hero: P2; mochi: P2 };
  stroll: P2[];
  charScale: number;
  butterflies: P2[];
  train: Train;
  /** cập nhật sự sống (tàu, bọt, hơi nước, hoa rơi…) */
  update: (t: number, dt: number, reduced: boolean) => void;
}
