import type { Metadata } from "next";
import { InterviewQa } from "@/components/portfolio/InterviewQa";

export const metadata: Metadata = {
  title: "Interview Q&A · 面接Q&A",
  description: "Câu hỏi phỏng vấn IT, câu trả lời tiếng Nhật kèm bản dịch tiếng Việt.",
  robots: { index: false },
};

export default function PortfolioInterviewPage() {
  return <InterviewQa />;
}
