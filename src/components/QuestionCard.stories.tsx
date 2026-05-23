import type { Meta, StoryObj } from "@storybook/react";
import { QuestionCard } from "./QuestionCard";
import type { ExamQuestion } from "../types/question";

const meta: Meta<typeof QuestionCard> = {
  title: "Components/QuestionCard",
  component: QuestionCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

const createFullQuestion = (overrides: Partial<ExamQuestion> = {}): ExamQuestion => ({
  question_index: 1,
  question_text: "计算圆柱体的体积，已知底面周长为 $12.56\\text{cm}$，高为 $10\\text{cm}$。",
  question_type: "calculation",
  difficulty: "medium",
  knowledge_points: ["圆柱体积", "圆周率应用"],
  images: [{ url: "http://localhost:6006/placeholder.jpg", caption: "圆柱示意图" }],
  student_answer: {
    text: "底面半径 $r = 12.56 \\div 3.14 \\div 2 = 2\\text{cm}$，体积 $V = 3.14 \\times 2^2 \\times 10 = 125.6\\text{cm}^3$。",
    confidence: 0.92,
  },
  teacher_correction: {
    mark: "✓",
    score: 5,
    max_score: 5,
    comment: "完全正确，步骤清晰",
  },
  standard_answer: {
    text: "$$r = \\frac{12.56}{2\\pi} = 2\\text{cm}$$ $$V = \\pi r^2h = 3.14 \\times 4 \\times 10 = 125.6\\text{cm}^3$$",
    source: "llm",
  },
  student_correction: null,
  solution_steps: [
    {
      step: 1,
      content: "由周长求半径：$C = 2\\pi r$，$12.56 = 2 \\times 3.14 \\times r$，得 $r = 2$。",
      knowledge: "公式应用",
    },
    {
      step: 2,
      content: "代入体积公式：$V = \\pi r^2 h = 3.14 \\times 2^2 \\times 10$。",
      knowledge: "代入计算",
    },
    {
      step: 3,
      content: "计算结果：$V = 125.6\\text{cm}^3$。",
      knowledge: "计算",
    },
  ],
  error_analysis: null,
  prerequisite_knowledge: ["圆的周长", "乘除法"],
  common_mistakes: ["周长与直径混淆", "忘记写单位"],
  related_block_ids: [1, 2],
  block_bbox: { x: 100, y: 200, width: 500, height: 300 },
  source: "ocr",
  ...overrides,
});

const basicQuestion = (): ExamQuestion => ({
  question_index: 2,
  question_text: "计算：$25 \\times 48 = ?$",
  question_type: "calculation",
  difficulty: "easy",
  knowledge_points: ["乘法"],
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
  source: "manual",
});

const wrongQuestion = (): ExamQuestion => ({
  question_index: 3,
  question_text: "一个长方形的长是 $12\\text{cm}$，宽是 $8\\text{cm}$，求面积。",
  question_type: "calculation",
  difficulty: "easy",
  knowledge_points: ["面积计算", "长方形"],
  images: [],
  student_answer: {
    text: "面积 $= 12 \\times 8 = 96$",
    confidence: 0.95,
  },
  teacher_correction: {
    mark: "✗",
    score: 2,
    max_score: 5,
    comment: "计算正确但没有写单位",
  },
  standard_answer: {
    text: "面积 $= 12 \\times 8 = 96\\text{cm}^2$",
    source: "llm",
  },
  student_correction: "面积 $= 12 \\times 8 = 96\\text{cm}^2$",
  solution_steps: [
    {
      step: 1,
      content: "长方形面积公式：$S = a \\times b$",
      knowledge: "公式",
    },
    {
      step: 2,
      content: "代入：$S = 12 \\times 8 = 96\\text{cm}^2$",
      knowledge: "代入计算",
    },
  ],
  error_analysis: {
    cause: "学生计算出数值结果后忘记书写面积单位。",
    type: "规范失分",
    suggestion: "建议在每次计算后检查答案是否包含正确的单位，养成好习惯。",
  },
  prerequisite_knowledge: ["乘法口诀"],
  common_mistakes: ["忘记写单位"],
  related_block_ids: [3],
  block_bbox: null,
  source: "ocr",
});

const unmarkedQuestion = (): ExamQuestion => ({
  question_index: 4,
  question_text: "证明：$\\sqrt{2}$ 是无理数。",
  question_type: "proof",
  difficulty: "hard",
  knowledge_points: ["无理数", "反证法"],
  images: [],
  student_answer: {
    text: "假设 $\\sqrt{2} = \\frac{p}{q}$（$p,q$ 互质），则 $2 = \\frac{p^2}{q^2}$，即 $p^2 = 2q^2$，所以 $p$ 是偶数...",
    confidence: 0.65,
  },
  teacher_correction: null,
  standard_answer: null,
  student_correction: null,
  solution_steps: [],
  error_analysis: null,
  prerequisite_knowledge: ["有理数", "因数分解"],
  common_mistakes: [],
  related_block_ids: [4],
  block_bbox: null,
  source: "ocr",
});

export const FullMode: Story = {
  args: {
    question: createFullQuestion(),
    mode: "full",
  },
};

export const AccordionMode: Story = {
  args: {
    question: createFullQuestion(),
    mode: "accordion",
    isExpanded: true,
  },
};

export const StandaloneMode: Story = {
  args: {
    question: createFullQuestion({ question_index: 5 }),
    mode: "standalone",
  },
};

export const BasicData: Story = {
  args: {
    question: basicQuestion(),
    mode: "full",
  },
};

export const WrongAnswer: Story = {
  args: {
    question: wrongQuestion(),
    mode: "full",
  },
};

export const Unmarked: Story = {
  args: {
    question: unmarkedQuestion(),
    mode: "full",
  },
};

export const Selected: Story = {
  args: {
    question: createFullQuestion({ question_index: 6 }),
    mode: "full",
    isSelected: true,
  },
};

export const NoImages: Story = {
  args: {
    question: createFullQuestion({ images: [] }),
    mode: "full",
  },
};

export const NoSolutionSteps: Story = {
  args: {
    question: createFullQuestion({ solution_steps: [] }),
    mode: "full",
  },
};
