-- ════════════════════════════════════════════════════════════════════
-- 0007 · API cho ứng dụng (schema public → gọi bằng supabase.rpc)
--
-- Ứng dụng chạy offline-first: mọi thao tác học được ghi thành SỰ KIỆN trên thiết bị (id UUID do
-- thiết bị tạo), rồi gửi lên bằng sync_push. Máy chủ chèn sự kiện "on conflict do nothing" và chỉ áp
-- dụng tác động cho sự kiện mới → gửi lại bao nhiêu lần cũng không trùng (mục 13.3).
-- Sự kiện trỏ tới bài / mục học chưa có trong catalog được giữ ở trạng thái 'pending' và áp dụng lại
-- bằng analytics.reapply_pending() sau khi đồng bộ catalog.
-- ════════════════════════════════════════════════════════════════════

-- ── Ngày học theo múi giờ của người học ──
create or replace function learning.local_date(p_user uuid, p_at timestamptz) returns date
language sql stable security definer set search_path = '' as $$
  select (p_at at time zone coalesce((select timezone from identity.profiles where user_id = p_user), 'Asia/Ho_Chi_Minh'))::date
$$;

-- ── Cộng dồn thống kê ngày + chuỗi ngày học + XP ──
create or replace function analytics.bump_daily(
  p_user uuid, p_at timestamptz, p_course text, p_event uuid, p_reason text, p_xp int,
  p_lessons int default 0, p_new int default 0, p_reviews int default 0, p_reviews_ok int default 0,
  p_questions int default 0, p_questions_ok int default 0, p_seconds int default 0
) returns void language plpgsql security definer set search_path = '' as $$
declare
  d date := learning.local_date(p_user, p_at);
  s engagement.streaks%rowtype;
begin
  insert into analytics.daily_stats as t (user_id, local_date, active_seconds, lessons_completed, items_new, reviews,
    reviews_correct, questions, questions_correct, xp, courses)
  values (p_user, d, p_seconds, p_lessons, p_new, p_reviews, p_reviews_ok, p_questions, p_questions_ok, greatest(p_xp, 0),
    case when p_course is null then '{}'::jsonb else jsonb_build_object(p_course, 1) end)
  on conflict (user_id, local_date) do update set
    active_seconds = t.active_seconds + excluded.active_seconds,
    lessons_completed = t.lessons_completed + excluded.lessons_completed,
    items_new = t.items_new + excluded.items_new,
    reviews = t.reviews + excluded.reviews,
    reviews_correct = t.reviews_correct + excluded.reviews_correct,
    questions = t.questions + excluded.questions,
    questions_correct = t.questions_correct + excluded.questions_correct,
    xp = t.xp + excluded.xp,
    courses = case when p_course is null then t.courses
      else t.courses || jsonb_build_object(p_course, coalesce((t.courses ->> p_course)::int, 0) + 1) end;

  if p_xp > 0 then
    insert into engagement.xp_ledger (user_id, amount, reason, ref_id) values (p_user, p_xp, p_reason, p_event)
    on conflict do nothing;
  end if;

  -- Chuỗi ngày học: chỉ hoạt động học thật mới giữ chuỗi (mở trang, thời gian trên trang không tính)
  if p_reason in ('time', 'open') then return; end if;
  select * into s from engagement.streaks where user_id = p_user for update;
  if not found then
    insert into engagement.streaks (user_id, current_days, longest_days, last_active_date) values (p_user, 1, 1, d);
  elsif s.last_active_date is null or d > s.last_active_date then
    if s.last_active_date = d - 1 then
      s.current_days := s.current_days + 1;
    elsif s.last_active_date = d - 2 and s.freezes_left > 0 then   -- bỏ lỡ 1 ngày: dùng "ngày đóng băng"
      s.current_days := s.current_days + 1;
      s.freezes_left := s.freezes_left - 1;
    else
      s.current_days := 1;
    end if;
    update engagement.streaks set current_days = s.current_days, longest_days = greatest(s.longest_days, s.current_days),
      last_active_date = d, freezes_left = s.freezes_left where user_id = p_user;
  end if;
