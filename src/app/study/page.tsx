"use client";

import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { useFlashcardStore } from "@/store/flashcard-store";
import { GroupIcon } from "@/components/ui/group-icon";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { VocabularyBrowser } from "@/components/flashcard/VocabularyBrowser";
import { useProgressStats } from "@/hooks/useProgressStats";
import { Page, PageHeader, Section } from "@/components/ui/page";

/** Tiến độ toàn bộ từ vựng BJT (trước đây nằm trên thanh tiêu đề) */
function BjtMeter() {
  const { mastered, total, pct } = useProgressStats();
  return (
    <div className="panel flex flex-col gap-3 p-5" title={`Đã thuộc ${mastered}/${total} từ`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow-label">Đã thuộc</span>
        <span className="text-[13.5px] text-ink-3 tabular-nums">
          <b className="text-[22px] font-extrabold tracking-[-0.02em] text-ink">{mastered.toLocaleString("vi-VN")}</b>/
          {total.toLocaleString("vi-VN")} từ
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Tiến độ từ vựng BJT"
      >
        <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[13px] font-semibold text-brand tabular-nums">{pct}% khóa từ vựng BJT</span>
    </div>
  );
}

export default function StudyIndexPage() {
  const { data: groups, isLoading } = useAllVocabularyGroups();
  const { progress } = useFlashcardStore();

  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Khóa học", href: "/courses" }, { label: "Từ vựng BJT" }]}
        eyebrow={
          <>
            Từ vựng BJT <span className="font-mincho tracking-[0.12em] normal-case">ビジネス日本語</span>
          </>
        }
        accent="#a14f06"
        title="Chọn nhóm để học"
        lead="Học tập trung theo từng nhóm chủ đề công sở. Thẻ đã thuộc được tính vào tiến độ bên cạnh."
        aside={<BjtMeter />}
      />

      <Section title="Nhóm chủ đề" id="study-groups">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 panel p-5">
                <div className="skeleton h-11 w-11 rounded-xl" />
                <div className="flex flex-1 flex-col gap-2">
                  <div className="skeleton h-4 w-40" />
                  <div className="skeleton h-3 w-24" />
                  <div className="skeleton mt-1 h-1.5 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {groups?.map((group) => {
              const done = group.items.filter((i) => progress[i.id]?.status === "mastered").length;
              const pct = group.items.length ? Math.round((done / group.items.length) * 100) : 0;
              return (
                <Link
                  key={group.id}
                  href={`/study/${group.id}`}
                  className="group flex items-center gap-4 panel p-5 transition-colors duration-200 hover:border-ink-3"
                >
                  <GroupIcon groupId={group.id} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[15px] font-bold text-ink">{group.name}</p>
                      <span className="rounded-md border border-line px-2 py-0.5 text-[10px] font-bold text-ink-2">
                        {group.sourceType === "JLPT" ? "JLPT N1" : group.sourceType}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-3">
                      {group.nameJa && <span className="font-jp">{group.nameJa} · </span>}
                      {group.items.length} từ vựng
                    </p>
                    <div className="mt-2.5 flex items-center gap-2.5">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-track">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-ink-2">
                        {done}/{group.items.length}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              );
            })}
          </div>
        )}
      </Section>

      <VocabularyBrowser />
    </Page>
  );
}
