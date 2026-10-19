"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Vẽ lần lượt từng ảnh (mỗi ảnh sinh vài nghìn chấm) để không làm khựng giao diện
let queue: Promise<void> = Promise.resolve();
const nextTick = () => new Promise<void>((r) => setTimeout(r, 0));

/** Ảnh thu nhỏ một loài / sinh vật, vẽ bằng canvas 2D (không cần WebGL) */
export function Swatch({ id, creature, className }: { id: string; creature?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let off = false;
    queue = queue
      .then(() => import("./engine/swatch"))
      .then(async (m) => {
        await nextTick();
        if (!off && ref.current) m.paintSwatch(ref.current, id, !!creature);
      })
      .catch(() => {});
    return () => {
      off = true;
    };
  }, [id, creature]);
  return <canvas ref={ref} width={152} height={152} aria-hidden className={cn("block bg-[#0a2a29]", className)} />;
}
