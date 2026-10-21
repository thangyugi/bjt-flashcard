"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";

export type Viewer = "loading" | "guest" | "user";

/**
 * Ai đang xem trang chủ. "loading" cho tới khi hydrate xong và biết phiên đăng nhập,
 * để server và lượt render đầu khớp nhau và không lóe giao diện khách trước khi hiện giao diện đã đăng nhập.
 */
export function useViewer(): Viewer {
  const hydrated = useHydrated();
  const { ready, signedIn } = useAuth();
  if (!hydrated || !ready) return "loading";
  return signedIn ? "user" : "guest";
}

/** Chỉ hiện cho khách (chưa đăng nhập) */
export function GuestOnly({ children }: { children: ReactNode }) {
  return useViewer() === "guest" ? children : null;
}

/** Chỉ hiện khi đã đăng nhập */
export function UserOnly({ children }: { children: ReactNode }) {
  return useViewer() === "user" ? children : null;
}
