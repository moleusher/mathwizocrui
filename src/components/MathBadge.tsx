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

const variantStyles: Record<MathBadgeVariant, string> = {
  default: "bg-(--color-brand-100) text-(--color-brand-700)",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-700",
};

const dotColors: Record<MathBadgeVariant, string> = {
  default: "bg-(--color-brand-500)",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-sky-500",
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
