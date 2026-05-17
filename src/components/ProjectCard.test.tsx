import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
      />,
    );
    // Progress indicator should be present
    expect(document.querySelector('[data-slot="project-card-progress"]')).toBeInTheDocument();
  });

  it("shows progress bar for analyzing status", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="analyzing"
        analyzeProgress={70}
        onClick={() => {}}
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
      />,
    );
    expect(document.querySelector('[data-slot="project-card-progress"]')).not.toBeInTheDocument();
  });

  // ── CardActions ──
  it("shows CardActions for non-uploading status", () => {
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="ocr"
        onClick={() => {}}
        onViewProgress={() => {}}
      />,
    );
    expect(screen.getByText("查看进度 →")).toBeInTheDocument();
  });

  it("calls onViewProgress when CardActions clicked", async () => {
    const fn = vi.fn();
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="ocr"
        onClick={() => {}}
        onViewProgress={fn}
      />,
    );
    await userEvent.click(screen.getByText("查看进度 →"));
    expect(fn).toHaveBeenCalledOnce();
  });

  // ── click on card ──
  it("calls onClick when card is clicked", async () => {
    const fn = vi.fn();
    render(
      <ProjectCard
        project={mockProject}
        dashboardStatus="completed"
        onClick={fn}
        onViewProgress={() => {}}
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
        onViewProgress={() => {}}
      />,
    );
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/thumb.jpg");
  });
});
