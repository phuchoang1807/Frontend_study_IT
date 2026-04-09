import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ClockIcon,
  UsersIcon,
  ListIcon,
  EyeIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../components/icons";
import { documentService, getApiErrorMessage } from "../../services/api";
import {
  getDocumentThumbnailUrl,
  onDocumentThumbnailError,
} from "../../utils/documentThumbnail";
import "../../styles/favoriteDocuments.css";

// Local Trash Icon
const TrashIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Local Filter Icon
const FilterIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

// Local External Link Icon
const ExternalLinkIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const DEFAULT_CATEGORY_COLOR = "#6366f1";
const THUMB_FALLBACK_BG = "#eff6ff";

function formatCompactNumber(value) {
  const n = Number(value ?? 0);
  if (Number.isNaN(n)) return "0";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

function categoryColor(name) {
  if (!name) return DEFAULT_CATEGORY_COLOR;
  let h = 0;
  for (let i = 0; i < name.length; i += 1) {
    h = name.charCodeAt(i) + ((h << 5) - h);
  }
  const hue = Math.abs(h) % 360;
  return `hsl(${hue}, 65%, 48%)`;
}

export default function FavoriteDocuments() {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await documentService.getMyBookmarks(page, 10);
        if (cancelled) return;
        setItems(Array.isArray(data?.content) ? data.content : []);
        setTotalPages(Number(data?.totalPages) || 0);
      } catch (e) {
        if (!cancelled) {
          setError(getApiErrorMessage(e));
          setItems([]);
          setTotalPages(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, location.pathname, location.key]);

  return (
    <div className="favorite-documents-container">
      <main className="favorite-documents-content">
        <header className="favorite-header">
          <div className="favorite-title-section">
            <h1>Tài liệu yêu thích</h1>
            <p className="favorite-subtitle">Danh sách các tài liệu đã lưu.</p>
          </div>
        </header>

        {error && (
          <div style={{ color: "#ef4444", fontSize: "14px", marginBottom: "16px" }}>{error}</div>
        )}

        <div className="favorite-list">
          {loading ? (
            <div style={{ padding: "24px", color: "#64748b" }}>Đang tải…</div>
          ) : (
            items.map((item) => {
              const cat = item.categoryName || "—";
              const catColor = categoryColor(cat);

              return (
                <div key={item.id} className="favorite-card">
                  <div className="card-thumb-wrapper" style={{ backgroundColor: THUMB_FALLBACK_BG }}>
                    <div className="category-badge" style={{ backgroundColor: catColor }}>
                      {cat}
                    </div>
                    <img
                      src={getDocumentThumbnailUrl(item)}
                      alt=""
                      onError={onDocumentThumbnailError}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div className="card-info">
                    <div className="view-time">
                      <ClockIcon size={14} />
                      <span>Xem lúc: —</span>
                    </div>
                    <h2 className="card-title">{item.title || "—"}</h2>
                    <div className="card-meta">
                      <div className="meta-item">
                        <UsersIcon size={16} />
                        <span>Tác giả: {item.authorName || "—"}</span>
                      </div>
                      <div className="meta-item">
                        <ListIcon size={16} />
                        <span>Danh mục: {cat}</span>
                      </div>
                    </div>
                    <div className="card-stats">
                      <div className="stat-item">
                        <EyeIcon size={14} />
                        <span>{formatCompactNumber(item.viewCount)}</span>
                      </div>
                      <div className="stat-item">
                        <DownloadIcon size={14} />
                        <span>{formatCompactNumber(item.downloadCount)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="view-btn"
                    onClick={() => item.id && navigate(`/documents/${item.id}`)}
                  >
                    <ExternalLinkIcon size={18} color="white" />
                    Xem lại
                  </button>
                </div>
              );
            })
          )}
        </div>

        {!loading && !error && items.length === 0 && (
          <div style={{ padding: "24px", color: "#64748b" }}>Chưa có tài liệu đã lưu.</div>
        )}

        {totalPages > 0 && (
          <div className="pagination">
            <button
              type="button"
              className="page-btn"
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <ChevronLeftIcon size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`page-btn ${i === page ? "active" : ""}`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="page-btn"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
