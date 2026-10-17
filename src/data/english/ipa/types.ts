/**
 * Khóa tiếng Anh — phần IPA (bảng phiên âm quốc tế, giọng Anh–Mỹ phổ thông).
 *
 * Quy ước chuỗi:
 * - Phiên âm viết KHÔNG kèm dấu gạch chéo, ví dụ "siː", "ˈhæp.i" (giao diện tự thêm /…/).
 * - Trong câu chuyện / câu ví dụ, [[…]] đánh dấu từ chứa âm đang học (để tô đậm).
 */

export type PhonemeKind = "short-vowel" | "long-vowel" | "diphthong" | "consonant";

export const KIND_LABEL: Record<PhonemeKind, string> = {
  "short-vowel": "Nguyên âm ngắn",
  "long-vowel": "Nguyên âm dài",
  diphthong: "Nguyên âm đôi",
  consonant: "Phụ âm",
};

/** Vị trí lưỡi (để vẽ biểu đồ nguyên âm) — chỉ cho nguyên âm đơn */
export interface VowelPos {
  /** 0 = lưỡi phía trước … 1 = phía sau */
  x: number;
  /** 0 = lưỡi cao (miệng khép) … 1 = lưỡi thấp (miệng mở) */
  y: number;
  /** Môi tròn? */
  round: boolean;
}

/** Cách phát âm phụ âm (để vẽ bảng phụ âm) */
export interface ConsonantInfo {
  /** Vị trí cấu âm */
  place: "hai môi" | "môi–răng" | "răng" | "lợi" | "sau lợi" | "ngạc cứng" | "ngạc mềm" | "thanh hầu";
  /** Phương thức */
  manner: "âm tắc (bật)" | "âm xát" | "âm tắc–xát" | "âm mũi" | "âm tiếp cận" | "âm bên";
  /** Hữu thanh (dây thanh rung) */
  voiced: boolean;
}

export interface IpaWord {
  /** Từ tiếng Anh */
  w: string;
  /** Phiên âm (không dấu /) */
  ipa: string;
  /** Nghĩa tiếng Việt */
  vi: string;
}

export interface IpaSentence {
  /** Câu tiếng Anh; [[…]] = từ chứa âm đang học */
  en: string;
  vi: string;
  /** Phiên âm cả câu (tùy chọn) */
  ipa?: string;
}

/** Cặp tối thiểu: hai từ chỉ khác nhau đúng một âm */
export interface MinimalPair {
  a: IpaWord;
  b: IpaWord;
}

export interface Phoneme {
  /** Neo trong trang, ví dụ "i-long" */
  id: string;
  /** Ký hiệu IPA, ví dụ "iː" */
  symbol: string;
  kind: PhonemeKind;
  /** Tên gọi dễ nhớ bằng tiếng Việt, ví dụ "i dài" */
  name: string;
  /** Từ khóa neo trí nhớ — mỗi âm gắn với MỘT từ quen thuộc */
  keyword: IpaWord;
  /** So sánh với âm tiếng Việt gần nhất (và chỗ khác nhau) */
  viLike: string;
  /** Các bước đặt miệng: môi, lưỡi, hàm, hơi, dây thanh */
  how: string[];
  vowel?: VowelPos;
  consonant?: ConsonantInfo;
  /** Cách viết thường gặp → âm này */
  spellings: { pattern: string; words: string[] }[];
  /** 6–10 từ ví dụ, từ dễ đến khó */
  words: IpaWord[];
  /** 2–4 câu ví dụ */
  sentences: IpaSentence[];
  /** Cặp tối thiểu với âm dễ nhầm */
  pairs?: MinimalPair[];
  /** Lỗi người Việt hay mắc */
  mistakes: string[];
  /** Bí quyết luyện */
  tips: string[];
  /** Mẹo nhớ ký hiệu & âm */
  memo: string;
  /** Khác biệt Anh (UK) – Mỹ (US) nếu có */
  usUk?: string;
}

/** Một mục lý thuyết / quy luật (dùng cho bài nhập môn, trọng âm, nối âm…) */
export interface IpaRule {
  title: string;
  /** Giải thích (tiếng Việt) */
  body: string;
  examples?: IpaWord[];
  /** Câu minh họa */
  sentences?: IpaSentence[];
}

export type IpaQuestion =
  /** Trắc nghiệm. `say` = câu/từ máy đọc lên làm đề nghe. Đáp án đúng đặt đầu (answer: 0), giao diện tự xáo. */
  | { type: "choice"; label?: string; q: string; say?: string; opts: string[]; answer: number; explain: string }
  /** Đúng / sai */
  | { type: "judge"; q: string; say?: string; ok: boolean; explain: string };

export type IpaLevel = "Cơ bản" | "Trung cấp" | "Nâng cao";

export interface IpaLesson {
  /** "ipa-01" … */
  id: string;
  num: number;
  /** Tên bài (tiếng Việt) */
  title: string;
  /** Ký hiệu chính hiển thị lớn, ví dụ "iː · ɪ" */
  mark: string;
  level: IpaLevel;
  /** Nhóm: "Nhập môn", "Nguyên âm đơn", "Nguyên âm đôi", "Phụ âm", "Nâng cao" */
  group: string;
  /** Bài này học gì, vì sao quan trọng */
  intro: string;
  /** Có thể rỗng với bài lý thuyết */
  phonemes: Phoneme[];
  /** Quy luật / lý thuyết */
  rules?: IpaRule[];
  /** Câu chuyện xuyên suốt khóa (nhân vật: Linh — cô gái Việt mới sang London làm việc; Tom — đồng nghiệp người Anh; Jake — bạn người Mỹ) */
  story: { title: string; paras: { en: string; vi: string }[] };
  /** Câu luyện nói nhanh (tongue twister) */
  twister?: { en: string; vi: string };
  /** 5–8 câu hỏi viết tay; các dạng nghe / chọn phiên âm được tạo tự động từ dữ liệu */
  quiz: IpaQuestion[];
}
