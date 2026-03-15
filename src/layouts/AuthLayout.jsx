import Background from "../components/Background";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <section className="auth-panel">{children}</section>
      <aside className="auth-visual-panel">
        <Background />
      </aside>
    </div>
  );
}