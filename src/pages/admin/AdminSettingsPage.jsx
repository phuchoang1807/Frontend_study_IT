import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import '../../styles/admin/adminDashboard.css';
import '../../styles/admin/adminComponents.css';

export default function AdminSettingsPage() {
  return (
    <main className="admin-main">
      <AdminPageHeader
        title="Cài đặt"
        description="Thiết lập hệ thống quản trị"
        showSearch={false}
      />

      <section className="admin-settings-empty" aria-live="polite">
        <div className="admin-settings-empty__icon" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <h2 className="admin-settings-empty__title">Tính năng sẽ phát triển sau</h2>
        <p className="admin-settings-empty__text">
          Trang cài đặt đang được lên kế hoạch. Các tùy chọn cấu hình hệ thống sẽ được bổ sung trong các phiên bản tới.
        </p>
      </section>
    </main>
  );
}
