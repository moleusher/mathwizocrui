import React, { useState } from "react";
import { cn } from "../utils/cn";

// ── Types ──
export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  /** Optional badge count */
  badge?: number;
  /** Disable this tab */
  disabled?: boolean;
}

export interface AnalysisTabsProps extends React.ComponentProps<"div"> {
  /** Tab definitions */
  tabs: Tab[];
  /** Active tab id (controlled) */
  activeTab?: string;
  /** Default active tab (uncontrolled) */
  defaultTab?: string;
  /** Called when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Tab list alignment: top (default) or left */
  orientation?: "horizontal" | "vertical";
}

export const AnalysisTabs = React.forwardRef<HTMLDivElement, AnalysisTabsProps>(
  (
    {
      tabs,
      activeTab: controlledTab,
      defaultTab,
      onTabChange,
      orientation = "horizontal",
      className,
      ...props
    },
    ref,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? "");
    const activeId = controlledTab ?? internalTab;

    const handleTabChange = (id: string) => {
      if (controlledTab === undefined) {
        setInternalTab(id);
      }
      onTabChange?.(id);
    };

    const active = tabs.find((t) => t.id === activeId);

    return (
      <div
        ref={ref}
        data-slot="analysis-tabs"
        data-orientation={orientation}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-row gap-4" : "flex-col gap-0",
          className,
        )}
        {...props}
      >
        {/* Tab list */}
        <div
          data-slot="analysis-tabs-list"
          className={cn(
            "flex gap-0.5",
            orientation === "horizontal"
              ? "flex-row border-b border-(--color-border)"
              : "flex-col border-r border-(--color-border) min-w-32",
          )}
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              role="tab"
              aria-selected={activeId === tab.id}
              disabled={tab.disabled}
              onClick={() => {
                handleTabChange(tab.id);
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                orientation === "horizontal"
                  ? cn(
                      "border-b-2 -mb-px",
                      activeId === tab.id
                        ? "border-(--color-primary) text-(--color-primary)"
                        : "border-transparent text-(--color-text-muted) hover:text-(--color-text)",
                    )
                  : cn(
                      "border-r-2 -mr-px text-left",
                      activeId === tab.id
                        ? "border-(--color-primary) text-(--color-primary) bg-(--color-brand-50)"
                        : "border-transparent text-(--color-text-muted) hover:text-(--color-text)",
                    ),
              )}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="inline-flex items-center justify-center size-4 rounded-full bg-(--color-brand-100) text-(--color-brand-700) text-[10px] font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div data-slot="analysis-tabs-panel" role="tabpanel" className="flex-1 pt-3">
          {active?.content}
        </div>
      </div>
    );
  },
);
AnalysisTabs.displayName = "AnalysisTabs";
