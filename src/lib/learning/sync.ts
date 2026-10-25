/**
 * Đồng bộ tiến độ với Supabase (khi đã đăng nhập):
 *   1. Lần đầu đăng nhập trên máy: nhập toàn bộ tiến độ cũ trong trình duyệt thành sự kiện (id cố định → nhập lại không trùng).
 *   2. Gửi hàng chờ sự kiện (public.sync_push), mỗi lần tối đa 200.
 *   3. Lấy trạng thái thay đổi từ máy chủ (public.sync_pull) và gộp vào các kho trên máy.
 */
import { State } from "ts-fsrs";
import { getSession, supabase } from "@/lib/supabase/client";
import { useEnStore } from "@/store/en-store";
import { useN1Store } from "@/store/n1-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useFlashcardStore } from "@/store/flashcard-store";
import { useSrsStore, stateFromName, stateName, type CardKind, type StoredCard } from "@/store/srs-store";
import { useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { flushPortfolio, usePortfolioStore } from "@/lib/portfolio/store";
import { useTtsStore } from "@/store/tts-store";
import { assessmentKey, lessonKey, n1LessonKey } from "./keys";
import { uuidFrom, useOutbox, type LearningEvent } from "./events";
import { loadItemIndex } from "./items";
import { withoutTracking } from "./track";

const BATCH = 200;
let running: Promise<void> | null = null;

export type SyncStatus = "idle" | "syncing" | "error" | "offline";
let status: SyncStatus = "idle";
const listeners = new Set<() => void>();
const setStatus = (s: SyncStatus) => {
  status = s;
  listeners.forEach((l) => l());
};
export const subscribeSync = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
export const getSyncStatus = () => status;

/** Đồng bộ ngay (gộp các lần gọi chồng nhau) */
export function syncNow(): Promise<void> {
  running ??= run().finally(() => (running = null));
  return running;
}

async function run() {
  const sb = supabase();
  const user = getSession()?.user;
  if (!sb || !user) return;
  if (typeof navigator !== "undefined" && !navigator.onLine) return setStatus("offline");
  setStatus("syncing");
  const outbox = useOutbox.getState;
  try {
    if (!outbox().imported.includes(user.id)) {
      const events = await snapshotEvents(user.id);
      outbox().add(events);
      await sb.rpc("update_my_profile", { p: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone } });
      await pushSettings();
      outbox().markImported(user.id);
    }

    for (let guard = 0; outbox().events.length && guard < 50; guard++) {
      const batch = outbox().events.slice(0, BATCH);
      const { error } = await sb.rpc("sync_push", {
        p_events: batch,
        p_device: { id: outbox().deviceId, platform: navigator.userAgent.slice(0, 120), version: "web" },
      });
      if (error) throw error;
      outbox().remove(batch.map((e) => e.id));
    }

    const since = outbox().pulledAt[user.id] ?? null;
    const { data, error } = await sb.rpc("sync_pull", { p_since: since });
    if (error) throw error;
    await mergePull(data as PullResult);
    outbox().setPulled(user.id, (data as PullResult).server_time);

    const dash = await sb.rpc("get_my_dashboard", { p_days: 400 });
    if (!dash.error && dash.data?.daily) useActivityStore.getState().mergeServer(dash.data.daily);

    outbox().setSyncResult(null);
    setStatus("idle");
  } catch (e) {
    const msg = e instanceof Error ? e.message : typeof e === "object" && e && "message" in e ? String((e as { message: unknown }).message) : String(e);
    outbox().setSyncResult(msg);
    setStatus("error");
  }
}

export async function pushSettings() {
  const sb = supabase();
  if (!sb || !getSession()) return;
  const t = useTtsStore.getState();
  await sb.rpc("update_my_settings", { p: { voice_gender: t.gender, en_accent: t.enAccent, speech_rate: t.rate } });
}

