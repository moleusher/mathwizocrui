# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@math-ocr/ui` (`@mathwiz/ui-ocr` v0.1.4) — a standalone, reusable React 19 component library for the Math-OCR project. Built with HeroUI 3, Tailwind CSS 4, Storybook 10, TypeScript 5.9, Vite 8.

## Build & Test Commands

```bash
npm run dev              # Vite dev server
npm run build            # tsc -b + vite build (library mode → dist/)
npm run lint             # tsc --noEmit (type-check only)
npm run test             # vitest run
npm run test:watch       # vitest (watch mode)
npm run storybook        # Storybook dev server on port 6006
npm run build-storybook  # Storybook production build
npm run clean            # rm -rf dist
npm run preview          # vite preview
```

## Code Architecture

### Layout — 18 components in `src/components/`

| Category | Components |
|----------|-----------|
| Generic UI | MathButton (5 variants, 4 sizes, loading), MathBadge (5 variants, dot indicator), EmptyState (compound: Root/Icon/Title/Description/Action), ~~CardActions~~ (deprecated) |
| Status/Display | StatusBadge (6 pipeline states, pulse animation, compact mode), MarkdownViewer (zero-dep markdown→HTML), FormulaRenderer (LaTeX inline/block) |
| Image/OCR | ImageUpload (drag-drop/click/paste, preview, validation), ImagePreview (scroll-zoom 1x-3x, drag-pan), ImagePagination (smart ellipsis) |
| Analysis | QuestionCard (collapsible, score dimensions, progress bars), QuestionList, AnalysisTabs (horizontal/vertical, controlled/uncontrolled), IntentActions |
| Pipeline | PipelineStageCard (step indicator, progress bar, elapsed, dimmed), BlockLegend, BlockOverlay (percentage positioning, active highlight) |
| Dashboard | ProjectCard (HeroUI Dropdown: OCR解析/查看进度/重新上传/删除), ClassroomProgress (4-stage pipeline UI) |
| Layout | TopBar (left/center/right slots), AppLayout (sidebar + topbar + content, collapsible sidebar) |

### Component Patterns

- **Compound components** — `EmptyStateRoot` / `EmptyStateIcon` / `EmptyStateTitle` etc. for composable sub-elements.
- **data-slot / data-state** — Every component has `data-slot="..."` for CSS targeting (`[data-slot="question-card"]`). States via `data-status`, `data-variant`, `data-collapsed`.
- **forwardRef + displayName** — All components use `React.forwardRef` with explicit `displayName`.
- **Trailing `{...props}`** — User props always last to allow overrides.
- **Controlled/uncontrolled** — AnalysisTabs supports both `activeTab`/`onTabChange` and `defaultTab`.

### Exports — `src/index.ts`

Barrel file re-exports all 18 components + their Props types, plus selected HeroUI components (Button, Card, Badge, ProgressBar, etc.).

### Design Tokens — `src/tokens/globals.css`

Tailwind 4 `@import "tailwindcss"` + `@import "@heroui/styles"` + custom OKLCH color tokens (`--color-brand-50` through `-900`, `--color-primary`, `--color-surface`, radii, shadows). Light/dark themes via `.dark` class. Custom `@utility math-block`.

### Utility — `src/utils/cn.ts`

`cn()` function combining `clsx` + `tailwind-merge` for conditional class merging.

### Storybook — `.storybook/`

- Addons: docs (autodocs), a11y (axe-core), themes (light/dark)
- Stories in `stories/` — 16 story groups, 55 variants, all with `tags: ["autodocs"]`
- Preview imports `globals.css` for design tokens

### Testing — `vitest.config.ts`

- jsdom environment, globals enabled, `@testing-library/jest-dom` setup
- Tests match `src/**/*.{test,spec}.{ts,tsx}` (currently no tests exist)
- E2E scripts in project root use Playwright (e2e-*.cjs, screenshots in `e2e-screenshots/`)

### Config Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Library mode (ESM), tailwindcss + react plugins; externals: react, @heroui/react, @heroui/styles, @gravity-ui/icons |
| `tsconfig.json` | Strict, bundler resolution, ES2022, path alias `@/` → `./src/` |
| `vitest.config.ts` | jsdom + react plugin + path alias |
| `.storybook/main.ts` | Stories glob, addons, autodocs |
| `.storybook/preview.ts` | CSS import, backgrounds, a11y config |
