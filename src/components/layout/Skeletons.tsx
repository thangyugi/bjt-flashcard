import { cn } from "@/lib/utils";

/**
 * Màn tải dạng khung mờ (skeleton) cho từng trang.
 * Dùng trong loading.tsx của route và khi trang đang chờ dữ liệu.
 */

function Bone({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

function Screen({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** Hàng thẻ từ vựng */
export function CardRowSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3.5">
        <Bone className="h-11 w-11 rounded-xl" />
        <div className="flex flex-col gap-2">
          <Bone className="h-5 w-44" />
          <Bone className="h-3.5 w-24" />
        </div>
        <Bone className="ml-auto hidden h-10 w-28 rounded-[10px] sm:block" />
        <Bone className="hidden h-10 w-28 rounded-[10px] sm:block" />
      </div>
      <div className="flex gap-4 overflow-hidden pt-1">
        {Array.from({ length: count }).map((_, j) => (
          <div
            key={j}
            className="flex h-[316px] w-56 shrink-0 flex-col items-center gap-3 rounded-[18px] border border-line bg-surface p-4 lg:h-[360px] lg:w-[264px]"
          >
            <Bone className="h-5 w-16 self-start rounded-full" />
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <Bone className="h-3.5 w-20" />
              <Bone className="h-10 w-32" />
            </div>
            <Bone className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Trang chủ */
export function HomeSkeleton() {
  return (
    <Screen label="Đang tải trang chủ" className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10 lg:gap-10">
      <div className="flex items-center justify-between gap-12 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-14">
        <div className="flex w-full max-w-[560px] flex-col gap-5">
          <Bone className="h-4 w-56" />
          <Bone className="h-10 w-full sm:h-12" />
          <Bone className="h-10 w-3/4 sm:h-12" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-5/6" />
          <div className="flex gap-3 pt-2">
            <Bone className="h-[50px] w-40 rounded-xl" />
            <Bone className="h-[50px] w-56 rounded-xl" />
          </div>
        </div>
        <div className="relative hidden h-[380px] w-[460px] shrink-0 items-center justify-center lg:flex">
          <Bone className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full" />
          <div className="relative mt-10 mr-10 h-[300px] w-80 rounded-[20px] border border-line bg-surface" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex h-[140px] flex-col gap-3.5 rounded-[18px] border border-line bg-surface p-6">
            <Bone className="h-4 w-28" />
            <Bone className="h-8 w-20" />
            <Bone className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <Bone className="h-7 w-48" />
        <Bone className="hidden h-11 w-[300px] rounded-xl md:block" />
      </div>
      <CardRowSkeleton />
      <CardRowSkeleton />
    </Screen>
  );
}

/** Danh sách nhóm (Học bài) */
export function StudyListSkeleton() {
  return (
    <Screen label="Đang tải danh sách nhóm" className="mx-auto max-w-[960px] space-y-8 px-4 py-6 sm:px-8 sm:py-10">
      <div className="flex flex-col gap-2">
        <Bone className="h-7 w-52" />
        <Bone className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-[18px] border border-line bg-surface p-5">
            <Bone className="h-11 w-11 rounded-xl" />
            <div className="flex flex-1 flex-col gap-2">
              <Bone className="h-4 w-40" />
              <Bone className="h-3 w-24" />
              <Bone className="mt-1 h-1.5 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/** Học theo nhóm (thẻ lớn + danh sách) */
export function DeckSkeleton() {
  return (
    <Screen
      label="Đang tải flashcard"
      className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-4 md:px-8 md:py-5 lg:h-[calc(100dvh-4rem)] lg:flex-row lg:gap-8 lg:py-7"
    >
      <div className="hidden w-[336px] shrink-0 flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-5 lg:flex">
        <Bone className="h-5 w-40" />
        <div className="grid grid-cols-3 gap-2">
          <Bone className="h-[62px]" />
          <Bone className="h-[62px]" />
          <Bone className="h-[62px]" />
        </div>
        <div className="grid grid-cols-6 gap-2 pt-2">
          {Array.from({ length: 48 }).map((_, i) => (
            <Bone key={i} className="h-10 rounded-[9px]" />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-4">
        <div className="flex w-full max-w-[880px] items-center justify-between">
          <Bone className="h-9 w-24" />
          <Bone className="h-7 w-48" />
          <Bone className="h-6 w-16" />
        </div>
        <Bone className="h-1.5 w-full max-w-[880px] rounded-full" />
        <div className="flex h-[520px] w-full max-w-[880px] flex-col rounded-3xl border border-line bg-surface md:h-[580px] lg:h-[560px]">
          <div className="flex h-[60px] items-center gap-2 border-b border-line px-6">
            <Bone className="h-6 w-12 rounded-full" />
            <Bone className="h-6 w-16 rounded-full" />
            <Bone className="ml-auto h-9 w-40 rounded-[10px]" />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <Bone className="h-5 w-32" />
            <Bone className="h-24 w-64" />
            <Bone className="h-4 w-24" />
          </div>
          <div className="flex h-[72px] items-center justify-end gap-2.5 border-t border-line px-6">
            <Bone className="h-12 flex-1 rounded-xl md:w-[140px] md:flex-none" />
            <Bone className="h-12 flex-1 rounded-xl md:w-[140px] md:flex-none" />
          </div>
        </div>
      </div>
    </Screen>
  );
}

/** Trắc nghiệm */
export function QuizSkeleton() {
  return (
    <Screen
      label="Đang tạo đề trắc nghiệm"
      className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-4 md:px-8 md:py-5 lg:h-[calc(100dvh-4rem)] lg:flex-row lg:gap-8 lg:py-6"
    >
      <div className="hidden w-[336px] shrink-0 flex-col gap-4 rounded-[20px] border border-line bg-surface p-5 lg:flex">
        <Bone className="h-5 w-40" />
        <div className="grid grid-cols-2 gap-2">
          <Bone className="h-[62px]" />
          <Bone className="h-[62px]" />
        </div>
        <div className="grid grid-cols-6 gap-2 pt-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <Bone key={i} className="h-10 rounded-[9px]" />
          ))}
        </div>
        <Bone className="mt-auto h-[50px] rounded-xl" />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Bone className="h-1.5 w-full rounded-full" />
        <div className="flex h-[220px] flex-col items-center justify-center gap-4 rounded-3xl border border-line bg-surface">
          <Bone className="h-16 w-56" />
          <Bone className="h-4 w-28" />
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex h-[60px] items-center gap-3.5 rounded-2xl border border-line bg-surface px-4 md:h-[76px]">
              <Bone className="h-8 w-8 rounded-[10px]" />
              <Bone className="h-4 w-3/5" />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
