"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { VocabularyItem } from "@/types/vocabulary";
import { cn } from "@/lib/utils";

interface QuizRunnerProps {
  items: VocabularyItem[];
  allVocab: VocabularyItem[]; // For generating wrong options
  title?: string;
}

interface Question {
  item: VocabularyItem;
  options: string[];
  correctAnswer: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function QuizRunner({ items, allVocab, title = "Trắc nghiệm" }: QuizRunnerProps) {
  const router = useRouter();
  
  // States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Store user answers: index -> selected option string
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const [isFinished, setIsFinished] = useState(false);

  // Initialize questions
  useEffect(() => {
    if (items.length === 0 || allVocab.length === 0) return;

    // Pick max 30 items for the quiz
    const selectedItems = shuffleArray(items).slice(0, 30);
    
    const generatedQs: Question[] = selectedItems.map((item) => {
      const correct = item.meaningVn || item.meaningEn || "Không có nghĩa";
      
      // Get 3 random wrong answers
      const wrongItems = allVocab.filter(v => v.id !== item.id);
      const wrongAnswers = shuffleArray(wrongItems)
        .slice(0, 3)
        .map(v => v.meaningVn || v.meaningEn || "Không có nghĩa");
        
      const options = shuffleArray([correct, ...wrongAnswers]);
      
      return {
        item,
        options,
        correctAnswer: correct,
      };
    });

    setQuestions(generatedQs);
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  }, [items, allVocab]);

  if (items.length === 0) {
    return <div className="text-center py-10">Không có dữ liệu từ vựng.</div>;
  }

  if (questions.length === 0) {
    return <div className="text-center py-10">Đang tạo câu hỏi...</div>;
  }

  const currentQ = questions[currentIndex];
  const progressPct = (Object.keys(answers).length / questions.length) * 100;
  const isAllAnswered = Object.keys(answers).length === questions.length;

  const handleSelectOption = (option: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: option
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm("Bạn có chắc chắn muốn nộp bài?")) {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });

