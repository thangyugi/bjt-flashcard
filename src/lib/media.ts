/**
 * Nơi phục vụ file âm thanh / hình ảnh.
 * Mặc định cùng tên miền với app (thư mục public/). Khi đã đưa lên Cloudflare R2 (scripts/upload-media.ts),
 * đặt NEXT_PUBLIC_MEDIA_BASE_URL = địa chỉ công khai của bucket, ví dụ https://media.example.com
 */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").replace(/\/+$/, "");

/** "/audio/male/abc.m4a" → đường dẫn đầy đủ theo nơi lưu hiện tại */
export const mediaUrl = (path: string) => `${MEDIA_BASE}${path}`;
