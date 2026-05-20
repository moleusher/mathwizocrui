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
  className?: string;
}

export const QuestionBody: React.FC<QuestionBodyProps> = ({
  text,
  images = [],
  renderMode = "markdown",
  onImageClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <BookOpen className="w-4 h-4 text-[var(--color-text-muted)]" />
        <span className="text-xs font-medium text-[var(--color-text-muted)]">
          题目原文
        </span>
      </div>

      {/* Text content */}
      {renderMode === "markdown" ? (
        <MarkdownRenderer content={text} />
      ) : (
        <div className="text-sm text-[var(--color-text)] whitespace-pre-wrap">
          {text}
        </div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((image, index) => (
            <ImageThumbnail
              key={image.url + index}
              image={image}
              index={index}
              onImageClick={onImageClick}
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
}

function ImageThumbnail({ image, index, onImageClick }: ImageThumbnailProps) {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div className="flex items-center justify-center mt-2 rounded-md max-h-48 min-h-[80px] min-w-[120px] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-muted)]">
        图片加载失败
      </div>
    );
  }

  return (
    <img
      src={image.url}
      alt={image.caption ?? `题目图片 ${index + 1}`}
      loading="lazy"
      className="mt-2 rounded-md max-h-48 object-contain border border-[var(--color-border)] cursor-pointer"
      onClick={() => onImageClick?.(image, index)}
      onError={() => setHasError(true)}
    />
  );
}
