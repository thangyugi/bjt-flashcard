import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Ôn tập ngắt quãng kiểu Leitner: hộp càng cao → càng lâu mới phải ôn lại. */
export const SRS_DAYS = [0, 1, 2, 4, 8, 16, 32];

export interface SrsCard {
  /** 0 = chưa học, 1…6 */
  box: number;
  /** Ngày đến hạn ôn (yyyy-mm-dd) */
  due: string;
  reps: number;
  lapses: number;
}

const today = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

/** Tiến độ khóa tiếng Anh — lưu riêng trên trình duyệt. */
interface EnStore {
  /** Bài đã học xong: id → thời điểm */
  done: Record<string, string>;
  /** Điểm trắc nghiệm theo khóa ("ipa-02/quiz", "practice/listen"…) */
  quiz: Record<string, { best: number; last: number; total: number; at: string }>;
  /** Thẻ ôn tập theo âm (id âm → trạng thái) */
  srs: Record<string, SrsCard>;
  lastIpaLesson: string | null;

  toggleDone: (id: string) => void;
  markDone: (id: string) => void;
  saveQuiz: (key: string, score: number, total: number) => void;
  visitIpa: (id: string) => void;
  /** Thêm các âm vào bộ ôn tập (khi học xong bài) */
  enroll: (ids: string[]) => void;
  /** Chấm thẻ: 0 = quên, 1 = nhớ mơ hồ, 2 = nhớ rõ */
  grade: (id: string, g: 0 | 1 | 2) => void;
  reset: () => void;
}

export const useEnStore = create<EnStore>()(
  persist(
    (set) => ({
      done: {},
      quiz: {},
      srs: {},
      lastIpaLesson: null,

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
            quiz: { ...s.quiz, [key]: { best: Math.max(prev?.best ?? 0, score), last: score, total, at: new Date().toISOString() } },
          };
        }),
      visitIpa: (id) => set((s) => (s.lastIpaLesson === id ? s : { lastIpaLesson: id })),
      enroll: (ids) =>
        set((s) => {
          const srs = { ...s.srs };
          let changed = false;
          for (const id of ids) {
            if (srs[id]) continue;
            srs[id] = { box: 1, due: today(), reps: 0, lapses: 0 };
            changed = true;
          }
          return changed ? { srs } : s;
        }),
      grade: (id, g) =>
        set((s) => {
          const c = s.srs[id] ?? { box: 1, due: today(), reps: 0, lapses: 0 };
          let box = c.box;
          if (g === 0) box = 1;
          else if (g === 2) box = Math.min(SRS_DAYS.length - 1, box + 1);
          const days = g === 0 ? 0 : g === 1 ? Math.max(1, Math.floor(SRS_DAYS[box] / 2)) : SRS_DAYS[box];
          return {
            srs: { ...s.srs, [id]: { box, due: today(days), reps: c.reps + 1, lapses: c.lapses + (g === 0 ? 1 : 0) } },
          };
        }),
      reset: () => set({ done: {}, quiz: {}, srs: {}, lastIpaLesson: null }),
    }),
    { name: "english-progress", version: 1 }
  )
);

export const todayKey = () => today();
