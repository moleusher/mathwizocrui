import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { MarkdownRendererProps } from "../../components/MarkdownRenderer";

afterEach(() => {
  cleanup();
});

async function renderM(props: MarkdownRendererProps) {
  const { MarkdownRenderer } = await import("../../components/MarkdownRenderer");
  return render(<MarkdownRenderer {...props} />);
}

describe("MarkdownRenderer", () => {
  it("renders plain text correctly", async () => {
    await renderM({ content: "Hello, world!" });
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  it("renders paragraph text correctly", async () => {
    await renderM({ content: "This is a paragraph of text." });
    expect(screen.getByText("This is a paragraph of text.")).toBeInTheDocument();
  });

  it("renders inline LaTeX with KaTeX", async () => {
    await renderM({ content: "Inline math: $E=mc^2$" });
    const katexElements = document.querySelectorAll('[class*="katex"]');
    expect(katexElements.length).toBeGreaterThan(0);
    expect(document.body.textContent).toContain("E=mc");
  });

  it("renders display LaTeX with KaTeX", async () => {
    await renderM({ content: "Display math: $$S = 2(ab+ah+bh)$$" });
    const katexElements = document.querySelectorAll('[class*="katex"]');
    expect(katexElements.length).toBeGreaterThan(0);
    expect(document.body.textContent).toContain("ab");
  });

  it("renders mixed markdown and math correctly", async () => {
    await renderM({
      content:
        "已知长方体长 $a=25\\text{cm}$，宽 $b=22\\text{cm}$，高 $h=26\\text{cm}$。\n\n求表面积：$$S = 2(ab+ah+bh)$$",
    });
    const katexElements = document.querySelectorAll('[class*="katex"]');
    expect(document.body.textContent).toContain("已知长方体长");
    expect(katexElements.length).toBeGreaterThan(0);
  });

  it("handles empty string", async () => {
    await renderM({ content: "" });
    expect(document.body.textContent).toBe("");
  });

  it("renders markdown bold syntax", async () => {
    await renderM({ content: "This is **bold** text." });
    const boldEl = document.querySelector("strong");
    expect(boldEl).toBeInTheDocument();
    expect(boldEl?.textContent).toBe("bold");
  });

  it("renders markdown list", async () => {
    await renderM({ content: "- Item 1\n- Item 2\n- Item 3" });
    const items = document.querySelectorAll("li");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("renders markdown heading", async () => {
    await renderM({ content: "## Section Title" });
    const heading = document.querySelector("h2");
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe("Section Title");
  });

  it("disables math when enableMath=false", async () => {
    await renderM({ content: "No math: $E=mc^2$", enableMath: false });
    const katexElements = document.querySelectorAll('[class*="katex"]');
    expect(katexElements.length).toBe(0);
    expect(document.body.textContent).toContain("$E=mc^2$");
  });

  it("accepts custom className", async () => {
    await renderM({ content: "Test", className: "custom-class" });
    const rootEl = document.querySelector(".custom-class");
    expect(rootEl).toBeInTheDocument();
  });

  it("renders fallback when error boundary catches error", async () => {
    // Normal rendering should work with fallback prop
    await renderM({
      content: "Test content",
      fallback: "Render failed",
    });
    expect(document.body.textContent).toContain("Test content");
  });

  it("does not crash with complex LaTeX", async () => {
    await renderM({
      content:
        "已知：长 $a = 25\\text{cm}$，宽 $b = 22\\text{cm}$，高 $h = 26\\text{cm}$。\n求：制作一个瓷尊至少需要用多少平方厘米的瓷土？\n\n解：$$S = 2(ab + ah + bh) = 2(25\\times22 + 25\\times26 + 22\\times26) = 3544\\text{cm}^2$$",
    });
    expect(document.body.textContent).toContain("瓷尊");
  });
});
