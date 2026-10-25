import type { Metadata } from "next";
import { Suspense } from "react";
import { CcarMix } from "@/components/ccar-p/CcarMix";

export const metadata: Metadata = { title: "Trộn ngẫu nhiên câu hỏi" };

export default function CcarMixPage() {
  return (
    <Suspense fallback={null}>
      <CcarMix />
    </Suspense>
  );
}
