import type { Meta, StoryObj } from "@storybook/react";
import { BlockLegend } from "../src/components/BlockLegend";

const meta: Meta<typeof BlockLegend> = {
  title: "Components/BlockLegend",
  component: BlockLegend,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BlockLegend>;

export const Default: Story = {
  args: {
    blocks: [
      { id: "q", label: "Question", color: "bg-emerald-500" },
      { id: "a", label: "Answer", color: "bg-sky-500" },
      { id: "f", label: "Formula", color: "bg-amber-500" },
      { id: "d", label: "Diagram", color: "bg-violet-500" },
    ],
  },
};

export const Vertical: Story = {
  args: {
    blocks: [
      { id: "t", label: "Text Block", color: "bg-slate-400" },
      { id: "m", label: "Math Block", color: "bg-indigo-500" },
      { id: "i", label: "Image Block", color: "bg-rose-400" },
    ],
    layout: "vertical",
  },
};
