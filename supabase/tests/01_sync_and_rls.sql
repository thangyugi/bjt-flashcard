-- Kiểm thử: đồng bộ sự kiện, gửi lại không trùng, RLS, xóa tài khoản.
-- Chạy: npm run db:test  (Postgres 16 cục bộ + tests/00_supabase_stub.sql)
\set ON_ERROR_STOP 1
begin;

-- Dữ liệu catalog tối thiểu
insert into catalog.courses (key, slug, subject_id, title)
  select 'english', 'english', id, '{"vi":"Tiếng Anh"}' from catalog.subjects where key = 'en';
insert into catalog.lessons (key, slug, course_id, lesson_type, title, content_version)
  select 'english.ipa.ipa-02', 'ipa-02', id, 'phonetics', '{"vi":"Bài 2"}', 'v1' from catalog.courses where key = 'english';
insert into catalog.lessons (key, slug, course_id, lesson_type, title)
  select 'english.ipa.ipa-03', 'ipa-03', id, 'phonetics', '{"vi":"Bài 3"}' from catalog.courses where key = 'english';
insert into catalog.learning_items (key, subject_id, item_type_id, headword, attributes)
  select 'en.phoneme.i-long', s.id, t.id, 'iː', '{"keyword":"see"}' from catalog.subjects s, catalog.item_types t
  where s.key = 'en' and t.key = 'phoneme';

-- Hai người dùng
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-00000000000a', 'a@example.com', '{"consent_version":"2026-10-17"}'),
  ('00000000-0000-0000-0000-00000000000b', 'b@example.com', '{}');

do $$ begin
  assert (select count(*) from identity.profiles) = 2, 'trigger phải tạo hồ sơ';
  assert (select display_name from identity.profiles where user_id = '00000000-0000-0000-0000-00000000000a') = 'a', 'tên mặc định';
  assert (select count(*) from identity.consents) = 2, 'đăng ký kèm đồng ý → 2 bản ghi (terms, privacy)';
end $$;

-- Đăng nhập là A
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', true);

select public.sync_push('[
  {"id":"10000000-0000-0000-0000-000000000001","verb":"lesson.opened","object":"english.ipa.ipa-02","at":"2026-10-15T08:00:00Z","data":{"course":"english"}},
  {"id":"10000000-0000-0000-0000-000000000002","verb":"lesson.completed","object":"english.ipa.ipa-02","at":"2026-10-15T08:20:00Z","data":{"course":"english"}},
  {"id":"10000000-0000-0000-0000-000000000003","verb":"quiz.submitted","object":"english.ipa.ipa-02/quiz","at":"2026-10-15T08:19:00Z","data":{"course":"english","lesson":"english.ipa.ipa-02","score":7,"total":8}},
  {"id":"10000000-0000-0000-0000-000000000004","verb":"card.enrolled","object":"en.phoneme.i-long","at":"2026-10-15T08:21:00Z","data":{"course":"english","kind":"recognize"}},
  {"id":"10000000-0000-0000-0000-000000000005","verb":"card.reviewed","object":"en.phoneme.i-long","at":"2026-10-16T09:00:00Z","data":{"course":"english","kind":"recognize","rating":3,"after":{"state":"review","due":"2026-10-20T09:00:00Z","stability":4.2,"difficulty":5.1,"reps":1,"lapses":0,"scheduled_days":4}}},
  {"id":"10000000-0000-0000-0000-000000000006","verb":"lesson.completed","object":"english.unknown.lesson","at":"2026-10-16T09:05:00Z","data":{}},
  {"id":"10000000-0000-0000-0000-000000000007","verb":"time.spent","at":"2026-10-16T09:06:00Z","data":{"seconds":120,"session":"20000000-0000-0000-0000-000000000001"}}
]'::jsonb, '{"id":"30000000-0000-0000-0000-000000000001","platform":"web"}');

-- Gửi lại y hệt: không được tạo trùng
select public.sync_push('[
  {"id":"10000000-0000-0000-0000-000000000002","verb":"lesson.completed","object":"english.ipa.ipa-02","at":"2026-10-15T08:20:00Z","data":{"course":"english"}},
  {"id":"10000000-0000-0000-0000-000000000005","verb":"card.reviewed","object":"en.phoneme.i-long","at":"2026-10-16T09:00:00Z","data":{"course":"english","kind":"recognize","rating":3,"after":{"state":"review","due":"2026-10-20T09:00:00Z","stability":4.2,"difficulty":5.1,"reps":1,"lapses":0}}}
]'::jsonb);

