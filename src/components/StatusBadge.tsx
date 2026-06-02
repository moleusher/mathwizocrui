import React from "react";
import { cn } from "../utils/cn";

// ── Types ──
export type PipelineStatus =
  // v0.1.1 已有 (保留向后兼容)
  | "pending"
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  // v0.2.0 新增 (Dashboard pipeline 细粒度状态)
  | "uploading"
  | "ocr"
  | "analyzing";

export interface StatusBadgeProps extends React.ComponentProps<"span"> {
  status: PipelineStatus;
  /** Show animated pulse for active states */
  pulse?: boolean;
  /** Compact: icon only, no label */
  compact?: boolean;
}

// ── Status config (using --color-* CSS variables) ──
const STATUS_CONFIG: Record<
  PipelineStatus,
  { label: string; base: string; dot: string; text: string }
> = {
  // v0.1.1 状态 — 迁移到 CSS 变量
  pending: {
    label: "待处理",
    base: "bg-[var(--color-warning)]/10 border-[var(--color-warning)]/20",
    dot: "bg-[var(--color-warning)]",
    text: "text-[var(--color-warning)]",
  },
  queued: {
    label: "排队中",
    base: "bg-[var(--color-surface)] border-[var(--color-border)]",
    dot: "bg-[var(--color-text-muted)]",
    text: "text-[var(--color-text-muted)]",
  },
  running: {
    label: "运行中",
    base: "bg-[var(--color-info)]/10 border-[var(--color-info)]/20",
    dot: "bg-[var(--color-info)]",
    text: "text-[var(--color-info)]",
  },
  completed: {
    label: "已完成",
    base: "bg-[var(--color-success)]/10 border-[var(--color-success)]/20",
    dot: "bg-[var(--color-success)]",
    text: "text-[var(--color-success)]",
  },
  failed: {
    label: "失败",
    base: "bg-[var(--color-error)]/10 border-[var(--color-error)]/20",
    dot: "bg-[var(--color-error)]",
    text: "text-[var(--color-error)]",
  },
  cancelled: {
    label: "已取消",
    base: "bg-[var(--color-surface)] border-[var(--color-border)]",
    dot: "bg-[var(--color-text-muted)]",
    text: "text-[var(--color-text-muted)]",
  },
  // v0.2.0 新增 — Dashboard pipeline 状态
  uploading: {
    label: "上传中",
    base: "bg-[var(--color-info)]/10 border-[var(--color-info)]/20",
    dot: "bg-[var(--color-info)]",
    text: "text-[var(--color-info)]",
  },
  ocr: {
    label: "识别中",
    base: "bg-[var(--color-brand-500)]/10 border-[var(--color-brand-500)]/20",
    dot: "bg-[var(--color-brand-500)]",
    text: "text-[var(--color-brand-500)]",
  },
  analyzing: {
    label: "分析中",
    base: "bg-[var(--color-brand-500)]/10 border-[var(--color-brand-500)]/20",
    dot: "bg-[var(--color-brand-500)]",
    text: "text-[var(--color-brand-500)]",
  },
};

// ── Component ──
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, pulse = false, compact = false, className, ...props }, ref) => {
    const config = STATUS_CONFIG[status];
    const isActive =
      status === "running" ||
      status === "pending" ||
      status === "uploading" ||
      status === "ocr" ||
      status === "analyzing";

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
            pulse && isActive && "animate-pulse motion-reduce:animate-none",
          )}
        />
        {!compact && config.label}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";
