import type { Metadata } from "next";
import { INTERVIEW, PROFILE } from "@/data/interview/phongvan";
import { withFurigana } from "@/data/jlpt-n1/furigana";
import { InterviewReader } from "@/components/interview/InterviewReader";
import { Jp } from "@/components/jlpt-n1/Jp";

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
    <div className="mx-auto flex max-w-[880px] flex-col gap-6 px-4 py-6 sm:px-8 sm:py-10">
      <header className="relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-ink px-6 py-8 text-paper sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -top-20 -right-16 h-60 w-60 rounded-full bg-brand/90 sm:h-72 sm:w-72" aria-hidden />
        <span className="relative font-mincho text-[16px] leading-[2] tracking-[0.12em] text-[#d8cfc6]">
          <Jp t={profile.heading} className="[&_rt]:tracking-normal [&_rt]:text-[#b5ada5]" />
        </span>
        <h1 className="relative font-jp text-[34px] leading-tight font-bold sm:text-[44px]">{PROFILE.name}</h1>
        <div className="relative flex flex-wrap gap-2 text-[14px]">
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">{PROFILE.role}</span>
          <span className="rounded-full bg-white/12 px-3 py-0.5 leading-[2] font-semibold">
            <Jp t={profile.years} className="[&_rt]:text-[#cfc6bd]" />
          </span>
          <span className="rounded-full bg-white/12 px-3 py-1 font-semibold">
            {INTERVIEW.length - 1} dự án · nói ≈ {minutes} phút
          </span>
        </div>
        <p className="relative max-w-[560px] text-[14px] leading-relaxed text-[#e9e2da]">
          Kịch bản phỏng vấn: tự giới thiệu và kinh nghiệm từng dự án. Bật / tắt furigana để luyện đọc, chỉnh cỡ chữ,
          bấm loa để nghe từng đoạn.
        </p>
      </header>

      <InterviewReader sections={sections} />
    </div>
  );
}
