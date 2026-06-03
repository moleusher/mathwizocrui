import React from "react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";
import {
  QuestionBadge,
  TypeBadge,
  CorrectionBadge,
  ScoreDisplay,
} from "./QuestionBadges";
import type { ExamQuestion } from "../types/question";

export interface QuestionSummaryProps {
  question: ExamQuestion;
  maxChars?: number;
  className?: string;
}

export const QuestionSummary: React.FC<QuestionSummaryProps> = ({
  question,
  maxChars = 80,
  className,
}) => {
  const truncatedText =
    question.question_text.length > maxChars
      ? question.question_text.slice(0, maxChars) + "..."
      : question.question_text;

  const score = question.teacher_correction?.score ?? null;
  const maxScore = question.teacher_correction?.max_score ?? 0;

  return (
    <div
      className={cn("flex items-center gap-3 py-3 px-4 min-h-[44px]", className)}
      aria-label={`题目 ${question.question_index}`}
    >
      <QuestionBadge index={question.question_index} />

      {/* Desktop only: TypeBadge */}
      <span className="hidden sm:inline-flex items-center gap-2">
        <TypeBadge type={question.question_type} />
      </span>

      {/* CorrectionBadge + ScoreDisplay */}
      {question.teacher_correction && (
        <span className="flex items-center gap-1">
          {question.teacher_correction.mark && (
            <CorrectionBadge mark={question.teacher_correction.mark} />
          )}
          {maxScore > 0 && <ScoreDisplay score={score} maxScore={maxScore} />}
        </span>
      )}

      {/* Truncated question text */}
      <div className="flex-1 truncate text-xs text-[var(--text-muted)]">
        <MarkdownRenderer content={truncatedText} />
      </div>
    </div>
  );
};

QuestionSummary.displayName = "QuestionSummary";
