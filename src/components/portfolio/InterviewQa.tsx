"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Pencil, Plus, Trash2 } from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolio/store";
import { QA_CATS, newId, type Interview, type QaCat, type QaItem } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";
import { move } from "./editors";
import { QaForm } from "./intro-editors";
import { PfFrame, PfHead, SampleNotice, ViSwitch, useShowVi } from "./shell";

type Panel = { id: string | null };
const catOf = (k: QaCat) => QA_CATS.find((c) => c.key === k) ?? QA_CATS[0];

/** Interview Q&A (面接Q&A): câu hỏi phỏng vấn IT, trả lời tiếng Nhật kèm bản dịch tiếng Việt; lọc theo chủ đề, mở / gập câu trả lời */
export function InterviewQa() {
  const [editing, setEditing] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [filter, setFilter] = useState<QaCat | "all">("all");
  const [showVi, setShowVi] = useShowVi();
  const open = (p: Panel) => {
    setEditing(true);
    setPanel(p);
  };

  return (
    <PfFrame
      title="Interview Q&A"
      editing={editing}
      setEditing={setEditing}
      editHint="Đang chỉnh sửa · bấm «Sửa» trên từng câu, hoặc thêm câu hỏi mới"
      editActions={
        <button type="button" className="tbtn brand" onClick={() => open({ id: null })}>
          <Plus aria-hidden /> Thêm câu hỏi
        </button>
      }
    >
      {(doc) => (
        <>
          {doc.interview.sample && (
            <SampleNotice scope="interview">
              Đây là bộ câu hỏi phỏng vấn IT mẫu, trả lời theo một kỹ sư <b>hư cấu</b>. Bấm «Chỉnh sửa» để sửa câu trả lời theo kinh nghiệm của bạn, hoặc thêm câu mới.
            </SampleNotice>
          )}
          <PfHead
            eyebrow="Interview Q&A"
            title="面接Q&A"
            lead="Các câu hỏi phỏng vấn IT thường gặp ở công ty Nhật, câu trả lời mẫu bằng tiếng Nhật kèm bản dịch tiếng Việt. Bấm vào câu hỏi để xem câu trả lời."
            sample={doc.interview.sample}
          />
          <QaList qa={doc.interview} filter={filter} setFilter={setFilter} showVi={showVi} setShowVi={setShowVi} editing={editing} onOpen={open} />
          {panel && <Panels panel={panel} qa={doc.interview} defaultCat={filter === "all" ? "intro" : filter} onClose={() => setPanel(null)} />}
        </>
      )}
    </PfFrame>
  );
}

