"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Jp } from "./Jp";

export interface LibraryEntry {
  source: string;
  sourceName: string;
  lessonId: string;
  lessonNum: number;
  anchor: string;
  no: number;
  /** Mặt chữ có furigana */
  head: string;
  plain: string;
  r: string;
  m: string;
  hv?: string;
  pos: string;
}

/** Số từ mỗi trang: chia hết cho 2, 3, 4, 5, 6 cột → hàng cuối luôn đủ ô trên mọi bề ngang */
export const LIBRARY_PAGE_SIZE = 120;

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

interface Props {
  entries: LibraryEntry[];
  sources: { id: string; name: string }[];
}

/** Dãy số trang gọn: 1 … 4 5 [6] 7 8 … 20 */
function pageList(cur: number, total: number): (number | "…")[] {
  const out: (number | "…")[] = [];
  const add = (n: number | "…") => out[out.length - 1] !== n && out.push(n);
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - cur) <= 2) add(p);
    else add("…");
  }
  return out;
}

function Pager({ page, total, href, onGo }: { page: number; total: number; href: (p: number) => string; onGo: (p: number) => void }) {
  if (total <= 1) return null;
  const cell =
    "inline-flex h-10 min-w-10 items-center justify-center gap-1.5 border border-line-strong px-3 text-[14px] font-semibold tabular-nums -ml-px first:ml-0 transition-colors";
  const go = (p: number) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onGo(p);
  };
  return (
    <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[13px] text-ink-3 tabular-nums">
        Trang {page}/{total}
      </p>
      <div className="flex flex-wrap items-center">
        {page > 1 ? (
          <Link href={href(page - 1)} onClick={go(page - 1)} className={cn(cell, "text-ink hover:bg-surface")} rel="prev">
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span className="max-sm:sr-only">Trước</span>
          </Link>
        ) : (
          <span className={cn(cell, "text-ink-3/50")} aria-disabled>
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span className="max-sm:sr-only">Trước</span>
          </span>
        )}
        {pageList(page, total).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className={cn(cell, "text-ink-3 max-sm:hidden")} aria-hidden>
              …
            </span>
          ) : (
            <Link
              key={p}
              href={href(p)}
              onClick={go(p)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Trang ${p}`}
              className={cn(
                cell,
                p === page ? "relative z-[1] border-ink bg-ink text-paper" : "text-ink-2 hover:bg-surface",
                p !== page && p !== 1 && p !== total && Math.abs(p - page) > 1 && "max-sm:hidden"
              )}
            >
              {p}
            </Link>
          )
        )}
        {page < total ? (
          <Link href={href(page + 1)} onClick={go(page + 1)} className={cn(cell, "text-ink hover:bg-surface")} rel="next">
            <span className="max-sm:sr-only">Sau</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : (
          <span className={cn(cell, "text-ink-3/50")} aria-disabled>
            <span className="max-sm:sr-only">Sau</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </span>
        )}
      </div>
    </nav>
  );
}

/**
 * Tra cứu toàn bộ thư viện từ vựng (theo kanji, cách đọc, nghĩa hoặc âm Hán Việt), chia trang.
 * Trang, từ khóa và nguồn nằm trên URL (?page=3&q=…&src=…) nên có thể chia sẻ liên kết.
 */
function LibraryView({ entries, sources, params }: Props & { params: URLSearchParams | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const top = useRef<HTMLDivElement>(null);
  const urlQ = params?.get("q") ?? "";
  const src = params?.get("src") ?? "all";
  const [q, setQ] = useState(urlQ);
  // đồng bộ ô tìm khi URL đổi từ bên ngoài (back/forward)
  const [seenQ, setSeenQ] = useState(urlQ);
  if (urlQ !== seenQ) {
    setSeenQ(urlQ);
    setQ(urlQ);
  }

  const list = useMemo(() => {
    const k = norm(urlQ.trim());
    return entries.filter((e) => (src === "all" || e.source === src) && (!k || [e.plain, e.r, e.m, e.hv ?? ""].some((f) => norm(f).includes(k))));
  }, [entries, urlQ, src]);

  const total = Math.max(1, Math.ceil(list.length / LIBRARY_PAGE_SIZE));
  const page = Math.min(total, Math.max(1, Number.parseInt(params?.get("page") ?? "1", 10) || 1));
  const start = (page - 1) * LIBRARY_PAGE_SIZE;
  const shown = list.slice(start, start + LIBRARY_PAGE_SIZE);

  const build = (next: { page?: number; q?: string; src?: string }) => {
    const sp = new URLSearchParams(params?.toString() ?? "");
    const set = (k: string, v: string | undefined, def: string) => (v === undefined ? null : v && v !== def ? sp.set(k, v) : sp.delete(k));
    set("q", next.q, "");
    set("src", next.src, "all");
    if (next.page !== undefined) set("page", String(next.page), "1");
    const s = sp.toString();
    return s ? `${pathname}?${s}` : pathname;
  };

  // gõ tìm: cập nhật URL sau một nhịp ngắn, về trang 1
  useEffect(() => {
    if (q === urlQ) return;
    const t = setTimeout(() => router.replace(build({ q: q.trim() ? q : "", page: 1 }), { scroll: false }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const goPage = (p: number) => {
    router.push(build({ page: p }), { scroll: false });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={top} className="flex scroll-mt-[calc(var(--header-h)+16px)] flex-col gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex h-11 flex-1 items-center gap-2.5 border border-line-strong bg-surface px-3.5 text-ink-3 focus-within:border-ink-3 md:max-w-[560px]">
          <Search className="h-[17px] w-[17px] shrink-0" aria-hidden />
          <span className="sr-only">Tra từ</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Kanji, hiragana, nghĩa hoặc Hán Việt…"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          />
        </label>
        {sources.length > 1 && (
          <div role="group" aria-label="Nguồn" className="flex">
            {[{ id: "all", name: "Tất cả" }, ...sources].map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={src === s.id}
                onClick={() => router.replace(build({ src: s.id, page: 1 }), { scroll: false })}
                className={cn(
                  "-ml-px h-11 border border-line-strong px-3.5 text-[13px] first:ml-0",
                  src === s.id ? "relative z-[1] border-ink bg-ink font-bold text-paper" : "font-medium text-ink-2 hover:bg-surface"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
        <p className="text-[13px] text-ink-3 tabular-nums md:ml-auto" aria-live="polite">
          {list.length.toLocaleString("vi-VN")} từ
          {list.length > 0 && (
            <>
              {" "}
              · hiện {start + 1}–{start + shown.length}
            </>
          )}
        </p>
      </div>

      <Pager page={page} total={total} href={(p) => build({ page: p })} onGo={goPage} />

      {shown.length ? (
        <ul className="cells grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[106.25rem]:grid-cols-5">
          {shown.map((e) => (
            <li key={e.anchor}>
              <Link href={`/jlpt-n1/vocab/${e.lessonId}#${e.anchor}`} className="flex h-full items-start gap-3 px-4 py-3 transition-colors hover:bg-surface">
                <span className="w-9 shrink-0 pt-1.5 text-[12px] font-bold text-ink-3 tabular-nums">{e.no}</span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[19px] leading-[1.9] font-bold text-ink">
                    <Jp t={e.head} />
                  </span>
                  <span className="line-clamp-2 text-[14px] text-ink">{e.m}</span>
                  <span className="truncate text-[12px] text-ink-3">
                    {e.hv ? `${e.hv} · ` : ""}
                    {e.pos} · Bài {e.lessonNum}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="panel px-5 py-8 text-center text-[14px] text-ink-3">Không có từ nào khớp. Thử bỏ dấu hoặc gõ ít chữ hơn.</p>
      )}

      <Pager page={page} total={total} href={(p) => build({ page: p })} onGo={goPage} />
    </div>
  );
}

function WithParams(props: Props) {
  const params = useSearchParams();
  return <LibraryView {...props} params={new URLSearchParams(params.toString())} />;
}

export function VocabLibrary(props: Props) {
  return (
    <Suspense fallback={<LibraryView {...props} params={null} />}>
      <WithParams {...props} />
    </Suspense>
  );
}
