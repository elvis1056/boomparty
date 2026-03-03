# Booking Success Page + Backend Booking System

> 實作計畫。所有變更在收到「開始」指令前不動手。

---

## 一、問題現況

`ConfirmBooking/index.tsx` 送出後只在同一元件內 `setIsSuccess(true)` 顯示成功畫面：
- 沒有獨立的成功頁面 URL（重新整理就消失）
- 預約編號是假的（`new Date().getTime().toString().slice(-8)`）
- 沒有真實 API 呼叫，資料不會存進資料庫

---

## 二、前端變更

### 2-1. 新增 `lib/api/booking.ts`

```
lib/api/booking.ts  ← 新增
```

呼叫 backend POST /api/bookings，傳入 `CreateBookingApiRequest`，回傳 `BookingApiResponse`。

使用 `apiClient.post`，不需要 auth（公開端點）。

**送出的 payload 結構：**
```ts
interface CreateBookingApiRequest {
  serviceName: string;
  servicePrice: number;
  performerName: string | null;
  bookingType: 'COMPLETION' | 'TIME_SLOT';
  completionTime: string | null;    // ISO 8601
  performanceStart: string | null;  // ISO 8601
  performanceEnd: string | null;    // ISO 8601
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNotes: string | null;
  paymentMethod: 'ONLINE' | 'ONSITE';
  totalPrice: number;
}
```

**後端回傳結構：**
```ts
interface BookingApiResponse {
  id: number;
  bookingReference: string;  // "BP-XXXXXXXX"
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}
```

---

### 2-2. 擴充 `types/booking.ts`

新增上面兩個 interface（`CreateBookingApiRequest`、`BookingApiResponse`）到現有的 `types/booking.ts`。

---

### 2-3. 擴充 `stores/bookingStore.ts`

新增：
- `bookingReference: string | null` 狀態（初始值 `null`）
- `setBookingReference: (ref: string) => void` action
- `resetBooking` 時也清掉 `bookingReference`

---

### 2-4. 修改 `app/booking/BookingContent/ConfirmBooking/index.tsx`

修改 `confirmBooking` 函式：
1. 呼叫 `lib/api/booking.ts` 的 `createBooking()`，傳入 store 資料
2. 收到回應後，`setBookingReference(response.bookingReference)`
3. `router.push('/booking/success')`（不再 `setIsSuccess(true)`）
4. 移除整個 `if (isSuccess)` 的 inline 成功 UI block
5. 移除 `isSuccess` state

---

### 2-5. 新增成功頁面

```
app/booking/success/
  page.tsx                     ← 新增（路由頁面）
  BookingSuccess/
    index.tsx                  ← 新增（UI 元件）
    style.ts                   ← 新增（樣式）
```

**`app/booking/success/page.tsx`**
- 簡單 re-export BookingSuccess 元件

**`BookingSuccess/index.tsx`**
- 從 `useBookingStore` 讀取 `bookingReference`、`customerInfo`
- 若 `bookingReference` 為 null，代表直接訪問此頁（非正常流程），redirect 到 `/booking/service`
- 顯示目前 ConfirmBooking 裡的成功 UI（SVG icon、預約編號、email/phone info）
- 按鈕：「回到首頁」→ `router.push('/')`，「再次預約」→ `resetBooking()` + `router.push('/booking/service')`

---

### 2-6. 新增 `app/booking/status/` 查詢預約狀態頁面

```
app/booking/status/
  page.tsx                     ← 新增（路由頁面）
  BookingStatusCheck/
    index.tsx                  ← 新增（UI 元件）
    style.ts                   ← 新增（樣式）
```

**功能：**
- 輸入框：讓用戶貼上預約編號（如 `BP-12345678`）
- 按「查詢」→ 呼叫 `GET /api/bookings/{reference}`
- 顯示結果：
  - 成功：顯示狀態（待確認 / 已確認 / 已取消）、建立時間
  - 找不到：顯示「查無此預約編號」
