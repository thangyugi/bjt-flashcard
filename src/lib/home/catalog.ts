import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ItemIndex } from "@/lib/learning/items";
import type { CourseLessons } from "@/lib/learning/progress";

/**
 * Số liệu thật cho trang chủ, đọc lúc build từ public/data/learning-items.json
 * (sinh bởi scripts/build-catalog.ts qua predev/prebuild). Trang chủ là trang tĩnh nên file chỉ đọc một lần khi build.
 */
export interface HomeCatalog {
  totals: { courses: number; lessons: number; items: number };
  /** Mã bài từng khóa, để tính % hoàn thành phía client */
  courses: CourseLessons[];
  n1: { chapters: number; patterns: number; vocabLessons: number; words: number };
  english: { lessons: number; phonemes: number };
  oci: { modules: number; lessons: number; terms: number };
  bjt: { cards: number; topics: number };
}

let cached: HomeCatalog | null = null;

export function homeCatalog(): HomeCatalog {
  if (cached) return cached;
  const file = join(process.cwd(), "public", "data", "learning-items.json");
  let idx: ItemIndex;
  try {
    idx = JSON.parse(readFileSync(file, "utf8")) as ItemIndex;
  } catch (e) {
    throw new Error(`Thiếu ${file} — chạy "npm run catalog" (tự chạy trước dev/build).`, { cause: e });
  }
  const items = Object.values(idx.items);
  const inCourse = (c: string, t: string) => items.filter((i) => i.t === t && i.c.includes(c)).length;
  const lessonsOf = (c: string) => idx.courses[c]?.lessons ?? [];
  const ociLessons = lessonsOf("oci-ai").filter((l) => l.startsWith("oci-ai.lesson."));

  cached = {
    totals: {
      courses: Object.keys(idx.courses).length,
      lessons: Object.values(idx.courses).reduce((n, c) => n + c.lessons.length, 0),
      items: items.length,
    },
    courses: Object.entries(idx.courses).map(([key, c]) => ({ key, title: c.title, lessons: c.lessons })),
    n1: {
      chapters: lessonsOf("jlpt-n1").filter((l) => l.startsWith("jlpt-n1.grammar.")).length,
      patterns: inCourse("jlpt-n1", "grammar_pattern"),
      vocabLessons: lessonsOf("jlpt-n1").filter((l) => l.startsWith("jlpt-n1.vocab.")).length,
      words: inCourse("jlpt-n1", "word"),
    },
    english: { lessons: lessonsOf("english").length, phonemes: inCourse("english", "phoneme") },
    oci: {
      // oci-ai.lesson.m3-l2 → module 3
      modules: new Set(ociLessons.map((l) => l.slice("oci-ai.lesson.".length).split("-")[0])).size,
      lessons: ociLessons.length,
      terms: inCourse("oci-ai", "term"),
    },
    bjt: { cards: Object.keys(idx.aliases).length, topics: lessonsOf("bjt").length },
  };
  return cached;
}
