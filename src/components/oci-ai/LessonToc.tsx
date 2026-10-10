"use client";

import { useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
}

/** Mục lục "Trong bài này" (màn rộng) + thanh tiến độ đọc dưới thanh trên cùng. */
export function LessonToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!items.length) return;
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -65% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
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
  }, []);

  return (
    <>
      <div className="oci-read-progress-host" aria-hidden>
        <div ref={barRef} className="oci-read-progress" style={{ transform: "scaleX(0)" }} />
      </div>
      {items.length > 1 && (
        <nav className="oci-toc" aria-label="Mục lục bài học">
          <div className="oci-toc-title">Trong bài này</div>
          <ol>
            {items.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`} className={i.id === active ? "active" : undefined}>
                  {i.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
}
