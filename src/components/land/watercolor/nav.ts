/**
 * Đi bộ trên bản đồ: vùng đi được (đất trừ nước, nhà, rào, ô đất; cầu thì đi được) trên lưới thô + A* + kéo thẳng đường.
 */
import { clamp, lerp, type P2 } from "./core";

export interface Circle {
  x: number;
  z: number;
  r: number;
}
/** Hình chữ nhật xoay (tâm, rộng theo trục x cục bộ, sâu theo z cục bộ, góc yaw) */
export interface ORect {
  x: number;
  z: number;
  w: number;
  d: number;
  yaw?: number;
}
/** Cầu: đoạn thẳng a→b, bề rộng, chiều cao mặt cầu theo u ∈ [0, 1] */
export interface Bridge {
  a: P2;
  b: P2;
  width: number;
  deck: (u: number) => number;
}

export const inORect = (x: number, z: number, r: ORect, pad = 0) => {
  const c = Math.cos(r.yaw ?? 0),
    s = Math.sin(r.yaw ?? 0),
    dx = x - r.x,
    dz = z - r.z;
  const u = dx * c - dz * s,
    v = dx * s + dz * c;
  return Math.abs(u) < r.w / 2 + pad && Math.abs(v) < r.d / 2 + pad;
};

function bridgeAt(b: Bridge, x: number, z: number): number | null {
  const [ax, az] = b.a,
    [bx, bz] = b.b,
    dx = bx - ax,
    dz = bz - az,
    L2 = dx * dx + dz * dz;
  const u = ((x - ax) * dx + (z - az) * dz) / L2;
  if (u < -0.02 || u > 1.02) return null;
  const px = ax + dx * u,
    pz = az + dz * u;
  if (Math.hypot(x - px, z - pz) > b.width / 2) return null;
  return clamp(u, 0, 1);
}

export interface WalkSpec {
  /** đất đi được về mặt địa hình (không phải nước, vách, ruộng…) */
  base: (x: number, z: number) => boolean;
  ground: (x: number, z: number) => number;
  circles: Circle[];
  rects: ORect[];
  bridges: Bridge[];
  bounds: [number, number, number, number];
}

export class WalkMap {
  constructor(readonly spec: WalkSpec) {}
  onBridge(x: number, z: number) {
    for (const b of this.spec.bridges) {
      const u = bridgeAt(b, x, z);
      if (u !== null) return { b, u };
    }
    return null;
  }
  walkable(x: number, z: number, r = 0.3) {
    const s = this.spec,
      [x0, x1, z0, z1] = s.bounds;
    if (x < x0 || x > x1 || z < z0 || z > z1) return false;
    if (this.onBridge(x, z)) return true;
    if (!s.base(x, z)) return false;
    for (const o of s.circles) if ((x - o.x) ** 2 + (z - o.z) ** 2 < (r + o.r) ** 2) return false;
    for (const q of s.rects) if (inORect(x, z, q, r)) return false;
    return true;
  }
  height(x: number, z: number) {
    const br = this.onBridge(x, z);
    if (br) return br.b.deck(br.u);
    return this.spec.ground(x, z);
  }
}

