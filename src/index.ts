// ── @math-ocr/ui ──
// Component library for Math-OCR project
// Built with React 19 · HeroUI 3 · Tailwind 4

// Re-export HeroUI for convenience
export { Button, Card, Badge, ProgressBar, ProgressCircle, Spinner, Tooltip } from "@heroui/react";

// Math-OCR custom components
export {
  EmptyStateRoot, EmptyStateIcon, EmptyStateTitle,
  EmptyStateDescription, EmptyStateAction,
} from "./components/EmptyState";
export type {
  EmptyStateRootProps, EmptyStateIconProps, EmptyStateTitleProps,
  EmptyStateDescriptionProps, EmptyStateActionProps,
} from "./components/EmptyState";

export { StatusBadge } from "./components/StatusBadge";
export type { StatusBadgeProps, PipelineStatus } from "./components/StatusBadge";

export { MarkdownViewer } from "./components/MarkdownViewer";
export type { MarkdownViewerProps } from "./components/MarkdownViewer";

export { FormulaRenderer } from "./components/FormulaRenderer";
export type { FormulaRendererProps } from "./components/FormulaRenderer";

export { MathBadge } from "./components/MathBadge";
export type { MathBadgeProps } from "./components/MathBadge";

export { MathButton } from "./components/MathButton";
export type { MathButtonProps } from "./components/MathButton";

export { ImageUpload } from "./components/ImageUpload";
export type { ImageUploadProps } from "./components/ImageUpload";

export { ImagePreview } from "./components/ImagePreview";
export type { ImagePreviewProps } from "./components/ImagePreview";

export { ImagePagination } from "./components/ImagePagination";
export type { ImagePaginationProps } from "./components/ImagePagination";

export { QuestionCard } from "./components/QuestionCard";
export type { QuestionCardProps, ScoreDimension } from "./components/QuestionCard";

export { QuestionList } from "./components/QuestionList";
export type { QuestionListProps } from "./components/QuestionList";

export { AnalysisTabs } from "./components/AnalysisTabs";
export type { AnalysisTabsProps, Tab } from "./components/AnalysisTabs";

export { PipelineStageCard } from "./components/PipelineStageCard";
export type { PipelineStageCardProps } from "./components/PipelineStageCard";

export { BlockLegend } from "./components/BlockLegend";
export type { BlockLegendProps, BlockType } from "./components/BlockLegend";

export { BlockOverlay } from "./components/BlockOverlay";
export type { BlockOverlayProps, OverlayBlock } from "./components/BlockOverlay";

export { TopBar } from "./components/TopBar";
export type { TopBarProps } from "./components/TopBar";

export { AppLayout } from "./components/AppLayout";
export type { AppLayoutProps } from "./components/AppLayout";

// v0.10.0 新建组件
export { ProjectCard } from "./components/ProjectCard";
export type { ProjectCardProps, DashboardStatus } from "./components/ProjectCard";

// @deprecated Use ProjectCard's Dropdown actions instead. Will be removed in a future version.
export { CardActions } from "./components/CardActions";
export type { CardActionsProps } from "./components/CardActions";

export { IntentActions } from "./components/IntentActions";
export type { IntentActionsProps } from "./components/IntentActions";

export { ClassroomProgress } from "./components/ClassroomProgress";
export type { ClassroomProgressProps, StageState, ClassroomStage } from "./components/ClassroomProgress";
