import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/uploadDocument.css";

// Thêm icon inline cho các thành phần đặc thù
const FileUploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="12" y1="18" x2="12" y2="12"></line>
    <polyline points="9 15 12 12 15 15"></polyline>
  </svg>
);

const ImageIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const PdfIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <text x="7" y="18" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">PDF</text>
  </svg>
);

export default function UploadDocument() {
  const navigate = useNavigate();
  const notification = useNotification();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: ["Giáo trình", "Kinh tế"],
    documentFile: null,
    thumbnailFile: null,
    confirmed: false,
  });

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const removeFile = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.documentFile) {
      notification.error("Vui lòng tải lên tệp tài liệu.");
      return;
    }
    if (!formData.confirmed) {
      notification.error("Vui lòng xác nhận điều khoản.");
      return;
    }
    
    // Simulate upload
    notification.success("Tài liệu đang được tải lên và chờ phê duyệt!");
    setTimeout(() => {
      navigate("/manage-documents");
    }, 1500);
  };

  return (
    <div className="upload-document-container">
      <div className="upload-document-content">
        <div className="upload-header">
          <h1 className="upload-title">Đăng tải tài liệu mới</h1>
          <p className="upload-subtitle">
            Chia sẻ kiến thức của bạn với hàng ngàn người dùng trong cộng đồng StudyIT
          </p>
        </div>

        <div className="upload-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <label className="form-label">Tiêu đề tài liệu</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Ví dụ: Tài liệu c#"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label">Mô tả tài liệu</label>
              <textarea
                name="description"
                className="form-textarea"
                placeholder="Mô tả ngắn gọn về nội dung, đối tượng mục tiêu hoặc các lưu ý của tài liệu này..."
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-row form-section">
              <div>
                <label className="form-label">Danh mục</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Chọn danh mục phù hợp</option>
                  <option value="cntt">Công nghệ thông tin</option>
                  <option value="kinhte">Kinh tế</option>
                  <option value="ngonngu">Ngôn ngữ</option>
                </select>
              </div>
              <div>
                <label className="form-label">Thẻ (Tags)</label>
                <div className="tags-input-container">
                  {formData.tags.map((tag) => (
                    <span key={tag} className="tag-item">
                      {tag}
                      <span className="tag-remove" onClick={() => removeTag(tag)}>×</span>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="tags-input"
                    placeholder="Thêm thẻ..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">
                Tệp tài liệu <span className="required-star">*</span>
              </label>
              <div 
                className="dropzone" 
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "documentFile")}
                  accept=".pdf,.docx,.pptx"
                />
                <div className="dropzone-icon">
                  <FileUploadIcon />
                </div>
                <p className="dropzone-text">Kéo thả hoặc nhấp để tải tệp</p>
                <p className="dropzone-subtext">Hỗ trợ PDF, DOCX, PPTX (Tối đa 25MB)</p>
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">Ảnh minh họa tài liệu</label>
              <div 
                className="dropzone" 
                onClick={() => imageInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "thumbnailFile")}
                  accept="image/*"
                />
                <div className="dropzone-icon">
                  <ImageIcon />
                </div>
                <p className="dropzone-text">Tải lên ảnh bìa hoặc kéo thả</p>
                <p className="dropzone-subtext">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
              </div>
            </div>

            {formData.documentFile && (
              <div className="form-section">
                <p className="preview-section-title">Xem trước tệp đã chọn</p>
                <div className="file-preview-card">
                  <div className="file-preview-info">
                    <div className="file-type-icon">
                      <PdfIcon />
                    </div>
                    <div className="file-details">
                      <span className="file-name">{formData.documentFile.name}</span>
                      <span className="file-meta">
                        {(formData.documentFile.size / (1024 * 1024)).toFixed(1)} MB • Đã sẵn sàng
                      </span>
                    </div>
                  </div>
                  <div className="remove-file" onClick={() => removeFile("documentFile")}>
                    <TrashIcon />
                  </div>
                </div>
              </div>
            )}

            <div className="confirmation-section">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="confirm"
                  name="confirmed"
                  className="checkbox-input"
                  checked={formData.confirmed}
                  onChange={handleInputChange}
                />
                <label htmlFor="confirm" className="checkbox-label">
                  Tôi xác nhận nội dung này hợp lệ, không vi phạm bản quyền và tuân thủ các điều khoản cộng đồng của StudyIT.
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                <SendIcon />
                Đăng tải tài liệu
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate(-1)}
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
