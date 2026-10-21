"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase chạy hoàn toàn phía trình duyệt: trang học vẫn tạo sẵn lúc build và chạy offline;
 * Supabase chỉ dùng để đăng nhập và đồng bộ tiến độ (mọi bảng đều có RLS, ghi qua các hàm API).
 * Chưa đặt NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY → app chạy như cũ, không có tài khoản.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(URL && KEY);

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!supabaseEnabled || typeof window === "undefined") return null;
  client ??= createClient(URL!, KEY!, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, flowType: "pkce" },
  });
  return client;
}

// ── Phiên đăng nhập dùng chung cho mọi component (useSyncExternalStore) ──
let session: Session | null = null;
let ready = false;
const listeners = new Set<() => void>();
let started = false;
/** Lần lấy phiên gần nhất thất bại vì không tới được máy chủ */
let unreachable = false;

function start() {
  const sb = supabase();
  if (started || !sb) return;
  started = true;
  // Mất mạng mà token đã hết hạn: supabase-js thử làm mới phiên khá lâu (tới ~30 giây) trước khi trả lời.
  // Sau 4 giây vẫn chưa xong mà máy còn phiên đã lưu → coi như không tới được máy chủ, cho vào học offline.
  const timer = setTimeout(() => {
    if (ready) return;
    unreachable = hasStoredSession();
    ready = true;
    listeners.forEach((l) => l());
  }, 4000);
  sb.auth
    .getSession()
    .then(({ data, error }) => {
      session = data.session;
      // Không làm mới được phiên vì lỗi mạng (AuthRetryableFetchError): phiên đã lưu vẫn còn trên máy
      unreachable = !data.session && !!error && (error.name === "AuthRetryableFetchError" || /fetch|network/i.test(error.message));
    })
    .catch(() => {
      unreachable = true;
    })
    .finally(() => {
      clearTimeout(timer);
      ready = true;
      listeners.forEach((l) => l());
    });
  sb.auth.onAuthStateChange((_event, s) => {
    session = s;
    if (s) unreachable = false;
    ready = true;
    listeners.forEach((l) => l());
  });
}

export function subscribeSession(cb: () => void) {
  start();
  listeners.add(cb);
  return () => listeners.delete(cb);
}
export const getSession = () => session;
export const sessionReady = () =>
  ready || !supabaseEnabled || (typeof navigator !== "undefined" && navigator.onLine === false && hasStoredSession());

/** Khóa localStorage mặc định của supabase-js: sb-<phần đầu tên miền>-auth-token */
function storageKey() {
  try {
    return `sb-${new globalThis.URL(URL!).hostname.split(".")[0]}-auth-token`;
  } catch {
    return "";
  }
}

/**
 * Máy này còn lưu phiên đăng nhập (có refresh token) dù chưa làm mới được — dùng khi offline:
 * access token hết hạn mà không có mạng thì getSession() trả null, nhưng người dùng vẫn đã đăng nhập trên máy này.
 */
export function hasStoredSession(): boolean {
  if (!supabaseEnabled || typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return false;
    const v = JSON.parse(raw);
    return Boolean(v?.refresh_token || v?.currentSession?.refresh_token);
  } catch {
    return false;
  }
}

/** Đang offline (hoặc không tới được máy chủ) nhưng máy còn phiên đã lưu → coi như đã đăng nhập để học offline */
export function offlineSignedIn(): boolean {
  if (session || typeof navigator === "undefined") return false;
  return (navigator.onLine === false || unreachable) && hasStoredSession();
}

/** Địa chỉ quay về sau khi bấm link trong email / đăng nhập Google */
export const authRedirect = (next = "/account") =>
  `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

/** Thông báo lỗi Supabase Auth bằng tiếng Việt */
export function authErrorVi(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email hoặc mật khẩu không đúng.";
  if (m.includes("email not confirmed")) return "Email chưa được xác nhận. Hãy mở thư xác nhận trong hộp thư của bạn.";
  if (m.includes("user already registered")) return "Email này đã có tài khoản. Hãy đăng nhập hoặc lấy lại mật khẩu.";
  if (m.includes("password should be at least")) return "Mật khẩu cần ít nhất 8 ký tự.";
  if (m.includes("rate limit") || m.includes("too many")) return "Thao tác quá nhiều lần. Vui lòng thử lại sau ít phút.";
  if (m.includes("same_password") || m.includes("different from the old")) return "Mật khẩu mới phải khác mật khẩu cũ.";
  if (m.includes("weak")) return "Mật khẩu quá yếu. Hãy dùng chữ hoa, chữ thường, số và ít nhất 8 ký tự.";
  if (m.includes("network") || m.includes("fetch")) return "Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.";
  return message;
}
