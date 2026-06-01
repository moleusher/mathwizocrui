import type { Meta, StoryObj } from "@storybook/react";
import { SocraticGuide } from "./SocraticGuide";

const meta: Meta<typeof SocraticGuide> = {
  title: "Components/SocraticGuide",
  component: SocraticGuide,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SocraticGuide>;

export const Default: Story = {
  args: {
    analysis: {
      type: "审题失误",
      cause: "将最大宽25cm同时作为长和宽，导致表面积计算使用了错误的基础尺寸",
      suggestion: "复习长方体包装问题：包装盒尺寸应紧贴物品，长=物品长、宽=物品宽、高=物品高",
    },
  },
};

export const Ok: Story = {
  args: {
    status: "ok",
    strengths: [
      "公式记忆准确：S=2(ab+ah+bh)",
      "计算过程完整，步骤清晰",
      "最终答案数值正确",
    ],
    improvements: [
      "注意单位一致性检查",
      "做题前先标注已知条件",
    ],
  },
};

export const OkLegacy: Story = {
  args: {
    analysis: {
      type: "审题失误",
      cause: "学生掌握了公式但参数选择错误",
      suggestion: "加强读题训练",
    },
    status: "ok",
    strengths: ["公式应用正确", "步骤完整"],
  },
};

export const Warn: Story = {
  args: {
    status: "warn",
    analysis: {
      type: "计算失误",
      cause: "中间步骤出现笔误，但最终结果碰巧正确",
      suggestion: "加强验算习惯",
    },
    strengths: ["思路正确"],
    improvements: ["注意验算", "书写工整避免笔误"],
  },
};

export const ErrorWithKnowledgeChain: Story = {
  args: {
    status: "err",
    analysis: {
      type: "知识点漏洞",
      cause: "未掌握长方体体积与水位上升的关系",
      suggestion: "从排水法实验入手，建立铁块体积→水面上升的物理直觉",
    },
    strengths: ["理解了浸没问题的基础概念"],
    improvements: [
      "重点复习 V铁÷S底=h上升 这个核心公式",
      "做 3 个变式练习加深理解",
    ],
    knowledgeChain: {
      base: "正方体体积",
      dep: "排水法原理",
      result: "水位变化计算",
    },
  },
};

export const Minimalist: Story = {
  args: {
    variant: "minimalist",
    status: "err",
    analysis: {
      type: "审题失误",
      cause: "读题时忽略了'沿容器边缘'的限定条件",
    },
    improvements: ["做题前圈画关键词"],
  },
};

export const Collapsed: Story = {
  args: {
    defaultExpanded: false,
    maxHeight: 80,
    status: "err",
    analysis: {
      type: "计算失误",
      cause: "这是一段很长很长的错因描述文本，用来测试折叠效果。这段文字应该足够长以触发折叠。学生在这里犯了一个典型的错误，混淆了表面积和侧面积的概念。建议重新学习长方体的表面结构。",
    },
  },
};
