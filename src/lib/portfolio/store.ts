"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSession, supabase } from "@/lib/supabase/client";
import { sampleInterview, sampleIntroduce, samplePortfolio } from "./sample";
import { emptyDoc, newId, normalizeDoc, normalizeInterview, normalizeIntroduce, RESUME_PARTS, type Part, type PortfolioDoc, type Project, type ProjectData } from "./types";

/** Phạm vi "xóa dữ liệu mẫu": từng trang con của Portfolio */
export type SampleScope = "resume" | "introduce" | "interview";

/**
 * Portfolio của người đang đăng nhập: bản lưu trên máy (zustand persist, xem được khi offline) + đồng bộ với
 * Supabase qua các hàm public.*portfolio*. Mọi thay đổi áp dụng ngay trên máy (optimistic), đánh dấu "chưa lưu"
 * rồi được gửi lên sau ~0,6 giây. Không tới được máy chủ → giữ trên máy, gửi lại khi có mạng / khi bấm "Thử lại".
 */

export type SyncState =
  | "idle" // chưa làm gì
  | "loading" // đang tải từ máy chủ
  | "saving" // đang gửi thay đổi
  | "saved" // máy chủ đã có bản mới nhất
  | "local" // có thay đổi chỉ nằm trên máy (offline / chưa cấu hình máy chủ)
  | "error"; // máy chủ từ chối / lỗi khác

interface Pending {
  parts: Part[];
  projects: string[];
  deleted: string[];
  order: boolean;
}

interface PortfolioStore extends Pending {
  /** Chủ của bản lưu trên máy (đổi tài khoản → bỏ bản cũ) */
  userId: string | null;
  doc: PortfolioDoc | null;
  syncedAt: string | null;
  // ── không lưu vào máy ──
  sync: SyncState;
  error: string | null;

  load: (userId: string) => Promise<void>;
  flush: () => Promise<void>;
  savePart: <K extends Part>(part: K, value: PortfolioDoc[K]) => void;
  saveProject: (id: string | null, data: ProjectData) => string;
  deleteProject: (id: string) => void;
  moveProject: (id: string, delta: -1 | 1) => void;
  duplicateProject: (id: string) => string | null;
  clearSample: (scope: SampleScope) => void;
  reset: () => void;
}

const NONE: Pending = { parts: [], projects: [], deleted: [], order: false };
const uniq = <T>(a: T[]) => [...new Set(a)];
const hasPending = (s: Pending) => s.parts.length > 0 || s.projects.length > 0 || s.deleted.length > 0 || s.order;

/** Lỗi mạng (không tới được máy chủ) → giữ thay đổi trên máy, không coi là lỗi dữ liệu */
const isNetwork = (e: unknown) => {
  const m = e instanceof Error ? `${e.name} ${e.message}` : typeof e === "object" && e && "message" in e ? String((e as { message: unknown }).message) : String(e);
  return /fetch|network|load failed|timeout|offline/i.test(m) || (typeof navigator !== "undefined" && navigator.onLine === false);
};
const errText = (e: unknown) => {
  const m = typeof e === "object" && e && "message" in e ? String((e as { message: unknown }).message) : String(e);
  if (/check constraint|violates check/i.test(m)) return "Máy chủ từ chối dữ liệu (thiếu trường bắt buộc hoặc sai định dạng).";
  if (/function .* does not exist|could not find the function/i.test(m)) return "Máy chủ chưa có bảng portfolio (cần chạy migration mới).";
  if (/jwt|not authenticated|permission|42501/i.test(m)) return "Phiên đăng nhập hết hạn hoặc không có quyền. Hãy đăng nhập lại.";
  return m || "Lỗi không xác định.";
};

