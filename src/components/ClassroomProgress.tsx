import React from "react";
import { cn } from "../utils/cn";

export type ClassroomStage =
  | "generating_outlines"
  | "generating_scenes"
  | "generating_media"
  | "generating_tts"
  | "completed";

export interface StageState {
  stage: ClassroomStage;
  label: string;
  status: "pending" | "active" | "completed" | "failed";
  progress: number;
}

export interface ClassroomProgressProps extends React.ComponentProps<"div"> {
  isGenerating: boolean;
  stages: StageState[];
  classroomUrl?: string;
  error?: string;
  onOpenClassroom?: () => void;
  /** Visual style variant */
  variant?: "default" | "minimalist";
}

export const ClassroomProgress = React.forwardRef<HTMLDivElement, ClassroomProgressProps>(
  ({ isGenerating, stages, classroomUrl, error, onOpenClassroom, variant = "default", className, ...props }, ref) => {
    const isMinimalist = variant === "minimalist";
    const allComplete = stages.every((s) => s.status === "completed");
    const headerText = allComplete ? "课堂生成完成" : "正在生成互动课堂...";

    if (!isGenerating && !classroomUrl && !error && !allComplete) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-slot="classroom-progress"
        className={cn(
          "p-4 rounded-lg",
          isMinimalist ? "bg-[var(--background-primary)]" : "border border-[var(--border-primary)] bg-[var(--background-primary)] shadow-[var(--shadow-sm)]",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium text-[var(--interactive-accent)] mb-3">{headerText}</div>

        <div className="flex flex-col gap-2">
          {stages.map((s) => (
            <div
              key={s.stage}
              data-stage={s.stage}
              data-stage-status={s.status}
              className="flex items-center gap-2.5"
            >
              {s.status === "completed" && (
                <span className="text-[var(--color-success)] text-xs">✓</span>
              )}
              <span
                className={cn(
                  "text-sm flex-1",
                  s.status === "completed" && "text-[var(--color-success)]",
                  s.status === "active" && "text-[var(--interactive-accent)] font-medium",
                  s.status === "pending" && "text-[var(--text-muted)]",
                  s.status === "failed" && "text-[var(--color-error)]",
                )}
              >
                {s.label}
              </span>
              {s.status === "active" && (
                <span className="text-xs text-[var(--interactive-accent)]">{s.progress}%</span>
              )}
              {s.status === "completed" && (
                <span className="text-xs text-[var(--color-success)]">✓ 完成</span>
              )}
              {s.status === "pending" && (
                <span className="text-xs text-[var(--text-muted)]">等待中</span>
              )}
            </div>
          ))}
        </div>

        {allComplete && classroomUrl && (
          <div className="mt-3 pt-3 border-t border-[var(--border-primary)]">
            <button
              type="button"
              onClick={onOpenClassroom}
              className="text-sm cursor-pointer font-medium
                text-[var(--interactive-accent)] hover:text-[var(--interactive-accent-hover)]
                transition-colors duration-200 bg-transparent border-0 p-0"
            >
              打开课堂
            </button>
          </div>
        )}

        {error && (
          <div className="mt-3 p-2 rounded text-sm bg-[var(--color-error)]/10 text-[var(--color-error)]">
            {error}
          </div>
        )}
      </div>
    );
  },
);
ClassroomProgress.displayName = "ClassroomProgress";
