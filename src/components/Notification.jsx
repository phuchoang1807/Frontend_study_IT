import { useEffect } from "react";

/**
 * Base notification (toast) component.
 * Renders a pop-up: success = green + ✅, error = red + ⚠️.
 * Used via useNotification() from NotificationContext.
 */
export default function Notification({
  state,
  onClose,
  autoHideMs = 4000,
}) {
  useEffect(() => {
    if (!state || !autoHideMs) return;
    const id = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(id);
  }, [state, autoHideMs, onClose]);

  if (!state) return null;

  const isSuccess = state.type === "success";
  const icon = isSuccess ? "✅" : "⚠️";
  const role = isSuccess ? "status" : "alert";

  return (
    <div
      className={`notification-toast notification-toast--${state.type}`}
      role={role}
      aria-live="polite"
    >
      <span className="notification-toast__icon" aria-hidden="true">
        {icon}
      </span>
      <p className="notification-toast__message">{state.message}</p>
      <button
        type="button"
        className="notification-toast__close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
