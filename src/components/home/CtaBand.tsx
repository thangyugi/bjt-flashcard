import Link from "next/link";
import { InstallAppCard } from "@/components/layout/Pwa";
import { GuestOnly } from "./viewer";

/** Dải kêu gọi cuối trang: mặt trời + nét torii */
export function CtaBand() {
  return (
    <section className="final" aria-labelledby="h-final">
      <div className="l">
        <h2 className="hx h2" id="h-final">
          <span>Nét đầu tiên</span>
          <span>bắt đầu</span>
          <span>hôm nay</span>
        </h2>
        <p className="lead">Chọn một khóa, học một bài. Lịch ôn lo phần còn lại.</p>
        <div className="cta-row">
          <a className="btn btn-p" href="#khoahoc">
            Bắt đầu học miễn phí
          </a>
          <GuestOnly>
            <Link className="btn btn-g" href="/login?next=/">
              Đăng nhập
            </Link>
          </GuestOnly>
        </div>
        {/* Gợi ý cài app (chỉ hiện khi trình duyệt cho cài và người dùng chưa tắt) */}
        <div className="install">
          <InstallAppCard />
        </div>
      </div>
      <div className="r" aria-hidden>
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" focusable="false">
          <circle cx={250} cy={150} r={96} fill="#b8202f" />
          <g fill="none" stroke="#1c1917" strokeWidth={1.1} strokeLinejoin="round">
            <path d="M70 300V128M84 300V128M300 300V128M314 300V128" fill="#faf8f5" />
            <path d="M40 104C120 114 264 114 344 104L348 94C264 104 120 104 36 94Z" fill="#1c1917" />
            <path d="M52 120H332V112H52Z" fill="#1c1917" />
            <path d="M56 170H328V160H56Z" fill="#faf8f5" />
            <path d="M186 160V120M198 160V120" />
            <path d="M-20 300H420" stroke="#c8c1b8" />
            <path d="M150 150H350M250 50V250" stroke="#c8c1b8" strokeWidth={0.6} />
          </g>
        </svg>
      </div>
    </section>
  );
}