do $$ declare d jsonb := public.get_my_dashboard(); p jsonb := public.sync_pull(null); begin
  assert (select count(*) from learning.review_logs) = 1, 'review log không trùng';
  assert (select count(*) from learning.attempts) = 1, 'attempt không trùng';
  assert (select status from learning.lesson_progress) = 'completed', 'bài đã hoàn thành';
  assert (select best_score from learning.lesson_progress) = 87.5, 'điểm tốt nhất 7/8 = 87.5%';
  assert (select progress_pct from learning.enrollments) = 50, '1/2 bài = 50%';
  assert (select state from learning.srs_cards) = 'review', 'thẻ đã ôn';
  assert (select count(*) from analytics.learning_events where status = 'pending') = 1, 'bài lạ chờ catalog';
  assert (d -> 'streak' ->> 'current')::int = 2, 'chuỗi 2 ngày (15 và 16/10)';
  assert (d ->> 'xp_total')::int = 20 + 9 + 2, 'XP: bài 20 + quiz 9 + ôn 2';
  assert (select active_seconds from analytics.study_sessions) = 120, 'phiên học';
  assert jsonb_array_length(p -> 'lessons') = 1 and jsonb_array_length(p -> 'cards') = 1, 'sync_pull';
  assert (p -> 'quizzes' -> 0 ->> 'best')::numeric = 7, 'quiz best';
end $$;

-- Bỏ đánh dấu hoàn thành (mới hơn) rồi một thiết bị cũ gửi "hoàn thành" cũ hơn: giữ trạng thái mới nhất
select public.sync_push('[
  {"id":"10000000-0000-0000-0000-000000000008","verb":"lesson.reopened","object":"english.ipa.ipa-02","at":"2026-10-17T08:00:00Z","data":{}},
  {"id":"10000000-0000-0000-0000-000000000009","verb":"lesson.completed","object":"english.ipa.ipa-02","at":"2026-10-15T07:00:00Z","data":{}}
]'::jsonb);
do $$ begin
  assert (select status from learning.lesson_progress) = 'in_progress', 'thao tác mới nhất thắng';
end $$;

-- A không ghi trực tiếp được vào bảng học
do $$ begin
  begin
    insert into learning.srs_cards (user_id, item_id, card_kind) select auth.uid(), id, 'x' from catalog.learning_items limit 1;
    raise exception 'phải bị chặn';
  exception when insufficient_privilege then null;
  end;
end $$;

-- Đổi sang B: không thấy dữ liệu của A
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000b', true);
do $$ begin
  assert (select count(*) from learning.lesson_progress) = 0, 'RLS: B không thấy tiến độ của A';
  assert (select count(*) from analytics.learning_events) = 0, 'RLS: B không thấy sự kiện của A';
  assert (select count(*) from identity.profiles) = 1, 'RLS: B chỉ thấy hồ sơ của mình';
  assert (public.export_my_data() -> 'lesson_progress') = '[]'::jsonb, 'xuất dữ liệu chỉ của mình';
end $$;

-- Ẩn danh: không gọi được API
reset role;
set local role anon;
do $$ begin
  begin
    perform public.sync_pull(null);
    raise exception 'anon phải bị chặn';
  exception when insufficient_privilege then null;
  end;
  assert (select count(*) from catalog.lessons) = 2, 'anon đọc được catalog';
end $$;

-- Catalog đồng bộ xong → áp dụng lại sự kiện chờ
reset role;
insert into catalog.lessons (key, slug, course_id, lesson_type, title)
  select 'english.unknown.lesson', 'unknown', id, 'mixed', '{"vi":"Bài mới"}' from catalog.courses where key = 'english';
select analytics.reapply_pending();
do $$ begin
  assert (select count(*) from analytics.learning_events where status = 'pending') = 0, 'đã áp dụng lại';
  assert (select count(*) from learning.lesson_progress where user_id = '00000000-0000-0000-0000-00000000000a') = 2, 'tiến độ bài mới';
end $$;

-- Xóa tài khoản A → xóa dây chuyền
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', true);
select public.delete_my_account();
reset role;
do $$ begin
  assert (select count(*) from learning.lesson_progress) = 0, 'xóa tiến độ';
  assert (select count(*) from analytics.learning_events) = 0, 'xóa sự kiện';
  assert (select count(*) from engagement.xp_ledger) = 0, 'xóa XP';
  assert (select count(*) from identity.profiles) = 1, 'còn hồ sơ B';
end $$;

select 'ALL TESTS PASSED' as result;
rollback;
