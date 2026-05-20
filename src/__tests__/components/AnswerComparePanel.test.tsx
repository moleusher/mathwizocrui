import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { AnswerComparePanelProps } from "../../components/AnswerComparePanel";
import type { StudentAnswer, StandardAnswer } from "../../types/question";

afterEach(() => {
  cleanup();
});

async function renderPanel(props: AnswerComparePanelProps) {
  const { AnswerComparePanel } = await import("../../components/AnswerComparePanel");
  return render(<AnswerComparePanel {...props} />);
}

const studentAnswer: StudentAnswer = {
  text: "25×22×26=13300",
  confidence: 0.92,
};

const standardAnswer: StandardAnswer = {
  text: "S = 2(ab+ah+bh) = 3544cm²",
  source: "llm",
};

describe("AnswerComparePanel", () => {
  it("renders both student and standard answers", async () => {
    await renderPanel({ studentAnswer, standardAnswer });
    expect(screen.getByText("学生作答")).toBeInTheDocument();
    expect(screen.getByText("标准答案")).toBeInTheDocument();
  });

  it("renders student only", async () => {
    await renderPanel({ studentAnswer, standardAnswer: null });
    expect(screen.getByText("学生作答")).toBeInTheDocument();
    expect(screen.queryByText("标准答案")).not.toBeInTheDocument();
  });

  it("renders standard only", async () => {
    await renderPanel({ studentAnswer: null, standardAnswer });
    expect(screen.queryByText("学生作答")).not.toBeInTheDocument();
    expect(screen.getByText("标准答案")).toBeInTheDocument();
  });

  it("returns null when neither provided", async () => {
    const { container } = await renderPanel({ studentAnswer: null, standardAnswer: null });
    expect(container.innerHTML).toBe("");
  });

  it("shows confidence warning when confidence < 0.7", async () => {
    const lowConfidence: StudentAnswer = { text: "answer", confidence: 0.5 };
    await renderPanel({ studentAnswer: lowConfidence, standardAnswer });
    expect(screen.getByText(/置信度/)).toBeInTheDocument();
  });

  it("does not show confidence badge when confidence >= 0.7", async () => {
    const highConfidence: StudentAnswer = { text: "answer", confidence: 0.92 };
    await renderPanel({ studentAnswer: highConfidence, standardAnswer });
    expect(screen.queryByText(/置信度/)).not.toBeInTheDocument();
  });
});
