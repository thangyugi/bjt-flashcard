import type { ReactNode } from "react";
import { COURSES } from "@/data/courses";
import type { HomeCatalog } from "@/lib/home/catalog";
import { IsoIcon, type IsoName } from "./drawing/IsoIcon";
import { CourseLink } from "./CourseLink";

const fmt = (n: number) => n.toLocaleString("vi-VN");

interface CourseCol {
  /** id trong src/data/courses.ts (cũng là khóa trong catalog) */
  id: "jlpt-n1" | "english" | "oci-ai" | "bjt";
  color: string;
  icon: IsoName;
  meta: [string, ReactNode];
  title: [string, string];
  facts: ReactNode[];
}

/** Dải khóa học: 4 khóa thật + cột "Sắp ra mắt". Hình được tô màu khóa khi rê chuột / focus. */
export function CourseBand({ catalog }: { catalog: HomeCatalog }) {
  const { n1, english, oci, bjt } = catalog;
  const cols: CourseCol[] = [
    {
      id: "jlpt-n1",
      color: "#b8202f",
      icon: "n1",
      meta: [
        "Tiếng Nhật",
        <span key="m" className="mincho" lang="ja">
          日本語能力試験
        </span>,
      ],
      title: ["JLPT", "N1"],
      facts: [
        <>
          <b>{n1.chapters}</b> chương ngữ pháp kể thành truyện «Một năm ở Tokyo của Mai», <b>{n1.patterns}</b> mẫu
        </>,
        <>
          <b>{fmt(n1.words)}</b> từ Mimikara N1 trong <b>{n1.vocabLessons}</b> bài
        </>,
      ],
    },
    {
      id: "english",
      color: "#1d4ed8",
      icon: "ipa",
      meta: ["Tiếng Anh", <span key="m">/ˈaɪ.pi.eɪ/</span>],
      title: ["Phát âm", "IPA"],
      facts: [
        <>
          <b>{english.lessons}</b> bài, <b>{english.phonemes}</b> âm
        </>,
        <>Giọng Anh và Mỹ, nam và nữ</>,
      ],
    },
    {
      id: "oci-ai",
      color: "#0f766e",
      icon: "oci",
      meta: ["Chứng chỉ", <span key="m">1Z0-1122</span>],
      title: ["OCI AI", "Foundations"],
      facts: [
        <>
          <b>{oci.modules}</b> module, <b>{oci.lessons}</b> bài, <b>{oci.terms}</b> thuật ngữ
        </>,
        <>
          Đề thi thử theo chứng chỉ <span className="nowrap">1Z0-1122</span>
        </>,
      ],
    },
    {
      id: "bjt",
      color: "#a14f06",
      icon: "bjt",
      meta: [
        "Tiếng Nhật thương mại",
        <span key="m" className="mincho" lang="ja">
          ビジネス
        </span>,
      ],
      title: ["Từ vựng", "BJT"],
      facts: [
        <>
          <b>{fmt(bjt.cards)}</b> thẻ
        </>,
        <>
          <b>{bjt.topics}</b> chủ đề công sở
        </>,
      ],
    },
  ];

  return (
    <div className="cols c5">
      {cols.map((c) => {
        const course = COURSES.find((x) => x.id === c.id)!;
        const lessons = catalog.courses.find((x) => x.key === c.id) ?? { key: c.id, title: course.title, lessons: [] };
        return (
          <CourseLink
            key={c.id}
            id={c.id}
            href={course.href}
            color={c.color}
            lessons={lessons}
            bjtTotal={bjt.cards}
            art={<IsoIcon name={c.icon} />}
            body={
              <>
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
              </>
            }
          />
        );
      })}
      <div className="col soon">
        <div className="art">
          <IsoIcon name="soon" />
        </div>
        <div className="cbody">
          <div className="meta">
            <span>Đang biên soạn</span>
          </div>
          <h3 className="hx ch3">
            <span>Sắp</span>
            <span>ra mắt</span>
          </h3>
          <p className="note">Khóa học tiếp theo đang được chuẩn bị. Khi sẵn sàng, nó sẽ xuất hiện ở cột này.</p>
        </div>
      </div>
    </div>
  );
}
