import type { Meta, StoryObj } from "@storybook/react";
import { CorrectionPanel } from "./CorrectionPanel";

const meta: Meta<typeof CorrectionPanel> = {
  title: "Components/CorrectionPanel",
  component: CorrectionPanel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CorrectionPanel>;

export const Default: Story = {
  args: {
    text: "正确解法：应先计算半径 $r = \\frac{C}{2\\pi} = \\frac{12.56}{2 \\times 3.14} = 2$，再求体积 $V = \\pi r^2 h = 3.14 \\times 4 \\times 10 = 125.6$。",
  },
};

export const PlainText: Story = {
  args: {
    text: "订正：将第二步的计算结果改为 125.6，并补上单位 cm³。",
  },
};

export const WithMath: Story = {
  args: {
    text: "重新计算：\n\n$$\\begin{aligned}S &= 2(ab + ah + bh) \\\\ &= 2(3\\times 4 + 3\\times 5 + 4\\times 5) \\\\ &= 2(12 + 15 + 20) \\\\ &= 2 \\times 47 = 94\\end{aligned}$$",
  },
};
