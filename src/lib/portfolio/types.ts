/**
 * Kiểu dữ liệu portfolio (職務経歴書) của một tài khoản. Phần đầu trang / 自己PR / kỹ năng / học vấn
 * lưu thành jsonb trong profile.portfolios; mỗi dự án một dòng trong profile.portfolio_projects
 * (supabase/migrations/20261025000001_portfolio.sql). `sample: true` = nội dung mẫu chưa được người dùng sửa.
 */

export const PHASES = [
  { key: "negotiation", label: "顧客折衝" },
  { key: "requirements", label: "調査／要件定義" },
  { key: "basic", label: "基本設計" },
  { key: "detail", label: "詳細設計" },
  { key: "impl", label: "実装・コーディング" },
  { key: "unit", label: "単体テスト" },
  { key: "integration", label: "結合テスト" },
  { key: "system", label: "総合テスト" },
  { key: "qa", label: "品質管理" },
  { key: "progress", label: "進捗管理" },
  { key: "ops", label: "保守・運用" },
] as const;
export type PhaseKey = (typeof PHASES)[number]["key"];

export const TECH_GROUPS = [
  { key: "lang", label: "言語" },
  { key: "fw", label: "FW" },
  { key: "db", label: "DB" },
  { key: "infra", label: "OS・インフラ" },
  { key: "other", label: "その他" },
] as const;
export type TechKey = (typeof TECH_GROUPS)[number]["key"];

export interface LinkItem {
  label: string;
  url: string;
}
export interface Fact {
  value: string;
  label: string;
}

export interface Header {
  name: string;
  role: string;
  location: string;
  intro: string;
  links: LinkItem[];
  /** Đúng 5 ô số liệu dưới phần giới thiệu */
  facts: Fact[];
  sample?: boolean;
}

export interface PrSection {
  id: string;
  title: string;
  bullets: string[];
}
export interface Pr {
  sections: PrSection[];
  sample?: boolean;
}

export interface SkillItem {
  name: string;
  years: number;
}
export interface SkillGroup {
  id: string;
  title: string;
  items: SkillItem[];
}
export interface Skills {
  groups: SkillGroup[];
  sample?: boolean;
}

export interface EduEntry {
  id: string;
  title: string;
  detail: string;
}
export interface Education {
  entries: EduEntry[];
  sample?: boolean;
}

export interface ProjectData {
  /** 案件名 */
  title: string;
  /** 期間: YYYY-MM; to = null → 現在 */
  from: string;
  to: string | null;
  /** 業界 */
  industry: string;
  /** チーム人数 */
  teamSize: number | null;
  /** 役割 */
  role: string;
  /** 参加工程 */
  phases: PhaseKey[];
  /** 技術要素 */
  tech: Record<TechKey, string[]>;
  /** 概要 */
  summary: string;
  /** 担当内容 */
  duties: string[];
  /** 成果 (tùy chọn) */
  results: string[];
  /** 学んだこと */
  learnings: string[];
  sample?: boolean;
}

export interface Project {
  id: string;
  data: ProjectData;
}

// ── Introduce (自己紹介): thẻ hồ sơ + các mục giới thiệu, tiếng Nhật kèm bản dịch tiếng Việt ──
export interface IntroProfile {
  name: string;
  /** Phiên âm (フリガナ) */
  kana: string;
  role: string;
  location: string;
  /** Số năm kinh nghiệm, viết tự do */
  years: string;
  /** Ngôn ngữ sử dụng, viết tự do */
  langs: string;
  /** Câu khẩu hiệu (キャッチコピー) */
  catchJa: string;
  catchVi: string;
}
export interface IntroBlock {
  id: string;
  titleJa: string;
  titleVi: string;
  bodyJa: string;
  bodyVi: string;
}
export interface Introduce {
  profile: IntroProfile;
  /** Mục đầu tiên hiện nổi bật cạnh thẻ hồ sơ */
  blocks: IntroBlock[];
  sample?: boolean;
}

// ── Interview Q&A (面接Q&A): câu hỏi / trả lời tiếng Nhật kèm bản dịch tiếng Việt ──
export const QA_CATS = [
  { key: "intro", ja: "自己紹介・経歴", vi: "Giới thiệu & kinh nghiệm" },
  { key: "tech", ja: "技術", vi: "Kỹ thuật" },
  { key: "team", ja: "チームワーク", vi: "Làm việc nhóm" },
  { key: "motive", ja: "志望動機・キャリア", vi: "Động lực & định hướng" },
  { key: "reverse", ja: "逆質問", vi: "Câu hỏi ngược" },
] as const;
export type QaCat = (typeof QA_CATS)[number]["key"];
export interface QaItem {
  id: string;
  cat: QaCat;
  qJa: string;
  qVi: string;
  aJa: string;
  aVi: string;
}
export interface Interview {
  items: QaItem[];
  sample?: boolean;
}

export type Part = "header" | "pr" | "skills" | "education" | "introduce" | "interview";
/** Các phần của trang My Portfolio (職務経歴書) */
export const RESUME_PARTS = ["header", "pr", "skills", "education"] as const;

export interface PortfolioDoc {
  header: Header;
  pr: Pr;
  skills: Skills;
  education: Education;
  projects: Project[];
  introduce: Introduce;
  interview: Interview;
}

/** UUID v4 cho dự án / mục mới (tạo ngay trên máy để sửa offline rồi đồng bộ sau mà không trùng) */
export function newId(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16)); // randomUUID chỉ có trong secure context
  b[6] = (b[6] & 15) | 64;
  b[8] = (b[8] & 63) | 128;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export const emptyTech = (): Record<TechKey, string[]> => ({ lang: [], fw: [], db: [], infra: [], other: [] });

