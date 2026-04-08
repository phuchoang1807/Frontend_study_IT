import { Outlet } from "react-router-dom";
import { BookmarkSyncProvider } from "../context/BookmarkSyncContext";
import { LoginRequiredModalProvider } from "../context/LoginRequiredModalContext";

/**
 * Lớp bọc router: modal đăng nhập + đồng bộ trạng thái bookmark.
 */
export default function AppShell() {
  return (
    <LoginRequiredModalProvider>
      <BookmarkSyncProvider>
        <Outlet />
      </BookmarkSyncProvider>
    </LoginRequiredModalProvider>
  );
}
