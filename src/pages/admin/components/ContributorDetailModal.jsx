import React, { useState } from 'react';
import '../../../styles/admin/contributorDetailModal.css';

const ContributorDetailModal = ({ isOpen, onClose, contributor, onUpdateStatus }) => {
  const [isRequestMode, setIsRequestMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

  const confirmSendRequest = () => {
    const newRequested = {};
    Object.keys(selectedFields).forEach(field => {
      if (selectedFields[field]) {
        newRequested[field] = {
          requested: true,
          reason: reasons[field]
        };
      }
    });
    setRequestedFields(newRequested);
    setIsRequestMode(false);
    setShowConfirmModal(false);
  };

  const handleOpenReject = () => {
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (rejectReason.trim()) {
      onUpdateStatus(contributor.id, 'rejected', 'Đã từ chối');
      setShowRejectModal(false);
      onClose();
    }
  };

  const handleClose = () => {
    setIsRequestMode(false);
    setShowConfirmModal(false);
    setShowRejectModal(false);
    setRejectReason('');
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
    if (!isRequestMode && requestedFields[field]?.requested) {
      classes += " requested-field-box";
    }
    return classes;
  };

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
                {!isRequestMode && requestedFields.fullName?.requested && (
                  <div className="requested-reason">
                    {requestedFields.fullName.reason}
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
                {!isRequestMode && requestedFields.email?.requested && (
                  <div className="requested-reason">
                    {requestedFields.email.reason}
                  </div>
                )}
              </div>
              <div className={`info-item full-width ${getFieldClass('bio')}`}>
                <div className="label-with-dot">
                  {isRequestMode && (
                    <span 
                      className={`section-dot ${selectedFields.bio ? 'selected' : ''}`}
                      onClick={() => toggleField('bio')}
                    ></span>
                  )}
                  <label>GIỚI THIỆU BẢN THÂN</label>
                </div>
                <p className="bio-text">
                  "Tôi là một nhà thiết kế UI/UX với hơn 5 năm kinh nghiệm làm việc trong các dự án Fintech và E-commerce. Tôi đam mê việc tạo ra các giải pháp kỹ thuật số tối ưu hóa trải nghiệm người dùng thông qua sự tinh tế và chính xác."
                </p>
                {renderReasonInput('bio')}
                {!isRequestMode && requestedFields.bio?.requested && (
                  <div className="requested-reason">
                    {requestedFields.bio.reason}
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
              <ul className="experience-list">
                <li>5 năm Senior UI/UX Designer tại tập đoàn công nghệ XYZ.</li>
                <li>Thành thạo Figma, Adobe Creative Cloud và các công cụ prototyping.</li>
                <li>Có kinh nghiệm xây dựng Design System quy mô lớn.</li>
              </ul>
              {renderReasonInput('experience')}
              {!isRequestMode && requestedFields.experience?.requested && (
                <div className="requested-reason">
                  {requestedFields.experience.reason}
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
                <a href="#" className="attachment-card">
                  <div className="attachment-icon pdf">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">Chung_chi_HCI.pdf</span>
                    <span className="attachment-meta">2.4 MB</span>
                  </div>
                </a>
              </div>
              {renderReasonInput('attachments')}
              {!isRequestMode && requestedFields.attachments?.requested && (
                <div className="requested-reason">
                  {requestedFields.attachments.reason}
                </div>
              )}
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="status-banner">
            <div className="status-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M9 16l2 2 4-4"></path>
              </svg>
            </div>
            <div className="status-details">
              <label>TRẠNG THÁI HIỆN TẠI</label>
              <p>Đang chờ xét duyệt (Gửi cách đây 2 ngày)</p>
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
          ) : (
            <>
              <div className="footer-left">
                <button className="btn-modal btn-outline-danger" onClick={handleOpenReject}>Từ chối</button>
                <button className="btn-modal btn-secondary" onClick={handleOpenRequestMode}>
                  Yêu cầu bổ sung
                </button>
              </div>
              <button className="btn-modal btn-primary-action">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
                Phê duyệt yêu cầu
              </button>
            </>
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
