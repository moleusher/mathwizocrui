import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../utils/cn";
import { ExpandToggle } from "./ExpandToggle";
import type { ErrorAnalysis } from "../types/question";

export interface ErrorAnalysisPanelProps {
  analysis: ErrorAnalysis;
  maxHeight?: number;
  defaultExpanded?: boolean;
  className?: string;
}

const ANALYSIS_ID = "error-analysis-content";

export const ErrorAnalysisPanel: React.FC<ErrorAnalysisPanelProps> = ({
  analysis,
  maxHeight = 150,
  defaultExpanded = true,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (analysis == null) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-[var(--color-error)]/40 bg-[var(--color-error)]/5 p-3",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <AlertTriangle className="w-4 h-4 text-[var(--color-error)]" />
        <span className="text-xs font-medium text-[var(--color-error)]">
          错因分析
        </span>
        {/* Error type badge */}
        <span className="ml-auto text-xs bg-[var(--color-error)]/10 px-2 py-0.5 rounded">
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
        <p className="text-sm text-[var(--color-text)] mb-1">{analysis.cause}</p>

        {/* Suggestion */}
        {analysis.suggestion && (
          <p className="text-sm text-[var(--color-text)] mb-1">
            <span role="img" aria-label="建议">💡</span> 建议: {analysis.suggestion}
          </p>
        )}

        {/* AI disclaimer */}
        <p className="text-xs text-[var(--color-text-muted)] mt-2">
          ⚠️ AI 生成，仅供参考
        </p>

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
          controlsId={ANALYSIS_ID}
        />
      </div>
    </div>
  );
};

ErrorAnalysisPanel.displayName = "ErrorAnalysisPanel";
