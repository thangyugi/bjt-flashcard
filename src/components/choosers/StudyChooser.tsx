"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { courseProgress } from "@/lib/learning/progress";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useCcarStore } from "@/store/ccar-p-store";
import { useContinueGroup } from "@/components/home/vocab";
import { cn } from "@/lib/utils";
import { btn } from "@/components/ui/page";
import type { ChooserData, CourseId } from "@/lib/choosers";

interface Entry {
  label: string;
  href: string;
  note?: string;
}

/** Bài học gần nhất của từng khóa (cùng nguồn với "Học tiếp" ở trang chủ) */
export function useLastLessons(data: ChooserData) {
  const hydrated = useHydrated();
  const n1 = useN1Store((s) => s.lastLessonId);
  const n1Vocab = useN1Store((s) => s.lastVocabId);
  const ipa = useEnStore((s) => s.lastIpaLesson);
  const oci = useOciAiStore((s) => s.lastLessonId);
  const ccar = useCcarStore((s) => s.lastLessonId);
  const group = useContinueGroup();
  if (!hydrated) return { n1: null, n1Vocab: null, ipa: null, oci: null, ccar: null, group: undefined };
  const known = (map: Record<string, string>, id: string | null) => (id && map[id] ? id : null);
  return {
    n1: known(data.labels.n1, n1),
    n1Vocab: known(data.labels.n1Vocab, n1Vocab),
    ipa: known(data.labels.ipa, ipa),
    oci: known(data.labels.oci, oci),
    ccar: known(data.labels.ccar, ccar),
    group,
  };
}

/**
 * Trang "Học bài": chọn khóa để học. Mỗi khóa là một ô trong lưới kẻ mảnh: tiến độ, "Học tiếp"
 * (bài gần nhất) hoặc "Bắt đầu", và các lối vào chính của khóa.
 */
