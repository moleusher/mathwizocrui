import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { CorrectionPanelProps } from "../../components/CorrectionPanel";

afterEach(() => {
  cleanup();
});

async function renderPanel(props: CorrectionPanelProps) {
  const { CorrectionPanel } = await import("../../components/CorrectionPanel");
  return render(<CorrectionPanel {...props} />);
}

describe("CorrectionPanel", () => {
  it("renders correction text", async () => {
    await renderPanel({ text: "21.4 → 22, S=2(...)=3544cm²" });
    expect(screen.getByText("学生订正")).toBeInTheDocument();
  });

  it("renders with MarkdownRenderer", async () => {
    await renderPanel({ text: "**订正**内容" });
    const boldEl = document.querySelector("strong");
    expect(boldEl).toBeInTheDocument();
    expect(boldEl?.textContent).toBe("订正");
  });
});
