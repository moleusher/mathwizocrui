import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownRenderer } from "./MarkdownRenderer";

const meta: Meta<typeof MarkdownRenderer> = {
  title: "Components/MarkdownRenderer",
  component: MarkdownRenderer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkdownRenderer>;

export const Default: Story = {
  args: {
    content: "这是一段普通的文字内容。",
  },
};

export const WithInlineMath: Story = {
  args: {
    content: "质能方程 $E=mc^2$ 是爱因斯坦提出的。",
  },
};

export const WithDisplayMath: Story = {
  args: {
    content: "已知 $$S = 2(ab+ah+bh)$$，求表面积。",
  },
};

export const MixedContent: Story = {
  args: {
    content: `# 解题思路

1. **分析已知条件**：已知长方体的长、宽、高分别为 $a=3$、$b=4$、$h=5$。
2. **代入公式**：
   $$S = 2(ab + ah + bh)$$
   $$S = 2(3 \\times 4 + 3 \\times 5 + 4 \\times 5)$$
3. **计算结果**：
   $$S = 2(12 + 15 + 20) = 2 \\times 47 = 94$$

> 注意：单位要统一，最终结果带上平方单位。

- 表面积公式需要熟练掌握
- 计算时要细心避免出错`,
  },
};

export const Empty: Story = {
  args: {
    content: "",
  },
};

export const WithHTML: Story = {
  args: {
    content: "这是 <b>加粗</b> 和 <i>斜体</i> 文本。",
    htmlMode: "sanitize",
  },
};

export const LongContent: Story = {
  args: {
    content: `## 应用题：行程问题

### 题目描述
小明从家出发去学校，先步行了一段距离，然后骑自行车完成了剩余的路程。已知：

1. 小明家到学校的总距离为 $10\\text{km}$
2. 步行速度为 $5\\text{km/h}$
3. 骑自行车速度为 $15\\text{km/h}$
4. 全程共用了 $1$ 小时

### 问题
求小明步行和骑自行车各用了多少时间？各走了多少距离？

### 解题步骤

**设未知数：**
设步行时间为 $t_1$ 小时，骑自行车时间为 $t_2$ 小时。

**列方程组：**
$$
\\begin{cases}
t_1 + t_2 = 1 \\\\
5t_1 + 15t_2 = 10
\\end{cases}
$$

**解方程组：**
由第一个方程得 $t_2 = 1 - t_1$，代入第二个方程：

$$
5t_1 + 15(1 - t_1) = 10
$$
$$
5t_1 + 15 - 15t_1 = 10
$$
$$
-10t_1 = -5
$$
$$
t_1 = 0.5
$$

所以 $t_2 = 1 - 0.5 = 0.5$。

**求距离：**
- 步行距离：$5 \\times 0.5 = 2.5\\text{km}$
- 自行车距离：$15 \\times 0.5 = 7.5\\text{km}$

**答案：** 小明步行 $0.5$ 小时走了 $2.5\\text{km}$，骑自行车 $0.5$ 小时走了 $7.5\\text{km}$。`,
  },
};
