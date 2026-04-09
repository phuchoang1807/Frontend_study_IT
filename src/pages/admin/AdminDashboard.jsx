import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin/adminDashboard.css';

const AdminDashboard = () => {
  const newUsers = [
    { name: "Lê Minh Tâm", date: "12/10/2023" },
    { name: "Trần Hoàng Nam", date: "11/10/2023" },
    { name: "Phạm Mỹ Linh", date: "10/10/2023" },
    { name: "Nguyễn Gia Huy", date: "09/10/2023" },
  ];

  return (
    <main className="admin-main">
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Tổng quan Dashboard</h1>
          <p>Chào mừng quay trở lại, quản trị viên.</p>
        </div>
        <div className="header-actions">
          <button className="btn-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            Tháng này
          </button>
          <button className="btn-export">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
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
          <h3>Người dùng mới tham gia</h3>
          <Link to="/admin/users" className="btn-view-all">Xem tất cả</Link>
        </div>

        <table className="admin-table new-users-table">
          <thead>
            <tr>
              <th>TÊN NGƯỜI DÙNG</th>
              <th>NGÀY</th>
            </tr>
          </thead>
          <tbody>
            {newUsers.map((user, index) => (
              <tr key={index}>
                <td className="user-name-cell">{user.name}</td>
                <td className="date-cell">{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </main>
  );
};

export default AdminDashboard;
