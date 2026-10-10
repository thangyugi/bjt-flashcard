/**
 * Khóa học OCI AI Foundations — chỉ import từ Server Component
 * (chứa toàn bộ HTML bài học, không nên lọt vào bundle client).
 */
import type { LessonMeta, ModuleMeta, OciLesson, OciModule } from "./types";
import { m1 } from "./m1";
import { m2 } from "./m2";
import { m3 } from "./m3";
import { m4 } from "./m4";
import { m5 } from "./m5";
import { m6 } from "./m6";
import { m7 } from "./m7";
import { m8 } from "./m8";

export const MODULES: OciModule[] = [m1, m2, m3, m4, m5, m6, m7, m8];

export const LESSONS: OciLesson[] = MODULES.flatMap((m) => m.lessons);

const lessonModule = new Map<string, OciModule>();
for (const m of MODULES) for (const l of m.lessons) lessonModule.set(l.id, m);

export function getLesson(id: string) {
  const index = LESSONS.findIndex((l) => l.id === id);
  if (index < 0) return undefined;
  return {
    lesson: LESSONS[index],
    module: lessonModule.get(id)!,
    prev: LESSONS[index - 1],
    next: LESSONS[index + 1],
    index,
  };
}

export function toLessonMeta(l: OciLesson): LessonMeta {
  const m = lessonModule.get(l.id)!;
  return {
    id: l.id,
    code: l.code,
    kind: l.kind,
    title: l.title,
    navTitle: l.navTitle,
    minutes: l.minutes,
    moduleId: m.id,
    moduleNum: m.num,
    hasQuiz: !!l.quiz?.length,
  };
}

export function getCourseMeta(): { modules: ModuleMeta[]; lessons: LessonMeta[] } {
  return {
    modules: MODULES.map((m) => ({
      id: m.id,
      num: m.num,
      origModule: m.origModule,
      title: m.title,
      desc: m.desc,
      lessonIds: m.lessons.map((l) => l.id),
      minutes: m.lessons.reduce((s, l) => s + (l.minutes ?? 0), 0),
    })),
    lessons: LESSONS.map(toLessonMeta),
  };
}
