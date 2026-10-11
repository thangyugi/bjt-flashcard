import type { MockExam } from "../types";
import { exam1Qs } from "./exam1";
import { exam2Qs } from "./exam2";
import { exam3Qs } from "./exam3";

/**
 * 3 đề thi mô phỏng OCI AI Foundations Associate (1Z0-1122-26).
 * Định dạng theo các kỳ thi trước: 40 câu · 60 phút · đạt 65% —
 * Oracle có thể thay đổi, hãy kiểm tra trên trang Oracle University/MyLearn.
 */
const make = (id: string, title: string, desc: string, qs: typeof exam1Qs): MockExam => ({
  id,
  title,
  desc,
  minutes: 60,
  passPct: 65,
  qs: qs.map((x, i) => ({ ...x, id: `${id}-${String(i + 1).padStart(2, "0")}` })),
});

export const EXAMS: MockExam[] = [
  make("exam-1", "Đề 1 — Nền tảng & dịch vụ cốt lõi", "Phủ đều 8 chủ đề, mức độ cơ bản–trung bình: khái niệm AI/ML/DL, LLM, ba trụ cột OCI Enterprise AI, AI services và vector search.", exam1Qs),
  make("exam-2", "Đề 2 — Tình huống & phân biệt khái niệm", "Nhiều câu tình huống “chọn giải pháp nào”, tập trung phân biệt các khái niệm gần giống: RAG vs fine-tuning, on-demand vs dedicated, các loại guardrail, IAM.", exam2Qs),
  make("exam-3", "Đề 3 — Tổng hợp nâng cao", "Đề tổng hợp khó hơn: agent, memory, MCP, bảo mật, hạ tầng GPU, Responsible AI và Oracle AI Database.", exam3Qs),
];
