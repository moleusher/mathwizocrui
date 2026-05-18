---
name: "@mathwiz/ui-ocr"
description: Math-OCR component library — React 19, HeroUI 3, Tailwind CSS 4
colors:
  brand-50: "oklch(0.97 0.01 250)"
  brand-100: "oklch(0.93 0.02 250)"
  brand-200: "oklch(0.85 0.05 250)"
  brand-300: "oklch(0.75 0.08 250)"
  brand-400: "oklch(0.65 0.12 250)"
  brand-500: "oklch(0.55 0.16 250)"
  brand-600: "oklch(0.45 0.14 250)"
  brand-700: "oklch(0.35 0.11 250)"
  brand-800: "oklch(0.25 0.08 250)"
  brand-900: "oklch(0.18 0.05 250)"
  surface: "oklch(0.99 0.001 250)"
  surface-raised: "#fff"
  border: "oklch(0.88 0.01 250)"
  text: "oklch(0.15 0.01 250)"
  text-muted: "oklch(0.45 0.01 250)"
  success: "oklch(0.55 0.18 145)"
  success-bg: "oklch(0.95 0.05 145)"
  info: "oklch(0.6 0.12 250)"
  info-bg: "oklch(0.93 0.04 250)"
  warning: "oklch(0.65 0.18 75)"
  warning-bg: "oklch(0.95 0.05 75)"
  error: "oklch(0.55 0.2 25)"
  error-bg: "oklch(0.95 0.05 25)"
  dark-surface: "oklch(0.13 0.01 250)"
  dark-surface-raised: "oklch(0.18 0.01 250)"
  dark-border: "oklch(0.25 0.01 250)"
  dark-text: "oklch(0.92 0.005 250)"
  dark-text-muted: "oklch(0.6 0.01 250)"
  dark-success: "oklch(0.65 0.18 145)"
  dark-info: "oklch(0.65 0.12 250)"
  dark-info-bg: "oklch(0.2 0.04 250)"
  dark-warning: "oklch(0.7 0.18 75)"
  dark-error: "oklch(0.65 0.2 25)"
typography:
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
  mono:
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
    fontSize: "0.75rem"
    fontWeight: 600
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
shadows:
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)"
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.07)"
  lg: "0 10px 25px -3px rgba(0, 0, 0, 0.08)"
components:
  button-primary:
    backgroundColor: "{colors.brand-500}"
    textColor: "#fff"
    rounded: "{rounded.md}"
    padding: "4px 16px"
  button-secondary:
    backgroundColor: "{colors.brand-100}"
    textColor: "{colors.brand-700}"
    rounded: "{rounded.md}"
    padding: "4px 16px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "var(--color-text)"
    rounded: "{rounded.md}"
    padding: "4px 16px"
    border: "1px solid var(--color-border)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "var(--color-text)"
    rounded: "{rounded.md}"
    padding: "4px 16px"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "#fff"
    rounded: "{rounded.md}"
    padding: "4px 16px"
  card-default:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "12px"
    border: "1px solid var(--color-border)"
  status-badge:
    rounded: "{rounded.full}"
---

# Design System: @mathwiz/ui-ocr

## 1. Overview

**Creative North Star: "The Purple Academy"**

Inspired by IXL Learning's clean, educational aesthetic, this system combines the approachability of a well-organized classroom with the precision of a laboratory instrument. Light surfaces with purple anchors create a environment that feels both scholarly and inviting — like a math workbook that's been thoughtfully designed by someone who genuinely cares about the experience.

The system explicitly rejects decorative excess (gradient text, glassmorphism, bounce animations) and enterprise heaviness (oversized headers, monotonous card grids, dense data-table-only layouts). Every component serves a pedagogical workflow: upload, preview, process, analyze. Nothing is ornamental.

**Key Characteristics:**
- Clean, light-dominant surfaces with purple as the single accent voice
- Educational approachability (IXL-inspired) meets technical precision
- Flat-by-default elevation with subtle hover lift
- Rounded but not cuddly — radii are measured (6px–12px), not pill-shaped
- Dual-theme: light and dark are equal citizens, switched via `.dark` class
- OKLCH color system for perceptual uniformity across themes

## 2. Colors

Light theme tinted neutrals (chroma ≤ 0.01) with a single purple accent. Dark theme inverts the luminance ladder while preserving the same purple anchor and semantic colors at adjusted chroma.