// ── 1. Tiến độ cũ → sự kiện ──
async function snapshotEvents(userId: string): Promise<LearningEvent[]> {
  const out: LearningEvent[] = [];
  const add = async (verb: LearningEvent["verb"], object: string | undefined, at: string, data: Record<string, unknown>) =>
    out.push({ id: await uuidFrom(`${userId}|import|${verb}|${object}|${at}`), verb, object, at, data: { ...data, source: "import" } });

  const n1 = useN1Store.getState();
  for (const [id, at] of Object.entries(n1.done)) await add("lesson.completed", n1LessonKey(id), at, { course: "jlpt-n1" });
  for (const [k, q] of Object.entries(n1.quiz))
    await add("quiz.submitted", assessmentKey.n1(k), q.at, { course: "jlpt-n1", lesson: n1LessonKey(k.split("/")[0]), score: q.best, total: q.total });

  const en = useEnStore.getState();
  for (const [id, at] of Object.entries(en.done)) await add("lesson.completed", lessonKey.ipa(id), at, { course: "english" });
  for (const [k, q] of Object.entries(en.quiz)) await add("quiz.submitted", assessmentKey.english(k), q.at, { course: "english", score: q.best, total: q.total });

  const oci = useOciAiStore.getState();
  for (const [id, at] of Object.entries(oci.done)) await add("lesson.completed", lessonKey.oci(id), at, { course: "oci-ai" });
  for (const [id, q] of Object.entries(oci.quiz))
    await add("quiz.submitted", assessmentKey.ociQuiz(id), q.at, { course: "oci-ai", lesson: lessonKey.oci(id), score: q.score, total: q.total });
  for (const [k, q] of Object.entries(oci.practice ?? {}))
    await add("quiz.submitted", assessmentKey.ociPractice(k), q.at, { course: "oci-ai", score: q.best, total: q.total });

  const fc = useFlashcardStore.getState().progress;
  if (Object.keys(fc).length) {
    const idx = await loadItemIndex().catch(() => null);
    for (const p of Object.values(fc)) {
      const key = idx?.aliases[p.vocabularyItemId];
      if (!key || !p.lastReviewedAt) continue;
      const status = p.status === "mastered" ? "known" : p.status === "new" ? "new" : "learning";
      await add("item.marked", key, p.lastReviewedAt, { course: "bjt", status });
    }
  }

  for (const c of Object.values(useSrsStore.getState().cards)) {
    const created = c.last_review ?? new Date().toISOString();
    await add("card.enrolled", c.item, created, { course: c.course, kind: c.kind });
    if (c.last_review)
      await add("card.reviewed", c.item, c.last_review, {
        course: c.course,
        kind: c.kind,
        rating: 3,
        source: "import",
        after: cardAfter(c),
      });
  }
  return out;
}

export const cardAfter = (c: StoredCard) => ({
  state: stateName(c.state),
  due: c.due,
  stability: c.stability,
  difficulty: c.difficulty,
  elapsed_days: c.elapsed_days,
  scheduled_days: c.scheduled_days,
  learning_steps: c.learning_steps,
  reps: c.reps,
  lapses: c.lapses,
});

// ── 3. Gộp dữ liệu máy chủ vào máy ──
interface PullResult {
  server_time: string;
  lessons: { lesson: string; status: string; completed_at: string | null; changed_at: string }[];
  quizzes: { assessment: string; best: number; last: number; total: number; at: string }[];
  cards: {
    item: string;
    kind: string;
    state: string;
    due: string;
    stability: number;
    difficulty: number;
    elapsed_days: number;
    scheduled_days: number;
    learning_steps: number;
    reps: number;
    lapses: number;
    last_review: string | null;
  }[];
  marks: { item: string; stage: string; at: string }[];
}

type DoneStore = { getState: () => { done: Record<string, string> }; setState: (p: { done: Record<string, string> }) => void };

function mergeDone(store: DoneStore, id: string, l: PullResult["lessons"][number]) {
  const done = store.getState().done;
  if (l.status === "completed" && !done[id]) store.setState({ done: { ...done, [id]: l.completed_at ?? l.changed_at } });
  else if (l.status !== "completed" && done[id] && l.changed_at > done[id]) {
    const next = { ...done };
    delete next[id];
    store.setState({ done: next });
  }
}

function lessonTarget(key: string): [DoneStore, string] | null {
  for (const [prefix, store] of [
    ["jlpt-n1.grammar.", useN1Store],
    ["jlpt-n1.vocab.", useN1Store],
    ["english.ipa.", useEnStore],
    ["oci-ai.lesson.", useOciAiStore],
  ] as const)
    if (key.startsWith(prefix)) return [store as unknown as DoneStore, key.slice(prefix.length)];
  return null;
}

