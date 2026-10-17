"use client";

import { useEffect } from "react";
import { startTracker } from "@/lib/learning/tracker";
import { pushSettings, syncNow } from "@/lib/learning/sync";
import { useOutbox } from "@/lib/learning/events";
import { useTtsStore } from "@/store/tts-store";
import { useAuth } from "@/hooks/useAuth";

/** Chạy nền trên mọi trang: ghi sự kiện học, và khi đã đăng nhập thì đồng bộ với máy chủ. */
export function LearningRuntime() {
  const { user } = useAuth();

  useEffect(() => startTracker(), []);

  useEffect(() => {
    if (!user) return;
    void syncNow();
    let debounce: number | undefined;
    const soon = () => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => void syncNow(), 5000);
    };
    const unOutbox = useOutbox.subscribe((n, p) => n.events.length > p.events.length && soon());
    let settingsTimer: number | undefined;
    const unTts = useTtsStore.subscribe(() => {
      window.clearTimeout(settingsTimer);
      settingsTimer = window.setTimeout(() => void pushSettings(), 2000);
    });
    const onVisible = () => document.visibilityState === "visible" && void syncNow();
    const onOnline = () => void syncNow();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    const timer = window.setInterval(() => void syncNow(), 120_000);
    return () => {
      unOutbox();
      unTts();
      window.clearTimeout(debounce);
      window.clearTimeout(settingsTimer);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, [user]);

  return null;
}
