import type { Meta, StoryObj } from "@storybook/react";
import { FileText, List, Search, Settings } from "lucide-react";
import { RibbonButton } from "../src/components/RibbonButton";

const meta: Meta<typeof RibbonButton> = {
  title: "Components/RibbonButton",
  component: RibbonButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof RibbonButton>;

export const Default: Story = {
  args: {
    icon: <List />,
    label: "题目列表",
    onClick: () => {},
  },
};

export const Active: Story = {
  args: {
    icon: <List />,
    label: "题目列表",
    active: true,
    onClick: () => {},
  },
};

export const WithBadgeCount: Story = {
  args: {
    icon: <FileText />,
    label: "试卷原图",
    badge: 5,
    onClick: () => {},
  },
};

export const WithBadgeDot: Story = {
  args: {
    icon: <Search />,
    label: "搜索",
    badge: "",
    onClick: () => {},
  },
};

export const WithBadgeOverflow: Story = {
  args: {
    icon: <Settings />,
    label: "设置",
    badge: "99+",
    onClick: () => {},
  },
};

export const ActiveWithBadge: Story = {
  args: {
    icon: <List />,
    label: "题目列表",
    active: true,
    badge: 12,
    onClick: () => {},
  },
};

/**
 * Ribbon button group in 48px ribbon layout.
 */
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-col w-12 border-r border-(--border-secondary) bg-(--background-secondary) py-2">
      <RibbonButton icon={<List />} label="题目列表" active badge={5} onClick={() => {}} />
      <RibbonButton icon={<FileText />} label="试卷原图" onClick={() => {}} />
      <RibbonButton icon={<Search />} label="搜索" badge="" onClick={() => {}} />
      <RibbonButton icon={<Settings />} label="设置" onClick={() => {}} />
    </div>
  ),
};
