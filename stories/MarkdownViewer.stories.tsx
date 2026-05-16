import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownViewer } from "../src/components/MarkdownViewer";

const meta: Meta<typeof MarkdownViewer> = {
  title: "Components/MarkdownViewer",
  component: MarkdownViewer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkdownViewer>;

const sampleContent = `## Quadratic Formula

The solutions to the quadratic equation $ax^2 + bx + c = 0$ are given by:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

### Key Properties

- **Discriminant**: $\\Delta = b^2 - 4ac$
- If $\\Delta > 0$: two distinct real roots
- If $\\Delta = 0$: one repeated root
- If $\\Delta < 0$: complex conjugate roots

### Example

For $2x^2 - 4x - 6 = 0$:

| Variable | Value |
|----------|-------|
| a | 2 |
| b | -4 |
| c | -6 |
| $\\Delta$ | 64 |

> **Note**: Always check your work by substituting back.
`;

export const QuadraticFormula: Story = {
  args: {
    content: sampleContent,
    prose: "standard",
  },
};

export const SimpleText: Story = {
  args: {
    content: "## Result Summary\n\nThe OCR analysis completed successfully.\n\n- **Total questions**: 12\n- **Correct**: 8\n- **Partial**: 3\n- **Incorrect**: 1\n\nCheck the *detailed report* for more information.",
  },
};

export const Compact: Story = {
  args: {
    content: "**Score**: 8/12 (67%)\n\n*Passed* — Threshold: 60%",
    prose: "compact",
  },
};

export const CodeBlock: Story = {
  args: {
    content: '### Solution Steps\n\n```python\ndef solve_quadratic(a, b, c):\n    delta = b**2 - 4*a*c\n    if delta < 0:\n        return None\n    x1 = (-b + delta**0.5) / (2*a)\n    x2 = (-b - delta**0.5) / (2*a)\n    return (x1, x2)\n```\n\nThe function returns `None` when no real roots exist.',
    prose: "standard",
  },
};
