"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { RAR, SP } from "./data";
import type { LandPrompt, LandTime, LandView, PlantingMode } from "./engine";
import { GLASS, GLASS_BTN, GLASS_INK_2 } from "./ui";

/** Tiêu đề góc trái của khung cảnh */
export function SceneTitle() {
  return (
    <div className={cn(GLASS, "absolute top-4 left-[calc(16px+env(safe-area-inset-left))] max-w-[calc(100%-32px)] px-3 py-2 md:px-3.5 md:py-2.5")}>
      <p className={cn("text-[11px] tracking-[0.08em] uppercase", GLASS_INK_2)}>Vùng đất của bạn</p>
      <h1 className="mt-0.5 text-[15px] font-bold tracking-[-0.01em] md:text-[17px]">Thảo nguyên Pha Lê</h1>
    </div>
  );
}

/** Nút chuyển Đi dạo / Toàn cảnh */
export function ModeToggle({ view, onWalk, onOverview }: { view: LandView; onWalk: () => void; onOverview: () => void }) {
  const btn = "rounded-[10px] px-3 py-1.5 text-[12.5px] font-semibold pointer-coarse:min-h-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1ea]";
  return (
    <div role="group" aria-label="Chế độ xem" className={cn(GLASS, "absolute top-4 right-[calc(16px+env(safe-area-inset-right))] flex rounded-xl border-white/12 p-[3px]")}>
      <button type="button" aria-pressed={view === "walk"} onClick={onWalk} className={cn(btn, view === "walk" ? "bg-[#f5f1ea] text-ink" : "hover:bg-white/10")}>
        Đi dạo
      </button>
      <button type="button" aria-pressed={view !== "walk"} onClick={onOverview} className={cn(btn, view !== "walk" ? "bg-[#f5f1ea] text-ink" : "hover:bg-white/10")}>
        Toàn cảnh
      </button>
    </div>
  );
}

const PRESETS: [string, number][] = [
  ["Bình minh", 6],
  ["Trưa", 12],
  ["Hoàng hôn", 17.8],
  ["Đêm", 22.5],
];

/** Đồng hồ ngày/đêm theo giờ thật + "Xem thử giờ" */
export function TimeControl({ time, onPreview, onScrub, onLive }: { time: LandTime | null; onPreview: (h: number) => void; onScrub: (h: number) => void; onLive: () => void }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <div ref={box} className="absolute top-[70px] left-[calc(16px+env(safe-area-inset-left))] z-[3] md:top-auto md:bottom-[calc(16px+env(safe-area-inset-bottom))]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="land-clock"
        onClick={() => setOpen((o) => !o)}
        className={cn(GLASS, "flex items-center gap-2 rounded-xl border-white/12 px-3 py-2 text-[13px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1ea]")}
      >
        <b className="text-[15px] tabular-nums">{time?.label ?? "--:--"}</b>
        <span>
          {time?.phase}
          {time && !time.live ? " · xem thử" : ""}
        </span>
        <span className={cn("border-l border-white/20 pl-2 text-[12px]", GLASS_INK_2)}>Xem thử giờ</span>
      </button>
      {open && (
        <div id="land-clock" className={cn(GLASS, "absolute top-[calc(100%+8px)] left-0 grid w-[290px] max-w-[calc(100vw-32px)] gap-2.5 p-3 md:top-auto md:bottom-[calc(100%+8px)]")}>
          <div className="grid grid-cols-4 gap-1.5">
            {PRESETS.map(([n, h]) => (
              <button key={n} type="button" className={cn(GLASS_BTN, "px-1 py-1.5 text-[12px]")} onClick={() => onPreview(h)}>
                {n}
              </button>
            ))}
          </div>
          <label className={cn("grid gap-1 text-[12px]", GLASS_INK_2)}>
            Kéo để chọn giờ (0–24)
            <input
              type="range"
              min={0}
              max={23.9}
              step={0.1}
              value={time ? Number(time.hour.toFixed(1)) : 12}
              aria-valuetext={time ? `${time.label}, ${time.phase}` : undefined}
              onChange={(e) => onScrub(Number(e.target.value))}
              className="w-full accent-[#f0b27a]"
            />
          </label>
          <button type="button" className={cn(GLASS_BTN, "py-1.5")} disabled={!time || time.live} onClick={onLive}>
            Theo giờ thật
          </button>
        </div>
      )}
    </div>
  );
}

