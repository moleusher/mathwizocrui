import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import type { QuestionBodyProps } from "../../components/QuestionBody";
import type { QuestionImage } from "../../types/question";

afterEach(() => {
  cleanup();
});

async function renderBody(props: QuestionBodyProps) {
  const { QuestionBody } = await import("../../components/QuestionBody");
  return render(<QuestionBody {...props} />);
}

const mockImage: QuestionImage = {
  url: "https://example.com/image.png",
  caption: "图示",
};

describe("QuestionBody", () => {
  it("renders text content", async () => {
    await renderBody({ text: "已知长方体长 $a=25\\text{cm}$" });
    expect(screen.getByText(/已知长方体长/)).toBeInTheDocument();
  });

  it("renders images", async () => {
    await renderBody({ text: "题目", images: [mockImage] });
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toBe("https://example.com/image.png");
  });

  it("shows placeholder on image error", async () => {
    await renderBody({ text: "题目", images: [{ url: "broken-url" }] });
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
    fireEvent.error(img!);
    expect(screen.getByText("图片加载失败")).toBeInTheDocument();
  });

  it("renders without images", async () => {
    await renderBody({ text: "纯文本题目" });
    expect(screen.getByText("纯文本题目")).toBeInTheDocument();
    expect(document.querySelectorAll("img").length).toBe(0);
  });

  it("renders label 题目原文", async () => {
    await renderBody({ text: "题目" });
    expect(screen.getByText("题目原文")).toBeInTheDocument();
  });
});
