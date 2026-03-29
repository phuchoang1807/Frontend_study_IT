import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/contributorStatus.css";

export default function ContributorStatus() {
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const notification = useNotification();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axiosClient.get("/contributor/registration-status");
        if (response.data.success) {
          setStatusInfo(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (loading) return <div className="loading-container">Đang tải...</div>;
  if (!statusInfo) {
    navigate("/contributor-request");
    return null;
  }

  const { status, rejectionReason, createdAt } = statusInfo;
  const formattedDate = new Date(createdAt).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  // Mẫu trạng thái: PENDING, APPROVED, REJECTED
  // Dựa theo yêu cầu:
  // 1. Chưa có kết quả (Đã gửi) - xám/xanh nước biển
  // 2. Thành công - xanh lá
  // 3. Bị từ chối - đỏ

  return (
    <div className="status-page-container">
      <div className="status-content">
        <h1 className="status-title">Trạng thái hồ sơ</h1>
        <p className="status-subtitle">Theo dõi tiến trình kiểm duyệt tài liệu định danh của bạn</p>

        <div className="status-stepper-card">
          <div className="stepper-item completed">
            <div className="step-icon-wrapper">
              <div className="step-icon success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="step-line active"></div>
            </div>
            <div className="step-content">
              <h3>Đã gửi tài liệu</h3>
              <p>Hệ thống đã nhận được tài liệu của bạn vào lúc {formattedDate}</p>
            </div>
          </div>

          <div className={`stepper-item ${status === 'PENDING' ? 'active' : (status === 'APPROVED' || status === 'REJECTED' ? 'completed' : '')}`}>
            <div className="step-icon-wrapper">
              <div className={`step-icon ${status === 'PENDING' ? 'processing' : (status === 'APPROVED' || status === 'REJECTED' ? 'success' : 'pending')}`}>
                {status === 'PENDING' ? (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                ) : (status === 'APPROVED' || status === 'REJECTED' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span>2</span>
                ))}
              </div>
              <div className={`step-line ${status !== 'PENDING' ? 'active' : ''}`}></div>
            </div>
            <div className="step-content">
              <h3 className={status === 'PENDING' ? 'text-processing' : ''}>Đang chờ kiểm duyệt</h3>
              <p>Moderator đang tiến hành rà soát các thông tin đã cung cấp. Dự kiến hoàn thành trong 24h.</p>
            </div>
          </div>

          <div className={`stepper-item ${status === 'APPROVED' ? 'completed-success' : (status === 'REJECTED' ? 'completed-rejected' : '')}`}>
            <div className="step-icon-wrapper">
              <div className={`step-icon ${status === 'APPROVED' ? 'success' : (status === 'REJECTED' ? 'rejected' : 'pending')}`}>
                 {status === 'APPROVED' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (status === 'REJECTED' ? (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                ))}
              </div>
            </div>
            <div className="step-content">
              <h3>Kết quả ({status === 'PENDING' ? 'Đang chờ' : (status === 'APPROVED' ? 'Thành công' : 'Bị từ chối')})</h3>
              <p>Trạng thái cuối cùng sau khi kiểm duyệt</p>
            </div>
          </div>
        </div>

        {status === 'REJECTED' && (
          <div className="rejection-card">
            <div className="rejection-banner">
               <div className="no-image-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="3" x2="21" y2="21"></line>
                    <path d="M15 8l-2 2"></path>
                    <path d="M10.5 10.5L9 12"></path>
                  </svg>
               </div>
            </div>
            <div className="rejection-info">
              <div className="moderator-note-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                GHI CHÚ TỪ MODERATOR
              </div>
              <h2 className="rejection-reason-title">Lý do từ chối: {rejectionReason || "Hồ sơ không hợp lệ"}</h2>
              <p className="rejection-detail">
                Ảnh chụp minh chứng hồ sơ của bạn bị mờ, không rõ số và thông tin cá nhân. Vui lòng chụp lại bản gốc trong điều kiện đủ sáng, không bị lóa đèn và gửi lại để chúng tôi có thể tiếp tục xét duyệt.
              </p>
              <div className="action-buttons">
                <button className="resubmit-btn" onClick={() => navigate("/contributor-request")}>
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Gửi lại tài liệu
                </button>
                <button className="support-btn">Liên hệ hỗ trợ</button>
              </div>
            </div>
          </div>
        )}

        {status === 'APPROVED' && (
          <div className="success-card">
             <div className="success-icon-large">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
             </div>
             <h2 className="success-title">Chúc mừng bạn đã trở thành Contributor!</h2>
             <p className="success-desc">Hồ sơ của bạn đã được phê duyệt. Bây giờ bạn có thể bắt đầu chia sẻ tài liệu và kiến thức của mình với cộng đồng.</p>
             <button className="upload-doc-btn" onClick={() => navigate("/manage-documents")}>
                Đăng tải tài liệu
             </button>
          </div>
        )}

        <div className="help-footer">
          Bạn cần giúp đỡ? <a href="#">Xem hướng dẫn chụp ảnh tài liệu</a>
        </div>
      </div>
    </div>
  );
}
