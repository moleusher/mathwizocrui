import React from "react";
import { cn } from "../utils/cn";

export interface FormulaRendererProps extends React.ComponentProps<"span"> {
  /** LaTeX formula string (without $ delimiters) */
  formula: string;
  /** Display mode: inline (span) or block (div) */
  display?: "inline" | "block";
  /** Fallback text if formula cannot be rendered */
  fallback?: string;
}

/**
 * Lightweight formula renderer for math expressions.
 * Uses KaTeX when available, falls back to monospace text display.
 *
 * For full KaTeX rendering, consumers should install 'katex' and 'react-katex'
 * as peer dependencies and use the KaTeX-enabled version.
 */
export const FormulaRenderer = React.forwardRef<HTMLSpanElement, FormulaRendererProps>(
  ({ formula, display = "inline", fallback, className, ...props }, ref) => {
    const Comp = display === "block" ? "div" : "span";

    return (
      <Comp
        ref={ref as React.Ref<HTMLSpanElement> & React.Ref<HTMLDivElement>}
        data-slot="formula-renderer"
        data-display={display}
        className={cn(
          "font-mono text-sm text-(--text-primary)",
          display === "block" && "block my-2",
          display === "inline" && "inline",
          className,
        )}
        title={formula}
        {...props}
      >
        {fallback ?? `$${formula}$`}
      </Comp>
    );
  },
);

FormulaRenderer.displayName = "FormulaRenderer";
