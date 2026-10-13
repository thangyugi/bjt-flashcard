import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COURSES } from "@/data/courses";
import { cn } from "@/lib/utils";

const TONE = {
  red: "bg-brand text-white",
  ink: "bg-ink text-paper",
  amber: "bg-[#f3e3c3] text-[#7a4b12]",
};

/** Thẻ các khóa học — dùng ở trang chủ và trang /courses. */
export function CourseCards({ compact }: { compact?: boolean }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3", compact && "gap-3")}>
      {COURSES.map((c) => (
        <Link
          key={c.id}
          href={c.href}
          className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_12px_32px_rgba(28,25,23,0.08)]"
        >
          <div className={cn("relative flex items-end justify-between overflow-hidden px-5 py-4", compact ? "h-24" : "h-32", TONE[c.tone])}>
            <span className="text-[12px] font-semibold tracking-[0.06em] opacity-80">{c.kicker}</span>
            <span className={cn("font-mincho leading-none font-bold opacity-90", compact ? "text-[56px]" : "text-[72px]")}>{c.mark}</span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[18px] font-extrabold text-ink">{c.title}</span>
              <ArrowUpRight className="h-5 w-5 text-ink-3 transition-colors group-hover:text-brand" aria-hidden />
            </div>
            {!compact && <p className="text-[14px] leading-relaxed text-ink-2">{c.desc}</p>}
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
              {c.tags.map((t) => (
                <span key={t} className="rounded-full bg-surface-2 px-2.5 py-1 text-[11.5px] font-semibold text-ink-2">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
