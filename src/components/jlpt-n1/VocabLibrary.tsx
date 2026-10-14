"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Jp } from "./Jp";

export interface LibraryEntry {
  source: string;
  sourceName: string;
  lessonId: string;
  lessonNum: number;
  anchor: string;
  no: number;
  /** Mặt chữ có furigana */
  head: string;
  plain: string;
  r: string;
  m: string;
  hv?: string;
  pos: string;
}

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

/** Tra cứu toàn bộ thư viện từ vựng — theo kanji, cách đọc, nghĩa hoặc âm Hán Việt. */
export function VocabLibrary({ entries, sources }: { entries: LibraryEntry[]; sources: { id: string; name: string }[] }) {
  const [q, setQ] = useState("");
  const [src, setSrc] = useState("all");
  const list = useMemo(() => {
    const k = norm(q.trim());
    return entries.filter(
      (e) =>
        (src === "all" || e.source === src) &&
        (!k || [e.plain, e.r, e.m, e.hv ?? ""].some((f) => norm(f).includes(k)))
    );
  }, [entries, q, src]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex h-11 flex-1 items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 text-ink-3 focus-within:border-brand">
          <Search className="h-[17px] w-[17px] shrink-0" aria-hidden />
          <span className="sr-only">Tra từ</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Kanji, hiragana, nghĩa hoặc Hán Việt…"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          />
        </label>
        {sources.length > 1 && (
          <div role="group" aria-label="Nguồn" className="flex gap-1 rounded-xl bg-surface-2 p-1">
            {[{ id: "all", name: "Tất cả" }, ...sources].map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={src === s.id}
                onClick={() => setSrc(s.id)}
                className={cn(
                  "h-9 rounded-[9px] px-3 text-[13px]",
                  src === s.id ? "bg-surface font-bold text-ink" : "font-medium text-ink-2"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-[13px] text-ink-3">{list.length} từ</p>
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {list.slice(0, 300).map((e) => (
          <li key={e.anchor}>
            <Link
              href={`/jlpt-n1/vocab/${e.lessonId}#${e.anchor}`}
              className="flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-surface-2"
            >
              <span className="w-9 shrink-0 text-[12px] font-bold text-ink-3">{e.no}</span>
              <span className="min-w-[7rem] text-[18px] leading-[1.9] font-bold text-ink">
                <Jp t={e.head} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[14px] text-ink">{e.m}</span>
                <span className="truncate text-[12px] text-ink-3">
                  {e.hv ? `${e.hv} · ` : ""}
                  {e.pos} · Bài {e.lessonNum}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {list.length > 300 && <p className="text-center text-[13px] text-ink-3">Hiển thị 300 kết quả đầu — gõ thêm để lọc.</p>}
    </div>
  );
}
