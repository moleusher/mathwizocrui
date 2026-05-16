import React from "react";
import { cn } from "../utils/cn";

// ── Root ──
export interface EmptyStateRootProps extends React.ComponentProps<"div"> {
  /** Optional icon/illustration slot */
  icon?: React.ReactNode;
  /** Centered layout (default) vs left-aligned */
  align?: "center" | "left";
}

export const EmptyStateRoot = React.forwardRef<HTMLDivElement, EmptyStateRootProps>(
  ({ icon, align = "center", children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-state"
        data-align={align}
        role="status"
        className={cn(
          "flex flex-col gap-4 p-8",
          align === "center" && "items-center text-center",
          align === "left" && "items-start",
          className,
        )}
        {...props}
      >
        {icon}
        {children}
      </div>
    );
  },
);
EmptyStateRoot.displayName = "EmptyStateRoot";

// ── Icon ──
export interface EmptyStateIconProps extends React.ComponentProps<"div"> {}

export const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-state-icon"
        className={cn(
          "flex items-center justify-center size-16 rounded-full",
          "bg-(--color-brand-100) text-(--color-brand-500)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
EmptyStateIcon.displayName = "EmptyStateIcon";

// ── Title ──
export interface EmptyStateTitleProps extends React.ComponentProps<"h3"> {}

export const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        data-slot="empty-state-title"
        className={cn("text-lg font-semibold text-(--color-text)", className)}
        {...props}
      >
        {children}
      </h3>
    );
  },
);
EmptyStateTitle.displayName = "EmptyStateTitle";

// ── Description ──
export interface EmptyStateDescriptionProps extends React.ComponentProps<"p"> {}

export const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  EmptyStateDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="empty-state-description"
      className={cn("text-sm text-(--color-text-muted) max-w-md", className)}
      {...props}
    >
      {children}
    </p>
  );
});
EmptyStateDescription.displayName = "EmptyStateDescription";

// ── Action ──
export interface EmptyStateActionProps extends React.ComponentProps<"div"> {}

export const EmptyStateAction = React.forwardRef<HTMLDivElement, EmptyStateActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-state-action"
        className={cn("flex items-center gap-3 mt-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
EmptyStateAction.displayName = "EmptyStateAction";
