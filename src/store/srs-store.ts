import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createEmptyCard, fsrs, generatorParameters, Rating, State, type Card, type Grade } from "ts-fsrs";

/**
 * Bộ ôn tập ngắt quãng dùng chung cho MỌI khóa (thay hộp Leitner riêng của khóa tiếng Anh).
 * Thuật toán FSRS (ts-fsrs) — giống Anki: lịch ôn tính theo xác suất còn nhớ, mặc định giữ ~90%.
 * Thẻ = một mục học (src/lib/learning/keys.ts) × một kiểu luyện (nhận biết, nghe…).
 */

export type CardKind = "recognize" | "recall" | "listen" | "speak" | "cloze";

/** Dạng lưu được (JSON): ngày là chuỗi ISO */
export interface StoredCard {
  item: string;
  kind: CardKind;
  course: string;
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: State;
  last_review: string | null;
  suspended?: boolean;
}

export const cardId = (item: string, kind: CardKind = "recognize") => `${item}|${kind}`;

const STATE_NAME = ["new", "learning", "review", "relearning"] as const;
export const stateName = (s: State) => STATE_NAME[s];
export const stateFromName = (n: string): State =>
  n === "learning" ? State.Learning : n === "review" ? State.Review : n === "relearning" ? State.Relearning : State.New;

const toCard = (c: StoredCard): Card => ({
  due: new Date(c.due),
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
  state: c.state,
  last_review: c.last_review ? new Date(c.last_review) : undefined,
});

let scheduler = fsrs(generatorParameters({ enable_fuzz: true, request_retention: 0.9 }));
export function setRetention(r: number) {
  scheduler = fsrs(generatorParameters({ enable_fuzz: true, request_retention: r }));
}

/** Xem trước khoảng cách đến lần ôn sau cho từng nút chấm (để hiện "10 phút", "3 ngày"…) */
export function previewIntervals(c: StoredCard, now = new Date()): Record<Grade, number> {
  const preview = scheduler.repeat(toCard(c), now);
  const out = {} as Record<Grade, number>;
  for (const g of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as Grade[]) out[g] = preview[g].card.due.getTime() - now.getTime();
  return out;
}

export interface ReviewResult {
  before: StoredCard;
  after: StoredCard;
}

interface SrsStore {
  cards: Record<string, StoredCard>;
  /** Đã chuyển thẻ Leitner cũ của khóa tiếng Anh sang FSRS chưa */
  migratedLeitner: boolean;
  /** Thêm thẻ mới (bỏ qua thẻ đã có). Trả về các id vừa thêm. */
  enroll: (items: { item: string; course: string; kind?: CardKind }[], now?: Date) => string[];
  review: (id: string, rating: Grade, now?: Date) => ReviewResult | null;
  suspend: (id: string, on: boolean) => void;
  /** Gộp thẻ từ máy chủ: bản ôn gần nhất thắng */
  mergeServer: (cards: StoredCard[]) => void;
  importLeitner: (cards: Record<string, StoredCard>) => void;
}

export const useSrsStore = create<SrsStore>()(
  persist(
    (set, get) => ({
      cards: {},
      migratedLeitner: false,
      enroll: (items, now = new Date()) => {
        const cur = get().cards;
        const added: Record<string, StoredCard> = {};
        for (const { item, course, kind = "recognize" } of items) {
          const id = cardId(item, kind);
          if (cur[id] || added[id]) continue;
          const c = createEmptyCard(now);
          added[id] = {
            item,
            kind,
            course,
            due: c.due.toISOString(),
            stability: 0,
            difficulty: 0,
            elapsed_days: 0,
            scheduled_days: 0,
            learning_steps: 0,
            reps: 0,
            lapses: 0,
            state: State.New,
            last_review: null,
          };
        }
        if (Object.keys(added).length) set((s) => ({ cards: { ...s.cards, ...added } }));
        return Object.keys(added);
      },
      review: (id, rating, now = new Date()) => {
        const before = get().cards[id];
        if (!before) return null;
        const { card } = scheduler.next(toCard(before), now, rating);
        const after: StoredCard = {
          ...before,
          due: card.due.toISOString(),
          stability: card.stability,
          difficulty: card.difficulty,
          elapsed_days: card.elapsed_days,
          scheduled_days: card.scheduled_days,
          learning_steps: card.learning_steps,
          reps: card.reps,
          lapses: card.lapses,
          state: card.state,
          last_review: now.toISOString(),
        };
        set((s) => ({ cards: { ...s.cards, [id]: after } }));
        return { before, after };
      },
      suspend: (id, on) =>
        set((s) => (s.cards[id] ? { cards: { ...s.cards, [id]: { ...s.cards[id], suspended: on || undefined } } } : s)),
      mergeServer: (incoming) =>
        set((s) => {
          const cards = { ...s.cards };
          for (const c of incoming) {
            const id = cardId(c.item, c.kind);
            const mine = cards[id];
            const newer = !mine || (c.last_review ?? "") > (mine.last_review ?? "") || (!mine.last_review && !c.last_review);
            if (newer) cards[id] = { ...c, course: c.course || mine?.course || "" };
          }
          return { cards };
        }),
      importLeitner: (old) => set((s) => ({ cards: { ...old, ...s.cards }, migratedLeitner: true })),
    }),
    { name: "srs-cards", version: 1 }
  )
);

/** Thẻ đến hạn (sắp theo hạn, thẻ mới sau cùng) */
export function dueCards(cards: Record<string, StoredCard>, now = new Date(), filter?: (c: StoredCard) => boolean) {
  const t = now.toISOString();
  return Object.entries(cards)
    .filter(([, c]) => !c.suspended && c.due <= t && (!filter || filter(c)))
    .sort((a, b) => Number(a[1].state === State.New) - Number(b[1].state === State.New) || a[1].due.localeCompare(b[1].due));
}

export { Rating, State };
export type { Grade };

/**
 * Ví dụ khoảng cách ôn cho phần giải thích trên trang Ôn tập (không ngẫu nhiên hóa):
 * `first` — thẻ mới, lần chấm đầu tiên; `path` — nếu lần nào cũng chấm "Nhớ" đúng hạn thì các lần ôn sau cách nhau bao lâu.
 */
export function exampleIntervals(retention = 0.9) {
  const f = fsrs(generatorParameters({ enable_fuzz: false, request_retention: retention }));
  let now = new Date(2026, 0, 1, 9);
  let card = createEmptyCard(now);
  const preview = f.repeat(card, now);
  const first = {} as Record<Grade, number>;
  for (const g of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as Grade[]) first[g] = preview[g].card.due.getTime() - now.getTime();
  const path: number[] = [];
  for (let i = 0; i < 6; i++) {
    const next = f.next(card, now, Rating.Good).card;
    path.push(next.due.getTime() - now.getTime());
    card = next;
    now = next.due;
  }
  return { first, path };
}
