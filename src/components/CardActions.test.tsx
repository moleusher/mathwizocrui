import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardActions } from "./CardActions";

describe("CardActions", () => {
  it("renders with default label", () => {
    render(<CardActions onViewProgress={() => {}} />);
    expect(screen.getByText("查看进度 →")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<CardActions onViewProgress={() => {}} label="查看详情 →" />);
    expect(screen.getByText("查看详情 →")).toBeInTheDocument();
  });

  it("renders visible by default", () => {
    render(<CardActions onViewProgress={() => {}} />);
    expect(screen.getByText("查看进度 →")).toBeInTheDocument();
  });

  it("hides when visible=false", () => {
    render(<CardActions onViewProgress={() => {}} visible={false} />);
    expect(screen.queryByText("查看进度 →")).not.toBeInTheDocument();
  });

  it("calls onViewProgress on click", async () => {
    const fn = vi.fn();
    render(<CardActions onViewProgress={fn} />);
    await userEvent.click(screen.getByText("查看进度 →"));
    expect(fn).toHaveBeenCalledOnce();
  });

  it("stops event propagation on click", async () => {
    const parentFn = vi.fn();
    const fn = vi.fn();
    render(
      <div onClick={parentFn}>
        <CardActions onViewProgress={fn} />
      </div>,
    );
    await userEvent.click(screen.getByText("查看进度 →"));
    // parent should not receive the click
    expect(parentFn).not.toHaveBeenCalled();
  });

  it("renders with role=button", () => {
    render(<CardActions onViewProgress={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with tabIndex=0", () => {
    render(<CardActions onViewProgress={() => {}} />);
    const el = screen.getByRole("button");
    expect(el).toHaveAttribute("tabIndex", "0");
  });

  it("calls onViewProgress on Enter key", async () => {
    const fn = vi.fn();
    render(<CardActions onViewProgress={fn} />);
    const el = screen.getByRole("button");
    el.focus();
    await userEvent.keyboard("{Enter}");
    expect(fn).toHaveBeenCalledOnce();
  });

  it("calls onViewProgress on Space key", async () => {
    const fn = vi.fn();
    render(<CardActions onViewProgress={fn} />);
    const el = screen.getByRole("button");
    el.focus();
    await userEvent.keyboard(" ");
    expect(fn).toHaveBeenCalledOnce();
  });

  it("has cursor-pointer class", () => {
    render(<CardActions onViewProgress={() => {}} />);
    expect(screen.getByRole("button")).toHaveClass("cursor-pointer");
  });

  it("renders data-slot attribute", () => {
    render(<CardActions onViewProgress={() => {}} />);
    expect(screen.getByRole("button").closest('[data-slot="card-actions"]')).toBeInTheDocument();
  });
});
