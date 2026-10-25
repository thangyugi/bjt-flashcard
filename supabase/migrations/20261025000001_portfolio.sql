-- ════════════════════════════════════════════════════════════════════
-- 0008 · Portfolio (職務経歴書) của từng tài khoản
-- Mỗi người một portfolio: phần đầu trang, 自己PR, kỹ năng, học vấn (jsonb trong profile.portfolios)
-- và danh sách dự án (mỗi dự án một dòng trong profile.portfolio_projects).
-- Khác dữ liệu học, đây là nội dung người dùng tự soạn → RLS cho phép đọc / thêm / sửa / xóa dòng của chính mình.
-- Ứng dụng gọi các hàm public.*portfolio* bên dưới (security invoker: RLS vẫn áp dụng), nên không cần
-- mở schema "profile" cho PostgREST.
-- ════════════════════════════════════════════════════════════════════

create schema if not exists profile;
comment on schema profile is 'Hồ sơ nghề nghiệp do người dùng tự soạn: portfolio, dự án';

create table profile.portfolios (
  user_id uuid primary key references auth.users (id) on delete cascade,
  header jsonb not null default '{}' check (jsonb_typeof(header) = 'object'),
  pr jsonb not null default '{}' check (jsonb_typeof(pr) = 'object'),
  skills jsonb not null default '{}' check (jsonb_typeof(skills) = 'object'),
  education jsonb not null default '{}' check (jsonb_typeof(education) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Giới hạn kích thước để một tài khoản không làm phình cơ sở dữ liệu
  check (pg_column_size(header) + pg_column_size(pr) + pg_column_size(skills) + pg_column_size(education) < 262144)
);

-- Dự án: các khóa bắt buộc của mẫu 職務経歴書 (案件名, 期間 từ, 参加工程, 技術要素, 担当内容)
create table profile.portfolio_projects (
  id uuid primary key default util.uuid_v7(),       -- thiết bị có thể tự tạo id (sửa offline rồi đồng bộ sau)
  user_id uuid not null references auth.users (id) on delete cascade,
  sort int not null default 0,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint portfolio_projects_data_shape check (
    jsonb_typeof(data) = 'object'
    and data ?& array['title', 'from', 'phases', 'tech', 'duties']
    and jsonb_typeof(data -> 'title') = 'string' and char_length(btrim(data ->> 'title')) between 1 and 200
    and jsonb_typeof(data -> 'from') = 'string' and (data ->> 'from') ~ '^\d{4}-(0[1-9]|1[0-2])$'
    and (not data ? 'to' or jsonb_typeof(data -> 'to') = 'null' or (data ->> 'to') ~ '^\d{4}-(0[1-9]|1[0-2])$')
    and jsonb_typeof(data -> 'phases') = 'array'
    and jsonb_typeof(data -> 'tech') = 'object'
    and jsonb_typeof(data -> 'duties') = 'array'
    and pg_column_size(data) < 65536
  )
);
create index on profile.portfolio_projects (user_id, sort);

create trigger t_touch before update on profile.portfolios for each row execute function util.touch_updated_at();
create trigger t_touch before update on profile.portfolio_projects for each row execute function util.touch_updated_at();

-- ── Bảo mật: chỉ dòng của chính mình; khách (anon) không có quyền gì ──
alter table profile.portfolios enable row level security;
alter table profile.portfolio_projects enable row level security;

grant usage on schema profile to authenticated, service_role;
grant all on all tables in schema profile to service_role;
grant select, insert, update, delete on profile.portfolios, profile.portfolio_projects to authenticated;

create policy own_select on profile.portfolios for select using (user_id = auth.uid());
create policy own_insert on profile.portfolios for insert with check (user_id = auth.uid());
create policy own_update on profile.portfolios for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_delete on profile.portfolios for delete using (user_id = auth.uid());
create policy own_select on profile.portfolio_projects for select using (user_id = auth.uid());
create policy own_insert on profile.portfolio_projects for insert with check (user_id = auth.uid());
create policy own_update on profile.portfolio_projects for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_delete on profile.portfolio_projects for delete using (user_id = auth.uid());

-- ── API (schema public → supabase.rpc). security invoker: chạy bằng quyền người gọi, RLS chặn dòng của người khác ──

-- Toàn bộ portfolio của mình: { portfolio: {...} | null, projects: [{id, sort, data, updated_at}] }
create or replace function public.get_my_portfolio() returns jsonb
language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object(
    'portfolio', (select jsonb_build_object('header', p.header, 'pr', p.pr, 'skills', p.skills, 'education', p.education, 'updated_at', p.updated_at)
                  from profile.portfolios p where p.user_id = auth.uid()),
    'projects', (select coalesce(jsonb_agg(jsonb_build_object('id', x.id, 'sort', x.sort, 'data', x.data, 'updated_at', x.updated_at) order by x.sort, x.id), '[]')
                 from profile.portfolio_projects x where x.user_id = auth.uid())
  )
$$;

-- Lưu các phần của portfolio (chỉ các khóa có trong p: header / pr / skills / education); tạo dòng nếu chưa có
create or replace function public.save_my_portfolio(p jsonb) returns timestamptz
language plpgsql security invoker set search_path = '' as $$
declare v_at timestamptz;
begin
  if auth.uid() is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  insert into profile.portfolios as t (user_id, header, pr, skills, education)
  values (auth.uid(), coalesce(p -> 'header', '{}'), coalesce(p -> 'pr', '{}'), coalesce(p -> 'skills', '{}'), coalesce(p -> 'education', '{}'))
  on conflict (user_id) do update set
    header = coalesce(p -> 'header', t.header),
    pr = coalesce(p -> 'pr', t.pr),
    skills = coalesce(p -> 'skills', t.skills),
    education = coalesce(p -> 'education', t.education)
  returning updated_at into v_at;
  return v_at;
end $$;

-- Thêm hoặc sửa một dự án (id do thiết bị tạo → gửi lại nhiều lần không trùng)
create or replace function public.upsert_my_portfolio_project(p_id uuid, p_sort int, p_data jsonb) returns timestamptz
language plpgsql security invoker set search_path = '' as $$
declare v_at timestamptz;
begin
  if auth.uid() is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  insert into profile.portfolio_projects as t (id, user_id, sort, data)
  values (p_id, auth.uid(), coalesce(p_sort, 0), p_data)
  on conflict (id) do update set sort = coalesce(p_sort, t.sort), data = excluded.data
    where t.user_id = auth.uid()
  returning updated_at into v_at;
  if v_at is null then raise exception 'project belongs to another user' using errcode = '42501'; end if;
  return v_at;
end $$;

create or replace function public.delete_my_portfolio_projects(p_ids uuid[]) returns int
language sql security invoker set search_path = '' as $$
  with d as (delete from profile.portfolio_projects where user_id = auth.uid() and id = any (p_ids) returning 1)
  select count(*)::int from d
$$;

-- Thứ tự dự án: sort = vị trí trong mảng
create or replace function public.reorder_my_portfolio_projects(p_ids uuid[]) returns void
language sql security invoker set search_path = '' as $$
  update profile.portfolio_projects t set sort = o.ord - 1
  from unnest(p_ids) with ordinality as o (id, ord)
  where t.id = o.id and t.user_id = auth.uid() and t.sort is distinct from (o.ord - 1)::int
$$;

-- Xóa sạch portfolio (bắt đầu từ trang trống được làm ở ứng dụng bằng save + delete; hàm này để xóa hẳn)
create or replace function public.delete_my_portfolio() returns void
language sql security invoker set search_path = '' as $$
  delete from profile.portfolio_projects where user_id = auth.uid();
  delete from profile.portfolios where user_id = auth.uid();
$$;

revoke execute on function public.get_my_portfolio(), public.save_my_portfolio(jsonb), public.upsert_my_portfolio_project(uuid, int, jsonb),
  public.delete_my_portfolio_projects(uuid[]), public.reorder_my_portfolio_projects(uuid[]), public.delete_my_portfolio() from public, anon;
grant execute on function public.get_my_portfolio(), public.save_my_portfolio(jsonb), public.upsert_my_portfolio_project(uuid, int, jsonb),
  public.delete_my_portfolio_projects(uuid[]), public.reorder_my_portfolio_projects(uuid[]), public.delete_my_portfolio() to authenticated;

-- ── Xuất dữ liệu (Nghị định 13/2023): thêm portfolio + dự án ──
create or replace function public.export_my_data() returns jsonb
language sql stable security definer set search_path = '' as $$
  with me as (select auth.uid() as uid)
  select jsonb_build_object(
    'exported_at', now(),
    'profile', (select to_jsonb(p) from identity.profiles p where user_id = (select uid from me)),
    'settings', (select to_jsonb(s) from identity.user_settings s where user_id = (select uid from me)),
    'consents', (select coalesce(jsonb_agg(to_jsonb(c)), '[]') from identity.consents c where user_id = (select uid from me)),
    'enrollments', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from learning.enrollments x where user_id = (select uid from me)),
    'lesson_progress', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from learning.lesson_progress x where user_id = (select uid from me)),
    'item_mastery', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from learning.item_mastery x where user_id = (select uid from me)),
    'srs_cards', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from learning.srs_cards x where user_id = (select uid from me)),
    'review_logs', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from learning.review_logs x where user_id = (select uid from me)),
    'attempts', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from learning.attempts x where user_id = (select uid from me)),
    'daily_stats', (select coalesce(jsonb_agg(to_jsonb(x)), '[]') from analytics.daily_stats x where user_id = (select uid from me)),
    'streak', (select to_jsonb(x) from engagement.streaks x where user_id = (select uid from me)),
    'portfolio', (select to_jsonb(x) from profile.portfolios x where user_id = (select uid from me)),
    'portfolio_projects', (select coalesce(jsonb_agg(to_jsonb(x) order by x.sort), '[]') from profile.portfolio_projects x where user_id = (select uid from me))
  )
$$;
-- delete_my_account() xóa auth.users → hai bảng trên xóa dây chuyền (on delete cascade), không cần đổi.
