import type { SyntheticEvent } from "react";

export const DOCUMENT_DEFAULT_THUMBNAIL =
  "https://mtajyjavvyyxsicadbfj.supabase.co/storage/v1/object/public/documents/default-thumbnail.jpg";

export function normalizeDocumentThumbnailUrl(
  thumbnail: string | null | undefined
): string {
  if (thumbnail == null || String(thumbnail).trim() === "") {
    return DOCUMENT_DEFAULT_THUMBNAIL;
  }
  return String(thumbnail).trim();
}

type DocWithThumbnailFields = {
  thumbnail?: string | null;
  thumbnailUrl?: string | null;
};

/** Resolve display URL from API fields `thumbnail` and/or `thumbnailUrl`. */
export function getDocumentThumbnailUrl(
  doc: DocWithThumbnailFields | null | undefined
): string {
  const raw = doc?.thumbnail ?? doc?.thumbnailUrl;
  return normalizeDocumentThumbnailUrl(raw);
}

/** True when the document has a non-empty custom thumbnail (not default placeholder). */
export function hasDocumentThumbnailValue(
  thumbnail: string | null | undefined
): boolean {
  return thumbnail != null && String(thumbnail).trim() !== "";
}

export function onDocumentThumbnailError(
  e: SyntheticEvent<HTMLImageElement>
): void {
  const el = e.currentTarget;
  if (el.dataset.documentThumbFallback === "1") return;
  el.dataset.documentThumbFallback = "1";
  el.src = DOCUMENT_DEFAULT_THUMBNAIL;
}
