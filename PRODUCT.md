# Product

## Register

product

## Users

Developers building math-OCR applications who need reusable, theme-consistent UI components for OCR pipeline visualization, image upload/preview, analysis dashboards, and status feedback. They integrate this library into React 19 apps with HeroUI 3 and Tailwind CSS 4.

## Product Purpose

Provide a standalone, reusable component library (`@mathwiz/ui-ocr`) that encapsulates Math-OCR's UI patterns — upload → preview → pipeline status → analysis → results — with consistent design tokens, accessibility, and developer-friendly APIs. The library exists so that any math-OCR frontend can share the same UX vocabulary without duplicating code.

## Brand Personality

Light · Clean · Purple-accented — 浅色与暗色双主题平级设计，紫色主色调 (`--color-brand-500`) 作为视觉锚点，整体风格干净、精确、工具感强。组件库给人的感觉是一套精良的工具：清晰、可预测、不喧宾夺主。

## Anti-references

- Avoid decorative excess: no gradient text, glassmorphism, bounce animations, or ornamental flourishes
- Avoid enterprise heaviness: no oversized headers, dense data-table-only layouts, or generic card-grid monotony
- The library should feel purpose-built for a technical workflow, not a multipurpose design system

## Design Principles

1. **Tool, not decoration** — every component serves a specific workflow step (upload, preview, pipeline, analysis). If it doesn't make the user's job easier, it doesn't belong.
2. **Dual-theme, equal priority** — light 和 dark 主题无主次之分，用户通过 `.dark` class 切换。品牌视觉 identity 在 light 中定义，dark 保证同等对比度和体验一致性。
3. **Theme consistency through tokens** — OKLCH variables with semantic roles (`--color-primary`, `--color-success`, `--color-error`) ensure light/dark themes stay coherent without per-component overrides.
4. **Developer experience first** — TypeScript-strict, forwardRef + displayName on every component, controlled/uncontrolled dual-mode where appropriate, minimal required props.
5. **Accessibility built-in, not bolted on** — keyboard navigation, screen-reader attributes (`aria-label`, `aria-selected`, `role`), reduced-motion support, WCAG 2.1 AA contrast ratios.
6. **Predictable API surface** — consistent prop naming across components, `data-slot` attribute targeting, trailing `{...props}` for overrides, no surprising side effects.

## Accessibility & Inclusion

WCAG 2.1 AA. Keyboard-navigable interactive elements (buttons, dropdowns, tabs). aria-label on icon-only controls. Reduced motion via `prefers-reduced-motion`. Sufficient contrast in both light and dark themes. 双主题均通过 AA 对比度要求。