end $$;

-- ── Áp dụng MỘT sự kiện. Trả về 'applied' | 'pending' (chưa có trong catalog) | 'ignored' ──
create or replace function analytics.apply_event(p_user uuid, e analytics.learning_events) returns text
language plpgsql security definer set search_path = '' as $$
declare
  v_lesson catalog.lessons%rowtype;
  v_course_id uuid;
  v_course_key text := e.result ->> 'course';
  v_item_id uuid;
  v_card uuid;
  v_after jsonb := e.result -> 'after';
  v_rating int;
  v_score numeric;
  v_total numeric;
  v_status text;
begin
  if v_course_key is not null then
    select id into v_course_id from catalog.courses where key = v_course_key;
  end if;

  case e.verb
  -- ─ Bài học ─
  when 'lesson.opened', 'lesson.completed', 'lesson.reopened' then
    select * into v_lesson from catalog.lessons where key = e.object_key;
    if not found then return 'pending'; end if;
    v_course_id := v_lesson.course_id;
    v_status := case e.verb when 'lesson.completed' then 'completed' else 'in_progress' end;

    insert into learning.lesson_progress as p (user_id, lesson_id, status, content_version, first_opened_at, completed_at, status_changed_at)
    values (p_user, v_lesson.id, v_status, case when v_status = 'completed' then v_lesson.content_version end,
            e.occurred_at, case when v_status = 'completed' then e.occurred_at end, e.occurred_at)
    on conflict (user_id, lesson_id) do update set
      first_opened_at = least(p.first_opened_at, excluded.first_opened_at),
      -- "mở bài" không làm mất trạng thái hoàn thành; đánh dấu/bỏ đánh dấu: thao tác mới nhất thắng
      status = case when e.verb = 'lesson.opened' then p.status
                    when excluded.status_changed_at >= p.status_changed_at then excluded.status else p.status end,
      completed_at = case when e.verb = 'lesson.completed' then coalesce(least(p.completed_at, e.occurred_at), e.occurred_at)
                          when e.verb = 'lesson.reopened' and excluded.status_changed_at >= p.status_changed_at then null
                          else p.completed_at end,
      content_version = case when e.verb = 'lesson.completed' then excluded.content_version else p.content_version end,
      status_changed_at = case when e.verb = 'lesson.opened' then p.status_changed_at
                               else greatest(p.status_changed_at, excluded.status_changed_at) end;

    insert into learning.enrollments as en (user_id, course_id, last_lesson_id, last_activity_at, enrolled_at)
    values (p_user, v_course_id, v_lesson.id, e.occurred_at, e.occurred_at)
    on conflict (user_id, course_id) do update set
      last_lesson_id = case when e.occurred_at >= coalesce(en.last_activity_at, '-infinity') then excluded.last_lesson_id else en.last_lesson_id end,
      last_activity_at = greatest(en.last_activity_at, excluded.last_activity_at),
      enrolled_at = least(en.enrolled_at, excluded.enrolled_at);

    -- Phần trăm hoàn thành khóa
    update learning.enrollments set progress_pct = round(100.0 *
        (select count(*) from learning.lesson_progress lp join catalog.lessons l on l.id = lp.lesson_id
         where lp.user_id = p_user and l.course_id = v_course_id and lp.status = 'completed')
        / greatest(1, (select count(*) from catalog.lessons l where l.course_id = v_course_id and l.status = 'published')), 2)
    where user_id = p_user and course_id = v_course_id;

    if e.verb = 'lesson.completed' then
      perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'lesson', 20, p_lessons => 1);
    elsif e.verb = 'lesson.opened' then
      perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'open', 0);
    end if;
    return 'applied';

  -- ─ Làm bài kiểm tra ─
  when 'quiz.submitted' then
    v_score := (e.result ->> 'score')::numeric;
    v_total := (e.result ->> 'total')::numeric;
    if v_score is null or v_total is null or v_total <= 0 or v_score < 0 or v_score > v_total then return 'ignored'; end if;
    if e.result ? 'lesson' then
      select * into v_lesson from catalog.lessons where key = e.result ->> 'lesson';
      if found then v_course_id := coalesce(v_course_id, v_lesson.course_id); end if;
    end if;

    insert into learning.attempts (id, user_id, assessment_key, assessment_id, course_id, lesson_id, attempt_no, score, max_score,
      passed, submitted_at, time_spent_sec)
    values (e.id, p_user, e.object_key, (select id from assessment.assessments where key = e.object_key), v_course_id, v_lesson.id,
      1 + (select count(*) from learning.attempts where user_id = p_user and assessment_key = e.object_key),
      v_score, v_total, (e.result ->> 'passed')::boolean, e.occurred_at, (e.result ->> 'seconds')::int)
    on conflict (id) do nothing;

    if v_lesson.id is not null then
      update learning.lesson_progress set best_score = greatest(coalesce(best_score, 0), round(100 * v_score / v_total, 2))
      where user_id = p_user and lesson_id = v_lesson.id;
    end if;
    perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'quiz', round(10 * v_score / v_total)::int,
      p_questions => v_total::int, p_questions_ok => v_score::int);
    return 'applied';

  -- ─ Thẻ ôn tập ─
  when 'card.enrolled', 'card.reviewed', 'card.suspended' then
    select id into v_item_id from catalog.learning_items where key = e.object_key;
    if v_item_id is null then return 'pending'; end if;

    if e.verb = 'card.enrolled' then
      insert into learning.srs_cards (user_id, item_id, card_kind, due_at, source_course_id)
      values (p_user, v_item_id, coalesce(e.result ->> 'kind', 'recognize'), e.occurred_at, v_course_id)
      on conflict (user_id, item_id, card_kind) do nothing;
      insert into learning.item_mastery (user_id, item_id, stage, first_seen_at, last_seen_at)
      values (p_user, v_item_id, 'seen', e.occurred_at, e.occurred_at)
      on conflict (user_id, item_id) do nothing;
      perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'enroll', 0, p_new => 1);
      return 'applied';
    end if;

    if e.verb = 'card.suspended' then
      update learning.srs_cards set state = 'suspended'
      where user_id = p_user and item_id = v_item_id and card_kind = coalesce(e.result ->> 'kind', 'recognize');
      return 'applied';
    end if;

    -- card.reviewed: thiết bị tính FSRS, máy chủ lưu kết quả; bản ghi mới nhất (theo thời điểm ôn) thắng
    v_rating := (e.result ->> 'rating')::int;
    if v_rating is null or v_rating not between 1 and 4 or v_after is null then return 'ignored'; end if;

    insert into learning.srs_cards as c (user_id, item_id, card_kind, state, due_at, stability, difficulty, elapsed_days,
      scheduled_days, learning_steps, reps, lapses, last_review_at, source_course_id)
    values (p_user, v_item_id, coalesce(e.result ->> 'kind', 'recognize'), v_after ->> 'state', (v_after ->> 'due')::timestamptz,
      (v_after ->> 'stability')::real, (v_after ->> 'difficulty')::real, coalesce((v_after ->> 'elapsed_days')::int, 0),
      coalesce((v_after ->> 'scheduled_days')::int, 0), coalesce((v_after ->> 'learning_steps')::int, 0),
      coalesce((v_after ->> 'reps')::int, 1), coalesce((v_after ->> 'lapses')::int, 0), e.occurred_at, v_course_id)
    on conflict (user_id, item_id, card_kind) do update set
      state = excluded.state, due_at = excluded.due_at, stability = excluded.stability, difficulty = excluded.difficulty,
      elapsed_days = excluded.elapsed_days, scheduled_days = excluded.scheduled_days, learning_steps = excluded.learning_steps,
      reps = excluded.reps, lapses = excluded.lapses, last_review_at = excluded.last_review_at
    where c.last_review_at is null or c.last_review_at <= excluded.last_review_at
    returning id into v_card;

    if v_card is null then
      select id into v_card from learning.srs_cards
      where user_id = p_user and item_id = v_item_id and card_kind = coalesce(e.result ->> 'kind', 'recognize');
    end if;

    insert into learning.review_logs (id, user_id, card_id, item_id, card_kind, rating, state_before, stability_before,
      difficulty_before, elapsed_days, scheduled_days, duration_ms, source, reviewed_at)
    values (e.id, p_user, v_card, v_item_id, coalesce(e.result ->> 'kind', 'recognize'), v_rating,
      e.result -> 'before' ->> 'state', (e.result -> 'before' ->> 'stability')::real, (e.result -> 'before' ->> 'difficulty')::real,
      (v_after ->> 'elapsed_days')::int, (v_after ->> 'scheduled_days')::int, (e.result ->> 'duration_ms')::int,
      coalesce(e.result ->> 'source', 'review'), e.occurred_at)
    on conflict (id) do nothing;

    insert into learning.item_mastery as m (user_id, item_id, stage, mastery, correct_count, wrong_count, first_seen_at, last_seen_at)
    values (p_user, v_item_id,
      case when v_rating = 1 and coalesce((v_after ->> 'lapses')::int, 0) > 0 then 'lapsed'
           when v_after ->> 'state' in ('learning', 'relearning') then 'learning'
           when (v_after ->> 'stability')::real >= 21 then 'mastered' else 'reviewing' end,
      least(1, greatest(0, (v_after ->> 'stability')::real / 60)),
      (v_rating > 1)::int, (v_rating = 1)::int, e.occurred_at, e.occurred_at)
    on conflict (user_id, item_id) do update set
      stage = case when e.occurred_at >= m.last_seen_at then excluded.stage else m.stage end,
      mastery = case when e.occurred_at >= m.last_seen_at then excluded.mastery else m.mastery end,
      correct_count = m.correct_count + excluded.correct_count,
      wrong_count = m.wrong_count + excluded.wrong_count,
      last_seen_at = greatest(m.last_seen_at, excluded.last_seen_at);

    -- Thẻ nhập từ dữ liệu cũ trên máy: chỉ lưu trạng thái, không tính là một lượt ôn
    if coalesce(e.result ->> 'source', '') <> 'import' then
      perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'review', case when v_rating >= 3 then 2 else 1 end,
        p_reviews => 1, p_reviews_ok => (v_rating > 1)::int);
    end if;
    return 'applied';

  -- ─ Tự đánh giá thẻ từ (flashcard BJT: đã thuộc / đang học / chưa biết) ─
  when 'item.marked' then
    select id into v_item_id from catalog.learning_items where key = e.object_key;
    if v_item_id is null then return 'pending'; end if;
    v_status := e.result ->> 'status';
    if v_status not in ('known', 'learning', 'new') then return 'ignored'; end if;
    insert into learning.item_mastery as m (user_id, item_id, stage, mastery, first_seen_at, last_seen_at)
    values (p_user, v_item_id, case v_status when 'known' then 'mastered' when 'learning' then 'learning' else 'seen' end,
      case v_status when 'known' then 0.8 when 'learning' then 0.4 else 0.1 end, e.occurred_at, e.occurred_at)
    on conflict (user_id, item_id) do update set
      stage = case when e.occurred_at >= m.last_seen_at then excluded.stage else m.stage end,
      mastery = case when e.occurred_at >= m.last_seen_at then excluded.mastery else m.mastery end,
      last_seen_at = greatest(m.last_seen_at, excluded.last_seen_at);
    perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'mark', case when v_status = 'known' then 1 else 0 end,
      p_reviews => 1, p_reviews_ok => (v_status = 'known')::int);
    return 'applied';

  -- ─ Thời gian học (thiết bị gửi từng đợt ~1 phút) ─
  when 'time.spent' then
    if coalesce((e.result ->> 'seconds')::int, 0) not between 1 and 3600 then return 'ignored'; end if;
    if e.result ? 'session' then
      insert into analytics.study_sessions as s (id, user_id, started_at, ended_at, active_seconds, device)
      values ((e.result ->> 'session')::uuid, p_user, e.occurred_at - make_interval(secs => (e.result ->> 'seconds')::int),
        e.occurred_at, (e.result ->> 'seconds')::int, e.context ->> 'device')
      on conflict (id) do update set
        started_at = least(s.started_at, excluded.started_at), ended_at = greatest(s.ended_at, excluded.ended_at),
        active_seconds = s.active_seconds + excluded.active_seconds
      where s.user_id = p_user;
    end if;
    perform analytics.bump_daily(p_user, e.occurred_at, v_course_key, e.id, 'time', 0, p_seconds => (e.result ->> 'seconds')::int);
    return 'applied';

  else
    return 'ignored';
  end case;
