"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Copy, Pencil, Plus, Trash2 } from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolio/store";
import { hasSample } from "@/lib/portfolio/sample";
import { PHASES, TECH_GROUPS, allTech, duration, emptyProject, months, ym, type Part, type PortfolioDoc, type Project } from "@/lib/portfolio/types";
import { btn } from "@/components/ui/page";
import { cn } from "@/lib/utils";
import { EducationForm, HeaderForm, PrForm, ProjectForm, SkillsForm } from "./editors";
import { PfFrame, SampleNotice } from "./shell";

type PanelState = { kind: Extract<Part, "header" | "pr" | "skills" | "education"> } | { kind: "project"; id: string | null };

const ANCHORS = [
  { href: "#pr", label: "自己PR" },
  { href: "#work", label: "業務経歴" },
  { href: "#skills", label: "技術経験" },
  { href: "#creds", label: "学歴・資格" },
];

/**
 * My Portfolio (職務経歴書) của người đang đăng nhập — trang con của /portfolio.
 * "Chỉnh sửa" bật các nút sửa / thêm / xóa / sắp xếp ở từng mục; biểu mẫu mở trong hộp thoại lớn.
 */
export function Portfolio() {
  const [editing, setEditing] = useState(false);
  const [panel, setPanel] = useState<PanelState | null>(null);
  const open = (p: PanelState) => {
    setEditing(true);
    setPanel(p);
  };

  return (
    <PfFrame
      title="My Portfolio"
      anchors={ANCHORS}
      editing={editing}
      setEditing={setEditing}
      editHint="Đang chỉnh sửa · mỗi mục có nút «Sửa» ở góc phải"
      editActions={
        <button type="button" className="tbtn brand" onClick={() => open({ kind: "project", id: null })}>
          <Plus aria-hidden /> Thêm dự án
        </button>
      }
    >
      {(view) => (
        <>
          {hasSample(view) && (
            <SampleNotice scope="resume">
              Đây là portfolio mẫu của một kỹ sư <b>hư cấu</b>, để bạn thấy một 職務経歴書 hoàn chỉnh trông thế nào. Bấm «Chỉnh sửa» để thay từng phần bằng của bạn.
            </SampleNotice>
          )}
          <Hero doc={view} editing={editing} onEdit={() => open({ kind: "header" })} />
          <PrSection doc={view} editing={editing} onEdit={() => open({ kind: "pr" })} />
          <WorkSection doc={view} editing={editing} onOpen={open} />
          <SkillsSection doc={view} editing={editing} onEdit={() => open({ kind: "skills" })} />
          <EduSection doc={view} editing={editing} onEdit={() => open({ kind: "education" })} />
          <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-line-strong pt-6 text-[13px] text-ink-3">
            <span>
              © {new Date().getFullYear()} {view.header.name || "Portfolio"} · LeoEdu Portfolio
            </span>
            <span>Chỉ bạn xem được trang này.</span>
          </footer>
          {panel && <Panels panel={panel} doc={view} onClose={() => setPanel(null)} />}
        </>
      )}
    </PfFrame>
  );
}

