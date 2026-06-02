import React from "react";
import { X, PanelLeftOpen } from "lucide-react";
import { cn } from "../utils/cn";
import { RibbonButton } from "./RibbonButton";

// ── Media query hook ──

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ── Types ──

export interface SidebarTab {
  key: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
  badge?: number | string;
}

export interface SidebarContainerProps {
  /** Whether sidebar is collapsed (ribbon-only vs expanded) */
  collapsed: boolean;
  /** Toggle collapse/expand */
  onToggleCollapse: () => void;
  /** Tab definitions */
  tabs: SidebarTab[];
  /** Currently active tab key */
  activeTab: string;
  /** Tab switch callback */
  onTabChange: (tabKey: string) => void;
  /** Sidebar width in px when expanded on large screens (default 280) */
  width?: number;
  className?: string;
}

// ── Constants ──

const RIBBON_WIDTH = 48;

// ── Component ──

export const SidebarContainer = React.forwardRef<HTMLDivElement, SidebarContainerProps>(
  (
    {
      collapsed,
      onToggleCollapse,
      tabs,
      activeTab,
      onTabChange,
      width = 280,
      className,
    },
    ref,
  ) => {
    const isLg = useMediaQuery("(min-width: 1024px)");
    const isMd = useMediaQuery("(min-width: 768px)");
    const isSm = useMediaQuery("(max-width: 767px)");

    // Determine expanded width based on viewport
    const expandedWidth = (() => {
      if (isSm) return "85vw";
      if (isMd && !isLg) return 240;
      return width;
    })();

    // Determine collapsed rendering
    const collapsedShowRibbon = collapsed && isLg;
    const collapsedHidden = collapsed && !isLg;
    const isOverlay = !collapsed && isSm;

    // Handle ribbon button click: expand sidebar + switch tab
    const handleRibbonClick = (tabKey: string) => {
      onTabChange(tabKey);
      onToggleCollapse();
    };

    const activeTabDef = tabs.find((t) => t.key === activeTab);

    return (
      <>
        {/* ── Sidebar ── */}
        <aside
          ref={ref}
          data-slot="sidebar-container"
          data-collapsed={collapsed || undefined}
          className={cn(
            "flex-shrink-0 overflow-hidden bg-(--color-surface) border-r border-(--color-border-light)",
            "transition-[width] duration-200 ease-out",
            // Overlay on mobile when expanded
            isOverlay &&
              "fixed top-0 left-0 z-40 h-screen",
            // Responsive hidden
            collapsedHidden && "w-0 border-r-0",
            className,
          )}
          style={{
            width: collapsed
              ? collapsedShowRibbon
                ? RIBBON_WIDTH
                : 0
              : typeof expandedWidth === "number"
                ? expandedWidth
                : expandedWidth,
          }}
        >
          {/* ── Collapsed ribbon (lg only) ── */}
          {collapsedShowRibbon && (
            <div
              data-slot="sidebar-ribbon"
              className="flex flex-col items-center py-2 gap-1 w-12 border-r border-(--color-border-light) bg-(--color-bg-secondary)"
            >
              {tabs.map((tab) => (
                <RibbonButton
                  key={tab.key}
                  icon={tab.icon}
                  label={tab.label}
                  active={tab.key === activeTab}
                  badge={tab.badge}
                  onClick={() => {
                    handleRibbonClick(tab.key);
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Expanded panel ── */}
          {!collapsed && (
            <div data-slot="sidebar-panel" className="flex flex-col h-full">
              {/* TabBar */}
              <div
                data-slot="sidebar-tabbar"
                className="flex items-center h-10 border-b border-(--color-border-light) shrink-0"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={tab.key === activeTab}
                    onClick={() => {
                      onTabChange(tab.key);
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 h-full text-sm font-medium",
                      "transition-colors duration-150 ease-out",
                      "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-(--color-primary)/30",
                      tab.key === activeTab
                        ? "text-(--color-primary) shadow-[inset_0_-2px_0_0_var(--color-primary)]"
                        : "text-(--color-text-secondary) hover:text-(--color-text)",
                    )}
                  >
                    <span className="size-4 flex items-center justify-center" aria-hidden="true">
                      {tab.icon}
                    </span>
                    <span className="truncate max-w-20">{tab.label}</span>
                    {tab.badge !== undefined &&
                      tab.badge !== null &&
                      !(typeof tab.badge === "number" && tab.badge <= 0) && (
                        <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-(--color-error)/10 text-(--color-error) text-[10px] font-semibold leading-none">
                          {tab.badge}
                        </span>
                      )}
                  </button>
                ))}

                {/* Close button */}
                <button
                  type="button"
                  data-slot="sidebar-collapse-button"
                  onClick={onToggleCollapse}
                  aria-label="折叠侧栏"
                  className={cn(
                    "flex items-center justify-center size-8 mr-1 shrink-0 rounded-(--radius-sm)",
                    "text-(--color-text-secondary) hover:bg-(--color-surface-hover) hover:text-(--color-text)",
                    "transition-colors duration-150",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)/30",
                  )}
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* TabPanel */}
              <div
                data-slot="sidebar-tabpanel"
                role="tabpanel"
                className="flex-1 overflow-auto opacity-100 transition-opacity duration-200"
              >
                {activeTabDef?.content}
              </div>
            </div>
          )}
        </aside>

        {/* ── Overlay backdrop (mobile only) ── */}
        {isOverlay && (
          <div
            data-slot="sidebar-backdrop"
            className="fixed inset-0 z-30 bg-black/30"
            onClick={onToggleCollapse}
            aria-hidden="true"
          />
        )}

        {/* ── Floating expand button (md/sm, collapsed) ── */}
        {collapsedHidden && (
          <button
            type="button"
            data-slot="sidebar-expand-button"
            onClick={onToggleCollapse}
            aria-label="展开侧栏"
            className={cn(
              "fixed top-4 left-2 z-20 flex items-center justify-center",
              "size-8 rounded-(--radius-sm) bg-(--color-surface) border border-(--color-border-light)",
              "text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-surface-hover)",
              "transition-colors duration-150 shadow-(--shadow-sm)",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary)/30",
            )}
          >
            <PanelLeftOpen className="size-4" />
          </button>
        )}
      </>
    );
  },
);
SidebarContainer.displayName = "SidebarContainer";
