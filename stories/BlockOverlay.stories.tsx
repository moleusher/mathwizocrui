import type { Meta, StoryObj } from "@storybook/react";
import { BlockOverlay } from "../src/components/BlockOverlay";

const meta: Meta<typeof BlockOverlay> = {
  title: "Components/BlockOverlay",
  component: BlockOverlay,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BlockOverlay>;

export const Default: Story = {
  render: () => (
    <div style={{ position: "relative", width: 400, height: 300, background: "var(--background-primary)", borderRadius: 8 }}>
      <BlockOverlay
        blocks={[
          { id: "1", x: 10, y: 10, width: 35, height: 12, color: "border-emerald-500", label: "Q1" },
          { id: "2", x: 10, y: 28, width: 35, height: 15, color: "border-sky-500", label: "A1" },
          { id: "3", x: 55, y: 10, width: 35, height: 20, color: "border-amber-500", label: "Formula" },
          { id: "4", x: 10, y: 50, width: 80, height: 40, color: "border-violet-500", label: "Diagram", active: true },
        ]}
      />
    </div>
  ),
};