function QaList({
  qa,
  filter,
  setFilter,
  showVi,
  setShowVi,
  editing,
  onOpen,
}: {
  qa: Interview;
  filter: QaCat | "all";
  setFilter: (f: QaCat | "all") => void;
  showVi: boolean;
  setShowVi: (v: boolean) => void;
  editing: boolean;
  onOpen: (p: Panel) => void;
}) {
  const save = usePortfolioStore((s) => s.savePart);
  // Câu đang mở: mặc định mở câu đầu tiên để thấy ngay dạng câu trả lời
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(qa.items.slice(0, 1).map((q) => q.id)));
  const [ask, setAsk] = useState<string | null>(null);
  const items = qa.items;
  const shown = filter === "all" ? items : items.filter((q) => q.cat === filter);
  const anyClosed = shown.some((q) => !openIds.has(q.id));
  const setItems = (next: QaItem[]) => save("interview", { ...qa, items: next });
  const toggle = (id: string) =>
    setOpenIds((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const chips: { key: QaCat | "all"; ja: string }[] = [{ key: "all", ja: "すべて" }, ...QA_CATS];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 pb-2">
        <div role="group" aria-label="Lọc theo chủ đề" className="flex flex-wrap gap-2">
          {chips.map((c) => {
            const n = c.key === "all" ? items.length : items.filter((q) => q.cat === c.key).length;
            return (
              <button key={c.key} type="button" className="chip inline-flex items-center gap-1.5" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
                <span className="font-jp" lang="ja">
                  {c.ja}
                </span>
                <span className="opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <ViSwitch on={showVi} onChange={setShowVi} />
          <button type="button" className="tbtn" onClick={() => setOpenIds((s) => new Set(anyClosed ? [...s, ...shown.map((q) => q.id)] : [...s].filter((id) => !shown.some((q) => q.id === id))))}>
            {anyClosed ? "Mở tất cả câu trả lời" : "Thu gọn tất cả"}
          </button>
        </div>
      </div>

      {shown.map((q) => {
        const i = items.indexOf(q);
        const isOpen = openIds.has(q.id);
        const c = catOf(q.cat);
        const aid = `qa-a-${q.id}`;
        return (
          <article key={q.id} className="card overflow-hidden">
            <div className="flex items-start gap-4 p-5 sm:gap-5 sm:p-6">
              <span className="hidden min-w-[52px] shrink-0 text-[30px] leading-none font-extrabold tracking-[-0.04em] text-line-strong sm:block">Q{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold tracking-[0.04em] text-brand">
                  <span className="font-jp" lang="ja">
                    {c.ja}
                  </span>{" "}
                  · <span className="font-semibold">{c.vi}</span>
                </p>
                <button type="button" onClick={() => toggle(q.id)} aria-expanded={isOpen} aria-controls={aid} className="mt-1.5 flex w-full items-start justify-between gap-4 text-left">
                  <span className="min-w-0">
                    <span className="block font-jp text-[clamp(17px,1.6vw,21px)] leading-normal font-bold text-ink" lang="ja">
                      Q. {q.qJa}
                    </span>
                    {showVi && q.qVi && <span className="mt-1 block text-[15px] leading-relaxed text-ink-3">{q.qVi}</span>}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong bg-surface text-ink" aria-hidden>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                  </span>
                </button>
              </div>
              {editing && (
                <div className="flex shrink-0 flex-wrap justify-end gap-2">
                  <button type="button" className="tbtn dark" onClick={() => onOpen({ id: q.id })}>
                    <Pencil aria-hidden /> Sửa
                  </button>
                  <button type="button" className="tbtn icon" onClick={() => setItems(move(items, i, -1))} disabled={i === 0} aria-label="Đưa lên trên" title="Đưa lên trên">
                    <ArrowUp aria-hidden />
                  </button>
                  <button type="button" className="tbtn icon" onClick={() => setItems(move(items, i, 1))} disabled={i === items.length - 1} aria-label="Đưa xuống dưới" title="Đưa xuống dưới">
                    <ArrowDown aria-hidden />
                  </button>
                  <button type="button" className="tbtn danger" onClick={() => setAsk(q.id)} aria-expanded={ask === q.id}>
                    <Trash2 aria-hidden /> Xóa
                  </button>
                </div>
              )}
            </div>
            {ask === q.id && (
              <div className="confirm mx-5 mb-5 sm:mx-6" role="alert">
                <span className="min-w-0 flex-1">Xóa câu hỏi này? Không hoàn tác được.</span>
                <button type="button" className="tbtn brand" onClick={() => setItems(items.filter((x) => x.id !== q.id))}>
                  Xóa câu hỏi
                </button>
                <button type="button" className="tbtn" onClick={() => setAsk(null)}>
                  Hủy
                </button>
              </div>
            )}
            {isOpen && (
              <div id={aid} className={cn("grid gap-3.5 px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[96px]", showVi && q.aVi && "lg:grid-cols-2")}>
                <div className="min-w-0 rounded-xl border border-line bg-surface px-5 py-4">
                  <p className="eyebrow-label">回答 · 日本語</p>
                  <p className="mt-2 font-jp text-[16px] leading-[1.95] whitespace-pre-line text-ink" lang="ja">
                    {q.aJa || <span className="text-ink-3">（回答はまだありません）</span>}
                  </p>
                </div>
                {showVi && q.aVi && (
                  <div className="vi-box min-w-0 px-5 py-4">
                    <p className="eyebrow-label">Bản dịch · Tiếng Việt</p>
                    <p className="mt-2 text-[15px] leading-[1.8] whitespace-pre-line text-ink-2">{q.aVi}</p>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}

      {shown.length === 0 && (
        <div className="card flex flex-wrap items-center justify-between gap-4 border-dashed p-7 text-ink-3">
          <span>Chưa có câu hỏi nào{filter === "all" ? "" : " trong chủ đề này"}.</span>
          <button type="button" className="tbtn brand" onClick={() => onOpen({ id: null })}>
            <Plus aria-hidden /> Thêm câu hỏi
          </button>
        </div>
      )}

      <footer className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line-strong pt-6 text-[13px] text-ink-3">
        <span>© {new Date().getFullYear()} · LeoEdu Portfolio</span>
        <span>Chỉ bạn xem được trang này.</span>
      </footer>
    </div>
  );
}

function Panels({ panel, qa, defaultCat, onClose }: { panel: Panel; qa: Interview; defaultCat: QaCat; onClose: () => void }) {
  const save = usePortfolioStore((s) => s.savePart);
  const q = panel.id ? qa.items.find((x) => x.id === panel.id) : null;
  return (
    <QaForm
      isNew={!q}
      initial={q ?? { id: newId(), cat: defaultCat, qJa: "", qVi: "", aJa: "", aVi: "" }}
      onClose={onClose}
      onSave={(v) => save("interview", { ...qa, items: q ? qa.items.map((x) => (x.id === v.id ? v : x)) : [...qa.items, v] })}
      onDelete={q ? () => save("interview", { ...qa, items: qa.items.filter((x) => x.id !== q.id) }) : undefined}
    />
  );
}
