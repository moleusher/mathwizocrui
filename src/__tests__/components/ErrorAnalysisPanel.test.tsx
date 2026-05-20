import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { ErrorAnalysisPanelProps } from "../../components/ErrorAnalysisPanel";
import type { ErrorAnalysis } from "../../types/question";

afterEach(() => {
  cleanup();
});

async function renderPanel(props: ErrorAnalysisPanelProps) {
  const { ErrorAnalysisPanel } = await import("../../components/ErrorAnalysisPanel");
  return render(<ErrorAnalysisPanel {...props} />);
}

const analysis: ErrorAnalysis = {
  cause: "错把宽当作21.4cm（应该是22cm），且混淆了体积和表面积公式。",
  type: "审题失误",
  suggestion: "注意区分长方体的表面积和体积公式",
};

describe("ErrorAnalysisPanel", () => {
  it("renders analysis content", async () => {
    await renderPanel({ analysis });
    expect(screen.getByText(/错把宽当作21.4cm/)).toBeInTheDocument();
  });

  it("shows error type badge", async () => {
    await renderPanel({ analysis });
    expect(screen.getByText("审题失误")).toBeInTheDocument();
  });

  it("shows suggestion when present", async () => {
    await renderPanel({ analysis });
    expect(screen.getByText(/注意区分/)).toBeInTheDocument();
  });

  it("shows AI disclaimer", async () => {
    await renderPanel({ analysis });
    expect(screen.getByText(/AI 生成，仅供参考/)).toBeInTheDocument();
  });

  it("collapses and expands on toggle", async () => {
    await renderPanel({ analysis });
    // Default expanded
    expect(screen.getByText("收起")).toBeInTheDocument();
    // Click to collapse
    fireEvent.click(screen.getByText("收起"));
    expect(screen.getByText("展开更多")).toBeInTheDocument();
  });

  it("renders 错因分析 header", async () => {
    await renderPanel({ analysis });
    expect(screen.getByText("错因分析")).toBeInTheDocument();
  });
});
