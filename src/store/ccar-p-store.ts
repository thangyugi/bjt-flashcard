import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Tiến độ khóa Claude Certified Architect – Professional (CCAR-P) — lưu riêng, không đụng tới dữ liệu từ vựng BJT. */
interface CcarStore {
  /** Bài đã học xong: id → thời điểm đánh dấu (ISO) */
  done: Record<string, string>;
  /** Kết quả trắc nghiệm gần nhất của từng bài */
  quiz: Record<string, { score: number; total: number; at: string }>;
  /** Bài mở gần nhất → nút "Học tiếp" */
  lastLessonId: string | null;
  /** Kết quả luyện tập / thi thử: khóa bộ câu hỏi → điểm */
  practice: Record<string, { best: number; last: number; total: number; at: string }>;

  toggleDone: (id: string) => void;
  markDone: (id: string) => void;
  saveQuiz: (id: string, score: number, total: number) => void;
  visit: (id: string) => void;
  savePractice: (key: string, score: number, total: number) => void;
  reset: () => void;
}

export const useCcarStore = create<CcarStore>()(
  persist(
    (set) => ({
      done: {},
      quiz: {},
      lastLessonId: null,
      practice: {},

      toggleDone: (id) =>
        set((s) => {
          const done = { ...s.done };
          if (done[id]) delete done[id];
          else done[id] = new Date().toISOString();
          return { done };
        }),
      markDone: (id) =>
        set((s) => (s.done[id] ? s : { done: { ...s.done, [id]: new Date().toISOString() } })),
      saveQuiz: (id, score, total) =>
        set((s) => ({ quiz: { ...s.quiz, [id]: { score, total, at: new Date().toISOString() } } })),
      visit: (id) => set((s) => (s.lastLessonId === id ? s : { lastLessonId: id })),
      savePractice: (key, score, total) =>
        set((s) => {
          const prev = s.practice?.[key];
          return {
            practice: {
              ...s.practice,
              [key]: { best: Math.max(prev?.best ?? 0, score), last: score, total, at: new Date().toISOString() },
            },
          };
        }),
      reset: () => set({ done: {}, quiz: {}, lastLessonId: null, practice: {} }),
    }),
    { name: "ccar-p-progress", version: 1 }
  )
);
