const STORAGE_KEY = "studyit_personal_documents";

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value) ?? fallback;
  } catch {
    return fallback;
  }
};

const inferFileType = (fileName = "", documentUrl = "") => {
  const lower = `${fileName} ${documentUrl}`.toLowerCase();
  if (lower.includes(".pdf")) return "PDF";
  if (lower.includes(".docx")) return "DOCX";
  if (lower.includes(".pptx")) return "PPTX";
  return "FILE";
};

const normalizeDocument = (document) => {
  const now = new Date().toISOString();

  return {
    id: document.id || `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: document.title || "",
    description: document.description || "",
    category: document.category || "",
    tags: Array.isArray(document.tags) ? document.tags : [],
    documentUrl: document.documentUrl || "",
    storagePath: document.storagePath || "",
    thumbnailUrl: document.thumbnailUrl || "",
    fileName: document.fileName || "",
    fileSize: document.fileSize || "0.0",
    fileType: document.fileType || inferFileType(document.fileName, document.documentUrl),
    uploadDate: document.uploadDate || new Date().toLocaleDateString("vi-VN"),
    status: document.status || "PENDING",
    views: Number(document.views ?? 0),
    downloads: Number(document.downloads ?? 0),
    createdAt: document.createdAt || now,
    updatedAt: now,
  };
};

export const getPersonalDocuments = () => {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = safeJsonParse(raw, []);

  if (!Array.isArray(parsed)) return [];

  return parsed
    .map(normalizeDocument)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const savePersonalDocuments = (documents) => {
  if (typeof window === "undefined") return [];

  const normalized = documents.map(normalizeDocument);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
};

export const upsertPersonalDocument = (document) => {
  const currentDocuments = getPersonalDocuments();
  const normalizedDocument = normalizeDocument(document);
  const nextDocuments = currentDocuments.filter((item) => item.id !== normalizedDocument.id);
  nextDocuments.unshift(normalizedDocument);
  savePersonalDocuments(nextDocuments);
  return normalizedDocument;
};

export const deletePersonalDocument = (documentId) => {
  const currentDocuments = getPersonalDocuments();
  const nextDocuments = currentDocuments.filter((item) => item.id !== documentId);
  savePersonalDocuments(nextDocuments);
  return nextDocuments;
};
