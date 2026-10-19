/** Biểu tượng nét nhỏ của trang chủ (trang trí, aria-hidden) */

export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden focusable="false">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLong() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden focusable="false">
      <path d="M3 9h11M10 5l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Tinh thể */
export function Gem() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden focusable="false">
      <path d="M8 1.5l4.5 5L8 14.5 3.5 6.5z" fill="#fbedee" stroke="#1c1917" strokeWidth={1.1} strokeLinejoin="round" />
      <path d="M3.5 6.5h9M8 1.5v13" stroke="#1c1917" strokeWidth={0.8} />
    </svg>
  );
}

export function Lock() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden focusable="false">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth={1.3} />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </svg>
  );
}
