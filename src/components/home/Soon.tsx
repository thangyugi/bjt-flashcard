import type { ReactNode } from "react";

/*
 * Các tính năng phần thưởng chưa làm (Quà hôm nay, Rương hiếm 7 ngày, Ngày nghỉ):
 * nội dung giới thiệu viết sẵn + hình nét nhỏ, gắn nhãn "Sắp ra mắt". Không có dữ liệu thật.
 */

const DRAW = "#9b948c";
const INK = "#1c1917";
const PAPER = "#faf8f5";
const SOFT = "#fbedee";
const BRAND = "#b8202f";

/** Hộp quà nét mảnh (nắp, ruy băng, nơ) */
function GiftBox() {
  return (
    <svg viewBox="0 0 64 56" aria-hidden focusable="false" className="soon-ico">
      <g fill="none" stroke={DRAW} strokeWidth={1.1} strokeLinejoin="round" strokeLinecap="round">
        <path d="M10 26h44v26H10z" fill={PAPER} />
        <path d="M7 18h50v8H7z" fill={PAPER} />
        <path d="M28 18v34M36 18v34" stroke={INK} />
        <path d="M28 18c-4-8-14-10-14-4 0 4 8 4 14 4zM36 18c4-8 14-10 14-4 0 4-8 4-14 4z" fill={SOFT} stroke={INK} />
        <path d="M18 34l3 3M44 38l3-3" />
      </g>
    </svg>
  );
}

/** Đường 7 chặng tới rương: `n` chặng đầu đã tô (ví dụ minh họa) */
function ChestTrack({ n }: { n: number }) {
  const xs = Array.from({ length: 7 }, (_, i) => 10 + i * 26);
  return (
    <svg viewBox="0 0 232 44" aria-hidden focusable="false" className="soon-track">
      <path d={`M${xs[0]} 22H${xs[6]}`} stroke={DRAW} strokeWidth={1} strokeDasharray="3 3" />
      <path d={`M${xs[0]} 22H${xs[n - 1]}`} stroke={INK} strokeWidth={1.4} />
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={22} r={6.5} fill={i < n ? INK : PAPER} stroke={i < n ? INK : DRAW} strokeWidth={1.1} />
          {i < n && <path d={`M${x - 3} 22l2 2 4-4.5`} fill="none" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
      <g fill="none" stroke={INK} strokeWidth={1.1} strokeLinejoin="round">
        <path d="M200 20h26v16h-26z" fill={PAPER} />
        <path d="M200 20c0-8 26-8 26 0" fill={SOFT} />
        <path d="M210 24h6v5h-6z" fill={BRAND} stroke={BRAND} />
      </g>
    </svg>
  );
}

/** Hai thẻ Ngày nghỉ (vầng trăng: ngày được nghỉ mà chuỗi vẫn giữ) */
function DayOffTokens() {
  return (
    <svg viewBox="0 0 64 30" aria-hidden focusable="false" className="soon-tokens">
      {[15, 47].map((cx) => (
        <g key={cx} fill="none" stroke={INK} strokeWidth={1.1}>
          <circle cx={cx} cy={15} r={12} fill={PAPER} />
          <path d={`M${cx + 2} 8a7 7 0 1 0 4 12a6 6 0 1 1 -4 -12z`} fill={SOFT} strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

function SoonBlock({ art, title, children }: { art: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="soon-card">
      <div className="soon-head">
        <b>{title}</b>
        <span className="tag soon-tag">Sắp ra mắt</span>
      </div>
      <div className="soon-body">
        {art}
        <div className="soon-text">{children}</div>
      </div>
    </div>
  );
}

export function GiftSoon() {
  return (
    <SoonBlock title="Quà hôm nay" art={<GiftBox />}>
      <p>Hoàn thành kế hoạch để mở quà: Tinh thể, hạt giống hiếm.</p>
    </SoonBlock>
  );
}

export function ChestSoon() {
  return (
    <div className="soon-card">
      <div className="soon-head">
        <b>Rương hiếm 7 ngày</b>
        <span className="tag soon-tag">Sắp ra mắt</span>
      </div>
      <ChestTrack n={5} />
      <div className="soon-cap">
        <span className="tag ex-tag">Ví dụ</span>
        <span>5/7 ngày giữ kế hoạch. Đủ 7 ngày liền thì mở rương.</span>
      </div>
    </div>
  );
}

export function DayOffSoon() {
  return (
    <SoonBlock title="Ngày nghỉ" art={<DayOffTokens />}>
      <p>Mỗi tháng có 2 Ngày nghỉ. Lỡ một ngày, Ngày nghỉ tự dùng để chuỗi không bị mất.</p>
    </SoonBlock>
  );
}
