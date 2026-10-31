"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Check, Plus, Trash2, X } from "lucide-react";
import {
  PHASES,
  TECH_GROUPS,
  emptyFacts,
  newId,
  type Education,
  type Header,
  type Pr,
  type ProjectData,
  type Skills,
} from "@/lib/portfolio/types";

/*
 * Bảng chỉnh sửa (hộp thoại lớn giữa màn hình) và các biểu mẫu của portfolio. Chrome bằng tiếng Việt; nội dung là chữ người dùng viết.
 * Danh sách (担当内容, 学んだこと…) nhập "mỗi dòng một mục" để gõ nhanh cả trên điện thoại.
 */

type Errors = Record<string, string>;
const lines = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
const isUrl = (s: string) => /^https?:\/\/[^\s.]+\.[^\s]+$/i.test(s.trim());

/** Hộp thoại chỉnh sửa lớn: Esc / nền mờ để đóng, khóa cuộn trang, focus ô đầu tiên; tùy chọn nút xóa ở chân */
export function EditPanel({
  title,
  eyebrow,
  lead,
  onClose,
  onSubmit,
  submitLabel = "Lưu",
  onDelete,
  deleteLabel = "Xóa",
  children,
}: {
  title: string;
  eyebrow?: string;
  lead?: ReactNode;
  onClose: () => void;
  onSubmit: () => boolean;
  submitLabel?: string;
  /** Có → hiện nút xóa (hỏi xác nhận) ở góc trái chân hộp thoại */
  onDelete?: () => void;
  deleteLabel?: string;
  children: ReactNode;
}) {
  const [askDel, setAskDel] = useState(false);
  const id = useId();
  const ref = useRef<HTMLFormElement>(null);
  // onClose thường là hàm mới mỗi lần vẽ → giữ trong ref để hiệu ứng mở bảng chỉ chạy một lần
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("input, textarea")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close.current();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit()) {
      close.current();
      return;
    }
    // Lỗi: đưa tới ô sai đầu tiên (sau khi React vẽ lại)
    requestAnimationFrame(() => {
      const bad = ref.current?.querySelector<HTMLElement>("[aria-invalid=true]");
      bad?.scrollIntoView({ block: "center" });
      bad?.focus();
    });
  };

  return (
    <div className="pf-panel" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby={id}>
        <form ref={ref} onSubmit={submit} noValidate className="flex h-full min-h-0 flex-col">
          <div className="ph">
            <div className="min-w-0">
              {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
              <h2 id={id}>{title}</h2>
              {lead && <p className="mt-1.5 text-[14px] leading-relaxed text-ink-3">{lead}</p>}
            </div>
            <button type="button" onClick={onClose} className="x" aria-label="Đóng">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="pb">{children}</div>
          <div className="pfoot">
            <div className="flex flex-wrap items-center gap-2">
              {onDelete &&
                (askDel ? (
                  <>
                    <span className="text-[14px] font-semibold text-brand-soft-ink">Xóa hẳn? Không hoàn tác được.</span>
                    <button
                      type="button"
                      className="tbtn brand lg"
                      onClick={() => {
                        onDelete();
                        close.current();
                      }}
                    >
                      {deleteLabel}
                    </button>
                    <button type="button" className="tbtn lg" onClick={() => setAskDel(false)}>
                      Không
                    </button>
                  </>
                ) : (
                  <button type="button" className="tbtn danger lg" onClick={() => setAskDel(true)}>
                    <Trash2 aria-hidden /> {deleteLabel}
                  </button>
                ))}
            </div>
            <div className="ml-auto flex gap-2.5">
              <button type="button" onClick={onClose} className="tbtn lg">
                Hủy
              </button>
              <button type="submit" className="tbtn brand lg">
                <Check aria-hidden /> {submitLabel}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <label className="f">
      <span>
        {label} {hint && <span className="hint">· {hint}</span>}
      </span>
      {children}
      {error && <span className="err">{error}</span>}
    </label>
  );
}

