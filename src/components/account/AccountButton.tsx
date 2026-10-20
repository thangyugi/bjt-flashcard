"use client";

import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";

/** Nút tài khoản trên thanh tiêu đề (ẩn khi chưa cấu hình Supabase) */
export function AccountButton() {
  const hydrated = useHydrated();
  const { enabled, ready, user } = useAuth();
  if (!hydrated || !enabled || !ready) return null;
  if (!user)
    return (
      <Link
        href="/login"
        className="flex h-9 items-center rounded-lg border border-line-strong px-3 text-[13.5px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink-3 hover:bg-surface"
      >
        Đăng nhập
      </Link>
    );
  const name = (user.user_metadata?.display_name as string | undefined) ?? user.email ?? "";
  return (
    <Link
      href="/account"
      title={`Tài khoản: ${name}`}
      aria-label="Tài khoản"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-surface-2 text-[13.5px] font-bold text-ink-2 uppercase transition-colors hover:border-ink-3 hover:text-ink"
    >
      {name ? name.trim()[0] : <CircleUserRound className="h-4 w-4" aria-hidden />}
    </Link>
  );
}
