/**
 * Mã nghiệp vụ cố định cho khóa học, bài, mục học, bài kiểm tra.
 * Dùng chung cho script đồng bộ catalog (scripts/build-catalog.ts) và bộ đồng bộ tiến độ trong app,
 * nên hai bên luôn trỏ về cùng một bản ghi. KHÔNG đổi công thức sau khi đã có người dùng thật —
 * đổi mã = tiến độ cũ không khớp nữa.
 */

export type CourseKey = "jlpt-n1" | "english" | "oci-ai" | "bjt";

export const lessonKey = {
  n1Grammar: (id: string) => `jlpt-n1.grammar.${id}`,
  n1Vocab: (id: string) => `jlpt-n1.vocab.${id}`,
  ipa: (id: string) => `english.ipa.${id}`,
  oci: (id: string) => `oci-ai.lesson.${id}`,
  bjtGroup: (id: string) => `bjt.group.${id}`,
};

/** Bài của khóa N1: id "mk-…" là bài từ vựng, còn lại là chương ngữ pháp */
export const n1LessonKey = (id: string) => (id.startsWith("mk-") ? lessonKey.n1Vocab(id) : lessonKey.n1Grammar(id));

export const itemKey = {
  jaWord: (w: string, r: string) => `ja.word.${w}.${r}`,
  jaGrammar: (patternId: string) => `ja.grammar.${patternId}`,
  phoneme: (id: string) => `en.phoneme.${id}`,
  ociTerm: (term: string) => `oci.term.${slug(term)}`,
};

export const assessmentKey = {
  n1: (storeKey: string) => `jlpt-n1.quiz.${storeKey}`,
  english: (storeKey: string) => `english.quiz.${storeKey}`,
  ociQuiz: (lessonId: string) => `oci-ai.quiz.${lessonId}`,
  ociPractice: (storeKey: string) => `oci-ai.practice.${storeKey}`,
};

export function slug(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
