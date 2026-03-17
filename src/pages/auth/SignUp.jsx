import { Link } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo";

export default function SignUp() {



  return (
    <div className="auth-form-wrap">
      <BrandLogo />

          <header className="auth-header">
        <h1>Create your account</h1>
        <p>Join our community of developers today.</p>
      </header>

            <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="signup-name">Full Name</label>
        <input id="signup-name" type="text" placeholder="Enter your full name" />

          <label htmlFor="signup-email">Email</label>
        <input id="signup-email" type="email" placeholder="user@example.com" />

        <label htmlFor="signup-confirm-password">Confirm Password</label>
        <div className="input-with-icon">
          <input id="signup-confirm-password" type="password" placeholder="Confirm your password" />
          <span aria-hidden="true">👁</span>

        </div>

        <label htmlFor="signup-password">Password</label>
        <div className="input-with-icon">
          <input id="signup-password" type="password" placeholder="Enter your password" />
          <span aria-hidden="true">👁</span>
        </div>

          <button type="submit" className="primary-button">
          Sign Up
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
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </p>

    </div>
  );
}