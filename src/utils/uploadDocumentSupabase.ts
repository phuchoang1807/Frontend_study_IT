/**
 * Upload tài liệu (file + thumbnail) lên Supabase Storage — chỉ dùng cho luồng Upload Document.
 * Contributor / chứng chỉ vẫn dùng Cloudinary (uploadCloudinary.ts).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "documents";

let supabaseSingleton: SupabaseClient | null = null;

function getSupabaseForDocuments(): SupabaseClient {
  if (supabaseSingleton) return supabaseSingleton;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url?.trim() || !anonKey?.trim()) {
    throw new Error("Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY.");
  }

  supabaseSingleton = createClient(url.trim(), anonKey.trim());
  return supabaseSingleton;
}

function normalizeFolderPrefix(folder: string | undefined): string {
  if (!folder?.trim()) return "";
  return folder
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/\/+/g, "/");
}

function fileExtension(fileName: string): string {
  const i = fileName.lastIndexOf(".");
  if (i <= 0 || i === fileName.length - 1) return "";
  return fileName.slice(i);
}

export type UploadDocumentStorageResult = {
  url: string;
  fileName: string;
  path: string;
};

/**
 * @param folder Tiền tố trong bucket (vd. assets/UploadedDocuments)
 */
export async function uploadDocumentToSupabase(
  file: File,
  folder?: string
): Promise<UploadDocumentStorageResult> {
  const isDocument =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf") ||
    file.name.toLowerCase().endsWith(".docx") ||
    file.name.toLowerCase().endsWith(".pptx");

  const maxSize = isDocument ? 25 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${isDocument ? "25MB" : "10MB"} limit.`);
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  if (!allowedTypes.includes(file.type) && !isDocument) {
    throw new Error(
      "Invalid file type. Only JPG, PNG, WEBP, PDF, DOCX, and PPTX are allowed."
    );
  }

  const ext = fileExtension(file.name);
  const prefix = normalizeFolderPrefix(folder);
  const objectPath = prefix
    ? `${prefix}/${crypto.randomUUID()}${ext}`
    : `${crypto.randomUUID()}${ext}`;

  const supabase = getSupabaseForDocuments();
  const { error } = await supabase.storage.from(BUCKET).upload(objectPath, file, {
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) {
    console.error("Supabase Storage upload error:", error);
    throw new Error(error.message || "Upload failed");
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);

  return {
    url: data.publicUrl,
    fileName: file.name,
    path: objectPath,
  };
}