end $$;

-- ════ API công khai ════

-- Gửi sự kiện từ thiết bị. p_events = [{id, verb, object, at, data, ctx}]
create or replace function public.sync_push(p_events jsonb, p_device jsonb default null) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_user uuid := auth.uid();
  j jsonb;
  ev analytics.learning_events;
  v_inserted int;
  v_new int := 0;
  v_pending int := 0;
  v_status text;
begin
  if v_user is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  if jsonb_typeof(p_events) <> 'array' then raise exception 'p_events must be an array'; end if;
  if jsonb_array_length(p_events) > 500 then raise exception 'too many events (max 500 per call)'; end if;

  if p_device is not null and p_device ? 'id' then
    insert into identity.devices as d (id, user_id, platform, app_version, last_sync_at)
    values ((p_device ->> 'id')::uuid, v_user, p_device ->> 'platform', p_device ->> 'version', now())
    on conflict (id) do update set last_sync_at = now(), platform = excluded.platform, app_version = excluded.app_version
    where d.user_id = v_user;
  end if;

  -- Sắp theo thời điểm xảy ra để trạng thái dựng lại đúng thứ tự
  for j in select x from jsonb_array_elements(p_events) x order by (x ->> 'at')::timestamptz loop
    ev.id := (j ->> 'id')::uuid;
    ev.user_id := v_user;
    ev.verb := j ->> 'verb';
    ev.object_key := j ->> 'object';
    ev.result := coalesce(j -> 'data', '{}');
    ev.context := coalesce(j -> 'ctx', '{}');
    -- Không nhận sự kiện "ở tương lai" quá 1 ngày (đồng hồ thiết bị sai)
    ev.occurred_at := least((j ->> 'at')::timestamptz, now() + interval '1 day');
    ev.status := 'applied';

    insert into analytics.learning_events (id, user_id, verb, object_key, result, context, status, occurred_at)
    values (ev.id, v_user, ev.verb, ev.object_key, ev.result, ev.context, 'pending', ev.occurred_at)
    on conflict do nothing;
    get diagnostics v_inserted = row_count;
    if v_inserted = 0 then continue; end if;      -- đã nhận trước đó

    v_new := v_new + 1;
    v_status := analytics.apply_event(v_user, ev);
    if v_status = 'pending' then v_pending := v_pending + 1; end if;
    update analytics.learning_events set status = v_status where id = ev.id and occurred_at = ev.occurred_at;
  end loop;

  return jsonb_build_object('received', jsonb_array_length(p_events), 'new', v_new, 'pending', v_pending, 'server_time', now());
