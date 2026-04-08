import { useCallback, useMemo, useState } from "react";
import { useBookmarkSync } from "../context/BookmarkSyncContext";
import { useLoginRequired } from "../context/LoginRequiredModalContext";
import { useNotification } from "../context/NotificationContext";
import { documentService, getApiErrorMessage } from "../services/api";

export type UseDocumentBookmarkOptions = {
  /** Truyền vào `requestLogin` (mặc định: quay lại URL hiện tại sau đăng nhập) */
  redirectTo?: string | null;
};

export function useDocumentBookmark(
  documentId: string | null | undefined,
  serverIsBookmarked: boolean | null | undefined,
  options?: UseDocumentBookmarkOptions
) {
  const { resolveBookmarked, setBookmarkOverride } = useBookmarkSync();
  const requestLogin = useLoginRequired();
  const notification = useNotification();
  const [busy, setBusy] = useState(false);

  const resolved = useMemo(
    () => resolveBookmarked(documentId, serverIsBookmarked),
    [resolveBookmarked, documentId, serverIsBookmarked]
  );

  const toggle = useCallback(async () => {
    if (documentId == null || documentId === "") return;

    const loginOpts =
      options?.redirectTo != null && options.redirectTo !== ""
        ? { redirectTo: options.redirectTo }
        : {};
    if (!requestLogin(loginOpts)) return;

    const before = resolveBookmarked(documentId, serverIsBookmarked);
    const next = !before;
    setBookmarkOverride(documentId, next);
    setBusy(true);
    try {
      if (next) await documentService.bookmark(documentId);
      else await documentService.unbookmark(documentId);
    } catch (e) {
      setBookmarkOverride(documentId, before);
      notification.error(getApiErrorMessage(e));
    } finally {
      setBusy(false);
    }
  }, [
    documentId,
    serverIsBookmarked,
    resolveBookmarked,
    setBookmarkOverride,
    requestLogin,
    notification,
    options?.redirectTo,
  ]);

  return { resolved, toggle, busy };
}
