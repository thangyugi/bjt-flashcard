"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpenCheck, Check, CircleDashed, Layers, Play, RotateCcw, Sprout } from "lucide-react";
import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { useFlashcardStore } from "@/store/flashcard-store";
import { GroupIcon } from "@/components/ui/group-icon";
import { HubSkeleton } from "@/components/layout/Skeletons";
import { ELIGIBLE, QUESTION_TYPES, eligibleWords, type QuestionType } from "@/lib/quiz";
import { resolveScope, type ScopeKey } from "@/lib/quiz-scope";
import type { SourceType } from "@/types/vocabulary";
import { cn } from "@/lib/utils";
import { PageHeader, btn } from "@/components/ui/page";
import Link from "next/link";

const COUNTS = [10, 20, 30, 50];
const LEVEL_STYLE = {
  Dễ: "bg-ok-soft text-ok-ink",
  Vừa: "bg-surface-2 text-ink-2",
  Khó: "bg-brand-soft text-brand-soft-ink",
} as const;

/** Màn tổng hợp trắc nghiệm: chọn phạm vi (toàn bộ / trạng thái / chủ đề), số câu và dạng câu hỏi. */
export function QuizHub() {
  const router = useRouter();
  const params = useSearchParams();
  const { data: groups, isLoading } = useAllVocabularyGroups();
  const { progress, reviewIds } = useFlashcardStore();

  const initialScope: ScopeKey = params.get("groupId") && params.get("groupId") !== "all"
    ? `group:${params.get("groupId")}`
    : ((params.get("scope") as ScopeKey | null) ?? "all");
  const [scope, setScope] = useState<ScopeKey>(initialScope);
  const [count, setCount] = useState<number | "all">(20);
  const [types, setTypes] = useState<QuestionType[]>(["meaning", "reverse", "reading", "cloze", "passage"]);
  const [source, setSource] = useState<SourceType | "ALL">("ALL");

  const stats = useMemo(() => {
    if (!groups) return null;
    const scopes: ScopeKey[] = ["all", "review", "status:new", "status:learning", "status:mastered"];
    return Object.fromEntries(scopes.map((s) => [s, resolveScope(s, groups, progress, reviewIds).items.length])) as Record<string, number>;
  }, [groups, progress, reviewIds]);

  if (isLoading || !groups || !stats) return <HubSkeleton />;

  const selected = resolveScope(scope, groups, progress, reviewIds);
  // Số từ trong phạm vi kiểm tra được bằng các dạng đã chọn
  const available = eligibleWords(selected.items, types).length;
  const excluded = selected.items.length - available;
  const effectiveCount = count === "all" ? available : Math.min(count, available);
  const perType = Object.fromEntries(
    QUESTION_TYPES.map((t) => [t.type, selected.items.filter(ELIGIBLE[t.type]).length])
  ) as Record<QuestionType, number>;
  const toggleType = (t: QuestionType) =>
    setTypes((prev) => (prev.includes(t) ? (prev.length > 1 ? prev.filter((x) => x !== t) : prev) : [...prev, t]));
  const start = () => {
    const q = new URLSearchParams({ scope, count: String(count), types: types.join(",") });
    router.push(`/quiz/play?${q.toString()}`);
  };

  const quick: { key: ScopeKey; title: string; sub: string; icon: React.ReactNode }[] = [
    { key: "all", title: "Tổng hợp toàn bộ", sub: "Ngẫu nhiên trong tất cả từ vựng", icon: <Layers className="h-5 w-5" /> },
    { key: "review", title: "Cần ôn lại", sub: "Các từ bạn làm sai gần đây", icon: <RotateCcw className="h-5 w-5" /> },
    { key: "status:new", title: "Chưa học", sub: "Từ chưa đánh dấu trạng thái", icon: <CircleDashed className="h-5 w-5" /> },
    { key: "status:learning", title: "Đang học", sub: "Từ bạn đánh dấu chưa nhớ", icon: <Sprout className="h-5 w-5" /> },
    { key: "status:mastered", title: "Đã thuộc", sub: "Ôn lại để nhớ lâu hơn", icon: <BookOpenCheck className="h-5 w-5" /> },
  ];
  const shownGroups = groups.filter((g) => source === "ALL" || g.sourceType === source);

  const setup = (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold tracking-[0.1em] text-ink-3 uppercase">Phạm vi</span>
        <span className="text-[17px] font-bold text-ink">{selected.label}</span>
        <span className="text-[13px] text-ink-3">{selected.items.length} từ trong phạm vi</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold tracking-[0.1em] text-ink-3 uppercase">Số từ kiểm tra</span>
        <div role="radiogroup" aria-label="Số từ kiểm tra" className="grid grid-cols-5 gap-1.5">
          {[...COUNTS, "all" as const].map((c) => {
            const on = count === c;
            const disabled = c !== "all" && c > available && available > 0;
            return (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={disabled}
                onClick={() => setCount(c)}
                className={cn(
                  "h-11 rounded-[10px] border text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-35",
                  on ? "border-brand bg-brand text-white" : "border-line bg-surface text-ink-2 hover:border-line-strong"
                )}
              >
                {c === "all" ? "Tất cả" : c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold tracking-[0.1em] text-ink-3 uppercase">Dạng câu hỏi</span>
        <div className="flex flex-col gap-2">
          {QUESTION_TYPES.map((t, i) => {
            const on = types.includes(t.type);
            return (
              <button
                key={t.type}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggleType(t.type)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
                  on ? "border-brand/60 bg-brand-soft/50" : "border-line bg-surface hover:border-line-strong"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                    on ? "border-brand bg-brand text-white" : "border-line-strong bg-surface"
                  )}
                >
                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-bold text-ink">
                    <span className="text-ink-3">Phần {i + 1} · </span>
                    {t.label}
                  </span>
                  <span className="text-[12.5px] leading-snug text-ink-3">{t.desc}</span>
                  <span className="text-[11.5px] font-semibold text-ink-2">
                    Dùng được cho {perType[t.type]}/{selected.items.length} từ
                  </span>
                </span>
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold", LEVEL_STYLE[t.level])}>{t.level}</span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-1.5 rounded-xl bg-surface-2 px-3.5 py-3 text-xs leading-relaxed text-ink-2">
          <p>
            Sẽ kiểm tra <b className="text-ink">{effectiveCount}</b> từ, chỉ bằng các dạng đã chọn. Từ được chia đều cho các dạng; mỗi từ
            xuất hiện đúng một lần, ưu tiên từ bạn chưa được hỏi gần đây. Mỗi đoạn văn gộp 1–3 từ thành một câu hỏi.
          </p>
          {excluded > 0 && (
            <p className="font-semibold text-brand-soft-ink">
              {excluded} từ không áp dụng được cho các dạng đã chọn (ví dụ từ katakana không có dạng cách đọc, hoặc câu ví dụ không chứa
              từ) nên sẽ không xuất hiện. Chọn thêm dạng khác để kiểm tra đủ {selected.items.length} từ.
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={start}
        disabled={available === 0}
        className="hidden h-[52px] items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-bold text-white transition-colors hover:bg-brand-hover disabled:opacity-40 lg:flex"
      >
        <Play className="h-4 w-4 fill-current" aria-hidden />
        Bắt đầu · {effectiveCount} từ
      </button>
    </div>
  );

  const scopeCard = (on: boolean) =>
    cn(
      "relative flex text-left transition-colors",
      on ? "bg-brand-soft/50 shadow-[inset_0_0_0_2px_var(--brand)]" : "hover:bg-surface"
    );

  return (
    <div className="page-x flex flex-col gap-10 pt-6 pb-36 sm:gap-12 sm:pt-10 lg:pb-16">
    <PageHeader
      crumbs={[{ label: "Trắc nghiệm", href: "/quiz" }, { label: "Từ vựng BJT" }]}
      eyebrow="Trắc nghiệm · Từ vựng BJT"
      accent="#a14f06"
      title="Trắc nghiệm từ vựng BJT"
      lead="Chọn phạm vi ôn tập, số câu và dạng câu hỏi rồi bắt đầu. Muốn làm trắc nghiệm khóa khác? Quay lại danh sách trắc nghiệm."
      actions={
        <>
          <Link href="/quiz" className={cn(btn.ghost, btn.sm)}>
            Tất cả trắc nghiệm
          </Link>
          <Link href="/bjt" className={cn(btn.ghost, btn.sm)}>
            Học flashcard BJT
          </Link>
        </>
      }
    />
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-8">

        <section className="flex flex-col gap-3">
          <h2 className="hx-title border-b border-line-strong pb-3 text-[clamp(22px,2.2vw,30px)]">Ôn tập nhanh</h2>
          <div className="cells grid-cols-2 md:grid-cols-3">
            {quick.map((q) => {
              const n = stats[q.key] ?? 0;
              const on = scope === q.key;
              return (
                <button
                  key={q.key}
                  type="button"
                  aria-pressed={on}
                  disabled={n === 0}
                  onClick={() => setScope(q.key)}
                  className={cn(scopeCard(on), "flex-col gap-3 p-4 disabled:cursor-not-allowed disabled:opacity-50 sm:p-5", q.key === "all" && "col-span-2 md:col-span-1")}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", on ? "bg-brand text-white" : "bg-brand-soft text-brand-soft-ink")}>
                      {q.icon}
                    </span>
                    {on && <Check className="h-5 w-5 text-brand" strokeWidth={2.6} aria-hidden />}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold text-ink">{q.title}</span>
                    <span className="text-xs leading-snug text-ink-3">{q.sub}</span>
                  </div>
                  <span className="text-xl font-extrabold text-ink">
                    {n} <span className="text-[13px] font-medium text-ink-3">từ</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-strong pb-3">
            <h2 className="hx-title text-[clamp(22px,2.2vw,30px)]">Theo chủ đề</h2>
            <div role="group" aria-label="Lọc theo nguồn" className="flex gap-1 rounded-xl bg-surface-2 p-1">
              {(["ALL", "BJT", "JLPT"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={source === s}
                  onClick={() => setSource(s)}
                  className={cn(
                    "h-8 rounded-[9px] px-3.5 text-[13px] transition-colors",
                    source === s ? "bg-surface font-bold text-ink shadow-[0_1px_2px_rgba(28,25,23,0.06)]" : "font-medium text-ink-2"
                  )}
                >
                  {s === "ALL" ? "Tất cả" : s === "BJT" ? "BJT" : "JLPT N1"}
                </button>
              ))}
            </div>
          </div>
          <div className="cells grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3">
            {shownGroups.map((g) => {
              const key: ScopeKey = `group:${g.id}`;
              const on = scope === key;
              const done = g.items.filter((i) => progress[i.id]?.status === "mastered").length;
              const pct = g.items.length ? Math.round((done / g.items.length) * 100) : 0;
              return (
                <button key={g.id} type="button" aria-pressed={on} onClick={() => setScope(key)} className={cn(scopeCard(on), "items-center gap-3.5 p-4")}>
                  <GroupIcon groupId={g.id} />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-[15px] font-bold text-ink">{g.name}</span>
                    <span className="text-xs text-ink-3">
                      {g.nameJa && <span className="font-jp">{g.nameJa} · </span>}
                      {g.items.length} từ · đã thuộc {pct}%
                    </span>
                    <span className="mt-1 h-1.5 overflow-hidden rounded-full bg-track">
                      <span className="block h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                    </span>
                  </span>
                  <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border", on ? "border-brand bg-brand text-white" : "border-line-strong")}>
                    {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mobile / tablet: phần thiết lập nằm dưới danh sách */}
        <section className="panel p-5 lg:hidden">{setup}</section>
      </div>

      {/* Desktop: thiết lập cố định bên phải */}
      <aside className="sticky top-[calc(var(--header-h)+24px)] hidden w-[400px] shrink-0 panel p-5 lg:block">{setup}</aside>

      {/* Mobile / tablet: nút bắt đầu cố định */}
      <div className="fixed inset-x-0 bottom-20 z-40 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur md:bottom-0 lg:hidden">
        <div className="mx-auto flex max-w-[720px] items-center gap-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-bold text-ink">{selected.label}</span>
            <span className="text-xs text-ink-3">
              {effectiveCount} từ · {types.length} dạng
            </span>
          </div>
          <button
            type="button"
            onClick={start}
            disabled={available === 0}
            className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-brand px-5 text-[15px] font-bold text-white disabled:opacity-40"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden />
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
