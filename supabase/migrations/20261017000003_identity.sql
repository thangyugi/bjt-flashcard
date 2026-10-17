-- ════════════════════════════════════════════════════════════════════
-- 0003 · Miền Danh tính (identity) — mục 6 của tài liệu thiết kế
-- Tài khoản do Supabase Auth quản lý (auth.users); mọi bảng cá nhân trỏ về auth.users.id
-- và bị xóa dây chuyền khi người dùng xóa tài khoản.
-- ════════════════════════════════════════════════════════════════════

create table identity.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 60),
  avatar_url text,
  ui_locale text not null default 'vi',
  timezone text not null default 'Asia/Ho_Chi_Minh',
  native_language text default 'vi',
  onboarding_state jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table identity.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  voice_gender text not null default 'male' check (voice_gender in ('male', 'female')),
  en_accent text not null default 'uk' check (en_accent in ('uk', 'us')),
  speech_rate real not null default 0.9 check (speech_rate between 0.5 and 1.5),
  daily_new_limit int not null default 20 check (daily_new_limit between 0 and 500),
  daily_review_limit int not null default 200 check (daily_review_limit between 0 and 5000),
  desired_retention real not null default 0.9 check (desired_retention between 0.7 and 0.99),
  reminder_time time,
  extra jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table identity.learning_goals (
  id uuid primary key default util.uuid_v7(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid references catalog.courses (id) on delete cascade,
  goal_type text not null check (goal_type in ('exam_date', 'daily_minutes', 'items_per_week')),
  target numeric,
  deadline date,
  created_at timestamptz not null default now()
);
create index on identity.learning_goals (user_id);

-- Vai trò có phạm vi: global / course (org thêm ở giai đoạn 4)
create table identity.user_roles (
  user_id uuid not null references auth.users (id) on delete cascade,
  role_key text not null check (role_key in ('learner', 'teacher', 'editor', 'reviewer', 'admin')),
  scope_type text not null default 'global' check (scope_type in ('global', 'course', 'org')),
  scope_id uuid,
  granted_by uuid references auth.users (id) on delete set null,
  granted_at timestamptz not null default now(),
  unique nulls not distinct (user_id, role_key, scope_type, scope_id)
);

-- Đồng ý xử lý dữ liệu (Nghị định 13/2023): lưu từng lần, theo phiên bản chính sách
create table identity.consents (
  id uuid primary key default util.uuid_v7(),
  user_id uuid not null references auth.users (id) on delete cascade,
  purpose text not null check (purpose in ('terms', 'privacy', 'analytics', 'marketing')),
  version text not null,
  granted boolean not null,
  recorded_at timestamptz not null default now()
);
create index on identity.consents (user_id, purpose, recorded_at desc);

create table identity.devices (
  id uuid primary key,                              -- do thiết bị tự tạo
  user_id uuid not null references auth.users (id) on delete cascade,
  platform text,
  app_version text,
  last_sync_at timestamptz,
  created_at timestamptz not null default now()
);
create index on identity.devices (user_id);

create trigger t_touch before update on identity.profiles for each row execute function util.touch_updated_at();
create trigger t_touch before update on identity.user_settings for each row execute function util.touch_updated_at();

-- Quyền: hàm dùng trong chính sách RLS
create or replace function identity.has_role(p_role text, p_scope_type text default 'global', p_scope_id uuid default null)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from identity.user_roles r
    where r.user_id = auth.uid()
      and (r.role_key = p_role or r.role_key = 'admin')
      and (r.scope_type = 'global' or (r.scope_type = p_scope_type and r.scope_id is not distinct from p_scope_id))
  )
$$;

-- Tạo hồ sơ + cài đặt mặc định khi có tài khoản mới
create or replace function identity.on_auth_user_created() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into identity.profiles (user_id, display_name)
  values (new.id, nullif(coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), ''))
  on conflict do nothing;
  insert into identity.user_settings (user_id) values (new.id) on conflict do nothing;
  -- Đồng ý điều khoản + chính sách quyền riêng tư khi đăng ký bằng email (app gửi kèm phiên bản)
  if new.raw_user_meta_data ? 'consent_version' then
    insert into identity.consents (user_id, purpose, version, granted)
    select new.id, p, new.raw_user_meta_data ->> 'consent_version', true from unnest(array['terms', 'privacy']) p;
  end if;
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function identity.on_auth_user_created();
