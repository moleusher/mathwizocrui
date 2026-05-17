import React from "react";
import { cn } from "../utils/cn";

export interface IntentActionsProps extends React.ComponentProps<"div"> {
  intent: string;
  hasPrompt: boolean;
  isAnalyzing: boolean;
  isFailed: boolean;
  error?: string;
  onStartAnalysis: () => void;
  onViewPrompt?: () => void;
  onReanalyze?: () => void;
}

export const IntentActions = React.forwardRef<HTMLDivElement, IntentActionsProps>(
  (
    {
      intent: _intent,
      hasPrompt,
      isAnalyzing,
      isFailed,
      error,
      onStartAnalysis,
      onViewPrompt,
      onReanalyze,
      className,
      ...props
    },
    ref,
  ) => {
    const dataState = isFailed
      ? "failed"
      : isAnalyzing
        ? "analyzing"
        : hasPrompt
          ? "completed"
          : "idle";

    const renderState = () => {
      if (isFailed) {
        return (
          <div className="flex flex-col gap-3">
            {error && (
              <div className="p-3 rounded-md text-sm bg-[var(--color-error)]/10 border border-[var(--color-error)] text-[var(--color-error)]">
                {error}
              </div>
            )}
            <button
              type="button"
              onClick={onReanalyze}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                bg-[var(--color-error)]/10 text-[var(--color-error)] hover:bg-[var(--color-error)]/20
                transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-brand-500)]"
            >
              重新分析
            </button>
          </div>
        );
      }

      if (isAnalyzing) {
        return (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <span className="inline-block w-4 h-4 border-2 border-[var(--color-border)] border-t-[var(--color-brand-500)] rounded-full animate-spin" />
              分析中...
            </div>
            <div className="w-full h-1 rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--color-brand-500)] animate-pulse w-2/3" />
            </div>
          </div>
        );
      }

      if (hasPrompt) {
        return (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onViewPrompt}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                bg-[var(--color-brand-500)] text-[var(--color-bg)]
                hover:bg-[var(--color-brand-700)] transition-colors duration-200
                focus-visible:outline-2 focus-visible:outline-[var(--color-brand-500)]"
            >
              查看提示词
            </button>
            <button
              type="button"
              onClick={onReanalyze}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                border border-[var(--color-border)] text-[var(--color-text)]
                hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-500)]
                transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-brand-500)]"
            >
              重新分析
            </button>
          </div>
        );
      }

      return (
        <button
          type="button"
          data-state="idle"
          onClick={onStartAnalysis}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium
            bg-[var(--color-brand-500)] text-[var(--color-bg)]
            hover:bg-[var(--color-brand-700)] transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-[var(--color-brand-500)]"
        >
          开始分析
        </button>
      );
    };

    return (
      <div
        ref={ref}
        data-slot="intent-actions"
        data-state={dataState}
        className={cn("mt-4", className)}
        {...props}
      >
        {renderState()}
      </div>
    );
  },
);
IntentActions.displayName = "IntentActions";
