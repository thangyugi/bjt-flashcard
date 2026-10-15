/**
 * Kiểu dữ liệu cho phần Từ vựng N1 (thư viện nhiều nguồn — hiện có Mimikara Oboeru N1).
 *
 * Quy ước chuỗi tiếng Nhật giống phần ngữ pháp:
 * - Viết chữ thường; scripts/generate_n1_furigana.py sinh furigana.
 * - [[…]] đánh dấu từ đang học trong câu ví dụ / đoạn truyện (dùng để tô đậm và tạo câu điền từ).
 */
import type { N1Question, N1StoryPara } from "../types";

export type WordPos = "noun" | "suru" | "verb" | "i-adj" | "na-adj" | "adv" | "kata";

export const POS_LABEL: Record<WordPos, string> = {
  noun: "Danh từ",
  suru: "Danh từ · する",
  verb: "Động từ",
  "i-adj": "Tính từ い",
  "na-adj": "Tính từ な",
  adv: "Phó từ",
  kata: "Katakana",
};

/** Một từ vựng. Trường viết tắt để file dữ liệu gọn. */
export interface VocabWord {
  /** Số thứ tự trong sách nguồn */
  no: number;
  /** Mặt chữ chính (kanji hoặc kana), động từ để ở thể từ điển, không kèm trợ từ */
  w: string;
  /** Cách đọc (hiragana / katakana) */
  r: string;
  /** Trợ từ đi kèm động từ: "を" | "が" | "を/が" */
  p?: string;
  pos: WordPos;
  /** Âm Hán Việt */
  hv?: string;
  /** Nghĩa tiếng Việt */
  m: string;
  /** Cách viết khác (異表記) */
  alt?: string;
  /** Cách dùng & khi nào dùng / không dùng */
  use: string;
  /** Cụm từ hay đi kèm — cho thấy vị trí trong câu */
  col: string[];
  /** Ví dụ: [tiếng Nhật có [[từ]], bản dịch] */
  ex: [string, string][];
  /** So sánh với từ gần nghĩa: [từ khác, khác nhau thế nào] */
  cmp?: [string, string][];
  /** Mẹo nhớ từ */
  memo: string;
  /**
   * Trọng âm cao–thấp (giọng Tokyo): vị trí mora mà sau đó giọng rơi xuống.
   * 0 = kiểu bằng (không rơi), 1 = rơi sau mora 1… Nhiều số = có nhiều cách đọc chấp nhận được.
   */
  acc?: number | number[];
  /** Chuỗi đưa cho giọng đọc khi cách đọc mặc định của máy dễ sai (ví dụ 人気 → ひとけ) */
  say?: string;
}

export interface VocabLesson {
  id: string;
  num: number;
  /** Tên bài (tiếng Việt) */
  title: string;
  titleJa: string;
  /** Bối cảnh mở đầu */
  scene: string;
  /** Đoạn truyện liên kết các từ trong bài */
  story: N1StoryPara[];
  words: VocabWord[];
  /** Câu hỏi viết tay: 用法 (dùng từ đúng), 言い換え… */
  quiz: N1Question[];
  /** Chữ Hán mới xuất hiện trong bài */
  kanji?: Record<string, KanjiInfo>;
}

export interface VocabSource {
  id: string;
  name: string;
  /** Tiền tố id từ, ví dụ "mk" → mk-001 */
  prefix: string;
  lessons: VocabLesson[];
}

/** Thông tin chữ Hán dùng chung cho mọi từ */
export interface KanjiInfo {
  /** Âm Hán Việt */
  hv: string;
  /** Nghĩa */
  m: string;
  /** Mẹo nhớ chữ (bộ thủ, hình ảnh) */
  memo?: string;
}

/** Thông tin gọn của bài để hiển thị mục lục */
export interface VocabLessonMeta {
  id: string;
  num: number;
  title: string;
  titleJa: string;
  range: [number, number];
  words: { w: string; r: string; m: string }[];
}
