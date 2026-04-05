import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminDrawer from '../AdminDrawer';
import {
  assignUserRoles,
  createUser,
  getApiErrorMessage,
  getUser,
  listAssignableRoles,
  removeUserRole,
  updateUser,
} from '../../../api/userApi';
import { useNotification } from '../../../context/NotificationContext';

function defaultRoleIdFromUser(userDetail, roleOptions) {
  if (!userDetail) return '';
  const ids = userDetail.roleIds;
  if (Array.isArray(ids) && ids[0]) return String(ids[0]);
  const labels = userDetail.roles;
  if (Array.isArray(labels) && labels[0] && roleOptions.length) {
    const match = roleOptions.find((o) => o.label === labels[0]);
    return match?.id ?? '';
  }
  return '';
}

export default function UserDrawer({ open, mode, userId, onClose, onSaved }) {
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [createRoleId, setCreateRoleId] = useState('');
  const [editRoleId, setEditRoleId] = useState('');

  const { data: roleOptions = [], isFetched: rolesFetched } = useQuery({
    queryKey: ['admin-assignable-roles'],
    queryFn: listAssignableRoles,
    staleTime: 5 * 60 * 1000,
    enabled: open,
  });

  const {
    data: userDetail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery({
    queryKey: ['admin-user', userId],
    queryFn: () => getUser(userId),
    enabled: open && mode === 'edit' && Boolean(userId),
  });

  useEffect(() => {
    if (!open) return;
    if (mode === 'create') {
      setEmail('');
      setPassword('');
      setFullName('');
      setCreateRoleId('');
    }
  }, [open, mode]);

  useEffect(() => {
    if (!open || mode !== 'edit' || !userDetail) return;
    setFullName(userDetail.fullName ?? '');
    setEmail(userDetail.email ?? '');
    setEditRoleId(defaultRoleIdFromUser(userDetail, roleOptions));
  }, [open, mode, userDetail, roleOptions]);

  const createMutation = useMutation({
    mutationFn: async () => {
      const created = await createUser({ email: email.trim(), password, fullName: fullName.trim() });
      if (!created?.id) throw new Error('Tạo user thất bại: thiếu id trả về.');
      if (createRoleId) {
        await assignUserRoles(created.id, createRoleId);
      }
      return created;
    },
    onSuccess: async () => {
      notification.success('Đã tạo người dùng.');
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const saveEditMutation = useMutation({
    mutationFn: async () => {
      await updateUser(userId, {
        fullName: fullName.trim(),
        email: email.trim(),
      });
      const previousIds = Array.isArray(userDetail?.roleIds) ? userDetail.roleIds : [];
      const uniquePrevious = [...new Set(previousIds.map(String).filter(Boolean))];
      for (const rid of uniquePrevious) {
        await removeUserRole(userId, rid);
      }
      if (editRoleId) {
        await assignUserRoles(userId, editRoleId);
      }
    },
    onSuccess: async () => {
      notification.success('Đã lưu thay đổi.');
      await queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-user', userId] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const title = mode === 'create' ? 'Tạo người dùng' : 'Chi tiết người dùng';

  const saving = createMutation.isPending || saveEditMutation.isPending;

  const rolesHint = useMemo(() => {
    if (!open || !rolesFetched) return null;
    if (roleOptions.length === 0) {
      return 'Không tải được danh sách vai trò (GET /admin/roles). Bạn vẫn có thể lưu họ tên và email.';
    }
    return null;
  }, [open, rolesFetched, roleOptions.length]);

  const handleSubmit = () => {
    if (mode === 'create') {
      if (!email.trim() || !password || !fullName.trim()) {
        notification.error('Vui lòng nhập email, mật khẩu và họ tên.');
        return;
      }
      createMutation.mutate();
      return;
    }
    saveEditMutation.mutate();
  };

  const currentRoleValue = mode === 'create' ? createRoleId : editRoleId;
  const setCurrentRoleValue = mode === 'create' ? setCreateRoleId : setEditRoleId;
  const selectId = mode === 'create' ? 'ud-role-create' : 'ud-role-edit';

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
        {mode === 'create' ? 'Tạo' : 'Lưu'}
      </button>
    </>
  );

  return (
    <AdminDrawer open={open} title={title} onClose={onClose} footer={footer}>
      {mode === 'edit' && detailLoading ? (
        <div style={{ padding: '24px 0', textAlign: 'center', color: '#667085' }}>Đang tải…</div>
      ) : null}
      {mode === 'edit' && detailError ? (
        <div style={{ color: '#b42318', fontSize: 14 }}>Không tải được người dùng.</div>
      ) : null}

      {(mode === 'create' || (mode === 'edit' && userDetail && !detailLoading)) && (
        <>
          <div className="admin-field">
            <label htmlFor="ud-email">Email</label>
            <input
              id="ud-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={saving}
            />
          </div>

          {mode === 'create' ? (
            <div className="admin-field">
              <label htmlFor="ud-password">Mật khẩu</label>
              <input
                id="ud-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={saving}
              />
            </div>
          ) : null}

          <div className="admin-field">
            <label htmlFor="ud-fullname">Họ và tên</label>
            <input
              id="ud-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="admin-field admin-field--full">
            <label htmlFor={selectId}>Vai trò</label>
            <select
              id={selectId}
              value={currentRoleValue}
              onChange={(e) => setCurrentRoleValue(e.target.value)}
              disabled={saving || roleOptions.length === 0}
            >
              <option value="">— Không gán —</option>
              {roleOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
            {rolesHint ? <p className="admin-field__hint">{rolesHint}</p> : null}
          </div>
        </>
      )}
    </AdminDrawer>
  );
}
