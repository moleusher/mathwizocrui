import type { Meta, StoryObj } from "@storybook/react";
import { PipelineStageCard } from "../src/components/PipelineStageCard";

const meta: Meta<typeof PipelineStageCard> = {
  title: "Components/PipelineStageCard",
  component: PipelineStageCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PipelineStageCard>;

export const Running: Story = {
  args: { step: 2, label: "OCR Analysis", description: "Extracting text and formulas from image", status: "running", progress: 65, elapsed: "12s" },
};

export const Completed: Story = {
  args: { step: 1, label: "Image Upload", description: "Upload complete", status: "completed", elapsed: "3s" },
};

export const Pending: Story = {
  args: { step: 3, label: "Question Scoring", description: "Grading each detected question", status: "pending" },
};

export const Failed: Story = {
  args: { step: 2, label: "OCR Analysis", description: "Failed to process image", status: "failed", elapsed: "8s" },
};

export const Dimmed: Story = {
  args: { step: 4, label: "Classroom Generation", description: "Generating OpenMAIC materials", status: "pending", dimmed: true },
};

export const AllStages: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: 400 }}>
      <PipelineStageCard step={1} label="Upload" status="completed" elapsed="2s" />
      <PipelineStageCard step={2} label="OCR Analysis" description="PaddleOCR + Qwen-VL" status="running" progress={45} elapsed="18s" />
      <PipelineStageCard step={3} label="Translation" status="queued" dimmed />
      <PipelineStageCard step={4} label="Scoring" status="pending" dimmed />
    </div>
  ),
};
