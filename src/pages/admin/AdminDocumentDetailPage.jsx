import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminConfirmDialog from '../../components/admin/AdminConfirmDialog';
import {
  getAdminDocumentDetail,
  getApiErrorMessage,
  patchDocumentStatus,
} from '../../api/adminDocumentApi';
import { useNotification } from '../../context/NotificationContext';
import { getDocumentThumbnailUrl, onDocumentThumbnailError } from '../../utils/documentThumbnail';
import { getDocumentPreviewMode } from '../../utils/documentPreview';
import '../../styles/admin/adminDashboard.css';
import '../../styles/admin/adminComponents.css';

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

function DocumentPreview({ fileUrl, fileType, fileName }) {
  const mode = useMemo(
    () => getDocumentPreviewMode(fileType, fileUrl, fileName),
    [fileType, fileUrl, fileName]
  );

  if (!fileUrl?.trim()) {
    return (
      <div className="admin-doc-detail-preview-empty">
        <p>Không có URL file để xem trước.</p>
      </div>
    );
  }

  const iframeStyle = {
    width: '100%',
    height: 700,
    border: '1px solid #eaecf0',
    borderRadius: 8,
    background: '#f9fafb',
  };

  if (mode === 'pdf') {
    return (
      <iframe title="Xem trước PDF" src={fileUrl} style={iframeStyle} />
    );
  }

  if (mode === 'image') {
    return (
      <div className="admin-doc-detail-preview-image-wrap">
        <img
          src={fileUrl}
          alt="Xem trước"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, display: 'block' }}
        />
      </div>
    );
  }

  if (mode === 'gview') {
    const viewerSrc = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    return (
      <iframe title="Xem trước Office" src={viewerSrc} style={iframeStyle} />
    );
  }

  return (
    <div className="admin-doc-detail-preview-empty">
      <p style={{ marginBottom: 16, color: '#667085' }}>
        Không xem trước trực tiếp loại file này. Mở file trong tab mới (URL công khai Supabase).
      </p>
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="admin-btn-primary"
        style={{ display: 'inline-block', textDecoration: 'none' }}
      >
        Mở file
      </a>
    </div>
  );
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
        <h3>Từ chối tài liệu</h3>
        <p style={{ color: '#667085', fontSize: 14, marginTop: 8 }}>
          Nhập lý do từ chối (bắt buộc).
        </p>
        <textarea
          className="form-textarea"
          style={{ width: '100%', minHeight: 100, marginTop: 12, boxSizing: 'border-box' }}
          placeholder="Lý do…"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
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

function statusBadgeClass(status) {
  const s = (status || '').toUpperCase();
  if (s === 'APPROVED') return 'status-approved';
  if (s === 'REJECTED') return 'status-rejected';
  return 'status-pending';
}

function statusLabel(status) {
  const s = (status || '').toUpperCase();
  if (s === 'APPROVED') return 'Đã duyệt';
  if (s === 'REJECTED') return 'Đã từ chối';
  if (s === 'PENDING') return 'Chờ duyệt';
  return status || '—';
}

