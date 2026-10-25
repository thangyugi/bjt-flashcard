"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpenCheck, Library, ChevronRight, Circle, CircleCheck, FileCheck2, House, ListChecks, Menu, Search, X } from "lucide-react";
import type { DomainMeta, LessonMeta } from "@/data/ccar-p/types";
import { CCAR_BASE, CCAR_SHORT, REFERENCE_PATH } from "@/data/ccar-p/meta";
import { useCcarStore } from "@/store/ccar-p-store";
import { useHydrated } from "@/hooks/useHydrated";

interface Props {
  domains: DomainMeta[];
  lessons: LessonMeta[];
  children: React.ReactNode;
}

/** Khung khóa CCAR-P: ngăn bài học theo 7 domain (dùng chung giao diện .oci-* của khóa OCI, đổi màu nhấn). */
export function CcarShell({ domains, lessons, children }: Props) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const done = useCcarStore((s) => s.done);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const tail = pathname.startsWith(`${CCAR_BASE}/`) ? pathname.slice(CCAR_BASE.length + 1) : "";
  const activeId = tail.replace(/^practice\/task-/, "");
  const activeDomain = lessons.find((l) => l.id === activeId)?.domain;

  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => (activeDomain ? { [activeDomain]: true } : {}));
  const [prevDomain, setPrevDomain] = useState(activeDomain);
  if (activeDomain !== prevDomain) {
    setPrevDomain(activeDomain);
    if (activeDomain) setExpanded((e) => ({ ...e, [activeDomain]: true }));
  }

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

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
    ? domains
        .map((d) => ({
          d,
          ids: d.lessonIds.filter((id) => {
            const l = lessonById.get(id)!;
            return `${l.code} ${l.title} ${d.title}`.toLowerCase().includes(q);
          }),
        }))
        .filter((x) => x.ids.length)
    : domains.map((d) => ({ d, ids: d.lessonIds }));

  const link = (href: string, active: boolean, icon: React.ReactNode, label: string) => (
    <Link href={href} className={`oci-side-link${active ? " active" : ""}`}>
      {icon} {label}
    </Link>
  );

  return (
    <>
      <div className="oci-subbar">
        <button className="oci-subbar-btn" aria-label="Mở danh sách bài học" aria-expanded={open} onClick={() => setOpen(true)}>
          <Menu aria-hidden />
          <span>Bài học</span>
        </button>
        <Link href={CCAR_BASE} className="oci-subbar-title">
          Claude Architect · {CCAR_SHORT}
        </Link>
        <span className="oci-subbar-prog" title={`Đã học ${doneCount}/${lessons.length} bài`}>
          <b>{doneCount}</b>/{lessons.length}
        </span>
      </div>

      <div className="oci-shell">
        <div className={`oci-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden />
        <aside className={`oci-side${open ? " open" : ""}`} aria-label="Danh sách bài học">
          <div className="oci-side-course">
            <Link href="/courses" className="oci-side-back">
              <ArrowLeft aria-hidden /> Tất cả khóa học
            </Link>
            <span className="oci-side-eyebrow">Khóa học · {CCAR_SHORT}</span>
            <Link href={CCAR_BASE} className="oci-side-title">
              Claude Certified Architect – Professional
            </Link>
            <div className="oci-side-prog" title={`Đã học ${doneCount}/${lessons.length} bài`}>
              <div className="oci-bar">
                <i style={{ width: `${pct}%` }} />
              </div>
              <span>
                <b>{doneCount}</b>/{lessons.length} bài
              </span>
            </div>
          </div>
          <div className="oci-side-head">
            <label className="oci-side-search">
              <Search aria-hidden />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm task statement…" aria-label="Tìm bài học" />
            </label>
            <button className="oci-icon-btn" aria-label="Đóng danh sách bài học" onClick={() => setOpen(false)}>
              <X aria-hidden />
            </button>
          </div>

          <nav className="oci-side-scroll">
            {!q && (
              <>
                {link(CCAR_BASE, pathname === CCAR_BASE, <House aria-hidden />, "Trang chủ khóa học")}
                {link(`${CCAR_BASE}/on-thi`, pathname === `${CCAR_BASE}/on-thi`, <BookOpenCheck aria-hidden />, "Lộ trình ôn & quy chế thi")}
                {link(REFERENCE_PATH, pathname === REFERENCE_PATH, <Library aria-hidden />, "Kiến thức nền về Claude")}
                {link(
                  `${CCAR_BASE}/practice`,
                  pathname.startsWith(`${CCAR_BASE}/practice`) || pathname.startsWith(`${CCAR_BASE}/exam`),
                  <FileCheck2 aria-hidden />,
                  "Luyện tập & thi thử"
                )}
                {link("/quiz/ccar-p", false, <ListChecks aria-hidden />, "Trắc nghiệm CCAR-P")}
                <div className="oci-side-sep" />
              </>
            )}

            {filtered.map(({ d, ids }) => {
              const doneIn = hydrated ? d.lessonIds.filter((id) => done[id]).length : 0;
              const isOpen = !!expanded[d.num];
              const cls = ["oci-group", isOpen && "open", q && "force-open", d.num === activeDomain && "current", doneIn === d.lessonIds.length && "complete"]
                .filter(Boolean)
                .join(" ");
              return (
                <div key={d.num} className={cls}>
                  <button className="oci-group-btn" aria-expanded={isOpen || !!q} onClick={() => setExpanded((e) => ({ ...e, [d.num]: !e[d.num] }))}>
                    <span className="oci-group-num">{d.num}</span>
                    <span className="oci-group-label">
                      <span className="t">{d.title}</span>
                      <span className="s">
                        {doneIn}/{d.lessonIds.length} bài · {d.weight}% đề thi
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
                            href={`${CCAR_BASE}/${id}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`oci-lesson-link${isActive ? " active" : ""}${isDone ? " done" : ""}`}
                          >
                            <span className="code">{l.code}</span>
                            <span className="ttl">{l.title}</span>
                            {isDone ? <CircleCheck className="st" aria-label="Đã học" /> : <Circle className="st" aria-hidden strokeWidth={1.6} />}
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
        </aside>

        <div className="oci-main" id="oci-content">
          {children}
        </div>
      </div>
    </>
  );
}
