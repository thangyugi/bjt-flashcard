"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HID } from "./drawing/kit";
import { Ann, Hatches, Layers, RevealMask, setMask } from "./drawing/Layers";
import type { HeroGeometry } from "./drawing/hero-geometry";

const W = 760;
const H = 760;
/** Khớp HERO_REST trong hero-geometry (không import tĩnh để hình học chỉ tải khi cần) */
const REST = 436;
const PHASES: Record<string, [number, number]> = { fuji: [150, 900], pag: [450, 1500], torii: [900, 800], bloom: [1250, 800], x: [0, 400] };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * Hình 1 của trang chủ: nét mực tự vẽ lúc mở trang rồi được tô màu tới trạng thái nghỉ
 * (nửa trên đã tô, nửa dưới còn nét). Hình học được import động để không nằm trong HTML/JS ban đầu.
 */
export function HeroFigure() {
  const [geo, setGeo] = useState<HeroGeometry | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const playRef = useRef<() => void>(() => {});

  useEffect(() => {
    let alive = true;
    import("./drawing/hero-geometry").then((m) => alive && setGeo(m.buildHero()));
    return () => {
      alive = false;
    };
  }, []);

  // Dựng bộ điều khiển trước khi trình duyệt vẽ khung đầu tiên → không lóe bản vẽ hoàn chỉnh
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!geo || !svg) return;
    const els = [...svg.querySelectorAll<SVGPathElement>(".lyA path[data-draw]")];
    const groups: Record<string, SVGPathElement[]> = {};
    for (const e of els) (groups[e.dataset.ph ?? "x"] ??= []).push(e);
    const consEls = [...svg.querySelectorAll<SVGPathElement>(".cons path")];
    const ann = svg.querySelector<SVGGElement>('[data-part="ann"]')!;
    const scale = svg.querySelector<SVGGElement>('[data-part="scale"]')!;
    const sunDisk = svg.querySelector<SVGCircleElement>('[data-part="sun"]')!;
    const sunOutline = svg.querySelector<SVGCircleElement>('[data-part="sun-outline"]')!;
    let anims: Animation[] = [];
    let raf = 0;

    const stop = () => {
      anims.forEach((a) => a.cancel());
      anims = [];
      cancelAnimationFrame(raf);
    };
    const finish = () => {
      stop();
      els.forEach((e) => (e.style.strokeDashoffset = "0"));
      consEls.forEach((e) => (e.style.opacity = "1"));
      ann.style.opacity = "1";
      scale.style.opacity = "1";
      sunDisk.setAttribute("r", String(geo.sun.r));
      setMask(svg, REST);
    };
    const play = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || typeof els[0]?.animate !== "function") return finish();
      stop();
      setMask(svg, -60);
      sunDisk.setAttribute("r", "0");
      ann.style.opacity = "0";
      scale.style.opacity = "0";
      consEls.forEach((e, i) => anims.push(e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: i * 40, fill: "both" })));
      for (const k in groups) {
        const g = groups[k];
        const [s0, span] = PHASES[k] ?? PHASES.x;
        const order = k === "pag" ? g.slice().reverse() : g;
        order.forEach((e, i) => {
          e.style.strokeDashoffset = "1";
          anims.push(
            e.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
              duration: k === "bloom" ? 500 : 750,
              delay: s0 + (span * i) / order.length,
              easing: "cubic-bezier(.45,.05,.25,1)",
              fill: "forwards",
            })
          );
        });
      }
      anims.push(sunOutline.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 200, fill: "both" }));
      anims.push(ann.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 3000, fill: "forwards" }));
      anims.push(scale.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 3100, fill: "forwards" }));
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = now - t0;
        sunDisk.setAttribute("r", String(Math.round(geo.sun.r * ease(clamp01((t - 2000) / 1100)) * 10) / 10));
        setMask(svg, -60 + (REST + 60) * ease(clamp01((t - 2250) / 1500)));
        if (t < 3900) raf = requestAnimationFrame(tick);
        else {
          ann.style.opacity = "1";
          scale.style.opacity = "1";
        }
      };
      raf = requestAnimationFrame(tick);
    };
    playRef.current = play;
    play();
    return () => {
      stop();
      playRef.current = () => {};
    };
  }, [geo]);

  const firstPag = geo ? geo.shapes.findIndex((s) => s.ph === "pag") : -1;

  return (
    <figure className="hero-art">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="hero-fig-t">
        <title id="hero-fig-t">Bản vẽ phối cảnh: tháp năm tầng, núi Phú Sĩ phía sau, cổng torii phía trước, mặt trời đỏ và cành anh đào</title>
        <defs>
          <Hatches prefix="hp" />
          <RevealMask id="hm" w={W} h={H} />
        </defs>
        {geo && (
          <>
            <Layers
              shapes={geo.shapes}
              prefix="hp"
              maskId="hm"
              beforeA={{
                index: firstPag,
                node: (
                  <g key="sun">
                    <circle data-part="sun-outline" cx={geo.sun.x} cy={geo.sun.y} r={geo.sun.r} fill="none" stroke={HID} strokeWidth={0.8} strokeDasharray="3 4" />
                    <circle data-part="sun" cx={geo.sun.x} cy={geo.sun.y} r={geo.sun.r} fill="#b8202f" />
                  </g>
                ),
              }}
            />
            <g className="cons">
              {geo.cons.map((c, i) => (
                <path key={i} d={c.d} stroke={HID} strokeWidth={c.sw} strokeDasharray={c.dash} fill="none" />
              ))}
            </g>
            <g className="ann" data-part="ann">
              <Ann els={geo.ann} />
            </g>
            <g className="ann" data-part="scale">
              <Ann els={geo.scale} />
            </g>
          </>
        )}
      </svg>
      <figcaption className="figcap">
        <span>
          <b>Hình 1.</b> Tháp năm tầng, núi Phú Sĩ, cổng torii. Phối cảnh hai điểm tụ.
        </span>
        <button className="replay" type="button" onClick={() => playRef.current()} disabled={!geo}>
          <svg viewBox="0 0 16 16" aria-hidden>
            <path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v3h3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Vẽ lại
        </button>
      </figcaption>
    </figure>
  );
}
