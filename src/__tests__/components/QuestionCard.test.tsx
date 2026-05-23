import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { QuestionCardProps } from "../../components/QuestionCard";
import type { ExamQuestion } from "../../types/question";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

async function renderCard(props: QuestionCardProps) {
  const { QuestionCard } = await import("../../components/QuestionCard");
  return render(<QuestionCard {...props} />);
}

// ── Mock data factories ──

function createFullQuestion(overrides?: Partial<ExamQuestion>): ExamQuestion {
  return {
    question_index: 1,
    question_text: "请你根据原始瓷尊的尺寸，算出制作一个瓷尊至少需要用多少平方厘米的瓷土。已知：长 a = 25cm，宽 b = 22cm，高 h = 26cm",
    question_type: "calculation",
    difficulty: "medium",
    knowledge_points: ["长方体", "表面积"],
    images: [],
    student_answer: {
      text: "25×22×26 = 13300cm³",
      confidence: 0.92,
    },
    teacher_correction: {
      mark: "✗",
      score: 2,
      max_score: 5,
      comment: "上面错了。混淆了体积和表面积公式。",
    },
    standard_answer: {
      text: "S = 2(ab+ah+bh) = 2(25×22+25×26+22×26) = 3544cm²",
      source: "llm",
    },
    student_correction: "S=2(25×22+25×26+22×26)=3544cm²",
    solution_steps: [
      { step: 1, content: "读题：识别条件 长25cm 宽22cm 高26cm" },
      { step: 2, content: "列式：S = 2(ab + ah + bh)" },
      { step: 3, content: "代入：2(25×22+25×26+22×26)" },
    ],
    error_analysis: {
      cause: "错把宽当作21.4cm，且混淆了体积和表面积公式。",
      type: "知识点漏洞",
      suggestion: "注意区分长方体的表面积公式 S=2(ab+ah+bh) 和体积公式 V=abh",
    },
    prerequisite_knowledge: ["整数运算", "乘法"],
    common_mistakes: [],
    related_block_ids: [1, 2],
    block_bbox: { x: 10, y: 100, width: 500, height: 200 },
    source: "ocr",
    ...overrides,
  };
}

function createBasicQuestion(): ExamQuestion {
  return {
    question_index: 2,
    question_text: "下列哪个数是质数？A. 12 B. 17 C. 21 D. 27",
    question_type: "choice",
    difficulty: "easy",
    knowledge_points: ["质数"],
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
  };
}

function createMinimalQuestion(): ExamQuestion {
  return {
    question_index: 3,
    question_text: "这是一道数学题",
    question_type: "unknown",
    difficulty: "unknown",
    knowledge_points: [],
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
  };
}

// ── Tests ──

