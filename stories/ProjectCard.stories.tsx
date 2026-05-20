import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "@heroui/react";
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

/** With all dropdown actions available (OCR解析, 查看进度, 重新上传, 删除) */
export const WithActions: Story = {
  args: {
    dashboardStatus: "completed",
    onOcrParse: () => {},
    onViewProgress: () => {},
    onReupload: () => {},
    onDelete: () => {},
  },
};

/** "OCR解析" is disabled via dropdownDisabledKeys */
export const DisabledActions: Story = {
  args: {
    dashboardStatus: "failed",
    onOcrParse: () => {},
    onDelete: () => {},
    dropdownDisabledKeys: ["ocr-parse"],
  },
};

/** Custom items injected between built-in items and "删除项目" */
export const WithCustomItems: Story = {
  args: {
    dashboardStatus: "completed",
    onDelete: () => {},
    dropdownItems: (
      <>
        <Dropdown.Item key="share" textValue="分享">分享</Dropdown.Item>
        <Dropdown.Item key="rename" textValue="重命名">重命名</Dropdown.Item>
      </>
    ),
  },
};

/** Unknown status — renders a gray UnknownBadge with the raw value visible */
export const Unknown: Story = {
  args: { dashboardStatus: "unknown_value" as any },
  parameters: { controls: { exclude: ["dashboardStatus"] } },
};
