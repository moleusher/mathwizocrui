import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { ExpandToggleProps } from "../../components/ExpandToggle";

afterEach(() => {
  cleanup();
});

async function renderToggle(props: ExpandToggleProps) {
  const { ExpandToggle } = await import("../../components/ExpandToggle");
  return render(<ExpandToggle {...props} />);
}

describe("ExpandToggle", () => {
  it("renders collapsed state with 展开更多", async () => {
    await renderToggle({ isExpanded: false, onClick: () => {} });
    expect(screen.getByText("展开更多")).toBeInTheDocument();
  });

  it("renders expanded state with 收起", async () => {
    await renderToggle({ isExpanded: true, onClick: () => {} });
    expect(screen.getByText("收起")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    let called = false;
    await renderToggle({ isExpanded: false, onClick: () => { called = true; } });
    fireEvent.click(screen.getByText("展开更多"));
    expect(called).toBe(true);
  });

  it("aria-expanded reflects state", async () => {
    await renderToggle({ isExpanded: true, onClick: () => {} });
    const btn = screen.getByRole("button");
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("custom label overrides default", async () => {
    await renderToggle({ isExpanded: false, onClick: () => {}, label: "显示全部" });
    expect(screen.getByText("显示全部")).toBeInTheDocument();
    expect(screen.queryByText("展开更多")).not.toBeInTheDocument();
  });
});
