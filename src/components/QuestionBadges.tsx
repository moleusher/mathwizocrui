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
  unknown: "text-[var(--color-text-muted)]",
};

// ── QuestionBadge ──

export interface QuestionBadgeProps {
  index: number;
}

export const QuestionBadge: React.FC<QuestionBadgeProps> = ({ index }) => {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm font-bold">
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
    <span className="inline-block bg-[var(--color-surface)] border border-[var(--color-border)] text-xs px-2 py-0.5 rounded">
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
          : "text-[var(--color-text-muted)]";

  return (
    <span className={cn("inline-block text-sm font-semibold", colorClass)}>
      {mark}
    </span>
  );
};

CorrectionBadge.displayName = "CorrectionBadge";

// ── ScoreDisplay ──

export interface ScoreDisplayProps {
  score: number | null;
  maxScore: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, maxScore }) => {
  const getScoreColor = (): string => {
    if (score == null) return "text-[var(--color-text-muted)]";
    const ratio = score / maxScore;
    if (ratio >= 0.8) return "text-[var(--color-success)]";
    if (ratio < 0.6) return "text-[var(--color-error)]";
    return "text-[var(--color-warning)]";
  };

  const displayScore = score != null ? String(score) : "--";

  return (
    <span
      className={cn(
        "font-mono tabular-nums text-sm font-semibold",
        getScoreColor(),
      )}
    >
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
    <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 text-xs px-2 py-0.5 rounded">
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
    <span className="inline-block bg-[var(--color-surface)] text-[var(--color-text-muted)] text-xs px-2 py-0.5 rounded">
      ← {label}
    </span>
  );
};

PrerequisiteBadge.displayName = "PrerequisiteBadge";
