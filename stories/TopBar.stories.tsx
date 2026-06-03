import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "../src/components/TopBar";

const meta: Meta<typeof TopBar> = {
  title: "Components/TopBar",
  component: TopBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
  args: {
    left: <span className="text-sm text-(--text-muted)">← Back to Projects</span>,
    center: <span className="text-sm font-semibold">数学批改助手</span>,
    right: <span className="text-xs text-(--text-muted)">v0.8.0</span>,
  },
};
