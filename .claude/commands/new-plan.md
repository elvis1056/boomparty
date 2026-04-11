# /new-plan — 建立新功能計畫

在 `docs/sessions/` 建立一個固定格式的計畫檔，並在 HANDOFF.md 的「進行中計畫」新增對應 section。

## 執行步驟

1. 取得計畫名稱（從使用者輸入，或詢問）
2. 產生檔名：`docs/sessions/YYYY-MM-DD-<feature-name>.md`
3. 用以下模板建立計畫檔
4. 在 `HANDOFF.md` 的「進行中計畫」加入一行連結

## 計畫檔模板

```markdown
# <功能名稱> 計畫

> 建立日期：YYYY-MM-DD
> 狀態：進行中

## 背景

（為什麼要做這個？解決什麼問題？）

## 斷點執行順序

### 斷點 1：<名稱>

**範圍：** 哪些檔案

**做什麼：**
- 

**注意事項：**
- 

---

### 斷點 2：<名稱>

...

## 技術重點

| 項目 | 說明 |
|------|------|
| | |

## Revert 說明

- 斷點 1：
- 斷點 2：
```

## HANDOFF.md 更新格式

在「進行中計畫」section 加入：

```markdown
### 🟡 <功能名稱>（進行中）

計畫文件：`docs/sessions/YYYY-MM-DD-<feature-name>.md`

- [ ] 斷點 1
- [ ] 斷點 2
```
