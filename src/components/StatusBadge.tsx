import React from "react";
import { cn } from "../utils/cn";

// ── Types ──
export type PipelineStatus =
  | "pending"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export interface StatusBadgeProps extends React.ComponentProps<"span"> {
  status: PipelineStatus;
  /** Show animated pulse for active states */
  pulse?: boolean;
  /** Compact: icon only, no label */
  compact?: boolean;
}

// ── Status config ──
const statusConfig: Record<
  PipelineStatus,
  { label: string; base: string; dot: string; text: string }
> = {
  pending: {
    label: "Pending",
    base: "bg-amber-50 border-amber-200",
    dot: "bg-amber-400",
    text: "text-amber-700",
  },
  queued: {
    label: "Queued",
    base: "bg-slate-50 border-slate-200",
    dot: "bg-slate-400",
    text: "text-slate-600",
  },
  running: {
    label: "Running",
    base: "bg-sky-50 border-sky-200",
    dot: "bg-sky-500",
    text: "text-sky-700",
  },
  completed: {
    label: "Complete",
    base: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
  },
  failed: {
    label: "Failed",
    base: "bg-red-50 border-red-200",
    dot: "bg-red-500",
    text: "text-red-700",
  },
  cancelled: {
    label: "Cancelled",
    base: "bg-gray-50 border-gray-200",
    dot: "bg-gray-400",
    text: "text-gray-500",
  },
};

// ── Component ──
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, pulse = false, compact = false, className, ...props }, ref) => {
    const config = statusConfig[status];
    const isActive = status === "running" || status === "pending";

    return (
      <span
        ref={ref}
        data-slot="status-badge"
        data-status={status}
        data-compact={compact || undefined}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
          config.base,
          config.text,
          compact && "px-1.5 gap-0",
          className,
        )}
        title={compact ? config.label : undefined}
        {...props}
      >
        <span
          data-slot="status-badge-dot"
          className={cn(
            "size-1.5 rounded-full",
            config.dot,
            pulse && isActive && "animate-pulse",
          )}
        />
        {!compact && config.label}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";
