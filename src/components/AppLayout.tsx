import React from "react";
import { cn } from "../utils/cn";
import { TopBar } from "./TopBar";

export interface AppLayoutProps extends React.ComponentProps<"div"> {
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Top bar content (simplified: just pass children) */
  topBar?: React.ReactNode;
  /** Whether sidebar is collapsed */
  sidebarCollapsed?: boolean;
  /** Sidebar width in px when expanded */
  sidebarWidth?: number;
}

export const AppLayout = React.forwardRef<HTMLDivElement, AppLayoutProps>(
  (
    {
      sidebar,
      topBar,
      sidebarCollapsed = false,
      sidebarWidth = 240,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="app-layout"
        className={cn("flex h-screen overflow-hidden bg-(--color-surface)", className)}
        {...props}
      >
        {/* Sidebar */}
        {sidebar && (
          <aside
            data-slot="app-sidebar"
            data-collapsed={sidebarCollapsed || undefined}
            className={cn(
              "flex-shrink-0 border-r border-(--color-border) bg-(--color-surface) transition-all duration-200 overflow-hidden",
              sidebarCollapsed ? "w-0" : "",
            )}
            style={{ width: sidebarCollapsed ? 0 : sidebarWidth }}
          >
            {sidebar}
          </aside>
        )}

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0">
          {topBar}
          <main
            data-slot="app-content"
            className="flex-1 overflow-auto"
          >
            {children}
          </main>
        </div>
      </div>
    );
  },
);
AppLayout.displayName = "AppLayout";
