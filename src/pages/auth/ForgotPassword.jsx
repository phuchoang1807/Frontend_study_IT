import { Link } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo";

export default function ForgotPassword() {
  return (
     <div className="auth-form-wrap auth-form-wrap--compact">
      <BrandLogo />

      <header className="auth-header">
        <h1>Forgot Password?</h1>
        <p>No worries! Enter your email and we&apos;ll send you a reset link.</p>
      </header>

      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="forgot-email">Email Address</label>
        <input id="forgot-email" type="email" placeholder="user@example.com" />

        <button type="submit" className="primary-button">
          Send reset link
        </button>
      </form>

      <p className="auth-footer-text">
        Remember your password? <Link to="/sign-in">Back to Sign In</Link>
      </p>

    </div>
  );
}