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
 * Modal yêu cầu đăng nhập — dùng kèm LoginRequiredModalProvider / useLoginRequired.
 */
export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterClick,
  title = "Yêu cầu đăng nhập",
  message = "Bạn cần đăng nhập để thực hiện chức năng này",
}) {
  if (!isOpen) return null;

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
        aria-labelledby="login-required-modal-title"
        aria-describedby="login-required-modal-desc"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="login-required-modal__header">
          <h2 id="login-required-modal-title" className="login-required-modal__title">
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
          <p id="login-required-modal-desc" className="login-required-modal__text">
            {message}
          </p>
        </div>
        <div className="login-required-modal__actions">
          <button type="button" className="login-required-modal__primary" onClick={onLoginClick}>
            Đăng nhập
          </button>
          <button type="button" className="login-required-modal__link" onClick={onRegisterClick}>
            Chưa có tài khoản? Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}
