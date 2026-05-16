import React from "react";
import { cn } from "../utils/cn";

export interface TopBarProps extends React.ComponentProps<"header"> {
  /** Left slot (breadcrumb / back button) */
  left?: React.ReactNode;
  /** Center slot (title) */
  center?: React.ReactNode;
  /** Right slot (actions) */
  right?: React.ReactNode;
}

export const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  ({ left, center, right, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        data-slot="top-bar"
        className={cn(
          "flex items-center justify-between h-14 px-4 border-b border-(--color-border) bg-(--color-surface)",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">{left}</div>
        <div className="flex items-center justify-center flex-shrink">{center}</div>
        <div className="flex items-center gap-2 justify-end flex-1">{right}</div>
      </header>
    );
  },
);
TopBar.displayName = "TopBar";
