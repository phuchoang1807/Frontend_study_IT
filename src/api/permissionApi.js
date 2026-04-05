import axiosClient from './axiosClient';

function pickData(res) {
  const b = res?.data;
  if (b && typeof b === 'object' && 'data' in b && b.data !== undefined) return b.data;
  return b;
}

export function mapPermission(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    id: String(raw.id ?? ''),
    name: raw.name ?? raw.code ?? raw.permission ?? '',
    description: raw.description ?? '',
    createdAt: raw.createdAt ?? raw.created_at ?? null,
  };
}

/**
 * GET /admin/permissions
 * Hỗ trợ page hoặc mảng phẳng.
 */
export async function listPermissions({ page = 0, size = 500, search = '' } = {}) {
  const params = { page, size };
  const q = search.trim();
  if (q) params.search = q;
  const res = await axiosClient.get('/admin/permissions', { params });
  const d = pickData(res);

  if (Array.isArray(d)) {
    return {
      items: d.map(mapPermission).filter(Boolean),
      total: d.length,
      page: 0,
      size: d.length,
    };
  }
  if (d?.content && Array.isArray(d.content)) {
    return {
      items: d.content.map(mapPermission).filter(Boolean),
      total: Number(d.totalElements ?? d.total ?? 0),
      page: Number(d.number ?? page),
      size: Number(d.size ?? size),
    };
  }
  if (Array.isArray(d?.items)) {
    return {
      items: d.items.map(mapPermission).filter(Boolean),
      total: Number(d.total ?? d.items.length),
      page: Number(d.page ?? page),
      size: Number(d.size ?? size),
    };
  }
  return { items: [], total: 0, page, size };
}
