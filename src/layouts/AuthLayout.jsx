import Background from "../components/Background";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <div className="hidden lg:flex lg:w-1/2">
        <Background />
      </div>

      <div className="w-full lg:w-1/2">
        {children}
      </div>
    </div>
  );
}