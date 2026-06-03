import React from "react";
import { cn } from "../utils/cn";

export type MathButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type MathButtonSize = "sm" | "md" | "lg" | "icon";

export interface MathButtonProps extends React.ComponentProps<"button"> {
  /** Visual variant */
  variant?: MathButtonVariant;
  /** Size preset */
  size?: MathButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon before text */
  iconLeft?: React.ReactNode;
  /** Icon after text */
  iconRight?: React.ReactNode;
}

const variantStyles: Record<MathButtonVariant, string> = {
  primary:
    "bg-(--interactive-accent) text-(--text-inverse) hover:brightness-90 active:brightness-75",
  secondary:
    "bg-(--background-secondary) text-(--interactive-accent-hover) hover:bg-(--background-tertiary) active:bg-(--background-tertiary)",
  outline:
    "border border-(--border-primary) bg-transparent hover:bg-(--background-hover) active:bg-(--background-secondary)",
  ghost: "bg-transparent hover:bg-(--background-hover) active:bg-(--background-secondary)",
  destructive: "bg-[var(--color-error)] text-white hover:opacity-90 active:opacity-80",
};

const sizeStyles: Record<MathButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-(--radius-sm)",
  md: "h-9 px-4 text-sm gap-2 rounded-(--radius-md)",
  lg: "h-11 px-6 text-base gap-2.5 rounded-(--radius-lg)",
  icon: "size-9 rounded-(--radius-md)",
};

export const MathButton = React.forwardRef<HTMLButtonElement, MathButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      iconLeft,
      iconRight,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        data-slot="math-button"
        data-variant={variant}
        data-size={size}
        data-loading={loading ? "" : undefined}
        disabled={disabled || loading} // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
        className={cn(
          // Base
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--interactive-accent)",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variant + Size
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? <SpinnerIcon className="size-4 animate-spin" /> : iconLeft}
        {children}
        {iconRight}
      </button>
    );
  },
);

MathButton.displayName = "MathButton";

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
