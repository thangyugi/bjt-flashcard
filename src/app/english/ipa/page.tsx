import type { Metadata } from "next";
import { Page, PageHeader, Section } from "@/components/ui/page";
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
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "Tiếng Anh", href: "/english" }, { label: "IPA" }]}
        accent="#1d4ed8"
        eyebrow={<span className="font-ipa tracking-[0.1em] normal-case">/ˌɪn.təˈnæʃ.ən.əl fəˈnet.ɪk ˈæl.fə.bet/</span>}
        title="Phát âm chuẩn với IPA"
        lead="44 âm của tiếng Anh, học theo nhóm từ dễ đến khó: cách đặt miệng, nghe mẫu, quy luật nhìn chữ đoán âm, cặp từ dễ nhầm, câu chuyện xuyên suốt và chế độ ôn tập giúp nhớ lâu."
      >
        <div className="flex flex-wrap gap-2 text-[13.5px] text-ink-2">
          <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">{stats.lessons}/20 bài</span>
          <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">{stats.phonemes}/44 âm</span>
          <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">{stats.words} từ ví dụ</span>
        </div>
      </PageHeader>

      <IpaPracticeCards />

      <Section title="Cách học để nhớ lâu" id="ipa-method">
        <div className="cells grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {METHOD.map((m) => (
            <div key={m.title} className="flex flex-col gap-2 px-4 py-4">
              <m.icon className="h-6 w-6 text-[#1d4ed8]" aria-hidden />
              <span className="font-bold text-ink">{m.title}</span>
              <span className="font-ipa text-[13.5px] leading-relaxed text-ink-2">{m.body}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Bảng 44 âm IPA" id="ipa-chart">
        <p className="-mt-1 text-[14px] text-ink-2">Bấm loa để nghe từ khóa của mỗi âm, bấm ký hiệu để mở bài học.</p>
        <EnVoiceSettings />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <IpaChart available={available} />
          <div className="flex flex-col gap-2 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:h-fit">
            <h3 className="text-[15px] font-bold text-ink">Nguyên âm nằm ở đâu trong miệng?</h3>
            <VowelChart className="panel p-3" />
          </div>
        </div>
      </Section>

      <Section title="Lộ trình 20 bài" id="ipa-path">
        <IpaLessonList available={available} />
      </Section>
    </Page>
  );
}
