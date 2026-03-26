# Permission UI Guide

## Muc dich
Su dung permission de an/hien UI theo quyen cua nguoi dung, tranh hien thi chuc nang khong duoc phep.

## Cach dung nhanh
Import helper:

```js
import { hasPermission } from "./src/utils/authStorage";
```

Kiem tra permission:

```js
hasPermission("document:manage");
```

## Quy tac ap dung
- Route guard (trang/luong dieu huong): dung `permissionUtils` (du lieu tu context `user`).
- UI nho (button/menu/item): dung `authStorage` (du lieu tu `localStorage`).

## Vi du thuc te
Hien button:

```jsx
{hasPermission("quiz:manage") && <button>Quan ly Quiz</button>}
```

An menu item:

```jsx
{hasPermission("history:document:view") && (
  <Link to="/view-history">Lich su Tai lieu da xem</Link>
)}
```

## UserPopup da bo sung
Trong `src/components/UserPopup.jsx`, cac menu item da duoc wrap dieu kien theo permission:
- Ho so ca nhan: `profile:view` OR `user:statistics:view`
- Ho so Contributor: `contributor:profile:view`
- Quan ly tai lieu: `document:manage`
- Quan ly Quiz: `quiz:manage`
- Tai lieu yeu thich: `bookmark:view`
- Lich su Quiz: `history:quiz:view`
- Lich su tai lieu: `history:document:view`
- Dang xuat: luon hien thi
