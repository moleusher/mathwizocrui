import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";
import { QuestionList } from "./QuestionList";
import type { ExamQuestion } from "../types/question";

const meta: Meta<typeof QuestionList> = {
  title: "Components/QuestionList",
  component: QuestionList,
  tags: ["autodocs"],
  args: {
    onFilterChange: fn(),
    onQuestionClick: fn(),
    onRetry: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof QuestionList>;

const baseQuestions: ExamQuestion[] = [
  {
    question_index: 1,
    question_text: "计算：$25 \\times 48 = ?$ 要求写出竖式计算过程。",
    question_type: "calculation",
    difficulty: "easy",
    knowledge_points: ["乘法"],
    images: [],
    student_answer: {
      text: "$25 \\times 48 = 25 \\times (50 - 2) = 1250 - 50 = 1200$",
      confidence: 0.9,
    },
    teacher_correction: {
      mark: "✓",
      score: 5,
      max_score: 5,
      comment: "简便计算运用得很好",
    },
    standard_answer: {
      text: "$$25 \\times 48 = 1200$$",
      source: "llm",
    },
    student_correction: null,
    solution_steps: [
      {
        step: 1,
        content: "将 $48$ 拆分为 $50 - 2$",
        knowledge: "简便运算",
      },
      {
        step: 2,
        content: "$25 \\times 50 = 1250$，$25 \\times 2 = 50$",
        knowledge: "乘法",
      },
      {
        step: 3,
        content: "$1250 - 50 = 1200$",
        knowledge: "减法",
      },
    ],
    error_analysis: null,
    prerequisite_knowledge: ["乘法口诀", "简便运算"],
    common_mistakes: [],
    related_block_ids: [1],
    block_bbox: null,
    source: "ocr",
  },
  {
    question_index: 2,
    question_text: "一个长方形的长是 $12\\text{cm}$，宽是 $8\\text{cm}$，求面积。",
    question_type: "calculation",
    difficulty: "easy",
    knowledge_points: ["面积计算"],
    images: [],
    student_answer: {
      text: "$12 \\times 8 = 96$",
      confidence: 0.95,
    },
    teacher_correction: {
      mark: "✗",
      score: 2,
      max_score: 5,
      comment: "没有写单位",
    },
    standard_answer: {
      text: "$$S = 12 \\times 8 = 96\\text{cm}^2$$",
      source: "llm",
    },
    student_correction: "面积 $= 12 \\times 8 = 96\\text{cm}^2$",
    solution_steps: [
      {
        step: 1,
        content: "长方形面积公式：$S = a \\times b$",
      },
      {
        step: 2,
        content: "$S = 12 \\times 8 = 96\\text{cm}^2$",
      },
    ],
    error_analysis: {
      cause: "计算出数值后忘记写单位",
      type: "规范失分",
      suggestion: "每次做完题检查单位和答句",
    },
    prerequisite_knowledge: ["乘法口诀"],
    common_mistakes: ["忘记写单位"],
    related_block_ids: [2],
    block_bbox: null,
    source: "ocr",
  },
  {
    question_index: 3,
    question_text: "解方程 $3x + 7 = 22$，求 $x$ 的值。",
    question_type: "solution",
    difficulty: "easy",
    knowledge_points: ["方程"],
    images: [],
    student_answer: {
      text: "$3x = 22 - 7 = 15$，$x = 5$",
      confidence: 0.88,
    },
    teacher_correction: {
      mark: "✓",
      score: 5,
      max_score: 5,
      comment: "步骤正确",
    },
    standard_answer: {
      text: "$$3x + 7 = 22 \\Rightarrow 3x = 15 \\Rightarrow x = 5$$",
      source: "llm",
    },
    student_correction: null,
    solution_steps: [
      { step: 1, content: "移项：$3x = 22 - 7$", knowledge: "移项" },
      { step: 2, content: "$3x = 15$", knowledge: "计算" },
      { step: 3, content: "$x = 5$", knowledge: "系数化1" },
    ],
    error_analysis: null,
    prerequisite_knowledge: ["移项", "除法"],
    common_mistakes: ["移项符号错误"],
    related_block_ids: [3],
    block_bbox: null,
    source: "ocr",
  },
  {
    question_index: 4,
    question_text: "证明三角形内角和为 $180^\\circ$。",
    question_type: "proof",
    difficulty: "hard",
    knowledge_points: ["三角形", "角度"],
    images: [],
    student_answer: null,
    teacher_correction: null,
    standard_answer: null,
    student_correction: null,
    solution_steps: [],
    error_analysis: null,
    prerequisite_knowledge: ["平行线性质", "同位角"],
    common_mistakes: [],
    related_block_ids: [4],
    block_bbox: null,
    source: "manual",
  },
  {
    question_index: 5,
    question_text: "已知圆柱的底面半径为 $3\\text{cm}$，高为 $10\\text{cm}$，求体积。",
    question_type: "calculation",
    difficulty: "medium",
    knowledge_points: ["圆柱体积"],
    images: [],
    student_answer: {
      text: "$V = 3.14 \\times 3^2 \\times 10 = 282.6\\text{cm}^3$",
      confidence: 0.75,
    },
    teacher_correction: {
      mark: "?",
      score: 3,
      max_score: 5,
      comment: "格式不够规范",
    },
    standard_answer: {
      text: "$$V = \\pi r^2 h = \\pi \\times 3^2 \\times 10 = 90\\pi \\approx 282.74\\text{cm}^3$$",
      source: "llm",
    },
    student_correction: null,
    solution_steps: [
      {
        step: 1,
        content: "圆柱体积公式：$V = \\pi r^2 h$",
        knowledge: "公式",
      },
      {
        step: 2,
        content: "$V = \\pi \\times 3^2 \\times 10 = 90\\pi$",
        knowledge: "代入",
      },
      {
        step: 3,
        content: "$V \\approx 282.74\\text{cm}^3$",
        knowledge: "计算",
      },
    ],
    error_analysis: {
      cause: "学生使用了近似值 $3.14$ 而非保留 $\\pi$，且保留小数位数不够。",
      type: "规范失分",
      suggestion: "推荐保留精确值 $90\\pi$，最后再取近似值。",
    },
    prerequisite_knowledge: ["圆的面积", "乘方"],
    common_mistakes: ["混淆半径和直径"],
    related_block_ids: [5],
    block_bbox: null,
    source: "ocr",
  },
];

export const AccordionMode: Story = {
  args: {
    questions: baseQuestions,
    browseMode: "accordion",
  },
};

export const ScrollMode: Story = {
  args: {
    questions: baseQuestions,
    browseMode: "scroll",
  },
};

export const Loading: Story = {
  args: {
    questions: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    questions: [],
  },
};

export const Error: Story = {
  args: {
    questions: [],
    error: "加载失败，请重试",
    onRetry: fn(),
  },
};

export const FilterWrong: Story = {
  args: {
    questions: baseQuestions,
    browseMode: "scroll",
    filter: "wrong",
  },
};

export const FilterUnmarked: Story = {
  args: {
    questions: baseQuestions,
    browseMode: "scroll",
    filter: "unmarked",
  },
};

// Story: Interactive checkbox selection (click to toggle)
export const WithSelection: Story = {
  args: {
    questions: baseQuestions,
    browseMode: "scroll",
    selectedIndices: new Set([1, 3]),
  },
  render: function InteractiveSelection(args) {
    const [selected, setSelected] = React.useState(new Set([1, 3]));
    return (
      <QuestionList
        {...args}
        selectedIndices={selected}
        onSelectChange={(index, checked) => {
          setSelected(prev => {
            const next = new Set(prev);
            checked ? next.add(index) : next.delete(index);
            return next;
          });
        }}
      />
    );
  },
};

// Story: Accordion with interactive checkbox selection
export const AccordionWithSelection: Story = {
  args: {
    questions: baseQuestions,
    browseMode: "accordion",
    selectedIndices: new Set([2]),
  },
  render: function InteractiveAccordionSelection(args) {
    const [selected, setSelected] = React.useState(new Set([2]));
    return (
      <QuestionList
        {...args}
        selectedIndices={selected}
        onSelectChange={(index, checked) => {
          setSelected(prev => {
            const next = new Set(prev);
            checked ? next.add(index) : next.delete(index);
            return next;
          });
        }}
      />
    );
  },
};
