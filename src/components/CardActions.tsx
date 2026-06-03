import React from "react";
import { cn } from "../utils/cn";

/** @deprecated Use ProjectCard's Dropdown actions instead. */
export interface CardActionsProps extends React.ComponentProps<"span"> {
  onViewProgress: () => void;
  label?: string;
  visible?: boolean;
}

/** @deprecated Use ProjectCard's Dropdown actions instead. */
export const CardActions = React.forwardRef<HTMLSpanElement, CardActionsProps>(
  ({ onViewProgress, label = "查看进度 →", visible = true, className, ...props }, ref) => {
    if (!visible) {
      return null;
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onViewProgress();
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onViewProgress();
    };

    return (
      <span
        ref={ref}
        role="button"
        tabIndex={0}
        data-slot="card-actions"
        className={cn(
          "cursor-pointer text-xs font-medium",
          "text-[var(--interactive-accent)] hover:text-[var(--interactive-accent-hover)]",
          "transition-colors duration-200",
          className,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {label}
      </span>
    );
  },
);
CardActions.displayName = "CardActions";
