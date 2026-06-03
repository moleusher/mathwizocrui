import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ExpandToggle } from "./ExpandToggle";

const meta: Meta<typeof ExpandToggle> = {
  title: "Components/ExpandToggle",
  component: ExpandToggle,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ExpandToggle>;

export const Collapsed: Story = {
  args: {
    isExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
};

export const CustomLabel: Story = {
  args: {
    isExpanded: false,
    label: "显示解题过程",
  },
};

export const Empty: Story = {
  args: {
    isExpanded: false,
    onClick: undefined as unknown as () => void,
  },
};
