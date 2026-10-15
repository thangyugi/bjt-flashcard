"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ListTree, Search, X } from "lucide-react";
import { Jp } from "./Jp";
import { cn } from "@/lib/utils";

export interface NavItem {
  /** id phần tử trong trang (anchor) */
  id: string;
  /** Số thứ tự hiển thị, ví dụ "337" hoặc "①" */
  no: string;
  /** Tiếng Nhật đã gắn furigana */
  jp: string;
  /** Nghĩa tiếng Việt */
  vi: string;
  /** Chuỗi phụ để tìm (cách đọc, Hán Việt…) */
  search?: string;
}

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

/**
 * Nút nổi "Danh sách" cho bài học dài (mobile / tablet): mở bảng liệt kê mục & từng từ,
 * có ô tìm; chọn là cuộn tới đúng chỗ. Đánh dấu từ đang xem.
 */
export function LessonNavigator({
  title,
  sections,
  items,
  label = "Danh sách từ",
}: {
  title: string;
  sections: { id: string; label: string }[];
  items: NavItem[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Theo dõi từ đang hiện trên màn hình
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  // Khóa cuộn nền, Esc để đóng, cuộn danh sách tới từ đang xem
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => {
      listRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "center" });
    });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const shown = useMemo(() => {
    const f = fold(q.trim());
    if (!f) return items;
    return items.filter((i) => fold(`${i.no} ${i.jp} ${i.vi} ${i.search ?? ""}`).includes(f));
  }, [items, q]);

  const go = (id: string) => {
    setOpen(false);
    setQ("");
    // Đợi bảng đóng (mở lại cuộn trang) rồi mới cuộn tới
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }, 60);
  };

  const activeItem = items.find((i) => i.id === active);

  return (
    <>
      <div className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom)+92px)] z-40 flex flex-col items-end gap-2 md:bottom-6 xl:hidden">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Lên đầu trang"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow-md"
        >
          <ArrowUp className="h-[18px] w-[18px]" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="flex h-12 items-center gap-2 rounded-full bg-ink pr-4 pl-3.5 text-[14px] font-semibold text-paper shadow-lg"
        >
          <ListTree className="h-5 w-5" aria-hidden />
          {label}
          {activeItem && <span className="rounded-full bg-white/15 px-2 py-0.5 text-[12px]">{activeItem.no}</span>}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-stretch md:justify-end" role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Đóng" onClick={() => setOpen(false)} />
          <div className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-paper shadow-2xl md:max-h-none md:w-[420px] md:rounded-none md:rounded-l-3xl">
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 pt-4 pb-3">
              <span className="text-[16px] font-extrabold text-ink">{title}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Đóng" className="rounded-lg p-1.5 text-ink-3 hover:bg-surface-2">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="flex flex-col gap-3 border-b border-line px-5 py-3">
              <div className="flex flex-wrap gap-1.5">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(s.id)}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] font-semibold text-ink-2 hover:border-brand hover:text-ink"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <label className="flex h-10 items-center gap-2 rounded-xl border border-line-strong bg-surface px-3">
                <Search className="h-4 w-4 text-ink-3" aria-hidden />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm: kanji, cách đọc, nghĩa…"
                  aria-label="Tìm trong bài"
                  className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3"
                />
              </label>
            </div>
            <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 pb-[max(env(safe-area-inset-bottom),12px)]">
              {shown.length === 0 && <p className="px-3 py-6 text-center text-sm text-ink-3">Không tìm thấy.</p>}
              <ul className="flex flex-col">
                {shown.map((i) => (
                  <li key={i.id}>
                    <button
                      type="button"
                      onClick={() => go(i.id)}
                      aria-current={i.id === active ? "true" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-surface-2",
                        i.id === active && "bg-brand-soft"
                      )}
                    >
                      <span className="w-9 shrink-0 text-[12px] font-bold text-ink-3">{i.no}</span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[17px] leading-[1.9] font-bold text-ink">
                          <Jp t={i.jp} />
                        </span>
                        <span className="truncate text-[13px] text-ink-2">{i.vi}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
