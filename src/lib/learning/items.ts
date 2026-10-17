/** Chỉ mục mục học dùng chung (public/data/learning-items.json, sinh bởi scripts/build-catalog.ts). */

export interface ItemInfo {
  /** Loại: word | grammar_pattern | phoneme | term */
  t: string;
  /** Mặt chữ / ký hiệu */
  h: string;
  /** Cách đọc */
  r?: string;
  /** Từ khóa (âm IPA) */
  k?: string;
  ki?: string;
  /** Nghĩa */
  m: string;
  /** Chuỗi cho giọng đọc */
  s?: string;
  /** Đường dẫn tới bài */
  u: string;
  /** Khóa học có mục này */
  c: string[];
}

export interface ItemIndex {
  version: string;
  aliases: Record<string, string>;
  courses: Record<string, { title: string; lessons: string[] }>;
  items: Record<string, ItemInfo>;
}

let cache: Promise<ItemIndex> | null = null;

export function loadItemIndex(): Promise<ItemIndex> {
  cache ??= fetch("/data/learning-items.json")
    .then((r) => {
      if (!r.ok) throw new Error(`learning-items.json: HTTP ${r.status}`);
      return r.json() as Promise<ItemIndex>;
    })
    .catch((e) => {
      cache = null;
      throw e;
    });
  return cache;
}

export const ITEM_TYPE_LABEL: Record<string, string> = {
  word: "Từ vựng",
  grammar_pattern: "Ngữ pháp",
  phoneme: "Âm IPA",
  term: "Thuật ngữ",
};

export const COURSE_LABEL: Record<string, string> = {
  "jlpt-n1": "JLPT N1",
  english: "Tiếng Anh",
  "oci-ai": "OCI AI",
  bjt: "BJT",
};
