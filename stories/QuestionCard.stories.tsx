import type { Meta, StoryObj } from "@storybook/react";
import { QuestionCard } from "../src/components/QuestionCard";
import { MathButton } from "../src/components/MathButton";
import { MathBadge } from "../src/components/MathBadge";
import { StatusBadge } from "../src/components/StatusBadge";

const meta: Meta<typeof QuestionCard> = {
  title: "Components/QuestionCard",
  component: QuestionCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

export const Complete: Story = {
  args: {
    number: 1,
    text: "Solve the quadratic equation 2x² - 4x - 6 = 0",
    status: "completed",
    totalScore: 4,
    maxScore: 4,
    dimensions: [
      { label: "Correct Answer", score: 2, maxScore: 2 },
      { label: "Method", score: 1, maxScore: 1 },
      { label: "Presentation", score: 1, maxScore: 1 },
    ],
    actions: <MathButton size="sm" variant="outline">View Details</MathButton>,
    defaultExpanded: true,
  },
};

export const Partial: Story = {
  args: {
    number: 2,
    text: "Find the derivative of f(x) = 3x⁴ - 2x³ + x - 7",
    totalScore: 2,
    maxScore: 4,
    status: "completed",
    dimensions: [
      { label: "Correct Answer", score: 1, maxScore: 2 },
      { label: "Method", score: 1, maxScore: 1 },
      { label: "Presentation", score: 0, maxScore: 1 },
    ],
  },
};

export const Failed: Story = {
  args: {
    number: 3,
    text: "Prove that √2 is irrational",
    totalScore: 0,
    maxScore: 6,
    status: "failed",
    dimensions: [
      { label: "Correct Answer", score: 0, maxScore: 3 },
      { label: "Method", score: 0, maxScore: 2 },
      { label: "Presentation", score: 0, maxScore: 1 },
    ],
  },
};

export const Pending: Story = {
  args: {
    number: 4,
    text: "Calculate the area bounded by y = x² and y = x + 2",
    status: "pending",
  },
};

export const Running: Story = {
  args: {
    number: 5,
    text: "Determine the convergence of Σ(1/n²)",
    status: "running",
  },
};
