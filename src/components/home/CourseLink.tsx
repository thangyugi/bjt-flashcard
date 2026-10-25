"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { courseProgress, type CourseLessons } from "@/lib/learning/progress";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useCcarStore } from "@/store/ccar-p-store";
import { useViewer } from "./viewer";
import { useContinueGroup } from "./vocab";
import { ArrowLong } from "./icons";

/** Bài học gần nhất của từng khóa → "Học tiếp" */
function useContinueHref(id: string): string | undefined {
  const n1 = useN1Store((s) => s.lastLessonId);
  const ipa = useEnStore((s) => s.lastIpaLesson);
  const oci = useOciAiStore((s) => s.lastLessonId);
  const ccar = useCcarStore((s) => s.lastLessonId);
  const group = useContinueGroup();
  if (id === "jlpt-n1" && n1) return `/jlpt-n1/grammar/${n1}`;
  if (id === "english" && ipa) return `/english/ipa/${ipa}`;
  if (id === "oci-ai" && oci) return `/oracle-oci-ai/${oci}`;
  if (id === "ccar-p" && ccar) return `/claude-ccar-p/${ccar}`;
  if (id === "bjt" && group) return `/bjt/${group.id}`;
  return undefined;
}

/**
 * Một cột khóa học: cả cột là liên kết. Phần tĩnh (hình, tên, số liệu) render phía server qua `art`/`body`;
 * cả cột dẫn tới trang danh sách bài của khóa; khi đã đăng nhập, cột thêm thanh tiến độ thật và liên kết nhỏ
 * "Học tiếp" trỏ tới bài học gần nhất (nếu có).
 */
export function CourseLink({
  id,
  href,
  color,
  lessons,
  bjtTotal,
  art,
  body,
}: {
  id: string;
  href: string;
  color: string;
  lessons: CourseLessons;
  bjtTotal: number;
  art: ReactNode;
  body: ReactNode;
}) {
  const viewer = useViewer();
  const { doneKeys, bjtKnown } = useLearningProgress();
  const cont = useContinueHref(id);
  const user = viewer === "user";
  const p = user ? courseProgress(lessons, doneKeys, { known: bjtKnown, total: bjtTotal }) : null;

  // Khách: đăng ký trước, xong quay về đúng trang khóa học (mọi nội dung học cần tài khoản)
  const main = viewer === "guest" ? `/register?next=${encodeURIComponent(href)}` : href;

  return (
    <div className="col course" style={{ "--c": color } as CSSProperties}>
      {/* Cả cột bấm được (lớp phủ) → trang danh sách bài của khóa; "Học tiếp" là liên kết nhỏ riêng, nằm trên lớp phủ */}
      <Link className="hit" href={main} aria-label={`${lessons.title}: ${user ? "xem danh sách bài" : viewer === "guest" ? "đăng ký để học" : "mở khóa học"}`} />
      <div className="art">{art}</div>
      <div className="cbody">
        {body}
        {p && (
          <div className="prog">
            <div className="row">
              <span className="num">
                {p.done.toLocaleString("vi-VN")}/{p.total.toLocaleString("vi-VN")} {id === "bjt" ? "thẻ đã thuộc" : "bài"}
              </span>
              <span className="num">{p.pct}%</span>
            </div>
            <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p.pct} aria-label={`Tiến độ ${lessons.title}`}>
              <span style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        )}
        <div className="go foot">
          <span>{user ? "Danh sách bài" : viewer === "guest" ? "Đăng ký để học" : "\u00a0"}</span>
          {user && cont ? (
            <Link className="resume" href={cont} aria-label={`Học tiếp ${lessons.title}: bài gần nhất`}>
              Học tiếp
              <ArrowLong />
            </Link>
          ) : (
            <ArrowLong />
          )}
        </div>
      </div>
    </div>
  );
}
