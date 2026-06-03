import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { SolutionStepsPanelProps } from "../../components/SolutionStepsPanel";
import type { SolutionStep } from "../../types/question";

afterEach(() => {
  cleanup();
});

async function renderPanel(props: SolutionStepsPanelProps) {
  const { SolutionStepsPanel } = await import("../../components/SolutionStepsPanel");
  return render(<SolutionStepsPanel {...props} />);
}

const steps: SolutionStep[] = [
  { step: 1, content: "读题：识别条件" },
  { step: 2, content: "列式：S = 2(ab + ah + bh)" },
  { step: 3, content: "代入数值计算" },
];

describe("SolutionStepsPanel", () => {
  it("renders steps with numbers", async () => {
    await renderPanel({ steps });
    // All step contents should be rendered
    expect(screen.getByText("读题：识别条件")).toBeInTheDocument();
    expect(screen.getByText("列式：S = 2(ab + ah + bh)")).toBeInTheDocument();
    expect(screen.getByText("代入数值计算")).toBeInTheDocument();
  });

  it("renders collapsed by default with mask", async () => {
    const { container } = await renderPanel({ steps });
    // Has expand toggle in collapsed state
    expect(screen.getByText("展开更多")).toBeInTheDocument();
    // Content wrapper has max-height style
    const contentDiv = container.querySelector("#solution-steps-content");
    expect(contentDiv).toBeInTheDocument();
    const style = contentDiv!.getAttribute("style") || "";
    expect(style).toContain("max-height");
  });

  it("expands on toggle click", async () => {
    await renderPanel({ steps });
    fireEvent.click(screen.getByText("展开更多"));
    expect(screen.getByText("收起")).toBeInTheDocument();
  });

  it("hides mask when expanded", async () => {
    await renderPanel({ steps, defaultExpanded: true });
    expect(screen.getByText("收起")).toBeInTheDocument();
  });

  it("returns null for empty steps", async () => {
    const { container } = await renderPanel({ steps: [] });
    expect(container.innerHTML).toBe("");
  });

  it("renders 解题步骤 header", async () => {
    await renderPanel({ steps });
    expect(screen.getByText("解题步骤")).toBeInTheDocument();
  });

  describe("timeline variant", () => {
    it("renders timeline dots with correct colors per position", async () => {
      const { container } = await renderPanel({ steps, variant: "timeline" });
      const dots = container.querySelectorAll("[data-timeline-dot]");
      expect(dots).toHaveLength(3);

      // First step: purple (brand-500)
      expect(dots[0].getAttribute("style")).toContain("var(--interactive-accent)");
      // Middle step: blue (info)
      expect(dots[1].getAttribute("style")).toContain("var(--color-info)");
      // Last step: green (success)
      expect(dots[2].getAttribute("style")).toContain("var(--color-success)");
    });

    it("renders connecting lines between all steps except after last", async () => {
      const { container } = await renderPanel({ steps, variant: "timeline" });
      const lines = container.querySelectorAll("[data-timeline-line]");
      expect(lines).toHaveLength(2);
    });

    it("renders step contents in timeline mode", async () => {
      await renderPanel({ steps, variant: "timeline" });
      expect(screen.getByText("读题：识别条件")).toBeInTheDocument();
      expect(screen.getByText("代入数值计算")).toBeInTheDocument();
    });
  });

  describe("minimalist variant", () => {
    it("renders without border class by default", async () => {
      const { container } = await renderPanel({ steps, variant: "minimalist" });
      const wrapper = container.querySelector("[data-slot='solution-steps']");
      expect(wrapper).toBeInTheDocument();
      // Should not have border-applied class
      expect(wrapper!.className).not.toContain("border");
    });
  });

  it("renders default variant (ordered list) when no variant specified", async () => {
    const { container } = await renderPanel({ steps });
    expect(container.querySelector("ol")).toBeInTheDocument();
  });
});
