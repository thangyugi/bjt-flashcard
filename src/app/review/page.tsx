import type { Metadata } from "next";
import Link from "next/link";
import { AsideNote, Page, PageHeader, WithAside } from "@/components/ui/page";
import { UniversalReview } from "@/components/learning/UniversalReview";
import { ReviewExplainer } from "@/components/learning/ReviewExplainer";

export const metadata: Metadata = { title: "Ôn tập hôm nay" };

export default function ReviewPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Lịch ôn thông minh"
        title="Ôn tập hôm nay"
        lead="Mọi khóa trong một chỗ: từ vựng, ngữ pháp, âm IPA. Tự nhớ lại → lật thẻ → chấm thật lòng. Mỗi thẻ quay lại đúng lúc bạn sắp quên, nên ôn ít mà vẫn nhớ lâu."
        actions={
          <a href="#cach-hoat-dong" className="text-[14px] font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
            Lịch ôn hoạt động thế nào?
          </a>
        }
      />
      <WithAside
        aside={
          <>
            <AsideNote title="Cách chấm">
              <ul className="flex flex-col gap-1.5">
                <li>
                  <b className="text-ink">Quên</b>: chưa nhớ ra, thẻ quay lại ngay trong lượt ôn này.
                </li>
                <li>
                  <b className="text-ink">Khó</b>: nhớ ra nhưng chật vật, lần sau gần hơn.
                </li>
                <li>
                  <b className="text-ink">Nhớ</b>: nhớ đúng, khoảng cách giãn ra bình thường.
                </li>
                <li>
                  <b className="text-ink">Dễ</b>: nhớ ngay, lần sau xa hẳn.
                </li>
              </ul>
            </AsideNote>
            <AsideNote title="Thêm thẻ để ôn">
              <p>
                Bài N1 có nút «Thêm … mục vào ôn tập»; bài IPA tự thêm các âm khi bạn học xong; thẻ BJT bấm «Chưa nhớ» sẽ vào lịch ôn.{" "}
                <a href="#cach-hoat-dong" className="font-semibold text-ink underline decoration-line-strong underline-offset-4">
                  Xem chi tiết
                </a>
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <Link href="/courses" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
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
      <ReviewExplainer />
    </Page>
  );
}
