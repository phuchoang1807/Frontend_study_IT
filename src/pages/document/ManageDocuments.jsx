import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import { documentService } from "../../services/api";
import "../../styles/manageDocuments.css";

const TABS = [
  { key: "ALL", label: "Tất cả" },
  { key: "APPROVED", label: "Approved" },
  { key: "PENDING", label: "Awaiting approval" },
  { key: "REJECTED", label: "Bị từ chối" },
];

const PAGE_SIZE = 3;

const DocumentTypeIcon = ({ fileType }) => {
  const normalized = (fileType || "FILE").toUpperCase();

  return (
    <div className={`personal-docs-file-icon personal-docs-file-icon-${normalized.toLowerCase()}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M8 13h8"></path>
        <path d="M8 17h5"></path>
      </svg>
      <span>{normalized}</span>
    </div>
  );
};

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14"></path>
    <path d="M5 12h14"></path>
  </svg>
);

const ChevronIcon = ({ direction = "left" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {direction === "left" ? <path d="M15 18l-6-6 6-6"></path> : <path d="M9 18l6-6-6-6"></path>}
  </svg>
);

const getStatusLabel = (status) => {
  if (status === "APPROVED") return "Approved";
  if (status === "REJECTED") return "Bị từ chối";
  return "Awaiting approval";
};

const getStatusClassName = (status) => {
  if (status === "APPROVED") return "approved";
  if (status === "REJECTED") return "rejected";
  return "pending";
};

export default function ManageDocuments() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const data = await documentService.getMyDocuments();
        setDocuments(Array.isArray(data) ? data : []);
      } catch (error) {
        setDocuments([]);
        notification.error(
          error?.response?.data?.message || "Không thể tải danh sách tài liệu cá nhân."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
    window.addEventListener("focus", fetchDocuments);
    return () => window.removeEventListener("focus", fetchDocuments);
  }, [notification]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, documents.length]);

  const counts = useMemo(
    () => ({
      ALL: documents.length,
      APPROVED: documents.filter((doc) => doc.status === "APPROVED").length,
      PENDING: documents.filter((doc) => doc.status === "PENDING").length,
      REJECTED: documents.filter((doc) => doc.status === "REJECTED").length,
    }),
    [documents]
  );

  const filteredDocuments = useMemo(() => {
    if (activeTab === "ALL") return documents;
    return documents.filter((doc) => doc.status === activeTab);
  }, [activeTab, documents]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / PAGE_SIZE));
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const startItem = filteredDocuments.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = filteredDocuments.length === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, filteredDocuments.length);

  const handleViewDetails = (document) => {
    navigate("/submitted-document-details", { state: { document } });
  };

  const handleEditDocument = (document) => {
    navigate("/upload-document", { state: { documentToEdit: document } });
  };

  const handleDeleteDocument = async () => {
    if (!documentToDelete) return;

    try {
      await documentService.deleteMyDocument(documentToDelete.id);
      setDocuments((prev) => prev.filter((item) => item.id !== documentToDelete.id));
      notification.success("Đã xóa tài liệu khỏi danh sách cá nhân.");
      setDocumentToDelete(null);
    } catch (error) {
      notification.error(
        error?.response?.data?.message || "Không thể xóa tài liệu."
      );
    }
  };

  const showEmpty = !isLoading && paginatedDocuments.length === 0;

  return (
    <div className="personal-docs-page">
      <div className="personal-docs-shell">
        <div className="personal-docs-header-row">
          <div>
            <h1 className="personal-docs-title">My documents</h1>
            <p className="personal-docs-subtitle">
              Manage and track the status of the documents you have uploaded.
            </p>
          </div>
          <button type="button" className="personal-docs-upload-btn" onClick={() => navigate("/upload-document")}>
            <PlusIcon />
            <span>Upload new documents</span>
          </button>
        </div>

        <section className="personal-docs-card">
          <div className="personal-docs-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`personal-docs-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.label}</span>
                {tab.key === "ALL" && <span className="personal-docs-tab-count">{counts[tab.key]}</span>}
              </button>
            ))}
          </div>

          <div className="personal-docs-table-wrap">
            <table className="personal-docs-table">
              <thead>
                <tr>
                  <th>DOCUMENT TITLE</th>
                  <th>DATE OF PUBLICATION</th>
                  <th>STATUS</th>
                  <th>VIEW</th>
                  <th>DOWNLOADS</th>
                  <th>ACT</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="personal-docs-empty-cell">
                      <div className="personal-docs-empty-state">
                        <h3>Loading documents...</h3>
                      </div>
                    </td>
                  </tr>
                ) : showEmpty ? (
                  <tr>
                    <td colSpan="6" className="personal-docs-empty-cell">
                      <div className="personal-docs-empty-state">
                        <h3>There are no documents in this section.</h3>
                        <p>Upload your first document here to begin managing it.</p>
                        <button type="button" className="personal-docs-upload-btn" onClick={() => navigate("/upload-document")}>
                          <PlusIcon />
                          <span>Upload new documents</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedDocuments.map((document) => (
                    <tr key={document.id}>
                      <td>
                        <div className="personal-docs-title-cell">
                          <DocumentTypeIcon fileType={document.fileType} />
                          <div className="personal-docs-title-group">
                            <div className="personal-docs-document-name">{document.title}</div>
                            <div className="personal-docs-document-meta">
                              {document.fileType} • {document.fileSize} MB
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="personal-docs-secondary-cell">{document.uploadDate}</td>
                      <td>
                        <span className={`personal-docs-status-badge ${getStatusClassName(document.status)}`}>
                          {getStatusLabel(document.status)}
                        </span>
                      </td>
                      <td className="personal-docs-number-cell">{Number(document.views || 0).toLocaleString("en-US")}</td>
                      <td className="personal-docs-number-cell">{Number(document.downloads || 0).toLocaleString("en-US")}</td>
                      <td>
                        <div className="personal-docs-actions">
                          <button type="button" className="personal-docs-action-btn" title="View details" onClick={() => handleViewDetails(document)}>
                            <EyeIcon />
                          </button>
                          <button type="button" className="personal-docs-action-btn" title="Edit document" onClick={() => handleEditDocument(document)}>
                            <EditIcon />
                          </button>
                          <button type="button" className="personal-docs-action-btn" title="Delete document" onClick={() => setDocumentToDelete(document)}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="personal-docs-footer">
            <p className="personal-docs-footer-text">
              Show {startItem} - {endItem} out of {filteredDocuments.length} documents
            </p>
            <div className="personal-docs-pagination">
              <button
                type="button"
                className="personal-docs-page-arrow"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronIcon direction="left" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`personal-docs-page-btn ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="personal-docs-page-arrow"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {documentToDelete && (
        <div className="personal-docs-modal-overlay" onClick={() => setDocumentToDelete(null)}>
          <div className="personal-docs-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Delete document</h3>
            <p>Are you sure you want to delete "{documentToDelete.title}" from your personal documents?</p>
            <div className="personal-docs-modal-actions">
              <button type="button" className="personal-docs-modal-btn personal-docs-modal-cancel" onClick={() => setDocumentToDelete(null)}>
                Cancel
              </button>
              <button type="button" className="personal-docs-modal-btn personal-docs-modal-confirm" onClick={handleDeleteDocument}>
                Delete document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
