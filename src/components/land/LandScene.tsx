"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { LandEngine, LandEvents, PlantingRecord } from "./engine";
import { GLASS, GLASS_INK_2 } from "./ui";

export type SceneStatus = "loading" | "ready" | "nogl" | "error";

const SCENE_LABEL =
  "Thảo nguyên Pha Lê: một cao nguyên hình vòm làm từ hàng trăm nghìn chấm sáng, đứng giữa không trung trên vách đá cao. Trên cao nguyên có đồng cỏ, sườn đá với cụm pha lê, dòng suối uốn quanh ao nhỏ rồi đổ thành thác xuống vách, cầu vòm, lối đá, hàng anh đào, thông, phong đỏ, liễu, tre, bạch dương, đèn lồng, tám ô đất trồng cây quý, nhân vật Lữ khách, cáo mây Mochi, rùa biển sao Bọt, thỏ, bướm, chuồn chuồn và đàn chim. Bên dưới là vùng đồng bằng xa với sông, hồ, ruộng, rừng, núi, mây thấp và ba thành phố. Bầu trời đổi theo giờ thật, có hành tinh khí có vành và hai mặt trăng.";

/** Nền bầu trời mặc định (trước khi engine tô theo giờ thật) */
const DEFAULT_SKY =
  "radial-gradient(120% 70% at 12% 108%,rgba(255,170,110,.55),rgba(255,140,120,.18) 38%,transparent 62%),radial-gradient(90% 55% at 70% 115%,rgba(240,120,130,.28),transparent 60%),linear-gradient(180deg,#03191a 0%,#072b2a 34%,#0d3b37 60%,#3b4a40 82%,#7a5a48 100%)";

const nextPaint = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)));

/**
 * Khung cảnh 3D: nạp engine (three.js) động chỉ ở phía trình duyệt, tạo canvas, tháo gỡ hoàn toàn khi rời trang.
 * Các lớp phủ (nút, đồng hồ, gợi ý…) truyền vào qua children.
 */
export function LandScene({
  interactive,
  plantings,
  events,
  engineRef,
  onStatus,
  className,
  children,
}: {
  interactive: boolean;
  plantings: PlantingRecord[];
  events: Partial<LandEvents>;
  engineRef: React.RefObject<LandEngine | null>;
  onStatus?: (s: SceneStatus) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const box = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SceneStatus>("loading");
  // Luôn gọi bản callback mới nhất mà không phải dựng lại engine
  const latest = useRef({ events, plantings, onStatus });
  useEffect(() => {
    latest.current = { events, plantings, onStatus };
  });

  useEffect(() => {
    let cancelled = false;
    let engine: LandEngine | null = null;
    const report = (s: SceneStatus) => {
      if (cancelled) return;
      setStatus(s);
      latest.current.onStatus?.(s);
    };
    (async () => {
      const mod = await import("./engine");
      // Cho trình duyệt vẽ màn "đang dựng" trước khi dựng hàng trăm nghìn chấm
      await nextPaint();
      if (cancelled || !box.current || !canvas.current) return;
      const fwd = <K extends keyof LandEvents>(k: K) => ((...a: Parameters<LandEvents[K]>) => (latest.current.events[k] as ((...x: unknown[]) => void) | undefined)?.(...a)) as LandEvents[K];
      try {
        engine = mod.createLandEngine({
          container: box.current,
          canvas: canvas.current,
          tag: tag.current,
          interactive,
          plantings: latest.current.plantings,
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          events: {
            onSelect: fwd("onSelect"),
            onGrowth: fwd("onGrowth"),
            onPlotPick: fwd("onPlotPick"),
            onPrompt: fwd("onPrompt"),
            onToast: fwd("onToast"),
            onView: fwd("onView"),
            onTime: fwd("onTime"),
            onCreatureStatus: fwd("onCreatureStatus"),
          },
        });
      } catch (e) {
        if (!(e instanceof mod.WebGLUnavailableError)) console.error("[land]", e);
        report(e instanceof mod.WebGLUnavailableError ? "nogl" : "error");
        return;
      }
      if (cancelled) {
        engine.dispose();
        engine = null;
        return;
      }
      engineRef.current = engine;
      report("ready");
    })().catch((e) => {
      console.error("[land]", e);
      report("error");
    });
    return () => {
      cancelled = true;
      engine?.dispose();
      if (engineRef.current === engine) engineRef.current = null;
    };
  }, [interactive, engineRef]);

  // Cây trong store đổi (vừa gieo / đăng xuất) → đồng bộ vào cảnh
  useEffect(() => {
    if (status === "ready") engineRef.current?.syncPlantings(plantings);
  }, [plantings, status, engineRef]);

  return (
    <section ref={box} className={cn("relative min-h-0 min-w-0 overflow-hidden", className)} style={{ background: DEFAULT_SKY }}>
      <canvas
        ref={canvas}
        role="img"
        aria-label={SCENE_LABEL}
        className={cn("absolute inset-0 block h-full w-full touch-none", interactive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none")}
      />
      <div ref={tag} hidden className={cn(GLASS, "pointer-events-none absolute top-0 left-0 z-[2] -translate-x-1/2 -translate-y-full rounded-[10px] px-2.5 py-1.5 text-[12px] whitespace-nowrap [&_b]:font-semibold [&_span]:text-[#cfc6bb]")} />
      {status === "loading" && (
        <p className={cn(GLASS, "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2.5 text-[13px]")} role="status">
          Đang dựng vùng đất…
        </p>
      )}
      {(status === "nogl" || status === "error") && (
        <div className={cn(GLASS, "absolute top-1/2 left-1/2 w-[min(360px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 px-4 py-3.5 text-[13.5px] leading-relaxed")} role="alert">
          <b className="block text-[14.5px]">{status === "nogl" ? "Không hiển thị được vùng đất 3D" : "Có lỗi khi dựng vùng đất"}</b>
          <span className={GLASS_INK_2}>
            {status === "nogl"
              ? "Trình duyệt hoặc thiết bị này chưa bật WebGL. Hãy thử bật tăng tốc phần cứng hoặc mở bằng Chrome, Edge, Safari bản mới. Sổ tay thực vật và Tinh thể vẫn dùng được."
              : "Hãy tải lại trang. Sổ tay thực vật và Tinh thể vẫn dùng được."}
          </span>
        </div>
      )}
      {children}
    </section>
  );
}
