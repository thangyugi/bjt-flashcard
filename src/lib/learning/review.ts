/** Thao tác ôn tập dùng chung: thêm thẻ, chấm thẻ — cập nhật bộ thẻ FSRS và ghi sự kiện để đồng bộ. */
import { useSrsStore, type CardKind, type Grade } from "@/store/srs-store";
import { cardAfter } from "./sync";
import { stateName } from "@/store/srs-store";
import { track } from "./track";

export function enrollItems(items: { item: string; course: string; kind?: CardKind }[]) {
  const added = useSrsStore.getState().enroll(items);
  for (const id of added) {
    const c = useSrsStore.getState().cards[id];
    track("card.enrolled", c.item, { course: c.course, kind: c.kind });
  }
  return added.length;
}

export function reviewCard(id: string, rating: Grade, durationMs?: number) {
  const r = useSrsStore.getState().review(id, rating);
  if (!r) return null;
  track("card.reviewed", r.after.item, {
    course: r.after.course,
    kind: r.after.kind,
    rating,
    duration_ms: durationMs,
    before: { state: stateName(r.before.state), stability: r.before.stability, difficulty: r.before.difficulty },
    after: cardAfter(r.after),
  });
  return r;
}

/** 600000 → "10 phút", 3 ngày → "3 ngày" */
export function formatInterval(ms: number) {
  const m = Math.round(ms / 60000);
  if (m < 60) return `${Math.max(1, m)} phút`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} giờ`;
  const d = Math.round(h / 24);
  if (d < 31) return `${d} ngày`;
  const mo = Math.round(d / 30);
  if (mo < 12) return `${mo} tháng`;
  return `${(d / 365).toFixed(1).replace(".", ",")} năm`;
}
