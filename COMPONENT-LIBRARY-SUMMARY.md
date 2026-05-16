---
# mathocrui — Math-OCR Component Library
# 项目总结文档
# ============================================================================

metadata:
  project: mathocrui
  package: "@math-ocr/ui"
  version: 0.1.0
  status: alpha
  created: 2026-05-15
  updated: 2026-05-16
  author: openclaw-agent
  repository: /home/admin/.openclaw/workspace/mathocrui

tech_stack:
  react: 19.2.6
  react-dom: 19.2.6
  hero-ui: "@heroui/react@3.0.5"
  tailwindcss: 4.2.2 (CSS-first, @tailwindcss/vite plugin)
  storybook: 10.4.0 (ESM-only)
  storybook_framework: "@storybook/react-vite@10.4.0"
  vite: 8.0.13
  typescript: 5.9.3
  vitest: 4.1.6
  zustand: 5.0.13 (math-ocr side)
  node: 22.22.2
  npm: 10.9.7
  package_manager: npm

storybook:
  port: 6006
  addons:
    - "@storybook/addon-docs@10.4.0"
    - "@storybook/addon-a11y@10.4.0"
    - "@storybook/addon-themes@10.4.0"
  features:
    - autodocs (tag-based)
    - accessibility audit (axe-core)
    - theme switching (light/dark)
    - interactive controls
  public_url: http://47.253.199.239:6006/

verification:
  typescript: "npx tsc --noEmit → 0 errors"
  storybook_build: "npx storybook build → success"
  storybook_dev: "HTTP 200 on port 6006"
  playwright: "44 screenshots, all 16 components verified"
  npm_audit: "0 vulnerabilities"

components_count: 16
stories_count: 16
story_variants_count: 55
playwright_screenshots: 44
total_component_loc: 1631

skills_used:
  primary:
    - name: building-components
      role: CDD methodology (data-slot, compound components, TypeScript types, a11y)
      location: "~/.openclaw/workspace/skills/building-components/"
      references_used: 15
  support:
    - name: frontend-developer
      role: React 19 patterns, Tailwind 4 CSS, Vite 8 configuration
    - name: impeccable
      role: "Available for post-build audit (not yet triggered)"
    - name: frontend-orchestrator
      role: "Pipeline adaptation needed — add 'import from library' path"

# ============================================================================
---

# mathocrui — Math-OCR 组件库总结

## 1. 项目定位

`mathocrui` 是 Math-OCR 项目的**独立、可复用组件库**，采用 Component-Driven Development (CDD) 方法论构建。组件按 `building-components` 技能定义的分类体系组织：**Component → Block → Template**。HeroUI 3 覆盖通用 UI（Button/Card/Modal/Table 等 60+），mathocrui 专注 Math-OCR 领域特有组件。

## 2. 设计原则

| 原则 | 实践 |
|------|------|
| **CDD 复合组件** | Root/Trigger/Content 模式 (EmptyState, PipelineStageCard) |
| **data-slot 标识** | 每个组件有 `data-slot` 属性，父组件可通过 `[&_[data-slot=xxx]]` 定位 |
| **data-state 状态** | 状态通过 `data-status`/`data-variant` 暴露，支持 Tailwind 选择器 |
| **TypeScript 安全** | 所有组件导出 Props 类型，扩展 `React.ComponentProps<"element">` |
| **无障碍优先** | 语义 HTML / ARIA 角色 / 键盘导航 / 焦点管理 |
| **设计令牌** | CSS 变量 `--color-*` / `--radius-*` / `--shadow-*`，OKLCH 色彩空间 |
| **尾随 props** | `{...props}` 始终最后展开，确保用户可覆盖默认值 |

## 3. 组件清单

### P0 — 预建（探索阶段）

| # | 组件 | 类型 | 行数 | 关键特性 |
|---|------|------|------|---------|
| 1 | MathButton | Component | 113 | 5 variants, 4 sizes, loading spinner, icon slots |
| 2 | MathBadge | Component | 53 | 5 variants, dot indicator, 2 sizes |
| 3 | FormulaRenderer | Component | 38 | Inline/block LaTeX, KaTeX-ready |

### P1 — 基础通用

| # | 组件 | 类型 | 行数 | 关键特性 |
|---|------|------|------|---------|
| 4 | EmptyState | Component | 127 | 5 种子组件 (Root/Icon/Title/Description/Action)，center/left 对齐 |
| 5 | StatusBadge | Component | 82 | 6 种 pipeline 状态，pulse 动画，compact 模式 |
| 6 | MarkdownViewer | Component | 128 | 标题/表格/公式/代码块/列表/引用，无依赖基础渲染器 |

