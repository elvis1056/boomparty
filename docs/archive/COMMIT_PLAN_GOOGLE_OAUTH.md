# Google OAuth Commit Plan

## 進度追蹤

- [x] Commit 1: docs: add code style rules for inline styles and handle prefix
- [x] Commit 2: fix: change asset-path default to root directory
- [ ] Commit 3: chore: add Google OAuth Maven dependencies
- [ ] Commit 4: feat: add database migration for Google OAuth fields
- [ ] Commit 5: feat: add Google OAuth fields to User entity
- [ ] Commit 6: feat: add Google OAuth query method to UserRepository
- [ ] Commit 7: feat: create GoogleAuthRequest DTO
- [ ] Commit 8: feat: create GoogleAuthService with core authentication logic
- [ ] Commit 9: feat: create GoogleAuthController with API endpoints
- [ ] Commit 10: feat: allow Google OAuth endpoints in SecurityConfig
- [ ] Commit 11: feat: configure Google OAuth credentials in backend
- [ ] Commit 12: chore: install Google OAuth package in frontend
- [ ] Commit 13: feat: configure Google Client ID in frontend
- [ ] Commit 14: feat: create GoogleLoginButton component
- [ ] Commit 15: feat: integrate GoogleOAuthProvider in Root Layout
- [ ] Commit 16: feat: integrate Google login button in login page

---

## Commit 3: 後端添加 Maven 依賴

```bash
git add myprojectbackend/pom.xml && git commit -m "$(cat <<'EOF'
chore: add Google OAuth Maven dependencies

Add dependencies to pom.xml:
- google-api-client 2.2.0
- google-auth-library-oauth2-http 1.19.0

For verifying Google ID tokens.

新增 pom.xml 依賴：
- google-api-client 2.2.0
- google-auth-library-oauth2-http 1.19.0
用於驗證 Google ID Token

【Revert 說明】
📦 依賴項：無
⚠️  如需 revert：需先 revert 所有使用這些依賴的 commits
✅ 獨立 revert：否，後續功能依賴此項
🔧 影響功能：Google OAuth 驗證
EOF
)"
```

**檔案：** myprojectbackend/pom.xml

---

## Commit 4: 資料庫遷移 SQL

```bash
git add myprojectbackend/docs/GOOGLE_OAUTH_MIGRATION.sql && git commit -m "$(cat <<'EOF'
feat: add database migration for Google OAuth fields

Create GOOGLE_OAUTH_MIGRATION.sql:
- Add google_user_id column (VARCHAR(255), UNIQUE) to users table
- Add picture_url column (VARCHAR(500)) to users table
- Add email_verified column (BOOLEAN, DEFAULT FALSE) to users table
- Create idx_users_google_user_id index

新增 GOOGLE_OAUTH_MIGRATION.sql：
- users 表新增 google_user_id（VARCHAR(255), UNIQUE）
- users 表新增 picture_url（VARCHAR(500)）
- users 表新增 email_verified（BOOLEAN, DEFAULT FALSE）
- 建立 idx_users_google_user_id 索引

【Revert 說明】
📦 依賴項：無
⚠️  如需 revert：需手動執行 DROP COLUMN 和 DROP INDEX
✅ 獨立 revert：否，需要清理資料庫
🔧 影響功能：User 資料表結構
EOF
)"
```

**檔案：** myprojectbackend/docs/GOOGLE_OAUTH_MIGRATION.sql

---

## Commit 5: User Entity 更新

```bash
git add myprojectbackend/src/main/java/com/fivepapa/backend/member/entity/User.java && git commit -m "$(cat <<'EOF'
feat: add Google OAuth fields to User entity

Add fields to User.java:
- googleUserId: String (Google user unique ID)
- pictureUrl: String (Google profile picture URL)
- emailVerified: Boolean (email verification status, default false)

User.java 新增欄位：
- googleUserId: String（Google 用戶唯一 ID）
- pictureUrl: String（Google 頭像 URL）
- emailVerified: Boolean（Email 驗證狀態，預設 false）

【Revert 說明】
📦 依賴項：Commit 4（資料庫遷移）
⚠️  如需 revert：需先 revert 使用這些欄位的所有 commits
✅ 獨立 revert：否，資料庫結構已變更
🔧 影響功能：User 實體結構
EOF
)"
```

