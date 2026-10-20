"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Page } from "@/components/ui/page";
import { IsoIcon, type IsoName } from "@/components/home/drawing/IsoIcon";

const BENEFITS: { icon: IsoName; title: string; text: string }[] = [
  { icon: "plan", title: "Kế hoạch mỗi ngày", text: "Ba mục vừa sức, tự đánh dấu khi bạn học." },
  { icon: "streak", title: "Lịch ôn và chuỗi ngày", text: "Thẻ quay lại đúng lúc sắp quên, theo trí nhớ của riêng bạn." },
  { icon: "gift", title: "Tinh thể và vùng đất", text: "XP đổi thành Tinh thể để gieo cây ở Thảo nguyên Pha Lê." },
];

/** Cột phụ của trang tài khoản: vì sao nên có tài khoản (hình vẽ nét mảnh như trang chủ) */
function AuthBenefits() {
  return (
    <div className="flex w-full max-w-[520px] flex-col gap-6">
      <p className="eyebrow-label">Có tài khoản, bạn được</p>
      <ul className="cells grid-cols-1">
        {BENEFITS.map((b) => (
          <li key={b.title} className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-4 px-4 py-4 sm:grid-cols-[112px_minmax(0,1fr)]">
            <span className="block h-[64px] sm:h-[84px] [&_svg]:h-full [&_svg]:w-full" aria-hidden>
              <IsoIcon name={b.icon} />
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <b className="text-[15px] text-ink">{b.title}</b>
              <span className="text-[13.5px] leading-relaxed text-ink-3">{b.text}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[13.5px] leading-relaxed text-ink-3">
        Mọi bài học vẫn mở miễn phí khi chưa đăng nhập. Tài khoản chỉ để lưu tiến độ và đồng bộ giữa điện thoại và máy tính.
      </p>
    </div>
  );
}

/**
 * Khung chung cho các trang đăng nhập / đăng ký / quên mật khẩu: hai nửa cân nhau trên khung toàn bề ngang
 * (biểu mẫu ở giữa nửa trái, lợi ích ở giữa nửa phải, ngăn bằng một vạch mảnh); màn hẹp xếp chồng, biểu mẫu trước.
 */
export function AuthShell({ title, sub, children, foot }: { title: string; sub?: string; children: React.ReactNode; foot?: React.ReactNode }) {
  return (
    <Page className="!gap-0">
      <div className="-mt-6 grid border-b border-line-strong sm:-mt-10 lg:min-h-[calc(100dvh-var(--header-h)-1px)] lg:grid-cols-2">
        <section className="flex justify-center px-0 pt-8 pb-10 sm:pt-12 lg:items-center lg:px-8 lg:py-16">
          <div className="flex w-full max-w-[440px] flex-col gap-6">
            <header className="flex flex-col gap-3">
              <p className="eyebrow-label">Tài khoản LeoEdu</p>
              <h1 className="hx-title text-[clamp(32px,3.6vw,52px)]">{title}</h1>
              {sub && <p className="text-[15.5px] leading-relaxed text-ink-2">{sub}</p>}
            </header>
            <div className="flex flex-col gap-4 panel bg-surface px-5 py-6 sm:px-7">{children}</div>
            {foot && <div className="text-[14px] text-ink-2">{foot}</div>}
          </div>
        </section>
        <aside className="flex justify-center border-t border-line-strong pt-8 pb-12 lg:items-center lg:border-t-0 lg:border-l lg:px-8 lg:py-16">
          <AuthBenefits />
        </aside>
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
    <AuthShell title="Tài khoản chưa bật" sub="Bản LeoEdu này chưa kết nối máy chủ tài khoản.">
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
