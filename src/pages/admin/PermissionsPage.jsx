import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTableWrapper from '../../components/admin/AdminTableWrapper';
import AdminPagination from '../../components/admin/AdminPagination';
import { listPermissions } from '../../api/permissionApi';
import { getApiErrorMessage } from '../../api/roleApi';
import '../../styles/admin/adminDashboard.css';
import '../../styles/admin/adminComponents.css';

function formatDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return '—';
  }
}

export default function PermissionsPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['admin-permissions', page, size],
    queryFn: () => listPermissions({ page, size }),
    placeholderData: (prev) => prev,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const tableLoading = isLoading || isFetching;
  const empty = !tableLoading && items.length === 0;

  return (
    <main className="admin-main">
      <AdminPageHeader
        title="Quyền"
        description="Danh sách quyền trong hệ thống (chỉ xem)."
        showSearch={false}
        actions={null}
      />

      {isError ? (
        <p style={{ color: '#b42318', marginBottom: 16 }}>{getApiErrorMessage(error)}</p>
      ) : null}

      <AdminTableWrapper
        loading={tableLoading}
        empty={empty}
        emptyTitle="Chưa có quyền"
        emptyDescription="Không có dữ liệu từ API."
        footer={
          <AdminPagination
            page={page}
            size={size}
            total={total}
            onPageChange={setPage}
            onSizeChange={(next) => {
              setSize(next);
              setPage(0);
            }}
          />
        }
      >
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>
                  <code style={{ fontSize: 13 }}>{p.name || '—'}</code>
                </td>
                <td style={{ color: '#667085' }}>{p.description || '—'}</td>
                <td>{formatDate(p.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTableWrapper>
    </main>
  );
}
