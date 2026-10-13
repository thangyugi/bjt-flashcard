"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Bản dịch bị làm mờ — chạm để xem (tự nhớ lại trước khi đọc nghĩa). */
export function Reveal({ children, className, open }: { children: React.ReactNode; className?: string; open?: boolean }) {
  const [shown, setShown] = useState(false);
  const visible = open || shown;
  return (
    <button
      type="button"
      onClick={() => setShown((v) => !v)}
      aria-expanded={visible}
      title={visible ? "Ẩn bản dịch" : "Chạm để xem bản dịch"}
      className={cn("block w-full cursor-pointer text-left transition-[filter] duration-200", !visible && "blur-[5px] select-none", className)}
    >
      {children}
    </button>
  );
}
