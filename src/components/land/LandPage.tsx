"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance, crystalsEarned, totalXp, XP_PER_CRYSTAL } from "@/lib/land/economy";
import { cn } from "@/lib/utils";
import { CR, PLOT_COUNT, RAR, SP } from "./data";
import type { LandEngine, LandEvents, LandPrompt, LandSelection, LandTime, LandView, PlantingMode, PlantingRecord } from "./engine";
import { FieldGuide } from "./FieldGuide";
import { LandScene, type SceneStatus } from "./LandScene";
import { PlanStrip } from "./PlanStrip";
import { HelpLine, Joystick, ModeToggle, PlantingHint, Prompt, SceneTitle, TimeControl, Toast } from "./SceneControls";
import { GLASS } from "./ui";

/** Chiều cao khung: trừ thanh tiêu đề (h-14 / md:h-16) và thanh tab dưới đáy trên mobile */
const FULL_H = "h-[calc(100dvh-8.5rem)] min-h-[440px] md:h-[calc(100dvh-4rem)]";

/** Trang /land: cần đăng nhập. Chưa đăng nhập thì xem trước vùng đất (không thao tác được) kèm lời mời đăng nhập. */
export function LandPage() {
  const hydrated = useHydrated();
  const { ready, user } = useAuth();
  if (!hydrated || !ready) {
    return (
      <div className={cn(FULL_H, "relative grid place-items-center bg-[#072b2a]")}>
        <p className={cn(GLASS, "px-4 py-2.5 text-[13px]")} role="status">
          Đang mở vùng đất…
        </p>
      </div>
    );
  }
  return user ? <LandApp /> : <LandPreview />;
}

const toRecords = (list: { plot: number; species: string; plantedAt: string }[]): PlantingRecord[] =>
  list.map((p) => ({ plot: p.plot, species: p.species, plantedAt: Date.parse(p.plantedAt) || 0 }));

/** Bản xem trước khi chưa đăng nhập */
function LandPreview() {
  const engineRef = useRef<LandEngine | null>(null);
  const plantings = useLandStore((s) => s.plantings);
  const records = useMemo(() => toRecords(plantings), [plantings]);
  const events = useMemo(() => ({}), []);
  return (
    <LandScene interactive={false} plantings={records} events={events} engineRef={engineRef} className={FULL_H}>
      <SceneTitle />
      <div className="absolute inset-0 z-[5] grid place-items-center bg-[rgba(10,14,18,0.28)] px-4">
        <div className="flex w-full max-w-[420px] flex-col gap-3 panel px-5 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] sm:px-7">
          <span className="eyebrow-label">Vùng đất của bạn</span>
          <h2 className="hx-title text-[26px]">Đăng nhập để mở vùng đất của bạn</h2>
          <p className="text-[14px] leading-relaxed text-ink-2">
            Mỗi {XP_PER_CRYSTAL} XP bạn học được thành 1 Tinh thể. Dùng Tinh thể gieo cây quý vào tám ô đất trên Thảo nguyên Pha Lê, đi dạo cùng Lữ khách và ngắm cây lớn lên.
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Link href="/login?next=/land" className="flex h-11 flex-1 items-center justify-center rounded-[10px] bg-brand px-4 text-[14.5px] font-semibold whitespace-nowrap text-white hover:bg-brand-hover">
              Đăng nhập
            </Link>
            <Link
              href="/register?next=/land"
              className="flex h-11 flex-1 items-center justify-center rounded-[10px] border border-line-strong px-4 text-[14.5px] font-semibold whitespace-nowrap text-ink hover:bg-surface-2"
            >
              Tạo tài khoản
            </Link>
          </div>
          <p className="text-[12.5px] text-ink-3">Các bài học vẫn mở cho mọi người — chỉ vùng đất cần tài khoản.</p>
        </div>
      </div>
    </LandScene>
  );
}

const DEFAULT_SPECIES = "huyetrong";

