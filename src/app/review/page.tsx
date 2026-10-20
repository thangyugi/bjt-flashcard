import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/ui/page";
import { UniversalReview } from "@/components/learning/UniversalReview";

export const metadata: Metadata = { title: "Ôn tập hôm nay" };

export default function ReviewPage() {
  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Tiến độ", href: "/progress" }, { label: "Ôn tập" }]}
        eyebrow="Ôn tập FSRS"
        title="Ôn tập hôm nay"
        lead="Mọi khóa trong một chỗ: từ vựng, ngữ pháp, âm IPA. Tự nhớ lại → lật thẻ → chấm thật lòng. Lịch ôn tính bằng FSRS (thuật toán của Anki) để bạn nhớ ~90% mà ôn ít nhất."
      />
      <div className="w-full max-w-[760px]">
        <UniversalReview />
      </div>
    </Page>
  );
}
