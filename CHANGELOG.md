# Changelog

## v0.2.0 (2026-05-20)

### New Components
- **MarkdownRenderer** — Atomic Markdown + KaTeX LaTeX renderer with sanitize/strip modes, error boundary, and fallback support
- **QuestionBody** — Question text display with Markdown rendering and embedded image thumbnails
- **AnswerComparePanel** — Side-by-side student answer vs standard answer comparison with confidence indicator
- **TeacherCommentPanel** — Teacher annotation display with MessageSquare icon
- **CorrectionPanel** — Student correction display with RotateCcw icon
- **SolutionStepsPanel** — Expandable solution steps list with max-height truncation and gradient mask
- **ErrorAnalysisPanel** — Expandable error analysis display with type badge and suggestion support
- **QuestionSummary** — Collapsed-state summary row with badge row and truncated text (for Accordion trigger)
- **ExpandToggle** — Reusable expand/collapse button with ChevronUp/Down icons and a11y support
- **QuestionBadges** — Atomic badge components: QuestionBadge, TypeBadge, DifficultyBadge, CorrectionBadge, ScoreDisplay, KnowledgeBadge, PrerequisiteBadge
- **QuestionCard** — Main card component composing all sub-panels with accordion/full/standalone modes
- **QuestionList** — List container with scroll/accordion browse modes, filtering (all/wrong/unmarked), loading/error/empty states
- **FilterBar** — Inline filter tabs with counts (embedded in QuestionList)

### Data Contracts
- Added `ExamQuestion`, `BBox`, `QuestionImage`, `StudentAnswer`, `TeacherCorrection`, `StandardAnswer`, `SolutionStep`, `ErrorAnalysis`, `QuestionsMeta`, `DataCompleteness` types
- Added `getDataCompleteness()` utility function
- Added `QuestionType` and `Difficulty` type aliases

### Changed
- Version bumped from 0.1.6 to 0.2.0
