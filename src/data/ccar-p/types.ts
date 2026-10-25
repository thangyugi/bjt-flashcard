/** Kiểu dữ liệu khóa Claude Certified Architect – Professional (CCAR-P). Sinh bởi scripts/build-ccarp.ts. */

export type Tone = "quick" | "choose" | "learn" | "warn" | "star" | "info" | "note" | "ok" | "ban";

export type GuideBlock =
  | { t: "p"; text: string; tone?: Tone }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "ul" | "ol"; items: string[] };

export interface GuideSection {
  id: string;
  title: string;
  level: 2 | 3;
  blocks: GuideBlock[];
}

export interface GuideTask {
  /** "3-1" */
  id: string;
  /** "3.1" */
  code: string;
  title: string;
  subtitle?: string;
  blocks: GuideBlock[];
}

export interface GuideDomain {
  num: number;
  title: string;
  /** Tỉ trọng chính thức (%) */
  weight: number;
  intro: GuideBlock[];
  tasks: GuideTask[];
}

export interface Guide {
  front: GuideSection[];
  domains: GuideDomain[];
  back: GuideSection[];
}

export type Confidence = "high" | "medium" | "low";

interface BankBase {
  id: number;
  /** Số thứ tự trong ngân hàng gốc */
  no: number;
  domain: number;
  /** Task statement: "3-1" */
  task: string;
  /** Có trong bộ "ccar-p-v2" của chủ khóa */
  v2: boolean;
  en: string;
  vi: string;
  /** Khóa gốc (A, B, …) → nội dung phương án */
  options: Record<string, string>;
  optionsVi: Record<string, string>;
  confidence: Confidence;
  /** ✅ Kiến thức cần nhớ (markdown nhẹ; ⟦B⟧ = phương án gốc B) */
  remember: string;
  /** 💡 Vì sao chọn ô này */
  why: string;
  /** Câu do Claude biên soạn (không thuộc ngân hàng gốc): mã "c-<domain>-<nn>" */
  authored?: string;
  /** Nguồn tài liệu của câu Claude biên soạn */
  source?: string;
}

export interface BankMcq extends BankBase {
  type: "mcq";
  /** Khóa gốc của đáp án đúng (một hoặc nhiều) */
  answer: string[];
  /** ❌ Phương án sai → vì sao sai (theo khóa gốc) */
  wrong: Record<string, string>;
}

export interface BankGrid extends BankBase {
  /** matrix: Yes/No mỗi dòng · dropdown: chọn một phương án cho mỗi dòng */
  type: "matrix" | "dropdown";
  rows: { no: number; en: string; vi: string }[];
  rowsAnswer: Record<string, string>;
  rowsWhy: Record<string, string>;
}

export type BankQuestion = BankMcq | BankGrid;

export interface LessonMeta {
  id: string;
  code: string;
  title: string;
  domain: number;
}

/** Lớp bổ sung do Claude biên soạn (HTML dựng sẵn từ Markdown) */
export interface SupplementItem {
  layer: "can-thuoc" | "cach-chon" | "bay";
  title: string;
  html: string;
}

export interface Supplement {
  label: string;
  note: string;
  updated: string;
  referenceTitle: string;
  /** task "3-1" → các mục bổ sung */
  tasks: Record<string, SupplementItem[]>;
  reference: { id: string; title: string; html: string }[];
}

export interface DomainMeta {
  num: number;
  title: string;
  weight: number;
  /** "Học cái gì" (bảng mục lục của tài liệu) */
  topics: string;
  lessonIds: string[];
}
