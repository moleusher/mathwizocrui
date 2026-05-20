import React from "react";
import { cn } from "../utils/cn";
import { Button, Dropdown } from "@heroui/react";
import { EllipsisVertical, TrashBin } from "@gravity-ui/icons";
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
  /** Callbacks for dropdown actions */
  onViewProgress?: () => void;
  onOcrParse?: () => void;
  onReupload?: () => void;
  onDelete?: () => void;
  /** Keys of built-in dropdown items to disable: "ocr-parse", "view-progress", "reupload", "delete" */
  dropdownDisabledKeys?: string[];
  /** Additional custom dropdown items rendered after built-in items, before "删除项目" */
  dropdownItems?: React.ReactNode;
}

const statusConfig: Record<DashboardStatus, PipelineStatus> = {
  uploading: "uploading",
  ocr: "ocr",
  analyzing: "analyzing",
  completed: "completed",
  failed: "failed",
};

const statusLabels: Record<DashboardStatus, string> = {
  uploading: "上传中",
  ocr: "识别中",
  analyzing: "分析中",
  completed: "已完成",
  failed: "已失败",
};

function getCardAriaLabel(title: string, status: DashboardStatus): string {
  const label = status in statusLabels ? statusLabels[status as keyof typeof statusLabels] : status;
  return `试卷: ${title} — 状态: ${label}`;
}

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
      onOcrParse,
      onReupload,
      onDelete,
      dropdownDisabledKeys,
      dropdownItems,
      className,
      ...props
    },
    ref,
  ) => {
    const isKnownStatus = dashboardStatus in statusConfig;
    const safeStatus = statusConfig[dashboardStatus] ?? "pending";
    const showProgress = dashboardStatus === "ocr" || dashboardStatus === "analyzing";
    const progress = dashboardStatus === "ocr" ? ocrProgress : analyzeProgress;

    // Dropdown items render whenever their callback prop is provided.
    // Visibility and disabled state are controlled by the frontend.
    const showOcrParse = !!onOcrParse;
    const showViewProgress = !!onViewProgress;

    const hasDropdownItems =
      showOcrParse || showViewProgress || !!onReupload || !!dropdownItems || !!onDelete;

    const handleAction = (key: string) => {
      switch (key) {
        case "ocr-parse":
          onOcrParse?.();
          break;
        case "view-progress":
          onViewProgress?.();
          break;
        case "reupload":
          onReupload?.();
          break;
        case "delete":
          onDelete?.();
          break;
      }
    };

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
        aria-label={getCardAriaLabel(project.title, dashboardStatus)}
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
          <div className="flex items-center gap-1">
            {isKnownStatus ? (
              <StatusBadge status={safeStatus} />
            ) : (
              <span
                data-slot="status-badge"
                data-status={dashboardStatus}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)]",
                )}
                title={`未知状态: ${dashboardStatus}`}
              >
                <span className="size-1.5 rounded-full bg-[var(--color-text-muted)]" />
                {dashboardStatus}
              </span>
            )}
            {hasDropdownItems && (
              <Dropdown>
                <Button
                  isIconOnly
                  aria-label="更多操作"
                  variant="tertiary"
                  size="sm"
                  className="text-[var(--color-text-muted)] min-w-unit-7 w-7 h-7"
                >
                  <EllipsisVertical className="size-4" />
                </Button>
                <Dropdown.Popover placement="bottom end">
                  <Dropdown.Menu
                    aria-label="项目操作"
                    disabledKeys={dropdownDisabledKeys}
                    onAction={(key) => handleAction(key as string)}
                  >
                    {showOcrParse && (
                      <Dropdown.Item key="ocr-parse" textValue="OCR解析">
                        OCR解析
                      </Dropdown.Item>
                    )}
                    {showViewProgress && (
                      <Dropdown.Item key="view-progress" textValue="查看进度">
                        查看进度
                      </Dropdown.Item>
                    )}
                    {onReupload && (
                      <Dropdown.Item key="reupload" textValue="重新上传">
                        重新上传
                      </Dropdown.Item>
                    )}
                    {dropdownItems}
                    {onDelete && (
                      <Dropdown.Item key="delete" textValue="删除项目" variant="danger">
                        <TrashBin className="size-4" />
                        删除项目
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            )}
          </div>
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
        </div>
      </div>
    );
  },
);
ProjectCard.displayName = "ProjectCard";
