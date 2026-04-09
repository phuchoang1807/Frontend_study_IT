import { Outlet } from "react-router-dom";
import { BookmarkSyncProvider } from "../context/BookmarkSyncContext";
import { LoginRequiredModalProvider } from "../context/LoginRequiredModalContext";
import ScrollToTop from "../routes/ScrollToTop";
/**
 * Lớp bọc router: modal đăng nhập + đồng bộ trạng thái bookmark.
 */
export default function AppShell() {
  return (
    <LoginRequiredModalProvider>
      <BookmarkSyncProvider>
        <ScrollToTop />

        <Outlet />
      </BookmarkSyncProvider>
    </LoginRequiredModalProvider>
  );
}
