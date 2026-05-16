import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "../src/components/StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["pending", "queued", "running", "completed", "failed", "cancelled"],
    },
    pulse: { control: "boolean" },
    compact: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Pending: Story = { args: { status: "pending" } };
export const Queued: Story = { args: { status: "queued" } };
export const Running: Story = { args: { status: "running", pulse: true } };
export const Completed: Story = { args: { status: "completed" } };
export const Failed: Story = { args: { status: "failed" } };
export const Cancelled: Story = { args: { status: "cancelled" } };
export const CompactRunning: Story = { args: { status: "running", compact: true, pulse: true } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      <StatusBadge status="pending" />
      <StatusBadge status="queued" />
      <StatusBadge status="running" pulse />
      <StatusBadge status="completed" />
      <StatusBadge status="failed" />
      <StatusBadge status="cancelled" />
      <StatusBadge status="running" compact pulse />
    </div>
  ),
};
