# GitHub Copilot Instructions — AgentResume

> 本文件為 GitHub Copilot（及所有 AI Agent）在此專案中的行為規範。
> 適用範圍：所有程式碼生成、重構、測試與文檔任務。

---

## 1. 開發規範

### 1.1 專案技術棧

| 層級 | 技術 |
|------|------|
| 框架 | Nuxt 4（Composition API + `<script setup>`） |
| 樣式 | Tailwind CSS v3 |
| 狀態管理 | `useState`（Nuxt 內建）/ Pinia（複雜狀態） |
| 套件管理 | npm |

---

### 1.2 Nuxt 4 資料夾結構規範

```
agentresume/
├── .github/
│   └── copilot-instructions.md   # 本文件
├── app/
│   ├── app.vue                   # 根元件，只放 <NuxtRouteAnnouncer> 與 <NuxtPage>
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css      # Tailwind 入口（@tailwind base/components/utilities）
│   ├── components/
│   │   └── resume/               # 依功能分子目錄，以 PascalCase 命名
│   │       ├── PersonalSection.vue
│   │       ├── ExperienceSection.vue
│   │       ├── EducationSection.vue
│   │       ├── SkillsSection.vue
│   │       └── ResumePreview.vue
│   ├── composables/              # use 前綴，封裝業務邏輯與狀態
│   │   └── useResume.js
│   ├── layouts/
│   │   └── default.vue           # 預設 layout，包裹全站共用結構
│   └── pages/
│       └── index.vue             # 路由頁面，以資料夾結構對應 URL
├── public/                       # 靜態資源（favicon、robots.txt 等）
├── nuxt.config.js                # Nuxt 設定檔
├── tailwind.config.js            # Tailwind 設定，content 路徑須涵蓋所有 Vue 檔案
└── package.json
```

**Server 規範：**

- 所有 API 邏輯必須放在 `server/api/` 或 `server/routes/`。
- Server handler 必須使用 `defineEventHandler`（例如：
```js
export default defineEventHandler(async (event) => {
  // 處理請求
})
```

**命名規則：**
- 元件（Components）：`PascalCase`，例如 `ResumePreview.vue`
- Composables：`camelCase` 加 `use` 前綴，例如 `useResume.js`
- 頁面（Pages）：`kebab-case`，例如 `resume-detail.vue`
- CSS class：只使用 Tailwind utility class，禁止撰寫自訂 CSS（除 `@layer` 擴充外）

---

### 1.3 Tailwind CSS v3 使用規範

1. **只使用 Tailwind v3 utility class**，不引入 Bootstrap、其他 CSS 框架。
2. **響應式前綴順序**：`base → sm: → md: → lg: → xl: → 2xl: → print:`。
3. **自訂擴充**只在 `tailwind.config.js` 的 `theme.extend` 中定義，不修改 `theme` 根層級。
4. **Component 抽象**：若同一組 class 重複 3 次以上，請用 `@layer components` 或 Vue 元件封裝。
5. **顏色系統**：使用 `primary-*` 調色盤（已在 `tailwind.config.js` 定義）作為品牌色，語義色使用 `gray / red / green / yellow`。
6. **互動狀態**：優先使用 `hover: focus: active: disabled:` 偽類，避免 JavaScript 控制樣式。
7. **列印樣式**：使用 `print:hidden` 與 `print:block` 處理列印版面，`print:shadow-none` 移除列印陰影。
8. **禁止使用** `!important` 或 `style=""` 行內樣式，除非是動態計算值（如寬度百分比）。

```vue
<!-- ✅ 正確：Tailwind utility class -->
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm">

<!-- ❌ 錯誤：行內樣式 -->
<div style="display: flex; padding: 24px;">

<!-- ✅ 正確：響應式順序 -->
<div class="text-sm md:text-base lg:text-lg">

<!-- ✅ 正確：列印響應式 -->
<button class="print:hidden">列印</button>
```

---

### 1.4 Vue / JavaScript 規範

- 所有元件使用 `<script setup>` 語法（不加 `lang="ts"`）。
- Props 使用 `defineProps(['propName'])` 簡易陣列語法，或 `defineProps({ prop: Type })` 執行期驗證語法。
- Emits 使用 `defineEmits(['eventName', ...])` 陣列語法。
- Composable 狀態使用 `useState()` 確保 SSR 安全。
- 業務邏輯集中定義在 composable（`composables/`）中，避免在元件內撰寫複雜邏輯。
- 禁止在元件中使用 `var`，統一使用 `const` / `let`。

---

## 2. Agent 自動化流程

當要求實作新功能或修改現有功能時，**必須依照以下循環執行**：

```
Plan → Code → Test → Fix
```

