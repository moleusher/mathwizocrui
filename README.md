---
name: "@mathwiz/ui-ocr"
version: 0.1.4
description: Math-OCR Component Library
status: alpha
tech:
  react: 19
  hero-ui: 3.0.5
  tailwindcss: 4
  storybook: 10
  typescript: 5.9
  vite: 8
repository: https://github.com/moleusher/mathwizocrui
---

# @mathwiz/ui-ocr

Math-OCR component library — React 19, HeroUI 3, Tailwind CSS 4, Storybook 10.

## Quick Start

```bash
npm install @mathwiz/ui-ocr
```

Peer dependencies: `react >=19`, `react-dom >=19`.

```tsx
import { MathButton, MathBadge, StatusBadge } from "@mathwiz/ui-ocr";
```

## Development

```bash
npm install          # Install dependencies
npm run dev          # Vite dev server
npm run storybook    # Storybook (port 6006)
npm run build        # tsc -b && vite build (output: dist/)
npm run test         # vitest run
npm run lint         # tsc --noEmit
```

## Components

| Category | Components |
|----------|-----------|
| Generic UI | MathButton, MathBadge, EmptyState, ~~CardActions~~ (deprecated) |
| Status/Display | StatusBadge, MarkdownViewer, FormulaRenderer |
| Image/OCR | ImageUpload, ImagePreview, ImagePagination |
| Analysis | QuestionCard, QuestionList, AnalysisTabs, IntentActions |
| Pipeline | PipelineStageCard, BlockLegend, BlockOverlay |
| Dashboard | ProjectCard (Dropdown: OCR解析/查看进度/重新上传/删除), ClassroomProgress |
| Layout | TopBar, AppLayout |

Also re-exports HeroUI components (Button, Card, Badge, ProgressBar, etc.).

## Design Tokens

Import the stylesheet to get design tokens (OKLCH-based light/dark themes):

```tsx
import "@mathwiz/ui-ocr/styles.css";
```

## Changelog

### 0.1.4 (2026-05-18)

- **ProjectCard**: Replace CardActions + actions slot with HeroUI Dropdown.
  - Dropdown items: OCR解析, 查看进度, 重新上传, 删除项目.
  - Context-aware — items show/hide based on `dashboardStatus`.
  - Icons via `@gravity-ui/icons` (EllipsisVertical, TrashBin).
- **CardActions** marked as `@deprecated` — use ProjectCard Dropdown instead.
- Install `@heroui/styles` for HeroUI v3 + Tailwind 4 CSS integration.
- Updated Storybook stories and tests for new Dropdown API.
- Bump version to 0.1.4.

### 0.1.2 (2026-05-17)

- Add 4 new components: ProjectCard, CardActions, IntentActions, ClassroomProgress.
- Fix `styles.css` missing from build output (copy plugin in vite.config.ts).
- Exclude test files from production bundle (tsconfig exclude patterns).
- Update version and README.

- Update package version and dependencies.
- Add CLAUDE.md for AI-assisted development.
- Add README metadata and changelog.

### 0.1.0 (2026-05-15)

- 17 custom components across 6 categories (Generic UI, Status/Display, Image/OCR, Analysis, Pipeline, Layout).
- Compound component pattern (EmptyState), data-slot/data-state attribute system.
- OKLCH design tokens with light/dark theme.
- Tailwind 4 CSS-first styling with `@utility` and CSS variable syntax.
- Storybook 10 with autodocs, a11y audit, theme switching.
- Vitest + jsdom + @testing-library/react test setup.
- Vite library mode (ESM) with `@tailwindcss/vite` plugin.
- E2E verification via Playwright (44 screenshots, 100% pass rate).

## License

MIT
