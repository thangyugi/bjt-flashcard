"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useVocabularyStats } from "@/hooks/useVocabulary";
import { useFlashcardStore } from "@/store/flashcard-store";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { data: stats } = useVocabularyStats();
  const { progress } = useFlashcardStore();

  const masteredCount = Object.values(progress).filter(
    (p) => p.status === "mastered"
  ).length;
  const totalCards = stats?.totalItems ?? 0;
  const overallPct = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-[11px] shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
              BJT
            </div>
            <div className="hidden sm:block">
              <div className="text-gray-900 font-bold text-sm leading-tight">BJT Flashcard</div>
              <div className="text-gray-400 text-[10px]">Japanese Business</div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <NavLink href="/" label="Tổng quan" active={pathname === "/"} />
            <NavLink href="/study" label="Học bài" active={pathname.startsWith("/study")} />
          </nav>

          {/* Overall progress */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-gray-400 font-medium">{masteredCount}/{totalCards}</span>
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <span className="text-indigo-600 font-semibold">{overallPct}%</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
        active
          ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      {label}
    </Link>
  );
}
