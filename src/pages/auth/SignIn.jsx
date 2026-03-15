import { Link } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo";

export default function SignIn() {


  return (
    <div className="auth-form-wrap">
      <BrandLogo />

      <header className="auth-header">
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in.</p>
      </header>

      <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="signin-email">Email</label>
        <input id="signin-email" type="email" placeholder="user@example.com" />

        <label htmlFor="signin-password">Password</label>
        <div className="input-with-icon">
          <input id="signin-password" type="password" placeholder="Enter your password" />
          <span aria-hidden="true">👁</span>
        </div>

        <div className="auth-form__row">
          <label className="remember-check">
            <input type="checkbox" />
            Remember me
          </label>

          <Link to="/forgot-password" className="text-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="primary-button">
          Sign In
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
        Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
      </p>

    </div>
  );
}