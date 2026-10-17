import type { Metadata } from "next";
import Link from "next/link";
import { ALL_PHONEMES } from "@/data/english/ipa";
import { ReviewDeck } from "@/components/english/ReviewDeck";

export const metadata: Metadata = { title: "Ôn tập IPA — Khóa tiếng Anh" };

export default function IpaReviewPage() {
  const lite = ALL_PHONEMES.map(({ id, symbol, name, keyword, how, words, lessonId, lessonNum, memo }) => ({
    id, symbol, name, keyword, how, words, lessonId, lessonNum, memo,
  }));
  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/english" className="hover:text-ink">Tiếng Anh</Link>
        <span>/</span>
        <Link href="/english/ipa" className="hover:text-ink">IPA</Link>
        <span>/</span>
        <span className="text-ink-2">Ôn tập</span>
      </nav>
      <header className="flex flex-col gap-2">
        <h1 className="text-[30px] leading-tight font-extrabold tracking-[-0.02em] text-ink">Ôn tập ngắt quãng</h1>
        <p className="text-[15px] leading-relaxed text-ink-2">
          Mỗi ngày vài phút. Nhìn ký hiệu → tự đọc to & nhớ từ khóa → lật thẻ kiểm tra → tự chấm. Nhớ rõ thì lần sau
          giãn ra (1 → 2 → 4 → 8 → 16 → 32 ngày), quên thì ôn lại ngay.
        </p>
      </header>
      <ReviewDeck phonemes={lite} />
    </div>
  );
}
