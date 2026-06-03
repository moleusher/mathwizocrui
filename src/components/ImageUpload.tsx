import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "../utils/cn";
import { MathButton } from "./MathButton";
import { ImagePreview } from "./ImagePreview";
import { ImagePagination } from "./ImagePagination";
import { Xmark } from "@gravity-ui/icons";

export interface ImageUploadProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Accepted file types, e.g. "image/*,.pdf" */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Max file size in bytes (default 50MB) */
  maxSize?: number;
  /** Called when files are selected */
  onFilesSelected?: (files: File[]) => void;
  /** Called when files are rejected due to size/type validation */
  onRejected?: (rejected: { name: string; reason: string }[]) => void;
  /** Preview selected image as background */
  showPreview?: boolean;
  /** Custom dropzone text */
  label?: string;
  /** Custom hint text */
  hint?: string;
  /** Error message to display */
  error?: string;
  /** Aria-label for the dropzone region (default computed from accept) */
  ariaLabel?: string;
  /** Aria-label for the hidden file input (default computed from accept) */
  inputAriaLabel?: string;
}

export const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      accept = "image/*,.pdf",
      multiple = false,
      maxSize = 50 * 1024 * 1024,
      onFilesSelected,
      onRejected,
      showPreview = true,
      label = "Drop files here or click to browse",
      hint = "Supports PDF, PNG, JPEG (max 50MB)",
      error,
      ariaLabel,
      inputAriaLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const objectUrlsRef = useRef<Map<string, string>>(new Map());

    // Compute default ARIA labels from accept prop
    const dropzoneAriaLabel =
      ariaLabel && ariaLabel.length > 0
        ? ariaLabel
        : accept === "image/jpeg,image/png"
          ? "试卷上传区域"
          : accept === "image/*"
            ? "图片上传区域"
            : accept === "image/*,.pdf"
              ? "文件上传区域"
              : "文件上传区域";
    const fileInputAriaLabel =
      inputAriaLabel && inputAriaLabel.length > 0
        ? inputAriaLabel
        : accept === "image/jpeg,image/png"
          ? "选择 JPEG 或 PNG 试卷图片"
          : accept === "image/*"
            ? "选择图片文件"
            : accept === "image/*,.pdf"
              ? "选择图片或 PDF 文件"
              : "选择文件";

    // Revoke all object URLs on unmount
    useEffect(() => {
      return () => {
        objectUrlsRef.current.forEach((url) => {
          URL.revokeObjectURL(url);
        });
      };
    }, []);

    const getObjectUrl = useCallback((file: File): string => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      const cached = objectUrlsRef.current.get(key);
      if (cached) {
        return cached;
      }
      const url = URL.createObjectURL(file);
      objectUrlsRef.current.set(key, url);
      return url;
    }, []);

    const handleFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList?.length) {
          return;
        }
        const valid: File[] = [];
        const rejected: { name: string; reason: string }[] = [];
        const maxSizeMb = (maxSize / (1024 * 1024)).toFixed(0);

        // Parse accept list for type checking
        const acceptedTypes = accept.split(",").map((t) => t.trim());
        const isTypeAccepted = (file: File): boolean => {
          if (acceptedTypes.length === 0 || acceptedTypes[0] === "" || acceptedTypes[0] === "*/*") {
            return true;
          }
          return acceptedTypes.some((type) => {
            if (type.startsWith(".")) {
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            if (type.endsWith("/*")) {
              const category = type.slice(0, -2);
              return file.type.startsWith(category);
            }
            return file.type === type;
          });
        };

        for (const f of Array.from(fileList)) {
          if (f.size > maxSize) {
            rejected.push({ name: f.name, reason: `超过 ${maxSizeMb}MB 大小限制` });
            continue;
          }
          if (!isTypeAccepted(f)) {
            rejected.push({ name: f.name, reason: "不支持的文件类型" });
            continue;
          }
          valid.push(f);
        }
        if (rejected.length > 0) {
          onRejected?.(rejected);
        }
        if (!valid.length) {
          return;
        }

        setFiles((prev) => {
          const next = multiple ? [...prev, ...valid] : valid;
          // Reset to first page when adding the first batch
          if (prev.length === 0 && next.length > 0) {
            setCurrentIndex(0);
          }
          onFilesSelected?.(next);
          return next;
        });
      },
      [maxSize, multiple, onFilesSelected, onRejected],
    );

    const removeCurrentFile = useCallback(() => {
      setFiles((prev) => {
        if (prev.length === 0) {
          return prev;
        }
        const next = prev.filter((_, i) => i !== currentIndex);
        onFilesSelected?.(next);
        return next;
      });
      // Adjust index after removal
      setFiles((prev) => {
        if (currentIndex >= prev.length && prev.length > 0) {
          setCurrentIndex(prev.length - 1);
        }
        return prev;
      });
    }, [currentIndex, onFilesSelected]);

    const hasFiles = files.length > 0;
    const currentFile = hasFiles ? files[currentIndex] : null;
    const isImage = currentFile?.type.startsWith("image/");
    const previewUrl = hasFiles && isImage && currentFile ? getObjectUrl(currentFile) : null;

    const openFilePicker = useCallback((e?: React.MouseEvent) => {
      e?.stopPropagation();
      inputRef.current?.click();
    }, []);

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const dataError = error || undefined;

    return (
      <div
        ref={ref}
        role="region"
        aria-label={dropzoneAriaLabel}
        data-slot="image-upload"
        data-dragging={isDragging ? "" : undefined}
        data-error={dataError}
        data-has-files={hasFiles ? "" : undefined}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-(--radius-lg) border-2 border-dashed p-8 transition-colors duration-150",
          !hasFiles && "cursor-pointer",
          "border-(--border-primary) bg-(--background-primary)",
          isDragging && "border-(--interactive-accent) bg-(--background-hover)",
          error && "border-[var(--color-error)] bg-[var(--color-error)/10]",
          className,
        )}
        onClick={() => {
          if (!hasFiles) {
            openFilePicker();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => {
          setIsDragging(false);
        }}
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
          aria-label={fileInputAriaLabel}
          onChange={(e) => {
            handleFiles(e.target.files);
          }}
        />

        {hasFiles && showPreview ? (
          /* ── Preview mode (single or multi-page) ── */
          <>
            {error && (
              <p className="w-full text-xs text-[var(--color-error)] text-center">{error}</p>
            )}

            {isImage && previewUrl ? (
              <ImagePreview src={previewUrl} alt={currentFile?.name ?? ""} />
            ) : (
              <div className="w-full h-48 flex items-center justify-center text-(--text-muted) text-sm">
                {currentFile?.name ?? "Unsupported file"}
              </div>
            )}

            {multiple && files.length > 1 && (
              <ImagePagination
                current={currentIndex + 1}
                total={files.length}
                onPageChange={(p) => {
                  setCurrentIndex(p - 1);
                }}
              />
            )}

            <div className="flex items-center gap-3 text-sm text-(--text-muted)">
              <span>
                {files.length} file{files.length !== 1 ? "s" : ""} selected
              </span>
              {multiple && (
                <button
                  type="button"
                  className="text-[var(--color-error)] hover:opacity-70 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCurrentFile();
                  }}
                >
                  <Xmark className="size-3.5" /> 移除{" "}
                  {files.length > 1 ? `第 ${currentIndex + 1} 页` : "当前页"}
                </button>
              )}
            </div>

            {multiple && (
              <div className="w-full pt-4 border-t border-(--border-primary) flex flex-col items-center gap-2">
                <p className="text-xs text-(--text-muted)">
                  Add more files by dropping or browsing
                </p>
                <MathButton variant="outline" size="sm" type="button" onClick={openFilePicker}>
                  Browse Files
                </MathButton>
              </div>
            )}
          </>
        ) : (
          /* ── Empty dropzone ── */
          <>
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
                isDragging ? "text-(--interactive-accent)" : "text-(--text-muted)",
              )}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>

            <div className="text-center">
              <p
                className={cn(
                  "text-sm font-medium",
                  isDragging ? "text-(--interactive-accent)" : "text-(--text-primary)",
                )}
              >
                {label}
              </p>
              {hint && <p className="mt-1 text-xs text-(--text-muted)">{hint}</p>}
              {error && <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>}
            </div>

            <MathButton variant="outline" size="sm" type="button" onClick={openFilePicker}>
              Browse Files
            </MathButton>
          </>
        )}
      </div>
    );
  },
);
ImageUpload.displayName = "ImageUpload";
