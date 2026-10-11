import type { Metadata } from "next";
import { Suspense } from "react";
import { MixRunner } from "@/components/oci-ai/MixRunner";

export const metadata: Metadata = { title: "Trộn ngẫu nhiên câu hỏi" };

export default function MixPage() {
  return (
    <Suspense fallback={null}>
      <MixRunner />
    </Suspense>
  );
}
