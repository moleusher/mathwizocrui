import type { Meta, StoryObj } from "@storybook/react";
import { MathBadge } from "../src/components/MathBadge";

const meta: Meta<typeof MathBadge> = {
  title: "Components/MathBadge",
  component: MathBadge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    dot: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MathBadge>;

export const Default: Story = {
  args: { variant: "default", children: "Math" },
};

export const Success: Story = {
  args: { variant: "success", children: "Correct" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Partial" },
};

export const Error: Story = {
  args: { variant: "error", children: "Wrong" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

export const WithDot: Story = {
  args: { variant: "success", dot: true, children: "Online" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <MathBadge variant="default">Math</MathBadge>
      <MathBadge variant="success">Correct</MathBadge>
      <MathBadge variant="warning" dot>Partial</MathBadge>
      <MathBadge variant="error" dot>Wrong</MathBadge>
      <MathBadge variant="info">Info</MathBadge>
    </div>
  ),
};
