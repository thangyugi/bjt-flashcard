import type { Metadata } from "next";
import { WatercolorLandPage } from "@/components/land/WatercolorLandPage";

export const metadata: Metadata = {
  title: "Thung lũng Bốn Mùa",
  description: "Thung lũng tròn vẽ màu nước: bốn góc bốn mùa, suối xoắn ốc, ao có đảo đền và đoàn tàu chạy vòng quanh.",
};

export default function Page() {
  return (
    <WatercolorLandPage
      world="bon-mua"
      still="/land/maps/bon-mua.webp"
      stillTall="/land/maps/bon-mua-portrait.webp"
      label="Thung lũng Bốn Mùa: thung lũng tròn chia bốn mùa — đông tuyết trên trái, thu vàng trên phải, hạ xanh dưới phải, xuân anh đào dưới trái; suối xoắn ốc đổ vào ao có đảo đền, cầu gỗ, ô đất trống, ruộng lúa, hướng dương, vườn quả, suối nóng thú tuyết, nhà ga mặt cú và đoàn tàu xanh chạy vòng quanh."
    />
  );
}
