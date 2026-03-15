import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white flex flex-col items-center justify-center h-full px-12">

      <div className="max-w-[400px] w-full flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-bold text-[#111418]">
            Create Account
          </h1>

          <p className="text-[#637588] mt-3">
            Join us today! Please fill in your details.
          </p>
        </div>

        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="h-12 border border-[#dbe0e6] rounded-lg px-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="user@example.com"
              className="h-12 border border-[#dbe0e6] rounded-lg px-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 border border-[#dbe0e6] rounded-lg px-4 w-full outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="bg-[#137fec] text-white h-12 rounded-lg hover:bg-[#0f6fd4] transition">
            Sign Up
          </button>

        </div>

        <div className="text-center text-sm">

          <span className="text-[#637588]">
            Already have an account?
          </span>

          <Link
            to="/"
            className="text-[#137fec] font-semibold ml-1 hover:underline"
          >
            Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}