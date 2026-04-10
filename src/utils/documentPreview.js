/**
 * Chọn kiểu preview file (PDF / ảnh / Google gview / fallback) — dùng URL công khai (Supabase).
 * @param {string | undefined} fileType enum name, ví dụ PDF, DOC
 * @param {string | undefined} fileUrl
 * @param {string | undefined} fileName
 * @returns {'pdf' | 'image' | 'gview' | 'fallback'}
 */
export function getDocumentPreviewMode(fileType, fileUrl, fileName) {
  const url = (fileUrl || "").toLowerCase();
  const name = (fileName || "").toLowerCase();
  const ft = (fileType || "").toUpperCase();

  const urlLooksImage = /\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(url);
  const nameLooksImage = /\.(png|jpe?g|webp|gif)$/i.test(name);
  const urlLooksPdf = /\.pdf(\?|#|$)/i.test(url);
  const nameLooksPdf = /\.pdf$/i.test(name);
  const officeName =
    /\.(doc|docx|ppt|pptx)(\?|#|$)/i.test(name) || /\.(doc|docx|ppt|pptx)(\?|#|$)/i.test(url);

  if (ft === "PDF" || urlLooksPdf || nameLooksPdf) return "pdf";
  if (urlLooksImage || nameLooksImage) return "image";
  if (ft === "DOC" || ft === "PPT" || officeName) return "gview";
  if (ft === "OTHER" && officeName) return "gview";

  return "fallback";
}
