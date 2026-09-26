import type { PartOfSpeech, VocabularyItem } from "@/types/vocabulary";

export const POS_LABEL: Record<PartOfSpeech, string> = {
  noun: "Danh từ",
  verb: "Động từ",
  adjective: "Tính từ",
  adverb: "Phó từ",
  expression: "Cụm từ",
  compound: "Từ ghép",
  katakana: "Từ ngoại lai",
};

export function posLabel(pos?: PartOfSpeech) {
  return pos ? POS_LABEL[pos] ?? "Khác" : undefined;
}

export function readingOf(item: VocabularyItem) {
  return item.hiragana || item.katakana || "";
}

export function levelLabel(item: VocabularyItem) {
  return item.bjtRelevance ? "BJT" : item.jlptLevel ?? "N1";
}
