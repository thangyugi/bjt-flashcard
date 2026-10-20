"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { useDue } from "@/hooks/useDue";
import { computeStreak, emptyDay, localDate, longestStreak, useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance, totalXp, WELCOME_GIFT, XP_PER_CRYSTAL } from "@/lib/land/economy";
import { dailyPlan } from "@/lib/land/plan";
import { cn } from "@/lib/utils";
import { useViewer } from "./viewer";
import { useWordOfDay } from "./vocab";
import { bjtCardAnchor } from "@/components/flashcard/anchor";
import { Arrow, Gem } from "./icons";
import { ChestSoon, DayOffSoon, GiftSoon } from "./Soon";

const WEEKDAY_LONG = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const WEEKDAY_SHORT = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

/** Vạch chờ trong lúc chưa biết phiên đăng nhập (không lóe giao diện khách) */
function Pending({ lines = 3 }: { lines?: number }) {
  return (
    <div className="pending" aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} className="skeleton" style={{ width: `${92 - i * 18}%` }} />
      ))}
    </div>
  );
}

/** Đường dẫn tới đúng thẻ của từ trong nhóm BJT (FlashCardDeck đọc #tu-<id> để mở thẻ đó) */
const wordHref = (w: { item: { id: string }; group: { id: string } }) => `/bjt/${w.group.id}#${bjtCardAnchor(w.item.id)}`;

type Week = { key: string; label: string; today: boolean; on: boolean }[];

/** Nhãn "Ví dụ" cho số liệu minh họa khách thấy (không phải số liệu của họ) */
function Example({ children = "Ví dụ" }: { children?: string }) {
  return <span className="tag ex-tag">{children}</span>;
}

