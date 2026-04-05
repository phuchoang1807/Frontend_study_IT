import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AdminDrawer from '../AdminDrawer';
import { listPermissions } from '../../../api/permissionApi';
import {
  deleteRolePermissions,
  getApiErrorMessage,
  getRolePermissions,
  postRolePermissions,
} from '../../../api/roleApi';
import { useNotification } from '../../../context/NotificationContext';

function permKey(id) {
  return String(id ?? '');
}

export default function RolePermissionsDrawer({ open, roleId, roleName, onClose, onSaved }) {
  const notification = useNotification();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(() => new Set());
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const hydratedAssigned = useRef(false);

  const {
    data: assignedIds,
    isLoading: assignedLoading,
    isSuccess: assignedSuccess,
  } = useQuery({
    queryKey: ['admin-role-permissions', roleId],
    queryFn: () => getRolePermissions(roleId),
    enabled: open && Boolean(roleId),
  });

  const { data: permData, isLoading: permLoading } = useQuery({
    queryKey: ['admin-permissions', 'all-for-roles'],
    queryFn: () => listPermissions({ page: 0, size: 2000 }),
    enabled: open,
    staleTime: 2 * 60 * 1000,
  });

  const allPermissions = permData?.items ?? [];

  useEffect(() => {
    if (!open) {
      hydratedAssigned.current = false;
      return;
    }
    if (assignedLoading || !assignedSuccess || !Array.isArray(assignedIds)) return;
    if (hydratedAssigned.current) return;
    hydratedAssigned.current = true;
    setSelected(new Set(assignedIds.map((id) => permKey(id)).filter(Boolean)));
  }, [open, assignedLoading, assignedSuccess, assignedIds]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const fresh = await getRolePermissions(roleId);
      const baseline = new Set(fresh.map((id) => permKey(id)).filter(Boolean));
      const sel = selectedRef.current;
      const toRemove = [...baseline].filter((id) => !sel.has(id));
      const toAdd = [...sel].filter((id) => !baseline.has(id));
      await deleteRolePermissions(roleId, toRemove);
      await postRolePermissions(roleId, toAdd);
    },
    onSuccess: async () => {
      notification.success('Đã cập nhật quyền.');
      await queryClient.invalidateQueries({ queryKey: ['admin-role-permissions', roleId] });
      await queryClient.invalidateQueries({ queryKey: ['admin-role', roleId] });
      await queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      onSaved?.();
      onClose?.();
    },
    onError: (e) => notification.error(getApiErrorMessage(e)),
  });

  const loading = assignedLoading || permLoading;
  const saving = saveMutation.isPending;

  const toggle = (id) => {
    const k = permKey(id);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(allPermissions.map((p) => permKey(p.id)).filter(Boolean)));
  };

  const clearAll = () => {
    setSelected(new Set());
  };

  const footer = (
    <>
      <button type="button" className="admin-btn-secondary" onClick={onClose} disabled={saving}>
        Hủy
      </button>
      <button
        type="button"
        className="admin-btn-primary"
        onClick={() => saveMutation.mutate()}
        disabled={saving || loading}
      >
        Lưu
      </button>
    </>
  );

  const title = roleName ? `Phân quyền — ${roleName}` : 'Phân quyền';

  return (
    <AdminDrawer open={open} title={title} onClose={onClose} footer={footer} wide>
      {loading ? (
        <div style={{ padding: '32px 0', textAlign: 'center', color: '#667085' }}>Đang tải…</div>
      ) : (
        <div className="admin-perm-drawer-body">
          <div className="admin-perm-drawer-toolbar">
            <button type="button" className="admin-btn-secondary" onClick={selectAll} disabled={saving}>
              Chọn tất cả
            </button>
            <button type="button" className="admin-btn-secondary" onClick={clearAll} disabled={saving}>
              Bỏ chọn tất cả
            </button>
          </div>
          <div className="admin-perm-drawer-list" role="group" aria-label="Danh sách quyền">
            {allPermissions.length === 0 ? (
              <div className="admin-field__hint" style={{ padding: '16px 14px' }}>
                Không có quyền nào (GET /admin/permissions).
              </div>
            ) : (
              allPermissions.map((p) => {
                const id = permKey(p.id);
                return (
                  <label key={id} className="admin-perm-drawer-row">
                    <input
                      type="checkbox"
                      checked={selected.has(id)}
                      onChange={() => toggle(p.id)}
                      disabled={saving}
                    />
                    <span className="admin-perm-drawer-row__text">
                      <span className="admin-perm-drawer-row__name">{p.name || id}</span>
                      {p.description ? (
                        <span className="admin-perm-drawer-row__desc">{p.description}</span>
                      ) : null}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      )}
    </AdminDrawer>
  );
}
