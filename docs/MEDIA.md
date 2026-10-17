# Đưa âm thanh lên Cloudflare R2

`public/audio` (~400 MB) đang nằm trong mỗi bản deploy Vercel, nên dung lượng 10 GB miễn phí nhanh đầy. Chuyển sang
Cloudflare R2: 10 GB lưu trữ miễn phí, **không tính phí băng thông**, có CDN.

## Các bước

1. Cloudflare Dashboard → **R2** → **Create bucket**, tên ví dụ `bjt-media`.
2. Bucket → **Settings → Public access**: bật **r2.dev subdomain** (hoặc gắn tên miền riêng, ví dụ `media.ten-mien.com`).
   Chép địa chỉ công khai, ví dụ `https://pub-xxxx.r2.dev`.
3. Bucket → **Settings → CORS policy**, dán:

   ```json
   [{ "AllowedOrigins": ["https://bjt-flashcard.vercel.app", "http://localhost:3000"], "AllowedMethods": ["GET", "HEAD"], "AllowedHeaders": ["*"], "MaxAgeSeconds": 86400 }]
   ```

4. R2 → **Manage R2 API Tokens** → tạo token quyền *Object Read & Write* cho bucket. Chép Access Key ID, Secret, Account ID.
5. Tải lên (chạy lại bất cứ lúc nào — chỉ tải file mới / đổi):

   ```bash
   R2_ACCOUNT_ID=… R2_ACCESS_KEY_ID=… R2_SECRET_ACCESS_KEY=… R2_BUCKET=bjt-media npm run media:upload
   ```

6. Vercel → Environment Variables: `NEXT_PUBLIC_MEDIA_BASE_URL` = địa chỉ ở bước 2 (không có `/` cuối). Deploy lại và
   nghe thử một bài.
7. Khi đã chạy ổn: tạo file `.vercelignore` chứa dòng `public/audio` để bản deploy không mang theo âm thanh nữa.

Từ đó, khi tạo thêm âm thanh (`npm run audio`, `npm run audio:en`): chạy `npm run media:upload` rồi mới deploy.

Service worker vẫn lưu file âm thanh đã nghe để dùng offline (app báo tên miền R2 cho service worker qua `/sw.js?media=…`).
