import axiosClient from "../api/axiosClient";
import { getAccessToken } from "../api/tokenStorage";

function unwrapApiResponse(response) {
  const payload = response?.data;
  // Most endpoints follow { success, data, message, timestamp }
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }
  return payload;
}

function toErrorMessage(err) {
  return (
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong. Please try again."
  );
}

function parseFilenameFromContentDisposition(header) {
  if (!header || typeof header !== "string") return null;
  const star = /filename\*=\s*UTF-8''([^;\s]+)/i.exec(header);
  if (star?.[1]) {
    try {
      return decodeURIComponent(star[1].trim());
    } catch {
      return star[1].trim();
    }
  }
  const quoted = /filename\s*=\s*"((?:\\.|[^"\\])*)"/i.exec(header);
  if (quoted?.[1]) return quoted[1].replace(/\\(.)/g, "$1");
  const unquoted = /filename\s*=\s*([^;\s]+)/i.exec(header);
  if (unquoted?.[1]) return unquoted[1].replace(/^"|"$/g, "");
  return null;
}

function sanitizeDownloadBaseName(name) {
  const s = String(name || "download")
    .replace(/[/\\:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
  return s || "download";
}

/**
 * Tải file qua fetch (có Bearer nếu đang có token), trigger download trình duyệt, không mở tab mới.
 * @param {string} fileUrl
 * @param {string} [suggestedFileName]
 */
export async function downloadFileViaFetch(fileUrl, suggestedFileName) {
  const headers = {};
  const token = getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(fileUrl, { method: "GET", headers });

  if (!response.ok) {
    throw new Error(`Không tải được file (${response.status}).`);
  }

  const fromHeader = parseFilenameFromContentDisposition(
    response.headers.get("Content-Disposition")
  );
  const filename = (fromHeader || suggestedFileName || "").trim();

  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(objectUrl);
}

/** Gợi ý tên file: title + đuôi từ fileType (vd: pdf). */
export function buildDocumentDownloadName(title, fileTypeOrExtension) {
  const base = sanitizeDownloadBaseName(title);
  if (!fileTypeOrExtension) return base;
  const ext = String(fileTypeOrExtension).replace(/^\./, "").toLowerCase();
  if (!ext) return base;
  if (base.toLowerCase().endsWith(`.${ext}`)) return base;
  return `${base}.${ext}`;
}

export const homepageService = {
  async getStatistics() {
    const res = await axiosClient.get("/homepage/statistics");
    return unwrapApiResponse(res);
  },
  async getLatestDocuments(limit = 4) {
    const res = await axiosClient.get("/homepage/latest-documents", {
      params: { limit },
    });
    return unwrapApiResponse(res);
  },
  async getTrendingDocuments(limit = 5) {
    const res = await axiosClient.get("/homepage/trending-documents", {
      params: { limit },
    });
    return unwrapApiResponse(res);
  },
};

export const sidebarService = {
  async getCategories() {
    const res = await axiosClient.get("/categories");
    return unwrapApiResponse(res);
  },
  async getPopularTags() {
    const res = await axiosClient.get("/tags/popular");
    return unwrapApiResponse(res);
  },
};

export const documentService = {
  async getDocuments(params) {
    // openapi: tagIds is array, explode=true → ?tagIds=a&tagIds=b
    const res = await axiosClient.get("/documents", { params });
    return unwrapApiResponse(res);
  },
  async getDocumentById(documentId) {
    const res = await axiosClient.get(`/documents/${documentId}`);
    return unwrapApiResponse(res);
  },
  async view(documentId) {
    const res = await axiosClient.post(`/documents/${documentId}/view`);
    return unwrapApiResponse(res);
  },
  async download(documentId) {
    const res = await axiosClient.post(`/documents/${documentId}/download`);
    return unwrapApiResponse(res);
  },
  async getDocumentFileUrl(documentId) {
    const res = await axiosClient.get(`/documents/${documentId}/file`);
    return unwrapApiResponse(res);
  },
  async bookmark(documentId) {
    const res = await axiosClient.post(`/bookmarks/${documentId}`);
    return unwrapApiResponse(res);
  },
  async unbookmark(documentId) {
    const res = await axiosClient.delete(`/bookmarks/${documentId}`);
    return unwrapApiResponse(res);
  },
  async getMyBookmarks(page = 0, size = 10) {
    const res = await axiosClient.get("/bookmarks/me", {
      params: { page, size },
    });
    return unwrapApiResponse(res);
  },
};

// Base message (reusable): prompt auth then redirect
export function requireAuthOrPrompt({ isAuthenticated, navigate, redirectTo }) {
  if (isAuthenticated) return true;

  const goLogin = window.confirm(
    "Bạn cần đăng nhập để thực hiện thao tác này.\n\nNhấn OK để đi tới trang Đăng nhập."
  );
  if (goLogin) {
    const next = redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : "";
    navigate(`/login${next}`);
    return false;
  }

  const goSignUp = window.confirm(
    "Bạn chưa có tài khoản?\n\nNhấn OK để đi tới trang Đăng ký."
  );
  if (goSignUp) {
    const next = redirectTo ? `?next=${encodeURIComponent(redirectTo)}` : "";
    navigate(`/sign-up${next}`);
  }
  return false;
}

export function getApiErrorMessage(err) {
  return toErrorMessage(err);
}

