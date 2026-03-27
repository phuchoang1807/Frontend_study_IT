import React from "react";
import {
  ClockIcon,
  UsersIcon,
  ListIcon,
  EyeIcon,
  DownloadIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LogoutIcon // Dùng cho icon xóa
} from "../../components/icons";
import "../../styles/viewHistory.css";

const historyData = [
  {
    id: 1,
    title: "Hướng dẫn lập trình React Native cho người mới",
    category: "CÔNG NGHỆ",
    categoryColor: "#3b82f6",
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
    viewTime: "09:45 - 19/10/2023",
    author: "Lê Văn C",
    field: "Thiết kế đồ họa",
    views: "890",
    downloads: "120",
    thumbIcon: "🎨"
  }
];

export default function ViewHistory() {
  return (
    <div className="view-history-container">
      <main className="view-history-content">
        <header className="history-header">
          <div className="history-title-section">
            <h1>Lịch sử tài liệu đã xem</h1>
            <p className="history-subtitle">Danh sách các tài liệu bạn đã truy cập trong 30 ngày qua.</p>
          </div>
          <div className="history-actions">
            <button className="action-btn">
              <ListIcon size={16} />
              Lọc
            </button>
            <button className="action-btn delete">
              <LogoutIcon size={16} />
              Xóa lịch sử
            </button>
          </div>
        </header>

        <div className="history-list">
          {historyData.map((item) => (
            <div key={item.id} className="history-card">
              <div className="card-thumb-wrapper">
                <div 
                  className="category-badge" 
                  style={{ backgroundColor: item.categoryColor }}
                >
                  {item.category}
                </div>
                {item.thumbText ? (
                  <span style={{ fontSize: "24px", fontWeight: 700, color: "#94a3b8" }}>{item.thumbText}</span>
                ) : (
                  <span style={{ fontSize: "40px" }}>{item.thumbIcon}</span>
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
                    <UsersIcon size={14} />
                    <span>Tác giả: {item.author}</span>
                  </div>
                  <div className="meta-item">
                    <ListIcon size={14} />
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
                <EyeIcon size={16} color="white" />
                Xem lại
              </button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="page-btn">
            <ChevronLeftIcon size={14} />
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">12</button>
          <button className="page-btn">
            <ChevronRightIcon size={14} />
          </button>
        </div>
      </main>
    </div>
  );
}
