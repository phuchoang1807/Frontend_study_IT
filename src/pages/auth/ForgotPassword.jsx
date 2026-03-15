import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="bg-white flex flex-col items-center justify-center h-full px-12">
      
      <div className="max-w-[400px] w-full flex flex-col gap-8">

        <div>
          <h1 className="text-3xl font-bold text-[#111418]">
            Forgot Password?
          </h1>

          <p className="text-[#637588] mt-3">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="flex flex-col gap-6">

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

          <button className="bg-[#137fec] text-white h-12 rounded-lg hover:bg-[#0f6fd4] transition">
            Send reset link
          </button>

        </div>

        <div className="text-center text-sm">
          <span className="text-[#637588]">
            Remember your password?
          </span>

          <Link
            to="/"
            className="text-[#137fec] font-semibold ml-1 hover:underline"
          >
            Back to Sign In
          </Link>
        </div>

      </div>

    </div>
  );
}