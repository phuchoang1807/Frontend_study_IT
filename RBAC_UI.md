# RBAC UI guide (frontend)

## 1. Permission & role helpers

- Dùng các helper trong `utils/permissionUtils.ts`:
  - `hasPermission(user, "USER_READ")`
  - `hasAnyPermission(user, ["USER_READ", "USER_WRITE"])`
  - `hasRole(user, "ADMIN")`

```ts
import { useAuth } from "./context/AuthContext";
import { hasPermission, hasAnyPermission, hasRole } from "./utils/permissionUtils";

function Example() {
  const { user } = useAuth();

  const canViewUser = hasPermission(user, "USER_READ");
  const canEditUser = hasPermission(user, "USER_WRITE");
  const isAdmin = hasRole(user, "ADMIN");

  return (
    <>
      {canViewUser && <button>View</button>}
      {canEditUser && <button>Edit</button>}
      {isAdmin && <button>Admin only</button>}
    </>
  );
}
```

## 2. Ví dụ trong Dashboard

- Quy ước từ BE (`RBAC_GUIDE.md`):
  - Permission: `"USER_READ"`, `"USER_WRITE"`, ...
- Trong `Dashboard.jsx`:
  - Nếu có `USER_READ` → show button **View**
  - Nếu có `USER_WRITE` → show button **Edit**

```ts
import { useAuth } from "../context/AuthContext";
import { hasPermission } from "../utils/permissionUtils";

const { user } = useAuth();

const canView = hasPermission(user, "USER_READ");
const canEdit = hasPermission(user, "USER_WRITE");

return (
  <>
    {canView && <button>View</button>}
    {canEdit && <button>Edit</button>}
  </>
);
```

## 3. Không hardcode logic nhiều nơi

- **Không** nên:
  - `if (user && user.permissions.includes("USER_READ"))` lặp lại ở nhiều component.
- **Nên**:
  - Luôn dùng `hasPermission` / `hasAnyPermission` / `hasRole`.

Điều này giúp:

- Dễ đổi cách check (ví dụ sau này permission có cấu trúc phức tạp hơn).
- Dễ test hơn (chỉ cần test các helper).

## 4. ProtectedRoute với permission

- `ProtectedRoute` đã support prop `requiredPermissions` (optional):

```jsx
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

// Chỉ cho phép user có USER_READ hoặc USER_WRITE vào Dashboard
{
  path: "/",
  element: (
    <ProtectedRoute requiredPermissions={["USER_READ", "USER_WRITE"]}>
      <Dashboard />
    </ProtectedRoute>
  ),
}
```

- Logic:
  - Nếu chưa login → redirect `/login`.
  - Nếu login nhưng **không có bất kỳ permission nào** trong `requiredPermissions`:
    - Render trang `403 Forbidden` đơn giản.

## 5. Hướng phát triển sau này (gợi ý)

- Có thể tạo một component `Can` nhỏ để tái sử dụng:

```tsx
import { useAuth } from "../context/AuthContext";
import { hasAnyPermission } from "../utils/permissionUtils";

type CanProps = {
  permissions: string[];
  children: React.ReactNode;
};

export function Can({ permissions, children }: CanProps) {
  const { user } = useAuth();
  if (!hasAnyPermission(user, permissions)) return null;
  return <>{children}</>;
}
```

- Sử dụng trong UI:

```tsx
<Can permissions={["USER_READ"]}>
  <button>View</button>
</Can>

<Can permissions={["USER_WRITE"]}>
  <button>Edit</button>
</Can>
```

- Ưu điểm:
  - Code UI rất sạch, không lặp lại điều kiện.
  - Tập trung toàn bộ RBAC UI vào 1 chỗ (helper + `Can`). 

