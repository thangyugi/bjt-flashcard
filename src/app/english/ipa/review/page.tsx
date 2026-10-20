import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/ui/page";
import { ALL_PHONEMES } from "@/data/english/ipa";
import { ReviewDeck } from "@/components/english/ReviewDeck";

export const metadata: Metadata = { title: "Ôn tập IPA — Khóa tiếng Anh" };

export default function IpaReviewPage() {
  const lite = ALL_PHONEMES.map(({ id, symbol, name, keyword, how, words, lessonId, lessonNum, memo }) => ({
    id, symbol, name, keyword, how, words, lessonId, lessonNum, memo,
  }));
  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Tiếng Anh", href: "/english" }, { label: "IPA", href: "/english/ipa" }, { label: "Ôn tập" }]}
        accent="#1d4ed8"
        eyebrow="Phát âm IPA"
        title="Ôn tập ngắt quãng"
        size="md"
        lead="Mỗi ngày vài phút. Nhìn ký hiệu → tự đọc to & nhớ từ khóa → lật thẻ kiểm tra → tự chấm. Lịch ôn tính bằng FSRS (thuật toán của Anki): nhớ càng chắc thì lần sau càng xa, quên thì ôn lại ngay trong phiên."
      />
      <div className="w-full max-w-[760px]">
        <ReviewDeck phonemes={lite} />
      </div>
    </Page>
  );
}
