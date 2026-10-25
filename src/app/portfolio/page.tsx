import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio (職務経歴書) của bạn: giới thiệu, 自己PR, 業務経歴, 技術経験, 学歴・資格.",
  robots: { index: false },
};

/** Portfolio riêng của từng tài khoản (cần đăng nhập — RequireAuth trong layout gốc) */
export default function PortfolioPage() {
  return <Portfolio />;
}
