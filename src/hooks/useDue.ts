"use client";

import { useEffect, useState } from "react";
import { useSrsStore, type StoredCard } from "@/store/srs-store";
import { useHydrated } from "./useHydrated";

/** Đếm thẻ đến hạn / tổng thẻ (lọc theo điều kiện, ví dụ theo khóa). Tự làm mới mỗi phút. */
export function useDue(filter?: (c: StoredCard) => boolean) {
  const cards = useSrsStore((s) => s.cards);
  const hydrated = useHydrated();
  const [now, setNow] = useState(() => new Date().toISOString());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date().toISOString()), 60_000);
    return () => window.clearInterval(t);
  }, []);
  if (!hydrated) return { due: 0, total: 0 };
  const list = Object.values(cards).filter((c) => !c.suspended && (!filter || filter(c)));
  return { due: list.filter((c) => c.due <= now).length, total: list.length };
}
