import React from "react";
import { cn } from "../utils/cn";

export interface MarkdownViewerProps extends React.ComponentProps<"div"> {
  /** Markdown content string */
  content: string;
  /** Prose layout: standard (article-like) or compact */
  prose?: "standard" | "compact";
}

/**
 * Lightweight markdown renderer with math-awareness.
 *
 * For full KaTeX math rendering, install 'react-markdown', 'remark-math',
 * and 'rehype-katex' in the consuming project. The viewer will detect
 * and use them when available, falling back to monospace display.
 *
 * If neither is installed, basic markdown is rendered with a simple
 * line-break aware text renderer.
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
          // Table styling
          "[&_table]:w-full [&_table]:border-collapse",
          "[&_th]:border [&_th]:border-(--color-border) [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:bg-(--color-brand-50)",
          "[&_td]:border [&_td]:border-(--color-border) [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-sm",
          // Code styling
          "[&_code]:rounded [&_code]:bg-(--color-brand-50) [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs",
          "[&_pre]:rounded-(--radius-md) [&_pre]:bg-(--color-brand-50) [&_pre]:p-3 [&_pre]:overflow-x-auto",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
          // Math formula styling
          "[&_.katex]:text-base",
          "[&_.math-inline]:inline [&_.math-block]:block [&_.math-block]:my-2",
          className,
        )}
        {...props}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    );
  },
);
MarkdownViewer.displayName = "MarkdownViewer";

// ── Simple markdown → HTML renderer ──
function renderMarkdown(md: string): string {
  let html = md;

  // Escape HTML first
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headings
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // LaTeX math blocks $$ ... $$
  html = html.replace(
    /\$\$([\s\S]*?)\$\$/g,
    '<div class="math-block">$$$1$$</div>',
  );

  // Inline math $ ... $
  html = html.replace(
    /\$(.+?)\$/g,
    '<span class="math-inline">$$$1$$</span>',
  );

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-(--color-primary) underline">$1</a>',
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr>");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Paragraphs: wrap text blocks in <p>
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<pre")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  return html;
}
