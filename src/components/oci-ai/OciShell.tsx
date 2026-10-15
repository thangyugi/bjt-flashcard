"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  BookA,
  ChevronRight,
  FileCheck2,
  Circle,
  CircleCheck,
  House,
  Menu,
  Monitor,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import type { LessonMeta, ModuleMeta } from "@/data/oci-ai/types";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useHydrated } from "@/hooks/useHydrated";

export const OCI_BASE = "/oracle-oci-ai";
const THEME_KEY = "oci-ai-theme";
type Theme = "system" | "light" | "dark";

/** Script chạy trước khi trình duyệt vẽ trang để áp chủ đề sáng/tối đã lưu (tránh nháy màu). */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.getElementById("oci-root").setAttribute("data-theme",t)}catch(e){}`;

const themeListeners = new Set<() => void>();
function subscribeTheme(cb: () => void) {
  themeListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    themeListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function readTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "light" || t === "dark") return t;
  } catch {}
  return "system";
}

interface Props {
  modules: ModuleMeta[];
  lessons: LessonMeta[];
  children: React.ReactNode;
}

export function OciShell({ modules, lessons, children }: Props) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const done = useOciAiStore((s) => s.done);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "system" as Theme);

  const activeId = pathname.startsWith(`${OCI_BASE}/`) ? pathname.slice(OCI_BASE.length + 1).replace(/^practice\//, "") : "";
  const activeModuleId = lessons.find((l) => l.id === activeId)?.moduleId;

  // Mở sẵn nhóm chứa bài đang học
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    activeModuleId ? { [activeModuleId]: true } : {}
  );
  const [prevModuleId, setPrevModuleId] = useState(activeModuleId);
  if (activeModuleId !== prevModuleId) {
    setPrevModuleId(activeModuleId);
    if (activeModuleId) setExpanded((e) => ({ ...e, [activeModuleId]: true }));
  }

  // Đóng ngăn kéo khi chuyển trang
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Chủ đề sáng / tối
  useLayoutEffect(() => {
    const root = document.getElementById("oci-root");
    if (!root) return;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);
  const cycleTheme = () => {
    const next: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    try {
      if (next === "system") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {}
    themeListeners.forEach((l) => l());
  };
  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const themeLabel = theme === "light" ? "Giao diện sáng" : theme === "dark" ? "Giao diện tối" : "Theo hệ thống";

  // Khóa cuộn trang khi ngăn kéo mở (mobile)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const lessonById = useMemo(() => new Map(lessons.map((l) => [l.id, l])), [lessons]);
  const doneCount = hydrated ? lessons.filter((l) => done[l.id]).length : 0;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? modules
        .map((m) => ({
          m,
          ids: m.lessonIds.filter((id) => {
            const l = lessonById.get(id)!;
            return `${l.code} ${l.navTitle} ${l.title} ${m.title}`.toLowerCase().includes(q);
          }),
        }))
        .filter((x) => x.ids.length)
    : modules.map((m) => ({ m, ids: m.lessonIds }));

  return (
    <>
      <header className="oci-top">
        <button className="oci-icon-btn oci-menu-btn" aria-label="Mở danh sách bài học" onClick={() => setOpen(true)}>
          <Menu aria-hidden />
        </button>
        <Link href={OCI_BASE} className="oci-brand" aria-label="Trang chủ khóa OCI AI Foundations">
          <span className="oci-brand-mark" aria-hidden>
            OCI
          </span>
          <span className="oci-brand-text">
            <span className="oci-brand-t1">OCI AI Foundations</span>
            <span className="oci-brand-t2">Oracle Cloud Infrastructure · Ghi chú Anh–Việt</span>
          </span>
        </Link>
        <div className="oci-top-spacer" />
        <div className="oci-top-progress" title={`Đã học ${doneCount}/${lessons.length} bài`}>
          <div className="oci-bar bar">
            <i style={{ width: `${pct}%` }} />
          </div>
          <span className="lbl">
            <b>{doneCount}</b>/{lessons.length}
            <span className="lbl-long"> bài</span>
          </span>
        </div>
        <Link href="/courses" className="oci-icon-btn" aria-label="Về danh sách khóa học" title="Về danh sách khóa học">
          <House aria-hidden />
        </Link>
        <button className="oci-icon-btn" onClick={cycleTheme} aria-label={`Đổi giao diện (hiện tại: ${themeLabel})`} title={themeLabel}>
          <ThemeIcon aria-hidden />
        </button>
      </header>

      <div className="oci-shell">
        <div className={`oci-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden />
        <aside className={`oci-side${open ? " open" : ""}`} aria-label="Danh sách bài học">
          <div className="oci-side-head">
            <label className="oci-side-search">
              <Search aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm bài học…"
                aria-label="Tìm bài học"
              />
            </label>
            <button className="oci-icon-btn" aria-label="Đóng danh sách bài học" onClick={() => setOpen(false)}>
              <X aria-hidden />
            </button>
          </div>

          <nav className="oci-side-scroll">
            {!q && (
              <>
                <Link href={OCI_BASE} className={`oci-side-link${pathname === OCI_BASE ? " active" : ""}`}>
                  <House aria-hidden /> Trang chủ khóa học
                </Link>
                <Link
                  href={`${OCI_BASE}/glossary`}
                  className={`oci-side-link${pathname === `${OCI_BASE}/glossary` ? " active" : ""}`}
                >
                  <BookA aria-hidden /> Từ điển thuật ngữ
                </Link>
                <Link
                  href={`${OCI_BASE}/practice`}
                  className={`oci-side-link${pathname.startsWith(`${OCI_BASE}/practice`) || pathname.startsWith(`${OCI_BASE}/exam`) ? " active" : ""}`}
                >
                  <FileCheck2 aria-hidden /> Luyện tập &amp; thi thử
                </Link>
                <div className="oci-side-sep" />
              </>
            )}

            {filtered.map(({ m, ids }) => {
              const doneIn = hydrated ? m.lessonIds.filter((id) => done[id]).length : 0;
              const isOpen = !!expanded[m.id];
              const cls = [
                "oci-group",
                isOpen && "open",
                q && "force-open",
                m.id === activeModuleId && "current",
                doneIn === m.lessonIds.length && "complete",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <div key={m.id} className={cls}>
                  <button
                    className="oci-group-btn"
                    aria-expanded={isOpen || !!q}
                    onClick={() => setExpanded((e) => ({ ...e, [m.id]: !e[m.id] }))}
                  >
                    <span className="oci-group-num">{m.num}</span>
                    <span className="oci-group-label">
                      <span className="t">{m.title}</span>
                      <span className="s">
                        {doneIn}/{m.lessonIds.length} bài · Module {m.origModule} khóa gốc
                      </span>
                    </span>
                    <ChevronRight className="oci-group-chev" aria-hidden />
                  </button>
                  <ul className="oci-lesson-list">
                    {ids.map((id) => {
                      const l = lessonById.get(id)!;
                      const isDone = hydrated && !!done[id];
                      const isActive = id === activeId;
                      return (
                        <li key={id}>
                          <Link
                            href={`${OCI_BASE}/${id}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`oci-lesson-link${isActive ? " active" : ""}${isDone ? " done" : ""}`}
                          >
                            <span className="code">{l.code}</span>
                            <span className="ttl">{l.navTitle}</span>
                            {isDone ? (
                              <CircleCheck className="st" aria-label="Đã học" />
                            ) : (
                              <Circle className="st" aria-hidden strokeWidth={1.6} />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            {q && !filtered.length && <p className="oci-side-empty">Không có bài nào khớp “{query}”.</p>}
          </nav>

          <div className="oci-side-foot">
            <Link href="/" className="oci-side-link">
              <ArrowLeft aria-hidden /> Về BJT Flashcard
            </Link>
          </div>
        </aside>

        <div className="oci-main" id="oci-content">{children}</div>
      </div>
    </>
  );
}