    return (
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        {/* Score Overview */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mb-8">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hoàn thành!</h2>
          <p className="text-gray-500 mb-6">Bạn đã hoàn thành bài trắc nghiệm: {title}</p>
          
          <div className="bg-indigo-50 rounded-2xl p-6 inline-block min-w-[200px]">
            <p className="text-sm font-semibold text-indigo-800 uppercase tracking-widest mb-1">Điểm số</p>
            <p className="text-4xl font-black text-indigo-600">
              {score} <span className="text-2xl text-indigo-400">/ {questions.length}</span>
            </p>
            <p className="text-sm text-indigo-500 mt-2 font-medium">
              Đạt {Math.round((score / questions.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Review List */}
        <div className="mb-10 space-y-6">
          <h3 className="text-xl font-bold text-gray-800 px-2">Chi tiết bài làm</h3>
          
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            const isUnanswered = !userAnswer;

            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className={cn(
                  "px-6 py-3 border-b flex items-center justify-between font-bold",
                  isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" :
                  isUnanswered ? "bg-gray-50 border-gray-200 text-gray-600" :
                  "bg-red-50 border-red-100 text-red-800"
                )}>
                  <span>Câu {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <><span className="text-xl">✅</span> Đúng</>
                    ) : isUnanswered ? (
                      <><span className="text-xl text-gray-400">⚪</span> Chưa làm</>
                    ) : (
                      <><span className="text-xl">❌</span> Sai</>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Vocab Details */}
                  <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-100">
                    <h4 
                      className="text-4xl font-bold text-gray-900"
                      style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
                    >
                      {q.item.kanji}
                    </h4>
                    {(q.item.hiragana || q.item.katakana) && (
                      <p className="text-lg text-indigo-600 font-medium tracking-widest mb-1">
                        {q.item.hiragana || q.item.katakana}
                      </p>
                    )}
                  </div>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Your Answer */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bạn chọn</p>
                      {isUnanswered ? (
                        <p className="text-gray-400 italic">Không có đáp án</p>
                      ) : (
                        <p className={cn(
                          "font-medium text-lg",
                          isCorrect ? "text-emerald-700" : "text-red-600 line-through decoration-2"
                        )}>
                          {userAnswer}
                        </p>
                      )}
                    </div>
                    
                    {/* Correct Answer */}
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Đáp án đúng</p>
                      <p className="font-bold text-lg text-emerald-800">
                        {q.correctAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Context & Explanations */}
                  {(q.item.meaningJa || q.item.exampleSentence || q.item.businessContext || q.item.usageNotes) && (
                    <div className="bg-blue-50/50 rounded-xl p-5 space-y-4">
                      {q.item.businessContext && (
                        <div>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">💼 Ngữ cảnh Business</p>
                          <p className="text-gray-700 text-sm">{q.item.businessContext}</p>
                        </div>
                      )}
                      
                      {q.item.exampleSentence && (
                        <div>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">📝 Ví dụ</p>
                          <p className="text-gray-800 font-medium" style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}>
                            {q.item.exampleSentence}
                          </p>
                          {q.item.exampleTranslation && (
                            <p className="text-gray-600 text-sm mt-1">{q.item.exampleTranslation}</p>
                          )}
                        </div>
                      )}

                      {q.item.usageNotes && (
                        <div>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">💡 Lưu ý cách dùng</p>
                          <p className="text-gray-700 text-sm">{q.item.usageNotes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center sticky bottom-6 z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-200">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
          >
            ← Thoát
          </button>
          <button
            onClick={() => {
              // Reset quiz
              setCurrentIndex(0);
              setAnswers({});
              setIsFinished(false);
              setQuestions(shuffleArray(questions));
              window.scrollTo(0, 0);
            }}
            className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Làm lại bài thi
          </button>
        </div>
      </div>
    );
  }

  const selectedOption = answers[currentIndex];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
        >
          ← Quay lại
        </button>
        <span className="font-bold text-gray-800 text-lg truncate max-w-[200px] sm:max-w-md text-right">
          {title}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Grid */}
        <div className="w-full lg:w-80 shrink-0 order-2 lg:order-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-8">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex justify-between items-center">
              <span>Danh sách câu hỏi</span>
              <span className="text-xs font-normal text-gray-400">
                {Object.keys(answers).length}/{questions.length}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {questions.map((_, idx) => {
                const isAnswered = !!answers[idx];
                const isCurrent = idx === currentIndex;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-all",
                      isCurrent ? "ring-2 ring-indigo-500 ring-offset-1" : "",
                      isAnswered 
                        ? "bg-indigo-100 text-indigo-700 border border-indigo-200" 
                        : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Nộp bài
            </button>
          </div>
        </div>

        {/* Right Column: Question */}
        <div className="flex-1 w-full order-1 lg:order-2">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              <span>Tiến độ</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 flex justify-between items-center">
              <span>Câu {currentIndex + 1}</span>
              <span>Nghĩa của từ này là gì?</span>
              <span className="w-10"></span> {/* dummy spacer for centering */}
            </p>
            <h2 
              className="text-5xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Hiragino Kaku Gothic Pro','Noto Sans JP','Yu Gothic',sans-serif" }}
            >
              {currentQ.item.kanji}
            </h2>
            {(currentQ.item.hiragana || currentQ.item.katakana) && (
              <p className="text-lg text-indigo-600 font-medium tracking-widest">
                {currentQ.item.hiragana || currentQ.item.katakana}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              
              let btnClass = "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50";
              
              if (isSelected) {
                btnClass = "bg-indigo-50 border-indigo-500 text-indigo-800 ring-1 ring-indigo-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 text-lg",
                    btnClass
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border text-xs flex-shrink-0 transition-colors",
                      isSelected ? "bg-indigo-500 border-indigo-500 text-white" : "border-gray-300 text-gray-400"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              ← Câu trước
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Câu sau →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
