import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

async function renderBadges() {
  const mod = await import("../../components/QuestionBadges");
  return mod;
}

describe("QuestionBadge", () => {
  it("renders index number", async () => {
    const { QuestionBadge } = await renderBadges();
    render(<QuestionBadge index={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});

describe("TypeBadge", () => {
  it.each([
    ["calculation", "计算题"],
    ["choice", "选择题"],
    ["fill_blank", "填空题"],
    ["solution", "解答题"],
    ["proof", "证明题"],
    ["geometry", "几何题"],
    ["unknown", "未知"],
  ] as const)("renders %s as %s", async (type, expected) => {
    const { TypeBadge } = await renderBadges();
    render(<TypeBadge type={type} />);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});

describe("DifficultyBadge", () => {
  it.each([
    ["easy", "●▷▷"],
    ["medium", "●●▷"],
    ["hard", "●●●"],
    ["unknown", "---"],
  ] as const)("renders %s as %s", async (difficulty, expected) => {
    const { DifficultyBadge } = await renderBadges();
    render(<DifficultyBadge difficulty={difficulty} />);
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});

describe("CorrectionBadge", () => {
  it("renders checkmark", async () => {
    const { CorrectionBadge } = await renderBadges();
    render(<CorrectionBadge mark="✓" />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders cross", async () => {
    const { CorrectionBadge } = await renderBadges();
    render(<CorrectionBadge mark="✗" />);
    expect(screen.getByText("✗")).toBeInTheDocument();
  });

  it("renders question mark", async () => {
    const { CorrectionBadge } = await renderBadges();
    render(<CorrectionBadge mark="?" />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});

describe("ScoreDisplay", () => {
  it("renders score/maxScore when score is not null", async () => {
    const { ScoreDisplay } = await renderBadges();
    render(<ScoreDisplay score={5} maxScore={5} />);
    expect(screen.getByText("5/5")).toBeInTheDocument();
  });

  it("renders --/maxScore when score is null", async () => {
    const { ScoreDisplay } = await renderBadges();
    render(<ScoreDisplay score={null} maxScore={5} />);
    expect(screen.getByText("--/5")).toBeInTheDocument();
  });
});

describe("KnowledgeBadge", () => {
  it("renders label text", async () => {
    const { KnowledgeBadge } = await renderBadges();
    render(<KnowledgeBadge label="长方体" />);
    expect(screen.getByText("长方体")).toBeInTheDocument();
  });
});

describe("PrerequisiteBadge", () => {
  it("renders label with prefix", async () => {
    const { PrerequisiteBadge } = await renderBadges();
    render(<PrerequisiteBadge label="整数运算" />);
    expect(screen.getByText("← 整数运算")).toBeInTheDocument();
  });
});
