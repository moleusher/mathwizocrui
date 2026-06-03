"use client";

import React from "react";
import { BookOpen, Search, GitBranch, Stethoscope } from "lucide-react";
import { cn } from "../utils/cn";

// ── Types ──

export interface IntentSelectorProps {
  /** Number of selected questions */
  selectedCount: number;
  /** Currently active intent ID */
  activeIntent: string | null;
  /** Called when intent changes (null = deselect) */
  onIntentChange: (intent: string | null) => void;
  /** Disable interaction */
  disabled?: boolean;
}

export interface IntentDef {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  hint: string;
}

// ── Default Intents ──

export const DEFAULT_INTENTS: IntentDef[] = [
  { id: "full_analysis", icon: BookOpen, label: "整卷分析", hint: "分析整张试卷" },
  { id: "single_question", icon: Search, label: "单题精讲", hint: "深入讲解一道题" },
  { id: "knowledge_chain", icon: GitBranch, label: "知识点串联", hint: "跨题目串联知识" },
  { id: "error_diagnosis", icon: Stethoscope, label: "错因诊断", hint: "分析错误原因" },
];

// ── Component ──

export const IntentSelector: React.FC<IntentSelectorProps> = ({
  selectedCount,
  activeIntent,
  onIntentChange,
  disabled = false,
}) => {
  const suggested =
    selectedCount === 0
      ? "full_analysis"
      : selectedCount === 1
        ? "single_question"
        : "knowledge_chain";

  const intents = DEFAULT_INTENTS;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-(--text-secondary)">
        选择分析模式
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {intents.map((item) => {
          const isSuggested = item.id === suggested;
          const isActive = activeIntent === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                onIntentChange(isActive ? null : item.id);
              }}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg border text-xs transition-all",
                isActive &&
                  "border-(--interactive-accent) bg-(--interactive-accent)/10 text-(--interactive-accent) ring-1 ring-(--interactive-accent)/40",
                isSuggested &&
                  !activeIntent &&
                  "border-(--interactive-accent)/50 bg-(--interactive-accent)/5 text-(--text-primary)",
                !isActive &&
                  !(isSuggested && !activeIntent) &&
                  "border-(--border-primary) text-(--text-secondary) hover:border-(--border-secondary)",
                disabled && "opacity-50 cursor-not-allowed",
                !disabled && "cursor-pointer",
              )}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
              <span className="text-(--text-muted)">{item.hint}</span>
            </button>
          );
        })}
      </div>
      {!activeIntent && selectedCount > 0 && (
        <p className="text-xs text-(--text-muted)">
          已选 {selectedCount} 题 · 推荐
          {suggested === "single_question" ? "单题精讲" : "知识点串联"}
        </p>
      )}
      {activeIntent && selectedCount > 0 && (
        <p className="text-xs text-(--text-secondary)">
          已选 {selectedCount} 题 · 当前:{" "}
          {intents.find((i) => i.id === activeIntent)?.label}
        </p>
      )}
    </div>
  );
};

IntentSelector.displayName = "IntentSelector";
