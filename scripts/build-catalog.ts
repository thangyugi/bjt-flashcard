/**
 * Dựng danh mục học (catalog) từ dữ liệu trong mã nguồn — giai đoạn 0 của kế hoạch database.
 *
 *   npm run catalog            → ghi public/data/learning-items.json (app dùng cho ôn tập chung)
 *                                 + supabase/seed/catalog.sql (upsert khóa, học phần, bài, mục học)
 *   npm run catalog -- --push  → như trên rồi áp dụng vào database (biến DATABASE_URL, chuỗi kết nối
 *                                 Postgres của Supabase: Project Settings → Database → Connection string)
 *
 * Mọi mã lấy từ src/lib/learning/keys.ts. Chạy lại bao nhiêu lần cũng được (upsert theo mã).
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { N1_LESSONS } from "../src/data/jlpt-n1/course";
import { VOCAB_SOURCES, wordAnchor } from "../src/data/jlpt-n1/vocab";
import { IPA_LESSONS } from "../src/data/english/ipa";
import { MODULES as OCI_MODULES } from "../src/data/oci-ai/course";
import { GLOSSARY } from "../src/data/oci-ai/glossary";
import { itemKey, lessonKey, type CourseKey } from "../src/lib/learning/keys";
import { toSpeech } from "../src/lib/audio-key";

const ROOT = process.cwd();
const PUSH = process.argv.includes("--push");

// ── Kiểu trung gian ──
type ItemType = "word" | "grammar_pattern" | "phoneme" | "term";
interface Item {
  key: string;
  subject: "ja" | "en" | "oci";
  type: ItemType;
  headword: string;
  attributes: Record<string, unknown>;
  gloss: string;
  /** Chuỗi đưa cho giọng đọc (khớp với nút loa trong bài) */
  speech?: string;
  href: string;
  courses: Set<CourseKey>;
}
interface Course {
  key: CourseKey;
  slug: string;
  subject: "ja" | "en" | "oci";
  title: string;
  summary: string;
  framework?: string;
  level?: string;
  position: number;
}
interface Module {
  key: string;
  course: CourseKey;
  title: string;
  position: number;
}
interface Lesson {
  key: string;
  slug: string;
  course: CourseKey;
  module: string;
  type: "grammar" | "vocabulary" | "phonetics" | "concept" | "flashcards" | "exam" | "mixed";
  title: string;
  level?: string;
  minutes?: number;
  href: string;
  version: string;
  position: number;
  items: string[];
}

const courses: Course[] = [
  { key: "jlpt-n1", slug: "jlpt-n1", subject: "ja", title: "JLPT N1", summary: "Ngữ pháp và từ vựng N1", framework: "JLPT", level: "N1", position: 1 },
  { key: "english", slug: "english", subject: "en", title: "Tiếng Anh", summary: "Phát âm IPA", framework: "CEFR", position: 2 },
  { key: "oci-ai", slug: "oracle-oci-ai", subject: "oci", title: "OCI AI Foundations", summary: "Chứng chỉ 1Z0-1122", framework: "OCI", position: 3 },
  { key: "bjt", slug: "bjt", subject: "ja", title: "Từ vựng BJT", summary: "Từ vựng tiếng Nhật thương mại", framework: "BJT", position: 4 },
];
const modules: Module[] = [];
const lessons: Lesson[] = [];
const items = new Map<string, Item>();
const aliases: Record<string, string> = {};

const hash = (v: unknown) => createHash("sha256").update(JSON.stringify(v)).digest("hex").slice(0, 12);

function addItem(it: Omit<Item, "courses">, course: CourseKey) {
  const prev = items.get(it.key);
  if (prev) {
    prev.courses.add(course);
    // Mục dùng chung giữa các khóa: giữ dữ liệu của nguồn đầu, bổ sung trường còn thiếu (ví dụ bjt_id)
    prev.attributes = { ...it.attributes, ...prev.attributes };
  }
  else items.set(it.key, { ...it, courses: new Set([course]) });
  return it.key;
}

