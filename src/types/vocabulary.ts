import { z } from "zod";

// ─────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────

export const JlptLevel = z.enum(["N1", "N2", "N3", "N4", "N5"]);
export type JlptLevel = z.infer<typeof JlptLevel>;

export const BjtLevel = z.enum(["J1+", "J1", "J2", "J3", "J4", "J5"]);
export type BjtLevel = z.infer<typeof BjtLevel>;

export const PartOfSpeech = z.enum([
  "noun",         // 名詞
  "verb",         // 動詞
  "adjective",    // 形容詞
  "adverb",       // 副詞
  "expression",   // 慣用句・表現
  "compound",     // 複合語
  "katakana",     // 外来語
]);
export type PartOfSpeech = z.infer<typeof PartOfSpeech>;

export const CardStatus = z.enum(["new", "learning", "review", "mastered"]);
export type CardStatus = z.infer<typeof CardStatus>;

export const SourceType = z.enum(["BJT", "JLPT", "OTHER"]);
export type SourceType = z.infer<typeof SourceType>;

// ─────────────────────────────────────────────
// Vocabulary Source
// ─────────────────────────────────────────────

export const VocabularySourceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  type: SourceType,
  level: z.string().optional(), // "BJT", "N1", etc.
  createdAt: z.string().datetime(),
});
export type VocabularySource = z.infer<typeof VocabularySourceSchema>;

// ─────────────────────────────────────────────
// Vocabulary Group (nhóm các từ liên quan)
// ─────────────────────────────────────────────

export const VocabularyGroupSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  sourceName: z.string(),
  sourceType: SourceType,
  name: z.string(),                    // Tên nhóm (VD: "Khách hàng / Đối tác")
  nameJa: z.string().optional(),       // Tên tiếng Nhật
  description: z.string().optional(),  // Mô tả ngắn
  themeColor: z.string(),              // Màu sắc chủ đề (tailwind class hoặc hex)
  icon: z.string().optional(),         // Emoji icon
  sortOrder: z.number().int(),
  createdAt: z.string().datetime(),
  items: z.array(z.lazy(() => VocabularyItemSchema)),
});
export type VocabularyGroup = z.infer<typeof VocabularyGroupSchema>;

// ─────────────────────────────────────────────
// Vocabulary Item (từ vựng đơn lẻ)
// ─────────────────────────────────────────────

export const VocabularyItemSchema = z.object({
  id: z.string(),
  groupId: z.string(),
  // Từ chính
  kanji: z.string(),                    // VD: 話し合い
  hiragana: z.string().optional(),      // VD: はなしあい
  romaji: z.string().optional(),        // VD: hanashiai
  katakana: z.string().optional(),      // Dành cho từ ngoại lai
  // Nghĩa
  meaningVn: z.string(),                // Nghĩa tiếng Việt (bắt buộc)
  meaningEn: z.string().optional(),     // Nghĩa tiếng Anh
  meaningJa: z.string().optional(),     // Giải thích bằng tiếng Nhật
  // Phân loại
  partOfSpeech: PartOfSpeech.optional(),
  jlptLevel: JlptLevel.optional(),
  bjtRelevance: z.boolean().default(false),  // Có liên quan BJT không
  // Ví dụ
  exampleSentence: z.string().optional(),      // VD: 話し合いを行います
  exampleTranslation: z.string().optional(),   // Dịch câu ví dụ
  // Ghi chú & Context
  businessContext: z.string().optional(),  // Notes về ngữ cảnh business
  usageNotes: z.string().optional(),       // Cách dùng, lưu ý
  relatedWords: z.array(z.string()).optional(), // IDs của từ liên quan
  synonyms: z.array(z.string()).optional(),     // Từ đồng nghĩa
  antonyms: z.array(z.string()).optional(),     // Từ trái nghĩa
  // Meta
  sortOrder: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type VocabularyItem = z.infer<typeof VocabularyItemSchema>;

// ─────────────────────────────────────────────
// Flashcard Progress (per-item learning status)
// ─────────────────────────────────────────────

export const FlashcardProgressSchema = z.object({
  vocabularyItemId: z.string(),
  status: CardStatus,
  reviewCount: z.number().int().default(0),
  nextReviewAt: z.string().datetime().optional(),
  lastReviewedAt: z.string().datetime().optional(),
});
export type FlashcardProgress = z.infer<typeof FlashcardProgressSchema>;

// ─────────────────────────────────────────────
// Study Session
// ─────────────────────────────────────────────

export const StudySessionSchema = z.object({
  id: z.string(),
  groupId: z.string(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  cardsStudied: z.number().int().default(0),
  cardsCorrect: z.number().int().default(0),
});
export type StudySession = z.infer<typeof StudySessionSchema>;

// ─────────────────────────────────────────────
// UI State types
// ─────────────────────────────────────────────

export interface FlashCardUIState {
  isFlipped: boolean;
  currentIndex: number;
  totalCards: number;
}

export type FilterOptions = {
  sourceType?: SourceType;
  jlptLevel?: JlptLevel;
  bjtOnly?: boolean;
  status?: CardStatus;
};
