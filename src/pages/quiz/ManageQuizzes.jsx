import React from "react";
import { EyeIcon, PlusIcon } from "../../components/icons";
import "../../styles/manageQuizzes.css";

// Local icons for management
const EditIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const LinkIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const FileTextIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CheckCircleIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ClockIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const quizzesData = [
  {
    id: "TEST-9821",
    name: "Đánh giá Giải tích 1 - Cuối kỳ",
    linkedDoc: "Giáo trình Giải tích 1",
    createdDate: "12/10/2023",
    questionsCount: 20,
    status: "approved"
  },
  {
    id: "TEST-4420",
    name: "Kiến thức Marketing căn bản",
    linkedDoc: "Nguyên lý Marketing Kotler",
    createdDate: "15/10/2023",
    questionsCount: 15,
    status: "pending"
  },
  {
    id: "TEST-1209",
    name: "Lập trình Java Nâng cao",
    linkedDoc: "Java Core & Spring Boot",
    createdDate: "18/10/2023",
    questionsCount: 30,
    status: "rejected"
  },
  {
    id: "TEST-5561",
    name: "Tiếng Anh Giao tiếp B1",
    linkedDoc: "English Grammar in Use",
    createdDate: "20/10/2023",
    questionsCount: 25,
    status: "approved"
  }
];

export default function ManageQuizzes() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved": return <span className="status-badge approved">Đã duyệt</span>;
      case "pending": return <span className="status-badge pending">Chờ duyệt</span>;
      case "rejected": return <span className="status-badge rejected">Bị từ chối</span>;
      default: return null;
    }
  };

  return (
    <div className="manage-quizzes-container">
      <Header />
      
      <main className="manage-quizzes-content">
        <nav className="breadcrumb">
          <span>CÁ NHÂN</span>
          <span>/</span>
          <span className="active">QUẢN LÝ BÀI ĐÁNH GIÁ</span>
        </nav>

        <div className="manage-quizzes-header">
          <h1>Quản lý bài đánh giá cá nhân</h1>
          <button className="create-new-btn">
            <PlusIcon size={18} />
            Tạo bài đánh giá mới
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-box blue">
              <FileTextIcon />
            </div>
            <div className="stat-info">
              <span className="stat-label">Tổng bài viết</span>
              <span className="stat-value">24</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-box green">
              <CheckCircleIcon />
            </div>
            <div className="stat-info">
              <span className="stat-label">Đã duyệt</span>
              <span className="stat-value">18</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon-box orange">
              <ClockIcon />
            </div>
            <div className="stat-info">
              <span className="stat-label">Đang chờ</span>
              <span className="stat-value">06</span>
            </div>
          </div>
        </div>

        <div className="quizzes-table-container">
          <table className="quizzes-table">
            <thead>
              <tr>
                <th>Tên bài đánh giá</th>
                <th>Tài liệu liên quan</th>
                <th>Ngày tạo</th>
                <th>Số câu hỏi</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {quizzesData.map((quiz) => (
                <tr key={quiz.id}>
                  <td>
                    <div className="quiz-title-cell">
                      <span className="quiz-name">{quiz.name}</span>
                      <span className="quiz-id">ID: {quiz.id}</span>
                    </div>
                  </td>
                  <td>
                    <a href="#" className="linked-doc-link">
                      <LinkIcon />
                      {quiz.linkedDoc}
                    </a>
                  </td>
                  <td>
                    <span className="date-cell">{quiz.createdDate}</span>
                  </td>
                  <td>
                    <span className="questions-count-cell">{quiz.questionsCount}</span>
                  </td>
                  <td>
                    {getStatusBadge(quiz.status)}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn" title="Xem chi tiết"><EyeIcon size={18} /></button>
                      <button className="action-btn" title="Chỉnh sửa"><EditIcon size={18} /></button>
                      <button className="action-btn" title="Xóa"><TrashIcon size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <div className="pagination-info">
              Hiển thị 1-4 trong số 24 bài đánh giá
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
