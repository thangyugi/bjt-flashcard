"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Layers, SquareCheckBig } from "lucide-react";
import { NAV_ITEMS } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

const ICONS = [House, Layers, SquareCheckBig];

/** Thanh điều hướng dưới đáy — chỉ hiện trên mobile, ẩn khi đang làm trắc nghiệm. */
export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/quiz")) return null;

  return (
    <>
      {/* Chừa chỗ để nội dung không bị thanh cố định che */}
      <div className="h-20 md:hidden" aria-hidden />
      <nav
        aria-label="Điều hướng chính"
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-line bg-surface px-3 pt-2 pb-[max(env(safe-area-inset-bottom),14px)] md:hidden"
      >
        {NAV_ITEMS.map((item, i) => {
          const Icon = ICONS[i];
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-0.5 text-[11.5px]",
                active ? "font-bold text-brand" : "font-medium text-ink-3"
              )}
            >
              <Icon className="h-[22px] w-[22px]" strokeWidth={2} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
