import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/manageDocuments.css";

// Import icons needed for document display and actions
const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828L12.586 2.586z"></path><circle cx="7" cy="7" r="1"></circle></svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
);

const Trash2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

export default function ManageDocuments() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  // Mock data for documents - replace with API call later
  useEffect(() => {
    // Simulate fetching documents from an API
    setTimeout(() => {
      setDocuments([
        {
          id: "doc1",
          title: "Tài liệu Lập trình Web",
          fileName: "lap-trinh-web.pdf",
          fileType: "PDF",
          fileSize: "5.2 MB",
          uploadDate: "05/04/2026",
          status: "APPROVED", // Or PENDING, REJECTED
          thumbnailUrl: "https://via.placeholder.com/100x133?text=PDF",
          category: "cntt",
          tags: ["web", "programming", "frontend"]
        },
        {
          id: "doc2",
          title: "Bài giảng Kinh tế Vĩ mô",
          fileName: "kinh-te-vi-mo.docx",
          fileType: "DOCX",
          fileSize: "1.8 MB",
          uploadDate: "03/04/2026",
          status: "PENDING",
          thumbnailUrl: "https://via.placeholder.com/100x133?text=DOCX",
          category: "kinhte",
          tags: ["economics", "macro", "lecture"]
        },
        {
          id: "doc3",
          title: "Slide Presentation - Java Basics",
          fileName: "java-basics.pptx",
          fileSize: "12.5 MB",
          uploadDate: "01/04/2026",
          status: "REJECTED",
          thumbnailUrl: "https://via.placeholder.com/100x133?text=PPTX",
          category: "cntt",
          tags: ["java", "programming", "basics"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewDetails = (document) => {
    navigate("/submitted-document-details", { state: { document } });
  };

  const handleEditDocument = (document) => {
    navigate("/upload-document", { state: { documentToEdit: document } });
  };

  const handleDeleteConfirm = (document) => {
    setDocumentToDelete(document);
    setShowDeleteConfirm(true);
  };

  const handleDeleteDocument = () => {
    if (!documentToDelete) return;
    // Simulate deletion API call
    console.log("Deleting document:", documentToDelete.id);
    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentToDelete.id));
    notification.success("Tài liệu đã được xóa thành công!");
    setShowDeleteConfirm(false);
    setDocumentToDelete(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "status-approved";
      case "PENDING":
        return "status-pending";
      case "REJECTED":
        return "status-rejected";
      default:
        return "status-unknown";
    }
  };

  const getCategoryName = (category) => {
    if (category === 'cntt') return 'Công nghệ thông tin';
    if (category === 'kinhte') return 'Kinh tế';
    if (category === 'ngonngu') return 'Ngôn ngữ';
    return category;
  };

  if (loading) {
    return <div className="loading-container">Đang tải tài liệu...</div>;
  }

  return (
    <div className="manage-documents-container">
      <div className="manage-documents-content">
        <header className="manage-header">
          <h1 className="manage-title">Quản lý tài liệu cá nhân</h1>
          <p className="manage-subtitle">Xem và quản lý tất cả các tài liệu bạn đã đăng tải.</p>
        </header>

        <div className="documents-table-card">
          <div className="table-header-row">
            <div className="table-cell th-file-info">Tài liệu</div>
            <div className="table-cell th-details">Chi tiết</div>
            <div className="table-cell th-actions">Hành động</div>
          </div>

          <div className="documents-list">
            {documents.length === 0 ? (
              <div className="no-documents">
                <p>Bạn chưa đăng tải tài liệu nào.</p>
                <button className="action-btn primary" onClick={() => navigate('/upload-document')}>Đăng tải tài liệu đầu tiên</button>
              </div>
            ) : (
              documents.map(doc => (
                <div key={doc.id} className="document-item">
                  <div className="doc-file-info">
                    <div className="file-icon">
                      <FileTextIcon />
                    </div>
                    <div className="file-details">
                      <span className="file-name">{doc.fileName}</span>
                      <span className="file-size-date">{doc.fileSize} • {doc.uploadDate}</span>
                    </div>
                  </div>
                  <div className="doc-details">
                    <div className="detail-item">
                      <TagIcon />
                      <div className="detail-content">
                        <span className="detail-label">Thể loại:</span>
                        <span className="detail-value category-tag">{getCategoryName(doc.category)}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <CalendarIcon />
                      <div className="detail-content">
                        <span className="detail-label">Trạng thái:</span>
                        <span className={`status-badge ${getStatusBadgeClass(doc.status)}`}>{doc.status}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <TagIcon />
                      <div className="detail-content">
                        <span className="detail-label">Tags:</span>
                        <div className="tags-container">
                          {doc.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="detail-tag">#{tag}</span>
                          ))}
                          {doc.tags.length > 2 && <span className="detail-tag">...</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="doc-actions">
                    <button className="action-btn view" onClick={() => handleViewDetails(doc)} title="Xem chi tiết">
                      <EyeIcon />
                    </button>
                    <button className="action-btn edit" onClick={() => handleEditDocument(doc)} title="Chỉnh sửa">
                      <EditIcon />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDeleteConfirm(doc)} title="Xóa">
                      <Trash2Icon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */} 
      {showDeleteConfirm && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content">
            <h3>Xác nhận xóa tài liệu</h3>
            <p>Bạn có chắc chắn muốn xóa tài liệu "<strong>{documentToDelete?.fileName}</strong>"? Hành động này không thể hoàn tác.</p>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={handleDeleteDocument}>Xóa tài liệu</button>
              <button className="modal-btn cancel" onClick={() => { setShowDeleteConfirm(false); setDocumentToDelete(null); }}>Hủy bỏ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
