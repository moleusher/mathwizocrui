import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { TeacherCommentPanelProps } from "../../components/TeacherCommentPanel";

afterEach(() => {
  cleanup();
});

async function renderPanel(props: TeacherCommentPanelProps) {
  const { TeacherCommentPanel } = await import("../../components/TeacherCommentPanel");
  return render(<TeacherCommentPanel {...props} />);
}

describe("TeacherCommentPanel", () => {
  it("renders comment text", async () => {
    await renderPanel({ comment: "上面错了。以为21.4才是宽。" });
    expect(screen.getByText("上面错了。以为21.4才是宽。")).toBeInTheDocument();
  });

  it("renders 教师批注 label", async () => {
    await renderPanel({ comment: "test" });
    expect(screen.getByText("教师批注")).toBeInTheDocument();
  });
});
