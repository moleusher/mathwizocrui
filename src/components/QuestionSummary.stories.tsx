import type { Meta, StoryObj } from '@storybook/react';
import { QuestionSummary } from './QuestionSummary';
import type { ExamQuestion } from '../types/question';

const meta: Meta<typeof QuestionSummary> = {
  title: 'Components/QuestionSummary',
  component: QuestionSummary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuestionSummary>;

const createMockQuestion = (overrides: Partial<ExamQuestion> = {}): ExamQuestion => ({
  question_index: 1,
  question_text: '计算长方体的表面积，已知长 $a=3\\text{cm}$、宽 $b=4\\text{cm}$、高 $h=5\\text{cm}$。',
  question_type: 'calculation',
  difficulty: 'medium',
  knowledge_points: ['面积计算', '长方体'],
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
  source: 'ocr',
  ...overrides,
} as ExamQuestion);

export const FullData: Story = {
  args: {
    question: createMockQuestion({
      question_index: 3,
      teacher_correction: {
        mark: '✓',
        score: 5,
        max_score: 5,
        comment: '完全正确',
      },
    }),
  },
};

export const WrongAnswer: Story = {
  args: {
    question: createMockQuestion({
      question_index: 4,
      question_text: '解方程 $2x + 5 = 13$，求 $x$ 的值。',
      question_type: 'solution',
      difficulty: 'easy',
      teacher_correction: {
        mark: '✗',
        score: 1,
        max_score: 5,
        comment: '移项时符号错误',
      },
    }),
  },
};

export const Unmarked: Story = {
  args: {
    question: createMockQuestion({
      question_index: 7,
      question_text: '证明：三角形内角和为 $180^\\circ$。',
      question_type: 'proof',
      difficulty: 'hard',
      teacher_correction: null,
    }),
  },
};

export const Truncated: Story = {
  args: {
    question: createMockQuestion({
      question_index: 2,
      question_text:
        '已知一个圆柱体的底面周长为 $12.56\\text{cm}$，高为 $10\\text{cm}$，求圆柱体的体积和侧面积，以及全面积。要求写出完整的解题步骤，并保留两位小数。',
      question_type: 'calculation',
      difficulty: 'hard',
      teacher_correction: null,
    }),
    maxChars: 80,
  },
};

export const Minimal: Story = {
  args: {
    question: createMockQuestion({
      question_index: 1,
      question_text: '计算：$3 + 5 = ?$',
      question_type: 'unknown',
      difficulty: 'unknown',
      teacher_correction: null,
    }),
  },
};
