import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandLogo from "../../components/BrandLogo";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { GOOGLE_OAUTH_LOGIN_URL } from "../../constants/backendOrigin";

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, loading, setError } = useAuth();
  const notification = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const oauthError = searchParams.get("oauthError");
    if (oauthError === "missing_email") {
      setFormError("Google did not return an email. Try another account.");
    }
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setFormError("");
    try {
      const user = await login({ email, password, rememberMe });
      notification.success("Login successful.");
      if (user?.roles?.includes("ADMIN")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setFormError(message);
    }
  };

  return (
    <div className="auth-form-wrap">
      <BrandLogo />

      <header className="auth-header">
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in.</p>
      </header>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
        onChange={() => { setError(null); setFormError(""); }}
      >
        <label htmlFor="signin-email">Email</label>
        <input
          id="signin-email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="signin-password">Password</label>
        {password.length > 0 ? (
          <div className="input-with-icon">
            <input
              id="signin-password"
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
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <div className="auth-form__row">
          <label className="remember-check">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <Link to="/forgot-password" className="text-link">
            Forgot password?
          </Link>
        </div>

        {formError && <p className="auth-form-error" role="alert">{formError}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="divider">Or continue with</div>

        <div className="social-row">
          <button
            type="button"
            className="social-button"
            onClick={() => {
              window.location.href = GOOGLE_OAUTH_LOGIN_URL;
            }}
          >
            <span>G</span> Đăng nhập bằng Google
          </button>
          <button type="button" className="social-button">
            <span></span> Đăng nhập bằng Github
          </button>
        </div>
      </form>

      <p className="auth-footer-text">
        Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
      </p>

    </div>
  );
}