import React from "react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";

export interface MarkdownViewerProps extends React.ComponentProps<"div"> {
  /** Markdown content string */
  content: string;
  /** Prose layout: standard (article-like) or compact */
  prose?: "standard" | "compact";
}

/**
 * Markdown viewer with KaTeX math rendering via MarkdownRenderer.
 */
export const MarkdownViewer = React.forwardRef<HTMLDivElement, MarkdownViewerProps>(
  ({ content, prose = "standard", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="markdown-viewer"
        data-prose={prose}
        className={cn(
          "text-(--color-text)",
          prose === "standard" && "prose prose-sm max-w-none",
          prose === "compact" && "text-sm leading-relaxed",
          className,
        )}
        {...props}
      >
        <MarkdownRenderer content={content} />
      </div>
    );
  },
);
MarkdownViewer.displayName = "MarkdownViewer";
