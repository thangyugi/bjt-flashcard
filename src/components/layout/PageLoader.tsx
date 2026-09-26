import { cn } from "@/lib/utils";

/** Khối loading dùng chung: logo 語 + vòng xoay + dòng chữ. */
export function PageLoader({ label = "Đang tải…", className }: { label?: string; className?: string }) {
  return (
    <div role="status" aria-live="polite" className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-brand-soft border-t-brand" />
        <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand font-mincho text-xl font-bold text-white">
          語
        </span>
      </div>
      <span className="text-sm font-medium text-ink-3">{label}</span>
    </div>
  );
}