// ── JLPT N1: ngữ pháp ──
modules.push({ key: "jlpt-n1.grammar", course: "jlpt-n1", title: "Ngữ pháp Shinkanzen N1", position: 1 });
for (const l of N1_LESSONS) {
  const keys = l.patterns.map((p) =>
    addItem(
      {
        key: itemKey.jaGrammar(p.id),
        subject: "ja",
        type: "grammar_pattern",
        headword: toSpeech(p.pattern),
        attributes: { meaning: p.meaning, register: p.register },
        gloss: p.meaning,
        speech: p.pattern,
        href: `/jlpt-n1/grammar/${l.id}#${p.id}`,
      },
      "jlpt-n1"
    )
  );
  lessons.push({
    key: lessonKey.n1Grammar(l.id),
    slug: `grammar/${l.id}`,
    course: "jlpt-n1",
    module: "jlpt-n1.grammar",
    type: "grammar",
    title: `Chương ${l.num}: ${l.topicVi}`,
    level: "N1",
    href: `/jlpt-n1/grammar/${l.id}`,
    version: hash(l),
    position: l.num,
    items: keys,
  });
}

// ── JLPT N1: từ vựng (mọi nguồn sách) ──
for (const [si, src] of VOCAB_SOURCES.entries()) {
  const mod = `jlpt-n1.vocab.${src.id}`;
  modules.push({ key: mod, course: "jlpt-n1", title: src.name, position: 10 + si });
  for (const l of src.lessons) {
    const keys = l.words.map((w) =>
      addItem(
        {
          key: itemKey.jaWord(w.w, w.r),
          subject: "ja",
          type: "word",
          headword: w.w,
          attributes: { reading: w.r, pos: w.pos, han_viet: w.hv, alt: w.alt, pitch_accent: w.acc, source: src.id, no: w.no },
          gloss: w.m,
          speech: w.say ?? (w.pos === "na-adj" ? `${w.w}な` : w.w),
          href: `/jlpt-n1/vocab/${l.id}#${wordAnchor(src.prefix, w.no)}`,
        },
        "jlpt-n1"
      )
    );
    lessons.push({
      key: lessonKey.n1Vocab(l.id),
      slug: `vocab/${l.id}`,
      course: "jlpt-n1",
      module: mod,
      type: "vocabulary",
      title: `Bài ${l.num}: ${l.title}`,
      level: "N1",
      href: `/jlpt-n1/vocab/${l.id}`,
      version: hash(l),
      position: 100 + l.num,
      items: [...new Set(keys)],
    });
  }
}

// ── Tiếng Anh: IPA ──
const ipaGroups = [...new Set(IPA_LESSONS.map((l) => l.group))];
ipaGroups.forEach((g, i) => modules.push({ key: `english.ipa.${i + 1}`, course: "english", title: `IPA · ${g}`, position: i + 1 }));
for (const l of IPA_LESSONS) {
  const keys = l.phonemes.map((p) =>
    addItem(
      {
        key: itemKey.phoneme(p.id),
        subject: "en",
        type: "phoneme",
        headword: p.symbol,
        attributes: { ipa: p.symbol, keyword: p.keyword.w, keyword_ipa: p.keyword.ipa, kind: p.kind, name: p.name },
        gloss: `${p.name} — ${p.keyword.w} /${p.keyword.ipa}/`,
        speech: p.keyword.w,
        href: `/english/ipa/${l.id}#${p.id}`,
      },
      "english"
    )
  );
  lessons.push({
    key: lessonKey.ipa(l.id),
    slug: `ipa/${l.id}`,
    course: "english",
    module: `english.ipa.${ipaGroups.indexOf(l.group) + 1}`,
    type: "phonetics",
    title: `Bài ${l.num}: ${l.title}`,
    level: l.level,
    href: `/english/ipa/${l.id}`,
    version: hash(l),
    position: l.num,
    items: keys,
  });
}

// ── OCI AI Foundations ──
for (const m of OCI_MODULES) {
  modules.push({ key: `oci-ai.${m.id}`, course: "oci-ai", title: `Module ${m.num}: ${m.title}`, position: m.num });
  m.lessons.forEach((l, i) =>
    lessons.push({
      key: lessonKey.oci(l.id),
      slug: l.id,
      course: "oci-ai",
      module: `oci-ai.${m.id}`,
      type: l.kind === "summary" ? "mixed" : "concept",
      title: l.title,
      minutes: l.minutes,
      href: `/oracle-oci-ai/${l.id}`,
      version: hash(l),
      position: m.num * 100 + i,
      items: [],
    })
  );
}
modules.push({ key: "oci-ai.glossary", course: "oci-ai", title: "Thuật ngữ", position: 99 });
const termKeys = GLOSSARY.map((g) =>
  addItem(
    {
      key: itemKey.ociTerm(g.term),
      subject: "oci",
      type: "term",
      headword: g.term,
      attributes: { category: g.cat, section: g.section },
      gloss: g.vi,
      href: `/oracle-oci-ai/glossary`,
    },
    "oci-ai"
  )
);
lessons.push({
  key: "oci-ai.glossary",
  slug: "glossary",
  course: "oci-ai",
  module: "oci-ai.glossary",
  type: "concept",
  title: "Thuật ngữ OCI AI",
  href: "/oracle-oci-ai/glossary",
  version: hash(GLOSSARY),
  position: 9999,
  items: termKeys,
});

