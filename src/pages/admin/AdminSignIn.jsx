import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "../../components/icons";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import "../../styles/admin/adminSignIn.css";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const notification = useNotification();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trustDevice, setTrustDevice] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login({ email, password, rememberMe: trustDevice });
      
      if (user?.roles?.includes("ADMIN")) {
        notification.success("Admin access authorized.");
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. You do not have administrator privileges.");
        notification.error("Unauthorized access.");
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Authentication failed.";
      setError(message);
      notification.error(message);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-content">
          <header className="admin-login-header">
            <div className="admin-logo-wrapper">
              <div className="admin-logo-icon">
                <div className="admin-logo-disk"></div>
                <div className="admin-logo-disk"></div>
                <div className="admin-logo-disk"></div>
              </div>
              <span className="admin-logo-text">DevDocs Hub</span>
            </div>
            
            <div className="admin-badge">System Administration</div>
            <h1 className="admin-login-title">Admin Portal</h1>
            <p className="admin-login-subtitle">
              Sign in to manage your documentation ecosystem.
            </p>
          </header>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="admin-email">
                Admin Email
              </label>
              <div className="admin-input-wrapper">
                <input
                  id="admin-email"
                  type="email"
                  className="admin-input"
                  placeholder="admin@devdocs.hub"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="admin-password">
                Password
              </label>
              <div className="admin-input-wrapper">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className="admin-input"
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <EyeIcon size={20} color="#718096" />
                </button>
              </div>
            </div>

            <div className="admin-checkbox-group">
              <input
                id="trust-device"
                type="checkbox"
                className="admin-checkbox"
                checked={trustDevice}
                onChange={(e) => setTrustDevice(e.target.checked)}
              />
              <label htmlFor="trust-device" className="admin-checkbox-label">
                Trust this device for 30 days
              </label>
            </div>

            {error && <p className="admin-error-message" style={{ color: "#e53e3e", fontSize: "14px", marginBottom: "16px", textAlign: "center" }}>{error}</p>}

            <button type="submit" className="admin-submit-btn" disabled={loading}>
              {loading ? "Authorizing..." : "Authorize Access"}
            </button>

            <div className="admin-divider"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
