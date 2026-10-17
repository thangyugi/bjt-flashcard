-- ════════════════════════════════════════════════════════════════════
-- 0001 · Nền tảng: extension, schema theo miền nghiệp vụ, hàm tiện ích
-- Thiết kế: docs "Thiết kế Cơ sở dữ liệu — Nền tảng học tập BJT Flashcard"
-- ════════════════════════════════════════════════════════════════════

-- Mỗi miền nghiệp vụ một schema (mục 2 của tài liệu thiết kế)
create schema if not exists util;
create schema if not exists catalog;     -- nội dung: khóa, bài, mục học
create schema if not exists assessment;  -- câu hỏi, đề
create schema if not exists identity;    -- hồ sơ, cài đặt, vai trò
create schema if not exists learning;    -- tiến độ, ôn tập, bài làm
create schema if not exists analytics;   -- sự kiện, thống kê
create schema if not exists engagement;  -- chuỗi ngày, XP

comment on schema catalog is 'Nội dung học: môn, khóa, học phần, bài, loại mục học, mục học';
comment on schema assessment is 'Ngân hàng câu hỏi và đề / bài kiểm tra';
comment on schema identity is 'Hồ sơ, cài đặt, vai trò, đồng ý xử lý dữ liệu';
comment on schema learning is 'Dữ liệu học của từng người: tiến độ, thẻ ôn, lịch sử ôn, bài làm';
comment on schema analytics is 'Sự kiện học (chỉ ghi thêm) và số liệu tổng hợp';
comment on schema engagement is 'Động lực học: chuỗi ngày, điểm kinh nghiệm';

-- ── UUIDv7: sắp theo thời gian (chỉ mục gọn, chèn nhanh), tạo được cả trên thiết bị ──
create or replace function util.uuid_v7() returns uuid
language plpgsql volatile set search_path = pg_catalog as $$
declare
  ms bigint := floor(extract(epoch from clock_timestamp()) * 1000);
  b bytea := uuid_send(gen_random_uuid());   -- gen_random_uuid() có sẵn trong Postgres 13+, không cần pgcrypto
begin
  b := set_byte(b, 0, ((ms >> 40) & 255)::int);
  b := set_byte(b, 1, ((ms >> 32) & 255)::int);
  b := set_byte(b, 2, ((ms >> 24) & 255)::int);
  b := set_byte(b, 3, ((ms >> 16) & 255)::int);
  b := set_byte(b, 4, ((ms >> 8) & 255)::int);
  b := set_byte(b, 5, (ms & 255)::int);
  b := set_byte(b, 6, (get_byte(b, 6) & 15) | 112);  -- version 7
  b := set_byte(b, 8, (get_byte(b, 8) & 63) | 128);  -- variant RFC 4122
  return encode(b, 'hex')::uuid;
end $$;

-- ── Cột updated_at tự cập nhật ──
create or replace function util.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- Chuỗi đa ngôn ngữ {"vi": "...", "en": "..."} bắt buộc có tiếng Việt
create or replace function util.is_i18n(v jsonb) returns boolean
language sql immutable as $$
  select jsonb_typeof(v) = 'object' and v ? 'vi' and jsonb_typeof(v -> 'vi') = 'string'
$$;

-- Mã nghiệp vụ: chữ thường, số, . _ - / : (ổn định, dùng trong nhập/xuất và đồng bộ)
create or replace function util.is_key(v text) returns boolean
language sql immutable as $$
  select v ~ '^[a-z0-9][a-z0-9._/:-]{0,190}$'
$$;

grant usage on schema util to anon, authenticated, service_role;
grant execute on all functions in schema util to anon, authenticated, service_role;
