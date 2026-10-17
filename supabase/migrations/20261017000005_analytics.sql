-- ════════════════════════════════════════════════════════════════════
-- 0005 · Sự kiện, thống kê, động lực học — mục 10
-- learning_events phân vùng theo tháng; các bảng tổng hợp dựng lại được từ sự kiện.
-- ════════════════════════════════════════════════════════════════════

create table analytics.learning_events (
  id uuid not null,                                 -- do thiết bị tạo → gửi lại không trùng
  user_id uuid not null references auth.users (id) on delete cascade,
  verb text not null check (verb ~ '^[a-z_]+\.[a-z_]+$'),   -- lesson.completed, card.reviewed…
  object_key text,                                  -- mã bài / mục học / đề
  result jsonb not null default '{}',
  context jsonb not null default '{}',              -- thiết bị, phiên học, online/offline
  status text not null default 'applied' check (status in ('applied', 'pending', 'ignored')),
  occurred_at timestamptz not null,
  received_at timestamptz not null default now(),
  primary key (id, occurred_at)
) partition by range (occurred_at);

-- Phân vùng mặc định nhận mọi tháng chưa có phân vùng riêng
create table analytics.learning_events_default partition of analytics.learning_events default;

-- Tạo phân vùng cho một tháng (chạy hằng tháng bằng pg_cron, hoặc trước khi tháng mới bắt đầu)
create or replace function analytics.ensure_event_partition(p_month date) returns void
language plpgsql security definer set search_path = '' as $$
declare
  m date := date_trunc('month', p_month)::date;
  t text := format('learning_events_%s', to_char(m, 'YYYY_MM'));
begin
  if to_regclass('analytics.' || t) is null then
    execute format('create table analytics.%I partition of analytics.learning_events for values from (%L) to (%L)',
                   t, m, (m + interval '1 month')::date);
  end if;
end $$;

select analytics.ensure_event_partition(d::date)
from generate_series(date_trunc('month', now()), date_trunc('month', now()) + interval '12 months', interval '1 month') d;

create index on analytics.learning_events (user_id, occurred_at desc);
create index on analytics.learning_events (status) where status = 'pending';

-- ── Phiên học ──
create table analytics.study_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  active_seconds int not null default 0,
  device text,
  updated_at timestamptz not null default now()
);
create index on analytics.study_sessions (user_id, started_at desc);

-- ── Tổng hợp theo ngày (ngày theo múi giờ người học) ──
create table analytics.daily_stats (
  user_id uuid not null references auth.users (id) on delete cascade,
  local_date date not null,
  active_seconds int not null default 0,
  lessons_completed int not null default 0,
  items_new int not null default 0,
  reviews int not null default 0,
  reviews_correct int not null default 0,
  questions int not null default 0,
  questions_correct int not null default 0,
  xp int not null default 0,
  courses jsonb not null default '{}',              -- {course_key: số hoạt động}
  updated_at timestamptz not null default now(),
  primary key (user_id, local_date)
);

-- ── Động lực học ──
create table engagement.streaks (
  user_id uuid primary key references auth.users (id) on delete cascade,
  current_days int not null default 0,
  longest_days int not null default 0,
  last_active_date date,
  freezes_left int not null default 2,
  updated_at timestamptz not null default now()
);

create table engagement.xp_ledger (
  id uuid primary key default util.uuid_v7(),
  user_id uuid not null references auth.users (id) on delete cascade,
  amount int not null,
  reason text not null,
  ref_id uuid,                                      -- sự kiện gây ra
  created_at timestamptz not null default now(),
  unique (user_id, ref_id, reason)
);
create index on engagement.xp_ledger (user_id, created_at desc);

create trigger t_touch before update on analytics.daily_stats for each row execute function util.touch_updated_at();
create trigger t_touch before update on engagement.streaks for each row execute function util.touch_updated_at();
