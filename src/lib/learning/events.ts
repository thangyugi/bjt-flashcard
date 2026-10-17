/**
 * Sự kiện học — đơn vị đồng bộ giữa thiết bị và máy chủ (khớp với public.sync_push trong supabase/migrations).
 * Thiết bị luôn ghi sự kiện vào hàng chờ (kể cả khi chưa đăng nhập / mất mạng);
 * khi có tài khoản và có mạng, hàng chờ được gửi lên rồi xóa.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Verb =
  | "lesson.opened"
  | "lesson.completed"
  | "lesson.reopened"
  | "quiz.submitted"
  | "card.enrolled"
  | "card.reviewed"
  | "card.suspended"
  | "item.marked"
  | "time.spent";

export interface LearningEvent {
  id: string;
  verb: Verb;
  /** Mã bài / mục học / đề (src/lib/learning/keys.ts) */
  object?: string;
  /** ISO time */
  at: string;
  data: Record<string, unknown>;
  ctx?: Record<string, unknown>;
}

/** UUID v7 (sắp theo thời gian) — khóa chính của sự kiện, máy chủ dùng để chống trùng */
export function uuidv7(ms = Date.now()): string {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  for (let i = 0; i < 6; i++) b[i] = Math.floor(ms / 2 ** (8 * (5 - i))) & 255;
  b[6] = (b[6] & 15) | 0x70;
  b[8] = (b[8] & 63) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/** UUID cố định từ một chuỗi (dùng khi nhập dữ liệu cũ: nhập lại nhiều lần vẫn cùng id) */
export async function uuidFrom(text: string): Promise<string> {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))).slice(0, 16);
  d[6] = (d[6] & 15) | 0x80; // version 8 (tùy biến)
  d[8] = (d[8] & 63) | 0x80;
  const h = [...d].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

interface OutboxState {
  deviceId: string;
  events: LearningEvent[];
  /** Mốc lấy dữ liệu từ máy chủ lần trước (theo giờ máy chủ), theo từng tài khoản */
  pulledAt: Record<string, string>;
  /** Tài khoản đã được nhập tiến độ cũ trên máy này */
  imported: string[];
  lastSyncAt: string | null;
  lastError: string | null;
  add: (e: LearningEvent | LearningEvent[]) => void;
  remove: (ids: string[]) => void;
  setPulled: (userId: string, at: string) => void;
  markImported: (userId: string) => void;
  setSyncResult: (error: string | null) => void;
}

/** Giữ tối đa 5.000 sự kiện chưa gửi (bỏ sự kiện "thời gian" cũ nhất trước) */
const MAX_EVENTS = 5000;

export const useOutbox = create<OutboxState>()(
  persist(
    (set) => ({
      deviceId: "",
      events: [],
      pulledAt: {},
      imported: [],
      lastSyncAt: null,
      lastError: null,
      add: (e) =>
        set((s) => {
          let events = s.events.concat(e);
          if (events.length > MAX_EVENTS) {
            const drop = events.length - MAX_EVENTS;
            let dropped = 0;
            events = events.filter((x) => !(x.verb === "time.spent" && dropped < drop && ++dropped));
            events = events.slice(-MAX_EVENTS);
          }
          return { events, deviceId: s.deviceId || uuidv7() };
        }),
      remove: (ids) => {
        const gone = new Set(ids);
        set((s) => ({ events: s.events.filter((e) => !gone.has(e.id)) }));
      },
      setPulled: (userId, at) => set((s) => ({ pulledAt: { ...s.pulledAt, [userId]: at } })),
      markImported: (userId) => set((s) => ({ imported: [...new Set([...s.imported, userId])] })),
      setSyncResult: (error) => set(error ? { lastError: error } : { lastError: null, lastSyncAt: new Date().toISOString() }),
    }),
    { name: "learning-outbox", version: 1 }
  )
);