### P2 — 图像/OCR

| # | 组件 | 类型 | 行数 | 关键特性 |
|---|------|------|------|---------|
| 7 | ImageUpload | Component | 137 | 拖放/点击/粘贴，preview，accept/maxSize 过滤，error 态 |
| 8 | ImagePreview | Component | 152 | 滚轮缩放 (1x-3x)，拖拽平移，loading/error 态 |
| 9 | ImagePagination | Component | 107 | 智能省略号，首/末/前/后页，页数显示 |

### P3 — 分析/结果展示

| # | 组件 | 类型 | 行数 | 关键特性 |
|---|------|------|------|---------|
| 10 | QuestionCard | Block | 148 | 折叠展开，得分维度进度条，状态徽章，操作按钮 |
| 11 | QuestionList | Block | 54 | 空状态集成 EmptyState，总数显示 |
| 12 | AnalysisTabs | Block | 113 | horizontal/vertical 布局，badge 计数，受控/非受控 |

### P4 — 流水线 UI

| # | 组件 | 类型 | 行数 | 关键特性 |
|---|------|------|------|---------|
| 13 | PipelineStageCard | Block | 108 | 步骤指示器，进度条，耗时，dimmed 态 |
| 14 | BlockLegend | Component | 40 | 水平/垂直布局，颜色圆点 |
| 15 | BlockOverlay | Component | 70 | 百分比定位，active 高亮，点击回调，标签 |

### P5 — 布局壳

| # | 组件 | 类型 | 行数 | 关键特性 |
|---|------|------|------|---------|
| 16 | TopBar | Component | 30 | 三栏布局 (left/center/right) |
| 17 | AppLayout | Template | 55 | sidebar + topbar + content，折叠动画 |

## 4. 目录结构

```
mathocrui/
├── package.json                 # @math-ocr/ui v0.1.0
├── tsconfig.json                # strict, bundler, ES2022
├── vite.config.ts               # library mode + @tailwindcss/vite
├── vitest.config.ts             # jsdom + globals
├── vitest-setup.ts              # @testing-library/jest-dom
│
├── .storybook/
│   ├── main.ts                  # addons: docs, a11y, themes
│   └── preview.ts               # globals.css + backgrounds + autodocs
│
├── src/
│   ├── index.ts                 # barrel export (all 16 components)
│   ├── components/
│   │   ├── MathButton.tsx
│   │   ├── MathBadge.tsx
│   │   ├── FormulaRenderer.tsx
│   │   ├── EmptyState.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── MarkdownViewer.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── ImagePreview.tsx
│   │   ├── ImagePagination.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionList.tsx
│   │   ├── AnalysisTabs.tsx
│   │   ├── PipelineStageCard.tsx
│   │   ├── BlockLegend.tsx
│   │   ├── BlockOverlay.tsx
│   │   ├── TopBar.tsx
│   │   └── AppLayout.tsx
│   ├── tokens/
│   │   └── globals.css          # Tailwind 4 @import + design tokens
│   └── utils/
│       └── cn.ts                # clsx + tailwind-merge
│
├── stories/                     # 16 组 Storybook stories
├── e2e-screenshots/             # 44 张 Playwright 截图
└── storybook-static/            # 生产构建产物
```

## 5. 组件设计模式

### 复合组件（Compound Component）
```tsx
<EmptyStateRoot>
  <EmptyStateIcon>...</EmptyStateIcon>
  <EmptyStateTitle>No results</EmptyStateTitle>
  <EmptyStateDescription>Try adjusting filters.</EmptyStateDescription>
  <EmptyStateAction>
    <MathButton>Retry</MathButton>
  </EmptyStateAction>
</EmptyStateRoot>
```

### data-slot 标识
```css
/* 父组件通过 data-slot 定位子组件 */
[data-slot="question-list"] [data-slot="question-card"] { ... }
```

### data-state 声明式状态
```css
/* Tailwind 4 选择器 */
data-[status=running]:border-(--color-primary)
data-[status=completed]:bg-emerald-50
```

### 受控/非受控双模式
```tsx
// 受控
<AnalysisTabs tabs={tabs} activeTab={active} onTabChange={setActive} />
// 非受控
<AnalysisTabs tabs={tabs} defaultTab="summary" />
```

## 6. 技能兼容性评估

### building-components ✅ 高度可用
15 个参考文件覆盖了 CDD 全流程。每个组件严格遵循：
- 复合组件模式 (`composition.mdx`)
- 单元素包裹 + HTML 属性扩展 (`types.mdx`)
- data-slot/data-state 声明式样式 (`data-attributes.mdx`)
- Controlled/Uncontrolled 双模式 (`state.mdx`)
- Tailwind 4 + CVA 样式系统 (`styling.mdx`)