describe("QuestionCard", () => {
  it("renders full mode with all sections when data is complete", async () => {
    const question = createFullQuestion();
    await renderCard({ question });

    // Header: badge, type, difficulty, correction, score
    expect(screen.getByText("1")).toBeInTheDocument(); // QuestionBadge
    expect(screen.getByText("计算题")).toBeInTheDocument(); // TypeBadge
    expect(screen.getByText("●●▷")).toBeInTheDocument(); // DifficultyBadge: medium
    expect(screen.getByText("✗")).toBeInTheDocument(); // CorrectionBadge
    expect(screen.getByText("2/5")).toBeInTheDocument(); // ScoreDisplay

    // QuestionBody
    expect(screen.getByText("题目原文")).toBeInTheDocument();

    // AnswerComparePanel
    expect(screen.getByText("学生作答")).toBeInTheDocument();
    expect(screen.getByText("标准答案")).toBeInTheDocument();

    // TeacherCommentPanel
    expect(screen.getByText("教师批注")).toBeInTheDocument();

    // CorrectionPanel
    expect(screen.getByText("学生订正")).toBeInTheDocument();

    // SolutionStepsPanel
    expect(screen.getByText("解题步骤")).toBeInTheDocument();

    // ErrorAnalysisPanel
    expect(screen.getByText("错因分析")).toBeInTheDocument();

    // Footer: KnowledgeBadge + PrerequisiteBadge
    expect(screen.getByText("长方体")).toBeInTheDocument();
    expect(screen.getByText("← 整数运算")).toBeInTheDocument();
  });

  it("renders basic mode — hides sections without data", async () => {
    const question = createBasicQuestion();
    await renderCard({ question });

    // Header rendered
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("选择题")).toBeInTheDocument();
    expect(screen.getByText("●▷▷")).toBeInTheDocument();

    // Body rendered
    expect(screen.getByText("题目原文")).toBeInTheDocument();

    // No optional sections
    expect(screen.queryByText("学生作答")).not.toBeInTheDocument();
    expect(screen.queryByText("标准答案")).not.toBeInTheDocument();
    expect(screen.queryByText("教师批注")).not.toBeInTheDocument();
    expect(screen.queryByText("学生订正")).not.toBeInTheDocument();
    expect(screen.queryByText("解题步骤")).not.toBeInTheDocument();
    expect(screen.queryByText("错因分析")).not.toBeInTheDocument();
  });

  it("renders minimal mode — only header + body + footer", async () => {
    const question = createMinimalQuestion();
    // Add knowledge points so footer renders
    const questionWithKP = { ...question, knowledge_points: ["数学"] };
    await renderCard({ question: questionWithKP });

    // Header with badge
    expect(screen.getByText("3")).toBeInTheDocument();

    // Body
    expect(screen.getByText("题目原文")).toBeInTheDocument();

    // Footer with knowledge badges
    expect(screen.getByText("数学")).toBeInTheDocument();

    // No optional sections
    expect(screen.queryByText("学生作答")).not.toBeInTheDocument();
    expect(screen.queryByText("标准答案")).not.toBeInTheDocument();
    expect(screen.queryByText("解题步骤")).not.toBeInTheDocument();
    expect(screen.queryByText("错因分析")).not.toBeInTheDocument();
  });

  it("renders accordion mode", async () => {
    const question = createFullQuestion();
    const { container } = await renderCard({ question, mode: "accordion" });

    // Content renders
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("学生作答")).toBeInTheDocument();

    // In accordion mode, no HeroUI Card outer wrapper (no shadow class)
    // The content should be inside a plain div
    expect(screen.getByText("解题步骤")).toBeInTheDocument();
  });

  it("renders standalone mode", async () => {
    const question = createBasicQuestion();
    await renderCard({ question, mode: "standalone" });

    // Content renders same as full
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("选择题")).toBeInTheDocument();
  });

  it("applies isSelected ring style", async () => {
    const question = createBasicQuestion();
    const { container } = await renderCard({ question, isSelected: true });

    // Check that the rendered HTML contains the ring class
    expect(container.innerHTML).toContain("ring-2");
  });

  it("fires click handler with question data", async () => {
    const question = createFullQuestion();
    const handleClick = vi.fn();
    await renderCard({ question, onQuestionClick: handleClick });

    // Click inside the card body; event bubbles up to Card's onClick
    await userEvent.click(screen.getByText("题目原文"));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(question.question_index, question.block_bbox);
  });

  it("conditionally hides AnswerComparePanel when no answers", async () => {
    const question = createFullQuestion({ student_answer: null, standard_answer: null });
    await renderCard({ question });

    expect(screen.queryByText("学生作答")).not.toBeInTheDocument();
    expect(screen.queryByText("标准答案")).not.toBeInTheDocument();
  });

  it("conditionally hides TeacherCommentPanel when no comment", async () => {
    const question = createFullQuestion({
      teacher_correction: { mark: "✗", score: 2, max_score: 5, comment: null },
    });
    await renderCard({ question });

    expect(screen.queryByText("教师批注")).not.toBeInTheDocument();
  });

  it("conditionally hides CorrectionPanel when no correction", async () => {
    const question = createFullQuestion({ student_correction: null });
    await renderCard({ question });

    expect(screen.queryByText("学生订正")).not.toBeInTheDocument();
  });

  it("conditionally hides SolutionStepsPanel when no steps", async () => {
    const question = createFullQuestion({ solution_steps: [] });
    await renderCard({ question });

    expect(screen.queryByText("解题步骤")).not.toBeInTheDocument();
  });

  it("conditionally hides ErrorAnalysisPanel when no error analysis", async () => {
    const question = createFullQuestion({ error_analysis: null });
    await renderCard({ question });

    expect(screen.queryByText("错因分析")).not.toBeInTheDocument();
  });

  it("renders KnowledgeBadge for each knowledge_point", async () => {
    const question = createFullQuestion();
    await renderCard({ question });

    for (const kp of question.knowledge_points) {
      expect(screen.getByText(kp)).toBeInTheDocument();
    }
  });

  it("renders PrerequisiteBadge for each prerequisite_knowledge", async () => {
    const question = createFullQuestion();
    await renderCard({ question });

    for (const pr of question.prerequisite_knowledge) {
      expect(screen.getByText(`← ${pr}`)).toBeInTheDocument();
    }
  });

  it("renders ConfidenceIndicator when fusion_meta is present", async () => {
    const question = createFullQuestion({
      fusion_meta: {
        source_per_field: { is_correct: "paddleocr" },
        confidence_per_field: { is_correct: 0.45 },
        conflicts: [],
      },
    });
    await renderCard({ question });
    // Low confidence (0.45), no conflicts → should show percentage
    expect(screen.getByText((content) => content.includes("45%"))).toBeInTheDocument();
  });

  it("renders conflict warning when fusion_meta has conflicts", async () => {
    const question = createFullQuestion({
      fusion_meta: {
        source_per_field: { is_correct: "paddleocr" },
        confidence_per_field: { is_correct: 0.9 },
        conflicts: [{ field: "score", detail: "PaddleOCR says 5, QwenVL says 3" }],
      },
    });
    await renderCard({ question });
    // Has conflict → ⚠ marker
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });

  it("does not render fusion_meta indicators when fusion_meta is absent (backward compat)", async () => {
    const question = createFullQuestion();
    expect(question.fusion_meta).toBeUndefined();
    await renderCard({ question });
    // Normal rendering — "2/5" for ScoreDisplay should still be there
    expect(screen.getByText("2/5")).toBeInTheDocument();
  });
});
