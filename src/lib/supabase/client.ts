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

function start() {
  const sb = supabase();
  if (started || !sb) return;
  started = true;
  sb.auth.getSession().then(({ data }) => {
    session = data.session;
    ready = true;
    listeners.forEach((l) => l());
  });
  sb.auth.onAuthStateChange((_event, s) => {
    session = s;
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
export const sessionReady = () => ready || !supabaseEnabled;

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
