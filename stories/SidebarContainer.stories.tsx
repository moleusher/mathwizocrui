import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileText, List, Search, Settings } from "lucide-react";
import { SidebarContainer } from "../src/components/SidebarContainer";
import type { SidebarTab } from "../src/components/SidebarContainer";

const meta: Meta<typeof SidebarContainer> = {
  title: "Components/SidebarContainer",
  component: SidebarContainer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarContainer>;

// ── Sample tabs ──

const sampleTabs: SidebarTab[] = [
  {
    key: "questions",
    icon: <List />,
    label: "题目列表",
    badge: 5,
    content: (
      <div className="p-3 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-2 rounded text-sm hover:bg-(--background-hover) cursor-pointer transition-colors"
          >
            <div className="font-medium">题目 {i}</div>
            <div className="text-xs text-(--text-muted) mt-0.5">
              得分: {[8, 10, 6, 9, 7][i - 1]}/10
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "exam",
    icon: <FileText />,
    label: "试卷原图",
    content: (
      <div className="p-3 flex items-center justify-center h-48 text-(--text-muted) text-sm">
        试卷原图区域
      </div>
    ),
  },
  {
    key: "search",
    icon: <Search />,
    label: "搜索",
    badge: "",
    content: (
      <div className="p-3">
        <input
          type="text"
          placeholder="搜索..."
          className="w-full px-3 py-2 text-sm border border-(--border-secondary) rounded-(--radius-md) bg-(--background-primary) focus:outline-(--interactive-accent)/30"
        />
      </div>
    ),
  },
  {
    key: "settings",
    icon: <Settings />,
    label: "设置",
    content: (
      <div className="p-3 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span>自动保存</span>
          <span className="text-(--text-muted)">已开启</span>
        </div>
        <div className="flex items-center justify-between">
          <span>显示答案</span>
          <span className="text-(--text-muted)">已开启</span>
        </div>
      </div>
    ),
  },
];

// ── Interactive wrapper ──

function SidebarDemo({
  defaultCollapsed = false,
  tabs,
  width,
}: {
  defaultCollapsed?: boolean;
  tabs: SidebarTab[];
  width?: number;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "");

  return (
    <div className="flex h-[500px] border border-(--border-primary) rounded-(--radius-lg) overflow-hidden bg-(--background-primary)">
      <SidebarContainer
        collapsed={collapsed}
        onToggleCollapse={() => {
          setCollapsed((c) => !c);
        }}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        width={width}
      />
      <main className="flex-1 flex items-center justify-center text-(--text-muted) text-sm">
        主内容区域
      </main>
    </div>
  );
}

// ── Stories ──

export const Expanded: Story = {
  render: () => <SidebarDemo tabs={sampleTabs} />,
};

export const Collapsed: Story = {
  render: () => <SidebarDemo defaultCollapsed tabs={sampleTabs} />,
};

export const CustomWidth: Story = {
  render: () => <SidebarDemo tabs={sampleTabs} width={320} />,
};

export const TwoTabs: Story = {
  render: () => {
    const twoTabs: SidebarTab[] = [
      {
        key: "questions",
        icon: <List />,
        label: "题目列表",
        content: (
          <div className="p-3 text-sm text-(--text-muted)">题目列表内容</div>
        ),
      },
      {
        key: "exam",
        icon: <FileText />,
        label: "试卷原图",
        content: (
          <div className="p-3 text-sm text-(--text-muted)">试卷原图内容</div>
        ),
      },
    ];
    return <SidebarDemo tabs={twoTabs} />;
  },
};

export const EmptyContent: Story = {
  render: () => (
    <div className="flex h-[300px] border border-(--border-primary) rounded-(--radius-lg) overflow-hidden bg-(--background-primary)">
      <SidebarContainer
        collapsed={false}
        onToggleCollapse={() => {}}
        tabs={[
          {
            key: "empty",
            icon: <List />,
            label: "空面板",
            content: (
              <div className="flex items-center justify-center h-32 text-(--text-muted) text-sm">
                暂无内容
              </div>
            ),
          },
        ]}
        activeTab="empty"
        onTabChange={() => {}}
      />
    </div>
  ),
};