export function StudyChooser({ data }: { data: ChooserData }) {
  const hydrated = useHydrated();
  const last = useLastLessons(data);
  const { doneKeys, bjtKnown } = useLearningProgress();
  const { labels, first, counts } = data;

  const plan: Record<CourseId, { cont: Entry | null; start: Entry; entries: Entry[] }> = {
    "jlpt-n1": {
      cont: last.n1
        ? { label: labels.n1[last.n1], href: `/jlpt-n1/grammar/${last.n1}` }
        : last.n1Vocab
          ? { label: labels.n1Vocab[last.n1Vocab], href: `/jlpt-n1/vocab/${last.n1Vocab}` }
          : null,
      start: { label: labels.n1[first.n1], href: `/jlpt-n1/grammar/${first.n1}` },
      entries: [
        { label: "Ngữ pháp", href: "/jlpt-n1/grammar", note: `${counts.n1Chapters} chương truyện` },
        {
          label: last.n1Vocab ? "Từ vựng · học tiếp" : "Từ vựng Mimikara",
          href: last.n1Vocab ? `/jlpt-n1/vocab/${last.n1Vocab}` : "/jlpt-n1/vocab",
          note: `${counts.n1VocabLessons} bài · ${counts.n1Words.toLocaleString("vi-VN")} từ`,
        },
        { label: "Thư viện từ vựng", href: "/jlpt-n1/vocab/library" },
      ],
    },
    english: {
      cont: last.ipa ? { label: labels.ipa[last.ipa], href: `/english/ipa/${last.ipa}` } : null,
      start: { label: labels.ipa[first.ipa], href: `/english/ipa/${first.ipa}` },
      entries: [
        { label: "Lộ trình IPA", href: "/english/ipa", note: `${counts.ipaLessons} bài` },
        { label: "Phòng luyện tập", href: "/english/ipa/practice", note: "3 cấp độ" },
        { label: "Ôn âm IPA", href: "/english/ipa/review" },
      ],
    },
    "oci-ai": {
      cont: last.oci ? { label: labels.oci[last.oci], href: `/oracle-oci-ai/${last.oci}` } : null,
      start: { label: labels.oci[first.oci], href: `/oracle-oci-ai/${first.oci}` },
      entries: [
        { label: "Mục lục khóa học", href: "/oracle-oci-ai" },
        { label: "Thuật ngữ", href: "/oracle-oci-ai/glossary" },
        { label: "Luyện tập & thi thử", href: "/oracle-oci-ai/practice" },
      ],
    },
    "ccar-p": {
      cont: last.ccar ? { label: labels.ccar[last.ccar], href: `/claude-ccar-p/${last.ccar}` } : null,
      start: { label: labels.ccar[first.ccar], href: `/claude-ccar-p/${first.ccar}` },
      entries: [
        { label: "7 domain · thứ tự học", href: "/claude-ccar-p", note: `${counts.ccarLessons} task statement` },
        { label: "Luyện tập & thi thử", href: "/claude-ccar-p/practice", note: `${counts.ccarQuestions} câu · 3 đề` },
        { label: "Lộ trình ôn & quy chế", href: "/claude-ccar-p/on-thi" },
      ],
    },
    bjt: {
      cont: last.group ? { label: `Nhóm ${last.group.name}`, href: `/bjt/${last.group.id}` } : null,
      start: { label: "Chọn một nhóm chủ đề", href: "/bjt" },
      entries: [
        { label: "Nhóm chủ đề", href: "/bjt", note: `${counts.bjtTopics} nhóm · ${counts.bjtCards.toLocaleString("vi-VN")} thẻ` },
        { label: "Tra từ vựng", href: "/bjt#tra-tu" },
      ],
    },
  };

  return (
    <div className="cells grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {data.courses.map((c) => {
        const p = plan[c.id];
        const prog = hydrated && c.lessons ? courseProgress(c.lessons, doneKeys, { known: bjtKnown, total: data.bjtTotal }) : null;
        const go = p.cont ?? p.start;
        return (
          <article key={c.id} className="flex flex-col" style={{ "--c": c.color } as CSSProperties}>
            <div className="flex flex-col gap-4 border-b border-dashed border-line-strong p-5 sm:p-6">
              <p className="eyebrow-label flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.color }} aria-hidden />
                {c.kicker}
              </p>
              <h2 className="hx-title text-[clamp(28px,2.6vw,40px)]">
                <Link href={c.href} className="hover:text-[var(--c)]">
                  {c.title}
                </Link>
              </h2>
              <p className="text-[14px] leading-relaxed text-ink-3">{c.desc}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3 text-[13px] text-ink-3 tabular-nums">
                  <span>{prog ? `${prog.done.toLocaleString("vi-VN")}/${prog.total.toLocaleString("vi-VN")} ${prog.unit}` : " "}</span>
                  <span>{prog ? `${prog.pct}%` : ""}</span>
                </div>
                <div
                  className="h-1.5 overflow-hidden bg-track"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={prog?.pct ?? 0}
                  aria-label={`Tiến độ ${c.title}`}
                >
                  <div className="h-full bg-ink transition-[width] duration-500" style={{ width: `${prog?.pct ?? 0}%` }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-5 sm:p-6">
              <span className="eyebrow-label">{p.cont ? "Học tiếp" : "Bắt đầu"}</span>
              <Link href={go.href} className="group flex items-start gap-3 text-ink">
                <PlayCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--c)]" aria-hidden />
                <span className="min-w-0 flex-1 text-[15px] leading-snug font-semibold group-hover:underline">{go.label}</span>
              </Link>
            </div>

            <ul className="mt-auto flex flex-col border-t border-line-strong">
              {p.entries.map((e) => (
                <li key={e.href + e.label} className="border-b border-line last:border-b-0">
                  <Link
                    href={e.href}
                    className="group flex items-center gap-3 px-5 py-3 text-[14px] transition-colors hover:bg-surface sm:px-6"
                  >
                    <span className="min-w-0 flex-1 font-medium text-ink">{e.label}</span>
                    {e.note && <span className="text-[12.5px] whitespace-nowrap text-ink-3">{e.note}</span>}
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

/** Hàng "Học tiếp" ở đầu trang: các bài đang dở của mọi khóa */
export function ContinueStrip({ data }: { data: ChooserData }) {
  const last = useLastLessons(data);
  const items: { course: string; label: string; href: string; color: string }[] = [];
  const m = Object.fromEntries(data.courses.map((c) => [c.id, c]));
  if (last.n1) items.push({ course: "JLPT N1", label: data.labels.n1[last.n1], href: `/jlpt-n1/grammar/${last.n1}`, color: m["jlpt-n1"].color });
  if (last.n1Vocab)
    items.push({ course: "Từ vựng N1", label: data.labels.n1Vocab[last.n1Vocab], href: `/jlpt-n1/vocab/${last.n1Vocab}`, color: m["jlpt-n1"].color });
  if (last.ipa) items.push({ course: "IPA", label: data.labels.ipa[last.ipa], href: `/english/ipa/${last.ipa}`, color: m.english.color });
  if (last.oci) items.push({ course: "OCI AI", label: data.labels.oci[last.oci], href: `/oracle-oci-ai/${last.oci}`, color: m["oci-ai"].color });
  if (last.ccar) items.push({ course: "CCAR-P", label: data.labels.ccar[last.ccar], href: `/claude-ccar-p/${last.ccar}`, color: m["ccar-p"].color });
  if (last.group) items.push({ course: "BJT", label: `Nhóm ${last.group.name}`, href: `/bjt/${last.group.id}`, color: m.bjt.color });

  if (!items.length)
    return (
      <div className="flex flex-col gap-3">
        <p className="text-[14px] leading-relaxed text-ink-3">Chưa có bài nào đang học dở. Chọn một khóa bên dưới để bắt đầu.</p>
        <Link href={`/jlpt-n1/grammar/${data.first.n1}`} className={cn(btn.primary, "w-fit")}>
          Bắt đầu Chương 1 JLPT N1
          <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
        </Link>
      </div>
    );

  return (
    <ul className="flex flex-col border-t border-line-strong">
      {items.slice(0, 4).map((it) => (
        <li key={it.href} className="border-b border-line-strong">
          <Link href={it.href} className="group flex items-center gap-3 py-3 text-[14px]">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: it.color }} aria-hidden />
            <span className="w-[86px] shrink-0 text-[12px] font-semibold tracking-[0.06em] text-ink-3 uppercase">{it.course}</span>
            <span className="min-w-0 flex-1 truncate font-semibold text-ink group-hover:underline">{it.label}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-ink-3" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
