# /handoff — 結束工作、交接給下一個 agent

執行以下動作，確保下一個 agent 可以無縫接手：

## 執行步驟

### 1. 確認未 commit 的變更

```bash
git status
git diff --stat
```

如果有未 commit 的變更：
- 執行 lint：`npm run lint`
- 依照 CLAUDE.md commit 規範逐一 commit

### 2. 更新 HANDOFF.md

- 把本次完成的斷點標記為 ✅
- 把已完成的「進行中計畫」section 移到「已完成斷點」
- 更新「Git 狀態」區塊，列出本次新增的 commits
- 列出尚未完成的項目（下一個 agent 的起點）

### 3. 如果計畫已全部完成

- 在 `docs/sessions/<plan-file>.md` 最上方把狀態改為 `✅ 完成`
- 不需要搬檔案（保留在 sessions/ 作為紀錄）

### 4. Commit HANDOFF.md

```
docs: update HANDOFF.md for handoff
```

### 5. 輸出交接摘要

向使用者輸出：

```
## 交接摘要

**本次完成：**
- 

**未完成／下一步：**
- 

**需要注意：**
- 

**下一個 agent 建議從這裡開始：**
HANDOFF.md → 進行中計畫 → <section 名稱>
```
