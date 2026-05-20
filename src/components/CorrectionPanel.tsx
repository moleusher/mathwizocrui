import React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";

export interface CorrectionPanelProps {
  text: string;
  className?: string;
}

export const CorrectionPanel: React.FC<CorrectionPanelProps> = ({
  text,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-info)]/20 bg-[var(--color-info)]/5 p-2.5",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <RotateCcw className="w-4 h-4 text-[var(--color-info)]" />
        <span className="text-xs font-medium text-[var(--color-info)]">
          学生订正
        </span>
      </div>
      <MarkdownRenderer content={text} />
    </div>
  );
};

CorrectionPanel.displayName = "CorrectionPanel";
