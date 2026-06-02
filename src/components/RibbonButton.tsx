import React from "react";
import { cn } from "../utils/cn";

export interface RibbonButtonProps {
  /** Icon element (Lucide icon preferred) */
  icon: React.ReactNode;
  /** Tooltip / aria-label text */
  label: string;
  /** Whether this ribbon button is the active tab */
  active?: boolean;
  /**
   * Badge indicator:
   * - number > 0 → red badge with count
   * - non-empty string → red badge with text (e.g. "99+")
   * - empty string "" → 6px red dot indicator
   * - undefined / 0 → hidden
   */
  badge?: number | string;
  /** Click handler */
  onClick: () => void;
}

export const RibbonButton = React.forwardRef<HTMLButtonElement, RibbonButtonProps>(
  ({ icon, label, active = false, badge, onClick }, ref) => {
    const isDot = badge === "";
    const showBadge =
      badge !== undefined &&
      badge !== null &&
      !(typeof badge === "number" && badge <= 0);

    return (
      <button
        ref={ref}
        type="button"
        data-slot="ribbon-button"
        data-active={active || undefined}
        onClick={onClick}
        aria-label={label}
        title={label}
        className={cn(
          // 48×48px fixed touch target
          "relative flex items-center justify-center size-12 flex-shrink-0",
          "transition-colors duration-150 ease-out",
          // Default state
          "bg-transparent text-(--color-text-secondary)",
          // Hover state
          "hover:bg-(--color-surface-hover) hover:text-(--color-text)",
          // Active state — accent/10 bg + 3px accent left bar
          active &&
            "bg-(--color-accent)/10 text-(--color-accent) shadow-[inset_3px_0_0_0_var(--color-accent)]",
          // Focus-visible: use outline to avoid conflict with active inset shadow
          "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--color-primary)/30",
          "focus-visible:z-10",
          "select-none",
        )}
      >
        {/* Icon container — 20px */}
        <span className="size-5 flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>

        {/* Badge — top-right */}
        {showBadge && (
          <span
            data-slot="ribbon-button-badge"
            className={cn(
              "absolute -top-0.5 -right-0.5 flex items-center justify-center pointer-events-none",
              // Red dot variant
              isDot && "size-[6px] rounded-full bg-(--color-error)",
              // Count/text variant
              !isDot &&
                "min-w-[18px] h-[18px] px-1 rounded-full bg-(--color-error) text-white text-[10px] font-semibold leading-none",
            )}
          >
            {!isDot && String(badge)}
          </span>
        )}
      </button>
    );
  },
);
RibbonButton.displayName = "RibbonButton";
