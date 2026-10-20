import type { CSSProperties, ElementType, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Khung trang dùng chung cho mọi trang, cùng ngôn ngữ "lưới kẻ mảnh" với trang chủ:
 * Page (toàn bề ngang, lề chung) → PageHeader (vạch cột nền, tiêu đề in hoa sát chữ, vạch mảnh dưới)
 * → Section (tiêu đề in hoa trên một vạch mảnh) → Cells/Panel (ô vuông viền mảnh, dùng chung vạch).
 * Lề lấy từ .page-x (globals.css), trùng với thanh tiêu đề nên mép luôn thẳng hàng.
 */

/** Khung ngang của trang: toàn bề ngang, cùng lề với thanh tiêu đề */
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
          {i > 0 && <span aria-hidden>›</span>}
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
 * Đầu trang như phần đầu trang chủ: vạch cột nền 12 cột, nhãn nhỏ, tiêu đề in hoa sát chữ, lời dẫn, nút;
 * cột phải (aside) ngăn bằng một vạch dọc; một vạch mảnh bên dưới.
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
    <header className={cn("col-rules -mt-6 flex flex-col gap-5 border-b border-line-strong pt-6 sm:-mt-10 sm:pt-10", className)}>
      {crumbs && <Breadcrumbs items={crumbs} className="rule-pad" />}
      <div className={cn("flex flex-col", aside ? "gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-0" : "")}>
        <div className="rule-pad flex max-w-[860px] min-w-0 flex-col gap-5 pb-8 sm:pb-10">
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
        {aside && (
          <div className="flex min-w-0 flex-col justify-end border-t border-line-strong pt-6 pb-8 lg:w-[min(460px,38%)] lg:shrink-0 lg:border-t-0 lg:border-l lg:bg-paper lg:pt-0 lg:pb-10 lg:pl-[clamp(16px,1.6vw,24px)]">
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}

/** Một mục trong trang: hàng tiêu đề (in hoa) + nút phụ trên một vạch mảnh, rồi nội dung */
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
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-line-strong pb-3">
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

/** Ô giấy vuông với một viền mảnh (không bo). Đặt nhiều ô cạnh nhau thì dùng Cells để chung vạch. */
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

/**
 * Lưới ô kẻ mảnh: các ô con dùng chung một vạch như dải cột trang chủ.
 * Truyền số cột bằng lớp grid-cols-* (vd. "sm:grid-cols-2 xl:grid-cols-3").
 */
export function Cells({
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
    <Tag className={cn("cells grid-cols-1", className)} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Bố cục "việc chính + ghi chú bên lề" cho trang có khối làm bài (thẻ ôn, phòng luyện): khối chính giữ bề ngang dễ dùng,
 * cột phải (màn rộng) chứa ghi chú, cài đặt, liên kết thay vì để trống. Màn hẹp: ghi chú xuống dưới.
 */
export function WithAside({ children, aside, className }: { children: ReactNode; aside: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:gap-12 2xl:grid-cols-[minmax(0,1fr)_420px]", className)}>
      <div className="min-w-0">{children}</div>
      <aside className="flex min-w-0 flex-col gap-6 xl:border-l xl:border-line-strong xl:pl-[clamp(20px,2vw,32px)]">{aside}</aside>
    </div>
  );
}

/** Một khối ghi chú nhỏ bên lề: tiêu đề in hoa nhỏ + nội dung */
export function AsideNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5 border-t border-line-strong pt-3 text-[14px] leading-relaxed text-ink-2">
      <h2 className="eyebrow-label">{title}</h2>
      {children}
    </section>
  );
}

/** Nhãn "Sắp ra mắt": viền đứt màu cam như bản vẽ gốc */
export function SoonTag({ children = "Sắp ra mắt", className }: { children?: ReactNode; className?: string }) {
  return <span className={cn("tag-soon", className)}>{children}</span>;
}

/** Lớp nút dùng chung (giống nút trang chủ) cho Link/a/button */
export const btn = {
  primary:
    "inline-flex h-11 items-center justify-center gap-2.5 rounded-[10px] bg-brand px-[18px] text-[14.5px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-hover",
  ghost:
    "inline-flex h-11 items-center justify-center gap-2.5 rounded-[10px] border border-line-strong px-[18px] text-[14.5px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-ink-3 hover:bg-surface",
  sm: "!h-9 !px-3.5 !text-[13.5px] !rounded-lg",
};
