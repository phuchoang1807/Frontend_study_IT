import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminDrawer from '../AdminDrawer';
import { createTag, getApiErrorMessage, getTag, updateTag } from '../../../api/tagApi';
import { useNotification } from '../../../context/NotificationContext';

export default function TagDrawer({ open, mode, tagId, onClose, onSaved }) {
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const {
    data: detail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ['admin-tag', tagId],
    queryFn: () => getTag(tagId),
    enabled: open && mode === 'edit' && Boolean(tagId),
  });

  useEffect(() => {
    if (!open) return;
    if (mode === 'create') {
      setName('');
      setSlug('');
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open || mode !== 'edit' || !detail) return;
    setName(detail.name ?? '');
    setSlug(detail.slug ?? '');
  }, [open, mode, detail]);

  const createMut = useMutation({
    mutationFn: () => createTag({ name: name.trim(), slug: slug.trim() }),
    onSuccess: async () => {
      notification.success('Đã tạo thẻ.');
      await queryClient.invalidateQueries({ queryKey: ['admin-tags'] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saveMut = useMutation({
    mutationFn: () => updateTag(tagId, { name: name.trim(), slug: slug.trim() }),
    onSuccess: async () => {
      notification.success('Đã lưu thẻ.');
      await queryClient.invalidateQueries({ queryKey: ['admin-tags'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-tag', tagId] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saving = createMut.isPending || saveMut.isPending;
  const title = mode === 'create' ? 'Tạo thẻ' : 'Sửa thẻ';

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
        <div style={{ color: '#b42318', fontSize: 14 }}>Không tải được thẻ.</div>
      ) : null}

      {(mode === 'create' || (mode === 'edit' && detail && !detailLoading)) && (
        <>
          <div className="admin-field">
            <label htmlFor="td-name">Tên</label>
            <input id="td-name" value={name} onChange={(e) => setName(e.target.value)} disabled={saving} />
          </div>
          <div className="admin-field">
            <label htmlFor="td-slug">Slug</label>
            <input id="td-slug" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={saving} />
          </div>
        </>
      )}
    </AdminDrawer>
  );
}
