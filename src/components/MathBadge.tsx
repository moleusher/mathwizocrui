import React from "react";
import { cn } from "../utils/cn";

export type MathBadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type MathBadgeSize = "sm" | "md";

export interface MathBadgeProps extends React.ComponentProps<"span"> {
  variant?: MathBadgeVariant;
  size?: MathBadgeSize;
  /** Optional dot indicator before text */
  dot?: boolean;
}

// ── Variant styles using --color-* CSS variables ──
const variantStyles: Record<MathBadgeVariant, string> = {
  default: "bg-[var(--interactive-accent)]/10 text-[var(--interactive-accent)]",
  success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  error: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
  info: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
};

const dotColors: Record<MathBadgeVariant, string> = {
  default: "bg-[var(--interactive-accent)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  error: "bg-[var(--color-error)]",
  info: "bg-[var(--color-info)]",
};

const sizeStyles: Record<MathBadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export const MathBadge = React.forwardRef<HTMLSpanElement, MathBadgeProps>(
  ({ variant = "default", size = "md", dot = false, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="math-badge"
        data-variant={variant}
        data-size={size}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-full",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {dot && <span className={cn("size-1.5 rounded-full", dotColors[variant])} />}
        {children}
      </span>
    );
  },
);

MathBadge.displayName = "MathBadge";
