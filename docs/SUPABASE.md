# Tài khoản & đồng bộ tiến độ (Supabase)

App chạy **offline-first**: mọi hoạt động học được ghi trên máy trước (hàng chờ sự kiện trong trình duyệt). Khi người học
đăng nhập, hàng chờ được gửi lên Supabase và tiến độ từ các thiết bị khác được gộp về. Chưa cấu hình Supabase thì app
vẫn chạy như cũ, chỉ không có tài khoản.

Thiết kế đầy đủ: tài liệu "Thiết kế Cơ sở dữ liệu — Nền tảng học tập BJT Flashcard" (sản phẩm nay mang tên LeoEdu; tên repo và khóa lưu trữ giữ nguyên).

## Các bước bật (làm một lần, ~20 phút)

### 1. Tạo project Supabase

1. <https://supabase.com> → **New project**. Region: **Southeast Asia (Singapore)**. Đặt mật khẩu database mạnh và lưu lại.
2. Vào **Project Settings → API**, chép **Project URL** và **anon public key**.

### 2. Tạo bảng (chạy migration)

Cách A — SQL Editor (không cần cài gì): mở **SQL Editor**, lần lượt dán và chạy từng file trong `supabase/migrations/`
theo đúng thứ tự tên file (`…0001_foundation.sql` → `…0007_api.sql`).

Cách B — Supabase CLI:

```bash
npx supabase login
npx supabase link --project-ref <mã project>
npx supabase db push
```

(Nếu CLI báo thiếu cấu hình, chạy `npx supabase init` trước — giữ nguyên thư mục `supabase/migrations`.)

### 3. Nạp danh mục khóa học

```bash
# Project Settings → Database → Connection string → "Session pooler", thay [YOUR-PASSWORD]
DATABASE_URL="postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" npm run catalog -- --push
```

Chạy lại lệnh này mỗi khi thêm / sửa bài (an toàn, cập nhật theo mã). Sự kiện học trỏ tới bài mới được áp dụng lại tự động.

### 4. Cấu hình đăng nhập

**Authentication → URL Configuration**

- Site URL: `https://bjt-flashcard.vercel.app`
- Redirect URLs: `https://bjt-flashcard.vercel.app/auth/callback`, `http://localhost:3000/auth/callback`

**Authentication → Providers**

- Email: bật (mặc định). Bật "Confirm email" để chống email giả.
- Google (tùy chọn): tạo OAuth client ở Google Cloud Console (loại *Web application*, Authorized redirect URI =
  `https://<mã project>.supabase.co/auth/v1/callback`), dán Client ID / Secret vào Supabase.

**Authentication → Emails**: nên cấu hình SMTP riêng (Resend, Brevo… có gói miễn phí). SMTP mặc định của Supabase chỉ gửi
vài email mỗi giờ.

### 5. Biến môi trường trên Vercel

Project → Settings → Environment Variables (Production + Preview):

| Biến | Giá trị |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |

Deploy lại. Nút **Đăng nhập** xuất hiện trên thanh tiêu đề.

> Khóa `service_role` và mật khẩu database **không bao giờ** đặt vào biến `NEXT_PUBLIC_*` hay vào mã nguồn.

## Kiến trúc

| Phần | File |
|---|---|
| Migration (7 schema, RLS, API) | `supabase/migrations/*.sql` |
| Kiểm thử database | `supabase/tests/` — `PGHOST=… npm run db:test` (Postgres 16 cục bộ) |
| Danh mục từ mã nguồn | `scripts/build-catalog.ts` → `public/data/learning-items.json`, `supabase/seed/catalog.sql` |
| Mã cố định | `src/lib/learning/keys.ts` (không đổi công thức sau khi có người dùng thật) |
| Hàng chờ sự kiện | `src/lib/learning/events.ts`, `track.ts`, `tracker.ts` |
| Đồng bộ | `src/lib/learning/sync.ts` (`sync_push` / `sync_pull` / `get_my_dashboard`) |
| Ôn tập FSRS | `src/store/srs-store.ts`, trang `/review` |
| Tiến độ | `src/store/activity-store.ts`, trang `/progress` |
| Tài khoản | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/auth/callback`, `/account`, `/privacy` |

Trình duyệt chỉ gọi các hàm trong schema `public` (`supabase.rpc`), nên **không cần** thêm schema nào vào
"Exposed schemas" của Data API. Mọi bảng đều bật RLS; người học chỉ đọc được dữ liệu của mình và ghi qua hàm API.

### Khác biệt so với tài liệu thiết kế (có chủ đích)

- Người học chưa đăng nhập: tiến độ lưu trên trình duyệt (không dùng tài khoản ẩn danh của Supabase), khi đăng ký thì nhập
  lên tài khoản. Đơn giản hơn, không tạo tài khoản rác.
- `learning.attempts` lưu `assessment_key` (luôn có) + `assessment_id` (khi đề đã có trong DB), vì đề trắc nghiệm hiện vẫn
  nằm trong mã nguồn.
- `lesson_versions` / `lesson_blocks` (giai đoạn 3) chưa tạo; `lessons.content_version` lưu mã băm nội dung để biết bài đã sửa.

## Vận hành

- Tạo phân vùng sự kiện cho tháng mới: migration đã tạo sẵn 13 tháng; sau đó chạy
  `select analytics.ensure_event_partition(date_trunc('month', now() + interval '1 month'));` hằng tháng
  (hoặc bật pg_cron). Tháng chưa có phân vùng vẫn ghi được vào phân vùng mặc định.
- Gói miễn phí: project **tự tạm dừng sau 7 ngày không có truy cập**; khi có người dùng thật nên lên gói Pro.
