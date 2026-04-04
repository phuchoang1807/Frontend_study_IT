import React from "react";
import { Navigate } from "react-router-dom";
import {
  UserCircleIcon,
  DocumentIcon,
  QuizIcon,
  StarIcon,
  ClockIcon,
} from "../../components/icons";
import "../../styles/dashboard.css";
import { useAuth } from "../../context/AuthContext";
import UserAvatarDisplay from "../../components/UserAvatarDisplay";
import { getProfileRoleBadges } from "../../utils/roleBadges";

const GridIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const CameraIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const EditIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrendingUpIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const LockIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default function Profile() {
  const { user, isAuthenticated, initializing } = useAuth();

  const activityData = [
    { id: 1, name: "Giải tích 1 - Chương 2", meta: "Đã xem • 15 phút trước", icon: <DocumentIcon color="#3b82f6" />, bg: "#eff6ff" },
    { id: 2, name: "Quiz: Cấu trúc dữ liệu", meta: "Hoàn thành: 9/10 • 2 giờ trước", icon: <QuizIcon color="#f97316" />, bg: "#fff7ed" },
    { id: 3, name: "Lập trình Java căn bản", meta: "Đã xem • Hôm qua", icon: <DocumentIcon color="#3b82f6" />, bg: "#eff6ff" },
    { id: 4, name: "Quiz: Đại số tuyến tính", meta: "Hoàn thành: 7/10 • 2 ngày trước", icon: <QuizIcon color="#f97316" />, bg: "#fff7ed" },
  ];

  const chartData = [
    { day: "T2", height: "40%" },
    { day: "T3", height: "60%" },
    { day: "T4", height: "30%" },
    { day: "T5", height: "80%" },
    { day: "T6", height: "50%" },
    { day: "T7", height: "20%" },
    { day: "CN", height: "45%" },
  ];

  if (initializing) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const roleBadges = getProfileRoleBadges(user.roles);

  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <section className="profile-card">
          <div className="profile-info-main">
            <div className="avatar-wrapper">
              <UserAvatarDisplay user={user} size="profile" />
              <button type="button" className="camera-btn">
                <CameraIcon color="white" size={16} />
              </button>
            </div>
            <div className="profile-text">
              <h2>
                {user.fullName || "—"}
                {roleBadges.map(({ role, label }) => (
                  <span key={role} className="role-badge">
                    {label}
                  </span>
                ))}
              </h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>
          <button type="button" className="edit-profile-btn">
            <EditIcon color="white" size={16} />
            Chỉnh sửa hồ sơ
          </button>
        </section>

        <section>
          <div className="section-header">
            <GridIcon color="#3b82f6" size={20} />
            <h3>Bảng điều khiển cá nhân</h3>
          </div>

          <div className="stats-grid">
            <div className="stat-card blue">
              <div>
                <div className="stat-label">SỐ TÀI LIỆU ĐÃ HỌC</div>
                <div className="stat-value">42</div>
              </div>
              <div className="stat-icon-bg">
                <DocumentIcon size={20} />
              </div>
            </div>

            <div className="stat-card orange">
              <div>
                <div className="stat-label">SỐ BÀI QUIZ ĐÃ LÀM</div>
                <div className="stat-value">15</div>
              </div>
              <div className="stat-icon-bg">
                <QuizIcon size={20} />
              </div>
            </div>

            <div className="stat-card green">
              <div>
                <div className="stat-label">ĐIỂM TRUNG BÌNH</div>
                <div className="stat-value">8.5</div>
              </div>
              <div className="stat-icon-bg">
                <StarIcon size={20} />
              </div>
            </div>

            <div className="stat-card blue-light">
              <div>
                <div className="stat-label">% TIẾN BỘ</div>
                <div className="stat-value">
                  +12%
                  <span className="month-badge">Tháng này</span>
                </div>
              </div>
              <div className="stat-icon-bg">
                <TrendingUpIcon size={20} />
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-middle-row">
          <div className="chart-card">
            <div className="card-title-row">
              <div className="card-title">
                <TrendingUpIcon color="#3b82f6" size={18} />
                Tiến độ học tập
              </div>
              <select className="chart-select">
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
              </select>
            </div>
            <div className="chart-container">
              <div className="chart-bars">
                {chartData.map((item, index) => (
                  <div key={index} className="chart-bar-group">
                    <div
                      className={`chart-bar ${item.day === "T5" ? "active" : ""}`}
                      style={{ height: item.height }}
                    ></div>
                    <span className="chart-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="activity-card">
            <div className="card-title">
              <ClockIcon color="#3b82f6" size={18} />
              Hoạt động gần đây
            </div>
            <div className="activity-list" style={{ marginTop: "24px" }}>
              {activityData.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: item.bg }}>
                    {item.icon}
                  </div>
                  <div className="activity-info">
                    <span className="activity-name">{item.name}</span>
                    <span className="activity-meta">{item.meta}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="view-all-link">Xem lịch sử học tập</a>
          </div>
        </div>

        <section className="personal-info-card">
          <div className="card-title" style={{ marginBottom: "24px" }}>
            <UserCircleIcon color="#3b82f6" size={20} />
            Thông tin cá nhân
          </div>

          <div className="personal-info-grid">
            <div className="info-form" key={user.id}>
              <div className="form-group">
                <label>HỌ VÀ TÊN</label>
                <input type="text" defaultValue={user.fullName || ""} />
              </div>
              <div className="form-group">
                <label>ĐỊA CHỈ EMAIL</label>
                <input type="email" defaultValue={user.email || ""} />
              </div>
              <button type="button" className="save-btn">Lưu thay đổi</button>
            </div>

            <div className="security-box">
              <div className="security-title">
                <LockIcon color="#3b82f6" size={18} />
                Bảo mật tài khoản
              </div>

              <div className="security-item">
                <div className="security-item-info">
                  <span className="security-item-label">Mật khẩu</span>
                </div>
                <a href="#" className="security-action">Thay đổi mật khẩu</a>
              </div>

              <div className="security-item">
                <div className="security-item-info">
                  <span className="security-item-label">Xác thực 2 yếu tố</span>
                  <span className="security-item-status">Đã kích hoạt</span>
                </div>
                <a href="#" className="security-action">Cài đặt</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
