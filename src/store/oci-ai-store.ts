import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Tiến độ khóa OCI AI Foundations — lưu riêng, không đụng tới dữ liệu BJT Flashcard. */
interface OciAiStore {
  /** Bài đã học xong: id → thời điểm đánh dấu (ISO) */
  done: Record<string, string>;
  /** Kết quả trắc nghiệm gần nhất của từng bài */
  quiz: Record<string, { score: number; total: number; at: string }>;
  /** Bài mở gần nhất → nút "Học tiếp" */
  lastLessonId: string | null;

  toggleDone: (id: string) => void;
  markDone: (id: string) => void;
  saveQuiz: (id: string, score: number, total: number) => void;
  visit: (id: string) => void;
  reset: () => void;
}

export const useOciAiStore = create<OciAiStore>()(
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
      markDone: (id) =>
        set((s) => (s.done[id] ? s : { done: { ...s.done, [id]: new Date().toISOString() } })),
      saveQuiz: (id, score, total) =>
        set((s) => ({ quiz: { ...s.quiz, [id]: { score, total, at: new Date().toISOString() } } })),
      visit: (id) => set((s) => (s.lastLessonId === id ? s : { lastLessonId: id })),
      reset: () => set({ done: {}, quiz: {}, lastLessonId: null }),
    }),
    { name: "oci-ai-progress", version: 1 }
  )
);
