"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check, Pencil, RotateCw, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { usePortfolioStore, type SampleScope, type SyncState } from "@/lib/portfolio/store";
import type { PortfolioDoc } from "@/lib/portfolio/types";
import { Breadcrumbs, btn } from "@/components/ui/page";
import { cn } from "@/lib/utils";
import "./portfolio.css";

/*
 * Khung chung của các trang con Portfolio (Introduce · Interview Q&A · My Portfolio):
 * tải portfolio của tài khoản, thanh công cụ dính (đường dẫn quay về /portfolio, mục lục, trạng thái lưu, nút Chỉnh sửa),
 * thanh "đang chỉnh sửa" và thông báo lỗi lưu. Cùng bề ngang .page-x với mọi trang khác của app.
 */

const SYNC_TEXT: Record<SyncState, string> = {
  idle: "",
  loading: "Đang tải…",
  saving: "Đang lưu…",
  saved: "Đã lưu lên máy chủ",
  local: "Chưa lưu lên máy chủ",
  error: "Lưu thất bại",
};

export interface Anchor {
  href: string;
  label: string;
}

export function PfFrame({
  title,
  anchors,
  editing,
  setEditing,
  editHint,
  editActions,
  children,
}: {
  /** Tên trang con trên đường dẫn (Portfolio › title) */
  title: string;
  anchors?: Anchor[];
  editing: boolean;
  setEditing: (v: boolean) => void;
  /** Câu hướng dẫn trên thanh chỉnh sửa */
  editHint: string;
  /** Nút trên thanh chỉnh sửa (vd. "Thêm câu hỏi"), đặt trước nút "Xong" */
  editActions?: ReactNode;
  children: (doc: PortfolioDoc) => ReactNode;
}) {
  const hydrated = useHydrated();
  const { user } = useAuth();
  const doc = usePortfolioStore((s) => s.doc);
  const owner = usePortfolioStore((s) => s.userId);
  const sync = usePortfolioStore((s) => s.sync);
  const error = usePortfolioStore((s) => s.error);
  const load = usePortfolioStore((s) => s.load);
  const flush = usePortfolioStore((s) => s.flush);

  const uid = user?.id;
  useEffect(() => {
    if (hydrated && uid) void load(uid);
  }, [hydrated, uid, load]);
  // Có mạng lại → gửi thay đổi còn chờ
  useEffect(() => {
    const on = () => void flush();
    window.addEventListener("online", on);
    return () => window.removeEventListener("online", on);
  }, [flush]);

  // Offline (chưa có phiên Supabase): chỉ dùng bản lưu trên máy nếu đúng của tài khoản này (hoặc chưa biết tài khoản)
  const view = hydrated && doc && (!uid || owner === uid) ? doc : null;
  const crumbs = [{ label: "Portfolio", href: "/portfolio" }, { label: title }];

  if (!view) {
    if (hydrated && (sync === "error" || (!uid && sync !== "loading"))) {
      return (
        <div className="page-x flex flex-col gap-6 pt-6 pb-16 sm:pt-8">
          <Breadcrumbs items={crumbs} />
          <div className="panel flex max-w-[640px] flex-col gap-4 bg-surface p-6">
            <p className="eyebrow-label">Portfolio</p>
            <h1 className="hx-title text-[clamp(26px,3vw,36px)]">Chưa tải được portfolio</h1>
            <p className="text-[15px] leading-relaxed text-ink-2">{error ?? "Không kết nối được máy chủ và máy này chưa lưu bản nào. Kiểm tra mạng rồi thử lại."}</p>
            <button type="button" className={cn(btn.primary, "self-start")} onClick={() => uid && void load(uid)} disabled={!uid}>
              <RotateCw className="h-4 w-4" aria-hidden /> Thử lại
            </button>
          </div>
        </div>
      );
    }
    return (
      <div role="status" aria-busy="true" className="page-x flex flex-col gap-6 pt-8 pb-12">
        <span className="sr-only">Đang tải portfolio…</span>
        <div className="skeleton h-4 w-48" />
        <div className="skeleton h-24 w-[min(620px,90%)]" />
        <div className="skeleton h-4 w-[min(560px,80%)]" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-40" />
          ))}
        </div>
      </div>
    );
  }

  const dot = sync === "saved" ? "bg-ok" : sync === "error" ? "bg-brand" : sync === "local" ? "bg-[#c2780b]" : "bg-ink-3 animate-pulse";

  return (
    <div className="pf">
      <div className="sticky top-[var(--header-h)] z-40 border-b border-line-strong bg-surface/95 backdrop-blur-sm">
        <div className="page-x flex min-h-[56px] flex-wrap items-center gap-x-6 gap-y-2 py-2">
          <Breadcrumbs items={crumbs} className="min-w-0" />
          {anchors && anchors.length > 0 && (
            <nav aria-label="Mục lục" className="hidden items-center gap-5 text-[13.5px] font-medium text-ink-2 lg:flex" lang="ja">
              {anchors.map((a) => (
                <a key={a.href} href={a.href} className="hover:text-ink">
                  {a.label}
                </a>
              ))}
            </nav>
          )}
          <div className="ml-auto flex items-center gap-3">
            {sync !== "idle" && (
              <span className="flex items-center gap-2 text-[12.5px] text-ink-3" role="status" aria-live="polite" title={sync === "local" ? "Thay đổi đang nằm trên máy này; sẽ gửi lên khi có mạng." : undefined}>
                <span className={cn("h-2 w-2 shrink-0 rounded-full", dot)} aria-hidden />
                <span className="hidden sm:inline">{SYNC_TEXT[sync]}</span>
                {(sync === "local" || sync === "error") && (
                  <button type="button" onClick={() => void flush()} className="font-semibold text-ink underline decoration-line-strong underline-offset-4">
                    <span className="sm:hidden">{SYNC_TEXT[sync]} · </span>Gửi lại
                  </button>
                )}
              </span>
            )}
            {!editing && (
              <button type="button" onClick={() => setEditing(true)} className="tbtn dark">
                <Pencil aria-hidden /> Chỉnh sửa
              </button>
            )}
          </div>
        </div>
        {editing && (
          <div className="editbar">
            <div className="page-x flex flex-wrap items-center gap-x-5 gap-y-2 py-2.5">
              <span className="flex min-w-0 items-center gap-2.5 text-[14px] font-semibold">
                <span className="dot" aria-hidden />
                {editHint}
              </span>
              <span className="ml-auto flex flex-wrap gap-2">
                {editActions}
                <button type="button" onClick={() => setEditing(false)} className="tbtn on-dark">
                  <Check aria-hidden /> Xong
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="page-x pb-16">{children(view)}</div>
      {sync === "error" && error && (
        <div
          role="alert"
          className="fixed inset-x-4 bottom-[calc(var(--tabbar-h)+12px)] z-[55] mx-auto flex max-w-[520px] flex-wrap items-center gap-3 border border-brand-muted bg-paper px-4 py-3 text-[14px] text-ink shadow-[0_12px_32px_rgba(28,25,23,0.14)] md:bottom-6"
        >
          <span className="min-w-0 flex-1">
            <b className="text-brand">Chưa lưu được lên máy chủ.</b> {error} Thay đổi vẫn còn trên máy này.
          </span>
          <button type="button" onClick={() => void flush()} className="tbtn">
            <RotateCw aria-hidden /> Thử lại
          </button>
        </div>
      )}
    </div>
  );
}

/** Nhãn "Mẫu" */
export function SampleBadge() {
  return <span className="badge-sample">Mẫu</span>;
}

/** Thông báo nội dung mẫu + "Bắt đầu từ trang trống" (chỉ xóa phần mẫu của trang này) */
export function SampleNotice({ scope, children }: { scope: SampleScope; children: ReactNode }) {
  const clearSample = usePortfolioStore((s) => s.clearSample);
  const [ask, setAsk] = useState(false);
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-dashed border-line-strong bg-paper px-4 py-3 text-[14px] leading-relaxed text-ink-2">
      <SampleBadge />
      {ask ? (
        <>
          <span className="min-w-0 flex-[1_1_260px]">Xóa mọi phần còn nhãn «Mẫu» của trang này? Những phần bạn đã sửa được giữ nguyên.</span>
          <span className="flex gap-2">
            <button type="button" onClick={() => clearSample(scope)} className="tbtn brand">
              Xóa dữ liệu mẫu
            </button>
            <button type="button" onClick={() => setAsk(false)} className="tbtn">
              Hủy
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="min-w-0 flex-[1_1_260px]">{children}</span>
          <button type="button" onClick={() => setAsk(true)} className="tbtn">
            <Trash2 aria-hidden /> Bắt đầu từ trang trống
          </button>
        </>
      )}
    </div>
  );
}

