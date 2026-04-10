/**
 * Tên hiển thị của người đăng tài liệu (user gắn với document.userId / created_by),
 * không phải tác giả nội dung hay tên trong bình luận.
 *
 * Ưu tiên: uploader / user populate từ API → uploaderName → authorName (legacy, khi BE map từ uploader).
 */
export function getDocumentUploaderDisplayName(doc) {
  if (!doc || typeof doc !== "object") return "";

  const uploader = doc.uploader;
  if (uploader && typeof uploader === "object") {
    const n = uploader.fullName ?? uploader.name;
    if (n != null && String(n).trim()) return String(n).trim();
  }

  const user = doc.user;
  if (user && typeof user === "object") {
    const n = user.fullName ?? user.name;
    if (n != null && String(n).trim()) return String(n).trim();
  }

  if (doc.uploaderName != null && String(doc.uploaderName).trim()) {
    return String(doc.uploaderName).trim();
  }

  if (doc.authorName != null && String(doc.authorName).trim()) {
    return String(doc.authorName).trim();
  }

  return "";
}

/** UUID người đăng (document.userId hoặc uploader.id). */
export function getDocumentUploaderUserId(doc) {
  if (!doc || typeof doc !== "object") return "";

  if (doc.userId != null && String(doc.userId).trim()) return String(doc.userId).trim();

  const uploader = doc.uploader;
  if (uploader && uploader.id != null && String(uploader.id).trim()) {
    return String(uploader.id).trim();
  }

  const user = doc.user;
  if (user && user.id != null && String(user.id).trim()) {
    return String(user.id).trim();
  }

  return "";
}
