import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminDrawer from '../AdminDrawer';
import {
  createRole,
  getApiErrorMessage,
  getRole,
  updateRole,
} from '../../../api/roleApi';
import { useNotification } from '../../../context/NotificationContext';

export default function RoleDrawer({ open, mode, roleId, onClose, onSaved }) {
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const {
    data: roleDetail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ['admin-role', roleId],
    queryFn: () => getRole(roleId),
    enabled: open && mode === 'edit' && Boolean(roleId),
  });

  useEffect(() => {
    if (!open) return;
    if (mode === 'create') {
      setName('');
      setDescription('');
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open || mode !== 'edit' || !roleDetail) return;
    setName(roleDetail.name ?? '');
    setDescription(roleDetail.description ?? '');
  }, [open, mode, roleDetail]);

  const createMutation = useMutation({
    mutationFn: () => createRole({ name: name.trim(), description: description.trim() }),
    onSuccess: async () => {
      notification.success('Đã tạo vai trò.');
      await queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saveMutation = useMutation({
    mutationFn: () => updateRole(roleId, { name: name.trim(), description: description.trim() }),
    onSuccess: async () => {
      notification.success('Đã lưu vai trò.');
      await queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-role', roleId] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saving = createMutation.isPending || saveMutation.isPending;
  const title = mode === 'create' ? 'Tạo vai trò' : 'Sửa vai trò';

  const handleSubmit = () => {
    if (!name.trim()) {
      notification.error('Vui lòng nhập tên vai trò.');
      return;
    }
    if (mode === 'create') createMutation.mutate();
    else saveMutation.mutate();
  };

  const footer = (
    <>
      <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>
        Hủy
      </button>
      <button
        type="button"
        className="admin-btn-primary"
        onClick={handleSubmit}
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
        <div style={{ color: '#b42318', fontSize: 14 }}>Không tải được vai trò.</div>
      ) : null}

      {(mode === 'create' || (mode === 'edit' && roleDetail && !detailLoading)) && (
        <>
          <div className="admin-field">
            <label htmlFor="rd-name">Tên</label>
            <input
              id="rd-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
            />
          </div>
          <div className="admin-field admin-field--full">
            <label htmlFor="rd-desc">Mô tả</label>
            <textarea
              id="rd-desc"
              rows={4}
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
        </>
      )}
    </AdminDrawer>
  );
}
