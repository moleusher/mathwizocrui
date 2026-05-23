import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { cn } from "../utils/cn";
import "katex/dist/katex.min.css";

// ── Props ──

export interface MarkdownRendererProps {
  /** Markdown content (supports CommonMark + LaTeX $$...$$ / $...$) */
  content: string;

  /**
   * Enable KaTeX math rendering
   * @default true
   */
  enableMath?: boolean;

  /**
   * HTML safety policy
   * - 'sanitize': rehype-sanitize allowlist filter (recommended)
   * - 'strip': remove all HTML tags, plain text only
   * @default 'sanitize'
   */
  htmlMode?: "sanitize" | "strip";

  /** Custom CSS class */
  className?: string;

  /** Fallback content when rendering fails */
  fallback?: React.ReactNode;
}

// ── Error Boundary ──

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class MarkdownErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode; content: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode; content: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[MarkdownRenderer] Render error:", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return <>{this.props.fallback}</>;
      }
      return (
        <pre
          className={cn(
            "whitespace-pre-wrap break-words rounded-(--radius-md)",
            "bg-(--color-error)/5 border border-(--color-error)/20",
            "p-3 text-sm text-(--color-text)",
          )}
        >
          {this.props.content}
        </pre>
      );
    }
    return this.props.children;
  }
}

// ── Component ──

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  enableMath = true,
  htmlMode = "sanitize",
  className,
  fallback,
}) => {
  // ── Empty content ──
  if (!content) {
    return null;
  }

  // ── Build remark/rehype pipeline ──
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const remarkPlugins: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rehypePlugins: any[] = [];

  if (enableMath) {
    remarkPlugins.push(remarkMath);
    rehypePlugins.push(rehypeKatex);
  }

  if (htmlMode === "sanitize") {
    rehypePlugins.push([rehypeSanitize, defaultSchema]);
  }

  // When htmlMode is 'strip', we don't add rehype-sanitize or allow raw HTML.
  // react-markdown by default strips raw HTML, so content is already safe.
  // 'strip' mode means: don't even allow safe HTML, just plain markdown.

  const renderContent = (
    <div
      className={cn(
        "prose prose-sm max-w-none text-(--color-text)",
        // Table styling
        "[&_table]:w-full [&_table]:border-collapse",
        "[&_th]:border [&_th]:border-(--color-border) [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold",
        "[&_td]:border [&_td]:border-(--color-border) [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-sm",
        // Code styling
        "[&_code]:rounded [&_code]:bg-(--color-brand-50) [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs",
        "[&_pre]:rounded-(--radius-md) [&_pre]:bg-(--color-brand-50) [&_pre]:p-3 [&_pre]:overflow-x-auto",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        // Link styling
        "[&_a]:text-(--color-primary) [&_a]:underline",
        // List styling
        "[&_ul]:list-disc [&_ul]:pl-6",
        "[&_ol]:list-decimal [&_ol]:pl-6",
        // KaTeX sizing
        enableMath && "[&_.katex]:text-base",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
        {content}
      </ReactMarkdown>
    </div>
  );

  return (
    <MarkdownErrorBoundary fallback={fallback} content={content}>
      {renderContent}
    </MarkdownErrorBoundary>
  );
};

MarkdownRenderer.displayName = "MarkdownRenderer";
