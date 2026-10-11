"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PracticeQuestion } from "@/data/oci-ai/types";
import { PracticeRunner } from "./PracticeRunner";
import { OCI_BASE } from "./OciShell";

type BankQ = PracticeQuestion & { part: number };

/** Trộn ngẫu nhiên câu hỏi từ các phần đã chọn (?parts=1,2&n=20). */
export function MixRunner() {
  const sp = useSearchParams();
  const parts = (sp.get("parts") ?? "").split(",").map(Number).filter(Boolean);
  const n = Math.max(5, Math.min(100, Number(sp.get("n")) || 20));
  const [qs, setQs] = useState<PracticeQuestion[] | null>(null);
  const [error, setError] = useState(false);
  const key = `${parts.join(",")}|${n}`;

  useEffect(() => {
    let alive = true;
    fetch(`${OCI_BASE}/practice/bank.json`)
      .then((r) => r.json() as Promise<BankQ[]>)
      .then((all) => {
        if (!alive) return;
        const pool = parts.length ? all.filter((x) => parts.includes(x.part)) : all;
        const arr = pool.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setQs(arr.slice(0, n));
      })
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (error) return <p className="oci-gloss-empty">Không tải được ngân hàng câu hỏi. Hãy thử tải lại trang.</p>;
  if (!qs)
    return (
      <div className="oci-loading" aria-busy="true">
        <div className="oci-skel" style={{ height: 36, width: "60%" }} />
        <div className="oci-skel" style={{ height: 220 }} />
      </div>
    );
  if (!qs.length) return <p className="oci-gloss-empty">Chưa có câu hỏi cho phần đã chọn.</p>;

  return (
    <PracticeRunner
      key={key}
      mode="practice"
      storeKey={`mix:${parts.join(",") || "all"}`}
      title="Trộn ngẫu nhiên câu hỏi"
      subtitle={`${qs.length} câu ngẫu nhiên từ ${parts.length ? `Phần ${parts.join(", ")}` : "tất cả các phần"}. Mỗi lần mở là một bộ đề khác.`}
      questions={qs}
      backHref={`${OCI_BASE}/practice`}
      backLabel="← Luyện tập & thi thử"
    />
  );
}
