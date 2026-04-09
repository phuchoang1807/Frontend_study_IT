import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { documentService } from "../../services/api";
import "../../styles/submittedDocumentDetails.css";

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828L12.586 2.586z"></path><circle cx="7" cy="7" r="1"></circle></svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
);

const Trash2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
);

const getStatusLabel = (status) => {
  if (status === "APPROVED") return "Đã duyệt";
  if (status === "REJECTED") return "Bị từ chối";
  return "Chờ duyệt";
};

const getStatusClassName = (status) => {
  if (status === "APPROVED") return "approved";
  if (status === "REJECTED") return "rejected";
  return "pending";
};

const SubmittedDocumentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notification = useNotification();
  const { document } = location.state || {};
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!document) {
    return (
      <div className="no-data-container">
        <h2>Không có dữ liệu tài liệu đã gửi</h2>
        <p>Vui lòng mở tài liệu từ trang My documents hoặc đăng tải tài liệu mới.</p>
        <button onClick={() => navigate("/manage-documents")}>Quay lại My documents</button>
      </div>
    );
  }

  const {
    id,
    title,
    description,
    category,
    categoryName,
    tags,
    thumbnailUrl,
    fileName,
    fileSize,
    uploadDate,
    documentUrl,
    createdAt,
    status,
  } = document;

  const getFileType = (urlOrName) => {
    const lower = String(urlOrName || "").toLowerCase();
    if (lower.includes(".pdf")) return "PDF";
    if (lower.includes(".docx") || lower.includes(".doc")) return "DOCX";
    if (lower.includes(".pptx") || lower.includes(".ppt")) return "PPTX";
    return "FILE";
  };

  const formatDateTime = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const documentFileType = getFileType(documentUrl || fileName);
  const statusLabel = getStatusLabel(status);
  const documentCode = id ? `#DOC-${String(id).slice(0, 8).toUpperCase()}` : "Tài liệu cá nhân";
  const historyItems = [
    {
      title: "Gửi tài liệu lần đầu",
      time: formatDateTime(createdAt) || uploadDate,
      tone: "primary",
    },
    thumbnailUrl
      ? {
          title: "Đã đính kèm ảnh minh họa",
          time: "Hình ảnh bìa đã sẵn sàng",
          tone: "neutral",
        }
      : null,
    {
      title: statusLabel,
      time:
        status === "PENDING"
          ? "Đang chờ hệ thống kiểm duyệt"
          : status === "APPROVED"
          ? "Tài liệu đã sẵn sàng hiển thị"
          : "Cần cập nhật lại nội dung trước khi gửi tiếp",
      tone: status === "REJECTED" ? "danger" : "neutral",
    },
  ].filter(Boolean);

  const handleDeleteDocument = async () => {
    try {
      setIsDeleting(true);
      await documentService.deleteMyDocument(document.id);
      notification.success("Xóa tài liệu thành công!");
      navigate("/manage-documents");
    } catch (error) {
      notification.error(
        error?.response?.data?.message || "Không thể xóa tài liệu."
      );
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleEditDocument = () => {
    navigate("/upload-document", { state: { documentToEdit: document } });
  };

  return (
    <div className="submitted-details-container">
      <div className="submitted-details-content">
        <button className="details-back-link" onClick={() => navigate("/manage-documents")}>
          <ArrowLeftIcon />
          Quay lại danh sách tài liệu
        </button>

        <header className="details-header">
          <div className="details-header-main">
            <div className="details-header-copy">
              <div className="details-meta-row">
                <div className={`status-badge ${getStatusClassName(status)}`}>{statusLabel}</div>
                <span className="details-document-code">Mã tài liệu: {documentCode}</span>
              </div>
              <h1 className="details-title">{title}</h1>
              <p className="details-subtitle">Theo dõi trạng thái xử lý, xem lại thông tin và quản lý tài liệu bạn đã đăng tải.</p>
            </div>

            <div className="details-header-actions">
              <button className="action-btn edit" onClick={handleEditDocument}>
                <EditIcon /> Chỉnh sửa tài liệu
              </button>
              <button className="action-btn delete" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2Icon /> Xóa tài liệu
              </button>
            </div>
          </div>
        </header>

        <div className="details-main-card">
          <div className="details-top-grid">
            <div className="details-preview-card">
              <div className="thumbnail-wrapper">
                <img src={thumbnailUrl} alt={title} className="document-thumbnail-large" />
                <div className="file-type-overlay">{documentFileType}</div>
              </div>
            </div>

            <section className="details-support-card">
              <div className="support-icon-shell">
                <CheckCircleIcon />
              </div>
              <div className="support-copy">
                <h3>Bạn cần hỗ trợ về tài liệu này?</h3>
                <p>Vui lòng liên hệ đội ngũ Admin qua kênh phản hồi hoặc chỉnh sửa lại nội dung trước khi gửi duyệt lại.</p>
              </div>
            </section>
          </div>

          <div className="details-grid">
            <section className="details-panel">
              <h3 className="section-label"><InfoIcon />Thông tin tệp tin</h3>
              <div className="info-card-grid">
                <div className="info-box">
                  <span className="info-box-label">Định dạng</span>
                  <strong className="info-box-value">{documentFileType} (Digital)</strong>
                </div>
                <div className="info-box">
                  <span className="info-box-label">Kích thước</span>
                  <strong className="info-box-value">{fileSize} MB</strong>
                </div>
                <div className="info-box">
                  <span className="info-box-label">Tên tệp</span>
                  <strong className="info-box-value info-box-file">{fileName}</strong>
                </div>
                <div className="info-box">
                  <span className="info-box-label">Ngày đăng tải</span>
                  <strong className="info-box-value">{uploadDate}</strong>
                </div>
                <div className="info-box info-box-wide">
                  <span className="info-box-label">Danh mục</span>
                  <span className="category-tag">{categoryName || category}</span>
                </div>
              </div>
            </section>

            <section className="details-panel">
              <h3 className="section-label"><ClockIcon />Lịch sử cập nhật</h3>
              <div className="history-timeline">
                {historyItems.map((item, index) => (
                  <div key={`${item.title}-${index}`} className={`history-item ${item.tone || "neutral"}`}>
                    <span className="history-dot" />
                    <div className="history-content">
                      <strong>{item.title}</strong>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="details-sections-stack">
            <section className="details-panel">
              <h3 className="section-label"><BookOpenIcon />Mô tả</h3>
              <p className="description-text">{description}</p>
            </section>

            <section className="details-panel">
              <h3 className="section-label"><TagIcon />Từ khóa liên quan</h3>
              <div className="tags-container">
                {(tags || []).map((tag, index) => (
                  <span key={index} className="detail-tag">{tag}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="details-footer-actions">
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
          <div className="confirmation-modal-content" onClick={(event) => event.stopPropagation()}>
            <h3>Xác nhận xóa tài liệu</h3>
            <p>Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác.</p>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={handleDeleteDocument} disabled={isDeleting}>
                {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
              <button className="modal-btn cancel" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedDocumentDetails;
