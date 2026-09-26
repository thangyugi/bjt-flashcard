import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Có đang bôi đen văn bản không — dùng để không lật thẻ khi người dùng chọn chữ để copy. */
export function hasTextSelection() {
  if (typeof window === "undefined") return false;
  const sel = window.getSelection();
  return !!sel && !sel.isCollapsed && sel.toString().trim().length > 0;
}
