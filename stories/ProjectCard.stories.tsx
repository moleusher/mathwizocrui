import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCard } from "../src/components/ProjectCard";

const meta: Meta<typeof ProjectCard> = {
  title: "Components/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  argTypes: {
    dashboardStatus: {
      control: "select",
      options: ["uploading", "ocr", "analyzing", "completed", "failed"],
    },
  },
  args: {
    project: { id: "p1", title: "2024 初二数学期中试卷", subject: "数学", grade: "G8", questions: 12 },
    onClick: () => {},
    onViewProgress: () => {},
  },
};
export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Uploading: Story = { args: { dashboardStatus: "uploading" } };
export const Ocr: Story = { args: { dashboardStatus: "ocr", ocrProgress: 67 } };
export const Analyzing: Story = { args: { dashboardStatus: "analyzing", analyzeProgress: 45 } };
export const Completed: Story = { args: { dashboardStatus: "completed" } };
export const Failed: Story = { args: { dashboardStatus: "failed" } };
export const WithThumbnail: Story = { args: { dashboardStatus: "completed", thumbnailUrl: "https://placehold.co/48x64" } };

export const AllStatuses: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: 600 }}>
      <ProjectCard {...args} dashboardStatus="uploading" />
      <ProjectCard {...args} dashboardStatus="ocr" ocrProgress={45} />
      <ProjectCard {...args} dashboardStatus="analyzing" analyzeProgress={70} />
      <ProjectCard {...args} dashboardStatus="completed" />
      <ProjectCard {...args} dashboardStatus="failed" />
    </div>
  ),
};
