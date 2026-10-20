"use client";

import { useSyncExternalStore } from "react";
import { getSession, offlineSignedIn, sessionReady, subscribeSession, supabaseEnabled } from "@/lib/supabase/client";

/** Báo lại khi mạng đổi trạng thái (để offlineSignedIn được tính lại) */
function subscribeAll(cb: () => void) {
  const off = subscribeSession(cb);
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    off();
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

/**
 * Người dùng đang đăng nhập (null nếu chưa / chưa cấu hình Supabase).
 * `signedIn`: có phiên, hoặc đang offline mà máy còn phiên đã lưu (vẫn được vào học offline).
 */
export function useAuth() {
  const session = useSyncExternalStore(subscribeAll, getSession, () => null);
  const ready = useSyncExternalStore(subscribeAll, sessionReady, () => false);
  const offline = useSyncExternalStore(subscribeAll, offlineSignedIn, () => false);
  return { enabled: supabaseEnabled, ready, session, user: session?.user ?? null, signedIn: !!session || offline };
}
