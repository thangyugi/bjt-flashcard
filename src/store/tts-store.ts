import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VoiceGender } from "@/lib/tts";

/** Tùy chọn giọng đọc tiếng Nhật (lưu trên máy). */
interface TtsStore {
  gender: VoiceGender;
  /** Tốc độ: 1 = thường, 0.7 = chậm */
  rate: number;
  setGender: (g: VoiceGender) => void;
  setRate: (r: number) => void;
}

export const useTtsStore = create<TtsStore>()(
  persist(
    (set) => ({
      gender: "male",
      rate: 0.9,
      setGender: (gender) => set({ gender }),
      setRate: (rate) => set({ rate }),
    }),
    { name: "jp-tts", version: 1 }
  )
);
