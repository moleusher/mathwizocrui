import React from "react";
import { BookOpen } from "lucide-react";
import { cn } from "../utils/cn";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { QuestionImage } from "../types/question";

export interface QuestionBodyProps {
  text: string;
  images?: QuestionImage[];
  renderMode?: "markdown" | "plain";
  onImageClick?: (image: QuestionImage, index: number) => void;
  /** Visual style variant */
  variant?: "default" | "minimalist";
  className?: string;
}

export const QuestionBody: React.FC<QuestionBodyProps> = ({
  text,
  images = [],
  renderMode = "markdown",
  onImageClick,
  variant = "default",
  className,
}) => {
  const isMinimalist = variant === "minimalist";

  const panelClass = cn(
    "rounded-lg",
    isMinimalist ? "bg-[var(--background-secondary)]" : "bg-[var(--background-secondary)] border border-[var(--border-primary)]",
    className,
  );

  return (
    <div className={panelClass} style={{padding: 'var(--space-stack)'}}>
      {/* Header */}
      <div className="flex items-center gap-1.5" style={{marginBottom: 'var(--space-inset-sm)'}}>
        <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
        <span className="text-xs font-medium text-[var(--text-muted)]">题目原文</span>
      </div>

      {/* Text content */}
      {text ? (
        renderMode === "markdown" ? (
          <MarkdownRenderer content={text} />
        ) : (
          <div className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{text}</div>
        )
      ) : (
        <p className="text-sm text-[var(--text-muted)]">暂无内容</p>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="flex flex-wrap" style={{gap: 'var(--space-inset-sm)', marginTop: 'var(--space-inset-sm)'}}>
          {images.map((image, index) => (
            <ImageThumbnail
              key={`${image.url}-${index}`}
              image={image}
              index={index}
              onImageClick={onImageClick}
              isMinimalist={isMinimalist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

QuestionBody.displayName = "QuestionBody";

// ── Image Thumbnail Sub-component ──

interface ImageThumbnailProps {
  image: QuestionImage;
  index: number;
  onImageClick?: (image: QuestionImage, index: number) => void;
  isMinimalist: boolean;
}

function ImageThumbnail({ image, index, onImageClick, isMinimalist }: ImageThumbnailProps) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center rounded-md max-h-48 min-h-[80px] min-w-[120px] text-xs text-[var(--text-muted)]", isMinimalist ? "bg-[var(--background-primary)]" : "border border-[var(--border-primary)] bg-[var(--background-primary)]")} style={{marginTop: 'var(--space-inset-sm)'}}>
        图片加载失败
      </div>
    );
  }

  return (
    <img
      src={image.url}
      alt={image.caption ?? `题目图片 ${index + 1}`}
      loading="lazy"
      className={cn("rounded-md max-h-48 object-contain cursor-pointer", isMinimalist ? "" : "border border-[var(--border-primary)]")}
      style={{marginTop: 'var(--space-inset-sm)'}}
      onClick={() => onImageClick?.(image, index)}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