async function mergePull(d: PullResult) {
  const idx = d.marks.length || d.cards.length ? await loadItemIndex().catch(() => null) : null;
  await withoutTracking(() => {
    for (const l of d.lessons ?? []) {
      const t = lessonTarget(l.lesson);
      if (t) mergeDone(t[0], t[1], l);
    }

    for (const q of d.quizzes ?? []) {
      const merge = <T extends { best: number; last: number; total: number; at: string }>(cur: T | undefined): T =>
        ({
          best: Math.max(cur?.best ?? 0, Number(q.best)),
          last: cur && cur.at > q.at ? cur.last : Number(q.last),
          total: cur && cur.at > q.at ? cur.total : Number(q.total),
          at: cur && cur.at > q.at ? cur.at : q.at,
        }) as T;
      const k = q.assessment;
      if (k.startsWith("jlpt-n1.quiz.")) {
        const id = k.slice(13);
        useN1Store.setState((s) => ({ quiz: { ...s.quiz, [id]: merge(s.quiz[id]) } }));
      } else if (k.startsWith("english.quiz.")) {
        const id = k.slice(13);
        useEnStore.setState((s) => ({ quiz: { ...s.quiz, [id]: merge(s.quiz[id]) } }));
      } else if (k.startsWith("oci-ai.practice.")) {
        const id = k.slice(16);
        useOciAiStore.setState((s) => ({ practice: { ...s.practice, [id]: merge(s.practice?.[id]) } }));
      } else if (k.startsWith("oci-ai.quiz.")) {
        const id = k.slice(12);
        useOciAiStore.setState((s) =>
          s.quiz[id] && s.quiz[id].at >= q.at ? s : { quiz: { ...s.quiz, [id]: { score: Number(q.last), total: Number(q.total), at: q.at } } }
        );
      }
    }

    if (d.cards?.length) {
      useSrsStore.getState().mergeServer(
        d.cards.map(
          (c): StoredCard => ({
            item: c.item,
            kind: c.kind as CardKind,
            course: idx?.items[c.item]?.c[0] ?? "",
            due: c.due,
            stability: c.stability,
            difficulty: c.difficulty,
            elapsed_days: c.elapsed_days,
            scheduled_days: c.scheduled_days,
            learning_steps: c.learning_steps,
            reps: c.reps,
            lapses: c.lapses,
            state: c.state === "suspended" ? State.Review : stateFromName(c.state),
            last_review: c.last_review,
            ...(c.state === "suspended" ? { suspended: true } : {}),
          })
        )
      );
    }

    if (d.marks?.length && idx) {
      // Thẻ BJT: mã mục học → các mã thẻ cũ ("bjt-001"…)
      const back = new Map<string, string[]>();
      for (const [bjtId, key] of Object.entries(idx.aliases)) back.set(key, [...(back.get(key) ?? []), bjtId]);
      const progress = { ...useFlashcardStore.getState().progress };
      let changed = false;
      for (const m of d.marks) {
        for (const id of back.get(m.item) ?? []) {
          const cur = progress[id];
          if (cur?.lastReviewedAt && cur.lastReviewedAt >= m.at) continue;
          const status = m.stage === "mastered" ? "mastered" : m.stage === "seen" || m.stage === "new" ? "new" : "learning";
          progress[id] = { vocabularyItemId: id, status, reviewCount: cur?.reviewCount ?? 1, lastReviewedAt: m.at };
          changed = true;
        }
      }
      if (changed) useFlashcardStore.setState({ progress });
    }
  });
}

/**
 * Đăng xuất: gửi nốt hoạt động còn chờ rồi xóa tiến độ trên máy, để người dùng khác đăng nhập trên máy này
 * không nhận (và không tải lên tài khoản của họ) tiến độ của người trước.
 */
export async function signOutAndClear() {
  await syncNow().catch(() => {});
  await flushPortfolio().catch(() => {});
  const sb = supabase();
  await withoutTracking(() => {
    useN1Store.getState().reset();
    useEnStore.getState().reset();
    useOciAiStore.getState().reset();
    useFlashcardStore.getState().resetProgress();
    useFlashcardStore.setState({ reviewIds: [], quizSeen: {} });
    useSrsStore.setState({ cards: {}, migratedLeitner: true });
    useActivityStore.setState({ days: {}, active: {} });
    // Vùng đất (cây đã gieo, Tinh thể đã tiêu) cũng là dữ liệu của người vừa đăng xuất
    useLandStore.getState().reset();
    // Portfolio (bản lưu trên máy) của người vừa đăng xuất
    usePortfolioStore.getState().reset();
    useOutbox.setState({ events: [], pulledAt: {}, imported: [], lastSyncAt: null, lastError: null });
  });
  await sb?.auth.signOut();
}
