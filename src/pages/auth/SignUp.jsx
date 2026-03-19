import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "../../components/BrandLogo";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { register as registerApi } from "../../api/authApi";

export default function SignUp() {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const notification = useNotification();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await registerApi({ email, password, fullName });
      notification.success("Account created successfully. Please sign in.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setFormError(message);
    }
  };

  return (
    <div className="auth-form-wrap">
      <BrandLogo />

      <header className="auth-header">
        <h1>Create your account</h1>
        <p>Join our community of developers today.</p>
      </header>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        onChange={() => setFormError("")}
      >
        <label htmlFor="signup-name">Full Name</label>
        <input
          id="signup-name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="signup-password">Password</label>
        {password.length > 0 ? (
          <div className="input-with-icon">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
        ) : (
          <input
            id="signup-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <label htmlFor="signup-confirm-password">Confirm Password</label>
        {confirmPassword.length > 0 ? (
          <div className="input-with-icon">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((p) => !p)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showConfirmPassword ? "🙈" : "👁"}
            </button>
          </div>
        ) : (
          <input
            id="signup-confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {formError && <p className="auth-form-error" role="alert">{formError}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

          <div className="divider">Or continue with</div>

        <div className="social-row">
          <button type="button" className="social-button">
            <span>G</span> Google
          </button>
          <button type="button" className="social-button">
            <span></span> GitHub
          </button>

        </div>
         </form>

      <p className="auth-footer-text">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

    </div>
  );
}