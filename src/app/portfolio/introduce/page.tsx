import type { Metadata } from "next";
import { Introduce } from "@/components/portfolio/Introduce";

export const metadata: Metadata = {
  title: "Introduce · 自己紹介",
  description: "Bài tự giới thiệu bằng tiếng Nhật kèm bản dịch tiếng Việt.",
  robots: { index: false },
};

export default function PortfolioIntroducePage() {
  return <Introduce />;
}
