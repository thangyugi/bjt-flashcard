"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Thanh tải mảnh màu đỏ trên cùng màn hình khi chuyển trang
 * (bấm link nội bộ hoặc nút quay lại). Tự ẩn khi URL đã đổi.
 */
export function NavProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}?${searchParams.toString()}`;
  // URL tại thời điểm bắt đầu chuyển trang; còn trùng URL hiện tại = đang tải
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const loading = startedAt !== null && startedAt === currentUrl;

  useEffect(() => {
    const start = () => setStartedAt(`${window.location.pathname}?${new URLSearchParams(window.location.search).toString()}`);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", start);
    };
  }, []);

  // Phòng khi điều hướng bị huỷ: tự tắt sau 10 giây
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setStartedAt(null), 10_000);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px] transition-opacity duration-300",
        loading ? "opacity-100" : "opacity-0"
      )}
    >
      {loading && <div className="nav-progress-bar h-full bg-brand shadow-[0_0_8px_rgba(184,32,47,0.5)]" />}
    </div>
  );
}
