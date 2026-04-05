import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminDrawer from '../AdminDrawer';
import {
  createCategory,
  getApiErrorMessage,
  getCategory,
  listCategories,
  updateCategory,
} from '../../../api/categoryApi';
import { useNotification } from '../../../context/NotificationContext';

export default function CategoryDrawer({ open, mode, categoryId, onClose, onSaved }) {
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);

  const { data: parentOptionsData } = useQuery({
    queryKey: ['admin-categories', 'options'],
    queryFn: () => listCategories({ page: 0, size: 500, search: '' }),
    enabled: open,
    staleTime: 60 * 1000,
  });

  const parentOptions = useMemo(() => {
    const items = parentOptionsData?.items ?? [];
    if (mode === 'edit' && categoryId) {
      return items.filter((c) => c.id !== categoryId);
    }
    return items;
  }, [parentOptionsData?.items, mode, categoryId]);

  const {
    data: detail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ['admin-category', categoryId],
    queryFn: () => getCategory(categoryId),
    enabled: open && mode === 'edit' && Boolean(categoryId),
  });

  useEffect(() => {
    if (!open) return;
    if (mode === 'create') {
      setName('');
      setSlug('');
      setDescription('');
      setParentId('');
      setDisplayOrder(0);
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open || mode !== 'edit' || !detail) return;
    setName(detail.name ?? '');
    setSlug(detail.slug ?? '');
    setDescription(detail.description ?? '');
    setParentId(detail.parentId ?? '');
    setDisplayOrder(Number(detail.displayOrder) || 0);
  }, [open, mode, detail]);

  const createMut = useMutation({
    mutationFn: () =>
      createCategory({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        parentId: parentId || null,
        displayOrder,
      }),
    onSuccess: async () => {
      notification.success('Đã tạo danh mục.');
      await queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saveMut = useMutation({
    mutationFn: () =>
      updateCategory(categoryId, {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        parentId: parentId || null,
        displayOrder,
      }),
    onSuccess: async () => {
      notification.success('Đã lưu danh mục.');
      await queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-category', categoryId] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saving = createMut.isPending || saveMut.isPending;
  const title = mode === 'create' ? 'Tạo danh mục' : 'Sửa danh mục';

  const submit = () => {
    if (!name.trim() || !slug.trim()) {
      notification.error('Vui lòng nhập tên và slug.');
      return;
    }
    if (mode === 'create') createMut.mutate();
    else saveMut.mutate();
  };

  const footer = (
    <>
      <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>
        Hủy
      </button>
      <button
        type="button"
        className="admin-btn-primary"
        onClick={submit}
        disabled={saving || (mode === 'edit' && detailLoading)}
      >
        Lưu
      </button>
    </>
  );

  return (
    <AdminDrawer open={open} title={title} onClose={onClose} footer={footer}>
      {mode === 'edit' && detailLoading ? (
        <div style={{ padding: '24px 0', textAlign: 'center', color: '#667085' }}>Đang tải…</div>
      ) : null}
      {mode === 'edit' && detailError ? (
        <div style={{ color: '#b42318', fontSize: 14 }}>Không tải được danh mục.</div>
      ) : null}

      {(mode === 'create' || (mode === 'edit' && detail && !detailLoading)) && (
        <>
          <div className="admin-field">
            <label htmlFor="cd-name">Tên</label>
            <input id="cd-name" value={name} onChange={(e) => setName(e.target.value)} disabled={saving} />
          </div>
          <div className="admin-field">
            <label htmlFor="cd-slug">Slug</label>
            <input id="cd-slug" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={saving} />
          </div>
          <div className="admin-field admin-field--full">
            <label htmlFor="cd-desc">Mô tả</label>
            <textarea
              id="cd-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={saving}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '10px 12px',
                border: '1px solid #d0d5dd',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="cd-parent">Danh mục cha</label>
            <select
              id="cd-parent"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              disabled={saving}
            >
              <option value="">— Gốc (không có cha) —</option>
              {parentOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || c.slug || c.id}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label htmlFor="cd-order">Thứ tự hiển thị</label>
            <input
              id="cd-order"
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
              disabled={saving}
            />
          </div>
        </>
      )}
    </AdminDrawer>
  );
}
