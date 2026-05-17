import type { Meta, StoryObj } from "@storybook/react";
import { CardActions } from "../src/components/CardActions";

const meta: Meta<typeof CardActions> = {
  title: "Components/CardActions",
  component: CardActions,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    visible: { control: "boolean" },
  },
  args: { onViewProgress: () => alert("查看进度"), label: "查看进度 →" },
};
export default meta;
type Story = StoryObj<typeof CardActions>;

export const Default: Story = {};
export const CustomLabel: Story = { args: { label: "查看详情 →" } };
export const Hidden: Story = { args: { visible: false } };
