/** Tiến độ từng khóa (dùng chung cho trang Tiến độ và trang chủ). */

export interface CourseLessons {
  key: string;
  title: string;
  /** Mã bài (lessonKey) của khóa, theo public/data/learning-items.json */
  lessons: string[];
}

export interface CourseProgress {
  key: string;
  title: string;
  done: number;
  total: number;
  unit: string;
  pct: number;
}

/**
 * Khóa thường: số bài đã học xong / tổng số bài.
 * BJT: số thẻ đã thuộc / tổng số thẻ (flashcard không có "bài xong").
 */
export function courseProgress(course: CourseLessons, doneKeys: Set<string>, bjt: { known: number; total: number }): CourseProgress {
  const isBjt = course.key === "bjt";
  const done = isBjt ? bjt.known : course.lessons.filter((l) => doneKeys.has(l)).length;
  const total = isBjt ? bjt.total : course.lessons.length;
  return { key: course.key, title: course.title, done, total, unit: isBjt ? "từ đã thuộc" : "bài", pct: total ? Math.round((100 * done) / total) : 0 };
}