// ── BJT: flashcard theo chủ đề ──
interface BjtGroup {
  id: string;
  name: string;
  items: { id: string; kanji: string; hiragana: string; meaningVn: string; partOfSpeech?: string }[];
}
const bjt = JSON.parse(readFileSync(join(ROOT, "public", "data", "bjt-1000.json"), "utf8")) as BjtGroup[];
modules.push({ key: "bjt.vocab", course: "bjt", title: "Từ vựng BJT theo chủ đề", position: 1 });
bjt.forEach((g, i) => {
  const keys = g.items.map((it) =>
    (aliases[it.id] = addItem(
      {
        key: itemKey.jaWord(it.kanji, it.hiragana),
        subject: "ja",
        type: "word",
        headword: it.kanji,
        attributes: { reading: it.hiragana, pos: it.partOfSpeech, source: "bjt", bjt_id: it.id },
        gloss: it.meaningVn,
        speech: it.kanji,
        href: `/study/${g.id}`,
      },
      "bjt"
    ))
  );
  lessons.push({
    key: lessonKey.bjtGroup(g.id),
    slug: g.id,
    course: "bjt",
    module: "bjt.vocab",
    type: "flashcards",
    title: g.name,
    href: `/study/${g.id}`,
    version: hash(g),
    position: i + 1,
    items: [...new Set(keys)],
  });
});

// Kiểm tra mã trùng
for (const [name, list] of [["lesson", lessons.map((l) => l.key)], ["module", modules.map((m) => m.key)]] as const) {
  const dup = list.filter((k, i) => list.indexOf(k) !== i);
  if (dup.length) throw new Error(`Mã ${name} bị trùng: ${dup.join(", ")}`);
}

// ── 1) Chỉ mục mục học cho app ──
const index = {
  version: hash([...items.keys()]),
  /** Mã cũ trong app → mã mục học (thẻ flashcard BJT lưu tiến độ theo "bjt-001"…) */
  aliases,
  /** Khóa học → danh sách mã bài (trang Tiến độ tính % hoàn thành) */
  courses: Object.fromEntries(courses.map((c) => [c.key, { title: c.title, lessons: lessons.filter((l) => l.course === c.key).map((l) => l.key) }])),
  items: Object.fromEntries(
    [...items.values()].map((it) => [
      it.key,
      {
        t: it.type,
        h: it.headword,
        ...(typeof it.attributes.reading === "string" && it.attributes.reading !== it.headword ? { r: it.attributes.reading } : {}),
        ...(it.type === "phoneme" ? { k: it.attributes.keyword, ki: it.attributes.keyword_ipa } : {}),
        m: it.gloss,
        ...(it.speech ? { s: it.speech } : {}),
        u: it.href,
        c: [...it.courses],
      },
    ])
  ),
};
writeFileSync(join(ROOT, "public", "data", "learning-items.json"), JSON.stringify(index));

// ── 2) SQL upsert ──
const q = (s: string | null | undefined) => (s == null ? "null" : `'${s.replace(/'/g, "''")}'`);
const j = (v: unknown) => `${q(JSON.stringify(v))}::jsonb`;
const i18n = (vi: string) => j({ vi });
const clean = (o: Record<string, unknown>) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null));

