import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/submittedDocumentDetails.css";

// Inline SVG Icons
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828L12.586 2.586z"></path><circle cx="7" cy="7" r="1"></circle></svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
);

const Trash2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

export default function SubmittedDocumentDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const notification = useNotification();
  const { document } = location.state || {};
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!document) {
    return (
      <div className="no-data-container">
        <h2>Không có dữ liệu tài liệu đã gửi</h2>
        <p>Vui lòng đăng tải tài liệu trước khi xem chi tiết.</p>
        <button onClick={() => navigate("/upload-document")}>Quay lại trang đăng tải</button>
      </div>
    );
  }

  const {
    title,
    description,
    category,
    tags,
    thumbnailUrl,
    fileName,
    fileSize,
    uploadDate,
    documentUrl // Use this to display document file type (PDF, DOCX, PPTX)
  } = document;

  // Determine file type from documentUrl or fileName
  const getFileType = (urlOrName) => {
    const lower = urlOrName.toLowerCase();
    if (lower.includes(".pdf")) return "PDF";
    if (lower.includes(".docx")) return "DOCX";
    if (lower.includes(".pptx")) return "PPTX";
    return "FILE"; // Default or unknown
  };

  const documentFileType = getFileType(documentUrl || fileName);

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteDocument = () => {
    // Simulate deletion
    notification.success("Tài liệu đã được xóa thành công!");
    setShowDeleteConfirm(false);
    navigate("/"); // Navigate to home page after deletion
  };

  const handleEditDocument = () => {
    // Navigate to upload page with current document data for editing
    navigate("/upload-document", { state: { documentToEdit: document } });
  };

  return (
    <div className="submitted-details-container">
      <div className="submitted-details-content">
        <header className="details-header">
          <div className="status-badge pending">Đang chờ xét duyệt</div>
          <h1 className="details-title">{title}</h1>
          <p className="details-subtitle">Tài liệu của bạn đã được gửi thành công và đang chờ quản trị viên phê duyệt.</p>
        </header>

        <div className="details-main-card">
          <div className="details-grid">
            <div className="details-visual">
              <div className="thumbnail-wrapper">
                <img src={thumbnailUrl} alt={title} className="document-thumbnail-large" />
                <div className="file-type-overlay">{documentFileType}</div>
              </div>
            </div>

            <div className="details-info">
              <section className="info-section">
                <h3 className="section-label"><FileTextIcon />Thông tin cơ bản</h3>
                <div className="info-item">
                  <span className="item-label">Tên tệp:</span>
                  <span className="item-value">{fileName}</span>
                </div>
                <div className="info-item">
                  <span className="item-label">Kích thước:</span>
                  <span className="item-value">{fileSize} MB</span>
                </div>
                <div className="info-item">
                  <span className="item-label">Ngày đăng tải:</span>
                  <span className="item-value">{uploadDate}</span>
                </div>
                <div className="info-item">
                  <span className="item-label">Danh mục:</span>
                  <span className="item-value category-tag">
                    {category === 'cntt' ? 'Công nghệ thông tin' : 
                     category === 'kinhte' ? 'Kinh tế' : 
                     category === 'ngonngu' ? 'Ngôn ngữ' : category}
                  </span>
                </div>
              </section>

              <section className="info-section">
                <h3 className="section-label"><BookOpenIcon /> Mô tả</h3>
                <p className="description-text">{description}</p>
              </section>

              <section className="info-section">
                <h3 className="section-label"><TagIcon /> Thẻ (Tags)</h3>
                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <span key={index} className="detail-tag">#{tag}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="details-footer-actions">
            <button className="action-btn edit" onClick={handleEditDocument}>
              <EditIcon /> Chỉnh sửa tài liệu
            </button>
            <button className="action-btn delete" onClick={handleDeleteConfirm}>
              <Trash2Icon /> Xóa tài liệu
            </button>
            <button className="action-btn primary" onClick={() => navigate("/manage-documents")}>
              <CheckCircleIcon /> Quản lý tài liệu
            </button>
            <button className="action-btn secondary" onClick={() => navigate("/")}>
              <HomeIcon /> Về trang chủ
            </button>
          </div>
        </div>

        <div className="process-info-box">
          <div className="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          </div>
          <div className="info-text">
            <h4>Quy trình phê duyệt</h4>
            <p>Tài liệu của bạn sẽ được đội ngũ kiểm duyệt xem xét trong vòng 24h. Bạn sẽ nhận được thông báo ngay khi có kết quả.</p>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content">
            <h3>Xác nhận xóa tài liệu</h3>
            <p>Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác.</p>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={handleDeleteDocument}>Xác nhận xóa</button>
              <button className="modal-btn cancel" onClick={() => setShowDeleteConfirm(false)}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
