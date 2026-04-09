import React, { useState, useEffect } from 'react';
import '../../../styles/admin/contributorDetailModal.css';
import { ContributorRequestStatus } from '../../../constants/contributorStatus';
import axiosClient from '../../../api/axiosClient';
import {
  assignUserRoles,
  findAssignableRoleIdByName,
  getApiErrorMessage,
  getUser,
  listAssignableRoles,
  removeUserRole,
} from '../../../api/userApi';
import { useAuth } from '../../../context/AuthContext';

const ContributorDetailModal = ({ isOpen, onClose, contributor, onUpdateStatus }) => {
  const { user: currentUser, refreshUserProfile } = useAuth();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [approveBusy, setApproveBusy] = useState(false);

  useEffect(() => {
    if (isOpen && contributor) {
      setRejectReason(contributor.rejectionReason || '');
    }
  }, [isOpen, contributor]);

  if (!isOpen || !contributor) return null;

  const sendUpdateRequest = async (status, reason = null) => {
    try {
      const payload = {
        requestId: contributor.id,
        status: status,
        rejectionReason: reason,
      };
      await axiosClient.post(`/admin/contributor-requests/${contributor.id}/status`, payload);
      onUpdateStatus();
      handleClose();
    } catch (error) {
      console.error(`❌ Lỗi cập nhật trạng thái yêu cầu Contributor thành ${status}:`, error);
      alert(`Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại. Lỗi: ${getApiErrorMessage(error)}`);
    }
  };

  const approveContributor = async () => {
    const userId = contributor.userId != null ? String(contributor.userId) : '';
    if (!userId) {
      alert('Thiếu userId trên yêu cầu. Vui lòng làm mới trang hoặc kiểm tra API.');
      return;
    }

    setApproveBusy(true);
    try {
      const roleOptions = await listAssignableRoles();
      const userRoleId = findAssignableRoleIdByName(roleOptions, 'USER');
      const contributorRoleId = findAssignableRoleIdByName(roleOptions, 'CONTRIBUTOR');
      if (!userRoleId || !contributorRoleId) {
        throw new Error('Không tìm thấy role USER hoặc CONTRIBUTOR trong hệ thống.');
      }

      const detail = await getUser(userId);
      const hasUser =
        (Array.isArray(detail?.roleIds) && detail.roleIds.map(String).includes(String(userRoleId))) ||
        (Array.isArray(detail?.roles) &&
          detail.roles.some((r) => String(r).toUpperCase() === 'USER'));
      if (hasUser) {
        await removeUserRole(userId, userRoleId);
      }

      await assignUserRoles(userId, contributorRoleId);

      const payload = {
        requestId: contributor.id,
        status: ContributorRequestStatus.APPROVED,
        rejectionReason: null,
      };
      await axiosClient.post(`/admin/contributor-requests/${contributor.id}/status`, payload);
      if (currentUser?.id && String(currentUser.id) === userId) {
        await refreshUserProfile();
      }
      onUpdateStatus();
      handleClose();
    } catch (error) {
      console.error('❌ Lỗi phê duyệt contributor:', error);
      alert(`Phê duyệt thất bại: ${getApiErrorMessage(error)}`);
    } finally {
      setApproveBusy(false);
      setShowApproveModal(false);
    }
  };

  const handleOpenReject = () => {
    setRejectReason('');
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    const reason = rejectReason.trim();
    if (!reason) {
      return;
    }
    sendUpdateRequest(ContributorRequestStatus.REJECTED, reason);
    setShowRejectModal(false);
  };

  const handleOpenApprove = () => {
    setShowApproveModal(true);
  };

  const confirmApprove = () => {
    approveContributor();
  };

  const handleClose = () => {
    setShowRejectModal(false);
    setShowApproveModal(false);
    setRejectReason('');
    onClose();
  };

  const isActionable = contributor.statusKey === ContributorRequestStatus.PENDING;

  const showReasonInBanner =
    contributor.rejectionReason &&
    (contributor.statusKey === ContributorRequestStatus.REJECTED ||
      contributor.statusKey === ContributorRequestStatus.NEED_INFO);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title-group">
            <h4>CHI TIẾT YÊU CẦU CONTRIBUTOR</h4>
            <h2>{contributor.name}</h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="modal-body">
          <section className="profile-section">
            <div className="profile-img-container">
              <img src={contributor.avatar} alt={contributor.name} className="profile-img" />
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>HỌ TÊN</label>
                <p>{contributor.name}</p>
              </div>
              <div className="info-item">
                <label>EMAIL</label>
                <p>{contributor.email}</p>
              </div>
              <div className="info-item full-width">
                <label>LINK PORTFOLIO / WEBSITE</label>
                <p className="bio-text">
                  {contributor.portfolioLink ? (
                    <a
                      href={contributor.portfolioLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#007BFF', textDecoration: 'underline' }}
                    >
                      {contributor.portfolioLink}
                    </a>
                  ) : (
                    'Không cung cấp link portfolio.'
                  )}
                </p>
              </div>
            </div>
          </section>

          <div className="content-split">
            <div className="experience-col">
              <label className="section-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                MÔ TẢ KINH NGHIỆM
              </label>
              <div className="experience-text">
                {contributor.experience || 'Không có thông tin kinh nghiệm.'}
              </div>
            </div>
            <div className="attachments-col">
              <label className="section-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                HỒ SƠ ĐÍNH KÈM
              </label>
              <div className="attachments-list">
                {contributor.certificates && contributor.certificates.length > 0 ? (
                  contributor.certificates.map((cert, index) => (
                    <a key={index} href={cert.url} target="_blank" rel="noopener noreferrer" className="attachment-card">
                      <div className="attachment-icon pdf">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                      </div>
                      <div className="attachment-info">
                        <span className="attachment-name">{cert.certificateName}</span>
                      </div>
                    </a>
                  ))
                ) : contributor.certificateUrl ? (
                  <a href={contributor.certificateUrl} target="_blank" rel="noopener noreferrer" className="attachment-card">
                    <div className="attachment-icon pdf">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div className="attachment-info">
                      <span className="attachment-name">{contributor.certificateName || 'Chung_chi.pdf'}</span>
                    </div>
                  </a>
                ) : (
                  <p className="no-attachments">Không có tệp đính kèm.</p>
                )}
              </div>
            </div>
          </div>

          <div className={`status-banner ${contributor.statusKey?.toLowerCase()}`}>
            <div className="status-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M9 16l2 2 4-4"></path>
              </svg>
            </div>
            <div className="status-details">
              <label>TRẠNG THÁI HIỆN TẠI</label>
              <p>
                {contributor.statusLabel || 'N/A'} (Gửi ngày {contributor.date || 'N/A'})
              </p>
              {showReasonInBanner && (
                <div className="reject-reason-display">
                  <strong>Lý do:</strong> {contributor.rejectionReason}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          {isActionable ? (
            <>
              <div className="footer-left">
                <button type="button" className="btn-modal btn-outline-danger" onClick={handleOpenReject}>
                  Từ chối
                </button>
              </div>
              <button type="button" className="btn-modal btn-primary-action" onClick={handleOpenApprove}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Duyệt
              </button>
            </>
          ) : (
            <button type="button" className="btn-modal btn-secondary" onClick={handleClose}>
              Đóng
            </button>
          )}
        </footer>

        {showApproveModal && (
          <div className="mini-modal-overlay">
            <div className="mini-modal">
              <h3>Xác nhận phê duyệt</h3>
              <p>Bạn có chắc chắn muốn phê duyệt người dùng này thành Contributor không?</p>
              <div className="mini-modal-actions">
                <button type="button" className="btn-mini btn-cancel" onClick={() => setShowApproveModal(false)}>
                  Hủy
                </button>
                <button
                  type="button"
                  className="btn-mini btn-confirm"
                  onClick={confirmApprove}
                  disabled={approveBusy}
                >
                  {approveBusy ? 'Đang xử lý…' : 'Duyệt'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showRejectModal && (
          <div className="mini-modal-overlay">
            <div className="mini-modal">
              <h3>Lý do từ chối</h3>
              <p>Vui lòng nhập lý do từ chối hồ sơ này (bắt buộc).</p>
              <textarea
                className="reject-textarea"
                placeholder="Nhập lý do từ chối..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                required
              />
              <div className="mini-modal-actions">
                <button type="button" className="btn-mini btn-cancel" onClick={() => setShowRejectModal(false)}>
                  Hủy
                </button>
                <button
                  type="button"
                  className={`btn-mini btn-reject ${!rejectReason.trim() ? 'disabled' : ''}`}
                  onClick={confirmReject}
                  disabled={!rejectReason.trim()}
                >
                  Từ chối
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributorDetailModal;
