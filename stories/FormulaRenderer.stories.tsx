import type { Meta, StoryObj } from "@storybook/react";
import { FormulaRenderer } from "../src/components/FormulaRenderer";

const meta: Meta<typeof FormulaRenderer> = {
  title: "Components/FormulaRenderer",
  component: FormulaRenderer,
  tags: ["autodocs"],
  argTypes: {
    display: {
      control: "select",
      options: ["inline", "block"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormulaRenderer>;

export const InlineFormula: Story = {
  args: {
    formula: "x^2 + y^2 = r^2",
    display: "inline",
  },
};

export const BlockFormula: Story = {
  args: {
    formula: "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    display: "block",
  },
};

export const SimpleFraction: Story = {
  args: {
    formula: "\\frac{1}{2}",
    display: "inline",
  },
};