### Primary
- **紫藤 (Wisteria)** — brand-500 (oklch(0.55 0.16 250)): The voice. Used for primary buttons, active/focus indicators, progress fills, interactive hover borders. A restrained purple with measurable chroma — present, not loud.
  - 50–900 scale for backgrounds (100), hover states (200), text (700), and deep accents (900).

### Neutral
- **Surface** (oklch(0.99 0.001 250)): Card and page backgrounds in light theme.
- **Surface Raised** (#fff): Modals, dropdowns, elevated panels.
- **Border** (oklch(0.88 0.01 250)): Dividers, card outlines, input strokes.
- **Text** (oklch(0.15 0.01 250)): Body copy and headings.
- **Text Muted** (oklch(0.45 0.01 250)): Secondary information, hints, placeholders.

### Semantic
- **翠绿 (Jade)** (color-success): Complete states, positive feedback, progress completion.
- **青蓝 (Azure)** (color-info): Running states, uploading indicators, informational badges.
- **琥珀 (Amber)** (color-warning): Partial scores, warnings, cautionary states.
- **朱红 (Vermilion)** (color-error): Errors, failures, destructive actions.
- Each semantic color has a matching `-bg` variant (chroma 0.05, lightness ~95%) for tinted backgrounds.

### Dark Theme
All neutral values shift down the luminance ladder:
- Surface → oklch(0.13 0.01 250), Surface Raised → oklch(0.18 0.01 250)
- Border → oklch(0.25 0.01 250), Text → oklch(0.92 0.005 250)
- Purple primary stays at brand-400 for adequate contrast on dark backgrounds
- Semantic colors maintain hue, increase lightness slightly

**The Single Accent Rule.** Purple is the only accent color. Success/warning/error/info are semantic signals, not decorative accents. Do not introduce a second accent color — the system's restraint is its identity.

## 3. Typography

**Body Font:** Inter (with -apple-system, BlinkMacSystemFont fallback)
**Mono Font:** JetBrains Mono (with Fira Code fallback)

Inter provides the clean, highly legible sans that educational tools need — open counters, generous x-height, and a neutral but warm character. JetBrains Mono handles scores, code, and data values where precise alignment matters.

### Hierarchy
- **Title** (Semi-bold 600, 15px/0.9375rem, 1.4): Card headings, section titles. One level above body, used sparingly.
- **Body** (Regular 400, 14px/0.875rem, 1.5): All primary reading content. Comfortable line height for scanability.
- **Label** (Medium 500, 12px/0.75rem, 1.4): Button text, status badges, table headers, small UI labels.
- **Mono** (Semi-bold 600, 12px/0.75rem): Score fractions (12/15), progress percentages, code values.

No display or headline level is defined. The component library does not serve hero sections or marketing pages. If a consumer needs larger type, they use their own heading system.

**The No-Headroom Rule.** This system does not define display or hero typography. The largest size is 15px/600 for titles. This enforces the tool-kit character: every component stays at UI scale, never competing with the consuming application's own hierarchy.

## 4. Elevation

Flat by default. Surfaces sit on the page without shadow at rest. Depth is communicated through tonal stacking (surface → surface-raised → modal backdrop) rather than through shadow proliferation.

### Shadow Vocabulary
- **Hover lift** (box-shadow: 0 1px 2px rgba(0,0,0,0.05)): Interactive cards on hover — barely perceptible, just enough to signal affordance.
- **Modal/Container** (box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07)): Dropdown menus, popovers, floating panels.
- **Emphasis** (box-shadow: 0 10px 25px -3px rgba(0,0,0,0.08)): Dialog modals, notification toasts.

Shadows darken in dark theme (multiply alpha by ~3x) to remain visible against dark surfaces.

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to interaction state (hover, open, focus). If you can't see the shadow without looking for it, it's right.

## 5. Components

### Buttons (`MathButton`)
- **Shape:** Gently rounded corners (rounded-md = 8px for sm/md, rounded-lg = 12px for lg).
- **Five variants:** Primary (purple fill), Secondary (purple tinted), Outline (stroked, transparent), Ghost (no stroke or fill), Destructive (red fill).
- **States:** Hover → brightness/opacity shift (90% for primary, tinted bg for secondary). Active → further compression (75% brightness or tinted bg transition). Focus-visible → 2px purple outline offset. Disabled → pointer-events-none + 50% opacity.
- **Loading:** Inline spinner replaces left icon slot. Button stays sized.
- **Sizes:** sm (32px), md (36px), lg (44px), icon (36px square). Gap scales with size.

