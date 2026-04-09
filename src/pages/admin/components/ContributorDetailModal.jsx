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
  const [isRequestMode, setIsRequestMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedFields, setSelectedFields] = useState({
    fullName: false,
    email: false,
    bio: false,
    experience: false,
    attachments: false,
  });
  
  const [reasons, setReasons] = useState({
    fullName: 'Vui lòng cung cấp họ tên đầy đủ theo căn cước công dân.',
    email: '',
    bio: '',
    experience: '',
    attachments: 'Chứng chỉ đã hết hạn hoặc không nhìn rõ. Vui lòng tải lên bản sao mới nhất.',
  });

  const [requestedFields, setRequestedFields] = useState({});
  const [approveBusy, setApproveBusy] = useState(false);

  useEffect(() => {
    if (isOpen && contributor) {
      // Set the rejection reason if available in the contributor data
      setRejectReason(contributor.rejectionReason || '');
    }
  }, [isOpen, contributor]);

  if (!isOpen || !contributor) return null;

  const toggleField = (field) => {
    if (!isRequestMode) return;
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleReasonChange = (field, value) => {
    setReasons(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenRequestMode = () => {
    setIsRequestMode(true);
  };

  const handleBackFromRequest = () => {
    setIsRequestMode(false);
  };

  const handleSubmitRequest = () => {
    setShowConfirmModal(true);
  };

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

  /**
   * Phê duyệt: gỡ USER → gán CONTRIBUTOR (API admin users có sẵn), sau đó cập nhật trạng thái yêu cầu.
   */
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

  const confirmSendRequest = () => {
    const newRequested = {};
    const detailedReason = Object.keys(selectedFields)
      .filter(field => selectedFields[field])
      .map(field => `- ${reasons[field]}`)
      .join('\n');

    sendUpdateRequest(ContributorRequestStatus.NEED_INFO, detailedReason);
    setIsRequestMode(false);
    setShowConfirmModal(false);
  };

  const handleOpenReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (rejectReason.trim()) {
      sendUpdateRequest(ContributorRequestStatus.REJECTED, rejectReason);
      setShowRejectModal(false);
    }
  };

  const handleOpenApprove = () => {
    setShowApproveModal(true);
  };

  const confirmApprove = () => {
    approveContributor();
  };

  const handleClose = () => {
    setIsRequestMode(false);
    setShowConfirmModal(false);
    setShowRejectModal(false);
    setShowApproveModal(false);
    setRejectReason('');
    setSelectedFields({
        fullName: false,
        email: false,
        bio: false,
        experience: false,
        attachments: false,
    });
    setReasons({
        fullName: 'Vui lòng cung cấp họ tên đầy đủ theo căn cước công dân.',
        email: '',
        bio: '',
        experience: '',
        attachments: 'Chứng chỉ đã hết hạn hoặc không nhìn rõ. Vui lòng tải lên bản sao mới nhất.',
    });
    setRequestedFields({});
    onClose();
  };

  const renderReasonInput = (field) => {
    if (isRequestMode && selectedFields[field]) {
      return (
        <div className="reason-input-container">
          <textarea 
            className="reason-textarea"
            placeholder="Nhập lý do yêu cầu bổ sung..."
            value={reasons[field]}
            onChange={(e) => handleReasonChange(field, e.target.value)}
          />
        </div>
      );
    }
    return null;
  };

  const getFieldClass = (field) => {
    let classes = "";
    // Display requested fields from backend data if available
    const isFieldRequestedFromBackend = contributor.statusKey === ContributorRequestStatus.NEED_INFO && contributor.rejectionReason && contributor.rejectionReason.includes(reasons[field]);
    if (!isRequestMode && (requestedFields[field]?.requested || isFieldRequestedFromBackend)) {
      classes += " requested-field-box";
    }
    return classes;
  };

  const isActionable = contributor.statusKey === ContributorRequestStatus.PENDING || 
                     contributor.statusKey === ContributorRequestStatus.NEED_INFO;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <header className="modal-header">
          <div className="modal-title-group">
            <h4 className={isRequestMode ? 'request-mode' : ''}>
              {isRequestMode ? 'YÊU CẦU BỔ SUNG THÔNG TIN' : 'CHI TIẾT YÊU CẦU CONTRIBUTOR'}
            </h4>
            <h2>{contributor.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* Body */}
        <div className="modal-body">
          {/* Profile info */}
          <section className="profile-section">
            <div className="profile-img-container">
              <img src={contributor.avatar} alt={contributor.name} className="profile-img" />
            </div>
            <div className="info-grid">
              <div className={`info-item ${getFieldClass('fullName')}`}>
                <div className="label-with-dot">
                  {isRequestMode && (
                    <span 
                      className={`section-dot ${selectedFields.fullName ? 'selected' : ''}`}
                      onClick={() => toggleField('fullName')}
                    ></span>
                  )}
                  <label>HỌ TÊN</label>
                </div>
                <p>{contributor.name}</p>
                {renderReasonInput('fullName')}
                {!isRequestMode && contributor.statusKey === ContributorRequestStatus.NEED_INFO && contributor.rejectionReason && contributor.rejectionReason.includes(reasons.fullName) && (
                  <div className="requested-reason">
                    {reasons.fullName}
                  </div>
                )}
              </div>
              <div className={`info-item ${getFieldClass('email')}`}>
                <div className="label-with-dot">
                  {isRequestMode && (
                    <span 
                      className={`section-dot ${selectedFields.email ? 'selected' : ''}`}
                      onClick={() => toggleField('email')}
                    ></span>
                  )}
                  <label>EMAIL</label>
                </div>
                <p>{contributor.email}</p>
                {renderReasonInput('email')}
                {!isRequestMode && contributor.statusKey === ContributorRequestStatus.NEED_INFO && contributor.rejectionReason && contributor.rejectionReason.includes(reasons.email) && (
                  <div className="requested-reason">
                    {reasons.email}
                  </div>
                )}
              </div>
              <div className={`info-item full-width ${getFieldClass('portfolioLink')}`}>
                <div className="label-with-dot">
                  {isRequestMode && (
                    <span 
                      className={`section-dot ${selectedFields.portfolioLink ? 'selected' : ''}`}
                      onClick={() => toggleField('portfolioLink')}
                    ></span>
                  )}
                  <label>LINK PORTFOLIO / WEBSITE</label>
                </div>
                <p className="bio-text">
                  {contributor.portfolioLink ? (
                    <a href={contributor.portfolioLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'underline' }}>
                      {contributor.portfolioLink}
                    </a>
                  ) : "Không cung cấp link portfolio."}</p>
                {renderReasonInput('portfolioLink')}
                {!isRequestMode && contributor.statusKey === ContributorRequestStatus.NEED_INFO && contributor.rejectionReason && contributor.rejectionReason.includes(reasons.portfolioLink) && (
                  <div className="requested-reason">
                    {reasons.portfolioLink}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Experience and Attachments */}
          <div className="content-split">
            <div className={`experience-col ${getFieldClass('experience')}`}>
              <div className="label-with-dot">
                {isRequestMode && (
                  <span 
                    className={`section-dot ${selectedFields.experience ? 'selected' : ''}`}
                    onClick={() => toggleField('experience')}
                  ></span>
                )}
                <label className="section-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  MÔ TẢ KINH NGHIỆM
                </label>
              </div>
              <div className="experience-text">
                {contributor.experience || "Không có thông tin kinh nghiệm."}</div
              >
              {renderReasonInput('experience')}
              {!isRequestMode && contributor.statusKey === ContributorRequestStatus.NEED_INFO && contributor.rejectionReason && contributor.rejectionReason.includes(reasons.experience) && (
                  <div className="requested-reason">
                    {reasons.experience}
                  </div>
                )}
            </div>
            <div className={`attachments-col ${getFieldClass('attachments')}`}>
              <div className="label-with-dot">
                {isRequestMode && (
                  <span 
                    className={`section-dot ${selectedFields.attachments ? 'selected' : ''}`}
                    onClick={() => toggleField('attachments')}
                  ></span>
                )}
                <label className="section-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                  HỒ SƠ ĐÍNH KÈM
                </label>
              </div>
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
                      <span className="attachment-name">{contributor.certificateName || "Chung_chi.pdf"}</span>
                    </div>
                  </a>
                ) : (
                  <p className="no-attachments">Không có tệp đính kèm.</p>
                )}
              </div>
              {renderReasonInput('attachments')}
              {!isRequestMode && contributor.statusKey === ContributorRequestStatus.NEED_INFO && contributor.rejectionReason && contributor.rejectionReason.includes(reasons.attachments) && (
                  <div className="requested-reason">
                    {reasons.attachments}
                  </div>
                )}
            </div>
          </div>

          {/* Current Status Banner */}
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
                {contributor.statusLabel || "N/A"} (Gửi ngày {contributor.date || "N/A"})
              </p>
              {(contributor.statusKey === ContributorRequestStatus.REJECTED || contributor.statusKey === ContributorRequestStatus.NEED_INFO) && contributor.rejectionReason && (
                <div className="reject-reason-display">
                  <strong>Lý do:</strong> {contributor.rejectionReason}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="modal-footer">
          {isRequestMode ? (
            <>
              <button className="btn-modal btn-back" onClick={handleBackFromRequest}>
                Quay lại
              </button>
              <button className="btn-modal btn-send-request" onClick={handleSubmitRequest}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Gửi yêu cầu bổ sung
              </button>
            </>
          ) : isActionable ? (
            <>
              <div className="footer-left">
                <button className="btn-modal btn-outline-danger" onClick={handleOpenReject}>Từ chối</button>
                <button className="btn-modal btn-secondary" onClick={handleOpenRequestMode}>
                  Yêu cầu bổ sung
                </button>
              </div>
              <button className="btn-modal btn-primary-action" onClick={handleOpenApprove}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Phê duyệt yêu cầu
              </button>
            </>
          ) : (
            <button className="btn-modal btn-secondary" onClick={handleClose}>Đóng</button>
          )}
        </footer>

        {/* Confirmation Modal Overlay */}
        {showConfirmModal && (
          <div className="mini-modal-overlay">
            <div className="mini-modal">
              <h3>Xác nhận gửi</h3>
              <p>Bạn có chắc chắn gửi yêu cầu bổ sung không?</p>
              <div className="mini-modal-actions">
                <button className="btn-mini btn-cancel" onClick={() => setShowConfirmModal(false)}>Hủy</button>
                <button className="btn-mini btn-confirm" onClick={confirmSendRequest}>Gửi yêu cầu</button>
              </div>
            </div>
          </div>
        )}

        {/* Approve Modal Overlay */}
        {showApproveModal && (
          <div className="mini-modal-overlay">
            <div className="mini-modal">
              <h3>Xác nhận phê duyệt</h3>
              <p>Bạn có chắc chắn muốn phê duyệt người dùng này thành Contributor không?</p>
              <div className="mini-modal-actions">
                <button className="btn-mini btn-cancel" onClick={() => setShowApproveModal(false)}>Hủy</button>
                <button
                  className="btn-mini btn-confirm"
                  onClick={confirmApprove}
                  disabled={approveBusy}
                >
                  {approveBusy ? 'Đang xử lý…' : 'Phê duyệt'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal Overlay */}
        {showRejectModal && (
          <div className="mini-modal-overlay">
            <div className="mini-modal">
              <h3>Lý do từ chối</h3>
              <p>Vui lòng nhập lý do từ chối hồ sơ này.</p>
              <textarea 
                className="reject-textarea"
                placeholder="Nhập lý do từ chối..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <div className="mini-modal-actions">
                <button className="btn-mini btn-cancel" onClick={() => setShowRejectModal(false)}>Hủy</button>
                <button 
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
