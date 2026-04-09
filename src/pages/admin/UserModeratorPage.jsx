import React from 'react';
import AdminLayout from '../../layouts/admin/AdminLayout';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

const UserModeratorPage = () => {
  return (
    <AdminLayout>
      <div className="admin-page-content">
        <AdminPageHeader
          title="Quản lý Người dùng"
          description="Xem xét và quản lý các yêu cầu liên quan đến người dùng."
        />
        {/* Placeholder for User Moderator specific content */}
        <p>This is the User Moderator Page.</p>
      </div>
    </AdminLayout>
  );
};

export default UserModeratorPage;
