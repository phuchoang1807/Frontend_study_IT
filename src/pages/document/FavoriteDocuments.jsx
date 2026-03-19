import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ClockIcon,
  UsersIcon,
  ListIcon,
  EyeIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "../../components/icons";
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

const favoriteData = [
  {
    id: 1,
    title: "Hướng dẫn lập trình React Native cho người mới",
    category: "CÔNG NGHỆ",
    categoryColor: "#3b82f6",
    thumbBg: "#eff6ff",
    viewTime: "14:30 - 20/10/2023",
    author: "Nguyễn Văn A",
    field: "Lập trình di động",
    views: "1.2k",
    downloads: "450",
    thumbText: "JS"
  },
  {
    id: 2,
    title: "Lập trình OOP",
    category: "KINH TẾ",
    categoryColor: "#f59e0b",
    thumbBg: "#fff7ed",
    viewTime: "10:15 - 20/10/2023",
    author: "Trần Thị B",
    field: "Lập trình web",
    views: "3.8k",
    downloads: "1.1k",
    thumbIcon: "🏛️"
  },
  {
    id: 3,
    title: "Nguyên lý thiết kế UI/UX hiện đại cho Website",
    category: "NGHỆ THUẬT",
    categoryColor: "#10b981",
    thumbBg: "#f0fdf4",
    viewTime: "09:45 - 19/10/2023",
    author: "Lê Văn C",
    field: "Thiết kế đồ họa",
    views: "890",
    downloads: "120",
    thumbIcon: "🎨"
  }
];

export default function FavoriteDocuments() {
  return (
    <div className="favorite-documents-container">
      <Header />
      
      <main className="favorite-documents-content">
        <header className="favorite-header">
          <div className="favorite-title-section">
            <h1>Tài liệu yêu thích</h1>
            <p className="favorite-subtitle">Danh sách các tài liệu đã lưu.</p>
          </div>
          <div className="favorite-actions">
            <button className="action-btn">
              <FilterIcon size={18} />
              Lọc
            </button>
            <button className="action-btn delete">
              <TrashIcon size={18} />
              Xóa
            </button>
          </div>
        </header>

        <div className="favorite-list">
          {favoriteData.map((item) => (
            <div key={item.id} className="favorite-card">
              <div 
                className="card-thumb-wrapper"
                style={{ backgroundColor: item.thumbBg }}
              >
                <div 
                  className="category-badge" 
                  style={{ backgroundColor: item.categoryColor }}
                >
                  {item.category}
                </div>
                {item.thumbText ? (
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#94a3b8" }}>{item.thumbText}</span>
                ) : (
                  <span style={{ fontSize: "48px" }}>{item.thumbIcon}</span>
                )}
              </div>

              <div className="card-info">
                <div className="view-time">
                  <ClockIcon size={14} />
                  <span>Xem lúc: {item.viewTime}</span>
                </div>
                <h2 className="card-title">{item.title}</h2>
                <div className="card-meta">
                  <div className="meta-item">
                    <UsersIcon size={16} />
                    <span>Tác giả: {item.author}</span>
                  </div>
                  <div className="meta-item">
                    <ListIcon size={16} />
                    <span>Chuyên mục: {item.field}</span>
                  </div>
                </div>
                <div className="card-stats">
                  <div className="stat-item">
                    <EyeIcon size={14} />
                    <span>{item.views}</span>
                  </div>
                  <div className="stat-item">
                    <DownloadIcon size={14} />
                    <span>{item.downloads}</span>
                  </div>
                </div>
              </div>

              <button className="view-btn">
                <ExternalLinkIcon size={18} color="white" />
                Xem lại
              </button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="page-btn">
            <ChevronLeftIcon size={16} />
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">12</button>
          <button className="page-btn">
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
