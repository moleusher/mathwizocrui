import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { FileText, List } from "lucide-react";
import type { SidebarContainerProps, SidebarTab } from "../../components/SidebarContainer";

afterEach(() => {
  cleanup();
});

async function renderSidebar(props: SidebarContainerProps) {
  const { SidebarContainer } = await import("../../components/SidebarContainer");
  return render(<SidebarContainer {...props} />);
}

const sampleTabs: SidebarTab[] = [
  {
    key: "questions",
    icon: <List />,
    label: "题目列表",
    badge: 5,
    content: <div data-testid="questions-content">题目内容</div>,
  },
  {
    key: "exam",
    icon: <FileText />,
    label: "试卷原图",
    content: <div data-testid="exam-content">原图内容</div>,
  },
];

describe("SidebarContainer", () => {
  it("renders expanded state with tabs", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    expect(screen.getByText("题目列表")).toBeInTheDocument();
    expect(screen.getByText("试卷原图")).toBeInTheDocument();
    expect(screen.getByTestId("questions-content")).toBeInTheDocument();
  });

  it("renders active tab content", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "exam",
      onTabChange: () => {},
    });
    expect(screen.getByTestId("exam-content")).toBeInTheDocument();
    expect(screen.queryByTestId("questions-content")).not.toBeInTheDocument();
  });

  it("calls onTabChange when a tab is clicked", async () => {
    const onTabChange = vi.fn();
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange,
    });
    fireEvent.click(screen.getByText("试卷原图"));
    expect(onTabChange).toHaveBeenCalledWith("exam");
  });

  it("calls onToggleCollapse when collapse button is clicked", async () => {
    const onToggleCollapse = vi.fn();
    await renderSidebar({
      collapsed: false,
      onToggleCollapse,
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    const collapseBtn = document.querySelector("[data-slot='sidebar-collapse-button']");
    expect(collapseBtn).toBeInTheDocument();
    fireEvent.click(collapseBtn!);
    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });

  it("has data-slot='sidebar-container'", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    const container = document.querySelector("[data-slot='sidebar-container']");
    expect(container).toBeInTheDocument();
  });

  it("has data-collapsed attribute when collapsed", async () => {
    await renderSidebar({
      collapsed: true,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    const container = document.querySelector("[data-slot='sidebar-container']");
    expect(container?.getAttribute("data-collapsed")).toBeDefined();
  });

  it("tabs have role='tab' and aria-selected", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBe(2);
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[1].getAttribute("aria-selected")).toBe("false");
  });

  it("tabpanel has role='tabpanel'", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    expect(screen.getByRole("tabpanel")).toBeInTheDocument();
  });

  it("renders badge on tab", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders close button in expanded state", async () => {
    await renderSidebar({
      collapsed: false,
      onToggleCollapse: () => {},
      tabs: sampleTabs,
      activeTab: "questions",
      onTabChange: () => {},
    });
    const collapseBtn = document.querySelector("[data-slot='sidebar-collapse-button']");
    expect(collapseBtn).toBeInTheDocument();
    expect(collapseBtn?.getAttribute("aria-label")).toBe("折叠侧栏");
  });
});
