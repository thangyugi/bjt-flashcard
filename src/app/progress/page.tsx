import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/learning/ProgressDashboard";
import { Page, PageHeader } from "@/components/ui/page";

export const metadata: Metadata = { title: "Tiến độ học tập" };

export default function ProgressPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Tiến độ"
        title="Tiến độ học tập"
        lead="Chuỗi ngày học, thời gian, bộ ôn tập và tiến độ từng khóa — gộp mọi khóa trong một trang."
      />
      <ProgressDashboard />
    </Page>
  );
}
