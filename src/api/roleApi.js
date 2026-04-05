import axiosClient from './axiosClient';

function pickData(res) {
  const b = res?.data;
  if (b && typeof b === 'object' && 'data' in b && b.data !== undefined) return b.data;
  return b;
}

export function getApiErrorMessage(error) {
  const d = error?.response?.data;
  if (typeof d?.message === 'string') return d.message;
  if (Array.isArray(d?.message)) return d.message.join(', ');
  if (typeof error?.message === 'string') return error.message;
  return 'Đã xảy ra lỗi. Vui lòng thử lại.';
}

function extractPermissionIds(raw) {
  if (!raw || typeof raw !== 'object') return [];
  if (Array.isArray(raw.permissionIds)) {
    return raw.permissionIds.map(String).filter(Boolean);
  }
  if (!Array.isArray(raw.permissions)) return [];
  return raw.permissions
    .map((p) => (p && typeof p === 'object' && p.id != null ? String(p.id) : null))
    .filter(Boolean);
}

export function mapRole(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return {
    id: String(raw.id ?? ''),
    name: raw.name ?? '',
    description: raw.description ?? '',
    status: String(raw.status ?? 'ACTIVE').toUpperCase(),
    createdAt: raw.createdAt ?? raw.created_at ?? null,
    permissionIds: extractPermissionIds(raw),
  };
}

export async function listRoles({ page = 0, size = 10, search = '' } = {}) {
  const params = { page, size };
  const q = search.trim();
  if (q) params.search = q;
  const res = await axiosClient.get('/admin/roles', { params });
  const d = pickData(res);

  if (Array.isArray(d)) {
    return {
      items: d.map(mapRole).filter(Boolean),
      total: d.length,
      page: 0,
      size: d.length,
    };
  }
  if (d?.content && Array.isArray(d.content)) {
    return {
      items: d.content.map(mapRole).filter(Boolean),
      total: Number(d.totalElements ?? d.total ?? 0),
      page: Number(d.number ?? page),
      size: Number(d.size ?? size),
    };
  }
  if (Array.isArray(d?.items)) {
    return {
      items: d.items.map(mapRole).filter(Boolean),
      total: Number(d.total ?? d.items.length),
      page: Number(d.page ?? page),
      size: Number(d.size ?? size),
    };
  }
  return { items: [], total: 0, page, size };
}

export async function getRole(id) {
  const res = await axiosClient.get(`/admin/roles/${id}`);
  return mapRole(pickData(res));
}

/** Chuẩn hóa id quyền từ phần tử GET /admin/roles/{id}/permissions */
function permissionRowToId(p) {
  if (p == null) return null;
  if (typeof p === 'string' || typeof p === 'number') return String(p);
  if (typeof p === 'object') {
    if (p.id != null) return String(p.id);
    if (p.permissionId != null) return String(p.permissionId);
  }
  return null;
}

/** GET /admin/roles/{id}/permissions — trả về mảng id (UUID) đã gán */
export async function getRolePermissions(roleId) {
  const res = await axiosClient.get(`/admin/roles/${roleId}/permissions`);
  const d = pickData(res);
  const arr = Array.isArray(d) ? d : d?.content ?? d?.items ?? [];
  const ids = arr.map(permissionRowToId).filter(Boolean);
  return [...new Set(ids)];
}

export async function createRole({ name, description }) {
  const res = await axiosClient.post('/admin/roles', { name, description });
  const raw = pickData(res);
  return mapRole(raw) ?? mapRole({ id: raw?.id, name, description });
}

export async function updateRole(id, { name, description }) {
  const res = await axiosClient.put(`/admin/roles/${id}`, { name, description });
  const raw = pickData(res);
  return mapRole(raw) ?? mapRole({ id, name, description });
}

export async function patchRoleStatus(id, status) {
  const res = await axiosClient.patch(`/admin/roles/${id}/status`, { status });
  return pickData(res);
}

/** POST /admin/roles/{id}/permissions — body: { permissionIds: string[] } */
export async function postRolePermissions(roleId, permissionIds) {
  if (!permissionIds?.length) return;
  await axiosClient.post(`/admin/roles/${roleId}/permissions`, { permissionIds });
}

/** DELETE /admin/roles/{id}/permissions — body: { permissionIds: string[] } */
export async function deleteRolePermissions(roleId, permissionIds) {
  if (!permissionIds?.length) return;
  await axiosClient.delete(`/admin/roles/${roleId}/permissions`, {
    data: { permissionIds },
  });
}
