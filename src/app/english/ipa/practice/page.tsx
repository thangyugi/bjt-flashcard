import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/ui/page";
import { ALL_PHONEMES, IPA_LESSONS } from "@/data/english/ipa";
import { PracticeRoom } from "@/components/english/PracticeRoom";
import { EnVoiceSettings } from "@/components/english/EnSpeak";

export const metadata: Metadata = { title: "Luyện tập IPA — Khóa tiếng Anh" };

export default function IpaPracticePage() {
  const theory = IPA_LESSONS.map((l) => ({ level: l.level, qs: l.quiz }));
  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "Tiếng Anh", href: "/english" }, { label: "IPA", href: "/english/ipa" }, { label: "Luyện tập" }]}
        accent="#1d4ed8"
        eyebrow="Phát âm IPA"
        title="Phòng luyện tập IPA"
        size="md"
        lead={`Đề được tạo ngẫu nhiên từ ${ALL_PHONEMES.length} âm đã học — mỗi lần một đề mới. Đeo tai nghe cho phần nghe phân biệt.`}
      />
      <div className="flex w-full max-w-[960px] flex-col gap-8">
        <EnVoiceSettings />
        <PracticeRoom phonemes={ALL_PHONEMES} theory={theory} />
      </div>
    </Page>
  );
}
