/** Danh sách vùng đất cho thanh chuyển vùng (không import three) */
export interface WorldEntry {
  id: string;
  href: string;
  name: string;
  /** một dòng mô tả */
  desc: string;
  /** ảnh thu nhỏ; không có thì dùng nền màu */
  thumb?: string;
  swatch?: string;
}

export const WORLDS: WorldEntry[] = [
  {
    id: "pha-le",
    href: "/land",
    name: "Thảo nguyên Pha Lê",
    desc: "Cao nguyên chấm sáng giữa trời — nơi gieo cây quý bằng Tinh thể.",
    swatch: "radial-gradient(120% 80% at 20% 110%,rgba(255,170,110,.6),transparent 60%),linear-gradient(180deg,#072b2a,#0d3b37 55%,#7a5a48)",
  },
  {
    id: "bon-mua",
    href: "/land/bon-mua",
    name: "Thung lũng Bốn Mùa",
    desc: "Thung lũng tròn bốn góc bốn mùa, suối xoắn ốc và tàu chạy vòng.",
    thumb: "/land/maps/bon-mua-thumb.webp",
  },
];

export const worldById = (id: string) => WORLDS.find((w) => w.id === id) ?? WORLDS[0];
