"use client";

import { useMemo, useState } from "react";
import { Lightbulb, Search } from "lucide-react";
import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { FlashCardGroup } from "@/components/flashcard/FlashCardGroup";
import { CardRowSkeleton } from "@/components/layout/Skeletons";
import type { SourceType, VocabularyItem } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

const FILTERS: { label: string; value: SourceType | "ALL" }[] = [
  { label: "Tất cả", value: "ALL" },
  { label: "BJT", value: "BJT" },
  { label: "JLPT N1", value: "JLPT" },
];

function matches(item: VocabularyItem, q: string) {
  return [item.kanji, item.hiragana, item.katakana, item.romaji, item.meaningVn, item.meaningEn]
    .filter(Boolean)
    .some((s) => s!.toLowerCase().includes(q));
}

/** Duyệt toàn bộ từ vựng theo chủ đề: lọc theo nguồn, tìm kiếm, lật thẻ ngay tại chỗ (trước đây ở trang chủ). */
export function VocabularyBrowser() {
  const [activeFilter, setActiveFilter] = useState<SourceType | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const { data: groups, isLoading } = useAllVocabularyGroups(activeFilter === "ALL" ? undefined : { sourceType: activeFilter });

  const q = query.trim().toLowerCase();
  const visibleGroups = useMemo(() => {
    if (!groups) return [];
    if (!q) return groups;
    return groups.map((g) => ({ ...g, items: g.items.filter((i) => matches(i, q)) })).filter((g) => g.items.length > 0);
  }, [groups, q]);

  return (
    <section aria-labelledby="vocab-browse" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          <h2 id="vocab-browse" className="hx-title text-[clamp(22px,2.2vw,30px)]">
            Chủ đề từ vựng
          </h2>
          <div role="group" aria-label="Lọc theo nguồn" className="flex gap-1 rounded-xl bg-surface-2 p-1">
            {FILTERS.map((f) => {
              const on = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActiveFilter(f.value)}
                  className={cn(
                    "h-9 rounded-[9px] px-4 text-[13px] transition-colors",
                    on ? "bg-surface font-bold text-ink shadow-[0_1px_2px_rgba(28,25,23,0.04),0_2px_8px_rgba(28,25,23,0.04)]" : "font-medium text-ink-2 hover:text-ink"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
        <label className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 text-ink-3 focus-within:border-brand md:w-[300px]">
          <Search className="h-[17px] w-[17px] shrink-0" aria-hidden />
          <span className="sr-only">Tìm từ vựng</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kanji, hiragana hoặc nghĩa…"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          />
        </label>
      </div>

      <div className="flex flex-col gap-10 lg:gap-12">
        {isLoading ? (
          <>
            <CardRowSkeleton />
            <CardRowSkeleton />
          </>
        ) : visibleGroups.length ? (
          visibleGroups.map((g) => <FlashCardGroup key={g.id} group={g} />)
        ) : (
          <div className="flex flex-col items-center gap-2 py-20 text-ink-3">
            <Search className="h-8 w-8" aria-hidden />
            <p className="text-sm font-medium">{q ? `Không tìm thấy từ nào khớp “${query}”` : "Không có nhóm từ vựng"}</p>
          </div>
        )}
      </div>

      <aside className="flex items-start gap-4 rounded-2xl bg-surface-2 px-6 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-surface text-brand">
          <Lightbulb className="h-[18px] w-[18px]" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-ink">Cách học hiệu quả</span>
          <p className="text-sm leading-relaxed text-ink-2">
            Chạm vào thẻ để lật xem nghĩa và câu ví dụ. Bấm <b className="text-ink">Mở rộng</b> để xem thẻ lớn với ngữ cảnh business và lưu ý cách dùng — ghi chú thực tế trong
            công ty Nhật. Bấm “Học ngay” để luyện tập tập trung từng nhóm.
          </p>
        </div>
      </aside>
    </section>
  );
}
