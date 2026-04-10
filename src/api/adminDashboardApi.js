import axiosClient from './axiosClient';

function pickData(res) {
  const b = res?.data;
  if (b && typeof b === 'object' && 'data' in b && b.data !== undefined) return b.data;
  return b;
}

/** GET /admin/dashboard — chỉ ROLE_ADMIN (backend PreAuthorize). */
export async function getAdminDashboard() {
  const res = await axiosClient.get('/admin/dashboard');
  return pickData(res);
}
