"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { OCI_THEME_KEY as THEME_KEY } from "./theme-script";

export type OciTheme = "light" | "dark";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function read(): OciTheme {
  try {
    if (localStorage.getItem(THEME_KEY) === "dark") return "dark";
  } catch {}
  return "light";
}

export function useOciTheme() {
  return useSyncExternalStore(subscribe, read, () => "light" as OciTheme);
}

/** Áp chủ đề đã chọn lên khung OCI (#oci-root) — đặt một lần trong OciShell */
export function useApplyOciTheme() {
  const theme = useOciTheme();
  useLayoutEffect(() => {
    const root = document.getElementById("oci-root");
    if (!root) return;
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }, [theme]);
}

function toggle(theme: OciTheme) {
  try {
    if (theme === "dark") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, "dark");
  } catch {}
  listeners.forEach((l) => l());
}

/**
 * Nút đổi nền bài đọc OCI (sáng / tối), đặt ở hàng công cụ đầu bài, cạnh đường dẫn quay lại.
 * Chỉ áp dụng cho các trang học OCI.
 */
export function OciThemeToggle() {
  const theme = useOciTheme();
  const dark = theme === "dark";
  const Icon = dark ? Moon : Sun;
  return (
    <button
      type="button"
      className="oci-theme-btn"
      onClick={() => toggle(theme)}
      aria-pressed={dark}
      title="Đổi nền bài đọc OCI (chỉ áp dụng cho khóa OCI)"
    >
      <Icon aria-hidden />
      <span>{dark ? "Nền tối" : "Nền sáng"}</span>
    </button>
  );
}