**檔案：** myprojectbackend/src/main/java/com/fivepapa/backend/member/entity/User.java

---

## Commit 6: UserRepository 查詢方法

```bash
git add myprojectbackend/src/main/java/com/fivepapa/backend/member/repository/UserRepository.java && git commit -m "$(cat <<'EOF'
feat: add Google OAuth query method to UserRepository

Add query method:
- findByGoogleUserId(String googleUserId): Optional<User>

For finding users by Google User ID.

新增查詢方法：
- findByGoogleUserId(String googleUserId): Optional<User>
用於根據 Google User ID 查找已綁定的用戶

【Revert 說明】
📦 依賴項：Commit 5（User Entity 欄位）
⚠️  如需 revert：需先 revert GoogleAuthService
✅ 獨立 revert：否，Service 層依賴此方法
🔧 影響功能：用戶查詢
EOF
)"
```

**檔案：** myprojectbackend/src/main/java/com/fivepapa/backend/member/repository/UserRepository.java

---

## Commit 7: GoogleAuthRequest DTO

```bash
git add myprojectbackend/src/main/java/com/fivepapa/backend/member/dto/GoogleAuthRequest.java && git commit -m "$(cat <<'EOF'
feat: create GoogleAuthRequest DTO

Create GoogleAuthRequest.java:
- idToken: String (Google ID Token)
- Use @Valid for validation
- Follow project DTO naming conventions (@Data, @Builder)

新增 GoogleAuthRequest.java：
- idToken: String（Google ID Token）
- 使用 @Valid 驗證
- 遵循專案 DTO 命名規範（@Data, @Builder）

【Revert 說明】
📦 依賴項：無
⚠️  如需 revert：需先 revert GoogleAuthController
✅ 獨立 revert：否，Controller 依賴此 DTO
🔧 影響功能：Google 登入請求格式
EOF
)"
```

**檔案：** myprojectbackend/src/main/java/com/fivepapa/backend/member/dto/GoogleAuthRequest.java

---

## Commit 8: GoogleAuthService 核心邏輯

```bash
git add myprojectbackend/src/main/java/com/fivepapa/backend/member/service/GoogleAuthService.java && git commit -m "$(cat <<'EOF'
feat: create GoogleAuthService with core authentication logic

Create GoogleAuthService.java:
- authenticateWithGoogle: Verify Google ID Token and return JWT
- verifyGoogleToken: Verify token using Google official library
- findOrCreateGoogleUser: Handle 3 scenarios (linked/email exists/new user)
- generateUniqueUsername: Generate unique username from Google name

新增 GoogleAuthService.java：
- authenticateWithGoogle: 驗證 Google ID Token 並返回 JWT
- verifyGoogleToken: 使用 Google 官方庫驗證 token
- findOrCreateGoogleUser: 智能處理三種情況（已綁定/Email 存在/新用戶）
- generateUniqueUsername: 從 Google 名稱生成唯一用戶名

【Revert 說明】
📦 依賴項：
   - Commit 3（Maven 依賴）
   - Commit 5（User Entity）
   - Commit 6（UserRepository）
⚠️  如需 revert：需先 revert GoogleAuthController
✅ 獨立 revert：否，Controller 依賴此 Service
🔧 影響功能：Google OAuth 驗證核心邏輯
EOF
)"
```

**檔案：** myprojectbackend/src/main/java/com/fivepapa/backend/member/service/GoogleAuthService.java

---

## Commit 9: GoogleAuthController API 端點