/** Thanh hướng dẫn khi đang gieo: chọn ô (đã chọn loài) hoặc chọn loài (đã chọn ô) */
export function PlantingHint({
  mode,
  freePlots,
  balance,
  preferred,
  onPlot,
  onSpecies,
  onCancel,
}: {
  mode: NonNullable<PlantingMode>;
  freePlots: number[];
  balance: number;
  preferred: string | null;
  onPlot: (plot: number) => void;
  onSpecies: (id: string) => void;
  onCancel: () => void;
}) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    first.current?.focus({ preventScroll: true });
  }, [mode]);
  let options: { key: string; label: string; onClick: () => void }[];
  let text: React.ReactNode;
  if (mode.kind === "species") {
    text = (
      <span>
        Chạm vào một ô đất trống để gieo <b className="text-white">{SP[mode.id]?.vn}</b>
      </span>
    );
    options = freePlots.map((i) => ({ key: `p${i}`, label: `Ô ${i + 1}`, onClick: () => onPlot(i) }));
  } else {
    text = (
      <span>
        Gieo gì vào <b className="text-white">ô {mode.plot + 1}</b>?
      </span>
    );
    options = Object.values(SP)
      .filter((s) => balance >= RAR[s.rar].cost)
      .sort((a, b) => (a.id === preferred ? -1 : 0) - (b.id === preferred ? -1 : 0) || RAR[b.rar].cost - RAR[a.rar].cost)
      .slice(0, 12)
      .map((s) => ({ key: s.id, label: `${s.vn} · ${RAR[s.rar].cost}`, onClick: () => onSpecies(s.id) }));
  }
  return (
    <div role="status" className={cn(GLASS, "absolute top-[118px] left-1/2 z-[3] flex max-w-[calc(100%-32px)] -translate-x-1/2 flex-wrap items-center gap-x-2.5 gap-y-2 py-2.5 pr-3 pl-3.5 text-[13px] md:top-[76px]")}>
      {text}
      <span className="flex flex-wrap gap-1.5">
        {options.map((o, i) => (
          <button key={o.key} ref={i === 0 ? first : undefined} type="button" className={GLASS_BTN} onClick={o.onClick}>
            {o.label}
          </button>
        ))}
      </span>
      <button type="button" ref={options.length ? undefined : first} className={GLASS_BTN} onClick={onCancel}>
        Hủy
      </button>
    </div>
  );
}

/** Gợi ý tương tác khi Lữ khách đứng gần ô đất / cây / sinh vật */
export function Prompt({ prompt, touch, onAct }: { prompt: LandPrompt; touch: boolean; onAct: () => void }) {
  const text =
    prompt.kind === "plot"
      ? `Ô ${prompt.plot + 1} còn trống · ${touch ? "chạm Gieo để gieo" : "nhấn E / chạm Gieo để gieo"}`
      : `${touch ? "Chạm Xem" : "Nhấn E"} để xem ${prompt.name}`;
  return (
    <div
      role="status"
      className={cn(
        GLASS,
        "absolute bottom-[calc(20px+env(safe-area-inset-bottom))] z-[3] flex max-w-[calc(100%-32px)] items-center gap-2.5 py-2 pr-2 pl-3.5 text-[13px] md:bottom-[calc(74px+env(safe-area-inset-bottom))]",
        touch ? "right-4 max-w-[calc(100%-170px)]" : "left-1/2 -translate-x-1/2"
      )}
    >
      <span>{text}</span>
      <button type="button" onClick={onAct} className="rounded-[9px] bg-brand px-3.5 py-1.5 text-[13px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1ea]">
        {prompt.kind === "plot" ? "Gieo" : "Xem"}
      </button>
    </div>
  );
}

/** Cần điều khiển cảm ứng ở chế độ đi dạo */
export function Joystick({ onMove }: { onMove: (x: number, y: number) => void }) {
  const el = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLElement>(null);
  const id = useRef<number | null>(null);
  const update = (e: React.PointerEvent) => {
    const r = el.current!.getBoundingClientRect(),
      cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    let dx = (e.clientX - cx) / (r.width / 2),
      dy = (e.clientY - cy) / (r.height / 2);
    const l = Math.hypot(dx, dy);
    if (l > 1) {
      dx /= l;
      dy /= l;
    }
    if (knob.current) knob.current.style.transform = `translate(${dx * 34}px,${dy * 34}px)`;
    onMove(dx, dy);
  };
  const end = (e: React.PointerEvent) => {
    if (e.pointerId !== id.current) return;
    id.current = null;
    if (knob.current) knob.current.style.transform = "";
    onMove(0, 0);
  };
  useEffect(() => () => onMove(0, 0), [onMove]);
  return (
    <div
      ref={el}
      aria-hidden
      className="absolute bottom-[calc(76px+env(safe-area-inset-bottom))] left-[calc(22px+env(safe-area-inset-left))] z-[3] grid h-28 w-28 touch-none place-items-center rounded-full border-[1.5px] border-white/35 bg-[rgba(20,18,28,0.38)]"
      onPointerDown={(e) => {
        id.current = e.pointerId;
        el.current?.setPointerCapture(e.pointerId);
        update(e);
        e.preventDefault();
      }}
      onPointerMove={(e) => e.pointerId === id.current && update(e)}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <i ref={knob} className="h-[46px] w-[46px] rounded-full bg-[rgba(245,241,234,0.85)] shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
    </div>
  );
}

/** Thông báo ngắn (tự ẩn) */
export function Toast({ msg }: { msg: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        GLASS,
        "pointer-events-none absolute bottom-9 left-1/2 z-[4] max-w-[calc(100%-32px)] -translate-x-1/2 px-3.5 py-2 text-center text-[13px] transition-opacity duration-250 md:bottom-[calc(60px+env(safe-area-inset-bottom))]",
        msg ? "opacity-100" : "opacity-0"
      )}
    >
      {msg}
    </div>
  );
}

/** Dòng hướng dẫn thao tác (chỉ màn rộng; chừa chỗ cho đồng hồ ở góc trái dưới) */
export function HelpLine({ view }: { view: LandView }) {
  return (
    <p className={cn(GLASS, "absolute right-[calc(16px+env(safe-area-inset-right))] bottom-[calc(16px+env(safe-area-inset-bottom))] hidden max-w-[calc(100%-280px)] px-3 py-1.5 text-[12px] lg:block", GLASS_INK_2)}>
      {view === "walk"
        ? "WASD hoặc phím mũi tên để đi · giữ Shift để chạy · chạm mặt đất để đi tới · E để tương tác"
        : "Kéo để xoay · cuộn hoặc chụm để thu phóng · chạm vào cây hay sinh vật để xem"}
    </p>
  );
}
