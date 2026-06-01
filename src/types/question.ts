// ── Data Contracts: ExamQuestion & related DTOs ──
// Source: 04-DATA_CONTRACTS.md v0.11.0
// Phase A: Copy all type definitions verbatim from data contracts.

// ══════════════════════════════════════════════════════
// Utility / Sub-types
// ══════════════════════════════════════════════════════

export interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface QuestionImage {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
  block_id?: number;
}

export interface StudentAnswer {
  text: string;
  latex?: string;
  confidence?: number; // 0-1 (low → show warning icon)
  bbox?: BBox;
}

export interface TeacherCorrection {
  mark: "✓" | "✗" | "?" | null;
  score: number | null;
  max_score: number | null;
  comment: string | null;
  bbox?: BBox;
}

export interface StandardAnswer {
  text: string;
  latex?: string;
  source: "ocr" | "llm";
}

export interface SolutionStep {
  step: number; // 1-based
  content: string; // Markdown, can contain LaTeX
  knowledge?: string; // Associated knowledge point
}

export interface ErrorAnalysis {
  cause: string;
  type: "审题失误" | "计算失误" | "知识点漏洞" | "思维层级不足" | "规范失分" | "未知";
  suggestion?: string;
}

// ══════════════════════════════════════════════════════
// Data completeness
// ══════════════════════════════════════════════════════

export type DataCompleteness = "full" | "basic" | "minimal";

/**
 * Calculate data completeness for an ExamQuestion.
 * - full: student_answer + teacher_correction + error_analysis all present
 * - basic: question_type is not 'unknown'
 * - minimal: only question_text + question_index
 */
export function getDataCompleteness(q: ExamQuestion): DataCompleteness {
  if (q.student_answer && q.teacher_correction && q.error_analysis) {
    return "full";
  }
  if (q.question_type !== "unknown") {
    return "basic";
  }
  return "minimal";
}

// ══════════════════════════════════════════════════════
// Type aliases from ExamQuestion (exported for badge components)
// ══════════════════════════════════════════════════════

export type QuestionType =
  | "calculation"
  | "choice"
  | "fill_blank"
  | "solution"
  | "proof"
  | "geometry"
  | "unknown";
export type Difficulty = "easy" | "medium" | "hard" | "unknown";

// ══════════════════════════════════════════════════════
// Fusion meta (v0.2.1+)
// ══════════════════════════════════════════════════════

export interface FusionConflict {
  field: string;
  detail: string;
}

export interface FusionMeta {
  source_per_field: Record<string, string>;
  confidence_per_field: Record<string, number>;
  conflicts: FusionConflict[];
}

// ══════════════════════════════════════════════════════
// Main model
// ══════════════════════════════════════════════════════

export interface ExamQuestion {
  // ═══ L1 必有层 ═══
  question_index: number;
  question_text: string;
  question_type:
    | "calculation"
    | "choice"
    | "fill_blank"
    | "solution"
    | "proof"
    | "geometry"
    | "unknown";
  difficulty: "easy" | "medium" | "hard" | "unknown";
  knowledge_points: string[];

  // ═══ L2 增强层 ═══
  images: QuestionImage[];
  student_answer: StudentAnswer | null;
  teacher_correction: TeacherCorrection | null;
  standard_answer: StandardAnswer | null;
  student_correction: string | null;
  solution_steps: SolutionStep[];
  error_analysis: ErrorAnalysis | null;

  // ═══ L3 元数据层 ═══
  prerequisite_knowledge: string[];
  common_mistakes: string[];
  related_block_ids: number[];
  block_bbox: BBox | null;
  source: "ocr" | "llm" | "manual";

  /** 双模型融合元信息 (v0.2.1+, 可选) */
  fusion_meta?: FusionMeta;

  /** v0.4.0: SVG visualization for geometry questions */
  visual_svg?: string;
  visual_description?: string;
  visual_geometry_type?: "coordinate" | "solid" | "function" | "none";
}

// ══════════════════════════════════════════════════════
// Meta (API response)
// ══════════════════════════════════════════════════════

export interface QuestionsMeta {
  total: number;
  correct_count: number; // teacher_correction.mark='✓' count
  wrong_count: number; // teacher_correction.mark='✗' count
  unmarked_count: number; // teacher_correction == null count
  data_completeness: DataCompleteness;
}
