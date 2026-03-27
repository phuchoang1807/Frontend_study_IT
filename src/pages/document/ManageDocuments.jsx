import React, { useState } from "react";
import { 
  EyeIcon, 
  UploadIcon, 
  DocumentIcon
} from "../../components/icons";
import "../../styles/manageDocuments.css";

// Local icons for management
const EditIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const FileTextIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const MonitorIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

export default function ManageDocuments() {
  const [activeTab, setActiveTab] = useState("all");

  const docsData = [
    {
      id: 1,
      title: "Hướng dẫn thiết kế UI/UX nâng cao",
      type: "PDF",
      size: "12.5 MB",
      date: "12/10/2023",
      status: "approved",
      views: "1,250",
      downloads: "450",
      iconType: "pdf"
    },
    {
      id: 2,
      title: "Tài liệu kỹ thuật React Native v2.0",
      type: "DOCX",
      size: "5.2 MB",
      date: "15/10/2023",
      status: "pending",
      views: "0",
      downloads: "0",
      iconType: "docx"
    },
    {
      id: 3,
      title: "Nguyên lý thiết kế đồ họa cơ bản",
      type: "PPTX",
      size: "28 MB",
      date: "10/10/2023",
      status: "rejected",
      views: "0",
      downloads: "0",
      iconType: "pptx"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved": return <span className="status-badge approved">Đã duyệt</span>;
      case "pending": return <span className="status-badge pending">Chờ duyệt</span>;
      case "rejected": return <span className="status-badge rejected">Bị từ chối</span>;
      default: return null;
    }
  };

  const getDocIcon = (type) => {
    switch (type) {
      case "pdf": return <div className="doc-icon-box pdf"><DocumentIcon size={20} /></div>;
      case "docx": return <div className="doc-icon-box docx"><FileTextIcon size={20} /></div>;
      case "pptx": return <div className="doc-icon-box pptx"><MonitorIcon size={20} /></div>;
      default: return <div className="doc-icon-box pdf"><DocumentIcon size={20} /></div>;
    }
  };

  return (
    <div className="manage-docs-container">
      <Header />
      
      <main className="manage-docs-content">
        <div className="manage-docs-header">
          <div className="header-left">
            <h1>Tài liệu của tôi</h1>
            <p>Quản lý và theo dõi trạng thái các tài liệu bạn đã đăng tải</p>
          </div>
          <button className="upload-new-btn">
            <UploadIcon size={16} color="white" />
            Đăng tải tài liệu mới
          </button>
        </div>

        <div className="docs-tabs-container">
          <div className="tabs-header">
            <div 
              className={`tab-item ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              Tất cả <span className="tab-count">12</span>
            </div>
            <div 
              className={`tab-item ${activeTab === "approved" ? "active" : ""}`}
              onClick={() => setActiveTab("approved")}
            >
              Đã duyệt
            </div>
            <div 
              className={`tab-item ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Chờ duyệt
            </div>
            <div 
              className={`tab-item ${activeTab === "rejected" ? "active" : ""}`}
              onClick={() => setActiveTab("rejected")}
            >
              Bị từ chối
            </div>
          </div>

          <div className="docs-table-wrapper">
            <table className="docs-table">
              <thead>
                <tr>
                  <th>TIÊU ĐỀ TÀI LIỆU</th>
                  <th>NGÀY ĐĂNG</th>
                  <th>TRẠNG THÁI</th>
                  <th style={{ textAlign: 'center' }}>LƯỢT XEM</th>
                  <th style={{ textAlign: 'center' }}>LƯỢT TẢI</th>
                  <th style={{ textAlign: 'right' }}>HÀNH ĐỘNG</th>
                </tr>
              </thead>
              <tbody>
                {docsData.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="doc-info-cell">
                        {getDocIcon(doc.iconType)}
                        <div className="doc-title-main">
                          <span className="doc-title-text">{doc.title}</span>
                          <span className="doc-meta-text">{doc.type} • {doc.size}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="date-cell">{doc.date}</span>
                    </td>
                    <td>
                      {getStatusBadge(doc.status)}
                    </td>
                    <td>
                      <div className="stats-cell">{doc.views}</div>
                    </td>
                    <td>
                      <div className="stats-cell">{doc.downloads}</div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="action-btn"><EyeIcon size={18} /></button>
                        <button className="action-btn"><EditIcon size={18} /></button>
                        <button className="action-btn"><TrashIcon size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="pagination-info">
              Hiển thị 1 - 3 trên tổng số 12 tài liệu
            </div>
            <div className="pagination-controls">
              <button className="arrow-btn">{"<"}</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="arrow-btn">{">"}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
