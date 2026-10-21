"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  /** id phần tử tiêu đề trong trang */
  id: string;
  text: string;
  /** Mục con (thụt vào một bậc) */
  sub?: boolean;
}

/** Khoảng cách từ mép trên màn hình (dưới thanh tiêu đề dính) coi như "đang đọc" */
const SPY_OFFSET = 128;

/**
 * Mục đang đọc: tiêu đề cuối cùng đã cuộn qua mốc SPY_OFFSET.
 * Dùng sự kiện cuộn (gộp theo khung hình) thay vì IntersectionObserver để mục dài vẫn được tô đúng.
 */
function useScrollSpy(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (!items.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      let cur = items[0].id;
      for (const i of items) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) cur = i.id;
      }
      // Cuộn tới đáy trang: tô mục cuối
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = items[items.length - 1].id;
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);
  return active;
}

function TocList({ items, active, onPick }: { items: TocItem[]; active?: string; onPick?: () => void }) {
  return (
    <ol>
      {items.map((i) => (
        <li key={i.id}>
          <a href={`#${i.id}`} aria-current={i.id === active ? "true" : undefined} className={cn(i.sub && "sub")} onClick={onPick}>
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Mục lục "Trong bài này" dùng chung cho mọi bài học (N1, IPA, OCI): danh sách có vạch dọc, tô mục đang đọc.
 * Đặt trong cột bên dính (sticky) trên màn rộng; màn hẹp dùng LessonTocCompact ở đầu bài.
 */
export function LessonToc({ items, title = "Trong bài này", className }: { items: TocItem[]; title?: string; className?: string }) {
  const active = useScrollSpy(items);
  if (items.length < 2) return null;
  return (
    <nav className={cn("ltoc", className)} aria-label={title}>
      <p className="ltoc-title">{title}</p>
      <TocList items={items} active={active} />
    </nav>
  );
}

/** Bản gọn cho màn hẹp: một dòng "Trong bài này" bấm để mở danh sách; chọn mục thì tự đóng. */
export function LessonTocCompact({ items, title = "Trong bài này", className }: { items: TocItem[]; title?: string; className?: string }) {
  const active = useScrollSpy(items);
  const [open, setOpen] = useState(false);
  if (items.length < 2) return null;
  const cur = items.find((i) => i.id === active);
  return (
    <details className={cn("ltoc-m", className)} open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
      <summary>
        <span className="ltoc-title">{title}</span>
        <span className="cnt">{items.length} mục</span>
        <ChevronDown className="chev" aria-hidden />
      </summary>
      <nav className="ltoc" aria-label={title}>
        <TocList items={items} active={cur?.id} onPick={() => setOpen(false)} />
      </nav>
    </details>
  );
}