end $$;

-- Lấy trạng thái học (thay đổi từ p_since) để gộp vào thiết bị
create or replace function public.sync_pull(p_since timestamptz default null) returns jsonb
language sql stable security definer set search_path = '' as $$
  with me as (select auth.uid() as uid), since as (select coalesce(p_since, '-infinity'::timestamptz) as t)
  select jsonb_build_object(
    'server_time', now(),
    'lessons', coalesce((
      select jsonb_agg(jsonb_build_object('lesson', l.key, 'course', c.key, 'status', lp.status,
        'completed_at', lp.completed_at, 'best_score', lp.best_score, 'changed_at', lp.status_changed_at))
      from learning.lesson_progress lp join catalog.lessons l on l.id = lp.lesson_id join catalog.courses c on c.id = l.course_id
      where lp.user_id = (select uid from me) and lp.updated_at > (select t from since)), '[]'),
    'quizzes', coalesce((
      select jsonb_agg(q) from (
        select jsonb_build_object('assessment', a.assessment_key, 'best', max(a.score),
          'last', (array_agg(a.score order by a.submitted_at desc))[1],
          'total', (array_agg(a.max_score order by a.submitted_at desc))[1], 'at', max(a.submitted_at)) q
        from learning.attempts a
        where a.user_id = (select uid from me)
          and a.assessment_key in (select assessment_key from learning.attempts
                                   where user_id = (select uid from me) and received_at > (select t from since))
        group by a.assessment_key) x), '[]'),
    'cards', coalesce((
      select jsonb_agg(jsonb_build_object('item', i.key, 'kind', s.card_kind, 'state', s.state, 'due', s.due_at,
        'stability', s.stability, 'difficulty', s.difficulty, 'elapsed_days', s.elapsed_days, 'scheduled_days', s.scheduled_days,
        'learning_steps', s.learning_steps, 'reps', s.reps, 'lapses', s.lapses, 'last_review', s.last_review_at))
      from learning.srs_cards s join catalog.learning_items i on i.id = s.item_id
      where s.user_id = (select uid from me) and s.updated_at > (select t from since)), '[]'),
    'marks', coalesce((
      select jsonb_agg(jsonb_build_object('item', i.key, 'stage', m.stage, 'mastery', m.mastery, 'at', m.last_seen_at))
      from learning.item_mastery m join catalog.learning_items i on i.id = m.item_id
      where m.user_id = (select uid from me) and m.updated_at > (select t from since)), '[]'),
    'settings', (select to_jsonb(s) - 'user_id' from identity.user_settings s where s.user_id = (select uid from me)),
    'profile', (select to_jsonb(p) - 'user_id' from identity.profiles p where p.user_id = (select uid from me))
  )
