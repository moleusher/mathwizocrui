import type { Meta, StoryObj } from "@storybook/react";
import { ClassroomProgress, type StageState } from "../src/components/ClassroomProgress";

const generatingStages: StageState[] = [
  { stage: "generating_outlines", label: "生成大纲", status: "completed", progress: 100 },
  { stage: "generating_scenes", label: "生成场景", status: "active", progress: 55 },
  { stage: "generating_media", label: "生成媒体", status: "pending", progress: 0 },
  { stage: "generating_tts", label: "生成语音", status: "pending", progress: 0 },
  { stage: "completed", label: "完成", status: "pending", progress: 0 },
];

const meta: Meta<typeof ClassroomProgress> = {
  title: "Components/ClassroomProgress",
  component: ClassroomProgress,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ClassroomProgress>;

export const Generating: Story = { args: { isGenerating: true, stages: generatingStages } };
export const AllCompleted: Story = {
  args: {
    isGenerating: false,
    stages: generatingStages.map((s) => ({ ...s, status: "completed" as const, progress: 100 })),
    classroomUrl: "https://classroom.example.com/123",
    onOpenClassroom: () => alert("打开课堂"),
  },
};
export const WithError: Story = {
  args: {
    isGenerating: false,
    stages: generatingStages,
    error: "生成失败：OpenMAIC 服务不可用",
  },
};
