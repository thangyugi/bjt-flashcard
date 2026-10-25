"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance } from "@/lib/land/economy";
import { AccountButton } from "@/components/account/AccountButton";
import { HeaderSettings } from "@/components/layout/HeaderSettings";
import { Gem } from "@/components/home/icons";

const COURSE_PATHS = ["/courses", "/jlpt-n1", "/english", "/oracle-oci-ai", "/claude-ccar-p", "/bjt"];
const under = (p: string, base: string) => p === base || p.startsWith(`${base}/`);

/** Điều hướng chính (thanh tiêu đề và thanh dưới đáy trên mobile dùng chung); logo dẫn về trang chủ */
export const NAV_ITEMS = [
  { href: "/courses", label: "Khóa học", match: (p: string) => COURSE_PATHS.some((c) => under(p, c)) },
  { href: "/quiz", label: "Trắc nghiệm", match: (p: string) => under(p, "/quiz") },
  { href: "/review", label: "Ôn tập", match: (p: string) => under(p, "/review") },
  { href: "/progress", label: "Tiến độ", match: (p: string) => under(p, "/progress") },
  { href: "/land", label: "Vùng đất", match: (p: string) => under(p, "/land") },
];

/**
 * Thanh tiêu đề chung: toàn bề ngang, nền giấy, một vạch mảnh phía dưới.
 * Logo + tên, các mục điều hướng, chip Tinh thể (khi đã đăng nhập), cài đặt giọng đọc và nút tài khoản.
 */
export function Header() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const { signedIn } = useAuth();

  // Trên mobile, trang học bài / trắc nghiệm có thanh trên cùng riêng (khách thấy màn mời đăng nhập nên vẫn giữ thanh tiêu đề)
  const hideOnMobile = hydrated && signedIn && (/^\/bjt\/[^/]+/.test(pathname) || pathname.startsWith("/quiz/play"));

  return (
    <header className={cn("sticky top-0 z-50 border-b border-line-strong bg-paper", hideOnMobile && "hidden md:block")}>
      <div className="page-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 self-stretch" aria-label="LeoEdu, trang chủ">
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-brand font-mincho text-[18px] leading-none font-bold text-white"
            aria-hidden
          >
            語
          </span>
          <span className="text-[15px] font-bold tracking-[-0.01em] whitespace-nowrap text-ink md:hidden lg:inline">
            LeoEdu
          </span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden h-full items-stretch gap-5 md:flex lg:gap-7">
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center text-[14px] whitespace-nowrap transition-colors",
                  active ? "font-semibold text-ink" : "font-medium text-ink-2 hover:text-ink"
                )}
              >
                <PendingLabel label={item.label} />
                {active && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand" aria-hidden />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <CrystalChip />
          <HeaderSettings />
          <AccountButton />
        </div>
      </div>
    </header>
  );
}

/** Chip Tinh thể: số dư thật (hoạt động học − đã tiêu ở vùng đất), chỉ hiện khi đã đăng nhập */
function CrystalChip() {
  const hydrated = useHydrated();
  const { user } = useAuth();
  const days = useActivityStore((s) => s.days);
  const spent = useLandStore((s) => s.spent);
  if (!hydrated || !user) return null;
  const balance = crystalBalance(days, spent);
  return (
    <Link
      href="/land"
      title="Tinh thể — mở vùng đất"
      aria-label={`${balance.toLocaleString("vi-VN")} Tinh thể, mở vùng đất`}
      className="flex h-10 items-center gap-2 rounded-lg border border-line-strong px-3 text-[13.5px] md:h-9 font-semibold text-ink tabular-nums transition-colors hover:border-ink-3 [&_svg]:h-3.5 [&_svg]:w-3.5"
    >
      <Gem />
      {balance.toLocaleString("vi-VN")}
    </Link>
  );
}

/** Nhãn menu nhấp nháy nhẹ trong lúc trang đích đang tải */
function PendingLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();
  return <span className={cn("transition-opacity", pending && "animate-pulse text-brand")}>{label}</span>;
}
