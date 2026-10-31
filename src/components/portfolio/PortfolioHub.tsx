import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { IsoIcon, type IsoName } from "@/components/home/drawing/IsoIcon";
import { ArrowLong } from "@/components/home/icons";

interface HubCol {
  href: string;
  color: string;
  icon: IsoName;
  meta: [string, ReactNode];
  title: [string, string];
  facts: ReactNode[];
  go: string;
}

const COLS: HubCol[] = [
  {
    href: "/portfolio/introduce",
    color: "#b8202f",
    icon: "intro",
    meta: [
      "Giới thiệu bản thân",
      <span key="m" className="mincho" lang="ja">
        自己紹介
      </span>,
    ],
    title: ["Self", "Introduce"],
    facts: [<>Bài tự giới thiệu 1 phút, kinh nghiệm, điểm mạnh</>, <>Tiếng Nhật kèm bản dịch tiếng Việt</>],
    go: "Mở Introduce",
  },
  {
    href: "/portfolio/interview",
    color: "#1d4ed8",
    icon: "qa",
    meta: [
      "Luyện phỏng vấn",
      <span key="m" className="mincho" lang="ja">
        面接Q&amp;A
      </span>,
    ],
    title: ["Interview", "Q&A"],
    facts: [<>Câu hỏi phỏng vấn IT theo 5 chủ đề</>, <>Trả lời mẫu tiếng Nhật, dịch tiếng Việt, mở / gập để luyện</>],
    go: "Mở Interview Q&A",
  },
  {
    href: "/portfolio/resume",
    color: "#8f5a00",
    icon: "resume",
    meta: [
      "Hồ sơ kinh nghiệm",
      <span key="m" className="mincho" lang="ja">
        職務経歴書
      </span>,
    ],
    title: ["My", "Portfolio"],
    facts: [<>自己PR, các dự án đã tham gia, kỹ năng theo số năm</>, <>Học vấn và chứng chỉ</>],
    go: "Mở My Portfolio",
  },
];

/** Dải 3 cột của trang /portfolio: cùng kiểu cột khóa học (hình nét, tô màu khi rê chuột, cả cột là liên kết) */
export function PortfolioHub() {
  return (
    <div className="cols c3">
      {COLS.map((c) => (
        <div key={c.href} className="col course" style={{ "--c": c.color } as CSSProperties}>
          <Link className="hit" href={c.href} aria-label={`${c.title.join(" ")}: ${c.meta[0]}`} />
          <div className="art">
            <IsoIcon name={c.icon} />
          </div>
          <div className="cbody">
            <div className="meta">
              <span>{c.meta[0]}</span>
              {c.meta[1]}
            </div>
            <h3 className="hx ch3">
              <span>{c.title[0]}</span>
              <span>{c.title[1]}</span>
            </h3>
            <ul className="facts">
              {c.facts.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="go foot">
              <span>{c.go}</span>
              <ArrowLong />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
