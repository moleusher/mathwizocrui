import React from "react";
import { cn } from "../utils/cn";

export interface ImagePaginationProps extends React.ComponentProps<"div"> {
  /** Current page number (1-based) */
  current: number;
  /** Total number of pages */
  total: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Show first/last buttons */
  showEdges?: boolean;
  /** Show page numbers */
  showNumbers?: boolean;
}

export const ImagePagination = React.forwardRef<HTMLDivElement, ImagePaginationProps>(
  (
    { current, total, onPageChange, showEdges = true, showNumbers = true, className, ...props },
    ref,
  ) => {
    if (total <= 1) {
      return null;
    }

    const pages: (number | "…")[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push("…");
      }
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push("…");
      }
      pages.push(total);
    }

    const btnClass =
      "size-9 flex items-center justify-center rounded-(--radius-sm) text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-default";

    return (
      <div
        ref={ref}
        data-slot="image-pagination"
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {showEdges && (
          <button
            type="button"
            className={cn(btnClass, "hover:bg-(--background-hover) text-(--text-muted)")}
            disabled={current === 1}
            onClick={() => {
              onPageChange(1);
            }}
            aria-label="First page"
          >
            «
          </button>
        )}

        <button
          type="button"
          className={cn(btnClass, "hover:bg-(--background-hover) text-(--text-primary)")}
          disabled={current === 1}
          onClick={() => {
            onPageChange(current - 1);
          }}
          aria-label="Previous page"
        >
          ‹
        </button>

        {showNumbers &&
          pages.map((p, i) =>
            p === "…" ? (
              <span
                key={`dots-${i}`}
                className="size-8 flex items-center justify-center text-(--text-muted) text-sm"
              >
                …
              </span>
            ) : (
              <button
                type="button"
                key={p}
                className={cn(
                  btnClass,
                  p === current
                    ? "bg-(--interactive-accent) text-(--text-inverse)"
                    : "hover:bg-(--background-hover) text-(--text-primary)",
                )}
                onClick={() => {
                  onPageChange(p);
                }}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            ),
          )}

        <button
          type="button"
          className={cn(btnClass, "hover:bg-(--background-hover) text-(--text-primary)")}
          disabled={current === total}
          onClick={() => {
            onPageChange(current + 1);
          }}
          aria-label="Next page"
        >
          ›
        </button>

        {showEdges && (
          <button
            type="button"
            className={cn(btnClass, "hover:bg-(--background-hover) text-(--text-muted)")}
            disabled={current === total}
            onClick={() => {
              onPageChange(total);
            }}
            aria-label="Last page"
          >
            »
          </button>
        )}

        <span className="ml-2 text-xs text-(--text-muted)">
          {current} / {total}
        </span>
      </div>
    );
  },
);
ImagePagination.displayName = "ImagePagination";
