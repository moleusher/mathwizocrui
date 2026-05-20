import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { QuestionSummaryProps } from "../../components/QuestionSummary";
import type { ExamQuestion } from "../../types/question";

afterEach(() => {
  cleanup();
});

async function renderSummary(props: QuestionSummaryProps) {
  const { QuestionSummary } = await import("../../components/QuestionSummary");
  return render(<QuestionSummary {...props} />);
}

const mockQuestion: ExamQuestion = {
  question_index: 1,
  question_text: "请你根据原始瓷尊的尺寸，算出制作一个瓷尊至少需要用多少平方厘米的瓷土。",
  question_type: "calculation",
  difficulty: "medium",
  knowledge_points: ["长方体", "表面积"],
  images: [],
  student_answer: null,
  teacher_correction: {
    mark: "✓",
    score: 5,
    max_score: 5,
    comment: null,
  },
  standard_answer: null,
  student_correction: null,
  solution_steps: [],
  error_analysis: null,
  prerequisite_knowledge: [],
  common_mistakes: [],
  related_block_ids: [],
  block_bbox: null,
  source: "ocr",
};

describe("QuestionSummary", () => {
  it("renders question number", async () => {
    await renderSummary({ question: mockQuestion });
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders correction badge", async () => {
    await renderSummary({ question: mockQuestion });
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders score display", async () => {
    await renderSummary({ question: mockQuestion });
    expect(screen.getByText("5/5")).toBeInTheDocument();
  });

  it("truncates long text", async () => {
    await renderSummary({ question: mockQuestion, maxChars: 20 });
    const truncatedText = mockQuestion.question_text.slice(0, 20) + "...";
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
  });

  it("has correct aria-label", async () => {
    await renderSummary({ question: mockQuestion });
    const container = screen.getByLabelText("题目 1");
    expect(container).toBeInTheDocument();
  });
});
