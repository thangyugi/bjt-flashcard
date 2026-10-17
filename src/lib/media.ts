/**
 * Nơi phục vụ file âm thanh / hình ảnh.
 * Mặc định cùng tên miền với app (thư mục public/). Khi đã đưa lên Cloudflare R2 (scripts/upload-media.ts),
 * đặt NEXT_PUBLIC_MEDIA_BASE_URL = địa chỉ công khai của bucket, ví dụ https://media.example.com
 */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").replace(/\/+$/, "");

/** R2 không truy cập được (sai địa chỉ, CORS…) → dùng bản trong public/ của app cho cả phiên */
let fallbackLocal = false;

/** "/audio/male/abc.m4a" → đường dẫn đầy đủ theo nơi lưu hiện tại */
export const mediaUrl = (path: string) => `${fallbackLocal ? "" : MEDIA_BASE}${path}`;

/** Tải file JSON của media (manifest). Lỗi ở R2 thì thử lại bản cùng tên miền với app. */
export async function fetchMediaJson<T>(path: string): Promise<T | null> {
  const get = (url: string) => fetch(url).then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.reject(new Error(`HTTP ${r.status}`))));
  try {
    return await get(mediaUrl(path));
  } catch (e) {
    if (!MEDIA_BASE || fallbackLocal) return null;
    console.warn(`Không tải được ${MEDIA_BASE}${path} (${e instanceof Error ? e.message : e}) — dùng file âm thanh của app.`);
    try {
      const local = await get(path);
      fallbackLocal = true;
      return local;
    } catch {
      return null;
    }
  }
}
