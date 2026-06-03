import React, { useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeading,
  AccordionTrigger,
  AccordionPanel,
  AccordionBody,
} from "@heroui/react";
import { AlertTriangle, FileQuestion } from "lucide-react";
import { cn } from "../utils/cn";
import type { ExamQuestion, BBox } from "../types/question";
import { QuestionCard } from "./QuestionCard";
import { QuestionSummary } from "./QuestionSummary";
import { MarkdownRenderer } from "./MarkdownRenderer";
import {
  EmptyStateRoot,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
} from "./EmptyState";

// ── Types ──

export type FilterType = "all" | "wrong" | "unmarked";

export interface QuestionListProps {
  /** 题目数组 */
  questions: ExamQuestion[];

  /**
   * 列表呈现模式
   * - 'accordion': 手风琴/滚动模式 — 使用 HeroUI Accordion 或 QuestionCard 列表 (默认)
   * - 'flow': 流式模式 — 去边框列表, 状态圆点 + 题号 + 标题截断 + ✓/✗ + 知识点标签
   *
   * @default 'accordion'
   */
  variant?: "accordion" | "flow";

  /**
   * 列表浏览模式 (仅 variant='accordion' 时生效)
   * - 'scroll': 滚动模式 — 所有题目全展开, 滚动浏览
   * - 'accordion': 手风琴模式 — 同时只展开一个题目 (推荐)
   *
   * @default 'accordion'
   */
  browseMode?: "scroll" | "accordion";

  /**
   * 默认展开的题号 (variant='accordion' 且 browseMode='accordion')
   * - number: 展开指定题号
   * - null: 全部折叠 (推荐)
   *
   * @default null
   */
  defaultExpandedIndex?: number | null;

  /** 受控展开的题号集合 (传入后关闭组件内部展开状态管理) */
  expandedIndices?: Set<number>;

  /** 展开变化回调 */
  onExpandedChange?: (indices: Set<number>) => void;

  /** 当前激活题目 (用于试卷联动高亮) */
  activeIndex?: number;

  /** 激活题目变化回调 */
  onActiveChange?: (index: number) => void;

  /**
   * 筛选状态
   * - 'all': 显示全部
   * - 'wrong': 只显示错题 (teacher_correction.mark='✗')
   * - 'unmarked': 只显示未批改 (teacher_correction==null)
   */
  filter?: FilterType;

  /** 筛选变化回调 */
  onFilterChange?: (filter: FilterType) => void;

  /** 题目点击 → 联动试卷图片 */
  onQuestionClick?: (questionIndex: number, bbox?: BBox) => void;

  /** 加载状态 */
  loading?: boolean;

  /** 错误信息 */
  error?: string | null;

  /** 重试回调 */
  onRetry?: () => void;

  /** 自定义 CSS 类 */
  className?: string;

  /** 选中的题号集合 */
  selectedIndices?: Set<number>;
  /** 选中变化回调 */
  onSelectChange?: (index: number, selected: boolean) => void;
}

// ── Filter logic ──

function filterQuestions(questions: ExamQuestion[], filter: FilterType): ExamQuestion[] {
  switch (filter) {
    case "wrong":
      return questions.filter((q) => q.teacher_correction?.mark === "✗");
    case "unmarked":
      return questions.filter((q) => !q.teacher_correction?.mark);
    default:
      return questions;
  }
}

function computeCounts(questions: ExamQuestion[]) {
  return {
    all: questions.length,
    wrong: questions.filter((q) => q.teacher_correction?.mark === "✗").length,
    unmarked: questions.filter((q) => !q.teacher_correction?.mark).length,
  };
}

// ── FilterBar sub-component ──

const FILTER_OPTIONS: { key: FilterType; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "wrong", label: "错题" },
  { key: "unmarked", label: "未批改" },
];

export interface FilterBarProps {
  filter: FilterType;
  counts: { all: number; wrong: number; unmarked: number };
  onFilterChange?: (filter: FilterType) => void;
}

