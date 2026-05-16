import React, { useState, useCallback } from "react";
import { cn } from "../utils/cn";

export interface ImagePreviewProps extends React.ComponentProps<"div"> {
  /** Image URL */
  src: string;
  /** Alt text */
  alt?: string;
  /** Enable click-to-zoom */
  zoomable?: boolean;
  /** Max zoom scale (default 3) */
  maxZoom?: number;
  /** Placeholder while loading */
  placeholder?: React.ReactNode;
  /** Error state content */
  errorContent?: React.ReactNode;
}

export const ImagePreview = React.forwardRef<HTMLDivElement, ImagePreviewProps>(
  (
    {
      src,
      alt = "",
      zoomable = true,
      maxZoom = 3,
      placeholder,
      errorContent,
      className,
      ...props
    },
    ref,
  ) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        if (!zoomable) return;
        e.preventDefault();
        setZoom((z) => Math.min(maxZoom, Math.max(1, z - e.deltaY * 0.001)));
      },
      [zoomable, maxZoom],
    );

    const handleMouseDown = (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };

    const handleMouseUp = () => setIsDragging(false);

    const resetZoom = () => {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    };

    return (
      <div
        ref={ref}
        data-slot="image-preview"
        data-zoom={zoom > 1 ? zoom : undefined}
        className={cn(
          "relative overflow-hidden rounded-(--radius-md) bg-(--color-brand-50) select-none",
          zoomable && "cursor-zoom-in",
          zoom > 1 && "cursor-grab",
          isDragging && "cursor-grabbing",
          className,
        )}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        {...props}
      >
        {/* Loading */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            {placeholder || (
              <div className="flex flex-col items-center gap-2 text-(--color-text-muted) text-sm">
                <div className="size-6 border-2 border-(--color-brand-200) border-t-(--color-primary) rounded-full animate-spin" />
                Loading...
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            {errorContent || (
              <div className="text-sm text-red-500">Failed to load image</div>
            )}
          </div>
        )}

        {/* Image */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-auto transition-transform duration-100",
            !isLoaded && "invisible",
          )}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: "center center",
          }}
        />

        {/* Zoom controls */}
        {zoomable && zoom > 1 && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(1, z - 0.5));
              }}
              className="size-7 flex items-center justify-center rounded bg-white/80 text-xs font-bold shadow-sm hover:bg-white"
            >
              −
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="size-7 flex items-center justify-center rounded bg-white/80 text-xs shadow-sm hover:bg-white"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.min(maxZoom, z + 0.5));
              }}
              className="size-7 flex items-center justify-center rounded bg-white/80 text-xs font-bold shadow-sm hover:bg-white"
            >
              +
            </button>
          </div>
        )}
      </div>
    );
  },
);
ImagePreview.displayName = "ImagePreview";
