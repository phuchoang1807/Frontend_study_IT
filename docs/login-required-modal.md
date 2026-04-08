# Login required modal (`LoginRequiredModal`)

Popup tái sử dụng khi thao tác cần đăng nhập. Style khớp phần user (Inter, slate, nút primary `#007bff`).

## Kiến trúc

- **`LoginRequiredModalProvider`**: bọc toàn bộ router (trong `AppShell`), dùng `useAuth` + `useNavigate` + `useLocation`.
- **`LoginRequiredModal`**: UI overlay, nút Đăng nhập / link Đăng ký, nút đóng (X), đóng bằng Escape hoặc click nền mờ.
- **`useLoginRequired()`**: trả về hàm `requestLogin(options?)`.

## Cách dùng hook

```tsx
import { useLoginRequired } from "../context/LoginRequiredModalContext";

function MyComponent() {
  const requestLogin = useLoginRequired();
  const location = useLocation();

  async function onProtectedAction() {
    if (!requestLogin({ redirectTo: location.pathname + location.search })) {
      return; // đã mở modal
    }
    // user đã đăng nhập — tiếp tục (gọi API, v.v.)
  }
}
```

### `requestLogin(options?)`

- Trả về **`true`**: đã đăng nhập — tiếp tục flow.
- Trả về **`false`**: chưa đăng nhập — modal đã mở, **dừng** handler (đừng gọi API).

### Options

| Field         | Ý nghĩa |
|---------------|---------|
| `redirectTo`  | URL ghép vào `?next=` khi chuyển tới `/login` hoặc `/sign-up`. Nếu bỏ qua, mặc định là **trang hiện tại** (`pathname` + `search`). |

## Ví dụ: nút tải xuống

Đã tích hợp trong `DocumentsList.jsx` và `DocumentDetail.jsx`: trước khi `POST .../download` và fetch file, gọi `requestLogin({ redirectTo: ... })`; chỉ khi `true` mới chạy tiếp.

## Ví dụ: hành động khác cần login

```tsx
const requestLogin = useLoginRequired();

function handleBookmark() {
  if (!requestLogin({ redirectTo: "/favorite-documents" })) return;
  void bookmarkApi.add(...);
}
```

## Bookmark (cùng modal đăng nhập)

Lưu tài liệu dùng **`useDocumentBookmark`** (`src/hooks/useDocumentBookmark.ts`): hook này gọi `useLoginRequired` bên trong — nếu chưa đăng nhập thì mở **LoginRequiredModal**, **không** gọi API bookmark.

UI dùng chung:

- **`BookmarkButton`** (`src/components/common/BookmarkButton.jsx`): chỉ hiển thị icon (xám / primary `#007BFF`) + `onToggle`.
- **`DocumentBookmarkControl`**: gói `BookmarkButton` + `useDocumentBookmark` + gọi `documentService.bookmark` / `unbookmark`.

Trạng thái đã lưu được **đồng bộ giữa các trang** nhờ `BookmarkSyncProvider` trong `AppShell` (override theo `documentId` sau khi toggle; khi logout sẽ xóa override).

## Lưu ý

- Hook **phải** dùng bên trong `LoginRequiredModalProvider` (mọi route đã bọc qua `AppShell`).
- `requireAuthOrPrompt` trong `services/api.js` (confirm trình duyệt) vẫn tồn tại cho chỗ chưa chuyển sang modal; bookmark / download đã chuyển sang modal và hook.
