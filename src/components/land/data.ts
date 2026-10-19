/**
 * Dữ liệu Sổ tay thực vật của "Thảo nguyên Pha Lê" — dùng chung cho giao diện React và engine.
 * Không import three: giao diện đọc file này mà không kéo theo three.js.
 */

export interface Rarity {
  n: string;
  c: string;
  /** Giá gieo (Tinh thể) */
  cost: number;
}

export const RAR: Rarity[] = [
  { n: "Thường", c: "#9aa3ad", cost: 10 },
  { n: "Hiếm", c: "#b87333", cost: 25 },
  { n: "Quý", c: "#8b6fd6", cost: 45 },
  { n: "Huyền thoại", c: "#c9a227", cost: 80 },
];

export interface SpeciesInfo {
  id: string;
  vn: string;
  sci: string;
  origin: string;
  rar: number;
  fact: string;
  /** Hệ số phóng to khi đặt lên đất */
  scale: number;
  /** Góc nhìn nghiêng của ảnh thu nhỏ */
  el: number;
  /** Loài tưởng tượng (không có ngoài đời) */
  imag?: boolean;
  /** Vẽ bằng hòa trộn cộng (phát sáng) */
  add?: boolean;
  /** Cây thường (công viên) */
  tree?: boolean;
  /** Có cánh hoa rơi */
  petals?: boolean;
}

export const SPECIES: SpeciesInfo[] = [
  { id: "lanhai", vn: "Lan hài Việt Nam", sci: "Paphiopedilum vietnamense", origin: "Việt Nam", rar: 3, fact: "Được mô tả năm 1999, chỉ mọc tự nhiên ở Việt Nam và gần như biến mất ngoài tự nhiên vì bị khai thác.", scale: 1.9, el: 0.35 },
  { id: "rafflesia", vn: "Hoa Rafflesia", sci: "Rafflesia arnoldii", origin: "Sumatra, Borneo", rar: 2, fact: "Bông hoa đơn lớn nhất thế giới, rộng tới khoảng 1 m; không có lá, thân hay rễ, sống ký sinh trên dây leo.", scale: 1.45, el: 0.95 },
  { id: "welwitschia", vn: "Welwitschia", sci: "Welwitschia mirabilis", origin: "Sa mạc Namib", rar: 2, fact: "Cả đời chỉ có hai chiếc lá, lá mọc dài mãi; có cây sống hơn 1.000 năm.", scale: 1.4, el: 0.9 },
  { id: "middlemist", vn: "Trà Middlemist Red", sci: "Camellia japonica 'Middlemist's Red'", origin: "Từ Trung Quốc, 1804", rar: 3, fact: "Chỉ còn hai cây được biết đến: ở Chiswick House (London) và Waitangi (New Zealand).", scale: 1.5, el: 0.35 },
  { id: "lanma", vn: "Lan ma", sci: "Dendrophylax lindenii", origin: "Florida, Cuba", rar: 1, fact: "Gần như không có lá, quang hợp bằng rễ; hoa trắng như lơ lửng trong không khí.", scale: 1.45, el: 0.2 },
  { id: "mongcop", vn: "Móng cọp ngọc", sci: "Strongylodon macrobotrys", origin: "Philippines", rar: 1, fact: "Hoa màu ngọc lam hiếm thấy, chùm hoa buông dài tới khoảng 3 m, thụ phấn nhờ dơi.", scale: 1.4, el: 0.25 },
  { id: "huyetrong", vn: "Huyết rồng Socotra", sci: "Dracaena cinnabari", origin: "Đảo Socotra (Yemen)", rar: 2, fact: "Tán hình chiếc ô; nhựa đỏ như máu nên được gọi là 'máu rồng'.", scale: 1.6, el: 0.25 },
  { id: "xacthoi", vn: "Hoa xác thối", sci: "Amorphophallus titanum", origin: "Sumatra", rar: 3, fact: "Cụm hoa không phân nhánh lớn nhất thế giới, cao khoảng 3 m; nhiều năm mới nở và chỉ mở 24–48 giờ.", scale: 1.3, el: 0.3 },
  { id: "sanho", vn: "Cây san hô trời", sci: "Caelocorallium aurorae", origin: "Thảo nguyên Pha Lê", rar: 1, imag: true, fact: "Mọc trên sườn đá pha lê; đầu cành sáng lên màu xanh ngọc mỗi khi hoàng hôn buông, như san hô dưới một đại dương trên trời.", scale: 1.45, el: 0.25 },
  { id: "thuytinh", vn: "Hoa thủy tinh", sci: "Vitriflora prisma", origin: "Thảo nguyên Pha Lê", rar: 0, imag: true, add: true, fact: "Cánh hoa trong như thủy tinh, bẻ ánh hoàng hôn thành một dải cầu vồng nhỏ trải trên mặt đất.", scale: 1.8, el: 0.4 },
  // Cây thường (công viên)
  { id: "anhdao", vn: "Hoa anh đào", sci: "Prunus serrulata", origin: "Nhật Bản, Trung Quốc, Hàn Quốc", rar: 0, tree: true, fact: "Mỗi mùa xuân hoa chỉ nở rộ khoảng 1–2 tuần; ở Nhật Bản, đi ngắm hoa anh đào được gọi là hanami.", scale: 1.05, el: 0.25, petals: true },
  { id: "thong", vn: "Thông ba lá", sci: "Pinus kesiya", origin: "Đông Nam Á, Tây Nguyên Việt Nam", rar: 0, tree: true, fact: "Lá kim mọc thành bó ba chiếc; đây là loài thông tạo nên những đồi thông quen thuộc của Đà Lạt.", scale: 1.05, el: 0.2 },
  { id: "phong", vn: "Phong đỏ", sci: "Acer palmatum", origin: "Nhật Bản, Hàn Quốc, Trung Quốc", rar: 0, tree: true, fact: "Lá xẻ thùy như bàn tay, chuyển đỏ rực vào mùa thu; ở Nhật Bản, đi ngắm lá đỏ được gọi là momijigari.", scale: 1.05, el: 0.3 },
  { id: "lieu", vn: "Liễu rủ", sci: "Salix babylonica", origin: "Miền bắc Trung Quốc", rar: 0, tree: true, fact: "Dù tên khoa học nhắc tới Babylon, loài liễu này có nguồn gốc từ miền bắc Trung Quốc; ưa mọc ven hồ, ven sông.", scale: 1.05, el: 0.2 },
  { id: "tre", vn: "Tre", sci: "Bambusoideae (phân họ Tre)", origin: "Châu Á nhiệt đới", rar: 0, tree: true, fact: "Tre thuộc họ Hòa thảo, tức là họ hàng của cỏ; một số loài tre có thể cao thêm gần 1 m chỉ trong một ngày.", scale: 1.0, el: 0.15 },
  { id: "bachduong", vn: "Bạch dương", sci: "Betula pendula", origin: "Châu Âu, Bắc Á", rar: 0, tree: true, fact: "Vỏ cây trắng nhờ chất betulin và bong ra thành từng lớp mỏng như giấy.", scale: 1.05, el: 0.15 },
  { id: "phuong", vn: "Phượng vĩ", sci: "Delonix regia", origin: "Madagascar", rar: 0, tree: true, fact: "Có nguồn gốc từ Madagascar; hoa đỏ rực nở vào đầu hè nên gắn với mùa thi của học trò Việt Nam.", scale: 1.0, el: 0.3 },
];

