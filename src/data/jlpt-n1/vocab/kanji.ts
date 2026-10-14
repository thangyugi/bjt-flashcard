import type { KanjiInfo } from "./types";

/** Chữ Hán của Bài 1. Các bài sau khai báo chữ Hán mới ngay trong file bài (export kanji), gộp ở index.ts. */
export const KANJI_BASE: Record<string, KanjiInfo> = {
  // ── Bài 1 ──
  青: { hv: "THANH", m: "xanh", memo: "Mầm cây (龶) trên mặt trăng (月) — màu xanh non." },
  春: { hv: "XUÂN", m: "mùa xuân", memo: "Ba nét cỏ + mặt trời (日) — nắng xuân làm cỏ mọc." },
  晩: { hv: "VÃN", m: "buổi tối, muộn", memo: "日 (mặt trời) + 免 (thoát đi) — mặt trời đã đi mất." },
  年: { hv: "NIÊN", m: "năm, tuổi" },
  葬: { hv: "TÁNG", m: "chôn cất", memo: "Thi thể (死) nằm giữa cỏ (艹) trên dưới — mai táng." },
  式: { hv: "THỨC", m: "nghi thức, kiểu" },
  世: { hv: "THẾ", m: "đời, thế gian" },
  帯: { hv: "ĐỚI", m: "đai, vùng", memo: "Chiếc đai thắt ngang người — 地帯 (vùng), 世帯 (hộ)." },
  間: { hv: "GIAN", m: "khoảng giữa", memo: "Mặt trời (日) lọt qua khe cửa (門)." },
  庶: { hv: "THỨ", m: "đông đúc, dân thường" },
  民: { hv: "DÂN", m: "dân" },
  片: { hv: "PHIẾN", m: "mảnh, một phía", memo: "Một nửa thân cây bị chẻ dọc." },
  言: { hv: "NGÔN", m: "lời nói" },
  夜: { hv: "DẠ", m: "đêm" },
  更: { hv: "CANH", m: "canh (đêm), thay đổi", memo: "更ける = đêm về khuya; 変更 = thay đổi." },
  家: { hv: "GIA", m: "nhà", memo: "Con lợn (豕) dưới mái nhà (宀)." },
  出: { hv: "XUẤT", m: "ra" },
  戸: { hv: "HỘ", m: "cửa (một cánh)" },
  締: { hv: "ĐẾ", m: "siết, thắt, khóa", memo: "糸 (sợi chỉ) + 帝 — siết chặt dây." },
  顔: { hv: "NHAN", m: "mặt" },
  身: { hv: "THÂN", m: "thân mình", memo: "Hình người phụ nữ mang thai nhìn nghiêng." },
  回: { hv: "HỒI", m: "vòng, quay" },
  振: { hv: "CHẤN", m: "vung, lắc", memo: "扌(tay) + 辰 — tay vung lên." },
};
