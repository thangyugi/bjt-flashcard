-- ════════════════════════════════════════════════════════════════════
-- 0009 · Portfolio: thêm trang Introduce (自己紹介) và Interview Q&A (面接Q&A)
-- Hai phần mới lưu thành jsonb trong profile.portfolios, cùng cách với header / pr / skills / education.
-- '{}' (mặc định) = người dùng chưa từng lưu → ứng dụng hiện nội dung mẫu.
-- ════════════════════════════════════════════════════════════════════

alter table profile.portfolios
  add column introduce jsonb not null default '{}' check (jsonb_typeof(introduce) = 'object'),
  add column interview jsonb not null default '{}' check (jsonb_typeof(interview) = 'object'),
  -- Bộ câu hỏi phỏng vấn có thể dài (mỗi câu hai thứ tiếng) → giới hạn riêng, rộng hơn phần cũ
  add constraint portfolios_intro_qa_size check (pg_column_size(introduce) + pg_column_size(interview) < 524288);

-- Đọc: thêm introduce / interview
create or replace function public.get_my_portfolio() returns jsonb
language sql stable security invoker set search_path = '' as $$
  select jsonb_build_object(
    'portfolio', (select jsonb_build_object('header', p.header, 'pr', p.pr, 'skills', p.skills, 'education', p.education,
                                            'introduce', p.introduce, 'interview', p.interview, 'updated_at', p.updated_at)
                  from profile.portfolios p where p.user_id = auth.uid()),
    'projects', (select coalesce(jsonb_agg(jsonb_build_object('id', x.id, 'sort', x.sort, 'data', x.data, 'updated_at', x.updated_at) order by x.sort, x.id), '[]')
                 from profile.portfolio_projects x where x.user_id = auth.uid())
  )
$$;

-- Lưu: chỉ các khóa có trong p (header / pr / skills / education / introduce / interview)
create or replace function public.save_my_portfolio(p jsonb) returns timestamptz
language plpgsql security invoker set search_path = '' as $$
declare v_at timestamptz;
begin
  if auth.uid() is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  insert into profile.portfolios as t (user_id, header, pr, skills, education, introduce, interview)
  values (auth.uid(), coalesce(p -> 'header', '{}'), coalesce(p -> 'pr', '{}'), coalesce(p -> 'skills', '{}'), coalesce(p -> 'education', '{}'),
          coalesce(p -> 'introduce', '{}'), coalesce(p -> 'interview', '{}'))
  on conflict (user_id) do update set
    header = coalesce(p -> 'header', t.header),
    pr = coalesce(p -> 'pr', t.pr),
    skills = coalesce(p -> 'skills', t.skills),
    education = coalesce(p -> 'education', t.education),
    introduce = coalesce(p -> 'introduce', t.introduce),
    interview = coalesce(p -> 'interview', t.interview)
  returning updated_at into v_at;
  return v_at;
end $$;

-- create or replace giữ nguyên quyền cũ (chỉ authenticated) — nhắc lại cho chắc chắn
revoke execute on function public.get_my_portfolio(), public.save_my_portfolio(jsonb) from public, anon;
grant execute on function public.get_my_portfolio(), public.save_my_portfolio(jsonb) to authenticated;
-- export_my_data() dùng to_jsonb(cả dòng) → tự có hai cột mới, không cần đổi.
