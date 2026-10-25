import type { Metadata } from "next";
import Link from "next/link";
import { AsideNote, Page, PageHeader, WithAside } from "@/components/ui/page";
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
      <WithAside
        aside={
          <>
            <AsideNote title="Giọng mẫu">
              <EnVoiceSettings />
            </AsideNote>
            <AsideNote title="Mẹo luyện">
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                <li>Đeo tai nghe cho phần nghe phân biệt cặp âm.</li>
                <li>Sai câu nào, mở lại bài của âm đó rồi làm đề mới.</li>
                <li>Mỗi lần mở là một đề khác, làm vài đề ngắn tốt hơn một đề dài.</li>
              </ul>
            </AsideNote>
            <AsideNote title="Trong khóa IPA">
              <p className="flex flex-col">
                <Link href="/english/ipa" className="flex min-h-10 items-center font-semibold text-ink hover:underline">
                  Mục lục bài
                </Link>
                <Link href="/english/ipa/review" className="flex min-h-10 items-center font-semibold text-ink hover:underline">
                  Ôn tập ngắt quãng
                </Link>
              </p>
            </AsideNote>
          </>
        }
      >
        <PracticeRoom phonemes={ALL_PHONEMES} theory={theory} />
      </WithAside>
    </Page>
  );
}
