"use client";

import { useEffect, useState } from "react";
import { Download, Share, SquarePlus, X } from "lucide-react";
import { useHydrated } from "@/hooks/useHydrated";
import { MEDIA_BASE } from "@/lib/media";

/** Đăng ký service worker (chỉ ở bản production) để cài app & học offline. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    // Báo cho service worker tên miền chứa âm thanh (R2) để lưu offline cả file ở đó
    const sw = MEDIA_BASE ? `/sw.js?media=${encodeURIComponent(new URL(MEDIA_BASE).origin)}` : "/sw.js";
    navigator.serviceWorker.register(sw, { scope: "/", updateViaCache: "none" }).catch(() => {});
  }, []);
  return null;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
}

function readDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Thẻ "Cài ứng dụng": Android/Chrome/Edge dùng hộp thoại cài đặt của trình duyệt,
 * iPhone/iPad hiện hướng dẫn "Chia sẻ → Thêm vào MH chính". Ẩn khi đã cài hoặc đã đóng.
 */
export function InstallAppCard() {
  const hydrated = useHydrated();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setHidden(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!hydrated || hidden || readDismissed() || isStandalone()) return null;
  const ios = isIos();
  if (!deferred && !ios) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setHidden(true);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "accepted") setHidden(true);
  };

  return (
    <div className="relative flex items-start gap-4 panel p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand font-mincho text-xl font-bold text-white">
        語
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 pr-6">
        <span className="font-bold text-ink">Cài LeoEdu lên máy</span>
        {ios ? (
          <p className="text-sm leading-relaxed text-ink-2">
            Trên Safari, nhấn <Share className="inline h-4 w-4 align-[-3px] text-brand" aria-label="Chia sẻ" /> rồi chọn{" "}
            <b>
              Thêm vào MH chính <SquarePlus className="inline h-4 w-4 align-[-3px]" aria-hidden />
            </b>
            . App mở toàn màn hình như ứng dụng thật và học được cả khi mất mạng (với các bài đã mở).
          </p>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-ink-2">
              Mở nhanh từ màn hình chính, toàn màn hình, học được cả khi mất mạng (với các bài đã mở).
            </p>
            <button
              type="button"
              onClick={install}
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
            >
              <Download className="h-4 w-4" aria-hidden /> Cài ứng dụng
            </button>
          </>
        )}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Ẩn gợi ý cài ứng dụng"
        className="absolute top-3 right-3 rounded-lg p-1.5 text-ink-3 hover:bg-surface-2 hover:text-ink"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
