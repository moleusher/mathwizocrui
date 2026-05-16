import React from "react";
import { cn } from "../utils/cn";
import { EmptyStateRoot, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription } from "./EmptyState";

export interface QuestionListProps extends React.ComponentProps<"div"> {
  /** Empty state shown when no questions */
  emptyTitle?: string;
  emptyDescription?: string;
  /** Total count badge */
  total?: number;
}

export const QuestionList = React.forwardRef<HTMLDivElement, QuestionListProps>(
  (
    {
      emptyTitle = "No questions found",
      emptyDescription = "Upload a document to begin analysis.",
      total,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const childCount = React.Children.count(children);

    if (childCount === 0) {
      return (
        <EmptyStateRoot>
          <EmptyStateIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </EmptyStateIcon>
          <EmptyStateTitle>{emptyTitle}</EmptyStateTitle>
          <EmptyStateDescription>{emptyDescription}</EmptyStateDescription>
        </EmptyStateRoot>
      );
    }

    return (
      <div ref={ref} data-slot="question-list" className={cn("space-y-2", className)} {...props}>
        {total !== undefined && (
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-xs font-medium text-(--color-text-muted)">
              {total} question{total !== 1 ? "s" : ""}
            </span>
          </div>
        )}
        {children}
      </div>
    );
  },
);
QuestionList.displayName = "QuestionList";
