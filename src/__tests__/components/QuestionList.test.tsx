import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { QuestionListProps } from "../../components/QuestionList";
import type { ExamQuestion } from "../../types/question";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function renderList(props: QuestionListProps) {
  const { QuestionList } = await import("../../components/QuestionList");
  return render(<QuestionList {...props} />);
}

// ── Mock data ──

function createMockQuestion(index: number, overrides?: Partial<ExamQuestion>): ExamQuestion {
  return {
    question_index: index,
    question_text: `题目 ${index} 的内容`,
    question_type: "calculation",
    difficulty: "medium",
    knowledge_points: ["知识点"],
    images: [],
    student_answer: null,
    teacher_correction: null,
    standard_answer: null,
    student_correction: null,
    solution_steps: [],
    error_analysis: null,
    prerequisite_knowledge: [],
    common_mistakes: [],
    related_block_ids: [],
    block_bbox: null,
    source: "ocr",
    ...overrides,
  };
}

function createCorrectQuestion(index: number): ExamQuestion {
  return createMockQuestion(index, {
    teacher_correction: { mark: "✓", score: 5, max_score: 5, comment: null },
  });
}

function createWrongQuestion(index: number): ExamQuestion {
  return createMockQuestion(index, {
    teacher_correction: { mark: "✗", score: 2, max_score: 5, comment: "做错了" },
  });
}

function createUnmarkedQuestion(index: number): ExamQuestion {
  return createMockQuestion(index, {
    teacher_correction: null,
  });
}

// ── Tests ──

describe("QuestionList", () => {
  it("renders accordion mode by default", async () => {
    const questions = [createCorrectQuestion(1), createWrongQuestion(2)];
    await renderList({ questions });

    // Accordion mode — AccordionItems should render with question summaries
    // Badge numbers appear in both QuestionSummary and QuestionCard
    const badges1 = screen.getAllByText("1");
    expect(badges1.length).toBeGreaterThanOrEqual(1);
    const badges2 = screen.getAllByText("2");
    expect(badges2.length).toBeGreaterThanOrEqual(1);

    // Check that unique content renders (accordion triggers are always visible)
    expect(screen.getByLabelText("题目 1")).toBeInTheDocument();
    expect(screen.getByLabelText("题目 2")).toBeInTheDocument();
  });

  it("renders scroll mode", async () => {
    const questions = [createCorrectQuestion(1), createWrongQuestion(2)];
    await renderList({ questions, browseMode: "scroll" });

    // Scroll mode renders QuestionCards directly
    expect(screen.getByText("题目 1 的内容")).toBeInTheDocument();
    expect(screen.getByText("题目 2 的内容")).toBeInTheDocument();
  });

  it("shows loading skeletons when loading", async () => {
    const { container } = await renderList({
      questions: [],
      loading: true,
    });

    // Should render skeleton placeholders with animate-pulse
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThanOrEqual(1);
  });

  it("shows empty state when no questions", async () => {
    await renderList({ questions: [], loading: false });

    // Empty state message
    expect(screen.getByText("暂无题目数据")).toBeInTheDocument();
  });

  it("shows error state with retry button", async () => {
    const handleRetry = vi.fn();
    await renderList({
      questions: [],
      error: "加载失败",
      onRetry: handleRetry,
    });

    // Error message
    expect(screen.getByText("加载失败")).toBeInTheDocument();

    // Retry button
    const retryBtn = screen.getByText("重试");
    expect(retryBtn).toBeInTheDocument();
  });

  it("fires onRetry when retry button clicked", async () => {
    const handleRetry = vi.fn();
    await renderList({
      questions: [],
      error: "网络错误",
      onRetry: handleRetry,
    });

    await userEvent.click(screen.getByText("重试"));

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it("shows all questions with filter='all'", async () => {
    const questions = [createCorrectQuestion(1), createWrongQuestion(2), createUnmarkedQuestion(3)];
    await renderList({ questions, filter: "all", browseMode: "scroll" });

    // All three questions render
    expect(screen.getByText("题目 1 的内容")).toBeInTheDocument();
    expect(screen.getByText("题目 2 的内容")).toBeInTheDocument();
    expect(screen.getByText("题目 3 的内容")).toBeInTheDocument();
  });

  it("shows only wrong questions with filter='wrong'", async () => {
    const questions = [
      createCorrectQuestion(1),
      createWrongQuestion(2),
      createUnmarkedQuestion(3),
      createWrongQuestion(4),
    ];
    await renderList({ questions, filter: "wrong", browseMode: "scroll" });

    // Only wrong questions
    expect(screen.queryByText("题目 1 的内容")).not.toBeInTheDocument();
    expect(screen.getByText("题目 2 的内容")).toBeInTheDocument();
    expect(screen.queryByText("题目 3 的内容")).not.toBeInTheDocument();
    expect(screen.getByText("题目 4 的内容")).toBeInTheDocument();
  });

  it("shows only unmarked questions with filter='unmarked'", async () => {
    const questions = [createCorrectQuestion(1), createWrongQuestion(2), createUnmarkedQuestion(3)];
    await renderList({ questions, filter: "unmarked", browseMode: "scroll" });

    // Only unmarked question
    expect(screen.queryByText("题目 1 的内容")).not.toBeInTheDocument();
    expect(screen.queryByText("题目 2 的内容")).not.toBeInTheDocument();
    expect(screen.getByText("题目 3 的内容")).toBeInTheDocument();
  });

  it("fires onFilterChange when filter button clicked", async () => {
    const questions = [createCorrectQuestion(1), createWrongQuestion(2), createUnmarkedQuestion(3)];
    const handleFilterChange = vi.fn();
    await renderList({ questions, onFilterChange: handleFilterChange, browseMode: "scroll" });

    // Click "错题" filter button
    await userEvent.click(screen.getByText(/错题/));

    expect(handleFilterChange).toHaveBeenCalledTimes(1);
    expect(handleFilterChange).toHaveBeenCalledWith("wrong");
  });

  it("fires onQuestionClick when question card is clicked in scroll mode", async () => {
    const questions = [createWrongQuestion(1)];
    const handleClick = vi.fn();
    await renderList({
      questions,
      onQuestionClick: handleClick,
      browseMode: "scroll",
    });

    // Click on the question card body
    await userEvent.click(screen.getByText("题目 1 的内容"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(1, undefined);
  });

  it("highlights card with activeIndex", async () => {
    const questions = [createCorrectQuestion(1), createWrongQuestion(2)];
    const { container } = await renderList({
      questions,
      activeIndex: 2,
      browseMode: "scroll",
    });

    // The active card should have isSelected styling (ring-2 class)
    expect(container.innerHTML).toContain("ring-2");
  });
});
