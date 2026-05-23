# LSP Code Quality Check Workflow for React + TypeScript

> 基于 Claude Code LSP 工具的 React.js + TypeScript 代码库自动检查工作流。

## 概述

利用 Claude Code 内置的 LSP 工具和插件系统，对 React + TypeScript 项目进行三大维度的代码质量检查：

| 维度 | 工具 | 覆盖范围 |
|------|------|----------|
| 类型检查 | TypeScript LSP (`goToDefinition`, `documentSymbol`, `hover`) | 未使用变量、缺失属性、错误调用签名 |
| 代码规范 | ESLint (via `typescript-eslint strictTypeChecked`) | 风格不一致、潜在逻辑错误、最佳实践违规 |
| 格式统一 | Prettier | 缩进、分号、尾随逗号、行宽 |

---

## 完整执行过程

### 阶段一：TypeScript 类型检查（LSP）

**目标：** 发现未使用变量、缺失属性、错误函数调用签名等类型问题。

**命令：**

```bash
# 全局类型检查
npx tsc --noEmit

# LSP 检查单个文件结构
# 使用 Claude Code LSP 工具 → documentSymbol 查看文件符号
# 使用 LSP hover 检查类型推断
# 使用 LSP goToDefinition 追踪类型定义
```

**发现的问题类型：**
- 未使用变量（如 `QuestionCard` 的 `isExpanded`、`QuestionList` 的 `onActiveChange`）
- 多余的非空断言（`teacher_correction!.comment!` → 改为可选链 `?.`）
- `!= null` 判断（保留，因 `eqeqeq: { null: "ignore" }` 允许）
- `as any` 类型断言（改为精确联合类型 `React.Ref<HTMLSpanElement> & React.Ref<HTMLDivElement>`）
- 冗余的 null 守卫（`if (analysis == null) return null` 在类型已保证非 null 时删除）

**修复原则：**
- 真正需要用的变量恢复使用，不需要的彻底删除（不留注释）
- 类型缩窄用可选链代替非空断言
- 遵循 TypeScript strict 模式

### 阶段二：ESLint 代码规范检查

**目标：** 修复代码风格不一致、潜在逻辑错误、最佳实践违规。

**ESLint 配置 (`eslint.config.js`)：**

```js
// Flat config + typescript-eslint strictTypeChecked + stylisticTypeChecked
// 自定义规则：
//   - @typescript-eslint/no-unused-vars (error)
//   - @typescript-eslint/no-deprecated (warn)
//   - @typescript-eslint/prefer-nullish-coalescing
//   - @typescript-eslint/prefer-optional-chain
//   - @typescript-eslint/consistent-type-imports
//   - @typescript-eslint/no-unnecessary-condition
//   - eqeqeq: ["error", "always", { null: "ignore" }]
//   - curly: ["error", "all"]
//   - no-console: ["warn", { allow: ["warn", "error"] }]
//
// Test/stories 文件豁免：
//   no-empty-function, no-non-null-assertion, require-await,
//   no-unnecessary-condition, no-unsafe-assignment, unbound-method 等
```

**命令：**

```bash
# 运行 ESLint 检查并自动修复
npx eslint src/ --fix

# 查看剩余警告
npx eslint src/
```

**修复统计：** 约 130 个 ESLint 问题，修复后 0 错误，仅剩弃用 API 的 `warn` 级别提示。

**出现的问题：**

| 问题 | 原因 | 解决 |
|------|------|------|
| JSX 中 ESLint 注释无效 | `// eslint-disable-line` 在 JSX 内不生效 | 提取到 JSX 外的变量作用域 |
| `eslint-disable-next-line` JSX 注释 | JSX 中 `{/* */}` 被解析为表达式 | 重构代码，在 return 前用变量声明 |
| 测试文件类型断言 | `as HTMLInputElement` 被 `--fix` 改为 `!` 导致类型不兼容 | 恢复原始断言 |
| `!= null` 冲突 | `eqeqeq` 要求 `!==` 但允许 `null: "ignore"` | 保留 `!= null`（规则允许） |

### 阶段三：Prettier 格式统一

**目标：** 统一缩进、分号、尾随逗号、行宽等格式。

**Prettier 配置 (`.prettierrc`)：**

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "jsxSingleQuote": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**命令：**

```bash
# 格式化所有源文件
npx prettier --write "src/**/*.{ts,tsx,css}"

# 检查格式问题
npx prettier --check "src/**/*.{ts,tsx,css}"
```

**结果：** 48 个文件格式化。注意：Prettier 和 ESLint 的格式规则不冲突时，两者先后执行均可。

### 阶段四：配置 Claude Code LSP 插件

**目标：** 让 Claude Code 在对话中自动启用完整的 TypeScript LSP 能力。

**最终配置 (`~/.claude/settings.json`)：**

