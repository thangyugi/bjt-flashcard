"use client";

import { useAllVocabularyGroups, useVocabularyStats } from "@/hooks/useVocabulary";
import { FlashCardGroup } from "@/components/flashcard/FlashCardGroup";
import { useFlashcardStore } from "@/store/flashcard-store";
import { useState } from "react";
import type { SourceType } from "@/types/vocabulary";
import Link from "next/link";

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<SourceType | "ALL">("ALL");
  const { progress } = useFlashcardStore();

  const { data: groups, isLoading } = useAllVocabularyGroups(
    activeFilter === "ALL" ? undefined : { sourceType: activeFilter }
  );
  const { data: stats } = useVocabularyStats();

  const masteredCount = Object.values(progress).filter(
    (p) => p.status === "mastered"
  ).length;
  const totalItems = stats?.totalItems ?? 0;
  const overallPct = totalItems > 0 ? Math.round((masteredCount / totalItems) * 100) : 0;

  const filters: { label: string; value: SourceType | "ALL" }[] = [
    { label: "Tất cả", value: "ALL" },
    { label: "💼 BJT", value: "BJT" },
    { label: "📚 JLPT N1", value: "JLPT" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* ── Hero ── */}
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-7 text-white overflow-hidden relative shadow-lg shadow-indigo-200">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
        <div className="relative">
          <p className="text-indigo-200 text-xs font-semibold mb-2 uppercase tracking-widest">
            BJT Business Japanese
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3">
            Học từ vựng tiếng Nhật
            <br />
            <span className="text-amber-300">thương mại hiệu quả</span>
          </h1>
          <p className="text-indigo-100/80 text-sm max-w-md mb-5 leading-relaxed">
            Từ vựng nhóm theo chủ đề, có ví dụ câu và ghi chú ngữ cảnh business.
            Nhấn vào card để lật xem nghĩa.
          </p>
          {stats && (
            <div className="flex items-center gap-5">
              {[
                { n: stats.bjtGroups, label: "nhóm BJT" },
                { n: stats.n1Groups, label: "nhóm N1" },
                { n: totalItems, label: "từ vựng" },
              ].map(({ n, label }) => (
                <div key={label} className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white">{n}</span>
                  <span className="text-indigo-200 text-xs">{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Progress (only when started) ── */}
      {masteredCount > 0 && (
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <p className="text-sm font-semibold text-gray-800">Tiến độ</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Đã thuộc {masteredCount}/{totalItems} từ
              </p>
            </div>
            <span className="text-xl font-bold text-indigo-600">{overallPct}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </section>
      )}

      {/* ── Filters & Actions ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              id={`filter-${f.value.toLowerCase()}`}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                activeFilter === f.value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Link 
          href="/quiz?groupId=all"
          className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-bold shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-2 hover:scale-105"
        >
          <span>📝</span>
          Thi trắc nghiệm tổng hợp
        </Link>
      </div>

      {/* ── Groups ── */}
      <div className="space-y-10">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton h-6 w-48" />
              <div className="flex gap-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="skeleton w-52 h-72 rounded-2xl shrink-0" />
                ))}
              </div>
            </div>
          ))
        ) : groups?.length ? (
          groups.map((g) => <FlashCardGroup key={g.id} group={g} />)
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm font-medium">Không có nhóm từ vựng</p>
          </div>
        )}
      </div>

      {/* ── Tip ── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm flex gap-3">
        <span className="text-base flex-shrink-0 mt-0.5">💡</span>
        <div>
          <p className="font-semibold text-amber-800 mb-0.5">Cách học hiệu quả</p>
          <p className="text-amber-700/80 leading-relaxed text-xs">
            Nhấn vào card để xem nghĩa. Đọc kỹ phần <strong>Business Context</strong> ở mặt sau —
            ghi chú thực tế về cách dùng từ trong môi trường công ty Nhật.
            Bấm "Học ngay" để luyện tập tập trung từng nhóm.
          </p>
        </div>
      </div>
    </div>
  );
}
