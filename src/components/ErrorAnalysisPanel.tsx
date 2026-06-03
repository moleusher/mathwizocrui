import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../utils/cn";
import { ExpandToggle } from "./ExpandToggle";
import type { ErrorAnalysis } from "../types/question";

export interface ErrorAnalysisPanelProps {
  analysis: ErrorAnalysis;
  /** Visual style variant */
  variant?: "default" | "minimalist";
  maxHeight?: number;
  defaultExpanded?: boolean;
  className?: string;
}

const ANALYSIS_ID = "error-analysis-content";

export const ErrorAnalysisPanel: React.FC<ErrorAnalysisPanelProps> = ({
  analysis,
  variant = "default",
  maxHeight = 150,
  defaultExpanded = true,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isMinimalist = variant === "minimalist";

  return (
    <div
      className={cn(
        "rounded-lg",
        isMinimalist
          ? "bg-[var(--background-secondary)]"
          : "border-l-2 border-l-[var(--color-error)] border border-dashed border-[var(--border-primary)] bg-[var(--background-secondary)]",
        className,
      )}
      style={{padding: "var(--space-stack)"}}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5" style={{marginBottom: "var(--space-inset-sm)"}}>
        <AlertTriangle className="w-4 h-4 text-[var(--color-error)]" />
        <span className="text-xs font-medium text-[var(--color-error)]">错因分析</span>
        {/* Error type badge */}
        <span className="ml-auto text-xs bg-[var(--color-error)]/10 py-0.5 rounded" style={{paddingLeft: "var(--space-inset-sm)", paddingRight: "var(--space-inset-sm)"}}>
          {analysis.type}
        </span>
      </div>

      {/* Collapsible content */}
      <div
        id={ANALYSIS_ID}
        className="relative"
        style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px`, overflow: "hidden" }}
      >
        {/* Cause text */}
        <p className="text-sm text-[var(--text-primary)]" style={{marginBottom: "var(--space-inset-xs)"}}>{analysis.cause}</p>

        {/* Suggestion */}
        {analysis.suggestion && (
          <p className="text-sm text-[var(--text-primary)]" style={{marginBottom: "var(--space-inset-xs)"}}>
            <span role="img" aria-label="建议">
              💡
            </span>{" "}
            建议: {analysis.suggestion}
          </p>
        )}

        {/* AI disclaimer */}
        <p className="text-xs text-[var(--text-muted)]" style={{marginTop: "var(--space-inset-sm)"}}>⚠️ AI 生成，仅供参考</p>

        {/* Gradient mask overlay — only when collapsed */}
        {!isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{
              background: "linear-gradient(to top, var(--background-secondary) 0%, transparent 100%)",
            }}
          />
        )}
      </div>

      {/* Toggle */}
      <div className="flex justify-center" style={{marginTop: "var(--space-inset-xs)"}}>
        <ExpandToggle
          isExpanded={isExpanded}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          controlsId={ANALYSIS_ID}
        />
      </div>
    </div>
  );
};

ErrorAnalysisPanel.displayName = "ErrorAnalysisPanel";
