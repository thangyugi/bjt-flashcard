import type { Metadata } from "next";
import Link from "next/link";
import { UniversalReview } from "@/components/learning/UniversalReview";

export const metadata: Metadata = { title: "Ôn tập hôm nay" };

export default function ReviewPage() {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/progress" className="hover:text-ink">
          Tiến độ
        </Link>
        <span>/</span>
        <span className="text-ink-2">Ôn tập</span>
      </nav>
      <header className="flex flex-col gap-2">
        <h1 className="text-[30px] leading-tight font-extrabold tracking-[-0.02em] text-ink">Ôn tập hôm nay</h1>
        <p className="text-[15px] leading-relaxed text-ink-2">
          Mọi khóa trong một chỗ: từ vựng, ngữ pháp, âm IPA. Tự nhớ lại → lật thẻ → chấm thật lòng. Lịch ôn tính bằng FSRS (thuật toán của
          Anki) để bạn nhớ ~90% mà ôn ít nhất.
        </p>
      </header>
      <UniversalReview />
    </div>
  );
}