### Phase 1 — Plan（規劃）
在動手撰寫程式碼前，先輸出：
1. **需求拆解**：將功能拆成最小可實作單元（bullet list）。
2. **影響範圍**：列出將新增/修改的檔案清單。
3. **資料流**：描述 props / emits / composable state 的流向。
4. **邊界情況**：列出至少 3 個邊界案例（空值、超長字串、多筆資料等）。

> 若規劃階段需要澄清，先提問，不要假設需求。

### Phase 2 — Code（實作）
依照規劃逐步實作：
- 先實作 composable / 型別定義（`types`）
- 再實作子元件（`components/`）
- 最後實作頁面（`pages/`）
- 每個檔案修改後提供 diff 摘要

### Phase 3 — Test（測試）

每個功能實作完成後，**必須**撰寫或描述以下測試：

```javascript
// 單元測試（composable）
describe('useResume', () => {
  it('should add a skill and deduplicate', () => { ... })
  it('should remove experience by index', () => { ... })
})

// 元件測試（component）
describe('SkillsSection', () => {
  it('renders skill tags', () => { ... })
  it('emits add event on enter key', () => { ... })
})
```

- Composable 測試位於 `tests/composables/`
- 元件測試位於 `tests/components/`
- 使用 Vitest + Vue Test Utils

### Phase 4 — Fix（修復）

若測試失敗或發現 Bug：
1. 輸出**根本原因分析**（Root Cause Analysis）
2. 提出**最小改動方案**，不過度重構
3. 修復後重新執行 Test 階段
4. 若同一 Bug 修復超過 2 次，須重新進行 Plan 階段

---

## 2.5 執行限制 (Runtime Constraints)
- **單次修改上限**：若單一指令（如：修改規範）不涉及代碼邏輯變更，請直接修改檔案，**嚴禁執行全專案掃描**。
- **自主停止機制**：若 Agent 迭代超過 3 次仍無法達成目標，必須立即停止並向使用者回報問題點，嚴禁無意義的重複嘗試。
- **文件優先**：當使用者要求修改 Instructions 時，僅需關注該 Markdown 檔案本身，除非明確要求，否則不需同步修改代碼。

## 3. 模型使用策略

根據任務複雜度選擇最適合的模型：

| 情境 | 模型 | 使用時機 |
|------|------|---------|
| 複雜邏輯 | **Claude Sonnet 4.6** | 架構設計、演算法實作、複雜狀態管理、效能優化、安全性審查 |
| 簡單修改 | **Claude Haiku 4.5** | 樣式微調、文字修改、單一 utility function、快速 bug fix |
| 文檔生成 | **GPT-4o-mini** | README 撰寫、JSDoc 注釋、CHANGELOG 更新、API 文件生成 |

### 選擇判斷標準

**使用 Claude Sonnet 4.6（複雜邏輯）當：**
- 需要跨多個檔案的架構變更
- 涉及複雜狀態邏輯或演算法設計
- 需要處理非同步資料流（API 整合、SSR 資料抓取）
- 效能瓶頸分析與解決
- 安全性相關功能（輸入驗證、XSS 防護）
- 重構現有複雜邏輯

**使用 Claude Haiku 4.5（簡單修改）當：**
- 更改 Tailwind class（顏色、間距、字型）
- 新增/修改表單欄位
- 調整現有元件的 props
- 修正簡單的邏輯錯誤
- 快速新增 utility function（< 20 行）

**使用 GPT-4o-mini（文檔生成）當：**
- 撰寫或更新 README.md
- 為函式/元件產生 JSDoc 或 TSDoc 注釋
- 生成 CHANGELOG 條目
- 建立使用者操作說明
- 翻譯技術文件

---

## 4. 安全性規範

- **XSS 防護**：避免使用 `v-html`，若必要使用，須先透過 DOMPurify 清理輸入。
- **輸入驗證**：所有使用者輸入須在 composable 層驗證，不信任原始 DOM 事件值。
- **依賴安全**：定期執行 `npm audit`，critical/high 漏洞須立即修復。
- **敏感資料**：履歷中的個人資料僅存在 `useState`（client-side），不得傳送至第三方 API 除非使用者明確同意。

---

## 5. Git Commit 規範

遵循 Conventional Commits 規範：

```
feat(resume): add skills section with deduplication
fix(preview): correct date range display for current position
style(editor): adjust form input focus ring color to primary-500
docs: update copilot-instructions with model strategy
test(useResume): add unit tests for removeExperience
```

**Type 定義：**
- `feat`：新功能
- `fix`：Bug 修復
- `style`：樣式變更（不影響邏輯）
- `refactor`：重構（不新增功能、不修復 Bug）
- `test`：測試相關
- `docs`：文件變更
- `chore`：建置工具、依賴更新

---

*最後更新：2026-03-23*
