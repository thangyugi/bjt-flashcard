import type { Metadata } from "next";
import { INTERVIEW, PROFILE } from "@/data/interview/phongvan";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { InterviewReader } from "@/components/interview/InterviewReader";
import { Jp } from "@/components/jlpt-n1/Jp";
import { Page } from "@/components/ui/page";

// Trang riêng: không có liên kết từ menu, không cho máy tìm kiếm lập chỉ mục
export const metadata: Metadata = {
  title: "面接 · 自己紹介と職務経歴",
  robots: { index: false, follow: false },
};

export default function PhongVanPage() {
  const sections = withFurigana(INTERVIEW);
  const profile = withFurigana(PROFILE);
  const total = INTERVIEW.reduce((n, s) => n + s.paragraphs.join("").length, 0);
  const minutes = Math.round(total / 300);

  return (
    <Page>
      <header className="flex flex-col gap-5 border-b border-line-strong pb-8 sm:pb-10">
        <span className="font-mincho text-[16px] leading-[2] tracking-[0.12em] text-ink-3">
          <Jp t={profile.heading} className="[&_rt]:tracking-normal" />
        </span>
        <h1 className="font-jp text-[clamp(34px,4.4vw,56px)] leading-tight font-bold text-ink">{PROFILE.name}</h1>
        <div className="flex flex-wrap gap-2 text-[14px] text-ink-2">
          <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">{PROFILE.role}</span>
          <span className="rounded-md bg-surface-2 px-3 py-0.5 leading-[2] font-semibold">
            <Jp t={profile.years} />
          </span>
          <span className="rounded-md bg-surface-2 px-3 py-1 font-semibold">
            {INTERVIEW.length - 1} dự án · nói ≈ {minutes} phút
          </span>
        </div>
        <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-2">
          Kịch bản phỏng vấn: tự giới thiệu và kinh nghiệm từng dự án. Bật / tắt furigana để luyện đọc, chỉnh cỡ chữ,
          bấm loa để nghe từng đoạn.
        </p>
      </header>

      <div className="w-full max-w-[880px]">
        <InterviewReader sections={sections} />
      </div>
    </Page>
  );
}
