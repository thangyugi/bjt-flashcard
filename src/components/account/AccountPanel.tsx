"use client";

import Link from "next/link";
import { Page, PageHeader } from "@/components/ui/page";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CloudOff, Download, LogOut, RefreshCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTtsStore } from "@/store/tts-store";
import { computeStreak, longestStreak, useActivityStore } from "@/store/activity-store";
import { useLandStore } from "@/store/land-store";
import { crystalBalance } from "@/lib/land/economy";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useHydrated } from "@/hooks/useHydrated";
import { useOutbox } from "@/lib/learning/events";
import { getSyncStatus, signOutAndClear, subscribeSync, syncNow } from "@/lib/learning/sync";
import { AuthShell, Field, GhostButton, Notice, NotConfigured, PrimaryButton } from "./AuthUi";

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }) : "chưa");

export function AccountPanel() {
  const hydrated = useHydrated();
  const { enabled, ready, user } = useAuth();
  const router = useRouter();
  const status = useSyncExternalStore(subscribeSync, getSyncStatus, () => "idle" as const);
  const pending = useOutbox((s) => s.events.length);
  const lastSyncAt = useOutbox((s) => s.lastSyncAt);
  const lastError = useOutbox((s) => s.lastError);
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const signedIn = !!user;
  // Trang chỉ hiện sau khi biết phiên đăng nhập → tự cuộn tới mục trong #hash (vd. /account#thiet-lap từ menu tài khoản)
  useEffect(() => {
    if (!signedIn || !window.location.hash) return;
    document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ block: "start" });
  }, [signedIn]);

  if (!hydrated) return null;
  if (!enabled) return <NotConfigured />;
  if (ready && !user)
    return (
      <AuthShell title="Tài khoản" sub="Đăng nhập để lưu tiến độ lên máy chủ và học tiếp trên mọi thiết bị.">
        <Link href="/login" className="flex h-11 items-center justify-center rounded-xl bg-brand font-bold text-white">
          Đăng nhập
        </Link>
        <Link href="/register" className="text-center text-[14px] font-semibold text-brand hover:underline">
          Tạo tài khoản mới
        </Link>
      </AuthShell>
    );
  if (!user) return null;

  const sb = supabase()!;
  const exportData = async () => {
    setBusy("export");
    const { data, error } = await sb.rpc("export_my_data");
    setBusy(null);
    if (error) return setErr(error.message);
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `du-lieu-hoc-tap-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    URL.revokeObjectURL(url);
  };
  const deleteAccount = async () => {
    setBusy("delete");
    const { error } = await sb.rpc("delete_my_account");
    if (error) {
      setBusy(null);
      return setErr(error.message);
    }
    await sb.auth.signOut();
    useOutbox.setState((s) => ({ imported: s.imported.filter((id) => id !== user.id) }));
    router.replace("/");
  };

  const name = ((user.user_metadata?.display_name as string | undefined) ?? "").trim();
  const display = name || user.email?.split("@")[0] || "Bạn";
  const signOut = async () => {
    setBusy("signout");
    await signOutAndClear();
    router.replace("/");
  };

  return (
    <Page>
      <PageHeader
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Tài khoản" }]}
        eyebrow="Tài khoản"
        title={display}
        lead={user.email}
        size="md"
        aside={<AccountStats />}
      />

      <div className="cells grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Cell title="Hồ sơ" note="Tên hiển thị dùng trên thanh tiêu đề và trong menu tài khoản.">
          <ProfileForm key={user.id} initial={name} onError={setErr} />
        </Cell>

        <Cell id="thiet-lap" title="Thiết lập" note="Lưu trên máy này và đồng bộ theo tài khoản.">
          <Settings />
        </Cell>

        <Cell title="Đồng bộ tiến độ" note="Bạn vẫn học được khi mất mạng; hoạt động được lưu trên máy và tự gửi lên khi có kết nối.">
          <div className="flex items-center gap-2.5 text-[14px] text-ink-2">
            {status === "offline" ? <CloudOff className="h-4 w-4 shrink-0" aria-hidden /> : <RefreshCw className={`h-4 w-4 shrink-0 ${status === "syncing" ? "animate-spin" : ""}`} aria-hidden />}
            <span>
              {status === "syncing" ? "Đang đồng bộ…" : status === "offline" ? "Đang offline — sẽ đồng bộ khi có mạng" : `Lần cuối: ${fmt(lastSyncAt)}`}
              {pending > 0 && ` · ${pending} hoạt động chờ gửi`}
            </span>
          </div>
          {status === "error" && lastError && <Notice tone="error">Lỗi đồng bộ: {lastError}</Notice>}
          <CellActions>
            <GhostButton className="h-10" disabled={status === "syncing"} onClick={() => void syncNow()}>
              <RefreshCw className="h-4 w-4" aria-hidden /> Đồng bộ ngay
            </GhostButton>
            <Link href="/progress" className={linkCls}>
              Xem tiến độ
            </Link>
          </CellActions>
        </Cell>

        <Cell title="Dữ liệu của bạn" note="Bạn có quyền tải về hoặc xóa toàn bộ dữ liệu cá nhân bất cứ lúc nào (Nghị định 13/2023/NĐ-CP).">
          <p className="text-[14px] leading-relaxed text-ink-2">Tệp JSON gồm hồ sơ, thiết lập, tiến độ, thẻ ôn và lịch sử học trên máy chủ.</p>
          <CellActions>
            <GhostButton className="h-10" onClick={exportData} disabled={busy === "export"}>
              <Download className="h-4 w-4" aria-hidden /> {busy === "export" ? "Đang chuẩn bị…" : "Tải dữ liệu (JSON)"}
            </GhostButton>
            <Link href="/privacy" className={linkCls}>
              Chính sách quyền riêng tư
            </Link>
          </CellActions>
        </Cell>

        <Cell title="Phiên đăng nhập" note="Đăng xuất sẽ lưu nốt tiến độ lên máy chủ rồi xóa khỏi trình duyệt này.">
          <p className="text-[14px] leading-relaxed text-ink-2">
            Đang đăng nhập trên trình duyệt này bằng <b className="text-ink">{user.email}</b>.
          </p>
          <CellActions>
            <GhostButton className="h-10" disabled={busy === "signout"} onClick={signOut}>
              <LogOut className="h-4 w-4" aria-hidden /> {busy === "signout" ? "Đang lưu tiến độ…" : "Đăng xuất"}
            </GhostButton>
            <Link href="/reset-password" className={linkCls}>
              Đổi mật khẩu
            </Link>
          </CellActions>
        </Cell>

        <Cell title="Xóa tài khoản" danger note="Tiến độ lưu trên trình duyệt này vẫn giữ lại.">
          <p className="text-[14px] leading-relaxed text-ink-2">
            Xóa vĩnh viễn tài khoản và mọi dữ liệu học trên máy chủ (tiến độ, thẻ ôn, lịch sử, thống kê). Không thể hoàn tác.
          </p>
          <Field label='Gõ "XÓA" để xác nhận' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button
            type="button"
            disabled={confirm.trim().toUpperCase() !== "XÓA" || busy === "delete"}
            onClick={deleteAccount}
            className="flex h-10 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-bold text-white disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" aria-hidden /> {busy === "delete" ? "Đang xóa…" : "Xóa vĩnh viễn"}
          </button>
        </Cell>
      </div>
      {err && <Notice tone="error">{err}</Notice>}
    </Page>
  );
}

const linkCls = "inline-flex min-h-10 items-center text-[13.5px] font-semibold text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink-3";

/** Một ô của lưới tài khoản: tiêu đề in hoa trên vạch mảnh, nội dung, ghi chú xám ở chân ô (các ô cao bằng nhau) */
function Cell({ id, title, note, danger, children }: { id?: string; title: string; note?: string; danger?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-h` : undefined} className="flex scroll-mt-[calc(var(--header-h)+16px)] flex-col gap-4 px-5 py-6 sm:px-6">
      <h2 id={id ? `${id}-h` : undefined} className={cn("hx-title text-[20px]", danger && "text-brand-soft-ink")}>
        {title}
      </h2>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
      {note && <p className="border-t border-line pt-3 text-[12.5px] leading-relaxed text-ink-3">{note}</p>}
    </section>
  );
}

function CellActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">{children}</div>;
}

/** Số liệu nhanh ở cột phải đầu trang */
function AccountStats() {
  const days = useActivityStore((s) => s.days);
  const active = useActivityStore((s) => s.active);
  const spent = useLandStore((s) => s.spent);
  const now = new Date();
  const items = [
    { k: "Chuỗi ngày", v: `${computeStreak(active, now)}`, u: "ngày" },
    { k: "Dài nhất", v: `${longestStreak(active)}`, u: "ngày" },
    { k: "Tinh thể", v: crystalBalance(days, spent).toLocaleString("vi-VN"), u: "" },
  ];
  return (
    <dl className="grid grid-cols-3 border-t border-line-strong">
      {items.map((it, i) => (
        <div key={it.k} className={cn("flex flex-col gap-1 pt-3", i > 0 && "border-l border-line-strong pl-3.5")}>
          <dt className="text-[12px] font-semibold tracking-[0.06em] text-ink-3 uppercase">{it.k}</dt>
          <dd className="text-[26px] leading-none font-extrabold tracking-[-0.03em] text-ink tabular-nums">
            {it.v} {it.u && <span className="text-[13px] font-semibold tracking-normal text-ink-3">{it.u}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Thiết lập học: giọng đọc tiếng Nhật, tốc độ đọc, giọng tiếng Anh */
function Settings() {
  const { gender, rate, enAccent, setGender, setRate, setEnAccent } = useTtsStore();
  const rows: { label: string; value: string; options: { v: string; label: string }[]; set: (v: string) => void }[] = [
    { label: "Giọng tiếng Nhật", value: gender, options: [{ v: "male", label: "Nam" }, { v: "female", label: "Nữ" }], set: (v) => setGender(v as typeof gender) },
    { label: "Tốc độ đọc", value: rate < 0.8 ? "slow" : "normal", options: [{ v: "slow", label: "Chậm" }, { v: "normal", label: "Thường" }], set: (v) => setRate(v === "slow" ? 0.7 : 0.9) },
    { label: "Giọng tiếng Anh", value: enAccent, options: [{ v: "uk", label: "Anh" }, { v: "us", label: "Mỹ" }], set: (v) => setEnAccent(v as typeof enAccent) },
  ];
  return (
    <div className="flex flex-col">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-3 border-b border-line py-2.5 first:pt-0 last:border-b-0">
          <span className="text-[14px] font-medium text-ink-2">{r.label}</span>
          <div role="radiogroup" aria-label={r.label} className="grid grid-cols-2 gap-1 rounded-[10px] border border-line-strong bg-paper p-[3px]">
            {r.options.map((o) => (
              <button
                key={o.v}
                type="button"
                role="radio"
                aria-checked={r.value === o.v}
                onClick={() => r.set(o.v)}
                className={cn("h-8 min-w-14 rounded-[7px] px-2.5 pointer-coarse:h-10 text-[13px] font-semibold transition-colors", r.value === o.v ? "bg-ink text-white" : "text-ink-2 hover:text-ink")}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Tên hiển thị lưu ở cả hồ sơ (identity.profiles) lẫn thông tin tài khoản (đọc nhanh, không cần truy vấn) */
function ProfileForm({ initial, onError }: { initial: string; onError: (m: string) => void }) {
  const [name, setName] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        const sb = supabase()!;
        const { error } = await sb.rpc("update_my_profile", { p: { display_name: name } });
        if (!error) await sb.auth.updateUser({ data: { display_name: name } });
        setBusy(false);
        setSaved(!error);
        if (error) onError(error.message);
      }}
    >
      <Field label="Tên hiển thị" maxLength={60} value={name} onChange={(e) => (setName(e.target.value), setSaved(false))} />
      <div className="flex items-center gap-3">
        <PrimaryButton type="submit" busy={busy} className="h-10">
          Lưu
        </PrimaryButton>
        {saved && <span className="text-[13px] text-ok-ink">Đã lưu.</span>}
      </div>
    </form>
  );
}
