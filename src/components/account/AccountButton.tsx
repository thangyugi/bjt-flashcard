"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChartNoAxesColumnIncreasing, CircleUserRound, LogOut, Settings, UserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { signOutAndClear } from "@/lib/learning/sync";
import { computeStreak, useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance } from "@/lib/land/economy";
import { Gem } from "@/components/home/icons";
import { cn } from "@/lib/utils";

/** Nút tài khoản trên thanh tiêu đề (ẩn khi chưa cấu hình Supabase). Đã đăng nhập: mở menu tài khoản. */
export function AccountButton() {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const { enabled, ready, user } = useAuth();
  if (!hydrated || !enabled || !ready) return null;
  if (!user) {
    const next = pathname && !["/login", "/register", "/forgot-password", "/reset-password", "/auth/callback"].includes(pathname) && pathname !== "/" ? `?next=${encodeURIComponent(pathname)}` : "";
    return (
      <Link
        href={`/login${next}`}
        className="flex h-9 items-center rounded-lg border border-line-strong px-3 text-[13.5px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink-3 hover:bg-surface"
      >
        Đăng nhập
      </Link>
    );
  }
  return <AccountMenu email={user.email ?? ""} name={(user.user_metadata?.display_name as string | undefined)?.trim() ?? ""} />;
}

function AccountMenu({ email, name }: { email: string; name: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const days = useActivityStore((s) => s.days);
  const active = useActivityStore((s) => s.active);
  const spent = useLandStore((s) => s.spent);

  // Đóng khi chuyển trang
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    // focus mục đầu tiên để dùng phím mũi tên ngay
    menu.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End") return;
      const items = [...(menu.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [])];
      if (!items.length) return;
      e.preventDefault();
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next =
        e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
      items[next].focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const display = name || email.split("@")[0] || "Bạn";
  const initial = (name || email).trim()[0];
  const streak = computeStreak(active, new Date());
  const balance = crystalBalance(days, spent);
  const item =
    "flex h-11 w-full items-center gap-3 px-4 text-left text-[14px] font-medium text-ink-2 outline-none transition-colors hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 focus-visible:text-ink";

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Tài khoản: ${display}`}
        title={`Tài khoản: ${display}`}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface-2 text-[13.5px] font-bold text-ink-2 uppercase transition-colors hover:border-ink-3 hover:text-ink",
          open && "border-ink bg-ink text-paper hover:text-paper"
        )}
      >
        {initial ? initial : <CircleUserRound className="h-4 w-4" aria-hidden />}
      </button>
      {open && (
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label="Tài khoản"
          className="panel absolute top-[calc(100%+10px)] right-0 z-50 flex w-[300px] max-w-[calc(100vw-32px)] flex-col bg-paper shadow-[0_12px_32px_rgba(28,25,23,0.10)]"
        >
          <div className="flex items-center gap-3 px-4 pt-4 pb-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-[17px] font-bold text-paper uppercase" aria-hidden>
              {initial || "?"}
            </span>
            <span className="flex min-w-0 flex-col">
              <b className="truncate text-[15px] text-ink">{display}</b>
              <span className="truncate text-[13px] text-ink-3">{email}</span>
            </span>
          </div>
          <dl className="grid grid-cols-2 border-y border-line-strong">
            <div className="flex flex-col gap-0.5 px-4 py-2.5">
              <dt className="text-[11.5px] font-semibold tracking-[0.06em] text-ink-3 uppercase">Chuỗi ngày</dt>
              <dd className="text-[18px] font-extrabold text-ink tabular-nums">{streak} ngày</dd>
            </div>
            <div className="flex flex-col gap-0.5 border-l border-line-strong px-4 py-2.5">
              <dt className="text-[11.5px] font-semibold tracking-[0.06em] text-ink-3 uppercase">Tinh thể</dt>
              <dd className="flex items-center gap-1.5 text-[18px] font-extrabold text-ink tabular-nums [&_svg]:h-3.5 [&_svg]:w-3.5">
                <Gem />
                {balance.toLocaleString("vi-VN")}
              </dd>
            </div>
          </dl>
          <div className="flex flex-col py-1.5">
            <Link role="menuitem" href="/account" className={item}>
              <UserRound className="h-[18px] w-[18px]" aria-hidden /> Xem tài khoản
            </Link>
            <Link role="menuitem" href="/account#thiet-lap" className={item}>
              <Settings className="h-[18px] w-[18px]" aria-hidden /> Thiết lập
            </Link>
            <Link role="menuitem" href="/progress" className={item}>
              <ChartNoAxesColumnIncreasing className="h-[18px] w-[18px]" aria-hidden /> Tiến độ
            </Link>
          </div>
          <div className="border-t border-line-strong py-1.5">
            <button
              role="menuitem"
              type="button"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await signOutAndClear();
                setBusy(false);
                setOpen(false);
                router.replace("/");
              }}
              className={cn(item, "disabled:opacity-60")}
            >
              <LogOut className="h-[18px] w-[18px]" aria-hidden /> {busy ? "Đang lưu tiến độ…" : "Đăng xuất"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
