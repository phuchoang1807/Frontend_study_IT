import React from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import ContentModeratorTable from '../../components/admin/ContentModeratorTable';
import '../../styles/admin/adminDashboard.css';
import '../../styles/admin/adminComponents.css';

export default function ContentModeratorPage() {
  return (
    <main className="admin-main">
      <AdminPageHeader
        title="Yêu cầu đăng tải tài liệu"
        description="Quản lý và phê duyệt công khai tài liệu mới cho nền tảng."
        showSearch={false}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="admin-btn-secondary">Lọc</button>
            <button type="button" className="admin-btn-primary">Xuất dữ liệu</button>
          </div>
        }
      />

      <ContentModeratorTable />
    </main>
  );
}