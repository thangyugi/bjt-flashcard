"use client";

import { useAllVocabularyGroups, useVocabularyStats } from "@/hooks/useVocabulary";
import { useProgressStats } from "@/hooks/useProgressStats";
import { FlashCardGroup } from "@/components/flashcard/FlashCardGroup";
import { Furigana } from "@/components/ui/furigana";
import { useFlashcardStore } from "@/store/flashcard-store";
import { useMemo, useState } from "react";
import type { SourceType, VocabularyGroup, VocabularyItem } from "@/types/vocabulary";
import { ArrowRight, Lightbulb, Play, Search, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FILTERS: { label: string; value: SourceType | "ALL" }[] = [
  { label: "Tất cả", value: "ALL" },
  { label: "BJT", value: "BJT" },
  { label: "JLPT N1", value: "JLPT" },
];

/** Chọn "Từ của hôm nay" cố định theo ngày */
function pickWordOfDay(groups: VocabularyGroup[] | undefined): VocabularyItem | undefined {
  const pool = groups?.flatMap((g) => g.items).filter((i) => i.exampleSentence) ?? [];
  if (!pool.length) return undefined;
  const day = Math.floor(Date.now() / 86_400_000);
  return pool[day % pool.length];
}

function matches(item: VocabularyItem, q: string) {
  return [item.kanji, item.hiragana, item.katakana, item.romaji, item.meaningVn, item.meaningEn]
    .filter(Boolean)
    .some((s) => s!.toLowerCase().includes(q));
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<SourceType | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const { progress } = useFlashcardStore();
  const { mastered, learning, total, pct } = useProgressStats();

  const { data: groups, isLoading } = useAllVocabularyGroups(
    activeFilter === "ALL" ? undefined : { sourceType: activeFilter }
  );
  const { data: allGroups } = useAllVocabularyGroups();
  const { data: stats } = useVocabularyStats();

  const wordOfDay = useMemo(() => pickWordOfDay(allGroups), [allGroups]);

  // Nhóm học gần nhất → "Tiếp tục học"
  const continueGroup = useMemo(() => {
    if (!allGroups?.length) return undefined;
    let best: { group: VocabularyGroup; at: string } | undefined;
    for (const g of allGroups) {
      for (const it of g.items) {
        const at = progress[it.id]?.lastReviewedAt;
        if (at && (!best || at > best.at)) best = { group: g, at };
      }
    }
    const group = best?.group ?? allGroups[0];
    const done = group.items.filter((i) => progress[i.id]?.status === "mastered").length;
    return { group, done };
  }, [allGroups, progress]);

  const q = query.trim().toLowerCase();
  const visibleGroups = useMemo(() => {
    if (!groups) return [];
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => matches(i, q)) }))
      .filter((g) => g.items.length > 0);
  }, [groups, q]);

  const notStarted = Math.max(0, total - mastered - learning);
  const learningPct = total > 0 ? (learning / total) * 100 : 0;

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10 lg:gap-10">
      {/* ── Hero ── */}
      <section className="relative flex items-center justify-between gap-12 overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-14">
        <div className="relative flex max-w-[560px] flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="text-[13px] font-semibold tracking-[0.08em] text-brand uppercase">
              BJT Business Japanese Test
            </span>
          </div>
          <h1 className="text-[32px] leading-[1.15] font-extrabold tracking-[-0.025em] text-ink sm:text-[40px] lg:text-5xl">
            Học từ vựng tiếng Nhật <span className="text-brand">thương mại</span> mỗi ngày
          </h1>
          <p className="max-w-[500px] text-base leading-[1.65] text-ink-2 sm:text-[17px]">
            Từ vựng nhóm theo chủ đề, có câu ví dụ kèm furigana và ghi chú ngữ cảnh công sở Nhật. Chạm vào thẻ để
            lật xem nghĩa.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1.5">
            <Link
              href={continueGroup ? `/study/${continueGroup.group.id}` : "/study"}
              className="flex h-[50px] items-center gap-2.5 rounded-xl bg-brand px-6 text-[15px] font-bold text-white transition-colors hover:bg-brand-hover"
            >
              Bắt đầu học
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
            </Link>
            <Link
              href="/quiz?groupId=all"
              className="flex h-[50px] items-center gap-2.5 rounded-xl border border-line-strong bg-surface px-5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              <SquareCheckBig className="h-[18px] w-[18px]" aria-hidden />
              Thi trắc nghiệm tổng hợp
            </Link>
          </div>
          {stats && (
            <div className="mt-2 flex flex-wrap items-center gap-7 border-t border-line pt-3.5">
              {[
                { n: stats.totalItems, label: "từ vựng" },
                { n: stats.totalGroups, label: "nhóm chủ đề" },
              ].map(({ n, label }) => (
                <div key={label} className="flex flex-col gap-0.5 pt-1">
                  <span className="text-2xl font-extrabold text-ink">{n}</span>
                  <span className="text-[13px] text-ink-3">{label}</span>
                </div>
              ))}
              <div className="flex flex-col gap-0.5 pt-1">
                <span className="font-jp text-2xl font-bold text-ink">ふりがな</span>
                <span className="text-[13px] text-ink-3">trên câu ví dụ</span>
              </div>
            </div>
          )}
        </div>

        {/* Từ của hôm nay trên nền mặt trời đỏ */}
        {wordOfDay && (
          <div className="relative hidden h-[380px] w-[460px] shrink-0 items-center justify-center lg:flex">
            <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#c8283a]" aria-hidden />
            <div
              className="absolute bottom-1.5 left-1.5 font-mincho text-[15px] tracking-[0.4em] text-ink-3 [writing-mode:vertical-rl]"
              aria-hidden
            >
              一日一語
            </div>
            <article className="relative mt-10 mr-10 flex w-80 flex-col gap-4 rounded-[20px] border border-line bg-surface px-[26px] pt-[26px] pb-6 shadow-[0_2px_4px_rgba(28,25,23,0.04),0_16px_40px_rgba(28,25,23,0.10)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-3">Từ của hôm nay</span>
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand-soft-ink">
                  {wordOfDay.bjtRelevance ? "BJT" : wordOfDay.jlptLevel ?? "N1"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 pt-2 pb-1">
                <span className="font-jp text-[15px] tracking-[0.1em] text-ink-2">
                  {wordOfDay.hiragana || wordOfDay.katakana}
                </span>
                <span
                  className={cn(
                    "text-center font-mincho leading-none font-semibold text-ink",
                    wordOfDay.kanji.length <= 4 ? "text-[52px]" : wordOfDay.kanji.length <= 6 ? "text-[38px]" : "text-[30px]"
                  )}
                >
                  {wordOfDay.kanji}
                </span>
                <span className="pt-2 text-center text-base font-semibold text-ink">{wordOfDay.meaningVn}</span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-xl bg-surface-2 px-4 py-3.5">
                <p className="font-jp text-sm leading-[1.9] text-ink">
                  <Furigana markup={wordOfDay.exampleSentenceFurigana} fallback={wordOfDay.exampleSentence!} />
                </p>
                {wordOfDay.exampleTranslation && (
                  <p className="text-[12.5px] leading-normal text-ink-2">{wordOfDay.exampleTranslation}</p>
                )}
              </div>
            </article>
          </div>
        )}
      </section>

      {/* ── Tiến độ ── */}
      <section aria-label="Tiến độ" className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <div className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-surface p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-ink-2">Tiến độ tổng</span>
            <span className="text-[30px] font-extrabold text-brand">{pct}%</span>
          </div>
          <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-track">
            <div className="h-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} />
            <div className="h-full bg-brand-muted transition-all duration-700" style={{ width: `${learningPct}%` }} />
          </div>
          <span className="text-[13px] text-ink-3">
            Đã thuộc {mastered} trên {total} từ vựng
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-[18px] border border-line bg-surface p-6">
          {[
            { label: "Đã thuộc", n: mastered, dot: "bg-brand" },
            { label: "Đang học", n: learning, dot: "bg-brand-muted" },
            { label: "Chưa học", n: notStarted, dot: "border border-line-strong" },
          ].map(({ label, n, dot }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", dot)} />
                <span className="text-[13px] whitespace-nowrap text-ink-2">{label}</span>
              </div>
              <span className="text-[28px] font-extrabold text-ink">{n}</span>
            </div>
          ))}
        </div>

        {continueGroup && (
          <div className="flex items-center justify-between gap-4 rounded-[18px] bg-ink p-6">
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[13px] text-[#b5ada5]">Tiếp tục học</span>
              <span className="truncate text-lg font-bold text-paper">{continueGroup.group.name}</span>
              <span className="text-[13px] text-[#b5ada5]">
                {continueGroup.done} / {continueGroup.group.items.length} từ
                {continueGroup.group.nameJa && <span className="font-jp"> · {continueGroup.group.nameJa}</span>}
              </span>
            </div>
            <Link
              href={`/study/${continueGroup.group.id}`}
              aria-label={`Tiếp tục học nhóm ${continueGroup.group.name}`}
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover"
            >
              <Play className="h-5 w-5 fill-current" aria-hidden />
            </Link>
          </div>
        )}
      </section>

      {/* ── Bộ lọc & tìm kiếm ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          <h2 className="text-[22px] font-extrabold tracking-[-0.015em] text-ink">Chủ đề từ vựng</h2>
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
                    on
                      ? "bg-surface font-bold text-ink shadow-[0_1px_2px_rgba(28,25,23,0.04),0_2px_8px_rgba(28,25,23,0.04)]"
                      : "font-medium text-ink-2 hover:text-ink"
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

      {/* ── Nhóm từ vựng ── */}
      <div className="flex flex-col gap-10 lg:gap-12">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton h-6 w-48" />
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="skeleton h-[316px] w-56 shrink-0 rounded-[18px] lg:h-[360px] lg:w-[264px]" />
                ))}
              </div>
            </div>
          ))
        ) : visibleGroups.length ? (
          visibleGroups.map((g) => <FlashCardGroup key={g.id} group={g} />)
        ) : (
          <div className="flex flex-col items-center gap-2 py-20 text-ink-3">
            <Search className="h-8 w-8" aria-hidden />
            <p className="text-sm font-medium">{q ? `Không tìm thấy từ nào khớp “${query}”` : "Không có nhóm từ vựng"}</p>
          </div>
        )}
      </div>

      {/* ── Mẹo học ── */}
      <aside className="flex items-start gap-4 rounded-2xl bg-surface-2 px-6 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-surface text-brand">
          <Lightbulb className="h-[18px] w-[18px]" aria-hidden />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-ink">Cách học hiệu quả</span>
          <p className="text-sm leading-relaxed text-ink-2">
            Chạm vào thẻ để lật xem nghĩa và câu ví dụ. Bấm <b className="text-ink">Mở rộng</b> để xem thẻ lớn với
            ngữ cảnh business và lưu ý cách dùng — ghi chú thực tế trong công ty Nhật. Bấm “Học ngay” để luyện tập tập
            trung từng nhóm.
          </p>
        </div>
      </aside>

      <footer className="flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <span>BJT Flashcard · Ôn thi Business Japanese Test</span>
        <span className="font-mincho tracking-[0.2em]">継続は力なり</span>
      </footer>
    </div>
  );
}