/** Công tắc ẩn / hiện bản dịch tiếng Việt (nhớ lựa chọn trên máy) */
export function useShowVi(): [boolean, (v: boolean) => void] {
  const [on, setOn] = useState(true);
  useEffect(() => {
    try {
      // Đọc lựa chọn đã lưu sau khi gắn (localStorage chỉ có ở trình duyệt)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem("leoedu-pf-vi") === "0") setOn(false);
    } catch {
      /* chế độ riêng tư: dùng mặc định */
    }
  }, []);
  const set = (v: boolean) => {
    setOn(v);
    try {
      localStorage.setItem("leoedu-pf-vi", v ? "1" : "0");
    } catch {
      /* bỏ qua */
    }
  };
  return [on, set];
}

export function ViSwitch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="switch">
      <span className="track" aria-hidden />
      Bản dịch tiếng Việt
    </button>
  );
}

/** Đầu trang con: nhãn nhỏ, tiêu đề lớn (tiếng Nhật), lời dẫn; điều khiển ở mép phải */
export function PfHead({ eyebrow, title, lead, sample, controls }: { eyebrow: string; title: string; lead?: ReactNode; sample?: boolean; controls?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5 border-b border-line-strong pt-8 pb-7 sm:pt-10">
      <div className="flex min-w-0 flex-col gap-3">
        <p className="eyebrow-label flex flex-wrap items-center gap-2">
          {eyebrow} {sample && <SampleBadge />}
        </p>
        <h1 className="font-jp text-[clamp(36px,5vw,72px)] leading-none font-bold tracking-[-0.03em] text-ink" lang="ja">
          {title}
        </h1>
        {lead && <p className="max-w-[64ch] text-[15.5px] leading-relaxed text-ink-2">{lead}</p>}
      </div>
      {controls && <div className="flex flex-wrap items-center gap-3">{controls}</div>}
    </header>
  );
}
