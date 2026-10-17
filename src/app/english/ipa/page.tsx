import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, Ear, Footprints, Repeat2, ScrollText } from "lucide-react";
import { IPA_LESSONS, ipaStats } from "@/data/english/ipa";
import { IpaChart, IpaLessonList, IpaPracticeCards } from "@/components/english/IpaMap";
import { EnVoiceSettings } from "@/components/english/EnSpeak";
import { VowelChart } from "@/components/english/VowelChart";

export const metadata: Metadata = {
  title: "IPA — Phát âm tiếng Anh chuẩn | Khóa tiếng Anh",
  description: "Học và luyện 44 âm IPA tiếng Anh cho người Việt: cách đặt miệng, âm thanh, quy luật, cặp tối thiểu, câu chuyện và ôn tập ngắt quãng.",
};

const METHOD = [
  { icon: Footprints, title: "1. Đặt miệng đúng", body: "Mỗi âm có hướng dẫn từng bước: môi, lưỡi, hàm, hơi. Soi gương khi tập." },
  { icon: BookOpenCheck, title: "2. Neo bằng một từ khóa", body: "Mỗi ký hiệu gắn với MỘT từ quen (/iː/ = see). Nhớ từ là nhớ âm." },
  { icon: Ear, title: "3. Nghe – phân biệt", body: "Luyện cặp tối thiểu (ship/sheep) đến khi tai tách được hai âm, miệng mới nói đúng." },
  { icon: ScrollText, title: "4. Gặp lại trong truyện", body: "Câu chuyện của Linh ở London gom các âm vào ngữ cảnh — đọc to, nghe lại, bắt chước." },
  { icon: Repeat2, title: "5. Ôn ngắt quãng", body: "Âm đã học tự vào bộ ôn tập: 1 → 2 → 4 → 8 → 16 ngày. 5 phút mỗi ngày là đủ." },
];

export default function IpaHomePage() {
  const stats = ipaStats();
  const available = IPA_LESSONS.map((l) => l.id);
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-10 px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="Đường dẫn" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
        <Link href="/courses" className="hover:text-ink">Khóa học</Link>
        <span>/</span>
        <Link href="/english" className="hover:text-ink">Tiếng Anh</Link>
        <span>/</span>
        <span className="text-ink-2">IPA</span>
      </nav>

      <header className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-[#0f1f47] px-6 py-8 text-white sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -top-20 -right-10 h-64 w-64 rounded-full bg-[#1d4ed8]/80 sm:h-80 sm:w-80" aria-hidden />
        <span className="relative font-ipa text-[15px] tracking-[0.2em] text-[#b9c8f0]">/ˌɪn.təˈnæʃ.ən.əl fəˈnet.ɪk ˈæl.fə.bet/</span>
        <h1 className="relative text-[32px] leading-tight font-extrabold sm:text-[44px]">Phát âm chuẩn với IPA</h1>
        <p className="relative max-w-[640px] text-[16px] leading-relaxed text-[#dbe4fb]">
          44 âm của tiếng Anh, học theo nhóm từ dễ đến khó: cách đặt miệng, nghe mẫu, quy luật nhìn chữ đoán âm, cặp từ dễ
          nhầm, câu chuyện xuyên suốt và chế độ ôn tập giúp nhớ lâu.
        </p>
        <div className="relative flex flex-wrap gap-2 text-[14px]">
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">{stats.lessons}/20 bài</span>
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">{stats.phonemes}/44 âm</span>
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">{stats.words} từ ví dụ</span>
        </div>
      </header>

      <IpaPracticeCards />

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-extrabold tracking-[-0.015em] text-ink">Cách học để nhớ lâu</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {METHOD.map((m) => (
            <div key={m.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-surface px-4 py-4">
              <m.icon className="h-6 w-6 text-[#1d4ed8]" aria-hidden />
              <span className="font-bold text-ink">{m.title}</span>
              <span className="font-ipa text-[13.5px] leading-relaxed text-ink-2">{m.body}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[24px] font-extrabold tracking-[-0.015em] text-ink">Bảng 44 âm IPA</h2>
          <p className="text-[14px] text-ink-2">Bấm loa để nghe từ khóa của mỗi âm, bấm ký hiệu để mở bài học.</p>
        </div>
        <EnVoiceSettings />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <IpaChart available={available} />
          <div className="flex flex-col gap-2 lg:sticky lg:top-24 lg:h-fit">
            <h3 className="text-[15px] font-bold text-ink">Nguyên âm nằm ở đâu trong miệng?</h3>
            <VowelChart className="rounded-2xl border border-line bg-surface p-3" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-extrabold tracking-[-0.015em] text-ink">Lộ trình 20 bài</h2>
        <IpaLessonList available={available} />
      </section>
    </div>
  );
}
