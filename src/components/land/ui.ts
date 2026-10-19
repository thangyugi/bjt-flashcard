/** Lớp "kính mờ" của các lớp phủ trên khung cảnh (giữ đúng giao diện bản mẫu Thảo nguyên Pha Lê) */
export const GLASS = "border border-white/10 bg-[rgba(20,18,28,0.62)] text-[#f5f1ea] backdrop-blur-[14px] rounded-[14px]";
/** Chữ phụ trên nền kính */
export const GLASS_INK_2 = "text-[#cfc6bb]";
/** Nút nhỏ trên nền kính */
export const GLASS_BTN =
  "rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[12.5px] font-semibold text-[#f5f1ea] hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f1ea] disabled:cursor-default disabled:opacity-55";
/** Viên ngọc Tinh thể */
export const GEM_STYLE = {
  background: "linear-gradient(160deg,#c9b6ff,#7fe3da)",
  clipPath: "polygon(50% 0,100% 30%,80% 100%,20% 100%,0 30%)",
} as const;
