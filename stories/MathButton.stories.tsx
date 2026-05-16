import type { Meta, StoryObj } from "@storybook/react";
import { MathButton } from "../src/components/MathButton";

const meta: Meta<typeof MathButton> = {
  title: "Components/MathButton",
  component: MathButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof MathButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "md",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: "Ghost Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "md",
    children: "Delete",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Large Button",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "outline",
    size: "icon",
    children: "★",
  },
};

export const Loading: Story = {
  args: {
    variant: "primary",
    size: "md",
    loading: true,
    children: "Saving...",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    children: "Disabled",
  },
};

export const WithIconLeft: Story = {
  args: {
    variant: "primary",
    size: "md",
    iconLeft: "⬆",
    children: "Upload",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <MathButton variant="primary">Primary</MathButton>
      <MathButton variant="secondary">Secondary</MathButton>
      <MathButton variant="outline">Outline</MathButton>
      <MathButton variant="ghost">Ghost</MathButton>
      <MathButton variant="destructive">Destructive</MathButton>
    </div>
  ),
};
