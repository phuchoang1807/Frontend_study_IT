import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminTableWrapper from '../../components/admin/AdminTableWrapper';
import AdminPagination from '../../components/admin/AdminPagination';
import AdminConfirmDialog from '../../components/admin/AdminConfirmDialog';
import {
  getApiErrorMessage,
  getPendingDocuments,
  patchDocumentStatus,
} from '../../api/adminDocumentApi';
import { useNotification } from '../../context/NotificationContext';
import { getDocumentThumbnailUrl, onDocumentThumbnailError } from '../../utils/documentThumbnail';
import '../../styles/admin/adminDashboard.css';
import '../../styles/admin/adminComponents.css';

const PAGE_SIZE = 10;

function formatDateTime(value) {
  if (value == null) return '—';
  try {
    let d;
    if (Array.isArray(value)) {
      const [y, mo, day, h = 0, mi = 0, s = 0] = value;
      d = new Date(y, mo - 1, day, h, mi, s);
    } else {
      d = new Date(value);
    }
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return '—';
  }
}

function RejectReasonModal({ open, loading, onConfirm, onCancel }) {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (open) setReason('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const submit = () => {
    const t = reason.trim();
    if (!t) return;
    onConfirm?.(t);
  };

  return createPortal(
    <div className="admin-confirm-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="admin-confirm-dialog"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 440 }}
      >
        <h3 id="reject-modal-title">Từ chối tài liệu</h3>
        <p style={{ color: '#667085', fontSize: 14, marginTop: 8 }}>
          Vui lòng nhập lý do từ chối (bắt buộc).
        </p>
        <textarea
          className="form-textarea"
          style={{ width: '100%', minHeight: 100, marginTop: 12, boxSizing: 'border-box' }}
          placeholder="Nhập lý do..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
          aria-labelledby="reject-modal-title"
        />
        <div className="admin-confirm-dialog__actions" style={{ marginTop: 16 }}>
          <button type="button" className="admin-btn-secondary" onClick={onCancel} disabled={loading}>
            Hủy
          </button>
          <button
            type="button"
            className="admin-btn-danger"
            onClick={submit}
            disabled={loading || !reason.trim()}
          >
            Xác nhận từ chối
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function ContentModeratorPage() {
  const navigate = useNavigate();
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [size] = useState(PAGE_SIZE);

  const [approveTarget, setApproveTarget] = useState(null);
  const [approveLoading, setApproveLoading] = useState(false);

  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectLoading, setRejectLoading] = useState(false);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['admin-pending-documents', page, size],
    queryFn: () => getPendingDocuments(page, size),
    placeholderData: (prev) => prev,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (total === 0 && page > 0) setPage(0);
  }, [total, page, isLoading, isFetching]);

  const empty = useMemo(() => !isLoading && items.length === 0, [isLoading, items.length]);

  const invalidateList = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['admin-pending-documents'] });
  }, [queryClient]);

  const handleApproveClick = (doc) => {
    setApproveTarget(doc);
  };

  const confirmApprove = async () => {
    if (!approveTarget?.id) return;
    try {
      setApproveLoading(true);
      await patchDocumentStatus(approveTarget.id, { status: 'APPROVED' });
      notification.success('Đã phê duyệt tài liệu.');
      setApproveTarget(null);
      await invalidateList();
    } catch (e) {
      notification.error(getApiErrorMessage(e));
    } finally {
      setApproveLoading(false);
    }
  };

  const openReject = (doc) => {
    setRejectTarget(doc);
    setRejectOpen(true);
  };

  const confirmReject = async (reason) => {
    if (!rejectTarget?.id) return;
    try {
      setRejectLoading(true);
      await patchDocumentStatus(rejectTarget.id, {
        status: 'REJECTED',
        rejectReason: reason,
      });
      notification.success('Đã từ chối tài liệu.');
      setRejectOpen(false);
      setRejectTarget(null);
      await invalidateList();
    } catch (e) {
      notification.error(getApiErrorMessage(e));
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <main className="admin-main">
      <AdminPageHeader
        title="Tài liệu chờ duyệt"
        description="Danh sách tài liệu trạng thái PENDING — kiểm duyệt trước khi công khai."
        showSearch={false}
      />

      {isError ? (
        <div className="admin-table-card" style={{ padding: 24 }}>
          <p style={{ color: '#b42318', margin: 0 }}>{getApiErrorMessage(error)}</p>
          <button type="button" className="admin-btn-secondary" style={{ marginTop: 12 }} onClick={() => refetch()}>
            Thử lại
          </button>
        </div>
      ) : null}

      <AdminTableWrapper
        loading={isLoading && !data}
        empty={empty && !isError}
        emptyTitle="Không có tài liệu chờ duyệt"
        emptyDescription="Khi người dùng đăng tải tài liệu mới, bản ghi PENDING sẽ xuất hiện tại đây."
        footer={
          <AdminPagination
            page={page}
            size={size}
            total={total}
            onPageChange={setPage}
            onSizeChange={() => {}}
            sizeOptions={[PAGE_SIZE]}
          />
        }
      >
        <table className="admin-table">
            <thead>
              <tr>
                <th>ẢNH</th>
                <th>TÀI LIỆU</th>
                <th>TÁC GIẢ</th>
                <th>DANH MỤC</th>
                <th>NGÀY GỬI</th>
                <th>LOẠI FILE</th>
                <th>TRẠNG THÁI</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {items.map((doc) => {
                const thumbSrc = getDocumentThumbnailUrl({
                  thumbnailUrl: doc.thumbnailUrl,
                });
                const author =
                  doc.authorName?.trim() ||
                  doc.author?.fullName ||
                  doc.createdByName ||
                  '—';
                const category = doc.categoryName || doc.category || '—';
                return (
                  <tr key={doc.id}>
                    <td style={{ width: 72 }}>
                      <img
                        src={thumbSrc}
                        alt=""
                        onError={onDocumentThumbnailError}
                        style={{
                          width: 56,
                          height: 56,
                          objectFit: 'cover',
                          borderRadius: 8,
                          background: '#f2f4f7',
                        }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{doc.title || '—'}</div>
                      {doc.fileName ? (
                        <small style={{ color: '#667085' }}>{doc.fileName}</small>
                      ) : null}
                    </td>
                    <td>{author}</td>
                    <td>{category}</td>
                    <td>{formatDateTime(doc.uploadDate)}</td>
                    <td>{doc.fileType || '—'}</td>
                    <td>
                      <span className="status-badge status-pending">PENDING</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        <button
                          type="button"
                          className="admin-btn-ghost"
                          onClick={() => navigate(`/admin/documents/${doc.id}`)}
                        >
                          Xem chi tiết
                        </button>
                        <button
                          type="button"
                          className="admin-btn-primary"
                          style={{ fontSize: 12, padding: '6px 10px' }}
                          disabled={isFetching}
                          onClick={() => handleApproveClick(doc)}
                        >
                          Duyệt
                        </button>
                        <button
                          type="button"
                          className="admin-btn-danger"
                          style={{ fontSize: 12, padding: '6px 10px' }}
                          disabled={isFetching}
                          onClick={() => openReject(doc)}
                        >
                          Từ chối
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </AdminTableWrapper>

      <AdminConfirmDialog
        open={Boolean(approveTarget)}
        title="Phê duyệt tài liệu"
        message={
          approveTarget
            ? `Bạn có chắc muốn phê duyệt "${approveTarget.title}"?`
            : ''
        }
        confirmLabel="Phê duyệt"
        loading={approveLoading}
        onCancel={() => !approveLoading && setApproveTarget(null)}
        onConfirm={confirmApprove}
      />

      <RejectReasonModal
        open={rejectOpen}
        loading={rejectLoading}
        onCancel={() => !rejectLoading && setRejectOpen(false)}
        onConfirm={confirmReject}
      />
    </main>
  );
}