/** Vùng đất đầy đủ cho người đã đăng nhập */
function LandApp() {
  const engineRef = useRef<LandEngine | null>(null);
  const plantings = useLandStore((s) => s.plantings);
  const spent = useLandStore((s) => s.spent);
  const days = useActivityStore((s) => s.days);
  const earned = crystalsEarned(days);
  const balance = crystalBalance(days, spent);
  const xpToNext = XP_PER_CRYSTAL - (totalXp(days) % XP_PER_CRYSTAL);
  const records = useMemo(() => toRecords(plantings), [plantings]);
  const planted = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of plantings) m[p.species] = (m[p.species] ?? 0) + 1;
    return m;
  }, [plantings]);
  const freePlots = useMemo(() => Array.from({ length: PLOT_COUNT }, (_, i) => i).filter((i) => !plantings.some((p) => p.plot === i)), [plantings]);

  const [status, setStatus] = useState<SceneStatus>("loading");
  const live = status === "ready";
  const [sel, setSel] = useState<LandSelection>(() => {
    const last = plantings[plantings.length - 1];
    return { kind: "species", id: last?.species ?? DEFAULT_SPECIES, focus: null, onLand: 0, deco: 0 };
  });
  const [growth, setGrowth] = useState(1);
  const [creatureStatus, setCreatureStatus] = useState("");
  const [mode, setModeState] = useState<PlantingMode>(null);
  const [view, setView] = useState<LandView>("overview");
  const [prompt, setPrompt] = useState<LandPrompt | null>(null);
  const [time, setTime] = useState<LandTime | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [touch, setTouch] = useState(false);
  const sceneBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const upd = () => setTouch(mq.matches || "ontouchstart" in window);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const setMode = useCallback((m: PlantingMode) => {
    setModeState(m);
    engineRef.current?.setPlanting(m);
  }, []);
  const cancelPlanting = useCallback(() => setMode(null), [setMode]);

  /** Gieo loài id vào ô plot: trừ Tinh thể trong store; engine nhận cây mới qua syncPlantings */
  const plantAt = useCallback(
    (plot: number, id: string) => {
      const sp = SP[id];
      if (!sp) return;
      const cost = RAR[sp.rar].cost;
      const ok = useLandStore.getState().plant({ plot, species: id, cost, balance });
      if (!ok) {
        showToast(cost > balance ? "Chưa đủ Tinh thể — hoàn thành Kế hoạch hôm nay để nhận thêm" : `Ô ${plot + 1} đã có cây`);
        return;
      }
      setMode(null);
      showToast(`Đã gieo ${sp.vn} ở ô ${plot + 1} · −${cost} Tinh thể`);
    },
    [balance, setMode, showToast]
  );

  const startPlanting = (id: string) => {
    const cost = RAR[SP[id].rar].cost;
    if (balance < cost || !freePlots.length) return;
    setMode({ kind: "species", id });
    // Trên mobile khung cảnh nằm phía trên Sổ tay: cuộn lên để thấy các ô đất
    if (window.innerWidth < 768) sceneBox.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  const openPlotChooser = useCallback(
    (plot: number) => {
      const any = Object.values(SP).some((s) => balance >= RAR[s.rar].cost);
      if (!any) return showToast("Chưa đủ Tinh thể — hoàn thành Kế hoạch hôm nay để nhận thêm");
      setMode({ kind: "plot", plot });
    },
    [balance, setMode, showToast]
  );

  const events: Partial<LandEvents> = {
    onSelect: (s) => {
      setSel(s);
      if (s.kind === "species" && s.focus) setGrowth(s.focus.growth);
    },
    onGrowth: setGrowth,
    onPlotPick: (plot) => {
      if (mode?.kind === "species") plantAt(plot, mode.id);
      else if (!mode) openPlotChooser(plot);
    },
    onPrompt: setPrompt,
    onToast: showToast,
    onView: setView,
    onTime: setTime,
    onCreatureStatus: setCreatureStatus,
  };

  // Engine sẵn sàng: chọn loài ban đầu (không bay camera)
  const onStatus = useCallback(
    (s: SceneStatus) => {
      setStatus(s);
      if (s === "ready" && sel.kind === "species") engineRef.current?.selectSpecies(sel.id, false);
    },
    // chỉ cần lựa chọn lúc engine vừa dựng xong
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Esc: hủy gieo
  useEffect(() => {
    if (!mode) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cancelPlanting();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, cancelPlanting]);

  const onJoy = useCallback((x: number, y: number) => engineRef.current?.setJoystick(x, y), []);

  const selectSpecies = (id: string) => {
    if (engineRef.current) engineRef.current.selectSpecies(id, true);
    else setSel({ kind: "species", id, focus: null, onLand: planted[id] ?? 0, deco: 0 });
  };
  const selectCreature = (id: string) => {
    if (!CR[id]) return;
    if (engineRef.current) engineRef.current.selectCreature(id, true);
    else setSel({ kind: "creature", id });
  };
  const interact = () => {
    const p = prompt;
    engineRef.current?.interact();
    if (p?.kind === "look" && window.innerWidth < 768) showToast("Thông tin ở Sổ tay thực vật bên dưới");
  };

  return (
    <div className="flex flex-col md:h-[calc(100dvh-4rem)]">
      <PlanStrip balance={balance} earned={earned} spent={spent} xpToNext={xpToNext} />
      <div className="min-h-0 flex-1 md:grid md:grid-cols-[62fr_38fr] md:grid-rows-[minmax(0,1fr)]">
        <div ref={sceneBox} className="scroll-mt-14 md:min-h-0">
          <LandScene
            interactive
            plantings={records}
            events={events}
            engineRef={engineRef}
            onStatus={onStatus}
            className="h-[min(66vh,600px)] min-h-[400px] md:h-full md:min-h-0"
          >
            <SceneTitle />
            {live && (
              <>
                <ModeToggle
                  view={view}
                  onWalk={() => engineRef.current?.setView("walk")}
                  onOverview={() => engineRef.current?.focusHome()}
                />
                <TimeControl
                  time={time}
                  onPreview={(h) => engineRef.current?.previewHour(h)}
                  onScrub={(h) => engineRef.current?.scrubHour(h)}
                  onLive={() => engineRef.current?.previewHour(null)}
                />
                <HelpLine view={view} />
                {mode && (
                  <PlantingHint
                    mode={mode}
                    freePlots={freePlots}
                    balance={balance}
                    preferred={sel.kind === "species" ? sel.id : null}
                    onPlot={(plot) => mode.kind === "species" && plantAt(plot, mode.id)}
                    onSpecies={(id) => mode.kind === "plot" && plantAt(mode.plot, id)}
                    onCancel={cancelPlanting}
                  />
                )}
                {prompt && !mode && <Prompt prompt={prompt} touch={touch} onAct={interact} />}
                {view === "walk" && touch && <Joystick onMove={onJoy} />}
              </>
            )}
            <Toast msg={toast} />
          </LandScene>
        </div>
        <FieldGuide
          sel={sel}
          growth={growth}
          creatureStatus={creatureStatus}
          balance={balance}
          freePlots={freePlots.length}
          planted={planted}
          live={live}
          onGrowth={(g) => {
            setGrowth(g);
            engineRef.current?.setGrowthPreview(g);
          }}
          onSelectSpecies={selectSpecies}
          onSelectCreature={selectCreature}
          onSow={startPlanting}
          onShow={() => engineRef.current?.showOnLand()}
        />
      </div>
    </div>
  );
}
