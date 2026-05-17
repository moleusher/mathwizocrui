# COMPONENT-SOURCE-MAP.md — v0.10.0 前端实施

> 生成时间: 2026-05-17 | 来源: Phase 0 Component Discovery

## 组件来源映射

| 组件 | 来源 | 动作 | 说明 |
|------|------|:--:|------|
| Card | @mathwiz/ui-ocr (HeroUI re-export) | import | 从 @mathwiz/ui-ocr 统一导入 |
| MathButton / Button | @mathwiz/ui-ocr (MathButton + HeroUI re-export) | import | 主按钮用 MathButton |
| ProgressBar | @mathwiz/ui-ocr (HeroUI re-export) | import | 进度条 |
| Badge | @mathwiz/ui-ocr (HeroUI re-export) | import | 基础 Badge |
| Spinner | @mathwiz/ui-ocr (HeroUI re-export) | import | 加载指示器 |
| StatusBadge | @mathwiz/ui-ocr (StatusBadge) | **extend** | 扩展 PipelineStatus + --color-* 变量 |
| MathBadge | @mathwiz/ui-ocr (MathBadge) | **extend** | 硬编码颜色 → --color-* 变量 |
| PipelineStageCard | @mathwiz/ui-ocr (PipelineStageCard) | import | 替代业务代码 StageCard |
| ImageUpload | @mathwiz/ui-ocr (ImageUpload) | import | 图片上传 |
| ImagePreview | @mathwiz/ui-ocr (ImagePreview) | import | 图片预览 |
| ImagePagination | @mathwiz/ui-ocr (ImagePagination) | import | 多页翻页 |
| EmptyState | @mathwiz/ui-ocr (EmptyState*) | import | 空状态 |
| MarkdownViewer | @mathwiz/ui-ocr (MarkdownViewer) | import | Markdown 渲染 |
| QuestionCard / QuestionList | @mathwiz/ui-ocr (QuestionCard/List) | import | 题目卡片/列表 |
| AnalysisTabs | @mathwiz/ui-ocr (AnalysisTabs) | import | 分析记录 Tab |
| BlockLegend | @mathwiz/ui-ocr (BlockLegend) | import | 块类型图例 |
| BlockOverlay | @mathwiz/ui-ocr (BlockOverlay) | import | OCR 覆盖层 |
| FormulaRenderer | @mathwiz/ui-ocr (FormulaRenderer) | import | 公式渲染 |
| TopBar | @mathwiz/ui-ocr (TopBar) | import | 顶栏 |
| AppLayout | @mathwiz/ui-ocr (AppLayout) | import | 应用布局 |
| Tabs | @heroui/react | import | @mathwiz/ui-ocr 未覆盖 |
| Breadcrumbs | @heroui/react | import | @mathwiz/ui-ocr 未覆盖 |
| Modal / Popover | @heroui/react | import | @mathwiz/ui-ocr 未覆盖 |
| **ProjectCard** | — | 🆕 NEW | 试卷卡片 (含缩略图+状态+进度+CTA) |
| **CardActions** | — | 🆕 NEW | 卡片右侧 CTA 操作区 |
| **IntentActions** | — | 🆕 NEW | 意图分析入口按钮组 |
| **ClassroomProgress** | — | 🆕 NEW | 课堂生成 5 阶段进度 |
| ~~ui/Card~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr Card 替代 |
| ~~ui/Button~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr MathButton 替代 |
| ~~ui/ProgressBar~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr ProgressBar 替代 |
| ~~ui/Badge~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr MathBadge 替代 |
| ~~StatusBadge (业务代码)~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr StatusBadge 替代 |
| ~~MarkdownViewer (业务代码)~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr MarkdownViewer 替代 |
| ~~ImageUpload (业务代码)~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr ImageUpload 替代 |
| ~~EmptyState (业务代码)~~ | — | ❌ REMOVE | 被 @mathwiz/ui-ocr EmptyState 替代 |
| Toast | — | ⚠️ PENDING | @mathwiz/ui-ocr 未覆盖，暂用自定义/异步同步 |

## 复用指标

- **复用 (import)**: 18 个组件 (从 @mathwiz/ui-ocr)
- **扩展 (extend)**: 2 个组件 (StatusBadge, MathBadge)
- **新建 (NEW)**: 4 个组件 (ProjectCard, CardActions, IntentActions, ClassroomProgress)
- **废弃 (REMOVE)**: 9 个组件/文件
- **待定 (PENDING)**: 1 个 (Toast)

**组件复用率**: 18/24 = **75%**