export const SP: Record<string, SpeciesInfo> = Object.fromEntries(SPECIES.map((s) => [s.id, s]));

export interface CreatureInfo {
  id: string;
  vn: string;
  sub: string;
  fact: string;
}

export const CREATURES: CreatureInfo[] = [
  { id: "mochi", vn: "Mochi", sub: "Cáo mây", fact: "Bộ lông như mây, đi đến đâu cũng để lại vài sợi sương; tò mò và hay lẽo đẽo theo Lữ khách một quãng." },
  { id: "bot", vn: "Bọt", sub: "Rùa biển sao", fact: "Trên mai có một ngôi sao phát sáng; quẫy chân chèo quanh ao và thỉnh thoảng bò lên tảng đá giữa ao để sưởi nắng." },
  { id: "tho", vn: "Thỏ tai sương", sub: "Ba con, sống ở đồng cỏ", fact: "Gặm cỏ sương lúc chiều; đuôi trắng hơi sáng lên trong đêm. Nghe tiếng chân chạy là nhảy vụt đi." },
  { id: "buom", vn: "Bướm lụa", sub: "Sáu con", fact: "Cánh mỏng như lụa, bay từ khóm hoa này sang khóm hoa khác và đậu lại hút mật." },
  { id: "chuon", vn: "Chuồn chuồn pha lê", sub: "Ba con, quanh ao", fact: "Cánh mỏng như lát pha lê; lơ lửng trên mặt nước rồi lao vút đi trong chớp mắt." },
  { id: "chim", vn: "Chim én mây", sub: "Một đàn bay ngang trời", fact: "Bay thành đàn, giữ khoảng cách với nhau và cùng đổi hướng như một làn khói." },
];

export const CR: Record<string, CreatureInfo> = Object.fromEntries(CREATURES.map((c) => [c.id, c]));

/** Số ô đất trồng cây quý trên cao nguyên */
export const PLOT_COUNT = 8;

export const STAGES = ["Hạt", "Mầm", "Ra lá", "Ra hoa"] as const;
export const stageOf = (g: number) => (g < 0.15 ? STAGES[0] : g < 0.45 ? STAGES[1] : g < 0.75 ? STAGES[2] : STAGES[3]);

/** Bỏ dấu tiếng Việt để tìm kiếm */
export const foldVi = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