- 這個頁面不需要 StepIndicator（見 2-7）

---

### 2-7. 修改 `app/booking/BookingLayoutContent/index.tsx`

```ts
const URL_TO_STEP: Record<string, number> = {
  '/booking/service': 1,
  '/booking/staff': 2,
  '/booking/form': 3,
  '/booking/confirm': 4,
  '/booking/success': 5,  // 新增
};

// 不顯示 StepIndicator 的頁面
const HIDE_STEP_INDICATOR = ['/booking/success', '/booking/status'];
```

當 `HIDE_STEP_INDICATOR.includes(pathname)` 時，不渲染 `<StepIndicator>`。

---

## 三、後端變更

Package 結構：`com.fivepapa.backend.booking`（新建 module）

```
booking/
  controller/
    BookingController.java
  dto/
    CreateBookingRequest.java
    BookingResponse.java
  entity/
    Booking.java
    BookingStatus.java   (enum)
    BookingType.java     (enum)
    BookingPaymentMethod.java  (enum，避免與 ecommerce 的 PaymentMethod 混用)
  repository/
    BookingRepository.java
  service/
    BookingService.java
```

---

### 3-1. `entity/BookingStatus.java`（enum）

```java
public enum BookingStatus {
    PENDING,     // 待確認
    CONFIRMED,   // 已確認
    CANCELLED    // 已取消
}
```

---

### 3-2. `entity/BookingType.java`（enum）

```java
public enum BookingType {
    COMPLETION,   // 佈置類：指定完成時間點
    TIME_SLOT     // 表演類：指定表演時段
}
```

---

### 3-3. `entity/BookingPaymentMethod.java`（enum）

```java
public enum BookingPaymentMethod {
    ONLINE,   // 線上轉帳
    ONSITE    // 現場付現
}
```

---

### 3-4. `entity/Booking.java`

```java
@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_reference", nullable = false, unique = true, length = 20)
    private String bookingReference;

    // 服務快照（不關聯到 Product，避免商品改名影響歷史預約）
    @Column(name = "service_name", nullable = false, length = 200)
    private String serviceName;

    @Column(name = "service_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal servicePrice;

    // 表演者（選填）
    @Column(name = "performer_name", length = 100)
    private String performerName;

    // 預約類型
    @Enumerated(EnumType.STRING)
    @Column(name = "booking_type", nullable = false, length = 20)
    private BookingType bookingType;

    // 時間：兩個欄位互斥（completionTime 用於 COMPLETION；start/end 用於 TIME_SLOT）
    @Column(name = "completion_time")
    private LocalDateTime completionTime;

    @Column(name = "performance_start")
    private LocalDateTime performanceStart;

    @Column(name = "performance_end")
    private LocalDateTime performanceEnd;

    // 客戶資訊（不關聯到 User table，允許未登入預約）
    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;

    @Column(name = "customer_phone", nullable = false, length = 20)
    private String customerPhone;

    @Column(name = "customer_email", nullable = false, length = 100)
    private String customerEmail;

    @Column(name = "customer_notes", columnDefinition = "TEXT")
    private String customerNotes;

    // 付款與金額
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false, length = 20)
    private BookingPaymentMethod paymentMethod;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    // 狀態
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookingStatus status = BookingStatus.PENDING;

    // 時間戳記
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

---

### 3-5. `repository/BookingRepository.java`

```java
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingReference(String bookingReference);
    List<Booking> findByCustomerEmail(String email);
    List<Booking> findByStatus(BookingStatus status);
}
```

---

### 3-6. `dto/CreateBookingRequest.java`

```java
@Data
public class CreateBookingRequest {

    @NotBlank
    @Size(max = 200)
    private String serviceName;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal servicePrice;

    @Size(max = 100)
    private String performerName;  // nullable

    @NotNull
    private BookingType bookingType;

    private LocalDateTime completionTime;   // nullable

    private LocalDateTime performanceStart; // nullable

    private LocalDateTime performanceEnd;   // nullable

