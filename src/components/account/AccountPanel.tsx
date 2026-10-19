"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CloudOff, Download, LogOut, RefreshCw, Trash2 } from "lucide-react";
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

  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col gap-5 px-4 py-8 sm:py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-ink">Tài khoản</h1>
        <p className="text-[15px] text-ink-2">{user.email}</p>
      </header>

      <section className="flex flex-col gap-3 rounded-3xl border border-line bg-surface px-5 py-5 sm:px-6">
        <h2 className="text-[16px] font-bold text-ink">Đồng bộ tiến độ</h2>
        <div className="flex flex-wrap items-center gap-3 text-[14px] text-ink-2">
          {status === "offline" ? <CloudOff className="h-4 w-4" aria-hidden /> : <RefreshCw className={`h-4 w-4 ${status === "syncing" ? "animate-spin" : ""}`} aria-hidden />}
          <span>
            {status === "syncing" ? "Đang đồng bộ…" : status === "offline" ? "Đang offline — sẽ đồng bộ khi có mạng" : `Lần cuối: ${fmt(lastSyncAt)}`}
            {pending > 0 && ` · ${pending} hoạt động chờ gửi`}
          </span>
          <GhostButton className="ml-auto h-9" disabled={status === "syncing"} onClick={() => void syncNow()}>
            Đồng bộ ngay
          </GhostButton>
        </div>
        {status === "error" && lastError && <Notice tone="error">Lỗi đồng bộ: {lastError}</Notice>}
        <p className="text-[13px] leading-relaxed text-ink-3">
          Bạn vẫn học được khi mất mạng; mọi hoạt động được lưu trên máy và tự gửi lên khi có kết nối.{" "}
          <Link href="/progress" className="font-semibold text-ink-2 underline">
            Xem tiến độ học tập
          </Link>{" "}
          ·{" "}
          <Link href="/land" className="font-semibold text-ink-2 underline">
            Vùng đất
          </Link>
        </p>
      </section>

      <section className="flex flex-col gap-3 rounded-3xl border border-line bg-surface px-5 py-5 sm:px-6">
        <h2 className="text-[16px] font-bold text-ink">Hồ sơ</h2>
        <ProfileForm key={user.id} initial={(user.user_metadata?.display_name as string | undefined) ?? ""} onError={setErr} />
      </section>

      <section className="flex flex-col gap-3 rounded-3xl border border-line bg-surface px-5 py-5 sm:px-6">
        <h2 className="text-[16px] font-bold text-ink">Dữ liệu của bạn</h2>
        <p className="text-[13px] leading-relaxed text-ink-3">
          Bạn có quyền tải về hoặc xóa toàn bộ dữ liệu cá nhân bất cứ lúc nào (Nghị định 13/2023/NĐ-CP).{" "}
          <Link href="/privacy" className="font-semibold text-ink-2 underline">
            Chính sách quyền riêng tư
          </Link>
        </p>
        <div className="flex flex-wrap gap-2">
          <GhostButton onClick={exportData} disabled={busy === "export"}>
            <Download className="h-4 w-4" aria-hidden /> {busy === "export" ? "Đang chuẩn bị…" : "Tải dữ liệu (JSON)"}
          </GhostButton>
          <GhostButton
            disabled={busy === "signout"}
            onClick={async () => {
              setBusy("signout");
              await signOutAndClear();
              router.replace("/");
            }}
          >
            <LogOut className="h-4 w-4" aria-hidden /> {busy === "signout" ? "Đang lưu tiến độ…" : "Đăng xuất"}
          </GhostButton>
        </div>
        <p className="text-[12.5px] text-ink-3">Đăng xuất sẽ lưu nốt tiến độ lên máy chủ rồi xóa khỏi trình duyệt này.</p>
        {err && <Notice tone="error">{err}</Notice>}
      </section>

      <section className="flex flex-col gap-3 rounded-3xl border border-brand/30 bg-brand-soft/40 px-5 py-5 sm:px-6">
        <h2 className="text-[16px] font-bold text-brand-soft-ink">Xóa tài khoản</h2>
        <p className="text-[13px] leading-relaxed text-ink-2">
          Xóa vĩnh viễn tài khoản và mọi dữ liệu học trên máy chủ (tiến độ, thẻ ôn, lịch sử, thống kê). Không thể hoàn tác. Tiến độ
          lưu trên trình duyệt này vẫn giữ lại.
        </p>
        <Field label='Gõ "XÓA" để xác nhận' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button
          type="button"
          disabled={confirm.trim().toUpperCase() !== "XÓA" || busy === "delete"}
          onClick={deleteAccount}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-bold text-white disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" aria-hidden /> {busy === "delete" ? "Đang xóa…" : "Xóa vĩnh viễn"}
        </button>
      </section>
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
        <Link href="/reset-password" className="ml-auto text-[13px] font-semibold text-ink-2 hover:text-ink">
          Đổi mật khẩu
        </Link>
      </div>
    </form>
  );
}
