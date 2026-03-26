import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BrandLogo from "../../components/BrandLogo";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login({ email, password, rememberMe });
      // Redirect based on role
      if (user.roles.includes("ADMIN")) {
        navigate("/admin/dashboard");
      } else if (user.roles.includes("GUEST")) {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch {
      // error đã được set trong context
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
        onChange={() => error && setError(null)}
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
        <div className="input-with-icon">
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span aria-hidden="true">👁</span>
        </div>
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

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

      </form>

      <p className="auth-footer-text">
        Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
      </p>

    </div>
  );
}