    @NotBlank
    @Size(max = 100)
    private String customerName;

    @NotBlank
    @Pattern(regexp = "^09\\d{8}$", message = "手機號碼格式不正確")
    private String customerPhone;

    @NotBlank
    @Email
    private String customerEmail;

    private String customerNotes;  // nullable

    @NotNull
    private BookingPaymentMethod paymentMethod;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal totalPrice;
}
```

---

### 3-7. `dto/BookingResponse.java`

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private String bookingReference;
    private BookingStatus status;
    private LocalDateTime createdAt;
}
```

---

### 3-8. `service/BookingService.java`

主要職責：
1. 生成 `bookingReference`：`"BP-" + System.currentTimeMillis() 後 8 碼`
2. 驗證時間欄位（COMPLETION 必須有 completionTime；TIME_SLOT 必須有 start/end）
3. 存入資料庫
4. 轉換成 `BookingResponse` 回傳

```java
@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    @Transactional
    public BookingResponse createBooking(CreateBookingRequest request) {
        // 時間驗證
        if (request.getBookingType() == BookingType.COMPLETION
                && request.getCompletionTime() == null) {
            throw new IllegalArgumentException("COMPLETION 類型必須提供 completionTime");
        }
        if (request.getBookingType() == BookingType.TIME_SLOT
                && (request.getPerformanceStart() == null || request.getPerformanceEnd() == null)) {
            throw new IllegalArgumentException("TIME_SLOT 類型必須提供 performanceStart 和 performanceEnd");
        }

        Booking booking = new Booking();
        booking.setBookingReference("BP-" + String.valueOf(System.currentTimeMillis()).substring(5));
        booking.setServiceName(request.getServiceName());
        booking.setServicePrice(request.getServicePrice());
        booking.setPerformerName(request.getPerformerName());
        booking.setBookingType(request.getBookingType());
        booking.setCompletionTime(request.getCompletionTime());
        booking.setPerformanceStart(request.getPerformanceStart());
        booking.setPerformanceEnd(request.getPerformanceEnd());
        booking.setCustomerName(request.getCustomerName());
        booking.setCustomerPhone(request.getCustomerPhone());
        booking.setCustomerEmail(request.getCustomerEmail());
        booking.setCustomerNotes(request.getCustomerNotes());
        booking.setPaymentMethod(request.getPaymentMethod());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setStatus(BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);
        return convertToResponse(saved);
    }

    @Transactional(readOnly = true)
    public BookingResponse getByReference(String reference) {
        Booking booking = bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new RuntimeException("預約不存在：" + reference));
        return convertToResponse(booking);
    }

    private BookingResponse convertToResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getBookingReference(),
                booking.getStatus(),
                booking.getCreatedAt()
        );
    }
}
```

---

### 3-9. `controller/BookingController.java`

端點清單：

| Method | URL | 說明 | 權限 |
|--------|-----|------|------|
| POST | `/api/bookings` | 建立預約 | 公開 |
| GET | `/api/bookings/{reference}` | 查詢預約（用編號） | 公開 |
| GET | `/api/bookings/admin/all` | 查所有預約 | ADMIN |
| PATCH | `/api/bookings/admin/{id}/status` | 更新狀態 | ADMIN |

```java
@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(
            @Valid @RequestBody CreateBookingRequest request) {
        BookingResponse response = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{reference}")
    public ResponseEntity<BookingResponse> getBookingByReference(
            @PathVariable String reference) {
        BookingResponse response = bookingService.getByReference(reference);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        // TODO: 實作管理員查詢
        return ResponseEntity.ok(List.of());
    }
}
```

---

### 3-10. SecurityConfig 修改

需要在 `SecurityConfig.java` 加上公開端點：

```java
.requestMatchers(HttpMethod.POST, "/api/bookings").permitAll()
.requestMatchers(HttpMethod.GET, "/api/bookings/*").permitAll()
```

---

## 四、資料庫 Schema

