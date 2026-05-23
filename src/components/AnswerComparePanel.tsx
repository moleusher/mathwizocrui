import React from "react";
import { Pencil, CheckCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { StudentAnswer, StandardAnswer } from "../types/question";

export interface AnswerComparePanelProps {
  studentAnswer: StudentAnswer | null;
  standardAnswer: StandardAnswer | null;
  className?: string;
}

export const AnswerComparePanel: React.FC<AnswerComparePanelProps> = ({
  studentAnswer,
  standardAnswer,
  className,
}) => {
  const hasStudent = studentAnswer != null;
  const hasStandard = standardAnswer != null;

  if (!hasStudent && !hasStandard) {
    return null;
  }

  const isSingleColumn = !hasStudent || !hasStandard;

  return (
    <div
      className={cn(
        "grid gap-2",
        isSingleColumn ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
        className,
      )}
    >
      {/* Student Answer */}
      {hasStudent && (
        <div className="rounded-lg border border-[var(--color-warning)]/20 bg-[var(--color-warning)]/5 p-3 min-h-[60px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Pencil className="w-4 h-4 text-[var(--color-warning)]" />
            <span className="text-xs font-medium text-[var(--color-warning)]">学生作答</span>
            {studentAnswer.confidence != null && studentAnswer.confidence < 0.7 && (
              <span className="ml-auto text-xs text-[var(--color-warning)] flex items-center gap-0.5">
                <span role="img" aria-label="低置信度">
                  ⚠
                </span>
                置信度: {Math.round(studentAnswer.confidence * 100)}%
              </span>
            )}
          </div>
          <MarkdownRenderer content={studentAnswer.text} />
        </div>
      )}

      {/* Standard Answer */}
      {hasStandard && (
        <div className="rounded-lg border border-[var(--color-success)]/20 bg-[var(--color-success)]/5 p-3 min-h-[60px]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />
            <span className="text-xs font-medium text-[var(--color-success)]">标准答案</span>
          </div>
          <MarkdownRenderer content={standardAnswer.text} />
        </div>
      )}
    </div>
  );
};

AnswerComparePanel.displayName = "AnswerComparePanel";
