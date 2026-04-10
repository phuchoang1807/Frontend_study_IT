import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNotification } from "../../context/NotificationContext";
import { documentService } from "../../services/api";
import {
  getDocumentThumbnailUrl,
  hasDocumentThumbnailValue,
  onDocumentThumbnailError,
} from "../../utils/documentThumbnail";
import { getDocumentPreviewMode } from "../../utils/documentPreview";
import "../../styles/submittedDocumentDetails.css";

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
);

const Trash2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

function formatDateTime(value) {
  if (value == null) return "—";
  try {
    let d;
    if (Array.isArray(value)) {
      const [y, mo, day, h = 0, mi = 0, s = 0] = value;
      d = new Date(y, mo - 1, day, h, mi, s);
    } else {
      d = new Date(value);
    }
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function formatFileSizeMb(bytes) {
  if (bytes == null || bytes === "") return "—";
  const n = Number(bytes);
  if (Number.isNaN(n)) return String(bytes);
  return (n / (1024 * 1024)).toFixed(1);
}

function normalizeFromApi(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    documentUrl: raw.documentUrl,
    thumbnailUrl: raw.thumbnailUrl,
    fileName: raw.fileName,
    fileType: raw.fileType,
    fileSizeBytes: raw.fileSizeBytes,
    categoryName: raw.categoryName,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    status: raw.status,
    rejectReason: raw.rejectReason ?? null,
    createdAt: raw.createdAt,
  };
}

function normalizeFromState(d) {
  if (!d) return null;
  return {
    id: d.id,
    title: d.title,
    description: d.description,
    documentUrl: d.documentUrl,
    thumbnailUrl: d.thumbnailUrl,
    fileName: d.fileName,
    fileType: d.fileType,
    fileSizeBytes: d.fileSizeBytes ?? d.fileSize,
    categoryName: d.categoryName || d.category,
    tags: Array.isArray(d.tags) ? d.tags : [],
    status: d.status,
    rejectReason: d.rejectReason ?? null,
    createdAt: d.createdAt ?? d.uploadDate,
  };
}

function statusMeta(status) {
  const s = (status || "").toUpperCase();
  if (s === "APPROVED") {
    return {
      label: "Đã được duyệt",
      className: "submitted-hero-badge--approved",
      heroClass: "submitted-hero--approved",
    };
  }
  if (s === "REJECTED") {
    return {
      label: "Bị từ chối",
      className: "submitted-hero-badge--rejected",
      heroClass: "submitted-hero--rejected",
    };
  }
  return {
    label: "Đang chờ duyệt",
    className: "submitted-hero-badge--pending",
    heroClass: "submitted-hero--pending",
  };
}

function FilePreviewSection({ fileUrl, fileType, fileName }) {
  const mode = useMemo(
    () => getDocumentPreviewMode(fileType, fileUrl, fileName),
    [fileType, fileUrl, fileName]
  );

  const iframeStyle = {
    width: "100%",
    height: 560,
    border: "1px solid #e4e7ec",
    borderRadius: 12,
    background: "#f9fafb",
  };

  if (!fileUrl?.trim()) {
    return (
      <div className="submitted-preview-empty">
        <p>Không có liên kết file để xem trước.</p>
      </div>
    );
  }

  if (mode === "pdf") {
    return <iframe title="Xem trước PDF" src={fileUrl} style={iframeStyle} />;
  }
  if (mode === "image") {
    return (
      <img
        src={fileUrl}
        alt="Xem trước"
        style={{ maxWidth: "100%", borderRadius: 12, display: "block" }}
      />
    );
  }
  if (mode === "gview") {
    const src = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    return <iframe title="Xem trước tài liệu" src={src} style={iframeStyle} />;
  }
  return (
    <div className="submitted-preview-empty">
      <p className="submitted-preview-fallback-text">
        Không xem trước trực tiếp được định dạng này trong trình duyệt.
      </p>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="submitted-btn-primary">
        Mở file
      </a>
    </div>
  );
}

export default function SubmittedDocumentDetails() {
  const { submissionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const notification = useNotification();
  const stateDoc = location.state?.document;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const effectiveId = submissionId || stateDoc?.id;

  const {
    data: apiRaw,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-document-detail", submissionId],
    queryFn: () => documentService.getMyDocumentDetail(submissionId),
    enabled: Boolean(submissionId),
  });

  const document = useMemo(() => {
    if (submissionId) {
      if (apiRaw) return normalizeFromApi(apiRaw);
      return null;
    }
    return normalizeFromState(stateDoc);
  }, [submissionId, apiRaw, stateDoc]);

  const meta = statusMeta(document?.status);

  if (!effectiveId) {
    return (
      <div className="no-data-container">
        <h2>Không tìm thấy tài liệu</h2>
        <p>Vui lòng mở từ trang &quot;Tài liệu của tôi&quot; hoặc đăng tải tài liệu mới.</p>
        <button type="button" onClick={() => navigate("/manage-documents")}>
          Về danh sách tài liệu
        </button>
      </div>
    );
  }

  if (submissionId && isLoading && !apiRaw) {
    return (
      <div className="submitted-details-container">
        <div className="submitted-details-content">
          <p className="submitted-loading-text">Đang tải thông tin tài liệu…</p>
        </div>
      </div>
    );
  }

  if (submissionId && isError) {
    return (
      <div className="submitted-details-container">
        <div className="submitted-details-content">
          <p className="submitted-error-text">
            {error?.response?.data?.message || error?.message || "Không tải được tài liệu."}
          </p>
          <button type="button" className="submitted-btn-secondary" onClick={() => refetch()}>
            Thử lại
          </button>
          <button type="button" className="submitted-btn-ghost" onClick={() => navigate("/manage-documents")}>
            Về danh sách
          </button>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="no-data-container">
        <h2>Không có dữ liệu</h2>
        <button type="button" onClick={() => navigate("/manage-documents")}>Quay lại</button>
      </div>
    );
  }

  const {
    id,
    title,
    description,
    documentUrl,
    thumbnailUrl,
    fileName,
    fileType,
    fileSizeBytes,
    categoryName,
    tags,
    status,
    rejectReason,
    createdAt,
  } = document;

  const documentCode = id ? `#DOC-${String(id).slice(0, 8).toUpperCase()}` : "—";

  const handleDeleteDocument = async () => {
    try {
      setIsDeleting(true);
      await documentService.deleteMyDocument(id);
      notification.success("Đã xóa tài liệu.");
      navigate("/manage-documents");
    } catch (err) {
      notification.error(err?.response?.data?.message || "Không thể xóa tài liệu.");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleEditDocument = () => {
    navigate("/upload-document", {
      state: {
        documentToEdit: {
          id: document.id,
          title: document.title,
          description: document.description,
          category: categoryName,
          tags: document.tags || [],
          documentUrl,
          thumbnailUrl,
          fileName,
          fileSizeBytes,
          fileSize: `${formatFileSizeMb(fileSizeBytes)}`,
        },
      },
    });
  };

  const statusUpper = (status || "").toUpperCase();

  return (
    <div className="submitted-details-container">
      <div className="submitted-details-content">
        <button type="button" className="details-back-link" onClick={() => navigate("/manage-documents")}>
          <ArrowLeftIcon />
          Quay lại danh sách tài liệu
        </button>

        <header className={`submitted-hero-card ${meta.heroClass}`}>
          <div className="submitted-hero-top">
            <div>
              <span className={`submitted-hero-badge ${meta.className}`}>{meta.label}</span>
              <p className="submitted-hero-code">Mã tài liệu: {documentCode}</p>
              <h1 className="submitted-hero-title">{title}</h1>
              <p className="submitted-hero-date">
                Gửi lúc: <strong>{formatDateTime(createdAt)}</strong>
              </p>
            </div>
            <div className="submitted-hero-actions">
              <button type="button" className="action-btn edit" onClick={handleEditDocument}>
                <EditIcon /> Chỉnh sửa
              </button>
              <button type="button" className="action-btn delete" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2Icon /> Xóa
              </button>
            </div>
          </div>
        </header>

        <div className="submitted-two-col">
          <section className="submitted-panel submitted-panel--preview">
            <h2 className="submitted-panel-title">Xem trước tệp</h2>
            <FilePreviewSection fileUrl={documentUrl} fileType={fileType} fileName={fileName} />
          </section>

          <div className="submitted-side-stack">
            <section className="submitted-panel">
              <h2 className="submitted-panel-title">Thông tin duyệt</h2>
              {statusUpper === "REJECTED" && rejectReason?.trim() ? (
                <div className="submitted-moderation rejected">
                  <h3>Tài liệu chưa được duyệt</h3>
                  <p className="submitted-moderation-label">Lý do từ chối</p>
                  <p className="submitted-reject-reason">{rejectReason.trim()}</p>
                </div>
              ) : null}
              {statusUpper === "APPROVED" ? (
                <div className="submitted-moderation approved">
                  <h3>Đã duyệt</h3>
                  <p>Tài liệu đã được duyệt và có thể hiển thị công khai trên hệ thống (theo cấu hình).</p>
                </div>
              ) : null}
              {statusUpper === "PENDING" ? (
                <div className="submitted-moderation pending">
                  <h3>Đang chờ</h3>
                  <p>Tài liệu đang chờ admin kiểm duyệt. Bạn sẽ thấy cập nhật trạng thái tại đây sau khi có kết quả.</p>
                </div>
              ) : null}
            </section>

            <section className="submitted-panel">
              <h2 className="submitted-panel-title">Thông tin tệp</h2>
              <div className="submitted-info-grid">
                <div className="submitted-info-cell">
                  <span className="submitted-info-label">Định dạng</span>
                  <strong>{fileType || "—"}</strong>
                </div>
                <div className="submitted-info-cell">
                  <span className="submitted-info-label">Kích thước</span>
                  <strong>{formatFileSizeMb(fileSizeBytes)} MB</strong>
                </div>
                <div className="submitted-info-cell submitted-info-cell--wide">
                  <span className="submitted-info-label">Tên tệp</span>
                  <strong className="submitted-info-filename">{fileName || "—"}</strong>
                </div>
                <div className="submitted-info-cell submitted-info-cell--wide">
                  <span className="submitted-info-label">Danh mục</span>
                  <span className="category-tag">{categoryName || "—"}</span>
                </div>
              </div>
            </section>

            {hasDocumentThumbnailValue(thumbnailUrl) ? (
              <section className="submitted-panel submitted-panel--thumb">
                <h2 className="submitted-panel-title">Ảnh bìa</h2>
                <img
                  src={getDocumentThumbnailUrl({ thumbnailUrl })}
                  alt=""
                  className="submitted-cover-thumb"
                  onError={onDocumentThumbnailError}
                />
              </section>
            ) : null}
          </div>
        </div>

        <section className="submitted-panel">
          <h2 className="submitted-panel-title">Mô tả</h2>
          <p className="submitted-description">{description?.trim() || "—"}</p>
        </section>

        <section className="submitted-panel">
          <h2 className="submitted-panel-title">Từ khóa</h2>
          <div className="tags-container">
            {(tags || []).length ? (
              tags.map((tag, index) => (
                <span key={index} className="detail-tag">{tag}</span>
              ))
            ) : (
              <span className="submitted-muted">Chưa có từ khóa</span>
            )}
          </div>
        </section>

        <div className="details-footer-actions">
          <button type="button" className="action-btn primary" onClick={() => navigate("/manage-documents")}>
            <CheckCircleIcon /> Tài liệu của tôi
          </button>
          <button type="button" className="action-btn secondary" onClick={() => navigate("/")}>
            <HomeIcon /> Về trang chủ
          </button>
        </div>

        <div className="process-info-box">
          <div className="info-text">
            <h4>Quy trình phê duyệt</h4>
            <p>Đội ngũ kiểm duyệt sẽ xem xét tài liệu. Kết quả được phản ánh bằng trạng thái và (nếu bị từ chối) lý do cụ thể phía trên.</p>
          </div>
        </div>
      </div>

      {showDeleteConfirm ? (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal-content" role="dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Xác nhận xóa tài liệu</h3>
            <p>Bạn có chắc muốn xóa tài liệu này? Hành động không thể hoàn tác.</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn confirm" onClick={handleDeleteDocument} disabled={isDeleting}>
                {isDeleting ? "Đang xóa…" : "Xóa"}
              </button>
              <button type="button" className="modal-btn cancel" onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
