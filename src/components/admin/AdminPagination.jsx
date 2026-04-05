import React from 'react';

export default function AdminPagination({
  page,
  size,
  total,
  onPageChange,
  onSizeChange,
  sizeOptions = [10, 20, 50],
}) {
  const totalPages = Math.max(1, Math.ceil(total / size) || 1);
  const current = Math.min(page, totalPages - 1);
  const from = total === 0 ? 0 : current * size + 1;
  const to = Math.min((current + 1) * size, total);

  return (
    <div className="admin-pagination">
      <span className="admin-pagination__meta">
        {total === 0 ? '0 kết quả' : `Hiển thị ${from}–${to} / ${total}`}
      </span>
      <div className="admin-pagination__controls">
        <label htmlFor="admin-page-size" className="admin-pagination__meta">
          Số dòng
        </label>
        <select
          id="admin-page-size"
          className="admin-pagination__select"
          value={size}
          onChange={(e) => onSizeChange?.(Number(e.target.value))}
        >
          {sizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="admin-page-btn"
          disabled={current <= 0}
          onClick={() => onPageChange?.(current - 1)}
          aria-label="Trang trước"
        >
          ‹
        </button>
        <span className="admin-pagination__meta">
          {current + 1} / {totalPages}
        </span>
        <button
          type="button"
          className="admin-page-btn"
          disabled={current >= totalPages - 1}
          onClick={() => onPageChange?.(current + 1)}
          aria-label="Trang sau"
        >
          ›
        </button>
      </div>
    </div>
  );
}
