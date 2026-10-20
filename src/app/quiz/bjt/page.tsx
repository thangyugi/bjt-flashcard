"use client";

import { Suspense } from "react";
import { QuizHub } from "@/components/quiz/QuizHub";
import { HubSkeleton } from "@/components/layout/Skeletons";

// Màn tổng hợp: chọn phạm vi / số câu / dạng câu hỏi rồi chuyển sang /quiz/play
export default function QuizPage() {
  return (
    <Suspense fallback={<HubSkeleton />}>
      <QuizHub />
    </Suspense>
  );
}
