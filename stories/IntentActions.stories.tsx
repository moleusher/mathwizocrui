import type { Meta, StoryObj } from "@storybook/react";
import { IntentActions } from "../src/components/IntentActions";

const meta: Meta<typeof IntentActions> = {
  title: "Components/IntentActions",
  component: IntentActions,
  tags: ["autodocs"],
  args: {
    intent: "full_paper",
    onStartAnalysis: () => alert("开始分析"),
    onViewPrompt: () => alert("查看提示词"),
    onReanalyze: () => alert("重新分析"),
  },
};
export default meta;
type Story = StoryObj<typeof IntentActions>;

export const Idle: Story = { args: { hasPrompt: false, isAnalyzing: false, isFailed: false } };
export const Analyzing: Story = { args: { hasPrompt: false, isAnalyzing: true, isFailed: false } };
export const Completed: Story = { args: { hasPrompt: true, isAnalyzing: false, isFailed: false } };
export const Failed: Story = { args: { hasPrompt: false, isAnalyzing: false, isFailed: true, error: "网络超时" } };

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 500 }}>
      <div><h3>Idle</h3><IntentActions {...args} hasPrompt={false} isAnalyzing={false} isFailed={false} /></div>
      <div><h3>Analyzing</h3><IntentActions {...args} hasPrompt={false} isAnalyzing={true} isFailed={false} /></div>
      <div><h3>Completed</h3><IntentActions {...args} hasPrompt={true} isAnalyzing={false} isFailed={false} /></div>
      <div><h3>Failed</h3><IntentActions {...args} hasPrompt={false} isAnalyzing={false} isFailed={true} error="网络超时，请重试" /></div>
    </div>
  ),
};
