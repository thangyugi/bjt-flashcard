// Chỉ import ở Server Component — bảng furigana không bị gửi xuống trình duyệt.
import map from "./furigana.json";

const FURIGANA = map as Record<string, string>;

/** Thay mọi chuỗi trong dữ liệu bằng bản có furigana {漢字|かんじ} (chạy trên server). */
export function withFurigana<T>(value: T): T {
  if (typeof value === "string") return (FURIGANA[value] ?? value) as T;
  if (Array.isArray(value)) return value.map(withFurigana) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = withFurigana(v);
    return out as T;
  }
  return value;
}
