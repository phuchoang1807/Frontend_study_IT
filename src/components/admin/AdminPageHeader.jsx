import React from 'react';

/**
 * Header chung admin: title, mô tả tùy chọn, ô tìm kiếm, vùng actions (Create, …).
 */
export default function AdminPageHeader({
  title,
  description,
  searchPlaceholder = 'Tìm kiếm…',
  searchValue,
  onSearchChange,
  showSearch = true,
  actions,
}) {
  return (
    <header className="admin-page-header">
      <div className="admin-page-header__row">
        <div className="admin-page-header__title-block">
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
        <div className="admin-page-header__tools">
          {showSearch ? (
            <div className="admin-page-header__search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </div>
          ) : null}
          {actions}
        </div>
      </div>
    </header>
  );
}
