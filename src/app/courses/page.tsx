import type { Metadata } from "next";
import "@/components/home/home.css";
import { homeCatalog } from "@/lib/home/catalog";
import { CourseBand } from "@/components/home/CourseBand";
import { PageHeader } from "@/components/ui/page";

export const metadata: Metadata = {
  title: "Khóa học",
  description: "Các khóa học: JLPT N1 (ngữ pháp kể thành truyện), phát âm IPA, OCI AI Foundations, từ vựng BJT.",
};

/** Danh sách khóa học: cùng các cột khóa học như trang chủ (hình nét, số liệu thật, tiến độ khi đăng nhập). */
export default function CoursesPage() {
  const catalog = homeCatalog();
  const { totals } = catalog;
  return (
    <div className="hp flex flex-col gap-10 pt-6 pb-12 sm:gap-12 sm:pt-10 sm:pb-16">
      <PageHeader
        eyebrow={
          <>
            Khóa học <span className="font-mincho tracking-[0.3em] normal-case">講座</span>
          </>
        }
        title="Khóa học"
        lead={`${totals.courses} khóa, ${totals.lessons.toLocaleString("vi-VN")} bài, ${totals.items.toLocaleString("vi-VN")} mục học. Nội dung mở để xem miễn phí; đăng nhập để lưu tiến độ trên mọi thiết bị.`}
      />
      <CourseBand catalog={catalog} />
    </div>
  );
}
