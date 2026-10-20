"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Repeat2, Timer, Trophy } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { useAuth } from "@/hooks/useAuth";
import { computeStreak, localDate, longestStreak, useActivityStore, type DayStats } from "@/store/activity-store";
import { useSrsStore, State } from "@/store/srs-store";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import { courseProgress } from "@/lib/learning/progress";
import { COURSE_LABEL, loadItemIndex, type ItemIndex } from "@/lib/learning/items";
import { cn } from "@/lib/utils";

const COURSE_HREF: Record<string, string> = { "jlpt-n1": "/jlpt-n1", english: "/english", "oci-ai": "/oracle-oci-ai", bjt: "/study" };
const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const dayOffset = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};
const fmtMin = (sec: number) => (sec >= 3600 ? `${Math.floor(sec / 3600)} giờ ${Math.round((sec % 3600) / 60)} phút` : `${Math.round(sec / 60)} phút`);

/** Hồ sơ học tập: số liệu tính trên máy (luôn có), gộp với máy chủ khi đã đăng nhập. */
export function ProgressDashboard() {
  const hydrated = useHydrated();
  const { enabled, user } = useAuth();
  const days = useActivityStore((s) => s.days);
  const active = useActivityStore((s) => s.active);
  const cards = useSrsStore((s) => s.cards);
  const n1 = useN1Store();
  const en = useEnStore();
  const oci = useOciAiStore();
  const [idx, setIdx] = useState<ItemIndex | null>(null);
  useEffect(() => {
    loadItemIndex().then(setIdx, () => {});
  }, []);

  const { doneKeys, bjtKnown } = useLearningProgress();

  if (!hydrated) return null;

  const today = localDate();
  const t = days[today];
  const week = Array.from({ length: 7 }, (_, i) => days[localDate(dayOffset(i))]).filter(Boolean) as DayStats[];
  const weekSec = week.reduce((n, d) => n + d.sec, 0);
  const xpTotal = Object.values(days).reduce((n, d) => n + d.xp, 0);
  const streak = computeStreak(active);
  const longest = longestStreak(active);

  const list = Object.values(cards).filter((c) => !c.suspended);
  const now = new Date().toISOString();
  const cardStats = {
    due: list.filter((c) => c.due <= now).length,
    fresh: list.filter((c) => c.state === State.New).length,
    learning: list.filter((c) => c.state === State.Learning || c.state === State.Relearning).length,
    young: list.filter((c) => c.state === State.Review && c.stability < 21).length,
    mature: list.filter((c) => c.state === State.Review && c.stability >= 21).length,
  };

  const bjt = { known: bjtKnown, total: idx ? Object.keys(idx.aliases).length : 0 };
  const courses = idx ? Object.entries(idx.courses).map(([key, c]) => courseProgress({ key, ...c }, doneKeys, bjt)) : [];

  const quizzes = [
    ...Object.entries(n1.quiz).map(([k, q]) => ({ course: "jlpt-n1", k, score: q.last, total: q.total, at: q.at })),
    ...Object.entries(en.quiz).map(([k, q]) => ({ course: "english", k, score: q.last, total: q.total, at: q.at })),
    ...Object.entries(oci.quiz).map(([k, q]) => ({ course: "oci-ai", k, score: q.score, total: q.total, at: q.at })),
    ...Object.entries(oci.practice ?? {}).map(([k, q]) => ({ course: "oci-ai", k, score: q.last, total: q.total, at: q.at })),
  ]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      {enabled && !user && (
        <div className="flex flex-wrap items-center gap-3 border border-line-strong bg-surface-2 px-4 py-3 text-[14px] text-ink-2">
          Tiến độ đang lưu trên trình duyệt này.
          <Link href="/login?next=/progress" className="ml-auto rounded-lg bg-ink px-3 py-1.5 text-[13px] font-bold text-paper">
            Đăng nhập để đồng bộ
          </Link>
        </div>
      )}

      {/* Chỉ số chính */}
      <div className="cells grid-cols-2 lg:grid-cols-4">
        <Stat icon={Flame} label="Chuỗi ngày học" value={`${streak} ngày`} sub={`Dài nhất: ${longest} ngày`} accent={streak > 0} />
        <Stat icon={Timer} label="Hôm nay" value={fmtMin(t?.sec ?? 0)} sub={`7 ngày: ${fmtMin(weekSec)}`} />
        <Stat icon={Repeat2} label="Thẻ đến hạn" value={String(cardStats.due)} sub={`${list.length} thẻ trong bộ ôn`} href="/review" />
        <Stat icon={Trophy} label="Điểm kinh nghiệm" value={`${xpTotal.toLocaleString("vi-VN")} XP`} sub={`Hôm nay +${t?.xp ?? 0}`} />
      </div>

      <Card title="Lịch học 26 tuần" note="Mỗi ô là một ngày, càng đậm càng nhiều XP.">
        <Heatmap days={days} />
      </Card>

      <Card title="14 ngày gần đây" note="Số phút học mỗi ngày (chỉ tính lúc đang mở trang học và có thao tác).">
        <MinutesBars days={days} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Tiến độ khóa học">
          <ul className="flex flex-col gap-4">
            {courses.map((c) => {
              const pct = c.pct;
              return (
                <li key={c.key} className="flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2 text-[14px]">
                    <Link href={COURSE_HREF[c.key] ?? "/courses"} className="font-semibold text-ink hover:underline">
                      {COURSE_LABEL[c.key] ?? c.title}
                    </Link>
                    <span className="text-ink-3">
                      {c.done}/{c.total} {c.unit} · <b className="text-ink">{pct}%</b>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={c.title}>
                    <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
            {!idx && <li className="text-[14px] text-ink-3">Đang tải…</li>}
          </ul>
        </Card>

        <Card title="Bộ ôn tập" note="Thẻ đã vững = khoảng cách ôn từ 21 ngày trở lên.">
          <div className="cells grid-cols-2 sm:grid-cols-4">
            {[
              { label: "Mới", v: cardStats.fresh },
              { label: "Đang học", v: cardStats.learning },
              { label: "Đang ôn", v: cardStats.young },
              { label: "Đã vững", v: cardStats.mature },
            ].map((x) => (
              <div key={x.label} className="flex flex-col px-3 py-2.5">
                <span className="text-[12.5px] text-ink-3">{x.label}</span>
                <span className="text-[22px] font-extrabold text-ink">{x.v}</span>
              </div>
            ))}
          </div>
          <Link
            href="/review"
            className={cn(
              "mt-3 flex h-11 items-center justify-center gap-2 rounded-xl text-[15px] font-bold",
              cardStats.due ? "bg-brand text-white hover:bg-brand-hover" : "border border-line-strong text-ink hover:bg-surface-2"
            )}
          >
            <Repeat2 className="h-4 w-4" aria-hidden /> {cardStats.due ? `Ôn ${cardStats.due} thẻ đến hạn` : "Mở trang ôn tập"}
          </Link>
        </Card>
      </div>

      <Card title="Bài kiểm tra gần đây">
        {quizzes.length ? (
          <ul className="flex flex-col divide-y divide-line">
            {quizzes.map((q) => {
              const pct = q.total ? Math.round((100 * q.score) / q.total) : 0;
              return (
                <li key={`${q.course}-${q.k}`} className="flex items-center gap-3 py-2.5 text-[14px]">
                  <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[12px] font-semibold text-ink-2">{COURSE_LABEL[q.course]}</span>
                  <span className="min-w-0 flex-1 truncate text-ink-2">{q.k}</span>
                  <span className={cn("font-bold", pct >= 70 ? "text-ok-ink" : "text-brand")}>
                    {q.score}/{q.total}
                  </span>
                  <span className="hidden text-[12.5px] text-ink-3 sm:inline">{new Date(q.at).toLocaleDateString("vi-VN")}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[14px] text-ink-3">Chưa làm bài kiểm tra nào.</p>
        )}
      </Card>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  href,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  href?: string;
}) {
  const body = (
    <>
      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-3">
        <Icon className={cn("h-4 w-4", accent ? "text-brand" : "text-ink-3")} aria-hidden /> {label}
      </span>
      <span className="text-[24px] leading-tight font-extrabold text-ink">{value}</span>
      <span className="text-[12.5px] text-ink-3">{sub}</span>
    </>
  );
  const cls = "flex flex-col gap-1 px-4 py-4";
  return href ? (
    <Link href={href} className={cn(cls, "transition-colors hover:bg-surface")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function Card({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3 panel px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[16px] font-bold text-ink">{title}</h2>
        {note && <p className="text-[12.5px] text-ink-3">{note}</p>}
      </div>
      {children}
    </section>
  );
}

/** Mức đậm theo XP: 0 · 1–9 · 10–29 · 30–59 · 60+ (một sắc độ, nhạt → đậm) */
const LEVELS = [0, 1, 10, 30, 60];
const levelOf = (xp: number) => LEVELS.filter((l) => xp >= l).length - 1;
const LEVEL_CLS = ["bg-track", "bg-brand/25", "bg-brand/50", "bg-brand/75", "bg-brand"];

function Heatmap({ days }: { days: Record<string, DayStats> }) {
  const weeks = 26;
  // Cột cuối = tuần hiện tại (bắt đầu thứ Hai)
  const todayIdx = (new Date().getDay() + 6) % 7;
  const totalDays = (weeks - 1) * 7 + todayIdx + 1;
  const cells = Array.from({ length: totalDays }, (_, i) => {
    const d = dayOffset(totalDays - 1 - i);
    const key = localDate(d);
    return { key, d, s: days[key] };
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5">
        <div className="grid grid-rows-7 gap-[3px] text-[10px] leading-none text-ink-3">
          {WEEKDAYS.map((w, i) => (
            <span key={w} className={cn("flex items-center", i % 2 && "invisible")}>
              {w}
            </span>
          ))}
        </div>
        {/* 26 cột co giãn theo bề rộng → vừa cả điện thoại lẫn máy tính, tuần hiện tại luôn ở bên phải */}
        <div className="grid flex-1 grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}>
          {cells.map(({ key, d, s }) => (
            <span
              key={key}
              title={`${d.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" })}: ${s ? `${s.xp} XP · ${Math.round(s.sec / 60)} phút · ${s.reviews} lượt ôn` : "không học"}`}
              className={cn("aspect-square max-h-4 w-full rounded-[3px]", LEVEL_CLS[levelOf(s?.xp ?? 0)])}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5 self-end text-[11px] text-ink-3">
        Ít
        {LEVEL_CLS.map((c) => (
          <span key={c} className={cn("h-[11px] w-[11px] rounded-[3px]", c)} />
        ))}
        Nhiều
      </div>
    </div>
  );
}

function MinutesBars({ days }: { days: Record<string, DayStats> }) {
  const data = Array.from({ length: 14 }, (_, i) => {
    const d = dayOffset(13 - i);
    const s = days[localDate(d)];
    return { d, min: Math.round((s?.sec ?? 0) / 60), s };
  });
  const max = Math.max(10, ...data.map((x) => x.min));
  if (data.every((x) => !x.min))
    return <p className="text-[14px] text-ink-3">Chưa ghi nhận thời gian học trong 14 ngày qua. Thời gian được tính khi bạn mở trang học và có thao tác.</p>;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex h-36 items-end gap-1.5">
        {data.map(({ d, min, s }, i) => (
          <div
            key={i}
            className="group relative flex h-full flex-1 flex-col justify-end"
            title={`${d.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit" })}: ${min} phút${s ? ` · ${s.reviews} lượt ôn · ${s.questions} câu hỏi` : ""}`}
          >
            {min > 0 && <span className="mb-0.5 text-center text-[10.5px] text-ink-3 opacity-0 group-hover:opacity-100">{min}</span>}
            <div
              className={cn("w-full rounded-t-[4px]", i === 13 ? "bg-brand" : "bg-brand/45 group-hover:bg-brand/70")}
              style={{ height: `${(min / max) * 100}%`, minHeight: min ? 3 : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 border-t border-line pt-1">
        {data.map(({ d }, i) => (
          <span key={i} className="flex-1 text-center text-[10px] text-ink-3">
            {i % 2 === 1 || i === 13 ? d.getDate() : ""}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>Số phút học 14 ngày gần đây</caption>
        <tbody>
          {data.map(({ d, min }, i) => (
            <tr key={i}>
              <th>{d.toLocaleDateString("vi-VN")}</th>
              <td>{min} phút</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
