import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@heroui/react";
import { cn } from "../utils/cn";
import type { ExamQuestion, BBox } from "../types/question";
import {
  QuestionBadge,
  TypeBadge,
  DifficultyBadge,
  CorrectionBadge,
  ScoreDisplay,
  ConfidenceIndicator,
  KnowledgeBadge,
  PrerequisiteBadge,
} from "./QuestionBadges";
import { QuestionBody } from "./QuestionBody";
import { AnswerComparePanel } from "./AnswerComparePanel";
import { TeacherCommentPanel } from "./TeacherCommentPanel";
import { CorrectionPanel } from "./CorrectionPanel";
import { SolutionStepsPanel } from "./SolutionStepsPanel";
import { ErrorAnalysisPanel } from "./ErrorAnalysisPanel";

export interface QuestionCardProps {
  /** 题目数据 (必填) */
  question: ExamQuestion;

  /**
   * 卡片展示模式
   * - 'full': 全展开 (所有区域显示, 用于 Scroll 模式)
   * - 'accordion': 手风琴模式 (由外层 Accordion 控制展开/折叠)
   * - 'standalone': 独立卡片 (无折叠, 用于详情页)
   *
   * @default 'full'
   */
  mode?: "full" | "accordion" | "standalone";

  /** 手风琴展开状态 (mode='accordion' 时由外层传入) */
  isExpanded?: boolean;

  /**
   * 题目图片点击回调 → 联动试卷图片
   * @param questionIndex - 题号 (1-based)
   * @param bbox - 题目在试卷图片上的包围盒 (原图坐标)
   */
  onQuestionClick?: (questionIndex: number, bbox?: BBox) => void;

  /** 是否被选中 (BlockOverlay 联动高亮) */
  isSelected?: boolean;

  /** 自定义 CSS 类 */
  className?: string;
}

type SectionKey =
  | "QuestionBody"
  | "AnswerComparePanel"
  | "TeacherCommentPanel"
  | "CorrectionPanel"
  | "SolutionStepsPanel"
  | "ErrorAnalysisPanel"
  | "CardFooter";

/**
 * 条件渲染判断 — 基于数据完整度决定是否渲染每个 section
 */
function shouldRenderSection(question: ExamQuestion, section: SectionKey): boolean {
  switch (section) {
    case "QuestionBody":
      return true;
    case "AnswerComparePanel":
      return question.student_answer != null || question.standard_answer != null;
    case "TeacherCommentPanel":
      return question.teacher_correction?.comment != null;
    case "CorrectionPanel":
      return question.student_correction != null;
    case "SolutionStepsPanel":
      return question.solution_steps.length > 0;
    case "ErrorAnalysisPanel":
      return question.error_analysis != null;
    case "CardFooter":
      return question.knowledge_points.length > 0 || question.prerequisite_knowledge.length > 0;
    default:
      return false;
  }
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  mode = "full",
  isExpanded = false,
  isSelected = false,
  onQuestionClick,
  className,
}) => {
  const handleClick = React.useCallback(() => {
    if (mode !== "accordion") {
      onQuestionClick?.(question.question_index, question.block_bbox ?? undefined);
    }
  }, [mode, onQuestionClick, question.question_index, question.block_bbox]);

  // ── Shared sections ──

  const cardHeader = (
    <CardHeader className="flex items-center gap-3 pb-2">
      <QuestionBadge index={question.question_index} />
      <TypeBadge type={question.question_type} />
      <DifficultyBadge difficulty={question.difficulty} />
      {question.teacher_correction && (
        <>
          {question.teacher_correction.mark && (
            <CorrectionBadge mark={question.teacher_correction.mark} />
          )}
          {question.teacher_correction.max_score != null && (
            <ScoreDisplay
              score={question.teacher_correction.score}
              maxScore={question.teacher_correction.max_score}
            />
          )}
          {question.fusion_meta && (
            <ConfidenceIndicator
              confidence={question.fusion_meta.confidence_per_field?.is_correct ?? 0.5}
              hasConflict={(question.fusion_meta.conflicts?.length ?? 0) > 0}
            />
          )}
        </>
      )}
    </CardHeader>
  );

  const cardBody = (
    <CardContent className="space-y-3 pt-0">
      {shouldRenderSection(question, "QuestionBody") && (
        <QuestionBody text={question.question_text} images={question.images} />
      )}

      {shouldRenderSection(question, "AnswerComparePanel") && (
        <AnswerComparePanel
          studentAnswer={question.student_answer}
          standardAnswer={question.standard_answer}
        />
      )}

      {shouldRenderSection(question, "TeacherCommentPanel") && (
        <TeacherCommentPanel comment={question.teacher_correction!.comment!} />
      )}

      {shouldRenderSection(question, "CorrectionPanel") && (
        <CorrectionPanel text={question.student_correction!} />
      )}

      {shouldRenderSection(question, "SolutionStepsPanel") && (
        <SolutionStepsPanel steps={question.solution_steps} />
      )}

      {shouldRenderSection(question, "ErrorAnalysisPanel") && question.error_analysis && (
        <ErrorAnalysisPanel analysis={question.error_analysis} />
      )}
    </CardContent>
  );

  const cardFooter = shouldRenderSection(question, "CardFooter") ? (
    <CardFooter className="flex flex-wrap items-center gap-2 pt-0">
      {question.knowledge_points.map((kp, i) => (
        <KnowledgeBadge key={i} label={kp} />
      ))}
      {question.prerequisite_knowledge.map((pr, i) => (
        <PrerequisiteBadge key={i} label={pr} />
      ))}
    </CardFooter>
  ) : null;

  // ── Accordion mode: inside Accordion.Item, no outer Card wrapper ──
  if (mode === "accordion") {
    return (
      <div className={cn("space-y-3", className)}>
        {cardHeader}
        {cardBody}
        {cardFooter}
      </div>
    );
  }

  // ── Full / Standalone mode: HeroUI Card wrapper ──
  return (
    <Card
      variant="default"
      className={cn(
        "border border-[var(--color-border)] shadow-[var(--shadow-sm)] rounded-[var(--radius-lg)]",
        isSelected && "ring-2 ring-[var(--color-primary)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
        className,
      )}
      onClick={handleClick}
    >
      {cardHeader}
      {cardBody}
      {cardFooter}
    </Card>
  );
};

QuestionCard.displayName = "QuestionCard";
