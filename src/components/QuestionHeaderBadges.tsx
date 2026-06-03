import React from "react";
import { cn } from "../utils/cn";
import {
  QuestionBadge,
  TypeBadge,
  CorrectionBadge,
  ScoreDisplay,
} from "./QuestionBadges";
import type { ExamQuestion } from "../types/question";

export interface QuestionHeaderBadgesProps {
  question: ExamQuestion;
  className?: string;
}

export const QuestionHeaderBadges: React.FC<QuestionHeaderBadgesProps> = ({
  question,
  className,
}) => {
  const score = question.teacher_correction?.score ?? null;
  const maxScore = question.teacher_correction?.max_score ?? 0;

  return (
    <span className={cn("hidden sm:inline-flex items-center gap-2", className)}>
      <QuestionBadge index={question.question_index} />
      <TypeBadge type={question.question_type} />
      {question.teacher_correction && (
        <>
          {question.teacher_correction.mark && (
            <CorrectionBadge mark={question.teacher_correction.mark} />
          )}
          {maxScore > 0 && (
            <ScoreDisplay score={score} maxScore={maxScore} />
          )}
        </>
      )}
    </span>
  );
};

QuestionHeaderBadges.displayName = "QuestionHeaderBadges";
