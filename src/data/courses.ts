/** Danh sách khóa học hiển thị ở trang /courses và trang chủ. */
export interface CourseCard {
  id: string;
  href: string;
  /** Chữ lớn trên ảnh bìa */
  mark: string;
  kicker: string;
  title: string;
  desc: string;
  tags: string[];
  /** Màu nền ảnh bìa */
  tone: "red" | "ink" | "amber" | "blue" | "clay";
}

export const COURSES: CourseCard[] = [
  {
    id: "english",
    href: "/english",
    mark: "Aa",
    kicker: "English · IPA",
    title: "Tiếng Anh",
    desc: "Bắt đầu với phát âm chuẩn IPA: 44 âm, cách đặt miệng, nghe mẫu, cặp từ dễ nhầm, câu chuyện, luyện tập 3 cấp độ và ôn tập ngắt quãng.",
    tags: ["Phát âm IPA", "20 bài", "Luyện nghe"],
    tone: "blue",
  },
  {
    id: "jlpt-n1",
    href: "/jlpt-n1",
    mark: "N1",
    kicker: "日本語能力試験",
    title: "JLPT N1",
    desc: "Ngữ pháp Shinkanzen N1 kể thành truyện \"Một năm ở Tokyo của Mai\": furigana đầy đủ, so sánh mẫu gần nghĩa, mẹo nhớ và trắc nghiệm nhiều dạng.",
    tags: ["Ngữ pháp", "20 chương", "Tiếng Nhật"],
    tone: "red",
  },
  {
    id: "oci-ai",
    href: "/oracle-oci-ai",
    mark: "AI",
    kicker: "Oracle Cloud Infrastructure",
    title: "OCI AI Foundations",
    desc: "AI, Machine Learning, Generative AI và dịch vụ AI trên Oracle Cloud bằng tiếng Việt — có sơ đồ, câu hỏi luyện tập và đề thi thử.",
    tags: ["Chứng chỉ 1Z0-1122", "Luyện đề", "Tiếng Việt"],
    tone: "ink",
  },
  {
    id: "ccar-p",
    href: "/claude-ccar-p",
    mark: "CA",
    kicker: "Anthropic · Claude",
    title: "Claude Certified Architect – Professional",
    desc: "Ôn thi CCAR-P bằng tiếng Việt: 7 domain, 38 task statement, mỗi bài ba lớp Hiểu nhanh · Cách chọn khi làm đề · Cần thuộc, ngân hàng câu hỏi có giải thích và đề thi thử 63 câu.",
    tags: ["Chứng chỉ CCAR-P", "Luyện đề", "Tiếng Việt"],
    tone: "clay",
  },
  {
    id: "bjt",
    href: "/bjt",
    mark: "語",
    kicker: "Business Japanese Test",
    title: "Từ vựng BJT",
    desc: "Flashcard từ vựng tiếng Nhật thương mại theo chủ đề, câu ví dụ có furigana và trắc nghiệm.",
    tags: ["Flashcard", "Từ vựng", "Công sở"],
    tone: "amber",
  },
];
