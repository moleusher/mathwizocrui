import { describe, it, expect } from "vitest";
import type {
  ExamQuestion,
  BBox,
  QuestionImage,
  StudentAnswer,
  TeacherCorrection,
  StandardAnswer,
  SolutionStep,
  ErrorAnalysis,
  QuestionsMeta,
  DataCompleteness,
  FusionMeta,
  FusionConflict,
} from "../../types/question";

describe("ExamQuestion type", () => {
  it("creates a valid ExamQuestion with all L1 required fields", () => {
    const question: ExamQuestion = {
      question_index: 1,
      question_text: "Calculate the surface area of a box with dimensions a=25cm, b=22cm, c=26cm.",
      question_type: "calculation",
      difficulty: "medium",
      knowledge_points: ["surface_area", "rectangular_prism"],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "ocr",
    };

    expect(question.question_index).toBe(1);
    expect(question.question_text).toBeTruthy();
    expect(question.question_type).toBe("calculation");
    expect(question.difficulty).toBe("medium");
    expect(question.knowledge_points).toContain("surface_area");
    expect(question.source).toBe("ocr");
  });

  it("creates a minimal ExamQuestion", () => {
    const question: ExamQuestion = {
      question_index: 1,
      question_text: "What is 2+2?",
      question_type: "unknown",
      difficulty: "unknown",
      knowledge_points: [],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
    };
    expect(question.question_index).toBe(1);
    expect(question.question_type).toBe("unknown");
  });
});

describe("Sub-type interfaces", () => {
  it("creates a full student_answer with all fields", () => {
    const answer: StudentAnswer = {
      text: "S = 2(25×22+25×26+22×26) = 3544cm²",
      latex: "S = 2(25 \\times 22 + 25 \\times 26 + 22 \\times 26) = 3544 \\text{cm}^2",
      confidence: 0.92,
      bbox: { x: 100, y: 200, width: 300, height: 50 },
    };
    expect(answer.text).toBeTruthy();
    expect(answer.confidence).toBeGreaterThanOrEqual(0);
    expect(answer.confidence).toBeLessThanOrEqual(1);
    expect(answer.bbox).toBeDefined();
    expect(answer.bbox!.x).toBe(100);
  });

  it("creates a student_answer with only text", () => {
    const answer: StudentAnswer = { text: "42" };
    expect(answer.text).toBe("42");
    expect(answer.latex).toBeUndefined();
    expect(answer.confidence).toBeUndefined();
  });

  it("creates a teacher_correction with mark and score", () => {
    const correction: TeacherCorrection = {
      mark: "✓",
      score: 5,
      max_score: 5,
      comment: "Correct!",
    };
    expect(correction.mark).toBe("✓");
    expect(correction.score).toBe(5);
    expect(correction.comment).toBe("Correct!");
  });

  it("creates a teacher_correction with null fields", () => {
    const correction: TeacherCorrection = {
      mark: null,
      score: null,
      max_score: null,
      comment: null,
    };
    expect(correction.mark).toBeNull();
    expect(correction.score).toBeNull();
  });

  it("creates a standard_answer with ocr source", () => {
    const answer: StandardAnswer = {
      text: "3544 cm²",
      latex: "3544 \\text{cm}^2",
      source: "llm",
    };
    expect(answer.source).toBe("llm");
  });

  it("creates a standard_answer with only required fields", () => {
    const answer: StandardAnswer = { text: "3544", source: "ocr" };
    expect(answer.text).toBe("3544");
    expect(answer.source).toBe("ocr");
  });

  it("creates solution_steps", () => {
    const steps: SolutionStep[] = [
      { step: 1, content: "Identify the dimensions: length $a=25$cm, width $b=22$cm, height $c=26$cm.", knowledge: "reading comprehension" },
      { step: 2, content: "Apply the surface area formula: $$S = 2(ab + ah + bh)$$", knowledge: "surface area formula" },
    ];
    expect(steps).toHaveLength(2);
    expect(steps[0].step).toBe(1);
    expect(steps[0].knowledge).toBeDefined();
  });

  it("creates error_analysis with all error types", () => {
    const types = ["审题失误", "计算失误", "知识点漏洞", "思维层级不足", "规范失分", "未知"] as const;
    for (const t of types) {
      const analysis: ErrorAnalysis = {
        cause: `Test cause for ${t}`,
        type: t as ErrorAnalysis["type"],
        suggestion: "Review the concept.",
      };
      expect(analysis.type).toBe(t);
    }
  });

  it("creates BBox with correct structure", () => {
    const bbox: BBox = { x: 0, y: 0, width: 100, height: 200 };
    expect(bbox.width).toBeGreaterThan(0);
    expect(bbox.height).toBeGreaterThan(0);
  });

  it("creates QuestionImage with optional fields", () => {
    const img: QuestionImage = {
      url: "https://example.com/image.png",
      caption: "Geometry diagram",
      width: 800,
      height: 600,
      block_id: 42,
    };
    expect(img.url).toBeTruthy();
    expect(img.block_id).toBe(42);
  });

  it("creates QuestionsMeta", () => {
    const meta: QuestionsMeta = {
      total: 12,
      correct_count: 8,
      wrong_count: 3,
      unmarked_count: 1,
      data_completeness: "full",
    };
    expect(meta.total).toBe(12);
    expect(meta.correct_count + meta.wrong_count + meta.unmarked_count).toBe(meta.total);
  });
});

