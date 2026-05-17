import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MathBadge } from "./MathBadge";

describe("MathBadge", () => {
  it("renders children", () => {
    render(<MathBadge>数学</MathBadge>);
    expect(screen.getByText("数学")).toBeInTheDocument();
  });

  it("renders with data-slot", () => {
    render(<MathBadge>G8</MathBadge>);
    expect(screen.getByText("G8").closest('[data-slot="math-badge"]')).toBeInTheDocument();
  });

  it("renders variant attribute", () => {
    render(<MathBadge variant="success">完成</MathBadge>);
    expect(screen.getByText("完成").closest('[data-variant="success"]')).toBeInTheDocument();
  });

  it("renders size attribute", () => {
    render(<MathBadge size="sm">小</MathBadge>);
    expect(screen.getByText("小").closest('[data-size="sm"]')).toBeInTheDocument();
  });

  it("renders dot indicator", () => {
    render(<MathBadge dot>G8</MathBadge>);
    const dot = document.querySelector(".size-1\\.5");
    expect(dot).toBeInTheDocument();
  });

  it("does not render dot by default", () => {
    render(<MathBadge>G8</MathBadge>);
    const dots = document.querySelectorAll(".size-1\\.5");
    expect(dots.length).toBe(0);
  });

  it("default variant is 'default'", () => {
    render(<MathBadge>默认</MathBadge>);
    expect(screen.getByText("默认").closest('[data-variant="default"]')).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<MathBadge ref={ref}>G8</MathBadge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("applies custom className", () => {
    render(<MathBadge className="my-custom">G8</MathBadge>);
    expect(screen.getByText("G8")).toHaveClass("my-custom");
  });
});
