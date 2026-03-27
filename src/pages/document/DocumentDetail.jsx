import React from "react";
import {
  ChevronRightIcon,
  EyeIcon,
  BookmarkIcon,
  DownloadIcon,
  MessageIcon,
  SearchIcon,
  PlusIcon,
  HeartIcon,
  ShareIcon,
  AlertIcon,
  ListIcon,
  ClockIcon,
  MaximizeIcon,
  MinusIcon,
} from "../../components/icons";
import "../../styles/documentDetail.css";

// Mock data for the PDF page
const pdfPageMock = "https://placehold.co/800x1132/white/black?text=TÀI+LIỆU+HƯỚNG+DẪN+LẬP+TRÌNH+REACT+CƠ+BẢN+(CRUD)";

const comments = [
  {
    id: 1,
    user: "Lê Thị Mai Anh",
    avatar: "https://placehold.co/40x40",
    time: "2 giờ trước",
    content: "Tài liệu rất chi tiết, đặc biệt là phần Hooks và Context API. Cảm ơn tác giả đã chia sẻ!",
    likes: 36,
    isAuthor: true
  },
  {
    id: 2,
    user: "Trần Tú Lệ",
    avatar: "https://placehold.co/40x40",
    time: "3 giờ trước",
    content: "Tài liệu trình bày rõ ràng, đặc biệt phần Hooks và Context API rất hữu ích. Cảm ơn tác giả!",
    likes: 36
  }
];

const exercises = [
  {
    id: 1,
    title: "Kiểm tra kiến thức ReactJS cơ bản",
    questions: 15,
    duration: "20 phút"
  },
  {
    id: 2,
    title: "Hooks & State Management Quiz",
    questions: 10,
    duration: "15 phút"
  }
];

const relatedDocs = [
  {
    id: 1,
    title: "Cấu trúc dữ liệu và giải thuật với JS",
    views: "4.5k lượt xem",
    thumb: "https://placehold.co/64x64/orange/white?text=JS"
  },
  {
    id: 2,
    title: "NodeJS & Express Framework chuyên sâu",
    views: "2.1k lượt xem",
    thumb: "https://placehold.co/64x64/blue/white?text=Node"
  }
];

export default function DocumentDetail() {
  return (
    <div className="document-detail-container">
      <main className="document-detail-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-item">Trang chủ</a>
          <ChevronRightIcon size={12} color="#64748b" />
          <a href="/documents" className="breadcrumb-item">Danh sách tài liệu</a>
          <ChevronRightIcon size={12} color="#64748b" />
          <span className="breadcrumb-item active">Hướng dẫn lập trình ReactJS từ cơ bản đến nâng cao</span>
        </nav>

        <div className="document-main-layout">
          {/* Left Column */}
          <div className="document-left-column">
            {/* PDF Viewer */}
            <div className="pdf-viewer-container">
              <div className="pdf-viewer-header">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="pdf-badge">PDF</span>
                  <span className="pdf-page-info">Trang 1 / 45</span>
                </div>
                <div className="pdf-controls">
                  <div className="pdf-control-btn"><SearchIcon size={16} /></div>
                  <div className="pdf-control-btn"><SearchIcon size={16} /></div>
                  <div className="pdf-control-btn"><MaximizeIcon size={16} /></div>
                </div>
              </div>
              
              <div className="pdf-content">
                <img src={pdfPageMock} alt="PDF Page 1" className="pdf-page-image" />
                <div className="view-more-overlay">
                  <button className="view-more-btn">
                    <ChevronRightIcon size={14} style={{ transform: 'rotate(90deg)' }} />
                    Xem thêm các trang khác
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="comments-section">
              <div className="comments-header">
                <MessageIcon size={20} color="#007bff" />
                <h3 className="comments-title">Bình luận (12)</h3>
              </div>

              <div className="comment-input-container">
                <img src="https://placehold.co/40x40" alt="User Avatar" className="user-avatar" />
                <div className="comment-textarea-wrapper">
                  <textarea 
                    className="comment-textarea" 
                    placeholder="Chia sẻ cảm nghĩ của bạn về tài liệu này..."
                  ></textarea>
                  <button className="submit-comment-btn">Gửi bình luận</button>
                </div>
              </div>

              <div className="comment-list">
                {comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <img src={comment.avatar} alt={comment.user} className="user-avatar" />
                    <div className="comment-content-wrapper">
                      <div className="comment-user-info">
                        <span className="comment-user-name">{comment.user}</span>
                        <span className="comment-time">• {comment.time}</span>
                        {comment.isAuthor && <AlertIcon size={12} color="#64748b" />}
                      </div>
                      <p className="comment-text">{comment.content}</p>
                      <div className="comment-actions">
                        <div className="comment-action-item">
                          <HeartIcon size={14} />
                          <span>{comment.likes}</span>
                        </div>
                        <div className="comment-action-item">Phản hồi</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <button style={{ background: "none", border: "none", color: "#64748b", fontSize: "12px", cursor: "pointer" }}>
                  Xem thêm
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="document-right-column">
            {/* Main Info */}
            <div className="document-info-card">
              <h1 className="document-title">Hướng dẫn lập trình ReactJS từ cơ bản đến nâng cao</h1>
              
              <div className="author-info">
                <div className="author-details">
                  <img src="https://placehold.co/40x40" alt="Author" className="user-avatar" />
                  <div className="author-name-wrapper">
                    <span className="posted-by">Đăng bởi</span>
                    <span className="author-name">Nguyễn Văn A</span>
                  </div>
                </div>
                <button className="follow-btn">Theo dõi</button>
              </div>

              <p className="document-description">
                Tài liệu tổng hợp các kiến thức cốt lõi về ReactJS phiên bản 18+, bao gồm Functional Components, Hooks, State Management (Redux/Zustand), và cách tối ưu hóa Performance. Phù hợp cho cả người mới bắt đầu và lập trình viên muốn củng cố kiến thức.
              </p>

              <div className="document-tags">
                <span className="tag">#ReactJS</span>
                <span className="tag">#Javascript</span>
                <span className="tag">#WebDevelopment</span>
                <span className="tag">#FrontEnd</span>
              </div>

              <div className="document-stats">
                <div className="stat-item">
                  <div className="stat-label">Lượt xem</div>
                  <div className="stat-value">12.5k</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Lượt tải</div>
                  <div className="stat-value">3.2k</div>
                </div>
              </div>

              <button className="primary-action-btn">
                <DownloadIcon size={18} />
                Tải xuống ngay (2.4 MB)
              </button>

              <div className="secondary-actions">
                <button className="secondary-btn">
                  <BookmarkIcon size={16} />
                  Lưu tài liệu
                </button>
                <button className="secondary-btn report">
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
                {exercises.map(ex => (
                  <div key={ex.id} className="exercise-item">
                    <div className="exercise-name">{ex.title}</div>
                    <div className="exercise-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageIcon size={12} /> {ex.questions} câu hỏi
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ClockIcon size={12} /> {ex.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-btn">Xem tất cả bài đánh giá</button>
            </div>

            {/* Related Documents */}
            <div className="sidebar-card">
              <div className="card-title">Tài liệu liên quan</div>
              <div className="related-list">
                {relatedDocs.map(doc => (
                  <div key={doc.id} className="related-item">
                    <img src={doc.thumb} alt={doc.title} className="related-thumb" />
                    <div className="related-info">
                      <div className="related-title">{doc.title}</div>
                      <div className="related-meta">{doc.views}</div>
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
