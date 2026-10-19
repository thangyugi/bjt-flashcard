import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Một cây quý người học đã gieo vào ô đất của Thảo nguyên Pha Lê */
export interface Planting {
  /** Ô đất 0–7 */
  plot: number;
  /** id loài (src/components/land/data.ts) */
  species: string;
  /** Thời điểm gieo (ISO) */
  plantedAt: string;
  /** Số Tinh thể đã trả */
  cost: number;
}

interface LandStore {
  /** Cây đã gieo, mỗi ô tối đa một cây */
  plantings: Planting[];
  /** Tổng Tinh thể đã tiêu (số dư = đã nhận − đã tiêu, xem src/lib/land/economy.ts) */
  spent: number;
  /**
   * Gieo một cây: chỉ nhận khi ô còn trống và đủ Tinh thể (balance = số dư hiện tại).
   * Trả về true nếu đã gieo.
   */
  plant: (p: { plot: number; species: string; cost: number; balance: number }, now?: Date) => boolean;
  reset: () => void;
}

export const useLandStore = create<LandStore>()(
  persist(
    (set, get) => ({
      plantings: [],
      spent: 0,
      plant: ({ plot, species, cost, balance }, now = new Date()) => {
        const s = get();
        if (cost < 0 || cost > balance || s.plantings.some((x) => x.plot === plot)) return false;
        set({ plantings: [...s.plantings, { plot, species, plantedAt: now.toISOString(), cost }], spent: s.spent + cost });
        return true;
      },
      reset: () => set({ plantings: [], spent: 0 }),
    }),
    { name: "land-garden", version: 1 }
  )
);
