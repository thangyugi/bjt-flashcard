"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { CR, CREATURES, RAR, SP, SPECIES, STAGES, foldVi, stageOf, type SpeciesInfo } from "./data";
import type { LandSelection } from "./engine";
import { Swatch } from "./Swatch";

export interface FieldGuideProps {
  sel: LandSelection;
  /** Độ lớn của cây đang theo dõi (thanh sinh trưởng) */
  growth: number;
  creatureStatus: string;
  balance: number;
  freePlots: number;
  /** Số cây người học đã gieo theo loài */
  planted: Record<string, number>;
  /** Có engine 3D để xem trên đất / kéo sinh trưởng không */
  live: boolean;
  onGrowth: (g: number) => void;
  onSelectSpecies: (id: string) => void;
  onSelectCreature: (id: string) => void;
  onSow: (id: string) => void;
  onShow: () => void;
}

function Rarity({ k }: { k: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] whitespace-nowrap text-ink-2">
      <i className="inline-block h-2 w-2 rounded-full" style={{ background: RAR[k].c }} />
      {RAR[k].n}
    </span>
  );
}
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-md border border-line bg-surface px-1.5 text-[11.5px] text-ink-2">{children}</span>
);

/** Sổ tay thực vật: chi tiết loài đang chọn + danh sách loài & sinh vật */
export function FieldGuide(props: FieldGuideProps) {
  const { sel, planted, balance, onSelectSpecies, onSelectCreature } = props;
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState(-1);
  const query = foldVi(q.trim());
  const items = SPECIES.filter((s) => (filter < 0 || s.rar === filter) && (!query || foldVi(s.vn + " " + s.sci).includes(query)));
  const rare = items.filter((s) => !s.tree),
    common = items.filter((s) => s.tree);
  const have = SPECIES.filter((s) => planted[s.id]).length;

  const item = (s: SpeciesInfo) => {
    const n = planted[s.id] ?? 0,
      cost = RAR[s.rar].cost,
      can = balance >= cost;
    const current = sel.kind === "species" && sel.id === s.id;
    return (
      <li key={s.id}>
        <button
          type="button"
          aria-current={current}
          aria-label={`${s.vn}, ${s.sci}, độ hiếm ${RAR[s.rar].n}, ${n ? `đã trồng ${n} cây` : can ? `chưa trồng, giá ${cost} Tinh thể` : `chưa đủ Tinh thể, cần ${cost}`}${s.imag ? ", loài tưởng tượng" : ""}`}
          onClick={() => onSelectSpecies(s.id)}
          className={cn(
            "grid w-full grid-cols-[44px_1fr_auto] items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 text-left hover:bg-surface-2",
            current && "border-line bg-[#fff7f0] hover:bg-[#fff7f0]"
          )}
        >
          <Swatch id={s.id} className={cn("h-11 w-11 rounded-[9px]", !n && !can && "brightness-75 grayscale-[.85]")} />
          <span className="min-w-0">
            <b className="block truncate text-[13.5px] font-semibold text-ink">{s.vn}</b>
            <i className="block truncate text-[12px] text-ink-2">{s.sci}</i>
          </span>
          <span className="grid justify-items-end gap-0.5">
            <Rarity k={s.rar} />
            {n ? (
              <span className="text-[11.5px] font-semibold whitespace-nowrap text-ok">Đã trồng: {n}</span>
            ) : (
              <span className="text-[11.5px] whitespace-nowrap text-ink-3">{can ? `Chưa trồng · ${cost} Tinh thể` : `Khóa · cần ${cost} Tinh thể`}</span>
            )}
          </span>
        </button>
      </li>
    );
  };
  const head = (t: string) => (
    <li key={t}>
      <h4 className="mx-2 mt-3 mb-1 text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase">{t}</h4>
    </li>
  );

  return (
    <aside
      aria-labelledby="land-guide-title"
      className="relative z-10 -mt-[18px] flex min-h-0 flex-col rounded-t-[20px] bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.18)] md:mt-0 md:rounded-none md:border-l md:border-line md:pb-0 md:shadow-none"
    >
      <span className="mx-auto mt-2 block h-1 w-10 rounded bg-line md:hidden" aria-hidden />
      <div className="flex items-end justify-between gap-2.5 px-4 pt-2.5 pb-2 md:px-5 md:pt-4">
        <div>
          <span className="mb-0.5 block text-[11px] tracking-[0.08em] text-ink-3 uppercase">Hạt giống &amp; bộ sưu tập</span>
          <h2 id="land-guide-title" className="font-mincho text-[21px] font-bold tracking-[0.01em] text-ink">
            Sổ tay thực vật
          </h2>
        </div>
        <p className="text-[12.5px] text-ink-3">
          Đã trồng {have}/{SPECIES.length} loài
        </p>
      </div>

      <Detail {...props} />

      <div className="grid gap-2 px-4 pt-3 pb-2">
        <label className="relative block">
          <span className="sr-only">Tìm loài</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-ink-3" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên Việt hoặc tên khoa học"
            className="w-full rounded-[10px] border border-line bg-paper py-2 pointer-coarse:min-h-10 pr-3 pl-8 text-[13px] text-ink outline-none placeholder:text-ink-3 focus:border-brand focus:ring-2 focus:ring-brand/15"
          />
        </label>
        <div className="scrollbar-none flex gap-1.5 overflow-x-auto" role="group" aria-label="Lọc theo độ hiếm">
          {[[-1, "Tất cả"] as const, ...RAR.map((r, i) => [i, r.n] as const)].map(([v, n]) => (
            <button
              key={v}
              type="button"
              aria-pressed={filter === v}
              onClick={() => setFilter(v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12.5px] whitespace-nowrap pointer-coarse:min-h-10",
                filter === v ? "border-ink bg-ink text-surface" : "border-line bg-surface text-ink-2 hover:text-ink"
              )}
            >
              {v >= 0 && <i className="h-[7px] w-[7px] rounded-full" style={{ background: RAR[v].c }} />}
              {n}
            </button>
          ))}
        </div>
      </div>

      <ul aria-label="Danh sách loài" className="min-h-0 flex-1 px-2.5 pb-4 md:overflow-auto">
        {rare.length > 0 && head(`Thực vật quý · ${rare.length}`)}
        {rare.map(item)}
        {common.length > 0 && head(`Cây thường · ${common.length}`)}
        {common.map(item)}
        {!items.length && <li className="p-4 text-[13px] text-ink-3">Không tìm thấy loài phù hợp.</li>}
        {filter < 0 && !query && (
          <>
            {head("Sinh vật · Loài tưởng tượng")}
            {CREATURES.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  aria-current={sel.kind === "creature" && sel.id === c.id}
                  onClick={() => onSelectCreature(c.id)}
                  className={cn(
                    "grid w-full grid-cols-[44px_1fr_auto] items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 text-left hover:bg-surface-2",
                    sel.kind === "creature" && sel.id === c.id && "border-line bg-[#fff7f0] hover:bg-[#fff7f0]"
                  )}
                >
                  <Swatch id={c.id} creature className="h-11 w-11 rounded-[9px]" />
                  <span className="min-w-0">
                    <b className="block truncate text-[13.5px] font-semibold text-ink">{c.vn}</b>
                    <i className="block truncate text-[12px] text-ink-2">{c.sub}</i>
                  </span>
                  <span className="text-[11.5px] whitespace-nowrap text-ink-3">Loài tưởng tượng</span>
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    </aside>
  );
}

/** Thẻ chi tiết loài / sinh vật đang chọn */
function Detail({ sel, growth, creatureStatus, balance, freePlots, live, onGrowth, onSow, onShow }: FieldGuideProps) {
  const box = "mx-4 rounded-2xl border border-line bg-paper p-3.5";
  if (sel.kind === "creature") {
    const c = CR[sel.id];
    return (
      <section className={box} aria-live="polite" aria-label="Chi tiết sinh vật">
        <div className="flex items-start gap-3">
          <Swatch id={c.id} creature className="h-[76px] w-[76px] flex-none rounded-xl" />
          <div className="min-w-0">
            <p className="mb-0.5 flex flex-wrap gap-1.5">
              <Tag>Loài tưởng tượng</Tag>
              <Tag>Sinh vật</Tag>
            </p>
            <h3 className="text-[17px] leading-tight font-bold text-ink">{c.vn}</h3>
            <p className="text-[13px] text-ink-2 italic">{c.sub}</p>
            <p className="mt-0.5 text-[12.5px] text-ink-2">
              Nguồn gốc: <b className="font-semibold text-ink">Thảo nguyên Pha Lê</b>
            </p>
          </div>
        </div>
        <p className="mt-2.5 rounded-r-lg border-l-[3px] border-line bg-surface px-2.5 py-2 text-[13px] text-ink">{c.fact}</p>
        {live && (
          <>
            <p className="mt-2.5 text-[12.5px] text-ink-2">
              Đang: <b className="text-ink">{creatureStatus || "…"}</b>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <SecondaryButton onClick={onShow}>Xem trên đất</SecondaryButton>
            </div>
          </>
        )}
      </section>
    );
  }

  const sp = SP[sel.id];
  const cost = RAR[sp.rar].cost,
    can = balance >= cost;
  const fp = sel.focus;
  const g = fp ? growth : 0;
  const stage = fp ? stageOf(g) : "Chưa gieo";
  const sowLabel = !freePlots ? "Hết ô đất trống" : can ? `Gieo · ${cost} Tinh thể` : `Cần ${cost} Tinh thể`;
  return (
    <section className={box} aria-live="polite" aria-label="Chi tiết loài">
      <div className="flex items-start gap-3">
        <Swatch id={sp.id} className="h-[76px] w-[76px] flex-none rounded-xl" />
        <div className="min-w-0">
          <p className="mb-0.5 flex flex-wrap items-center gap-1.5">
            <Rarity k={sp.rar} />
            {sp.imag && <Tag>Loài tưởng tượng</Tag>}
            {sp.tree && <Tag>Cây thường</Tag>}
          </p>
          <h3 className="text-[17px] leading-tight font-bold text-ink">{sp.vn}</h3>
          <p className="text-[13px] text-ink-2 italic">
            {sp.sci}
            {sp.imag ? " (tên tưởng tượng)" : ""}
          </p>
          <p className="mt-0.5 text-[12.5px] text-ink-2">
            Nguồn gốc: <b className="font-semibold text-ink">{sp.origin}</b>
          </p>
        </div>
      </div>
      <p className="mt-2.5 rounded-r-lg border-l-[3px] border-line bg-surface px-2.5 py-2 text-[13px] text-ink">{sp.fact}</p>
      <div className="mt-3">
        <div className="flex items-baseline justify-between text-[12.5px] text-ink-2">
          <label htmlFor="land-scrub">
            Sinh trưởng{fp ? (fp.plot !== null ? ` · ô ${fp.plot + 1}` : " · mọc hoang") : ""}
          </label>
          <b className="text-[13px] text-ink">{stage}</b>
        </div>
        <input
          id="land-scrub"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(g * 100)}
          disabled={!fp || !live}
          aria-valuetext={stage}
          onChange={(e) => onGrowth(Number(e.target.value) / 100)}
          className="mt-2 mb-0.5 h-[22px] w-full cursor-pointer accent-ok disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex justify-between text-[11.5px] text-ink-3" aria-hidden>
          {STAGES.map((t) => (
            <span key={t} className={cn(fp && stage === t && "font-semibold text-ink")}>
              {t}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-[12px] text-ink-3">
          {fp ? "Kéo để xem cây lớn lên ngay trên đất." : "Gieo loài này vào một ô đất để theo dõi sinh trưởng."}
          {sel.deco ? ` Trong công viên đang có ${sel.deco} cây mọc sẵn.` : ""}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!can || !freePlots || !live}
          onClick={() => onSow(sp.id)}
          className="rounded-[10px] border border-brand bg-brand px-3.5 py-2 pointer-coarse:min-h-10 text-[13px] font-semibold text-white hover:bg-brand-hover disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-2 disabled:text-ink-3"
        >
          {sowLabel}
        </button>
        {live && sel.onLand > 0 && <SecondaryButton onClick={onShow}>Xem trên đất{sel.onLand - sel.deco > 1 ? ` (${sel.onLand - sel.deco})` : ""}</SecondaryButton>}
      </div>
    </section>
  );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-[10px] border border-line bg-surface px-3.5 py-2 pointer-coarse:min-h-10 text-[13px] font-semibold text-ink hover:bg-surface-2">
      {children}
    </button>
  );
}
