// ── @mathwiz/ui-ocr components barrel ──

export {
  EmptyStateRoot,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
} from "./EmptyState";
export type {
  EmptyStateRootProps,
  EmptyStateIconProps,
  EmptyStateTitleProps,
  EmptyStateDescriptionProps,
  EmptyStateActionProps,
} from "./EmptyState";

export { StatusBadge } from "./StatusBadge";
export type { StatusBadgeProps, PipelineStatus } from "./StatusBadge";

export { MarkdownViewer } from "./MarkdownViewer";
export type { MarkdownViewerProps } from "./MarkdownViewer";

export { MarkdownRenderer } from "./MarkdownRenderer";
export type { MarkdownRendererProps } from "./MarkdownRenderer";

export { ExpandToggle } from "./ExpandToggle";
export type { ExpandToggleProps } from "./ExpandToggle";

export { QuestionBody } from "./QuestionBody";
export type { QuestionBodyProps } from "./QuestionBody";

export { AnswerComparePanel } from "./AnswerComparePanel";
export type { AnswerComparePanelProps } from "./AnswerComparePanel";

export { TeacherCommentPanel } from "./TeacherCommentPanel";
export type { TeacherCommentPanelProps } from "./TeacherCommentPanel";

export { CorrectionPanel } from "./CorrectionPanel";
export type { CorrectionPanelProps } from "./CorrectionPanel";

export { SolutionStepsPanel } from "./SolutionStepsPanel";
export type { SolutionStepsPanelProps } from "./SolutionStepsPanel";

export { ErrorAnalysisPanel } from "./ErrorAnalysisPanel";
export type { ErrorAnalysisPanelProps } from "./ErrorAnalysisPanel";
export { SocraticGuide } from "./SocraticGuide";
export type { SocraticGuideProps } from "./SocraticGuide";

export {
  QuestionBadge,
  TypeBadge,
  CorrectionBadge,
  ScoreDisplay,
  ConfidenceIndicator,
  KnowledgeBadge,
  PrerequisiteBadge,
} from "./QuestionBadges";
export type {
  QuestionBadgeProps,
  TypeBadgeProps,
  CorrectionBadgeProps,
  ScoreDisplayProps,
  ConfidenceIndicatorProps,
  KnowledgeBadgeProps,
  PrerequisiteBadgeProps,
} from "./QuestionBadges";

export { QuestionSummary } from "./QuestionSummary";
export type { QuestionSummaryProps } from "./QuestionSummary";

export { FilterBar } from "./QuestionList";
export type { FilterBarProps } from "./QuestionList";

export { QuestionCard } from "./QuestionCard";
export type { QuestionCardProps } from "./QuestionCard";

export { QuestionList } from "./QuestionList";
export type { QuestionListProps, FilterType } from "./QuestionList";

export { FormulaRenderer } from "./FormulaRenderer";
export type { FormulaRendererProps } from "./FormulaRenderer";

export { MathBadge } from "./MathBadge";
export type { MathBadgeProps } from "./MathBadge";

export { MathButton } from "./MathButton";
export type { MathButtonProps } from "./MathButton";

export { ImageUpload } from "./ImageUpload";
export type { ImageUploadProps } from "./ImageUpload";

export { ImagePreview } from "./ImagePreview";
export type { ImagePreviewProps } from "./ImagePreview";

export { ImagePagination } from "./ImagePagination";
export type { ImagePaginationProps } from "./ImagePagination";

export { AnalysisTabs } from "./AnalysisTabs";
export type { AnalysisTabsProps, Tab } from "./AnalysisTabs";

export { PipelineStageCard } from "./PipelineStageCard";
export type { PipelineStageCardProps } from "./PipelineStageCard";

export { BlockLegend } from "./BlockLegend";
export type { BlockLegendProps, BlockType } from "./BlockLegend";

export { BlockOverlay } from "./BlockOverlay";
export type { BlockOverlayProps, OverlayBlock } from "./BlockOverlay";

export { TopBar } from "./TopBar";
export type { TopBarProps } from "./TopBar";

export { AppLayout } from "./AppLayout";
export type { AppLayoutProps } from "./AppLayout";

export { ProjectCard } from "./ProjectCard";
export type { ProjectCardProps, DashboardStatus } from "./ProjectCard";

// @deprecated Use ProjectCard's Dropdown actions instead. Will be removed in a future version.
export { CardActions } from "./CardActions";
export type { CardActionsProps } from "./CardActions";

export { IntentActions } from "./IntentActions";
export type { IntentActionsProps } from "./IntentActions";

export { ClassroomProgress } from "./ClassroomProgress";
export type { ClassroomProgressProps, StageState, ClassroomStage } from "./ClassroomProgress";

// ── Types ──
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
  FusionMeta,
  FusionConflict,
  QuestionType,
  Difficulty,
} from "../types/question";
