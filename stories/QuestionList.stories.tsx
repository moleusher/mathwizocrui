import type { Meta, StoryObj } from "@storybook/react";
import { QuestionList } from "../src/components/QuestionList";
import { QuestionCard } from "../src/components/QuestionCard";

const meta: Meta<typeof QuestionList> = {
  title: "Components/QuestionList",
  component: QuestionList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionList>;

const sampleQuestions = [
  { n: 1, t: "Solve 2x² - 4x - 6 = 0", s: "completed" as const, ts: 4, ms: 4 },
  { n: 2, t: "Find the derivative of f(x) = 3x⁴ - 2x³ + x - 7", s: "completed" as const, ts: 2, ms: 4 },
  { n: 3, t: "Prove that √2 is irrational", s: "failed" as const, ts: 0, ms: 6 },
];

export const WithQuestions: Story = {
  render: () => (
    <QuestionList total={3}>
      {sampleQuestions.map((q) => (
        <QuestionCard key={q.n} number={q.n} text={q.t} status={q.s} totalScore={q.ts} maxScore={q.ms} />
      ))}
    </QuestionList>
  ),
};

export const Empty: Story = {
  args: {
    emptyTitle: "No questions analyzed yet",
    emptyDescription: "Upload an exam paper to start the analysis pipeline.",
  },
};