$$;

-- Bảng điều khiển "Hồ sơ học tập"
create or replace function public.get_my_dashboard(p_days int default 180) returns jsonb
language sql stable security definer set search_path = '' as $$
  with me as (select auth.uid() as uid)
  select jsonb_build_object(
    'streak', (select jsonb_build_object('current', s.current_days, 'longest', s.longest_days, 'last', s.last_active_date,
                 'freezes', s.freezes_left) from engagement.streaks s where s.user_id = (select uid from me)),
    'xp_total', coalesce((select sum(amount) from engagement.xp_ledger where user_id = (select uid from me)), 0),
    'daily', coalesce((select jsonb_agg(to_jsonb(d) - 'user_id' - 'updated_at' order by d.local_date)
                       from analytics.daily_stats d where d.user_id = (select uid from me)
                         and d.local_date > current_date - least(greatest(p_days, 1), 730)), '[]'),
    'courses', coalesce((select jsonb_agg(jsonb_build_object('course', c.key, 'progress', e.progress_pct,
                 'last_lesson', l.key, 'last_activity', e.last_activity_at))
               from learning.enrollments e join catalog.courses c on c.id = e.course_id
               left join catalog.lessons l on l.id = e.last_lesson_id where e.user_id = (select uid from me)), '[]'),
    'cards', (select jsonb_build_object(
                 'total', count(*) filter (where state <> 'suspended'),
                 'due', count(*) filter (where state <> 'suspended' and due_at <= now()),
                 'mastered', count(*) filter (where state = 'review' and stability >= 21))
              from learning.srs_cards where user_id = (select uid from me)),
    'mastery', coalesce((select jsonb_object_agg(stage, n) from (
                 select stage, count(*) n from learning.item_mastery where user_id = (select uid from me) group by stage) x), '{}')
  )
