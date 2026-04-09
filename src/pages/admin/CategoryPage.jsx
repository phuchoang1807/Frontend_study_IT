import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTableWrapper from '../../components/admin/AdminTableWrapper';
import AdminPagination from '../../components/admin/AdminPagination';
import CategoryDrawer from '../../components/admin/categories/CategoryDrawer';
import {
  getApiErrorMessage,
  listCategories,
  patchCategoryStatus,
} from '../../api/categoryApi';
import { useNotification } from '../../context/NotificationContext';
import { getEntityActiveUi } from '../../utils/adminStatusUi';
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

export default function CategoryPage() {
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('create');
  const [drawerId, setDrawerId] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['admin-categories', page, size, debouncedSearch],
    queryFn: () => listCategories({ page, size, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const statusMut = useMutation({
    mutationFn: ({ id, active }) => patchCategoryStatus(id, active),
    onSuccess: async (_, { active }) => {
      notification.success(active ? 'Đã bật danh mục.' : 'Đã tắt danh mục.');
      await queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const openCreate = () => {
    setDrawerMode('create');
    setDrawerId(null);
    setDrawerOpen(true);
  };

  const openEdit = (row) => {
    setDrawerMode('edit');
    setDrawerId(row.id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerId(null);
  };

  const toggleActive = (e, row) => {
    e.stopPropagation();
    statusMut.mutate({ id: row.id, active: !row.active });
  };

  const tableLoading = isLoading || isFetching;
  const empty = !tableLoading && items.length === 0;

  return (
    <main className="admin-main">
      <AdminPageHeader
        title="Danh mục"
        description="Quản lý danh mục tài liệu — chỉ bật/tắt, không xóa cứng."
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Tìm theo tên, slug…"
        actions={
          <button type="button" className="admin-btn-primary" onClick={openCreate}>
            + Tạo danh mục
          </button>
        }
      />

      {isError ? (
        <p style={{ color: '#b42318', marginBottom: 16 }}>{getApiErrorMessage(error)}</p>
      ) : null}

      <AdminTableWrapper
        loading={tableLoading}
        empty={empty}
        emptyTitle="Chưa có danh mục"
        emptyDescription={
          debouncedSearch
            ? 'Thử đổi từ khóa tìm kiếm.'
            : 'Tạo danh mục mới để bắt đầu.'
        }
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
              <th>Slug</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th style={{ minWidth: 160 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => {
              const st = getEntityActiveUi(c.active);
              return (
              <tr key={c.id} className="admin-table-row--clickable" onClick={() => openEdit(c)}>
                <td>{c.name || '—'}</td>
                <td>
                  <code style={{ fontSize: 13 }}>{c.slug || '—'}</code>
                </td>
                <td>
                  <span className={st.pillClass}>
                    <span aria-hidden>●</span> {st.label}
                  </span>
                </td>
                <td>{formatDate(c.createdAt)}</td>
                <td>
                  <div className="admin-table-actions" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="admin-btn-ghost" onClick={() => openEdit(c)}>
                      Sửa
                    </button>
                    <button
                      type="button"
                      className="admin-btn-ghost danger"
                      onClick={(e) => toggleActive(e, c)}
                      disabled={statusMut.isPending}
                    >
                      {c.active ? 'Tắt' : 'Bật'}
                    </button>
                  </div>
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </AdminTableWrapper>

      <CategoryDrawer
        open={drawerOpen}
        mode={drawerMode}
        categoryId={drawerId}
        onClose={closeDrawer}
        onSaved={() => queryClient.invalidateQueries({ queryKey: ['admin-categories'] })}
      />
    </main>
  );
}
