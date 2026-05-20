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
  className?: string;
}

const STEPS_ID = "solution-steps-content";

export const SolutionStepsPanel: React.FC<SolutionStepsPanelProps> = ({
  steps,
  maxHeight = 200,
  defaultExpanded = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (steps.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <Lightbulb className="w-4 h-4 text-[var(--color-primary)]" />
        <span className="text-xs font-medium text-[var(--color-text-muted)]">
          解题步骤
        </span>
      </div>

      {/* Steps content */}
      <div
        id={STEPS_ID}
        className="relative"
        style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px`, overflow: "hidden" }}
      >
        <ol className="list-decimal pl-5 space-y-2">
          {steps.map((step) => (
            <li key={step.step} className="text-sm text-[var(--color-text)]">
              <MarkdownRenderer content={step.content} />
            </li>
          ))}
        </ol>

        {/* Gradient mask overlay — only when collapsed */}
        {!isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{
              background: "linear-gradient(to top, var(--color-surface) 0%, transparent 100%)",
            }}
          />
        )}
      </div>

      {/* Toggle */}
      <div className="flex justify-center mt-1">
        <ExpandToggle
          isExpanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          controlsId={STEPS_ID}
        />
      </div>
    </div>
  );
};

SolutionStepsPanel.displayName = "SolutionStepsPanel";
