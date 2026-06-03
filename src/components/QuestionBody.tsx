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
  return (
    <div
      className={cn(
        "rounded-lg p-3",
        isMinimalist ? "bg-[var(--background-primary)]" : "bg-[var(--background-primary)] border border-[var(--border-primary)]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
        <span className="text-xs font-medium text-[var(--text-muted)]">题目原文</span>
      </div>

      {/* Text content */}
      {renderMode === "markdown" ? (
        <MarkdownRenderer content={text} />
      ) : (
        <div className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{text}</div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
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
      <div className={cn("flex items-center justify-center mt-2 rounded-md max-h-48 min-h-[80px] min-w-[120px] text-xs text-[var(--text-muted)]", isMinimalist ? "bg-[var(--background-primary)]" : "border border-[var(--border-primary)] bg-[var(--background-primary)]")}>
        图片加载失败
      </div>
    );
  }

  return (
    <img
      src={image.url}
      alt={image.caption ?? `题目图片 ${index + 1}`}
      loading="lazy"
      className={cn("mt-2 rounded-md max-h-48 object-contain cursor-pointer", isMinimalist ? "" : "border border-[var(--border-primary)]")}
      onClick={() => onImageClick?.(image, index)}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
