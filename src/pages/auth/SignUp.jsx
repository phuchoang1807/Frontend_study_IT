import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "../../components/BrandLogo";
import { useAuth } from "../../context/AuthContext";
import { register as registerApi } from "../../api/authApi";

export default function SignUp() {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerApi({ email, password, fullName });
      setSuccess("Account created successfully. Please sign in.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="auth-form-wrap">
      <BrandLogo />

      <header className="auth-header">
        <h1>Create your account</h1>
        <p>Join our community of developers today.</p>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
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

        <label htmlFor="signup-confirm-password">Confirm Password</label>
        <div className="input-with-icon">
          <input
            id="signup-confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span aria-hidden="true">👁</span>

        </div>

        <label htmlFor="signup-password">Password</label>
        <div className="input-with-icon">
          <input
            id="signup-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span aria-hidden="true">👁</span>
        </div>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

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