export function Text({
  value,
  onChange,
  invalid,
  type = "text",
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  lang?: string;
  "aria-label"?: string;
}) {
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid || undefined} {...rest} />;
}

export function Area({
  value,
  onChange,
  invalid,
  rows = 4,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
  lang?: string;
  className?: string;
}) {
  return <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid || undefined} {...rest} />;
}

/** Ô nhập thẻ: Enter / dấu phẩy để thêm, Backspace khi trống để xóa thẻ cuối, dán "a, b, c" thành 3 thẻ */
function TagInput({ value, onChange, label }: { value: string[]; onChange: (v: string[]) => void; label: string }) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const next = raw
      .split(/[,、，\n]/)
      .map((x) => x.trim())
      .filter((x) => x && !value.includes(x));
    if (next.length) onChange([...value, ...next].slice(0, 40));
    setDraft("");
  };
  return (
    <div className="taginput">
      {value.map((t) => (
        <span key={t} className="t">
          <span className="truncate">{t}</span>
          <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Bỏ ${t}`}>
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={draft}
        aria-label={label}
        placeholder={value.length ? "" : "Gõ rồi nhấn Enter"}
        onChange={(e) => (/[,、，]/.test(e.target.value) ? add(e.target.value) : setDraft(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={() => draft.trim() && add(draft)}
        maxLength={60}
      />
    </div>
  );
}

export function SmallBtn({ children, onClick, label, disabled, danger }: { children: ReactNode; onClick: () => void; label: string; disabled?: boolean; danger?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} className={danger ? "tbtn icon danger" : "tbtn icon"}>
      {children}
    </button>
  );
}

export function AddBtn({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="tbtn self-start border-dashed">
      <Plus aria-hidden /> {children}
    </button>
  );
}

export const move = <T,>(a: T[], i: number, d: number) => {
  const j = i + d;
  if (j < 0 || j >= a.length) return a;
  const b = [...a];
  [b[i], b[j]] = [b[j], b[i]];
  return b;
};

// ═══════════════ Phần đầu trang ═══════════════
export function HeaderForm({ initial, onSave, onClose }: { initial: Header; onSave: (v: Header) => void; onClose: () => void }) {
  const [v, setV] = useState<Header>(() => ({ ...initial, facts: initial.facts.length === 5 ? initial.facts : emptyFacts() }));
  const [err, setErr] = useState<Errors>({});
  const up = (p: Partial<Header>) => setV((x) => ({ ...x, ...p }));

  const submit = () => {
    const e: Errors = {};
    if (!v.name.trim()) e.name = "Cần nhập tên hiển thị.";
    v.links.forEach((l, i) => {
      if (!l.label.trim() && !l.url.trim()) return;
      if (!l.label.trim()) e[`link${i}l`] = "Cần tên liên kết.";
      if (!isUrl(l.url)) e[`link${i}u`] = "Địa chỉ phải bắt đầu bằng http:// hoặc https://";
    });
    v.facts.forEach((f, i) => {
      if (f.value.trim() && !f.label.trim()) e[`fact${i}l`] = "Cần nhãn cho số liệu.";
    });
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({
      ...v,
      name: v.name.trim(),
      role: v.role.trim(),
      location: v.location.trim(),
      intro: v.intro.trim(),
      links: v.links.filter((l) => l.label.trim() && l.url.trim()).map((l) => ({ label: l.label.trim(), url: l.url.trim() })),
      facts: v.facts.map((f) => ({ value: f.value.trim(), label: f.label.trim() })),
    });
    return true;
  };

  return (
    <EditPanel eyebrow="My Portfolio · Phần đầu trang" title="Sửa phần giới thiệu" onClose={onClose} onSubmit={submit}>
      <fieldset>
        <legend>
          <span className="n">1</span> Thông tin
        </legend>
      <Field label="Tên hiển thị" hint="dòng cuối hiện màu xám" error={err.name}>
        <Text value={v.name} onChange={(name) => up({ name })} invalid={!!err.name} maxLength={60} placeholder="Kenta Morimoto" />
      </Field>
      <div className="row2">
        <Field label="Vai trò / chức danh">
          <Text value={v.role} onChange={(role) => up({ role })} maxLength={120} placeholder="Senior Frontend Engineer" />
        </Field>
        <Field label="Nơi ở">
          <Text value={v.location} onChange={(location) => up({ location })} maxLength={60} placeholder="東京都" />
        </Field>
      </div>
      <Field label="Giới thiệu ngắn" hint={`${v.intro.length}/600`}>
        <Area value={v.intro} onChange={(intro) => up({ intro })} maxLength={600} rows={5} />
      </Field>
      </fieldset>

      <div className="cols2">

      <fieldset>
        <legend>
          <span className="n">3</span> Liên kết (tối đa 4)
        </legend>
        {v.links.length === 0 && <p className="text-[13px] text-ink-3">Chưa có liên kết. Thêm trang portfolio, GitHub, blog…</p>}
        {v.links.map((l, i) => (
          <div key={i} className="rep">
            <Field label="Tên" error={err[`link${i}l`]}>
              <Text value={l.label} onChange={(label) => up({ links: v.links.map((x, j) => (j === i ? { ...x, label } : x)) })} invalid={!!err[`link${i}l`]} maxLength={40} />
            </Field>
            <Field label="Địa chỉ" error={err[`link${i}u`]}>
              <Text type="url" value={l.url} onChange={(url) => up({ links: v.links.map((x, j) => (j === i ? { ...x, url } : x)) })} invalid={!!err[`link${i}u`]} placeholder="https://" maxLength={300} />
            </Field>
            <SmallBtn danger label="Xóa liên kết" onClick={() => up({ links: v.links.filter((_, j) => j !== i) })}>
              <Trash2 className="h-4 w-4" aria-hidden />
            </SmallBtn>
          </div>
        ))}
        <AddBtn onClick={() => up({ links: [...v.links, { label: "", url: "" }] })} disabled={v.links.length >= 4}>
          Thêm liên kết
        </AddBtn>
      </fieldset>

      <fieldset>
        <legend>
          <span className="n">2</span> 5 ô số liệu
        </legend>
        <p className="-mt-1 text-[12.5px] text-ink-3">Số / chữ ngắn (vd. 8年, N2, −48%) và nhãn bên dưới. Để trống cả hai để ẩn ô.</p>
        {v.facts.map((f, i) => (
          <div key={i} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2">
            <Field label={`Ô ${i + 1} · số`}>
              <Text value={f.value} onChange={(value) => up({ facts: v.facts.map((x, j) => (j === i ? { ...x, value } : x)) })} maxLength={12} />
            </Field>
            <Field label="Nhãn" error={err[`fact${i}l`]}>
              <Text value={f.label} onChange={(label) => up({ facts: v.facts.map((x, j) => (j === i ? { ...x, label } : x)) })} invalid={!!err[`fact${i}l`]} maxLength={40} />
            </Field>
          </div>
        ))}
      </fieldset>
      </div>
    </EditPanel>
  );
}

// ═══════════════ 自己PR ═══════════════
export function PrForm({ initial, onSave, onClose }: { initial: Pr; onSave: (v: Pr) => void; onClose: () => void }) {
  const [rows, setRows] = useState(() => initial.sections.map((s) => ({ id: s.id, title: s.title, text: s.bullets.join("\n") })));
  const [err, setErr] = useState<Errors>({});
  const submit = () => {
    const e: Errors = {};
    rows.forEach((r, i) => {
      if (!r.title.trim() && !lines(r.text).length) return;
      if (!r.title.trim()) e[`t${i}`] = "Cần tiêu đề nhóm (vd. 技術, 性格).";
      if (!lines(r.text).length) e[`b${i}`] = "Cần ít nhất một ý.";
    });
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({ sections: rows.filter((r) => r.title.trim()).map((r) => ({ id: r.id, title: r.title.trim(), bullets: lines(r.text) })) });
    return true;
  };
  return (
    <EditPanel eyebrow="My Portfolio · Self PR" title="Sửa 自己PR" lead="Mỗi nhóm là một cột (vd. 技術 / 性格); mỗi dòng trong «Các ý» là một gạch đầu dòng." onClose={onClose} onSubmit={submit}>
      {rows.length === 0 && <p className="text-[14px] text-ink-3">Chưa có nhóm nào. Mỗi nhóm là một cột (vd. 技術 / 性格) với các ý gạch đầu dòng.</p>}
      {rows.map((r, i) => (
        <fieldset key={r.id}>
          <legend>Nhóm {i + 1}</legend>
          <Field label="Tiêu đề nhóm" error={err[`t${i}`]}>
            <Text value={r.title} onChange={(title) => setRows(rows.map((x, j) => (j === i ? { ...x, title } : x)))} invalid={!!err[`t${i}`]} maxLength={40} />
          </Field>
          <Field label="Các ý" hint="mỗi dòng một ý" error={err[`b${i}`]}>
            <Area value={r.text} onChange={(text) => setRows(rows.map((x, j) => (j === i ? { ...x, text } : x)))} invalid={!!err[`b${i}`]} rows={5} maxLength={3000} />
          </Field>
          <div className="flex gap-2">
            <SmallBtn label="Lên" onClick={() => setRows(move(rows, i, -1))} disabled={i === 0}>
              <ArrowUp className="h-4 w-4" aria-hidden />
            </SmallBtn>
            <SmallBtn label="Xuống" onClick={() => setRows(move(rows, i, 1))} disabled={i === rows.length - 1}>
              <ArrowDown className="h-4 w-4" aria-hidden />
            </SmallBtn>
            <SmallBtn danger label="Xóa nhóm" onClick={() => setRows(rows.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" aria-hidden />
            </SmallBtn>
          </div>
        </fieldset>
      ))}
      <AddBtn onClick={() => setRows([...rows, { id: newId(), title: "", text: "" }])} disabled={rows.length >= 4}>
        Thêm nhóm
      </AddBtn>
    </EditPanel>
  );
}

// ═══════════════ 技術経験 ═══════════════
export function SkillsForm({ initial, onSave, onClose }: { initial: Skills; onSave: (v: Skills) => void; onClose: () => void }) {
  const [groups, setGroups] = useState(() => initial.groups.map((g) => ({ ...g, items: g.items.map((x) => ({ name: x.name, years: String(x.years) })) })));
  const [err, setErr] = useState<Errors>({});
  const setG = (i: number, p: Partial<(typeof groups)[number]>) => setGroups(groups.map((g, j) => (j === i ? { ...g, ...p } : g)));
  const submit = () => {
    const e: Errors = {};
    groups.forEach((g, i) => {
      if (!g.title.trim()) e[`g${i}`] = "Cần tên nhóm (vd. 言語).";
      g.items.forEach((it, k) => {
        if (!it.name.trim() && !it.years.trim()) return;
        if (!it.name.trim()) e[`n${i}.${k}`] = "Cần tên.";
        const y = Number(it.years.replace(",", "."));
        if (!it.years.trim() || !Number.isFinite(y) || y < 0 || y > 60) e[`y${i}.${k}`] = "0–60";
      });
    });
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({
      groups: groups.map((g) => ({
        id: g.id,
        title: g.title.trim(),
        items: g.items.filter((it) => it.name.trim()).map((it) => ({ name: it.name.trim(), years: Math.round(Number(it.years.replace(",", ".")) * 10) / 10 })),
      })),
    });
    return true;
  };
  return (
    <EditPanel eyebrow="My Portfolio · Skills" title="Sửa 技術経験" lead="Mỗi nhóm là một cột; mỗi kỹ năng kèm số năm kinh nghiệm." onClose={onClose} onSubmit={submit}>
      {groups.length === 0 && <p className="text-[14px] text-ink-3">Chưa có nhóm kỹ năng. Thêm nhóm (言語, FW, 開発工程…), rồi thêm từng mục với số năm kinh nghiệm.</p>}
      {groups.map((g, i) => (
        <fieldset key={g.id}>
          <legend>Nhóm {i + 1}</legend>
          <div className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <Field label="Tên nhóm" error={err[`g${i}`]}>
                <Text value={g.title} onChange={(title) => setG(i, { title })} invalid={!!err[`g${i}`]} maxLength={30} />
              </Field>
            </div>
            <SmallBtn label="Nhóm lên" onClick={() => setGroups(move(groups, i, -1))} disabled={i === 0}>
              <ArrowUp className="h-4 w-4" aria-hidden />
            </SmallBtn>
            <SmallBtn danger label="Xóa nhóm" onClick={() => setGroups(groups.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" aria-hidden />
            </SmallBtn>
          </div>
          {g.items.map((it, k) => (
            <div key={k} className="grid grid-cols-[minmax(0,1fr)_84px_auto] items-end gap-2">
              <Field label={k === 0 ? "Kỹ năng" : ""} error={err[`n${i}.${k}`]}>
                <Text value={it.name} aria-label="Tên kỹ năng" onChange={(name) => setG(i, { items: g.items.map((x, j) => (j === k ? { ...x, name } : x)) })} invalid={!!err[`n${i}.${k}`]} maxLength={40} />
              </Field>
              <Field label={k === 0 ? "Số năm" : ""} error={err[`y${i}.${k}`]}>
                <Text type="number" value={it.years} aria-label="Số năm" onChange={(years) => setG(i, { items: g.items.map((x, j) => (j === k ? { ...x, years } : x)) })} invalid={!!err[`y${i}.${k}`]} />
              </Field>
              <SmallBtn danger label="Xóa mục" onClick={() => setG(i, { items: g.items.filter((_, j) => j !== k) })}>
                <Trash2 className="h-4 w-4" aria-hidden />
              </SmallBtn>
            </div>
          ))}
          <AddBtn onClick={() => setG(i, { items: [...g.items, { name: "", years: "" }] })} disabled={g.items.length >= 12}>
            Thêm kỹ năng
          </AddBtn>
        </fieldset>
      ))}
      <AddBtn onClick={() => setGroups([...groups, { id: newId(), title: "", items: [{ name: "", years: "" }] }])} disabled={groups.length >= 6}>
        Thêm nhóm
      </AddBtn>
    </EditPanel>
  );
}

// ═══════════════ 学歴・資格 ═══════════════
export function EducationForm({ initial, onSave, onClose }: { initial: Education; onSave: (v: Education) => void; onClose: () => void }) {
  const [rows, setRows] = useState(initial.entries);
  const [err, setErr] = useState<Errors>({});
  const submit = () => {
    const e: Errors = {};
    rows.forEach((r, i) => {
      if (!r.title.trim() && r.detail.trim()) e[`t${i}`] = "Cần tên trường / chứng chỉ.";
    });
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({ entries: rows.filter((r) => r.title.trim()).map((r) => ({ ...r, title: r.title.trim(), detail: r.detail.trim() })) });
    return true;
  };
  return (
    <EditPanel eyebrow="My Portfolio · Education" title="Sửa 学歴・資格" onClose={onClose} onSubmit={submit}>
      {rows.length === 0 && <p className="text-[14px] text-ink-3">Chưa có mục nào. Thêm trường học, chứng chỉ (JLPT, TOEIC, AWS…).</p>}
      {rows.map((r, i) => (
        <fieldset key={r.id}>
          <legend>Mục {i + 1}</legend>
          <Field label="Trường / chứng chỉ" error={err[`t${i}`]}>
            <Text value={r.title} onChange={(title) => setRows(rows.map((x, j) => (j === i ? { ...x, title } : x)))} invalid={!!err[`t${i}`]} maxLength={80} placeholder="JLPT N2" />
          </Field>
          <Field label="Chi tiết" hint="năm, chuyên ngành, điểm…">
            <Text value={r.detail} onChange={(detail) => setRows(rows.map((x, j) => (j === i ? { ...x, detail } : x)))} maxLength={120} />
          </Field>
          <div className="flex gap-2">
            <SmallBtn label="Lên" onClick={() => setRows(move(rows, i, -1))} disabled={i === 0}>
              <ArrowUp className="h-4 w-4" aria-hidden />
            </SmallBtn>
            <SmallBtn label="Xuống" onClick={() => setRows(move(rows, i, 1))} disabled={i === rows.length - 1}>
              <ArrowDown className="h-4 w-4" aria-hidden />
            </SmallBtn>
            <SmallBtn danger label="Xóa mục" onClick={() => setRows(rows.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" aria-hidden />
            </SmallBtn>
          </div>
        </fieldset>
      ))}
      <AddBtn onClick={() => setRows([...rows, { id: newId(), title: "", detail: "" }])} disabled={rows.length >= 12}>
        Thêm mục
      </AddBtn>
    </EditPanel>
  );
}

// ═══════════════ 業務経歴: mẫu 職務経歴書 cho một dự án ═══════════════
export function ProjectForm({
  initial,
  isNew,
  onSave,
  onClose,
  onDelete,
}: {
  initial: ProjectData;
  isNew: boolean;
  onSave: (v: ProjectData) => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const [v, setV] = useState(initial);
  const [team, setTeam] = useState(initial.teamSize == null ? "" : String(initial.teamSize));
  const [txt, setTxt] = useState({ duties: initial.duties.join("\n"), results: initial.results.join("\n"), learnings: initial.learnings.join("\n") });
  const [err, setErr] = useState<Errors>({});
  const up = (p: Partial<ProjectData>) => setV((x) => ({ ...x, ...p }));
  const current = v.to === null;
  const thisMonth = new Date().toISOString().slice(0, 7);

  const submit = () => {
    const e: Errors = {};
    if (!v.title.trim()) e.title = "Cần nhập 案件名.";
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(v.from)) e.from = "Chọn tháng bắt đầu.";
    else if (v.from > thisMonth) e.from = "Tháng bắt đầu không được ở tương lai.";
    if (!current) {
      if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(v.to ?? "")) e.to = "Chọn tháng kết thúc, hoặc tích 現在.";
      else if (v.from && v.to! < v.from) e.to = "Tháng kết thúc phải sau tháng bắt đầu.";
    }
    const n = Number(team);
    if (team.trim() && (!Number.isInteger(n) || n < 1 || n > 9999)) e.team = "Số nguyên từ 1 đến 9999.";
    if (!lines(txt.duties).length) e.duties = "Cần ít nhất một mục 担当内容.";
    setErr(e);
    if (Object.keys(e).length) return false;
    onSave({
      ...v,
      title: v.title.trim(),
      industry: v.industry.trim(),
      role: v.role.trim(),
      summary: v.summary.trim(),
      teamSize: team.trim() ? n : null,
      duties: lines(txt.duties),
      results: lines(txt.results),
      learnings: lines(txt.learnings),
    });
    return true;
  };

  return (
    <EditPanel
      eyebrow="My Portfolio · 業務経歴"
      title={isNew ? "Thêm dự án mới" : "Sửa dự án"}
      lead="Điền theo mẫu 職務経歴書: thời gian, vai trò, công đoạn, công nghệ và việc đảm nhận."
      onClose={onClose}
      onSubmit={submit}
      submitLabel={isNew ? "Thêm dự án" : "Lưu"}
      onDelete={onDelete}
      deleteLabel="Xóa dự án"
    >
      <fieldset>
        <legend>
          <span className="n">1</span> Thông tin chung
        </legend>
        <Field label="案件名 · Tên dự án" error={err.title}>
          <Text value={v.title} onChange={(title) => up({ title })} invalid={!!err.title} maxLength={200} lang="ja" placeholder="例：ECサイトのフロントエンド刷新" />
        </Field>
        <div className="row3">
          <Field label="期間 · Từ tháng" error={err.from}>
            <Text type="month" value={v.from} onChange={(from) => up({ from })} invalid={!!err.from} />
          </Field>
          <Field label="Đến tháng" error={err.to}>
            {current ? (
              <span className="flex h-12 items-center rounded-xl border border-dashed border-line-strong px-3.5 text-[15px] font-normal text-ink-2">現在 (đang tham gia)</span>
            ) : (
              <Text type="month" value={v.to ?? ""} onChange={(to) => up({ to })} invalid={!!err.to} />
            )}
          </Field>
          <label className="flex items-center gap-2 self-end pb-3 text-[14px] text-ink">
            <input type="checkbox" checked={current} onChange={(e) => up({ to: e.target.checked ? null : "" })} /> 現在 — vẫn đang tham gia
          </label>
        </div>
        <div className="row3">
          <Field label="業界 · Ngành">
            <Text value={v.industry} onChange={(industry) => up({ industry })} maxLength={80} lang="ja" placeholder="EC・小売" />
          </Field>
          <Field label="役割 · Vai trò">
            <Text value={v.role} onChange={(role) => up({ role })} maxLength={60} lang="ja" placeholder="SE / テックリード / BrSE" />
          </Field>
          <Field label="チーム人数 · Số người" error={err.team}>
            <Text type="number" value={team} onChange={setTeam} invalid={!!err.team} placeholder="8" />
          </Field>
        </div>
      </fieldset>

      <div className="cols2">
        <fieldset>
          <legend>
            <span className="n">2</span> 参加工程 · Công đoạn tham gia
          </legend>
          <div className="checks" lang="ja">
            {PHASES.map((p) => (
              <label key={p.key}>
                <input
                  type="checkbox"
                  checked={v.phases.includes(p.key)}
                  onChange={(e) => up({ phases: e.target.checked ? PHASES.map((x) => x.key).filter((k) => k === p.key || v.phases.includes(k)) : v.phases.filter((k) => k !== p.key) })}
                />
                {p.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <span className="n">3</span> 技術要素 · Công nghệ
          </legend>
          {TECH_GROUPS.map((g) => (
            <div key={g.key} className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-ink-2" lang="ja">
                {g.label}
              </span>
              <TagInput label={`技術要素: ${g.label}`} value={v.tech[g.key]} onChange={(t) => up({ tech: { ...v.tech, [g.key]: t } })} />
            </div>
          ))}
        </fieldset>
      </div>

      <fieldset>
        <legend>
          <span className="n">4</span> Nội dung
        </legend>
        <Field label="概要 · Tóm tắt dự án" hint={`${v.summary.length}/1200`}>
          <Area value={v.summary} onChange={(summary) => up({ summary })} rows={4} maxLength={1200} lang="ja" />
        </Field>
        <div className="row3">
          <Field label="担当内容 · Việc đảm nhận" hint="mỗi dòng một mục" error={err.duties}>
            <Area className="tall" value={txt.duties} onChange={(duties) => setTxt({ ...txt, duties })} invalid={!!err.duties} rows={8} maxLength={5000} lang="ja" />
          </Field>
          <Field label="成果 · Kết quả" hint="tùy chọn, nên có số liệu">
            <Area className="tall" value={txt.results} onChange={(results) => setTxt({ ...txt, results })} rows={8} maxLength={3000} lang="ja" />
          </Field>
          <Field label="学んだこと · Bài học" hint="mỗi dòng một mục">
            <Area className="tall" value={txt.learnings} onChange={(learnings) => setTxt({ ...txt, learnings })} rows={8} maxLength={3000} lang="ja" />
          </Field>
        </div>
      </fieldset>
    </EditPanel>
  );
}
