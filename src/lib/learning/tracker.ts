/**
 * Theo dõi các kho tiến độ sẵn có của từng khóa (localStorage) và sinh sự kiện học khi chúng thay đổi.
 * Nhờ vậy các trang học hiện tại không phải sửa: đánh dấu xong bài, làm trắc nghiệm, chấm thẻ BJT…
 * đều tự thành sự kiện để đồng bộ và thống kê.
 */
import { useEnStore } from "@/store/en-store";
import { useN1Store } from "@/store/n1-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useFlashcardStore } from "@/store/flashcard-store";
import { useSrsStore, type StoredCard } from "@/store/srs-store";
import { State } from "ts-fsrs";
import { assessmentKey, itemKey, lessonKey, n1LessonKey } from "./keys";
import { loadItemIndex } from "./items";
import { uuidv7 } from "./events";
import { track, trackingMuted } from "./track";
import { enrollItems } from "./review";

type Quiz = { best?: number; last?: number; score?: number; total: number; at: string };

/** Mỗi khóa: đổi mã trong kho cũ → mã chung */
const n1Quiz = (k: string) => ({ assessment: assessmentKey.n1(k), lesson: n1LessonKey(k.split("/")[0]), course: "jlpt-n1" });
const enQuiz = (k: string) => {
  const first = k.split("/")[0];
  return { assessment: assessmentKey.english(k), lesson: /^ipa-\d+$/.test(first) ? lessonKey.ipa(first) : undefined, course: "english" };
};
const ociQuiz = (id: string) => ({ assessment: assessmentKey.ociQuiz(id), lesson: lessonKey.oci(id), course: "oci-ai" });
const ociPractice = (k: string) => ({
  assessment: assessmentKey.ociPractice(k),
  lesson: k.startsWith("lesson:") ? lessonKey.oci(k.slice(7)) : undefined,
  course: "oci-ai",
});

function diffDone(prev: Record<string, string>, next: Record<string, string>, key: (id: string) => string, course: string) {
  for (const id of Object.keys(next)) if (!prev[id]) track("lesson.completed", key(id), { course });
  for (const id of Object.keys(prev)) if (!next[id]) track("lesson.reopened", key(id), { course });
}

function diffQuiz(
  prev: Record<string, Quiz> | undefined,
  next: Record<string, Quiz> | undefined,
  map: (k: string) => { assessment: string; lesson?: string; course: string }
) {
  for (const [k, q] of Object.entries(next ?? {})) {
    if (prev?.[k]?.at === q.at) continue;
    const m = map(k);
    track("quiz.submitted", m.assessment, { course: m.course, lesson: m.lesson, score: q.last ?? q.score ?? 0, total: q.total });
  }
}

/** Trạng thái thẻ BJT → mức tự đánh giá */
const MARK: Record<string, "known" | "learning" | "new"> = { mastered: "known", review: "learning", learning: "learning", new: "new" };

/** Chuyển thẻ Leitner (hộp 1–6) của khóa tiếng Anh sang FSRS một lần */
function migrateLeitner() {
  const srs = useSrsStore.getState();
  if (srs.migratedLeitner) return;
  const old = useEnStore.getState().srs;
  const now = Date.now();
  const cards: Record<string, StoredCard> = {};
  for (const [id, c] of Object.entries(old)) {
    const item = itemKey.phoneme(id);
    // Độ bền (ngày) xấp xỉ theo hộp: hộp k ≈ khoảng ôn 2^(k-2) ngày
    const stability = c.box <= 1 ? 1 : 2 ** (c.box - 2);
    cards[`${item}|recognize`] = {
      item,
      kind: "recognize",
      course: "english",
      due: new Date(`${c.due}T00:00:00`).toISOString(),
      stability,
      difficulty: 5,
      elapsed_days: 0,
      scheduled_days: Math.max(0, Math.round(stability)),
      learning_steps: 0,
      reps: c.reps,
      lapses: c.lapses,
      state: c.reps > 0 ? State.Review : State.New,
      last_review: c.reps > 0 ? new Date(now).toISOString() : null,
    };
  }
  srs.importLeitner(cards);
}

// ── Thời gian học ──
const LEARNING_PATHS: [RegExp, string | null][] = [
  [/^\/jlpt-n1/, "jlpt-n1"],
  [/^\/english/, "english"],
  [/^\/oracle-oci-ai/, "oci-ai"],
  [/^\/(bjt|quiz\/(bjt|play))/, "bjt"],
  [/^\/review/, null],
];
const TICK = 15;

