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
        className="rounded-lg border border-line-strong px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-ink hover:bg-surface-2"
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
      className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper uppercase"
    >
      {name ? name.trim()[0] : <CircleUserRound className="h-4 w-4" aria-hidden />}
    </Link>
  );
}
