import axiosClient from './axiosClient';

/**
 * GET /menus/me (baseURL đã là …/api)
 */
export async function getMyMenus() {
  const res = await axiosClient.get('/menus/me');
  const body = res.data;

  if (body && typeof body === 'object' && Array.isArray(body.data)) {
    return body.data;
  }
  if (Array.isArray(body)) {
    return body;
  }
  return [];
}
