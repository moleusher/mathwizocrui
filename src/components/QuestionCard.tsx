import React from "react";
import { cn } from "../utils/cn";
import { StatusBadge, type PipelineStatus } from "./StatusBadge";

// ── Score breakdown ──
export interface ScoreDimension {
  label: string;
  score: number;
  maxScore: number;
}

export interface QuestionCardProps extends React.ComponentProps<"div"> {
  /** Question number */
  number: number;
  /** Question text */
  text: string;
  /** Overall status */
  status?: PipelineStatus;
  /** Score dimensions */
  dimensions?: ScoreDimension[];
  /** Total score (displayed if dimensions provided) */
  totalScore?: number;
  maxScore?: number;
  /** Expand state */
  defaultExpanded?: boolean;
  /** Actions slot */
  actions?: React.ReactNode;
}

export const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  (
    {
      number,
      text,
      status,
      dimensions,
      totalScore,
      maxScore,
      defaultExpanded = false,
      actions,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);

    return (
      <div
        ref={ref}
        data-slot="question-card"
        data-expanded={expanded || undefined}
        data-status={status}
        className={cn(
          "rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface)",
          "transition-shadow hover:shadow-(--shadow-sm)",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="flex-shrink-0 size-7 rounded-full bg-(--color-brand-100) text-(--color-brand-700) text-xs font-bold flex items-center justify-center">
            {number}
          </span>

          <span className="flex-1 text-sm font-medium text-(--color-text) line-clamp-2">
            {text}
          </span>

          <div className="flex items-center gap-2">
            {totalScore !== undefined && maxScore && (
              <span
                className={cn(
                  "text-xs font-mono font-semibold",
                  totalScore === maxScore
                    ? "text-[var(--color-success)]"
                    : totalScore >= maxScore * 0.6
                      ? "text-[var(--color-warning)]"
                      : "text-[var(--color-error)]",
                )}
              >
                {totalScore}/{maxScore}
              </span>
            )}
            {status && <StatusBadge status={status} />}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={cn(
                "text-(--color-text-muted) transition-transform",
                expanded && "rotate-180",
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="px-4 pb-4 border-t border-(--color-border) pt-3 space-y-3">
            {/* Score dimensions */}
            {dimensions && dimensions.length > 0 && (
              <div className="space-y-2">
                {dimensions.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-(--color-text-muted) w-24 flex-shrink-0">
                      {d.label}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-(--color-brand-100)">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          d.score === d.maxScore
                            ? "bg-[var(--color-success)]"
                            : d.score > 0
                              ? "bg-[var(--color-primary)]"
                              : "bg-[var(--color-error)]",
                        )}
                        style={{ width: `${(d.score / Math.max(d.maxScore, 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-(--color-text-muted) w-12 text-right">
                      {d.score}/{d.maxScore}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Content slot */}
            {children}

            {/* Actions */}
            {actions && (
              <div className="flex items-center gap-2 pt-2">{actions}</div>
            )}
          </div>
        )}
      </div>
    );
  },
);
QuestionCard.displayName = "QuestionCard";
