import React from "react";
import { cn } from "../utils/cn";

export interface BlockType {
  id: string;
  label: string;
  color: string; // Tailwind bg class, e.g. "bg-emerald-500"
}

export interface BlockLegendProps extends React.ComponentProps<"div"> {
  /** Block types */
  blocks: BlockType[];
  /** Layout: horizontal row or vertical column */
  layout?: "horizontal" | "vertical";
}

export const BlockLegend = React.forwardRef<HTMLDivElement, BlockLegendProps>(
  ({ blocks, layout = "horizontal", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="block-legend"
        data-layout={layout}
        className={cn(
          "flex gap-3",
          layout === "horizontal" ? "flex-row flex-wrap" : "flex-col",
          className,
        )}
        {...props}
      >
        {blocks.map((block) => (
          <div key={block.id} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-full flex-shrink-0", block.color)} />
            <span className="text-xs text-(--color-text)">{block.label}</span>
          </div>
        ))}
      </div>
    );
  },
);
BlockLegend.displayName = "BlockLegend";
