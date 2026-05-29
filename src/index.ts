// ── @mathwiz/ui-ocr ──
// Component library for Math-OCR project
// Built with React 19 · HeroUI 3 · Tailwind 4

// v0.11.0 Data Contracts
export type {
  ExamQuestion,
  BBox,
  QuestionImage,
  StudentAnswer,
  TeacherCorrection,
  StandardAnswer,
  SolutionStep,
  ErrorAnalysis,
  QuestionsMeta,
  DataCompleteness,
  QuestionType,
  Difficulty,
  FusionMeta,
  FusionConflict,
} from "./types/question";
export { getDataCompleteness } from "./types/question";

// Re-export HeroUI for convenience
export { Button, Card, Badge, ProgressBar, ProgressCircle, Spinner, Tooltip } from "@heroui/react";

// Math-OCR custom components
export {
  EmptyStateRoot,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "./components/EmptyState";
export type {
  EmptyStateRootProps,
  EmptyStateIconProps,
  EmptyStateTitleProps,
  EmptyStateDescriptionProps,
  EmptyStateActionProps,
} from "./components/EmptyState";

export { StatusBadge } from "./components/StatusBadge";
export type { StatusBadgeProps, PipelineStatus } from "./components/StatusBadge";

export { MarkdownViewer } from "./components/MarkdownViewer";
export type { MarkdownViewerProps } from "./components/MarkdownViewer";

export { MarkdownRenderer } from "./components/MarkdownRenderer";
export type { MarkdownRendererProps } from "./components/MarkdownRenderer";

export { ExpandToggle } from "./components/ExpandToggle";
export type { ExpandToggleProps } from "./components/ExpandToggle";

export { QuestionBody } from "./components/QuestionBody";
export type { QuestionBodyProps } from "./components/QuestionBody";

export { AnswerComparePanel } from "./components/AnswerComparePanel";
export type { AnswerComparePanelProps } from "./components/AnswerComparePanel";

export { TeacherCommentPanel } from "./components/TeacherCommentPanel";
export type { TeacherCommentPanelProps } from "./components/TeacherCommentPanel";

export { CorrectionPanel } from "./components/CorrectionPanel";
export type { CorrectionPanelProps } from "./components/CorrectionPanel";

export { SolutionStepsPanel } from "./components/SolutionStepsPanel";
export type { SolutionStepsPanelProps } from "./components/SolutionStepsPanel";

export { ErrorAnalysisPanel } from "./components/ErrorAnalysisPanel";
export type { ErrorAnalysisPanelProps } from "./components/ErrorAnalysisPanel";

export {
  QuestionBadge,
  TypeBadge,
  DifficultyBadge,
  CorrectionBadge,
  ScoreDisplay,
  KnowledgeBadge,
  PrerequisiteBadge,
} from "./components/QuestionBadges";
export type {
  QuestionBadgeProps,
  TypeBadgeProps,
  DifficultyBadgeProps,
  CorrectionBadgeProps,
  ScoreDisplayProps,
  KnowledgeBadgeProps,
  PrerequisiteBadgeProps,
} from "./components/QuestionBadges";

export { QuestionSummary } from "./components/QuestionSummary";
export type { QuestionSummaryProps } from "./components/QuestionSummary";

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
export type { QuestionCardProps } from "./components/QuestionCard";

export { FilterBar } from "./components/QuestionList";
export type { FilterBarProps } from "./components/QuestionList";

export { QuestionList } from "./components/QuestionList";
export type { QuestionListProps, FilterType } from "./components/QuestionList";

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

export { IntentSelector } from "./components/IntentSelector";
export type { IntentSelectorProps, IntentDef } from "./components/IntentSelector";
export { DEFAULT_INTENTS } from "./components/IntentSelector";

export { ClassroomProgress } from "./components/ClassroomProgress";
export type {
  ClassroomProgressProps,
  StageState,
  ClassroomStage,
} from "./components/ClassroomProgress";
