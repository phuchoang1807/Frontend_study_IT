import React from "react";
import {
  LinkIcon,
  UploadIcon,
  AlertIcon,
  ChevronRightIcon,
  DocumentIcon
} from "../../components/icons";
import "../../styles/contributorRequest.css";

export default function ContributorRequest() {
  return (
    <div className="contributor-request-container">
      <main className="contributor-request-content">
        <header className="request-header">
          <h1 className="request-title">Đăng ký trở thành Người đóng góp (Contributor)</h1>
          <p className="request-subtitle">Chia sẻ kiến thức và tài liệu của bạn với cộng đồng để cùng nhau phát triển.</p>
        </header>

        <div className="request-banner">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" alt="Contributor Banner" />
        </div>

        <div className="request-form-card">
          <div className="form-group">
            <label className="form-label">Link Portfolio (nếu có)</label>
            <div className="input-wrapper">
              <span className="input-icon"><LinkIcon size={16} /></span>
              <input 
                type="text" 
                className="form-input" 
                placeholder="https://behance.net/username" 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mô tả kinh nghiệm của bạn</label>
            <textarea 
              className="form-textarea" 
              placeholder="Hãy cho chúng tôi biết về kinh nghiệm chuyên môn, các dự án bạn đã thực hiện hoặc các lĩnh vực bạn am hiểu nhất..."
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Tải lên chứng chỉ liên quan (PDF, JPG, PNG)</label>
            <div className="upload-zone">
              <div className="upload-info">
                <div className="upload-icon-wrapper">
                  <DocumentIcon size={20} />
                </div>
                <div className="upload-text-wrapper">
                  <div className="upload-text-main">Nhấn để tải lên hoặc kéo thả</div>
                  <div className="upload-text-sub">Tối đa 10MB mỗi tệp</div>
                </div>
              </div>
              <button className="upload-btn">Chọn tệp</button>
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="terms" className="custom-checkbox" />
            <label htmlFor="terms" className="checkbox-label">
              Tôi đồng ý với các <a href="#">điều khoản dành cho Contributor</a> và cam kết cung cấp thông tin chính xác.
            </label>
          </div>

          <div className="form-footer">
            <span className="privacy-note">Mọi thông tin của bạn sẽ được bảo mật tuyệt đối.</span>
            <button className="submit-request-btn">
              Gửi yêu cầu
              <ChevronRightIcon size={14} color="white" />
            </button>
          </div>
        </div>

        <div className="info-box">
          <span className="info-icon"><AlertIcon size={18} /></span>
          <p className="info-text">
            Yêu cầu của bạn sẽ được xét duyệt trong vòng 24-48h. Chúng tôi sẽ gửi thông báo kết quả qua email đăng ký của bạn.
          </p>
        </div>
      </main>
    </div>
  );
}
