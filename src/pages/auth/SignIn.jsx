import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../../components/BrandLogo";
import { useState } from "react";

export default function SignIn() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if(email === "phuc1807@gmail.com" && password === "phuc@123"){
      navigate("/home");
    }else{
      alert("Sai tài khoản hoặc mật khẩu");
    }
  }

  return (
    <div className="auth-form-wrap">
      <BrandLogo />

      <header className="auth-header">
        <h1>Welcome back</h1>
        <p>Please enter your details to sign in.</p>
      </header>

      <form className="auth-form" onSubmit={handleLogin}>

        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <div className="auth-form__row">
          <span />
          <Link to="/forgot-password" className="text-link">Forgot password?</Link>
        </div>

        <button type="submit" className="primary-button">
          Sign In
        </button>

      </form>

      <p className="auth-footer-text">
        Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
      </p>

    </div>
  );
}