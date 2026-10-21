"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLandStore } from "@/store/land-store";
import { WORLDS } from "./worlds";

/** Thanh chuyển vùng đất: thẻ có ảnh thu nhỏ + một dòng mô tả; nhớ vùng chọn gần nhất trong land-store */
export function WorldBar({ current }: { current: string }) {
  const setLastWorld = useLandStore((s) => s.setLastWorld);
  useEffect(() => setLastWorld(current), [current, setLastWorld]);
  return (
    <nav aria-label="Chọn vùng đất" className="border-b border-line-strong bg-paper">
      <ul className="flex gap-2 overflow-x-auto px-[var(--gutter)] py-2 [scrollbar-width:none]">
        {WORLDS.map((w) => {
          const on = w.id === current;
          return (
            <li key={w.id} className="min-w-[230px] flex-1 md:max-w-[340px] md:min-w-0">
              <Link
                href={w.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex h-full items-center gap-2.5 rounded-lg border p-1.5 pr-3 transition-colors",
                  on ? "border-ink bg-surface" : "border-line-strong hover:border-ink-3 hover:bg-surface"
                )}
              >
                <span
                  className="h-10 w-16 flex-none overflow-hidden rounded-md border border-line bg-surface-2 bg-cover bg-center"
                  style={w.thumb ? { backgroundImage: `url(${w.thumb})` } : { background: w.swatch }}
                  aria-hidden
                />
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-ink">{w.name}</span>
                  <span className="block truncate text-[12px] text-ink-3" title={w.desc}>
                    {w.desc}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
