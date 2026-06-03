import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { ExpandToggle } from "./ExpandToggle";
import type { SolutionStep } from "../types/question";

export interface SolutionStepsPanelProps {
  steps: SolutionStep[];
  maxHeight?: number;
  defaultExpanded?: boolean;
  variant?: "default" | "timeline" | "minimalist";
  className?: string;
}

const STEPS_ID = "solution-steps-content";

function getDotColor(index: number, total: number): string {
  if (index === 0) return "var(--interactive-accent)";
  if (index === total - 1) return "var(--color-success)";
  return "var(--color-info)";
}

export const SolutionStepsPanel = React.forwardRef<HTMLDivElement, SolutionStepsPanelProps>(({
  steps,
  maxHeight = 200,
  defaultExpanded = false,
  variant = "default",
  className,
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isTimeline = variant === "timeline";
  const isMinimalist = variant === "minimalist";

  if (steps.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      data-slot="solution-steps"
      className={cn(
        "rounded-lg p-3",
        !isMinimalist && "border border-[var(--border-primary)] bg-[var(--background-secondary)]",
        isMinimalist && "bg-[var(--background-secondary)]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <Lightbulb className="w-4 h-4 text-[var(--interactive-accent)]" />
        <span className="text-xs font-medium text-[var(--text-muted)]">解题步骤</span>
      </div>

      {/* Steps content */}
      <div
        id={!isTimeline ? STEPS_ID : undefined}
        className={cn(!isTimeline && "relative")}
        style={
          !isTimeline
            ? { maxHeight: isExpanded ? "none" : `${maxHeight}px`, overflow: "hidden" }
            : undefined
        }
      >
        {isTimeline ? (
          <div className="space-y-0">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const dotColor = getDotColor(index, steps.length);

              return (
                <div key={step.step} className="flex gap-3">
                  {/* Timeline indicator: dot + connecting line */}
                  <div className="flex flex-col items-center">
                    <div
                      data-timeline-dot
                      className="w-3 h-3 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: dotColor }}
                    />
                    {!isLast && (
                      <div
                        data-timeline-line
                        className="w-0.5 flex-1 min-h-4"
                        style={{ backgroundColor: "var(--border-primary)" }}
                      />
                    )}
                  </div>
                  {/* Step content */}
                  <div className={cn("pb-6 flex-1", isLast && "pb-0")}>
                    <div className="text-sm text-[var(--text-primary)]">
                      <MarkdownRenderer content={step.content} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <ol className="list-decimal pl-5 space-y-2">
              {steps.map((step) => (
                <li key={step.step} className="text-sm text-[var(--text-primary)]">
                  <MarkdownRenderer content={step.content} />
                </li>
              ))}
            </ol>

            {/* Gradient mask overlay — only when collapsed */}
            {!isExpanded && (
              <div
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, var(--background-primary) 0%, transparent 100%)",
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Expand/collapse toggle — only for non-timeline */}
      {!isTimeline && (
        <div className="flex justify-center mt-1">
          <ExpandToggle
            isExpanded={isExpanded}
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            controlsId={STEPS_ID}
          />
        </div>
      )}
    </div>
  );
});

SolutionStepsPanel.displayName = "SolutionStepsPanel";
