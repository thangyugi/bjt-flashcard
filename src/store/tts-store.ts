import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EnAccent, VoiceGender } from "@/lib/tts";

/** Tùy chọn giọng đọc tiếng Nhật (lưu trên máy). */
interface TtsStore {
  gender: VoiceGender;
  /** Tốc độ: 1 = thường, 0.7 = chậm */
  rate: number;
  /** Giọng tiếng Anh: Anh (UK) / Mỹ (US) */
  enAccent: EnAccent;
  setGender: (g: VoiceGender) => void;
  setEnAccent: (a: EnAccent) => void;
  setRate: (r: number) => void;
}

export const useTtsStore = create<TtsStore>()(
  persist(
    (set) => ({
      gender: "male",
      rate: 0.9,
      enAccent: "uk",
      setGender: (gender) => set({ gender }),
      setEnAccent: (enAccent) => set({ enAccent }),
      setRate: (rate) => set({ rate }),
    }),
    { name: "jp-tts", version: 1 }
  )
);