```json
{
  "enabledPlugins": {
    "typescript-lsp@claude-plugins-official": true
  },
  "pluginConfigs": {
    "typescript-lsp@claude-plugins-official": {
      "options": {
        "typescript.tsdk": "./node_modules/typescript/lib",
        "typescript.format.semicolons": "insert",
        "typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,
        "typescript.suggest.autoImports": true,
        "typescript.suggest.completeFunctionCalls": true,
        "typescript.implementationsCodeLens.enabled": true,
        "typescript.referencesCodeLens.enabled": true,
        "typescript.referencesCodeLens.showOnAllFunctions": true
      }
    }
  },
  "theme": "light-daltonized"
}
```

**关键点：**
- 插件配置的 key 必须是 `typescript-lsp@claude-plugins-official`（含 marketplace 后缀）
- 配置字段是 `pluginConfigs` 不是 `plugins`（`plugins` 是无效字段）
- 前提条件：`typescript-language-server` 和 `typescript` 需全局安装

### 阶段五：验证

```bash
# 类型检查
npx tsc --noEmit

# ESLint
npx eslint src/

# Prettier
npx prettier --check "src/**/*.{ts,tsx,css}"

# 测试
npx vitest run

# 构建
npm run build
```

---

## 可复用性评估

### 方案 A：Claude Code 技能 (Skill)

**可行性：** 高

技能可以封装提示词 + 执行步骤，让 Claude 按流程执行 LSP 检查。技能核心逻辑是指导 Claude 依次调用 LSP 工具和 Bash 执行 CLI 命令。

技能触发词建议：`/lsp-check` 或 `/code-quality`

技能大纲：

```markdown
# skill: lsp-check
## 描述
对 React + TypeScript 项目执行完整的 LSP 代码质量检查：类型检查、ESLint、Prettier。

## 执行步骤
1. 运行 `npx tsc --noEmit` 类型检查
2. 运行 `npx eslint src/` 检查代码规范问题
3. 运行 `npx prettier --check "src/**/*.{ts,tsx,css}"` 检查格式
4. 汇总报告，列出需要修复的问题

## 自动修复模式（可选）
- 步骤1后：用 LSP 工具逐文件检查类型错误
- 步骤2后：运行 `npx eslint src/ --fix` 自动修复
- 步骤3后：运行 `npx prettier --write "src/**/*.{ts,tsx,css}"` 自动格式化
```

### 方案 B：Git Hooks（自动工作流）

**可行性：** 中高，推荐两种 hook：

#### 1. Pre-commit Hook（增量检查）

在 `.claude/settings.json` 中配置 `pre-commit` hook，每次 commit 前自动运行检查和修复：

```json
{
  "hooks": {
    "pre-commit": [
      "npx eslint src/ --fix",
      "npx prettier --write 'src/**/*.{ts,tsx,css}'",
      "npx tsc --noEmit"
    ]
  }
}
```

注意：`pre-commit` hook 需要在 Claude Code 的 settings.json 中配置，不是 git hook。Claude Code 会在每次 commit 前执行这些命令。

#### 2. 会话启动 Hook

每次 Claude Code 启动到项目目录时自动激活 LSP 配置检查环境：

```json
{
  "hooks": {
    "onStart": [
      "echo 'LSP check env ready: eslint + prettier + tsc'"
    ]
  }
}
```

### 方案 C：脚本化（独立于 Claude Code）

**可行性：** 高

创建 `scripts/lsp-check.sh`：

```bash
#!/bin/bash
set -e

echo "=== TypeScript 类型检查 ==="
npx tsc --noEmit || echo "⚠️ 类型错误，请修复"

echo "=== ESLint 代码规范 ==="
npx eslint src/ --fix

echo "=== Prettier 格式检查 ==="
npx prettier --check "src/**/*.{ts,tsx,css}" || {
  echo "运行 Prettier 修复..."
  npx prettier --write "src/**/*.{ts,tsx,css}"
}

echo "=== 测试 ==="
npx vitest run

echo "=== 构建 ==="
npm run build

echo "✅ 全部完成"
```

在 `package.json` 中添加：

```json
{
  "scripts": {
    "lsp-check": "bash scripts/lsp-check.sh"
  }
}
```

---

## 推荐组合方案

```
Skill（交互式检查）
  ↓ 开发者触发 /lsp-check
  ↓ Claude 分析结果并给出修复建议
  ↓ 开发者确认修复
      ↓
Hook（自动化守卫）
  pre-commit 自动运行 eslint --fix + prettier --write
  tsc --noEmit 阻止类型错误的提交
      ↓
脚本（CI/批量执行）
  npm run lsp-check 一站式检查
```

这种方式让：
- **开发时**：Skill 提供交互式检查和修复引导
- **提交时**：Hook 自动修复格式 + 阻止类型错误
- **CI 时**：脚本进行全量检查

---

## 前置条件清单

| 依赖 | 安装命令 | 用途 |
|------|----------|------|
| `typescript-language-server` | `npm install -g typescript-language-server` | LSP 语言服务器 |
| `typescript` (全局) | `npm install -g typescript` | LSP 依赖的 TS SDK |
| ESLint 插件 | 已在项目中配置 `eslint.config.js` | 代码规范检查 |
| Prettier | 已在项目中配置 `.prettierrc` | 代码格式化 |
| Claude Code 插件 | `enabledPlugins` 启用 `typescript-lsp` | Claude Code 的 LSP 工具 |