describe("DataCompleteness type", () => {
  it("accepts all three values", () => {
    const values: DataCompleteness[] = ["full", "basic", "minimal"];
    expect(values).toHaveLength(3);
  });
});

describe("question_type union type", () => {
  it("accepts all valid question types", () => {
    const types: ExamQuestion["question_type"][] = [
      "calculation", "choice", "fill_blank", "solution", "proof", "geometry", "unknown",
    ];
    expect(types).toHaveLength(7);
  });
});

describe("difficulty union type", () => {
  it("accepts all valid difficulty levels", () => {
    const levels: ExamQuestion["difficulty"][] = ["easy", "medium", "hard", "unknown"];
    expect(levels).toHaveLength(4);
  });
});

describe("source union type", () => {
  it("accepts all valid source values", () => {
    const sources: ExamQuestion["source"][] = ["ocr", "llm", "manual"];
    expect(sources).toHaveLength(3);
  });
});

describe("FusionMeta type", () => {
  it("creates a valid FusionMeta with all fields", () => {
    const meta: FusionMeta = {
      source_per_field: { is_correct: "merged" },
      confidence_per_field: { is_correct: 0.95 },
      conflicts: [{ field: "score", detail: "PaddleOCR says 5, QwenVL says 3" }],
    };
    expect(meta.source_per_field.is_correct).toBe("merged");
    expect(meta.confidence_per_field.is_correct).toBe(0.95);
    expect(meta.conflicts).toHaveLength(1);
  });

  it("creates an empty FusionMeta", () => {
    const meta: FusionMeta = {
      source_per_field: {},
      confidence_per_field: {},
      conflicts: [],
    };
    expect(Object.keys(meta.source_per_field)).toHaveLength(0);
    expect(meta.conflicts).toHaveLength(0);
  });
});

describe("FusionConflict type", () => {
  it("creates a valid FusionConflict", () => {
    const conflict: FusionConflict = {
      field: "score",
      detail: "PaddleOCR says 5, QwenVL says 3",
    };
    expect(conflict.field).toBe("score");
    expect(conflict.detail).toBeTruthy();
  });
});

describe("fusion_meta on ExamQuestion", () => {
  it("is optional — ExamQuestion can be created without it", () => {
    const question: ExamQuestion = {
      question_index: 1,
      question_text: "Test",
      question_type: "calculation",
      difficulty: "easy",
      knowledge_points: [],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
    };
    expect(question.fusion_meta).toBeUndefined();
  });

  it("can be set when provided", () => {
    const question: ExamQuestion = {
      question_index: 1,
      question_text: "Test",
      question_type: "calculation",
      difficulty: "easy",
      knowledge_points: [],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
      fusion_meta: {
        source_per_field: { is_correct: "paddleocr" },
        confidence_per_field: { is_correct: 0.65 },
        conflicts: [],
      },
    };
    expect(question.fusion_meta).toBeDefined();
    expect(question.fusion_meta!.source_per_field.is_correct).toBe("paddleocr");
  });

  it("does not affect getDataCompleteness", () => {
    const qBase: ExamQuestion = {
      question_index: 1,
      question_text: "Test",
      question_type: "calculation",
      difficulty: "easy",
      knowledge_points: [],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
    };

    const qWithFusion = { ...qBase, fusion_meta: { source_per_field: {}, confidence_per_field: {}, conflicts: [] } };

    expect(getDataCompleteness(qBase)).toBe("basic");
    expect(getDataCompleteness(qWithFusion)).toBe("basic");
  });
});

describe("getDataCompleteness function", () => {
  it("returns 'full' when student_answer, teacher_correction, and error_analysis are present", () => {
    const q: ExamQuestion = {
      question_index: 1,
      question_text: "Test",
      question_type: "calculation",
      difficulty: "easy",
      knowledge_points: [],
      images: [],
      student_answer: { text: "answer" },
      teacher_correction: { mark: "✓", score: 5, max_score: 5, comment: null },
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: { cause: "mistake", type: "计算失误" },
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
    };
    expect(getDataCompleteness(q)).toBe("full");
  });

  it("returns 'basic' when question_type is not unknown even without full data", () => {
    const q: ExamQuestion = {
      question_index: 1,
      question_text: "Test",
      question_type: "calculation",
      difficulty: "easy",
      knowledge_points: [],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
    };
    expect(getDataCompleteness(q)).toBe("basic");
  });

  it("returns 'minimal' when only question_text and question_index exist", () => {
    const q: ExamQuestion = {
      question_index: 99,
      question_text: "???",
      question_type: "unknown",
      difficulty: "unknown",
      knowledge_points: [],
      images: [],
      student_answer: null,
      teacher_correction: null,
      standard_answer: null,
      student_correction: null,
      solution_steps: [],
      error_analysis: null,
      prerequisite_knowledge: [],
      common_mistakes: [],
      related_block_ids: [],
      block_bbox: null,
      source: "manual",
    };
    expect(getDataCompleteness(q)).toBe("minimal");
  });
});

// ── Helper function from data contracts (inline for test) ──
function getDataCompleteness(q: ExamQuestion): DataCompleteness {
  if (q.student_answer && q.teacher_correction && q.error_analysis) return "full";
  if (q.question_type !== "unknown") return "basic";
  return "minimal";
}
