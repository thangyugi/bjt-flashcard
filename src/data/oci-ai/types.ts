/** Kiểu dữ liệu cho khóa học Oracle Cloud Infrastructure AI Foundations (/oracle-oci-ai). */

export interface QuizOption {
  /** HTML ngắn (có thể chứa <code>, <strong>) */
  text: string;
  correct: boolean;
  /** Giải thích vì sao đúng / sai — HTML ngắn */
  explain: string;
}

export interface QuizQuestion {
  /** Câu hỏi — HTML ngắn */
  q: string;
  options: QuizOption[];
}

export interface OciLesson {
  /** Ví dụ "m1-l1", "m5-summary" */
  id: string;
  /** Số bài hiển thị, ví dụ "1.1"; bài tổng kết dùng "★" */
  code: string;
  kind: "lesson" | "summary";
  /** Tiêu đề đầy đủ (H1) */
  title: string;
  /** Tiêu đề ngắn trên thanh bên */
  navTitle: string;
  /** Thời gian đọc ước tính (phút) */
  minutes?: number;
  /** Tên bài trong khóa gốc của Oracle University */
  source?: string;
  /** Ghi chú hiển thị ở đầu bài (bài tổng kết) */
  note?: string;
  /** Nội dung bài học (HTML) */
  html: string;
  /** Trắc nghiệm cuối bài (nếu có) */
  quiz?: QuizQuestion[];
  /** Ngưỡng đạt (%) — dùng cho "Skill Check" của khóa gốc */
  passPct?: number;
  /** Nội dung sau phần trắc nghiệm (HTML) */
  afterHtml?: string;
}

export interface OciModule {
  id: string;
  /** Số thứ tự Phần trong trang này */
  num: number;
  /** Số module tương ứng trong khóa gốc */
  origModule: number;
  title: string;
  desc: string;
  lessons: OciLesson[];
}

export interface GlossaryItem {
  section: string;
  cat: string;
  term: string;
  vi: string;
}

/** Thông tin bài học gọn nhẹ để truyền xuống client (không kèm HTML nội dung) */
export interface LessonMeta {
  id: string;
  code: string;
  kind: OciLesson["kind"];
  title: string;
  navTitle: string;
  minutes?: number;
  moduleId: string;
  moduleNum: number;
  hasQuiz: boolean;
}

export interface ModuleMeta {
  id: string;
  num: number;
  origModule: number;
  title: string;
  desc: string;
  lessonIds: string[];
  minutes: number;
}
