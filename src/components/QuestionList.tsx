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
   * 列表浏览模式
   * - 'scroll': 滚动模式 — 所有题目全展开, 滚动浏览
   * - 'accordion': 手风琴模式 — 同时只展开一个题目 (推荐)
   *
   * @default 'accordion'
   */
  browseMode?: "scroll" | "accordion";

  /**
   * 默认展开的题号 (browseMode='accordion')
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
              ? "text-[var(--color-primary)] font-semibold border-b-2 border-[var(--color-primary)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
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

// ── Main component ──

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  browseMode = "accordion",
  filter = "all",
  defaultExpandedIndex = null,
  expandedIndices: controlledExpandedIndices,
  onExpandedChange,
  activeIndex,
  onActiveChange,
  onFilterChange,
  onQuestionClick,
  loading = false,
  error = null,
  onRetry,
  className,
}) => {
  // ── Filtering ──
  const filteredQuestions = useMemo(
    () => filterQuestions(questions, filter),
    [questions, filter],
  );

  const counts = useMemo(() => computeCounts(questions), [questions]);

  // ── Internal expanded state (for uncontrolled accordion) ──
  const [localExpandedKeys, setLocalExpandedKeys] = React.useState<Set<string | number>>(
    defaultExpandedIndex != null
      ? new Set([String(defaultExpandedIndex)])
      : new Set(),
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
  };

  // ── Shared: FilterBar ──
  const filterBar = (
    <FilterBar filter={filter} counts={counts} onFilterChange={onFilterChange} />
  );

  // ── Loading state ──
  if (loading) {
    return (
      <div className={cn("space-y-3", className)}>
        {filterBar}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-[var(--radius-lg)] bg-[var(--color-surface)] animate-pulse border border-[var(--color-border)]"
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className={cn("space-y-3", className)}>
        {filterBar}
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="w-8 h-8 text-[var(--color-error)]" />
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 px-4 py-2 text-sm bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
            >
              重试
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Empty state ──
  if (filteredQuestions.length === 0) {
    return (
      <div className={cn("space-y-3", className)}>
        {filterBar}
        <EmptyStateRoot>
          <EmptyStateIcon>
            <FileQuestion className="w-6 h-6" />
          </EmptyStateIcon>
          <EmptyStateTitle>暂无题目数据</EmptyStateTitle>
          <EmptyStateDescription>该试卷尚未完成分析</EmptyStateDescription>
        </EmptyStateRoot>
      </div>
    );
  }

  // ── Success state ──
  return (
    <div className={cn("space-y-3", className)}>
      {filterBar}

      {browseMode === "scroll" ? (
        /* ── Scroll mode ── */
        <div className="space-y-3">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.question_index}
              question={q}
              mode="full"
              isSelected={activeIndex === q.question_index}
              onQuestionClick={onQuestionClick}
            />
          ))}
        </div>
      ) : (
        /* ── Accordion mode ── */
        <Accordion
          expandedKeys={currentExpandedKeys}
          onExpandedChange={handleExpandedChange}
        >
          {filteredQuestions.map((q) => (
            <AccordionItem
              key={String(q.question_index)}
              className={cn(
                activeIndex === q.question_index &&
                  "ring-2 ring-[var(--color-primary)] rounded-[var(--radius-lg)]",
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
                    isSelected={activeIndex === q.question_index}
                    onQuestionClick={onQuestionClick}
                  />
                </AccordionBody>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

QuestionList.displayName = "QuestionList";
