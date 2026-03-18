import { Link } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "../../components/BrandLogo";
import { forgotPassword } from "../../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      await forgotPassword({ email });
      setMessage("Reset link sent. Please check your email.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to send reset link.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
     <div className="auth-form-wrap auth-form-wrap--compact">
      <BrandLogo />

      <header className="auth-header">
        <h1>Forgot Password?</h1>
        <p>No worries! Enter your email and we&apos;ll send you a reset link.</p>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="forgot-email">Email Address</label>
        <input
          id="forgot-email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="auth-footer-text">
        Remember your password? <Link to="/login">Back to Sign In</Link>
      </p>

    </div>
  );
}