-- ════════════════════════════════════════════════════════════════════
-- 0004 · Miền Học tập (learning) + Đánh giá (assessment) — mục 5, 7, 8, 9
-- ════════════════════════════════════════════════════════════════════

-- ── Ghi danh khóa học ──
create table learning.enrollments (
  id uuid primary key default util.uuid_v7(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references catalog.courses (id) on delete cascade,
  source text not null default 'self' check (source in ('self', 'class', 'purchase', 'admin')),
  status text not null default 'active' check (status in ('active', 'paused', 'completed', 'dropped')),
  progress_pct numeric(5, 2) not null default 0,
  last_lesson_id uuid references catalog.lessons (id) on delete set null,
  last_activity_at timestamptz,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- ── Tiến độ từng bài ──
create table learning.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id uuid not null references catalog.lessons (id) on delete cascade,
  status text not null default 'in_progress' check (status in ('not_started', 'in_progress', 'completed')),
  content_version text,                             -- phiên bản bài lúc hoàn thành
  progress_pct numeric(5, 2) not null default 0,
  best_score numeric(5, 2),                         -- % cao nhất của bài kiểm tra trong bài
  time_spent_sec int not null default 0,
  first_opened_at timestamptz not null default now(),
  completed_at timestamptz,
  status_changed_at timestamptz not null default now(), -- để gộp thay đổi từ nhiều thiết bị (mới nhất thắng)
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);
create index on learning.lesson_progress (user_id, updated_at desc);

-- ── Mức thành thạo từng mục học ──
create table learning.item_mastery (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id uuid not null references catalog.learning_items (id) on delete cascade,
  stage text not null default 'seen' check (stage in ('new', 'seen', 'learning', 'reviewing', 'mastered', 'lapsed')),
  mastery numeric(4, 3) not null default 0 check (mastery between 0 and 1),
  skill_scores jsonb not null default '{}',
  correct_count int not null default 0,
  wrong_count int not null default 0,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
create index on learning.item_mastery (user_id, updated_at desc);

-- ── Thẻ ôn tập (FSRS) — trạng thái hiện tại ──
create table learning.srs_cards (
  id uuid primary key default util.uuid_v7(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id uuid not null references catalog.learning_items (id) on delete cascade,
  card_kind text not null check (card_kind ~ '^[a-z_]{2,20}$'),   -- thuộc item_types.card_kinds
  state text not null default 'new' check (state in ('new', 'learning', 'review', 'relearning', 'suspended')),
  due_at timestamptz not null default now(),
  stability real not null default 0,
  difficulty real not null default 0,
  elapsed_days int not null default 0,
  scheduled_days int not null default 0,
  learning_steps int not null default 0,
  reps int not null default 0,
  lapses int not null default 0,
  last_review_at timestamptz,
  source_course_id uuid references catalog.courses (id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (user_id, item_id, card_kind)
);
create index srs_cards_due on learning.srs_cards (user_id, due_at) where state <> 'suspended';
create index on learning.srs_cards (user_id, updated_at desc);
create index on learning.srs_cards (item_id);

-- ── Lịch sử ôn — chỉ ghi thêm, id do thiết bị tạo (gửi lại không trùng) ──
create table learning.review_logs (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id uuid references learning.srs_cards (id) on delete set null,
  item_id uuid not null references catalog.learning_items (id) on delete cascade,
  card_kind text not null,
  rating smallint not null check (rating between 1 and 4),  -- 1 Again · 2 Hard · 3 Good · 4 Easy
  state_before text,
  stability_before real,
  difficulty_before real,
  elapsed_days int,
  scheduled_days int,
  duration_ms int,
  source text not null default 'review' check (source in ('review', 'quiz', 'lesson', 'import')),
  reviewed_at timestamptz not null,
  received_at timestamptz not null default now()
);
create index on learning.review_logs (user_id, reviewed_at);
create index on learning.review_logs (item_id);

-- Tham số FSRS riêng từng người (tối ưu khi đủ dữ liệu)
create table learning.srs_parameters (
  user_id uuid primary key references auth.users (id) on delete cascade,
  weights real[] not null,
  desired_retention real not null default 0.9,
  review_count_used int not null default 0,
  optimized_at timestamptz not null default now()
);

-- ════ Đánh giá (assessment) ════
create table assessment.questions (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (util.is_key(key)),
  subject_id uuid not null references catalog.subjects (id),
  question_type text not null check (question_type ~ '^[a-z_]{2,30}$'),
  current_version_id uuid,
  difficulty numeric,
  status text not null default 'active' check (status in ('draft', 'active', 'retired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table assessment.question_versions (
  id uuid primary key default util.uuid_v7(),
  question_id uuid not null references assessment.questions (id) on delete cascade,
  version int not null,
  stem jsonb not null,
  payload jsonb not null default '{}',
  answer_key jsonb not null,                        -- không bao giờ trả về trình duyệt trước khi nộp
  explanation jsonb,
  schema_version int not null default 1,
  created_at timestamptz not null default now(),
  unique (question_id, version)
);
alter table assessment.questions
  add constraint questions_current_version_fk foreign key (current_version_id)
  references assessment.question_versions (id) on delete set null deferrable initially deferred;

create table assessment.question_items (
  question_id uuid not null references assessment.questions (id) on delete cascade,
  item_id uuid not null references catalog.learning_items (id) on delete cascade,
  weight real not null default 1,
  primary key (question_id, item_id)
);
create index on assessment.question_items (item_id);

create table assessment.assessments (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (util.is_key(key)),
  course_id uuid not null references catalog.courses (id) on delete cascade,
  lesson_id uuid references catalog.lessons (id) on delete set null,
  kind text not null check (kind in ('lesson_quiz', 'practice', 'placement', 'mock_exam', 'homework')),
  title jsonb not null check (util.is_i18n(title)),
  settings jsonb not null default '{}',             -- thời gian, số lần, xáo câu, điểm đạt…
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on assessment.assessments (course_id);
create index on assessment.assessments (lesson_id);

create table assessment.assessment_questions (
  id uuid primary key default util.uuid_v7(),
  assessment_id uuid not null references assessment.assessments (id) on delete cascade,
  question_id uuid references assessment.questions (id) on delete cascade,
  pool_rule jsonb,                                  -- hoặc chọn ngẫu nhiên theo quy tắc
  points numeric not null default 1,
  position numeric not null default 0,
  check ((question_id is null) <> (pool_rule is null))
);
create index on assessment.assessment_questions (assessment_id);

-- ── Bài làm ──
-- assessment_key luôn có (đề trong mã nguồn chưa có trong DB vẫn ghi được); assessment_id điền khi khớp.
create table learning.attempts (
  id uuid primary key,                              -- do thiết bị tạo
  user_id uuid not null references auth.users (id) on delete cascade,
  assessment_key text not null,
  assessment_id uuid references assessment.assessments (id) on delete set null,
  course_id uuid references catalog.courses (id) on delete set null,
  lesson_id uuid references catalog.lessons (id) on delete set null,
  attempt_no int not null default 1,
  status text not null default 'graded' check (status in ('in_progress', 'submitted', 'graded', 'abandoned', 'expired')),
  score numeric not null,
  max_score numeric not null check (max_score > 0),
  scaled_score numeric,
  section_scores jsonb,
  passed boolean,
  grading_mode text not null default 'client' check (grading_mode in ('client', 'server', 'manual', 'ai')),
  started_at timestamptz,
  submitted_at timestamptz not null,
  time_spent_sec int,
  received_at timestamptz not null default now()
);
create index on learning.attempts (user_id, submitted_at desc);
create index on learning.attempts (user_id, assessment_key);

create table learning.responses (
  id uuid primary key default util.uuid_v7(),
  attempt_id uuid not null references learning.attempts (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid references assessment.questions (id) on delete set null,
  question_version_id uuid references assessment.question_versions (id) on delete set null,
  question_snapshot jsonb,
  item_ids uuid[] not null default '{}',
  answer jsonb,
  is_correct boolean,
  score numeric,
  max_score numeric,
  feedback jsonb,
  time_ms int,
  changed_count int,
  answered_at timestamptz not null default now()
);
create index on learning.responses (attempt_id);
create index on learning.responses (user_id);

create trigger t_touch before update on learning.enrollments for each row execute function util.touch_updated_at();
create trigger t_touch before update on learning.lesson_progress for each row execute function util.touch_updated_at();
create trigger t_touch before update on learning.item_mastery for each row execute function util.touch_updated_at();
create trigger t_touch before update on learning.srs_cards for each row execute function util.touch_updated_at();
create trigger t_touch before update on assessment.questions for each row execute function util.touch_updated_at();
create trigger t_touch before update on assessment.assessments for each row execute function util.touch_updated_at();
