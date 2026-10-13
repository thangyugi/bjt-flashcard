/**
 * Kiểu dữ liệu cho khóa JLPT N1 — Ngữ pháp (theo Shinkanzen Master N1).
 *
 * Quy ước chuỗi tiếng Nhật:
 * - Viết chữ thường, KHÔNG cần tự gõ furigana: scripts/generate_n1_furigana.py
 *   sinh cách đọc cho mọi kanji vào furigana.json (định dạng {漢字|かんじ}).
 * - [[...]] đánh dấu phần ngữ pháp cần tô đậm (trong truyện, ví dụ, câu hỏi).
 * - ＿＿＿ là chỗ trống trong câu hỏi.
 */

export interface N1Example {
  jp: string;
  vi: string;
  /** Ghi chú ngắn: vì sao câu này dùng mẫu đó */
  note?: string;
}

/** Một lỗi hay gặp: câu sai → câu đúng + lý do */
export interface N1Dont {
  text: string;
  bad?: string;
  good?: string;
}

/** So sánh với mẫu gần nghĩa */
export interface N1Compare {
  other: string;
  diff: string;
  ex?: N1Example;
}

export type N1Question =
  /** Chọn 1 đáp án — điền chỗ trống / chọn nghĩa / chọn câu dùng đúng / chọn cách chia */
  | { type: "choice"; label?: string; q: string; qVi?: string; opts: string[]; answer: number; explain: string }
  /** Đúng / sai: câu này có dùng mẫu tự nhiên không? */
  | { type: "judge"; q: string; ok: boolean; explain: string; fix?: string }
  /** Sắp xếp các mảnh thành câu đúng (kiểu 文の組み立て ★). pieces theo đúng thứ tự. */
  | { type: "order"; before: string; pieces: string[]; after: string; star: number; vi: string; explain: string }
  /** Nối mẫu ngữ pháp ↔ nghĩa */
  | { type: "match"; q?: string; pairs: [string, string][]; explain?: string };

export interface N1Pattern {
  /** Neo trong trang, ví dụ "gahayaika" */
  id: string;
  /** Mẫu hiển thị lớn, ví dụ "〜が早いか" */
  pattern: string;
  /** Biến thể khác (nếu có) */
  variants?: string[];
  /** Nghĩa ngắn gọn (1 dòng) */
  meaning: string;
  /** Giải thích ý nghĩa & sắc thái */
  nuance: string;
  /** Cách chia / cách nối */
  forms: string[];
  /** Vị trí trong câu: [Vế trước] + MẪU + [Vế sau] */
  position: { before: string; after: string; note?: string };
  /** Văn phong: "Văn viết · trang trọng"… */
  register: string;
  /** Lưu ý cách dùng */
  usage: string[];
  examples: N1Example[];
  /** Khi nào nên dùng */
  dos: string[];
  /** Khi nào KHÔNG dùng */
  donts: N1Dont[];
  compare: N1Compare[];
  /** Mẹo nhớ */
  memo: string;
  /** Câu trong truyện có dùng mẫu này */
  storyLine?: string;
  /** Trắc nghiệm nhanh cho mẫu */
  quiz: N1Question[];
}

export interface N1StoryPara {
  jp: string;
  vi: string;
}

export interface N1Lesson {
  /** "bai-01" … */
  id: string;
  num: number;
  /** Chủ đề gốc của Shinkanzen, ví dụ "時間関係" */
  topicJa: string;
  topicVi: string;
  /** Tên chương trong câu chuyện */
  chapterJa: string;
  chapterVi: string;
  /** Bối cảnh mở đầu (tiếng Việt) */
  scene: string;
  story: N1StoryPara[];
  patterns: N1Pattern[];
  /** Bảng so sánh nhanh cả chương */
  table: { head: string[]; rows: string[][] };
  /** Liên kết kiến thức: nối với ngữ pháp đã học / chương khác */
  links: string[];
  /** Câu chốt cuối chương — mẹo nhớ cả nhóm */
  hook: string;
  /** Trắc nghiệm tổng ôn chương */
  quiz: N1Question[];
}

/** Thông tin gọn để hiển thị danh sách chương */
export interface N1LessonMeta {
  id: string;
  num: number;
  topicJa: string;
  topicVi: string;
  chapterJa: string;
  chapterVi: string;
  patterns: { id: string; pattern: string; meaning: string }[];
  quizCount: number;
}
