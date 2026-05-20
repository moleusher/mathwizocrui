import type { Meta, StoryObj } from '@storybook/react';
import { AnswerComparePanel } from './AnswerComparePanel';
import type { StudentAnswer, StandardAnswer } from '../types/question';

const meta: Meta<typeof AnswerComparePanel> = {
  title: 'Components/AnswerComparePanel',
  component: AnswerComparePanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AnswerComparePanel>;

export const BothAnswers: Story = {
  args: {
    studentAnswer: {
      text: '解：设圆柱底面半径为 $r$，则 $2\\pi r = 12.56$，所以 $r = 2$。体积 $V = \\pi r^2 h = 3.14 \\times 2^2 \\times 10 = 125.6$。',
      confidence: 0.92,
    } as StudentAnswer,
    standardAnswer: {
      text: '$$r = \\frac{12.56}{2\\pi} = 2$$ $$V = \\pi r^2 h = 3.14 \\times 4 \\times 10 = 125.6$$',
      source: 'llm',
    } as StandardAnswer,
  },
};

export const StudentOnly: Story = {
  args: {
    studentAnswer: {
      text: '周长 $12.56$，除以 $2\\pi$ 得半径 $r=2$，体积 $= \\pi \\times 4 \\times 10 = 125.6$。',
      confidence: 0.85,
    } as StudentAnswer,
    standardAnswer: null,
  },
};

export const StandardOnly: Story = {
  args: {
    studentAnswer: null,
    standardAnswer: {
      text: '$$r = \\frac{C}{2\\pi} = \\frac{12.56}{2\\pi} = 2$$ $$S = \\pi r^2 = 4\\pi$$ $$V = Sh = 4\\pi \\times 10 = 40\\pi \\approx 125.6$$',
      source: 'llm',
    } as StandardAnswer,
  },
};

export const LowConfidence: Story = {
  args: {
    studentAnswer: {
      text: '底面半径 $r=12.56\\div 3.14 \\div 2 = 2$，体积 $= 3.14 \\times 4 \\times 10 = 125.6$。',
      confidence: 0.45,
    } as StudentAnswer,
    standardAnswer: null,
  },
};

export const Empty: Story = {
  args: {
    studentAnswer: null,
    standardAnswer: null,
  },
};
