"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useHydrated } from "@/hooks/useHydrated";
import { OCI_BASE } from "./OciShell";

interface PagerLink {
  id: string;
  label: string;
}

interface Props {
  lessonId: string;
  prev?: PagerLink;
  next?: PagerLink;
}

/** Cuối bài: đánh dấu đã học, chuyển bài trước/sau, phím tắt ← →. Ghi nhớ bài đang học. */
export function LessonControls({ lessonId, prev, next }: Props) {
  const router = useRouter();
  const hydrated = useHydrated();
  const isDone = useOciAiStore((s) => !!s.done[lessonId]);
  const toggleDone = useOciAiStore((s) => s.toggleDone);
  const markDone = useOciAiStore((s) => s.markDone);
  const visit = useOciAiStore((s) => s.visit);

  useEffect(() => visit(lessonId), [lessonId, visit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === "ArrowLeft" && prev) router.push(prev.id ? `${OCI_BASE}/${prev.id}` : OCI_BASE);
      if (e.key === "ArrowRight" && next) router.push(`${OCI_BASE}/${next.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);

  const done = hydrated && isDone;

  return (
    <footer className="oci-lesson-foot">
      <div className="oci-done-row">
        <button className={`oci-btn ${done ? "good" : "primary"}`} onClick={() => toggleDone(lessonId)} aria-pressed={done}>
          {done ? <CircleCheck aria-hidden /> : <Check aria-hidden />}
          {done ? "Đã học xong" : "Đánh dấu đã học"}
        </button>
        {next && !done && (
          <Link
            href={`${OCI_BASE}/${next.id}`}
            className="oci-btn ghost"
            onClick={() => markDone(lessonId)}
          >
            Xong &amp; học tiếp <ArrowRight aria-hidden />
          </Link>
        )}
      </div>

      <nav className="oci-pager" aria-label="Chuyển bài">
        {prev && (
          <Link href={prev.id ? `${OCI_BASE}/${prev.id}` : OCI_BASE} className="prev">
            <span className="k">
              <ArrowLeft aria-hidden /> Trước
            </span>
            <span className="v">{prev.label}</span>
          </Link>
        )}
        {next && (
          <Link href={`${OCI_BASE}/${next.id}`} className="next">
            <span className="k">
              <ArrowRight aria-hidden /> Tiếp theo
            </span>
            <span className="v">{next.label}</span>
          </Link>
        )}
      </nav>
      <p className="oci-kbd-hint">
        Mẹo: dùng phím <span className="oci-kbd">←</span> <span className="oci-kbd">→</span> để chuyển bài
      </p>
    </footer>
  );
}
