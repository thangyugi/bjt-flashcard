/** Hằng số dùng chung (an toàn cho client) của khóa CCAR-P. */

export const CCAR_BASE = "/claude-ccar-p";
export const CCAR_TITLE = "Claude Certified Architect – Professional";
export const CCAR_SHORT = "CCAR-P";
/** Màu riêng của khóa (tím) */
export const CCAR_COLOR = "#6d28d9";

/** Thứ tự học đáng tiền nhất theo tài liệu ôn: 3 → 4 → 1 → 5 → 6 → 2 → 7 */
export const STUDY_ORDER = [3, 4, 1, 5, 6, 2, 7];

/** Định dạng đề thật (Exam Guide v1.0) */
export const EXAM_FACTS = { code: "CCAR-P", items: 63, minutes: 120 };

/**
 * Ngưỡng đạt của đề thi thử: 72% — lấy theo tệp ngân hàng đề của chủ khóa (pass_score: 72).
 * Đề thật báo điểm quy đổi 100–1000, mốc đạt 720 (không phải phần trăm câu đúng).
 */
export const MOCK_PASS_PCT = 72;

/** Tên ngắn của domain (khớp tài liệu ôn) */
export const DOMAIN_SHORT: Record<number, string> = {
  1: "Solution Design & Architecture",
  2: "Models, Prompting & Context",
  3: "Integration",
  4: "Evaluation, Testing & Optimization",
  5: "Governance, Safety & Risk",
  6: "Stakeholder & Lifecycle",
  7: "Developer Productivity",
};

/** Mã bộ câu hỏi luyện tập (đoạn cuối đường dẫn /practice/[set]) */
export const setId = {
  domain: (d: number) => `domain-${d}`,
  task: (t: string) => `task-${t}`,
  v2: "v2",
};
