import React from "react";
import { cn } from "../utils/cn";
import { StatusBadge, type PipelineStatus } from "./StatusBadge";

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
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isActive = status === "running";
    const isComplete = status === "completed";

    return (
      <div
        ref={ref}
        data-slot="pipeline-stage"
        data-status={status}
        data-dimmed={dimmed || undefined}
        className={cn(
          "flex gap-3 rounded-(--radius-lg) border p-3 transition-all",
          isActive && "border-(--color-primary) bg-(--color-brand-50) shadow-(--shadow-sm)",
          !isActive && "border-(--color-border) bg-(--color-surface)",
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
              isComplete && "bg-emerald-500 text-white",
              isActive && "bg-(--color-primary) text-white animate-pulse",
              status === "failed" && "bg-red-500 text-white",
              status === "pending" && "bg-(--color-brand-100) text-(--color-brand-700)",
              status === "queued" && "bg-slate-200 text-slate-600",
            )}
          >
            {isComplete ? "✓" : step}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-semibold", isActive && "text-(--color-primary)")}>
              {label}
            </span>
            <StatusBadge status={status} compact={!isActive} />
          </div>

          {description && (
            <p className="text-xs text-(--color-text-muted) mt-0.5">{description}</p>
          )}

          {/* Progress bar */}
          {progress !== undefined && isActive && (
            <div className="mt-2 h-1.5 rounded-full bg-(--color-brand-200)">
              <div
                className="h-full rounded-full bg-(--color-primary) transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}

          {/* Elapsed time */}
          {elapsed && (
            <p className="text-xs text-(--color-text-muted) mt-1">⏱ {elapsed}</p>
          )}

          {/* Children slot */}
          {children}
        </div>
      </div>
    );
  },
);
PipelineStageCard.displayName = "PipelineStageCard";
