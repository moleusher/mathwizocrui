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
