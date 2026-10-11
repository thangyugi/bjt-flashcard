"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, FileCheck2, Shuffle } from "lucide-react";
import type { ModuleMeta } from "@/data/oci-ai/types";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useHydrated } from "@/hooks/useHydrated";
import { OCI_BASE } from "./OciShell";

interface Props {
  modules: ModuleMeta[];
  lessons: { id: string; code: string; navTitle: string; moduleNum: number; count: number }[];
  exams: { id: string; title: string; desc: string; count: number; minutes: number; passPct: number }[];
  total: number;
}

export function PracticeHub({ modules, lessons, exams, total }: Props) {
  const hydrated = useHydrated();
  const results = useOciAiStore((s) => s.practice) ?? {};
  const [parts, setParts] = useState<number[]>([]);
  const [n, setN] = useState(20);
  const toggle = (p: number) => setParts((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p].sort()));
  const res = (k: string) => (hydrated ? results[k] : undefined);

  return (
    <div className="oci-hub">
      <section className="oci-hero">
        <div className="oci-eyebrow">
          <FileCheck2 size={16} aria-hidden /> Luyện tập & thi thử
        </div>
        <h1>Ngân hàng {total} câu hỏi + 3 đề thi mô phỏng</h1>
        <p className="lead">
          Câu hỏi tiếng Anh như bài thi thật, kèm bản dịch tiếng Việt. Mỗi đáp án đều có giải thích <strong>nên chọn / không nên chọn
          vì sao</strong>, cùng <strong>mẹo nhớ lâu</strong> và <strong>so sánh khái niệm dễ nhầm</strong>.
        </p>
      </section>

      <div className="oci-section-title">
        <h2>Đề thi mô phỏng 1Z0-1122-26</h2>
        <span>Không hiện đáp án khi làm · có đồng hồ</span>
      </div>
      <div className="oci-exam-grid">
        {exams.map((e) => {
          const r = res(`exam:${e.id}`);
          return (
            <Link key={e.id} href={`${OCI_BASE}/exam/${e.id}`} className="oci-module-card">
              <div className="top">
                <span className="mn">{e.title.split("—")[0].trim()}</span>
                <span className="orig">
                  <Clock size={12} style={{ display: "inline", verticalAlign: -2 }} aria-hidden /> {e.minutes}′
                </span>
              </div>
              <h3>{e.title.split("—")[1]?.trim() ?? e.title}</h3>
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
        <h2>Trộn ngẫu nhiên tổng hợp</h2>
        <span>Mỗi lần là một bộ khác</span>
      </div>
      <div className="oci-mix">
        <div className="row">
          <span className="lbl">Chọn phần:</span>
          <div className="oci-seg" role="group" aria-label="Chọn phần">
            <button aria-pressed={parts.length === 0} onClick={() => setParts([])}>
              Tất cả
            </button>
            {modules.map((m) => (
              <button key={m.num} aria-pressed={parts.includes(m.num)} onClick={() => toggle(m.num)} title={m.title}>
                Phần {m.num}
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
          <Link href={`${OCI_BASE}/practice/mix?parts=${parts.join(",")}&n=${n}`} className="oci-btn primary">
            <Shuffle aria-hidden /> Bắt đầu trộn ngẫu nhiên
          </Link>
        </div>
      </div>

      {modules.map((m) => {
        const list = lessons.filter((l) => l.moduleNum === m.num);
        if (!list.length) return null;
        return (
          <section key={m.id}>
            <div className="oci-section-title" style={{ marginBottom: 12 }}>
              <h2>
                Phần {m.num} · {m.title}
              </h2>
              <span>{list.reduce((s, l) => s + l.count, 0)} câu</span>
            </div>
            <div className="oci-lesson-practice-list">
              {list.map((l) => {
                const r = res(`lesson:${l.id}`);
                return (
                  <Link key={l.id} href={`${OCI_BASE}/practice/${l.id}`} className="oci-lp-item">
                    <span className="c">{l.code}</span>
                    <span className="t">{l.navTitle}</span>
                    <span className="n">
                      {l.count} câu
                      {r && (
                        <>
                          <br />
                          <b>
                            Cao nhất {r.best}/{r.total}
                          </b>
                        </>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