$$;

create or replace function public.update_my_profile(p jsonb) returns void
language sql security definer set search_path = '' as $$
  update identity.profiles set
    display_name = coalesce(nullif(trim(p ->> 'display_name'), ''), display_name),
    timezone = case when p ? 'timezone' and exists (select 1 from pg_catalog.pg_timezone_names where name = p ->> 'timezone')
                    then p ->> 'timezone' else timezone end,
    ui_locale = coalesce(p ->> 'ui_locale', ui_locale)
  where user_id = auth.uid()
$$;

create or replace function public.update_my_settings(p jsonb) returns void
language sql security definer set search_path = '' as $$
  update identity.user_settings set
    voice_gender = coalesce(p ->> 'voice_gender', voice_gender),
    en_accent = coalesce(p ->> 'en_accent', en_accent),
    speech_rate = coalesce((p ->> 'speech_rate')::real, speech_rate),
    daily_new_limit = coalesce((p ->> 'daily_new_limit')::int, daily_new_limit),
    desired_retention = coalesce((p ->> 'desired_retention')::real, desired_retention)
  where user_id = auth.uid()
$$;

create or replace function public.record_consent(p_purpose text, p_version text, p_granted boolean) returns void
language sql security definer set search_path = '' as $$
  insert into identity.consents (user_id, purpose, version, granted) values (auth.uid(), p_purpose, p_version, p_granted)
