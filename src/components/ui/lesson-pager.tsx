import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface PagerLink {
  href: string;
  kicker: string;
  title: string;
}

/**
 * Cuối bài học: bài trước / bài sau là hai ô kẻ mảnh dùng chung vạch, rồi một hàng lối đi tiếp
 * (về khóa học, trắc nghiệm khác, ôn tập) để không phải quay lại thanh điều hướng.
 */
export function LessonPager({
  label,
  prev,
  next,
  back,
  links = [],
}: {
  label: string;
  prev?: PagerLink;
  next?: PagerLink;
  /** Khi không có bài trước: ô bên trái trỏ về mục lục */
  back: { href: string; title: string };
  links?: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={label} className="flex flex-col gap-4">
      <div className="cells grid-cols-1 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-surface">
            <ArrowLeft className="h-5 w-5 shrink-0 text-ink-3" aria-hidden />
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-ink-3">{prev.kicker}</span>
              <span className="truncate font-semibold text-ink">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <Link href={back.href} className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-surface">
            <ArrowLeft className="h-5 w-5 shrink-0 text-ink-3" aria-hidden />
            <span className="font-semibold text-ink">{back.title}</span>
          </Link>
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center justify-end gap-3 px-5 py-4 text-right transition-colors hover:bg-surface sm:col-start-2"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-ink-3">Tiếp theo · {next.kicker}</span>
              <span className="truncate font-semibold text-ink">{next.title}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        ) : (
          <Link href={back.href} className="group flex items-center justify-end gap-3 px-5 py-4 text-right transition-colors hover:bg-surface">
            <span className="font-semibold text-ink">Hết khóa · {back.title}</span>
            <ArrowRight className="h-5 w-5 shrink-0 text-brand" aria-hidden />
          </Link>
        )}
      </div>
      {links.length > 0 && (
        <ul className="flex flex-wrap gap-x-6 gap-y-0 text-[14px]">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-10 items-center gap-1.5 font-semibold text-ink-2 underline-offset-4 hover:text-ink hover:underline">
                {l.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
