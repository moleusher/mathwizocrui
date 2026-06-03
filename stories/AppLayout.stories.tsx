import type { Meta, StoryObj } from "@storybook/react";
import { AppLayout } from "../src/components/AppLayout";

const meta: Meta<typeof AppLayout> = {
  title: "Components/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

const TestSidebar = () => (
  <div className="p-4 space-y-2">
    <div className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-3">Navigation</div>
    {["Dashboard", "Analysis", "History", "Settings"].map((item) => (
      <div key={item} className="px-2 py-1.5 rounded text-sm hover:bg-(--background-hover) cursor-pointer">
        {item}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <AppLayout
        sidebar={<TestSidebar />}
        topBar={
          <div className="flex items-center justify-between h-14 px-4 border-b border-(--border-primary)">
            <span className="text-sm font-semibold">数学批改助手</span>
          </div>
        }
      >
        <div className="p-6 text-sm text-(--text-muted)">Main content area</div>
      </AppLayout>
    </div>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <div style={{ height: 300 }}>
      <AppLayout
        topBar={<div className="flex items-center h-14 px-4 border-b border-(--border-primary)"><span className="text-sm font-semibold">Full-Screen View</span></div>}
      >
        <div className="p-6 text-sm text-(--text-muted)">Content without sidebar</div>
      </AppLayout>
    </div>
  ),
};
