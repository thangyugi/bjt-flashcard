import { useMemo } from "react";
import { useN1Store } from "@/store/n1-store";
import { useEnStore } from "@/store/en-store";
import { useOciAiStore } from "@/store/oci-ai-store";
import { useCcarStore } from "@/store/ccar-p-store";
import { useFlashcardStore } from "@/store/flashcard-store";
import { lessonKey, n1LessonKey } from "@/lib/learning/keys";

/** Bài đã học xong (theo lessonKey) và số thẻ BJT đã thuộc — nguồn cho courseProgress(). */
export function useLearningProgress() {
  const n1Done = useN1Store((s) => s.done);
  const enDone = useEnStore((s) => s.done);
  const ociDone = useOciAiStore((s) => s.done);
  const ccarDone = useCcarStore((s) => s.done);
  const fc = useFlashcardStore((s) => s.progress);

  const doneKeys = useMemo(
    () => new Set([...Object.keys(n1Done).map(n1LessonKey), ...Object.keys(enDone).map(lessonKey.ipa), ...Object.keys(ociDone).map(lessonKey.oci), ...Object.keys(ccarDone).map(lessonKey.ccar)]),
    [n1Done, enDone, ociDone, ccarDone]
  );
  const bjtKnown = useMemo(() => Object.values(fc).filter((p) => p.status === "mastered").length, [fc]);
  return { doneKeys, bjtKnown };
}