let timer: ReturnType<typeof setTimeout> | null = null;
let inflight: Promise<void> | null = null;

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => {
      /** Đánh dấu thay đổi và hẹn gửi lên */
      const touch = (p: Partial<Pending>) => {
        const s = get();
        set({
          parts: uniq([...s.parts, ...(p.parts ?? [])]),
          projects: uniq([...s.projects, ...(p.projects ?? [])]),
          deleted: uniq([...s.deleted, ...(p.deleted ?? [])]),
          order: s.order || !!p.order,
          sync: "local",
          error: null,
        });
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => void get().flush(), 600);
      };
      const setDoc = (fn: (d: PortfolioDoc) => PortfolioDoc) => {
        const d = get().doc;
        if (d) set({ doc: fn(d) });
      };

      return {
        ...NONE,
        userId: null,
        doc: null,
        syncedAt: null,
        sync: "idle",
        error: null,

        async load(userId) {
          if (get().userId !== userId) set({ ...NONE, userId, doc: null, syncedAt: null });
          // Có thay đổi chưa gửi: gửi trước, giữ bản trên máy (không tải đè)
          if (hasPending(get())) return get().flush();
          const sb = supabase();
          if (!sb || !getSession()) {
            set({ sync: get().doc ? "local" : "error", error: get().doc ? null : "Chưa kết nối được máy chủ để tải portfolio." });
            return;
          }
          set({ sync: "loading", error: null });
          try {
            const { data, error } = await sb.rpc("get_my_portfolio");
            if (error) throw error;
            if (hasPending(get())) return get().flush(); // người dùng đã sửa trong lúc tải
            const v = data as { portfolio: Partial<Record<Part, unknown>> | null; projects: { id: string; data: ProjectData }[] };
            if (!v.portfolio && v.projects.length === 0) {
              // Tài khoản mới: bắt đầu bằng portfolio mẫu và lưu lên máy chủ
              set({ doc: samplePortfolio() });
              touch({ parts: [...RESUME_PARTS, "introduce", "interview"], projects: get().doc!.projects.map((p) => p.id), order: true });
              return;
            }
            set({
              // Introduce / Interview chưa từng lưu (tài khoản cũ, hoặc máy chủ chưa có cột mới) → nội dung mẫu
              doc: normalizeDoc(v.portfolio ?? {}, v.projects as Project[], { introduce: sampleIntroduce, interview: sampleInterview }),
              sync: "saved",
              syncedAt: new Date().toISOString(),
            });
          } catch (e) {
            // Không tải được: còn bản trên máy thì dùng tiếp; chưa có thì báo lỗi (không tạo mẫu để tránh ghi đè dữ liệu thật)
            set({ sync: get().doc ? "local" : "error", error: get().doc && isNetwork(e) ? null : errText(e) });
          }
        },

        async flush() {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          if (inflight) {
            await inflight;
            if (hasPending(get())) return get().flush();
            return;
          }
          const s = get();
          if (!s.doc || !hasPending(s)) return;
          const sb = supabase();
          if (!sb || !getSession()) {
            set({ sync: "local" });
            return;
          }
          // Lấy phần chờ ra khỏi hàng đợi; sửa tiếp trong lúc gửi sẽ vào hàng đợi mới
          const job: Pending = { parts: s.parts, projects: s.projects, deleted: s.deleted, order: s.order };
          set({ ...NONE, sync: "saving", error: null });
          inflight = (async () => {
            try {
              const doc = get().doc!;
              if (job.deleted.length) {
                const { error } = await sb.rpc("delete_my_portfolio_projects", { p_ids: job.deleted });
                if (error) throw error;
              }
              if (job.parts.length) {
                const p: Record<string, unknown> = {};
                for (const k of job.parts) p[k] = doc[k];
                const { error } = await sb.rpc("save_my_portfolio", { p });
                if (error) throw error;
              }
              for (const id of job.projects) {
                const i = doc.projects.findIndex((x) => x.id === id);
                if (i < 0) continue; // đã xóa sau đó
                const { error } = await sb.rpc("upsert_my_portfolio_project", { p_id: id, p_sort: i, p_data: doc.projects[i].data });
                if (error) throw error;
              }
              if (job.order) {
                const { error } = await sb.rpc("reorder_my_portfolio_projects", { p_ids: doc.projects.map((x) => x.id) });
                if (error) throw error;
              }
              set({ sync: hasPending(get()) ? "local" : "saved", syncedAt: new Date().toISOString() });
            } catch (e) {
              // Trả phần chưa gửi được về hàng đợi
              const now = get();
              set({
                parts: uniq([...job.parts, ...now.parts]),
                projects: uniq([...job.projects, ...now.projects]),
                deleted: uniq([...job.deleted, ...now.deleted]),
                order: job.order || now.order,
                sync: isNetwork(e) ? "local" : "error",
                error: isNetwork(e) ? null : errText(e),
              });
            }
          })();
          await inflight;
          inflight = null;
          if (hasPending(get()) && get().sync === "local" && !timer && navigator.onLine) timer = setTimeout(() => void get().flush(), 600);
        },

        savePart(part, value) {
          setDoc((d) => ({ ...d, [part]: { ...value, sample: false } }));
          touch({ parts: [part] });
        },

        saveProject(id, data) {
          const pid = id ?? newId();
          setDoc((d) => {
            const next = { id: pid, data: { ...data, sample: false } };
            const i = d.projects.findIndex((p) => p.id === pid);
            // Dự án mới lên đầu danh sách (mới nhất trước, như 職務経歴書 kiểu 逆編年体)
            return { ...d, projects: i < 0 ? [next, ...d.projects] : d.projects.map((p) => (p.id === pid ? next : p)) };
          });
          touch({ projects: [pid], order: !id });
          return pid;
        },

        deleteProject(id) {
          setDoc((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) }));
          set({ projects: get().projects.filter((x) => x !== id) });
          touch({ deleted: [id] });
        },

        moveProject(id, delta) {
          setDoc((d) => {
            const i = d.projects.findIndex((p) => p.id === id);
            const j = i + delta;
            if (i < 0 || j < 0 || j >= d.projects.length) return d;
            const projects = [...d.projects];
            [projects[i], projects[j]] = [projects[j], projects[i]];
            return { ...d, projects };
          });
          touch({ order: true });
        },

        duplicateProject(id) {
          const d = get().doc;
          const src = d?.projects.find((p) => p.id === id);
          if (!d || !src) return null;
          const copy: Project = { id: newId(), data: { ...structuredClone(src.data), title: `${src.data.title}（コピー）`.slice(0, 200), sample: false } };
          const i = d.projects.indexOf(src);
          set({ doc: { ...d, projects: [...d.projects.slice(0, i + 1), copy, ...d.projects.slice(i + 1)] } });
          touch({ projects: [copy.id], order: true });
          return copy.id;
        },

        clearSample(scope) {
          const d = get().doc;
          if (!d) return;
          const e = emptyDoc();
          if (scope === "introduce") {
            if (!d.introduce.sample) return;
            set({ doc: { ...d, introduce: e.introduce } });
            touch({ parts: ["introduce"] });
            return;
          }
          if (scope === "interview") {
            if (!d.interview.sample) return;
            set({ doc: { ...d, interview: e.interview } });
            touch({ parts: ["interview"] });
            return;
          }
          const parts = RESUME_PARTS.filter((k) => d[k].sample);
          const removed = d.projects.filter((p) => p.data.sample).map((p) => p.id);
          set({
            doc: {
              ...d,
              header: d.header.sample ? e.header : d.header,
              pr: d.pr.sample ? e.pr : d.pr,
              skills: d.skills.sample ? e.skills : d.skills,
              education: d.education.sample ? e.education : d.education,
              projects: d.projects.filter((p) => !p.data.sample),
            },
            projects: get().projects.filter((x) => !removed.includes(x)),
          });
          touch({ parts: [...parts], deleted: removed });
        },

        reset() {
          if (timer) clearTimeout(timer);
          timer = null;
          set({ ...NONE, userId: null, doc: null, syncedAt: null, sync: "idle", error: null });
        },
      };
    },
    {
      name: "leoedu-portfolio",
      version: 2,
      // v1 → v2: thêm Introduce / Interview Q&A (bản lưu cũ chưa có → nội dung mẫu)
      migrate: (persisted, version) => {
        const s = persisted as Partial<PortfolioStore> | undefined;
        if (s?.doc && version < 2) {
          const d = s.doc as Partial<PortfolioDoc> & PortfolioDoc;
          s.doc = { ...d, introduce: normalizeIntroduce(d.introduce) ?? sampleIntroduce(), interview: normalizeInterview(d.interview) ?? sampleInterview() };
        }
        return s as PortfolioStore;
      },
      partialize: (s) => ({
        userId: s.userId,
        doc: s.doc,
        syncedAt: s.syncedAt,
        parts: s.parts,
        projects: s.projects,
        deleted: s.deleted,
        order: s.order,
      }),
    }
  )
);

/** Gửi nốt thay đổi chờ (gọi trước khi đăng xuất) */
export const flushPortfolio = () => usePortfolioStore.getState().flush();
