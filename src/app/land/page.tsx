import type { Metadata } from "next";
import { LandPage } from "@/components/land/LandPage";

export const metadata: Metadata = {
  title: "Vùng đất của bạn",
  description: "Thảo nguyên Pha Lê — học để nhận Tinh thể, gieo cây quý và đi dạo trên vùng đất của bạn.",
};

export default function Page() {
  return <LandPage />;
}
