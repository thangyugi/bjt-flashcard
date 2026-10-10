"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAllVocabularyGroups } from "@/hooks/useVocabulary";
import { useFlashcardStore } from "@/store/flashcard-store";
import { QuizRunner, type QuizOutcome } from "@/components/quiz/QuizRunner";
import { QuizSkeleton } from "@/components/layout/Skeletons";
import { QUESTION_TYPES, buildQuiz, questionItems, type QuestionType } from "@/lib/quiz";
import { resolveScope, type ScopeKey } from "@/lib/quiz-scope";
import type { VocabularyGroup, VocabularyItem } from "@/types/vocabulary";

const VALID_TYPES = new Set(QUESTION_TYPES.map((t) => t.type));

interface SessionProps {
  pool: VocabularyItem[];
  allVocab: VocabularyItem[];
  groupOf: Map<string, VocabularyGroup>;
  count: number;
  types: QuestionType[];
  seenKey: string;
  title: string;
  onNewSession: () => void;
  onRetryWrong: (items: VocabularyItem[]) => void;
}

/** Một lượt làm bài: đề được tạo một lần khi bắt đầu */
function QuizSession({ pool, allVocab, groupOf, count, types, seenKey, title, onNewSession, onRetryWrong }: SessionProps) {
  const { quizSeen, markQuizSeen, addToReview, removeFromReview } = useFlashcardStore();
  const [questions] = useState(() =>
    buildQuiz({ pool, allVocab, groupOf, count, types, seenIds: quizSeen[seenKey] ?? [] })
  );

  // Ghi nhớ các từ đã hỏi để lần sau ưu tiên từ khác
  useEffect(() => {
    markQuizSeen(seenKey, questions.flatMap((q) => questionItems(q).map((i) => i.id)), pool.length);
  }, [questions, markQuizSeen, seenKey, pool.length]);

  const onFinish = ({ wrongItems, rightItems }: QuizOutcome) => {
    const wrongIds = new Set(wrongItems.map((i) => i.id));
    addToReview([...wrongIds]);
    removeFromReview(rightItems.map((i) => i.id).filter((id) => !wrongIds.has(id)));
  };

  return <QuizRunner questions={questions} title={title} onFinish={onFinish} onNewSession={onNewSession} onRetryWrong={onRetryWrong} />;
}

function QuizPlayInner() {
  const params = useSearchParams();
  const scope = (params.get("scope") ?? "all") as ScopeKey;
  const countParam = params.get("count") ?? "20";
  const types = (params.get("types") ?? "meaning").split(",").filter((t): t is QuestionType => VALID_TYPES.has(t as QuestionType));

  const { data: groups, isLoading } = useAllVocabularyGroups();
  const { progress, reviewIds } = useFlashcardStore();
  const [session, setSession] = useState<{ key: number; retry?: VocabularyItem[] }>({ key: 0 });

  const groupOf = useMemo(() => {
    const m = new Map<string, VocabularyGroup>();
    groups?.forEach((g) => g.items.forEach((i) => m.set(i.id, g)));
    return m;
  }, [groups]);

  // Phạm vi chốt lúc bắt đầu lượt làm, không đổi khi danh sách ôn tập cập nhật
  const [scopeSnapshot, setScopeSnapshot] = useState<{ key: number; label: string; items: VocabularyItem[] } | null>(null);
  if (groups && (!scopeSnapshot || scopeSnapshot.key !== session.key)) {
    const r = resolveScope(scope, groups, progress, reviewIds);
    setScopeSnapshot({ key: session.key, ...r });
  }

  if (isLoading || !groups || !scopeSnapshot) return <QuizSkeleton />;

  const retry = session.retry;
  const pool = retry ?? scopeSnapshot.items;
  // Số từ cần kiểm tra ("all" = mọi từ dùng được với các dạng đã chọn)
  const count = retry ? retry.length : countParam === "all" ? Infinity : Number(countParam) || 20;

  return (
    <QuizSession
      key={session.key}
      pool={pool}
      allVocab={groups.flatMap((g) => g.items)}
      groupOf={groupOf}
      count={count}
      types={types.length ? types : ["meaning"]}
      seenKey={retry ? "retry" : scope}
      title={retry ? `Ôn lại ${retry.length} từ chưa thuộc` : `Trắc nghiệm: ${scopeSnapshot.label}`}
      onNewSession={() => {
        setSession((s) => ({ key: s.key + 1 }));
        window.scrollTo(0, 0);
      }}
      onRetryWrong={(items) => {
        setSession((s) => ({ key: s.key + 1, retry: items }));
        window.scrollTo(0, 0);
      }}
    />
  );
}

export default function QuizPlayPage() {
  return (
    <Suspense fallback={<QuizSkeleton />}>
      <QuizPlayInner />
    </Suspense>
  );
}
