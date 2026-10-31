"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolio/store";
import { newId, type IntroBlock, type Introduce as IntroduceDoc } from "@/lib/portfolio/types";
import { move } from "./editors";
import { IntroBlockForm, IntroProfileForm } from "./intro-editors";
import { PfFrame, PfHead, SampleNotice, ViSwitch, useShowVi } from "./shell";

type Panel = { kind: "profile" } | { kind: "block"; id: string | null };

/** Introduce (自己紹介): thẻ hồ sơ, bài giới thiệu nổi bật và các mục — tiếng Nhật kèm bản dịch tiếng Việt */
export function Introduce() {
  const [editing, setEditing] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [showVi, setShowVi] = useShowVi();
  const open = (p: Panel) => {
    setEditing(true);
    setPanel(p);
  };

  return (
    <PfFrame
      title="Introduce"
      editing={editing}
      setEditing={setEditing}
      editHint="Đang chỉnh sửa · sửa hồ sơ, từng mục giới thiệu, hoặc thêm mục mới"
      editActions={
        <button type="button" className="tbtn brand" onClick={() => open({ kind: "block", id: null })}>
          <Plus aria-hidden /> Thêm mục
        </button>
      }
    >
      {(doc) => (
        <>
          {doc.introduce.sample && (
            <SampleNotice scope="introduce">
              Đây là bài tự giới thiệu mẫu của một kỹ sư <b>hư cấu</b>. Bấm «Chỉnh sửa» để thay bằng bài của bạn.
            </SampleNotice>
          )}
          <PfHead
            eyebrow="Introduce"
            title="自己紹介"
            lead="Giới thiệu bản thân bằng tiếng Nhật, kèm bản dịch tiếng Việt để luyện nói và kiểm tra ý."
            sample={doc.introduce.sample}
            controls={<ViSwitch on={showVi} onChange={setShowVi} />}
          />
          <Body intro={doc.introduce} showVi={showVi} editing={editing} onOpen={open} />
          {panel && <Panels panel={panel} intro={doc.introduce} onClose={() => setPanel(null)} />}
        </>
      )}
    </PfFrame>
  );
}

