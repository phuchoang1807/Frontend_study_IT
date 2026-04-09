import React, { useState } from 'react';
import '../../../styles/admin/documentDetailModal.css';

const DocumentDetailModal = ({ isOpen, onClose, document, onUpdateStatus }) => {
  const [showRejectionOverlay, setShowRejectionOverlay] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  if (!isOpen || !document) return null;

  const handleApprove = () => {
    // In a real app, this would be an API call
    onUpdateStatus(document.id, 'APPROVED');
    onClose();
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    // In a real app, this would be an API call with rejectionReason
    onUpdateStatus(document.id, 'REJECTED', rejectionReason);
    setShowRejectionOverlay(false);
    setRejectionReason('');
    onClose();
  };

  const toMb = (sizeBytes) => {
    return ((sizeBytes || 0) / (1024 * 1024)).toFixed(1);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'PENDING': return 'Chờ duyệt';
      case 'APPROVED': return 'Đã duyệt';
      case 'REJECTED': return 'Đã từ chối';
      default: return status;
    }
  };

  return (
    <div className="document-modal-overlay">
      <div className="document-modal-container">
        <header className="document-modal-header">
          <div className="document-modal-title-group">
            <h4>CHI TIẾT YÊU CẦU ĐĂNG TẢI</h4>
            <h2>{document.name || document.title}</h2>
          </div>
          <button type="button" className="document-modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="document-modal-body">
          <div className="document-info-section">
            <div className="document-thumbnail-preview">
              <img 
                src={document.thumbnailUrl || 'https://via.placeholder.com/180x240?text=No+Thumbnail'} 
                alt="Thumbnail" 
              />
            </div>
            <div className="document-main-info">
              <div className="info-row">
                <label>CONTRIBUTOR:</label>
                <div>
                  <p>{document.contributor?.name || 'N/A'}</p>
                  <small style={{ color: '#667085' }}>{document.contributor?.email || ''}</small>
                </div>
              </div>
              <div className="info-row">
                <label>DANH MỤC:</label>
                <p>{document.field || document.category || 'N/A'}</p>
              </div>
              <div className="info-row">
                <label>NGÀY GỬI:</label>
                <p>{document.date || 'N/A'}</p>
              </div>
              <div className="info-row">
                <label>THẺ (TAGS):</label>
                <div className="document-tags-container">
                  {document.tags && document.tags.length > 0 ? (
                    document.tags.map((tag, idx) => (
                      <span key={idx} className="document-tag-badge">{tag}</span>
                    ))
                  ) : (
                    <span style={{ color: '#98A2B3', fontSize: '14px' }}>Không có thẻ</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="document-description-section">
            <h4 style={{ fontSize: '11px', color: '#98A2B3', marginBottom: '12px' }}>MÔ TẢ TÀI LIỆU</h4>
            <div className="document-description-box">
              <p className="document-description-text">
                {document.description || 'Không có mô tả cho tài liệu này.'}
              </p>
            </div>
          </div>

          <div className="document-file-section">
            <h4 style={{ fontSize: '11px', color: '#98A2B3', marginBottom: '12px' }}>TỆP TÀI LIỆU</h4>
            <a href={document.documentUrl} target="_blank" rel="noopener noreferrer" className="document-file-card">
              <div className="file-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div className="file-info-text">
                <span className="file-name-text">{document.fileName || document.name}</span>
                <span className="file-meta-text">
                  {document.fileSizeBytes ? `${toMb(document.fileSizeBytes)} MB` : 'N/A'} • Nhấp để xem tài liệu
                </span>
              </div>
              <div style={{ color: '#98A2B3' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </a>
          </div>

          <div className={`document-status-banner ${document.status?.toLowerCase()}`}>
            <div className="status-icon-box">
              {document.status === 'APPROVED' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : document.status === 'REJECTED' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                TRẠNG THÁI HIỆN TẠI
              </label>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {getStatusLabel(document.status)} {document.status === 'REJECTED' && document.rejectionReason && ` - Lý do: ${document.rejectionReason}`}
              </p>
            </div>
          </div>
        </div>

        <footer className="document-modal-footer">
          {document.status === 'PENDING' ? (
            <>
              <button type="button" className="btn-reject" onClick={() => setShowRejectionOverlay(true)}>
                Từ chối
              </button>
              <button type="button" className="btn-approve" onClick={handleApprove}>
                Phê duyệt
              </button>
            </>
          ) : (
            <button type="button" className="btn-close" onClick={onClose}>
              Đóng
            </button>
          )}
        </footer>

        {showRejectionOverlay && (
          <div className="rejection-overlay">
            <div className="rejection-card">
              <h3>Lý do từ chối</h3>
              <p>Vui lòng cung cấp lý do từ chối đăng tải tài liệu này. Người đóng góp sẽ nhận được thông báo này.</p>
              <textarea 
                className="rejection-textarea"
                placeholder="Ví dụ: Tài liệu vi phạm bản quyền hoặc nội dung không phù hợp..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="rejection-actions">
                <button type="button" className="btn-cancel-rejection" onClick={() => setShowRejectionOverlay(false)}>
                  Hủy bỏ
                </button>
                <button 
                  type="button" 
                  className="btn-confirm-reject" 
                  disabled={!rejectionReason.trim()}
                  onClick={handleReject}
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDetailModal;
