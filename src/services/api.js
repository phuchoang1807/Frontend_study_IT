import axiosClient from "../api/axiosClient";

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
  async bookmark(documentId) {
    const res = await axiosClient.post(`/bookmarks/${documentId}`);
    return unwrapApiResponse(res);
  },
  async unbookmark(documentId) {
    const res = await axiosClient.delete(`/bookmarks/${documentId}`);
    return unwrapApiResponse(res);
  },
  async getMyDocuments() {
    const res = await axiosClient.get("/my-documents");
    return unwrapApiResponse(res);
  },
  async createMyDocument(payload) {
    const res = await axiosClient.post("/my-documents", payload);
    return unwrapApiResponse(res);
  },
  async updateMyDocument(documentId, payload) {
    const res = await axiosClient.put(`/my-documents/${documentId}`, payload);
    return unwrapApiResponse(res);
  },
  async deleteMyDocument(documentId) {
    const res = await axiosClient.delete(`/my-documents/${documentId}`);
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

