import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/admin/AdminLayout';
import '../../styles/admin/adminDashboard.css';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <main className="admin-main">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Tổng quan Dashboard</h1>
            <p>Chào mừng quay trở lại, quản trị viên.</p>
          </div>
          <div className="header-actions">
            <button className="btn-date">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Tháng này
            </button>
            <button className="btn-export">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Xuất báo cáo
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-icon icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <line x1="19" y1="8" x2="19" y2="14"></line>
                  <line x1="22" y1="11" x2="16" y2="11"></line>
                </svg>
              </div>
              <span className="stats-trend trend-up">+12%</span>
            </div>
            <p className="stats-label">Tăng trưởng người dùng</p>
            <h2 className="stats-value">+1,250</h2>
          </div>

          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-icon icon-indigo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <span className="stats-trend trend-up">+5%</span>
            </div>
            <p className="stats-label">Tài liệu mới</p>
            <h2 className="stats-value">432</h2>
          </div>

          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-icon icon-sky">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <path d="M9 16l2 2 4-4"></path>
                </svg>
              </div>
              <span className="stats-trend trend-down">-2%</span>
            </div>
            <p className="stats-label">Yêu cầu chờ duyệt</p>
            <h2 className="stats-value">28</h2>
          </div>
        </section>

        {/* Chart Section */}
        <section className="chart-card">
          <div className="chart-header">
            <h3>Hoạt động hệ thống</h3>
            <select className="chart-filter">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <div className="chart-container">
            <svg width="100%" height="100%" viewBox="0 0 800 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007AFF" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="800" y2="40" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="0" y1="80" x2="800" y2="80" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="0" y1="120" x2="800" y2="120" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="0" y1="160" x2="800" y2="160" stroke="#F2F4F7" strokeWidth="1" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#F2F4F7" strokeWidth="1" />
              
              <path d="M0 160 C 50 120, 100 80, 150 100 S 250 140, 300 100 S 400 160, 450 120 S 550 130, 600 160 S 700 80, 750 120 L 800 100 L 800 240 L 0 240 Z" fill="url(#chartGradient)" />
              
              <path 
                d="M0 160 C 50 120, 100 80, 150 100 S 250 140, 300 100 S 400 160, 450 120 S 550 130, 600 160 S 700 80, 750 120 L 800 100" 
                fill="none" 
                stroke="#007AFF" 
                strokeWidth="4" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text x="10" y="230" fill="#98A2B3" fontSize="12">Thứ 2</text>
              <text x="150" y="230" fill="#98A2B3" fontSize="12">Thứ 3</text>
              <text x="300" y="230" fill="#98A2B3" fontSize="12">Thứ 4</text>
              <text x="450" y="230" fill="#98A2B3" fontSize="12">Thứ 5</text>
              <text x="600" y="230" fill="#98A2B3" fontSize="12">Thứ 6</text>
              <text x="750" y="230" fill="#98A2B3" fontSize="12">Thứ 7</text>
              <text x="750" y="230" fill="#98A2B3" fontSize="12" textAnchor="end">Chủ Nhật</text>
            </svg>
          </div>
        </section>

        {/* Table Section */}
        <section className="table-card">
          <div className="table-header">
            <h3>Yêu cầu kiểm duyệt gần đây</h3>
            <Link to="/admin/content" className="btn-view-all">Xem tất cả</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tên tài liệu</th>
                <th>Người gửi</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="file-info">
                    <div className="file-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <span>Báo cáo Q3 2023.pdf</span>
                  </div>
                </td>
                <td>Lê Minh Tâm</td>
                <td>12/10/2023</td>
                <td><span className="status-badge status-pending">ĐANG CHỜ</span></td>
                <td className="actions-cell">
                  <button className="action-btn approve">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button className="action-btn reject">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="file-info">
                    <div className="file-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                    <span>Banner_QC_Final.jpg</span>
                  </div>
                </td>
                <td>Trần Hoàng Nam</td>
                <td>11/10/2023</td>
                <td><span className="status-badge status-approved">ĐÃ DUYỆT</span></td>
                <td className="actions-cell">
                  <button className="action-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="file-info">
                    <div className="file-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <span>Hop_dong_lao_dong.docx</span>
                  </div>
                </td>
                <td>Phạm Mỹ Linh</td>
                <td>10/10/2023</td>
                <td><span className="status-badge status-rejected">TỪ CHỐI</span></td>
                <td className="actions-cell">
                  <button className="action-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="file-info">
                    <div className="file-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <span>Quy_che_cong_ty_v2.pdf</span>
                  </div>
                </td>
                <td>Nguyễn Gia Huy</td>
                <td>09/10/2023</td>
                <td><span className="status-badge status-pending">ĐANG CHỜ</span></td>
                <td className="actions-cell">
                  <button className="action-btn approve">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button className="action-btn reject">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </AdminLayout>
  );
};

export default AdminDashboard;
