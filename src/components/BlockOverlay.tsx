import React from "react";
import { cn } from "../utils/cn";

export interface OverlayBlock {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  color?: string; // tailwind border class
  label?: string;
  active?: boolean;
}

export interface BlockOverlayProps extends React.ComponentProps<"div"> {
  /** Block definitions */
  blocks: OverlayBlock[];
  /** Called when a block is clicked */
  onBlockClick?: (blockId: string) => void;
  /** Image dimensions to calculate percentages */
  imageWidth?: number;
  imageHeight?: number;
}

export const BlockOverlay = React.forwardRef<HTMLDivElement, BlockOverlayProps>(
  ({ blocks, onBlockClick, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="block-overlay"
        className={cn("absolute inset-0 pointer-events-none", className)}
        {...props}
      >
        {blocks.map((block) => (
          <div
            key={block.id}
            data-slot="block-overlay-item"
            data-active={block.active || undefined}
            className={cn(
              "absolute pointer-events-auto cursor-pointer transition-all border-2 rounded-sm",
              block.color || "border-(--color-primary)",
              block.active
                ? "border-(--color-primary) bg-(--color-primary)/10"
                : "bg-transparent hover:bg-(--color-primary)/5",
            )}
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              width: `${block.width}%`,
              height: `${block.height}%`,
            }}
            onClick={() => onBlockClick?.(block.id)}
            title={block.label}
          >
            {block.label && (
              <span className="absolute -top-5 left-0 text-[10px] font-medium bg-white/90 px-1 rounded whitespace-nowrap shadow-sm">
                {block.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  },
);
BlockOverlay.displayName = "BlockOverlay";
