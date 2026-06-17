"use client";

import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import Link from "next/link";

export default function StudyIndexPage() {
  const { data: groups, isLoading } = useAllVocabularyGroups();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chọn nhóm để học</h1>
        <p className="text-gray-400 text-sm mt-1">
          Học tập trung theo từng nhóm chủ đề
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {groups?.map((group) => (
            <Link
              key={group.id}
              href={`/study/${group.id}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02] shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
                style={{
                  background: group.themeColor + "18",
                  border: `1.5px solid ${group.themeColor}35`,
                }}
              >
                {group.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-gray-900 font-bold text-sm">{group.name}</p>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      color: group.themeColor,
                      backgroundColor: group.themeColor + "15",
                      borderColor: group.themeColor + "40",
                    }}
                  >
                    {group.sourceType}
                  </span>
                </div>
                {group.nameJa && (
                  <p className="text-gray-400 text-xs mt-0.5">{group.nameJa}</p>
                )}
                <p className="text-gray-400 text-xs mt-1 font-medium">
                  {group.items.length} từ vựng
                </p>
              </div>
              <span
                className="text-gray-300 group-hover:translate-x-1 transition-transform text-xl font-light"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
