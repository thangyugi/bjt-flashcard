import "server-only";
import { N1_LESSONS, getN1Stats } from "@/data/jlpt-n1/course";
import { VOCAB_LESSONS, vocabStats } from "@/data/jlpt-n1/vocab";
import { IPA_LESSONS } from "@/data/english/ipa";
import { getCourseMeta } from "@/data/oci-ai/course";
import { PRACTICE } from "@/data/oci-ai/practice";
import { EXAMS } from "@/data/oci-ai/practice/exams";
import { BANK as CCAR_BANK, getCourseMeta as getCcarMeta, mockExams as ccarExams } from "@/data/ccar-p/course";
import { STUDY_ORDER } from "@/data/ccar-p/meta";
import { homeCatalog } from "@/lib/home/catalog";
import type { CourseLessons } from "@/lib/learning/progress";

/**
 * Dữ liệu tĩnh (đọc lúc build) cho trang chọn /quiz (Trắc nghiệm) và gợi ý học tiếp.
 * Phần phụ thuộc người học (bài gần nhất, điểm, tiến độ) được ghép phía client từ các store.
 */
export type CourseId = "jlpt-n1" | "english" | "oci-ai" | "bjt" | "ccar-p";

export interface ChooserCourse {
  id: CourseId;
  title: string;
  kicker: string;
  color: string;
  href: string;
  desc: string;
  /** Mã bài để tính % hoàn thành; null nếu không có trong catalog */
  lessons: CourseLessons | null;
}

export interface ChooserData {
  courses: ChooserCourse[];
  bjtTotal: number;
  /** id bài → nhãn ngắn ("Chương 3 · …") cho "Học tiếp" */
  labels: {
    n1: Record<string, string>;
    n1Vocab: Record<string, string>;
    ipa: Record<string, string>;
    oci: Record<string, string>;
    ccar: Record<string, string>;
  };
  first: { n1: string; n1Vocab: string; ipa: string; oci: string; ccar: string };
  counts: {
    n1Questions: number;
    n1Chapters: number;
    n1VocabLessons: number;
    n1Words: number;
    ipaLessons: number;
    ociPracticeQuestions: number;
    ociPracticeLessons: number;
    bjtCards: number;
    bjtTopics: number;
    ccarQuestions: number;
    ccarV2: number;
    ccarLessons: number;
  };
  /** Bài OCI có ngân hàng câu hỏi luyện tập */
  ociPracticeIds: string[];
  exams: { id: string; title: string; count: number; minutes: number; passPct: number }[];
  ccarExams: { id: string; title: string; count: number; minutes: number; passPct: number }[];
}

export const COURSE_META: Record<CourseId, Omit<ChooserCourse, "lessons">> = {
  "jlpt-n1": {
    id: "jlpt-n1",
    title: "JLPT N1",
    kicker: "Tiếng Nhật · 日本語能力試験",
    color: "#b8202f",
    href: "/jlpt-n1",
    desc: "Ngữ pháp kể thành truyện và từ vựng Mimikara N1.",
  },
  english: {
    id: "english",
    title: "Tiếng Anh · IPA",
    kicker: "Phát âm · /ˈaɪ.pi.eɪ/",
    color: "#1d4ed8",
    href: "/english",
    desc: "44 âm IPA, nghe mẫu, cặp từ dễ nhầm và luyện tập 3 cấp độ.",
  },
  "oci-ai": {
    id: "oci-ai",
    title: "OCI AI Foundations",
    kicker: "Chứng chỉ · 1Z0-1122",
    color: "#0f766e",
    href: "/oracle-oci-ai",
    desc: "AI, ML, Generative AI và dịch vụ AI trên Oracle Cloud bằng tiếng Việt.",
  },
  bjt: {
    id: "bjt",
    title: "Từ vựng BJT",
    kicker: "Tiếng Nhật thương mại · ビジネス",
    color: "#a14f06",
    href: "/bjt",
    desc: "Flashcard từ vựng công sở theo chủ đề, câu ví dụ có furigana.",
  },
  "ccar-p": {
    id: "ccar-p",
    title: "Claude Architect · CCAR-P",
    kicker: "Chứng chỉ · Anthropic CCAR-P",
    color: "#6d28d9",
    href: "/claude-ccar-p",
    desc: "7 domain, 38 task statement, ngân hàng câu hỏi có giải thích và đề thi thử 63 câu.",
  },
};

export function chooserData(): ChooserData {
  const catalog = homeCatalog();
  const n1 = getN1Stats();
  const vocab = vocabStats();
  const oci = getCourseMeta();
  const practiceIds = new Set(PRACTICE.map((p) => p.lessonId));
  const ccar = getCcarMeta();
  const order: CourseId[] = ["jlpt-n1", "english", "oci-ai", "bjt", "ccar-p"];

  return {
    courses: order.map((id) => ({ ...COURSE_META[id], lessons: catalog.courses.find((c) => c.key === id) ?? null })),
    bjtTotal: catalog.bjt.cards,
    labels: {
      n1: Object.fromEntries(N1_LESSONS.map((l) => [l.id, `Chương ${l.num} · ${l.chapterVi}`])),
      n1Vocab: Object.fromEntries(VOCAB_LESSONS.map((l) => [l.id, `Bài ${l.num} · ${l.title}`])),
      ipa: Object.fromEntries(IPA_LESSONS.map((l) => [l.id, `Bài ${l.num} · ${l.title}`])),
      oci: Object.fromEntries(oci.lessons.map((l) => [l.id, `${l.code} · ${l.navTitle}`])),
      ccar: Object.fromEntries(ccar.lessons.map((l) => [l.id, `${l.code} · ${l.title}`])),
    },
    first: {
      n1: N1_LESSONS[0].id,
      n1Vocab: VOCAB_LESSONS[0].id,
      ipa: IPA_LESSONS[0].id,
      oci: oci.lessons[0].id,
      // theo thứ tự học đề xuất: bắt đầu từ Domain 3
      ccar: ccar.domains.find((d) => d.num === STUDY_ORDER[0])!.lessonIds[0],
    },
    counts: {
      n1Questions: n1.questions,
      n1Chapters: n1.lessons,
      n1VocabLessons: vocab.lessons,
      n1Words: vocab.words,
      ipaLessons: IPA_LESSONS.length,
      ociPracticeQuestions: PRACTICE.reduce((s, p) => s + p.qs.length, 0),
      ociPracticeLessons: PRACTICE.length,
      bjtCards: catalog.bjt.cards,
      bjtTopics: catalog.bjt.topics,
      ccarQuestions: CCAR_BANK.length,
      ccarV2: CCAR_BANK.filter((q) => q.v2).length,
      ccarLessons: ccar.lessons.length,
    },
    ociPracticeIds: oci.lessons.filter((l) => practiceIds.has(l.id)).map((l) => l.id),
    exams: EXAMS.map((e) => ({ id: e.id, title: e.title, count: e.qs.length, minutes: e.minutes, passPct: e.passPct })),
    ccarExams: ccarExams().map((e) => ({ id: e.id, title: e.title, count: e.ids.length, minutes: e.minutes, passPct: e.passPct })),
  };
}
