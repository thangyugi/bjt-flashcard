"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck, Circle, CircleCheck, FileCheck2, GraduationCap, Library, Play, RotateCcw } from "lucide-react";
import type { DomainMeta, LessonMeta } from "@/data/ccar-p/types";
import { CCAR_BASE, REFERENCE_PATH, STUDY_ORDER, setId } from "@/data/ccar-p/meta";
import { useCcarStore } from "@/store/ccar-p-store";
import { useHydrated } from "@/hooks/useHydrated";
import { Breadcrumbs } from "@/components/ui/page";

interface Props {
  domains: (DomainMeta & { intro: string; questions: number })[];
  lessons: LessonMeta[];
  stats: { questions: number; exams: number };
  /** HTML dựng sẵn từ tài liệu ôn (server) */
  html: { facts: string; layers: string; order: string; register: string; weights: string };
}

export function CcarHome({ domains, lessons, stats, html }: Props) {
  const hydrated = useHydrated();
  const done = useCcarStore((s) => s.done);
  const lastId = useCcarStore((s) => s.lastLessonId);
  const reset = useCcarStore((s) => s.reset);
  const isDone = (id: string) => hydrated && !!done[id];

  // Gợi ý: bài chưa xong theo thứ tự học 3 → 4 → 1 → 5 → 6 → 2 → 7
  const ordered = STUDY_ORDER.flatMap((n) => domains.find((d) => d.num === n)?.lessonIds ?? []);
  const doneCount = hydrated ? lessons.filter((l) => done[l.id]).length : 0;
  const started = hydrated && (doneCount > 0 || !!lastId);
  const targetId = (hydrated && lastId && !done[lastId] ? lastId : undefined) ?? ordered.find((id) => !isDone(id)) ?? ordered[0];
  const target = lessons.find((l) => l.id === targetId)!;
  const maxW = Math.max(...domains.map((d) => d.weight));

  return (
    <div className="oci-home">
      <Breadcrumbs className="mb-5" items={[{ label: "Khóa học", href: "/courses" }, { label: "Claude Certified Architect – Professional" }]} />
      <section className="oci-hero">
        <div className="oci-hero-main">
          <div className="oci-eyebrow">
            <GraduationCap size={16} aria-hidden /> Chứng chỉ Anthropic · CCAR-P
          </div>
          <h1>Claude Certified Architect – Professional</h1>
          <p className="lead">
            Ôn thi theo đúng blueprint của Exam Guide chính chủ: <strong>7 domain</strong>, <strong>38 task statement</strong>. Mỗi bài có ba
            lớp — <strong>💡 Hiểu nhanh</strong>, <strong>🎯 Cách chọn khi làm đề</strong>, <strong>📚 Cần thuộc</strong> — kèm bảng quyết định và
            bẫy hay gặp. Tên domain và task statement giữ nguyên tiếng Anh như trên đề.
          </p>
          <div className="oci-hero-actions">
            <Link href={`${CCAR_BASE}/${target.id}`} className="oci-btn primary">
              <Play aria-hidden /> {started ? "Học tiếp" : "Bắt đầu với Domain 3"}
            </Link>
            <Link href={`${CCAR_BASE}/practice`} className="oci-btn ghost">
              <FileCheck2 aria-hidden /> Luyện tập & thi thử
            </Link>
            <Link href={`${CCAR_BASE}/on-thi`} className="oci-btn ghost">
              <BookOpenCheck aria-hidden /> Lộ trình ôn & quy chế
            </Link>
            <Link href={REFERENCE_PATH} className="oci-btn ghost">
              <Library aria-hidden /> Kiến thức nền về Claude
            </Link>
          </div>
        </div>
        <div className="oci-hero-side">
          <div className="oci-stats">
            <div className="oci-stat">
              <div className="n">{domains.length}</div>
              <div className="l">domain</div>
            </div>
            <div className="oci-stat">
              <div className="n">{lessons.length}</div>
              <div className="l">task statement</div>
            </div>
            <div className="oci-stat">
              <div className="n">{stats.questions}</div>
              <div className="l">câu luyện tập</div>
            </div>
            <div className="oci-stat">
              <div className="n">{stats.exams}</div>
              <div className="l">đề thi thử 63 câu</div>
            </div>
          </div>
          {started && (
            <Link href={`${CCAR_BASE}/${target.id}`} className="oci-continue">
              <span className="ic">
                <Play aria-hidden />
              </span>
              <span className="tx">
                <span className="k" style={{ display: "block" }}>
                  Học tiếp · Domain {target.domain} · {doneCount}/{lessons.length} bài đã xong
                </span>
                <span className="v" style={{ display: "block" }}>
                  {target.code} {target.title}
                </span>
              </span>
              <ArrowRight className="arrow" aria-hidden />
            </Link>
          )}
        </div>
      </section>

      <div className="oci-section-title">
        <h2>Số liệu kỳ thi</h2>
        <span>theo Exam Guide v1.0</span>
      </div>
      <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html.facts }} />

      <div className="oci-section-title">
        <h2>Thứ tự học đáng tiền nhất</h2>
        <span>3 → 4 → 1 → 5 → 6 → 2 → 7</span>
      </div>
      <nav className="ccar-order" aria-label="Thứ tự học đề xuất">
        {STUDY_ORDER.map((n, i) => {
          const d = domains.find((x) => x.num === n)!;
          const first = d.lessonIds.find((id) => !isDone(id)) ?? d.lessonIds[0];
          return (
            <span key={n} style={{ display: "contents" }}>
              {i > 0 && (
                <span className="arr" aria-hidden>
                  →
                </span>
              )}
              <Link href={`${CCAR_BASE}/${first}`}>
                <span className="n">
                  {i + 1}. Domain {n}
                </span>
                <span className="t">{d.title}</span>
                <span className="w">{d.weight}% đề thi</span>
              </Link>
            </span>
          );
        })}
      </nav>
      <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html.order }} />

      <div className="oci-section-title">
        <h2>7 domain · 38 task statement</h2>
        <span>tỉ trọng chính thức</span>
      </div>
      <div className="ccar-domains">
        {domains.map((d) => {
          const dn = d.lessonIds.filter(isDone).length;
          return (
            <section key={d.num} className="ccar-domain" aria-labelledby={`d${d.num}`}>
              <div className="top">
                <span className="mn">Domain {d.num}</span>
                <span className="wt">{d.weight}%</span>
              </div>
              <div className="ccar-wbar" title={`Tỉ trọng ${d.weight}%`}>
                <i style={{ width: `${(d.weight / maxW) * 100}%` }} />
              </div>
              <h3 id={`d${d.num}`}>{d.title}</h3>
              {d.topics && <p className="tp">{d.topics}</p>}
              {d.intro && <p className="intro">{d.intro}</p>}
              <ul>
                {d.lessonIds.map((id) => {
                  const l = lessons.find((x) => x.id === id)!;
                  return (
                    <li key={id}>
                      <Link href={`${CCAR_BASE}/${id}`} className={isDone(id) ? "done" : undefined}>
                        <span className="c">{l.code}</span>
                        <span className="t">{l.title}</span>
                        {isDone(id) ? <CircleCheck className="st" aria-label="Đã học" /> : <Circle className="st" aria-hidden strokeWidth={1.6} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="foot">
                <span>
                  {dn}/{d.lessonIds.length} bài đã học
                </span>
                <Link href={`${CCAR_BASE}/practice/${setId.domain(d.num)}`}>Luyện {d.questions} câu của domain →</Link>
              </div>
            </section>
          );
        })}
      </div>

      <div className="oci-section-title">
        <h2>Cách đọc mỗi bài</h2>
        <span>ba lớp</span>
      </div>
      <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html.layers }} />

      <div className="ccar-guide">
        <details>
          <summary>
            Đăng ký thi — làm theo từng bước <span>Partner Academy → Pearson VUE</span>
          </summary>
          <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html.register }} />
        </details>
        <details>
          <summary>
            Tỉ trọng hãng so với ngân hàng đề <span>đừng lấy tỉ lệ đề luyện làm thước đo</span>
          </summary>
          <div className="oci-prose" dangerouslySetInnerHTML={{ __html: html.weights }} />
        </details>
      </div>

      <div className="oci-home-note">
        <b>Nguồn:</b> tài liệu ôn tiếng Việt của chủ khóa, bám Exam Guide CCAR-P chính chủ (Version 1.0). Đáp án và giải thích của ngân hàng câu
        hỏi do Claude soạn, chưa đối chiếu đáp án chính thức. Tiến độ học được lưu vào tài khoản.
        {hydrated && doneCount > 0 && (
          <>
            {" "}
            <button
              onClick={() => confirm("Xóa toàn bộ tiến độ học khóa CCAR-P?") && reset()}
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
