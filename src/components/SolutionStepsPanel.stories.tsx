import type { Meta, StoryObj } from "@storybook/react";
import { SolutionStepsPanel } from "./SolutionStepsPanel";
import type { SolutionStep } from "../types/question";

const meta: Meta<typeof SolutionStepsPanel> = {
  title: "Components/SolutionStepsPanel",
  component: SolutionStepsPanel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SolutionStepsPanel>;

const mockSteps: SolutionStep[] = [
  {
    step: 1,
    content: "设长方体的长、宽、高分别为 $a=3\\text{cm}$、$b=4\\text{cm}$、$h=5\\text{cm}$。",
    knowledge: "审题",
  },
  {
    step: 2,
    content: "长方体表面积公式：$S = 2(ab + ah + bh)$",
    knowledge: "公式记忆",
  },
  {
    step: 3,
    content:
      "代入数值：\n$$\\begin{aligned}S &= 2(3\\times 4 + 3\\times 5 + 4\\times 5) \\\\ &= 2(12 + 15 + 20) \\\\ &= 2 \\times 47 = 94\\end{aligned}$$",
    knowledge: "代入计算",
  },
  {
    step: 4,
    content: "答：长方体的表面积为 $94\\text{cm}^2$。",
    knowledge: "作答",
  },
];

const twoSteps: SolutionStep[] = [
  {
    step: 1,
    content: "根据题意，设 $x = 2$，则 $y = 3$。",
  },
  {
    step: 2,
    content: "代入公式得：$S = \\pi r^2 = 3.14 \\times 4 = 12.56$。",
  },
];

export const Collapsed: Story = {
  args: {
    steps: mockSteps,
    defaultExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    steps: mockSteps,
    defaultExpanded: true,
  },
};

export const FewSteps: Story = {
  args: {
    steps: twoSteps,
    defaultExpanded: false,
  },
};

export const Empty: Story = {
  args: {
    steps: [],
  },
};

// v0.4.0 timeline variant stories
export const Timeline: Story = {
  args: {
    variant: "timeline",
    steps: [
      { step: 1, content: "**分析条件**: 已知原始瓷尊最大宽 24.2cm、口径 21.4cm、高 25.6cm" },
      { step: 2, content: "**取整处理**: 24.2cm → 25cm, 21.4cm → 22cm, 25.6cm → 26cm" },
      { step: 3, content: "**应用公式**: S=2(ab+ah+bh)=2×(25×22+25×26+22×26)" },
      { step: 4, content: "**计算结果**: S=2×(550+650+572)=2×1772=3544(cm²)" },
    ],
  },
};

export const TimelineTwoSteps: Story = {
  args: {
    variant: "timeline",
    steps: [
      { step: 1, content: "**识别题型**: 这是排水法体积问题" },
      { step: 2, content: "**计算**: V铁=2³=8dm³, h升=8÷(8×4)=0.25dm=2.5cm" },
    ],
  },
};

export const MinimalistTimeline: Story = {
  args: {
    variant: "minimalist",
    steps: [
      { step: 1, content: "步骤一" },
      { step: 2, content: "步骤二" },
      { step: 3, content: "步骤三" },
    ],
  },
};
