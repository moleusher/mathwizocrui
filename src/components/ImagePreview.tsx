import React, { useState, useEffect, useRef } from "react";
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
    { src, alt = "", zoomable = true, maxZoom = 3, placeholder, errorContent, className, ...props },
    ref,
  ) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    // wheel handler with passive:false to avoid browser warning for preventDefault
    useEffect(() => {
      const el = divRef.current;
      if (!el || !zoomable) {
        return;
      }
      const handler = (e: WheelEvent) => {
        e.preventDefault();
        setZoom((z) => Math.min(maxZoom, Math.max(1, z - e.deltaY * 0.001)));
      };
      el.addEventListener("wheel", handler, { passive: false });
      return () => {
        el.removeEventListener("wheel", handler);
      };
    }, [zoomable, maxZoom]);

    // forward internal ref to parent ref
    useEffect(() => {
      if (typeof ref === "function") {
        ref(divRef.current);
      } else if (ref) {
        ref.current = divRef.current;
      }
    }, [ref]);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (zoom <= 1) {
        return;
      }
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) {
        return;
      }
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const resetZoom = () => {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
    };

    return (
      <div
        ref={divRef}
        data-slot="image-preview"
        data-zoom={zoom > 1 ? zoom : undefined}
        className={cn(
          "relative overflow-hidden rounded-(--radius-md) bg-(--background-hover) select-none",
          zoomable && "cursor-zoom-in",
          zoom > 1 && "cursor-grab",
          isDragging && "cursor-grabbing",
          className,
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        {...props}
      >
        {/* Loading */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            {placeholder ?? (
              <div className="flex flex-col items-center gap-2 text-(--text-muted) text-sm">
                <div className="size-6 border-2 border-(--background-tertiary) border-t-(--interactive-accent) rounded-full animate-spin" />
                Loading...
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            {errorContent ?? (
              <div className="text-sm text-[var(--color-error)]">Failed to load image</div>
            )}
          </div>
        )}

        {/* Image */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          onLoad={() => {
            setIsLoaded(true);
          }}
          onError={() => {
            setHasError(true);
          }}
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
              type="button"
              aria-label="Zoom out"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(1, z - 0.5));
              }}
              className="size-8 flex items-center justify-center rounded bg-[var(--background-primary)]/80 text-xs font-bold shadow-[var(--shadow-sm)] hover:bg-[var(--background-primary)]"
            >
              −
            </button>
            <button
              type="button"
              aria-label="Reset zoom"
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="size-8 flex items-center justify-center rounded bg-[var(--background-primary)]/80 text-xs shadow-[var(--shadow-sm)] hover:bg-[var(--background-primary)]"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.min(maxZoom, z + 0.5));
              }}
              className="size-8 flex items-center justify-center rounded bg-[var(--background-primary)]/80 text-xs font-bold shadow-[var(--shadow-sm)] hover:bg-[var(--background-primary)]"
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
