import React from 'react';

/**
 * Khối bảng: loading overlay, empty state, vùng footer (pagination).
 */
export default function AdminTableWrapper({
  loading = false,
  empty = false,
  emptyTitle = 'Không có dữ liệu',
  emptyDescription,
  footer,
  children,
}) {
  return (
    <div className="admin-table-card">
      {loading ? (
        <div className="admin-table-card__loading" aria-busy="true" aria-label="Đang tải">
          <div className="admin-table-spinner" />
        </div>
      ) : null}
      {empty ? (
        <div className="admin-table-empty">
          <h3>{emptyTitle}</h3>
          {emptyDescription ? <p>{emptyDescription}</p> : null}
        </div>
      ) : (
        children
      )}
      {!empty && footer}
    </div>
  );
}
