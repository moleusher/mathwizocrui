import type { Meta, StoryObj } from "@storybook/react";
import { AnalysisTabs } from "../src/components/AnalysisTabs";

const meta: Meta<typeof AnalysisTabs> = {
  title: "Components/AnalysisTabs",
  component: AnalysisTabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnalysisTabs>;

const sampleTabs = [
  { id: "summary", label: "Summary", badge: 12, content: <div className="p-4 text-sm">Overall analysis summary with 12 questions processed.</div> },
  { id: "by-question", label: "By Question", content: <div className="p-4 text-sm">Per-question breakdown with scores and dimensions.</div> },
  { id: "knowledge", label: "Knowledge Graph", content: <div className="p-4 text-sm">Knowledge domain mapping and concept relationships.</div> },
  { id: "errors", label: "Errors", badge: 2, content: <div className="p-4 text-sm">2 common error patterns detected.</div> },
];

export const Horizontal: Story = {
  args: { tabs: sampleTabs, defaultTab: "summary" },
};

export const Vertical: Story = {
  args: { tabs: sampleTabs, defaultTab: "summary", orientation: "vertical" },
};

export const ThreeTabs: Story = {
  args: {
    tabs: [
      { id: "a", label: "Preview", content: <div className="p-4 text-sm">Document preview</div> },
      { id: "b", label: "Questions", badge: 8, content: <div className="p-4 text-sm">8 questions detected</div> },
      { id: "c", label: "Classroom", content: <div className="p-4 text-sm">OpenMAIC classroom materials</div> },
    ],
    defaultTab: "b",
  },
};
