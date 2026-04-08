import BookmarkButton from "./BookmarkButton";
import { useDocumentBookmark } from "../../hooks/useDocumentBookmark";

/**
 * Bookmark có đồng bộ global + login modal + API (bookmark/unbookmark).
 *
 * @param {string} documentId
 * @param {boolean} [serverIsBookmarked] — từ API (card/list); detail có thể bỏ qua
 * @param {string} [redirectTo] — query `next` sau đăng nhập
 * @param {number} [size] — kích thước icon BookmarkButton
 * @param {boolean} [stopPropagation]
 * @param {string} [className]
 */
export default function DocumentBookmarkControl({
  documentId,
  serverIsBookmarked,
  redirectTo,
  size,
  stopPropagation = true,
  className,
}) {
  const { resolved, toggle, busy } = useDocumentBookmark(
    documentId,
    serverIsBookmarked,
    { redirectTo }
  );

  if (!documentId) return null;

  return (
    <BookmarkButton
      className={className}
      isBookmarked={resolved}
      onToggle={() => {
        void toggle();
      }}
      size={size}
      stopPropagation={stopPropagation}
      disabled={busy}
    />
  );
}
