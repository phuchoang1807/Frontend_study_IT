import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/uploadDocument.css";
import { uploadToCloudinary } from "../../utils/uploadCloudinary";

// Inline SVG Icons
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
  const location = useLocation();
  const { documentToEdit } = location.state || {}; // Lấy dữ liệu tài liệu cần chỉnh sửa

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [], // Khởi tạo rỗng để điền từ dữ liệu chỉnh sửa
    documentFile: null,
    thumbnailFile: null,
    confirmed: false,
    isEditing: false, // Thêm trạng thái để biết đang chỉnh sửa hay tạo mới
    // Thêm các trường để lưu URL của tài liệu và thumbnail đã upload nếu đang ở chế độ chỉnh sửa
    existingDocumentUrl: null,
    existingThumbnailUrl: null,
    existingFileName: null,
    existingFileSize: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (documentToEdit) {
      setFormData({
        title: documentToEdit.title || "",
        description: documentToEdit.description || "",
        category: documentToEdit.category || "",
        tags: documentToEdit.tags || [],
        documentFile: null, // File input will be empty, user can re-upload
        thumbnailFile: null, // File input will be empty, user can re-upload
        confirmed: true, // Auto-confirm for editing an existing document
        isEditing: true,
        existingDocumentUrl: documentToEdit.documentUrl,
        existingThumbnailUrl: documentToEdit.thumbnailUrl,
        existingFileName: documentToEdit.fileName,
        existingFileSize: documentToEdit.fileSize,
      });
      notification.success("Đang chỉnh sửa tài liệu: " + documentToEdit.title);
    } else {
      // Reset form if not editing
      setFormData(prev => ({ 
        ...prev, 
        title: "", description: "", category: "", tags: [], 
        documentFile: null, thumbnailFile: null, confirmed: false, isEditing: false,
        existingDocumentUrl: null, existingThumbnailUrl: null, existingFileName: null, existingFileSize: null
      }));
    }
  }, [documentToEdit]);

  const MIN_TITLE_LENGTH = 15;
  const MAX_TITLE_LENGTH = 30;
  const MIN_DESCRIPTION_LENGTH = 80;
  const MAX_DESCRIPTION_LENGTH = 160;

  const isTitleValid = formData.title.trim().length >= MIN_TITLE_LENGTH && formData.title.trim().length <= MAX_TITLE_LENGTH;
  const isDescriptionValid = formData.description.trim().length >= MIN_DESCRIPTION_LENGTH && formData.description.trim().length <= MAX_DESCRIPTION_LENGTH;

  // Derived state to check if the form is valid for submission
  const canSubmit =
    isTitleValid &&
    isDescriptionValid &&
    formData.category.trim() !== "" &&
    formData.tags.length > 0 &&
    (formData.documentFile !== null || formData.existingDocumentUrl !== null) && // either new file or existing url
    (formData.thumbnailFile !== null || formData.existingThumbnailUrl !== null) && // either new thumbnail or existing url
    formData.confirmed === true &&
    !isUploading;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      let newValue = value;
      if (name === "title") {
        if (value.length > MAX_TITLE_LENGTH) {
          return; // Prevent further input
        }
      } else if (name === "description") {
        if (value.length > MAX_DESCRIPTION_LENGTH) {
          return; // Prevent further input
        }
      }
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleTagInputKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ";") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/;$/, ''); // Remove trailing semicolon if present
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
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
        // Khi chọn file mới, xóa URL của file cũ (nếu có) để đảm bảo chỉ dùng file mới
        [`existing${field.replace("File", "Url")}`]: null,
        [`existing${field.replace("File", "Name")}`]: null,
        [`existing${field.replace("File", "Size")}`]: null,
      }));
    }
  };

  const removeFile = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
      // Khi xóa file, xóa luôn URL cũ
      [`existing${field.replace("File", "Url")}`]: null,
      [`existing${field.replace("File", "Name")}`]: null,
      [`existing${field.replace("File", "Size")}`]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      notification.error("Vui lòng điền đầy đủ thông tin và xác nhận điều khoản trước khi đăng tải.");
      return;
    }
    
    try {
      setIsUploading(true);
      notification.success(formData.isEditing ? "Đang cập nhật tài liệu lên Cloudinary..." : "Đang tải tài liệu lên Cloudinary...");

      let docUrl = formData.existingDocumentUrl;
      let thumbUrl = formData.existingThumbnailUrl;
      let docFileName = formData.existingFileName;
      let docFileSize = formData.existingFileSize;

      // 1. Upload Document if new file is selected
      if (formData.documentFile) {
        const docResult = await uploadToCloudinary(formData.documentFile, "assets/UploadedDocuments");
        docUrl = docResult.url;
        docFileName = formData.documentFile.name;
        docFileSize = (formData.documentFile.size / (1024 * 1024)).toFixed(1);
      }
      
      // 2. Upload Thumbnail if new file is selected
      if (formData.thumbnailFile) {
        const thumbResult = await uploadToCloudinary(formData.thumbnailFile, "assets/UploadedDocuments");
        thumbUrl = thumbResult.url;
      }

      if (!docUrl || !thumbUrl) {
        throw new Error("Thiếu URL tài liệu hoặc ảnh minh họa sau khi tải lên.");
      }

      notification.success(formData.isEditing ? "Cập nhật tài liệu thành công!" : "Tải lên thành công!");
      
      // Chuyển hướng sang trang chi tiết với dữ liệu vừa upload/cập nhật
      navigate("/submitted-document-details", {
        state: {
          document: {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            tags: formData.tags,
            documentUrl: docUrl,
            thumbnailUrl: thumbUrl,
            fileName: docFileName,
            fileSize: docFileSize,
            uploadDate: new Date().toLocaleDateString('vi-VN'),
            status: "PENDING" // Status remains PENDING after upload/edit for review
          }
        }
      });
    } catch (error) {
      notification.error("Lỗi khi tải lên/cập nhật: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-document-container">
      <div className="upload-document-content">
        <div className="upload-header">
          <h1 className="upload-title">{formData.isEditing ? "Chỉnh sửa tài liệu" : "Đăng tải tài liệu mới"}</h1>
          <p className="upload-subtitle">
            {formData.isEditing ? "Cập nhật thông tin tài liệu của bạn." : "Chia sẻ kiến thức của bạn với hàng ngàn người dùng trong cộng đồng StudyIT"}
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
                disabled={isUploading}
              />
              {formData.title.trim().length === 0 && (
                <p className="form-hint error">Vui lòng nhập tiêu đề tài liệu.</p>
              )}
              {formData.title.trim().length > 0 && formData.title.trim().length < MIN_TITLE_LENGTH && (
                <p className="form-hint error">Tiêu đề phải có ít nhất {MIN_TITLE_LENGTH} ký tự.</p>
              )}
              {formData.title.trim().length > MAX_TITLE_LENGTH && (
                <p className="form-hint error">Tiêu đề không được vượt quá {MAX_TITLE_LENGTH} ký tự.</p>
              )}
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
                disabled={isUploading}
              ></textarea>
              {formData.description.trim().length === 0 && (
                <p className="form-hint error">Vui lòng nhập mô tả tài liệu.</p>
              )}
              {formData.description.trim().length > 0 && formData.description.trim().length < MIN_DESCRIPTION_LENGTH && (
                <p className="form-hint error">Mô tả phải có ít nhất {MIN_DESCRIPTION_LENGTH} ký tự.</p>
              )}
              {formData.description.trim().length > MAX_DESCRIPTION_LENGTH && (
                <p className="form-hint error">Mô tả không được vượt quá {MAX_DESCRIPTION_LENGTH} ký tự.</p>
              )}
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
                  disabled={isUploading}
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
                      <span className="tag-remove" onClick={isUploading ? null : () => removeTag(tag)}>×</span>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="tags-input"
                    placeholder="Thêm thẻ..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    disabled={isUploading}
                    title="Nhập thẻ mới và nhấn Enter hoặc ';' để thêm"
                  />
                </div>
                {formData.tags.length === 0 && tagInput.trim() === '' && (
                  <p className="form-hint">Vui lòng thêm ít nhất một thẻ.</p>
                )}
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">
                Tệp tài liệu <span className="required-star">*</span>
              </label>
              <div 
                className={`dropzone ${formData.documentFile || formData.existingDocumentUrl || isUploading ? 'dropzone-disabled' : ''}`} 
                onClick={formData.documentFile || formData.existingDocumentUrl || isUploading ? null : () => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "documentFile")}
                  accept=".pdf,.docx,.pptx"
                  disabled={formData.documentFile !== null || formData.existingDocumentUrl !== null || isUploading}
                />
                <div className="dropzone-icon">
                  <FileUploadIcon />
                </div>
                <p className="dropzone-text">
                  {formData.documentFile || formData.existingDocumentUrl ? 'Đã tải lên 1 tệp' : 'Kéo thả hoặc nhấp để tải tệp'}
                </p>
                <p className="dropzone-subtext">
                  Hỗ trợ PDF, DOCX, PPTX (Tối đa 25MB). Chỉ cho phép 1 tệp.
                </p>
              </div>
            </div>

            {(formData.documentFile || formData.existingDocumentUrl) && (
              <div className="form-section uploaded-file-preview">
                <p className="preview-section-title">Xem trước tệp đã chọn</p>
                <div className="file-preview-card">
                  <div className="file-preview-info">
                    <div className="file-type-icon">
                      <PdfIcon />
                    </div>
                    <div className="file-details">
                      <span className="file-name">{formData.documentFile?.name || formData.existingFileName}</span>
                      <span className="file-meta">
                        {formData.documentFile ? (formData.documentFile.size / (1024 * 1024)).toFixed(1) : formData.existingFileSize} MB • Đã sẵn sàng
                      </span>
                    </div>
                  </div>
                  <div className="remove-file" onClick={isUploading ? null : () => removeFile("documentFile")}>
                    <TrashIcon />
                  </div>
                </div>
              </div>
            )}

            <div className="form-section">
              <label className="form-label">Ảnh minh họa tài liệu</label>
              <div 
                className={`dropzone ${formData.thumbnailFile || formData.existingThumbnailUrl || isUploading ? 'dropzone-disabled' : ''}`} 
                onClick={formData.thumbnailFile || formData.existingThumbnailUrl || isUploading ? null : () => imageInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={imageInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, "thumbnailFile")}
                  accept="image/*"
                  disabled={formData.thumbnailFile !== null || formData.existingThumbnailUrl !== null || isUploading}
                />
                <div className="dropzone-icon">
                  <ImageIcon />
                </div>
                <p className="dropzone-text">
                  {formData.thumbnailFile || formData.existingThumbnailUrl ? 'Đã tải lên 1 ảnh' : 'Tải lên ảnh bìa hoặc kéo thả'}
                </p>
                <p className="dropzone-subtext">
                  Hỗ trợ JPG, PNG (Tối đa 5MB). Chỉ cho phép 1 ảnh.
                </p>
              </div>
            </div>

            {(formData.thumbnailFile || formData.existingThumbnailUrl) && (
              <div className="form-section uploaded-image-preview">
                <p className="preview-section-title">Xem trước ảnh đã chọn</p>
                <div className="image-preview-card">
                  <img 
                    src={formData.thumbnailFile ? URL.createObjectURL(formData.thumbnailFile) : formData.existingThumbnailUrl} 
                    alt="Ảnh minh họa" 
                    className="thumbnail-preview-img"
                  />
                  <div className="image-details">
                    <span className="image-name">{formData.thumbnailFile?.name || "Existing Thumbnail"}</span>
                    <span className="image-meta">
                      {formData.thumbnailFile ? (formData.thumbnailFile.size / (1024 * 1024)).toFixed(1) : "-"} MB
                    </span>
                  </div>
                  <div className="remove-image" onClick={isUploading ? null : () => removeFile("thumbnailFile")}>
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
                  disabled={isUploading}
                />
                <label htmlFor="confirm" className="checkbox-label">
                  Tôi xác nhận nội dung này hợp lệ, không vi phạm bản quyền và tuân thủ các điều khoản cộng đồng của StudyIT.
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className={`submit-btn ${!canSubmit || isUploading ? 'submit-btn-disabled' : ''}`}
                disabled={!canSubmit || isUploading}
                title={!canSubmit ? 'Vui lòng điền đầy đủ thông tin và xác nhận điều khoản để đăng tải' : ''}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {formData.isEditing ? "Đang cập nhật..." : "Đang tải lên..."}
                  </>
                ) : (
                  <>
                    <SendIcon />
                    {formData.isEditing ? "Cập nhật tài liệu" : "Đăng tải tài liệu"}
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate(-1)}
                disabled={isUploading}
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
