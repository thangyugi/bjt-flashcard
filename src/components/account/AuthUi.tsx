"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Page, PageHeader } from "@/components/ui/page";

/** Khung chung cho các trang đăng nhập / đăng ký */
export function AuthShell({ title, sub, children, foot }: { title: string; sub?: string; children: React.ReactNode; foot?: React.ReactNode }) {
  return (
    <Page>
      <PageHeader eyebrow="Tài khoản" title={title} lead={sub} size="md" />
      <div className="flex w-full max-w-[440px] flex-col gap-5">
        <div className="flex flex-col gap-4 panel px-5 py-6 sm:px-7">{children}</div>
        {foot && <div className="text-[14px] text-ink-2">{foot}</div>}
      </div>
    </Page>
  );
}

export function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-ink-2">{label}</span>
      <input
        {...props}
        className={cn(
          "h-11 rounded-xl border border-line-strong bg-paper px-3.5 text-[15px] text-ink outline-none transition-colors",
          "placeholder:text-ink-3 focus:border-brand focus:ring-2 focus:ring-brand/15",
          props.className
        )}
      />
      {hint && <span className="text-[12px] text-ink-3">{hint}</span>}
    </label>
  );
}

export function PrimaryButton({ busy, children, ...props }: { busy?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={busy || props.disabled}
      className={cn(
        "h-11 rounded-xl bg-brand px-4 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-60",
        props.className
      )}
    >
      {busy ? "Đang xử lý…" : children}
    </button>
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "flex h-11 items-center justify-center gap-2 rounded-xl border border-line-strong bg-surface px-4 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-2 disabled:opacity-60",
        props.className
      )}
    />
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "ok"; children: React.ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-xl px-3.5 py-2.5 text-[14px] leading-relaxed",
        tone === "error" && "bg-brand-soft text-brand-soft-ink",
        tone === "ok" && "bg-ok-soft text-ok-ink",
        tone === "info" && "bg-surface-2 text-ink-2"
      )}
    >
      {children}
    </p>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 text-[12px] text-ink-3">
      <span className="h-px flex-1 bg-line" />
      {label}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Supabase chưa cấu hình: app vẫn chạy, tiến độ lưu trên máy */
export function NotConfigured() {
  return (
    <AuthShell title="Tài khoản chưa bật" sub="Bản app này chưa kết nối máy chủ tài khoản.">
      <Notice>
        Bạn vẫn học bình thường — tiến độ được lưu trên trình duyệt này. Khi quản trị viên bật tài khoản (đặt biến môi trường
        NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY), bạn có thể đăng nhập để đồng bộ giữa các thiết bị.
      </Notice>
      <Link href="/" className="text-center text-[14px] font-semibold text-brand hover:underline">
        Về trang chủ
      </Link>
    </AuthShell>
  );
}

export const CONSENT_VERSION = "2026-10-17";

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z" />
    </svg>
  );
}
