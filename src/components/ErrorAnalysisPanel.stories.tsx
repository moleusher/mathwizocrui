import type { Meta, StoryObj } from "@storybook/react";
import { ErrorAnalysisPanel } from "./ErrorAnalysisPanel";
import type { ErrorAnalysis } from "../types/question";

const meta: Meta<typeof ErrorAnalysisPanel> = {
  title: "Components/ErrorAnalysisPanel",
  component: ErrorAnalysisPanel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorAnalysisPanel>;

export const Default: Story = {
  args: {
    analysis: {
      cause: "学生错误地将圆柱的底面周长当成了底面直径，导致半径计算错误。",
      type: "计算失误",
      suggestion: "建议加强圆的周长与直径关系的练习。",
    },
  },
};

export const WithSuggestion: Story = {
  args: {
    analysis: {
      cause: '学生未能正确理解题意，将"增加了"误读为"增加到"。',
      type: "审题失误",
      suggestion:
        '建议在审题时圈画出关键词，区分"增加了"和"增加到"的区别。"增加了"是在原数基础上加，"增加到"是最终达到的数值。可以多做对比练习。',
    },
  },
};

export const LongCause: Story = {
  args: {
    analysis: {
      cause:
        "学生在解这道题时出现了多处错误。首先，在第一步设未知数时没有明确写出单位，导致后续计算中单位混淆。其次，在代入公式时误将 $a=3$ 写成了 $a=2$，使得整个计算过程偏离了正确方向。最后，在计算结果时没有进行验算，导致错误没有被及时发现。",
      type: "计算失误",
    },
  },
};

export const Collapsed: Story = {
  args: {
    analysis: {
      cause: "学生未能掌握二次函数的顶点式转换方法，在配方过程中符号处理错误。",
      type: "知识点漏洞",
      suggestion:
        "建议复习配方法的步骤：$ax^2 + bx + c = a(x + \\frac{b}{2a})^2 + \\frac{4ac - b^2}{4a}$",
    },
    defaultExpanded: false,
  },
};

export const NullAnalysis: Story = {
  args: {},
};
