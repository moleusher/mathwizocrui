import type { Meta, StoryObj } from "@storybook/react";
import { AnswerComparePanel } from "./AnswerComparePanel";
import type { StudentAnswer, StandardAnswer } from "../types/question";

const meta: Meta<typeof AnswerComparePanel> = {
  title: "Components/AnswerComparePanel",
  component: AnswerComparePanel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnswerComparePanel>;

export const BothAnswers: Story = {
  args: {
    studentAnswer: {
      text: "解：设圆柱底面半径为 $r$，则 $2\\pi r = 12.56$，所以 $r = 2$。体积 $V = \\pi r^2 h = 3.14 \\times 2^2 \\times 10 = 125.6$。",
      confidence: 0.92,
    },
    standardAnswer: {
      text: "$$r = \\frac{12.56}{2\\pi} = 2$$ $$V = \\pi r^2 h = 3.14 \\times 4 \\times 10 = 125.6$$",
      source: "llm",
    },
  },
};

export const StudentOnly: Story = {
  args: {
    studentAnswer: {
      text: "周长 $12.56$，除以 $2\\pi$ 得半径 $r=2$，体积 $= \\pi \\times 4 \\times 10 = 125.6$。",
      confidence: 0.85,
    },
    standardAnswer: null,
  },
};

export const StandardOnly: Story = {
  args: {
    studentAnswer: null,
    standardAnswer: {
      text: "$$r = \\frac{C}{2\\pi} = \\frac{12.56}{2\\pi} = 2$$ $$S = \\pi r^2 = 4\\pi$$ $$V = Sh = 4\\pi \\times 10 = 40\\pi \\approx 125.6$$",
      source: "llm",
    },
  },
};

export const LowConfidence: Story = {
  args: {
    studentAnswer: {
      text: "底面半径 $r=12.56\\div 3.14 \\div 2 = 2$，体积 $= 3.14 \\times 4 \\times 10 = 125.6$。",
      confidence: 0.45,
    },
    standardAnswer: null,
  },
};

export const Empty: Story = {
  args: {
    studentAnswer: null,
    standardAnswer: null,
  },
};

// v0.4.0 studentVariant stories
export const StudentCorrect: Story = {
  args: {
    studentAnswer: {
      text: "S=2(ab+ah+bh)=2×(25×25+25×26+25×26)=3850(cm²)",
      confidence: 0.95,
    },
    standardAnswer: {
      text: "S=2×(25×22+25×26+22×26)=3544(cm²)",
      source: "llm",
    },
    studentVariant: "correct",
  },
};

export const StudentWrong: Story = {
  args: {
    studentAnswer: {
      text: "V=abh=25×25×26=16250(cm³)",
    },
    standardAnswer: {
      text: "V=25×22×26=14300(cm³)",
      source: "llm",
    },
    studentVariant: "wrong",
  },
};

export const StudentPartial: Story = {
  args: {
    studentAnswer: {
      text: "思路正确但数值错误",
    },
    standardAnswer: {
      text: "参考答案",
      source: "llm",
    },
    studentVariant: "partial",
  },
};

export const StudentUnmarked: Story = {
  args: {
    studentAnswer: {
      text: "学生作答内容（无批改标记）",
    },
    standardAnswer: {
      text: "标准答案（等待判定）",
      source: "llm",
    },
    studentVariant: "unmarked",
  },
};

export const MinimalistBoth: Story = {
  args: {
    studentAnswer: {
      text: "S=2(ab+ah+bh)=3850",
    },
    standardAnswer: {
      text: "S=3544",
      source: "llm",
    },
    studentVariant: "wrong",
    variant: "minimalist",
  },
};
