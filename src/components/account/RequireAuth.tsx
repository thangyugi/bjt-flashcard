"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { IsoIcon, type IsoName } from "@/components/home/drawing/IsoIcon";
import { btn } from "@/components/ui/page";
import { cn } from "@/lib/utils";

/**
 * Trang mở cho khách (không cần đăng nhập). Mọi trang khác — khóa học, học bài, trắc nghiệm, ôn tập, tiến độ,
 * vùng đất, tài khoản… — đều cần tài khoản.
 */
export const PUBLIC_PATHS = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/auth/callback", "/privacy", "/offline"];

export const isPublicPath = (p: string) => PUBLIC_PATHS.includes(p.length > 1 ? p.replace(/\/+$/, "") : p);

/** Tên dễ hiểu của khu vực khách vừa định mở (hiện trên màn mời đăng nhập) */
const AREAS: [string, string][] = [
  ["/jlpt-n1", "Khóa JLPT N1"],
  ["/english", "Khóa Phát âm IPA"],
  ["/oracle-oci-ai", "Khóa OCI AI Foundations"],
  ["/bjt", "Từ vựng BJT"],
  ["/courses", "Danh sách khóa học"],
  ["/study", "Học bài"],
  ["/quiz", "Trắc nghiệm"],
  ["/review", "Ôn tập"],
  ["/progress", "Tiến độ học tập"],
  ["/land", "Vùng đất của bạn"],
  ["/account", "Tài khoản"],
  ["/phongvan", "Luyện phỏng vấn"],
];
const areaOf = (p: string) => AREAS.find(([pre]) => p === pre || p.startsWith(`${pre}/`))?.[1];

/**
 * Cổng đăng nhập dùng chung, đặt một lần trong layout gốc quanh nội dung trang (theo pathname):
 * - trang công khai: hiện ngay;
 * - đang xác định phiên (server render, lượt hydrate đầu, Supabase chưa trả lời): khung chờ trung tính —
 *   không lóe nội dung bài, cũng không lóe màn mời đăng nhập;
 * - chưa đăng nhập (hoặc bản này chưa bật tài khoản): màn "Bạn cần tài khoản để học" ngay trong khung trang;
 * - đã đăng nhập, hoặc offline mà máy còn phiên đã lưu: nội dung trang.
 * Nội dung bài là dữ liệu tĩnh công khai nên chặn phía client là đủ; HTML server của trang cần đăng nhập chỉ có khung chờ.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const hydrated = useHydrated();
  const { enabled, ready, signedIn } = useAuth();
  if (isPublicPath(pathname)) return children;
  if (!hydrated || !ready) return <GateSkeleton />;
  if (!enabled) return <AuthGate pathname={pathname} notConfigured />;
  if (!signedIn) return <AuthGate pathname={pathname} />;
  return children;
}

/** Khung chờ trung tính trong lúc xác định phiên đăng nhập */
function GateSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="page-x flex flex-col gap-6 pt-6 pb-12 sm:pt-10">
      <span className="sr-only">Đang tải…</span>
      <div className="skeleton h-4 w-40" />
      <div className="skeleton h-12 w-[min(560px,90%)]" />
      <div className="skeleton h-4 w-[min(640px,80%)]" />
      <div className="skeleton h-4 w-[min(520px,70%)]" />
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-28" />
        ))}
      </div>
    </div>
  );
}

const REASONS: { icon: IsoName; title: string; text: string }[] = [
  { icon: "plan", title: "Tiến độ từng bài", text: "Bài đã học, điểm trắc nghiệm và chỗ bạn đang học dở." },
  { icon: "streak", title: "Lịch ôn và chuỗi ngày", text: "Thẻ ôn quay lại đúng lúc bạn sắp quên; ngày học nối thành chuỗi." },
  { icon: "gift", title: "Tinh thể và vùng đất", text: "XP đổi thành Tinh thể để gieo cây ở Thảo nguyên Pha Lê." },
];

