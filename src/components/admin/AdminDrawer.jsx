import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function AdminDrawer({ open, title, onClose, children, footer, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      <div className="admin-drawer-backdrop" aria-hidden onClick={onClose} />
      <div
        className={`admin-drawer-panel${wide ? ' admin-drawer-panel--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-drawer-title"
      >
        <div className="admin-drawer-header">
          <h2 id="admin-drawer-title">{title}</h2>
          <button type="button" className="admin-drawer-close" onClick={onClose} aria-label="Đóng">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="admin-drawer-body">{children}</div>
        {footer ? <div className="admin-drawer-footer">{footer}</div> : null}
      </div>
    </>,
    document.body
  );
}
