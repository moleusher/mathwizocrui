import type { Meta, StoryObj } from "@storybook/react";
import {
  QuestionBadge,
  TypeBadge,
  CorrectionBadge,
  ScoreDisplay,
  KnowledgeBadge,
  PrerequisiteBadge,
} from "./QuestionBadges";

const meta: Meta<typeof QuestionBadge> = {
  title: "Components/QuestionBadges",
  tags: ["autodocs"],
};

export default meta;

// ── QuestionBadge ──

export const QuestionBadgeIndex1: StoryObj<typeof QuestionBadge> = {
  render: () => (
    <div className="flex gap-2 items-center">
      <QuestionBadge index={1} />
      <QuestionBadge index={2} />
      <QuestionBadge index={3} />
      <QuestionBadge index={4} />
      <QuestionBadge index={5} />
    </div>
  ),
};

QuestionBadgeIndex1.storyName = "QuestionBadge";

// ── TypeBadge ──

export const TypeBadgeAll: StoryObj<typeof TypeBadge> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TypeBadge type="calculation" />
      <TypeBadge type="choice" />
      <TypeBadge type="fill_blank" />
      <TypeBadge type="solution" />
      <TypeBadge type="proof" />
      <TypeBadge type="geometry" />
      <TypeBadge type="unknown" />
    </div>
  ),
};

TypeBadgeAll.storyName = "TypeBadge";

// ── CorrectionBadge ──

export const CorrectionBadgeAll: StoryObj<typeof CorrectionBadge> = {
  render: () => (
    <div className="flex gap-2">
      <CorrectionBadge mark="✓" />
      <CorrectionBadge mark="✗" />
      <CorrectionBadge mark="?" />
      <CorrectionBadge mark="" />
    </div>
  ),
};

CorrectionBadgeAll.storyName = "CorrectionBadge";

// ── ScoreDisplay ──

export const ScoreDisplayAll: StoryObj<typeof ScoreDisplay> = {
  render: () => (
    <div className="flex gap-4">
      <ScoreDisplay score={5} maxScore={5} />
      <ScoreDisplay score={2} maxScore={5} />
      <ScoreDisplay score={3} maxScore={5} />
      <ScoreDisplay score={null} maxScore={5} />
    </div>
  ),
};

ScoreDisplayAll.storyName = "ScoreDisplay";

// ── KnowledgeBadge ──

export const KnowledgeBadgeAll: StoryObj<typeof KnowledgeBadge> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <KnowledgeBadge label="乘法" />
      <KnowledgeBadge label="应用题" />
      <KnowledgeBadge label="几何" />
    </div>
  ),
};

KnowledgeBadgeAll.storyName = "KnowledgeBadge";

// ── PrerequisiteBadge ──

export const PrerequisiteBadgeAll: StoryObj<typeof PrerequisiteBadge> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PrerequisiteBadge label="乘法口诀" />
      <PrerequisiteBadge label="整数运算" />
    </div>
  ),
};

PrerequisiteBadgeAll.storyName = "PrerequisiteBadge";

export const EmptyLabels: StoryObj<typeof KnowledgeBadge> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <KnowledgeBadge label="" />
      <PrerequisiteBadge label="" />
    </div>
  ),
};
