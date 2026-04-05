/** Nhãn + class badge cho user (chỉ map UI, không đổi API). */
export function getUserStatusUi(status) {
  const s = String(status || '').toUpperCase();
  if (s === 'ACTIVE' || s === 'ENABLED') {
    return { label: 'Hoạt động', pillClass: 'admin-status-pill admin-status-pill--active' };
  }
  if (s === 'LOCKED' || s === 'DISABLED' || s === 'BANNED') {
    return { label: 'Bị khóa', pillClass: 'admin-status-pill admin-status-pill--locked' };
  }
  return {
    label: status ? String(status) : '—',
    pillClass: 'admin-status-pill admin-status-pill--other',
  };
}

/** Category / Tag: active boolean → tiếng Việt + badge. */
export function getEntityActiveUi(active) {
  if (active) {
    return { label: 'Hoạt động', pillClass: 'admin-status-pill admin-status-pill--active' };
  }
  return {
    label: 'Ngừng sử dụng',
    pillClass: 'admin-status-pill admin-status-pill--inactive',
  };
}
