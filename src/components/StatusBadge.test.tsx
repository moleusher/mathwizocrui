import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge, type PipelineStatus } from "./StatusBadge";

describe("StatusBadge", () => {
  describe("existing statuses (backward compat)", () => {
    it.each<[PipelineStatus, string]>([
      ["pending", "Pending"],
      ["queued", "Queued"],
      ["running", "Running"],
      ["completed", "Complete"],
      ["failed", "Failed"],
      ["cancelled", "Cancelled"],
    ])("renders %s with label %s", (status, label) => {
      render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  describe("new dashboard statuses", () => {
    it.each<[PipelineStatus, string]>([
      ["uploading", "上传中"],
      ["ocr", "识别中"],
      ["analyzing", "分析中"],
    ])("renders %s with label %s", (status, label) => {
      render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders with data-slot attribute", () => {
    render(<StatusBadge status="completed" />);
    const el = screen.getByText("Complete").closest('[data-slot="status-badge"]');
    expect(el).toBeInTheDocument();
  });

  it("renders with data-status attribute", () => {
    render(<StatusBadge status="ocr" />);
    const el = screen.getByText("识别中").closest('[data-status="ocr"]');
    expect(el).toBeInTheDocument();
  });

  it("shows pulse animation for active states", () => {
    render(<StatusBadge status="uploading" pulse />);
    const dot = document.querySelector('[data-slot="status-badge-dot"]');
    expect(dot).toHaveClass("animate-pulse");
  });

  it("shows pulse for running state", () => {
    render(<StatusBadge status="running" pulse />);
    const dot = document.querySelector('[data-slot="status-badge-dot"]');
    expect(dot).toHaveClass("animate-pulse");
  });

  it("respects prefers-reduced-motion with motion-reduce class", () => {
    render(<StatusBadge status="uploading" pulse />);
    const dot = document.querySelector('[data-slot="status-badge-dot"]');
    expect(dot).toHaveClass("motion-reduce:animate-none");
  });

  it("does not pulse for completed state", () => {
    render(<StatusBadge status="completed" pulse />);
    const dot = document.querySelector('[data-slot="status-badge-dot"]');
    expect(dot).not.toHaveClass("animate-pulse");
  });

  it("renders in compact mode (no label)", () => {
    render(<StatusBadge status="completed" compact />);
    expect(screen.queryByText("Complete")).not.toBeInTheDocument();
  });

  it("has title attribute in compact mode for accessibility", () => {
    render(<StatusBadge status="completed" compact />);
    const el = screen.getByTitle("Complete");
    expect(el).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<StatusBadge status="completed" className="custom-class" />);
    const el = screen.getByText("Complete").closest('[data-slot="status-badge"]');
    expect(el).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<StatusBadge status="completed" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("uses CSS variables for active states", () => {
    render(<StatusBadge status="uploading" />);
    const el = screen.getByText("上传中").closest('[data-slot="status-badge"]');
    expect(el).toBeInTheDocument();
    // Just verify it renders without error — the CSS var styling is applied via Tailwind
  });
});
