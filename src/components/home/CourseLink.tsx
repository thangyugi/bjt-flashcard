"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { courseProgress, type CourseLessons } from "@/lib/learning/progress";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useViewer } from "./viewer";
import { useContinueGroup } from "./vocab";
import { ArrowLong } from "./icons";

/** Bài học gần nhất của từng khóa → "Học tiếp" */
function useContinueHref(id: string): string | undefined {
  const n1 = useN1Store((s) => s.lastLessonId);
  const ipa = useEnStore((s) => s.lastIpaLesson);
  const oci = useOciAiStore((s) => s.lastLessonId);
  const group = useContinueGroup();
  if (id === "jlpt-n1" && n1) return `/jlpt-n1/grammar/${n1}`;
  if (id === "english" && ipa) return `/english/ipa/${ipa}`;
  if (id === "oci-ai" && oci) return `/oracle-oci-ai/${oci}`;
  if (id === "bjt" && group) return `/study/${group.id}`;
  return undefined;
}

/**
 * Một cột khóa học: cả cột là liên kết. Phần tĩnh (hình, tên, số liệu) render phía server qua `art`/`body`;
 * khi đã đăng nhập, cột thêm thanh tiến độ thật và "Học tiếp" trỏ tới bài học gần nhất.
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

  return (
    <Link className="col course" href={(user && cont) || href} style={{ "--c": color } as CSSProperties}>
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
          <span>{user ? "Học tiếp" : viewer === "guest" ? "Xem khóa học" : " "}</span>
          <ArrowLong />
        </div>
      </div>
    </Link>
  );
}
