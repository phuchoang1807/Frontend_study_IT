# Logout usage guide

## Khi có nút Logout trong UI

- Import hook auth:
  - `import { useAuth } from "./context/AuthContext";`
- Trong component:
  - Gọi `const { logout, loading } = useAuth();`
  - Gắn vào nút:
    - `<button onClick={logout} disabled={loading}>Logout</button>`
- Hàm `logout()` sẽ:
  - Gọi API `POST /auth/logout` qua `authApi.logout()`
  - Xóa accessToken + refreshToken ở client
  - Clear state user trong context