```bash
git add myprojectbackend/src/main/java/com/fivepapa/backend/member/controller/GoogleAuthController.java && git commit -m "$(cat <<'EOF'
feat: create GoogleAuthController with API endpoints

Create GoogleAuthController.java:
- POST /api/auth/google/login: Google login endpoint
- GET /api/auth/google/health: Health check endpoint
- Set HttpOnly Cookie for refresh token
- Complete error handling and logging

新增 GoogleAuthController.java：
- POST /api/auth/google/login: Google 登入端點
- GET /api/auth/google/health: 健康檢查端點
- 設置 HttpOnly Cookie 存儲 refresh token
- 完整錯誤處理和日誌記錄

【Revert 說明】
📦 依賴項：
   - Commit 7（GoogleAuthRequest DTO）
   - Commit 8（GoogleAuthService）
⚠️  如需 revert：前端將無法調用 Google 登入 API
✅ 獨立 revert：可以，但需同時 revert SecurityConfig 相關設定
🔧 影響功能：Google 登入 API
EOF
)"
```

**檔案：** myprojectbackend/src/main/java/com/fivepapa/backend/member/controller/GoogleAuthController.java

---

## Commit 10: SecurityConfig 更新

```bash
git add myprojectbackend/src/main/java/com/fivepapa/backend/config/SecurityConfig.java && git commit -m "$(cat <<'EOF'
feat: allow Google OAuth endpoints in SecurityConfig

Update SecurityConfig.java:
- Add /api/auth/google/** to CSRF ignore list
- Add /api/auth/google/** to permitAll authorization rules

Allow unauthenticated access to Google OAuth endpoints.

更新 SecurityConfig.java：
- CSRF 忽略列表新增 /api/auth/google/**
- 授權規則新增 /api/auth/google/** permitAll
允許未登入用戶訪問 Google OAuth 端點

【Revert 說明】
📦 依賴項：Commit 9（GoogleAuthController）
⚠️  如需 revert：Google 登入端點將被 Spring Security 攔截
✅ 獨立 revert：可以，但 Google 登入功能將無法使用
🔧 影響功能：Google OAuth 端點存取權限
EOF
)"
```

**檔案：** myprojectbackend/src/main/java/com/fivepapa/backend/config/SecurityConfig.java

---

## Commit 11: 後端配置 Google credentials

```bash
git add myprojectbackend/src/main/resources/application-dev.yml && git commit -m "$(cat <<'EOF'
feat: configure Google OAuth credentials in backend

Update application-dev.yml:
- Add google.client.id configuration
- Add google.client.secret configuration
- Use real Google Client ID and Secret

更新 application-dev.yml：
- 新增 google.client.id 配置
- 新增 google.client.secret 配置
- 使用真實的 Google Client ID 和 Secret

【Revert 說明】
📦 依賴項：Commit 8（GoogleAuthService）
⚠️  如需 revert：GoogleAuthService 將無法啟動（缺少配置）
✅ 獨立 revert：否，Service 依賴此配置
🔧 影響功能：Google OAuth 憑證配置
EOF
)"
```

**檔案：** myprojectbackend/src/main/resources/application-dev.yml

---

## Commit 12: 前端安裝 Google OAuth 套件

```bash
git add boomparty/package.json boomparty/package-lock.json && git commit -m "$(cat <<'EOF'
chore: install Google OAuth package in frontend

Install dependency:
- @react-oauth/google

For integrating Google official login button.

安裝依賴：
- @react-oauth/google
用於整合 Google 官方登入按鈕

【Revert 說明】
📦 依賴項：無
⚠️  如需 revert：需先 revert 所有使用此套件的 commits
✅ 獨立 revert：否，前端組件依賴此套件
🔧 影響功能：Google 登入前端組件
EOF
)"
```

**檔案：** boomparty/package.json, boomparty/package-lock.json

---

## Commit 13: 前端配置 Google Client ID

```bash
git add boomparty/.env.local && git commit -m "$(cat <<'EOF'
feat: configure Google Client ID in frontend

Update .env.local:
- Add NEXT_PUBLIC_GOOGLE_CLIENT_ID

For initializing GoogleOAuthProvider.

更新 .env.local：
- 新增 NEXT_PUBLIC_GOOGLE_CLIENT_ID
用於初始化 GoogleOAuthProvider

【Revert 說明】
📦 依賴項：無
⚠️  如需 revert：GoogleOAuthProvider 將無法初始化
✅ 獨立 revert：否，Layout 依賴此配置
🔧 影響功能：Google OAuth Provider 配置
EOF
)"
```

