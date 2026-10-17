-- ════════════════════════════════════════════════════════════════════
-- 0002 · Miền Nội dung (catalog) — mục 4 của tài liệu thiết kế
-- Giai đoạn 0: danh mục + mã cố định. Nội dung chi tiết của bài vẫn nằm trong mã nguồn;
-- lesson_versions / lesson_blocks thêm ở giai đoạn 3.
-- ════════════════════════════════════════════════════════════════════

-- ── Môn / ngôn ngữ đích ──
create table catalog.subjects (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (util.is_key(key)),
  name jsonb not null check (util.is_i18n(name)),
  target_locale text,                               -- ja-JP, en-GB… (giọng đọc, phông chữ)
  direction text not null default 'ltr' check (direction in ('ltr', 'rtl')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Loại mục học (mục 4.7): thêm lĩnh vực mới = thêm một dòng, không cần migration ──
create table catalog.item_types (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (key ~ '^[a-z][a-z0-9_]{1,40}$'),
  domain text not null check (domain in ('language', 'it', 'stem', 'business', 'law', 'general')),
  name jsonb not null check (util.is_i18n(name)),
  description jsonb check (description is null or util.is_i18n(description)),
  attributes_schema jsonb not null default '{"type":"object"}',   -- JSON Schema của learning_items.attributes
  identity_fields text[] not null check (cardinality(identity_fields) > 0),
  card_kinds text[] not null default '{recognize}',
  renderer text not null,
  schema_version int not null default 1,
  status text not null default 'active' check (status in ('active', 'deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Khóa học ──
create table catalog.courses (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (util.is_key(key)),
  slug text not null unique,
  subject_id uuid not null references catalog.subjects (id),
  title jsonb not null check (util.is_i18n(title)),
  summary jsonb check (summary is null or util.is_i18n(summary)),
  level_framework text,                             -- JLPT, CEFR, BJT, OCI…
  level text,
  status text not null default 'published' check (status in ('draft', 'review', 'published', 'archived')),
  visibility text not null default 'public' check (visibility in ('public', 'unlisted', 'private', 'org')),
  access text not null default 'free' check (access in ('free', 'entitled')),
  settings jsonb not null default '{}',
  position numeric not null default 0,
  published_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on catalog.courses (subject_id);

-- ── Học phần / chương (lồng nhiều cấp qua parent_id) ──
create table catalog.course_modules (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (util.is_key(key)),
  course_id uuid not null references catalog.courses (id) on delete cascade,
  parent_id uuid references catalog.course_modules (id) on delete cascade,
  title jsonb not null check (util.is_i18n(title)),
  description jsonb check (description is null or util.is_i18n(description)),
  unlock_rule jsonb,
  position numeric not null default 0,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on catalog.course_modules (course_id);
create index on catalog.course_modules (parent_id);

-- ── Bài học ──
create table catalog.lessons (
  id uuid primary key default util.uuid_v7(),
  key text not null unique check (util.is_key(key)),
  slug text not null,
  course_id uuid not null references catalog.courses (id) on delete cascade,
  module_id uuid references catalog.course_modules (id) on delete set null,
  lesson_type text not null check (lesson_type in
    ('grammar', 'vocabulary', 'phonetics', 'reading', 'listening', 'exam', 'concept', 'flashcards', 'mixed')),
  title jsonb not null check (util.is_i18n(title)),
  summary jsonb check (summary is null or util.is_i18n(summary)),
  level text,
  estimated_minutes int check (estimated_minutes is null or estimated_minutes > 0),
  href text,                                        -- đường dẫn trong app (giai đoạn nội dung còn ở mã nguồn)
  status text not null default 'published' check (status in ('draft', 'review', 'published', 'archived')),
  access text not null default 'free' check (access in ('free', 'entitled')),
  content_version text,                             -- băm nội dung lúc đồng bộ → nhận biết bài đã sửa
  position numeric not null default 0,
  published_at timestamptz,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, slug)
);
create index on catalog.lessons (course_id);
create index on catalog.lessons (module_id);

-- ── Mục học (mục 4.6) ──
create table catalog.learning_items (
  id uuid primary key default util.uuid_v7(),
  key text not null unique,
  subject_id uuid not null references catalog.subjects (id),
  item_type_id uuid not null references catalog.item_types (id),
  headword text not null,
  identity_key text not null,                       -- sinh bởi trigger từ item_types.identity_fields
  attributes jsonb not null default '{}',
  schema_version int not null default 1,
  gloss jsonb check (gloss is null or util.is_i18n(gloss)),
  difficulty smallint check (difficulty between 1 and 10),
  frequency_rank int,
  search_tsv tsvector generated always as (
    to_tsvector('simple',
      coalesce(headword, '') || ' ' || coalesce(attributes ->> 'reading', '') || ' ' || coalesce(gloss ->> 'vi', '') || ' ' || coalesce(gloss ->> 'en', ''))
  ) stored,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (subject_id, item_type_id, identity_key)
);
create index on catalog.learning_items (item_type_id);
create index on catalog.learning_items using gin (search_tsv);
create index on catalog.learning_items using gin (attributes jsonb_path_ops);

-- identity_key = các trường trong identity_fields nối bằng '|', chữ thường.
-- Trường "headword" / "key" lấy từ cột; trường khác lấy từ attributes.
create or replace function catalog.compute_identity_key() returns trigger
language plpgsql as $$
declare
  f text;
  parts text[] := '{}';
  fields text[];
begin
  select identity_fields into fields from catalog.item_types where id = new.item_type_id;
  if fields is null then
    raise exception 'item_type % không tồn tại', new.item_type_id;
  end if;
  foreach f in array fields loop
    parts := parts || lower(coalesce(
      case f when 'headword' then new.headword when 'key' then new.key else new.attributes ->> f end, ''));
  end loop;
  new.identity_key := array_to_string(parts, '|');
  return new;
end $$;

create trigger learning_items_identity before insert or update of headword, key, attributes, item_type_id
  on catalog.learning_items for each row execute function catalog.compute_identity_key();

-- ── Bài ↔ mục học (n–n) ──
create table catalog.lesson_items (
  lesson_id uuid not null references catalog.lessons (id) on delete cascade,
  item_id uuid not null references catalog.learning_items (id) on delete cascade,
  role text not null default 'core' check (role in ('core', 'review', 'extra')),
  position numeric not null default 0,
  primary key (lesson_id, item_id)
);
create index on catalog.lesson_items (item_id);

-- ── Tệp trên R2 (âm thanh, hình) ──
create table catalog.media_assets (
  id uuid primary key default util.uuid_v7(),
  storage_key text not null unique,                 -- đường dẫn trong bucket, ví dụ audio/en/uk-male/abc.m4a
  mime text not null,
  bytes bigint,
  duration_ms int,
  checksum text,
  voice text,                                       -- ja-male, en-uk-female…
  license text,
  attribution text,                                 -- VOICEVOX:青山龍星, Kokoro · George…
  created_at timestamptz not null default now()
);

-- updated_at tự động
create trigger t_touch before update on catalog.subjects for each row execute function util.touch_updated_at();
create trigger t_touch before update on catalog.item_types for each row execute function util.touch_updated_at();
create trigger t_touch before update on catalog.courses for each row execute function util.touch_updated_at();
create trigger t_touch before update on catalog.course_modules for each row execute function util.touch_updated_at();
create trigger t_touch before update on catalog.lessons for each row execute function util.touch_updated_at();
create trigger t_touch before update on catalog.learning_items for each row execute function util.touch_updated_at();

-- ── Dữ liệu gốc: môn và loại mục học ──
insert into catalog.subjects (key, name, target_locale) values
  ('ja', '{"vi":"Tiếng Nhật","en":"Japanese"}', 'ja-JP'),
  ('en', '{"vi":"Tiếng Anh","en":"English"}', 'en-GB'),
  ('oci', '{"vi":"Oracle Cloud Infrastructure","en":"Oracle Cloud Infrastructure"}', null);

insert into catalog.item_types (key, domain, name, attributes_schema, identity_fields, card_kinds, renderer) values
  ('word', 'language', '{"vi":"Từ vựng","en":"Word"}',
   '{"type":"object","properties":{"reading":{"type":"string"},"pos":{"type":"string"},"pitch_accent":{},"han_viet":{"type":"string"},"alt":{"type":"string"}}}',
   '{headword,reading}', '{recognize,recall,listen}', 'word-card'),
  ('kanji', 'language', '{"vi":"Chữ Hán","en":"Kanji"}',
   '{"type":"object","properties":{"on":{"type":"array"},"kun":{"type":"array"},"han_viet":{"type":"string"}}}',
   '{headword}', '{recognize,recall}', 'kanji-card'),
  ('grammar_pattern', 'language', '{"vi":"Mẫu ngữ pháp","en":"Grammar pattern"}',
   '{"type":"object","properties":{"meaning":{"type":"string"},"register":{"type":"string"}}}',
   '{key}', '{recognize,cloze}', 'grammar-card'),
  ('phoneme', 'language', '{"vi":"Âm IPA","en":"Phoneme"}',
   '{"type":"object","properties":{"ipa":{"type":"string"},"keyword":{"type":"string"},"kind":{"type":"string"}}}',
   '{headword}', '{recognize,listen,speak}', 'phoneme-card'),
  ('term', 'general', '{"vi":"Thuật ngữ","en":"Term"}',
   '{"type":"object","properties":{"category":{"type":"string"},"section":{"type":"string"}}}',
   '{key}', '{recognize,recall}', 'term-card'),
  ('concept', 'it', '{"vi":"Khái niệm","en":"Concept"}',
   '{"type":"object","properties":{"definition":{"type":"string"},"category":{"type":"string"}}}',
   '{key}', '{recall,apply}', 'concept-card'),
  ('formula', 'stem', '{"vi":"Công thức","en":"Formula"}',
   '{"type":"object","properties":{"latex":{"type":"string"},"variables":{"type":"object"}}}',
   '{key}', '{recall,apply}', 'formula-card');
