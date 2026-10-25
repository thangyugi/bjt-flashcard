"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authErrorVi, authRedirect, supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AuthShell, CONSENT_VERSION, Divider, Field, GhostButton, GoogleIcon, Notice, NotConfigured, PrimaryButton } from "./AuthUi";

/** Đọc ?next= (chỉ chấp nhận đường dẫn trong app) */
function nextPath(fallback = "/account") {
  if (typeof window === "undefined") return fallback;
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") && !n.startsWith("//") ? n : fallback;
}

function GoogleButton({ label }: { label: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <>
      <GhostButton
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setErr("");
          // Đánh dấu cần ghi nhận đồng ý sau khi quay về (đăng nhập Google không qua form đăng ký)
          try {
            localStorage.setItem("pending-consent", CONSENT_VERSION);
          } catch {}
          const { error } = await supabase()!.auth.signInWithOAuth({ provider: "google", options: { redirectTo: authRedirect(nextPath()) } });
          if (error) {
            setErr(authErrorVi(error.message));
            setBusy(false);
          }
        }}
      >
        <GoogleIcon /> {label}
      </GhostButton>
      {err && <Notice tone="error">{err}</Notice>}
    </>
  );
}

const Terms = () => (
  <p className="text-[12px] leading-relaxed text-ink-3">
    Tiếp tục nghĩa là bạn đồng ý với{" "}
    <Link href="/privacy" className="font-semibold text-ink-2 underline">
      chính sách quyền riêng tư
    </Link>
    . Dữ liệu học chỉ dùng để lưu tiến độ cho bạn và có thể xóa bất cứ lúc nào.
  </p>
);

/** Đã đăng nhập thì chuyển đi luôn */
function useRedirectIfSignedIn() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) router.replace(nextPath());
  }, [user, router]);
}

