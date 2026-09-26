"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgressStats } from "@/hooks/useProgressStats";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/", label: "Tổng quan", match: (p: string) => p === "/" },
  { href: "/study", label: "Học bài", match: (p: string) => p.startsWith("/study") },
  { href: "/quiz?groupId=all", label: "Trắc nghiệm", match: (p: string) => p.startsWith("/quiz") },
];

export function Header() {
  const pathname = usePathname();
  const { mastered, total, pct } = useProgressStats();

  // Trên mobile, trang học bài / trắc nghiệm có thanh trên cùng riêng
  const hideOnMobile = pathname.startsWith("/study/") || pathname.startsWith("/quiz");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-xl",
        hideOnMobile && "hidden md:block"
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-8 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand font-mincho text-xl font-bold text-white">
            語
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-bold tracking-tight text-ink">BJT Flashcard</span>
            <span className="hidden font-jp text-[11px] text-ink-3 lg:block">ビジネス日本語</span>
          </div>
        </Link>

        {/* Nav — tablet / desktop */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden items-center gap-1 rounded-xl bg-surface-2 p-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-[9px] px-3 py-2 text-sm transition-colors lg:px-4",
                  active
                    ? "bg-surface font-semibold text-ink shadow-[0_1px_2px_rgba(28,25,23,0.04),0_2px_8px_rgba(28,25,23,0.04)]"
                    : "font-medium text-ink-2 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Tiến độ tổng */}
        <div className="flex items-center gap-2.5 text-[13px]" title={`Đã thuộc ${mastered}/${total} từ`}>
          <span className="hidden font-medium text-ink-3 lg:inline">
            {mastered}/{total}
          </span>
          <div className="h-1.5 w-14 overflow-hidden rounded-full bg-track lg:w-[88px]">
            <div
              className="h-full rounded-full bg-brand transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-bold text-brand">{pct}%</span>
        </div>
      </div>
    </header>
  );
}
