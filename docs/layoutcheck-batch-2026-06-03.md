# LayoutCheck Audit — 2026-06-03

## Summary

| Status | Count |
|--------|-------|
| ✅ Pass | 64 |
| ⚠️ Warn | 18 |
| ❌ Fail | 0 |
| ⬜ N/A | 71 |
| **Total** | **153** |

## Failures

_No failures._

## Warnings

- **[LB-025] CorrectionPanel — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5, etc.) instead of CSS custom property tokens (--space-*). While Tailwind classes follow a consistent 4px scale, the project defines semantic spacing tokens (--space-gutter:16px, --space-stack:12px, etc.) that are not directly referenced. Potential magic px values: marginRight=0.538208px, marginRight=0.486517px, marginRight=0.968968px, marginRight=4.30179px, marginRight=0.695024px, marginRight=1.11514px.
- **[LB-025] CorrectionPanel — LC-3**: Component (CorrectionPanel) has no explicit empty/null state story and no empty-state fallback detected in source. Consider adding empty state handling for missing/invalid props.
- **[LB-026] ErrorAnalysisPanel — LS-3**: 117 interactive element(s) below 44×44px threshold: "Set string"(0×0px @desktop), "Set string"(0×0px @desktop), "Set string"(0×0px @desktop), "Decorators documentation"(0×0px @desktop), "Webpack"(0×0px @desktop). Consider increasing touch target size for mobile usability.
- **[LB-026] ErrorAnalysisPanel — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5, etc.) instead of CSS custom property tokens (--space-*). While Tailwind classes follow a consistent 4px scale, the project defines semantic spacing tokens (--space-gutter:16px, --space-stack:12px, etc.) that are not directly referenced. Potential magic px values: marginLeft=1722px, marginLeft=570px, marginLeft=177px, marginLeft=1710px, marginLeft=558px, marginLeft=165px, paddingLeft=18px.
- **[LB-027] ExpandToggle — LS-3**: 72 interactive element(s) below 44×44px threshold: "Set string"(0×0px @desktop), "Set string"(0×0px @desktop), "Set string"(0×0px @desktop), "Decorators documentation"(0×0px @desktop), "Webpack"(0×0px @desktop). Consider increasing touch target size for mobile usability.
- **[LB-027] ExpandToggle — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5) rather than the project's CSS custom property tokens (--space-gutter, --space-stack, --space-inset-*). While Tailwind enforces a consistent 4px scale grid, this diverges from the decisions-layer spacing API.
- **[LB-027] ExpandToggle — LC-3**: Component (ExpandToggle) has no explicit empty/null state story and no empty-state fallback detected in source. Consider adding empty state handling for missing/invalid props.
- **[LB-028] FilterBar — LS-3**: 90 interactive element(s) below 44×44px threshold: "Set string"(0×0px @desktop), "Set string"(0×0px @desktop), "Set string"(0×0px @desktop), "Decorators documentation"(0×0px @desktop), "Webpack"(0×0px @desktop). Consider increasing touch target size for mobile usability.
- **[LB-028] FilterBar — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5) rather than the project's CSS custom property tokens (--space-gutter, --space-stack, --space-inset-*). While Tailwind enforces a consistent 4px scale grid, this diverges from the decisions-layer spacing API.
- **[LB-028] FilterBar — LC-3**: Component (FilterBar) has no explicit empty/null state story and no empty-state fallback detected in source. Consider adding empty state handling for missing/invalid props.
- **[LB-029] MarkdownRenderer — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5, etc.) instead of CSS custom property tokens (--space-*). While Tailwind classes follow a consistent 4px scale, the project defines semantic spacing tokens (--space-gutter:16px, --space-stack:12px, etc.) that are not directly referenced. Potential magic px values: marginRight=1.11514px.
- **[LB-030] QuestionBadges — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5, etc.) instead of CSS custom property tokens (--space-*). While Tailwind classes follow a consistent 4px scale, the project defines semantic spacing tokens (--space-gutter:16px, --space-stack:12px, etc.) that are not directly referenced. Potential magic px values: borderRadius=3.35544e+07px.
- **[LB-030] QuestionBadges — LC-3**: Component (QuestionBadges) has no explicit empty/null state story and no empty-state fallback detected in source. Consider adding empty state handling for missing/invalid props.
- **[LB-031] QuestionBody — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5, etc.) instead of CSS custom property tokens (--space-*). While Tailwind classes follow a consistent 4px scale, the project defines semantic spacing tokens (--space-gutter:16px, --space-stack:12px, etc.) that are not directly referenced. Potential magic px values: marginRight=2.08314px, marginRight=0.695024px, marginLeft=5.37778px, paddingLeft=16.1269px.
- **[LB-031] QuestionBody — LC-3**: Component (QuestionBody) has no explicit empty/null state story and no empty-state fallback detected in source. Consider adding empty state handling for missing/invalid props.
- **[LB-032] QuestionSummary — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5, etc.) instead of CSS custom property tokens (--space-*). While Tailwind classes follow a consistent 4px scale, the project defines semantic spacing tokens (--space-gutter:16px, --space-stack:12px, etc.) that are not directly referenced. Potential magic px values: borderRadius=3.35544e+07px.
- **[LB-033] TeacherCommentPanel — LS-5**: Component uses Tailwind spacing classes (p-2.5, p-3, gap-1.5) rather than the project's CSS custom property tokens (--space-gutter, --space-stack, --space-inset-*). While Tailwind enforces a consistent 4px scale grid, this diverges from the decisions-layer spacing API.
- **[LB-033] TeacherCommentPanel — LC-3**: Component (TeacherCommentPanel) has no explicit empty/null state story and no empty-state fallback detected in source. Consider adding empty state handling for missing/invalid props.