export function FilterBar({ filter, counts, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-1">
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onFilterChange?.(opt.key)}
          className={cn(
            "px-3 py-1.5 text-sm transition-colors",
            filter === opt.key
              ? "text-[var(--interactive-accent)] font-semibold border-b-2 border-[var(--interactive-accent)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
          )}
        >
          {opt.key === "all"
            ? `全部(${counts.all})`
            : opt.key === "wrong"
              ? `错题(${counts.wrong})`
              : `未批改(${counts.unmarked})`}
        </button>
      ))}
    </div>
  );
}

// ── Status helpers ──

type QuestionStatus = "correct" | "wrong" | "partial" | "unmarked";

function getQuestionStatus(q: ExamQuestion): QuestionStatus {
  const mark = q.teacher_correction?.mark;
  if (mark === "✓") return "correct";
  if (mark === "✗") return "wrong";
  if (mark === "?") return "partial";
  return "unmarked";
}

// ── Main component ──

export const QuestionList = React.forwardRef<HTMLDivElement, QuestionListProps>(
  (
    {
      questions,
      variant = "accordion",
      browseMode = "accordion",
      filter = "all",
      defaultExpandedIndex = null,
      expandedIndices: controlledExpandedIndices,
      onExpandedChange,
      activeIndex,
      onActiveChange,
      selectedIndices,
      onSelectChange,
      onFilterChange,
      onQuestionClick,
      loading = false,
      error = null,
      onRetry,
      className,
    },
    ref,
  ) => {
    // ── Filtering ──
    const filteredQuestions = useMemo(() => filterQuestions(questions, filter), [questions, filter]);

    const counts = useMemo(() => computeCounts(questions), [questions]);

    // ── Internal expanded state (for uncontrolled accordion) ──
    const [localExpandedKeys, setLocalExpandedKeys] = React.useState<Set<string | number>>(
      defaultExpandedIndex != null ? new Set([String(defaultExpandedIndex)]) : new Set(),
    );

    const isControlled = controlledExpandedIndices !== undefined;

    const currentExpandedKeys: Set<string | number> | undefined = isControlled
      ? new Set(Array.from(controlledExpandedIndices).map(String))
      : localExpandedKeys;

    const handleExpandedChange = (keys: Set<string | number>) => {
      if (!isControlled) {
        setLocalExpandedKeys(new Set(keys));
      }
      const numberKeys = new Set(Array.from(keys).map(Number));
      onExpandedChange?.(numberKeys);
      // Accordion: the single expanded item becomes the active question
      if (keys.size === 1) {
        onActiveChange?.(Number(Array.from(keys)[0]));
      }
    };

    const handleQuestionClick = (questionIndex: number, bbox?: BBox) => {
      onQuestionClick?.(questionIndex, bbox);
      onActiveChange?.(questionIndex);
    };

    // ── Shared: FilterBar ──
    const filterBar = <FilterBar filter={filter} counts={counts} onFilterChange={onFilterChange} />;

    // ── Flow mode item ──
    const renderFlowItem = (q: ExamQuestion) => {
      const isActive = activeIndex === q.question_index;
      const status = getQuestionStatus(q);
      return (
        <div
          key={q.question_index}
          data-slot="flow-item"
          data-status={status}
          data-active={isActive}
          role="button"
          tabIndex={0}
          aria-label={`题目 ${q.question_index}`}
          onClick={() => handleQuestionClick(q.question_index, q.block_bbox ?? undefined)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleQuestionClick(q.question_index, q.block_bbox ?? undefined);
            }
          }}
          className={cn(
            "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
            "border-b border-[var(--border-primary)] last:border-b-0",
            isActive && "bg-[var(--interactive-accent)]/10",
          )}
        >
          {/* Status dot */}
          <span
            data-slot="status-dot"
            className={cn(
              "w-2.5 h-2.5 rounded-full shrink-0",
              status === "correct" && "bg-[var(--color-success)]",
              status === "wrong" && "bg-[var(--color-error)]",
              status === "partial" && "bg-[var(--color-warning)]",
              status === "unmarked" && "bg-[var(--text-muted)]",
            )}
          />

          {/* Question number */}
          <span className="text-sm font-medium text-[var(--text-primary)] min-w-[24px] shrink-0 tabular-nums">
            {q.question_index}.
          </span>

          {/* Title (2-line clamp) */}
          <div className="flex-1 line-clamp-2 text-sm text-[var(--text-muted)]">
            <MarkdownRenderer content={q.question_text} />
          </div>

          {/* Knowledge tags */}
          {q.knowledge_points.length > 0 && (
            <span className="hidden sm:flex items-center gap-1 shrink-0">
              {q.knowledge_points.slice(0, 3).map((kp) => (
                <span
                  key={kp}
                  data-slot="flow-tag"
                  className="px-1.5 py-0.5 text-xs rounded bg-[var(--interactive-accent)]/10 text-[var(--interactive-accent)]"
                >
                  {kp}
                </span>
              ))}
            </span>
          )}
        </div>
      );
    };

    // ── Determine content based on state ──
    let content: React.ReactNode;

    if (loading) {
      content = (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-[var(--radius-lg)] bg-[var(--background-primary)] animate-pulse border border-[var(--border-primary)]"
            />
          ))}
        </div>
      );
    } else if (error) {
      content = (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="w-8 h-8 text-[var(--color-error)]" />
          <p className="mt-3 text-sm text-[var(--text-muted)]">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 px-4 py-2 text-sm bg-[var(--interactive-accent)] text-[var(--text-inverse)] rounded-lg hover:opacity-90 transition-opacity"
            >
              重试
            </button>
          )}
        </div>
      );
    } else if (filteredQuestions.length === 0) {
      content = (
        <EmptyStateRoot>
          <EmptyStateIcon>
            <FileQuestion className="w-6 h-6" />
          </EmptyStateIcon>
          <EmptyStateTitle>暂无题目数据</EmptyStateTitle>
          <EmptyStateDescription>该试卷尚未完成分析</EmptyStateDescription>
        </EmptyStateRoot>
      );
    } else if (variant === "flow") {
      content = <div className="divide-y divide-[var(--border-primary)]">{filteredQuestions.map(renderFlowItem)}</div>;
    } else if (browseMode === "scroll") {
      /* ── Scroll mode ── */
      content = (
        <div className="space-y-3">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.question_index}
              question={q}
              mode="full"
              selectable
              selected={selectedIndices?.has(q.question_index)}
              onSelect={onSelectChange}
              isSelected={activeIndex === q.question_index}
              onQuestionClick={handleQuestionClick}
            />
          ))}
        </div>
      );
    } else {
      /* ── Accordion mode ── */
      content = (
        <Accordion expandedKeys={currentExpandedKeys} onExpandedChange={handleExpandedChange}>
          {filteredQuestions.map((q) => (
            <AccordionItem
              id={String(q.question_index)}
              key={String(q.question_index)}
              className={cn(
                activeIndex === q.question_index &&
                  "ring-2 ring-[var(--interactive-accent)] rounded-[var(--radius-lg)]",
              )}
            >
              <AccordionHeading>
                <AccordionTrigger>
                  <QuestionSummary question={q} />
                </AccordionTrigger>
              </AccordionHeading>
              <AccordionPanel>
                <AccordionBody>
                  <QuestionCard
                    question={q}
                    mode="accordion"
                    selectable
                    selected={selectedIndices?.has(q.question_index)}
                    onSelect={onSelectChange}
                    isExpanded={currentExpandedKeys.has(String(q.question_index))}
                    isSelected={activeIndex === q.question_index}
                    onQuestionClick={handleQuestionClick}
                  />
                </AccordionBody>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    return (
      <div ref={ref} data-slot="question-list" className={cn("space-y-3", className)}>
        {filterBar}
        {content}
      </div>
    );
  },
);

QuestionList.displayName = "QuestionList";
