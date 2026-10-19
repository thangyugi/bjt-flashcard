"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useDue } from "@/hooks/useDue";
import { computeStreak, emptyDay, localDate, longestStreak, useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance, totalXp, WELCOME_GIFT, XP_PER_CRYSTAL } from "@/lib/land/economy";
import { dailyPlan } from "@/lib/land/plan";
import { cn } from "@/lib/utils";
import { useViewer } from "./viewer";
import { useWordOfDay } from "./vocab";
import { Arrow, Gem } from "./icons";

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

/**
 * Dải "Hôm nay": Ngày của bạn · Kế hoạch hôm nay · Phần thưởng · Chuỗi ngày.
 * Mọi số liệu lấy từ hoạt động học thật (activity-store) và vùng đất (land-store); khách thấy phần giới thiệu.
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
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return { key: localDate(d), label: WEEKDAY_SHORT[d.getDay()], today: i === 6, on: !!active[localDate(d)] };
  });
  const user = viewer === "user";
  const guest = viewer === "guest";

  return (
    <div className="cols c4 today" aria-busy={viewer === "loading"}>
      <span className="edge-tab" aria-hidden />

      {/* ── Ngày của bạn ── */}
      <div className="col">
        <div className="art">
          <div className="wod">
            <p className="wod-lbl">
              Từ của hôm nay{" "}
              <span className="mincho" lang="ja">
                一日一語
              </span>
            </p>
            {viewer !== "loading" && word ? (
              <Link href={`/study/${word.group.id}`} className="wod-word" aria-label={`Từ của hôm nay: ${word.item.kanji}, ${word.item.meaningVn}. Học nhóm ${word.group.name}`}>
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
              <p>Đăng nhập để lập kế hoạch và giữ chuỗi ngày</p>
              <div className="cta-row">
                <Link className="btn btn-p btn-s" href="/login?next=/">
                  Đăng nhập
                </Link>
                <Link className="btn btn-g btn-s" href="/register?next=/">
                  Tạo tài khoản
                </Link>
              </div>
            </div>
          )}
          <p className="note foot">Mọi bài học đều mở để xem miễn phí. Tài khoản giúp lưu tiến độ, chuỗi ngày và Tinh thể trên mọi thiết bị.</p>
        </div>
      </div>

      {/* ── Kế hoạch hôm nay ── */}
      <div className="col">
        <div className="art">{icons.plan}</div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Kế hoạch</span>
            <span>hôm nay</span>
          </h3>
          {viewer === "loading" && <Pending />}
          {user && (
            <div className="stack">
              <div className="row">
                <span>
                  <b className="num">
                    {plan.done}/{plan.tasks.length}
                  </b>{" "}
                  mục đã xong
                </span>
                <span className="num">{Math.round((100 * plan.done) / plan.tasks.length)}%</span>
              </div>
              <div
                className="meter"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={plan.tasks.length}
                aria-valuenow={plan.done}
                aria-label={`Đã xong ${plan.done} trên ${plan.tasks.length} mục`}
              >
                <span style={{ width: `${(100 * plan.done) / plan.tasks.length}%` }} />
              </div>
              <ul className="plan">
                {plan.tasks.map((t) => (
                  <li key={t.id}>
                    <Link href={t.href} className={cn("chk", t.done && "done")}>
                      <span className="box" aria-hidden />
                      <span className="t">
                        {t.label}
                        <span className="sr-only">{t.done ? " — đã xong" : ` — ${t.cta}`}</span>
                      </span>
                      <span className="m">
                        {Math.min(t.value, t.goal)}/{t.goal} {t.unit}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guest && (
            <div className="gdesc">
              <p>Kế hoạch mỗi ngày:</p>
              <ul>
                {plan.tasks.map((t) => (
                  <li key={t.id}>{t.label}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="note foot">
            Các mục tự đánh dấu xong khi bạn học, không cần tích tay.
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
      <div className="col">
        <div className="art">{icons.gift}</div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Phần</span>
            <span>thưởng</span>
          </h3>
          {viewer === "loading" && <Pending />}
          {user && (
            <div className="stack">
              <div className="kv">
                <span>Tinh thể</span>
                <span className="v">
                  <Gem />
                  <span className="num">{balance.toLocaleString("vi-VN")}</span>
                </span>
                <span>Hôm nay</span>
                <span className="v sm num">+{today.xp} XP</span>
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
              <div className="soon-row">
                <span>Quà hôm nay · Rương hiếm 7 ngày</span>
                <span className="tag">Sắp ra mắt</span>
              </div>
            </div>
          )}
          {guest && (
            <div className="gdesc">
              <p>
                Mỗi {XP_PER_CRYSTAL} XP học được thành 1 Tinh thể. Lần đầu mở vùng đất, bạn được tặng {WELCOME_GIFT} Tinh thể để gieo cây đầu tiên.
              </p>
            </div>
          )}
          <p className="note foot">
            Tinh thể dùng để gieo cây quý ở Thảo nguyên Pha Lê.{" "}
            <Link className="lnk" href="/land">
              Mở vùng đất
            </Link>
          </p>
        </div>
      </div>

      {/* ── Chuỗi ngày ── */}
      <div className="col">
        <div className="art">{icons.streak}</div>
        <div className="cbody">
          <h3 className="hx h3">
            <span>Chuỗi</span>
            <span>ngày</span>
          </h3>
          {viewer === "loading" && <Pending />}
          {user && (
            <div className="stack lg">
              <p className="streak-n">
                <b className="num">{streak}</b> ngày liên tiếp
              </p>
              <ol className="week" aria-label="7 ngày gần nhất">
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
                <span>{active[localDate(now)] ? "Hôm nay đã học" : "Hôm nay chưa học"}</span>
              </div>
            </div>
          )}
          {guest && (
            <div className="gdesc">
              <p>Mỗi ngày có học thật (ôn thẻ, học bài hoặc làm câu hỏi) là một ngày trong chuỗi. Bỏ một ngày thì chuỗi bắt đầu lại.</p>
            </div>
          )}
          <p className="note foot">Chỉ mở trang thì chưa tính; cần ôn thẻ, học bài hoặc làm câu hỏi.</p>
        </div>
      </div>
    </div>
  );
}
