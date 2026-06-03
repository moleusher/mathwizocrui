import React from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "../utils/cn";

export interface TeacherCommentPanelProps {
  comment: string;
  /** Visual style variant */
  variant?: "default" | "minimalist";
  className?: string;
}

export const TeacherCommentPanel: React.FC<TeacherCommentPanelProps> = ({ comment, variant = "default", className }) => {
  const isMinimalist = variant === "minimalist";
  return (
    <div
      className={cn(
        "rounded-lg p-2.5",
        isMinimalist ? "bg-[var(--background-secondary)]" : "border-l-2 border-l-[var(--color-error)] border border-[var(--border-primary)] bg-[var(--background-secondary)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5" style={{marginBottom: 'var(--space-inset-xs)'}}>
        <MessageSquare className="w-4 h-4 text-[var(--color-error)]" />
        <span className="text-xs font-medium text-[var(--color-error)]">教师批注</span>
      </div>
      <p className="text-sm text-[var(--text-primary)] italic">{comment}</p>
    </div>
  );
};

TeacherCommentPanel.displayName = "TeacherCommentPanel";
