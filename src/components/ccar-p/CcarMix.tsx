"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CCAR_BASE } from "@/data/ccar-p/meta";
import { CcarRunner, useBank } from "./CcarRunner";

/** Bộ trộn ngẫu nhiên: ?n=20&d=1,3 — mỗi lần mở là một bộ khác. */
export function CcarMix() {
  const params = useSearchParams();
  const n = Math.min(100, Math.max(5, Number(params.get("n")) || 20));
  const domains = (params.get("d") ?? "").split(",").map(Number).filter((x) => x >= 1 && x <= 7);
  const { bank } = useBank();
  const [seed] = useState(() => Math.random());
  const ids = bank
    ? bank
        .filter((q) => !domains.length || domains.includes(q.domain))
        .map((q) => ({ id: q.id, r: Math.abs(Math.sin(q.id * 9301 + seed * 49297)) % 1 }))
        .sort((a, b) => a.r - b.r)
        .slice(0, n)
        .map((x) => x.id)
    : [];
  return (
    <CcarRunner
      key={ids.length}
      mode="practice"
      storeKey="mix"
      title={`Trộn ngẫu nhiên ${n} câu`}
      subtitle={domains.length ? `Từ Domain ${domains.join(", ")}.` : "Từ cả 7 domain."}
      ids={ids}
      backHref={`${CCAR_BASE}/practice`}
      backLabel="Luyện tập & thi thử"
    />
  );
}
