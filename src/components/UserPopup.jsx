import React from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  ShieldIcon,
  DocumentIcon,
  QuizIcon,
  BookmarkIcon,
  HistoryIcon,
  EyeIcon,
  LogoutIcon
} from "./icons";
import "../styles/userPopup.css";

export default function UserPopup({ onClose, onLogout }) {
  return (
    <div className="user-popup-container" onClick={(e) => e.stopPropagation()}>
      {/* TÀI KHOẢN */}
      <div className="popup-section">
        <div className="popup-header">TÀI KHOẢN</div>
        <Link to="/profile" className="popup-item" onClick={onClose}>
          <UserCircleIcon size={18} />
          <span>Hồ sơ cá nhân</span>
        </Link>
        <Link to="/contributor-profile" className="popup-item" onClick={onClose}>
          <ShieldIcon size={18} />
          <span>Hồ sơ đăng ký Contributor</span>
        </Link>
      </div>

      {/* QUẢN LÝ */}
      <div className="popup-section">
        <div className="popup-header">QUẢN LÝ</div>
        <Link to="/manage-documents" className="popup-item" onClick={onClose}>
          <DocumentIcon size={18} />
          <span>Quản lý tài liệu</span>
        </Link>
        <Link to="/manage-quizzes" className="popup-item" onClick={onClose}>
          <QuizIcon size={18} />
          <span>Quản lý Quiz</span>
        </Link>
        <Link to="/favorite-documents" className="popup-item" onClick={onClose}>
          <BookmarkIcon size={18} />
          <span>Tài liệu yêu thích</span>
        </Link>
      </div>

      {/* LỊCH SỬ */}
      <div className="popup-section">
        <div className="popup-header">LỊCH SỬ</div>
        <Link to="/quiz-history" className="popup-item" onClick={onClose}>
          <HistoryIcon size={18} />
          <span>Lịch sử Quiz</span>
        </Link>
        <Link to="/view-history" className="popup-item" onClick={onClose}>
          <EyeIcon size={18} />
          <span>Lịch sử Tài liệu đã xem</span>
        </Link>
      </div>

      {/* ĐĂNG XUẤT */}
      <div className="popup-section">
        <div className="popup-item logout" onClick={() => {
            onLogout?.();
            onClose();
        }}>
          <LogoutIcon size={18} />
          <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}