export default function AdminDocumentDetailPage() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const notification = useNotification();
  const queryClient = useQueryClient();

  const [approveOpen, setApproveOpen] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const {
    data: detail,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['admin-document-detail', documentId],
    queryFn: () => getAdminDocumentDetail(documentId),
    enabled: Boolean(documentId),
  });

  const invalidateAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['admin-document-detail', documentId] });
    await queryClient.invalidateQueries({ queryKey: ['admin-pending-documents'] });
  }, [queryClient, documentId]);

  const isPending = (detail?.status || '').toUpperCase() === 'PENDING';

  const thumbSrc = useMemo(
    () => getDocumentThumbnailUrl({ thumbnailUrl: detail?.thumbnailUrl }),
    [detail?.thumbnailUrl]
  );

  const confirmApprove = async () => {
    if (!documentId) return;
    try {
      setApproveLoading(true);
      await patchDocumentStatus(documentId, { status: 'APPROVED' });
      notification.success('Đã phê duyệt tài liệu.');
      setApproveOpen(false);
      await invalidateAll();
      navigate('/admin/documents/pending');
    } catch (e) {
      notification.error(getApiErrorMessage(e));
    } finally {
      setApproveLoading(false);
    }
  };

  const confirmReject = async (reason) => {
    if (!documentId) return;
    try {
      setRejectLoading(true);
      await patchDocumentStatus(documentId, { status: 'REJECTED', rejectReason: reason });
      notification.success('Đã từ chối tài liệu.');
      setRejectOpen(false);
      await invalidateAll();
      navigate('/admin/documents/pending');
    } catch (e) {
      notification.error(getApiErrorMessage(e));
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <main className="admin-main">
      <AdminPageHeader
        title={detail?.title || 'Chi tiết tài liệu'}
        description={documentId ? `ID: ${documentId}` : '—'}
        showSearch={false}
        actions={
          <Link to="/admin/documents/pending" className="admin-btn-secondary" style={{ textDecoration: 'none' }}>
            ← Danh sách chờ duyệt
          </Link>
        }
      />

      {isLoading ? (
        <div className="admin-table-card" style={{ padding: 24 }}>
          <p style={{ margin: 0, color: '#667085' }}>Đang tải…</p>
        </div>
      ) : null}

      {isError ? (
        <div className="admin-table-card" style={{ padding: 24 }}>
          <p style={{ color: '#b42318', margin: 0 }}>{getApiErrorMessage(error)}</p>
          <button type="button" className="admin-btn-secondary" style={{ marginTop: 12 }} onClick={() => refetch()}>
            Thử lại
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && detail ? (
        <>
          <div
            className="admin-doc-detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 340px)',
              gap: 24,
              alignItems: 'start',
            }}
          >
            <div className="admin-table-card" style={{ padding: 20, minHeight: 200 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>Xem trước</h3>
              <DocumentPreview
                fileUrl={detail.fileUrl}
                fileType={detail.fileType}
                fileName={detail.fileName}
              />
            </div>

            <aside className="admin-table-card" style={{ padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <img
                  src={thumbSrc}
                  alt=""
                  onError={onDocumentThumbnailError}
                  style={{
                    width: '100%',
                    maxHeight: 160,
                    objectFit: 'cover',
                    borderRadius: 8,
                    background: '#f2f4f7',
                  }}
                />
              </div>
              <h2 style={{ margin: '0 0 12px', fontSize: 18, lineHeight: 1.3 }}>{detail.title}</h2>
              <p style={{ margin: '0 0 12px', color: '#667085', fontSize: 14, whiteSpace: 'pre-wrap' }}>
                {detail.description?.trim() ? detail.description : '—'}
              </p>
              <dl style={{ margin: 0, fontSize: 14 }}>
                <div style={{ marginBottom: 10 }}>
                  <dt style={{ color: '#667085', marginBottom: 4 }}>Tác giả</dt>
                  <dd style={{ margin: 0 }}>{detail.authorName?.trim() || '—'}</dd>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <dt style={{ color: '#667085', marginBottom: 4 }}>Danh mục</dt>
                  <dd style={{ margin: 0 }}>{detail.categoryName?.trim() || '—'}</dd>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <dt style={{ color: '#667085', marginBottom: 4 }}>Trạng thái</dt>
                  <dd style={{ margin: 0 }}>
                    <span className={`status-badge ${statusBadgeClass(detail.status)}`}>
                      {statusLabel(detail.status)}
                    </span>
                  </dd>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <dt style={{ color: '#667085', marginBottom: 4 }}>Loại file</dt>
                  <dd style={{ margin: 0 }}>{detail.fileType || '—'}</dd>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <dt style={{ color: '#667085', marginBottom: 4 }}>Ngày gửi</dt>
                  <dd style={{ margin: 0 }}>{formatDateTime(detail.createdAt)}</dd>
                </div>
                {detail.rejectReason?.trim() ? (
                  <div style={{ marginBottom: 10 }}>
                    <dt style={{ color: '#667085', marginBottom: 4 }}>Lý do từ chối</dt>
                    <dd style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{detail.rejectReason}</dd>
                  </div>
                ) : null}
                {detail.storagePath && !/^https?:\/\//i.test(detail.storagePath) ? (
                  <div style={{ marginBottom: 0 }}>
                    <dt style={{ color: '#667085', marginBottom: 4 }}>Storage path</dt>
                    <dd style={{ margin: 0, wordBreak: 'break-all', fontSize: 12 }}>{detail.storagePath}</dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>

          {isPending ? (
            <div
              className="admin-table-card"
              style={{
                marginTop: 24,
                padding: 20,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 600, marginRight: 8 }}>Thao tác duyệt</span>
              <button type="button" className="admin-btn-primary" onClick={() => setApproveOpen(true)}>
                Phê duyệt
              </button>
              <button type="button" className="admin-btn-danger" onClick={() => setRejectOpen(true)}>
                Từ chối
              </button>
            </div>
          ) : null}
        </>
      ) : null}

      <AdminConfirmDialog
        open={approveOpen}
        title="Phê duyệt tài liệu"
        message={detail ? `Phê duyệt "${detail.title}"?` : ''}
        confirmLabel="Phê duyệt"
        loading={approveLoading}
        onCancel={() => !approveLoading && setApproveOpen(false)}
        onConfirm={confirmApprove}
      />

      <RejectReasonModal
        open={rejectOpen}
        loading={rejectLoading}
        onCancel={() => !rejectLoading && setRejectOpen(false)}
        onConfirm={confirmReject}
      />

      <style>{`
        @media (max-width: 960px) {
          .admin-doc-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
