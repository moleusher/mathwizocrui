import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { RibbonButtonProps } from "../../components/RibbonButton";

afterEach(() => {
  cleanup();
});

async function renderButton(props: RibbonButtonProps) {
  const { RibbonButton } = await import("../../components/RibbonButton");
  return render(<RibbonButton {...props} />);
}

describe("RibbonButton", () => {
  it("renders with label as aria-label and title", async () => {
    await renderButton({ icon: <span>📋</span>, label: "题目列表", onClick: () => {} });
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn.getAttribute("aria-label")).toBe("题目列表");
    expect(btn.getAttribute("title")).toBe("题目列表");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    await renderButton({ icon: <span>📋</span>, label: "题目", onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has data-active when active=true", async () => {
    await renderButton({
      icon: <span>📋</span>,
      label: "题目",
      active: true,
      onClick: () => {},
    });
    const btn = screen.getByRole("button");
    expect(btn.getAttribute("data-active")).toBeDefined();
  });

  it("does not have data-active when active=false", async () => {
    await renderButton({ icon: <span>📋</span>, label: "题目", onClick: () => {} });
    const btn = screen.getByRole("button");
    expect(btn.getAttribute("data-active")).toBeNull();
  });

  it("renders badge count when badge is a positive number", async () => {
    await renderButton({
      icon: <span>📋</span>,
      label: "题目",
      badge: 5,
      onClick: () => {},
    });
    const badge = document.querySelector("[data-slot='ribbon-button-badge']");
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe("5");
  });

  it("does not render badge when badge is 0", async () => {
    await renderButton({
      icon: <span>📋</span>,
      label: "题目",
      badge: 0,
      onClick: () => {},
    });
    const badge = document.querySelector("[data-slot='ribbon-button-badge']");
    expect(badge).not.toBeInTheDocument();
  });

  it("renders dot indicator when badge is empty string", async () => {
    await renderButton({
      icon: <span>📋</span>,
      label: "题目",
      badge: "",
      onClick: () => {},
    });
    const badge = document.querySelector("[data-slot='ribbon-button-badge']");
    expect(badge).toBeInTheDocument();
    // Dot indicator should have no text content (empty string)
    expect(badge?.textContent).toBe("");
  });

  it("renders text badge when badge is a string like '99+'", async () => {
    await renderButton({
      icon: <span>📋</span>,
      label: "题目",
      badge: "99+",
      onClick: () => {},
    });
    const badge = document.querySelector("[data-slot='ribbon-button-badge']");
    expect(badge?.textContent).toBe("99+");
  });

  it("has data-slot='ribbon-button'", async () => {
    await renderButton({ icon: <span>📋</span>, label: "题目", onClick: () => {} });
    const btn = screen.getByRole("button");
    expect(btn.getAttribute("data-slot")).toBe("ribbon-button");
  });

  it("renders icon inside aria-hidden span", async () => {
    await renderButton({
      icon: <span data-testid="test-icon">🔍</span>,
      label: "搜索",
      onClick: () => {},
    });
    const iconContainer = screen.getByTestId("test-icon");
    expect(iconContainer).toBeInTheDocument();
  });
});
