import type { Metadata } from "next";
import Link from "next/link";
import { AsideNote, Page, PageHeader, WithAside } from "@/components/ui/page";
import { UniversalReview } from "@/components/learning/UniversalReview";

export const metadata: Metadata = { title: "Ôn tập hôm nay" };

export default function ReviewPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Ôn tập FSRS"
        title="Ôn tập hôm nay"
        lead="Mọi khóa trong một chỗ: từ vựng, ngữ pháp, âm IPA. Tự nhớ lại → lật thẻ → chấm thật lòng. Lịch ôn tính bằng FSRS (thuật toán của Anki) để bạn nhớ ~90% mà ôn ít nhất."
      />
      <WithAside
        aside={
          <>
            <AsideNote title="Cách chấm">
              <ul className="flex flex-col gap-1.5">
                <li>
                  <b className="text-ink">Quên</b>: chưa nhớ ra, thẻ quay lại ngay trong phiên.
                </li>
                <li>
                  <b className="text-ink">Khó</b>: nhớ ra nhưng chậm, lần sau gần hơn.
                </li>
                <li>
                  <b className="text-ink">Nhớ</b>: nhớ đúng, lịch giãn ra bình thường.
                </li>
                <li>
                  <b className="text-ink">Dễ</b>: nhớ ngay, lần sau xa hẳn.
                </li>
              </ul>
            </AsideNote>
            <AsideNote title="Thêm thẻ để ôn">
              <p>Trong mỗi bài học có nút «Thêm … mục vào ôn tập». Mục đã thêm sẽ đến hạn theo lịch FSRS và hiện ở đây.</p>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/study" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
                  Học bài mới
                </Link>
                <Link href="/quiz" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
                  Làm trắc nghiệm
                </Link>
                <Link href="/progress" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
                  Xem tiến độ
                </Link>
              </p>
            </AsideNote>
          </>
        }
      >
        <UniversalReview />
      </WithAside>
    </Page>
  );
}
