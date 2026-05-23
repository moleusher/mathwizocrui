import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassroomProgress, type StageState } from "./ClassroomProgress";

const mockStages: StageState[] = [
  { stage: "generating_outlines", label: "生成大纲", status: "completed", progress: 100 },
  { stage: "generating_scenes", label: "生成场景", status: "active", progress: 55 },
  { stage: "generating_media", label: "生成媒体", status: "pending", progress: 0 },
  { stage: "generating_tts", label: "生成语音", status: "pending", progress: 0 },
  { stage: "completed", label: "完成", status: "pending", progress: 0 },
];

const completedStages: StageState[] = [
  { stage: "generating_outlines", label: "生成大纲", status: "completed", progress: 100 },
  { stage: "generating_scenes", label: "生成场景", status: "completed", progress: 100 },
  { stage: "generating_media", label: "生成媒体", status: "completed", progress: 100 },
  { stage: "generating_tts", label: "生成语音", status: "completed", progress: 100 },
  { stage: "completed", label: "完成", status: "completed", progress: 100 },
];

describe("ClassroomProgress", () => {
  it("renders with data-slot", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    expect(document.querySelector('[data-slot="classroom-progress"]')).toBeInTheDocument();
  });

  it("renders all 5 stage labels", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    expect(screen.getByText("生成大纲")).toBeInTheDocument();
    expect(screen.getByText("生成场景")).toBeInTheDocument();
    expect(screen.getByText("生成媒体")).toBeInTheDocument();
    expect(screen.getByText("生成语音")).toBeInTheDocument();
    expect(screen.getByText("完成")).toBeInTheDocument();
  });

  it("shows progress percentage for active stage", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    expect(screen.getByText("55%")).toBeInTheDocument();
  });

  it("shows '生成中...' header when isGenerating", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    expect(screen.getByText("正在生成互动课堂...")).toBeInTheDocument();
  });

  it("shows '生成完成' header when all completed", () => {
    render(<ClassroomProgress isGenerating={false} stages={completedStages} />);
    expect(screen.getByText("课堂生成完成")).toBeInTheDocument();
  });

  it("shows classroom URL and open button when provided", () => {
    render(
      <ClassroomProgress
        isGenerating={false}
        stages={completedStages}
        classroomUrl="https://classroom.example.com/123"
        onOpenClassroom={() => {}}
      />,
    );
    expect(screen.getByText("打开课堂")).toBeInTheDocument();
  });

  it("calls onOpenClassroom when button clicked", async () => {
    const fn = vi.fn();
    render(
      <ClassroomProgress
        isGenerating={false}
        stages={completedStages}
        classroomUrl="https://classroom.example.com/123"
        onOpenClassroom={fn}
      />,
    );
    await userEvent.click(screen.getByText("打开课堂"));
    expect(fn).toHaveBeenCalledOnce();
  });

  it("shows error message when error prop provided", () => {
    render(
      <ClassroomProgress isGenerating={false} stages={mockStages} error="生成失败：服务不可用" />,
    );
    expect(screen.getByText("生成失败：服务不可用")).toBeInTheDocument();
  });

  it("renders checkmark for completed stages", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    // completed stages should show a checkmark
    const completedIndicators = document.querySelectorAll('[data-stage-status="completed"]');
    expect(completedIndicators.length).toBeGreaterThanOrEqual(1);
  });

  it("renders active indicator for active stage", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    const activeIndicators = document.querySelectorAll('[data-stage-status="active"]');
    expect(activeIndicators.length).toBe(1);
  });

  it("renders pending indicator for pending stages", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    const pendingIndicators = document.querySelectorAll('[data-stage-status="pending"]');
    expect(pendingIndicators.length).toBeGreaterThanOrEqual(1);
  });

  it("renders each stage with correct data-stage attribute", () => {
    render(<ClassroomProgress isGenerating={true} stages={mockStages} />);
    expect(document.querySelector('[data-stage="generating_outlines"]')).toBeInTheDocument();
    expect(document.querySelector('[data-stage="generating_scenes"]')).toBeInTheDocument();
    expect(document.querySelector('[data-stage="generating_media"]')).toBeInTheDocument();
    expect(document.querySelector('[data-stage="generating_tts"]')).toBeInTheDocument();
    expect(document.querySelector('[data-stage="completed"]')).toBeInTheDocument();
  });
});
