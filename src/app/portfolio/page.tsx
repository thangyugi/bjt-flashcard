import type { Metadata } from "next";
import "@/components/home/home.css";
import { PageHeader } from "@/components/ui/page";
import { PortfolioHub } from "@/components/portfolio/PortfolioHub";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio của bạn: Introduce (自己紹介), Interview Q&A (面接Q&A) và My Portfolio (職務経歴書).",
  robots: { index: false },
};

/** Trang chọn mục Portfolio: cùng khung với trang Khóa học (đầu trang + dải cột). Cần đăng nhập — RequireAuth trong layout gốc. */
export default function PortfolioPage() {
  return (
    <div className="hp flex flex-col gap-10 pt-6 pb-12 sm:gap-12 sm:pt-10 sm:pb-16">
      <PageHeader
        eyebrow={
          <>
            Portfolio <span className="font-mincho tracking-[0.3em] normal-case">経歴</span>
          </>
        }
        title="Portfolio"
        lead="Ba phần để chuẩn bị xin việc ở công ty Nhật. Mỗi phần có sẵn nội dung mẫu; bấm «Chỉnh sửa» bên trong để thêm, sửa, xóa. Nội dung được lưu vào tài khoản và chỉ bạn xem được."
      />
      <PortfolioHub />
    </div>
  );
}
