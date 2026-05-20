import type { Meta, StoryObj } from '@storybook/react';
import { QuestionBody } from './QuestionBody';
import type { QuestionImage } from '../types/question';

const meta: Meta<typeof QuestionBody> = {
  title: 'Components/QuestionBody',
  component: QuestionBody,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof QuestionBody>;

export const WithTextOnly: Story = {
  args: {
    text: '计算：$3.14 \\times 2.5^2$，并保留两位小数。',
  },
};

export const WithImages: Story = {
  args: {
    text: '观察下图，计算阴影部分的面积。',
    images: [
      {
        url: 'http://localhost:6006/placeholder.jpg',
        caption: '几何示意图',
        width: 400,
        height: 300,
      } as QuestionImage,
      {
        url: 'http://localhost:6006/placeholder2.jpg',
        caption: '辅助线说明',
        width: 400,
        height: 300,
      } as QuestionImage,
    ],
  },
};

export const WithMathFormula: Story = {
  args: {
    text: '已知二次函数 $f(x) = ax^2 + bx + c$ 的图像经过点 $(0, 1)$、$(1, 2)$、$(-1, 6)$，求 $f(x)$ 的解析式。',
  },
};

export const LongText: Story = {
  args: {
    text: `### 阅读理解题

阅读下列材料：

**材料一：** 对于任意实数 $x$，$y$，有不等式 $x^2 + y^2 \\geq 2xy$ 成立，当且仅当 $x = y$ 时等号成立。

**材料二：** 推广到一般情况，对于正实数 $a_i$，有：
$$\\frac{a_1 + a_2 + \\cdots + a_n}{n} \\geq \\sqrt[n]{a_1 a_2 \\cdots a_n}$$
当且仅当 $a_1 = a_2 = \\cdots = a_n$ 时等号成立。

**问题：**
1. 证明：若 $a, b > 0$，则 $\\frac{a}{b} + \\frac{b}{a} \\geq 2$。
2. 求函数 $f(x) = x + \\frac{4}{x}$（$x > 0$）的最小值。`,
  },
};
