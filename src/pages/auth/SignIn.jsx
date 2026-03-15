import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full">

      <h1 className="text-3xl font-bold">Sign In</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-3 mt-4 w-[300px]"
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="border p-3 mt-4 w-[300px]"
      />

      <button className="bg-blue-500 text-white p-3 mt-4 w-[300px]">
        Sign In
      </button>

      <Link to="/forgot-password" className="mt-3 text-blue-500">
        Forgot password?
      </Link>

      <Link to="/sign-up" className="mt-3 text-blue-500">
        Sign Up
      </Link>

    </div>
  );
}