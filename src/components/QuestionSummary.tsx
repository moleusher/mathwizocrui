import React from "react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { QuestionHeaderBadges } from "./QuestionHeaderBadges";
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

  return (
    <div
      className={cn("flex items-center gap-3 py-3 px-4 min-h-[44px]", className)}
      aria-label={`题目 ${question.question_index}`}
    >
      <QuestionHeaderBadges question={question} />

      {/* Truncated question text */}
      <div className="flex-1 line-clamp-1 text-xs text-[var(--text-muted)]" title={question.question_text}>
        <MarkdownRenderer content={truncatedText} />
      </div>
    </div>
  );
};

QuestionSummary.displayName = "QuestionSummary";
