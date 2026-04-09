import { useNavigate } from "react-router-dom";
import "../../styles/loginRequiredModal.css";

function CloseIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Modal chặn đăng tải — dùng chung class với LoginRequiredModal (primary #007bff).
 */
export default function ContributorUploadGateModal({
  isOpen,
  onClose,
  title,
  message,
  primary,
  closeOnly = false,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePrimary = () => {
    if (primary?.path) {
      navigate(primary.path);
    }
    onClose();
  };

  return (
    <div
      className="login-required-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="login-required-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contributor-upload-gate-title"
        aria-describedby="contributor-upload-gate-desc"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="login-required-modal__header">
          <h2
            id="contributor-upload-gate-title"
            className="login-required-modal__title"
          >
            {title}
          </h2>
          <button
            type="button"
            className="login-required-modal__close"
            onClick={onClose}
            aria-label="Đóng"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="login-required-modal__body">
          <p
            id="contributor-upload-gate-desc"
            className="login-required-modal__text"
          >
            {message}
          </p>
        </div>
        <div className="login-required-modal__actions">
          {primary && !closeOnly ? (
            <button
              type="button"
              className="login-required-modal__primary"
              onClick={handlePrimary}
            >
              {primary.label}
            </button>
          ) : (
            <button
              type="button"
              className="login-required-modal__primary"
              onClick={onClose}
            >
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
