-- ════════════════════════════════════════════════════════════════════
-- 0006 · Bảo mật — mục 12
-- RLS bật trên MỌI bảng. Ứng dụng ghi dữ liệu học qua các hàm API (0007, security definer)
-- để các bảng tổng hợp luôn nhất quán; người dùng chỉ được ĐỌC dữ liệu của chính mình.
-- ════════════════════════════════════════════════════════════════════

do $$
declare r record;
begin
  for r in
    select n.nspname, c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname in ('catalog', 'assessment', 'identity', 'learning', 'analytics', 'engagement')
      and c.relkind in ('r', 'p')
  loop
    execute format('alter table %I.%I enable row level security', r.nspname, r.relname);
  end loop;
end $$;

grant usage on schema catalog, assessment, identity, learning, analytics, engagement to anon, authenticated, service_role;
grant all on all tables in schema catalog, assessment, identity, learning, analytics, engagement to service_role;

-- ── Nội dung: ai cũng đọc được phần đã xuất bản ──
grant select on catalog.subjects, catalog.item_types, catalog.courses, catalog.course_modules,
  catalog.lessons, catalog.learning_items, catalog.lesson_items, catalog.media_assets to anon, authenticated;

create policy read_all on catalog.subjects for select using (true);
create policy read_all on catalog.item_types for select using (true);
create policy read_published on catalog.courses for select
  using ((status = 'published' and archived_at is null) or identity.has_role('editor', 'course', id));
create policy read_all on catalog.course_modules for select using (archived_at is null or identity.has_role('editor'));
create policy read_published on catalog.lessons for select
  using ((status = 'published' and archived_at is null) or identity.has_role('editor', 'course', course_id));
create policy read_all on catalog.learning_items for select using (archived_at is null or identity.has_role('editor'));
create policy read_all on catalog.lesson_items for select using (true);
create policy read_all on catalog.media_assets for select using (true);

-- ── Đánh giá: đề công khai; đáp án (question_versions) KHÔNG cấp cho trình duyệt ──
grant select on assessment.assessments, assessment.questions, assessment.question_items to anon, authenticated;
create policy read_published on assessment.assessments for select using (status = 'published' or identity.has_role('editor'));
create policy read_active on assessment.questions for select using (status = 'active' or identity.has_role('editor'));
create policy read_all on assessment.question_items for select using (true);
-- assessment.question_versions / assessment_questions: chỉ service_role và hàm chấm điểm

-- ── Danh tính ──
grant select, update on identity.profiles to authenticated;
grant select, update on identity.user_settings to authenticated;
grant select, insert, delete on identity.learning_goals to authenticated;
grant select, insert on identity.consents to authenticated;
grant select on identity.user_roles, identity.devices to authenticated;

create policy own on identity.profiles for select using (user_id = auth.uid());
create policy own_update on identity.profiles for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own on identity.user_settings for select using (user_id = auth.uid());
create policy own_update on identity.user_settings for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own on identity.learning_goals for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own on identity.consents for select using (user_id = auth.uid());
create policy own_insert on identity.consents for insert with check (user_id = auth.uid());
create policy own on identity.user_roles for select using (user_id = auth.uid());
create policy own on identity.devices for select using (user_id = auth.uid());

-- ── Dữ liệu học: chỉ đọc của mình (ghi qua API) ──
grant select on learning.enrollments, learning.lesson_progress, learning.item_mastery, learning.srs_cards,
  learning.review_logs, learning.srs_parameters, learning.attempts, learning.responses,
  analytics.learning_events, analytics.study_sessions, analytics.daily_stats,
  engagement.streaks, engagement.xp_ledger to authenticated;

create policy own on learning.enrollments for select using (user_id = auth.uid());
create policy own on learning.lesson_progress for select using (user_id = auth.uid());
create policy own on learning.item_mastery for select using (user_id = auth.uid());
create policy own on learning.srs_cards for select using (user_id = auth.uid());
create policy own on learning.review_logs for select using (user_id = auth.uid());
create policy own on learning.srs_parameters for select using (user_id = auth.uid());
create policy own on learning.attempts for select using (user_id = auth.uid());
create policy own on learning.responses for select using (user_id = auth.uid());
create policy own on analytics.learning_events for select using (user_id = auth.uid());
create policy own on analytics.study_sessions for select using (user_id = auth.uid());
create policy own on analytics.daily_stats for select using (user_id = auth.uid());
create policy own on engagement.streaks for select using (user_id = auth.uid());
create policy own on engagement.xp_ledger for select using (user_id = auth.uid());

-- Hàm có security definer: chặn gọi trực tiếp từ trình duyệt
revoke execute on function analytics.ensure_event_partition(date) from public, anon, authenticated;
revoke execute on function identity.on_auth_user_created() from public, anon, authenticated;
