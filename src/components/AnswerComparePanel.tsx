import React from "react";
import { Pencil, CheckCircle } from "lucide-react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { StudentAnswer, StandardAnswer } from "../types/question";

export interface AnswerComparePanelProps {
  studentAnswer: StudentAnswer | null;
  standardAnswer: StandardAnswer | null;
  /** v0.4.0: Adaptive color for student card based on correctness */
  studentVariant?: "correct" | "wrong" | "partial" | "unmarked";
  /** Visual style variant */
  variant?: "default" | "minimalist";
  className?: string;
}

/** Color config per studentVariant */
const VARIANT_STYLES = {
  correct: {
    border: "border-l-2 border-l-[var(--color-success)] border border-[var(--border-primary)]",
    bg: "bg-[var(--background-secondary)]",
    icon: CheckCircle,
    iconColor: "text-[var(--color-success)]",
    labelColor: "text-[var(--color-success)]",
    label: "学生作答",
  },
  wrong: {
    border: "border-l-2 border-l-[var(--color-error)] border border-[var(--border-primary)]",
    bg: "bg-[var(--background-secondary)]",
    icon: Pencil,
    iconColor: "text-[var(--color-error)]",
    labelColor: "text-[var(--color-error)]",
    label: "学生作答",
  },
  partial: {
    border: "border-l-2 border-l-[var(--color-warning)] border border-[var(--border-primary)]",
    bg: "bg-[var(--background-secondary)]",
    icon: Pencil,
    iconColor: "text-[var(--color-warning)]",
    labelColor: "text-[var(--color-warning)]",
    label: "学生作答",
  },
  unmarked: {
    border: "border border-[var(--border-primary)]",
    bg: "bg-[var(--background-secondary)]",
    icon: Pencil,
    iconColor: "text-[var(--text-muted)]",
    labelColor: "text-[var(--text-muted)]",
    label: "学生作答",
  },
} as const;

export const AnswerComparePanel: React.FC<AnswerComparePanelProps> = React.forwardRef<HTMLDivElement, AnswerComparePanelProps>(({
  studentAnswer,
  standardAnswer,
  studentVariant = "partial",
  variant = "default",
  className,
}, ref) => {
  const hasStudent = studentAnswer != null;
  const hasStandard = standardAnswer != null;

  if (!hasStudent && !hasStandard) {
    return null;
  }

  const isSingleColumn = !hasStudent || !hasStandard;
  const styles = VARIANT_STYLES[studentVariant];
  const StudentIcon = styles.icon;
  const isMinimalist = variant === "minimalist";

  return (
    <div
      ref={ref}
      data-slot="answer-compare"
      className={cn(
        "grid gap-2",
        isSingleColumn ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
        className,
      )}
    >
      {/* Student Answer */}
      {hasStudent && (
        <div
          className={cn(
            "rounded-lg p-3 min-h-[60px]",
            isMinimalist ? styles.bg : cn(styles.border, styles.bg),
          )}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <StudentIcon className={cn("w-4 h-4", styles.iconColor)} />
            <span className={cn("text-xs font-medium", styles.labelColor)}>
              {styles.label}
            </span>
            {studentAnswer.confidence != null && studentAnswer.confidence < 0.7 && (
              <span className={cn("ml-auto text-xs", styles.iconColor, "flex items-center gap-0.5")}>
                <span role="img" aria-label="低置信度">⚠</span>
                置信度: {Math.round(studentAnswer.confidence * 100)}%
              </span>
            )}
          </div>
          <MarkdownRenderer content={studentAnswer.text} />
        </div>
      )}

      {/* Standard Answer */}
      {hasStandard && (
        <div
          className={cn(
            "rounded-lg p-3 min-h-[60px]",
            isMinimalist
              ? "bg-[var(--background-secondary)]"
              : "border-l-2 border-l-[var(--color-success)] border border-[var(--border-primary)] bg-[var(--background-secondary)]",
          )}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <CheckCircle className="w-4 h-4 text-[var(--color-success)]" />
            <span className="text-xs font-medium text-[var(--color-success)]">标准答案</span>
          </div>
          <MarkdownRenderer content={standardAnswer.text} />
        </div>
      )}
    </div>
  );
});

AnswerComparePanel.displayName = "AnswerComparePanel";