**檔案：** boomparty/.env.local

---

## Commit 14: GoogleLoginButton 組件

```bash
git add boomparty/components/GoogleLoginButton/ && git commit -m "$(cat <<'EOF'
feat: create GoogleLoginButton component

Create GoogleLoginButton component:
- Use Google official GoogleLogin component
- loginWithGoogle: Send ID Token to backend and complete login
- showError: Display login error message
- Use styled-components (no inline styles)
- Follow project naming conventions (no handle prefix)

新增 GoogleLoginButton 組件：
- 使用 Google 官方 GoogleLogin 組件
- loginWithGoogle: 發送 ID Token 到後端驗證並完成登入
- showError: 顯示登入錯誤訊息
- 使用 styled-components（無 inline style）
- 遵循專案命名規範（不使用 handle 前綴）

【Revert 說明】
📦 依賴項：
   - Commit 12（@react-oauth/google 套件）
   - Commit 13（Google Client ID 配置）
⚠️  如需 revert：登入頁面的 Google 登入按鈕將失效
✅ 獨立 revert：否，登入頁面引用此組件
🔧 影響功能：Google 登入 UI 組件
EOF
)"
```

**檔案：**
- boomparty/components/GoogleLoginButton/index.tsx
- boomparty/components/GoogleLoginButton/style.ts

---

## Commit 15: Root Layout 整合 GoogleOAuthProvider

```bash
git add boomparty/app/layout.tsx && git commit -m "$(cat <<'EOF'
feat: integrate GoogleOAuthProvider in Root Layout

Update app/layout.tsx:
- Import GoogleOAuthProvider
- Wrap application with GoogleOAuthProvider
- Pass NEXT_PUBLIC_GOOGLE_CLIENT_ID

Initialize Google OAuth environment.

更新 app/layout.tsx：
- 引入 GoogleOAuthProvider
- 用 GoogleOAuthProvider 包裹應用
- 傳入 NEXT_PUBLIC_GOOGLE_CLIENT_ID
初始化 Google OAuth 環境

【Revert 說明】
📦 依賴項：
   - Commit 12（@react-oauth/google 套件）
   - Commit 13（Google Client ID 配置）
⚠️  如需 revert：GoogleLoginButton 將無法運作
✅ 獨立 revert：否，GoogleLoginButton 依賴此設定
🔧 影響功能：Google OAuth 全局初始化
EOF
)"
```

**檔案：** boomparty/app/layout.tsx

---

## Commit 16: 登入頁面整合 Google 登入

```bash
git add boomparty/app/login/LoginContent/index.tsx && git commit -m "$(cat <<'EOF'
feat: integrate Google login button in login page

Update LoginContent/index.tsx:
- Import GoogleLoginButton component
- Replace existing Google login button with official component
- Remove loginWithGoogle function reference

Complete Google OAuth frontend integration.

更新 LoginContent/index.tsx：
- 引入 GoogleLoginButton 組件
- 替換原有的 Google 登入按鈕為官方組件
- 移除 loginWithGoogle 函數引用
完成 Google OAuth 前端整合

【Revert 說明】
📦 依賴項：
   - Commit 14（GoogleLoginButton 組件）
   - Commit 15（GoogleOAuthProvider）
⚠️  如需 revert：登入頁面將無 Google 登入功能
✅ 獨立 revert：可以，恢復原有的 Coming Soon 按鈕
🔧 影響功能：登入頁面 Google 登入
EOF
)"
```

**檔案：** boomparty/app/login/LoginContent/index.tsx

---

## 📊 總結

- **總計：** 16 個 commits
- **已完成：** 2 個
- **待執行：** 14 個

**類型分布：**
- feat: 11 個（新功能）
- chore: 2 個（依賴更新）
- docs: 1 個（文件更新）
- fix: 1 個（修正問題）
- fix: 1 個（修正 setAuth）

**執行方式：**
- 可以一次全部執行
- 也可以分批執行（建議：後端 3-11，前端 12-16）
