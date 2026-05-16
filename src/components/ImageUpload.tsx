import React, { useState, useRef, useCallback } from "react";
import { cn } from "../utils/cn";
import { MathButton } from "./MathButton";

export interface ImageUploadProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Accepted file types, e.g. "image/*,.pdf" */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes (default 50MB) */
  maxSize?: number;
  /** Called when files are selected */
  onFilesSelected?: (files: File[]) => void;
  /** Preview selected image as background */
  showPreview?: boolean;
  /** Custom dropzone text */
  label?: string;
  /** Custom hint text */
  hint?: string;
  /** Error message to display */
  error?: string;
}

export const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      accept = "image/*,.pdf",
      multiple = false,
      maxSize = 50 * 1024 * 1024,
      onFilesSelected,
      showPreview = true,
      label = "Drop files here or click to browse",
      hint = "Supports PDF, PNG, JPEG (max 50MB)",
      error,
      className,
      ...props
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
      (files: FileList | null) => {
        if (!files?.length) return;
        const valid: File[] = [];
        for (const f of Array.from(files)) {
          if (f.size > maxSize) continue;
          valid.push(f);
        }
        if (!valid.length) return;

        // Preview first image
        if (showPreview && valid[0]?.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => setPreview(reader.result as string);
          reader.readAsDataURL(valid[0]);
        }

        onFilesSelected?.(valid.slice(0, multiple ? undefined : 1));
      },
      [maxSize, multiple, onFilesSelected, showPreview],
    );

    return (
      <div
        ref={ref}
        data-slot="image-upload"
        data-dragging={isDragging || undefined}
        data-error={error || undefined}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-(--radius-lg) border-2 border-dashed p-8 transition-colors duration-150 cursor-pointer",
          "border-(--color-border) bg-(--color-surface)",
          isDragging && "border-(--color-primary) bg-(--color-brand-50)",
          error && "border-red-300 bg-red-50",
          className,
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        {...props}
      >
        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Upload preview"
            className="max-h-48 max-w-full rounded-(--radius-md) object-contain"
          />
        )}

        {/* Upload icon */}
        {!preview && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-colors",
              isDragging ? "text-(--color-primary)" : "text-(--color-text-muted)",
            )}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        )}

        {/* Text */}
        <div className="text-center">
          <p
            className={cn(
              "text-sm font-medium",
              isDragging ? "text-(--color-primary)" : "text-(--color-text)",
            )}
          >
            {label}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-(--color-text-muted)">{hint}</p>
          )}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>

        {!preview && (
          <MathButton variant="outline" size="sm" type="button">
            Browse Files
          </MathButton>
        )}
      </div>
    );
  },
);
ImageUpload.displayName = "ImageUpload";
