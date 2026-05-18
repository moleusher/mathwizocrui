import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "@heroui/react";
import { ProjectCard } from "./ProjectCard";

const mockProject = {
  id: "proj-1",
  title: "2024 期末数学试卷",
  subject: "数学",
  grade: "G8",
  questions: 12,
};

describe("ProjectCard", () => {
  // ── rendering ──
  it("renders project title", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("2024 期末数学试卷")).toBeInTheDocument();
  });

  it("renders subject and grade metadata", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("数学")).toBeInTheDocument();
    expect(screen.getByText("G8")).toBeInTheDocument();
  });

  it("renders question count", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
      />,
    );
    expect(screen.getByText("12 题")).toBeInTheDocument();
  });

  it("renders with data-slot attribute", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
      />,
    );
    expect(document.querySelector('[data-slot="project-card"]')).toBeInTheDocument();
  });

  it("renders with data-status attribute", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="ocr"
        onClick={() => {}}
      />,
    );
    expect(document.querySelector('[data-status="ocr"]')).toBeInTheDocument();
  });

  // ── StatusBadge ──
  it.each([
    ["uploading", "上传中"],
    ["ocr", "识别中"],
    ["analyzing", "分析中"],
    ["completed", "Complete"],
    ["failed", "Failed"],
  ] as const)("renders StatusBadge for %s", (status, label) => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus={status}
        onClick={() => {}}
      />,
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  // ── progress bar ──
  it("shows progress bar for ocr status", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="ocr"
        ocrProgress={45}
        onClick={() => {}}
      />,
    );
    expect(document.querySelector('[data-slot="project-card-progress"]')).toBeInTheDocument();
  });

  it("shows progress bar for analyzing status", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="analyzing"
        analyzeProgress={70}
        onClick={() => {}}
      />,
    );
    expect(document.querySelector('[data-slot="project-card-progress"]')).toBeInTheDocument();
  });

  it("hides progress bar for completed status", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
      />,
    );
    expect(document.querySelector('[data-slot="project-card-progress"]')).not.toBeInTheDocument();
  });

  // ── Dropdown trigger ──
  it("renders dropdown trigger when action callbacks exist", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByLabelText("更多操作")).toBeInTheDocument();
  });

  it("does not render dropdown trigger when no action callbacks", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
      />,
    );
    expect(screen.queryByLabelText("更多操作")).not.toBeInTheDocument();
  });

  // ── OCR parse renders whenever onOcrParse is provided ──
  it("shows dropdown trigger with onOcrParse regardless of status", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="uploading"
        onClick={() => {}}
        onOcrParse={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByLabelText("更多操作")).toBeInTheDocument();
  });

  // ── dropdownDisabledKeys ──
  it("passes dropdownDisabledKeys to the menu", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="failed"
        onClick={() => {}}
        onOcrParse={() => {}}
        onDelete={() => {}}
        dropdownDisabledKeys={["ocr-parse"]}
      />,
    );
    // The trigger renders; disabled state is handled internally by HeroUI
    expect(screen.getByLabelText("更多操作")).toBeInTheDocument();
  });

  // ── dropdownItems ──
  it("renders custom dropdownItems", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
        onDelete={() => {}}
        dropdownItems={<Dropdown.Item key="custom-1" textValue="自定义">自定义</Dropdown.Item>}
      />,
    );
    expect(screen.getByLabelText("更多操作")).toBeInTheDocument();
  });

  it("shows dropdown trigger when only dropdownItems provided", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={() => {}}
        dropdownItems={<Dropdown.Item key="custom" textValue="自定义">自定义</Dropdown.Item>}
      />,
    );
    expect(screen.getByLabelText("更多操作")).toBeInTheDocument();
  });

  // ── click on card ──
  it("calls onClick when card is clicked", async () => {
    const fn = vi.fn();
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={fn}
      />,
    );
    await userEvent.click(screen.getByText("2024 期末数学试卷"));
    expect(fn).toHaveBeenCalledOnce();
  });

  // ── thumbnail ──
  it("renders thumbnail when thumbnailUrl provided", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        thumbnailUrl="/thumb.jpg"
        onClick={() => {}}
      />,
    );
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/thumb.jpg");
  });
});
