# @math-ocr/ui

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
| Generic UI | MathButton, MathBadge, EmptyState |
| Status/Display | StatusBadge, MarkdownViewer, FormulaRenderer |
| Image/OCR | ImageUpload, ImagePreview, ImagePagination |
| Analysis | QuestionCard, QuestionList, AnalysisTabs |
| Pipeline | PipelineStageCard, BlockLegend, BlockOverlay |
| Layout | TopBar, AppLayout |

Also re-exports HeroUI components (Button, Card, Badge, ProgressBar, etc.).

## Design Tokens

Import the stylesheet to get design tokens (OKLCH-based light/dark themes):

```tsx
import "@mathwiz/ui-ocr/styles.css";
```

## License

MIT