export function LoginForm() {
  const { enabled } = useAuth();
  useRedirectIfSignedIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "link">("password");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);
  if (!enabled) return <NotConfigured />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const sb = supabase()!;
    if (mode === "password") {
      const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setMsg({ tone: "error", text: authErrorVi(error.message) });
    } else {
      const { error } = await sb.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: authRedirect(nextPath()), shouldCreateUser: false },
      });
      setMsg(
        error
          ? { tone: "error", text: authErrorVi(error.message) }
          : { tone: "ok", text: `Đã gửi link đăng nhập tới ${email.trim()}. Mở email và bấm vào link (hiệu lực 1 giờ).` }
      );
    }
    setBusy(false);
  };

  return (
    <AuthShell
      title="Đăng nhập"
      sub="Đăng nhập LeoEdu để đồng bộ tiến độ học giữa điện thoại và máy tính."
      foot={
        <>
          Chưa có tài khoản?{" "}
          <Link href="/register" className="font-bold text-brand hover:underline">
            Đăng ký miễn phí
          </Link>
        </>
      }
    >
      <GoogleButton label="Tiếp tục với Google" />
      <Divider label="hoặc bằng email" />
      <form onSubmit={submit} className="flex flex-col gap-3.5">
        <Field label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ban@example.com" />
        {mode === "password" && (
          <Field
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
        <PrimaryButton type="submit" busy={busy}>
          {mode === "password" ? "Đăng nhập" : "Gửi link đăng nhập"}
        </PrimaryButton>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
          <button type="button" className="min-h-10 font-semibold text-ink-2 hover:text-ink" onClick={() => setMode(mode === "password" ? "link" : "password")}>
            {mode === "password" ? "Đăng nhập không cần mật khẩu" : "Dùng mật khẩu"}
          </button>
          <Link href="/forgot-password" className="inline-flex min-h-10 items-center font-semibold text-ink-2 hover:text-ink">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
      <Terms />
    </AuthShell>
  );
}

export function RegisterForm() {
  const { enabled } = useAuth();
  useRedirectIfSignedIn();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);
  if (!enabled) return <NotConfigured />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return setMsg({ tone: "error", text: "Hãy đồng ý với chính sách quyền riêng tư để tạo tài khoản." });
    setBusy(true);
    setMsg(null);
    const { data, error } = await supabase()!.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: authRedirect(nextPath()),
        data: { display_name: name.trim() || undefined, consent_version: CONSENT_VERSION },
      },
    });
    if (error) setMsg({ tone: "error", text: authErrorVi(error.message) });
    else if (!data.session)
      setMsg({ tone: "ok", text: `Gần xong! Mở email ${email.trim()} và bấm link xác nhận để kích hoạt tài khoản.` });
    setBusy(false);
  };

  return (
    <AuthShell
      title="Tạo tài khoản"
      sub="Tài khoản LeoEdu miễn phí. Tiến độ đang có trên máy này sẽ được chuyển vào tài khoản."
      foot={
        <>
          Đã có tài khoản?{" "}
          <Link href="/login" className="font-bold text-brand hover:underline">
            Đăng nhập
          </Link>
        </>
      }
    >
      <GoogleButton label="Đăng ký bằng Google" />
      <Divider label="hoặc bằng email" />
      <form onSubmit={submit} className="flex flex-col gap-3.5">
        <Field label="Tên hiển thị" autoComplete="nickname" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: Thắng" />
        <Field label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field
          label="Mật khẩu"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Ít nhất 8 ký tự."
        />
        <label className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink-2">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 accent-[var(--brand)]" />
          <span>
            Tôi đồng ý với{" "}
            <Link href="/privacy" className="font-semibold underline">
              chính sách quyền riêng tư
            </Link>{" "}
            và cho phép lưu tiến độ học của mình.
          </span>
        </label>
        {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
        <PrimaryButton type="submit" busy={busy}>
          Tạo tài khoản
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export function ForgotForm() {
  const { enabled } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);
  if (!enabled) return <NotConfigured />;
  return (
    <AuthShell title="Quên mật khẩu" sub="Nhập email đã đăng ký, chúng tôi gửi link để đặt mật khẩu mới." foot={<Link href="/login" className="font-bold text-brand hover:underline">Quay lại đăng nhập</Link>}>
      <form
        className="flex flex-col gap-3.5"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase()!.auth.resetPasswordForEmail(email.trim(), { redirectTo: authRedirect("/reset-password") });
          setMsg(error ? { tone: "error", text: authErrorVi(error.message) } : { tone: "ok", text: "Nếu email có tài khoản, link đặt lại mật khẩu đã được gửi. Hãy kiểm tra hộp thư (cả mục Spam)." });
          setBusy(false);
        }}
      >
        <Field label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
        <PrimaryButton type="submit" busy={busy}>
          Gửi link đặt lại
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

export function ResetPasswordForm() {
  const { enabled, ready, user } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);
  if (!enabled) return <NotConfigured />;
  if (ready && !user)
    return (
      <AuthShell title="Đặt mật khẩu mới">
        <Notice tone="error">Link đã hết hạn hoặc chưa đăng nhập. Hãy yêu cầu link mới.</Notice>
        <Link href="/forgot-password" className="text-center font-bold text-brand hover:underline">
          Gửi lại link
        </Link>
      </AuthShell>
    );
  return (
    <AuthShell title="Đặt mật khẩu mới" sub={user?.email ?? undefined}>
      <form
        className="flex flex-col gap-3.5"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const { error } = await supabase()!.auth.updateUser({ password });
          if (error) setMsg({ tone: "error", text: authErrorVi(error.message) });
          else {
            setMsg({ tone: "ok", text: "Đã đổi mật khẩu." });
            setTimeout(() => router.replace("/account"), 800);
          }
          setBusy(false);
        }}
      >
        <Field label="Mật khẩu mới" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} hint="Ít nhất 8 ký tự." />
        {msg && <Notice tone={msg.tone}>{msg.text}</Notice>}
        <PrimaryButton type="submit" busy={busy}>
          Lưu mật khẩu
        </PrimaryButton>
      </form>
    </AuthShell>
  );
}

/** /auth/callback: đổi mã trong link email / Google thành phiên đăng nhập */
export function AuthCallback() {
  const router = useRouter();
  const [err, setErr] = useState("");
  useEffect(() => {
    const sb = supabase();
    if (!sb) return;
    const params = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const errorText = params.get("error_description") ?? hash.get("error_description");
    const code = params.get("code");
    const finish = async () => {
      if (errorText) throw new Error(errorText);
      if (code) {
        const { error } = await sb.auth.exchangeCodeForSession(code);
        if (error) throw error;
      }
      const pending = localStorage.getItem("pending-consent");
      if (pending) {
        await sb.rpc("record_consent", { p_purpose: "terms", p_version: pending, p_granted: true });
        await sb.rpc("record_consent", { p_purpose: "privacy", p_version: pending, p_granted: true });
        localStorage.removeItem("pending-consent");
      }
      router.replace(nextPath());
    };
    finish().catch((e: Error) => setErr(authErrorVi(e.message)));
  }, [router]);

  return (
    <AuthShell title={err ? "Không đăng nhập được" : "Đang đăng nhập…"}>
      {err ? (
        <>
          <Notice tone="error">{err}</Notice>
          <Link href="/login" className="text-center font-bold text-brand hover:underline">
            Thử lại
          </Link>
        </>
      ) : (
        <Notice>Đang xác nhận tài khoản, vui lòng chờ một chút.</Notice>
      )}
    </AuthShell>
  );
}
