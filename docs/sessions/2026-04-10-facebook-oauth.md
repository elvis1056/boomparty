# Facebook OAuth 登入計畫

> 建立日期：2026-04-10  
> 狀態：🟡 進行中（等待後端 POST /api/auth/facebook/login + Facebook App ID）  
> 目標：實作 Facebook 登入，對齊現有 Google OAuth 架構

---

## 現況分析

| 項目 | Google | Facebook |
|------|--------|----------|
| 前端 SDK | `@react-oauth/google` ✅ | 待安裝 |
| 前端元件 | `components/GoogleLoginButton/` ✅ | 待新增 |
| 後端 API | `POST /api/auth/google/login` ✅ | 待後端實作 |
| 登入頁整合 | ✅ | 按鈕已存在但 onClick 是 alert |

**Google 登入流程（參考基準）：**
1. 使用者點按鈕 → Facebook JS SDK 彈出授權視窗
2. 使用者同意 → 前端拿到 `accessToken`
3. 前端 `POST /api/auth/facebook/login` 帶 `{ accessToken }`
4. 後端驗證 → 回傳 `AuthResponse`（同 Google 格式）
5. 前端 `setAuth(response)` → `syncGuestCart()` → `router.push('/')`

---

## 前後端分工

### 後端需要實作（前端無法進行，需先確認）

```
POST /api/auth/facebook/login
Body: { accessToken: string }
Response: AuthResponse（同 Google，包含 token、username、email）
```

後端驗證流程：
- 用 `accessToken` 呼叫 Facebook Graph API 取得 user info
- 建立或找到對應的 boomparty 使用者
- 回傳 JWT token（同其他登入入口）

### 前端實作（後端完成後進行）

---

## 斷點執行順序

---

### 斷點 1：安裝 Facebook SDK 套件

```bash
npm install @greatsumini/react-facebook-login
```

需要：Facebook App ID（在 Facebook Developer Console 建立應用程式後取得）

**環境變數新增：**
```
NEXT_PUBLIC_FACEBOOK_APP_ID=your_app_id
```

---

### 斷點 2：更新 `lib/api/auth.ts`

將現有的 `loginWithFacebook()` stub 移除，改為正式的 API 呼叫：

```typescript
export async function loginWithFacebook(accessToken: string): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/api/auth/facebook/login', { accessToken }, {
    skipCsrf: true,
  });
}
```

---

### 斷點 3：新增 `FacebookLoginButton` 元件

**範圍：**
- 新增 `components/FacebookLoginButton/index.tsx`
- 新增 `components/FacebookLoginButton/style.ts`

**參考 GoogleLoginButton 架構：**

```typescript
// components/FacebookLoginButton/index.tsx
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { loginWithFacebook } from '@/lib/api/auth';

function FacebookLoginButton({ className }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const syncGuestCart = useCartStore((state) => state.syncGuestCart);

  const loginWithFB = async (response) => {
    try {
      const authResponse = await loginWithFacebook(response.accessToken);
      setAuth(authResponse);
      await syncGuestCart();  // ← guest cart 同步
      router.push('/');
    } catch (error) {
      console.error('Facebook login error:', error);
      alert('Facebook 登入失敗，請稍後再試');
    }
  };

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
      onSuccess={loginWithFB}
      render={({ onClick }) => (
        <button className={className} onClick={onClick} type="button">
          <span className="oauth-icon">f</span>
          Facebook 登入
        </button>
      )}
    />
  );
}
```

**style.ts：** 沿用 LoginContent 現有的 `.oauth-btn.facebook` 樣式，`className` 傳入即可。

---

### 斷點 4：更新登入頁

**範圍：** `app/login/LoginContent/index.tsx`

- 移除 `import { loginWithFacebook } from '@/lib/api/auth'`
- 移除 Facebook 按鈕的 inline `onClick={loginWithFacebook}`
- 改為引入 `<FacebookLoginButton />` 元件（對齊 Google 的處理方式）

---

### 斷點 5：Facebook Developer Console 設定

這是非程式碼工作，需要你手動完成：

- [ ] 建立 Facebook 應用程式（[developers.facebook.com](https://developers.facebook.com/)）
- [ ] 取得 App ID → 填入 `.env.local` 的 `NEXT_PUBLIC_FACEBOOK_APP_ID`
- [ ] 在 Facebook App 設定中加入「有效 OAuth 重新導向 URI」：
  - 本地：`http://localhost:3000`
  - 正式：`https://boomparty.tw`
- [ ] 確認「email」permission 已申請（取得使用者 email 用）

---

## 執行前置條件

**必須先完成才能進行前端：**
1. 後端 `POST /api/auth/facebook/login` endpoint 完成
2. Facebook App ID 取得
3. guest cart（`syncGuestCart`）已實作（GUEST_CART_PLAN.md 斷點 1）

---

## 技術重點

| 項目 | 說明 |
|------|------|
| SDK 選擇 | `@greatsumini/react-facebook-login` 支援 TypeScript，維護活躍 |
| token 類型 | 前端拿到的是 `accessToken`（短效），後端用它呼叫 Graph API 取 user info |
| App Review | 只用 `email` + `public_profile` 權限不需要 Facebook 審核，可直接上線 |
| 測試帳號 | 後端開發階段可在 Facebook App Dashboard 加入測試用帳號 |

---

## Revert 說明

- 斷點 1-4 整組：前端完全獨立，可一起 revert，不影響其他登入方式
- 斷點 5（Facebook Console 設定）：不影響程式碼