$$;

-- Quyền xem / tải về toàn bộ dữ liệu của mình (Nghị định 13/2023)
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
    'streak', (select to_jsonb(x) from engagement.streaks x where user_id = (select uid from me))
  )
$$;

-- Xóa tài khoản: xóa auth.users → mọi bảng cá nhân xóa dây chuyền
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  delete from auth.users where id = auth.uid();
end $$;

-- Áp dụng lại các sự kiện 'pending' (chạy sau khi đồng bộ catalog) — chỉ service_role
create or replace function analytics.reapply_pending() returns int
language plpgsql security definer set search_path = '' as $$
declare
  e analytics.learning_events;
  v_status text;
  n int := 0;
begin
  for e in select * from analytics.learning_events where status = 'pending' order by occurred_at loop
    v_status := analytics.apply_event(e.user_id, e);
    if v_status <> 'pending' then
      update analytics.learning_events set status = v_status where id = e.id and occurred_at = e.occurred_at;
      n := n + 1;
    end if;
  end loop;
  return n;
end $$;

-- Quyền gọi: API cho người đã đăng nhập; hàm nội bộ không gọi được từ trình duyệt
revoke execute on all functions in schema analytics, learning from public, anon, authenticated;
revoke execute on function public.sync_push(jsonb, jsonb), public.sync_pull(timestamptz), public.get_my_dashboard(int),
  public.update_my_profile(jsonb), public.update_my_settings(jsonb), public.record_consent(text, text, boolean),
  public.export_my_data(), public.delete_my_account() from public, anon;
grant execute on function public.sync_push(jsonb, jsonb), public.sync_pull(timestamptz), public.get_my_dashboard(int),
  public.update_my_profile(jsonb), public.update_my_settings(jsonb), public.record_consent(text, text, boolean),
  public.export_my_data(), public.delete_my_account() to authenticated;
grant execute on function analytics.reapply_pending() to service_role;
