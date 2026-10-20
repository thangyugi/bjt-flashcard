"use client";

import { useEffect, useRef } from "react";

/** Thanh tiến độ đọc mảnh, nằm ngay dưới thanh tiêu đề (và thanh phụ của khóa trên màn hẹp). */
export function ReadProgress() {
  const barRef = useRef<HTMLDivElement>(null);
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
    <div className="oci-read-progress-host" aria-hidden>
      <div ref={barRef} className="oci-read-progress" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
