"use client";

import Link from "next/link";
import { ArrowRight, BookA, GraduationCap, Layers, Play, RotateCcw } from "lucide-react";
import type { LessonMeta, ModuleMeta } from "@/data/oci-ai/types";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useHydrated } from "@/hooks/useHydrated";
import { OCI_BASE } from "./OciShell";

interface Props {
  modules: ModuleMeta[];
  lessons: LessonMeta[];
  stats: { lessons: number; minutes: number; questions: number; terms: number };
}

/** Phần 1–4 có trong tài liệu gốc; Phần 5–8 là nội dung mới bổ sung. */
const NEW_FROM = 5;

export function OciHome({ modules, lessons, stats }: Props) {
  const hydrated = useHydrated();
  const done = useOciAiStore((s) => s.done);
  const lastId = useOciAiStore((s) => s.lastLessonId);
  const reset = useOciAiStore((s) => s.reset);

  const byId = new Map(lessons.map((l) => [l.id, l]));
  const doneCount = hydrated ? lessons.filter((l) => done[l.id]).length : 0;

  // "Học tiếp": bài chưa xong đầu tiên kể từ bài mở gần nhất, nếu không thì bài chưa xong đầu tiên
  const lastIndex = hydrated && lastId ? lessons.findIndex((l) => l.id === lastId) : -1;
  const target =
    (lastIndex >= 0 && !done[lessons[lastIndex].id] ? lessons[lastIndex] : undefined) ??
    lessons.slice(Math.max(0, lastIndex)).find((l) => !(hydrated && done[l.id])) ??
    lessons.find((l) => !(hydrated && done[l.id]));
  const started = hydrated && (doneCount > 0 || !!lastId);
  const targetModule = target && modules.find((m) => m.id === target.moduleId);

  return (
    <div className="oci-home">
      <section className="oci-hero">
        <div className="oci-eyebrow">
          <GraduationCap size={16} aria-hidden /> Ghi chú học tập song ngữ · Anh–Việt
        </div>
        <h1>Oracle Cloud Infrastructure AI Foundations</h1>
        <p className="lead">
          Biên soạn lại từ khóa <strong>OCI AI Foundations</strong> (Oracle University): từ nền tảng AI, ML, Deep Learning,
          Generative AI cho tới <strong>OCI Enterprise AI</strong>, danh mục AI của OCI, các dịch vụ AI và{" "}
          <strong>Agentic AI cho Oracle AI Database</strong>. Lý thuyết ngắn gọn, ví dụ đời thường, sơ đồ liên hệ kiến thức
          và trắc nghiệm có giải thích từng đáp án. Thuật ngữ giữ nguyên tiếng Anh, luôn kèm chú thích tiếng Việt dạng{" "}
          <dfn>term</dfn> <span className="gloss">(giải nghĩa nhanh)</span>.
        </p>
        <div className="oci-hero-actions">
          {target && (
            <Link href={`${OCI_BASE}/${target.id}`} className="oci-btn primary">
              <Play aria-hidden /> {started ? "Học tiếp" : "Bắt đầu học"}
            </Link>
          )}
          <Link href={`${OCI_BASE}/glossary`} className="oci-btn ghost">
            <BookA aria-hidden /> Từ điển thuật ngữ
          </Link>
        </div>
        <div className="oci-stats">
          <div className="oci-stat">
            <div className="n">{modules.length}</div>
            <div className="l">phần học</div>
          </div>
          <div className="oci-stat">
            <div className="n">{stats.lessons}</div>
            <div className="l">bài học</div>
          </div>
          <div className="oci-stat">
            <div className="n">{stats.questions}</div>
            <div className="l">câu trắc nghiệm</div>
          </div>
          <div className="oci-stat">
            <div className="n">{stats.terms}</div>
            <div className="l">thuật ngữ</div>
          </div>
        </div>
      </section>

      {started && target && (
        <Link href={`${OCI_BASE}/${target.id}`} className="oci-continue">
          <span className="ic">
            <Play aria-hidden />
          </span>
          <span className="tx">
            <span className="k" style={{ display: "block" }}>
              Học tiếp · Phần {targetModule?.num} · {doneCount}/{lessons.length} bài đã xong
            </span>
            <span className="v" style={{ display: "block" }}>
              {target.kind === "summary" ? "Tổng kết & Trắc nghiệm" : `${target.code} ${target.navTitle}`}
            </span>
          </span>
          <ArrowRight className="arrow" aria-hidden />
        </Link>
      )}

      <div className="oci-section-title">
        <h2>Lộ trình {modules.length} phần</h2>
        <span>khoảng {Math.round(stats.minutes / 6) / 10} giờ đọc</span>
      </div>
      <div className="oci-module-grid">
        {modules.map((m) => {
          const ids = m.lessonIds;
          const d = hydrated ? ids.filter((id) => done[id]).length : 0;
          const firstOpen = ids.find((id) => !(hydrated && done[id])) ?? ids[0];
          const lessonCount = ids.filter((id) => byId.get(id)?.kind === "lesson").length;
          return (
            <Link key={m.id} href={`${OCI_BASE}/${firstOpen}`} className="oci-module-card">
              <div className="top">
                <span className="mn">Phần {m.num}</span>
                <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {m.num >= NEW_FROM && <span className="new">MỚI</span>}
                  <span className="orig">Module {m.origModule} gốc</span>
                </span>
              </div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div className={`oci-bar${d === ids.length ? " good" : ""}`}>
                <i style={{ width: `${(d / ids.length) * 100}%` }} />
              </div>
              <div className="meta">
                <span>
                  <Layers size={13} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} aria-hidden />
                  {lessonCount} bài + tổng kết · ~{m.minutes} phút
                </span>
                <span>
                  {d}/{ids.length}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="oci-tools">
        <Link href={`${OCI_BASE}/glossary`} className="oci-tool">
          <span className="ic">
            <BookA aria-hidden />
          </span>
          <span>
            <span className="t" style={{ display: "block" }}>
              Từ điển thuật ngữ Anh–Việt
            </span>
            <span className="d" style={{ display: "block" }}>
              {stats.terms} thuật ngữ, tìm nhanh và ôn bằng thẻ ghi nhớ.
            </span>
          </span>
        </Link>
        <Link href={`${OCI_BASE}/m1-summary`} className="oci-tool">
          <span className="ic">
            <GraduationCap aria-hidden />
          </span>
          <span>
            <span className="t" style={{ display: "block" }}>
              Trắc nghiệm cuối mỗi phần
            </span>
            <span className="d" style={{ display: "block" }}>
              {stats.questions} câu, giải thích cho mọi lựa chọn; đạt khi đúng ≥ 80%.
            </span>
          </span>
        </Link>
      </div>

      <div className="oci-home-note">
        <b>Phạm vi tài liệu:</b>{" "}Phần 1–4 tương ứng module 2–5 của khóa gốc (AI, ML, DL, Generative AI &amp; LLM). Phần 5–8
        bổ sung module 6–9: OCI Enterprise AI, OCI AI Portfolio, OCI AI Services và Agentic AI for Database. Tiến độ học được
        lưu trên trình duyệt này.
        {hydrated && doneCount > 0 && (
          <>
            {" "}
            <button
              onClick={() => confirm("Xóa toàn bộ tiến độ học khóa OCI AI?") && reset()}
              style={{ background: "none", border: 0, padding: 0, color: "var(--o-accent)", fontWeight: 600, textDecoration: "underline" }}
            >
              <RotateCcw size={13} style={{ display: "inline", verticalAlign: -2, marginRight: 3 }} aria-hidden />
              Đặt lại tiến độ
            </button>
          </>
        )}
      </div>
    </div>
  );
}
