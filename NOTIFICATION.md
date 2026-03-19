# Hướng dẫn sử dụng component thông báo (Notification / Toast)

Component thông báo dùng chung cho toàn project: hiển thị pop-up **thành công** (màu xanh lá, dấu ✅) hoặc **lỗi** (màu đỏ, dấu ⚠️). Toast xuất hiện **dưới màn hình, chính giữa**. Tự ẩn sau vài giây hoặc đóng bằng nút. Lưu ý: tại form đăng ký/đăng nhập, lỗi từ API hoặc lỗi nhập liệu được hiển thị **ngay trên form** (màu đỏ), không dùng pop-up.

## Cách dùng

### 1. Import

Component đã được gắn toàn cục qua `NotificationProvider` trong `App.jsx`. Ở bất kỳ component con nào (nằm trong cây `NotificationProvider`), chỉ cần gọi hook:

```js
import { useNotification } from "../context/NotificationContext";
```

Nếu file nằm trong `src/pages/...`:

```js
import { useNotification } from "../../context/NotificationContext";
```

### 2. Gọi thông báo thành công (màu xanh, ✅)

```js
function MyComponent() {
  const notification = useNotification();

  const handleSuccess = () => {
    notification.success("Operation completed successfully!");
  };

  return <button onClick={handleSuccess}>Gửi</button>;
}
```

### 3. Gọi thông báo lỗi (màu đỏ, ⚠️)

```js
function MyComponent() {
  const notification = useNotification();

  const handleError = () => {
    notification.error("Something went wrong. Please try again.");
  };

  return <button onClick={handleError}>Thử</button>;
}
```

### 4. Ví dụ trong form đăng ký

```js
import { useNotification } from "../../context/NotificationContext";

export default function SignUp() {
  const notification = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notification.error("Passwords do not match.");
      return;
    }
    try {
      await registerApi({ email, password, fullName });
      notification.success("Account created successfully. Please sign in.");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Registration failed.";
      notification.error(msg);
    }
  };

  return (/* form JSX */);
}
```

### 5. Ví dụ trong form đăng nhập

```js
import { useNotification } from "../../context/NotificationContext";

export default function SignIn() {
  const notification = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password, rememberMe });
      notification.success("Login successful.");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Login failed.";
      notification.error(msg);
    }
  };

  return (/* form JSX */);
}
```

## API hook `useNotification()`

| Phương thức | Mô tả |
|-------------|--------|
| `notification.success(message)` | Show success toast (green, ✅). |
| `notification.error(message)`   | Show error toast (red, ⚠️). |
| `notification.clear()`          | Hide toast immediately (toast auto-hides after ~4 seconds). |

- `message`: string shown in the toast (e.g. from API: `err?.response?.data?.message`).

## Notes

- Toast appears at the bottom center of the screen and does not block interaction.
- Use the hook in your component; no need to render the Notification component (it is already rendered in `NotificationProvider`).
- Reusable for any screen: sign up, sign in, forgot password, settings, etc.
