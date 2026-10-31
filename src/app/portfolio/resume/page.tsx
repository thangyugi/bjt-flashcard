import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const metadata: Metadata = {
  title: "My Portfolio · 職務経歴書",
  description: "職務経歴書 của bạn: giới thiệu, 自己PR, 業務経歴, 技術経験, 学歴・資格.",
  robots: { index: false },
};

export default function PortfolioResumePage() {
  return <Portfolio />;
}
