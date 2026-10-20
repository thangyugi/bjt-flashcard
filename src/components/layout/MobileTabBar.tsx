"use client";

import Link, { useLinkStatus } from "next/link";
import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChartNoAxesColumnIncreasing, GraduationCap, House, Layers, Sprout, SquareCheckBig } from "lucide-react";
import { NAV_ITEMS } from "@/components/layout/Header";
import { cn } from "@/lib/utils";

const ICONS = [House, Layers, SquareCheckBig, GraduationCap, ChartNoAxesColumnIncreasing, Sprout];

/** Thanh điều hướng dưới đáy — chỉ hiện trên mobile, ẩn ở màn trắc nghiệm và học theo nhóm. */
export function MobileTabBar() {
  const pathname = usePathname();
  // Ẩn khi đang làm trắc nghiệm hoặc đang học một nhóm (chế độ tập trung)
  if (pathname.startsWith("/quiz/play") || /^\/bjt\/[^/]+/.test(pathname)) return null;
  // Trang học OCI AI Foundations có điều hướng riêng
  if (pathname.startsWith("/oracle-oci-ai")) return null;

  return (
    <>
      {/* Chừa chỗ để nội dung không bị thanh cố định che */}
      <div className="h-20 md:hidden" aria-hidden />
      <nav
        aria-label="Điều hướng chính"
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-6 border-t border-line-strong bg-paper px-1 pt-2 pb-[max(env(safe-area-inset-bottom),14px)] md:hidden"
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
                "relative flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 text-[11px] tracking-[-0.01em] whitespace-nowrap",
                active ? "font-bold text-brand" : "font-medium text-ink-3"
              )}
            >
              {active && <span className="absolute -top-2 h-[2px] w-6 rounded-full bg-brand" aria-hidden />}
              <TabIcon Icon={Icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

/** Icon tab: hiện vòng xoay nhỏ khi đang tải trang đích */
function TabIcon({ Icon }: { Icon: LucideIcon }) {
  const { pending } = useLinkStatus();
  return (
    <span className="relative flex h-[22px] w-[22px] items-center justify-center">
      <Icon className={cn("h-[22px] w-[22px] transition-opacity", pending && "opacity-30")} strokeWidth={1.75} aria-hidden />
      {pending && (
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-brand-soft border-t-brand" aria-hidden />
      )}
    </span>
  );
}
