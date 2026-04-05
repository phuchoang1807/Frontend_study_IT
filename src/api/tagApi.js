import axiosClient from './axiosClient';
import { getApiErrorMessage } from './roleApi';

export { getApiErrorMessage };

function pickData(res) {
  const b = res?.data;
  if (b && typeof b === 'object' && 'data' in b && b.data !== undefined) return b.data;
  return b;
}

function toBoolActive(raw) {
  if (typeof raw.active === 'boolean') return raw.active;
  const s = String(raw.status ?? '').toUpperCase();
  if (s === 'ACTIVE' || s === 'ENABLED') return true;
  if (s === 'INACTIVE' || s === 'DISABLED') return false;
  return true;
}

export function mapTag(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const active = toBoolActive(raw);
  return {
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    slug: raw.slug ?? '',
    usageCount: Number(raw.usageCount ?? raw.usage_count ?? raw.documentCount ?? 0),
    active,
    createdAt: raw.createdAt ?? raw.created_at ?? null,
  };
}

export async function listTags({ page = 0, size = 10, search = '' } = {}) {
  const params = { page, size };
  const q = search.trim();
  if (q) params.search = q;
  const res = await axiosClient.get('/admin/tags', { params });
  const d = pickData(res);

  if (Array.isArray(d)) {
    return {
      items: d.map(mapTag).filter(Boolean),
      total: d.length,
      page: 0,
      size: d.length,
    };
  }
  if (d?.content && Array.isArray(d.content)) {
    return {
      items: d.content.map(mapTag).filter(Boolean),
      total: Number(d.totalElements ?? d.total ?? 0),
      page: Number(d.number ?? page),
      size: Number(d.size ?? size),
    };
  }
  if (Array.isArray(d?.items)) {
    return {
      items: d.items.map(mapTag).filter(Boolean),
      total: Number(d.total ?? d.items.length),
      page: Number(d.page ?? page),
      size: Number(d.size ?? size),
    };
  }
  return { items: [], total: 0, page, size };
}

export async function getTag(id) {
  const res = await axiosClient.get(`/admin/tags/${id}`);
  return mapTag(pickData(res));
}

export async function createTag({ name, slug }) {
  const res = await axiosClient.post('/admin/tags', { name, slug });
  const raw = pickData(res);
  return mapTag(raw) ?? mapTag({ id: raw?.id, name, slug });
}

export async function updateTag(id, { name, slug }) {
  const res = await axiosClient.put(`/admin/tags/${id}`, { name, slug });
  const raw = pickData(res);
  return mapTag(raw) ?? mapTag({ id, name, slug });
}

/** PATCH /admin/tags/{id}/status — { active: boolean } */
export async function patchTagStatus(id, active) {
  await axiosClient.patch(`/admin/tags/${id}/status`, { active });
}
