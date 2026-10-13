/** Nhân vật của câu chuyện xuyên suốt khóa ngữ pháp N1 — "Một năm ở Tokyo của Mai". */
export interface N1Character {
  id: string;
  name: string;
  nameVi: string;
  role: string;
  /** Tính cách — cũng là "móc nhớ" cho các mẫu ngữ pháp hay gắn với nhân vật */
  trait: string;
  emoji: string;
}

export const CHARACTERS: N1Character[] = [
  {
    id: "mai",
    name: "マイ",
    nameVi: "Mai",
    role: "Nhân vật chính · 25 tuổi, người Việt, nhân viên mới phòng Marketing của さくら商事",
    trait: "Chăm chỉ, tò mò, hay ghi chép. Qua từng chương, tiếng Nhật của Mai lên dần tới N1.",
    emoji: "🌸",
  },
  {
    id: "sato",
    name: "佐藤先輩",
    nameVi: "Chị Satō",
    role: "Đàn chị hướng dẫn Mai",
    trait: "Giỏi giang, điềm tĩnh, ngoài giờ còn vẽ tranh. Luôn có câu trả lời đúng lúc.",
    emoji: "🎨",
  },
  {
    id: "kenta",
    name: "健太",
    nameVi: "Kenta",
    role: "Đồng nghiệp cùng đợt với Mai",
    trait: "Vui tính, ăn nhanh, hay trì hoãn — nhân vật của mọi câu \"phàn nàn\" (〜ときたら, 〜始末だ…).",
    emoji: "🍙",
  },
  {
    id: "tanaka",
    name: "田中部長",
    nameVi: "Trưởng phòng Tanaka",
    role: "Sếp của phòng Marketing",
    trait: "Nghiêm khắc, nói năng trang trọng — nhân vật của văn phong cứng (〜をもって, 〜たるもの…).",
    emoji: "👔",
  },
  {
    id: "yamamoto",
    name: "山本さん",
    nameVi: "Bà Yamamoto",
    role: "Bà chủ nhà trọ của Mai",
    trait: "Hiền hậu, nói chuyện như người xưa, kể nhiều câu chuyện cũ của Tokyo.",
    emoji: "🍵",
  },
];
