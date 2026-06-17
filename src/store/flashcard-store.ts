import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FlashcardProgress, CardStatus, FilterOptions } from "@/types/vocabulary";

interface FlashcardStore {
  // Card flip state
  flippedCards: Set<string>;
  toggleFlip: (cardId: string) => void;
  resetFlips: () => void;

  // Progress tracking (persisted locally)
  progress: Record<string, FlashcardProgress>;
  updateProgress: (itemId: string, status: CardStatus) => void;
  getProgress: (itemId: string) => FlashcardProgress | undefined;
  resetProgress: () => void;

  // Study session
  currentGroupId: string | null;
  currentCardIndex: number;
  setCurrentGroup: (groupId: string) => void;
  setCurrentCardIndex: (index: number) => void;
  goNext: () => void;
  goPrev: (total: number) => void;

  // Filters
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
}

export const useFlashcardStore = create<FlashcardStore>()(
  persist(
    (set, get) => ({
      // ── Card flip ──────────────────────────────
      flippedCards: new Set(),
      toggleFlip: (cardId) =>
        set((state) => {
          const next = new Set(state.flippedCards);
          if (next.has(cardId)) next.delete(cardId);
          else next.add(cardId);
          return { flippedCards: next };
        }),
      resetFlips: () => set({ flippedCards: new Set() }),

      // ── Progress ───────────────────────────────
      progress: {},
      updateProgress: (itemId, status) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [itemId]: {
              vocabularyItemId: itemId,
              status,
              reviewCount: (state.progress[itemId]?.reviewCount ?? 0) + 1,
              lastReviewedAt: new Date().toISOString(),
            },
          },
        })),
      getProgress: (itemId) => get().progress[itemId],
      resetProgress: () => set({ progress: {} }),

      // ── Study session ──────────────────────────
      currentGroupId: null,
      currentCardIndex: 0,
      setCurrentGroup: (groupId) =>
        set({ currentGroupId: groupId, currentCardIndex: 0, flippedCards: new Set() }),
      setCurrentCardIndex: (index) => set({ currentCardIndex: index }),
      goNext: () =>
        set((state) => ({ currentCardIndex: state.currentCardIndex + 1 })),
      goPrev: (total) =>
        set((state) => ({
          currentCardIndex: Math.max(0, state.currentCardIndex - 1),
        })),

      // ── Filters ────────────────────────────────
      filters: {},
      setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      clearFilters: () => set({ filters: {} }),
    }),
    {
      name: "bjt-flashcard-store",
      // Only persist progress and filters, not UI state
      partialize: (state) => ({
        progress: state.progress,
        filters: state.filters,
      }),
    }
  )
);
