import type { Metadata } from "next";
import { CourseCards } from "@/components/layout/CourseCards";

export const metadata: Metadata = {
  title: "Khóa học — BJT Flashcard",
  description: "Các khóa học: JLPT N1 (ngữ pháp kể thành truyện), OCI AI Foundations, từ vựng BJT.",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
      <header className="flex flex-col gap-2">
        <span className="font-mincho text-[15px] tracking-[0.3em] text-brand">講座</span>
        <h1 className="text-[32px] leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-[40px]">Khóa học</h1>
        <p className="max-w-[640px] text-[16px] leading-relaxed text-ink-2">
          Chọn một khóa để bắt đầu. Tiến độ mỗi khóa được lưu riêng trên trình duyệt của bạn.
        </p>
      </header>
      <CourseCards />
    </div>
  );
}
