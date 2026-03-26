import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  LayoutIcon,
  MonitorIcon,
  NetworkIcon,
  DatabaseIcon,
  FilterIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldIcon,
  StarIcon,
  ClockIcon
} from "../../components/icons";
import "../../styles/quizHistory.css";

const historyData = [
  {
    id: 1,
    name: "Cấu trúc dữ liệu",
    score: "85/100",
    date: "10/10/2023",
    status: "Đạt",
    icon: <LayoutIcon size={20} />
  },
  {
    id: 2,
    name: "Giải thuật nâng cao",
    score: "40/100",
    date: "12/10/2023",
    status: "Chưa đạt",
    icon: <MonitorIcon size={20} />
  },
  {
    id: 3,
    name: "Mạng máy tính",
    score: "90/100",
    date: "15/10/2023",
    status: "Đạt",
    icon: <NetworkIcon size={20} />
  },
  {
    id: 4,
    name: "Cơ sở dữ liệu SQL",
    score: "78/100",
    date: "20/10/2023",
    status: "Đạt",
    icon: <DatabaseIcon size={20} />
  }
];

export default function QuizHistory() {
  return (
    <div className="quiz-history-container">
      <Header />

      <main className="quiz-history-content">
        <header className="quiz-history-header">
          <div className="title-section">
            <h1>Lịch sử làm bài đánh giá</h1>
            <p className="subtitle">Xem lại kết quả và chi tiết các bài kiểm tra bạn đã hoàn thành.</p>
          </div>
          <button className="filter-btn">
            <FilterIcon size={16} />
            Bộ lọc
          </button>
        </header>

        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>TÊN BÀI ĐÁNH GIÁ</th>
                <th>ĐIỂM SỐ</th>
                <th>NGÀY LÀM BÀI</th>
                <th>TRẠNG THÁI</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="quiz-name-cell">
                      <div className="quiz-icon-wrapper">
                        {item.icon}
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="score-cell">{item.score}</td>
                  <td>{item.date}</td>
                  <td>
                    <div className={`status-badge ${item.status === "Đạt" ? "pass" : "fail"}`}>
                      {item.status === "Đạt" ? (
                        <CheckCircleIcon size={14} />
                      ) : (
                        <XCircleIcon size={14} />
                      )}
                      {item.status}
                    </div>
                  </td>
                  <td>
                    <a href={`/quiz-detail/${item.id}`} className="action-link">
                      Xem chi tiết
                      <ChevronRightIcon size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <div className="entries-info">
              Hiển thị 1-4 trên tổng số 12 bài
            </div>
            <div className="pagination-controls">
              <button className="page-btn">
                <ChevronLeftIcon size={12} />
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">
                <ChevronRightIcon size={12} />
              </button>
            </div>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card pass-rate">
            <div className="card-icon-container">
              <ShieldIcon size={24} />
            </div>
            <div className="card-content">
              <span className="card-label">TỶ LỆ ĐẠT</span>
              <span className="card-value">82%</span>
              <p className="card-desc">Cao hơn 12% so với tháng trước</p>
            </div>
          </div>

          <div className="summary-card average-score">
            <div className="card-icon-container">
              <StarIcon size={24} />
            </div>
            <div className="card-content">
              <span className="card-label">ĐIỂM TRUNG BÌNH</span>
              <span className="card-value">73.5</span>
              <p className="card-desc">Dựa trên tất cả các bài kiểm tra</p>
            </div>
          </div>

          <div className="summary-card total-time">
            <div className="card-icon-container">
              <ClockIcon size={24} />
            </div>
            <div className="card-content">
              <span className="card-label">TỔNG THỜI GIAN</span>
              <span className="card-value">240 phút</span>
              <p className="card-desc">Đã dành cho việc ôn luyện</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
