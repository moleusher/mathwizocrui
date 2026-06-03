import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../utils/cn";

export interface ExpandToggleProps {
  isExpanded: boolean;
  onClick: () => void;
  label?: string;
  controlsId?: string;
  className?: string;
}

export const ExpandToggle: React.FC<ExpandToggleProps> = ({
  isExpanded,
  onClick,
  label,
  controlsId,
  className,
}) => {
  if (!onClick) return null;

  const displayLabel = label ?? (isExpanded ? "收起" : "展开更多");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-controls={controlsId}
      className={cn(
        "inline-flex items-center text-sm text-[var(--interactive-accent)] cursor-pointer hover:underline",
        className,
      )}
      style={{gap: 'var(--space-inset-xs)'}}
    >
      {displayLabel}
      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>
  );
};

ExpandToggle.displayName = "ExpandToggle";
