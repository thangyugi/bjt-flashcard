"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Ann, Hatches, Layers, RevealMask, setMask } from "./drawing/Layers";
import type { WorldGeometry } from "./drawing/world-geometry";

const W = 800;
const H = 640;
const TICKS = ["Học", "Tinh thể", "Gieo cây", "Đi dạo"];
const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

/**
 * Phần "Vùng đất của bạn": hình dính (sticky) bên phải, bốn bước bên trái.
 * Cuộn tới đâu, bản vẽ được tô màu tới đó; bước 2–4 lần lượt thêm Tinh thể, cây quý, Mochi và Bọt.
 * `children` là danh sách bước (render phía server); thành phần này chỉ bật/tắt class.
 */
export function WorldScrolly({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<WorldGeometry | null>(null);

  // Chỉ tải hình học khi phần này sắp vào màn hình
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let alive = true;
    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      import("./drawing/world-geometry").then((m) => alive && setGeo(m.buildWorld()));
    };
    // Tải khi trình duyệt rảnh, hoặc sớm hơn nếu người dùng cuộn gần tới
    const idle = window.requestIdleCallback ? window.requestIdleCallback(load, { timeout: 4000 }) : window.setTimeout(load, 2500);
    const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && load(), { rootMargin: "1200px 0px" }) : null;
    io?.observe(root);
    return () => {
      alive = false;
      io?.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!geo || !root || !svg) return;
    const steps = [...root.querySelectorAll<HTMLElement>(".w-step")];
    const ticks = [...root.querySelectorAll<HTMLElement>(".w-ticks span")];
    const sun = svg.querySelector<SVGCircleElement>('[data-part="sun"]')!;
    const walker = [...svg.querySelectorAll<SVGGElement>('[data-g="lk"], [data-part="walker"]')];
    let cur = 0;
    const setStep = (n: number) => {
      if (n === cur) return;
      cur = n;
      for (let k = 2; k <= 4; k++) svg.classList.toggle(`at${k}`, n >= k);
      steps.forEach((s, i) => s.classList.toggle("on", i + 1 === n));
      ticks.forEach((t, i) => t.classList.toggle("on", i + 1 <= n));
    };
    const render = (p: number, n: number) => {
      setMask(svg, -60 + (H + 120) * clamp01(p * 1.18 + 0.04));
      sun.setAttribute("cy", String(Math.round((430 - 290 * smooth(clamp01(p * 1.1))) * 10) / 10));
      const wp = smooth(clamp01((p - 0.66) / 0.3));
      const x = 410 + (612 - 410) * wp;
      const y = 336 - 6 * wp;
      walker.forEach((e) => e.setAttribute("transform", `translate(${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}) scale(1.15)`));
      setStep(n);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(1, 4);
      return;
    }
    let ticking = false;
    let raf = 0;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        ticking = false;
        const r = root.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp01((vh * 0.55 - r.top) / (r.height - vh * 0.45));
        let n = 1;
        steps.forEach((s, i) => {
          if (s.getBoundingClientRect().top < vh * 0.6) n = i + 1;
        });
        render(p, n);
      });
    };
    render(0, 1);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geo]);

  return (
    <div className="scrolly" ref={rootRef}>
      <div className="w-fig">
        <svg ref={svgRef} className="wsvg" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="world-fig-t">
          <title id="world-fig-t">Bản vẽ Thảo nguyên Pha Lê: cao nguyên trên mây với cây anh đào, cây thông, thác nước, Lữ khách, và thành phố xa bên dưới</title>
          <defs>
            <Hatches prefix="wp" />
            <RevealMask id="wm" w={W} h={H} />
          </defs>
          {geo && (
            <>
              <Layers shapes={geo.shapes} prefix="wp" maskId="wm" beforeA={{ index: 0, node: <circle key="sun" data-part="sun" cx={610} cy={430} r={58} fill="#b8202f" /> }} />
              <g className="ann">
                {geo.ann.map((a) => (
                  <g key={a.step} className={a.step ? `s${a.step}` : undefined}>
                    <Ann els={a.els} />
                  </g>
                ))}
                <g data-part="walker">
                  <Ann els={geo.walker} />
                </g>
              </g>
            </>
          )}
        </svg>
        <div className="w-ticks" aria-hidden>
          {TICKS.map((t, i) => (
            <span key={t} className={i === 0 ? "on" : undefined}>
              <i />
              {i + 1}
              <b>&nbsp;{t}</b>
            </span>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
