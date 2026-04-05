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

export function mapCategory(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const parent = raw.parent;
  const parentId = raw.parentId ?? parent?.id;
  const pid = parentId != null && parentId !== '' ? String(parentId) : '';
  const pname = raw.parentName ?? parent?.name ?? '';
  return {
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    slug: raw.slug ?? '',
    description: raw.description ?? '',
    displayOrder: Number(raw.displayOrder ?? raw.display_order ?? 0),
    active: toBoolActive(raw),
    createdAt: raw.createdAt ?? raw.created_at ?? null,
    parentId: pid,
    parentName: pname,
  };
}

export async function listCategories({ page = 0, size = 10, search = '' } = {}) {
  const params = { page, size };
  const q = search.trim();
  if (q) params.search = q;
  const res = await axiosClient.get('/admin/categories', { params });
  const d = pickData(res);

  if (Array.isArray(d)) {
    return {
      items: d.map(mapCategory).filter(Boolean),
      total: d.length,
      page: 0,
      size: d.length,
    };
  }
  if (d?.content && Array.isArray(d.content)) {
    return {
      items: d.content.map(mapCategory).filter(Boolean),
      total: Number(d.totalElements ?? d.total ?? 0),
      page: Number(d.number ?? page),
      size: Number(d.size ?? size),
    };
  }
  if (Array.isArray(d?.items)) {
    return {
      items: d.items.map(mapCategory).filter(Boolean),
      total: Number(d.total ?? d.items.length),
      page: Number(d.page ?? page),
      size: Number(d.size ?? size),
    };
  }
  return { items: [], total: 0, page, size };
}

export async function getCategory(id) {
  const res = await axiosClient.get(`/admin/categories/${id}`);
  return mapCategory(pickData(res));
}

export async function createCategory({ name, slug, description, parentId, displayOrder }) {
  const res = await axiosClient.post('/admin/categories', {
    name,
    slug,
    description: description ?? '',
    parentId: parentId || null,
    displayOrder: Number(displayOrder) || 0,
  });
  const raw = pickData(res);
  return mapCategory(raw) ?? mapCategory({ id: raw?.id, name, slug, description, parentId, displayOrder });
}

export async function updateCategory(id, { name, slug, description, parentId, displayOrder }) {
  const res = await axiosClient.put(`/admin/categories/${id}`, {
    name,
    slug,
    description: description ?? '',
    parentId: parentId || null,
    displayOrder: Number(displayOrder) || 0,
  });
  const raw = pickData(res);
  return mapCategory(raw) ?? mapCategory({ id, name, slug, description, parentId, displayOrder });
}

/** PATCH /admin/categories/{id}/status — { active: boolean } */
export async function patchCategoryStatus(id, active) {
  await axiosClient.patch(`/admin/categories/${id}/status`, { active });
}
