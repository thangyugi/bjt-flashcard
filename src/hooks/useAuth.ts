"use client";

import { useSyncExternalStore } from "react";
import { getSession, sessionReady, subscribeSession, supabaseEnabled } from "@/lib/supabase/client";

/** Người dùng đang đăng nhập (null nếu chưa / chưa cấu hình Supabase). */
export function useAuth() {
  const session = useSyncExternalStore(subscribeSession, getSession, () => null);
  const ready = useSyncExternalStore(subscribeSession, sessionReady, () => false);
  return { enabled: supabaseEnabled, ready, session, user: session?.user ?? null };
}
