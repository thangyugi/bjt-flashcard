import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/learning/ProgressDashboard";

export const metadata: Metadata = { title: "Tiến độ học tập" };

export default function ProgressPage() {
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-[30px] leading-tight font-extrabold tracking-[-0.02em] text-ink">Tiến độ học tập</h1>
        <p className="text-[15px] leading-relaxed text-ink-2">Chuỗi ngày học, thời gian, bộ ôn tập và tiến độ từng khóa — gộp mọi khóa trong một trang.</p>
      </header>
      <ProgressDashboard />
    </div>
  );
}
