"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, FileCheck2, Layers, Shuffle } from "lucide-react";
import { CCAR_BASE, setId } from "@/data/ccar-p/meta";
import { useCcarStore } from "@/store/ccar-p-store";
import { useHydrated } from "@/hooks/useHydrated";
import { Breadcrumbs } from "@/components/ui/page";

interface Props {
  domains: { num: number; title: string; weight: number; count: number }[];
  tasks: { id: string; code: string; title: string; domain: number; count: number }[];
  v2: number;
  total: number;
  exams: { id: string; title: string; desc: string; count: number; minutes: number; passPct: number }[];
}

export function CcarPracticeHub({ domains, tasks, v2, total, exams }: Props) {
  const hydrated = useHydrated();
  const results = useCcarStore((s) => s.practice);
  const [parts, setParts] = useState<number[]>([]);
  const [n, setN] = useState(20);
  const toggle = (p: number) => setParts((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p].sort()));
  const res = (k: string) => (hydrated ? results?.[k] : undefined);
  const best = (k: string) => {
    const r = res(k);
    return r ? `Cao nhất ${r.best}/${r.total}` : undefined;
  };

  return (
    <div className="oci-hub">
      <Breadcrumbs
        className="mb-5"
        items={[{ label: "Khóa học", href: "/courses" }, { label: "CCAR-P", href: CCAR_BASE }, { label: "Luyện tập & thi thử" }]}
      />
      <section className="oci-hero">
        <div className="oci-eyebrow">
          <FileCheck2 size={16} aria-hidden /> Luyện tập & thi thử
        </div>
        <h1>Ngân hàng {total} câu hỏi + 3 đề thi thử 63 câu</h1>
        <p className="lead">
          Đề tiếng Việt, bấm <strong>English</strong> để xem đề gốc. Có câu một đáp án, nhiều đáp án (ghi rõ <strong>“Chọn N”</strong>), câu Yes/No
          từng dòng và câu chọn trong danh sách. Sau mỗi câu: <strong>✅ Kiến thức cần nhớ</strong>, <strong>💡 vì sao chọn</strong> và{" "}
          <strong>❌ các ô kia sai ở đâu</strong>. Đáp án và giải thích do Claude soạn, chưa đối chiếu đáp án chính thức.
        </p>
      </section>

      <div className="oci-section-title">
        <h2>Đề thi thử CCAR-P</h2>
        <span>63 câu · 120 phút · không hiện đáp án khi làm</span>
      </div>
      <div className="oci-exam-grid">
        {exams.map((e) => {
          const r = res(`exam:${e.id}`);
          return (
            <Link key={e.id} href={`${CCAR_BASE}/exam/${e.id}`} className="oci-module-card">
              <div className="top">
                <span className="mn">{e.title}</span>
                <span className="orig">
                  <Clock size={12} style={{ display: "inline", verticalAlign: -2 }} aria-hidden /> {e.minutes}′
                </span>
              </div>
              <p>{e.desc}</p>
              <div className="meta">
                <span>
                  {e.count} câu · đạt ≥ {e.passPct}%
                </span>
                <span>{r ? `Cao nhất ${Math.round((r.best / r.total) * 100)}%` : "Chưa làm"}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="oci-section-title">
        <h2>Bộ đề & trộn ngẫu nhiên</h2>
        <span>mỗi lần trộn là một bộ khác</span>
      </div>
      <div className="oci-exam-grid">
        <Link href={`${CCAR_BASE}/practice/${setId.v2}`} className="oci-module-card">
          <div className="top">
            <span className="mn">Bộ đề v2</span>
            <span className="orig">{v2} câu</span>
          </div>
          <p>Bộ “ccar-p-v2” trong ngân hàng gốc của chủ khóa (cả {v2} câu đều nằm trong ngân hàng {total} câu).</p>
          <div className="meta">
            <span>Luyện tập · có giải thích</span>
            <span>{best("v2") ?? "Chưa làm"}</span>
          </div>
        </Link>
        <div className="oci-mix ccar-span2">
          <div className="row">
            <span className="lbl">Domain:</span>
            <div className="oci-seg" role="group" aria-label="Chọn domain">
              <button aria-pressed={parts.length === 0} onClick={() => setParts([])}>
                Tất cả
              </button>
              {domains.map((d) => (
                <button key={d.num} aria-pressed={parts.includes(d.num)} onClick={() => toggle(d.num)} title={d.title}>
                  D{d.num}
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <span className="lbl">Số câu:</span>
            <div className="oci-seg" role="group" aria-label="Số câu">
              {[10, 20, 30, 50].map((x) => (
                <button key={x} aria-pressed={n === x} onClick={() => setN(x)}>
                  {x} câu
                </button>
              ))}
            </div>
          </div>
          <div>
            <Link href={`${CCAR_BASE}/practice/mix?d=${parts.join(",")}&n=${n}`} className="oci-btn primary">
              <Shuffle aria-hidden /> Trộn ngẫu nhiên
            </Link>
          </div>
        </div>
      </div>

      <div className="oci-section-title">
        <h2>Luyện theo domain</h2>
        <span>7 domain</span>
      </div>
      <div className="oci-lesson-practice-list">
        {domains.map((d) => (
          <Link key={d.num} href={`${CCAR_BASE}/practice/${setId.domain(d.num)}`} className="oci-lp-item">
            <span className="c">
              <Layers size={14} style={{ display: "inline", verticalAlign: -2 }} aria-hidden /> {d.num}
            </span>
            <span className="t">
              {d.title} <span style={{ color: "var(--o-text-3)", fontWeight: 500 }}>· {d.weight}%</span>
            </span>
            <span className="n">
              {d.count} câu
              {best(`domain:${d.num}`) && (
                <>
                  <br />
                  <b>{best(`domain:${d.num}`)}</b>
                </>
              )}
            </span>
          </Link>
        ))}
      </div>

      {domains.map((d) => (
        <section key={d.num}>
          <div className="oci-section-title" style={{ marginBottom: 12 }}>
            <h2>
              Domain {d.num} · {d.title}
            </h2>
            <span>theo task statement</span>
          </div>
          <div className="oci-lesson-practice-list">
            {tasks
              .filter((t) => t.domain === d.num && t.count > 0)
              .map((t) => (
                <Link key={t.id} href={`${CCAR_BASE}/practice/${setId.task(t.id)}`} className="oci-lp-item">
                  <span className="c">{t.code}</span>
                  <span className="t">{t.title}</span>
                  <span className="n">
                    {t.count} câu
                    {best(`task:${t.id}`) && (
                      <>
                        <br />
                        <b>{best(`task:${t.id}`)}</b>
                      </>
                    )}
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