### impeccable ⏳ 可用（待触发）
- `impeccable audit` — 逐组件 15 维度 UX 审计
- `impeccable polish` — 间距/对齐/色彩精修
- `impeccable animate` — 微交互（hover/transition）

### frontend-orchestrator ⚠️ 需要适配
当前 Phase 2 CDD 流程默认**在项目内构建组件**。需增加：
- **Phase 0: 组件库查找** — 查 mathocrui 是否已有匹配组件
- **Import path** — `import { QuestionCard } from '@math-ocr/ui'` 优先于内联实现

## 7. 已知问题 & 注意事项

### 7.1 Storybook 10.4 生态
- `@storybook/addon-essentials` 在 v9+ 已废弃（功能集成到核心 + story globals）
- `@storybook/test` 最高 8.6.x（测试功能集成到 `storybook` 核心的 `@vitest/spy` + `@vitest/expect`）
- 仅 docs / a11y / themes 三个独立 addon 有 10.4.0 版本

### 7.2 HeroUI 3 依赖
- `@heroui/react@3.0.5` 强依赖 React ≥19.0.0、Tailwind ≥4.0.0
- 架构基于 `react-aria-components`（非 framer-motion）
- 导出 `cn` 工具函数，与 mathocrui 的 `cn` 功能相同

### 7.3 Tailwind 4 CSS 处理
- 需要 `@tailwindcss/vite` 插件（Storybook 的 Vite 构建也依赖它）
- `@theme` 和 `@utility` 语法不被 lightningcss minify 识别（仅警告，不阻塞）
- CSS 变量引用语法：`bg-(--color-primary)` 而非 `bg-[var(--color-primary)]`

### 7.4 待迁移的 math-ocr 组件
| math-ocr 组件 | mathocrui 对应 | 说明 |
|--------------|---------------|------|
| `ui/Button.tsx` | `MathButton` | 已增强（loading, icon slots） |
| `ui/Badge.tsx` | `MathBadge` | 已增强（dot, 5 variants） |
| `ui/Card.tsx` | HeroUI Card | 直接用 HeroUI |
| `ui/ProgressBar.tsx` | HeroUI ProgressBar | 直接用 HeroUI |
| `FormulaRenderer.tsx` | `FormulaRenderer` | 已迁移 |
| `EmptyState.tsx` | `EmptyState` | 已升级为复合组件 |
| `StatusBadge.tsx` | `StatusBadge` | 已升级（6 状态 + pulse） |
| Markdown 相关 | `MarkdownViewer` | 新增基础渲染器 |
| 图像相关 | `ImageUpload/Preview/Pagination` | 新增全套 |
| 分析相关 | `QuestionCard/List/AnalysisTabs` | 新增全套 |
| 流水线 UI | `PipelineStageCard/Legend/Overlay` | 新增全套 |
| 布局 | `TopBar/AppLayout` | 新增 |

### 7.5 npm workspaces 联动
math-ocr/frontend 引用 mathocrui 需要：
```json
// math-ocr/frontend/package.json
{ "dependencies": { "@math-ocr/ui": "file:../mathocrui" } }
```
或根目录 workspaces 配置。

## 8. 度量

```json
{
  "project": "mathocrui",
  "version": "0.1.0",
  "components": {
    "total": 16,
    "compound": 2,
    "blocks": 5,
    "templates": 1,
    "standard": 8
  },
  "stories": {
    "total_groups": 16,
    "total_variants": 55,
    "autodocs_enabled": true
  },
  "quality": {
    "typescript_errors": 0,
    "npm_audit_vulnerabilities": 0,
    "playwright_screenshots": 44,
    "playwright_pass_rate": "100%"
  },
  "performance": {
    "storybook_dev_startup": "658ms manager + 218ms preview",
    "storybook_build_time": "2.96s"
  }
}
```

## 9. 下一步

1. **`impeccable audit`** — 对 16 组件运行无障碍/UX 审计
2. **npm workspaces** — 建立 math-ocr/frontend → mathocrui 引用
3. **迁移 math-ocr** — 替换 `ui/Button` → `MathButton`，`ui/Badge` → `MathBadge` 等
4. **升级 math-ocr 技术栈** — React 18→19, Tailwind 3→4, Vite 5→8
5. **frontend-orchestrator 适配** — 增加 Phase 0 组件库查找/引入路径
6. **@math-ocr/ui 发布** — npm publish 或 private registry
