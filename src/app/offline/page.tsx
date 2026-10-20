import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = { title: "Mất kết nối" };

/** Trang service worker trả về khi mất mạng và trang cần mở chưa từng được lưu. */
export default function OfflinePage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-ink-3">
        <WifiOff className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="text-2xl font-extrabold text-ink">Đang không có mạng</h1>
      <p className="text-sm leading-relaxed text-ink-2">
        Trang này chưa được lưu để học offline. Những bài bạn đã mở trước đó vẫn xem được — hãy quay lại trang chủ
        hoặc thử lại khi có mạng.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">
          Về trang chủ
        </Link>
        <Link href="/courses" className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface-2">
          Khóa học
        </Link>
      </div>
    </div>
  );
}
