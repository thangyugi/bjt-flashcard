import { PageLoader } from "@/components/layout/PageLoader";

// Hiện ngay khi chuyển trang, trong lúc trang mới đang tải
export default function Loading() {
  return <PageLoader className="min-h-[60vh]" />;
}
