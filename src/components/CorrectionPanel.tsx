import React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";

export interface CorrectionPanelProps {
  text: string;
  /** Visual style variant */
  variant?: "default" | "minimalist";
  className?: string;
}

export const CorrectionPanel: React.FC<CorrectionPanelProps> = ({ text, variant = "default", className }) => {
  const isMinimalist = variant === "minimalist";
  return (
    <div
      className={cn(
        "rounded-lg p-2.5",
        isMinimalist ? "bg-[var(--color-info)]/5" : "border border-[var(--color-info)]/20 bg-[var(--color-info)]/5",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <RotateCcw className="w-4 h-4 text-[var(--color-info)]" />
        <span className="text-xs font-medium text-[var(--color-info)]">学生订正</span>
      </div>
      <MarkdownRenderer content={text} />
    </div>
  );
};

CorrectionPanel.displayName = "CorrectionPanel";