```sql
CREATE TABLE booking (
    id              BIGSERIAL PRIMARY KEY,
    booking_reference VARCHAR(20)    NOT NULL UNIQUE,
    service_name    VARCHAR(200)     NOT NULL,
    service_price   DECIMAL(10, 2)   NOT NULL,
    performer_name  VARCHAR(100),
    booking_type    VARCHAR(20)      NOT NULL,   -- COMPLETION | TIME_SLOT
    completion_time TIMESTAMP,
    performance_start TIMESTAMP,
    performance_end   TIMESTAMP,
    customer_name   VARCHAR(100)     NOT NULL,
    customer_phone  VARCHAR(20)      NOT NULL,
    customer_email  VARCHAR(100)     NOT NULL,
    customer_notes  TEXT,
    payment_method  VARCHAR(20)      NOT NULL,   -- ONLINE | ONSITE
    total_price     DECIMAL(10, 2)   NOT NULL,
    status          VARCHAR(20)      NOT NULL DEFAULT 'PENDING',
    created_at      TIMESTAMP        NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP        NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_booking_reference ON booking(booking_reference);
CREATE INDEX idx_booking_customer_email ON booking(customer_email);
CREATE INDEX idx_booking_status ON booking(status);
```

> JPA 的 `ddl-auto: update` 會自動建表，但 index 要手動或透過 `@Index` 在 Entity 上加。

---

## 五、Commit 切分計畫

依賴關係順序：

```
1. feat: add booking types and api types
   - types/booking.ts 新增兩個 interface

2. feat: add booking store reference state
   - stores/bookingStore.ts 新增 bookingReference 欄位

3. feat: add booking api client
   - lib/api/booking.ts 新增

4. feat: add booking success page
   - app/booking/success/ 整個目錄（page.tsx、BookingSuccess/）

5. feat: add booking status check page
   - app/booking/status/ 整個目錄（page.tsx、BookingStatusCheck/）

6. feat: wire confirm booking to api and success page
   - ConfirmBooking/index.tsx 修改（呼叫 API、redirect）
   - BookingLayoutContent/index.tsx 修改（隱藏 success/status 頁 StepIndicator）

後端（獨立 commit，可 revert 而不影響前端 mock）：
7. feat: add booking backend module
   - 所有 booking/ 下的 Java 檔案
   - SecurityConfig.java 修改
```

---

## 六、資料流程圖

```
用戶按「確認送出預約」
         ↓
ConfirmBooking.confirmBooking()
         ↓
lib/api/booking.ts → POST /api/bookings
         ↓
BookingController → BookingService.createBooking()
         ↓
生成 bookingReference（BP-XXXXXXXX）
存入 booking table，status = PENDING
         ↓
回傳 BookingResponse { bookingReference, ... }
         ↓
前端 setBookingReference(ref)
router.push('/booking/success')
         ↓
BookingSuccess 元件從 store 讀取 bookingReference
顯示成功畫面（真實編號）
```

---

## 七、注意事項

1. **服務快照**：`serviceName` / `servicePrice` 存成字串快照，不 FK 關聯商品表。原因：商品日後可能改名或下架，歷史預約必須保留當時的服務名稱與價格。

2. **未登入預約**：`customer_*` 欄位直接存入，不關聯 `user` 表。讓未登入用戶也能預約，後台透過 email 查詢。

3. **bookingReference 唯一性**：`System.currentTimeMillis()` 的後 8 碼在高併發下有碰撞風險。生產環境若有需要可改成 UUID 或加 DB sequence。目前規模不大，可先維持此設計。

4. **`/booking/success` 直接訪問**：`bookingReference` 存在 Zustand（in-memory），重新整理就消失。`BookingSuccess` 要判斷 `bookingReference === null` 時 redirect 回 `/booking/service`，避免空頁面。

5. **後端 CORS**：`SecurityConfig` 已有 CORS 設定，新增的 `/api/bookings` 路徑會自動被 CORS 規則覆蓋，不需另外設定。