function Body({ intro, showVi, editing, onOpen }: { intro: IntroduceDoc; showVi: boolean; editing: boolean; onOpen: (p: Panel) => void }) {
  const save = usePortfolioStore((s) => s.savePart);
  const [ask, setAsk] = useState<string | null>(null);
  const p = intro.profile;
  const [featured, ...rest] = intro.blocks;
  const initials =
    p.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  const setBlocks = (blocks: IntroBlock[]) => save("introduce", { ...intro, blocks });

  const tools = (b: IntroBlock, i: number) =>
    editing && (
      <div className="flex shrink-0 flex-wrap gap-2">
        <button type="button" className="tbtn dark" onClick={() => onOpen({ kind: "block", id: b.id })}>
          <Pencil aria-hidden /> Sửa
        </button>
        <button type="button" className="tbtn icon" onClick={() => setBlocks(move(intro.blocks, i, -1))} disabled={i === 0} aria-label="Đưa lên trên" title="Đưa lên trên">
          <ArrowUp aria-hidden />
        </button>
        <button
          type="button"
          className="tbtn icon"
          onClick={() => setBlocks(move(intro.blocks, i, 1))}
          disabled={i === intro.blocks.length - 1}
          aria-label="Đưa xuống dưới"
          title="Đưa xuống dưới"
        >
          <ArrowDown aria-hidden />
        </button>
        <button type="button" className="tbtn danger" onClick={() => setAsk(b.id)} aria-expanded={ask === b.id}>
          <Trash2 aria-hidden /> Xóa
        </button>
      </div>
    );
  const confirm = (b: IntroBlock) =>
    ask === b.id && (
      <div className="confirm" role="alert">
        <span className="min-w-0 flex-1">Xóa mục «{b.titleJa}»? Không hoàn tác được.</span>
        <button type="button" className="tbtn brand" onClick={() => setBlocks(intro.blocks.filter((x) => x.id !== b.id))}>
          Xóa mục
        </button>
        <button type="button" className="tbtn" onClick={() => setAsk(null)}>
          Hủy
        </button>
      </div>
    );

  return (
    <div className="flex flex-col gap-5 pt-8">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" aria-label="Hồ sơ">
        {/* Thẻ hồ sơ */}
        <div className="card flex flex-col p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-brand text-[28px] font-extrabold tracking-[-0.02em] text-white" aria-hidden>
              {initials}
            </span>
            <div className="min-w-0">
              {p.kana && (
                <span className="block font-jp text-[13px] text-ink-3" lang="ja">
                  {p.kana}
                </span>
              )}
              <h2 className="text-[clamp(24px,2.4vw,30px)] leading-tight font-extrabold tracking-[-0.03em] text-ink">{p.name || "Tên của bạn"}</h2>
            </div>
          </div>
          {p.catchJa && (
            <p className="mt-6 font-jp text-[clamp(18px,1.7vw,22px)] leading-relaxed font-bold text-ink" lang="ja">
              「{p.catchJa}」
            </p>
          )}
          {showVi && p.catchVi && <p className="mt-1.5 text-[15px] leading-relaxed text-ink-3">{p.catchVi}</p>}
          <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-3 border-t border-line pt-5 text-[14px]">
            {(
              [
                ["Vai trò", p.role],
                ["Nơi ở", p.location],
                ["Kinh nghiệm", p.years],
                ["Ngôn ngữ", p.langs],
              ] as const
            )
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="m-0 font-semibold text-ink">{v}</dd>
                </div>
              ))}
          </dl>
          {editing && (
            <div className="mt-auto pt-6">
              <button type="button" className="tbtn dark w-full" onClick={() => onOpen({ kind: "profile" })}>
                <Pencil aria-hidden /> Sửa hồ sơ
              </button>
            </div>
          )}
        </div>

        {/* Mục đầu tiên: nổi bật */}
        {featured ? (
          <article className="card strong flex flex-col p-6 sm:p-8" aria-labelledby={`ib-${featured.id}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex h-6 items-center rounded-full bg-ink px-2.5 text-[11.5px] font-bold tracking-[0.08em] text-white uppercase">Nổi bật</span>
                <h3 id={`ib-${featured.id}`} className="mt-3 font-jp text-[clamp(22px,2.2vw,28px)] leading-snug font-bold text-ink" lang="ja">
                  {featured.titleJa}
                </h3>
                {showVi && featured.titleVi && <p className="mt-0.5 text-[14px] text-ink-3">{featured.titleVi}</p>}
              </div>
              {tools(featured, 0)}
            </div>
            {confirm(featured)}
            <BlockText b={featured} showVi={showVi} big />
          </article>
        ) : (
          <div className="card flex flex-col items-start justify-center gap-4 border-dashed p-8 text-ink-3">
            <span>Chưa có mục giới thiệu nào. Mục đầu tiên sẽ hiện nổi bật ở đây (ví dụ «1分自己紹介»).</span>
            <button type="button" className="tbtn brand" onClick={() => onOpen({ kind: "block", id: null })}>
              <Plus aria-hidden /> Thêm mục
            </button>
          </div>
        )}
      </section>

      {(rest.length > 0 || editing) && (
        <section className="grid gap-5 md:grid-cols-2" aria-label="Các mục giới thiệu">
          {rest.map((b, k) => (
            <article key={b.id} className="card flex flex-col p-6 sm:p-7" aria-labelledby={`ib-${b.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[13px] font-extrabold tracking-[-0.02em] text-line-strong">{String(k + 2).padStart(2, "0")}</span>
                  <h3 id={`ib-${b.id}`} className="mt-1 font-jp text-[20px] leading-snug font-bold text-ink" lang="ja">
                    {b.titleJa}
                  </h3>
                  {showVi && b.titleVi && <p className="mt-0.5 text-[13.5px] text-ink-3">{b.titleVi}</p>}
                </div>
                {tools(b, k + 1)}
              </div>
              {confirm(b)}
              <BlockText b={b} showVi={showVi} />
            </article>
          ))}
          {editing && (
            <button
              type="button"
              onClick={() => onOpen({ kind: "block", id: null })}
              className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line-strong bg-surface text-[15px] font-semibold text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white" aria-hidden>
                <Plus className="h-5 w-5" />
              </span>
              Thêm mục giới thiệu
            </button>
          )}
        </section>
      )}

      <footer className="mt-11 flex flex-wrap justify-between gap-3 border-t border-line-strong pt-6 text-[13px] text-ink-3">
        <span>
          © {new Date().getFullYear()} {p.name || "Portfolio"} · LeoEdu Portfolio
        </span>
        <span>Chỉ bạn xem được trang này.</span>
      </footer>
    </div>
  );
}

function BlockText({ b, showVi, big }: { b: IntroBlock; showVi: boolean; big?: boolean }) {
  return (
    <>
      <p className={`mt-4 font-jp whitespace-pre-line text-ink ${big ? "text-[17px] leading-[2]" : "text-[15.5px] leading-[1.95]"}`} lang="ja">
        {b.bodyJa || <span className="text-ink-3">（本文はまだありません）</span>}
      </p>
      {showVi && b.bodyVi && (
        <div className="vi-box mt-4 px-5 py-4">
          <p className="eyebrow-label">Bản dịch · Tiếng Việt</p>
          <p className="mt-2 text-[15px] leading-[1.8] whitespace-pre-line text-ink-2">{b.bodyVi}</p>
        </div>
      )}
    </>
  );
}

function Panels({ panel, intro, onClose }: { panel: Panel; intro: IntroduceDoc; onClose: () => void }) {
  const save = usePortfolioStore((s) => s.savePart);
  if (panel.kind === "profile") return <IntroProfileForm initial={intro.profile} onClose={onClose} onSave={(profile) => save("introduce", { ...intro, profile })} />;
  const b = panel.id ? intro.blocks.find((x) => x.id === panel.id) : null;
  return (
    <IntroBlockForm
      isNew={!b}
      initial={b ?? { id: newId(), titleJa: "", titleVi: "", bodyJa: "", bodyVi: "" }}
      onClose={onClose}
      onSave={(v) => save("introduce", { ...intro, blocks: b ? intro.blocks.map((x) => (x.id === v.id ? v : x)) : [...intro.blocks, v] })}
      onDelete={b ? () => save("introduce", { ...intro, blocks: intro.blocks.filter((x) => x.id !== b.id) }) : undefined}
    />
  );
}
