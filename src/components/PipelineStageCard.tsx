import React from "react";
import { cn } from "../utils/cn";
import { StatusBadge, type PipelineStatus } from "./StatusBadge";
import { Clock } from "@gravity-ui/icons";

export interface PipelineStageCardProps extends React.ComponentProps<"div"> {
  /** Stage label */
  label: string;
  /** Stage description */
  description?: string;
  /** Stage order (1-based) */
  step: number;
  /** Current status */
  status?: PipelineStatus;
  /** Progress percentage (0-100) */
  progress?: number;
  /** Elapsed time string */
  elapsed?: string;
  /** Deemphasize when not active */
  dimmed?: boolean;
  /** Visual style variant */
  variant?: "default" | "minimalist";
}

export const PipelineStageCard = React.forwardRef<HTMLDivElement, PipelineStageCardProps>(
  (
    {
      label,
      description,
      step,
      status = "pending",
      progress,
      elapsed,
      dimmed = false,
      variant = "default",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isActive = status === "running";
    const isComplete = status === "completed";
    const isMinimalist = variant === "minimalist";

    return (
      <div
        ref={ref}
        data-slot="pipeline-stage"
        data-status={status}
        data-dimmed={dimmed || undefined}
        className={cn(
          "flex gap-3 rounded-(--radius-lg) p-3 transition-all",
          isMinimalist && "bg-(--background-primary)",
          !isMinimalist && isActive && "border border-(--interactive-accent) bg-(--background-hover) shadow-(--shadow-sm)",
          !isMinimalist && !isActive && "border border-(--border-primary) bg-(--background-primary)",
          dimmed && "opacity-50",
          className,
        )}
        {...props}
      >
        {/* Step indicator */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div
            className={cn(
              "size-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              isComplete && "bg-[var(--color-success)] text-[var(--text-inverse)]",
              isActive &&
                "bg-[var(--interactive-accent)] text-[var(--text-inverse)] animate-pulse",
              status === "failed" &&
                "bg-[var(--color-error)] text-[var(--text-inverse)]",
              status === "pending" && "bg-[var(--background-secondary)] text-[var(--interactive-accent-hover)]",
              status === "queued" && "bg-[var(--border-primary)] text-[var(--text-muted)]",
            )}
          >
            {isComplete ? "✓" : step}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-semibold", isActive && "text-(--interactive-accent)")}>
              {label}
            </span>
            <StatusBadge status={status} compact={!isActive} />
          </div>

          {description && <p className="text-xs text-(--text-muted) mt-0.5">{description}</p>}

          {/* Progress bar */}
          {progress !== undefined && isActive && (
            <div className="mt-2 h-1.5 rounded-full bg-(--background-tertiary)">
              <div
                className="h-full rounded-full bg-(--interactive-accent) transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}

          {/* Elapsed time */}
          {elapsed && (
            <p className="text-xs text-(--text-muted) mt-1 inline-flex items-center gap-1">
              <Clock className="size-3" />
              {elapsed}
            </p>
          )}

          {/* Children slot */}
          {children}
        </div>
      </div>
    );
  },
);
PipelineStageCard.displayName = "PipelineStageCard";