export const emptyProject = (): ProjectData => ({
  title: "",
  from: "",
  to: null,
  industry: "",
  teamSize: null,
  role: "",
  phases: [],
  tech: emptyTech(),
  summary: "",
  duties: [],
  results: [],
  learnings: [],
});

export const emptyFacts = (): Fact[] => Array.from({ length: 5 }, () => ({ value: "", label: "" }));

export const emptyIntroProfile = (): IntroProfile => ({ name: "", kana: "", role: "", location: "", years: "", langs: "", catchJa: "", catchVi: "" });

export const emptyDoc = (): PortfolioDoc => ({
  header: { name: "", role: "", location: "", intro: "", links: [], facts: emptyFacts() },
  pr: { sections: [] },
  skills: { groups: [] },
  education: { entries: [] },
  projects: [],
  introduce: { profile: emptyIntroProfile(), blocks: [] },
  interview: { items: [] },
});

const str = (v: unknown) => (typeof v === "string" ? v : "");

/** Introduce từ máy chủ / bộ nhớ cũ; chưa từng lưu (không có "blocks") → null để dùng nội dung mẫu */
export function normalizeIntroduce(raw: unknown): Introduce | null {
  const r = raw as Partial<Introduce> | null | undefined;
  if (!r || !Array.isArray(r.blocks)) return null;
  const p = (r.profile ?? {}) as Partial<Record<keyof IntroProfile, unknown>>;
  const profile = emptyIntroProfile();
  for (const k of Object.keys(profile) as (keyof IntroProfile)[]) profile[k] = str(p[k]);
  return {
    profile,
    blocks: r.blocks
      .filter((b): b is IntroBlock => !!b && typeof b === "object")
      .map((b) => ({ id: str(b.id) || newId(), titleJa: str(b.titleJa), titleVi: str(b.titleVi), bodyJa: str(b.bodyJa), bodyVi: str(b.bodyVi) })),
    sample: !!r.sample,
  };
}

/** Interview Q&A từ máy chủ / bộ nhớ cũ; chưa từng lưu (không có "items") → null để dùng nội dung mẫu */
export function normalizeInterview(raw: unknown): Interview | null {
  const r = raw as Partial<Interview> | null | undefined;
  if (!r || !Array.isArray(r.items)) return null;
  return {
    items: r.items
      .filter((q): q is QaItem => !!q && typeof q === "object")
      .map((q) => ({
        id: str(q.id) || newId(),
        cat: QA_CATS.some((c) => c.key === q.cat) ? q.cat : "intro",
        qJa: str(q.qJa),
        qVi: str(q.qVi),
        aJa: str(q.aJa),
        aVi: str(q.aVi),
      })),
    sample: !!r.sample,
  };
}

/** Đọc dữ liệu từ máy chủ / bộ nhớ cũ một cách phòng thủ (thiếu khóa → giá trị rỗng) */
export function normalizeProject(d: Partial<ProjectData> | null | undefined): ProjectData {
  const e = emptyProject();
  const arr = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  const tech = emptyTech();
  for (const g of TECH_GROUPS) tech[g.key] = arr((d?.tech as Record<string, unknown> | undefined)?.[g.key]);
  return {
    ...e,
    ...d,
    title: d?.title ?? "",
    from: d?.from ?? "",
    to: d?.to ?? null,
    teamSize: typeof d?.teamSize === "number" ? d.teamSize : null,
    phases: arr(d?.phases).filter((p): p is PhaseKey => PHASES.some((x) => x.key === p)),
    tech,
    duties: arr(d?.duties),
    results: arr(d?.results),
    learnings: arr(d?.learnings),
  };
}

export function normalizeDoc(
  raw: Partial<Record<Part, unknown>>,
  projects: Project[],
  fallback: { introduce: () => Introduce; interview: () => Interview }
): PortfolioDoc {
  const e = emptyDoc();
  const h = { ...e.header, ...(raw.header as Partial<Header> | undefined) };
  const facts = Array.isArray(h.facts) ? h.facts.slice(0, 5) : [];
  while (facts.length < 5) facts.push({ value: "", label: "" });
  return {
    header: { ...h, links: Array.isArray(h.links) ? h.links : [], facts },
    pr: { ...e.pr, ...(raw.pr as Partial<Pr> | undefined) },
    skills: { ...e.skills, ...(raw.skills as Partial<Skills> | undefined) },
    education: { ...e.education, ...(raw.education as Partial<Education> | undefined) },
    projects: projects.map((p) => ({ id: p.id, data: normalizeProject(p.data) })),
    introduce: normalizeIntroduce(raw.introduce) ?? fallback.introduce(),
    interview: normalizeInterview(raw.interview) ?? fallback.interview(),
  };
}

// ── Hiển thị kỳ hạn ──
export const ym = (s: string) => {
  const [y, m] = s.split("-");
  return y && m ? `${y}年${+m}月` : s;
};
export function months(from: string, to: string | null, now = new Date()): number {
  const [y1, m1] = from.split("-").map(Number);
  const [y2, m2] = to ? to.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  if (!y1 || !m1 || !y2 || !m2) return 0;
  return Math.max(1, (y2 - y1) * 12 + (m2 - m1) + 1);
}
export const duration = (n: number) => (n >= 12 ? `${Math.floor(n / 12)}年${n % 12 ? `${n % 12}ヶ月` : ""}` : `${n}ヶ月`);

export const allTech = (d: ProjectData) => TECH_GROUPS.flatMap((g) => d.tech[g.key]);
