import React from 'react';
import '../../../styles/admin/contributorDetailModal.css';

const ContributorDetailModal = ({ isOpen, onClose, contributor }) => {
  if (!isOpen || !contributor) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <header className="modal-header">
          <div className="modal-title-group">
            <h4>CHI TIẾT YÊU CẦU CONTRIBUTOR</h4>
            <h2>{contributor.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* Body */}
        <div className="modal-body">
          {/* Profile info */}
          <section className="profile-section">
            <div className="profile-img-container">
              <img src={contributor.avatar} alt={contributor.name} className="profile-img" />
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>HỌ TÊN</label>
                <p>{contributor.name}</p>
              </div>
              <div className="info-item">
                <label>EMAIL</label>
                <p>{contributor.email}</p>
              </div>
              <div className="info-item full-width">
                <label>GIỚI THIỆU BẢN THÂN</label>
                <p className="bio-text">
                  "Tôi là một nhà thiết kế UI/UX với hơn 5 năm kinh nghiệm làm việc trong các dự án Fintech và E-commerce. Tôi đam mê việc tạo ra các giải pháp kỹ thuật số tối ưu hóa trải nghiệm người dùng thông qua sự tinh tế và chính xác.Tôi là một nhà thiết kế UI/UX với hơn 5 năm kinh nghiệm làm việc trong các dự án Fintech và E-commerce. Tôi đam mê việc tạo ra các giải pháp kỹ thuật số tối ưu hóa trải nghiệm người dùng thông qua sự tinh tế và chính xác."
                </p>
              </div>
            </div>
          </section>

          {/* Experience and Attachments */}
          <div className="content-split">
            <div className="experience-col">
              <label className="section-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                MÔ TẢ KINH NGHIỆM
              </label>
              <ul className="experience-list">
                <li>5 năm Senior UI/UX Designer tại tập đoàn công nghệ XYZ.</li>
                <li>Thành thạo Figma, Adobe Creative Cloud và các công cụ prototyping.</li>
                <li>Có kinh nghiệm xây dựng Design System quy mô lớn.</li>
                <li>5 năm Senior UI/UX Designer tại tập đoàn công nghệ XYZ.</li>
                <li>Thành thạo Figma, Adobe Creative Cloud và các công cụ prototyping.</li>
                <li>Có kinh nghiệm xây dựng Design System quy mô lớn.</li>
              </ul>
            </div>
            <div className="attachments-col">
              <label className="section-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
                HỒ SƠ ĐÍNH KÈM
              </label>
              <div className="attachments-list">
                <a href="#" className="attachment-card">
                  <div className="attachment-icon pdf">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">Chung_chi_HCI.pdf</span>
                    <span className="attachment-meta">2.4 MB</span>
                  </div>
                  <div className="attachment-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                </a>
                <a href="#" className="attachment-card">
                  <div className="attachment-icon link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">Dribbble Portfolio</span>
                    <span className="attachment-meta">dribbble.com/nguyenvana</span>
                  </div>
                  <div className="attachment-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </a>
                <a href="#" className="attachment-card">
                  <div className="attachment-icon link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">Dribbble Portfolio</span>
                    <span className="attachment-meta">dribbble.com/nguyenvana</span>
                  </div>
                  <div className="attachment-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </a>
                <a href="#" className="attachment-card">
                  <div className="attachment-icon link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </div>
                  <div className="attachment-info">
                    <span className="attachment-name">Dribbble Portfolio</span>
                    <span className="attachment-meta">dribbble.com/nguyenvana</span>
                  </div>
                  <div className="attachment-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="status-banner">
            <div className="status-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M9 16l2 2 4-4"></path>
              </svg>
            </div>
            <div className="status-details">
              <label>TRẠNG THÁI HIỆN TẠI</label>
              <p>Đang chờ xét duyệt (Gửi cách đây 2 ngày)</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="modal-footer">
          <div className="footer-left">
            <button className="btn-modal btn-outline-danger">Từ chối</button>
            <button className="btn-modal btn-secondary">Yêu cầu bổ sung</button>
          </div>
          <button className="btn-modal btn-primary-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            Phê duyệt yêu cầu
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ContributorDetailModal;