function startTimeTracking() {
  let lastInput = Date.now();
  let acc = 0;
  let accCourse: string | null = null;
  let session = uuidv7();
  let lastActive = Date.now();
  const onInput = () => (lastInput = Date.now());
  const evts = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  evts.forEach((e) => window.addEventListener(e, onInput, { passive: true }));

  const flush = () => {
    if (acc <= 0) return;
    track("time.spent", undefined, { seconds: acc, session, course: accCourse ?? undefined });
    acc = 0;
  };
  const timer = window.setInterval(() => {
    const path = window.location.pathname;
    const hit = LEARNING_PATHS.find(([re]) => re.test(path));
    const idle = Date.now() - lastInput > 120_000;
    if (!hit || idle || document.visibilityState !== "visible") return;
    if (Date.now() - lastActive > 10 * 60_000) {
      flush();
      session = uuidv7(); // nghỉ quá 10 phút → phiên học mới
    }
    lastActive = Date.now();
    if (accCourse !== hit[1]) flush();
    accCourse = hit[1];
    acc += TICK;
    if (acc >= 60) flush();
  }, TICK * 1000);
  const onHide = () => document.visibilityState === "hidden" && flush();
  document.addEventListener("visibilitychange", onHide);
  return () => {
    flush();
    window.clearInterval(timer);
    evts.forEach((e) => window.removeEventListener(e, onInput));
    document.removeEventListener("visibilitychange", onHide);
  };
}

/** Bắt đầu theo dõi (gọi một lần ở LearningRuntime). Trả về hàm dừng. */
export function startTracker(): () => void {
  const stops: (() => void)[] = [];

  const whenHydrated = (store: { persist: { hasHydrated: () => boolean; onFinishHydration: (f: () => void) => () => void } }, f: () => void) => {
    if (store.persist.hasHydrated()) f();
    else {
      const un = store.persist.onFinishHydration(() => {
        un();
        f();
      });
      stops.push(un);
    }
  };

  whenHydrated(useN1Store, () => {
    stops.push(
      useN1Store.subscribe((n, p) => {
        diffDone(p.done, n.done, n1LessonKey, "jlpt-n1");
        diffQuiz(p.quiz, n.quiz, n1Quiz);
        if (n.lastLessonId && n.lastLessonId !== p.lastLessonId) track("lesson.opened", n1LessonKey(n.lastLessonId), { course: "jlpt-n1" });
        if (n.lastVocabId && n.lastVocabId !== p.lastVocabId) track("lesson.opened", n1LessonKey(n.lastVocabId), { course: "jlpt-n1" });
      })
    );
  });

  whenHydrated(useEnStore, () => {
    whenHydrated(useSrsStore, migrateLeitner);
    stops.push(
      useEnStore.subscribe((n, p) => {
        diffDone(p.done, n.done, lessonKey.ipa, "english");
        diffQuiz(p.quiz, n.quiz, enQuiz);
        if (n.lastIpaLesson && n.lastIpaLesson !== p.lastIpaLesson) track("lesson.opened", lessonKey.ipa(n.lastIpaLesson), { course: "english" });
      })
    );
  });

  whenHydrated(useOciAiStore, () => {
    stops.push(
      useOciAiStore.subscribe((n, p) => {
        diffDone(p.done, n.done, lessonKey.oci, "oci-ai");
        diffQuiz(p.quiz, n.quiz, ociQuiz);
        diffQuiz(p.practice, n.practice, ociPractice);
        if (n.lastLessonId && n.lastLessonId !== p.lastLessonId) track("lesson.opened", lessonKey.oci(n.lastLessonId), { course: "oci-ai" });
      })
    );
  });

  whenHydrated(useFlashcardStore, () => {
    stops.push(
      useFlashcardStore.subscribe((n, p) => {
        if (n.progress === p.progress || trackingMuted()) return;
        const changed = Object.values(n.progress).filter((x) => p.progress[x.vocabularyItemId]?.lastReviewedAt !== x.lastReviewedAt);
        if (!changed.length) return;
        const at = new Date();
        loadItemIndex()
          .then((idx) => {
            for (const x of changed) {
              const key = idx.aliases[x.vocabularyItemId];
              if (!key) continue;
              track("item.marked", key, { course: "bjt", status: MARK[x.status] ?? "learning" }, at);
              // Từ đang học → đưa vào bộ ôn tập ngắt quãng chung
              if (MARK[x.status] === "learning") enrollItems([{ item: key, course: "bjt" }]);
            }
          })
          .catch(() => {});
      })
    );
  });

  stops.push(startTimeTracking());
  return () => stops.forEach((s) => s());
}