/** Danh sách kế hoạch; bản ví dụ không phải liên kết */
function PlanList({ plan, sample }: { plan: ReturnType<typeof dailyPlan>; sample?: boolean }) {
  const pct = Math.round((100 * plan.done) / plan.tasks.length);
  return (
    <div className="stack">
      <div className="row">
        <span>
          <b className="num">
            {plan.done}/{plan.tasks.length}
          </b>{" "}
          mục đã xong
        </span>
        {sample ? <Example /> : <span className="num">{pct}%</span>}
      </div>
      <div
        className="meter"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={plan.tasks.length}
        aria-valuenow={plan.done}
        aria-label={`${sample ? "Ví dụ: " : ""}Đã xong ${plan.done} trên ${plan.tasks.length} mục`}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <ul className={cn("plan", sample && "sample")}>
        {plan.tasks.map((t) => {
          const inner = (
            <>
              <span className="box" aria-hidden />
              <span className="t">
                {t.label}
                <span className="sr-only">{t.done ? " — đã xong" : sample ? "" : ` — ${t.cta}`}</span>
              </span>
              <span className="m">
                {Math.min(t.value, t.goal)}/{t.goal} {t.unit}
              </span>
            </>
          );
          return (
            <li key={t.id}>
              {sample ? (
                <div className={cn("chk", t.done && "done")}>{inner}</div>
              ) : (
                <Link href={t.href} className={cn("chk", t.done && "done")}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Rewards({ balance, todayXp, xpInto, sample }: { balance: number; todayXp: number; xpInto: number; sample?: boolean }) {
  return (
    <div className="stack">
      <div className="kv">
        <span className="kv-l">
          Tinh thể {sample && <Example />}
        </span>
        <span className="v">
          <Gem />
          <span className="num">{balance.toLocaleString("vi-VN")}</span>
        </span>
        <span>Hôm nay</span>
        <span className="v sm num">+{todayXp} XP</span>
      </div>
      <div className="prog">
        <div className="row">
          <span>Tinh thể tiếp theo</span>
          <span className="num">còn {XP_PER_CRYSTAL - xpInto} XP</span>
        </div>
        <div className="meter" aria-hidden>
          <span style={{ width: `${(100 * xpInto) / XP_PER_CRYSTAL}%` }} />
        </div>
      </div>
    </div>
  );
}

function Streak({ streak, week, longest, todayOn, sample }: { streak: number; week: Week; longest: number; todayOn: boolean; sample?: boolean }) {
  return (
    <div className="stack lg">
      <div className="row">
        <p className="streak-n">
          <b className="num">{streak}</b> ngày liên tiếp
        </p>
        {sample && <Example />}
      </div>
      <ol className="week" aria-label={sample ? "Ví dụ 7 ngày" : "7 ngày gần nhất"}>
        {week.map((d) => (
          <li key={d.key} className={cn("day", d.on && "done", d.today && "today")}>
            <i aria-hidden />
            <span>
              {d.label}
              <span className="sr-only">{d.on ? ": có học" : ": chưa học"}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="rest">
        <span>
          Dài nhất <b className="num">{longest}</b> ngày
        </span>
        <span>{todayOn ? "Hôm nay đã học" : "Hôm nay chưa học"}</span>
      </div>
    </div>
  );
}

/** Số liệu minh họa cho khách (gắn nhãn "Ví dụ") */
const SAMPLE_DAY = { ...emptyDay(), xp: 30, reviews: 12, lessons: 0 };

/**
 * Dải "Hôm nay": Ngày của bạn · Kế hoạch hôm nay · Phần thưởng · Chuỗi ngày.
 * Đã đăng nhập: số liệu thật từ activity-store và land-store. Khách: bản ví dụ có nhãn "Ví dụ" + lời mời đăng nhập.
 * Quà hôm nay, Rương hiếm 7 ngày, Ngày nghỉ chưa làm: nội dung giới thiệu có nhãn "Sắp ra mắt".
 */
export function TodayBand({ icons }: { icons: { plan: ReactNode; gift: ReactNode; streak: ReactNode } }) {
  const viewer = useViewer();
  const days = useActivityStore((s) => s.days);
  const active = useActivityStore((s) => s.active);
  const spent = useLandStore((s) => s.spent);
  const { due } = useDue();
  const word = useWordOfDay();

  const now = new Date();
  const today = days[localDate(now)] ?? emptyDay();
  const plan = dailyPlan(today);
  const left = plan.tasks.length - plan.done;
  const balance = crystalBalance(days, spent);
  const xpInto = totalXp(days) % XP_PER_CRYSTAL;
  const streak = computeStreak(active, now);
  const longest = longestStreak(active);
  const week: Week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return { key: localDate(d), label: WEEKDAY_SHORT[d.getDay()], today: i === 6, on: !!active[localDate(d)] };
  });
  const sampleWeek: Week = week.map((d, i) => ({ ...d, on: i >= 1 && i <= 5 }));
  const user = viewer === "user";
  const guest = viewer === "guest";

  return (
    <div className="cols c4 today" aria-busy={viewer === "loading"}>
      {/* ── Ngày của bạn ── */}
      <div className="col tcol" style={{ "--c": "var(--brand)" } as CSSProperties}>
        <div className="art">
          <div className="wod">
            <p className="wod-lbl">
              Từ của hôm nay{" "}
              <span className="mincho" lang="ja">
                一日一語
              </span>
            </p>
            {viewer !== "loading" && word ? (
              <Link
                href={guest ? `/register?next=${encodeURIComponent(wordHref(word))}` : wordHref(word)}
                className="wod-word"
                aria-label={`Từ của hôm nay: ${word.item.kanji}, ${word.item.meaningVn}. Mở thẻ từ này trong nhóm ${word.group.name}`}
              >
                <span className="jp wod-r" lang="ja">
                  {word.item.hiragana || word.item.katakana}
                </span>
                <span className={cn("mincho wod-k", word.item.kanji.length > 5 && "long")} lang="ja">
                  {word.item.kanji}
                </span>
                <span className="wod-m">{word.item.meaningVn}</span>
              </Link>
            ) : (
              <Pending lines={2} />
            )}
          </div>
        </div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Ngày</span>
            <span>của</span>
            <span>bạn</span>
          </h3>
          {viewer === "loading" && <Pending lines={2} />}
          {user && (
            <>
              <p className="lead sm">
                {WEEKDAY_LONG[now.getDay()]}, {now.getDate()}/{now.getMonth() + 1}.{" "}
                {left ? (
                  <>
                    Còn <b>{left} mục</b> nữa là xong kế hoạch hôm nay.
                  </>
                ) : (
                  <>Bạn đã xong kế hoạch hôm nay. Hẹn bạn ngày mai.</>
                )}
              </p>
              <div className="cta-row">
                {due > 0 ? (
                  <Link className="btn btn-p btn-s" href="/review">
                    Ôn {due.toLocaleString("vi-VN")} thẻ đến hạn
                    <Arrow />
                  </Link>
                ) : (
                  <Link className="btn btn-g btn-s" href="/courses">
                    Chọn bài để học
                    <Arrow />
                  </Link>
                )}
              </div>
            </>
          )}
          {guest && (
            <div className="signin">
              <p>Tạo tài khoản miễn phí để bắt đầu học và có kế hoạch, phần thưởng, chuỗi ngày của riêng bạn</p>
              <p className="sub">Các cột bên cạnh đang hiện số liệu ví dụ.</p>
              <div className="cta-row">
                <Link className="btn btn-p btn-s" href="/register?next=/">
                  Đăng ký miễn phí
                </Link>
                <Link className="btn btn-g btn-s" href="/login?next=/">
                  Đăng nhập
                </Link>
              </div>
            </div>
          )}
          <p className="note foot">
            {user
              ? "Tiến độ, lịch ôn, chuỗi ngày và Tinh thể được lưu vào tài khoản của bạn, dùng được trên mọi thiết bị."
              : "Học trên LeoEdu cần một tài khoản miễn phí: tiến độ, lịch ôn, chuỗi ngày và Tinh thể được lưu vào tài khoản, dùng được trên mọi thiết bị."}
          </p>
        </div>
      </div>

      {/* ── Kế hoạch hôm nay ── */}
      <div className="col tcol" style={{ "--c": "var(--ok)" } as CSSProperties}>
        <div className="art">{icons.plan}</div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Kế hoạch</span>
            <span>hôm nay</span>
          </h3>
          {viewer === "loading" && <Pending />}
          {user && <PlanList plan={plan} />}
          {guest && <PlanList plan={dailyPlan(SAMPLE_DAY)} sample />}
          <p className="note foot">
            Ba mục vừa sức, tự đánh dấu xong khi bạn học, không cần tích tay.
            {user && due > 0 && (
              <>
                {" "}
                Đang có <b className="num">{due.toLocaleString("vi-VN")}</b> thẻ đến hạn ôn.
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── Phần thưởng ── */}
      <div className="col tcol" style={{ "--c": "var(--warn)" } as CSSProperties}>
        <div className="art">{icons.gift}</div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Phần</span>
            <span>thưởng</span>
          </h3>
          {viewer === "loading" && <Pending />}
          {user && <Rewards balance={balance} todayXp={today.xp} xpInto={xpInto} />}
          {guest && <Rewards balance={WELCOME_GIFT + 20} todayXp={24} xpInto={4} sample />}
          <GiftSoon />
          <ChestSoon />
          <p className="note foot">
            Mỗi {XP_PER_CRYSTAL} XP thành 1 Tinh thể, dùng để gieo cây quý ở Thảo nguyên Pha Lê.{" "}
            <Link className="lnk" href="/land">
              Mở vùng đất
            </Link>
          </p>
        </div>
      </div>

      {/* ── Chuỗi ngày ── */}
      <div className="col tcol" style={{ "--c": "var(--blossom)" } as CSSProperties}>
        <div className="art">{icons.streak}</div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Chuỗi</span>
            <span>ngày</span>
          </h3>
          {viewer === "loading" && <Pending />}
          {user && <Streak streak={streak} week={week} longest={longest} todayOn={!!active[localDate(now)]} />}
          {guest && <Streak streak={5} week={sampleWeek} longest={12} todayOn={false} sample />}
          <DayOffSoon />
          <p className="note foot">Mỗi ngày có học thật (ôn thẻ, học bài hoặc làm câu hỏi) là một ngày trong chuỗi. Chỉ mở trang thì chưa tính.</p>
        </div>
      </div>
    </div>
  );
}