const sql: string[] = [
  "-- Sinh tự động bởi scripts/build-catalog.ts — KHÔNG sửa tay. Chạy lại an toàn (upsert theo mã).",
  "begin;",
];
for (const c of courses) {
  sql.push(`insert into catalog.courses (key, slug, subject_id, title, summary, level_framework, level, position, published_at)
select ${q(c.key)}, ${q(c.slug)}, id, ${i18n(c.title)}, ${i18n(c.summary)}, ${q(c.framework)}, ${q(c.level)}, ${c.position}, now() from catalog.subjects where key = ${q(c.subject)}
on conflict (key) do update set slug = excluded.slug, title = excluded.title, summary = excluded.summary, level_framework = excluded.level_framework, level = excluded.level, position = excluded.position;`);
}
for (const m of modules) {
  sql.push(`insert into catalog.course_modules (key, course_id, title, position)
select ${q(m.key)}, id, ${i18n(m.title)}, ${m.position} from catalog.courses where key = ${q(m.course)}
on conflict (key) do update set course_id = excluded.course_id, title = excluded.title, position = excluded.position, archived_at = null;`);
}
for (const l of lessons) {
  sql.push(`insert into catalog.lessons (key, slug, course_id, module_id, lesson_type, title, level, estimated_minutes, href, content_version, position, published_at)
select ${q(l.key)}, ${q(l.slug)}, c.id, (select id from catalog.course_modules where key = ${q(l.module)}), ${q(l.type)}, ${i18n(l.title)}, ${q(l.level)}, ${l.minutes ?? "null"}, ${q(l.href)}, ${q(l.version)}, ${l.position}, now()
from catalog.courses c where c.key = ${q(l.course)}
on conflict (key) do update set slug = excluded.slug, module_id = excluded.module_id, lesson_type = excluded.lesson_type, title = excluded.title, level = excluded.level, estimated_minutes = excluded.estimated_minutes, href = excluded.href, content_version = excluded.content_version, position = excluded.position, status = 'published', archived_at = null;`);
}
// Mục học: chèn theo lô 200 dòng
const itemRows = [...items.values()];
for (let i = 0; i < itemRows.length; i += 200) {
  const values = itemRows
    .slice(i, i + 200)
    .map((it) => `(${q(it.key)}, ${q(it.subject)}, ${q(it.type)}, ${q(it.headword)}, ${j(clean(it.attributes))}, ${i18n(it.gloss)})`)
    .join(",\n  ");
  sql.push(`insert into catalog.learning_items (key, subject_id, item_type_id, headword, attributes, gloss)
select v.key, s.id, t.id, v.headword, v.attributes, v.gloss from (values
  ${values}
) v(key, subject, type, headword, attributes, gloss)
join catalog.subjects s on s.key = v.subject join catalog.item_types t on t.key = v.type
on conflict (key) do update set headword = excluded.headword, attributes = excluded.attributes, gloss = excluded.gloss, archived_at = null;`);
}
// Bài ↔ mục học: thay toàn bộ cho các bài vừa đồng bộ
sql.push(`delete from catalog.lesson_items where lesson_id in (select id from catalog.lessons where key in (${lessons.map((l) => q(l.key)).join(", ")}));`);
const links = lessons.flatMap((l) => l.items.map((k, pos) => `(${q(l.key)}, ${q(k)}, ${pos})`));
for (let i = 0; i < links.length; i += 500) {
  sql.push(`insert into catalog.lesson_items (lesson_id, item_id, position)
select l.id, it.id, v.pos from (values
  ${links.slice(i, i + 500).join(",\n  ")}
) v(lesson_key, item_key, pos)
join catalog.lessons l on l.key = v.lesson_key join catalog.learning_items it on it.key = v.item_key
on conflict do nothing;`);
}
// Bài không còn trong mã nguồn → ẩn (không xóa: tiến độ cũ còn tham chiếu)
sql.push(`update catalog.lessons set archived_at = now() where archived_at is null and course_id in (select id from catalog.courses where key in (${courses.map((c) => q(c.key)).join(", ")})) and key not in (${lessons.map((l) => q(l.key)).join(", ")});`);
sql.push("select analytics.reapply_pending() as reapplied_events;");
sql.push("commit;");

mkdirSync(join(ROOT, "supabase", "seed"), { recursive: true });
const sqlPath = join(ROOT, "supabase", "seed", "catalog.sql");
writeFileSync(sqlPath, sql.join("\n\n") + "\n");

console.log(
  `Catalog: ${courses.length} khóa · ${modules.length} học phần · ${lessons.length} bài · ${items.size} mục học (${links.length} liên kết bài–mục)`
);
console.log(`→ public/data/learning-items.json, ${sqlPath}`);

async function push() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Thiếu DATABASE_URL (Supabase → Project Settings → Database → Connection string, chế độ Session).");
    process.exit(1);
  }
  const { Client } = await import("pg");
  const local = /localhost|127\.0\.0\.1|host=\//.test(url);
  const client = new Client({ connectionString: url, ssl: local ? undefined : { rejectUnauthorized: false } });
  await client.connect();
  try {
    const res = await client.query(sql.join("\n\n"));
    const reapplied = Array.isArray(res) ? res.find((r) => r.rows?.[0]?.reapplied_events !== undefined)?.rows[0].reapplied_events : undefined;
    console.log(`Đã đồng bộ catalog lên database.${reapplied ? ` Áp dụng lại ${reapplied} sự kiện chờ.` : ""}`);
  } finally {
    await client.end();
  }
}

if (PUSH)
  push().catch((e) => {
    console.error(e);
    process.exit(1);
  });
