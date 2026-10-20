import type { Metadata } from "next";
import Link from "next/link";
import { AsideNote, Page, PageHeader, WithAside } from "@/components/ui/page";
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
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "Tiếng Anh", href: "/english" }, { label: "IPA", href: "/english/ipa" }, { label: "Ôn tập" }]}
        accent="#1d4ed8"
        eyebrow="Phát âm IPA"
        title="Ôn âm IPA"
        size="md"
        lead="Mỗi ngày vài phút. Nhìn ký hiệu → tự đọc to & nhớ từ khóa → lật thẻ kiểm tra → tự chấm. Lịch ôn thông minh: nhớ càng chắc thì lần sau càng xa, quên thì ôn lại ngay trong lượt ôn."
      />
      <WithAside
        aside={
          <>
            <AsideNote title="Một lượt ôn">
              <ol className="flex list-decimal flex-col gap-1.5 pl-5">
                <li>Nhìn ký hiệu, tự đọc to.</li>
                <li>Nhớ lại từ khóa và cách đặt lưỡi, môi.</li>
                <li>Lật thẻ, nghe mẫu, so với giọng mình.</li>
                <li>Tự chấm thật lòng: lịch ôn tự tính lần gặp lại.</li>
              </ol>
            </AsideNote>
            <AsideNote title="Trong khóa IPA">
              <p className="flex flex-col gap-1">
                <Link href="/english/ipa" className="font-semibold text-ink hover:underline">
                  Mục lục {ALL_PHONEMES.length} âm
                </Link>
                <Link href="/english/ipa/practice" className="font-semibold text-ink hover:underline">
                  Phòng luyện tập
                </Link>
                <Link href="/quiz/english" className="font-semibold text-ink hover:underline">
                  Trắc nghiệm tiếng Anh
                </Link>
              </p>
            </AsideNote>
          </>
        }
      >
        <ReviewDeck phonemes={lite} />
      </WithAside>
    </Page>
  );
}
