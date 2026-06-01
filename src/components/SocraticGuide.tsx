import React from "react";
import { Lightbulb, TrendingUp, Zap, BookOpen, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "../utils/cn";
import type { ErrorAnalysis } from "../types/question";

export interface SocraticGuideProps {
  /** Backward compat: existing ErrorAnalysis object */
  analysis?: ErrorAnalysis;
  /** v0.4.0: rich diagnostic status */
  status?: "ok" | "warn" | "err";
  /** Student strengths (positive feedback) */
  strengths?: string[];
  /** Improvement suggestions */
  improvements?: string[];
  /** Knowledge dependency chain */
  knowledgeChain?: {
    base: string;    // Prerequisite knowledge
    dep: string;     // Dependent concept
    result: string;  // Applied topic
  };
  /** Visual style variant */
  variant?: "default" | "minimalist";
  maxHeight?: number;
  defaultExpanded?: boolean;
  className?: string;
}

const ANALYSIS_ID = "socratic-guide-content";

export const SocraticGuide: React.FC<SocraticGuideProps> = React.forwardRef<HTMLDivElement, SocraticGuideProps>(({
  analysis,
  status,
  strengths,
  improvements,
  knowledgeChain,
  variant = "default",
  maxHeight = 300,
  defaultExpanded = true,
  className,
}, ref) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  // Derive status from analysis if not explicitly provided
  const effectiveStatus = status || (analysis ? "err" : "ok");
  const isMinimalist = variant === "minimalist";

  // Status-based styling
  const statusStyles = {
    ok: {
      bg: "bg-[var(--color-success)]/5",
      border: isMinimalist ? "" : "border border-[var(--color-success)]/30",
      icon: CheckCircle2,
      iconColor: "text-[var(--color-success)]",
      label: "表现良好",
      labelColor: "text-[var(--color-success)]",
    },
    warn: {
      bg: "bg-[var(--color-warning)]/5",
      border: isMinimalist ? "" : "border border-[var(--color-warning)]/30",
      icon: AlertTriangle,
      iconColor: "text-[var(--color-warning)]",
      label: "需注意",
      labelColor: "text-[var(--color-warning)]",
    },
    err: {
      bg: "bg-[var(--color-error)]/5",
      border: isMinimalist ? "" : "border border-dashed border-[var(--color-error)]/40",
      icon: AlertTriangle,
      iconColor: "text-[var(--color-error)]",
      label: "需要改进",
      labelColor: "text-[var(--color-error)]",
    },
  }[effectiveStatus];

  const Icon = statusStyles.icon;

  return (
    <div ref={ref} data-slot="socratic-guide" className={cn("rounded-lg p-4", statusStyles.bg, statusStyles.border, className)}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn("w-4 h-4", statusStyles.iconColor)} />
        <span className={cn("text-sm font-semibold", statusStyles.labelColor)}>
          {statusStyles.label}
        </span>
        {analysis?.type && (
          <span className="ml-auto text-xs bg-[var(--color-bg)]/50 px-2 py-0.5 rounded-full">
            {analysis.type}
          </span>
        )}
      </div>

      {/* Collapsible content */}
      <div
        id={ANALYSIS_ID}
        className="relative space-y-3"
        style={{ maxHeight: isExpanded ? "none" : `${maxHeight}px`, overflow: "hidden" }}
      >
        {/* 1. Strength Analysis — green left border */}
        {strengths && strengths.length > 0 && (
          <div className="border-l-2 border-[var(--color-success)] pl-3 py-1">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--color-success)]" />
              <span className="text-xs font-medium text-[var(--color-success)]">优势分析</span>
            </div>
            <ul className="text-sm text-[var(--color-text)] space-y-0.5">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-[var(--color-success)] mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. Cause / Error Analysis — from legacy analysis */}
        {analysis?.cause && (
          <div className="border-l-2 border-[var(--color-error)] pl-3 py-1">
            <div className="flex items-center gap-1 mb-1">
              <Zap className="w-3.5 h-3.5 text-[var(--color-error)]" />
              <span className="text-xs font-medium text-[var(--color-error)]">错误原因</span>
            </div>
            <p className="text-sm text-[var(--color-text)]">{analysis.cause}</p>
          </div>
        )}

        {/* 3. Improvement Suggestions — blue left border */}
        {improvements && improvements.length > 0 && (
          <div className="border-l-2 border-[var(--color-accent)] pl-3 py-1">
            <div className="flex items-center gap-1 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span className="text-xs font-medium text-[var(--color-accent)]">改进建议</span>
            </div>
            <ul className="text-sm text-[var(--color-text)] space-y-0.5">
              {improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-[var(--color-accent)] mt-0.5">→</span>
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fallback: legacy suggestion */}
        {analysis?.suggestion && !improvements && (
          <div className="border-l-2 border-[var(--color-accent)] pl-3 py-1">
            <div className="flex items-center gap-1 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span className="text-xs font-medium text-[var(--color-accent)]">建议</span>
            </div>
            <p className="text-sm text-[var(--color-text)]">{analysis.suggestion}</p>
          </div>
        )}

        {/* 4. Knowledge Dependency Chain */}
        {knowledgeChain && (
          <div className="border-l-2 border-[var(--color-accent)]/50 pl-3 py-1">
            <div className="flex items-center gap-1 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-accent)]/70" />
              <span className="text-xs font-medium text-[var(--color-accent)]/70">知识依赖链</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="bg-[var(--color-bg)]/50 px-2 py-0.5 rounded">{knowledgeChain.base}</span>
              <span className="text-[var(--color-text-muted)]">→</span>
              <span className="bg-[var(--color-bg)]/50 px-2 py-0.5 rounded">{knowledgeChain.dep}</span>
              <span className="text-[var(--color-text-muted)]">→</span>
              <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-2 py-0.5 rounded font-medium">
                {knowledgeChain.result}
              </span>
            </div>
          </div>
        )}

        {/* AI disclaimer */}
        <p className="text-xs text-[var(--color-text-muted)]">AI 生成，仅供参考</p>

        {/* Gradient mask overlay — when collapsed */}
        {!isExpanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{
              background: "linear-gradient(to top, var(--color-surface) 0%, transparent 100%)",
            }}
          />
        )}
      </div>

      {/* Toggle */}
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          aria-expanded={isExpanded}
          aria-controls={ANALYSIS_ID}
        >
          {isExpanded ? "收起 ▲" : "展开 ▼"}
        </button>
      </div>
    </div>
  );
});

SocraticGuide.displayName = "SocraticGuide";

// Backward compatibility re-export
export { SocraticGuide as ErrorAnalysisPanel };
