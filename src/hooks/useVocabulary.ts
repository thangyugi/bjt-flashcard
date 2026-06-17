import { useQuery } from "@tanstack/react-query";
import { n1Groups } from "@/data/vocabulary-groups";
import type { FilterOptions, VocabularyGroup } from "@/types/vocabulary";

// Cache for fetched BJT groups to avoid repeated requests during navigation
let cachedBjtGroups: VocabularyGroup[] | null = null;

async function fetchBjtGroups(): Promise<VocabularyGroup[]> {
  if (cachedBjtGroups) return cachedBjtGroups;
  
  try {
    const res = await fetch("/data/bjt-1000.json");
    if (!res.ok) throw new Error("Failed to fetch BJT data");
    const data = await res.json();
    cachedBjtGroups = data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchAllGroups(): Promise<VocabularyGroup[]> {
  const bjt = await fetchBjtGroups();
  return [...bjt, ...n1Groups];
}

async function fetchGroupById(id: string): Promise<VocabularyGroup | null> {
  const all = await fetchAllGroups();
  return all.find((g) => g.id === id) ?? null;
}

async function fetchGroupsBySource(
  sourceType: "BJT" | "JLPT"
): Promise<VocabularyGroup[]> {
  if (sourceType === "BJT") return await fetchBjtGroups();
  return n1Groups;
}

// ── Hooks ────────────────────────────────────────────────────

export function useAllVocabularyGroups(filters?: FilterOptions) {
  return useQuery({
    queryKey: ["vocabulary-groups", filters],
    queryFn: async () => {
      const groups = await fetchAllGroups();
      if (!filters) return groups;

      return groups.filter((group) => {
        if (filters.sourceType && group.sourceType !== filters.sourceType) {
          return false;
        }
        if (filters.bjtOnly && group.sourceType !== "BJT") {
          return false;
        }
        return true;
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

export function useVocabularyGroup(groupId: string | null) {
  return useQuery({
    queryKey: ["vocabulary-group", groupId],
    queryFn: () => (groupId ? fetchGroupById(groupId) : null),
    enabled: !!groupId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useVocabularyStats() {
  return useQuery({
    queryKey: ["vocabulary-stats"],
    queryFn: async () => {
      const bjt = await fetchBjtGroups();
      const all = [...bjt, ...n1Groups];
      
      const totalItems = all.reduce((sum, group) => sum + group.items.length, 0);
      
      return {
        totalGroups: all.length,
        totalItems,
        bjtGroups: bjt.length,
        n1Groups: n1Groups.length,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useGroupsBySource(sourceType: "BJT" | "JLPT") {
  return useQuery({
    queryKey: ["vocabulary-groups-by-source", sourceType],
    queryFn: () => fetchGroupsBySource(sourceType),
    staleTime: 5 * 60 * 1000,
  });
}
