import React from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "../utils/cn";

export interface TeacherCommentPanelProps {
  comment: string;
  className?: string;
}

export const TeacherCommentPanel: React.FC<TeacherCommentPanelProps> = ({
  comment,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 p-2.5",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <MessageSquare className="w-4 h-4 text-[var(--color-error)]" />
        <span className="text-xs font-medium text-[var(--color-error)]">
          教师批注
        </span>
      </div>
      <p className="text-sm text-[var(--color-text)] italic">{comment}</p>
    </div>
  );
};

TeacherCommentPanel.displayName = "TeacherCommentPanel";