/** Màn "Bạn cần tài khoản để học": lý do, Đăng ký miễn phí (chính) và Đăng nhập, cả hai quay lại đúng trang này */
export function AuthGate({ pathname, notConfigured }: { pathname: string; notConfigured?: boolean }) {
  // Đã hydrate: đọc được cả query và #neo của địa chỉ hiện tại
  const here = typeof window === "undefined" ? pathname : `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const next = encodeURIComponent(here);
  const area = areaOf(pathname);
  return (
    <div className="page-x pt-6 pb-12 sm:pt-10 sm:pb-16">
      <section
        aria-labelledby="gate-title"
        className="col-rules -mt-6 grid border-b border-line-strong sm:-mt-10 lg:min-h-[calc(100dvh-var(--header-h)-1px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <div className="rule-pad flex flex-col justify-center gap-6 py-10 sm:py-14 lg:pr-12">
          <p className="eyebrow-label flex flex-wrap items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
            {area ? `${area} · cần tài khoản` : "Cần tài khoản"}
          </p>
          <h1 id="gate-title" className="hx-title text-[clamp(34px,4.6vw,64px)]">
            <span className="block">Bạn cần</span>
            <span className="block">tài khoản</span>
            <span className="block">để học</span>
          </h1>
          <p className="max-w-[56ch] text-[16px] leading-[1.65] text-ink-2">
            Mọi bài học, trắc nghiệm và ôn tập trên LeoEdu đều gắn với tài khoản của bạn: tiến độ, lịch ôn, chuỗi ngày và Tinh thể được lưu vào tài
            khoản và đi theo bạn trên mọi thiết bị. Tạo tài khoản miễn phí, mất chưa tới một phút.
          </p>
          {notConfigured ? (
            <p role="status" className="max-w-[56ch] panel bg-surface px-4 py-3 text-[14px] leading-relaxed text-ink-2">
              Bản LeoEdu này chưa kết nối máy chủ tài khoản nên chưa đăng ký hay đăng nhập được. Quản trị viên cần đặt NEXT_PUBLIC_SUPABASE_URL và
              NEXT_PUBLIC_SUPABASE_ANON_KEY.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`/register?next=${next}`} className={btn.primary}>
                Đăng ký miễn phí
              </Link>
              <Link href={`/login?next=${next}`} className={btn.ghost}>
                Đăng nhập
              </Link>
            </div>
          )}
          <p className="text-[13.5px] text-ink-3">
            Chưa sẵn sàng?{" "}
            <Link href="/#khoahoc" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink-3">
              Xem các khóa học ở trang chủ
            </Link>
          </p>
        </div>

        <aside className="flex flex-col justify-center gap-6 border-t border-line-strong py-10 lg:border-t-0 lg:border-l lg:bg-paper lg:py-14 lg:pl-[clamp(16px,2vw,32px)]">
          <GateFigure />
          <div className="flex flex-col gap-3">
            <p className="eyebrow-label">Được lưu vào tài khoản</p>
            <ul className="cells grid-cols-1">
              {REASONS.map((r) => (
                <li key={r.title} className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4 px-4 py-3.5 sm:grid-cols-[92px_minmax(0,1fr)]">
                  <span className="block h-[56px] sm:h-[68px] [&_svg]:h-full [&_svg]:w-full" aria-hidden>
                    <IsoIcon name={r.icon} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <b className="text-[15px] text-ink">{r.title}</b>
                    <span className="text-[13.5px] leading-relaxed text-ink-3">{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}

/** Hình nét mảnh: cuốn sách mở có ổ khóa, mặt trời đỏ phía sau (cùng ngôn ngữ với dải cuối trang chủ) */
function GateFigure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 170" className={cn("h-auto w-full max-w-[420px]", className)} aria-hidden focusable="false">
      <circle cx={214} cy={70} r={46} fill="#b8202f" />
      <g fill="none" stroke="#1c1917" strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round">
        <path d="M0 150H320" stroke="#c8c1b8" />
        <path d="M40 140C80 128 124 128 160 140V58C124 46 80 46 40 58Z" fill="#faf8f5" />
        <path d="M280 140C240 128 196 128 160 140V58C196 46 240 46 280 58Z" fill="#faf8f5" />
        <path d="M58 74C86 66 116 66 144 74M58 90C86 82 116 82 144 90M58 106C86 98 116 98 144 106M58 122C86 114 116 114 144 122" stroke="#c8c1b8" />
        <path d="M176 74C204 66 234 66 262 74M176 90C204 82 234 82 262 90" stroke="#c8c1b8" />
        <rect x={198} y={98} width={40} height={32} rx={3} fill="#faf8f5" />
        <path d="M206 98V88a12 12 0 0 1 24 0v10" />
        <circle cx={218} cy={112} r={3.2} fill="#1c1917" />
        <path d="M218 115v7" />
      </g>
    </svg>
  );
}
