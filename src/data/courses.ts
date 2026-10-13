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
  tone: "red" | "ink" | "amber";
}

export const COURSES: CourseCard[] = [
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
    id: "bjt",
    href: "/study",
    mark: "語",
    kicker: "Business Japanese Test",
    title: "Từ vựng BJT",
    desc: "Flashcard từ vựng tiếng Nhật thương mại theo chủ đề, câu ví dụ có furigana và trắc nghiệm.",
    tags: ["Flashcard", "Từ vựng", "Công sở"],
    tone: "amber",
  },
];
