import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntentActions } from "./IntentActions";

describe("IntentActions", () => {
  // ── idle state ──
  describe("idle state", () => {
    it("renders '开始分析' button when idle", () => {
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={false}
          isAnalyzing={false}
          isFailed={false}
          onStartAnalysis={() => {}}
        />,
      );
      expect(screen.getByText("开始分析")).toBeInTheDocument();
    });

    it("calls onStartAnalysis when clicked in idle state", async () => {
      const fn = vi.fn();
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={false}
          isAnalyzing={false}
          isFailed={false}
          onStartAnalysis={fn}
        />,
      );
      screen.getByText("开始分析").click();
      expect(fn).toHaveBeenCalledOnce();
    });
  });

  // ── analyzing state ──
  describe("analyzing state", () => {
    it("renders analyzing text when isAnalyzing", () => {
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={false}
          isAnalyzing={true}
          isFailed={false}
          onStartAnalysis={() => {}}
        />,
      );
      expect(screen.getByText("分析中...")).toBeInTheDocument();
    });
  });

  // ── completed state ──
  describe("completed state", () => {
    it("renders view and reanalyze buttons", () => {
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={true}
          isAnalyzing={false}
          isFailed={false}
          onStartAnalysis={() => {}}
          onViewPrompt={() => {}}
          onReanalyze={() => {}}
        />,
      );
      expect(screen.getByText("查看提示词")).toBeInTheDocument();
      expect(screen.getByText("重新分析")).toBeInTheDocument();
    });

    it("calls onViewPrompt when '查看提示词' clicked", async () => {
      const fn = vi.fn();
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={true}
          isAnalyzing={false}
          isFailed={false}
          onStartAnalysis={() => {}}
          onViewPrompt={fn}
          onReanalyze={() => {}}
        />,
      );
      screen.getByText("查看提示词").click();
      expect(fn).toHaveBeenCalledOnce();
    });

    it("calls onReanalyze when '重新分析' clicked", async () => {
      const fn = vi.fn();
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={true}
          isAnalyzing={false}
          isFailed={false}
          onStartAnalysis={() => {}}
          onViewPrompt={() => {}}
          onReanalyze={fn}
        />,
      );
      screen.getByText("重新分析").click();
      expect(fn).toHaveBeenCalledOnce();
    });
  });

  // ── failed state ──
  describe("failed state", () => {
    it("renders error message and reanalyze button", () => {
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={false}
          isAnalyzing={false}
          isFailed={true}
          onStartAnalysis={() => {}}
          onReanalyze={() => {}}
          error="网络超时"
        />,
      );
      expect(screen.getByText("网络超时")).toBeInTheDocument();
      expect(screen.getByText("重新分析")).toBeInTheDocument();
    });

    it("calls onReanalyze when reanalyze clicked in failed state", async () => {
      const fn = vi.fn();
      render(
        <IntentActions
          intent="full_analysis"
          hasPrompt={false}
          isAnalyzing={false}
          isFailed={true}
          onStartAnalysis={() => {}}
          onReanalyze={fn}
          error="失败"
        />,
      );
      screen.getByText("重新分析").click();
      expect(fn).toHaveBeenCalledOnce();
    });
  });

  // ── data-slot ──
  it("renders with data-slot attribute", () => {
    render(
      <IntentActions
        intent="full_analysis"
        hasPrompt={false}
        isAnalyzing={false}
        isFailed={false}
        onStartAnalysis={() => {}}
      />,
    );
    expect(document.querySelector('[data-slot="intent-actions"]')).toBeInTheDocument();
  });

  it("renders with data-state attribute", () => {
    render(
      <IntentActions
        intent="full_analysis"
        hasPrompt={true}
        isAnalyzing={false}
        isFailed={false}
        onStartAnalysis={() => {}}
        onViewPrompt={() => {}}
      />,
    );
    expect(document.querySelector('[data-state="completed"]')).toBeInTheDocument();
  });
});
