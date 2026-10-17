import type { Metadata } from "next";
import Link from "next/link";
import { ALL_PHONEMES, IPA_LESSONS } from "@/data/english/ipa";
import { PracticeRoom } from "@/components/english/PracticeRoom";
import { EnVoiceSettings } from "@/components/english/EnSpeak";

export const metadata: Metadata = { title: "Luyện tập IPA — Khóa tiếng Anh" };

export default function IpaPracticePage() {
  const theory = IPA_LESSONS.map((l) => ({ level: l.level, qs: l.quiz }));
  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/english" className="hover:text-ink">Tiếng Anh</Link>
        <span>/</span>
        <Link href="/english/ipa" className="hover:text-ink">IPA</Link>
        <span>/</span>
        <span className="text-ink-2">Luyện tập</span>
      </nav>
      <header className="flex flex-col gap-2">
        <h1 className="text-[30px] leading-tight font-extrabold tracking-[-0.02em] text-ink sm:text-[36px]">Phòng luyện tập IPA</h1>
        <p className="max-w-[640px] text-[15px] leading-relaxed text-ink-2">
          Đề được tạo ngẫu nhiên từ {ALL_PHONEMES.length} âm đã học — mỗi lần một đề mới. Đeo tai nghe cho phần nghe phân biệt.
        </p>
      </header>
      <EnVoiceSettings />
      <PracticeRoom phonemes={ALL_PHONEMES} theory={theory} />
    </div>
  );
}