// ─────────────── khung mục ───────────────
function Sec({
  id,
  eyebrow,
  title,
  note,
  sample,
  editing,
  tools,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  note?: ReactNode;
  sample?: boolean;
  editing: boolean;
  tools?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-h`}>
      <div className="sec-head">
        <div>
          <span className="eyebrow flex flex-wrap items-center gap-2">
            {eyebrow} {sample && <span className="badge-sample">Mẫu</span>}
          </span>
          <h2 id={`${id}-h`} className="hx jp" lang="ja">
            {title}
          </h2>
        </div>
        {editing && tools ? <div className="sec-tools">{tools}</div> : note && <p className="side-note jp">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function EditBtn({ onClick, children = "Sửa", icon, brand }: { onClick: () => void; children?: ReactNode; icon?: ReactNode; brand?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={brand ? "tbtn brand" : "tbtn dark"}>
      {icon ?? <Pencil aria-hidden />} {children}
    </button>
  );
}

function Empty({ text, action, onAction }: { text: string; action: string; onAction: () => void }) {
  return (
    <div className="empty">
      <span>{text}</span>
      <button type="button" onClick={onAction} className="tbtn brand">
        <Plus aria-hidden /> {action}
      </button>
    </div>
  );
}

// ─────────────── phần đầu trang ───────────────
function Hero({ doc, editing, onEdit }: { doc: PortfolioDoc; editing: boolean; onEdit: () => void }) {
  const h = doc.header;
  const words = h.name.trim().split(/\s+/).filter(Boolean);
  const first = words.length > 1 ? words.slice(0, -1).join(" ") : words[0];
  const last = words.length > 1 ? words[words.length - 1] : "";
  const facts = h.facts.filter((f) => f.value || f.label);
  const years = doc.projects.map((p) => p.data.from.slice(0, 4)).filter(Boolean).sort();
  return (
    <section className="hero" aria-labelledby="pf-name">
      <div className="min-w-0">
        <span className="eyebrow flex flex-wrap items-center gap-2">
          {[h.role, h.location].filter(Boolean).join(" · ") || "Vai trò · Nơi ở"}
          {h.sample && <span className="badge-sample">Mẫu</span>}
        </span>
        <h1 id="pf-name" className="hx">
          {words.length ? (
            <>
              {first}
              {last && (
                <>
                  <br />
                  <span>{last}</span>
                </>
              )}
            </>
          ) : (
            <span>Tên của bạn</span>
          )}
        </h1>
        {h.intro ? (
          <p className="intro jp">{h.intro}</p>
        ) : (
          <p className="intro text-ink-3">Chưa có phần giới thiệu. Vài câu về bạn: thế mạnh, công nghệ chính, điều bạn quan tâm.</p>
        )}
        <div className="cta">
          {editing && (
            <button type="button" onClick={onEdit} className="tbtn dark lg">
              <Pencil aria-hidden /> Sửa phần giới thiệu
            </button>
          )}
          <a className={btn.primary} href="#work" lang="ja">
            業務経歴を見る →
          </a>
          {h.links.map((l) => (
            <a key={l.url + l.label} className={btn.ghost} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
        {facts.length > 0 && (
          <div className="facts jp" lang="ja">
            {facts.map((f, i) => (
              <div key={i}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <HeroArt label={years.length ? `${years[0]} — 現在` : "— 現在"} />
    </section>
  );
}

/** Hình nét mảnh: bàn làm việc isometric, laptop, các khối dự án, mặt trời đỏ (giống bản thiết kế mẫu) */
function HeroArt({ label }: { label: string }) {
  return (
    <div className="art draw" aria-hidden>
      <svg viewBox="0 0 520 440">
        <circle className="sun" cx="400" cy="120" r="92" fill="#b8202f" />
        <path className="stroke" style={{ "--len": 900 } as CSSProperties} d="M60 300 L260 200 L460 300 L260 400 Z" />
        <path className="stroke" style={{ "--len": 500 } as CSSProperties} d="M60 300 L60 318 L260 418 L460 318 L460 300" />
        <path className="stroke thin" style={{ "--len": 200 } as CSSProperties} d="M260 400 L260 418" />
        <path className="stroke" style={{ "--len": 700 } as CSSProperties} d="M150 300 L260 245 L370 300 L260 355 Z" />
        <path className="stroke thin" style={{ "--len": 300 } as CSSProperties} d="M180 300 L260 260 L340 300 L260 340 Z" />
        <path className="stroke" style={{ "--len": 700 } as CSSProperties} d="M150 300 L150 175 L260 120 L260 245" />
        <path className="stroke thin" style={{ "--len": 600 } as CSSProperties} d="M162 290 L162 182 L248 139 L248 239" />
        <g className="tone">
          <path d="M162 290 L162 182 L248 139 L248 239 Z" fill="#1c1917" opacity=".9" />
          <path d="M172 200 l40 -20 M172 214 l60 -30 M172 228 l30 -15 M182 242 l50 -25 M172 256 l45 -22" stroke="#faf8f5" strokeWidth="3" strokeLinecap="round" opacity=".85" />
          <path d="M215 222 l25 -12" stroke="#b8202f" strokeWidth="3" strokeLinecap="round" />
        </g>
        <path className="stroke" style={{ "--len": 500 } as CSSProperties} d="M330 250 L380 225 L430 250 L380 275 Z M330 250 L330 270 L380 295 L430 270 L430 250" />
        <path className="stroke" style={{ "--len": 500 } as CSSProperties} d="M340 230 L380 210 L420 230 L380 250 Z M340 230 L340 245 M420 230 L420 245" />
        <path className="stroke" style={{ "--len": 400 } as CSSProperties} d="M350 212 L380 197 L410 212 L380 227 Z M350 212 L350 222 M410 212 L410 222" />
        <path className="hid" d="M260 200 L260 245 M380 225 L380 197" />
        <path className="stroke" style={{ "--len": 300 } as CSSProperties} d="M95 290 a18 8 0 1 0 36 0 a18 8 0 1 0 -36 0 M95 290 L99 318 a14 6 0 0 0 28 0 L131 290" />
        <path className="stroke thin" style={{ "--len": 600 } as CSSProperties} d="M20 300 L500 300 M260 60 L260 430" />
        <text x="150" y="72" fontSize="11" fill="#736b64">
          {label}
        </text>
      </svg>
    </div>
  );
}

// ─────────────── 自己PR ───────────────
function PrSection({ doc, editing, onEdit }: { doc: PortfolioDoc; editing: boolean; onEdit: () => void }) {
  const s = doc.pr.sections;
  return (
    <Sec id="pr" eyebrow="Self PR" title="自己PR" sample={doc.pr.sample} editing={editing} tools={<EditBtn onClick={onEdit}>Sửa 自己PR</EditBtn>} note="技術と人柄の両面から。">
      {s.length ? (
        <div className="grid-cells pr jp" lang="ja" style={{ "--n": Math.min(s.length, 3) } as CSSProperties}>
          {s.map((x) => (
            <div key={x.id}>
              <h3 className="cell-h">{x.title}</h3>
              <ul className="bul">
                {x.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <Empty text="Chưa có 自己PR. Viết vài ý về thế mạnh kỹ thuật và tính cách của bạn." action="Thêm 自己PR" onAction={onEdit} />
      )}
    </Sec>
  );
}

// ─────────────── 業務経歴 ───────────────
function WorkSection({ doc, editing, onOpen }: { doc: PortfolioDoc; editing: boolean; onOpen: (p: PanelState) => void }) {
  const [filter, setFilter] = useState<string | null>(null);
  const projects = doc.projects;
  // Chip lọc: các công nghệ xuất hiện nhiều nhất (tối đa 8)
  const chips = useMemo(() => {
    const n = new Map<string, number>();
    for (const p of projects) for (const t of allTech(p.data)) n.set(t, (n.get(t) ?? 0) + 1);
    return [...n.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([t]) => t);
  }, [projects]);
  const active = filter && chips.includes(filter) ? filter : null;
  const list = active ? projects.filter((p) => allTech(p.data).includes(active)) : projects;
  const years = projects.map((p) => p.data.from.slice(0, 4)).filter(Boolean).sort();

  return (
    <Sec
      id="work"
      eyebrow={`Projects${years.length ? ` · ${years[0]} — 現在` : ""}`}
      title="業務経歴"
      sample={projects.some((p) => p.data.sample)}
      editing={editing}
      tools={
        <EditBtn brand onClick={() => onOpen({ kind: "project", id: null })} icon={<Plus aria-hidden />}>
          Thêm dự án
        </EditBtn>
      }
      note={projects.length ? `参加したプロジェクト ${projects.length}件。技術で絞り込み、「詳細」で担当内容と学んだことを表示します。` : undefined}
    >
      {projects.length > 0 && chips.length > 0 && (
        <div className="filters" role="group" aria-label="Lọc theo công nghệ">
          <button type="button" className="chip" aria-pressed={!active} onClick={() => setFilter(null)}>
            すべて
          </button>
          {chips.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={active === t} onClick={() => setFilter(active === t ? null : t)}>
              {t}
            </button>
          ))}
          <span className="count" aria-live="polite">
            {list.length} / {projects.length} 件
          </span>
        </div>
      )}
      {projects.length === 0 ? (
        <Empty text="Chưa có dự án nào. Thêm dự án đầu tiên theo mẫu 職務経歴書: thời gian, vai trò, công đoạn, công nghệ, việc đảm nhận." action="Thêm dự án" onAction={() => onOpen({ kind: "project", id: null })} />
      ) : (
        <div className="projects">
          {list.map((p) => (
            <ProjectCard key={p.id} p={p} no={projects.length - projects.indexOf(p)} index={projects.indexOf(p)} total={projects.length} hit={active} editing={editing} onEdit={() => onOpen({ kind: "project", id: p.id })} />
          ))}
        </div>
      )}
    </Sec>
  );
}

function ProjectCard({ p, no, index, total, hit, editing, onEdit }: { p: Project; no: number; index: number; total: number; hit: string | null; editing: boolean; onEdit: () => void }) {
  const d = p.data;
  const [ask, setAsk] = useState(false);
  const del = usePortfolioStore((s) => s.deleteProject);
  const mv = usePortfolioStore((s) => s.moveProject);
  const dup = usePortfolioStore((s) => s.duplicateProject);
  const hid = `pj-${p.id}`;
  return (
    <article className="proj jp" lang="ja" aria-labelledby={hid}>
      <div className="when">
        <div className="no">{String(no).padStart(2, "0")}</div>
        <div className="period">
          {ym(d.from)} — {d.to ? ym(d.to) : "現在"}
        </div>
        <div className="dur">{duration(months(d.from, d.to))}</div>
        {!d.to && <span className="now">参加中</span>}
      </div>
      <div className="pmain">
        <h3 id={hid}>
          {d.title} {d.sample && <span className="badge-sample align-middle" lang="vi">Mẫu</span>}
        </h3>
        <div className="meta">
          {d.industry && <span className="ind">{d.industry}</span>}
          {d.role && (
            <span>
              役割 <b>{d.role}</b>
            </span>
          )}
          {d.teamSize != null && (
            <span>
              チーム <b>{d.teamSize}人</b>
            </span>
          )}
        </div>
        {d.summary && <p className="summary">{d.summary}</p>}
        {(d.duties.length > 0 || d.learnings.length > 0 || d.results.length > 0) && (
          <details>
            <summary>詳細：担当内容{d.results.length ? "・成果" : ""}・学んだこと</summary>
            <div className="dgrid">
              <div>
                <h4 className="h4">担当内容</h4>
                <ul className="bul">
                  {d.duties.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                {d.results.length > 0 && (
                  <div className="mb-4">
                    <h4 className="h4">成果</h4>
                    <ul className="bul">
                      {d.results.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {d.learnings.length > 0 && (
                  <>
                    <h4 className="h4">学んだこと</h4>
                    <ul className="bul">
                      {d.learnings.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </details>
        )}
        {editing && (
          <div lang="vi">
            <div className="proj-tools">
              <button type="button" className="tbtn dark" onClick={onEdit}>
                <Pencil aria-hidden /> Sửa dự án
              </button>
              <button type="button" className="tbtn" onClick={() => dup(p.id)}>
                <Copy aria-hidden /> Nhân bản
              </button>
              <button type="button" className="tbtn icon" onClick={() => mv(p.id, -1)} disabled={index === 0} aria-label="Đưa lên trên" title="Đưa lên trên">
                <ArrowUp aria-hidden />
              </button>
              <button type="button" className="tbtn icon" onClick={() => mv(p.id, 1)} disabled={index === total - 1} aria-label="Đưa xuống dưới" title="Đưa xuống dưới">
                <ArrowDown aria-hidden />
              </button>
              <button type="button" className="tbtn danger ml-auto" onClick={() => setAsk(true)} aria-expanded={ask}>
                <Trash2 aria-hidden /> Xóa
              </button>
            </div>
            {ask && (
              <div className="confirm" role="alert">
                <span className="min-w-0 flex-1">Xóa dự án «{d.title}»? Không hoàn tác được.</span>
                <button type="button" className="tbtn brand" onClick={() => del(p.id)}>
                  Xóa dự án
                </button>
                <button type="button" className="tbtn" onClick={() => setAsk(false)}>
                  Hủy
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="pside">
        <h4 className="h4">参加工程</h4>
        <div className="phases">
          {PHASES.map((ph) => (
            <span key={ph.key} className={d.phases.includes(ph.key) ? "on" : ""}>
              {ph.label}
            </span>
          ))}
        </div>
        <h4 className="h4">技術要素</h4>
        {TECH_GROUPS.filter((g) => d.tech[g.key].length).map((g) => (
          <div key={g.key} className="tech-g">
            <i>{g.label}</i>
            <div className="tags">
              {d.tech[g.key].map((t) => (
                <span key={t} className={cn("tag", hit === t && "hit")}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
        {allTech(d).length === 0 && <p className="text-[13px] text-ink-3">—</p>}
      </div>
    </article>
  );
}

// ─────────────── 技術経験 ───────────────
function SkillsSection({ doc, editing, onEdit }: { doc: PortfolioDoc; editing: boolean; onEdit: () => void }) {
  const g = doc.skills.groups;
  return (
    <Sec id="skills" eyebrow="Skills · 経験年数" title="技術経験" sample={doc.skills.sample} editing={editing} tools={<EditBtn onClick={onEdit}>Sửa kỹ năng</EditBtn>} note="主な言語・技術・工程の経験年数。">
      {g.length ? (
        <div className="grid-cells skills jp" lang="ja" style={{ "--n": Math.min(g.length, 4) } as CSSProperties}>
          {g.map((x) => {
            const max = Math.max(1, ...x.items.map((i) => i.years));
            return (
              <div key={x.id}>
                <h3 className="cell-h">{x.title}</h3>
                {x.items.map((it) => (
                  <div key={it.name} className="bar">
                    <span>{it.name}</span>
                    <em>{it.years}年</em>
                    <i style={{ "--w": `${Math.round((it.years / max) * 100)}%` } as CSSProperties} />
                  </div>
                ))}
                {x.items.length === 0 && <p className="text-[13px] text-ink-3">—</p>}
              </div>
            );
          })}
        </div>
      ) : (
        <Empty text="Chưa có kỹ năng. Thêm nhóm (言語, FW…) với số năm kinh nghiệm từng mục." action="Thêm kỹ năng" onAction={onEdit} />
      )}
    </Sec>
  );
}

// ─────────────── 学歴・資格 ───────────────
function EduSection({ doc, editing, onEdit }: { doc: PortfolioDoc; editing: boolean; onEdit: () => void }) {
  const e = doc.education.entries;
  return (
    <Sec id="creds" eyebrow="Education & Certificates" title="学歴・資格" sample={doc.education.sample} editing={editing} tools={<EditBtn onClick={onEdit}>Sửa học vấn</EditBtn>}>
      {e.length ? (
        <div className="grid-cells creds jp" lang="ja" style={{ "--n": Math.min(e.length, 4) } as CSSProperties}>
          {e.map((x) => (
            <div key={x.id}>
              <b>{x.title}</b>
              <span>{x.detail}</span>
            </div>
          ))}
        </div>
      ) : (
        <Empty text="Chưa có học vấn / chứng chỉ." action="Thêm mục" onAction={onEdit} />
      )}
    </Sec>
  );
}

// ─────────────── bảng chỉnh sửa ───────────────
function Panels({ panel, doc, onClose }: { panel: PanelState; doc: PortfolioDoc; onClose: () => void }) {
  const savePart = usePortfolioStore((s) => s.savePart);
  const saveProject = usePortfolioStore((s) => s.saveProject);
  const deleteProject = usePortfolioStore((s) => s.deleteProject);
  switch (panel.kind) {
    case "header":
      return <HeaderForm initial={doc.header} onClose={onClose} onSave={(v) => savePart("header", v)} />;
    case "pr":
      return <PrForm initial={doc.pr} onClose={onClose} onSave={(v) => savePart("pr", v)} />;
    case "skills":
      return <SkillsForm initial={doc.skills} onClose={onClose} onSave={(v) => savePart("skills", v)} />;
    case "education":
      return <EducationForm initial={doc.education} onClose={onClose} onSave={(v) => savePart("education", v)} />;
    case "project": {
      const p = panel.id ? doc.projects.find((x) => x.id === panel.id) : null;
      return (
        <ProjectForm
          isNew={!p}
          initial={p ? p.data : emptyProject()}
          onClose={onClose}
          onSave={(v) => {
            saveProject(p ? p.id : null, v);
          }}
          onDelete={p ? () => deleteProject(p.id) : undefined}
        />
      );
    }
  }
}
