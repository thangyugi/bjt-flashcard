"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useViewer } from "./viewer";

/**
 * Nút "Bắt đầu học" của trang chủ: khách (và lúc chưa biết phiên) → đăng ký rồi vào Học bài;
 * đã đăng nhập → cuộn tới dải khóa học.
 */
export function StartLink({ className, children }: { className?: string; children: ReactNode }) {
  const user = useViewer() === "user";
  return (
    <Link className={className} href={user ? "#khoahoc" : `/register?next=${encodeURIComponent("/study")}`}>
      {children}
    </Link>
  );
}
