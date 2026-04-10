import axiosClient from './axiosClient';
import { getApiErrorMessage } from './roleApi';

export { getApiErrorMessage };

function pickData(res) {
  const b = res?.data;
  if (b && typeof b === 'object' && 'data' in b && b.data !== undefined) return b.data;
  return b;
}

/**
 * @param {number} page 0-based
 * @param {number} size
 */
export async function getPendingDocuments(page = 0, size = 10) {
  const res = await axiosClient.get('/admin/documents/pending', {
    params: { page, size },
  });
  const d = pickData(res) || {};
  return {
    items: Array.isArray(d.content) ? d.content : [],
    page: typeof d.page === 'number' ? d.page : page,
    size: typeof d.size === 'number' ? d.size : size,
    total: typeof d.totalElements === 'number' ? d.totalElements : 0,
    totalPages: typeof d.totalPages === 'number' ? d.totalPages : 0,
  };
}

/**
 * @param {string} documentId
 * @param {{ status: 'APPROVED' | 'REJECTED', rejectReason?: string }} body
 */
export async function patchDocumentStatus(documentId, body) {
  const res = await axiosClient.patch(
    `/admin/documents/${documentId}/status`,
    body
  );
  return pickData(res);
}

/**
 * @param {string} documentId
 */
export async function getAdminDocumentDetail(documentId) {
  const res = await axiosClient.get(`/admin/documents/${documentId}`);
  return pickData(res);
}
