import type { N1Character } from "@/data/jlpt-n1/characters";
import { Jp } from "./Jp";

/** Dàn nhân vật — gắn mẫu ngữ pháp vào con người cụ thể để dễ nhớ. */
export function Cast({ characters }: { characters: N1Character[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {characters.map((c) => (
        <div key={c.id} className="flex flex-col gap-1.5 rounded-2xl border border-line bg-surface p-4">
          <span className="text-2xl" aria-hidden>
            {c.emoji}
          </span>
          <span className="text-[17px] leading-[1.9] font-bold text-ink">
            <Jp t={c.name} /> <span className="text-sm font-semibold text-ink-3">· {c.nameVi}</span>
          </span>
          <span className="text-[12.5px] leading-snug text-ink-2">
            <Jp t={c.role} vi />
          </span>
          <span className="text-[12.5px] leading-snug text-ink-3">
            <Jp t={c.trait} vi />
          </span>
        </div>
      ))}
    </div>
  );
}