## Per-Component Detail

### LB-025: CorrectionPanel

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⬜ N/A |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ⚠️ Warn |
| LC-4 | ✅ Pass |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 7 Warn: 2 Fail: 0 N/A: 8_

### LB-026: ErrorAnalysisPanel

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ✅ Pass |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⚠️ Warn |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ✅ Pass |
| LC-4 | ⬜ N/A |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 8 Warn: 2 Fail: 0 N/A: 7_

### LB-027: ExpandToggle

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⚠️ Warn |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ⚠️ Warn |
| LC-4 | ⬜ N/A |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 6 Warn: 3 Fail: 0 N/A: 8_

### LB-028: FilterBar

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⚠️ Warn |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ⚠️ Warn |
| LC-4 | ⬜ N/A |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 6 Warn: 3 Fail: 0 N/A: 8_

### LB-029: MarkdownRenderer

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⬜ N/A |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ✅ Pass |
| LC-4 | ✅ Pass |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 8 Warn: 1 Fail: 0 N/A: 8_

### LB-030: QuestionBadges

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⬜ N/A |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ⚠️ Warn |
| LC-4 | ⬜ N/A |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 6 Warn: 2 Fail: 0 N/A: 9_

### LB-031: QuestionBody

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⬜ N/A |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ✅ Pass |
| LC-3 | ⚠️ Warn |
| LC-4 | ✅ Pass |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 8 Warn: 2 Fail: 0 N/A: 7_

### LB-032: QuestionSummary

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⬜ N/A |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ✅ Pass |
| LC-3 | ✅ Pass |
| LC-4 | ✅ Pass |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 9 Warn: 1 Fail: 0 N/A: 7_

### LB-033: TeacherCommentPanel

| Rule | Status |
|------|--------|
| LH-1 | ⬜ N/A |
| LH-2 | ⬜ N/A |
| LH-3 | ⬜ N/A |
| LH-4 | ⬜ N/A |
| LS-1 | ✅ Pass |
| LS-2 | ✅ Pass |
| LS-3 | ⬜ N/A |
| LS-4 | ✅ Pass |
| LS-5 | ⚠️ Warn |
| LC-1 | ✅ Pass |
| LC-2 | ⬜ N/A |
| LC-3 | ⚠️ Warn |
| LC-4 | ⬜ N/A |
| LR-1 | ✅ Pass |
| LR-2 | ⬜ N/A |
| LR-3 | ⬜ N/A |
| LR-4 | ✅ Pass |

_Pass: 6 Warn: 2 Fail: 0 N/A: 9_

