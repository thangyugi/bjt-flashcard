import type { CSSProperties, ElementType, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Khung trang dùng chung cho mọi trang (trừ trang chủ đã có bố cục riêng nhưng cùng lề):
 * Page → PageHeader (nhãn + tiêu đề in hoa sát chữ + lời dẫn + một vạch mảnh) → Section → Panel.
 * Bề rộng và lề lấy từ .page-x (globals.css), trùng với thanh tiêu đề nên mép luôn thẳng hàng.
 */

/** Khung ngang của trang: cùng bề rộng tối đa và lề với thanh tiêu đề */
export function Page({
  children,
  className,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}) {
  return (
    <Tag className={cn("page-x flex flex-col gap-10 pt-6 pb-12 sm:gap-12 sm:pt-10 sm:pb-16", className)} style={style}>
      {children}
    </Tag>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

/** Đường dẫn nhỏ phía trên tiêu đề */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Đường dẫn" className={cn("flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3", className)}>
      {items.map((c, i) => (
        <span key={`${c.label}-${i}`} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden>/</span>}
          {c.href ? (
            <Link href={c.href} className="hover:text-ink">
              {c.label}
            </Link>
          ) : (
            <span className="text-ink-2" aria-current="page">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * Đầu trang: nhãn nhỏ, tiêu đề in hoa sát chữ, lời dẫn, nút; một vạch mảnh bên dưới.
 * `accent` (màu khóa học) chỉ tô chấm nhỏ cạnh nhãn, không đổi màu tiêu đề.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  crumbs,
  accent,
  size = "lg",
  className,
  children,
}: {
  eyebrow?: ReactNode;
  /** Một chuỗi, hoặc mảng các dòng (mỗi phần tử là một dòng như tiêu đề trang chủ) */
  title: ReactNode | string[];
  lead?: ReactNode;
  actions?: ReactNode;
  /** Cột phải trên màn rộng (số liệu, hình nhỏ…) */
  aside?: ReactNode;
  crumbs?: Crumb[];
  accent?: string;
  size?: "lg" | "md";
  className?: string;
  children?: ReactNode;
}) {
  const lines = Array.isArray(title) ? title : null;
  return (
    <header className={cn("flex flex-col gap-5 border-b border-line-strong pb-8 sm:pb-10", className)}>
      {crumbs && <Breadcrumbs items={crumbs} />}
      <div className={cn("flex flex-col gap-8", aside && "lg:flex-row lg:items-end lg:justify-between")}>
        <div className="flex max-w-[820px] min-w-0 flex-col gap-5">
          {eyebrow && (
            <p className="eyebrow-label flex flex-wrap items-center gap-2.5">
              {accent && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />}
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "hx-title",
              size === "lg" ? "text-[clamp(36px,5vw,68px)]" : "text-[clamp(30px,3.6vw,48px)]"
            )}
          >
            {lines ? lines.map((t) => <span key={t} className="block">{t}</span>) : title}
          </h1>
          {lead && <div className="max-w-[60ch] text-[16px] leading-[1.65] text-ink-2">{lead}</div>}
          {actions && <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div>}
          {children}
        </div>
        {aside && <div className="min-w-0 lg:max-w-[460px] lg:shrink-0">{aside}</div>}
      </div>
    </header>
  );
}

/** Một mục trong trang: hàng tiêu đề (in hoa) + nút phụ, một vạch mảnh, rồi nội dung */
export function Section({
  title,
  eyebrow,
  action,
  children,
  id,
  className,
  as: Tag = "section",
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("flex flex-col gap-5", className)} aria-labelledby={id}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line pb-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
          <h2 id={id} className="hx-title text-[clamp(22px,2.2vw,30px)]">
            {title}
          </h2>
        </div>
        {action && <div className="flex items-center gap-3 text-[14px]">{action}</div>}
      </div>
      {children}
    </Tag>
  );
}

/** Mặt giấy trắng với một viền mảnh, bo vừa */
export function Panel({
  children,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & Record<string, unknown>) {
  return (
    <Tag className={cn("panel", className)} {...rest}>
      {children}
    </Tag>
  );
}

/** Nhãn "Sắp ra mắt" / "Ví dụ": nền nhạt, không viền */
export function SoonTag({ children = "Sắp ra mắt", className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md bg-[#fbf1e3] px-2 py-0.5 text-[12px] font-semibold whitespace-nowrap text-[#8a4b00]",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Lớp nút dùng chung (giống nút trang chủ) cho Link/a/button */
export const btn = {
  primary:
    "inline-flex h-11 items-center justify-center gap-2.5 rounded-[10px] bg-brand px-[18px] text-[14.5px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-hover",
  ghost:
    "inline-flex h-11 items-center justify-center gap-2.5 rounded-[10px] border border-line-strong px-[18px] text-[14.5px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink-3 hover:bg-surface",
  sm: "!h-9 !px-3.5 !text-[13.5px] !rounded-lg",
};