### ProjectCard
- **Shape:** Rounded corners (rounded-lg = 12px), light border (1px solid border), surface background.
- **Layout:** Horizontal flex row: thumbnail (48×64) → metadata (title, subject·grade·questions) → status badge + progress bar + dropdown.
- **Interactive:** Clickable card with `role="button"` and keyboard support (Enter/Space). Hover lifts card (shadow-sm → shadow-md) and tints border to purple.
- **Dropdown:** HeroUI Dropdown with EllipsisVertical trigger. Items rendered on-demand based on callback presence. Delete item uses variant="danger" with TrashBin icon.
- **Progress bar:** 96px wide, 4px height, purple fill with 500ms transition.

### EmptyState
- **Composition:** Compound pattern — Root (flex-col, centered or left-aligned), Icon (56px purple tinted circle), Title (15px semibold), Description (14px muted), Action (button slot).
- **Usage:** Empty list states, no-results, initial landing without data.
- **Alignment:** Center (default) or left — center for full-page empties, left for inline empties within containers.

### ImageUpload
- **Shape:** Dashed 2px border, rounded-lg (12px), padded (32px).
- **States:** Default → dashed border + upload icon. Dragging → purple border + tinted background. Error → red border + red tinted bg + red error text. Has-files → preview mode replaces dropzone.
- **Multi-file:** Pagination via ImagePagination component, per-file removal with Xmark icon, "add more" section below.
- **Validation:** File size cap (50MB default), type filter (image/*,.pdf), silently skips oversized files.

### StatusBadge
- **Shape:** Pill (rounded-full), compact (12px) or standard (22px height).
- **Six states:** pending (muted), queued (bordered), running (purple + pulse), completed (green), failed (red), uploading (purple + animated dots).
- **Compact mode:** Dot-only indicator — smaller footprint for inline use.

### PipelineStageCard
- **Shape:** Rounded-lg (12px), border, flex row with step indicator (28px circle).
- **States:** Active → purple border + tint + shadow. Complete → green step indicator. Failed → red indicator. Pending/queued → muted or bordered.
- **Progress:** Optional 6px height bar, shown only when active (running). 0–100% with 500ms transition.
- **Elapsed:** Clock icon + time string, shown when provided.

### QuestionCard
- **Shape:** Rounded-lg, border, surface bg. Collapsible.
- **Header:** Numbered purple circle (28px), text (line-clamp-2), score/total (color-coded: green=full, amber=partial, red=zero), StatusBadge, chevron expand indicator.
- **Expanded panel:** Score dimensions with labeled progress bars, children slot, actions slot.
- **Scoring bar:** 6px height, color by result (green = full score, purple = partial, red = zero).

## 6. Do's and Don'ts

### Do:
- **Do** use purple as the single accent voice. It appears on primary buttons, active indicators, focus outlines, and progress fills — nowhere else.
- **Do** keep surfaces flat at rest. Use shadows sparingly and only for interactive feedback or elevation hierarchy.
- **Do** use semantic colors strictly for their meaning: Jade = success, Amber = warning, Vermilion = error. Never use them decoratively.
- **Do** use OKLCH for all color definitions — it ensures perceptual consistency between light and dark themes.
- **Do** make all interactive elements keyboard-accessible and screen-reader friendly (type="button", aria-label, role attributes).
- **Do** use the mono font for scores and data values to ensure precise alignment in tables and progress displays.
- **Do** respect reduced-motion preferences by keeping transitions brief (150–250ms) or suppressing animation entirely.

### Don't:
- **Don't** introduce a second accent color. The system's restraint is its identity.
- **Don't** use gradient text, glassmorphism, bounce animations, or ornamental flourishes.
- **Don't** use enterprise-heavy patterns: oversized headers, dense data-table-only layouts, identical card grids.
- **Don't** use side-stripe borders (border-left/right > 1px as accent). Use full borders, background tints, or icons instead.
- **Don't** use em dashes. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** use inline `#000` or `#fff`. Tint all neutrals toward the brand hue with low chroma.
- **Don't** define display/hero typography — this is a UI toolkit, not a marketing design system.
- **Don't** nest cards. Cards are already the boundary element; nesting them is always wrong.
