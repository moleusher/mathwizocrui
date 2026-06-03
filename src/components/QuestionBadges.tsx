import React from "react";
import { cn } from "../utils/cn";
import type { QuestionType, Difficulty } from "../types/question";

// ── Type mapping ──

const TYPE_LABEL_MAP: Record<QuestionType, string> = {
  calculation: "计算题",
  choice: "选择题",
  fill_blank: "填空题",
  solution: "解答题",
  proof: "证明题",
  geometry: "几何题",
  unknown: "未知",
};

const DIFFICULTY_LABEL_MAP: Record<Difficulty, string> = {
  easy: "●▷▷",
  medium: "●●▷",
  hard: "●●●",
  unknown: "---",
};

const DIFFICULTY_COLOR_MAP: Record<Difficulty, string> = {
  easy: "text-[var(--color-success)]",
  medium: "text-[var(--color-warning)]",
  hard: "text-[var(--color-error)]",
  unknown: "text-[var(--text-muted)]",
};

// ── QuestionBadge ──

export interface QuestionBadgeProps {
  index: number;
}

export const QuestionBadge: React.FC<QuestionBadgeProps> = ({ index }) => {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--interactive-accent)] text-[var(--text-inverse)] text-sm font-bold">
      {index}
    </span>
  );
};

QuestionBadge.displayName = "QuestionBadge";

// ── TypeBadge ──

export interface TypeBadgeProps {
  type: QuestionType;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  return (
    <span className="inline-block bg-[var(--background-primary)] border border-[var(--border-primary)] text-xs px-2 py-0.5 rounded">
      {TYPE_LABEL_MAP[type]}
    </span>
  );
};

TypeBadge.displayName = "TypeBadge";

// ── DifficultyBadge ──

export interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const colorClass = DIFFICULTY_COLOR_MAP[difficulty];
  return (
    <span className={cn("inline-block text-xs font-medium", colorClass)}>
      {DIFFICULTY_LABEL_MAP[difficulty]}
    </span>
  );
};

DifficultyBadge.displayName = "DifficultyBadge";

// ── CorrectionBadge ──

export interface CorrectionBadgeProps {
  mark: string;
}

export const CorrectionBadge: React.FC<CorrectionBadgeProps> = ({ mark }) => {
  const colorClass =
    mark === "✓"
      ? "text-[var(--color-success)]"
      : mark === "✗"
        ? "text-[var(--color-error)]"
        : mark === "?"
          ? "text-[var(--color-warning)]"
          : "text-[var(--text-muted)]";

  return <span className={cn("inline-block text-sm font-semibold", colorClass)}>{mark}</span>;
};

CorrectionBadge.displayName = "CorrectionBadge";

// ── ScoreDisplay ──

export interface ScoreDisplayProps {
  score: number | null;
  maxScore: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, maxScore }) => {
  const getScoreColor = (): string => {
    if (score == null) {
      return "text-[var(--text-muted)]";
    }
    const ratio = score / maxScore;
    if (ratio >= 0.8) {
      return "text-[var(--color-success)]";
    }
    if (ratio < 0.6) {
      return "text-[var(--color-error)]";
    }
    return "text-[var(--color-warning)]";
  };

  const displayScore = score != null ? String(score) : "--";

  return (
    <span className={cn("font-mono tabular-nums text-sm font-semibold", getScoreColor())}>
      {displayScore}/{maxScore}
    </span>
  );
};

ScoreDisplay.displayName = "ScoreDisplay";

// ── KnowledgeBadge ──

export interface KnowledgeBadgeProps {
  label: string;
}

export const KnowledgeBadge: React.FC<KnowledgeBadgeProps> = ({ label }) => {
  return (
    <span className="inline-block bg-[var(--interactive-accent)]/10 text-[var(--interactive-accent)] border border-[var(--interactive-accent)]/20 text-xs px-2 py-0.5 rounded">
      {label}
    </span>
  );
};

KnowledgeBadge.displayName = "KnowledgeBadge";

// ── PrerequisiteBadge ──

export interface PrerequisiteBadgeProps {
  label: string;
}

export const PrerequisiteBadge: React.FC<PrerequisiteBadgeProps> = ({ label }) => {
  return (
    <span className="inline-block bg-[var(--background-primary)] text-[var(--text-muted)] text-xs px-2 py-0.5 rounded">
      ← {label}
    </span>
  );
};

PrerequisiteBadge.displayName = "PrerequisiteBadge";

// ── ConfidenceIndicator ──

export interface ConfidenceIndicatorProps {
  /** 置信度 0.0-1.0 */
  confidence: number;
  /** 是否有冲突 */
  hasConflict?: boolean;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  hasConflict,
}) => {
  // 高置信度 (>0.8): 无指示 (不干扰用户)
  // 中置信度 (0.5-0.8): 半透明 ⓘ 图标
  // 低置信度 (<0.5): 醒目 ⚠ 图标 + tooltip
  // 如有冲突: 显示冲突标记
  if (confidence >= 0.8 && !hasConflict) {
    return null;
  }

  const isLow = confidence < 0.5;
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs cursor-help",
        isLow ? "text-[var(--color-warning)] font-semibold" : "text-[var(--text-muted)]",
      )}
      title={
        hasConflict
          ? `置信度 ${(confidence * 100).toFixed(0)}%，存在模型判定冲突`
          : `置信度 ${(confidence * 100).toFixed(0)}%`
      }
    >
      {hasConflict ? "⚠" : isLow ? "ⓘ" : ""}
      {isLow && !hasConflict && ` ${(confidence * 100).toFixed(0)}%`}
    </span>
  );
};

ConfidenceIndicator.displayName = "ConfidenceIndicator";
