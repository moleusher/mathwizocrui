import React from "react";
import { cn } from "../utils/cn";
import { CardActions } from "./CardActions";
import { StatusBadge } from "./StatusBadge";
import type { PipelineStatus } from "./StatusBadge";

// Dashboard pipeline statuses for project card
export type DashboardStatus = "uploading" | "ocr" | "analyzing" | "completed" | "failed";

export interface ProjectCardProps extends React.ComponentProps<"div"> {
  project: {
    id: string;
    title: string;
    subject: string;
    grade: string;
    questions: number;
  };
  dashboardStatus: DashboardStatus;
  ocrProgress?: number;
  analyzeProgress?: number;
  thumbnailUrl?: string;
  onClick: () => void;
  onViewProgress: () => void;
}

const statusConfig: Record<DashboardStatus, PipelineStatus> = {
  uploading: "uploading",
  ocr: "ocr",
  analyzing: "analyzing",
  completed: "completed",
  failed: "failed",
};

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      project,
      dashboardStatus,
      ocrProgress,
      analyzeProgress,
      thumbnailUrl,
      onClick,
      onViewProgress,
      className,
      ...props
    },
    ref,
  ) => {
    const showProgress = dashboardStatus === "ocr" || dashboardStatus === "analyzing";
    const progress = dashboardStatus === "ocr" ? ocrProgress : analyzeProgress;
    const showActions = dashboardStatus !== "uploading";

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        data-slot="project-card"
        data-status={dashboardStatus}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg cursor-pointer",
          "bg-[var(--color-surface)] border border-[var(--color-border)]",
          "shadow-[var(--shadow-sm)]",
          "hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-500)]",
          "focus-visible:outline-2 focus-visible:outline-[var(--color-brand-500)] focus-visible:outline-offset-2",
          "transition-all duration-200",
          className,
        )}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Thumbnail */}
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={project.title}
            className="w-12 h-16 rounded-sm object-cover flex-shrink-0 bg-[var(--color-border)]"
          />
        ) : (
          <div className="w-12 h-16 rounded-sm flex-shrink-0 bg-[var(--color-border)] flex items-center justify-center text-2xl text-[var(--color-text-muted)]">
            📄
          </div>
        )}

        {/* Meta */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate text-[var(--color-text)]">
            {project.title}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
            <span>{project.subject}</span>
            <span> · </span>
            <span>{project.grade}</span>
            <span> · </span>
            <span>{project.questions} 题</span>
          </div>
        </div>

        {/* Right: Status + Progress + Actions */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusBadge status={statusConfig[dashboardStatus]} />
          {showProgress && (
            <div data-slot="project-card-progress" className="w-24">
              <div className="h-1 rounded-full bg-[var(--color-border)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--color-brand-500)] transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, progress || 0))}%` }}
                />
              </div>
            </div>
          )}
          {showActions && <CardActions onViewProgress={onViewProgress} />}
        </div>
      </div>
    );
  },
);
ProjectCard.displayName = "ProjectCard";