/** Lưới điều hướng + A* (8 hướng), đường được làm thẳng bằng kiểm tra tầm nhìn */
export class NavGrid {
  readonly nx: number;
  readonly nz: number;
  private ok: Uint8Array;
  constructor(
    private walk: WalkMap,
    readonly cell = 0.5
  ) {
    const [x0, x1, z0, z1] = walk.spec.bounds;
    this.nx = Math.ceil((x1 - x0) / cell);
    this.nz = Math.ceil((z1 - z0) / cell);
    this.ok = new Uint8Array(this.nx * this.nz);
    for (let j = 0; j < this.nz; j++)
      for (let i = 0; i < this.nx; i++) {
        const [x, z] = this.center(i, j);
        this.ok[j * this.nx + i] = walk.walkable(x, z, 0.25) ? 1 : 0;
      }
  }
  center(i: number, j: number): P2 {
    const [x0, , z0] = this.walk.spec.bounds;
    return [x0 + (i + 0.5) * this.cell, z0 + (j + 0.5) * this.cell];
  }
  cellOf(x: number, z: number): [number, number] {
    const [x0, , z0] = this.walk.spec.bounds;
    return [clamp(Math.floor((x - x0) / this.cell), 0, this.nx - 1), clamp(Math.floor((z - z0) / this.cell), 0, this.nz - 1)];
  }
  okAt(i: number, j: number) {
    return i >= 0 && j >= 0 && i < this.nx && j < this.nz && this.ok[j * this.nx + i] === 1;
  }
  /** Ô đi được gần nhất (tìm theo vòng) */
  nearest(x: number, z: number, maxR = 24): P2 | null {
    const [ci, cj] = this.cellOf(x, z);
    if (this.okAt(ci, cj)) return [x, z];
    for (let r = 1; r <= maxR; r++) {
      let best: P2 | null = null,
        bd = 1e9;
      for (let dj = -r; dj <= r; dj++)
        for (let di = -r; di <= r; di++) {
          if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
          if (!this.okAt(ci + di, cj + dj)) continue;
          const c = this.center(ci + di, cj + dj),
            d = Math.hypot(c[0] - x, c[1] - z);
          if (d < bd) {
            bd = d;
            best = c;
          }
        }
      if (best) return best;
    }
    return null;
  }
  clear(ax: number, az: number, bx: number, bz: number) {
    const L = Math.hypot(bx - ax, bz - az),
      n = Math.ceil(L / (this.cell * 0.5));
    for (let k = 1; k <= n; k++) {
      const t = k / n;
      if (!this.walk.walkable(lerp(ax, bx, t), lerp(az, bz, t), 0.25)) return false;
    }
    return true;
  }
  path(from: P2, to: P2): P2[] | null {
    const s = this.cellOf(from[0], from[1]);
    const near = this.nearest(to[0], to[1]);
    if (!near) return null;
    const g = this.cellOf(near[0], near[1]);
    if (this.clear(from[0], from[1], near[0], near[1])) return [near];
    const N = this.nx * this.nz,
      cost = new Float32Array(N).fill(Infinity),
      prev = new Int32Array(N).fill(-1),
      closed = new Uint8Array(N);
    const start = s[1] * this.nx + s[0],
      goal = g[1] * this.nx + g[0];
    // hàng đợi ưu tiên nhị phân
    const heap: number[] = [],
      prio: number[] = [];
    const push = (id: number, p: number) => {
      heap.push(id);
      prio.push(p);
      let i = heap.length - 1;
      while (i > 0) {
        const pa = (i - 1) >> 1;
        if (prio[pa] <= prio[i]) break;
        [heap[pa], heap[i]] = [heap[i], heap[pa]];
        [prio[pa], prio[i]] = [prio[i], prio[pa]];
        i = pa;
      }
    };
    const pop = () => {
      const top = heap[0];
      const lastId = heap.pop()!,
        lastP = prio.pop()!;
      if (heap.length) {
        heap[0] = lastId;
        prio[0] = lastP;
        let i = 0;
        for (;;) {
          const l = 2 * i + 1,
            r = l + 1;
          let m = i;
          if (l < heap.length && prio[l] < prio[m]) m = l;
          if (r < heap.length && prio[r] < prio[m]) m = r;
          if (m === i) break;
          [heap[m], heap[i]] = [heap[i], heap[m]];
          [prio[m], prio[i]] = [prio[i], prio[m]];
          i = m;
        }
      }
      return top;
    };
    const h = (id: number) => Math.hypot((id % this.nx) - g[0], Math.floor(id / this.nx) - g[1]);
    cost[start] = 0;
    push(start, h(start));
    let found = false,
      steps = 0;
    while (heap.length && steps++ < 60000) {
      const cur = pop();
      if (cur === goal) {
        found = true;
        break;
      }
      if (closed[cur]) continue;
      closed[cur] = 1;
      const ci = cur % this.nx,
        cj = Math.floor(cur / this.nx);
      for (let dj = -1; dj <= 1; dj++)
        for (let di = -1; di <= 1; di++) {
          if (!di && !dj) continue;
          const ni = ci + di,
            nj = cj + dj;
          if (!this.okAt(ni, nj)) continue;
          if (di && dj && (!this.okAt(ci + di, cj) || !this.okAt(ci, cj + dj))) continue;
          const id = nj * this.nx + ni,
            c = cost[cur] + (di && dj ? 1.4142 : 1);
          if (c < cost[id]) {
            cost[id] = c;
            prev[id] = cur;
            push(id, c + h(id));
          }
        }
    }
    if (!found) return null;
    const cells: P2[] = [];
    for (let id = goal; id !== -1 && id !== start; id = prev[id]) cells.push(this.center(id % this.nx, Math.floor(id / this.nx)));
    cells.reverse();
    cells[cells.length - 1] = near;
    // kéo thẳng: bỏ các điểm giữa khi nhìn thấy nhau
    const out: P2[] = [];
    let cur: P2 = from;
    let i = 0;
    while (i < cells.length) {
      let j = cells.length - 1;
      while (j > i && !this.clear(cur[0], cur[1], cells[j][0], cells[j][1])) j--;
      out.push(cells[j]);
      cur = cells[j];
      i = j + 1;
    }
    return out;
  }
}
