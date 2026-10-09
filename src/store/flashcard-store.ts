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

  // Trắc nghiệm: danh sách từ cần ôn (từ làm sai) và lịch sử từ đã hỏi theo phạm vi
  reviewIds: string[];
  addToReview: (ids: string[]) => void;
  removeFromReview: (ids: string[]) => void;
  clearReview: () => void;
  quizSeen: Record<string, string[]>;
  markQuizSeen: (scope: string, ids: string[], poolSize: number) => void;

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

      // ── Trắc nghiệm ────────────────────────────
      reviewIds: [],
      addToReview: (ids) =>
        set((state) => ({ reviewIds: Array.from(new Set([...state.reviewIds, ...ids])) })),
      removeFromReview: (ids) =>
        set((state) => ({ reviewIds: state.reviewIds.filter((id) => !ids.includes(id)) })),
      clearReview: () => set({ reviewIds: [] }),
      quizSeen: {},
      // Ghi nhớ các từ đã hỏi trong phạm vi; khi đã hỏi hết thì bắt đầu vòng mới
      markQuizSeen: (scope, ids, poolSize) =>
        set((state) => {
          const prev = state.quizSeen[scope] ?? [];
          let next = Array.from(new Set([...prev, ...ids]));
          // Đã hỏi hết: vòng mới chỉ nhớ các từ vừa hỏi để lần sau ưu tiên từ khác
          if (next.length >= poolSize) next = ids.length >= poolSize ? [] : [...ids];
          return { quizSeen: { ...state.quizSeen, [scope]: next } };
        }),

      // ── Filters ────────────────────────────────
      filters: {},
      setFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      clearFilters: () => set({ filters: {} }),
    }),
    {
      name: "bjt-flashcard-store",
      // Nạp tiến độ từ localStorage sau khi hydrate (xem QueryProvider) để HTML server/client khớp
      skipHydration: true,
      // Chỉ lưu tiến độ, bộ lọc và dữ liệu trắc nghiệm, không lưu trạng thái giao diện
      partialize: (state) => ({
        progress: state.progress,
        filters: state.filters,
        reviewIds: state.reviewIds,
        quizSeen: state.quizSeen,
      }),
    }
  )
);
