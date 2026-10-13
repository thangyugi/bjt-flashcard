import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Tiến độ khóa JLPT N1 — lưu riêng, không đụng tới dữ liệu BJT Flashcard / OCI. */
interface N1Store {
  /** Chương đã học xong: id → thời điểm (ISO) */
  done: Record<string, string>;
  /** Kết quả trắc nghiệm: khóa ("bai-01" hoặc "bai-01/ga-hayaika") → điểm */
  quiz: Record<string, { best: number; last: number; total: number; at: string }>;
  /** Chương mở gần nhất → nút "Học tiếp" */
  lastLessonId: string | null;

  toggleDone: (id: string) => void;
  markDone: (id: string) => void;
  saveQuiz: (key: string, score: number, total: number) => void;
  visit: (id: string) => void;
  reset: () => void;
}

export const useN1Store = create<N1Store>()(
  persist(
    (set) => ({
      done: {},
      quiz: {},
      lastLessonId: null,

      toggleDone: (id) =>
        set((s) => {
          const done = { ...s.done };
          if (done[id]) delete done[id];
          else done[id] = new Date().toISOString();
          return { done };
        }),
      markDone: (id) => set((s) => (s.done[id] ? s : { done: { ...s.done, [id]: new Date().toISOString() } })),
      saveQuiz: (key, score, total) =>
        set((s) => {
          const prev = s.quiz[key];
          return {
            quiz: {
              ...s.quiz,
              [key]: { best: Math.max(prev?.best ?? 0, score), last: score, total, at: new Date().toISOString() },
            },
          };
        }),
      visit: (id) => set((s) => (s.lastLessonId === id ? s : { lastLessonId: id })),
      reset: () => set({ done: {}, quiz: {}, lastLessonId: null }),
    }),
    { name: "jlpt-n1-progress", version: 1 }
  )
);
