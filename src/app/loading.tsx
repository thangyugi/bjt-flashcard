import { HomeSkeleton } from "@/components/layout/Skeletons";

// Hiện ngay khi chuyển trang, trong lúc trang mới đang tải
export default function Loading() {
  return <HomeSkeleton />;
}
