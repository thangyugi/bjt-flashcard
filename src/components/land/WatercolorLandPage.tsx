"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Maximize2, Minus, Plus, X } from "lucide-react";
import { useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance, crystalsEarned, totalXp, XP_PER_CRYSTAL } from "@/lib/land/economy";
import { cn } from "@/lib/utils";
import { PlanStrip } from "./PlanStrip";
import { WorldBar } from "./WorldBar";
import { worldById } from "./worlds";
import type { WcEngine, ZoneInfo } from "./watercolor/engine";
import type { WorldId } from "./watercolor/types";

type Status = "loading" | "ready" | "nogl" | "error";

const CARD = "rounded-xl border border-line-strong bg-paper/95 text-ink shadow-[0_1px_2px_rgba(28,25,23,0.06)] backdrop-blur-sm";
const BTN =
  "grid h-9 min-w-9 place-items-center rounded-lg border border-line-strong bg-paper/95 px-2.5 text-[13px] font-semibold text-ink hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/** Trang một bản đồ màu nước (/land/bon-mua …): dải kế hoạch, thanh chuyển vùng, khung cảnh 3D + thẻ thông tin */
export function WatercolorLandPage({ world, still, stillTall, label }: { world: WorldId; still: string; stillTall: string; label: string }) {
  const spent = useLandStore((s) => s.spent);
  const days = useActivityStore((s) => s.days);
  const balance = crystalBalance(days, spent);
  const xpToNext = XP_PER_CRYSTAL - (totalXp(days) % XP_PER_CRYSTAL);
  const info = worldById(world);

  const box = useRef<HTMLDivElement>(null);
  const engine = useRef<WcEngine | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [progress, setProgress] = useState(0);
  const [zone, setZone] = useState<ZoneInfo | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    let eng: WcEngine | null = null;
    let lastP = -1;
    (async () => {
      const mod = await import("./watercolor/engine");
      if (ac.signal.aborted || !box.current) return;
      try {
        eng = await mod.createWatercolorEngine({
          container: box.current,
          world,
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          signal: ac.signal,
          events: {
            onProgress: (f) => {
              const p = Math.floor(f * 100);
              if (p !== lastP) setProgress((lastP = p));
            },
            onZone: setZone,
          },
        });
      } catch (e) {
        if (ac.signal.aborted) return;
        if (e instanceof mod.WebGLUnavailableError) setStatus("nogl");
        else {
          console.error("[land-wc]", e);
          setStatus("error");
        }
        return;
      }
      if (ac.signal.aborted) {
        eng.dispose();
        return;
      }
      engine.current = eng;
      setStatus("ready");
    })().catch((e) => {
      if (!ac.signal.aborted) {
        console.error("[land-wc]", e);
        setStatus("error");
      }
    });
    return () => {
      ac.abort();
      eng?.dispose();
      engine.current = null;
    };
  }, [world]);

  const closeZone = useCallback(() => setZone(null), []);
  useEffect(() => {
    if (!zone) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeZone();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zone, closeZone]);

  const fallback = status === "nogl" || status === "error";

  return (
    <div className="flex flex-col md:h-[calc(100dvh-4rem)]">
      <PlanStrip balance={balance} earned={crystalsEarned(days)} spent={spent} xpToNext={xpToNext} />
      <WorldBar current={world} />
      <section
        ref={box}
        aria-label={label}
        className="relative h-[min(72vh,640px)] min-h-[420px] min-w-0 overflow-hidden bg-[#e8dcc4] md:h-auto md:min-h-0 md:flex-1"
      >
        {fallback && (
          <picture>
            <source media="(max-aspect-ratio: 1/1)" srcSet={stillTall} />
            <img src={still} alt={label} className="absolute inset-0 h-full w-full object-cover" />
          </picture>
        )}
        <div className={cn(CARD, "absolute top-3 left-[calc(12px+env(safe-area-inset-left))] max-w-[calc(100%-120px)] px-3 py-2")}>
          <p className="text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase">Vùng đất của bạn</p>
          <h1 className="mt-0.5 text-[15px] leading-tight font-bold tracking-[-0.01em] md:text-[17px]">{info.name}</h1>
        </div>
        {status === "ready" && (
          <div className="absolute top-3 right-[calc(12px+env(safe-area-inset-right))] flex gap-1.5">
            <button type="button" className={BTN} onClick={() => engine.current?.zoom(0.75)} aria-label="Phóng to">
              <Plus className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" className={BTN} onClick={() => engine.current?.zoom(1.33)} aria-label="Thu nhỏ">
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" className={cn(BTN, "gap-1.5")} onClick={() => engine.current?.resetView()}>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                Toàn cảnh
              </span>
            </button>
          </div>
        )}
        {status === "loading" && (
          <div className={cn(CARD, "absolute top-1/2 left-1/2 w-[min(280px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 px-4 py-3")} role="status">
            <p className="text-[13.5px] font-semibold">Đang vẽ bản đồ… {progress}%</p>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-track">
              <span className="block h-full rounded-full bg-ok transition-[width]" style={{ width: `${progress}%` }} />
            </span>
          </div>
        )}
        {fallback && (
          <div className={cn(CARD, "absolute bottom-3 left-1/2 w-[min(380px,calc(100%-24px))] -translate-x-1/2 px-4 py-3 text-[13.5px] leading-relaxed")} role="alert">
            <b className="block">{status === "nogl" ? "Thiết bị chưa bật WebGL — đang hiện ảnh tĩnh của bản đồ" : "Có lỗi khi dựng bản đồ — đang hiện ảnh tĩnh"}</b>
            <span className="text-ink-2">Thử bật tăng tốc phần cứng hoặc mở bằng Chrome, Edge, Safari bản mới rồi tải lại trang.</span>
          </div>
        )}
        {status === "ready" && !zone && (
          <p className={cn(CARD, "pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 text-[12.5px] whitespace-nowrap text-ink-2 max-[420px]:text-[11.5px]")}>
            Kéo để dời · bấm đất để đi · bấm công trình để xem
          </p>
        )}
        {zone && (
          <div
            className={cn(CARD, "absolute top-[68px] left-[calc(12px+env(safe-area-inset-left))] w-[min(340px,calc(100%-24px))] px-4 py-3 md:top-auto md:bottom-3")}
            role="dialog"
            aria-label={zone.name}
          >
            <div className="flex items-start gap-2">
              <h2 className="min-w-0 flex-1 text-[15px] font-bold">{zone.name}</h2>
              <button type="button" onClick={closeZone} aria-label="Đóng" className="-mt-0.5 -mr-1.5 grid h-7 w-7 place-items-center rounded-md text-ink-3 hover:bg-surface-2">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{zone.desc}</p>
            {zone.kind === "plot" && (
              <Link href="/land" className="mt-2.5 inline-block rounded-lg border border-line-strong px-2.5 py-1 text-[12.5px] font-semibold text-ink hover:bg-surface-2">
                Gieo cây ở Thảo nguyên Pha Lê →
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
