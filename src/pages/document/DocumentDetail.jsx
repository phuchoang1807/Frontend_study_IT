import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChevronRightIcon,
  BookmarkIcon,
  DownloadIcon,
  MessageIcon,
  SearchIcon,
  HeartIcon,
  AlertIcon,
  ListIcon,
  ClockIcon,
  MaximizeIcon,
} from "../../components/icons";
import "../../styles/documentDetail.css";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import {
  documentService,
  getApiErrorMessage,
  requireAuthOrPrompt,
} from "../../services/api";

const pdfPageFallback =
  "https://placehold.co/800x1132/white/black?text=TÀI+LIỆU";

function formatFileSize(bytes) {
  if (bytes == null || bytes === "") return "";
  const n = Number(bytes);
  if (Number.isNaN(n) || n < 0) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function formatCompactNumber(value) {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "0";
  return new Intl.NumberFormat("vi", { notation: "compact" }).format(n);
}

function formatCommentTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildDisplayComments(detail) {
  const list = [];
  const ids = new Set();
  const pinned = detail?.comments?.pinnedComment;
  if (pinned?.id) {
    list.push(pinned);
    ids.add(pinned.id);
  }
  (detail?.comments?.latestComments || []).forEach((c) => {
    if (c?.id && !ids.has(c.id)) {
      list.push(c);
      ids.add(c.id);
    }
  });
  return list;
}

export default function DocumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const notification = useNotification();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    documentService.view(id).catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await documentService.getDocumentById(id);
        if (!cancelled) setDetail(data);
      } catch (e) {
        if (!cancelled) {
          const msg = getApiErrorMessage(e);
          setError(msg);
          setDetail(null);
          notification.error(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- toast API stable enough; avoid refetch loop
  }, [id]);

  const displayComments = useMemo(() => buildDisplayComments(detail), [detail]);

  const handleDownload = useCallback(async () => {
    if (!id) return;
    const ok = requireAuthOrPrompt({
      isAuthenticated,
      navigate,
      redirectTo: id ? `/documents/${id}` : "/documents",
    });
    if (!ok) return;
    try {
      await documentService.download(id);
      notification.success("Đã ghi nhận lượt tải.");
    } catch (e) {
      notification.error(getApiErrorMessage(e));
    }
  }, [id, isAuthenticated, navigate, notification]);

  const info = detail?.documentInfo;
  const stats = detail?.stats;
  const file = detail?.file;
  const quizzes = detail?.quizzes || [];
  const related = detail?.relatedDocuments || [];

  const titleText = loading ? "Đang tải…" : error ? "Không tải được tài liệu" : info?.title || "";
  const previewSrc = file?.fileUrl || pdfPageFallback;
  const fileBadge = (file?.fileType || info?.documentType || "PDF").toString().toUpperCase();
  const downloadLabel = file?.fileSize
    ? `Tải xuống ngay (${formatFileSize(file.fileSize)})`
    : "Tải xuống ngay";

  return (
    <div className="document-detail-container">
      <main className="document-detail-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Trang chủ
          </Link>
          <ChevronRightIcon size={12} color="#64748b" />
          <Link to="/documents" className="breadcrumb-item">
            Danh sách tài liệu
          </Link>
          <ChevronRightIcon size={12} color="#64748b" />
          <span className="breadcrumb-item active">{titleText || "—"}</span>
        </nav>

        <div className="document-main-layout">
          {/* Left Column */}
          <div className="document-left-column">
            {/* PDF Viewer */}
            <div className="pdf-viewer-container">
              <div className="pdf-viewer-header">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="pdf-badge">{fileBadge}</span>
                  <span className="pdf-page-info">Trang 1 / 45</span>
                </div>
                <div className="pdf-controls">
                  <div className="pdf-control-btn">
                    <SearchIcon size={16} />
                  </div>
                  <div className="pdf-control-btn">
                    <SearchIcon size={16} />
                  </div>
                  <div className="pdf-control-btn">
                    <MaximizeIcon size={16} />
                  </div>
                </div>
              </div>

              <div className="pdf-content">
                <img src={previewSrc} alt="Preview tài liệu" className="pdf-page-image" />
                <div className="view-more-overlay">
                  <button type="button" className="view-more-btn">
                    <ChevronRightIcon size={14} style={{ transform: "rotate(90deg)" }} />
                    Xem thêm các trang khác
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <div className="comments-header">
                <MessageIcon size={20} color="#007bff" />
                <h3 className="comments-title">
                  Bình luận ({detail?.comments?.totalComments ?? 0})
                </h3>
              </div>

              <div className="comment-input-container">
                <img src="https://placehold.co/40x40" alt="User Avatar" className="user-avatar" />
                <div className="comment-textarea-wrapper">
                  <textarea
                    className="comment-textarea"
                    placeholder="Chia sẻ cảm nghĩ của bạn về tài liệu này..."
                  ></textarea>
                  <button type="button" className="submit-comment-btn">
                    Gửi bình luận
                  </button>
                </div>
              </div>

              <div className="comment-list">
                {displayComments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <img
                      src="https://placehold.co/40x40"
                      alt={comment.authorName || ""}
                      className="user-avatar"
                    />
                    <div className="comment-content-wrapper">
                      <div className="comment-user-info">
                        <span className="comment-user-name">{comment.authorName || "Ẩn danh"}</span>
                        <span className="comment-time">• {formatCommentTime(comment.createdAt)}</span>
                        {comment.isPinned && <AlertIcon size={12} color="#64748b" />}
                      </div>
                      <p className="comment-text">{comment.content}</p>
                      <div className="comment-actions">
                        <div className="comment-action-item">
                          <HeartIcon size={14} />
                          <span>{comment.totalLikes ?? 0}</span>
                        </div>
                        <div className="comment-action-item">Phản hồi</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="document-right-column">
            {/* Main Info */}
            <div className="document-info-card">
              <h1 className="document-title">{titleText}</h1>

              <div className="author-info">
                <div className="author-details">
                  <img src="https://placehold.co/40x40" alt="Author" className="user-avatar" />
                  <div className="author-name-wrapper">
                    <span className="posted-by">Đăng bởi</span>
                    <span className="author-name">{info?.authorName || "—"}</span>
                  </div>
                </div>
                <button type="button" className="follow-btn">
                  Theo dõi
                </button>
              </div>

              <p className="document-description">{info?.description || ""}</p>

              <div className="document-tags">
                {(info?.tags || []).map((tag) => (
                  <span key={tag} className="tag">
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </span>
                ))}
              </div>

              <div className="document-stats">
                <div className="stat-item">
                  <div className="stat-label">Lượt xem</div>
                  <div className="stat-value">{formatCompactNumber(stats?.totalViews)}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Lượt tải</div>
                  <div className="stat-value">{formatCompactNumber(stats?.totalDownloads)}</div>
                </div>
              </div>

              <button type="button" className="primary-action-btn" onClick={handleDownload}>
                <DownloadIcon size={18} />
                {downloadLabel}
              </button>

              <div className="secondary-actions">
                <button type="button" className="secondary-btn">
                  <BookmarkIcon size={16} />
                  Lưu tài liệu
                </button>
                <button type="button" className="secondary-btn report">
                  <AlertIcon size={16} />
                  Báo cáo
                </button>
              </div>
            </div>

            {/* Exercises List */}
            <div className="sidebar-card">
              <div className="card-title">
                <ListIcon size={18} color="#007bff" />
                Danh sách bài tập
              </div>
              <div className="exercise-list">
                {quizzes.map((ex) => (
                  <div key={ex.id} className="exercise-item">
                    <div className="exercise-name">{ex.title}</div>
                    <div className="exercise-meta">
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <MessageIcon size={12} /> {ex.totalQuestions ?? 0} câu hỏi
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <ClockIcon size={12} /> {ex.duration != null ? `${ex.duration} phút` : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="view-all-btn">
                Xem tất cả bài đánh giá
              </button>
            </div>

            {/* Related Documents */}
            <div className="sidebar-card">
              <div className="card-title">Tài liệu liên quan</div>
              <div className="related-list">
                {related.map((doc) => (
                  <div
                    key={doc.id}
                    role="button"
                    tabIndex={0}
                    className="related-item"
                    onClick={() => doc.id && navigate(`/documents/${doc.id}`)}
                    onKeyDown={(e) => e.key === "Enter" && doc.id && navigate(`/documents/${doc.id}`)}
                  >
                    <img
                      src={doc.thumbnail || "https://placehold.co/64x64"}
                      alt={doc.title || ""}
                      className="related-thumb"
                    />
                    <div className="related-info">
                      <div className="related-title">{doc.title}</div>
                      <div className="related-meta">{formatCompactNumber(doc.totalViews)} lượt xem</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
